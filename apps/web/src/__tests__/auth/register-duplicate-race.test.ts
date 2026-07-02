/**
 * @jest-environment node
 *
 * Duplicate-signup race — the unique-constraint path (DR-906 — qa-test spec
 * delta "Concurrency/stress with quantified thresholds": parallel signups with
 * a duplicate email must leave EXACTLY ONE account and never 5xx).
 *
 * Drives the REAL `app/api/auth/register/route.ts` POST handler with prisma
 * mocked at the boundary:
 *
 *   1. Sequential duplicate -> 400 (pre-check path).
 *   2. RACE: both racers pass the pre-check (findUnique -> null for both);
 *      the loser's `tx.user.create` raises P2002 — the route must map it to
 *      the same 400, NOT the 500 the unguarded transaction used to produce.
 *   3. Two concurrent registrations resolve to exactly one 201 and one 400.
 *   4. Contractor signup creates the full lifecycle (User + Contractor +
 *      ContractorOnboarding keyed on User.id — DR-879 Option B).
 *   5. A client-supplied ADMIN role collapses to CLIENT (privilege negative).
 *
 * The live-fire twin of this suite is the k6 `signup_race` scenario in
 * `load-tests/scenarios/signup-eligibility.js`.
 */

jest.mock('@sentry/nextjs', () => ({ captureException: jest.fn() }), { virtual: true });

// Created inside the factory: imports are hoisted above module-scope consts.
// The transaction client is exposed as `$tx` so tests can program the race.
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

// bcrypt at 12 rounds is deliberately slow; grading is not under test here.
jest.mock('bcryptjs', () => ({
  __esModule: true,
  default: { hash: jest.fn().mockResolvedValue('$2a$12$mocked-hash') },
}));

import { NextRequest } from 'next/server';
import { POST } from '@/app/api/auth/register/route';
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

function registerReq(overrides: Record<string, unknown> = {}): NextRequest {
  return new NextRequest('http://localhost/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      email: 'racer@example.com',
      password: 'Password1',
      name: 'Race Contractor',
      userType: 'CONTRACTOR',
      consentAccepted: true,
      ...overrides,
    }),
    headers: { 'content-type': 'application/json' },
  });
}

function p2002(): Error & { code: string } {
  const err = new Error(
    'Unique constraint failed on the fields: (`email`)'
  ) as Error & { code: string };
  err.code = 'P2002';
  return err;
}

function createdUser(id = 'user_new') {
  return {
    id,
    email: 'racer@example.com',
    name: 'Race Contractor',
    userType: 'CONTRACTOR',
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

describe('POST /api/auth/register — duplicate email', () => {
  it('sequential duplicate: pre-check rejects with 400 and creates nothing', async () => {
    mockPrisma.user.findUnique.mockResolvedValue({ id: 'user_existing' });

    const res = await POST(registerReq());
    const body = await res.json();

    expect(res.status).toBe(400);
    expect(body.error?.message ?? body.message).toMatch(/already exists/i);
    expect(mockPrisma.$transaction).not.toHaveBeenCalled();
  });

  it('RACE loser: pre-check passed but the unique constraint fires -> 400, never 500', async () => {
    // Both racers saw findUnique -> null; this racer loses the insert.
    mockTx.user.create.mockRejectedValue(p2002());

    const res = await POST(registerReq());
    const body = await res.json();

    expect(res.status).toBe(400);
    expect(body.error?.message ?? body.message).toMatch(/already exists/i);
    // The loser must not half-create the contractor lifecycle.
    expect(mockTx.contractor.create).not.toHaveBeenCalled();
    expect(mockTx.contractorOnboarding.create).not.toHaveBeenCalled();
    expect(mockSendVerificationEmail).not.toHaveBeenCalled();
  });

  it('non-P2002 transaction failures still surface as 500 (not silently swallowed)', async () => {
    mockTx.user.create.mockRejectedValue(new Error('connection reset'));

    const res = await POST(registerReq());

    expect(res.status).toBe(500);
  });

  it('two CONCURRENT registrations for one email -> exactly one 201 and one 400', async () => {
    // Winner's insert resolves; loser's insert hits the unique constraint.
    mockTx.user.create
      .mockResolvedValueOnce(createdUser('user_winner'))
      .mockRejectedValueOnce(p2002());

    const [resA, resB] = await Promise.all([POST(registerReq()), POST(registerReq())]);
    const statuses = [resA.status, resB.status].sort();

    expect(statuses).toEqual([201, 400]);
    // Exactly one account creation attempt succeeded.
    expect(mockTx.user.create).toHaveBeenCalledTimes(2);
    const winner = await (resA.status === 201 ? resA : resB).json();
    expect(winner.data.user.id).toBe('user_winner');
  });
});

describe('POST /api/auth/register — contractor lifecycle & role collapse', () => {
  it('contractor signup creates Contractor + ContractorOnboarding keyed on User.id', async () => {
    const res = await POST(registerReq());
    const body = await res.json();

    expect(res.status).toBe(201);
    expect(body.data.user.userType).toBe('CONTRACTOR');
    expect(mockTx.contractor.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ userId: 'user_new' }) })
    );
    expect(mockTx.contractorOnboarding.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ contractorId: 'user_new' }) })
    );
  });

  it('a client-supplied ADMIN role collapses to CLIENT with no contractor lifecycle', async () => {
    mockTx.user.create.mockResolvedValue({ ...createdUser(), userType: 'CLIENT' });

    const res = await POST(registerReq({ userType: 'ADMIN' }));

    expect(res.status).toBe(201);
    expect(mockTx.user.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ userType: 'CLIENT' }) })
    );
    expect(mockTx.contractor.create).not.toHaveBeenCalled();
    expect(mockTx.contractorOnboarding.create).not.toHaveBeenCalled();
  });

  it('missing consent is rejected by validation before any DB access', async () => {
    const res = await POST(registerReq({ consentAccepted: false }));

    expect(res.status).toBe(400);
    expect(mockPrisma.user.findUnique).not.toHaveBeenCalled();
    expect(mockPrisma.$transaction).not.toHaveBeenCalled();
  });
});
