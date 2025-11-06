const { chromium } = require('playwright');

(async () => {
  console.log('=== QUICK PRODUCTION CHECK ===\n');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Test with longer timeout and less strict wait
    console.log('Testing homepage (60s timeout)...');
    const response = await page.goto('https://disasterrecovery.com.au', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });

    console.log(`✅ Status: ${response.status()}`);

    await page.waitForTimeout(3000);

    // Check GA script
    const gaScript = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script'));
      const ga = scripts.find(s => s.src.includes('googletagmanager.com/gtag'));
      if (ga) {
        const match = ga.src.match(/id=(G-[A-Z0-9]+)/);
        return match ? match[1] : 'NOT FOUND';
      }
      return 'NO SCRIPT';
    });

    console.log(`📊 GA Measurement ID in page: ${gaScript}`);

    // Check Emergency CTA
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(1000);

    const ctaExists = await page.locator('a[href="tel:1300309361"]').count();
    console.log(`🚨 Emergency CTA links found: ${ctaExists}`);

    // Check for console errors
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.waitForTimeout(2000);

    if (errors.length > 0) {
      console.log(`\n⚠️  ${errors.length} console errors detected`);
    } else {
      console.log('\n✅ No console errors');
    }

    // Check for 404s
    const failed404s = [];
    page.on('response', response => {
      if (response.status() === 404) {
        failed404s.push(response.url());
      }
    });

    await page.goto('https://disasterrecovery.com.au/services/water-damage', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });

    await page.waitForTimeout(3000);

    if (failed404s.length > 0) {
      console.log(`\n❌ ${failed404s.length} resources returned 404`);
      console.log('First 5 failed resources:');
      failed404s.slice(0, 5).forEach(url => {
        const shortUrl = url.length > 100 ? url.substring(0, 100) + '...' : url;
        console.log(`  - ${shortUrl}`);
      });
    } else {
      console.log('\n✅ No 404 errors');
    }

  } catch (error) {
    console.log(`\n❌ Error: ${error.message}`);
  } finally {
    await browser.close();
  }

  console.log('\n=== CHECK COMPLETE ===');
})();
