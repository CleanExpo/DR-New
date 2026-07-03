/**
 * @jest-environment node
 *
 * DR-929 — NRPG_CONTRACTOR_GO_LIVE kill switch, signup surface.
 *
 * Rollback proof (the ticket's literal deliverable) driven against the REAL
 * `app/api/auth/register/route.ts` POST handler with prisma mocked at the
 * boundary (mirrors the DR-906 register-duplicate-race suite's pattern):
 *
 *   1. Flag OFF -> new CONTRACTOR signup is rejected (503), no DB write.
 *   2. Flag OFF -> CLIENT signup is UNAFFECTED (still 201) — the kill switch
 *      only stops new contractor go-live activity.
 *   3. Flag OFF -> an existing user's session/profile read
 *      (GET /api/auth/me) is UNAFFECTED — login/dashboard access is never
 *      gated by this flag.
 *   4. Flag back ON (env var removed) -> CONTRACTOR signup is restored to
 *      the pre-existing 201 happy path, proving the rollback is clean.
 */

jest.mock('@sentry/nextjs', () => ({ captureException: jest.fn() }), { virtual: true });

jest.mock('@/lib/prisma', () => {
  const tx = {
    user: { create: jest.fn() },
    contractor: { create: jest.fn() },
    contractorOnboarding: { create: jest.fn() },
  };
  return {
    prisma: {
      user: { findUnique: jest.fn() },
      $transaction: jest.fn(async (fn: (t: typeof tx) => Promise<unknown>) => fn(tx)),
      $tx: tx,
    },
  };
});

jest.mock('@/lib/api/redis-rate-limit', () => ({
  authRateLimiter: jest.fn().mockResolvedValue(null),
}));

const mockSendVerificationEmail = jest.fn();
jest.mock('@/lib/email/resend', () => ({
  sendVerificationEmail: (...args: unknown[]) => mockSendVerificationEmail(...args),
}));

jest.mock('bcryptjs', () => ({
  __esModule: true,
  default: { hash: jest.fn().mockResolvedValue('$2a$12$mocked-hash') },
}));

// GET /api/auth/me boundary — proves login/dashboard access is untouched.
const mockAuthenticateRequest = jest.fn();
jest.mock('@/lib/auth-middleware', () => ({
  authenticateRequest: (...args: unknown[]) => mockAuthenticateRequest(...args),
}));

import { NextRequest } from 'next/server';
import { POST as register } from '@/app/api/auth/register/route';
import { GET as me } from '@/app/api/auth/me/route';
import { prisma } from '@/lib/prisma';

type MockedTx = {
  user: { create: jest.Mock };
  contractor: { create: jest.Mock };
  contractorOnboarding: { create: jest.Mock };
};
type MockedPrisma = {
  user: { findUnique: jest.Mock };
  $transaction: jest.Mock;
  $tx: MockedTx;
};
const mockPrisma = prisma as unknown as MockedPrisma;
const mockTx = mockPrisma.$tx;

const ORIGINAL_FLAG = process.env.NRPG_CONTRACTOR_GO_LIVE;

function registerReq(overrides: Record<string, unknown> = {}): NextRequest {
  return new NextRequest('http://localhost/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email: 'killswitch@example.com',
      password: 'Password1',
      name: 'Kill Switch Contractor',
      userType: 'CONTRACTOR',
      consentAccepted: true,
      ...overrides,
    }),
    headers: { 'content-type': 'application/json' },
  });
}

function createdUser(userType = 'CONTRACTOR') {
  return {
    id: 'user_new',
    email: 'killswitch@example.com',
    name: 'Kill Switch Contractor',
    userType,
    avatar: null,
  };
}

beforeEach(() => {
  jest.clearAllMocks();
  mockPrisma.user.findUnique.mockResolvedValue(null);
  mockTx.user.create.mockResolvedValue(createdUser());
  mockTx.contractor.create.mockResolvedValue({});
  mockTx.contractorOnboarding.create.mockResolvedValue({});
  mockSendVerificationEmail.mockResolvedValue(undefined);
});

afterEach(() => {
  if (ORIGINAL_FLAG === undefined) {
    delete process.env.NRPG_CONTRACTOR_GO_LIVE;
  } else {
    process.env.NRPG_CONTRACTOR_GO_LIVE = ORIGINAL_FLAG;
  }
});

describe('DR-929 rollback proof — POST /api/auth/register', () => {
  it('flag OFF: new CONTRACTOR signup is rejected 503, nothing written to the DB', async () => {
    process.env.NRPG_CONTRACTOR_GO_LIVE = 'false';

    const res = await register(registerReq());
    const body = await res.json();

    expect(res.status).toBe(503);
    expect(body.error).toBe('SERVICE_UNAVAILABLE');
    expect(mockPrisma.$transaction).not.toHaveBeenCalled();
    expect(mockPrisma.user.findUnique).not.toHaveBeenCalled();
  });

  it('flag OFF: CLIENT signup is unaffected — still 201', async () => {
    process.env.NRPG_CONTRACTOR_GO_LIVE = 'false';
    mockTx.user.create.mockResolvedValue(createdUser('CLIENT'));

    const res = await register(registerReq({ userType: 'CLIENT' }));
    const body = await res.json();

    expect(res.status).toBe(201);
    expect(body.data.user.userType).toBe('CLIENT');
    expect(mockTx.contractor.create).not.toHaveBeenCalled();
  });

  it('flag OFF: existing session/profile access (GET /api/auth/me) is unaffected', async () => {
    process.env.NRPG_CONTRACTOR_GO_LIVE = 'false';
    mockAuthenticateRequest.mockResolvedValue({
      success: true,
      context: {
        user: {
          id: 'user_existing',
          email: 'existing-contractor@example.com',
          name: 'Existing Contractor',
          userType: 'CONTRACTOR',
          avatar: null,
          createdAt: new Date('2026-06-01'),
        },
      },
    });

    const res = await me(new NextRequest('http://localhost/api/auth/me'));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.data.user.email).toBe('existing-contractor@example.com');
  });

  it('rollback: flag back ON restores the pre-existing CONTRACTOR 201 happy path', async () => {
    // Off, then explicitly restored — the rollback itself under test.
    process.env.NRPG_CONTRACTOR_GO_LIVE = 'false';
    const killed = await register(registerReq());
    expect(killed.status).toBe(503);

    delete process.env.NRPG_CONTRACTOR_GO_LIVE;
    jest.clearAllMocks();
    mockPrisma.user.findUnique.mockResolvedValue(null);
    mockTx.user.create.mockResolvedValue(createdUser());
    mockTx.contractor.create.mockResolvedValue({});
    mockTx.contractorOnboarding.create.mockResolvedValue({});

    const restored = await register(registerReq());
    const body = await restored.json();

    expect(restored.status).toBe(201);
    expect(body.data.user.userType).toBe('CONTRACTOR');
    expect(mockTx.contractor.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ userId: 'user_new' }) })
    );
  });
});
