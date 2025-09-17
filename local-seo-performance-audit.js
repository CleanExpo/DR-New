const puppeteer = require('puppeteer');
const fs = require('fs');

async function performLocalSEOAudit() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  console.log('Starting Local SEO and Performance Audit...\n');

  // Performance metrics collection
  const metrics = {
    performance: {},
    localSEO: {},
    trustSignals: {},
    conversion: {},
    recommendations: []
  };

  try {
    // Set viewport for mobile-first testing
    await page.setViewport({ width: 390, height: 844 }); // iPhone 14 Pro

    // Enable performance monitoring
    const client = await page.target().createCDPSession();
    await client.send('Performance.enable');

    // Navigate to the page
    console.log('Loading homepage...');
    const startTime = Date.now();
    await page.goto('http://localhost:3003', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    const loadTime = Date.now() - startTime;

    metrics.performance.pageLoadTime = loadTime;

    // Get performance metrics
    const performanceMetrics = await page.evaluate(() => {
      const paint = performance.getEntriesByType('paint');
      const navigation = performance.getEntriesByType('navigation')[0];

      return {
        FCP: paint.find(p => p.name === 'first-contentful-paint')?.startTime,
        LCP: performance.getEntriesByType('largest-contentful-paint')[0]?.startTime,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart
      };
    });

    Object.assign(metrics.performance, performanceMetrics);

    // Check NAP Consistency
    console.log('\nChecking NAP (Name, Address, Phone) consistency...');
    const napElements = await page.evaluate(() => {
      const results = {
        phoneNumbers: [],
        addresses: [],
        businessName: []
      };

      // Find all phone numbers
      const phoneRegex = /1300\s?309\s?361/gi;
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );

      let node;
      while (node = walker.nextNode()) {
        if (phoneRegex.test(node.textContent)) {
          results.phoneNumbers.push(node.textContent.trim());
        }
      }

      // Find addresses
      const addressElements = document.querySelectorAll('*');
      addressElements.forEach(el => {
        if (el.textContent.includes('4/17 Tile St') ||
            el.textContent.includes('Wacol') ||
            el.textContent.includes('QLD 4076')) {
          results.addresses.push(el.textContent.trim());
        }
      });

      // Find business name mentions
      const businessNameElements = document.querySelectorAll('*');
      businessNameElements.forEach(el => {
        if (el.textContent.includes('Disaster Recovery Brisbane')) {
          results.businessName.push(el.tagName);
        }
      });

      return results;
    });

    metrics.localSEO.napConsistency = {
      phoneCount: napElements.phoneNumbers.length,
      addressCount: napElements.addresses.length,
      businessNameCount: napElements.businessName.length
    };

    // Check Schema Markup
    console.log('Checking Schema markup...');
    const schemaMarkup = await page.evaluate(() => {
      const schemas = [];
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        try {
          const data = JSON.parse(script.textContent);
          schemas.push(data['@type'] || 'Unknown');
        } catch (e) {}
      });
      return schemas;
    });

    metrics.localSEO.schemaTypes = schemaMarkup;

    // Check local keywords
    console.log('Analyzing local keyword optimization...');
    const localKeywords = await page.evaluate(() => {
      const content = document.body.textContent.toLowerCase();
      const keywords = {
        'brisbane': (content.match(/brisbane/g) || []).length,
        'ipswich': (content.match(/ipswich/g) || []).length,
        'logan': (content.match(/logan/g) || []).length,
        'near me': (content.match(/near me/g) || []).length,
        'emergency': (content.match(/emergency/g) || []).length,
        '24/7': (content.match(/24\/7/g) || []).length
      };
      return keywords;
    });

    metrics.localSEO.keywordDensity = localKeywords;

    // Check trust signals
    console.log('Evaluating trust signals...');
    const trustSignals = await page.evaluate(() => {
      const signals = {
        certifications: [],
        testimonials: 0,
        awards: 0,
        insuranceLogos: 0
      };

      // Check for certification mentions
      const certText = document.body.textContent;
      if (certText.includes('IICRC')) signals.certifications.push('IICRC');
      if (certText.includes('CARSI')) signals.certifications.push('CARSI');

      // Count testimonials
      signals.testimonials = document.querySelectorAll('[class*="testimonial"], [class*="review"]').length;

      // Count awards/badges
      signals.awards = document.querySelectorAll('[class*="award"], [class*="badge"]').length;

      // Count insurance logos
      signals.insuranceLogos = document.querySelectorAll('img[alt*="insurance"], img[src*="insurance"]').length;

      return signals;
    });

    metrics.trustSignals = trustSignals;

    // Check conversion elements
    console.log('Analyzing conversion optimization...');
    const conversionElements = await page.evaluate(() => {
      const elements = {
        ctaButtons: 0,
        forms: 0,
        phoneLinks: 0,
        liveChat: false,
        emergencyCTA: false
      };

      // Count CTA buttons
      elements.ctaButtons = document.querySelectorAll('button, a[class*="btn"], a[class*="button"]').length;

      // Count forms
      elements.forms = document.querySelectorAll('form').length;

      // Count clickable phone links
      elements.phoneLinks = document.querySelectorAll('a[href^="tel:"]').length;

      // Check for live chat
      elements.liveChat = !!document.querySelector('[class*="chat"], [id*="chat"]');

      // Check for emergency CTA
      elements.emergencyCTA = !!document.querySelector('[class*="emergency"]');

      return elements;
    });

    metrics.conversion = conversionElements;

    // Core Web Vitals
    console.log('Measuring Core Web Vitals...');
    const coreWebVitals = await page.evaluate(() => {
      return new Promise(resolve => {
        let cls = 0;
        const observer = new PerformanceObserver(list => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
              cls += entry.value;
            }
          }
        });
        observer.observe({ entryTypes: ['layout-shift'] });

        setTimeout(() => {
          observer.disconnect();
          resolve({ CLS: cls });
        }, 2000);
      });
    });

    metrics.performance.CLS = coreWebVitals.CLS;

    // Generate recommendations
    console.log('\nGenerating recommendations...');

    // NAP recommendations
    if (metrics.localSEO.napConsistency.phoneCount < 3) {
      metrics.recommendations.push({
        priority: 'HIGH',
        category: 'NAP Consistency',
        issue: 'Limited phone number visibility',
        action: 'Add phone number to header, footer, and above-the-fold content'
      });
    }

    if (metrics.localSEO.napConsistency.addressCount < 2) {
      metrics.recommendations.push({
        priority: 'HIGH',
        category: 'NAP Consistency',
        issue: 'Address not prominently displayed',
        action: 'Add full address (4/17 Tile St, Wacol, QLD 4076) to footer and contact sections'
      });
    }

    // Schema recommendations
    if (!metrics.localSEO.schemaTypes.includes('LocalBusiness')) {
      metrics.recommendations.push({
        priority: 'HIGH',
        category: 'Schema Markup',
        issue: 'Missing LocalBusiness schema',
        action: 'Implement LocalBusiness schema with complete NAP, service areas, and opening hours'
      });
    }

    // Performance recommendations
    if (metrics.performance.FCP > 1800) {
      metrics.recommendations.push({
        priority: 'HIGH',
        category: 'Performance',
        issue: 'First Contentful Paint > 1.8s',
        action: 'Optimize critical rendering path, reduce JavaScript bundle size'
      });
    }

    if (metrics.performance.pageLoadTime > 3000) {
      metrics.recommendations.push({
        priority: 'MEDIUM',
        category: 'Performance',
        issue: 'Page load time > 3s',
        action: 'Implement lazy loading, optimize images, use CDN'
      });
    }

    // Local keyword recommendations
    if (metrics.localSEO.keywordDensity['near me'] === 0) {
      metrics.recommendations.push({
        priority: 'MEDIUM',
        category: 'Local SEO',
        issue: 'No "near me" keywords found',
        action: 'Add "near me" variations to service descriptions and headings'
      });
    }

    // Trust signal recommendations
    if (metrics.trustSignals.testimonials < 3) {
      metrics.recommendations.push({
        priority: 'MEDIUM',
        category: 'Trust Signals',
        issue: 'Limited testimonials/reviews displayed',
        action: 'Add more customer testimonials with location mentions (Brisbane, Ipswich, Logan)'
      });
    }

    // Conversion recommendations
    if (metrics.conversion.phoneLinks < 3) {
      metrics.recommendations.push({
        priority: 'HIGH',
        category: 'Conversion',
        issue: 'Limited click-to-call buttons',
        action: 'Add prominent click-to-call buttons in header, hero, and sticky mobile bar'
      });
    }

    // Display results
    console.log('\n' + '='.repeat(60));
    console.log('LOCAL SEO & PERFORMANCE AUDIT RESULTS');
    console.log('='.repeat(60));

    console.log('\n📊 PERFORMANCE METRICS:');
    console.log(`  • Page Load Time: ${metrics.performance.pageLoadTime}ms`);
    console.log(`  • First Contentful Paint: ${metrics.performance.FCP?.toFixed(2)}ms`);
    console.log(`  • Largest Contentful Paint: ${metrics.performance.LCP?.toFixed(2)}ms`);
    console.log(`  • Cumulative Layout Shift: ${metrics.performance.CLS?.toFixed(3)}`);

    console.log('\n📍 NAP CONSISTENCY:');
    console.log(`  • Phone Number Occurrences: ${metrics.localSEO.napConsistency.phoneCount}`);
    console.log(`  • Address Occurrences: ${metrics.localSEO.napConsistency.addressCount}`);
    console.log(`  • Business Name Mentions: ${metrics.localSEO.napConsistency.businessNameCount}`);

    console.log('\n🔍 LOCAL KEYWORDS:');
    Object.entries(metrics.localSEO.keywordDensity).forEach(([keyword, count]) => {
      console.log(`  • "${keyword}": ${count} occurrences`);
    });

    console.log('\n✅ TRUST SIGNALS:');
    console.log(`  • Certifications: ${metrics.trustSignals.certifications.join(', ') || 'None found'}`);
    console.log(`  • Testimonials: ${metrics.trustSignals.testimonials}`);
    console.log(`  • Awards/Badges: ${metrics.trustSignals.awards}`);

    console.log('\n💰 CONVERSION ELEMENTS:');
    console.log(`  • CTA Buttons: ${metrics.conversion.ctaButtons}`);
    console.log(`  • Forms: ${metrics.conversion.forms}`);
    console.log(`  • Phone Links: ${metrics.conversion.phoneLinks}`);
    console.log(`  • Live Chat: ${metrics.conversion.liveChat ? 'Yes' : 'No'}`);
    console.log(`  • Emergency CTA: ${metrics.conversion.emergencyCTA ? 'Yes' : 'No'}`);

    console.log('\n🎯 PRIORITIZED RECOMMENDATIONS:');
    const highPriority = metrics.recommendations.filter(r => r.priority === 'HIGH');
    const mediumPriority = metrics.recommendations.filter(r => r.priority === 'MEDIUM');

    if (highPriority.length > 0) {
      console.log('\n  HIGH PRIORITY:');
      highPriority.forEach((rec, i) => {
        console.log(`  ${i + 1}. [${rec.category}] ${rec.issue}`);
        console.log(`     → ${rec.action}`);
      });
    }

    if (mediumPriority.length > 0) {
      console.log('\n  MEDIUM PRIORITY:');
      mediumPriority.forEach((rec, i) => {
        console.log(`  ${i + 1}. [${rec.category}] ${rec.issue}`);
        console.log(`     → ${rec.action}`);
      });
    }

    // Save full report
    fs.writeFileSync('local-seo-audit-report.json', JSON.stringify(metrics, null, 2));
    console.log('\n✅ Full report saved to local-seo-audit-report.json');

  } catch (error) {
    console.error('Error during audit:', error.message);
  } finally {
    await browser.close();
  }
}

// Run the audit
performLocalSEOAudit();