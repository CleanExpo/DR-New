/**
 * Database Connection Pool Stress Test
 * Tests database performance and connection pooling under heavy load
 * Run: k6 run stress/database-pooling.js
 */

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate, Gauge, Counter } from 'k6/metrics';
import { getBaseUrl, getHeaders, thinkTime } from '../lib/helpers.js';

// Custom metrics
const dbQueryDuration = new Trend('database_query_duration');
const dbSuccessRate = new Rate('database_success_rate');
const connectionErrors = new Counter('connection_errors');
const serverErrors = new Counter('server_errors');

// Test configuration - aggressive connection pool testing
export const options = {
  scenarios: {
    connection_pool_stress: {
      executor: 'constant-arrival-rate',
      rate: 500,          // 500 requests per second
      timeUnit: '1s',
      duration: '10m',
      preAllocatedVUs: 1000,
      maxVUs: 2000,
    },
  },
  thresholds: {
    'database_query_duration': ['p(95)<200', 'p(99)<500'],
    'database_success_rate': ['rate>0.95'],
    'http_req_failed': ['rate<0.05'],
  },
};

// Endpoints that hit the database heavily
const databaseEndpoints = [
  '/api/admin/analytics/dashboard',
  '/api/admin/contractors',
  '/api/admin/clients',
  '/api/contractor/available-requests',
  '/api/client/claims',
  '/api/bookings',
  '/api/notifications',
  '/api/messages',
];

export default function () {
  const baseUrl = getBaseUrl();
  const headers = getHeaders();

  // Randomly select a database-heavy endpoint
  const endpoint = databaseEndpoints[Math.floor(Math.random() * databaseEndpoints.length)];

  const startTime = Date.now();
  const res = http.get(`${baseUrl}${endpoint}`, {
    headers,
    timeout: '30s',
  });
  const duration = Date.now() - startTime;

  dbQueryDuration.add(duration);

  // Track different response types
  const success = res.status === 200 || res.status === 401 || res.status === 404;
  const connectionError = res.status === 502 || res.status === 503 || res.status === 504;
  const serverError = res.status === 500;

  if (connectionError) {
    connectionErrors.add(1);
  }

  if (serverError) {
    serverErrors.add(1);
  }

  dbSuccessRate.add(success);

  check(res, {
    'database endpoint responds': (r) => r.status < 500,
    'no connection pool exhaustion': (r) => r.status !== 503,
    'no gateway timeout': (r) => r.status !== 504,
    'response under 500ms': () => duration < 500,
  });

  // Minimal think time for stress testing
  sleep(0.1);
}

export function handleSummary(data) {
  const { metrics } = data;

  return {
    'reports/database-stress-results.json': JSON.stringify({
      timestamp: new Date().toISOString(),
      database: {
        avgQueryTime: metrics.database_query_duration?.values?.avg || 0,
        p95QueryTime: metrics.database_query_duration?.values?.['p(95)'] || 0,
        p99QueryTime: metrics.database_query_duration?.values?.['p(99)'] || 0,
        successRate: metrics.database_success_rate?.values?.rate || 0,
        connectionErrors: metrics.connection_errors?.values?.count || 0,
        serverErrors: metrics.server_errors?.values?.count || 0,
      },
      throughput: {
        rps: metrics.http_reqs?.values?.rate || 0,
        total: metrics.http_reqs?.values?.count || 0,
      },
    }, null, 2),
    stdout: `
╔══════════════════════════════════════════════════════════════════╗
║         DATABASE CONNECTION POOL STRESS TEST                    ║
╚══════════════════════════════════════════════════════════════════╝

🗄️  DATABASE PERFORMANCE
───────────────────────────────────────────────────────────────────
  Avg Query Time:     ${(metrics.database_query_duration?.values?.avg || 0).toFixed(2)}ms
  P95 Query Time:     ${(metrics.database_query_duration?.values?.['p(95)'] || 0).toFixed(2)}ms
  P99 Query Time:     ${(metrics.database_query_duration?.values?.['p(99)'] || 0).toFixed(2)}ms
  Success Rate:       ${((metrics.database_success_rate?.values?.rate || 0) * 100).toFixed(2)}%

⚠️  ERRORS
───────────────────────────────────────────────────────────────────
  Connection Errors:  ${metrics.connection_errors?.values?.count || 0}
  Server Errors:      ${metrics.server_errors?.values?.count || 0}

📊 THROUGHPUT
───────────────────────────────────────────────────────────────────
  Requests/sec:       ${(metrics.http_reqs?.values?.rate || 0).toFixed(2)}
  Total Requests:     ${metrics.http_reqs?.values?.count || 0}
═══════════════════════════════════════════════════════════════════
`,
  };
}
