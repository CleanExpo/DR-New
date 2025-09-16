const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log('🔍 Testing DR-New Website on port 3010\n');

  try {
    console.log('Attempting to connect to http://localhost:3010...');

    // Try with shorter timeout first
    await page.goto('http://localhost:3010', {
      waitUntil: 'domcontentloaded',
      timeout: 10000
    });

    console.log('✅ Successfully connected!');

    const title = await page.title();
    console.log('📄 Page Title:', title);

    // Check if page has content
    const bodyText = await page.textContent('body');
    if (bodyText && bodyText.trim().length > 0) {
      console.log('✅ Page has content');
    } else {
      console.log('⚠️ Page appears to be empty');
    }

    // Take screenshot
    await page.screenshot({
      path: 'site-working.png',
      fullPage: false
    });
    console.log('📸 Screenshot saved: site-working.png');

    console.log('\n✅ SITE IS NOW LOADING on http://localhost:3010');

  } catch (error) {
    console.error('❌ Error:', error.message);

    // Try to get more info
    try {
      const response = await page.goto('http://localhost:3010', {
        waitUntil: 'commit',
        timeout: 5000
      });
      console.log('Response status:', response?.status());
    } catch (e) {
      console.log('Cannot reach server at all');
    }
  }

  await browser.close();
})();