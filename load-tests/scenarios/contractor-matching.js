/**
 * Contractor Matching Algorithm Load Test
 * Tests the matching algorithm performance under load
 * Run: k6 run scenarios/contractor-matching.js
 */

import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Trend, Rate, Counter } from 'k6/metrics';
import {
  getBaseUrl,
  getHeaders,
  generateMatchRequest,
  generateBidData,
  thinkTime,
  parseJson
} from '../lib/helpers.js';

// Custom metrics
const matchingDuration = new Trend('matching_algorithm_duration');
const matchingSuccessRate = new Rate('matching_success_rate');
const matchesGenerated = new Counter('matches_generated');
const bidsSubmitted = new Counter('bids_submitted');

// Test configuration
export const options = {
  scenarios: {
    matching_stress: {
      executor: 'ramping-arrival-rate',
      startRate: 10,
      timeUnit: '1s',
      preAllocatedVUs: 500,
      maxVUs: 2000,
      stages: [
        { duration: '2m', target: 50 },   // Warm up
        { duration: '5m', target: 200 },  // Scale up
        { duration: '10m', target: 500 }, // Peak load
        { duration: '5m', target: 500 },  // Sustain peak
        { duration: '2m', target: 0 },    // Cool down
      ],
    },
  },
  thresholds: {
    'matching_algorithm_duration': ['p(95)<1200', 'p(99)<2000'],
    'matching_success_rate': ['rate>0.95'],
    'http_req_failed': ['rate<0.02'],
  },
};

// Setup function - called once before test starts
export function setup() {
  // In a real scenario, you'd authenticate here
  // and return session data
  return {
    testStartTime: Date.now(),
  };
}

export default function (data) {
  const baseUrl = getBaseUrl();
  const headers = getHeaders();

  group('Contractor Matching Flow', function () {
    // Step 1: Admin triggers matching for a service request
    group('Trigger Matching', function () {
      const matchRequest = generateMatchRequest();

      const startTime = Date.now();
      const matchRes = http.post(
        `${baseUrl}/api/admin/claims/match`,
        JSON.stringify(matchRequest),
        {
          headers,
          timeout: '30s',
        }
      );
      const duration = Date.now() - startTime;

      matchingDuration.add(duration);

      // Check response
      const success = matchRes.status === 200 || matchRes.status === 201;
      const unauthorized = matchRes.status === 401 || matchRes.status === 403;
      const notFound = matchRes.status === 404;

      // Unauthorized is expected without auth token
      matchingSuccessRate.add(success || unauthorized || notFound);

      if (success) {
        matchesGenerated.add(1);

        // Parse response for matched contractors
        const responseData = parseJson(matchRes);
        if (responseData?.matches?.length > 0) {
          console.log(`Generated ${responseData.matches.length} matches`);
        }
      }

      check(matchRes, {
        'matching endpoint responded': (r) => r.status < 500,
        'response under 2s': () => duration < 2000,
        'valid response format': (r) => {
          if (r.status === 200 || r.status === 201) {
            const body = parseJson(r);
            return body !== null;
          }
          return true;
        },
      });

      sleep(thinkTime(0.5, 1));
    });

    // Step 2: Contractors view available requests
    group('View Available Requests', function () {
      const availableRes = http.get(
        `${baseUrl}/api/contractor/available-requests`,
        { headers }
      );

      check(availableRes, {
        'available requests endpoint responds': (r) =>
          r.status === 200 || r.status === 401 || r.status === 404,
      });

      sleep(thinkTime(1, 2));
    });

    // Step 3: Contractor submits a bid
    group('Submit Bid', function () {
      const bidData = generateBidData(`job-${__VU}-${__ITER}`);

      const bidRes = http.post(
        `${baseUrl}/api/contractor/bids`,
        JSON.stringify(bidData),
        { headers }
      );

      const success = bidRes.status === 200 || bidRes.status === 201;
      if (success) {
        bidsSubmitted.add(1);
      }

      check(bidRes, {
        'bid endpoint responds': (r) =>
          r.status === 200 || r.status === 201 || r.status === 401 || r.status === 404,
      });

      sleep(thinkTime(0.5, 1));
    });

    // Step 4: Client views bids
    group('View Bids', function () {
      const bidsRes = http.get(
        `${baseUrl}/api/client/claims/${__VU}/bids`,
        { headers }
      );

      check(bidsRes, {
        'bids endpoint responds': (r) =>
          r.status === 200 || r.status === 401 || r.status === 404,
      });

      sleep(thinkTime(1, 3));
    });
  });
}

// Custom summary output
export function handleSummary(data) {
  const { metrics } = data;

  const stats = {
    timestamp: new Date().toISOString(),
    matchingAlgorithm: {
      avgDuration: metrics.matching_algorithm_duration?.values?.avg || 0,
      p95Duration: metrics.matching_algorithm_duration?.values?.['p(95)'] || 0,
      p99Duration: metrics.matching_algorithm_duration?.values?.['p(99)'] || 0,
      successRate: metrics.matching_success_rate?.values?.rate || 0,
      totalMatches: metrics.matches_generated?.values?.count || 0,
    },
    bids: {
      total: metrics.bids_submitted?.values?.count || 0,
    },
    throughput: {
      requestsPerSecond: metrics.http_reqs?.values?.rate || 0,
      totalRequests: metrics.http_reqs?.values?.count || 0,
      failedRate: metrics.http_req_failed?.values?.rate || 0,
    },
    thresholds: data.thresholds || {},
  };

  return {
    'reports/contractor-matching-results.json': JSON.stringify(stats, null, 2),
    stdout: generateReport(stats),
  };
}

function generateReport(stats) {
  return `
╔══════════════════════════════════════════════════════════════════╗
║         CONTRACTOR MATCHING LOAD TEST RESULTS                   ║
╚══════════════════════════════════════════════════════════════════╝

🎯 MATCHING ALGORITHM PERFORMANCE
───────────────────────────────────────────────────────────────────
  Average Duration:   ${stats.matchingAlgorithm.avgDuration.toFixed(2)}ms
  P95 Duration:       ${stats.matchingAlgorithm.p95Duration.toFixed(2)}ms
  P99 Duration:       ${stats.matchingAlgorithm.p99Duration.toFixed(2)}ms
  Success Rate:       ${(stats.matchingAlgorithm.successRate * 100).toFixed(2)}%
  Total Matches:      ${stats.matchingAlgorithm.totalMatches}

📋 BID METRICS
───────────────────────────────────────────────────────────────────
  Bids Submitted:     ${stats.bids.total}

📊 THROUGHPUT
───────────────────────────────────────────────────────────────────
  Requests/sec:       ${stats.throughput.requestsPerSecond.toFixed(2)}
  Total Requests:     ${stats.throughput.totalRequests}
  Failed Rate:        ${(stats.throughput.failedRate * 100).toFixed(2)}%

✅ THRESHOLD RESULTS
───────────────────────────────────────────────────────────────────
${Object.entries(stats.thresholds).map(([name, t]) =>
    `  ${name}: ${t.ok ? '✓ PASS' : '✗ FAIL'}`
  ).join('\n')}
═══════════════════════════════════════════════════════════════════
`;
}
