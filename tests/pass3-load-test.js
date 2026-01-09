/**
 * PASS 3.1: Load & Stress Testing
 * Tests API performance and reliability under load
 */

const BASE_URL = 'http://localhost:3002';

// Test data generators
const generateValidClaim = () => ({
  step1: {
    disasterType: ['water-damage', 'fire-damage', 'mold', 'storm-damage', 'sewage', 'biohazard'][Math.floor(Math.random() * 6)],
    incidentDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
    isOngoing: Math.random() > 0.5 ? 'yes' : 'no',
    isEmergency: Math.random() > 0.7 ? 'yes' : 'no',
  },
  step2: {
    propertyAddress: `${Math.floor(Math.random() * 999) + 1} Main Street`,
    suburb: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'][Math.floor(Math.random() * 5)],
    postcode: String(Math.floor(Math.random() * 9000) + 1000),
    name: `Test User ${Math.floor(Math.random() * 10000)}`,
    phone: `041${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
    email: `user${Math.floor(Math.random() * 100000)}@test.com`,
  },
  step3: {
    damageDescription: 'This is a test claim submission for load testing purposes. The property has sustained significant damage requiring professional restoration services.',
    hasInsurance: Math.random() > 0.3 ? 'yes' : 'no',
    insuranceProvider: 'Test Insurance Co',
    policyNumber: `POL${Math.floor(Math.random() * 1000000)}`,
    photoUrls: [],
  },
  captchaToken: `captcha_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
});

// Test 1: Rate Limiting (5 claims per hour per IP)
async function testRateLimiting() {
  console.log('\n=== TEST 3.1.1: Rate Limiting ===');
  let passedCount = 0;
  let blockedCount = 0;

  for (let i = 1; i <= 7; i++) {
    try {
      const response = await fetch(`${BASE_URL}/api/public/claims/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(generateValidClaim()),
      });

      if (response.status === 201) {
        passedCount++;
        console.log(`✓ Request ${i}: 201 Created`);
      } else if (response.status === 429) {
        blockedCount++;
        console.log(`✓ Request ${i}: 429 Rate Limited (Expected after 5)`);
      } else {
        console.log(`✗ Request ${i}: ${response.status} (Unexpected)`);
      }
    } catch (error) {
      console.error(`✗ Request ${i}: Network error - ${error.message}`);
    }
  }

  console.log(`\nRate Limiting Test: ${passedCount} passed, ${blockedCount} rate-limited`);
  return passedCount >= 5 && blockedCount > 0;
}

// Test 2: Database Persistence (Verify Phase 1 Fix #2)
async function testDatabasePersistence() {
  console.log('\n=== TEST 3.1.2: Database Persistence (Phase 1 Fix #2) ===');

  try {
    const claimData = generateValidClaim();
    const response = await fetch(`${BASE_URL}/api/public/claims/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(claimData),
    });

    if (response.status === 201) {
      const result = await response.json();

      if (result.claimId && result.databaseId) {
        console.log(`✓ Claim submitted: ${result.claimId}`);
        console.log(`✓ Database ID returned: ${result.databaseId}`);
        console.log(`✓ Priority calculated: ${result.priority}`);
        console.log(`✓ Success message: ${result.message}`);
        return true;
      } else {
        console.log(`✗ Missing claimId or databaseId in response`);
        return false;
      }
    } else {
      console.log(`✗ Unexpected status: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error(`✗ Database persistence test failed: ${error.message}`);
    return false;
  }
}

// Test 3: Concurrent Requests
async function testConcurrentRequests() {
  console.log('\n=== TEST 3.1.3: Concurrent Requests (10 simultaneous) ===');

  const promises = [];
  for (let i = 0; i < 10; i++) {
    promises.push(
      fetch(`${BASE_URL}/api/public/claims/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(generateValidClaim()),
      })
        .then(r => ({ status: r.status, index: i }))
        .catch(e => ({ error: e.message, index: i }))
    );
  }

  const results = await Promise.all(promises);
  let successCount = 0;
  let rateLimitedCount = 0;
  let errorCount = 0;

  results.forEach(result => {
    if (result.error) {
      errorCount++;
      console.log(`✗ Request ${result.index}: Network error`);
    } else if (result.status === 201) {
      successCount++;
      console.log(`✓ Request ${result.index}: 201 Created`);
    } else if (result.status === 429) {
      rateLimitedCount++;
      console.log(`⚠ Request ${result.index}: 429 Rate Limited`);
    } else {
      console.log(`✗ Request ${result.index}: ${result.status}`);
    }
  });

  console.log(`\nConcurrent Test: ${successCount} created, ${rateLimitedCount} rate-limited, ${errorCount} errors`);
  return errorCount === 0;
}

// Test 4: CAPTCHA Validation
async function testCaptchaValidation() {
  console.log('\n=== TEST 3.1.4: CAPTCHA Validation ===');

  const claimData = generateValidClaim();

  // Test with valid CAPTCHA
  claimData.captchaToken = `captcha_${Date.now()}_validtoken123456789`;
  const response1 = await fetch(`${BASE_URL}/api/public/claims/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(claimData),
  });

  if (response1.status === 201) {
    console.log('✓ Valid CAPTCHA token accepted');
  } else {
    console.log(`✗ Valid CAPTCHA rejected: ${response1.status}`);
  }

  // Test with invalid CAPTCHA
  claimData.captchaToken = 'invalid_token';
  const response2 = await fetch(`${BASE_URL}/api/public/claims/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(claimData),
  });

  if (response2.status === 400) {
    console.log('✓ Invalid CAPTCHA token rejected');
    return true;
  } else {
    console.log(`✗ Invalid CAPTCHA not rejected: ${response2.status}`);
    return false;
  }
}

// Run all tests
async function runLoadTests() {
  console.log('╔════════════════════════════════════════╗');
  console.log('║  PASS 3.1: Load & Stress Testing      ║');
  console.log('╚════════════════════════════════════════╝');

  const results = {
    'Rate Limiting': await testRateLimiting(),
    'Database Persistence': await testDatabasePersistence(),
    'Concurrent Requests': await testConcurrentRequests(),
    'CAPTCHA Validation': await testCaptchaValidation(),
  };

  console.log('\n╔════════════════════════════════════════╗');
  console.log('║  Test Results Summary                  ║');
  console.log('╚════════════════════════════════════════╝');

  Object.entries(results).forEach(([test, passed]) => {
    console.log(`${passed ? '✓' : '✗'} ${test}`);
  });

  const passedCount = Object.values(results).filter(r => r).length;
  console.log(`\nTotal: ${passedCount}/${Object.keys(results).length} tests passed`);
}

runLoadTests().catch(console.error);
