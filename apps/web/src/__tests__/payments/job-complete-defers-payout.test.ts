/**
 * @jest-environment node
 *
 * DR-896 — "Completion enqueues, never executes."
 *
 * Drives the REAL POST handler for
 * `app/api/contractor/jobs/[jobId]/complete/route.ts` with its boundaries
 * mocked (auth, tenant db, email, the payout module). Before DR-896 this
 * route called `triggerPayoutForBooking` synchronously on day 0 — a call that
 * always threw "Dispute window has not yet passed" and was swallowed. Now the
 * route must NOT move (or attempt to move) any money: the daily
 * contractor-payout-sweep cron is the only automatic executor.
 */

import { NextRequest, NextResponse } from 'next/server';

const mockTriggerPayout = jest.fn();
const mockManualPayout = jest.fn();

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

const txDb = {
  booking: { update: jest.fn() },
  contractor: { update: jest.fn() },
  auditLog: { create: jest.fn() },
};

const mockDb = {
  contractor: { findUnique: jest.fn() },
  contractorProfile: { findUnique: jest.fn() },
  booking: { findUnique: jest.fn() },
  $transaction: jest.fn(async (fn: (tx: typeof txDb) => Promise<unknown>) => fn(txDb)),
};
jest.mock('@/lib/get-tenant-db', () => ({ getTenantDb: () => mockDb }));

jest.mock('@/lib/email/client-notifications', () => ({
  sendBookingCompletedEmail: jest.fn().mockResolvedValue(undefined),
}));

// Every money-moving surface of the payout module is spied on — the route
// must call NONE of them.
jest.mock('@/lib/payments/contractor-payout', () => ({
  DISPUTE_WINDOW_DAYS: 30,
  triggerPayoutForBooking: (...args: unknown[]) => mockTriggerPayout(...args),
  manualPayoutToContractor: (...args: unknown[]) => mockManualPayout(...args),
}));

import { POST } from '@/app/api/contractor/jobs/[jobId]/complete/route';
import { authenticateRequest } from '@/lib/auth-middleware';

const mockAuth = authenticateRequest as jest.Mock;

const JOB_ID = 'booking_1';
const routeParams = { params: { jobId: JOB_ID } };

function completeReq(body: Record<string, unknown> = {}) {
  return new NextRequest(`http://localhost/api/contractor/jobs/${JOB_ID}/complete`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  mockAuth.mockResolvedValue({
    success: true,
    context: { user: { id: 'user_1', userType: 'CONTRACTOR' } },
  });
  mockDb.contractor.findUnique.mockResolvedValue({
    id: 'contractor_1',
    businessName: 'Acme Restoration',
  });
  mockDb.contractorProfile.findUnique.mockResolvedValue({
    stripeConnectAccountId: 'acct_123',
  });
  mockDb.booking.findUnique.mockResolvedValue({
    id: JOB_ID,
    status: 'IN_PROGRESS',
    contractorId: 'contractor_1',
    australianServiceType: 'WATER_DAMAGE',
    client: { name: 'Client A', email: 'client@example.com' },
    contractor: { id: 'contractor_1', businessName: 'Acme Restoration' },
  });
  txDb.booking.update.mockResolvedValue({
    id: JOB_ID,
    status: 'COMPLETED',
    completedAt: new Date(),
  });
  txDb.contractor.update.mockResolvedValue({});
  txDb.auditLog.create.mockResolvedValue({});
});

describe('POST /api/contractor/jobs/[jobId]/complete — deferred payout (DR-896)', () => {
  it('completes the job WITHOUT executing any payout, and reports the deferral', async () => {
    const res = await POST(completeReq(), routeParams);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.booking).toMatchObject({ id: JOB_ID, status: 'COMPLETED' });

    // Enqueue, never execute: no money path is touched at completion time.
    expect(mockTriggerPayout).not.toHaveBeenCalled();
    expect(mockManualPayout).not.toHaveBeenCalled();

    // The response tells the contractor the payout is deferred to the sweep.
    expect(body.payout).toMatchObject({ deferred: true });
    expect(body.payout.message).toContain('30-day dispute window');
  });

  it('still refuses to complete an already-COMPLETED job (no payout either)', async () => {
    mockDb.booking.findUnique.mockResolvedValue({
      id: JOB_ID,
      status: 'COMPLETED',
      contractorId: 'contractor_1',
      client: null,
      contractor: { id: 'contractor_1', businessName: 'Acme Restoration' },
    });

    const res = await POST(completeReq(), routeParams);

    expect(res.status).toBe(400);
    expect(mockTriggerPayout).not.toHaveBeenCalled();
  });

  it('unauthenticated callers get the auth response and no state change', async () => {
    mockAuth.mockResolvedValue({
      success: false,
      response: NextResponse.json({ error: 'unauthorized' }, { status: 401 }),
    });

    const res = await POST(completeReq(), routeParams);

    expect(res.status).toBe(401);
    expect(mockDb.$transaction).not.toHaveBeenCalled();
    expect(mockTriggerPayout).not.toHaveBeenCalled();
  });
});
