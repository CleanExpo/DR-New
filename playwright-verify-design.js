const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log('Opening http://localhost:3005 to verify new design...');

  try {
    await page.goto('http://localhost:3005', { waitUntil: 'networkidle', timeout: 30000 });
    console.log('✅ Page loaded successfully!');

    // Take a screenshot of the new design
    await page.screenshot({ path: 'disaster-recovery-new-design.png', fullPage: false });
    console.log('📸 Screenshot saved as disaster-recovery-new-design.png');

    // Check for rotating hero banner
    const heroBanner = await page.locator('[data-testid="rotating-hero-banner"], .hero-banner, [class*="hero"]').first();
    if (await heroBanner.count() > 0) {
      console.log('✅ Hero banner component found');
    }

    // Check for services grid
    const servicesGrid = await page.locator('[data-testid="services-grid"], .services-grid, [class*="services"]').first();
    if (await servicesGrid.count() > 0) {
      console.log('✅ Services grid component found');
    }

    // Check for equipment gallery
    const equipmentGallery = await page.locator('[data-testid="equipment-gallery"], .equipment-gallery, [class*="equipment"]').first();
    if (await equipmentGallery.count() > 0) {
      console.log('✅ Equipment gallery component found');
    }

    // Check for emergency contact
    const emergencyContact = await page.locator('text=1300 309 361').first();
    if (await emergencyContact.count() > 0) {
      console.log('✅ Emergency contact number displayed');
    }

    // Check for real images being used
    const images = await page.locator('img').all();
    console.log(`📷 Found ${images.length} images on the page`);

    // Check first few image sources
    for (let i = 0; i < Math.min(5, images.length); i++) {
      const src = await images[i].getAttribute('src');
      if (src && src.includes('/images/')) {
        console.log(`  ✅ Image ${i+1}: Using real image from /images/`);
      }
    }

    // Check page title
    const title = await page.title();
    console.log('📄 Page title:', title);

    // Check for mobile responsiveness
    await page.setViewportSize({ width: 375, height: 667 });
    await page.screenshot({ path: 'disaster-recovery-mobile.png' });
    console.log('📱 Mobile screenshot saved');

  } catch (error) {
    console.error('❌ Error loading page:', error.message);
  }

  await browser.close();
})();