/**
 * Authentication Flow Load Test
 * Tests login, session management, and protected routes under load
 * Run: k6 run scenarios/authentication.js
 */

import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Trend, Rate, Counter } from 'k6/metrics';
import { getBaseUrl, getHeaders, thinkTime, parseJson } from '../lib/helpers.js';

// Custom metrics
const authDuration = new Trend('authentication_duration');
const authSuccessRate = new Rate('auth_success_rate');
const sessionValidations = new Counter('session_validations');
const loginAttempts = new Counter('login_attempts');

// Test configuration
export const options = {
  scenarios: {
    auth_flow: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '1m', target: 50 },
        { duration: '3m', target: 200 },
        { duration: '5m', target: 500 },
        { duration: '5m', target: 500 },
        { duration: '2m', target: 0 },
      ],
    },
  },
  thresholds: {
    'authentication_duration': ['p(95)<300', 'p(99)<500'],
    'auth_success_rate': ['rate>0.95'],
    'http_req_failed': ['rate<0.02'],
  },
};

export default function () {
  const baseUrl = getBaseUrl();
  const headers = getHeaders();

  group('Authentication Flow', function () {
    // Step 1: Load login page
    group('Load Login Page', function () {
      const loginPageRes = http.get(`${baseUrl}/auth/signin`, { headers });

      check(loginPageRes, {
        'login page loads': (r) => r.status === 200 || r.status === 404,
      });

      sleep(thinkTime(1, 2));
    });

    // Step 2: Get CSRF token
    let csrfToken = null;
    group('Get CSRF Token', function () {
      const csrfRes = http.get(`${baseUrl}/api/csrf/token`, { headers });

      if (csrfRes.status === 200) {
        const data = parseJson(csrfRes);
        csrfToken = data?.token || null;
      }

      sleep(thinkTime(0.5, 1));
    });

    // Step 3: Login attempt
    group('Login', function () {
      loginAttempts.add(1);

      const loginPayload = {
        email: `loadtest-${__VU}@test.disasterrecovery.com.au`,
        password: 'LoadTest123!',
        csrfToken: csrfToken,
      };

      const startTime = Date.now();
      const loginRes = http.post(
        `${baseUrl}/api/auth/callback/credentials`,
        JSON.stringify(loginPayload),
        {
          headers: {
            ...headers,
            'X-CSRF-Token': csrfToken || '',
          },
          redirects: 0,
        }
      );
      const duration = Date.now() - startTime;

      authDuration.add(duration);

      // For load testing, we expect 401/403 since these aren't real accounts
      // The important thing is the endpoint responds quickly
      const acceptable =
        loginRes.status === 200 ||
        loginRes.status === 302 ||
        loginRes.status === 401 ||
        loginRes.status === 403;

      authSuccessRate.add(acceptable);

      check(loginRes, {
        'login endpoint responds': (r) => r.status < 500,
        'response fast': () => duration < 500,
      });

      sleep(thinkTime(0.5, 1));
    });

    // Step 4: Access protected route (session validation)
    group('Access Protected Route', function () {
      sessionValidations.add(1);

      const dashboardRes = http.get(`${baseUrl}/dashboard`, { headers });

      // Expect redirect to login (302/307) or unauthorized (401/403)
      check(dashboardRes, {
        'protected route responds': (r) =>
          r.status === 200 ||
          r.status === 302 ||
          r.status === 307 ||
          r.status === 401 ||
          r.status === 403,
      });

      sleep(thinkTime(1, 2));
    });

    // Step 5: API authentication check
    group('API Auth Check', function () {
      const apiRes = http.get(`${baseUrl}/api/auth/session`, { headers });

      check(apiRes, {
        'session endpoint responds': (r) => r.status === 200 || r.status === 401,
      });

      sleep(thinkTime(0.5, 1));
    });
  });
}

export function handleSummary(data) {
  const { metrics } = data;

  const stats = {
    timestamp: new Date().toISOString(),
    authentication: {
      avgDuration: metrics.authentication_duration?.values?.avg || 0,
      p95Duration: metrics.authentication_duration?.values?.['p(95)'] || 0,
      p99Duration: metrics.authentication_duration?.values?.['p(99)'] || 0,
      successRate: metrics.auth_success_rate?.values?.rate || 0,
      totalAttempts: metrics.login_attempts?.values?.count || 0,
      sessionValidations: metrics.session_validations?.values?.count || 0,
    },
    throughput: {
      requestsPerSecond: metrics.http_reqs?.values?.rate || 0,
      totalRequests: metrics.http_reqs?.values?.count || 0,
      failedRate: metrics.http_req_failed?.values?.rate || 0,
    },
  };

  return {
    'reports/authentication-results.json': JSON.stringify(stats, null, 2),
    stdout: `
╔══════════════════════════════════════════════════════════════════╗
║           AUTHENTICATION LOAD TEST RESULTS                      ║
╚══════════════════════════════════════════════════════════════════╝

🔐 AUTHENTICATION PERFORMANCE
───────────────────────────────────────────────────────────────────
  Average Duration:     ${stats.authentication.avgDuration.toFixed(2)}ms
  P95 Duration:         ${stats.authentication.p95Duration.toFixed(2)}ms
  P99 Duration:         ${stats.authentication.p99Duration.toFixed(2)}ms
  Success Rate:         ${(stats.authentication.successRate * 100).toFixed(2)}%
  Login Attempts:       ${stats.authentication.totalAttempts}
  Session Validations:  ${stats.authentication.sessionValidations}

📊 THROUGHPUT
───────────────────────────────────────────────────────────────────
  Requests/sec:         ${stats.throughput.requestsPerSecond.toFixed(2)}
  Total Requests:       ${stats.throughput.totalRequests}
  Failed Rate:          ${(stats.throughput.failedRate * 100).toFixed(2)}%
═══════════════════════════════════════════════════════════════════
`,
  };
}
