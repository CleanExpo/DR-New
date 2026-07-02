/**
 * @jest-environment node
 *
 * Failed-login lockout (DR-906 — qa-test spec delta "Failed-login lockout verified").
 *
 * Drives the REAL NextAuth credentials `authorize` path from `lib/auth.ts`
 * with the REAL `lockout.service.ts` (prisma mocked at the boundary):
 *
 *   1. A wrong password records a failed attempt (no lock below threshold)
 *      and rejects WITHOUT throwing — the credentials path never 5xxes.
 *   2. The threshold-th failure (5) sets `lockedUntil` ~30 minutes out.
 *   3. A locked account is rejected even with the CORRECT password, and the
 *      lockout is audit-logged.
 *   4. An expired lock self-clears: the next check unlocks the account.
 *   5. A successful login resets the failure counter and clears the lock.
 *   6. Even a database failure while recording the attempt cannot turn a
 *      wrong password into a thrown error (the 5xx-on-bad-password regression).
 */

import bcrypt from 'bcryptjs';

jest.mock('@sentry/nextjs', () => ({ captureException: jest.fn() }), { virtual: true });

// lib/auth.ts runs these at module load; they must not require real secrets.
jest.mock('@/lib/config/secrets-validation', () => ({ validateSecrets: jest.fn() }));
jest.mock('@/lib/config/development-defaults', () => ({ validateProductionDefaults: jest.fn() }));

jest.mock('@/lib/services/audit.service', () => ({
  logLoginAttempt: jest.fn().mockResolvedValue(undefined),
  logAccountLockout: jest.fn().mockResolvedValue(undefined),
}));

// The mock object is created INSIDE the factory (imports are hoisted above
// module-scope consts, so an outer const would hit the TDZ when the factory
// runs during the route's own import).
jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
    },
    loginAttempt: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import {
  isAccountLocked,
  recordFailedLoginAttempt,
  recordSuccessfulLogin,
  DEFAULT_LOCKOUT_CONFIG,
} from '@/lib/services/lockout.service';
import { logAccountLockout, logLoginAttempt } from '@/lib/services/audit.service';

type MockedPrisma = {
  user: { findUnique: jest.Mock; update: jest.Mock; findMany: jest.Mock };
  loginAttempt: { create: jest.Mock; findMany: jest.Mock };
};
const mockPrisma = prisma as unknown as MockedPrisma;

const THRESHOLD = DEFAULT_LOCKOUT_CONFIG.maxFailedAttempts; // 5
const LOCK_MINUTES = DEFAULT_LOCKOUT_CONFIG.lockoutDurationMinutes; // 30

// Resolve the credentials provider's authorize regardless of how next-auth
// nests the user config on the provider object.
function getAuthorize(): (credentials: Record<string, string>, req: unknown) => Promise<unknown> {
  const provider = authOptions.providers.find((p: { id?: string; type?: string }) =>
    p.type === 'credentials' || p.id === 'credentials'
  ) as unknown as {
    authorize?: (c: Record<string, string>, r: unknown) => Promise<unknown>;
    options?: { authorize?: (c: Record<string, string>, r: unknown) => Promise<unknown> };
  };
  // next-auth v4 keeps the USER config under `.options`; the top-level
  // `.authorize` is the provider default stub. Prefer the real one.
  const authorize = provider?.options?.authorize ?? provider?.authorize;
  if (!authorize) throw new Error('credentials authorize not found on authOptions');
  return authorize;
}

const fakeReq = {
  headers: {
    get: (name: string) =>
      name === 'x-forwarded-for' ? '203.0.113.10' : name === 'user-agent' ? 'jest-dr906' : null,
  },
};

let PASSWORD_HASH: string;

function baseUser(overrides: Record<string, unknown> = {}) {
  return {
    id: 'user_lockout_1',
    email: 'lockout@example.com',
    password: PASSWORD_HASH,
    name: 'Lockout Test',
    userType: 'CONTRACTOR',
    avatar: null,
    isActive: true,
    isBlocked: false,
    lockedUntil: null,
    tenantId: null,
    failedLoginAttempts: 0,
    lastFailedLoginAt: null,
    ...overrides,
  };
}

beforeAll(async () => {
  // Cheap rounds: the tests assert control flow, not hash strength.
  PASSWORD_HASH = await bcrypt.hash('CorrectHorse1', 4);
});

beforeEach(() => {
  jest.clearAllMocks();
  mockPrisma.user.update.mockResolvedValue({});
  mockPrisma.loginAttempt.create.mockResolvedValue({});
});

describe('authorize — wrong password below the threshold', () => {
  it('rejects (null), increments the counter, and does NOT lock', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(baseUser({ failedLoginAttempts: 0 }));

    const result = await getAuthorize()(
      { email: 'lockout@example.com', password: 'WrongPass1' },
      fakeReq
    );

    expect(result).toBeNull();
    expect(mockPrisma.user.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'user_lockout_1' },
        data: expect.objectContaining({
          failedLoginAttempts: 1,
          lockedUntil: null,
        }),
      })
    );
    expect(mockPrisma.loginAttempt.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ success: false }) })
    );
    expect(logLoginAttempt).toHaveBeenCalledWith(
      'user_lockout_1',
      false,
      '203.0.113.10',
      'jest-dr906',
      { locked: false }
    );
  });

  it(`locks on the ${THRESHOLD}th failure with lockedUntil ~${LOCK_MINUTES}min out`, async () => {
    const before = Date.now();
    mockPrisma.user.findUnique.mockResolvedValue(
      baseUser({ failedLoginAttempts: THRESHOLD - 1 })
    );

    const result = await getAuthorize()(
      { email: 'lockout@example.com', password: 'WrongPass1' },
      fakeReq
    );

    expect(result).toBeNull();
    const updateArg = mockPrisma.user.update.mock.calls[0][0];
    expect(updateArg.data.failedLoginAttempts).toBe(THRESHOLD);
    expect(updateArg.data.lockedUntil).toBeInstanceOf(Date);
    const lockMs = (updateArg.data.lockedUntil as Date).getTime() - before;
    expect(lockMs).toBeGreaterThanOrEqual((LOCK_MINUTES - 1) * 60 * 1000);
    expect(lockMs).toBeLessThanOrEqual((LOCK_MINUTES + 1) * 60 * 1000);
    expect(logLoginAttempt).toHaveBeenCalledWith(
      'user_lockout_1',
      false,
      '203.0.113.10',
      'jest-dr906',
      { locked: true }
    );
  });
});

describe('authorize — locked account', () => {
  it('rejects the CORRECT password while the lock is active, and audit-logs it', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(
      baseUser({
        failedLoginAttempts: THRESHOLD,
        lockedUntil: new Date(Date.now() + 10 * 60 * 1000),
      })
    );

    const result = await getAuthorize()(
      { email: 'lockout@example.com', password: 'CorrectHorse1' },
      fakeReq
    );

    expect(result).toBeNull();
    expect(logAccountLockout).toHaveBeenCalledWith('user_lockout_1', '203.0.113.10', 'jest-dr906');
    // Nothing recorded as a fresh failure; the lock gate fired first.
    expect(mockPrisma.user.update).not.toHaveBeenCalled();
  });
});

describe('lock recovery', () => {
  it('an expired lock self-clears on the next check', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(
      baseUser({
        failedLoginAttempts: THRESHOLD,
        lockedUntil: new Date(Date.now() - 60 * 1000), // expired a minute ago
      })
    );

    const locked = await isAccountLocked('user_lockout_1');

    expect(locked).toBe(false);
    expect(mockPrisma.user.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'user_lockout_1' },
        data: expect.objectContaining({ failedLoginAttempts: 0, lockedUntil: null }),
      })
    );
  });

  it('a successful login after the window resets the counter and clears the lock', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(
      baseUser({ failedLoginAttempts: THRESHOLD, lockedUntil: null })
    );

    const result = await getAuthorize()(
      { email: 'lockout@example.com', password: 'CorrectHorse1' },
      fakeReq
    );

    expect(result).toMatchObject({ id: 'user_lockout_1', email: 'lockout@example.com' });
    expect(mockPrisma.user.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'user_lockout_1' },
        data: expect.objectContaining({ failedLoginAttempts: 0, lockedUntil: null }),
      })
    );
    expect(logLoginAttempt).toHaveBeenCalledWith(
      'user_lockout_1',
      true,
      '203.0.113.10',
      'jest-dr906'
    );
  });
});

describe('failure-path resilience — never a 500 for a wrong password', () => {
  it('a DB failure while recording the attempt still resolves to null (no throw)', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(baseUser());
    mockPrisma.user.update.mockRejectedValue(new Error('db down'));

    await expect(
      getAuthorize()({ email: 'lockout@example.com', password: 'WrongPass1' }, fakeReq)
    ).resolves.toBeNull();
  });

  it('an unknown email resolves to null without touching lockout state', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null);

    await expect(
      getAuthorize()({ email: 'ghost@example.com', password: 'WrongPass1' }, fakeReq)
    ).resolves.toBeNull();
    expect(mockPrisma.user.update).not.toHaveBeenCalled();
  });

  it('recordFailedLoginAttempt reports remaining attempts and the lock decision', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(baseUser({ failedLoginAttempts: 1 }));

    const outcome = await recordFailedLoginAttempt('user_lockout_1', '203.0.113.10', 'jest-dr906');

    expect(outcome).toEqual({ locked: false, attemptsRemaining: THRESHOLD - 2 });
  });

  it('recordSuccessfulLogin swallows audit-row failures (login still succeeds)', async () => {
    mockPrisma.loginAttempt.create.mockRejectedValue(new Error('audit table down'));

    await expect(
      recordSuccessfulLogin('user_lockout_1', '203.0.113.10', 'jest-dr906')
    ).resolves.toBeUndefined();
  });
});
