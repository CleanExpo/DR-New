const playwright = require('playwright');
const fs = require('fs');
const path = require('path');

async function runSimpleAudit() {
  const results = {
    timestamp: new Date().toISOString(),
    critical: [],
    high: [],
    medium: [],
    metrics: {}
  };

  console.log('🚀 Starting Performance Audit...\n');

  const browser = await playwright.chromium.launch({ headless: true });

  try {
    // Desktop test
    console.log('Testing Desktop...');
    const desktopContext = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });
    const desktopPage = await desktopContext.newPage();

    const desktopStart = Date.now();
    await desktopPage.goto('http://localhost:3007', {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    const desktopLoadTime = (Date.now() - desktopStart) / 1000;

    // Get page metrics
    const desktopMetrics = await desktopPage.evaluate(() => {
      return {
        title: document.title,
        images: document.querySelectorAll('img').length,
        scripts: document.querySelectorAll('script').length,
        stylesheets: document.querySelectorAll('link[rel="stylesheet"]').length,
        h1: document.querySelectorAll('h1').length
      };
    });

    results.metrics.desktop = {
      loadTime: desktopLoadTime,
      ...desktopMetrics
    };

    await desktopContext.close();

    // Mobile test
    console.log('Testing Mobile...');
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15'
    });
    const mobilePage = await mobileContext.newPage();

    const mobileStart = Date.now();
    await mobilePage.goto('http://localhost:3007', {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    const mobileLoadTime = (Date.now() - mobileStart) / 1000;

    results.metrics.mobile = {
      loadTime: mobileLoadTime
    };

    await mobileContext.close();

    // Analyze results
    if (desktopLoadTime > 3) {
      results.critical.push({
        issue: `Desktop load time: ${desktopLoadTime.toFixed(2)}s (target: <2s)`,
        fix: 'Optimize images, reduce JavaScript, enable caching'
      });
    } else if (desktopLoadTime > 2) {
      results.high.push({
        issue: `Desktop load time: ${desktopLoadTime.toFixed(2)}s (target: <2s)`,
        fix: 'Further optimization needed'
      });
    }

    if (mobileLoadTime > 3) {
      results.critical.push({
        issue: `Mobile load time: ${mobileLoadTime.toFixed(2)}s (target: <2s)`,
        fix: 'Critical mobile optimization needed'
      });
    } else if (mobileLoadTime > 2) {
      results.high.push({
        issue: `Mobile load time: ${mobileLoadTime.toFixed(2)}s (target: <2s)`,
        fix: 'Mobile optimization recommended'
      });
    }

  } catch (error) {
    console.error('Error during audit:', error.message);
    results.critical.push({
      issue: 'Failed to complete audit',
      fix: 'Check if dev server is running on port 3007'
    });
  } finally {
    await browser.close();
  }

  // Generate report
  console.log('\n📊 AUDIT RESULTS:');
  console.log('Desktop Load:', results.metrics.desktop?.loadTime?.toFixed(2) + 's');
  console.log('Mobile Load:', results.metrics.mobile?.loadTime?.toFixed(2) + 's');
  console.log('\nCritical Issues:', results.critical.length);
  console.log('High Priority:', results.high.length);

  return results;
}

runSimpleAudit().catch(console.error);