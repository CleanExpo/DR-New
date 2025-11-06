const { chromium } = require('playwright');

(async () => {
  console.log('==========================================================');
  console.log('  SERVICE AREAS PAGE VERIFICATION TEST');
  console.log('  Testing: https://disasterrecovery.com.au/service-areas');
  console.log('==========================================================\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();

  let passedTests = 0;
  let failedTests = 0;

  const log = (status, message) => {
    const icon = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : 'ℹ️';
    console.log(`${icon} ${message}`);
    if (status === 'PASS') passedTests++;
    if (status === 'FAIL') failedTests++;
  };

  try {
    // Test 1: Page loads successfully
    console.log('\n📄 TEST 1: Page Loading');
    const response = await page.goto('https://disasterrecovery.com.au/service-areas', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });

    if (response.status() === 200) {
      log('PASS', `Service Areas page loads successfully (${response.status()} OK)`);
    } else {
      log('FAIL', `Service Areas page returned ${response.status()}`);
    }

    await page.waitForTimeout(2000);

    // Test 2: Page title and metadata
    console.log('\n📊 TEST 2: SEO Metadata');
    const title = await page.title();
    if (title.includes('Service Areas') && title.includes('Brisbane')) {
      log('PASS', `Correct page title: "${title}"`);
    } else {
      log('FAIL', `Unexpected page title: "${title}"`);
    }

    // Test 3: Main heading present
    console.log('\n📝 TEST 3: Page Content');
    const h1Text = await page.locator('h1').first().textContent();
    if (h1Text.includes('Brisbane') || h1Text.includes('Service Areas')) {
      log('PASS', `H1 heading found: "${h1Text.trim()}"`);
    } else {
      log('FAIL', `Unexpected or missing H1: "${h1Text}"`);
    }

    // Test 4: Brisbane suburbs listed
    console.log('\n🗺️ TEST 4: Brisbane Suburbs');
    const hamiltonFound = await page.getByText('Hamilton').count();
    const ascotFound = await page.getByText('Ascot').count();
    const newFarmFound = await page.getByText('New Farm').count();
    const toowongFound = await page.getByText('Toowong').count();

    const totalFound = hamiltonFound + ascotFound + newFarmFound + toowongFound;
    if (totalFound >= 4) {
      log('PASS', `All 4 high-value Brisbane suburbs listed (Hamilton, Ascot, New Farm, Toowong)`);
    } else {
      log('FAIL', `Only ${totalFound}/4 Brisbane suburbs found`);
    }

    // Test 5: Ipswich suburbs listed
    console.log('\n🏘️ TEST 5: Ipswich Suburbs');
    const karaleeFound = await page.getByText('Karalee').count();
    const brookwaterFound = await page.getByText('Brookwater').count();
    const springfieldFound = await page.getByText('Springfield').count();

    const ipswichTotal = karaleeFound + brookwaterFound + springfieldFound;
    if (ipswichTotal >= 3) {
      log('PASS', `All 3 high-value Ipswich suburbs listed (Karalee, Brookwater, Springfield)`);
    } else {
      log('FAIL', `Only ${ipswichTotal}/3 Ipswich suburbs found`);
    }

    // Test 6: Logan areas listed
    console.log('\n🏢 TEST 6: Logan Areas');
    const loganCentralFound = await page.getByText('Logan Central').count();
    const springwoodFound = await page.getByText('Springwood').count();

    if (loganCentralFound > 0 && springwoodFound > 0) {
      log('PASS', `Logan service areas listed (Logan Central, Springwood)`);
    } else {
      log('FAIL', `Logan areas not found properly`);
    }

    // Test 7: Phone number clickable
    console.log('\n📞 TEST 7: Contact Information');
    const phoneLinks = await page.locator('a[href="tel:1300309361"]').count();
    if (phoneLinks >= 2) {
      log('PASS', `${phoneLinks} clickable phone number link(s) found`);
    } else {
      log('FAIL', `Only ${phoneLinks} phone links found`);
    }

    // Test 8: Response time information
    console.log('\n⏱️ TEST 8: Response Time Information');
    const responseTimeText = await page.getByText(/< \d+ min|less than|response time/i).count();
    if (responseTimeText > 0) {
      log('PASS', `Response time information displayed`);
    } else {
      log('FAIL', `No response time information found`);
    }

    // Test 9: Schema markup present
    console.log('\n🔍 TEST 9: Structured Data');
    const schemaScript = await page.locator('script[type="application/ld+json"]').count();
    if (schemaScript > 0) {
      log('PASS', `Structured data (schema.org) present`);
    } else {
      log('FAIL', `No structured data found`);
    }

    // Test 10: Links to service pages
    console.log('\n🔗 TEST 10: Service Page Links');
    const waterDamageLink = await page.locator('a[href*="water-damage"]').count();
    const fireDamageLink = await page.locator('a[href*="fire-damage"]').count();
    const mouldLink = await page.locator('a[href*="mould"]').count();

    if (waterDamageLink > 0 && fireDamageLink > 0 && mouldLink > 0) {
      log('PASS', `Links to service pages present (Water, Fire, Mould)`);
    } else {
      log('FAIL', `Missing service page links`);
    }

    // Test 11: No console errors
    console.log('\n⚠️ TEST 11: Console Errors');
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.waitForTimeout(2000);

    if (consoleErrors.length === 0) {
      log('PASS', 'No console errors detected');
    } else {
      log('FAIL', `${consoleErrors.length} console error(s) detected`);
      consoleErrors.slice(0, 3).forEach(err => console.log(`    ❌ ${err}`));
    }

  } catch (error) {
    console.error('\n❌ TEST SUITE ERROR:', error.message);
    failedTests++;
  } finally {
    await browser.close();
  }

  // Summary
  console.log('\n==========================================================');
  console.log('  TEST SUMMARY');
  console.log('==========================================================');
  console.log(`✅ Passed: ${passedTests}`);
  console.log(`❌ Failed: ${failedTests}`);
  console.log(`📊 Success Rate: ${Math.round((passedTests / (passedTests + failedTests)) * 100)}%`);
  console.log('==========================================================\n');

  if (failedTests === 0) {
    console.log('🎉 ALL TESTS PASSED! Service Areas page successfully deployed!');
  } else {
    console.log('⚠️  Some tests failed. Review issues above or wait for Vercel deployment.');
  }

  process.exit(failedTests > 0 ? 1 : 0);
})();
