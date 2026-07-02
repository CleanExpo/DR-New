/**
 * @jest-environment node
 *
 * DR-904 — SPEC-vs-CODE GAP, pinned executable (characterization tests).
 *
 * The dispatch-eligibility spec requires:
 *   "WHEN any bid/match/dispatch path evaluates a contractor THEN it calls the
 *    one shared isDispatchEligible(contractorId) and reads only that flag."
 *
 * REALITY (origin/main at DR-904 time): the contractor-facing bid submission
 * route (`app/api/contractor/requests/[id]/bid/route.ts`) and the bid
 * accept/respond route (`app/api/contractor/bids/[matchId]/respond/route.ts`)
 * NEVER consult isDispatchEligible — an ineligible contractor gets a 200, not
 * a 403. This suite drives the REAL route handlers (boundaries mocked, per the
 * DR-897 callout-release pattern) and pins that gap so it is:
 *   1. visible and executable (not just a PR-body sentence), and
 *   2. LOUD when fixed — the moment enforcement lands, these tests fail and
 *      must be replaced by a per-gate 403 matrix (mock isDispatchEligible
 *      false → expect 403; true → expect the current happy paths).
 *
 * DO NOT "fix" the routes from this verification ticket (DR-904 is test-only).
 * The enforcement work is the escalated follow-up in the DR-904 PR body.
 */
import { NextRequest } from 'next/server';

// api-errors (pulled in by the bid route) imports @sentry/nextjs, which is not
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
  contractorProfile: { findUnique: jest.fn() },
  serviceRequest: { findUnique: jest.fn() },
  contractorMatch: { create: jest.fn(), findUnique: jest.fn(), update: jest.fn() },
  contractor: { findUnique: jest.fn() },
  booking: { findUnique: jest.fn() },
};
jest.mock('@/lib/get-tenant-db', () => ({ getTenantDb: () => mockDb }));

// rate-limit instantiates Upstash clients at module load — boundary-mock it.
jest.mock('@/src/lib/security/rate-limit', () => ({
  applyRateLimit: jest.fn(async () => ({ success: true, remaining: 4, resetIn: 600 })),
}));

// claim-intake imports enum VALUES from @prisma/client (generated client is
// absent on CI) — mocking the module keeps the suite off that path entirely.
jest.mock('@/lib/claim-intake', () => ({
  escalateToNextContractor: jest.fn(async () => false),
}));
jest.mock('@/lib/realtime/emit-handlers', () => ({ emitBidSubmitted: jest.fn() }));

// The canonical gate, spied: these tests PROVE the routes never call it.
const mockIsDispatchEligible = jest.fn();
const mockFilterDispatchEligible = jest.fn();
jest.mock('@/lib/services/dispatch-eligibility', () => ({
  isDispatchEligible: (...args: unknown[]) => mockIsDispatchEligible(...args),
  filterDispatchEligible: (...args: unknown[]) => mockFilterDispatchEligible(...args),
}));

import { POST as submitBid } from '@/app/api/contractor/requests/[id]/bid/route';
import { POST as respondToMatch } from '@/app/api/contractor/bids/[matchId]/respond/route';
import { authenticateRequest } from '@/lib/auth-middleware';

const mockAuth = authenticateRequest as jest.Mock;

// A contractor who would FAIL every dispatch-eligibility gate.
const INELIGIBLE_CONTRACTOR = { id: 'user_ineligible', userType: 'CONTRACTOR', name: 'No Gates Pass' };

function jsonReq(url: string, body: unknown) {
  return new NextRequest(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'content-type': 'application/json' },
  });
}

beforeEach(() => {
  mockAuth.mockResolvedValue({ success: true, context: { user: INELIGIBLE_CONTRACTOR } });
  // If a route ever DOES consult the gate, make it answer "ineligible" so the
  // correct post-fix behaviour (403) is what surfaces, not a false 200.
  mockIsDispatchEligible.mockResolvedValue(false);
  mockFilterDispatchEligible.mockResolvedValue(new Set());
});

describe('DR-904 GAP — POST /api/contractor/requests/[id]/bid ignores isDispatchEligible', () => {
  it('accepts a bid (200) from a fully-ineligible contractor and never consults the canonical gate [spec violation, pinned]', async () => {
    mockDb.contractorProfile.findUnique.mockResolvedValue({ id: 'profile_1' });
    mockDb.serviceRequest.findUnique.mockResolvedValue({ id: 'sr_1', status: 'PENDING' });
    mockDb.contractorMatch.create.mockResolvedValue({ id: 'bid_1', status: 'PENDING' });

    const res = await submitBid(
      jsonReq('http://localhost/api/contractor/requests/sr_1/bid', {
        budget: '$5,000',
        timeline: '2 weeks',
        message: 'We can start immediately with full WRT capability.',
      }),
      { params: { id: 'sr_1' } }
    );
    const body = await res.json();

    // SPEC says this must be 403 for an ineligible contractor. Today it is 200:
    // the route never asks the canonical gate. When enforcement lands, flip
    // these assertions to expect 403 + a per-gate matrix.
    expect(res.status).toBe(200);
    expect(body).toMatchObject({ success: true });
    expect(mockDb.contractorMatch.create).toHaveBeenCalledTimes(1); // bid was persisted
    expect(mockIsDispatchEligible).not.toHaveBeenCalled();
    expect(mockFilterDispatchEligible).not.toHaveBeenCalled();
  });
});

describe('DR-904 GAP — POST /api/contractor/bids/[matchId]/respond ignores isDispatchEligible', () => {
  it('lets a fully-ineligible contractor ACCEPT a job match (200) and never consults the canonical gate [spec violation, pinned]', async () => {
    mockDb.contractor.findUnique.mockResolvedValue({ id: 'c_1', businessName: 'No Gates Pass Pty Ltd' });
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

    const res = await respondToMatch(
      jsonReq('http://localhost/api/contractor/bids/match_1/respond', { response: 'ACCEPTED' }),
      { params: { matchId: 'match_1' } }
    );
    const body = await res.json();

    // SPEC says an ineligible contractor must not be dispatchable. Today the
    // accept path is 200 with the match flipped to ACCEPTED.
    expect(res.status).toBe(200);
    expect(body).toMatchObject({ success: true, response: 'ACCEPTED' });
    expect(mockDb.contractorMatch.update).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ status: 'ACCEPTED' }) })
    );
    expect(mockIsDispatchEligible).not.toHaveBeenCalled();
    expect(mockFilterDispatchEligible).not.toHaveBeenCalled();
  });
});
