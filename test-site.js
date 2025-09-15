const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log('🔍 Testing DR-New Website on port 3007\n');

  try {
    console.log('Navigating to http://localhost:3007...');
    await page.goto('http://localhost:3007', { waitUntil: 'domcontentloaded', timeout: 30000 });

    await page.waitForTimeout(3000);

    const title = await page.title();
    console.log('✅ Page loaded successfully!');
    console.log('📄 Title:', title);

    // Check for images
    const images = await page.locator('img').count();
    console.log(`📸 Images found: ${images}`);

    // Check for main heading
    const h1 = await page.locator('h1').first();
    if (await h1.count() > 0) {
      const h1Text = await h1.textContent();
      console.log(`📝 Main heading: ${h1Text}`);
    }

    // Take screenshot
    await page.screenshot({
      path: 'dr-new-fixed.png',
      fullPage: false
    });
    console.log('📸 Screenshot saved: dr-new-fixed.png');

    console.log('\n✅ Site is loading correctly on http://localhost:3007');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  await browser.close();
})();