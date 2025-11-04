const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('\n🔍 Testing Key Pages...\n');

  const pages = [
    { url: 'http://localhost:3040/', name: 'Homepage' },
    { url: 'http://localhost:3040/onboarding', name: 'Contractor Onboarding' },
    { url: 'http://localhost:3040/admin/onboarding', name: 'Admin Onboarding Dashboard' },
    { url: 'http://localhost:3040/admin', name: 'Admin Dashboard' },
    { url: 'http://localhost:3040/contractor', name: 'Contractor Dashboard' },
  ];

  for (const testPage of pages) {
    try {
      console.log(`Testing: ${testPage.name}`);

      // Go to page
      await page.goto(testPage.url, { waitUntil: 'networkidle', timeout: 15000 });

      // Check for errors in console
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));

      // Get page title
      const title = await page.title();

      // Check if page loaded (has content)
      const bodyText = await page.textContent('body');
      const hasContent = bodyText.length > 100;

      if (hasContent) {
        console.log(`  ✅ ${testPage.name} - Loaded successfully`);
        console.log(`     Title: ${title}`);
      } else {
        console.log(`  ⚠️  ${testPage.name} - Page loaded but minimal content`);
      }

    } catch (error) {
      console.log(`  ❌ ${testPage.name} - Error: ${error.message}`);
    }
  }

  await browser.close();
  console.log('\n✨ Testing complete!\n');
})();
