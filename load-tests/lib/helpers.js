/**
 * Helper utilities for k6 load tests
 */

import { randomItem, randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { australianLocations, disasterTypes, serviceCategories } from '../k6.config.js';

/**
 * Get base URL from environment or default
 */
export function getBaseUrl() {
  return __ENV.BASE_URL || 'https://disaster-recovery-seven.vercel.app';
}

/**
 * Generate a random Australian location
 */
export function randomLocation() {
  return randomItem(australianLocations);
}

/**
 * Generate a random disaster type
 */
export function randomDisasterType() {
  return randomItem(disasterTypes);
}

/**
 * Generate a random service category
 */
export function randomServiceCategory() {
  return randomItem(serviceCategories);
}

/**
 * Generate a unique test email
 */
export function generateTestEmail() {
  return `loadtest-${__VU}-${__ITER}-${Date.now()}@test.disasterrecovery.com.au`;
}

/**
 * Generate a unique test phone (Australian format)
 */
export function generateTestPhone() {
  const prefix = randomItem(['0412', '0413', '0414', '0421', '0422', '0423']);
  const number = randomIntBetween(100000, 999999);
  return `${prefix}${number}`;
}

/**
 * Generate claim form data
 */
export function generateClaimData() {
  const location = randomLocation();

  return {
    step1: {
      disasterType: randomDisasterType(),
      incidentDate: new Date().toISOString(),
      isOngoing: Math.random() > 0.7 ? 'yes' : 'no',
      isEmergency: Math.random() > 0.85 ? 'yes' : 'no',
    },
    step2: {
      name: `Load Test User ${__VU}-${__ITER}`,
      email: generateTestEmail(),
      phone: generateTestPhone(),
      propertyAddress: `${randomIntBetween(1, 500)} Test Street`,
      suburb: location.suburb,
      postcode: location.postcode,
    },
    step3: {
      damageDescription: `Load test damage description for VU ${__VU}, iteration ${__ITER}. This is a simulated claim submission for performance testing purposes. The damage requires professional assessment and remediation services.`,
      hasInsurance: Math.random() > 0.4 ? 'yes' : 'no',
      insuranceProvider: Math.random() > 0.5 ? 'NRMA' : 'Suncorp',
      policyNumber: `POL-${randomIntBetween(100000, 999999)}`,
    },
    captchaToken: `load_test_bypass_${Date.now()}_${__VU}`,
  };
}

/**
 * Generate contractor matching request data
 */
export function generateMatchRequest() {
  const location = randomLocation();

  return {
    serviceRequestId: `sr-loadtest-${__VU}-${__ITER}-${Date.now()}`,
    serviceCategory: randomServiceCategory(),
    location: location.suburb,
    state: location.state,
    postcode: location.postcode,
    urgency: randomItem(['critical', 'urgent', 'standard', 'scheduled']),
    estimatedValue: randomIntBetween(500, 50000),
  };
}

/**
 * Generate bid submission data
 */
export function generateBidData(jobId) {
  return {
    jobId: jobId,
    proposedBudget: randomIntBetween(1000, 25000),
    estimatedDays: randomIntBetween(1, 14),
    message: `Load test bid submission for job ${jobId}. Our team is available to start work within ${randomIntBetween(1, 3)} business days. We have extensive experience in disaster recovery services.`,
    availableFrom: new Date(Date.now() + randomIntBetween(1, 5) * 24 * 60 * 60 * 1000).toISOString(),
  };
}

/**
 * Standard request headers
 */
export function getHeaders(authToken = null) {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'User-Agent': 'k6-load-test/1.0',
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  return headers;
}

/**
 * Calculate think time (realistic user pause)
 */
export function thinkTime(minSeconds = 1, maxSeconds = 3) {
  return randomIntBetween(minSeconds * 1000, maxSeconds * 1000) / 1000;
}

/**
 * Parse JSON response safely
 */
export function parseJson(response) {
  try {
    return JSON.parse(response.body);
  } catch (e) {
    return null;
  }
}
