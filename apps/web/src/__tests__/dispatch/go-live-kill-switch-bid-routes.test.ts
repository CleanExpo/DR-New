/**
 * @jest-environment node
 *
 * DR-929 — NRPG_CONTRACTOR_GO_LIVE kill switch, bid submit + accept surfaces.
 *
 * Rollback proof driven against the REAL route handlers (mirrors the DR-925
 * bid-route-eligibility-enforcement suite's boundary-mock pattern):
 *
 *   1. Flag OFF -> bid submit is refused 503, nothing persisted.
 *   2. Flag OFF -> bid ACCEPTED / COUNTER_OFFER is refused 503, match untouched.
 *   3. Flag OFF -> bid DECLINED still succeeds (carve-out: frees the job).
 *   4. Flag back ON -> both routes' pre-existing happy paths are restored.
 */
import { NextRequest } from 'next/server';

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
  contractorProfile: { findUnique: jest.fn() },
  serviceRequest: { findUnique: jest.fn() },
  contractorMatch: { create: jest.fn(), findUnique: jest.fn(), update: jest.fn() },
  contractor: { findUnique: jest.fn() },
  booking: { findUnique: jest.fn() },
};
jest.mock('@/lib/get-tenant-db', () => ({ getTenantDb: () => mockDb }));

jest.mock('@/src/lib/security/rate-limit', () => ({
  applyRateLimit: jest.fn(async () => ({ success: true, remaining: 4, resetIn: 600 })),
}));

// claim-intake imports enum VALUES from @prisma/client (generated client is
// absent on CI) — mocking the module keeps this suite off that path entirely.
jest.mock('@/lib/claim-intake', () => ({
  escalateToNextContractor: jest.fn(async () => false),
}));
jest.mock('@/lib/realtime/emit-handlers', () => ({ emitBidSubmitted: jest.fn() }));

// The canonical DR-925 gate always says eligible — this suite is about the
// go-live kill switch, a layer above it.
jest.mock('@/lib/services/dispatch-eligibility', () => ({
  isDispatchEligible: jest.fn(async () => true),
  filterDispatchEligible: jest.fn(async () => new Set()),
}));

import { POST as submitBid } from '@/app/api/contractor/requests/[id]/bid/route';
import { POST as respondToMatch } from '@/app/api/contractor/bids/[matchId]/respond/route';
import { authenticateRequest } from '@/lib/auth-middleware';

const mockAuth = authenticateRequest as jest.Mock;
const CONTRACTOR = { id: 'user_c1', userType: 'CONTRACTOR', name: 'Gate Tested' };
const ORIGINAL_FLAG = process.env.NRPG_CONTRACTOR_GO_LIVE;

function jsonReq(url: string, body: unknown) {
  return new NextRequest(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'content-type': 'application/json' },
  });
}

function seedSubmitHappyPath() {
  mockDb.contractorProfile.findUnique.mockResolvedValue({ id: 'profile_1' });
  mockDb.serviceRequest.findUnique.mockResolvedValue({ id: 'sr_1', status: 'PENDING' });
  mockDb.contractorMatch.create.mockResolvedValue({ id: 'bid_1', status: 'PENDING' });
}

function seedRespondHappyPath() {
  mockDb.contractor.findUnique.mockResolvedValue({ id: 'c_1', businessName: 'Gate Tested Pty Ltd' });
  mockDb.contractorMatch.findUnique.mockResolvedValue({
    id: 'match_1',
    contractorId: 'c_1',
    contractorResponse: null,
    responseDeadline: null,
    serviceRequestId: 'sr_1',
    contractorMessage: null,
  });
  mockDb.contractorMatch.update.mockResolvedValue({
    id: 'match_1',
    contractorRespondedAt: new Date(),
  });
  mockDb.booking.findUnique.mockResolvedValue(null); // skip realtime emit path
}

function submit() {
  return submitBid(
    jsonReq('http://localhost/api/contractor/requests/sr_1/bid', {
      budget: '$5,000',
      timeline: '2 weeks',
      message: 'We can start immediately with full WRT capability.',
    }),
    { params: { id: 'sr_1' } }
  );
}

function respond(response: 'ACCEPTED' | 'DECLINED' | 'COUNTER_OFFER', extra: object = {}) {
  return respondToMatch(
    jsonReq('http://localhost/api/contractor/bids/match_1/respond', { response, ...extra }),
    { params: { matchId: 'match_1' } }
  );
}

beforeEach(() => {
  mockAuth.mockResolvedValue({ success: true, context: { user: CONTRACTOR } });
});

afterEach(() => {
  if (ORIGINAL_FLAG === undefined) {
    delete process.env.NRPG_CONTRACTOR_GO_LIVE;
  } else {
    process.env.NRPG_CONTRACTOR_GO_LIVE = ORIGINAL_FLAG;
  }
});

describe('DR-929 rollback proof — POST /api/contractor/requests/[id]/bid', () => {
  it('flag OFF: bid submission refused 503, nothing persisted', async () => {
    process.env.NRPG_CONTRACTOR_GO_LIVE = 'false';
    seedSubmitHappyPath();

    const res = await submit();
    const body = await res.json();

    expect(res.status).toBe(503);
    expect(body.error).toBe('SERVICE_UNAVAILABLE');
    expect(mockDb.contractorMatch.create).not.toHaveBeenCalled();
  });

  it('flag ON (default/unset): bid submission still succeeds — pre-existing happy path', async () => {
    delete process.env.NRPG_CONTRACTOR_GO_LIVE;
    seedSubmitHappyPath();

    const res = await submit();
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(mockDb.contractorMatch.create).toHaveBeenCalledTimes(1);
  });
});

describe('DR-929 rollback proof — POST /api/contractor/bids/[matchId]/respond', () => {
  it('flag OFF: ACCEPTED refused 503, match untouched', async () => {
    process.env.NRPG_CONTRACTOR_GO_LIVE = 'false';
    seedRespondHappyPath();

    const res = await respond('ACCEPTED');
    const body = await res.json();

    expect(res.status).toBe(503);
    expect(body.error).toBe('SERVICE_UNAVAILABLE');
    expect(mockDb.contractorMatch.update).not.toHaveBeenCalled();
  });

  it('flag OFF: COUNTER_OFFER refused 503, match untouched', async () => {
    process.env.NRPG_CONTRACTOR_GO_LIVE = 'false';
    seedRespondHappyPath();

    const res = await respond('COUNTER_OFFER', { counterAmount: 6000, counterTimeline: '3 weeks' });
    const body = await res.json();

    expect(res.status).toBe(503);
    expect(mockDb.contractorMatch.update).not.toHaveBeenCalled();
  });

  it('flag OFF: DECLINED is exempt — still succeeds (frees the job, grants nothing)', async () => {
    process.env.NRPG_CONTRACTOR_GO_LIVE = 'false';
    seedRespondHappyPath();

    const res = await respond('DECLINED');
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toMatchObject({ success: true, response: 'DECLINED' });
    expect(mockDb.contractorMatch.update).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ status: 'REJECTED' }) })
    );
  });

  it('rollback: flag back ON restores the ACCEPTED happy path', async () => {
    process.env.NRPG_CONTRACTOR_GO_LIVE = 'false';
    seedRespondHappyPath();
    const killed = await respond('ACCEPTED');
    expect(killed.status).toBe(503);

    delete process.env.NRPG_CONTRACTOR_GO_LIVE;
    jest.clearAllMocks();
    mockAuth.mockResolvedValue({ success: true, context: { user: CONTRACTOR } });
    seedRespondHappyPath();

    const restored = await respond('ACCEPTED');
    const body = await restored.json();

    expect(restored.status).toBe(200);
    expect(body).toMatchObject({ success: true, response: 'ACCEPTED' });
    expect(mockDb.contractorMatch.update).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ status: 'ACCEPTED' }) })
    );
  });
});
