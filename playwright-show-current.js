const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false,
    args: ['--start-maximized']
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();

  console.log('🌐 Opening DR-New Website (Brisbane/Ipswich/Logan)\n');
  console.log('URL: http://localhost:3005\n');
  console.log('=' .repeat(60) + '\n');

  try {
    await page.goto('http://localhost:3005', { waitUntil: 'networkidle', timeout: 30000 });

    // Wait for images to fully load
    await page.waitForTimeout(3000);

    const title = await page.title();
    console.log('✅ Page loaded successfully!\n');
    console.log('📄 Title:', title);

    // Take full-page screenshots
    await page.screenshot({
      path: 'dr-new-current-full.png',
      fullPage: false
    });
    console.log('📸 Desktop view saved: dr-new-current-full.png');

    // Scroll down to show more content
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: 'dr-new-services-section.png',
      fullPage: false
    });
    console.log('📸 Services section saved: dr-new-services-section.png');

    // Mobile view
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: 'dr-new-mobile-view.png',
      fullPage: false
    });
    console.log('📸 Mobile view saved: dr-new-mobile-view.png');

    // Get current stats
    const images = await page.locator('img').count();
    const h1Text = await page.locator('h1').first().textContent();

    console.log('\n📊 Current Website Status:');
    console.log(`  Images: ${images}`);
    console.log(`  Main Heading: ${h1Text}`);
    console.log(`  URL: http://localhost:3005`);

    // Keep browser open for 5 seconds to view
    console.log('\n👀 Browser will remain open for viewing...');
    await page.waitForTimeout(5000);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  await browser.close();
})();