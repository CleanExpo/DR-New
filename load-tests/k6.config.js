/**
 * k6 Load Testing Configuration
 * Disaster Recovery NRPG Platform
 * Target: 10,000+ concurrent users
 */

// Performance thresholds for all tests
export const thresholds = {
  // HTTP metrics
  http_req_duration: [
    'p(50)<200',   // 50% of requests under 200ms
    'p(95)<500',   // 95% under 500ms
    'p(99)<1000',  // 99% under 1000ms
    'max<5000',    // Maximum 5 seconds
  ],
  http_req_failed: ['rate<0.01'],  // Less than 1% failures
  http_reqs: ['rate>100'],         // At least 100 req/s baseline

  // Custom metrics for critical flows
  'claim_submission_duration': ['p(95)<800'],
  'matching_algorithm_duration': ['p(95)<1200'],
  'authentication_duration': ['p(95)<300'],
  'payment_webhook_duration': ['p(95)<500'],

  // Database metrics
  'database_query_duration': ['p(99)<100'],
  'redis_operation_duration': ['p(99)<10'],
};

// Load profiles for different scenarios
export const scenarios = {
  // Smoke test - quick validation
  smoke: {
    executor: 'constant-vus',
    vus: 10,
    duration: '2m',
  },

  // Ramp-up to 10K users
  national_scale: {
    executor: 'ramping-vus',
    startVUs: 0,
    stages: [
      { duration: '2m', target: 1000 },   // Ramp to 1K
      { duration: '3m', target: 5000 },   // Ramp to 5K
      { duration: '5m', target: 10000 },  // Ramp to 10K
      { duration: '10m', target: 10000 }, // Sustain 10K
      { duration: '3m', target: 5000 },   // Scale down
      { duration: '2m', target: 0 },      // Ramp down
    ],
    gracefulRampDown: '30s',
  },

  // Spike test - sudden disaster event surge
  disaster_surge: {
    executor: 'ramping-vus',
    startVUs: 1000,
    stages: [
      { duration: '10s', target: 10000 }, // Sudden spike
      { duration: '3m', target: 10000 },  // Sustain peak
      { duration: '30s', target: 1000 },  // Rapid decline
    ],
  },

  // Soak test - sustained load over time
  sustained_load: {
    executor: 'constant-vus',
    vus: 5000,
    duration: '30m',
  },

  // Alpha phase - internal testing
  alpha: {
    executor: 'ramping-vus',
    startVUs: 0,
    stages: [
      { duration: '1m', target: 50 },
      { duration: '5m', target: 100 },
      { duration: '5m', target: 100 },
      { duration: '1m', target: 0 },
    ],
  },

  // Beta phase - contractor testing
  beta: {
    executor: 'ramping-vus',
    startVUs: 0,
    stages: [
      { duration: '2m', target: 200 },
      { duration: '5m', target: 500 },
      { duration: '10m', target: 500 },
      { duration: '2m', target: 0 },
    ],
  },

  // Soft launch - public registration
  soft_launch: {
    executor: 'ramping-vus',
    startVUs: 0,
    stages: [
      { duration: '2m', target: 500 },
      { duration: '5m', target: 2000 },
      { duration: '15m', target: 2000 },
      { duration: '3m', target: 0 },
    ],
  },
};

// Australian location data for realistic tests
export const australianLocations = [
  { suburb: 'Sydney', postcode: '2000', state: 'NSW' },
  { suburb: 'Melbourne', postcode: '3000', state: 'VIC' },
  { suburb: 'Brisbane', postcode: '4000', state: 'QLD' },
  { suburb: 'Perth', postcode: '6000', state: 'WA' },
  { suburb: 'Adelaide', postcode: '5000', state: 'SA' },
  { suburb: 'Hobart', postcode: '7000', state: 'TAS' },
  { suburb: 'Darwin', postcode: '0800', state: 'NT' },
  { suburb: 'Canberra', postcode: '2600', state: 'ACT' },
  { suburb: 'Newcastle', postcode: '2300', state: 'NSW' },
  { suburb: 'Gold Coast', postcode: '4217', state: 'QLD' },
  { suburb: 'Wollongong', postcode: '2500', state: 'NSW' },
  { suburb: 'Geelong', postcode: '3220', state: 'VIC' },
];

// Disaster types for claim submissions
export const disasterTypes = [
  'water-damage',
  'fire-damage',
  'smoke-damage',
  'storm-damage',
  'flood-damage',
  'mould-remediation',
  'biohazard-cleanup',
  'structural-drying',
];

// Service categories
export const serviceCategories = [
  'WATER_DAMAGE',
  'FIRE_DAMAGE',
  'SMOKE_DAMAGE',
  'MOULD_REMEDIATION',
  'STORM_DAMAGE',
  'FLOOD_DAMAGE',
  'STRUCTURAL_DRYING',
];

export default {
  thresholds,
  scenarios,
  australianLocations,
  disasterTypes,
  serviceCategories,
};
