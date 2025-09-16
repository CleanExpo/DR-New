/**
 * Performance Testing Script for Disaster Recovery Brisbane
 * Tests Core Web Vitals and custom metrics
 */

const { chromium } = require('playwright');

const TARGET_METRICS = {
  FCP: 1000,     // First Contentful Paint < 1s
  LCP: 2000,     // Largest Contentful Paint < 2s
  TTI: 2500,     // Time to Interactive < 2.5s
  TBT: 50,       // Total Blocking Time < 50ms
  CLS: 0.05,     // Cumulative Layout Shift < 0.05
  FID: 50,       // First Input Delay < 50ms
};

async function testPerformance() {
  console.log('🚀 Starting Performance Tests...\n');

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  });

  const page = await context.newPage();

  // Enable performance metrics collection
  await context.addInitScript(() => {
    window.performanceMetrics = {
      FCP: 0,
      LCP: 0,
      CLS: 0,
      TTI: 0,
      TBT: 0,
      resourceCount: 0,
      totalResourceSize: 0,
      domNodes: 0,
    };

    // Observe FCP
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          window.performanceMetrics.FCP = entry.startTime;
        }
      });
    }).observe({ type: 'paint', buffered: true });

    // Observe LCP
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      window.performanceMetrics.LCP = lastEntry.renderTime || lastEntry.loadTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });

    // Observe CLS
    let clsValue = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          window.performanceMetrics.CLS = clsValue;
        }
      }
    }).observe({ type: 'layout-shift', buffered: true });

    // Track resources
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        window.performanceMetrics.resourceCount++;
        window.performanceMetrics.totalResourceSize += entry.transferSize || 0;
      });
    }).observe({ type: 'resource', buffered: true });
  });

  // Test URLs
  const urls = [
    'http://localhost:3000',
    'http://localhost:3000/services/water-damage-restoration',
    'http://localhost:3000/locations/brisbane',
  ];

  const results = [];

  for (const url of urls) {
    console.log(`Testing: ${url}`);

    // Navigate and wait for load
    const startTime = Date.now();
    await page.goto(url, { waitUntil: 'networkidle' });
    const loadTime = Date.now() - startTime;

    // Wait a bit for all metrics to be collected
    await page.waitForTimeout(2000);

    // Get metrics
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      return {
        ...window.performanceMetrics,
        loadTime: navigation.loadEventEnd - navigation.fetchStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
        TTFB: navigation.responseStart - navigation.fetchStart,
        domNodes: document.querySelectorAll('*').length,
      };
    });

    // Check if emergency button is visible
    const emergencyButtonVisible = await page.isVisible('text=1300 309 361');

    // Get resource timing
    const resources = await page.evaluate(() =>
      performance.getEntriesByType('resource').map((r) => ({
        name: r.name.split('/').pop(),
        duration: r.duration,
        size: r.transferSize,
        type: r.initiatorType,
      }))
    );

    // Calculate scores
    const scores = {
      FCP: metrics.FCP <= TARGET_METRICS.FCP ? '✅' : '❌',
      LCP: metrics.LCP <= TARGET_METRICS.LCP ? '✅' : '❌',
      CLS: metrics.CLS <= TARGET_METRICS.CLS ? '✅' : '❌',
      TTFB: metrics.TTFB <= 800 ? '✅' : '❌',
      LoadTime: loadTime <= 3000 ? '✅' : '❌',
    };

    results.push({
      url,
      metrics,
      scores,
      emergencyButtonVisible,
      topResources: resources
        .sort((a, b) => b.duration - a.duration)
        .slice(0, 5),
    });

    console.log(`  FCP: ${metrics.FCP.toFixed(0)}ms ${scores.FCP}`);
    console.log(`  LCP: ${metrics.LCP.toFixed(0)}ms ${scores.LCP}`);
    console.log(`  CLS: ${metrics.CLS.toFixed(3)} ${scores.CLS}`);
    console.log(`  TTFB: ${metrics.TTFB.toFixed(0)}ms ${scores.TTFB}`);
    console.log(`  Load Time: ${loadTime}ms ${scores.LoadTime}`);
    console.log(`  DOM Nodes: ${metrics.domNodes}`);
    console.log(`  Resources: ${metrics.resourceCount} (${(metrics.totalResourceSize / 1024).toFixed(0)}KB)`);
    console.log(`  Emergency Button: ${emergencyButtonVisible ? '✅ Visible' : '❌ Not Found'}`);
    console.log('');
  }

  // Performance budget checks
  console.log('📊 Performance Budget Analysis:\n');

  const avgMetrics = {
    FCP: results.reduce((sum, r) => sum + r.metrics.FCP, 0) / results.length,
    LCP: results.reduce((sum, r) => sum + r.metrics.LCP, 0) / results.length,
    CLS: results.reduce((sum, r) => sum + r.metrics.CLS, 0) / results.length,
    TTFB: results.reduce((sum, r) => sum + r.metrics.TTFB, 0) / results.length,
  };

  console.log('Average Metrics:');
  console.log(`  FCP: ${avgMetrics.FCP.toFixed(0)}ms (Target: <${TARGET_METRICS.FCP}ms)`);
  console.log(`  LCP: ${avgMetrics.LCP.toFixed(0)}ms (Target: <${TARGET_METRICS.LCP}ms)`);
  console.log(`  CLS: ${avgMetrics.CLS.toFixed(3)} (Target: <${TARGET_METRICS.CLS})`);
  console.log(`  TTFB: ${avgMetrics.TTFB.toFixed(0)}ms (Target: <800ms)`);

  // Overall score
  const passedTests = Object.values(results[0].scores).filter(s => s === '✅').length;
  const totalTests = Object.values(results[0].scores).length;
  const score = Math.round((passedTests / totalTests) * 100);

  console.log(`\n🎯 Performance Score: ${score}/100`);

  if (score >= 95) {
    console.log('✅ EXCELLENT - World-class performance achieved!');
  } else if (score >= 80) {
    console.log('🟡 GOOD - Performance is good but can be improved');
  } else {
    console.log('❌ NEEDS IMPROVEMENT - Performance optimization required');
  }

  // Test mobile performance
  console.log('\n📱 Testing Mobile Performance...\n');

  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
    deviceScaleFactor: 3,
  });

  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  const mobileMetrics = await mobilePage.evaluate(() => {
    const navigation = performance.getEntriesByType('navigation')[0];
    return {
      loadTime: navigation.loadEventEnd - navigation.fetchStart,
      TTFB: navigation.responseStart - navigation.fetchStart,
    };
  });

  console.log(`Mobile Load Time: ${mobileMetrics.loadTime.toFixed(0)}ms`);
  console.log(`Mobile TTFB: ${mobileMetrics.TTFB.toFixed(0)}ms`);

  await mobileContext.close();
  await browser.close();

  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    results,
    averageMetrics: avgMetrics,
    performanceScore: score,
    recommendations: [],
  };

  // Add recommendations
  if (avgMetrics.FCP > TARGET_METRICS.FCP) {
    report.recommendations.push('Optimize First Contentful Paint by reducing render-blocking resources');
  }
  if (avgMetrics.LCP > TARGET_METRICS.LCP) {
    report.recommendations.push('Improve Largest Contentful Paint by optimizing images and server response time');
  }
  if (avgMetrics.CLS > TARGET_METRICS.CLS) {
    report.recommendations.push('Reduce Cumulative Layout Shift by specifying image dimensions and avoiding dynamic content injection');
  }

  // Save report
  require('fs').writeFileSync(
    'performance-report.json',
    JSON.stringify(report, null, 2)
  );

  console.log('\n📄 Full report saved to performance-report.json');

  process.exit(score >= 80 ? 0 : 1);
}

// Run the test
testPerformance().catch((error) => {
  console.error('Performance test failed:', error);
  process.exit(1);
});