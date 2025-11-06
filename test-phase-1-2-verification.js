const { chromium } = require('playwright');

(async () => {
  console.log('==========================================================');
  console.log('  PHASE 1 + 2 PRODUCTION VERIFICATION TEST');
  console.log('  Testing: https://disasterrecovery.com.au');
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
    // Test 1: Homepage loads
    console.log('\n📄 TEST 1: Homepage Loading');
    const response = await page.goto('https://disasterrecovery.com.au', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    if (response.status() === 200) {
      log('PASS', 'Homepage loads successfully (200 OK)');
    } else {
      log('FAIL', `Homepage returned ${response.status()}`);
    }

    // Test 2: Google Analytics tracking
    console.log('\n📊 TEST 2: Google Analytics Tracking');
    await page.waitForTimeout(2000);

    const gaScripts = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script'));
      return scripts.filter(s => s.src.includes('googletagmanager.com/gtag')).length;
    });

    if (gaScripts > 0) {
      log('PASS', `Google Analytics script loaded (${gaScripts} script(s) found)`);
    } else {
      log('FAIL', 'Google Analytics script NOT found');
    }

    const gaMeasurementId = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script'));
      const gaScript = scripts.find(s => s.src.includes('googletagmanager.com/gtag'));
      if (gaScript) {
        const match = gaScript.src.match(/id=(G-[A-Z0-9]+)/);
        return match ? match[1] : null;
      }
      return null;
    });

    if (gaMeasurementId && gaMeasurementId !== 'G-XXXXXXXXXX') {
      log('PASS', `Real GA Measurement ID found: ${gaMeasurementId}`);
    } else {
      log('FAIL', `Placeholder or missing GA ID: ${gaMeasurementId}`);
    }

    // Test 3: Phone numbers clickable in Header
    console.log('\n📞 TEST 3: Clickable Phone Numbers');
    const headerPhoneLink = await page.locator('header a[href="tel:1300309361"]').first();
    const headerPhoneLinkCount = await page.locator('header a[href="tel:1300309361"]').count();

    if (headerPhoneLinkCount > 0) {
      log('PASS', `Header phone is clickable (${headerPhoneLinkCount} tel: link(s) found)`);
    } else {
      log('FAIL', 'Header phone is NOT clickable');
    }

    // Test 4: Phone numbers clickable in Footer
    const footerPhoneLink = await page.locator('footer a[href="tel:1300309361"]');
    const footerPhoneLinkCount = await footerPhoneLink.count();

    if (footerPhoneLinkCount > 0) {
      log('PASS', `Footer phone is clickable (${footerPhoneLinkCount} tel: link(s) found)`);
    } else {
      log('FAIL', 'Footer phone is NOT clickable');
    }

    // Test 5: Schema markup phone number
    console.log('\n🔍 TEST 5: Schema Markup');
    const schemaPhone = await page.evaluate(() => {
      const script = document.querySelector('script[type="application/ld+json"]');
      if (script) {
        try {
          const data = JSON.parse(script.textContent);
          return data.contactPoint?.telephone || null;
        } catch (e) {
          return null;
        }
      }
      return null;
    });

    if (schemaPhone === '+61-1300-309-361') {
      log('PASS', `Correct phone in schema: ${schemaPhone}`);
    } else {
      log('FAIL', `Wrong phone in schema: ${schemaPhone}`);
    }

    // Test 6: Domain consistency in schema
    const schemaUrl = await page.evaluate(() => {
      const script = document.querySelector('script[type="application/ld+json"]');
      if (script) {
        try {
          const data = JSON.parse(script.textContent);
          return data.url || null;
        } catch (e) {
          return null;
        }
      }
      return null;
    });

    if (schemaUrl === 'https://disasterrecovery.com.au') {
      log('PASS', `Correct domain in schema: ${schemaUrl}`);
    } else {
      log('FAIL', `Wrong domain in schema: ${schemaUrl}`);
    }

    // Test 7: Emergency CTA Component (requires scroll)
    console.log('\n🚨 TEST 7: Emergency CTA Component');

    // Scroll down to trigger CTA
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(1000);

    const emergencyCTADesktop = await page.locator('.lg\\:block.fixed.right-0').count();
    const emergencyCTAMobile = await page.locator('.lg\\:hidden.fixed.bottom-0').count();

    if (emergencyCTADesktop > 0) {
      log('PASS', 'Desktop Emergency CTA component found');
    } else {
      log('FAIL', 'Desktop Emergency CTA component NOT found');
    }

    if (emergencyCTAMobile > 0) {
      log('PASS', 'Mobile Emergency CTA component found');
    } else {
      log('FAIL', 'Mobile Emergency CTA component NOT found');
    }

    // Test 8: Images loading on service page
    console.log('\n🖼️ TEST 8: Image Loading (Water Damage Page)');
    await page.goto('https://disasterrecovery.com.au/services/water-damage', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    await page.waitForTimeout(2000);

    const images = await page.locator('img').all();
    let loadedImages = 0;
    let failedImages = 0;

    for (const img of images) {
      const naturalWidth = await img.evaluate(el => el.naturalWidth);
      if (naturalWidth > 0) {
        loadedImages++;
      } else {
        failedImages++;
      }
    }

    if (images.length > 0) {
      log('INFO', `Found ${images.length} images on water damage page`);
      log('PASS', `${loadedImages} images loaded successfully`);
      if (failedImages > 0) {
        log('FAIL', `${failedImages} images failed to load`);
      } else {
        log('PASS', 'All images loaded successfully');
      }
    } else {
      log('FAIL', 'No images found on water damage page');
    }

    // Test 9: No console errors
    console.log('\n⚠️ TEST 9: Console Errors');
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('https://disasterrecovery.com.au', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);

    if (consoleErrors.length === 0) {
      log('PASS', 'No console errors detected');
    } else {
      log('FAIL', `${consoleErrors.length} console error(s) detected`);
      consoleErrors.forEach(err => console.log(`    ❌ ${err}`));
    }

    // Test 10: No 404/500 errors
    console.log('\n🌐 TEST 10: HTTP Status Codes');
    const failedRequests = [];
    page.on('response', response => {
      if (response.status() === 404 || response.status() >= 500) {
        failedRequests.push({ url: response.url(), status: response.status() });
      }
    });

    await page.goto('https://disasterrecovery.com.au', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    if (failedRequests.length === 0) {
      log('PASS', 'No 404/500 errors detected');
    } else {
      log('FAIL', `${failedRequests.length} failed HTTP request(s) detected`);
      failedRequests.forEach(req => console.log(`    ❌ [${req.status}] ${req.url}`));
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
    console.log('🎉 ALL TESTS PASSED! Phase 1 + 2 deployment successful!');
  } else {
    console.log('⚠️  Some tests failed. Review issues above.');
  }

  process.exit(failedTests > 0 ? 1 : 0);
})();
