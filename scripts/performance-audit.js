/**
 * Performance Audit Script
 * Runs Lighthouse and analyzes Core Web Vitals
 */

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs').promises;
const path = require('path');

const CONFIG = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    formFactor: 'desktop',
    throttling: {
      rttMs: 40,
      throughputKbps: 10 * 1024,
      cpuSlowdownMultiplier: 1,
    },
    screenEmulation: {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
      disabled: false,
    },
    emulatedUserAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  },
};

const MOBILE_CONFIG = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    formFactor: 'mobile',
    throttling: {
      rttMs: 150,
      throughputKbps: 1.6 * 1024,
      cpuSlowdownMultiplier: 4,
    },
    screenEmulation: {
      mobile: true,
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      disabled: false,
    },
  },
};

async function launchChromeAndRunLighthouse(url, config, flags = {}) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  flags.port = chrome.port;

  const runnerResult = await lighthouse(url, flags, config);

  await chrome.kill();

  return runnerResult;
}

function analyzeResults(lhr) {
  const metrics = lhr.audits.metrics.details.items[0];

  return {
    performance: Math.round(lhr.categories.performance.score * 100),
    accessibility: Math.round(lhr.categories.accessibility.score * 100),
    bestPractices: Math.round(lhr.categories['best-practices'].score * 100),
    seo: Math.round(lhr.categories.seo.score * 100),
    metrics: {
      FCP: Math.round(metrics.firstContentfulPaint),
      LCP: Math.round(metrics.largestContentfulPaint),
      TBT: Math.round(metrics.totalBlockingTime),
      CLS: Math.round(metrics.cumulativeLayoutShift * 1000) / 1000,
      SI: Math.round(metrics.speedIndex),
      TTI: Math.round(metrics.interactive),
    },
    opportunities: lhr.audits['opportunities'] || [],
    diagnostics: {
      unusedCss: lhr.audits['unused-css-rules']?.details?.overallSavingsBytes || 0,
      unusedJs: lhr.audits['unused-javascript']?.details?.overallSavingsBytes || 0,
      renderBlocking: lhr.audits['render-blocking-resources']?.details?.items?.length || 0,
      imageOptimization: lhr.audits['uses-optimized-images']?.details?.overallSavingsBytes || 0,
      textCompression: lhr.audits['uses-text-compression']?.details?.overallSavingsBytes || 0,
    },
  };
}

function getRating(metric, value) {
  const thresholds = {
    FCP: { good: 1800, poor: 3000 },
    LCP: { good: 2500, poor: 4000 },
    TBT: { good: 200, poor: 600 },
    CLS: { good: 0.1, poor: 0.25 },
    SI: { good: 3400, poor: 5800 },
    TTI: { good: 3800, poor: 7300 },
  };

  const threshold = thresholds[metric];
  if (!threshold) return 'unknown';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

function getEmoji(rating) {
  if (rating === 'good') return '✅';
  if (rating === 'needs-improvement') return '⚠️';
  return '❌';
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function printResults(results, device) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📊 ${device} Performance Audit Results`);
  console.log(`${'='.repeat(60)}\n`);

  console.log('📈 Lighthouse Scores:');
  console.log(`   Performance: ${results.performance}/100 ${results.performance >= 90 ? '✅' : results.performance >= 50 ? '⚠️' : '❌'}`);
  console.log(`   Accessibility: ${results.accessibility}/100 ${results.accessibility >= 90 ? '✅' : '⚠️'}`);
  console.log(`   Best Practices: ${results.bestPractices}/100 ${results.bestPractices >= 90 ? '✅' : '⚠️'}`);
  console.log(`   SEO: ${results.seo}/100 ${results.seo >= 90 ? '✅' : '⚠️'}`);

  console.log('\n⚡ Core Web Vitals:');
  Object.entries(results.metrics).forEach(([metric, value]) => {
    const rating = getRating(metric, value);
    const emoji = getEmoji(rating);
    const unit = metric === 'CLS' ? '' : 'ms';
    console.log(`   ${emoji} ${metric}: ${value}${unit} (${rating})`);
  });

  console.log('\n🔍 Diagnostics:');
  console.log(`   Unused CSS: ${formatBytes(results.diagnostics.unusedCss)}`);
  console.log(`   Unused JavaScript: ${formatBytes(results.diagnostics.unusedJs)}`);
  console.log(`   Render Blocking Resources: ${results.diagnostics.renderBlocking}`);
  console.log(`   Image Optimization Potential: ${formatBytes(results.diagnostics.imageOptimization)}`);
  console.log(`   Text Compression Potential: ${formatBytes(results.diagnostics.textCompression)}`);

  console.log(`\n${'='.repeat(60)}\n`);
}

async function runAudit(url) {
  console.log(`🚀 Starting performance audit for: ${url}\n`);

  try {
    // Desktop audit
    console.log('🖥️  Running desktop audit...');
    const desktopResult = await launchChromeAndRunLighthouse(url, CONFIG);
    const desktopAnalysis = analyzeResults(desktopResult.lhr);
    printResults(desktopAnalysis, 'Desktop');

    // Mobile audit
    console.log('📱 Running mobile audit...');
    const mobileResult = await launchChromeAndRunLighthouse(url, MOBILE_CONFIG);
    const mobileAnalysis = analyzeResults(mobileResult.lhr);
    printResults(mobileAnalysis, 'Mobile');

    // Save detailed reports
    const reportsDir = path.join(__dirname, '..', 'performance-reports');
    await fs.mkdir(reportsDir, { recursive: true });

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    await fs.writeFile(
      path.join(reportsDir, `desktop-${timestamp}.html`),
      desktopResult.report
    );

    await fs.writeFile(
      path.join(reportsDir, `mobile-${timestamp}.html`),
      mobileResult.report
    );

    await fs.writeFile(
      path.join(reportsDir, `summary-${timestamp}.json`),
      JSON.stringify(
        {
          timestamp: new Date().toISOString(),
          url,
          desktop: desktopAnalysis,
          mobile: mobileAnalysis,
        },
        null,
        2
      )
    );

    console.log(`📄 Detailed reports saved to: ${reportsDir}\n`);

    // Summary
    const allGood =
      desktopAnalysis.performance >= 90 &&
      mobileAnalysis.performance >= 90 &&
      desktopAnalysis.metrics.LCP <= 2500 &&
      mobileAnalysis.metrics.LCP <= 2500 &&
      desktopAnalysis.metrics.CLS <= 0.1 &&
      mobileAnalysis.metrics.CLS <= 0.1;

    if (allGood) {
      console.log('🎉 Congratulations! Your site has excellent Core Web Vitals!\n');
      process.exit(0);
    } else {
      console.log('⚠️  There are opportunities for improvement.\n');
      console.log('Key recommendations:');

      if (desktopAnalysis.diagnostics.unusedCss > 50000 || mobileAnalysis.diagnostics.unusedCss > 50000) {
        console.log('  • Remove unused CSS to reduce file size');
      }
      if (desktopAnalysis.diagnostics.unusedJs > 50000 || mobileAnalysis.diagnostics.unusedJs > 50000) {
        console.log('  • Remove unused JavaScript to improve TBT and TTI');
      }
      if (desktopAnalysis.diagnostics.renderBlocking > 0 || mobileAnalysis.diagnostics.renderBlocking > 0) {
        console.log('  • Eliminate render-blocking resources');
      }
      if (desktopAnalysis.diagnostics.imageOptimization > 100000 || mobileAnalysis.diagnostics.imageOptimization > 100000) {
        console.log('  • Optimize images (use WebP/AVIF, proper sizing)');
      }
      if (desktopAnalysis.metrics.LCP > 2500 || mobileAnalysis.metrics.LCP > 2500) {
        console.log('  • Improve LCP by optimizing hero images and above-fold content');
      }
      if (desktopAnalysis.metrics.CLS > 0.1 || mobileAnalysis.metrics.CLS > 0.1) {
        console.log('  • Fix CLS by setting image dimensions and reserving space');
      }

      console.log('');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error running audit:', error);
    process.exit(1);
  }
}

// Run audit
const url = process.argv[2] || 'http://localhost:3000';
runAudit(url);
