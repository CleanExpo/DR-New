const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log('Opening DR-New website at http://localhost:3003...');

  try {
    await page.goto('http://localhost:3003', { waitUntil: 'networkidle', timeout: 30000 });
    console.log('✅ Page loaded successfully!');

    // Take a full page screenshot
    await page.screenshot({ path: 'dr-new-website.png', fullPage: false });
    console.log('📸 Screenshot saved as dr-new-website.png');

    // Get page title
    const title = await page.title();
    console.log('📄 Page title:', title);

    // Check for hero section
    const heroText = await page.locator('h1').first().textContent().catch(() => 'No H1 found');
    console.log('🏠 Hero heading:', heroText);

    // Check for emergency contact
    const phoneNumber = await page.locator('text=1300 309 361').count();
    console.log(`📞 Phone number appears ${phoneNumber} times on the page`);

    // Check for images
    const images = await page.locator('img').count();
    console.log(`🖼️ Total images on page: ${images}`);

    // Take mobile view screenshot
    await page.setViewportSize({ width: 375, height: 667 });
    await page.screenshot({ path: 'dr-new-mobile.png' });
    console.log('📱 Mobile screenshot saved as dr-new-mobile.png');

    // Wait a moment to see the page
    await page.waitForTimeout(3000);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  await browser.close();
})();