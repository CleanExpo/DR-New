const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto('http://localhost:3040', { waitUntil: 'networkidle', timeout: 30000 });

    // Take screenshot
    await page.screenshot({ path: 'homepage-screenshot.png', fullPage: true });

    // Get page content
    const content = await page.content();
    console.log('Page Title:', await page.title());
    console.log('Page loaded successfully');

    // Check for errors in console
    page.on('console', msg => console.log('Browser console:', msg.text()));
    page.on('pageerror', error => console.log('Page error:', error.message));

    // Get visible text
    const bodyText = await page.textContent('body');
    console.log('Body text length:', bodyText.length);
    console.log('First 200 chars:', bodyText.substring(0, 200));

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();
