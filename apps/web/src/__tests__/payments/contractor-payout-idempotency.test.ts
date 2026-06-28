/**
 * Phase-5 e2e — Contractor payout idempotency & concurrency (DR-858 N-01/N-02, PR #174)
 *
 * Exercises the REAL `triggerPayoutForBooking` control flow with only its
 * boundaries mocked (Prisma, the Stripe SDK, the realtime emitter). No database
 * is required, so this runs in the default `jest` suite.
 *
 * What it proves:
 *   1. The payout uses a DETERMINISTIC idempotency key (`payout:<paymentId>`).
 *   2. A second call for an already-TRANSFERRED payment returns ALREADY_PAID and
 *      NEVER calls `stripe.transfers.create` again (no double pay).
 *   3. The concurrency loser (ledger create collides on the unique key) re-reads
 *      the winner's row and returns ALREADY_PAID without creating a 2nd transfer.
 *   4. The happy path creates exactly ONE transfer and writes the ledger.
 *   5. A Stripe failure marks the ledger FAILED and surfaces the error.
 *
 * The complementary test that proves the Postgres UNIQUE constraint itself
 * rejects a concurrent double-insert lives in
 * `src/__tests__/integration/contractor-payout-ledger.integration.test.ts`
 * and only runs against a real test database (npm run test:integration).
 */

export {}; // mark as a module so block-scoped test vars don't leak to global scope

const mockPrisma = {
  booking: { findUnique: jest.fn() },
  payment: { findFirst: jest.fn() },
  contractorProfile: { findFirst: jest.fn() },
  contractorPayout: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

const mockTransfersCreate = jest.fn();
const mockEmitPayoutInitiated = jest.fn();

jest.mock('@/lib/prisma', () => ({ prisma: mockPrisma }));

jest.mock('stripe', () =>
  jest.fn().mockImplementation(() => ({
    transfers: { create: mockTransfersCreate, retrieve: jest.fn() },
  }))
);

jest.mock('@/lib/realtime/payment-events', () => ({
  emitPayoutInitiated: (...args: unknown[]) => mockEmitPayoutInitiated(...args),
}));

const PAYMENT_ID = 'pay_1';
const BOOKING_ID = 'booking_1';
const CONTRACTOR_ID = 'contractor_1';
const EXPECTED_KEY = `payout:${PAYMENT_ID}`;
const FORTY_DAYS_AGO = new Date(Date.now() - 40 * 24 * 60 * 60 * 1000);

// The module reads STRIPE_SECRET_KEY at import time to decide whether `stripe`
// is configured, so set it before the dynamic import below.
type PayoutModule = typeof import('@/lib/payments/contractor-payout');
let mod: PayoutModule;

beforeAll(async () => {
  process.env.STRIPE_SECRET_KEY = 'sk_test_dummy';
  mod = await import('@/lib/payments/contractor-payout');
});

beforeEach(() => {
  mockPrisma.booking.findUnique.mockResolvedValue({
    id: BOOKING_ID,
    contractorId: CONTRACTOR_ID,
    contractor: { id: CONTRACTOR_ID, businessName: 'Acme Restoration', userId: 'user_1' },
  });
  mockPrisma.payment.findFirst.mockResolvedValue({
    id: PAYMENT_ID,
    status: 'COMPLETED',
    amountAUD: 1000,
    processedAt: FORTY_DAYS_AGO,
    contractorId: CONTRACTOR_ID,
    booking: { id: BOOKING_ID, contractorId: CONTRACTOR_ID },
  });
  mockPrisma.contractorProfile.findFirst.mockResolvedValue({
    stripeConnectAccountId: 'acct_123',
  });
  mockPrisma.contractorPayout.findUnique.mockResolvedValue(null);
  mockPrisma.contractorPayout.create.mockResolvedValue({ id: 'ledger_1', amountAUD: 800 });
  mockPrisma.contractorPayout.update.mockResolvedValue({});
  mockTransfersCreate.mockResolvedValue({ id: 'tr_new' });
  mockEmitPayoutInitiated.mockResolvedValue(undefined);
});

describe('calculatePayoutAmount (pure)', () => {
  it('splits 80% contractor / 20% platform fee', () => {
    const { grossAmount, platformFee, netAmount } = mod.calculatePayoutAmount(1000);
    expect(grossAmount).toBe(1000);
    expect(platformFee).toBe(200);
    expect(netAmount).toBe(800);
  });
});

describe('isDisputeWindowPassed (pure)', () => {
  it('is false inside the 30-day window and true after it', () => {
    expect(mod.isDisputeWindowPassed(new Date())).toBe(false);
    expect(mod.isDisputeWindowPassed(FORTY_DAYS_AGO)).toBe(true);
  });
});

describe('triggerPayoutForBooking — idempotency & concurrency', () => {
  it('happy path: creates exactly one transfer with the deterministic key', async () => {
    const result = await mod.triggerPayoutForBooking(BOOKING_ID);

    expect(result.status).toBe('TRANSFERRED');
    expect(result.payoutId).toBe('tr_new');
    expect(result.amount).toBe(800);

    expect(mockTransfersCreate).toHaveBeenCalledTimes(1);
    // Second arg carries the deterministic idempotency key.
    expect(mockTransfersCreate.mock.calls[0][1]).toEqual({ idempotencyKey: EXPECTED_KEY });
    // First arg: 800 AUD => 80000 cents, to the connected account.
    expect(mockTransfersCreate.mock.calls[0][0]).toMatchObject({
      amount: 80000,
      currency: 'aud',
      destination: 'acct_123',
    });
    // Ledger advanced to TRANSFERRED with the transfer id.
    expect(mockPrisma.contractorPayout.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: 'TRANSFERRED', stripeTransferId: 'tr_new' }),
      })
    );
  });

  it('already paid: a second call returns ALREADY_PAID and never re-transfers', async () => {
    mockPrisma.contractorPayout.findUnique.mockResolvedValue({
      id: 'ledger_1',
      status: 'TRANSFERRED',
      stripeTransferId: 'tr_existing',
      amountAUD: 800,
    });

    const result = await mod.triggerPayoutForBooking(BOOKING_ID);

    expect(result.status).toBe('ALREADY_PAID');
    expect(result.payoutId).toBe('tr_existing');
    expect(mockTransfersCreate).not.toHaveBeenCalled();
    expect(mockPrisma.contractorPayout.create).not.toHaveBeenCalled();
  });

  it('concurrency loser: ledger insert collides, re-reads winner, no second transfer', async () => {
    // 1st findUnique (the layer-2 guard) sees nothing yet; the create then loses
    // the race on the unique idempotencyKey; the catch re-reads the winner's row.
    mockPrisma.contractorPayout.findUnique
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({
        id: 'ledger_winner',
        status: 'TRANSFERRED',
        stripeTransferId: 'tr_winner',
        amountAUD: 800,
      });
    mockPrisma.contractorPayout.create.mockRejectedValue(
      new Error('Unique constraint failed on the fields: (`idempotencyKey`)')
    );

    const result = await mod.triggerPayoutForBooking(BOOKING_ID);

    expect(result.status).toBe('ALREADY_PAID');
    expect(result.payoutId).toBe('tr_winner');
    expect(mockTransfersCreate).not.toHaveBeenCalled();
  });

  it('stripe failure: marks the ledger FAILED and throws', async () => {
    mockTransfersCreate.mockRejectedValue(new Error('insufficient funds'));

    await expect(mod.triggerPayoutForBooking(BOOKING_ID)).rejects.toThrow(
      /Failed to create Stripe transfer/
    );

    expect(mockPrisma.contractorPayout.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: 'FAILED' }),
      })
    );
  });

  it('refuses to pay before the dispute window has passed', async () => {
    mockPrisma.payment.findFirst.mockResolvedValue({
      id: PAYMENT_ID,
      status: 'COMPLETED',
      amountAUD: 1000,
      processedAt: new Date(), // today — inside the 30-day window
      contractorId: CONTRACTOR_ID,
      booking: { id: BOOKING_ID, contractorId: CONTRACTOR_ID },
    });

    await expect(mod.triggerPayoutForBooking(BOOKING_ID)).rejects.toThrow(
      /Dispute window has not yet passed/
    );
    expect(mockTransfersCreate).not.toHaveBeenCalled();
  });
});
