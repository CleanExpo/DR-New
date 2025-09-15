const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log('🎯 DR-NEW WEBSITE AUDIT (Brisbane/Ipswich/Logan)\n');
  console.log('URL: http://localhost:3004\n');
  console.log('=' .repeat(50) + '\n');

  try {
    await page.goto('http://localhost:3004', { waitUntil: 'networkidle', timeout: 30000 });

    // Basic Info
    const title = await page.title();
    const url = page.url();
    console.log('📄 Page Title:', title);
    console.log('🔗 Current URL:', url);

    // Check local focus
    const content = await page.content();
    const brisbaneCount = (content.match(/Brisbane/gi) || []).length;
    const ipswichCount = (content.match(/Ipswich/gi) || []).length;
    const loganCount = (content.match(/Logan/gi) || []).length;

    console.log('\n📍 LOCAL AREA FOCUS:');
    console.log(`  Brisbane: ${brisbaneCount} mentions`);
    console.log(`  Ipswich: ${ipswichCount} mentions`);
    console.log(`  Logan: ${loganCount} mentions`);
    console.log(`  Total Local: ${brisbaneCount + ipswichCount + loganCount} mentions`);

    // Images Check
    const images = await page.locator('img').all();
    console.log(`\n🖼️ IMAGES: ${images.length} total`);

    let visibleImages = 0;
    for (const img of images) {
      if (await img.isVisible()) visibleImages++;
    }
    console.log(`  Visible: ${visibleImages}`);
    console.log(`  Hidden: ${images.length - visibleImages}`);

    // Check if images from public folder are loading
    const publicImages = await page.locator('img[src*="/images/"]').count();
    console.log(`  From /public/images: ${publicImages}`);

    // Hero Section
    const h1Text = await page.locator('h1').first().textContent().catch(() => 'No H1');
    const heroDescription = await page.locator('main p').first().textContent().catch(() => 'No description');
    console.log('\n🏠 HERO SECTION:');
    console.log(`  Heading: ${h1Text}`);
    console.log(`  Description: ${heroDescription.substring(0, 100)}...`);

    // Contact Info
    const phoneCount = await page.locator('text=1300 309 361').count();
    const emailCount = await page.locator('text=admin@disasterrecovery.com.au').count();
    console.log('\n📞 CONTACT VISIBILITY:');
    console.log(`  Phone (1300 309 361): ${phoneCount} instances`);
    console.log(`  Email: ${emailCount} instances`);

    // Services Check
    const waterDamage = content.includes('Water Damage') || content.includes('water damage');
    const fireDamage = content.includes('Fire Damage') || content.includes('fire damage');
    const mouldRemediation = content.includes('Mould Remediation') || content.includes('mould remediation');

    console.log('\n🛠️ SERVICES MENTIONED:');
    console.log(`  Water Damage: ${waterDamage ? '✅' : '❌'}`);
    console.log(`  Fire Damage: ${fireDamage ? '✅' : '❌'}`);
    console.log(`  Mould Remediation: ${mouldRemediation ? '✅' : '❌'}`);

    // SEO Check
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    const schemaScripts = await page.locator('script[type="application/ld+json"]').count();

    console.log('\n🔍 SEO STATUS:');
    console.log(`  Meta Description: ${metaDescription ? '✅ Present' : '❌ Missing'}`);
    console.log(`  Schema Markup: ${schemaScripts > 0 ? `✅ ${schemaScripts} scripts` : '❌ None'}`);

    // Performance
    const metrics = await page.evaluate(() => {
      const timing = performance.timing;
      return {
        domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
        loadComplete: timing.loadEventEnd - timing.navigationStart
      };
    });

    console.log('\n⚡ PERFORMANCE:');
    console.log(`  DOM Loaded: ${metrics.domContentLoaded}ms`);
    console.log(`  Page Complete: ${metrics.loadComplete}ms`);

    // Issues to Fix
    console.log('\n⚠️ ISSUES FOUND:');
    if (images.length === 0) console.log('  ❌ No images loading');
    if (publicImages === 0) console.log('  ❌ No images from /public/images folder');
    if (brisbaneCount < 5) console.log('  ❌ Insufficient Brisbane mentions for local SEO');
    if (ipswichCount < 2) console.log('  ❌ Insufficient Ipswich mentions');
    if (loganCount < 2) console.log('  ❌ Insufficient Logan mentions');
    if (!metaDescription) console.log('  ❌ Missing meta description');
    if (schemaScripts === 0) console.log('  ❌ No schema markup');

    // Screenshots
    await page.screenshot({ path: 'dr-new-desktop-audit.png', fullPage: false });
    await page.setViewportSize({ width: 375, height: 667 });
    await page.screenshot({ path: 'dr-new-mobile-audit.png' });

    console.log('\n📸 Screenshots saved:');
    console.log('  - dr-new-desktop-audit.png');
    console.log('  - dr-new-mobile-audit.png');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  await browser.close();
})();