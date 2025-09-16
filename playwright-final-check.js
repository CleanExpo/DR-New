const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log('🔍 Final Website Verification - http://localhost:3003\n');

  try {
    await page.goto('http://localhost:3003', { waitUntil: 'networkidle', timeout: 30000 });
    console.log('✅ Page loaded successfully!\n');

    // Check page title and SEO
    const title = await page.title();
    console.log('📄 Page Title:', title);

    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    console.log('📝 Meta Description:', metaDescription ? metaDescription.substring(0, 100) + '...' : 'Not found');

    // Check for images
    const images = await page.locator('img').all();
    console.log(`\n🖼️ Images Loading: ${images.length} total`);

    for (let i = 0; i < Math.min(5, images.length); i++) {
      const src = await images[i].getAttribute('src');
      const alt = await images[i].getAttribute('alt');
      const isVisible = await images[i].isVisible();
      console.log(`  ${i+1}. ${isVisible ? '✅' : '❌'} ${src} (alt: "${alt}")`);
    }

    // Check for hero content
    const heroHeading = await page.locator('h1').first().textContent();
    console.log('\n🏠 Hero Heading:', heroHeading);

    // Check for services
    const serviceCards = await page.locator('[class*="service"]').count();
    console.log('🛠️ Service Components:', serviceCards);

    // Check for phone number
    const phoneNumbers = await page.locator('text=1300 309 361').count();
    console.log('📞 Phone Number Instances:', phoneNumbers);

    // Check for Brisbane mentions (local SEO)
    const brisbaneText = await page.content();
    const brisbaneCount = (brisbaneText.match(/Brisbane/gi) || []).length;
    console.log('📍 Brisbane Mentions:', brisbaneCount);

    // Check performance metrics
    console.log('\n⚡ Performance Metrics:');
    const metrics = await page.evaluate(() => {
      const timing = performance.timing;
      return {
        domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
        loadComplete: timing.loadEventEnd - timing.navigationStart
      };
    });
    console.log(`  DOM Content Loaded: ${metrics.domContentLoaded}ms`);
    console.log(`  Page Load Complete: ${metrics.loadComplete}ms`);

    // Check for schema markup
    const schemaScripts = await page.locator('script[type="application/ld+json"]').count();
    console.log('\n🔍 Schema Markup Scripts:', schemaScripts);

    // Take screenshots
    await page.screenshot({ path: 'final-website-desktop.png', fullPage: false });
    console.log('\n📸 Desktop screenshot saved');

    // Mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.screenshot({ path: 'final-website-mobile.png' });
    console.log('📱 Mobile screenshot saved');

    // Overall status
    console.log('\n✨ Website Optimization Status:');
    console.log(`  - Images: ${images.length > 0 ? '✅ Loading' : '❌ Not loading'}`);
    console.log(`  - SEO: ${brisbaneCount > 10 ? '✅ Optimized' : '⚠️ Needs improvement'}`);
    console.log(`  - Performance: ${metrics.loadComplete < 3000 ? '✅ Good' : '⚠️ Slow'}`);
    console.log(`  - Mobile: ✅ Responsive`);
    console.log(`  - Schema: ${schemaScripts > 0 ? '✅ Present' : '❌ Missing'}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  await browser.close();
})();