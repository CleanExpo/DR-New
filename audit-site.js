const { chromium } = require('playwright');

async function auditWebsite() {
  const browser = await chromium.launch({
    headless: false,
    args: ['--disable-blink-features=AutomationControlled']
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });

  const page = await context.newPage();

  // Capture console messages
  const consoleMessages = [];
  page.on('console', msg => consoleMessages.push({ type: msg.type(), text: msg.text() }));

  // Capture network failures
  const failedRequests = [];
  page.on('requestfailed', request => {
    failedRequests.push({
      url: request.url(),
      failure: request.failure()
    });
  });

  console.log('🔍 Starting comprehensive website audit...\n');

  try {
    // Navigate to the site
    console.log('📱 Loading website...');
    const response = await page.goto('http://localhost:3003', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Check response status
    console.log(`✅ Page loaded with status: ${response.status()}\n`);

    // 1. IMAGE AUDIT
    console.log('🖼️ IMAGE AUDIT:');
    const images = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.map(img => ({
        src: img.src,
        alt: img.alt,
        loaded: img.complete && img.naturalHeight !== 0,
        displayed: img.offsetWidth > 0 && img.offsetHeight > 0,
        width: img.width,
        height: img.height,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight
      }));
    });

    const loadedImages = images.filter(img => img.loaded);
    const displayedImages = images.filter(img => img.displayed);
    const brokenImages = images.filter(img => !img.loaded);

    console.log(`  Total images found: ${images.length}`);
    console.log(`  Images loaded: ${loadedImages.length}`);
    console.log(`  Images displayed: ${displayedImages.length}`);
    console.log(`  Broken images: ${brokenImages.length}`);

    if (brokenImages.length > 0) {
      console.log('\n  ❌ Broken images:');
      brokenImages.forEach(img => {
        console.log(`    - ${img.src}`);
      });
    }

    if (displayedImages.length > 0) {
      console.log('\n  ✅ Working images:');
      displayedImages.slice(0, 5).forEach(img => {
        console.log(`    - ${img.src} (${img.naturalWidth}x${img.naturalHeight})`);
      });
    }

    // 2. PERFORMANCE METRICS
    console.log('\n⚡ PERFORMANCE METRICS:');
    const performanceMetrics = await page.evaluate(() => {
      const perf = performance.getEntriesByType('navigation')[0];
      return {
        domContentLoaded: perf.domContentLoadedEventEnd - perf.domContentLoadedEventStart,
        loadComplete: perf.loadEventEnd - perf.loadEventStart,
        totalLoadTime: perf.loadEventEnd - perf.fetchStart,
        domInteractive: perf.domInteractive - perf.fetchStart
      };
    });

    console.log(`  DOM Content Loaded: ${performanceMetrics.domContentLoaded.toFixed(2)}ms`);
    console.log(`  Page Load Complete: ${performanceMetrics.loadComplete.toFixed(2)}ms`);
    console.log(`  Total Load Time: ${performanceMetrics.totalLoadTime.toFixed(2)}ms`);
    console.log(`  Time to Interactive: ${performanceMetrics.domInteractive.toFixed(2)}ms`);

    // 3. SEO AUDIT
    console.log('\n🔍 SEO AUDIT:');
    const seoData = await page.evaluate(() => {
      const title = document.title;
      const metaDescription = document.querySelector('meta[name="description"]');
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      const h1s = document.querySelectorAll('h1');
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const schemaScripts = document.querySelectorAll('script[type="application/ld+json"]');

      return {
        title,
        metaDescription: metaDescription?.content,
        metaKeywords: metaKeywords?.content,
        h1Count: h1s.length,
        h1Text: Array.from(h1s).map(h => h.textContent),
        canonical: canonicalLink?.href,
        ogTitle: ogTitle?.content,
        schemaCount: schemaScripts.length
      };
    });

    console.log(`  Title: ${seoData.title || '❌ Missing'}`);
    console.log(`  Meta Description: ${seoData.metaDescription ? '✅ Present' : '❌ Missing'}`);
    console.log(`  H1 Tags: ${seoData.h1Count} found`);
    console.log(`  Canonical URL: ${seoData.canonical ? '✅ Present' : '❌ Missing'}`);
    console.log(`  Open Graph Title: ${seoData.ogTitle ? '✅ Present' : '❌ Missing'}`);
    console.log(`  Schema Markup: ${seoData.schemaCount} scripts found`);

    // 4. MOBILE RESPONSIVENESS
    console.log('\n📱 MOBILE RESPONSIVENESS:');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);

    const mobileCheck = await page.evaluate(() => {
      const viewport = document.querySelector('meta[name="viewport"]');
      const horizontalScroll = document.documentElement.scrollWidth > window.innerWidth;
      const clickableElements = document.querySelectorAll('button, a, input, select, textarea');
      const smallButtons = Array.from(clickableElements).filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.width < 44 || rect.height < 44;
      });

      return {
        hasViewport: !!viewport,
        horizontalScroll,
        smallButtonCount: smallButtons.length,
        totalClickable: clickableElements.length
      };
    });

    console.log(`  Viewport meta tag: ${mobileCheck.hasViewport ? '✅ Present' : '❌ Missing'}`);
    console.log(`  Horizontal scroll: ${mobileCheck.horizontalScroll ? '❌ Yes (Bad)' : '✅ No (Good)'}`);
    console.log(`  Touch targets < 44px: ${mobileCheck.smallButtonCount} of ${mobileCheck.totalClickable}`);

    // 5. ACCESSIBILITY CHECK
    console.log('\n♿ ACCESSIBILITY:');
    const accessibilityData = await page.evaluate(() => {
      const imagesWithoutAlt = document.querySelectorAll('img:not([alt])').length;
      const buttonsWithoutText = Array.from(document.querySelectorAll('button')).filter(
        btn => !btn.textContent.trim() && !btn.getAttribute('aria-label')
      ).length;
      const formLabels = document.querySelectorAll('label').length;
      const formInputs = document.querySelectorAll('input, select, textarea').length;
      const langAttribute = document.documentElement.lang;

      return {
        imagesWithoutAlt,
        buttonsWithoutText,
        formLabels,
        formInputs,
        langAttribute
      };
    });

    console.log(`  Images without alt text: ${accessibilityData.imagesWithoutAlt}`);
    console.log(`  Buttons without text/label: ${accessibilityData.buttonsWithoutText}`);
    console.log(`  Form labels: ${accessibilityData.formLabels} for ${accessibilityData.formInputs} inputs`);
    console.log(`  Language attribute: ${accessibilityData.langAttribute || '❌ Missing'}`);

    // 6. CONSOLE ERRORS
    console.log('\n⚠️ CONSOLE MESSAGES:');
    const errors = consoleMessages.filter(msg => msg.type === 'error');
    const warnings = consoleMessages.filter(msg => msg.type === 'warning');

    console.log(`  Errors: ${errors.length}`);
    console.log(`  Warnings: ${warnings.length}`);

    if (errors.length > 0) {
      console.log('\n  Error messages:');
      errors.slice(0, 5).forEach(err => {
        console.log(`    - ${err.text}`);
      });
    }

    // 7. NETWORK FAILURES
    if (failedRequests.length > 0) {
      console.log('\n❌ FAILED NETWORK REQUESTS:');
      failedRequests.forEach(req => {
        console.log(`  - ${req.url}`);
        console.log(`    Reason: ${req.failure.errorText}`);
      });
    }

    // Take screenshots
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.screenshot({ path: 'audit-desktop.png', fullPage: false });

    await page.setViewportSize({ width: 375, height: 667 });
    await page.screenshot({ path: 'audit-mobile.png', fullPage: false });

    console.log('\n📸 Screenshots saved: audit-desktop.png, audit-mobile.png');

    // Generate score
    console.log('\n📊 OVERALL SCORES:');
    const imageScore = displayedImages.length > 0 ? Math.min(100, (displayedImages.length / Math.max(1, images.length)) * 100) : 0;
    const perfScore = performanceMetrics.totalLoadTime < 3000 ? 90 : performanceMetrics.totalLoadTime < 5000 ? 70 : 50;
    const seoScore = (seoData.title ? 20 : 0) + (seoData.metaDescription ? 20 : 0) +
                     (seoData.h1Count > 0 ? 20 : 0) + (seoData.canonical ? 20 : 0) +
                     (seoData.schemaCount > 0 ? 20 : 0);
    const mobileScore = (mobileCheck.hasViewport ? 50 : 0) + (!mobileCheck.horizontalScroll ? 50 : 0);

    console.log(`  Images: ${imageScore.toFixed(0)}/100`);
    console.log(`  Performance: ${perfScore}/100`);
    console.log(`  SEO: ${seoScore}/100`);
    console.log(`  Mobile: ${mobileScore}/100`);
    console.log(`  Overall: ${((imageScore + perfScore + seoScore + mobileScore) / 4).toFixed(0)}/100`);

  } catch (error) {
    console.error('❌ Audit failed:', error);
  } finally {
    await browser.close();
  }
}

auditWebsite().catch(console.error);