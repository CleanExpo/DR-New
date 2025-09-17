const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

async function runLighthouse(url = 'http://localhost:3003') {
  console.log(`Running Lighthouse audit on ${url}...`);

  // Launch Chrome
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu']
  });

  // Configuration for comprehensive audit
  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port,
    settings: {
      formFactor: 'desktop',
      throttling: {
        rttMs: 40,
        throughputKbps: 10240,
        cpuSlowdownMultiplier: 1,
        requestLatencyMs: 0,
        downloadThroughputKbps: 0,
        uploadThroughputKbps: 0
      },
      screenEmulation: {
        mobile: false,
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
        disabled: false
      }
    }
  };

  try {
    // Run the audit
    const runnerResult = await lighthouse(url, options);

    // The report is the HTML string
    const reportJson = runnerResult.lhr;
    const reportHtml = runnerResult.report;

    // Save the HTML report
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const htmlPath = path.join(__dirname, `lighthouse-report-${timestamp}.html`);
    const jsonPath = path.join(__dirname, `lighthouse-audit-${timestamp}.json`);

    fs.writeFileSync(htmlPath, reportHtml);
    fs.writeFileSync(jsonPath, JSON.stringify(reportJson, null, 2));

    // Extract key metrics
    const categories = reportJson.categories;
    const audits = reportJson.audits;

    const results = {
      timestamp: new Date().toISOString(),
      url: url,
      scores: {
        performance: Math.round(categories.performance.score * 100),
        accessibility: Math.round(categories.accessibility.score * 100),
        bestPractices: Math.round(categories['best-practices'].score * 100),
        seo: Math.round(categories.seo.score * 100)
      },
      metrics: {
        firstContentfulPaint: audits['first-contentful-paint']?.numericValue || 0,
        largestContentfulPaint: audits['largest-contentful-paint']?.numericValue || 0,
        firstMeaningfulPaint: audits['first-meaningful-paint']?.numericValue || 0,
        speedIndex: audits['speed-index']?.numericValue || 0,
        timeToInteractive: audits['interactive']?.numericValue || 0,
        totalBlockingTime: audits['total-blocking-time']?.numericValue || 0,
        cumulativeLayoutShift: audits['cumulative-layout-shift']?.numericValue || 0
      },
      opportunities: extractOpportunities(audits),
      diagnostics: extractDiagnostics(audits),
      accessibility: extractAccessibilityIssues(audits),
      seo: extractSEOIssues(audits)
    };

    console.log('\n=== LIGHTHOUSE AUDIT RESULTS ===');
    console.log(`Performance: ${results.scores.performance}/100`);
    console.log(`Accessibility: ${results.scores.accessibility}/100`);
    console.log(`Best Practices: ${results.scores.bestPractices}/100`);
    console.log(`SEO: ${results.scores.seo}/100`);

    console.log('\n=== CORE WEB VITALS ===');
    console.log(`First Contentful Paint: ${Math.round(results.metrics.firstContentfulPaint)}ms`);
    console.log(`Largest Contentful Paint: ${Math.round(results.metrics.largestContentfulPaint)}ms`);
    console.log(`Time to Interactive: ${Math.round(results.metrics.timeToInteractive)}ms`);
    console.log(`Total Blocking Time: ${Math.round(results.metrics.totalBlockingTime)}ms`);
    console.log(`Cumulative Layout Shift: ${results.metrics.cumulativeLayoutShift.toFixed(3)}`);

    console.log('\n=== TOP OPPORTUNITIES ===');
    results.opportunities.slice(0, 5).forEach(opp => {
      console.log(`- ${opp.title}: ${opp.description} (${opp.savings})`);
    });

    console.log('\n=== SEO ISSUES ===');
    results.seo.slice(0, 5).forEach(issue => {
      console.log(`- ${issue.title}: ${issue.description}`);
    });

    console.log(`\nDetailed reports saved to:`);
    console.log(`HTML: ${htmlPath}`);
    console.log(`JSON: ${jsonPath}`);

    return results;

  } catch (error) {
    console.error('Lighthouse audit failed:', error);
    throw error;
  } finally {
    await chrome.kill();
  }
}

function extractOpportunities(audits) {
  const opportunities = [];

  Object.keys(audits).forEach(auditId => {
    const audit = audits[auditId];
    if (audit.score !== null && audit.score < 1 && audit.numericValue > 0) {
      opportunities.push({
        id: auditId,
        title: audit.title,
        description: audit.description,
        score: audit.score,
        savings: `${Math.round(audit.numericValue)}ms`,
        displayValue: audit.displayValue || ''
      });
    }
  });

  return opportunities.sort((a, b) => (b.numericValue || 0) - (a.numericValue || 0));
}

function extractDiagnostics(audits) {
  const diagnostics = [];
  const diagnosticIds = [
    'uses-responsive-images',
    'efficient-animated-content',
    'unused-css-rules',
    'unused-javascript',
    'modern-image-formats',
    'unminified-css',
    'unminified-javascript',
    'render-blocking-resources'
  ];

  diagnosticIds.forEach(id => {
    const audit = audits[id];
    if (audit && audit.score !== null && audit.score < 1) {
      diagnostics.push({
        id: id,
        title: audit.title,
        description: audit.description,
        score: audit.score,
        displayValue: audit.displayValue || ''
      });
    }
  });

  return diagnostics;
}

function extractAccessibilityIssues(audits) {
  const issues = [];
  const a11yIds = [
    'image-alt',
    'link-name',
    'color-contrast',
    'heading-order',
    'html-has-lang',
    'html-lang-valid',
    'meta-viewport',
    'document-title'
  ];

  a11yIds.forEach(id => {
    const audit = audits[id];
    if (audit && audit.score !== null && audit.score < 1) {
      issues.push({
        id: id,
        title: audit.title,
        description: audit.description,
        score: audit.score
      });
    }
  });

  return issues;
}

function extractSEOIssues(audits) {
  const issues = [];
  const seoIds = [
    'document-title',
    'meta-description',
    'link-text',
    'image-alt',
    'hreflang',
    'canonical',
    'robots-txt',
    'is-crawlable'
  ];

  seoIds.forEach(id => {
    const audit = audits[id];
    if (audit && audit.score !== null && audit.score < 1) {
      issues.push({
        id: id,
        title: audit.title,
        description: audit.description,
        score: audit.score
      });
    }
  });

  return issues;
}

// Run the audit if this script is called directly
if (require.main === module) {
  const url = process.argv[2] || 'http://localhost:3003';
  runLighthouse(url)
    .then(results => {
      console.log('\n=== AUDIT COMPLETED ===');
      process.exit(0);
    })
    .catch(error => {
      console.error('Audit failed:', error);
      process.exit(1);
    });
}

module.exports = { runLighthouse };