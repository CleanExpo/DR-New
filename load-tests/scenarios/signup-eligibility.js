/**
 * Signup -> Eligibility Load Test (DR-906)
 *
 * Exercises the contractor signup -> eligibility journey against a NON-PRODUCTION
 * target at N concurrent VUs, with the negative-path gates that must hold under
 * load:
 *
 *   Journey scenario (signup_eligibility_journey):
 *     1. GET /signup?type=contractor           -> 200 (entry page renders)
 *     2. GET /api/health                       -> 200
 *     3. GET /api/auth/verify-email?token=bad  -> 400 (tampered token rejected, never 5xx)
 *     4. GET /api/contractor/eligibility       -> 401/403 unauthenticated (auth gate holds)
 *     5. GET /api/contractor/payout-settings   -> 401/403 unauthenticated
 *     6. GET /api/admin/contractor-verification/pending -> 401/403 (RBAC gate holds)
 *
 *   Duplicate-signup race scenario (signup_race):
 *     - Registers a unique contractor email (201, or 429 when the staging
 *       auth rate limiter engages — itself a verified negative gate).
 *     - Fires TWO CONCURRENT registrations with the SAME email (http.batch):
 *       the unique constraint must yield AT MOST ONE 201; the loser gets a
 *       4xx (400 duplicate / 429 rate-limited), NEVER a 5xx, and never a
 *       second account.
 *
 * Thresholds (DR-906 stated: the qa-test spec delta states them symbolically
 * as "p95 < X ms and error rate < Y%"; the concrete numbers fixed here are
 * p95 < 800ms and error rate < 1%):
 *     http_req_duration p(95)<800, http_req_failed rate<0.01,
 *     zero 5xx anywhere, zero duplicate accounts.
 * Any breached threshold fails the run (non-zero exit) and therefore the gate.
 *
 * SAFETY: setup() aborts if BASE_URL points at a production host. The
 * workflow job additionally pins BASE_URL to staging.
 *
 * Full-depth limitation (documented, not hidden): the email-verify link and
 * every authenticated step (ICA accept, training, Stripe Connect) need inbox
 * access / seeded verified users on staging. This scenario models the journey
 * to the depth the endpoints allow anonymously; see the DR-906 PR body for
 * what a full-depth run requires.
 *
 * Run: k6 run --env BASE_URL=https://staging.disasterrecovery.com.au scenarios/signup-eligibility.js
 */

import http from 'k6/http';
import exec from 'k6/execution';
import { check, group, sleep } from 'k6';
import { Trend, Rate, Counter } from 'k6/metrics';
import { getBaseUrl, getHeaders, thinkTime } from '../lib/helpers.js';

// Custom metrics
const signupDuration = new Trend('signup_duration');
const journeySuccessRate = new Rate('journey_success_rate');
const serverErrors = new Counter('signup_5xx_responses');
const duplicateAccounts = new Counter('signup_race_double_account');
const raceAttempts = new Counter('signup_race_attempts');
const rateLimited = new Counter('signup_rate_limited');

const TARGET_VUS = Number(__ENV.TARGET_VUS || 50);
const RACE_VUS = Number(__ENV.RACE_VUS || 3);
const RACE_ITERATIONS = Number(__ENV.RACE_ITERATIONS || 2);

export const options = {
  scenarios: {
    // N concurrent virtual contractors walking the public journey.
    signup_eligibility_journey: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '1m', target: Math.ceil(TARGET_VUS / 2) },
        { duration: '2m', target: TARGET_VUS },
        { duration: '4m', target: TARGET_VUS },
        { duration: '1m', target: 0 },
      ],
      gracefulRampDown: '30s',
      exec: 'journey',
    },
    // Low-volume, high-signal: the duplicate-signup unique-constraint race.
    // Kept small deliberately — POST /api/auth/register sits behind the auth
    // rate limiter (5 req / 15 min / IP), so volume from one runner IP is
    // structurally capped; correctness (one account, no 5xx) is the assertion.
    signup_race: {
      executor: 'per-vu-iterations',
      vus: RACE_VUS,
      iterations: RACE_ITERATIONS,
      maxDuration: '5m',
      startTime: '30s',
      exec: 'signupRace',
    },
  },
  thresholds: {
    // DR-906 stated thresholds: p95 < 800ms, error rate < 1%.
    http_req_duration: ['p(95)<800'],
    http_req_failed: ['rate<0.01'],
    checks: ['rate>0.99'],
    // Hard negative gates: any 5xx or any double-created account fails the run.
    signup_5xx_responses: ['count<1'],
    signup_race_double_account: ['count<1'],
    signup_duration: ['p(95)<800'],
  },
};

const PRODUCTION_HOST_PATTERNS = [
  'disasterrecovery.com.au', // apex + www (staging.* is explicitly allowed)
  'disaster-recovery-seven.vercel.app',
  'nrpg.business',
];

function isProductionTarget(baseUrl) {
  const url = String(baseUrl).toLowerCase();
  if (url.includes('staging.')) return false;
  return PRODUCTION_HOST_PATTERNS.some((host) => url.includes(host));
}

export function setup() {
  const baseUrl = getBaseUrl();
  if (isProductionTarget(baseUrl)) {
    exec.test.abort(
      `REFUSING TO RUN: BASE_URL "${baseUrl}" looks like a production host. ` +
        'DR-906 load tests must only target staging/preview environments.'
    );
  }
  return { baseUrl };
}

function trackServerError(res) {
  if (res.status >= 500) {
    serverErrors.add(1);
  }
}

// Statuses the negative-path probes are ALLOWED to return. Anything else
// (especially 5xx) counts into http_req_failed and fails the error-rate gate.
const expectAuthGate = {
  responseCallback: http.expectedStatuses(401, 403),
};
const expectBadRequest = {
  responseCallback: http.expectedStatuses(400),
};
const expectRegisterOutcome = {
  // 201 created | 400 duplicate (unique-constraint path) | 429 rate limiter
  responseCallback: http.expectedStatuses(201, 400, 429),
};

function uniqueEmail(tag) {
  return `dr906-${tag}-vu${exec.vu.idInTest}-it${exec.vu.iterationInScenario}-${Date.now()}@loadtest.disasterrecovery.com.au`;
}

function registerPayload(email) {
  return JSON.stringify({
    email,
    password: 'LoadTest123!',
    name: `DR906 Load Contractor ${exec.vu.idInTest}`,
    userType: 'CONTRACTOR',
    consentAccepted: true,
  });
}

export function journey(data) {
  const baseUrl = data.baseUrl;
  const headers = getHeaders();
  let ok = true;

  group('Signup entry page', function () {
    const res = http.get(`${baseUrl}/signup?type=contractor`, { headers: { 'User-Agent': headers['User-Agent'] } });
    trackServerError(res);
    ok = check(res, { 'signup page 200': (r) => r.status === 200 }) && ok;
    sleep(thinkTime(0.5, 1.5));
  });

  group('Health gate', function () {
    const res = http.get(`${baseUrl}/api/health`, { headers });
    trackServerError(res);
    ok = check(res, { 'health responds non-5xx': (r) => r.status < 500 }) && ok;
  });

  group('Negative: tampered email-verify token', function () {
    const res = http.get(
      `${baseUrl}/api/auth/verify-email?token=dr906-tampered-${exec.vu.idInTest}`,
      { headers, ...expectBadRequest }
    );
    trackServerError(res);
    ok = check(res, { 'tampered token -> 400 (never verifies, never 5xx)': (r) => r.status === 400 }) && ok;
    sleep(thinkTime(0.3, 0.8));
  });

  group('Negative: unauthenticated eligibility is gated', function () {
    const res = http.get(`${baseUrl}/api/contractor/eligibility`, { headers, ...expectAuthGate });
    trackServerError(res);
    ok = check(res, { 'eligibility unauthenticated -> 401/403': (r) => r.status === 401 || r.status === 403 }) && ok;
  });

  group('Negative: unauthenticated payout-settings is gated', function () {
    const res = http.get(`${baseUrl}/api/contractor/payout-settings`, { headers, ...expectAuthGate });
    trackServerError(res);
    ok = check(res, { 'payout-settings unauthenticated -> 401/403': (r) => r.status === 401 || r.status === 403 }) && ok;
  });

  group('Negative: admin verification queue is gated', function () {
    const res = http.get(`${baseUrl}/api/admin/contractor-verification/pending`, { headers, ...expectAuthGate });
    trackServerError(res);
    ok = check(res, { 'admin pending unauthenticated -> 401/403': (r) => r.status === 401 || r.status === 403 }) && ok;
    sleep(thinkTime(0.5, 1.5));
  });

  journeySuccessRate.add(ok);
}

export function signupRace(data) {
  const baseUrl = data.baseUrl;
  const headers = getHeaders();
  const registerUrl = `${baseUrl}/api/auth/register`;

  group('Unique contractor signup', function () {
    const start = Date.now();
    const res = http.post(registerUrl, registerPayload(uniqueEmail('solo')), {
      headers,
      ...expectRegisterOutcome,
    });
    signupDuration.add(Date.now() - start);
    trackServerError(res);
    if (res.status === 429) rateLimited.add(1);
    check(res, {
      'unique signup: 201 created or 429 rate-limited, never 5xx': (r) =>
        r.status === 201 || r.status === 429,
    });
    sleep(thinkTime(1, 2));
  });

  group('Duplicate-signup race (same email, concurrent)', function () {
    raceAttempts.add(1);
    const email = uniqueEmail('race');
    const body = registerPayload(email);
    const params = { headers, ...expectRegisterOutcome };

    // Two genuinely concurrent registrations for the SAME email.
    const responses = http.batch([
      ['POST', registerUrl, body, params],
      ['POST', registerUrl, body, params],
    ]);

    const statuses = responses.map((r) => r.status);
    responses.forEach(trackServerError);
    statuses.forEach((s) => {
      if (s === 429) rateLimited.add(1);
    });

    const created = statuses.filter((s) => s === 201).length;
    if (created > 1) {
      duplicateAccounts.add(1);
    }

    check(null, {
      'race: at most ONE account created (unique constraint holds)': () => created <= 1,
      'race: loser rejected with 4xx, never 5xx': () =>
        statuses.every((s) => s === 201 || s === 400 || s === 429),
      // If neither racer was rate-limited, the pair must resolve 201 + 400:
      // exactly one winner and one unique-constraint rejection.
      'race: un-rate-limited pair resolves to exactly one winner': () =>
        statuses.includes(429) || (created === 1 && statuses.includes(400)),
    });
    sleep(thinkTime(1, 2));
  });
}

export function handleSummary(data) {
  const { metrics } = data;

  const stats = {
    timestamp: new Date().toISOString(),
    ticket: 'DR-906',
    thresholds: { p95_ms: 800, error_rate: 0.01 },
    journey: {
      successRate: metrics.journey_success_rate?.values?.rate ?? null,
      p95Duration: metrics.http_req_duration?.values?.['p(95)'] ?? null,
      avgDuration: metrics.http_req_duration?.values?.avg ?? null,
    },
    signup: {
      p95Duration: metrics.signup_duration?.values?.['p(95)'] ?? null,
      raceAttempts: metrics.signup_race_attempts?.values?.count ?? 0,
      duplicateAccounts: metrics.signup_race_double_account?.values?.count ?? 0,
      rateLimited429: metrics.signup_rate_limited?.values?.count ?? 0,
      serverErrors5xx: metrics.signup_5xx_responses?.values?.count ?? 0,
    },
    throughput: {
      requestsPerSecond: metrics.http_reqs?.values?.rate ?? 0,
      totalRequests: metrics.http_reqs?.values?.count ?? 0,
      failedRate: metrics.http_req_failed?.values?.rate ?? 0,
    },
  };

  return {
    'reports/signup-eligibility-summary.json': JSON.stringify(stats, null, 2),
    stdout: `
====================================================================
        SIGNUP -> ELIGIBILITY LOAD TEST (DR-906)
====================================================================
  Thresholds:            p95 < 800ms, error rate < 1%
  P95 Duration:          ${Number(stats.journey.p95Duration ?? 0).toFixed(2)}ms
  Failed Rate:           ${(stats.throughput.failedRate * 100).toFixed(2)}%
  Journey Success:       ${((stats.journey.successRate ?? 0) * 100).toFixed(2)}%
  Signup P95:            ${Number(stats.signup.p95Duration ?? 0).toFixed(2)}ms
  Race attempts:         ${stats.signup.raceAttempts}
  Duplicate accounts:    ${stats.signup.duplicateAccounts}  (MUST be 0)
  5xx responses:         ${stats.signup.serverErrors5xx}  (MUST be 0)
  Rate-limited (429):    ${stats.signup.rateLimited429}
  Requests/sec:          ${stats.throughput.requestsPerSecond.toFixed(2)}
  Total requests:        ${stats.throughput.totalRequests}
====================================================================
`,
  };
}
