const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false,
    devtools: true // Open devtools to see errors
  });
  const page = await browser.newPage();

  // Capture console messages
  const consoleLogs = [];
  page.on('console', msg => {
    const type = msg.type();
    const text = msg.text();
    consoleLogs.push({ type, text });
    if (type === 'error') {
      console.error('🔴 Console Error:', text);
    } else if (type === 'warning') {
      console.warn('🟡 Console Warning:', text);
    }
  });

  // Capture page errors
  page.on('pageerror', error => {
    console.error('🔴 Page Error:', error.message);
  });

  // Capture failed requests
  page.on('requestfailed', request => {
    console.error('🔴 Request Failed:', request.url(), '-', request.failure().errorText);
  });

  console.log('🔍 Diagnosing http://localhost:3003...\n');

  try {
    // Navigate and wait for network idle
    const response = await page.goto('http://localhost:3003', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    console.log('📊 Response Status:', response.status());
    console.log('📊 Response URL:', response.url());

    // Check for specific components
    console.log('\n🔍 Checking for UI Components:\n');

    // Check for images
    const images = await page.locator('img').all();
    console.log(`📷 Images found: ${images.length}`);
    if (images.length > 0) {
      for (let i = 0; i < Math.min(3, images.length); i++) {
        const src = await images[i].getAttribute('src');
        const alt = await images[i].getAttribute('alt');
        console.log(`  - Image ${i+1}: src="${src}", alt="${alt}"`);
      }
    }

    // Check for hero banner component
    const heroBanner = await page.locator('[class*="hero"], [class*="banner"], header').first();
    if (await heroBanner.count() > 0) {
      const heroClasses = await heroBanner.getAttribute('class');
      console.log(`🎯 Hero component found with classes: ${heroClasses}`);
    } else {
      console.log('❌ No hero banner component found');
    }

    // Check for services section
    const services = await page.locator('[class*="service"], section').all();
    console.log(`🛠️ Service sections found: ${services.length}`);

    // Check page structure
    console.log('\n📄 Page Structure:\n');
    const mainContent = await page.locator('main').first();
    if (await mainContent.count() > 0) {
      const mainHTML = await mainContent.innerHTML();
      console.log('✅ Main content exists, length:', mainHTML.length, 'characters');
    } else {
      console.log('❌ No main element found');
    }

    // Check for specific text content
    const h1Text = await page.locator('h1').first().textContent().catch(() => null);
    console.log('📝 H1 Text:', h1Text || 'No H1 found');

    // Check for navigation
    const navLinks = await page.locator('nav a, header a').all();
    console.log(`🔗 Navigation links found: ${navLinks.length}`);

    // Look for any error messages in the UI
    const errorElements = await page.locator('text=/error|failed|cannot|unable/i').all();
    if (errorElements.length > 0) {
      console.log('\n⚠️ Potential error messages in UI:');
      for (const elem of errorElements) {
        const text = await elem.textContent();
        console.log('  -', text.substring(0, 100));
      }
    }

    // Check what JavaScript files are loaded
    const scripts = await page.locator('script[src]').all();
    console.log(`\n📜 JavaScript files loaded: ${scripts.length}`);

    // Check CSS files
    const stylesheets = await page.locator('link[rel="stylesheet"]').all();
    console.log(`🎨 Stylesheets loaded: ${stylesheets.length}`);

    // Get computed styles of body
    const bodyStyles = await page.locator('body').evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        fontFamily: styles.fontFamily
      };
    });
    console.log('\n🎨 Body Styles:', bodyStyles);

    // Check for any Next.js specific errors
    const nextError = await page.locator('#__next-build-error').count();
    if (nextError > 0) {
      const errorText = await page.locator('#__next-build-error').textContent();
      console.error('\n🔴 Next.js Build Error:', errorText);
    }

    // Take screenshot for visual inspection
    await page.screenshot({ path: 'diagnosis-screenshot.png', fullPage: false });
    console.log('\n📸 Screenshot saved as diagnosis-screenshot.png');

    // Print console logs summary
    if (consoleLogs.length > 0) {
      console.log('\n📋 Console Logs Summary:');
      consoleLogs.forEach(log => {
        console.log(`  [${log.type}] ${log.text.substring(0, 200)}`);
      });
    }

    // Wait to observe any dynamic loading
    await page.waitForTimeout(3000);

  } catch (error) {
    console.error('🔴 Navigation Error:', error.message);

    // Try to get more details about the error
    const pageContent = await page.content().catch(() => 'Could not get page content');
    console.log('\n📄 Page HTML (first 1000 chars):', pageContent.substring(0, 1000));
  }

  await browser.close();
})();