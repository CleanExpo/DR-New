/**
 * @jest-environment node
 *
 * DR-925 — dispatch-eligibility ENFORCEMENT on the direct bid surfaces.
 *
 * Supersedes DR-904's pinned characterization suite
 * (`bid-route-eligibility-gap.test.ts`, PR #205), which proved the gap: the
 * bid submit route and the bid accept/respond route returned 200 for a
 * fully-ineligible contractor and never consulted the canonical gate.
 *
 * These are the flipped enforcement tests the DR-904 suite demanded:
 *   - ineligible → 403 with the shared structured payload, gate consulted,
 *     nothing persisted;
 *   - eligible   → the pre-existing happy path proceeds unchanged;
 *   - DECLINED   → deliberately exempt (declining grants nothing and frees
 *     the job for escalation), pinned here so the carve-out is executable.
 *
 * Boundaries are mocked per the DR-897 callout-release pattern; the REAL
 * route handlers are driven.
 */
import { NextRequest } from 'next/server';

// api-errors imports @sentry/nextjs, which is not resolvable under test; it
// only calls captureException.
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
// absent on CI) — mocking the module keeps this suite off that path entirely.
jest.mock('@/lib/claim-intake', () => ({
  escalateToNextContractor: jest.fn(async () => false),
}));
jest.mock('@/lib/realtime/emit-handlers', () => ({ emitBidSubmitted: jest.fn() }));

// The canonical gate (spec N-04): mocked so each test dictates eligibility.
const mockIsDispatchEligible = jest.fn();
const mockFilterDispatchEligible = jest.fn();
jest.mock('@/lib/services/dispatch-eligibility', () => ({
  isDispatchEligible: (...args: unknown[]) => mockIsDispatchEligible(...args),
  filterDispatchEligible: (...args: unknown[]) => mockFilterDispatchEligible(...args),
}));

import { POST as submitBid } from '@/app/api/contractor/requests/[id]/bid/route';
import { POST as respondToMatch } from '@/app/api/contractor/bids/[matchId]/respond/route';
import { authenticateRequest } from '@/lib/auth-middleware';
// Dependency-free module — the REAL payload contract, not a mock.
import { DISPATCH_INELIGIBLE_ERROR } from '@/lib/services/dispatch-eligibility-error';

const mockAuth = authenticateRequest as jest.Mock;

const CONTRACTOR = { id: 'user_c1', userType: 'CONTRACTOR', name: 'Gate Tested' };

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
    { params: Promise.resolve({ id: 'sr_1' }) }
  );
}

function respond(response: 'ACCEPTED' | 'DECLINED' | 'COUNTER_OFFER', extra: object = {}) {
  return respondToMatch(
    jsonReq('http://localhost/api/contractor/bids/match_1/respond', { response, ...extra }),
    { params: Promise.resolve({ matchId: 'match_1' }) }
  );
}

/** The shared DR-925 403 contract: generic, structured, links to the
 *  contractor's own status surface — never enumerates which gate failed. */
function expectIneligible403(status: number, body: Record<string, unknown>) {
  expect(status).toBe(403);
  expect(body).toMatchObject({
    error: 'FORBIDDEN',
    message: DISPATCH_INELIGIBLE_ERROR.message,
    details: {
      reason: DISPATCH_INELIGIBLE_ERROR.reason,
      link: DISPATCH_INELIGIBLE_ERROR.link,
    },
  });
}

beforeEach(() => {
  mockAuth.mockResolvedValue({ success: true, context: { user: CONTRACTOR } });
});

describe('DR-925 — POST /api/contractor/requests/[id]/bid enforces isDispatchEligible', () => {
  it('refuses (403, structured payload) an ineligible contractor and persists nothing', async () => {
    seedSubmitHappyPath();
    mockIsDispatchEligible.mockResolvedValue(false);

    const res = await submit();
    const body = await res.json();

    expectIneligible403(res.status, body);
    expect(mockIsDispatchEligible).toHaveBeenCalledWith(CONTRACTOR.id);
    expect(mockDb.contractorMatch.create).not.toHaveBeenCalled();
  });

  it('lets an eligible contractor bid — the pre-existing happy path is unchanged', async () => {
    seedSubmitHappyPath();
    mockIsDispatchEligible.mockResolvedValue(true);

    const res = await submit();
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toMatchObject({ success: true });
    expect(mockIsDispatchEligible).toHaveBeenCalledWith(CONTRACTOR.id);
    expect(mockDb.contractorMatch.create).toHaveBeenCalledTimes(1);
  });
});

describe('DR-925 — POST /api/contractor/bids/[matchId]/respond enforces isDispatchEligible', () => {
  it('refuses (403, structured payload) an ineligible contractor ACCEPTING a match; the match is untouched', async () => {
    seedRespondHappyPath();
    mockIsDispatchEligible.mockResolvedValue(false);

    const res = await respond('ACCEPTED');
    const body = await res.json();

    expectIneligible403(res.status, body);
    expect(mockIsDispatchEligible).toHaveBeenCalledWith(CONTRACTOR.id);
    expect(mockDb.contractorMatch.update).not.toHaveBeenCalled();
  });

  it('refuses (403) an ineligible contractor COUNTER_OFFERing — a counter-offer is a bid', async () => {
    seedRespondHappyPath();
    mockIsDispatchEligible.mockResolvedValue(false);

    const res = await respond('COUNTER_OFFER', { counterAmount: 6000, counterTimeline: '3 weeks' });
    const body = await res.json();

    expectIneligible403(res.status, body);
    expect(mockDb.contractorMatch.update).not.toHaveBeenCalled();
  });

  it('lets an eligible contractor ACCEPT — the pre-existing happy path is unchanged', async () => {
    seedRespondHappyPath();
    mockIsDispatchEligible.mockResolvedValue(true);

    const res = await respond('ACCEPTED');
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toMatchObject({ success: true, response: 'ACCEPTED' });
    expect(mockIsDispatchEligible).toHaveBeenCalledWith(CONTRACTOR.id);
    expect(mockDb.contractorMatch.update).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ status: 'ACCEPTED' }) })
    );
  });

  it('still lets an ineligible contractor DECLINE (carve-out: declining grants nothing and frees the job)', async () => {
    seedRespondHappyPath();
    mockIsDispatchEligible.mockResolvedValue(false);

    const res = await respond('DECLINED');
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toMatchObject({ success: true, response: 'DECLINED' });
    // The gate is not consulted for DECLINED — the exemption is deliberate.
    expect(mockIsDispatchEligible).not.toHaveBeenCalled();
    expect(mockDb.contractorMatch.update).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ status: 'REJECTED' }) })
    );
  });
});
