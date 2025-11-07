/**
 * K6 Load Testing Script for Disaster Recovery Website
 * Run with: k6 run __tests__/load/load-testing.k6.js
 */

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');
const pageLoadTime = new Trend('page_load_time');

// Test configuration
export const options = {
  stages: [
    { duration: '30s', target: 10 },  // Ramp up to 10 users
    { duration: '1m', target: 50 },   // Ramp up to 50 users
    { duration: '2m', target: 100 },  // Stay at 100 users
    { duration: '30s', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% of requests should be below 2s
    errors: ['rate<0.1'],               // Error rate should be below 10%
    http_req_failed: ['rate<0.05'],     // Failed requests should be below 5%
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export default function () {
  // Homepage load test
  let response = http.get(BASE_URL);
  check(response, {
    'homepage status is 200': (r) => r.status === 200,
    'homepage loads in <2s': (r) => r.timings.duration < 2000,
  });
  errorRate.add(response.status !== 200);
  pageLoadTime.add(response.timings.duration);
  sleep(1);

  // Services page load test
  response = http.get(`${BASE_URL}/services`);
  check(response, {
    'services page status is 200': (r) => r.status === 200,
    'services page loads in <2s': (r) => r.timings.duration < 2000,
  });
  errorRate.add(response.status !== 200);
  sleep(1);

  // Water damage service page
  response = http.get(`${BASE_URL}/services/water-damage-restoration-brisbane`);
  check(response, {
    'water damage page status is 200': (r) => r.status === 200,
    'water damage page loads in <2s': (r) => r.timings.duration < 2000,
    'contains Master Restorer': (r) => r.body.includes('Master Restorer'),
  });
  errorRate.add(response.status !== 200);
  sleep(1);

  // Search API load test
  response = http.get(`${BASE_URL}/api/search?q=water+damage+Brisbane`);
  check(response, {
    'search API responds': (r) => r.status === 200 || r.status === 404,
    'search API is fast': (r) => r.timings.duration < 1000,
  });
  sleep(1);

  // Emergency contact page
  response = http.get(`${BASE_URL}/book-service`);
  check(response, {
    'booking page status is 200': (r) => r.status === 200,
  });
  errorRate.add(response.status !== 200);
  sleep(2);
}

// Setup function (runs once at start)
export function setup() {
  console.log(`Starting load test against ${BASE_URL}`);
}

// Teardown function (runs once at end)
export function teardown(data) {
  console.log('Load test completed');
}
