const { chromium } = require('playwright');

(async () => {
  console.log('Starting Playwright test...');

  try {
    // Launch browser
    const browser = await chromium.launch({
      headless: false,
      timeout: 30000
    });

    console.log('Browser launched successfully');

    // Create a new page
    const page = await browser.newPage();
    console.log('New page created');

    // Navigate to localhost
    console.log('Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    console.log('Page loaded successfully');

    // Get page title
    const title = await page.title();
    console.log('Page title:', title);

    // Check for emergency hotline
    const hotlineSelector = 'a[href="tel:1300309361"]';
    const hasHotline = await page.$(hotlineSelector) !== null;
    console.log('Emergency hotline found:', hasHotline);

    // Take screenshot
    await page.screenshot({ path: 'playwright-test-screenshot.png' });
    console.log('Screenshot saved as playwright-test-screenshot.png');

    // Close browser
    await browser.close();
    console.log('Test completed successfully!');

  } catch (error) {
    console.error('Test failed:', error.message);
    process.exit(1);
  }
})();