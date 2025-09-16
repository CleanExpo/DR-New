const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });

  console.log('🔍 CHECKING ALL LOCALHOST PORTS TO SEE WHAT\'S ACTUALLY RUNNING\n');
  console.log('=' .repeat(60) + '\n');

  const ports = [3000, 3001, 3002, 3003, 3004, 3005, 3006, 3007];

  for (const port of ports) {
    const page = await browser.newPage();
    const url = `http://localhost:${port}`;

    console.log(`\n📡 Checking ${url}...`);
    console.log('-'.repeat(40));

    try {
      // Try to load the page with a short timeout
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 5000 });

      // Get the page title
      const title = await page.title();

      // Get the main heading if exists
      let mainHeading = 'No H1 found';
      try {
        const h1 = await page.locator('h1').first();
        if (await h1.count() > 0) {
          mainHeading = await h1.textContent();
        }
      } catch (e) {}

      // Check for specific identifiers
      const bodyText = await page.textContent('body');

      // Identify which site this is
      let siteType = 'UNKNOWN';
      if (bodyText.includes('AI-powered matching platform') || bodyText.includes('10,000 IICRC certified')) {
        siteType = '❌ NRP PLATFORM (Wrong - Disaster-Recovery repo)';
      } else if (bodyText.includes("Brisbane's Premier Disaster Recovery") || bodyText.includes('1300 309 361')) {
        siteType = '✅ DR-NEW SERVICE PROVIDER (Correct)';
      } else if (bodyText.includes("Brisbane's Most Trusted Restoration")) {
        siteType = '✅ DR-NEW SERVICE PROVIDER (Correct)';
      }

      console.log(`✅ SITE FOUND: ${siteType}`);
      console.log(`   Title: ${title}`);
      console.log(`   Main Heading: ${mainHeading}`);

      // Check for images
      const images = await page.locator('img').count();
      console.log(`   Images: ${images}`);

      // Take a screenshot
      const screenshotName = `port-${port}-screenshot.png`;
      await page.screenshot({ path: screenshotName });
      console.log(`   📸 Screenshot saved: ${screenshotName}`);

    } catch (error) {
      if (error.message.includes('ERR_CONNECTION_REFUSED')) {
        console.log('❌ No server running on this port');
      } else if (error.message.includes('Timeout')) {
        console.log('⏱️ Server exists but not responding (stuck at "Starting...")');
      } else {
        console.log(`❌ Error: ${error.message.substring(0, 50)}...`);
      }
    }

    await page.close();
  }

  console.log('\n' + '=' .repeat(60));
  console.log('📊 SUMMARY');
  console.log('=' .repeat(60));
  console.log('\nNow you can see exactly what\'s running on each port.');
  console.log('The DR-NEW site (what we built) should show:');
  console.log('- Brisbane\'s Premier Disaster Recovery');
  console.log('- Direct service provider content');
  console.log('- Hero banners with disaster images');
  console.log('- Phone: 1300 309 361');

  await browser.close();
})();