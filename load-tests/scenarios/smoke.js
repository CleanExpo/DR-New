/**
 * Smoke Test
 * Quick validation of critical endpoints
 * Run: k6 run scenarios/smoke.js
 */

import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate, Trend } from 'k6/metrics';
import { getBaseUrl, getHeaders } from '../lib/helpers.js';

// Custom metrics
const errorRate = new Rate('errors');
const healthCheckDuration = new Trend('health_check_duration');
const apiDuration = new Trend('api_duration');

// Test configuration
export const options = {
  vus: 10,
  duration: '2m',
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
    errors: ['rate<0.01'],
  },
};

export default function () {
  const baseUrl = getBaseUrl();
  const headers = getHeaders();

  group('Health Checks', function () {
    // Basic health endpoint
    const healthRes = http.get(`${baseUrl}/api/health`, { headers });
    healthCheckDuration.add(healthRes.timings.duration);

    check(healthRes, {
      'health endpoint responds': (r) => r.status === 200,
      'health check fast': (r) => r.timings.duration < 200,
    }) || errorRate.add(1);

    sleep(0.5);
  });

  group('Public Endpoints', function () {
    // Homepage
    const homeRes = http.get(baseUrl, { headers });
    apiDuration.add(homeRes.timings.duration);

    check(homeRes, {
      'homepage loads': (r) => r.status === 200 || r.status === 304,
      'homepage fast': (r) => r.timings.duration < 2000,
    }) || errorRate.add(1);

    sleep(0.5);

    // Claim page
    const claimRes = http.get(`${baseUrl}/claim`, { headers });
    apiDuration.add(claimRes.timings.duration);

    check(claimRes, {
      'claim page loads': (r) => r.status === 200 || r.status === 304,
    }) || errorRate.add(1);

    sleep(0.5);
  });

  group('API Endpoints', function () {
    // CSRF token endpoint
    const csrfRes = http.get(`${baseUrl}/api/csrf/token`, { headers });
    apiDuration.add(csrfRes.timings.duration);

    check(csrfRes, {
      'CSRF endpoint responds': (r) => r.status === 200 || r.status === 404,
    }) || errorRate.add(1);

    sleep(0.5);

    // Public health with CORS
    const publicHealthRes = http.get(`${baseUrl}/api/public/health`, { headers });
    apiDuration.add(publicHealthRes.timings.duration);

    check(publicHealthRes, {
      'public health responds': (r) => r.status === 200 || r.status === 404,
    }) || errorRate.add(1);

    sleep(1);
  });
}

export function handleSummary(data) {
  return {
    'reports/smoke-summary.json': JSON.stringify(data, null, 2),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}

function textSummary(data, options) {
  const { metrics, root_group } = data;

  let summary = '\n=== SMOKE TEST SUMMARY ===\n\n';

  // HTTP metrics
  if (metrics.http_req_duration) {
    summary += `HTTP Request Duration:\n`;
    summary += `  avg: ${metrics.http_req_duration.values.avg.toFixed(2)}ms\n`;
    summary += `  p95: ${metrics.http_req_duration.values['p(95)'].toFixed(2)}ms\n`;
    summary += `  p99: ${metrics.http_req_duration.values['p(99)'].toFixed(2)}ms\n\n`;
  }

  if (metrics.http_reqs) {
    summary += `Total Requests: ${metrics.http_reqs.values.count}\n`;
    summary += `Requests/sec: ${metrics.http_reqs.values.rate.toFixed(2)}\n\n`;
  }

  if (metrics.http_req_failed) {
    summary += `Failed Requests: ${(metrics.http_req_failed.values.rate * 100).toFixed(2)}%\n\n`;
  }

  // Thresholds
  summary += `Thresholds:\n`;
  for (const [name, threshold] of Object.entries(data.thresholds || {})) {
    summary += `  ${name}: ${threshold.ok ? 'PASS' : 'FAIL'}\n`;
  }

  return summary;
}
