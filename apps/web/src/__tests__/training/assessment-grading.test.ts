/**
 * @jest-environment node
 *
 * DR-892 — Onboarding quiz sealing & server-authoritative assessment grading.
 *
 * Drives the REAL route handlers for `app/api/onboarding/quiz/route.ts` and
 * `app/api/onboarding/assessment/route.ts` with auth, the tenant DB, and the
 * quiz-bank loader mocked (grading + moduleId parsing stay REAL via
 * jest.requireActual).
 *
 * What it proves:
 *   1. POST /api/onboarding/quiz never ships `correct`/`explanation` to a
 *      contractor; the full key goes only to ADMIN/SUPER_ADMIN.
 *   2. POST /api/onboarding/assessment no longer accepts a client score —
 *      a legacy `{ score }` body is a 400, and answers are graded against
 *      the sealed server-side key.
 *   3. The SERVER-computed score is what gets persisted on
 *      ContractorAssessment and what drives module progress.
 *   4. A forged `score`/`passed` in the body has NO effect: all-wrong answers
 *      with `score: 100` persist score 0, mark the module FAILED (never
 *      COMPLETED), and issue no certification.
 *   5. Both routes are auth-gated.
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

// Keep gradeNrpgQuizSubmission and parseNrpgModuleNumber REAL — the tests
// must prove the real grading math. Only the quiz-bank file loader is mocked.
jest.mock('@/lib/training/nrp-training', () => ({
  ...jest.requireActual('@/lib/training/nrp-training'),
  getNrpgQuizModule: jest.fn(),
}));

import { POST as quizPOST } from '@/app/api/onboarding/quiz/route';
import { POST as assessmentPOST } from '@/app/api/onboarding/assessment/route';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { getNrpgQuizModule } from '@/lib/training/nrp-training';

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

function req(url: string, body: unknown) {
  return new NextRequest(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

const quizReq = (body: unknown) => req('http://localhost/api/onboarding/quiz', body);
const assessmentReq = (body: unknown) => req('http://localhost/api/onboarding/assessment', body);

/** Fresh mock of the tenant Prisma client for one test. */
function makeDb(opts: { refreshedStatuses?: string[] } = {}) {
  const moduleProgress = {
    id: 'mp_1',
    moduleId: 'NRP-001',
    status: 'IN_PROGRESS',
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
    contractorAssessment: { create: jest.fn().mockResolvedValue({ id: 'assessment_1' }) },
    contractorModuleProgress: {
      update: jest.fn().mockResolvedValue({}),
      findMany: jest.fn().mockResolvedValue(
        (opts.refreshedStatuses ?? ['FAILED']).map((status) => ({ status }))
      ),
    },
    contractorOnboarding: { update: jest.fn().mockResolvedValue({}) },
    contractorCertification: {
      findFirst: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue({ id: 'cert_1' }),
    },
  };

  const db = {
    contractorOnboarding: {
      findUnique: jest.fn().mockResolvedValue(onboarding),
    },
    contractorModuleProgress: { update: jest.fn().mockResolvedValue({}) },
    $transaction: jest.fn(async (fn: (t: typeof tx) => Promise<unknown>) => fn(tx)),
  };

  return { db, tx };
}

beforeEach(() => {
  mockAuth.mockReset();
  mockGetModule.mockReset();
  mockGetTenantDb.mockReset();
  mockGetModule.mockResolvedValue(QUIZ_MODULE);
  mockAuth.mockResolvedValue({ success: true, context: { user: CONTRACTOR } });
});

describe('POST /api/onboarding/quiz — answer key sealed', () => {
  it('rejects unauthenticated requests with 401', async () => {
    mockAuth.mockResolvedValue({
      success: false,
      response: NextResponse.json({ error: 'unauthorized' }, { status: 401 }),
    });

    const res = await quizPOST(quizReq({ moduleId: 'NRP-001', contractorId: 'contractor_1' }));
    expect(res.status).toBe(401);
  });

  it('strips `correct` and `explanation` from the contractor payload', async () => {
    const { db } = makeDb();
    mockGetTenantDb.mockReturnValue(db);

    const res = await quizPOST(quizReq({ moduleId: 'NRP-001', contractorId: 'contractor_1' }));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.quiz.questions).toHaveLength(5);
    for (const q of body.quiz.questions) {
      expect(q).not.toHaveProperty('correct');
      expect(q).not.toHaveProperty('explanation');
      expect(q).toHaveProperty('id');
      expect(q).toHaveProperty('options');
    }
  });

  it('returns the full answer key only to ADMIN', async () => {
    mockAuth.mockResolvedValue({ success: true, context: { user: ADMIN } });
    const { db } = makeDb();
    mockGetTenantDb.mockReturnValue(db);

    const res = await quizPOST(quizReq({ moduleId: 'NRP-001', contractorId: 'contractor_1' }));
    const body = await res.json();

    expect(res.status).toBe(200);
    for (const q of body.quiz.questions) {
      expect(q).toHaveProperty('correct');
      expect(q).toHaveProperty('explanation');
    }
  });
});

describe('POST /api/onboarding/assessment — server-authoritative grading', () => {
  it('rejects unauthenticated requests with 401', async () => {
    mockAuth.mockResolvedValue({
      success: false,
      response: NextResponse.json({ error: 'unauthorized' }, { status: 401 }),
    });

    const res = await assessmentPOST(
      assessmentReq({ contractorId: 'contractor_1', moduleId: 'NRP-001', answers: ALL_CORRECT })
    );
    expect(res.status).toBe(401);
  });

  it('rejects the legacy client-score body (no answers) with 400', async () => {
    const { db } = makeDb();
    mockGetTenantDb.mockReturnValue(db);

    // The pre-DR-892 payload: a bare client-asserted score.
    const res = await assessmentPOST(
      assessmentReq({ contractorId: 'contractor_1', moduleId: 'NRP-001', score: 100 })
    );

    expect(res.status).toBe(400);
    expect(db.$transaction).not.toHaveBeenCalled();
  });

  it('persists the SERVER-computed score and completes the module on a real pass', async () => {
    const { db, tx } = makeDb({ refreshedStatuses: ['COMPLETED'] });
    mockGetTenantDb.mockReturnValue(db);

    const res = await assessmentPOST(
      assessmentReq({ contractorId: 'contractor_1', moduleId: 'NRP-001', answers: ALL_CORRECT })
    );
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.passed).toBe(true);
    expect(body.score).toBe(100);

    // Stored assessment carries the server-computed score.
    expect(tx.contractorAssessment.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ score: 100, assessmentType: 'QUIZ' }),
      })
    );
    // Module progress completes from the server grade.
    expect(tx.contractorModuleProgress.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: 'COMPLETED', completed: true }),
      })
    );
  });

  it('IGNORES a forged score: all-wrong answers with score:100/passed:true persist 0 and FAIL the module', async () => {
    const { db, tx } = makeDb({ refreshedStatuses: ['FAILED'] });
    mockGetTenantDb.mockReturnValue(db);

    const res = await assessmentPOST(
      assessmentReq({
        contractorId: 'contractor_1',
        moduleId: 'NRP-001',
        answers: ALL_WRONG,
        // The forgery — must have no effect on stored results or progression.
        score: 100,
        passed: true,
      })
    );
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.passed).toBe(false);
    expect(body.score).toBe(0);

    // Persisted score is the recomputed 0, not the forged 100.
    expect(tx.contractorAssessment.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ score: 0 }),
      })
    );
    // Module is FAILED, never COMPLETED.
    expect(tx.contractorModuleProgress.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: 'FAILED', completed: false, completedAt: null }),
      })
    );
    // Onboarding is not marked COMPLETED and no certification is issued.
    expect(tx.contractorOnboarding.update).toHaveBeenCalledWith(
      expect.objectContaining({ data: { status: 'IN_PROGRESS' } })
    );
    expect(tx.contractorCertification.create).not.toHaveBeenCalled();
  });

  it('fails a below-threshold submission (60% < 70%) regardless of client claims', async () => {
    const { db, tx } = makeDb({ refreshedStatuses: ['FAILED'] });
    mockGetTenantDb.mockReturnValue(db);

    const THREE_CORRECT = { m1q1: 1, m1q2: 2, m1q3: 0, m1q4: 0, m1q5: 0 }; // 3/5 = 60%
    const res = await assessmentPOST(
      assessmentReq({
        contractorId: 'contractor_1',
        moduleId: 'NRP-001',
        answers: THREE_CORRECT,
        passed: true,
      })
    );
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.score).toBe(60);
    expect(body.passed).toBe(false);
    expect(tx.contractorModuleProgress.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: 'FAILED', completed: false }),
      })
    );
  });
});
