const { chromium } = require('playwright');

async function finalAudit() {
  const browser = await chromium.launch({
    headless: false,
    args: ['--disable-blink-features=AutomationControlled']
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });

  const page = await context.newPage();

  console.log('🚀 COMPREHENSIVE WEBSITE AUDIT - DISASTER RECOVERY BRISBANE\n');
  console.log('=' .repeat(80));

  try {
    // Navigate to the site
    console.log('\n📱 WEBSITE LOADING...');
    const startTime = Date.now();
    const response = await page.goto('http://localhost:3003', {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    const loadTime = Date.now() - startTime;

    console.log(`✅ Page loaded in ${loadTime}ms with status: ${response.status()}\n`);

    // 1. IMAGE AUDIT
    console.log('🖼️  IMAGE AUDIT');
    console.log('-'.repeat(40));
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

    console.log(`✅ Total images: ${images.length}`);
    console.log(`✅ Images loaded: ${loadedImages.length}`);
    console.log(`✅ Images displayed: ${displayedImages.length}`);
    console.log(`${brokenImages.length > 0 ? '⚠️' : '✅'} Broken images: ${brokenImages.length}`);

    // 2. PERFORMANCE METRICS
    console.log('\n⚡ PERFORMANCE METRICS');
    console.log('-'.repeat(40));
    const metrics = await page.evaluate(() => ({
      FCP: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
      LCP: performance.getEntriesByType('largest-contentful-paint')[0]?.startTime || 0,
      CLS: 0,
      FID: 0,
      TTFB: performance.getEntriesByType('navigation')[0]?.responseStart || 0
    }));

    console.log(`✅ First Contentful Paint (FCP): ${metrics.FCP.toFixed(0)}ms ${metrics.FCP < 1800 ? '✅' : '⚠️'}`);
    console.log(`✅ Largest Contentful Paint (LCP): ${metrics.LCP.toFixed(0)}ms ${metrics.LCP < 2500 ? '✅' : '⚠️'}`);
    console.log(`✅ Time to First Byte (TTFB): ${metrics.TTFB.toFixed(0)}ms ${metrics.TTFB < 800 ? '✅' : '⚠️'}`);
    console.log(`✅ Total Load Time: ${loadTime}ms ${loadTime < 3000 ? '✅' : '⚠️'}`);

    // 3. SEO AUDIT
    console.log('\n🔍 SEO AUDIT');
    console.log('-'.repeat(40));
    const seoData = await page.evaluate(() => {
      const title = document.title;
      const metaDescription = document.querySelector('meta[name="description"]');
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      const h1s = document.querySelectorAll('h1');
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const schemaScripts = document.querySelectorAll('script[type="application/ld+json"]');

      // Parse schema scripts
      let schemas = [];
      schemaScripts.forEach(script => {
        try {
          const data = JSON.parse(script.textContent);
          schemas.push(data['@type'] || 'Unknown');
        } catch (e) {}
      });

      return {
        title,
        titleLength: title?.length || 0,
        metaDescription: metaDescription?.content,
        descriptionLength: metaDescription?.content?.length || 0,
        metaKeywords: metaKeywords?.content,
        h1Count: h1s.length,
        h1Text: Array.from(h1s).map(h => h.textContent),
        canonical: canonicalLink?.href,
        ogTitle: ogTitle?.content,
        schemaCount: schemaScripts.length,
        schemaTypes: schemas
      };
    });

    console.log(`✅ Title (${seoData.titleLength} chars): ${seoData.title ? 'Present' : '❌ Missing'}`);
    console.log(`✅ Meta Description (${seoData.descriptionLength} chars): ${seoData.metaDescription ? 'Present' : '❌ Missing'}`);
    console.log(`✅ Meta Keywords: ${seoData.metaKeywords ? 'Present' : '⚠️ Missing'}`);
    console.log(`✅ H1 Tags: ${seoData.h1Count} found`);
    console.log(`✅ Canonical URL: ${seoData.canonical ? 'Present' : '❌ Missing'}`);
    console.log(`✅ Open Graph: ${seoData.ogTitle ? 'Present' : '❌ Missing'}`);
    console.log(`✅ Schema Markup: ${seoData.schemaCount} scripts`);

    if (seoData.schemaTypes.length > 0) {
      console.log(`   Schema Types: ${seoData.schemaTypes.join(', ')}`);
    }

    // 4. GEO (Generative Engine Optimization)
    console.log('\n🤖 GEO (GENERATIVE ENGINE OPTIMIZATION)');
    console.log('-'.repeat(40));
    const geoData = await page.evaluate(() => {
      const faqs = document.querySelectorAll('[itemtype*="FAQPage"], [data-faq], .faq');
      const howtos = document.querySelectorAll('[itemtype*="HowTo"], [data-howto], .howto');
      const lists = document.querySelectorAll('ul, ol');
      const tables = document.querySelectorAll('table');
      const strongText = document.querySelectorAll('strong, b');
      const localSchema = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
        .filter(s => s.textContent.includes('LocalBusiness'));

      return {
        faqCount: faqs.length,
        howToCount: howtos.length,
        listCount: lists.length,
        tableCount: tables.length,
        emphasisCount: strongText.length,
        hasLocalSchema: localSchema.length > 0,
        hasStructuredData: document.querySelectorAll('[itemscope]').length > 0
      };
    });

    console.log(`✅ FAQ Content: ${geoData.faqCount > 0 ? 'Present' : '⚠️ Could be added'}`);
    console.log(`✅ How-To Content: ${geoData.howToCount > 0 ? 'Present' : '⚠️ Could be added'}`);
    console.log(`✅ Lists for AI parsing: ${geoData.listCount}`);
    console.log(`✅ Tables for data: ${geoData.tableCount}`);
    console.log(`✅ Emphasized text: ${geoData.emphasisCount} elements`);
    console.log(`✅ Local Business Schema: ${geoData.hasLocalSchema ? 'Present' : '❌ Missing'}`);

    // 5. MOBILE RESPONSIVENESS
    console.log('\n📱 MOBILE RESPONSIVENESS');
    console.log('-'.repeat(40));
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
        totalClickable: clickableElements.length,
        touchTargetPercentage: ((clickableElements.length - smallButtons.length) / clickableElements.length * 100).toFixed(1)
      };
    });

    console.log(`✅ Viewport meta tag: ${mobileCheck.hasViewport ? 'Present' : '❌ Missing'}`);
    console.log(`✅ Horizontal scroll: ${mobileCheck.horizontalScroll ? '❌ Yes (Bad)' : '✅ No (Good)'}`);
    console.log(`✅ Touch targets >= 44px: ${mobileCheck.touchTargetPercentage}%`);

    // 6. ACCESSIBILITY
    console.log('\n♿ ACCESSIBILITY');
    console.log('-'.repeat(40));
    const accessibilityData = await page.evaluate(() => {
      const imagesWithoutAlt = document.querySelectorAll('img:not([alt])').length;
      const imagesWithAlt = document.querySelectorAll('img[alt]').length;
      const buttonsWithoutText = Array.from(document.querySelectorAll('button')).filter(
        btn => !btn.textContent.trim() && !btn.getAttribute('aria-label')
      ).length;
      const formLabels = document.querySelectorAll('label').length;
      const formInputs = document.querySelectorAll('input, select, textarea').length;
      const langAttribute = document.documentElement.lang;
      const contrastElements = document.querySelectorAll('[style*="color"]').length;
      const ariaLabels = document.querySelectorAll('[aria-label]').length;

      return {
        imagesWithoutAlt,
        imagesWithAlt,
        buttonsWithoutText,
        formLabels,
        formInputs,
        langAttribute,
        contrastElements,
        ariaLabels
      };
    });

    console.log(`✅ Images with alt text: ${accessibilityData.imagesWithAlt}/${accessibilityData.imagesWithAlt + accessibilityData.imagesWithoutAlt}`);
    console.log(`✅ Buttons with text/label: ${accessibilityData.buttonsWithoutText === 0 ? '✅ All labeled' : '⚠️ ' + accessibilityData.buttonsWithoutText + ' unlabeled'}`);
    console.log(`✅ Form accessibility: ${accessibilityData.formLabels} labels for ${accessibilityData.formInputs} inputs`);
    console.log(`✅ Language attribute: ${accessibilityData.langAttribute || '❌ Missing'}`);
    console.log(`✅ ARIA labels: ${accessibilityData.ariaLabels} elements`);

    // 7. BRISBANE LOCAL SEO
    console.log('\n📍 BRISBANE LOCAL SEO');
    console.log('-'.repeat(40));
    const localSEO = await page.evaluate(() => {
      const content = document.body.textContent.toLowerCase();
      const brisbaneCount = (content.match(/brisbane/g) || []).length;
      const ipswichCount = (content.match(/ipswich/g) || []).length;
      const loganCount = (content.match(/logan/g) || []).length;
      const phoneNumbers = document.querySelectorAll('a[href^="tel:"]').length;
      const emergencyKeywords = (content.match(/emergency|24\/7|urgent|immediate/g) || []).length;

      return {
        brisbaneCount,
        ipswichCount,
        loganCount,
        phoneNumbers,
        emergencyKeywords
      };
    });

    console.log(`✅ "Brisbane" mentions: ${localSEO.brisbaneCount}`);
    console.log(`✅ "Ipswich" mentions: ${localSEO.ipswichCount}`);
    console.log(`✅ "Logan" mentions: ${localSEO.loganCount}`);
    console.log(`✅ Phone number links: ${localSEO.phoneNumbers}`);
    console.log(`✅ Emergency keywords: ${localSEO.emergencyKeywords}`);

    // FINAL SCORES
    console.log('\n📊 FINAL SCORES');
    console.log('=' .repeat(80));

    const imageScore = Math.min(100, (displayedImages.length / Math.max(1, images.length)) * 100);
    const perfScore = loadTime < 2000 ? 100 : loadTime < 3000 ? 90 : loadTime < 5000 ? 70 : 50;
    const seoScore = Math.min(100,
      (seoData.title ? 15 : 0) +
      (seoData.metaDescription ? 15 : 0) +
      (seoData.h1Count > 0 ? 15 : 0) +
      (seoData.canonical ? 15 : 0) +
      (seoData.schemaCount > 0 ? 20 : 0) +
      (localSEO.brisbaneCount > 0 ? 10 : 0) +
      (localSEO.phoneNumbers > 0 ? 10 : 0)
    );
    const geoScore = Math.min(100,
      (geoData.hasLocalSchema ? 25 : 0) +
      (seoData.schemaCount > 3 ? 25 : 0) +
      (geoData.listCount > 5 ? 25 : 0) +
      (geoData.emphasisCount > 10 ? 25 : 0)
    );
    const mobileScore = (mobileCheck.hasViewport ? 50 : 0) + (!mobileCheck.horizontalScroll ? 50 : 0);
    const accessScore = Math.min(100,
      (accessibilityData.imagesWithoutAlt === 0 ? 50 : 25) +
      (accessibilityData.buttonsWithoutText === 0 ? 25 : 0) +
      (accessibilityData.langAttribute ? 25 : 0)
    );

    console.log(`\n🖼️  Images:         ${imageScore.toFixed(0)}/100 ${imageScore >= 80 ? '✅' : '⚠️'}`);
    console.log(`⚡ Performance:    ${perfScore}/100 ${perfScore >= 80 ? '✅' : '⚠️'}`);
    console.log(`🔍 SEO:           ${seoScore}/100 ${seoScore >= 80 ? '✅' : '⚠️'}`);
    console.log(`🤖 GEO:           ${geoScore}/100 ${geoScore >= 80 ? '✅' : '⚠️'}`);
    console.log(`📱 Mobile:        ${mobileScore}/100 ${mobileScore >= 80 ? '✅' : '⚠️'}`);
    console.log(`♿ Accessibility: ${accessScore}/100 ${accessScore >= 80 ? '✅' : '⚠️'}`);
    console.log('-'.repeat(40));
    const overallScore = (imageScore + perfScore + seoScore + geoScore + mobileScore + accessScore) / 6;
    console.log(`📈 OVERALL:       ${overallScore.toFixed(0)}/100 ${overallScore >= 85 ? '✅ EXCELLENT' : overallScore >= 70 ? '✅ GOOD' : '⚠️ NEEDS WORK'}`);

    // Take screenshots
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.screenshot({ path: 'final-audit-desktop.png', fullPage: false });

    await page.setViewportSize({ width: 375, height: 667 });
    await page.screenshot({ path: 'final-audit-mobile.png', fullPage: false });

    console.log('\n📸 Screenshots saved: final-audit-desktop.png, final-audit-mobile.png');

    // Recommendations
    console.log('\n💡 RECOMMENDATIONS');
    console.log('=' .repeat(80));

    if (brokenImages.length > 0) {
      console.log('⚠️  Fix broken images to improve visual appeal');
    }

    if (loadTime > 3000) {
      console.log('⚠️  Optimize page load time (consider image compression, lazy loading)');
    }

    if (!geoData.faqCount) {
      console.log('💡 Add FAQ section for better voice search and AI visibility');
    }

    if (localSEO.brisbaneCount < 5) {
      console.log('💡 Increase local Brisbane/Ipswich/Logan mentions for local SEO');
    }

    if (seoData.schemaCount < 3) {
      console.log('💡 Add more structured data schemas (FAQ, HowTo, Service)');
    }

    console.log('\n✅ AUDIT COMPLETE');

  } catch (error) {
    console.error('❌ Audit failed:', error);
  } finally {
    await browser.close();
  }
}

finalAudit().catch(console.error);