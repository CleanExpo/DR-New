/**
 * @jest-environment node
 *
 * DR-897 — Admin callout-release: ledgered, idempotent, race-safe.
 *
 * Drives the REAL POST handler for
 * `app/api/admin/service-requests/[id]/callout/release/route.ts` with its
 * boundaries mocked (auth, tenant db, the Stripe helper). The NRPG split
 * module stays REAL so the $2200/$550 amounts are the production numbers.
 *
 * What it proves (no double-pay):
 *   1. Happy path: exactly ONE transfer, created with the deterministic
 *      Stripe idempotency key `nrpg_callout_<serviceRequestId>`, a PENDING
 *      ContractorPayout ledger row written BEFORE the Stripe call and
 *      advanced to TRANSFERRED with the unique stripeTransferId after; the
 *      callout row flips PAID->RELEASED via a CONDITIONAL update.
 *   2. Replay after release (status RELEASED) is rejected — no Stripe call.
 *   3. Crash-window replay (still PAID but ledger already TRANSFERRED)
 *      returns the EXISTING transfer — no second Stripe call.
 *   4. Unique-constraint race: the ledger insert collides (P2002), the loser
 *      re-reads the winner's row and never calls Stripe.
 *   5. A racing loser whose winner is still in flight gets a sane 409.
 *   6. A Stripe failure marks the ledger FAILED and surfaces a 500.
 */

import { NextRequest, NextResponse } from 'next/server';

// api-errors (pulled in by the route) imports @sentry/nextjs, which is not
// resolvable under test; it only calls captureException.
jest.mock('@sentry/nextjs', () => ({ captureException: jest.fn() }), { virtual: true });

jest.mock('@/lib/auth-middleware', () => {
  const { NextResponse: MockNextResponse } = jest.requireActual('next/server');
  return {
    authenticateRequest: jest.fn(),
    requireRole: (user: { userType?: string }, roles: string[]) =>
      roles.includes(user?.userType as string),
    unauthorizedRoleResponse: (roles: string[]) =>
      MockNextResponse.json(
        { error: 'FORBIDDEN', message: `Access denied. Required roles: ${roles.join(', ')}` },
        { status: 403 }
      ),
  };
});

const mockDb = {
  serviceRequestCalloutPayment: {
    findUnique: jest.fn(),
    update: jest.fn(),
    updateMany: jest.fn(),
  },
  contractorMatch: { findFirst: jest.fn() },
  contractorPayout: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};
jest.mock('@/lib/get-tenant-db', () => ({ getTenantDb: () => mockDb }));

const mockCreateTransfer = jest.fn();
jest.mock('@/lib/stripe', () => ({
  createTransfer: (...args: unknown[]) => mockCreateTransfer(...args),
}));

import { POST } from '@/app/api/admin/service-requests/[id]/callout/release/route';
import { authenticateRequest } from '@/lib/auth-middleware';

const mockAuth = authenticateRequest as jest.Mock;

const SR_ID = 'sr_1';
const KEY = `nrpg_callout_${SR_ID}`;
const routeParams = { params: { id: SR_ID } };
const ADMIN = { id: 'admin_1', userType: 'ADMIN' };

const PAID_CALLOUT = {
  serviceRequestId: SR_ID,
  status: 'PAID',
  contractorProfile: { id: 'profile_1', stripeConnectAccountId: 'acct_1' },
};

function releaseReq() {
  return new NextRequest(`http://localhost/api/admin/service-requests/${SR_ID}/callout/release`, {
    method: 'POST',
  });
}

beforeEach(() => {
  mockAuth.mockResolvedValue({ success: true, context: { user: ADMIN } });
  mockDb.serviceRequestCalloutPayment.findUnique.mockResolvedValue(PAID_CALLOUT);
  mockDb.serviceRequestCalloutPayment.updateMany.mockResolvedValue({ count: 1 });
  mockDb.contractorPayout.findUnique.mockResolvedValue(null);
  mockDb.contractorPayout.create.mockResolvedValue({ id: 'ledger_1' });
  mockDb.contractorPayout.update.mockResolvedValue({});
  mockCreateTransfer.mockResolvedValue({ id: 'tr_1' });
});

describe('POST /api/admin/service-requests/[id]/callout/release — idempotency', () => {
  it('happy path: one ledgered transfer with the deterministic idempotency key', async () => {
    const res = await POST(releaseReq(), routeParams);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toMatchObject({ success: true, transferId: 'tr_1', amountAUD: 2200 });

    // Exactly one Stripe call, carrying the deterministic idempotency key.
    expect(mockCreateTransfer).toHaveBeenCalledTimes(1);
    expect(mockCreateTransfer).toHaveBeenCalledWith(2200, 'acct_1', KEY, 'aud', KEY);

    // Ledger claimed BEFORE the Stripe call ($2200 net / $550 platform fee).
    expect(mockDb.contractorPayout.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        idempotencyKey: KEY,
        contractorId: 'profile_1',
        connectedAccount: 'acct_1',
        amountAUD: 2200,
        platformFeeAUD: 550,
        status: 'PENDING',
      }),
    });
    const createOrder = mockDb.contractorPayout.create.mock.invocationCallOrder[0];
    const transferOrder = mockCreateTransfer.mock.invocationCallOrder[0];
    expect(createOrder).toBeLessThan(transferOrder);

    // Ledger advanced to TRANSFERRED with the unique transfer id.
    expect(mockDb.contractorPayout.update).toHaveBeenCalledWith({
      where: { id: 'ledger_1' },
      data: { status: 'TRANSFERRED', stripeTransferId: 'tr_1' },
    });

    // Conditional PAID->RELEASED flip (never an unconditional update).
    expect(mockDb.serviceRequestCalloutPayment.updateMany).toHaveBeenCalledWith({
      where: { serviceRequestId: SR_ID, status: 'PAID' },
      data: { status: 'RELEASED', stripeTransferId: 'tr_1' },
    });
    expect(mockDb.serviceRequestCalloutPayment.update).not.toHaveBeenCalled();
  });

  it('replay after release: RELEASED status is rejected without any Stripe call', async () => {
    mockDb.serviceRequestCalloutPayment.findUnique.mockResolvedValue({
      ...PAID_CALLOUT,
      status: 'RELEASED',
    });

    const res = await POST(releaseReq(), routeParams);

    expect(res.status).toBe(400);
    expect(mockCreateTransfer).not.toHaveBeenCalled();
    expect(mockDb.contractorPayout.create).not.toHaveBeenCalled();
  });

  it('crash-window replay: existing TRANSFERRED ledger row short-circuits, no second transfer', async () => {
    // Previous attempt transferred but crashed before flipping the callout row.
    mockDb.contractorPayout.findUnique.mockResolvedValue({
      id: 'ledger_prev',
      status: 'TRANSFERRED',
      stripeTransferId: 'tr_prev',
    });

    const res = await POST(releaseReq(), routeParams);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toMatchObject({ success: true, transferId: 'tr_prev', alreadyReleased: true });
    expect(mockCreateTransfer).not.toHaveBeenCalled();
    expect(mockDb.contractorPayout.create).not.toHaveBeenCalled();
  });

  it('unique-key race loser: P2002 on insert, re-reads winner, no Stripe call', async () => {
    mockDb.contractorPayout.findUnique
      .mockResolvedValueOnce(null) // pre-claim read sees nothing yet
      .mockResolvedValueOnce({
        id: 'ledger_winner',
        status: 'TRANSFERRED',
        stripeTransferId: 'tr_winner',
      });
    mockDb.contractorPayout.create.mockRejectedValue(
      new Error('Unique constraint failed on the fields: (`idempotencyKey`)')
    );

    const res = await POST(releaseReq(), routeParams);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toMatchObject({ success: true, transferId: 'tr_winner', alreadyReleased: true });
    expect(mockCreateTransfer).not.toHaveBeenCalled();
  });

  it('race loser while the winner is still in flight: 409, no Stripe call', async () => {
    mockDb.contractorPayout.findUnique
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({ id: 'ledger_winner', status: 'PENDING', stripeTransferId: null });
    mockDb.contractorPayout.create.mockRejectedValue(
      new Error('Unique constraint failed on the fields: (`idempotencyKey`)')
    );

    const res = await POST(releaseReq(), routeParams);

    expect(res.status).toBe(409);
    expect(mockCreateTransfer).not.toHaveBeenCalled();
    expect(mockDb.serviceRequestCalloutPayment.updateMany).not.toHaveBeenCalled();
  });

  it('stripe failure: ledger marked FAILED, 500 surfaced, callout row untouched', async () => {
    mockCreateTransfer.mockRejectedValue(new Error('insufficient platform balance'));

    const res = await POST(releaseReq(), routeParams);

    expect(res.status).toBe(500);
    expect(mockDb.contractorPayout.update).toHaveBeenCalledWith({
      where: { id: 'ledger_1' },
      data: expect.objectContaining({
        status: 'FAILED',
        failureReason: 'insufficient platform balance',
      }),
    });
    expect(mockDb.serviceRequestCalloutPayment.updateMany).not.toHaveBeenCalled();
  });

  it('rejects non-admin callers before touching money paths', async () => {
    mockAuth.mockResolvedValue({
      success: true,
      context: { user: { id: 'user_1', userType: 'CONTRACTOR' } },
    });

    const res = await POST(releaseReq(), routeParams);

    expect(res.status).toBe(403);
    expect(mockCreateTransfer).not.toHaveBeenCalled();
    expect(mockDb.contractorPayout.create).not.toHaveBeenCalled();
  });

  it('unauthenticated callers get the auth response untouched', async () => {
    mockAuth.mockResolvedValue({
      success: false,
      response: NextResponse.json({ error: 'unauthorized' }, { status: 401 }),
    });

    const res = await POST(releaseReq(), routeParams);

    expect(res.status).toBe(401);
    expect(mockCreateTransfer).not.toHaveBeenCalled();
  });
});
