const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://disasterrecovery.com.au/services/water-damage');
  await page.getByRole('navigation').getByRole('link', { name: 'Services' }).click();
  await page.getByRole('banner').getByRole('link', { name: 'Service Areas' }).click();
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();