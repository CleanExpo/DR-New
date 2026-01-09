const BASE_URL = 'http://localhost:3003';

async function debugValidation() {
  console.log('=== VALIDATION DEBUG TEST ===\n');

  const testClaim = {
    step1: {
      disasterType: 'water-damage',
      incidentDate: '2026-01-10T10:00',
      isOngoing: 'no',
      isEmergency: 'no',
    },
    step2: {
      propertyAddress: '123 Main Street',
      suburb: 'Sydney',
      postcode: '2000',
      name: 'Test User',
      phone: '0412345678',
      email: 'test@example.com',
    },
    step3: {
      damageDescription: 'This is a valid damage description with sufficient detail about the property damage.',
      hasInsurance: 'no',
      insuranceProvider: '',
      policyNumber: '',
      photoUrls: [],
    },
    captchaToken: `captcha_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  };

  console.log('Test Data:\n' + JSON.stringify(testClaim, null, 2) + '\n');

  try {
    const response = await fetch(`${BASE_URL}/api/public/claims/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testClaim),
    });

    const data = await response.json();

    console.log(`Status: ${response.status}`);
    console.log('Response:\n' + JSON.stringify(data, null, 2));

    if (response.status === 201) {
      console.log('\n✓ Validation passed - claim submitted successfully');
      console.log(`Claim ID: ${data.claimId}`);
      console.log(`Database ID: ${data.databaseId}`);
    } else if (response.status === 400) {
      console.log('\n✗ Validation error - claim rejected');
      if (data.details) {
        console.log('Validation details:');
        data.details.forEach(error => {
          console.log(`  - ${error.path}: ${error.message}`);
        });
      }
    } else if (response.status === 500) {
      console.log('\n✗ Database error');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

debugValidation();
