const playwright = require('playwright');
const fs = require('fs');
const path = require('path');

async function runLaunchDayAudit() {
  const results = {
    timestamp: new Date().toISOString(),
    critical: [],
    high: [],
    medium: [],
    low: [],
    metrics: {
      performance: {},
      security: {},
      seo: {},
      accessibility: {}
    },
    recommendations: []
  };

  console.log('🚀 Starting Launch Day Performance Audit...\n');

  const browser = await playwright.chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    // Test both mobile and desktop
    const devices = [
      { name: 'Mobile', viewport: { width: 390, height: 844 }, userAgent: playwright.devices['iPhone 14 Pro'].userAgent },
      { name: 'Desktop', viewport: { width: 1920, height: 1080 } }
    ];

    for (const device of devices) {
      console.log(`\n📱 Testing ${device.name} Performance...`);

      const context = await browser.newContext({
        viewport: device.viewport,
        userAgent: device.userAgent || undefined
      });

      const page = await context.newPage();

      // Enable performance monitoring
      await page.evaluateOnNewDocument(() => {
        window.performanceMetrics = {
          startTime: performance.now(),
          resources: [],
          largestContentfulPaint: 0,
          firstInputDelay: 0,
          cumulativeLayoutShift: 0
        };

        // Track resource loading
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
              window.performanceMetrics.largestContentfulPaint = entry.renderTime || entry.loadTime;
            }
            if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
              window.performanceMetrics.cumulativeLayoutShift += entry.value;
            }
          }
        });

        observer.observe({ entryTypes: ['largest-contentful-paint', 'layout-shift'] });
      });

      // Navigate and measure
      console.log('Loading homepage...');
      const startTime = Date.now();

      try {
        const response = await page.goto('http://localhost:3007', {
          waitUntil: 'networkidle',
          timeout: 30000
        });

        const loadTime = Date.now() - startTime;

        // Get performance metrics
        const metrics = await page.evaluate(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          return {
            domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
            loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
            TTFB: perfData.responseStart - perfData.requestStart,
            FCP: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
            LCP: window.performanceMetrics?.largestContentfulPaint || 0,
            CLS: window.performanceMetrics?.cumulativeLayoutShift || 0,
            resources: performance.getEntriesByType('resource').length,
            totalTransferSize: performance.getEntriesByType('resource').reduce((total, resource) => total + resource.transferSize, 0)
          };
        });

        // Check image optimization
        const images = await page.evaluate(() => {
          const imgs = Array.from(document.querySelectorAll('img'));
          return imgs.map(img => ({
            src: img.src,
            alt: img.alt,
            loading: img.loading,
            width: img.naturalWidth,
            height: img.naturalHeight,
            displayWidth: img.clientWidth,
            displayHeight: img.clientHeight,
            format: img.src.split('.').pop()?.toLowerCase()
          }));
        });

        // Check for unoptimized images
        const unoptimizedImages = images.filter(img => {
          const isLarge = img.width > 2000 || img.height > 2000;
          const noLazyLoad = img.loading !== 'lazy' && !img.src.includes('logo');
          const wrongFormat = ['jpg', 'jpeg', 'png'].includes(img.format) && !img.src.includes('webp');
          return isLarge || noLazyLoad || wrongFormat;
        });

        // Store device-specific metrics
        results.metrics.performance[device.name] = {
          loadTime: loadTime / 1000,
          TTFB: metrics.TTFB,
          FCP: metrics.FCP / 1000,
          LCP: metrics.LCP / 1000,
          CLS: metrics.CLS,
          resourceCount: metrics.resources,
          totalSize: (metrics.totalTransferSize / 1024 / 1024).toFixed(2) + ' MB'
        };

        // Performance scoring
        if (loadTime > 3000) {
          results.critical.push({
            type: 'Performance',
            device: device.name,
            issue: `Page load time exceeds 3 seconds (${(loadTime/1000).toFixed(2)}s)`,
            impact: 'Critical for SEO and user experience',
            fix: 'Optimize images, implement code splitting, enable caching'
          });
        } else if (loadTime > 2000) {
          results.high.push({
            type: 'Performance',
            device: device.name,
            issue: `Page load time exceeds target (${(loadTime/1000).toFixed(2)}s)`,
            impact: 'May affect search rankings',
            fix: 'Further optimize assets and reduce JavaScript payload'
          });
        }

        if (metrics.LCP > 2500) {
          results.high.push({
            type: 'Core Web Vitals',
            device: device.name,
            issue: `LCP exceeds 2.5s (${(metrics.LCP/1000).toFixed(2)}s)`,
            impact: 'Poor Core Web Vitals score',
            fix: 'Optimize largest content element loading'
          });
        }

        if (metrics.CLS > 0.1) {
          results.high.push({
            type: 'Core Web Vitals',
            device: device.name,
            issue: `CLS exceeds 0.1 (${metrics.CLS.toFixed(3)})`,
            impact: 'Layout shifts hurt user experience',
            fix: 'Add explicit dimensions to images and embeds'
          });
        }

        if (unoptimizedImages.length > 0) {
          results.high.push({
            type: 'Images',
            device: device.name,
            issue: `${unoptimizedImages.length} unoptimized images found`,
            impact: 'Slower loading and higher bandwidth usage',
            fix: 'Convert to WebP, implement lazy loading, resize large images'
          });
        }

      } catch (error) {
        results.critical.push({
          type: 'Availability',
          device: device.name,
          issue: `Failed to load page: ${error.message}`,
          impact: 'Site is not accessible',
          fix: 'Check server status and configuration'
        });
      }

      await context.close();
    }

    // Check security headers
    console.log('\n🔒 Checking Security Headers...');
    const securityContext = await browser.newContext();
    const securityPage = await securityContext.newPage();

    const securityResponse = await securityPage.goto('http://localhost:3007', { waitUntil: 'domcontentloaded' });
    const headers = securityResponse.headers();

    const requiredHeaders = {
      'strict-transport-security': 'HSTS',
      'x-content-type-options': 'X-Content-Type-Options',
      'x-frame-options': 'X-Frame-Options',
      'x-xss-protection': 'X-XSS-Protection',
      'content-security-policy': 'CSP'
    };

    for (const [header, name] of Object.entries(requiredHeaders)) {
      if (!headers[header]) {
        results.high.push({
          type: 'Security',
          issue: `Missing ${name} header`,
          impact: 'Security vulnerability',
          fix: `Add ${header} header in next.config.js`
        });
      }
    }

    // Check SSL (for production)
    if (!headers['strict-transport-security']) {
      results.critical.push({
        type: 'Security',
        issue: 'SSL not configured (HSTS header missing)',
        impact: 'Critical for production - browsers will show "Not Secure" warning',
        fix: 'Configure SSL certificate before launch'
      });
    }

    await securityContext.close();

    // SEO Checks
    console.log('\n🔍 Checking SEO Elements...');
    const seoContext = await browser.newContext();
    const seoPage = await seoContext.newPage();
    await seoPage.goto('http://localhost:3007', { waitUntil: 'domcontentloaded' });

    const seoData = await seoPage.evaluate(() => {
      return {
        title: document.title,
        metaDescription: document.querySelector('meta[name="description"]')?.content,
        h1Count: document.querySelectorAll('h1').length,
        canonical: document.querySelector('link[rel="canonical"]')?.href,
        ogTitle: document.querySelector('meta[property="og:title"]')?.content,
        ogDescription: document.querySelector('meta[property="og:description"]')?.content,
        ogImage: document.querySelector('meta[property="og:image"]')?.content,
        structuredData: Array.from(document.querySelectorAll('script[type="application/ld+json"]')).length,
        images: Array.from(document.querySelectorAll('img')).map(img => ({
          src: img.src,
          alt: img.alt || ''
        }))
      };
    });

    // SEO Issues
    if (!seoData.title || seoData.title.length < 30) {
      results.high.push({
        type: 'SEO',
        issue: 'Page title too short or missing',
        impact: 'Poor search visibility',
        fix: 'Add descriptive title with primary keywords'
      });
    }

    if (!seoData.metaDescription || seoData.metaDescription.length < 120) {
      results.high.push({
        type: 'SEO',
        issue: 'Meta description too short or missing',
        impact: 'Lower click-through rates from search',
        fix: 'Add compelling meta description with keywords'
      });
    }

    const imagesWithoutAlt = seoData.images.filter(img => !img.alt).length;
    if (imagesWithoutAlt > 0) {
      results.medium.push({
        type: 'SEO/Accessibility',
        issue: `${imagesWithoutAlt} images without alt text`,
        impact: 'Hurts SEO and accessibility',
        fix: 'Add descriptive alt text to all images'
      });
    }

    if (seoData.structuredData === 0) {
      results.high.push({
        type: 'SEO',
        issue: 'No structured data found',
        impact: 'Missing rich snippets in search results',
        fix: 'Add LocalBusiness and EmergencyService schema'
      });
    }

    await seoContext.close();

    // Generate recommendations
    results.recommendations = [
      '🚨 CRITICAL FIXES (Before Launch):',
      ...results.critical.map(issue => `   • ${issue.issue} - ${issue.fix}`),
      '',
      '⚠️ HIGH PRIORITY (Launch Day):',
      ...results.high.slice(0, 5).map(issue => `   • ${issue.issue} - ${issue.fix}`),
      '',
      '📊 PERFORMANCE METRICS:',
      `   • Desktop Load Time: ${results.metrics.performance.Desktop?.loadTime || 'N/A'}s`,
      `   • Mobile Load Time: ${results.metrics.performance.Mobile?.loadTime || 'N/A'}s`,
      `   • Desktop LCP: ${results.metrics.performance.Desktop?.LCP || 'N/A'}s`,
      `   • Mobile LCP: ${results.metrics.performance.Mobile?.LCP || 'N/A'}s`,
      '',
      '🎯 TARGET METRICS:',
      '   • Load Time: < 2 seconds',
      '   • LCP: < 2.5 seconds',
      '   • CLS: < 0.1',
      '   • TTFB: < 0.8 seconds'
    ];

  } catch (error) {
    console.error('Audit failed:', error);
    results.critical.push({
      type: 'System',
      issue: `Audit failed: ${error.message}`,
      impact: 'Cannot complete audit',
      fix: 'Check system configuration'
    });
  } finally {
    await browser.close();
  }

  // Save report
  const reportPath = path.join(process.cwd(), 'LAUNCH_DAY_AUDIT.md');
  const report = generateMarkdownReport(results);
  fs.writeFileSync(reportPath, report);

  console.log('\n✅ Audit complete! Report saved to LAUNCH_DAY_AUDIT.md');

  // Display summary
  console.log('\n📊 AUDIT SUMMARY:');
  console.log(`   🚨 Critical Issues: ${results.critical.length}`);
  console.log(`   ⚠️  High Priority: ${results.high.length}`);
  console.log(`   ⚡ Medium Priority: ${results.medium.length}`);
  console.log(`   📝 Low Priority: ${results.low.length}`);

  if (results.critical.length > 0) {
    console.log('\n❌ LAUNCH READINESS: NOT READY');
    console.log('   Critical issues must be resolved before launch!');
  } else if (results.high.length > 3) {
    console.log('\n⚠️  LAUNCH READINESS: RISKY');
    console.log('   High priority issues should be addressed.');
  } else {
    console.log('\n✅ LAUNCH READINESS: READY');
    console.log('   Site meets minimum requirements for launch.');
  }

  return results;
}

function generateMarkdownReport(results) {
  return `# 🚀 LAUNCH DAY PERFORMANCE & MAINTENANCE AUDIT

**Generated**: ${new Date().toLocaleString()}
**Site**: Disaster Recovery Brisbane (disasterrecovery.com.au)
**Status**: ${results.critical.length > 0 ? '❌ NOT READY FOR LAUNCH' : '✅ READY FOR LAUNCH'}

---

## 📊 EXECUTIVE SUMMARY

- **Critical Issues**: ${results.critical.length}
- **High Priority**: ${results.high.length}
- **Medium Priority**: ${results.medium.length}
- **Low Priority**: ${results.low.length}

## 🚨 CRITICAL ISSUES (Must Fix Before Launch)
${results.critical.length > 0 ? results.critical.map((issue, i) => `
### ${i + 1}. ${issue.type}: ${issue.issue}
- **Impact**: ${issue.impact}
- **Fix**: ${issue.fix}
`).join('\n') : '✅ No critical issues found'}

## ⚠️ HIGH PRIORITY ISSUES
${results.high.length > 0 ? results.high.map((issue, i) => `
### ${i + 1}. ${issue.type}: ${issue.issue}
- **Device**: ${issue.device || 'All'}
- **Impact**: ${issue.impact}
- **Fix**: ${issue.fix}
`).join('\n') : '✅ No high priority issues found'}

## 📈 PERFORMANCE METRICS

### Desktop Performance
${Object.entries(results.metrics.performance.Desktop || {}).map(([key, value]) => `- **${key}**: ${value}`).join('\n')}

### Mobile Performance
${Object.entries(results.metrics.performance.Mobile || {}).map(([key, value]) => `- **${key}**: ${value}`).join('\n')}

## 🎯 RECOMMENDATIONS

${results.recommendations.join('\n')}

## ✅ IMMEDIATE ACTION ITEMS

1. **Performance Optimization**
   - [ ] Optimize hero images (convert to WebP, reduce size)
   - [ ] Implement lazy loading for all images
   - [ ] Enable code splitting for routes
   - [ ] Configure CDN for static assets

2. **Security**
   - [ ] Configure SSL certificate
   - [ ] Verify all security headers are present
   - [ ] Test HTTPS redirect

3. **SEO**
   - [ ] Complete all service pages
   - [ ] Add structured data (LocalBusiness, EmergencyService)
   - [ ] Submit sitemap to Google Search Console
   - [ ] Verify meta tags on all pages

4. **Mobile Optimization**
   - [ ] Test and fix mobile layout issues
   - [ ] Implement sticky CTA for mobile
   - [ ] Optimize touch targets

5. **Monitoring**
   - [ ] Set up uptime monitoring
   - [ ] Configure error tracking
   - [ ] Set up performance monitoring

---

## 🏁 LAUNCH CHECKLIST

### Pre-Launch (Critical)
- [ ] SSL Certificate installed and working
- [ ] All critical performance issues resolved
- [ ] Security headers configured
- [ ] Mobile performance optimized
- [ ] Core pages completed

### Launch Day
- [ ] DNS configured correctly
- [ ] Redirects from old site working
- [ ] Google Analytics connected
- [ ] Search Console verified
- [ ] Submit sitemap

### Post-Launch (24 hours)
- [ ] Monitor error logs
- [ ] Check Core Web Vitals
- [ ] Verify all forms working
- [ ] Test emergency contact flow
- [ ] Monitor page load speeds

---

*Report generated by Launch Day Audit Tool*
`;
}

// Run the audit
runLaunchDayAudit().catch(console.error);