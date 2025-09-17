const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const { chromeLauncher } = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

async function runAudit() {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'seo', 'best-practices'],
    port: chrome.port
  };

  const runnerResult = await lighthouse('http://localhost:3002', options);

  // Extract key metrics
  const report = runnerResult.report;
  const json = JSON.parse(report);

  console.log('\n=== LIGHTHOUSE AUDIT RESULTS ===\n');
  console.log('Performance Score:', json.categories.performance.score * 100);
  console.log('SEO Score:', json.categories.seo.score * 100);
  console.log('Accessibility Score:', json.categories.accessibility.score * 100);
  console.log('Best Practices Score:', json.categories['best-practices'].score * 100);

  // Check SEO specific audits
  console.log('\n=== SEO AUDIT DETAILS ===\n');
  const seoAudits = json.audits;

  const criticalSeoChecks = [
    'meta-description',
    'document-title',
    'canonical',
    'hreflang',
    'structured-data',
    'crawlable-anchors',
    'image-alt',
    'link-text',
    'robots-txt',
    'http-status-code',
    'viewport',
    'font-size'
  ];

  criticalSeoChecks.forEach(check => {
    if (seoAudits[check]) {
      const audit = seoAudits[check];
      const status = audit.score === 1 ? '✓' : audit.score === 0 ? '✗' : '⚠';
      console.log(`${status} ${audit.title}: ${audit.displayValue || 'N/A'}`);
      if (audit.score < 1 && audit.details && audit.details.items) {
        console.log(`   Issues found: ${audit.details.items.length}`);
      }
    }
  });

  // Core Web Vitals
  console.log('\n=== CORE WEB VITALS ===\n');
  const metrics = [
    { id: 'first-contentful-paint', name: 'FCP' },
    { id: 'largest-contentful-paint', name: 'LCP' },
    { id: 'cumulative-layout-shift', name: 'CLS' },
    { id: 'total-blocking-time', name: 'TBT' }
  ];

  metrics.forEach(metric => {
    if (seoAudits[metric.id]) {
      const audit = seoAudits[metric.id];
      const status = audit.score >= 0.9 ? '✓' : audit.score >= 0.5 ? '⚠' : '✗';
      console.log(`${status} ${metric.name}: ${audit.displayValue || 'N/A'}`);
    }
  });

  // Save full report
  fs.writeFileSync('seo-audit-report.json', report);
  console.log('\n✓ Full report saved to seo-audit-report.json');

  await chrome.kill();
}

runAudit().catch(console.error);