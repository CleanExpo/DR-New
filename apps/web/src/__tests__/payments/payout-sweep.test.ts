/**
 * @jest-environment node
 *
 * DR-896 — Deferred contractor payout sweep cron.
 *
 * Drives the REAL GET handler for `app/api/cron/contractor-payout-sweep`
 * with its boundaries mocked (Prisma, the canonical Stripe helper, the
 * realtime emitter). `triggerPayoutForBooking` is mocked here because its own
 * ledger/idempotency behaviour is proven by
 * `contractor-payout-idempotency.test.ts`; everything else in the payout
 * module (window constants, split math, the userId profile join) runs REAL.
 *
 * What it proves:
 *   1. The cron is gated on CRON_SECRET — wrong/missing secret is a 401 that
 *      never touches the database.
 *   2. Sweep pays exactly the eligible rows: the DB query uses the 30-day
 *      hold cutoff, a 31-day-old payment is paid in one cycle, and a
 *      29-day-old row (even if the query returned it) is skipped in-loop.
 *   3. Re-running the sweep pays nothing: a TRANSFERRED ledger row
 *      short-circuits before any money path is reached.
 *   4. A capability-disabled contractor (payouts/charges not enabled — the
 *      Connect flags from PR #192) is skipped with a recorded reason.
 *   5. A payment older than the 90-day quarantine bound is QUARANTINED (ledger
 *      row + logged warning), never auto-paid; re-runs don't re-quarantine.
 *   6. One payment failing never aborts the rest of the sweep (crash-safe),
 *      and the failure is surfaced in the response.
 */

export {}; // mark as a module so block-scoped test vars don't leak to global scope

import { NextRequest } from 'next/server';

const mockPrisma = {
  payment: { findMany: jest.fn() },
  contractor: { findUnique: jest.fn() },
  contractorProfile: { findUnique: jest.fn() },
  contractorPayout: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
};

const mockTriggerPayout = jest.fn();
const mockCreateTransfer = jest.fn();

jest.mock('@/lib/prisma', () => ({ prisma: mockPrisma }));

jest.mock('@/lib/stripe', () => ({
  createTransfer: (...args: unknown[]) => mockCreateTransfer(...args),
  getTransfer: jest.fn(),
}));

jest.mock('@/lib/realtime/payment-events', () => ({
  emitPayoutInitiated: jest.fn(),
}));

// Keep the payout module REAL (constants, split math, profile join) but stub
// the transfer executor — its idempotency is proven in its own suite.
jest.mock('@/lib/payments/contractor-payout', () => {
  const actual = jest.requireActual('@/lib/payments/contractor-payout');
  return {
    ...actual,
    triggerPayoutForBooking: (...args: unknown[]) => mockTriggerPayout(...args),
  };
});

// Dynamic import so the jest.mock factories above (which close over the
// mock consts) are registered before the route module is evaluated.
type RouteModule = typeof import('@/app/api/cron/contractor-payout-sweep/route');
let GET: RouteModule['GET'];
const QUARANTINE_AFTER_DAYS = 90;

beforeAll(async () => {
  const route = await import('@/app/api/cron/contractor-payout-sweep/route');
  GET = route.GET;
  // Keep the local constant honest against the route's exported bound.
  expect(route.QUARANTINE_AFTER_DAYS).toBe(QUARANTINE_AFTER_DAYS);
});

const DAY_MS = 24 * 60 * 60 * 1000;
const SECRET = 'test-cron-secret';

function daysAgo(days: number): Date {
  return new Date(Date.now() - days * DAY_MS);
}

function sweepReq(secret?: string) {
  return new NextRequest('http://localhost/api/cron/contractor-payout-sweep', {
    headers: secret ? { authorization: `Bearer ${secret}` } : {},
  });
}

function payment(id: string, ageDays: number, overrides: Record<string, unknown> = {}) {
  return {
    id,
    bookingId: `booking_${id}`,
    contractorId: 'contractor_1',
    processedAt: daysAgo(ageDays),
    amountAUD: 1000,
    ...overrides,
  };
}

const PAYABLE_PROFILE = {
  stripeConnectAccountId: 'acct_123',
  stripePayoutsEnabled: true,
  stripeChargesEnabled: true,
};

beforeEach(() => {
  process.env.CRON_SECRET = SECRET;
  mockPrisma.payment.findMany.mockResolvedValue([]);
  mockPrisma.contractor.findUnique.mockResolvedValue({ userId: 'user_1' });
  mockPrisma.contractorProfile.findUnique.mockResolvedValue(PAYABLE_PROFILE);
  mockPrisma.contractorPayout.findUnique.mockResolvedValue(null);
  mockPrisma.contractorPayout.create.mockResolvedValue({ id: 'ledger_q' });
  mockTriggerPayout.mockResolvedValue({
    status: 'TRANSFERRED',
    payoutId: 'tr_1',
    amount: 800,
  });
});

describe('GET /api/cron/contractor-payout-sweep — auth gate', () => {
  it('rejects a missing secret with 401 and never touches the database', async () => {
    const res = await GET(sweepReq());

    expect(res.status).toBe(401);
    expect(mockPrisma.payment.findMany).not.toHaveBeenCalled();
    expect(mockTriggerPayout).not.toHaveBeenCalled();
  });

  it('rejects a wrong secret with 401', async () => {
    const res = await GET(sweepReq('wrong-secret'));

    expect(res.status).toBe(401);
    expect(mockPrisma.payment.findMany).not.toHaveBeenCalled();
  });

  it('accepts the x-vercel-cron-secret header form', async () => {
    const req = new NextRequest('http://localhost/api/cron/contractor-payout-sweep', {
      headers: { 'x-vercel-cron-secret': SECRET },
    });

    const res = await GET(req);

    expect(res.status).toBe(200);
    expect(mockPrisma.payment.findMany).toHaveBeenCalledTimes(1);
  });
});

describe('GET /api/cron/contractor-payout-sweep — window semantics', () => {
  it('queries only COMPLETED payments past the 30-day hold cutoff', async () => {
    await GET(sweepReq(SECRET));

    expect(mockPrisma.payment.findMany).toHaveBeenCalledTimes(1);
    const query = mockPrisma.payment.findMany.mock.calls[0][0];
    expect(query.where.status).toBe('COMPLETED');
    expect(query.where.contractorId).toEqual({ not: null });
    // The cutoff is now - 30d (± a few seconds of execution time).
    const cutoff = (query.where.processedAt.lte as Date).getTime();
    expect(Math.abs(cutoff - (Date.now() - 30 * DAY_MS))).toBeLessThan(10_000);
  });

  it('pays a 31-day-old payment in one cycle, exactly once', async () => {
    mockPrisma.payment.findMany.mockResolvedValue([payment('pay_31', 31)]);

    const res = await GET(sweepReq(SECRET));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(mockTriggerPayout).toHaveBeenCalledTimes(1);
    expect(mockTriggerPayout).toHaveBeenCalledWith('booking_pay_31');
    expect(body.counts).toMatchObject({ scanned: 1, paid: 1, skipped: 0, failed: 0 });
    expect(body.paid[0]).toMatchObject({
      paymentId: 'pay_31',
      transferId: 'tr_1',
      amountAUD: 800,
    });
  });

  it('never pays a 29-day-old payment, even if the query returned it', async () => {
    mockPrisma.payment.findMany.mockResolvedValue([
      payment('pay_29', 29),
      payment('pay_31', 31),
    ]);

    const res = await GET(sweepReq(SECRET));
    const body = await res.json();

    expect(mockTriggerPayout).toHaveBeenCalledTimes(1);
    expect(mockTriggerPayout).toHaveBeenCalledWith('booking_pay_31');
    expect(body.skipped).toEqual([
      expect.objectContaining({ paymentId: 'pay_29', reason: 'HOLD_WINDOW_NOT_PASSED' }),
    ]);
  });
});

describe('GET /api/cron/contractor-payout-sweep — idempotent re-run', () => {
  it('a re-run pays nothing: TRANSFERRED ledger rows short-circuit every money path', async () => {
    mockPrisma.payment.findMany.mockResolvedValue([payment('pay_a', 35), payment('pay_b', 40)]);
    mockPrisma.contractorPayout.findUnique.mockResolvedValue({
      status: 'TRANSFERRED',
      stripeTransferId: 'tr_done',
    });

    const res = await GET(sweepReq(SECRET));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(mockTriggerPayout).not.toHaveBeenCalled();
    expect(mockCreateTransfer).not.toHaveBeenCalled();
    expect(mockPrisma.contractorPayout.create).not.toHaveBeenCalled();
    expect(body.counts).toMatchObject({ scanned: 2, paid: 0, alreadyPaid: 2, failed: 0 });

    // The ledger was consulted with the deterministic per-payment key.
    expect(mockPrisma.contractorPayout.findUnique).toHaveBeenCalledWith({
      where: { idempotencyKey: 'payout:pay_a' },
    });
    expect(mockPrisma.contractorPayout.findUnique).toHaveBeenCalledWith({
      where: { idempotencyKey: 'payout:pay_b' },
    });
  });
});

describe('GET /api/cron/contractor-payout-sweep — capability gating', () => {
  it.each([
    ['payouts disabled', { ...PAYABLE_PROFILE, stripePayoutsEnabled: false }, 'PAYOUTS_DISABLED'],
    ['charges disabled', { ...PAYABLE_PROFILE, stripeChargesEnabled: false }, 'CHARGES_DISABLED'],
    ['no connect account', { ...PAYABLE_PROFILE, stripeConnectAccountId: null }, 'NO_CONNECT_ACCOUNT'],
  ])('skips a contractor with %s and records the reason', async (_label, profile, reason) => {
    mockPrisma.payment.findMany.mockResolvedValue([payment('pay_gated', 35)]);
    mockPrisma.contractorProfile.findUnique.mockResolvedValue(profile);

    const res = await GET(sweepReq(SECRET));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(mockTriggerPayout).not.toHaveBeenCalled();
    expect(body.skipped).toEqual([
      expect.objectContaining({ paymentId: 'pay_gated', contractorId: 'contractor_1', reason }),
    ]);
  });

  it('skips when the contractor profile cannot be resolved', async () => {
    mockPrisma.payment.findMany.mockResolvedValue([payment('pay_orphan', 35)]);
    mockPrisma.contractor.findUnique.mockResolvedValue(null);

    const res = await GET(sweepReq(SECRET));
    const body = await res.json();

    expect(mockTriggerPayout).not.toHaveBeenCalled();
    expect(body.skipped).toEqual([
      expect.objectContaining({ paymentId: 'pay_orphan', reason: 'CONTRACTOR_PROFILE_NOT_FOUND' }),
    ]);
  });

  it('resolves the profile via the Contractor.userId join (correct id mapping)', async () => {
    mockPrisma.payment.findMany.mockResolvedValue([payment('pay_map', 35)]);

    await GET(sweepReq(SECRET));

    expect(mockPrisma.contractor.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: 'contractor_1' } })
    );
    expect(mockPrisma.contractorProfile.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({ where: { userId: 'user_1' } })
    );
  });
});

describe('GET /api/cron/contractor-payout-sweep — quarantine of stale rows', () => {
  it(`quarantines a payment older than ${QUARANTINE_AFTER_DAYS} days with a logged warning, never pays it`, async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    mockPrisma.payment.findMany.mockResolvedValue([
      payment('pay_old', QUARANTINE_AFTER_DAYS + 1),
    ]);

    const res = await GET(sweepReq(SECRET));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(mockTriggerPayout).not.toHaveBeenCalled();
    expect(mockCreateTransfer).not.toHaveBeenCalled();
    expect(body.skipped).toEqual([
      expect.objectContaining({ paymentId: 'pay_old', reason: 'QUARANTINED_TOO_OLD' }),
    ]);

    // Durable, idempotent quarantine marker in the payout ledger.
    expect(mockPrisma.contractorPayout.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        idempotencyKey: 'payout:pay_old',
        paymentId: 'pay_old',
        status: 'QUARANTINED',
      }),
    });
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('QUARANTINED payment pay_old'));
    warn.mockRestore();
  });

  it('a re-run skips an already-QUARANTINED row without re-writing the ledger', async () => {
    mockPrisma.payment.findMany.mockResolvedValue([
      payment('pay_old', QUARANTINE_AFTER_DAYS + 1),
    ]);
    mockPrisma.contractorPayout.findUnique.mockResolvedValue({ status: 'QUARANTINED' });

    const res = await GET(sweepReq(SECRET));
    const body = await res.json();

    expect(mockTriggerPayout).not.toHaveBeenCalled();
    expect(mockPrisma.contractorPayout.create).not.toHaveBeenCalled();
    expect(body.skipped).toEqual([
      expect.objectContaining({ paymentId: 'pay_old', reason: 'ALREADY_QUARANTINED' }),
    ]);
  });
});

describe('GET /api/cron/contractor-payout-sweep — crash safety', () => {
  it('one failing payout never aborts the rest of the sweep, and is surfaced', async () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockPrisma.payment.findMany.mockResolvedValue([payment('pay_bad', 35), payment('pay_ok', 36)]);
    mockTriggerPayout
      .mockRejectedValueOnce(new Error('insufficient platform balance'))
      .mockResolvedValueOnce({ status: 'TRANSFERRED', payoutId: 'tr_ok', amount: 800 });

    const res = await GET(sweepReq(SECRET));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(mockTriggerPayout).toHaveBeenCalledTimes(2);
    expect(body.success).toBe(false);
    expect(body.counts).toMatchObject({ paid: 1, failed: 1 });
    expect(body.failed).toEqual([
      expect.objectContaining({ paymentId: 'pay_bad', error: 'insufficient platform balance' }),
    ]);
    expect(body.paid).toEqual([
      expect.objectContaining({ paymentId: 'pay_ok', transferId: 'tr_ok' }),
    ]);
    error.mockRestore();
  });

  it('a payout that reports ALREADY_PAID is counted, not re-paid', async () => {
    mockPrisma.payment.findMany.mockResolvedValue([payment('pay_race', 35)]);
    mockTriggerPayout.mockResolvedValue({
      status: 'ALREADY_PAID',
      payoutId: 'tr_prev',
      amount: 800,
    });

    const res = await GET(sweepReq(SECRET));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.counts).toMatchObject({ paid: 0, alreadyPaid: 1 });
    expect(body.alreadyPaid).toEqual([
      expect.objectContaining({ paymentId: 'pay_race', transferId: 'tr_prev' }),
    ]);
  });
});
