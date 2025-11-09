import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend, Counter } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');
const pageLoadTime = new Trend('page_load_time');
const requestCounter = new Counter('requests');

// Test configuration
export const options = {
  stages: [
    { duration: '2m', target: 50 },  // Ramp up to 50 users
    { duration: '5m', target: 50 },  // Stay at 50 users
    { duration: '2m', target: 100 }, // Ramp up to 100 users
    { duration: '5m', target: 100 }, // Stay at 100 users
    { duration: '2m', target: 0 },   // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
    http_req_failed: ['rate<0.01'],   // Error rate should be below 1%
    errors: ['rate<0.1'],              // Custom error rate should be below 10%
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

// Critical paths to test
const criticalPaths = [
  '/',
  '/services/water-damage-restoration',
  '/services/fire-damage-restoration',
  '/services/mould-remediation',
  '/services/storm-damage-restoration',
  '/emergency',
  '/locations/hamilton',
  '/locations/ascot',
  '/insurance/suncorp',
];

export default function () {
  // Select random path weighted towards homepage and water damage
  const path = weightedPathSelection();

  const response = http.get(`${BASE_URL}${path}`, {
    tags: { name: path },
    timeout: '30s',
  });

  // Track metrics
  requestCounter.add(1);
  pageLoadTime.add(response.timings.duration);

  // Validation checks
  const success = check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
    'response time < 1000ms': (r) => r.timings.duration < 1000,
    'response time < 2000ms': (r) => r.timings.duration < 2000,
    'has content': (r) => r.body.length > 0,
    'has emergency phone': (r) => r.body.includes('1300 309 361'),
    'has correct title': (r) => r.body.includes('<title>'),
    'no server errors': (r) => r.status < 500,
  });

  if (!success) {
    errorRate.add(1);
  }

  // Think time - simulate real user behavior
  sleep(Math.random() * 3 + 1); // 1-4 seconds
}

// Weighted path selection (favor high-traffic pages)
function weightedPathSelection() {
  const rand = Math.random();

  if (rand < 0.3) return '/'; // 30% homepage
  if (rand < 0.5) return '/services/water-damage-restoration'; // 20% water damage
  if (rand < 0.6) return '/emergency'; // 10% emergency
  if (rand < 0.7) return '/services/fire-damage-restoration'; // 10% fire
  if (rand < 0.8) return '/services/mould-remediation'; // 10% mould

  // 20% random from remaining paths
  const remaining = criticalPaths.filter(p =>
    !['/', '/services/water-damage-restoration', '/emergency',
      '/services/fire-damage-restoration', '/services/mould-remediation'].includes(p)
  );

  return remaining[Math.floor(Math.random() * remaining.length)];
}

// Spike test scenario
export function spikeTest() {
  const response = http.get(`${BASE_URL}/`);

  check(response, {
    'spike test: status is 200': (r) => r.status === 200,
    'spike test: response time acceptable': (r) => r.timings.duration < 2000,
  });

  sleep(1);
}

// Stress test scenario
export function stressTest() {
  const paths = criticalPaths;

  for (const path of paths) {
    const response = http.get(`${BASE_URL}${path}`);

    check(response, {
      [`stress test ${path}: status OK`]: (r) => r.status === 200,
      [`stress test ${path}: fast response`]: (r) => r.timings.duration < 1000,
    });
  }

  sleep(0.5);
}

// Soak test scenario (long duration, moderate load)
export function soakTest() {
  const response = http.get(`${BASE_URL}${criticalPaths[Math.floor(Math.random() * criticalPaths.length)]}`);

  check(response, {
    'soak test: status is 200': (r) => r.status === 200,
    'soak test: no memory leaks': (r) => r.timings.duration < 1000,
  });

  sleep(2);
}
