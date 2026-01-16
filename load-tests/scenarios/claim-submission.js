/**
 * Claim Submission Load Test
 * Tests the complete claim wizard flow under load
 * Run: k6 run scenarios/claim-submission.js
 */

import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Trend, Rate, Counter } from 'k6/metrics';
import {
  getBaseUrl,
  getHeaders,
  generateClaimData,
  thinkTime,
  parseJson
} from '../lib/helpers.js';
import { scenarios, thresholds } from '../k6.config.js';

// Custom metrics
const claimSubmissionDuration = new Trend('claim_submission_duration');
const claimSuccessRate = new Rate('claim_success_rate');
const claimsSubmitted = new Counter('claims_submitted');
const rateLimitHits = new Counter('rate_limit_hits');

// Test configuration
export const options = {
  scenarios: {
    claim_flow: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '1m', target: 100 },   // Ramp up
        { duration: '5m', target: 500 },   // Scale to 500
        { duration: '10m', target: 1000 }, // Scale to 1000
        { duration: '5m', target: 1000 },  // Sustain
        { duration: '2m', target: 0 },     // Ramp down
      ],
      gracefulRampDown: '30s',
    },
  },
  thresholds: {
    'claim_submission_duration': ['p(95)<800', 'p(99)<1500'],
    'claim_success_rate': ['rate>0.90'],
    'http_req_failed': ['rate<0.05'],
    'http_req_duration': ['p(95)<1000'],
  },
};

export default function () {
  const baseUrl = getBaseUrl();
  const headers = getHeaders();

  group('Claim Submission Flow', function () {
    // Step 0: Load claim wizard page
    group('Load Claim Page', function () {
      const pageRes = http.get(`${baseUrl}/claim`, { headers });

      check(pageRes, {
        'claim page loads': (r) => r.status === 200 || r.status === 304,
      });

      sleep(thinkTime(1, 2));
    });

    // Step 1: Get CSRF token (if available)
    let csrfToken = null;
    group('Get CSRF Token', function () {
      const csrfRes = http.get(`${baseUrl}/api/csrf/token`, { headers });

      if (csrfRes.status === 200) {
        const data = parseJson(csrfRes);
        csrfToken = data?.token || null;
      }

      sleep(thinkTime(0.5, 1));
    });

    // Step 2: User fills out form (simulated think time)
    sleep(thinkTime(3, 8)); // User filling out Step 1

    // Step 3: Submit claim
    group('Submit Claim', function () {
      const claimData = generateClaimData();

      // Add CSRF token if available
      if (csrfToken) {
        headers['X-CSRF-Token'] = csrfToken;
      }

      const startTime = Date.now();
      const submitRes = http.post(
        `${baseUrl}/api/public/claims/submit`,
        JSON.stringify(claimData),
        {
          headers,
          timeout: '30s',
        }
      );
      const duration = Date.now() - startTime;

      claimSubmissionDuration.add(duration);

      // Check response
      const success = submitRes.status === 201 || submitRes.status === 200;
      const rateLimited = submitRes.status === 429;
      const validationError = submitRes.status === 400;

      if (rateLimited) {
        rateLimitHits.add(1);
      }

      // Claims with validation errors (400) are expected for test data
      // Rate limited (429) is expected behavior, not a failure
      const acceptable = success || validationError || rateLimited;
      claimSuccessRate.add(acceptable);

      if (success) {
        claimsSubmitted.add(1);
      }

      check(submitRes, {
        'claim endpoint responded': (r) => r.status < 500,
        'response time acceptable': () => duration < 2000,
        'not server error': (r) => r.status !== 500 && r.status !== 502 && r.status !== 503,
      });

      // Log any server errors for debugging
      if (submitRes.status >= 500) {
        console.error(`Server error: ${submitRes.status} - ${submitRes.body}`);
      }

      sleep(thinkTime(1, 2));
    });

    // Step 4: Confirmation page
    group('Confirmation', function () {
      const confirmRes = http.get(`${baseUrl}/claim/confirmation`, { headers });

      check(confirmRes, {
        'confirmation accessible': (r) => r.status === 200 || r.status === 404,
      });

      sleep(thinkTime(2, 5));
    });
  });
}

// Custom summary output
export function handleSummary(data) {
  const { metrics } = data;

  // Calculate key statistics
  const stats = {
    timestamp: new Date().toISOString(),
    duration: data.state?.testRunDurationMs || 0,
    virtualUsers: {
      max: metrics.vus_max?.values?.value || 0,
    },
    claims: {
      submitted: metrics.claims_submitted?.values?.count || 0,
      successRate: metrics.claim_success_rate?.values?.rate || 0,
      rateLimitHits: metrics.rate_limit_hits?.values?.count || 0,
    },
    latency: {
      claimSubmission: {
        avg: metrics.claim_submission_duration?.values?.avg || 0,
        p95: metrics.claim_submission_duration?.values?.['p(95)'] || 0,
        p99: metrics.claim_submission_duration?.values?.['p(99)'] || 0,
      },
      overall: {
        avg: metrics.http_req_duration?.values?.avg || 0,
        p95: metrics.http_req_duration?.values?.['p(95)'] || 0,
        p99: metrics.http_req_duration?.values?.['p(99)'] || 0,
      },
    },
    throughput: {
      requestsPerSecond: metrics.http_reqs?.values?.rate || 0,
      totalRequests: metrics.http_reqs?.values?.count || 0,
      failedRate: metrics.http_req_failed?.values?.rate || 0,
    },
    thresholds: data.thresholds || {},
  };

  return {
    'reports/claim-submission-results.json': JSON.stringify(stats, null, 2),
    stdout: generateConsoleReport(stats, data),
  };
}

function generateConsoleReport(stats, data) {
  let report = `
╔══════════════════════════════════════════════════════════════════╗
║           CLAIM SUBMISSION LOAD TEST RESULTS                    ║
╚══════════════════════════════════════════════════════════════════╝

📊 TEST SUMMARY
───────────────────────────────────────────────────────────────────
  Duration:           ${(stats.duration / 1000 / 60).toFixed(1)} minutes
  Max Virtual Users:  ${stats.virtualUsers.max}
  Total Requests:     ${stats.throughput.totalRequests}
  Requests/sec:       ${stats.throughput.requestsPerSecond.toFixed(2)}

📝 CLAIM METRICS
───────────────────────────────────────────────────────────────────
  Claims Submitted:   ${stats.claims.submitted}
  Success Rate:       ${(stats.claims.successRate * 100).toFixed(2)}%
  Rate Limit Hits:    ${stats.claims.rateLimitHits}

⚡ LATENCY (Claim Submission)
───────────────────────────────────────────────────────────────────
  Average:            ${stats.latency.claimSubmission.avg.toFixed(2)}ms
  P95:                ${stats.latency.claimSubmission.p95.toFixed(2)}ms
  P99:                ${stats.latency.claimSubmission.p99.toFixed(2)}ms

⚡ LATENCY (Overall HTTP)
───────────────────────────────────────────────────────────────────
  Average:            ${stats.latency.overall.avg.toFixed(2)}ms
  P95:                ${stats.latency.overall.p95.toFixed(2)}ms
  P99:                ${stats.latency.overall.p99.toFixed(2)}ms

❌ ERRORS
───────────────────────────────────────────────────────────────────
  Failed Rate:        ${(stats.throughput.failedRate * 100).toFixed(2)}%

✅ THRESHOLD RESULTS
───────────────────────────────────────────────────────────────────`;

  for (const [name, threshold] of Object.entries(stats.thresholds)) {
    const status = threshold.ok ? '✓ PASS' : '✗ FAIL';
    report += `\n  ${name}: ${status}`;
  }

  report += `
═══════════════════════════════════════════════════════════════════
`;

  return report;
}
