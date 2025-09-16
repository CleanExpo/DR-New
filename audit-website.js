const { chromium } = require('playwright');

async function auditWebsite() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log('Starting website audit...\n');

  // Capture console errors
  const errors = [];
  const warnings = [];
  const logs = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
      console.log('❌ ERROR:', msg.text());
    } else if (msg.type() === 'warning') {
      warnings.push(msg.text());
      console.log('⚠️ WARNING:', msg.text());
    } else {
      logs.push(msg.text());
    }
  });

  page.on('pageerror', error => {
    console.log('🔴 PAGE ERROR:', error.message);
    errors.push(error.message);
  });

  // Navigate to the website
  console.log('Loading http://localhost:3000...\n');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 60000 });

  // Wait for the page to fully load
  await page.waitForTimeout(3000);

  // Check for images
  console.log('\n📸 IMAGE AUDIT:');
  const images = await page.$$eval('img', imgs =>
    imgs.map(img => ({
      src: img.src,
      alt: img.alt || 'NO ALT TEXT',
      visible: img.offsetWidth > 0 && img.offsetHeight > 0,
      loaded: img.complete && img.naturalHeight !== 0
    }))
  );

  console.log(`Total images found: ${images.length}`);
  const visibleImages = images.filter(img => img.visible);
  const loadedImages = images.filter(img => img.loaded);
  console.log(`Visible images: ${visibleImages.length}`);
  console.log(`Successfully loaded images: ${loadedImages.length}`);

  if (images.length > 0) {
    console.log('\nImage details:');
    images.forEach((img, index) => {
      console.log(`  ${index + 1}. ${img.src}`);
      console.log(`     Alt: ${img.alt}`);
      console.log(`     Visible: ${img.visible ? '✅' : '❌'}`);
      console.log(`     Loaded: ${img.loaded ? '✅' : '❌'}`);
    });
  }

  // Check page title and meta tags
  console.log('\n📋 META TAGS AUDIT:');
  const title = await page.title();
  console.log(`Page Title: ${title || 'NO TITLE'}`);

  const metaDescription = await page.$eval('meta[name="description"]', el => el.content).catch(() => 'NO DESCRIPTION');
  console.log(`Meta Description: ${metaDescription}`);

  const metaKeywords = await page.$eval('meta[name="keywords"]', el => el.content).catch(() => 'NO KEYWORDS');
  console.log(`Meta Keywords: ${metaKeywords}`);

  // Check Open Graph tags
  const ogTitle = await page.$eval('meta[property="og:title"]', el => el.content).catch(() => 'NO OG:TITLE');
  console.log(`OG Title: ${ogTitle}`);

  const ogDescription = await page.$eval('meta[property="og:description"]', el => el.content).catch(() => 'NO OG:DESCRIPTION');
  console.log(`OG Description: ${ogDescription}`);

  const ogImage = await page.$eval('meta[property="og:image"]', el => el.content).catch(() => 'NO OG:IMAGE');
  console.log(`OG Image: ${ogImage}`);

  // Check performance metrics
  console.log('\n⚡ PERFORMANCE METRICS:');
  const performanceTiming = JSON.stringify(await page.evaluate(() => {
    const perfData = performance.timing;
    return {
      domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
      loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
      domInteractive: perfData.domInteractive - perfData.domLoading,
      pageLoadTime: perfData.loadEventEnd - perfData.fetchStart
    };
  }), null, 2);
  console.log(performanceTiming);

  // Check for structured data
  console.log('\n🔍 STRUCTURED DATA AUDIT:');
  const structuredData = await page.$$eval('script[type="application/ld+json"]', scripts =>
    scripts.map(script => {
      try {
        return JSON.parse(script.innerHTML);
      } catch {
        return 'Invalid JSON';
      }
    })
  );
  console.log(`Found ${structuredData.length} structured data blocks`);
  if (structuredData.length > 0) {
    console.log('Structured Data:', JSON.stringify(structuredData, null, 2));
  }

  // Check mobile responsiveness
  console.log('\n📱 MOBILE RESPONSIVENESS:');
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(1000);
  const mobileViewport = await page.evaluate(() => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      scrollWidth: document.documentElement.scrollWidth,
      horizontalScroll: document.documentElement.scrollWidth > window.innerWidth
    };
  });
  console.log(`Mobile viewport: ${mobileViewport.width}x${mobileViewport.height}`);
  console.log(`Horizontal scroll: ${mobileViewport.horizontalScroll ? '❌ YES (BAD)' : '✅ NO (GOOD)'}`);

  // Summary
  console.log('\n📊 AUDIT SUMMARY:');
  console.log(`- Total Errors: ${errors.length}`);
  console.log(`- Total Warnings: ${warnings.length}`);
  console.log(`- Images Loading: ${loadedImages.length}/${images.length}`);
  console.log(`- SEO Meta Tags: ${metaDescription !== 'NO DESCRIPTION' ? '✅' : '❌'}`);
  console.log(`- Structured Data: ${structuredData.length > 0 ? '✅' : '❌'}`);
  console.log(`- Mobile Responsive: ${!mobileViewport.horizontalScroll ? '✅' : '❌'}`);

  // Take a screenshot
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.screenshot({ path: 'audit-screenshot.png', fullPage: false });
  console.log('\n📸 Screenshot saved as audit-screenshot.png');

  await browser.close();
}

auditWebsite().catch(console.error);