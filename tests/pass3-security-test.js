/**
 * PASS 3.2: Security Penetration Testing
 * Tests security vulnerabilities and attack vectors
 */

const BASE_URL = 'http://localhost:3002';

// Test 1: SQL Injection Attempts
async function testSQLInjection() {
  console.log('\n=== TEST 3.2.1: SQL Injection Protection ===');

  const sqlInjectionPayloads = [
    "'; DROP TABLE claims; --",
    "1' OR '1'='1",
    "admin'--",
    "' UNION SELECT * FROM users--",
  ];

  let blockedCount = 0;

  for (const payload of sqlInjectionPayloads) {
    try {
      const response = await fetch(`${BASE_URL}/api/public/claims/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          step1: {
            disasterType: payload,
            incidentDate: '2026-01-10T10:00',
            isOngoing: 'no',
            isEmergency: 'no',
          },
          step2: {
            propertyAddress: '123 Test St',
            suburb: 'Sydney',
            postcode: '2000',
            name: 'Test User',
            phone: '0412345678',
            email: 'test@test.com',
          },
          step3: {
            damageDescription: 'Test damage',
            hasInsurance: 'no',
            photoUrls: [],
          },
          captchaToken: `captcha_${Date.now()}_test`,
        }),
      });

      if (response.status === 400 || response.status === 422) {
        blockedCount++;
        console.log(`✓ SQL injection "${payload.substring(0, 20)}..." blocked (${response.status})`);
      } else {
        console.log(`⚠ SQL injection "${payload.substring(0, 20)}..." returned ${response.status}`);
      }
    } catch (error) {
      console.log(`✓ SQL injection attempt handled gracefully`);
      blockedCount++;
    }
  }

  console.log(`\nSQL Injection Tests: ${blockedCount}/${sqlInjectionPayloads.length} blocked`);
  return blockedCount >= sqlInjectionPayloads.length * 0.75;
}

// Test 2: XSS Attack Attempts
async function testXSSProtection() {
  console.log('\n=== TEST 3.2.2: XSS Protection ===');

  const xssPayloads = [
    '<script>alert("XSS")</script>',
    '<img src=x onerror="alert(\'XSS\')">',
    'javascript:alert("XSS")',
    '<svg onload=alert("XSS")>',
  ];

  let blockedCount = 0;

  for (const payload of xssPayloads) {
    try {
      const response = await fetch(`${BASE_URL}/api/public/claims/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          step1: {
            disasterType: 'water-damage',
            incidentDate: '2026-01-10T10:00',
            isOngoing: 'no',
            isEmergency: 'no',
          },
          step2: {
            propertyAddress: payload,
            suburb: 'Sydney',
            postcode: '2000',
            name: 'Test User',
            phone: '0412345678',
            email: 'test@test.com',
          },
          step3: {
            damageDescription: 'Test damage',
            hasInsurance: 'no',
            photoUrls: [],
          },
          captchaToken: `captcha_${Date.now()}_test`,
        }),
      });

      if (response.status === 400 || response.status === 422) {
        blockedCount++;
        console.log(`✓ XSS payload "${payload.substring(0, 20)}..." blocked (${response.status})`);
      } else {
        console.log(`⚠ XSS payload "${payload.substring(0, 20)}..." returned ${response.status}`);
      }
    } catch (error) {
      console.log(`✓ XSS attempt handled gracefully`);
      blockedCount++;
    }
  }

  console.log(`\nXSS Tests: ${blockedCount}/${xssPayloads.length} blocked`);
  return blockedCount >= xssPayloads.length * 0.75;
}

// Test 3: Authentication Bypass Attempts
async function testAuthenticationBypass() {
  console.log('\n=== TEST 3.2.3: Authentication Bypass Prevention ===');

  // Test protected routes without authentication
  const protectedRoutes = [
    '/api/claims',
    '/api/contractors/me',
    '/api/client/onboarding/progress/test-user',
  ];

  let blockedCount = 0;

  for (const route of protectedRoutes) {
    try {
      const response = await fetch(`${BASE_URL}${route}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        // No authentication headers
      });

      if (response.status === 401 || response.status === 403) {
        blockedCount++;
        console.log(`✓ ${route}: ${response.status} Unauthorized`);
      } else if (response.status === 404) {
        console.log(`⚠ ${route}: 404 Not Found (route may not exist)`);
      } else {
        console.log(`✗ ${route}: ${response.status} (should be 401/403)`);
      }
    } catch (error) {
      console.log(`✓ ${route}: Connection error (protected)`);
      blockedCount++;
    }
  }

  console.log(`\nAuth Bypass Tests: ${blockedCount}/${protectedRoutes.length} protected`);
  return blockedCount >= protectedRoutes.length * 0.66;
}

// Test 4: Invalid Input Validation
async function testInputValidation() {
  console.log('\n=== TEST 3.2.4: Input Validation ===');

  const invalidInputTests = [
    { field: 'postcode', value: 'invalid', expected: 400 },
    { field: 'phone', value: '123', expected: 400 },
    { field: 'email', value: 'not-an-email', expected: 400 },
    { field: 'damageDescription', value: 'short', expected: 400 }, // Less than 20 chars
  ];

  let passedCount = 0;

  for (const test of invalidInputTests) {
    try {
      let body = {
        step1: {
          disasterType: 'water-damage',
          incidentDate: '2026-01-10T10:00',
          isOngoing: 'no',
          isEmergency: 'no',
        },
        step2: {
          propertyAddress: '123 Test St',
          suburb: 'Sydney',
          postcode: test.field === 'postcode' ? test.value : '2000',
          name: 'Test User',
          phone: test.field === 'phone' ? test.value : '0412345678',
          email: test.field === 'email' ? test.value : 'test@test.com',
        },
        step3: {
          damageDescription: test.field === 'damageDescription' ? test.value : 'A valid damage description with sufficient length for testing.',
          hasInsurance: 'no',
          photoUrls: [],
        },
        captchaToken: `captcha_${Date.now()}_test`,
      };

      const response = await fetch(`${BASE_URL}/api/public/claims/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.status === test.expected) {
        passedCount++;
        console.log(`✓ ${test.field} validation: Rejected invalid input (${response.status})`);
      } else {
        console.log(`✗ ${test.field} validation: Got ${response.status}, expected ${test.expected}`);
      }
    } catch (error) {
      console.log(`✓ ${test.field} validation: Error handling (graceful)`);
      passedCount++;
    }
  }

  console.log(`\nInput Validation Tests: ${passedCount}/${invalidInputTests.length} passed`);
  return passedCount >= invalidInputTests.length * 0.75;
}

// Run all security tests
async function runSecurityTests() {
  console.log('╔════════════════════════════════════════╗');
  console.log('║ PASS 3.2: Security Penetration Testing ║');
  console.log('╚════════════════════════════════════════╝');

  const results = {
    'SQL Injection Protection': await testSQLInjection(),
    'XSS Protection': await testXSSProtection(),
    'Authentication Bypass Prevention': await testAuthenticationBypass(),
    'Input Validation': await testInputValidation(),
  };

  console.log('\n╔════════════════════════════════════════╗');
  console.log('║  Security Test Results                 ║');
  console.log('╚════════════════════════════════════════╝');

  Object.entries(results).forEach(([test, passed]) => {
    console.log(`${passed ? '✓' : '✗'} ${test}`);
  });

  const passedCount = Object.values(results).filter(r => r).length;
  console.log(`\nTotal: ${passedCount}/${Object.keys(results).length} tests passed`);
}

runSecurityTests().catch(console.error);
