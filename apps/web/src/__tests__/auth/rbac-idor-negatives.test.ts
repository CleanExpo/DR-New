/**
 * @jest-environment node
 *
 * RBAC / IDOR negative sweep across contractor-scoped and admin routes
 * (DR-906 — qa-test spec delta "Access control — RBAC and IDOR negative tests").
 *
 * Drives the REAL route handlers with auth/db mocked at the boundary:
 *
 *   Admin surface:
 *     - POST /api/admin/contractor-verification/action : CONTRACTOR/CLIENT -> 403, unauth -> 401
 *     - GET  /api/admin/contractor-verification/pending: CONTRACTOR -> 403
 *   Contractor surface:
 *     - GET  /api/contractor/eligibility     : unauth -> 401, CLIENT -> 403
 *     - GET  /api/contractor/payout-settings : unauth -> 401, CLIENT -> 404 (no leak)
 *   IDOR (cross-owner):
 *     - GET  /api/contractor/agreement/pdf/[acceptanceId]: contractor A on B's
 *       acceptance -> 403 and the signed URL is NEVER minted; ADMIN allowed.
 *   ICA gate:
 *     - POST /api/contractor/agreement/accept: unauth -> 401, CLIENT -> 403,
 *       unverified-email contractor -> 403 (email-verify gates the ICA).
 *
 * DELIBERATE EXCLUSIONS (owned elsewhere, do not duplicate):
 *   - /api/contractor/requests/[id]/bid and /api/contractor/bids/[matchId]/respond
 *     are being reworked under DR-925; their RBAC/eligibility negatives live in
 *     `src/__tests__/dispatch/bid-route-eligibility-gap.test.ts` and DR-925's PR.
 *   - The single-missing-gate eligibility matrix is proven in
 *     `src/__tests__/dispatch/single-missing-gate-matrix.test.ts` (DR-904, PR #205).
 */

import { NextRequest, NextResponse } from 'next/server';

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
  contractor: { findUnique: jest.fn(), findMany: jest.fn(), update: jest.fn() },
  contractorProfile: { findUnique: jest.fn() },
  payment: { aggregate: jest.fn() },
  contractorPayout: { aggregate: jest.fn(), findMany: jest.fn() },
};
jest.mock('@/lib/get-tenant-db', () => ({ getTenantDb: () => mockDb }));

// Created inside the factory: imports are hoisted above module-scope consts.
jest.mock('@/lib/prisma', () => ({
  prisma: {
    contractorAgreementAcceptance: { findUnique: jest.fn(), findFirst: jest.fn() },
    contractorProfile: { findUnique: jest.fn() },
  },
}));

const mockGetPresignedDownloadUrl = jest.fn();
jest.mock('@/lib/storage/cloud-storage', () => ({
  getPresignedDownloadUrl: (...args: unknown[]) => mockGetPresignedDownloadUrl(...args),
  uploadFile: jest.fn(),
}));

jest.mock('@/lib/services/email.service', () => ({
  sendVerificationApprovedEmail: jest.fn(),
  sendVerificationRejectedEmail: jest.fn(),
  sendRequestMoreInfoEmail: jest.fn(),
}));
jest.mock('@/lib/services/audit.service', () => ({
  logContractorVerification: jest.fn(),
}));
jest.mock('@/lib/services/contractor-eligibility.service', () => ({
  checkContractorEligibility: jest.fn().mockResolvedValue({ isEligible: false }),
  getEligibilityMessage: jest.fn().mockReturnValue('not eligible'),
}));
jest.mock('@/lib/legal/ica-pdf', () => ({ generateIcaPdf: jest.fn() }));
jest.mock('@/lib/legal/ica-hash', () => ({ getIcaDocumentHash: jest.fn().mockReturnValue('hash') }));

import { POST as adminActionPOST } from '@/app/api/admin/contractor-verification/action/route';
import { GET as adminPendingGET } from '@/app/api/admin/contractor-verification/pending/route';
import { GET as eligibilityGET } from '@/app/api/contractor/eligibility/route';
import { GET as payoutSettingsGET } from '@/app/api/contractor/payout-settings/route';
import { GET as agreementPdfGET } from '@/app/api/contractor/agreement/pdf/[acceptanceId]/route';
import { POST as agreementAcceptPOST } from '@/app/api/contractor/agreement/accept/route';
import { authenticateRequest } from '@/lib/auth-middleware';
import { prisma } from '@/lib/prisma';

const mockAuth = authenticateRequest as jest.Mock;
type MockedPrisma = {
  contractorAgreementAcceptance: { findUnique: jest.Mock; findFirst: jest.Mock };
  contractorProfile: { findUnique: jest.Mock };
};
const mockPrisma = prisma as unknown as MockedPrisma;

const CONTRACTOR_A = { id: 'user_contractor_a', userType: 'CONTRACTOR', isEmailVerified: true };
const CONTRACTOR_UNVERIFIED = { id: 'user_contractor_u', userType: 'CONTRACTOR', isEmailVerified: false };
const CLIENT = { id: 'user_client', userType: 'CLIENT', isEmailVerified: true };
const ADMIN = { id: 'user_admin', userType: 'ADMIN', isEmailVerified: true };

function asUser(user: Record<string, unknown>) {
  mockAuth.mockResolvedValue({ success: true, context: { user } });
}

function asUnauthenticated() {
  mockAuth.mockResolvedValue({
    success: false,
    response: NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 }),
  });
}

function req(url: string, method = 'GET', body?: unknown): NextRequest {
  return new NextRequest(`http://localhost${url}`, {
    method,
    ...(body !== undefined
      ? { body: JSON.stringify(body), headers: { 'content-type': 'application/json' } }
      : {}),
  });
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe('RBAC — admin verification surface', () => {
  const actionBody = { contractorId: 'contractor_b', action: 'approve' };

  it.each([
    ['CONTRACTOR', CONTRACTOR_A],
    ['CLIENT', CLIENT],
  ])('POST /api/admin/contractor-verification/action as %s -> 403, db untouched', async (_role, user) => {
    asUser(user);

    const res = await adminActionPOST(req('/api/admin/contractor-verification/action', 'POST', actionBody));

    expect(res.status).toBe(403);
    expect(mockDb.contractor.findUnique).not.toHaveBeenCalled();
    expect(mockDb.contractor.update).not.toHaveBeenCalled();
  });

  it('POST action unauthenticated -> 401, db untouched', async () => {
    asUnauthenticated();

    const res = await adminActionPOST(req('/api/admin/contractor-verification/action', 'POST', actionBody));

    expect(res.status).toBe(401);
    expect(mockDb.contractor.findUnique).not.toHaveBeenCalled();
  });

  it('GET /api/admin/contractor-verification/pending as CONTRACTOR -> 403, queue not read', async () => {
    asUser(CONTRACTOR_A);

    const res = await adminPendingGET(req('/api/admin/contractor-verification/pending'));

    expect(res.status).toBe(403);
    expect(mockDb.contractor.findMany).not.toHaveBeenCalled();
  });
});

describe('RBAC — contractor surface', () => {
  it('GET /api/contractor/eligibility unauthenticated -> 401', async () => {
    asUnauthenticated();

    const res = await eligibilityGET(req('/api/contractor/eligibility'));

    expect(res.status).toBe(401);
  });

  it('GET /api/contractor/eligibility as CLIENT -> 403 (role gate)', async () => {
    asUser(CLIENT);

    const res = await eligibilityGET(req('/api/contractor/eligibility'));

    expect(res.status).toBe(403);
  });

  it('GET /api/contractor/payout-settings unauthenticated -> 401', async () => {
    asUnauthenticated();

    const res = await payoutSettingsGET(req('/api/contractor/payout-settings'));

    expect(res.status).toBe(401);
    expect(mockDb.contractor.findUnique).not.toHaveBeenCalled();
  });

  it('GET /api/contractor/payout-settings as CLIENT -> 404 with no financial fields leaked', async () => {
    asUser(CLIENT);
    mockDb.contractor.findUnique.mockResolvedValue(null); // no contractor row for a client

    const res = await payoutSettingsGET(req('/api/contractor/payout-settings'));
    const body = await res.json();

    expect(res.status).toBe(404);
    expect(JSON.stringify(body)).not.toMatch(/amountAUD|stripeConnect|earnings/i);
    expect(mockDb.contractorPayout.aggregate).not.toHaveBeenCalled();
  });
});

describe('IDOR — cross-owner agreement PDF', () => {
  const params = { params: { acceptanceId: 'acc_of_contractor_b' } };

  it("contractor A requesting B's executed ICA -> 403 and the signed URL is never minted", async () => {
    asUser(CONTRACTOR_A);
    mockPrisma.contractorAgreementAcceptance.findUnique.mockResolvedValue({
      contractorId: 'user_contractor_b',
      signedPdfUrl: 'ica/user_contractor_b/executed.pdf',
    });

    const res = await agreementPdfGET(req('/api/contractor/agreement/pdf/acc_of_contractor_b'), params);
    const body = await res.json();

    expect(res.status).toBe(403);
    expect(mockGetPresignedDownloadUrl).not.toHaveBeenCalled();
    expect(JSON.stringify(body)).not.toContain('executed.pdf');
  });

  it('unauthenticated -> 401, acceptance row never read', async () => {
    asUnauthenticated();

    const res = await agreementPdfGET(req('/api/contractor/agreement/pdf/acc_of_contractor_b'), params);

    expect(res.status).toBe(401);
    expect(mockPrisma.contractorAgreementAcceptance.findUnique).not.toHaveBeenCalled();
  });

  it('missing acceptance -> 404 (no existence oracle for other ids)', async () => {
    asUser(CONTRACTOR_A);
    mockPrisma.contractorAgreementAcceptance.findUnique.mockResolvedValue(null);

    const res = await agreementPdfGET(req('/api/contractor/agreement/pdf/acc_missing'), {
      params: { acceptanceId: 'acc_missing' },
    });

    expect(res.status).toBe(404);
  });

  it('ADMIN may fetch any acceptance (positive control: gate is ownership, not a dead route)', async () => {
    asUser(ADMIN);
    mockPrisma.contractorAgreementAcceptance.findUnique.mockResolvedValue({
      contractorId: 'user_contractor_b',
      signedPdfUrl: 'ica/user_contractor_b/executed.pdf',
    });
    mockGetPresignedDownloadUrl.mockResolvedValue('https://signed.example/url?ttl=300');

    const res = await agreementPdfGET(req('/api/contractor/agreement/pdf/acc_of_contractor_b'), params);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.data.url).toContain('https://signed.example/url');
    expect(body.data.expiresIn).toBe(300);
  });
});

describe('ICA accept — role and email-verification gates', () => {
  const acceptBody = {
    version: '1.0.0',
    signedName: 'Race Contractor',
    scrolledToEnd: true,
    agreed: true,
  };

  it('unauthenticated -> 401', async () => {
    asUnauthenticated();

    const res = await agreementAcceptPOST(req('/api/contractor/agreement/accept', 'POST', acceptBody));

    expect(res.status).toBe(401);
  });

  it('CLIENT -> 403 (only contractors can sign)', async () => {
    asUser(CLIENT);

    const res = await agreementAcceptPOST(req('/api/contractor/agreement/accept', 'POST', acceptBody));

    expect(res.status).toBe(403);
    expect(mockPrisma.contractorAgreementAcceptance.findFirst).not.toHaveBeenCalled();
  });

  it('unverified-email contractor -> 403 (email verification gates the ICA)', async () => {
    asUser(CONTRACTOR_UNVERIFIED);

    const res = await agreementAcceptPOST(req('/api/contractor/agreement/accept', 'POST', acceptBody));
    const body = await res.json();

    expect(res.status).toBe(403);
    expect(body.error).toMatch(/verify your email/i);
  });
});
