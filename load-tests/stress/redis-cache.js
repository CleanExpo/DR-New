/**
 * Redis Cache Performance Test
 * Tests Redis caching and rate limiting under heavy load
 * Run: k6 run stress/redis-cache.js
 */

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate, Counter } from 'k6/metrics';
import { getBaseUrl, getHeaders } from '../lib/helpers.js';

// Custom metrics
const redisDuration = new Trend('redis_operation_duration');
const cacheHitRate = new Rate('redis_cache_hit_rate');
const rateLimitHits = new Counter('rate_limit_hits');
const cacheableRequests = new Counter('cacheable_requests');

// Test configuration
export const options = {
  scenarios: {
    cache_stress: {
      executor: 'constant-vus',
      vus: 500,
      duration: '10m',
    },
  },
  thresholds: {
    'redis_operation_duration': ['p(95)<50', 'p(99)<100'],
    'redis_cache_hit_rate': ['rate>0.7'],
    'http_req_failed': ['rate<0.05'],
  },
};

// Endpoints that should be cached
const cacheableEndpoints = [
  '/api/public/health',
  '/api/health',
  '/',
  '/claim',
  '/about',
  '/pricing',
];

export default function () {
  const baseUrl = getBaseUrl();
  const headers = getHeaders();

  // Randomly select a cacheable endpoint
  const endpoint = cacheableEndpoints[Math.floor(Math.random() * cacheableEndpoints.length)];

  cacheableRequests.add(1);

  const startTime = Date.now();
  const res = http.get(`${baseUrl}${endpoint}`, {
    headers,
    timeout: '10s',
  });
  const duration = Date.now() - startTime;

  redisDuration.add(duration);

  // Check for cache headers
  const cacheHit =
    res.headers['X-Cache'] === 'HIT' ||
    res.headers['X-Cache-Hit'] === 'true' ||
    res.headers['X-From-Cache'] === 'true' ||
    res.headers['CF-Cache-Status'] === 'HIT' ||
    res.headers['X-Vercel-Cache'] === 'HIT';

  cacheHitRate.add(cacheHit);

  // Check for rate limiting
  if (res.status === 429) {
    rateLimitHits.add(1);
  }

  check(res, {
    'endpoint responds': (r) => r.status !== 503 && r.status !== 504,
    'fast response (potential cache hit)': () => duration < 100,
    'rate limiter working': (r) => r.status !== 500,
  });

  // Minimal sleep for stress testing
  sleep(0.05);
}

export function handleSummary(data) {
  const { metrics } = data;

  return {
    'reports/redis-cache-results.json': JSON.stringify({
      timestamp: new Date().toISOString(),
      redis: {
        avgOperationTime: metrics.redis_operation_duration?.values?.avg || 0,
        p95OperationTime: metrics.redis_operation_duration?.values?.['p(95)'] || 0,
        p99OperationTime: metrics.redis_operation_duration?.values?.['p(99)'] || 0,
        cacheHitRate: metrics.redis_cache_hit_rate?.values?.rate || 0,
        rateLimitHits: metrics.rate_limit_hits?.values?.count || 0,
        cacheableRequests: metrics.cacheable_requests?.values?.count || 0,
      },
      throughput: {
        rps: metrics.http_reqs?.values?.rate || 0,
        total: metrics.http_reqs?.values?.count || 0,
      },
    }, null, 2),
    stdout: `
╔══════════════════════════════════════════════════════════════════╗
║            REDIS CACHE PERFORMANCE TEST                         ║
╚══════════════════════════════════════════════════════════════════╝

🔴 REDIS PERFORMANCE
───────────────────────────────────────────────────────────────────
  Avg Operation Time:   ${(metrics.redis_operation_duration?.values?.avg || 0).toFixed(2)}ms
  P95 Operation Time:   ${(metrics.redis_operation_duration?.values?.['p(95)'] || 0).toFixed(2)}ms
  P99 Operation Time:   ${(metrics.redis_operation_duration?.values?.['p(99)'] || 0).toFixed(2)}ms

📊 CACHE METRICS
───────────────────────────────────────────────────────────────────
  Cache Hit Rate:       ${((metrics.redis_cache_hit_rate?.values?.rate || 0) * 100).toFixed(2)}%
  Cacheable Requests:   ${metrics.cacheable_requests?.values?.count || 0}
  Rate Limit Hits:      ${metrics.rate_limit_hits?.values?.count || 0}

📈 THROUGHPUT
───────────────────────────────────────────────────────────────────
  Requests/sec:         ${(metrics.http_reqs?.values?.rate || 0).toFixed(2)}
  Total Requests:       ${metrics.http_reqs?.values?.count || 0}
═══════════════════════════════════════════════════════════════════
`,
  };
}
