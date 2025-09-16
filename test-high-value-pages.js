const { chromium } = require('playwright');

async function testHighValuePages() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  console.log('🚀 Testing High-Value Disaster Recovery Pages\n');

  const pagesToTest = [
    {
      url: 'http://localhost:3000',
      name: 'Homepage',
      checks: ['hero banner', 'services grid', 'emergency CTA']
    },
    {
      url: 'http://localhost:3000/locations/brisbane',
      name: 'Brisbane Location Page',
      checks: ['flood history', 'service areas', 'response times']
    },
    {
      url: 'http://localhost:3000/emergency/water-damage-brisbane',
      name: 'Emergency Water Damage Page',
      checks: ['45-minute response', 'water categories', 'insurance info']
    },
    {
      url: 'http://localhost:3000/emergency/fire-damage-brisbane',
      name: 'Emergency Fire Damage Page',
      checks: ['smoke damage types', 'health risks', 'restoration timeline']
    }
  ];

  const results = [];

  for (const testPage of pagesToTest) {
    console.log(`\n📄 Testing: ${testPage.name}`);
    console.log(`   URL: ${testPage.url}`);

    try {
      // Navigate to page
      const response = await page.goto(testPage.url, {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      const status = response.status();
      console.log(`   Status: ${status === 200 ? '✅' : '❌'} ${status}`);

      if (status === 200) {
        // Check page title
        const title = await page.title();
        console.log(`   Title: ${title.substring(0, 60)}...`);

        // Check for schema markup
        const hasSchema = await page.evaluate(() => {
          const scripts = document.querySelectorAll('script[type="application/ld+json"]');
          return scripts.length > 0;
        });
        console.log(`   Schema Markup: ${hasSchema ? '✅ Found' : '❌ Missing'}`);

        // Check for key elements
        console.log('   Key Elements:');
        for (const check of testPage.checks) {
          const hasElement = await page.evaluate((checkText) => {
            const pageText = document.body.innerText.toLowerCase();
            return pageText.includes(checkText.toLowerCase());
          }, check);
          console.log(`     - ${check}: ${hasElement ? '✅' : '❌'}`);
        }

        // Check page load time
        const performanceTiming = await page.evaluate(() => {
          const timing = performance.timing;
          return timing.loadEventEnd - timing.navigationStart;
        });
        console.log(`   Load Time: ${performanceTiming}ms ${performanceTiming < 3000 ? '✅' : '⚠️'}`);

        // Check for CTAs
        const ctaButtons = await page.$$eval('a[href^="tel:"], a[href="/claim"], button',
          elements => elements.length
        );
        console.log(`   CTAs Found: ${ctaButtons} ${ctaButtons > 0 ? '✅' : '❌'}`);

        // Take screenshot
        await page.screenshot({
          path: `screenshots/${testPage.name.replace(/\s+/g, '-').toLowerCase()}.png`,
          fullPage: false
        });
        console.log(`   Screenshot: ✅ Saved`);

        results.push({
          page: testPage.name,
          status: 'PASS',
          loadTime: performanceTiming,
          hasSchema,
          ctaCount: ctaButtons
        });
      } else {
        results.push({
          page: testPage.name,
          status: 'FAIL',
          error: `HTTP ${status}`
        });
      }

    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
      results.push({
        page: testPage.name,
        status: 'ERROR',
        error: error.message
      });
    }

    // Small delay between tests
    await page.waitForTimeout(1000);
  }

  // Test mobile responsiveness
  console.log('\n📱 Testing Mobile Responsiveness\n');

  await context.close();
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 667 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1'
  });
  const mobilePage = await mobileContext.newPage();

  for (const testPage of pagesToTest.slice(0, 2)) { // Test first 2 pages on mobile
    console.log(`   Testing ${testPage.name} on mobile...`);
    try {
      await mobilePage.goto(testPage.url, { waitUntil: 'networkidle' });
      await mobilePage.screenshot({
        path: `screenshots/mobile-${testPage.name.replace(/\s+/g, '-').toLowerCase()}.png`
      });
      console.log(`   ✅ Mobile screenshot saved`);
    } catch (error) {
      console.log(`   ❌ Mobile test failed: ${error.message}`);
    }
  }

  // Summary Report
  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST SUMMARY REPORT');
  console.log('='.repeat(60));

  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL' || r.status === 'ERROR').length;

  console.log(`\nTotal Pages Tested: ${results.length}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);

  console.log('\nDetailed Results:');
  results.forEach(result => {
    const icon = result.status === 'PASS' ? '✅' : '❌';
    console.log(`\n${icon} ${result.page}`);
    if (result.status === 'PASS') {
      console.log(`   Load Time: ${result.loadTime}ms`);
      console.log(`   Schema: ${result.hasSchema ? 'Yes' : 'No'}`);
      console.log(`   CTAs: ${result.ctaCount}`);
    } else {
      console.log(`   Error: ${result.error}`);
    }
  });

  // SEO Recommendations
  console.log('\n' + '='.repeat(60));
  console.log('🔍 SEO RECOMMENDATIONS');
  console.log('='.repeat(60));

  const recommendations = [
    '1. Ensure all pages have unique, keyword-rich titles under 60 characters',
    '2. Add structured data (schema markup) to all service pages',
    '3. Optimize images with descriptive alt text and WebP format',
    '4. Implement breadcrumb navigation for better user experience',
    '5. Add FAQ schema to answer common disaster recovery questions',
    '6. Create location-specific landing pages for each suburb',
    '7. Ensure all CTAs are prominent and above the fold',
    '8. Add customer reviews and testimonials with review schema',
    '9. Implement AMP versions for mobile emergency searches',
    '10. Add emergency response time guarantees prominently'
  ];

  recommendations.forEach(rec => console.log(`\n${rec}`));

  console.log('\n' + '='.repeat(60));
  console.log('✨ Testing Complete!');
  console.log('='.repeat(60));

  await browser.close();
}

// Run the tests
testHighValuePages().catch(console.error);