/**
 * @jest-environment node
 *
 * DR-894 — Module retake policy: attempt cap + server cooldown + admin reset.
 *
 * Drives the REAL route handlers for `app/api/onboarding/assessment/route.ts`
 * and `app/api/admin/training/reset-attempts/route.ts` with auth, the tenant
 * DB, and the quiz-bank loader mocked (grading and the retake policy math
 * stay REAL).
 *
 * What it proves:
 *   1. The attempt cap (NRPG_QUIZ_MAX_ATTEMPTS failed attempts) is enforced
 *      server-side: further submissions are 403 ATTEMPT_CAP and nothing is
 *      persisted (lockout/admin-review).
 *   2. The cooldown (NRPG_QUIZ_RETAKE_COOLDOWN_HOURS after a fail) is enforced
 *      server-side: an early retake is 429 with a retryAt payload and a
 *      Retry-After header.
 *   3. Voided rows (admin reset) never count — reset genuinely unlocks.
 *   4. The graded response surfaces attemptsRemaining + cooldown state for the
 *      UI (DR-919).
 *   5. Admin reset is ADMIN/SUPER_ADMIN-only (contractor gets 403, no writes),
 *      voids only counted attempts, resets a FAILED module to IN_PROGRESS, and
 *      writes an audit row.
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

jest.mock('@/lib/get-tenant-db', () => ({
  getTenantDb: jest.fn(),
}));

jest.mock('@/lib/training/nrp-training', () => ({
  ...jest.requireActual('@/lib/training/nrp-training'),
  getNrpgQuizModule: jest.fn(),
}));

import { POST as assessmentPOST } from '@/app/api/onboarding/assessment/route';
import { POST as resetPOST } from '@/app/api/admin/training/reset-attempts/route';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { getNrpgQuizModule } from '@/lib/training/nrp-training';
import {
  NRPG_QUIZ_MAX_ATTEMPTS,
  NRPG_QUIZ_RETAKE_COOLDOWN_MS,
  NRPG_ATTEMPT_VOID_PREFIX,
  evaluateNrpgRetakePolicy,
  classifyNrpgCertRenewalNotice,
} from '@/lib/training/training-policy';

const mockAuth = authenticateRequest as jest.Mock;
const mockGetTenantDb = getTenantDb as jest.Mock;
const mockGetModule = getNrpgQuizModule as jest.Mock;

const QUIZ_MODULE = {
  name: 'Module 1 — Water Damage',
  description: 'Cat 1-3 water',
  questions: [
    { id: 'm1q1', type: 'mc', question: 'Q1', options: ['a', 'b', 'c', 'd'], reference: 'r1', correct: 1, explanation: 'e1' },
    { id: 'm1q2', type: 'mc', question: 'Q2', options: ['a', 'b', 'c', 'd'], reference: 'r2', correct: 2, explanation: 'e2' },
    { id: 'm1q3', type: 'mc', question: 'Q3', options: ['a', 'b', 'c', 'd'], reference: 'r3', correct: 0, explanation: 'e3' },
    { id: 'm1q4', type: 'mc', question: 'Q4', options: ['a', 'b', 'c', 'd'], reference: 'r4', correct: 3, explanation: 'e4' },
    { id: 'm1q5', type: 'mc', question: 'Q5', options: ['a', 'b', 'c', 'd'], reference: 'r5', correct: 1, explanation: 'e5' },
  ],
};
const ALL_CORRECT = { m1q1: 1, m1q2: 2, m1q3: 0, m1q4: 3, m1q5: 1 };
const ALL_WRONG = { m1q1: 0, m1q2: 0, m1q3: 1, m1q4: 0, m1q5: 0 };

const CONTRACTOR = { id: 'contractor_1', userType: 'CONTRACTOR' };
const ADMIN = { id: 'admin_1', userType: 'ADMIN' };

const HOUR_MS = 60 * 60 * 1000;

function req(url: string, body: unknown) {
  return new NextRequest(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

const assessmentReq = (body: unknown) => req('http://localhost/api/onboarding/assessment', body);
const resetReq = (body: unknown) => req('http://localhost/api/admin/training/reset-attempts', body);

/** A persisted failed-attempt row `hoursAgo` hours before now. */
function failedAttempt(hoursAgo: number, extra: Record<string, unknown> = {}) {
  const at = new Date(Date.now() - hoursAgo * HOUR_MS);
  return { id: `att_${hoursAgo}`, score: 0, completedAt: at, createdAt: at, feedback: 'Needs review', ...extra };
}

/** Fresh mock of the tenant Prisma client for one test. */
function makeDb(opts: { refreshedStatuses?: string[]; assessments?: unknown[]; moduleStatus?: string } = {}) {
  const moduleProgress = {
    id: 'mp_1',
    moduleId: 'NRP-001',
    status: opts.moduleStatus ?? 'IN_PROGRESS',
    progress: 10,
    startedAt: new Date('2026-06-01T00:00:00Z'),
    createdAt: new Date('2026-06-01T00:00:00Z'),
  };
  const onboarding = {
    id: 'onb_1',
    contractorId: 'contractor_1',
    specialization: null,
    moduleProgress: [moduleProgress],
  };

  const tx = {
    contractorAssessment: {
      create: jest.fn().mockResolvedValue({ id: 'assessment_new' }),
      updateMany: jest.fn().mockResolvedValue({ count: 0 }),
    },
    contractorModuleProgress: {
      update: jest.fn().mockResolvedValue({}),
      findMany: jest.fn().mockResolvedValue(
        (opts.refreshedStatuses ?? ['FAILED']).map((status, i) => ({
          moduleId: `NRP-${String(i + 1).padStart(3, '0')}`,
          status,
        }))
      ),
    },
    contractorOnboarding: { update: jest.fn().mockResolvedValue({}) },
    contractorCertification: {
      findFirst: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue({ id: 'cert_1' }),
    },
    auditLog: { create: jest.fn().mockResolvedValue({ id: 'audit_1' }) },
  };

  const db = {
    contractorOnboarding: {
      findUnique: jest.fn().mockResolvedValue(onboarding),
    },
    contractorAssessment: {
      findMany: jest.fn().mockResolvedValue(opts.assessments ?? []),
    },
    contractorModuleProgress: { update: jest.fn().mockResolvedValue({}) },
    $transaction: jest.fn(async (fn: (t: typeof tx) => Promise<unknown>) => fn(tx)),
  };

  return { db, tx, moduleProgress };
}

beforeEach(() => {
  mockAuth.mockReset();
  mockGetModule.mockReset();
  mockGetTenantDb.mockReset();
  mockGetModule.mockResolvedValue(QUIZ_MODULE);
  mockAuth.mockResolvedValue({ success: true, context: { user: CONTRACTOR } });
});

describe('evaluateNrpgRetakePolicy — pure policy math', () => {
  it('allows a first attempt with the full allowance', () => {
    const d = evaluateNrpgRetakePolicy([]);
    expect(d).toMatchObject({
      allowed: true,
      reason: null,
      attemptsUsed: 0,
      attemptsRemaining: NRPG_QUIZ_MAX_ATTEMPTS,
      retryAt: null,
    });
  });

  it('blocks with COOLDOWN and an exact retryAt right after a fail', () => {
    const now = new Date('2026-07-01T12:00:00Z');
    const failAt = new Date('2026-07-01T11:00:00Z');
    const d = evaluateNrpgRetakePolicy(
      [{ score: 40, completedAt: failAt, createdAt: failAt, feedback: 'Needs review' }],
      now
    );
    expect(d.allowed).toBe(false);
    expect(d.reason).toBe('COOLDOWN');
    expect(d.retryAt?.getTime()).toBe(failAt.getTime() + NRPG_QUIZ_RETAKE_COOLDOWN_MS);
    expect(d.attemptsRemaining).toBe(NRPG_QUIZ_MAX_ATTEMPTS - 1);
  });

  it('allows a retake once the cooldown has elapsed', () => {
    const now = new Date('2026-07-02T12:00:01Z');
    const failAt = new Date('2026-07-01T12:00:00Z'); // 24h + 1s ago
    const d = evaluateNrpgRetakePolicy(
      [{ score: 40, completedAt: failAt, createdAt: failAt, feedback: 'Needs review' }],
      now
    );
    expect(d.allowed).toBe(true);
    expect(d.attemptsUsed).toBe(1);
  });

  it('blocks with ATTEMPT_CAP (no retryAt) after the configured max fails, even past cooldown', () => {
    const now = new Date('2026-07-10T00:00:00Z');
    const attempts = [1, 2, 3].map((day) => {
      const at = new Date(`2026-07-0${day}T00:00:00Z`);
      return { score: 20, completedAt: at, createdAt: at, feedback: 'Needs review' };
    });
    expect(attempts).toHaveLength(NRPG_QUIZ_MAX_ATTEMPTS);
    const d = evaluateNrpgRetakePolicy(attempts, now);
    expect(d).toMatchObject({ allowed: false, reason: 'ATTEMPT_CAP', attemptsRemaining: 0, retryAt: null });
  });

  it('ignores voided rows (admin reset) and passing rows', () => {
    const at = new Date('2026-07-01T00:00:00Z');
    const now = new Date('2026-07-01T01:00:00Z'); // inside what WOULD be cooldown
    const d = evaluateNrpgRetakePolicy(
      [
        { score: 0, completedAt: at, createdAt: at, feedback: `${NRPG_ATTEMPT_VOID_PREFIX}ADMIN_RESET:admin_1` },
        { score: 0, completedAt: at, createdAt: at, feedback: `${NRPG_ATTEMPT_VOID_PREFIX}ADMIN_RESET:admin_1` },
        { score: 0, completedAt: at, createdAt: at, feedback: `${NRPG_ATTEMPT_VOID_PREFIX}ADMIN_RESET:admin_1` },
        { score: 100, completedAt: at, createdAt: at, feedback: 'Passed' },
      ],
      now
    );
    expect(d.allowed).toBe(true);
    expect(d.attemptsUsed).toBe(0);
    expect(d.attemptsRemaining).toBe(NRPG_QUIZ_MAX_ATTEMPTS);
  });
});

describe('POST /api/onboarding/assessment — retake policy enforced server-side', () => {
  it('rejects an in-cooldown retake with 429, retryAt payload, and Retry-After header', async () => {
    const { db } = makeDb({ assessments: [failedAttempt(1)], moduleStatus: 'FAILED' });
    mockGetTenantDb.mockReturnValue(db);

    const res = await assessmentPOST(
      assessmentReq({ contractorId: 'contractor_1', moduleId: 'NRP-001', answers: ALL_CORRECT })
    );
    const body = await res.json();

    expect(res.status).toBe(429);
    expect(body.details.reason).toBe('COOLDOWN');
    expect(body.details.retryAt).toBeDefined();
    expect(new Date(body.details.retryAt).getTime()).toBeGreaterThan(Date.now());
    expect(Number(res.headers.get('Retry-After'))).toBeGreaterThan(0);
    // Nothing persisted.
    expect(db.$transaction).not.toHaveBeenCalled();
  });

  it('rejects an over-cap submission with 403 ATTEMPT_CAP lockout and persists nothing', async () => {
    // Max fails, all well past cooldown — only the cap can be blocking.
    const { db } = makeDb({
      assessments: [failedAttempt(100), failedAttempt(80), failedAttempt(60)],
      moduleStatus: 'FAILED',
    });
    mockGetTenantDb.mockReturnValue(db);

    const res = await assessmentPOST(
      assessmentReq({ contractorId: 'contractor_1', moduleId: 'NRP-001', answers: ALL_CORRECT })
    );
    const body = await res.json();

    expect(res.status).toBe(403);
    expect(body.details.reason).toBe('ATTEMPT_CAP');
    expect(body.details.attemptsRemaining).toBe(0);
    expect(body.details.retryAt).toBeNull();
    expect(db.$transaction).not.toHaveBeenCalled();
  });

  it('voided prior attempts do not count — a reset contractor can submit again', async () => {
    const voided = [100, 80, 60].map((h) =>
      failedAttempt(h, { feedback: `${NRPG_ATTEMPT_VOID_PREFIX}ADMIN_RESET:admin_1:2026-07-01T00:00:00Z` })
    );
    const { db, tx } = makeDb({ assessments: voided, refreshedStatuses: ['COMPLETED'], moduleStatus: 'FAILED' });
    mockGetTenantDb.mockReturnValue(db);

    const res = await assessmentPOST(
      assessmentReq({ contractorId: 'contractor_1', moduleId: 'NRP-001', answers: ALL_CORRECT })
    );
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.passed).toBe(true);
    expect(tx.contractorAssessment.create).toHaveBeenCalled();
  });

  it('surfaces attemptsRemaining + cooldown state on a graded FAIL (DR-919 contract)', async () => {
    const { db } = makeDb({ assessments: [] });
    mockGetTenantDb.mockReturnValue(db);

    const res = await assessmentPOST(
      assessmentReq({ contractorId: 'contractor_1', moduleId: 'NRP-001', answers: ALL_WRONG })
    );
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.passed).toBe(false);
    expect(body.retake).toMatchObject({
      maxAttempts: NRPG_QUIZ_MAX_ATTEMPTS,
      attemptsUsed: 1,
      attemptsRemaining: NRPG_QUIZ_MAX_ATTEMPTS - 1,
      locked: false,
    });
    // The fail just happened, so a cooldown window is open.
    expect(body.retake.cooldownUntil).toBeDefined();
    expect(new Date(body.retake.cooldownUntil).getTime()).toBeGreaterThan(Date.now());
  });

  it('marks the module locked in the payload when the final attempt fails', async () => {
    const { db } = makeDb({
      assessments: [failedAttempt(100), failedAttempt(60)],
      moduleStatus: 'FAILED',
    });
    mockGetTenantDb.mockReturnValue(db);

    const res = await assessmentPOST(
      assessmentReq({ contractorId: 'contractor_1', moduleId: 'NRP-001', answers: ALL_WRONG })
    );
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.passed).toBe(false);
    expect(body.retake).toMatchObject({ attemptsUsed: NRPG_QUIZ_MAX_ATTEMPTS, attemptsRemaining: 0, locked: true });
    expect(body.retake.cooldownUntil).toBeNull();
  });

  it('a pass on the final allowed attempt reports no cooldown and does not lock', async () => {
    const { db } = makeDb({
      assessments: [failedAttempt(100), failedAttempt(60)],
      refreshedStatuses: ['COMPLETED'],
      moduleStatus: 'FAILED',
    });
    mockGetTenantDb.mockReturnValue(db);

    const res = await assessmentPOST(
      assessmentReq({ contractorId: 'contractor_1', moduleId: 'NRP-001', answers: ALL_CORRECT })
    );
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.passed).toBe(true);
    expect(body.retake).toMatchObject({ attemptsUsed: 2, attemptsRemaining: 1, locked: false, cooldownUntil: null });
  });
});

describe('POST /api/admin/training/reset-attempts — admin reset', () => {
  const RESET_BODY = { contractorId: 'contractor_1', moduleId: 'NRP-001', reason: 'Verified retraining' };

  it('rejects a CONTRACTOR caller with 403 and performs no writes', async () => {
    mockAuth.mockResolvedValue({ success: true, context: { user: CONTRACTOR } });
    const { db } = makeDb();
    mockGetTenantDb.mockReturnValue(db);

    const res = await resetPOST(resetReq(RESET_BODY));

    expect(res.status).toBe(403);
    expect(db.$transaction).not.toHaveBeenCalled();
  });

  it('rejects unauthenticated requests with 401', async () => {
    mockAuth.mockResolvedValue({
      success: false,
      response: NextResponse.json({ error: 'unauthorized' }, { status: 401 }),
    });

    const res = await resetPOST(resetReq(RESET_BODY));
    expect(res.status).toBe(401);
  });

  it('ADMIN reset voids counted attempts, reopens a FAILED module, and writes an audit row', async () => {
    mockAuth.mockResolvedValue({ success: true, context: { user: ADMIN } });
    const attempts = [
      failedAttempt(100, { id: 'att_a' }),
      failedAttempt(60, { id: 'att_b' }),
      failedAttempt(30, { id: 'att_c' }),
      // Already voided — must not be re-voided.
      failedAttempt(200, { id: 'att_old', feedback: `${NRPG_ATTEMPT_VOID_PREFIX}ADMIN_RESET:prev` }),
    ];
    const { db, tx } = makeDb({ assessments: attempts, moduleStatus: 'FAILED' });
    mockGetTenantDb.mockReturnValue(db);

    const res = await resetPOST(resetReq(RESET_BODY));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.voidedAttempts).toBe(3);

    // Only the three live failed attempts are voided, with the marker prefix.
    const updateArgs = tx.contractorAssessment.updateMany.mock.calls[0][0];
    expect(updateArgs.where.id.in.sort()).toEqual(['att_a', 'att_b', 'att_c']);
    expect(updateArgs.data.feedback.startsWith(NRPG_ATTEMPT_VOID_PREFIX)).toBe(true);

    // FAILED module reopens for the retake.
    expect(tx.contractorModuleProgress.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'mp_1' },
        data: expect.objectContaining({ status: 'IN_PROGRESS', completed: false, completedAt: null }),
      })
    );

    // Audit row records who reset what.
    expect(tx.auditLog.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          action: 'TRAINING_ATTEMPTS_RESET',
          performedBy: ADMIN.id,
          newValues: expect.objectContaining({ contractorId: 'contractor_1', moduleId: 'NRP-001' }),
        }),
      })
    );
  });

  it('404s when the contractor has no onboarding', async () => {
    mockAuth.mockResolvedValue({ success: true, context: { user: ADMIN } });
    const { db } = makeDb();
    db.contractorOnboarding.findUnique.mockResolvedValue(null);
    mockGetTenantDb.mockReturnValue(db);

    const res = await resetPOST(resetReq(RESET_BODY));
    expect(res.status).toBe(404);
  });
});

describe('classifyNrpgCertRenewalNotice — T-30/T-7/expiry selection windows', () => {
  const now = new Date('2026-07-02T00:00:00Z');
  const daysOut = (d: number) => new Date(now.getTime() + d * 24 * HOUR_MS);

  it.each([
    [30, 'T30'],
    [29.5, 'T30'],
    [29, null], // already notified at T-30, not yet T-7 — and NOT flipped
    [7, 'T7'],
    [6.5, 'T7'],
    [6, null],
    [3, null],
    [0, 'EXPIRED'],
    [-0.5, 'EXPIRED'],
    [-1.5, null], // handled by an earlier daily run
    [45, null],
  ] as const)('%s days to expiry -> %s', (days, expected) => {
    expect(classifyNrpgCertRenewalNotice(daysOut(days), now)).toBe(expected);
  });
});
