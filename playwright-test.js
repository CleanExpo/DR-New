const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log('Opening http://localhost:3003...');

  try {
    await page.goto('http://localhost:3003', { waitUntil: 'networkidle', timeout: 30000 });
    console.log('Page loaded successfully!');

    // Take a screenshot
    await page.screenshot({ path: 'debug-screenshot-3003.png' });
    console.log('Screenshot saved as debug-screenshot-3003.png');

    // Check for any console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.error('Console error:', msg.text());
      }
    });

    // Check page title
    const title = await page.title();
    console.log('Page title:', title);

    // Check for any visible error messages
    const errorMessages = await page.locator('text=/error|failed|cannot|unable/i').all();
    if (errorMessages.length > 0) {
      console.log('Found potential error messages on page:');
      for (const msg of errorMessages) {
        console.log('-', await msg.textContent());
      }
    }

    // Check if main content is visible
    const mainContent = await page.locator('main, #root, #__next').first();
    if (await mainContent.isVisible()) {
      console.log('Main content area is visible');
    } else {
      console.log('Warning: Main content area not found or not visible');
    }

  } catch (error) {
    console.error('Error loading page:', error.message);

    // Try to get more details
    const response = await page.goto('http://localhost:3003', { waitUntil: 'domcontentloaded', timeout: 10000 }).catch(e => null);
    if (response) {
      console.log('Response status:', response.status());
      console.log('Response headers:', response.headers());
    }
  }

  await browser.close();
})();