const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log('🎉 FINAL VERIFICATION - DR-New Website with Images\n');
  console.log('URL: http://localhost:3005\n');
  console.log('=' .repeat(60) + '\n');

  try {
    await page.goto('http://localhost:3005', { waitUntil: 'networkidle', timeout: 30000 });

    // Wait a moment for images to load
    await page.waitForTimeout(2000);

    // Check page status
    const title = await page.title();
    console.log('✅ Page Title:', title);

    // Count all images
    const allImages = await page.locator('img').all();
    console.log(`\n🖼️ IMAGES LOADED: ${allImages.length} total`);

    // Check visible images
    let visibleImages = 0;
    let heroImages = 0;
    let serviceImages = 0;

    for (const img of allImages) {
      const src = await img.getAttribute('src');
      const isVisible = await img.isVisible();

      if (isVisible) {
        visibleImages++;
        if (src && src.includes('/hero/')) heroImages++;
        if (src && src.includes('/services/')) serviceImages++;
      }
    }

    console.log(`  ✅ Visible: ${visibleImages}`);
    console.log(`  ✅ Hero Images: ${heroImages}`);
    console.log(`  ✅ Service Images: ${serviceImages}`);

    // Check specific image paths
    console.log('\n📸 IMAGE SOURCES:');
    for (let i = 0; i < Math.min(5, allImages.length); i++) {
      const src = await allImages[i].getAttribute('src');
      const alt = await allImages[i].getAttribute('alt');
      const isVisible = await allImages[i].isVisible();
      console.log(`  ${i+1}. ${isVisible ? '✅' : '❌'} ${src?.substring(0, 50)}... (${alt?.substring(0, 30)}...)`);
    }

    // Check hero section
    const heroSection = await page.locator('[class*="hero"]').first();
    const hasHeroImage = await heroSection.locator('img').count() > 0;
    console.log(`\n🏠 HERO SECTION: ${hasHeroImage ? '✅ Has Images' : '❌ No Images'}`);

    // Check for rotating banner
    const rotatingDots = await page.locator('[class*="dot"], [class*="indicator"]').count();
    console.log(`  Rotating Banner: ${rotatingDots > 0 ? `✅ Yes (${rotatingDots} indicators)` : '❌ No'}`);

    // Check services section
    const serviceCards = await page.locator('[class*="service"]').all();
    let servicesWithImages = 0;
    for (const card of serviceCards) {
      const hasImage = await card.locator('img').count() > 0;
      if (hasImage) servicesWithImages++;
    }
    console.log(`\n🛠️ SERVICES: ${serviceCards.length} cards, ${servicesWithImages} with images`);

    // Check local focus
    const content = await page.content();
    const brisbaneCount = (content.match(/Brisbane/gi) || []).length;
    const ipswichCount = (content.match(/Ipswich/gi) || []).length;
    const loganCount = (content.match(/Logan/gi) || []).length;

    console.log('\n📍 LOCAL SEO:');
    console.log(`  Brisbane: ${brisbaneCount} mentions`);
    console.log(`  Ipswich: ${ipswichCount} mentions`);
    console.log(`  Logan: ${loganCount} mentions`);

    // Performance check
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

    // Overall success metrics
    console.log('\n✨ SUCCESS METRICS:');
    console.log(`  Images: ${allImages.length > 0 ? `✅ ${allImages.length} loaded` : '❌ None'}`);
    console.log(`  Hero: ${hasHeroImage ? '✅ Image present' : '❌ No image'}`);
    console.log(`  Services: ${servicesWithImages > 0 ? `✅ ${servicesWithImages} with images` : '❌ No images'}`);
    console.log(`  Local SEO: ${(brisbaneCount + ipswichCount + loganCount) > 50 ? '✅ Excellent' : '⚠️ Needs improvement'}`);
    console.log(`  Performance: ${metrics.loadComplete < 3000 ? '✅ Good' : '⚠️ Slow'}`);

    // Take screenshots
    await page.screenshot({ path: 'dr-new-with-images-desktop.png', fullPage: false });
    await page.setViewportSize({ width: 375, height: 667 });
    await page.screenshot({ path: 'dr-new-with-images-mobile.png' });

    console.log('\n📸 Screenshots saved:');
    console.log('  - dr-new-with-images-desktop.png');
    console.log('  - dr-new-with-images-mobile.png');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  await browser.close();
})();