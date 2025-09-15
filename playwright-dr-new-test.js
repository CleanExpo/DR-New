const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log('🔍 Testing DR-New Website (Brisbane/Ipswich/Logan) - http://localhost:3003\n');

  try {
    await page.goto('http://localhost:3003', { waitUntil: 'networkidle', timeout: 30000 });
    console.log('✅ Page loaded\n');

    // Get page title
    const title = await page.title();
    console.log('📄 Page Title:', title);

    // Check for Brisbane focus
    const content = await page.content();
    const brisbaneCount = (content.match(/Brisbane/gi) || []).length;
    const ipswichCount = (content.match(/Ipswich/gi) || []).length;
    const loganCount = (content.match(/Logan/gi) || []).length;

    console.log('\n📍 Local Area Focus:');
    console.log(`  - Brisbane mentions: ${brisbaneCount}`);
    console.log(`  - Ipswich mentions: ${ipswichCount}`);
    console.log(`  - Logan mentions: ${loganCount}`);

    // Check for images
    const images = await page.locator('img').count();
    console.log(`\n🖼️ Images on page: ${images}`);

    // Check hero section
    const h1Text = await page.locator('h1').first().textContent().catch(() => 'No H1 found');
    console.log('🏠 Main Heading:', h1Text);

    // Check for phone number
    const phoneCount = await page.locator('text=1300 309 361').count();
    console.log('📞 Phone number instances:', phoneCount);

    // Check for services
    const services = await page.locator('[class*="service"]').count();
    console.log('🛠️ Service sections:', services);

    // Take screenshot
    await page.screenshot({ path: 'dr-new-current-state.png', fullPage: false });
    console.log('\n📸 Screenshot saved as dr-new-current-state.png');

    // Check if this is the correct DR-New site
    const isNational = content.includes('National Recovery Partners') || content.includes('NRP');
    const isBrisbaneOnly = brisbaneCount > 0 && !isNational;

    console.log('\n✨ Site Verification:');
    console.log(`  ${isBrisbaneOnly ? '✅' : '❌'} This is the DR-New Brisbane site`);
    console.log(`  ${!isNational ? '✅' : '❌'} Not the national site`);
    console.log(`  ${images > 0 ? '✅' : '❌'} Images are loading`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  await browser.close();
})();