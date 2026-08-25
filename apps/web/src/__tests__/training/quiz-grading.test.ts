/**
 * @jest-environment node
 *
 * Phase-5 e2e — Quiz server-side grading & forged-score rejection (DR-858 N-05, PR #176)
 *
 * Drives the REAL GET/POST route handlers for
 * `app/api/training/nrp/quiz/[moduleNumber]/route.ts` with the quiz bank and auth
 * mocked. Runs in the `node` test environment because the handlers use the web
 * `Request`/`Response` (NextRequest/NextResponse) APIs, absent in jsdom.
 *
 * What it proves:
 *   1. GET never ships the answer key (`correct`/`explanation` stripped) to
 *      non-admin callers; ADMIN/SUPER_ADMIN receive the full key (DR-892).
 *   2. POST grades against the SERVER answer key — correct answers pass.
 *   3. A forged `score`/`passed` in the request body is ignored: wrong answers
 *      fail even when the client claims a perfect score (the N-05 attack).
 *   4. The 70% pass threshold is enforced from the server-computed score.
 *   5. GET and POST are both auth-gated and role-gated (DR-892).
 */
import { NextRequest, NextResponse } from 'next/server';

// api-errors (pulled in by the route) imports @sentry/nextjs, which is not
// resolvable under test; it only calls captureException.
jest.mock('@sentry/nextjs', () => ({ captureException: jest.fn() }), { virtual: true });

jest.mock('@/lib/auth-middleware', () => {
  const { NextResponse: MockNextResponse } = jest.requireActual('next/server');
  return {
    authenticateRequest: jest.fn(),
    // Real role semantics, minus the prisma/next-auth import chain.
    requireRole: (user: { userType?: string }, roles: string[]) =>
      roles.includes(user?.userType as string),
    unauthorizedRoleResponse: (roles: string[]) =>
      MockNextResponse.json(
        { error: 'FORBIDDEN', message: `Access denied. Required roles: ${roles.join(', ')}` },
        { status: 403 }
      ),
  };
});

// Grading/projection helpers stay REAL; only the quiz-bank file loaders are mocked.
jest.mock('@/lib/training/nrp-training', () => ({
  ...jest.requireActual('@/lib/training/nrp-training'),
  getNrpgQuizModule: jest.fn(),
  verifyTrainingSourcesPresent: jest.fn().mockResolvedValue(undefined),
}));

import { GET, POST } from '@/app/api/training/nrp/quiz/[moduleNumber]/route';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getNrpgQuizModule } from '@/lib/training/nrp-training';

const mockAuth = authenticateRequest as jest.Mock;
const mockGetModule = getNrpgQuizModule as jest.Mock;

// 5-question fixture with a known server-side answer key.
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
const FOUR_CORRECT = { m1q1: 1, m1q2: 2, m1q3: 0, m1q4: 3, m1q5: 0 }; // 4/5 = 80%
const THREE_CORRECT = { m1q1: 1, m1q2: 2, m1q3: 0, m1q4: 0, m1q5: 0 }; // 3/5 = 60%

const params = { params: Promise.resolve({ moduleNumber: '1' }) };

function postReq(body: unknown) {
  return new NextRequest('http://localhost/api/training/nrp/quiz/1', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

const CONTRACTOR = { id: 'user_1', userType: 'CONTRACTOR' };
const ADMIN = { id: 'admin_1', userType: 'ADMIN' };
const CLIENT = { id: 'client_1', userType: 'CLIENT' };

const UNAUTHENTICATED = {
  success: false,
  response: NextResponse.json({ error: 'unauthorized' }, { status: 401 }),
};

function getReq() {
  return new NextRequest('http://localhost/api/training/nrp/quiz/1');
}

beforeEach(() => {
  mockAuth.mockReset();
  mockGetModule.mockReset();
  mockGetModule.mockResolvedValue(QUIZ_MODULE);
  mockAuth.mockResolvedValue({ success: true, context: { user: CONTRACTOR } });
});

describe('GET — quiz delivery', () => {
  it('rejects unauthenticated requests with 401', async () => {
    mockAuth.mockResolvedValue(UNAUTHENTICATED);

    const res = await GET(getReq(), params);
    expect(res.status).toBe(401);
  });

  it('rejects roles outside CONTRACTOR/ADMIN/SUPER_ADMIN with 403', async () => {
    mockAuth.mockResolvedValue({ success: true, context: { user: CLIENT } });

    const res = await GET(getReq(), params);
    expect(res.status).toBe(403);
  });

  it('never ships the answer key to a contractor', async () => {
    const res = await GET(getReq(), params);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.quiz.questions).toHaveLength(5);
    for (const q of body.quiz.questions) {
      expect(q).not.toHaveProperty('correct');
      expect(q).not.toHaveProperty('explanation');
      // The client still gets what it needs to render and submit.
      expect(q).toHaveProperty('id');
      expect(q).toHaveProperty('options');
    }
  });

  it('returns the full answer key only to ADMIN', async () => {
    mockAuth.mockResolvedValue({ success: true, context: { user: ADMIN } });

    const res = await GET(getReq(), params);
    const body = await res.json();

    expect(res.status).toBe(200);
    for (const q of body.quiz.questions) {
      expect(q).toHaveProperty('correct');
      expect(q).toHaveProperty('explanation');
    }
  });
});

describe('POST — server-side grading', () => {
  it('passes a fully correct submission (100%)', async () => {
    const res = await POST(postReq({ answers: ALL_CORRECT }), params);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.result.score).toBe(100);
    expect(body.result.correctCount).toBe(5);
    expect(body.result.passed).toBe(true);
  });

  it('IGNORES a forged client score: wrong answers fail despite score:100/passed:true', async () => {
    const res = await POST(
      postReq({ answers: ALL_WRONG, score: 100, passed: true }),
      params
    );
    const body = await res.json();

    expect(res.status).toBe(200);
    // Server recomputed from the answer key — not from the forged body.
    expect(body.result.score).toBe(0);
    expect(body.result.correctCount).toBe(0);
    expect(body.result.passed).toBe(false);
  });

  it('enforces the 70% threshold from the server-computed score', async () => {
    const pass = await (await POST(postReq({ answers: FOUR_CORRECT }), params)).json();
    expect(pass.result.score).toBe(80);
    expect(pass.result.passed).toBe(true);

    const fail = await (await POST(postReq({ answers: THREE_CORRECT }), params)).json();
    expect(fail.result.score).toBe(60);
    expect(fail.result.passed).toBe(false);
  });

  it('rejects unauthenticated submissions', async () => {
    mockAuth.mockResolvedValue(UNAUTHENTICATED);

    const res = await POST(postReq({ answers: ALL_CORRECT }), params);
    expect(res.status).toBe(401);
  });

  it('rejects submissions from roles outside CONTRACTOR/ADMIN/SUPER_ADMIN', async () => {
    mockAuth.mockResolvedValue({ success: true, context: { user: CLIENT } });

    const res = await POST(postReq({ answers: ALL_CORRECT }), params);
    expect(res.status).toBe(403);
  });
});
