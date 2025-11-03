#!/usr/bin/env node

/**
 * Comprehensive Performance Audit for Disaster Recovery Website
 * Measures Core Web Vitals and generates optimization recommendations
 *
 * Metrics measured:
 * - Core Web Vitals (LCP, FID, CLS, INP)
 * - Performance Score
 * - Bundle Size Analysis
 * - Resource Loading Times
 * - Network Waterfall
 */

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

// Configuration
const CONFIG = {
  // URLs to audit
  urls: [
    { url: 'http://localhost:3000/', name: 'Homepage' },
    { url: 'http://localhost:3000/services/water-damage', name: 'Water Damage Service' },
    { url: 'http://localhost:3000/locations/brisbane', name: 'Brisbane Location' },
    { url: 'http://localhost:3000/contact', name: 'Contact Page' },
  ],

  // Lighthouse configuration
  lighthouse: {
    logLevel: 'info',
    output: ['json', 'html'],
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    throttling: {
      // Simulate 4G connection
      rttMs: 150,
      throughputKbps: 1638,
      cpuSlowdownMultiplier: 4,
    },
  },

  // Performance thresholds
  thresholds: {
    performance: 90,
    accessibility: 95,
    bestPractices: 90,
    seo: 95,
    lcp: 2500,
    fid: 100,
    cls: 0.1,
    inp: 200,
    ttfb: 800,
    fcp: 1800,
    si: 3000,
    tti: 3800,
  },

  // Output directory
  outputDir: path.join(process.cwd(), 'performance-reports'),
};

// Colour codes for console output
const colours = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

/**
 * Run Lighthouse audit for a URL
 */
async function runLighthouseAudit(url, chrome) {
  const options = {
    ...CONFIG.lighthouse,
    port: chrome.port,
  };

  const runnerResult = await lighthouse(url, options);

  // Extract key metrics
  const { lhr } = runnerResult;
  const metrics = {
    scores: {
      performance: Math.round(lhr.categories.performance.score * 100),
      accessibility: Math.round(lhr.categories.accessibility.score * 100),
      bestPractices: Math.round(lhr.categories['best-practices'].score * 100),
      seo: Math.round(lhr.categories.seo.score * 100),
    },
    coreWebVitals: {
      lcp: lhr.audits['largest-contentful-paint'].numericValue,
      fid: lhr.audits['max-potential-fid'].numericValue,
      cls: lhr.audits['cumulative-layout-shift'].numericValue,
      ttfb: lhr.audits['server-response-time'].numericValue,
      fcp: lhr.audits['first-contentful-paint'].numericValue,
      si: lhr.audits['speed-index'].numericValue,
      tti: lhr.audits['interactive'].numericValue,
    },
    resourceSummary: {
      totalSize: lhr.audits['total-byte-weight'].numericValue,
      scriptSize: lhr.audits['unminified-javascript']?.numericValue || 0,
      imageSize: lhr.audits['uses-responsive-images']?.numericValue || 0,
      cssSize: lhr.audits['unminified-css']?.numericValue || 0,
      requests: lhr.audits['network-requests'].details?.items?.length || 0,
    },
    opportunities: lhr.audits
      .filter(audit => audit.score !== null && audit.score < 0.9)
      .map(audit => ({
        title: audit.title,
        description: audit.description,
        savings: audit.details?.overallSavingsMs || 0,
      }))
      .filter(opp => opp.savings > 0)
      .sort((a, b) => b.savings - a.savings),
    diagnostics: lhr.audits
      .filter(audit => audit.details?.type === 'diagnostic')
      .map(audit => ({
        title: audit.title,
        value: audit.displayValue,
        score: audit.score,
      })),
  };

  return { lhr, metrics };
}

/**
 * Analyze bundle size
 */
async function analyzeBundleSize() {
  console.log(`\n${colours.yellow}📦 Analyzing bundle size...${colours.reset}`);

  try {
    // Read Next.js build output
    const buildManifestPath = path.join(process.cwd(), '.next', 'build-manifest.json');
    const buildManifest = JSON.parse(await fs.readFile(buildManifestPath, 'utf8'));

    // Calculate bundle sizes
    const bundles = {};
    let totalSize = 0;

    for (const [page, assets] of Object.entries(buildManifest.pages)) {
      const pageSize = await calculateAssetSizes(assets);
      bundles[page] = pageSize;
      totalSize += pageSize;
    }

    return {
      bundles,
      totalSize,
      recommendation: totalSize > 500000
        ? 'Bundle size is large. Consider code splitting and lazy loading.'
        : 'Bundle size is acceptable.',
    };
  } catch (error) {
    console.error(`${colours.red}Error analyzing bundle size:${colours.reset}`, error);
    return null;
  }
}

/**
 * Calculate asset sizes
 */
async function calculateAssetSizes(assets) {
  let totalSize = 0;

  for (const asset of assets) {
    const assetPath = path.join(process.cwd(), '.next', asset);
    try {
      const stats = await fs.stat(assetPath);
      totalSize += stats.size;
    } catch (error) {
      // Asset might not exist
    }
  }

  return totalSize;
}

/**
 * Generate performance recommendations
 */
function generateRecommendations(metrics) {
  const recommendations = [];

  // Core Web Vitals recommendations
  if (metrics.coreWebVitals.lcp > CONFIG.thresholds.lcp) {
    recommendations.push({
      priority: 'HIGH',
      metric: 'LCP',
      issue: `LCP is ${(metrics.coreWebVitals.lcp / 1000).toFixed(2)}s (target: <2.5s)`,
      solutions: [
        'Optimise hero images with WebP/AVIF formats',
        'Implement priority hints for critical resources',
        'Use resource hints (preconnect, dns-prefetch)',
        'Reduce server response times',
        'Implement critical CSS',
      ],
    });
  }

  if (metrics.coreWebVitals.fid > CONFIG.thresholds.fid) {
    recommendations.push({
      priority: 'HIGH',
      metric: 'FID',
      issue: `FID is ${metrics.coreWebVitals.fid.toFixed(0)}ms (target: <100ms)`,
      solutions: [
        'Break up long JavaScript tasks',
        'Use web workers for heavy computations',
        'Implement code splitting',
        'Defer non-critical JavaScript',
        'Optimise third-party scripts',
      ],
    });
  }

  if (metrics.coreWebVitals.cls > CONFIG.thresholds.cls) {
    recommendations.push({
      priority: 'HIGH',
      metric: 'CLS',
      issue: `CLS is ${metrics.coreWebVitals.cls.toFixed(3)} (target: <0.1)`,
      solutions: [
        'Add size attributes to images and videos',
        'Reserve space for dynamic content',
        'Avoid inserting content above existing content',
        'Use CSS transform for animations',
        'Preload fonts with font-display: optional',
      ],
    });
  }

  // Performance score recommendations
  if (metrics.scores.performance < CONFIG.thresholds.performance) {
    recommendations.push({
      priority: 'MEDIUM',
      metric: 'Performance Score',
      issue: `Score is ${metrics.scores.performance} (target: 90+)`,
      solutions: [
        'Implement lazy loading for images',
        'Enable text compression (gzip/brotli)',
        'Remove unused CSS and JavaScript',
        'Optimise critical rendering path',
        'Use efficient cache policies',
      ],
    });
  }

  // Resource optimisation recommendations
  if (metrics.resourceSummary.totalSize > 2000000) {
    recommendations.push({
      priority: 'MEDIUM',
      metric: 'Page Weight',
      issue: `Page weight is ${(metrics.resourceSummary.totalSize / 1024 / 1024).toFixed(2)}MB (target: <2MB)`,
      solutions: [
        'Compress images more aggressively',
        'Implement responsive images',
        'Lazy load below-fold content',
        'Remove duplicate dependencies',
        'Use CDN for static assets',
      ],
    });
  }

  return recommendations;
}

/**
 * Generate HTML report
 */
async function generateHTMLReport(results, timestamp) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Performance Report - Disaster Recovery Website</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 2rem;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      border-radius: 1rem;
      padding: 2rem;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    h1 {
      colour: #2563eb;
      margin-bottom: 1rem;
      font-size: 2.5rem;
    }
    .timestamp {
      colour: #666;
      margin-bottom: 2rem;
    }
    .summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .metric-card {
      padding: 1.5rem;
      border-radius: 0.5rem;
      background: #f3f4f6;
      border-left: 4px solid;
    }
    .metric-card.good { border-colour: #10b981; }
    .metric-card.warning { border-colour: #f59e0b; }
    .metric-card.poor { border-colour: #ef4444; }
    .metric-value {
      font-size: 2rem;
      font-weight: bold;
      margin: 0.5rem 0;
    }
    .metric-label {
      colour: #6b7280;
      font-size: 0.875rem;
      text-transform: uppercase;
    }
    .recommendations {
      margin-top: 2rem;
    }
    .recommendation {
      padding: 1rem;
      margin-bottom: 1rem;
      border-left: 4px solid #2563eb;
      background: #eff6ff;
      border-radius: 0.25rem;
    }
    .priority {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
    .priority.HIGH { background: #fee2e2; colour: #dc2626; }
    .priority.MEDIUM { background: #fed7aa; colour: #ea580c; }
    .priority.LOW { background: #dbeafe; colour: #2563eb; }
    ul {
      margin-top: 0.5rem;
      margin-left: 1.5rem;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
    }
    th, td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #e5e7eb;
    }
    th {
      background: #f9fafb;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🚀 Performance Audit Report</h1>
    <div class="timestamp">Generated: ${timestamp}</div>

    <h2>📊 Overall Scores</h2>
    <div class="summary">
      ${results.map(result => {
        const perfClass = result.metrics.scores.performance >= 90 ? 'good' :
                         result.metrics.scores.performance >= 50 ? 'warning' : 'poor';
        return `
          <div class="metric-card ${perfClass}">
            <div class="metric-label">${result.name}</div>
            <div class="metric-value">${result.metrics.scores.performance}</div>
            <div style="font-size: 0.875rem; colour: #6b7280;">
              LCP: ${(result.metrics.coreWebVitals.lcp / 1000).toFixed(2)}s<br>
              CLS: ${result.metrics.coreWebVitals.cls.toFixed(3)}
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <h2>🎯 Core Web Vitals</h2>
    <table>
      <thead>
        <tr>
          <th>Page</th>
          <th>LCP</th>
          <th>FID</th>
          <th>CLS</th>
          <th>TTFB</th>
          <th>FCP</th>
        </tr>
      </thead>
      <tbody>
        ${results.map(result => `
          <tr>
            <td>${result.name}</td>
            <td>${(result.metrics.coreWebVitals.lcp / 1000).toFixed(2)}s</td>
            <td>${result.metrics.coreWebVitals.fid.toFixed(0)}ms</td>
            <td>${result.metrics.coreWebVitals.cls.toFixed(3)}</td>
            <td>${result.metrics.coreWebVitals.ttfb.toFixed(0)}ms</td>
            <td>${(result.metrics.coreWebVitals.fcp / 1000).toFixed(2)}s</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <h2>💡 Recommendations</h2>
    <div class="recommendations">
      ${results.flatMap(result =>
        generateRecommendations(result.metrics).map(rec => `
          <div class="recommendation">
            <span class="priority ${rec.priority}">${rec.priority}</span>
            <h3>${rec.metric}: ${rec.issue}</h3>
            <ul>
              ${rec.solutions.map(solution => `<li>${solution}</li>`).join('')}
            </ul>
          </div>
        `)
      ).join('')}
    </div>

    <h2>📈 Opportunities</h2>
    <table>
      <thead>
        <tr>
          <th>Opportunity</th>
          <th>Estimated Savings</th>
        </tr>
      </thead>
      <tbody>
        ${results.flatMap(result =>
          result.metrics.opportunities.slice(0, 5).map(opp => `
            <tr>
              <td>${opp.title}</td>
              <td>${(opp.savings / 1000).toFixed(2)}s</td>
            </tr>
          `)
        ).join('')}
      </tbody>
    </table>

    <h2>🎯 Next Steps</h2>
    <ol style="margin-top: 1rem; margin-left: 1.5rem;">
      <li>Implement image optimisation with WebP/AVIF formats</li>
      <li>Extract and inline critical CSS for above-the-fold content</li>
      <li>Configure code splitting and lazy loading for JavaScript</li>
      <li>Set up Service Worker for advanced caching</li>
      <li>Implement performance monitoring in production</li>
      <li>Set up Lighthouse CI for continuous tracking</li>
    </ol>
  </div>
</body>
</html>
  `;

  return html;
}

/**
 * Main audit function
 */
async function runPerformanceAudit() {
  console.log(`\n${colours.blue}╔════════════════════════════════════════════╗${colours.reset}`);
  console.log(`${colours.blue}║  Performance Audit - Disaster Recovery     ║${colours.reset}`);
  console.log(`${colours.blue}╚════════════════════════════════════════════╝${colours.reset}\n`);

  // Ensure output directory exists
  await fs.mkdir(CONFIG.outputDir, { recursive: true });

  // Launch Chrome
  console.log(`${colours.yellow}🚀 Launching Chrome...${colours.reset}`);
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox'],
  });

  try {
    const results = [];
    const timestamp = new Date().toISOString();

    // Run audits for each URL
    for (const urlConfig of CONFIG.urls) {
      console.log(`\n${colours.yellow}📊 Auditing ${urlConfig.name}...${colours.reset}`);

      const { lhr, metrics } = await runLighthouseAudit(urlConfig.url, chrome);

      results.push({
        name: urlConfig.name,
        url: urlConfig.url,
        metrics,
      });

      // Save individual Lighthouse report
      const reportPath = path.join(
        CONFIG.outputDir,
        `${urlConfig.name.toLowerCase().replace(/\s+/g, '-')}-lighthouse.html`
      );
      await fs.writeFile(reportPath, lhr.report[1], 'utf8');

      // Print summary
      console.log(`  ${colours.green}✓${colours.reset} Performance: ${metrics.scores.performance}`);
      console.log(`  ${colours.green}✓${colours.reset} LCP: ${(metrics.coreWebVitals.lcp / 1000).toFixed(2)}s`);
      console.log(`  ${colours.green}✓${colours.reset} CLS: ${metrics.coreWebVitals.cls.toFixed(3)}`);
    }

    // Analyze bundle size
    const bundleAnalysis = await analyzeBundleSize();

    // Generate combined HTML report
    console.log(`\n${colours.yellow}📝 Generating report...${colours.reset}`);
    const htmlReport = await generateHTMLReport(results, timestamp);
    const reportPath = path.join(CONFIG.outputDir, 'performance-audit.html');
    await fs.writeFile(reportPath, htmlReport, 'utf8');

    // Generate JSON report
    const jsonReport = {
      timestamp,
      results,
      bundleAnalysis,
      summary: {
        averagePerformance: Math.round(
          results.reduce((sum, r) => sum + r.metrics.scores.performance, 0) / results.length
        ),
        averageLCP: results.reduce((sum, r) => sum + r.metrics.coreWebVitals.lcp, 0) / results.length,
        averageCLS: results.reduce((sum, r) => sum + r.metrics.coreWebVitals.cls, 0) / results.length,
      },
    };

    const jsonPath = path.join(CONFIG.outputDir, 'performance-audit.json');
    await fs.writeFile(jsonPath, JSON.stringify(jsonReport, null, 2), 'utf8');

    // Print summary
    console.log(`\n${colours.blue}╔════════════════════════════════════════════╗${colours.reset}`);
    console.log(`${colours.blue}║              Audit Summary                 ║${colours.reset}`);
    console.log(`${colours.blue}╚════════════════════════════════════════════╝${colours.reset}\n`);

    console.log(`${colours.cyan}📊 Average Performance Score: ${jsonReport.summary.averagePerformance}${colours.reset}`);
    console.log(`${colours.cyan}⏱️  Average LCP: ${(jsonReport.summary.averageLCP / 1000).toFixed(2)}s${colours.reset}`);
    console.log(`${colours.cyan}📐 Average CLS: ${jsonReport.summary.averageCLS.toFixed(3)}${colours.reset}`);

    if (bundleAnalysis) {
      console.log(`${colours.cyan}📦 Total Bundle Size: ${(bundleAnalysis.totalSize / 1024 / 1024).toFixed(2)}MB${colours.reset}`);
    }

    console.log(`\n${colours.green}✅ Reports saved to: ${CONFIG.outputDir}${colours.reset}`);
    console.log(`${colours.green}📊 Open performance-audit.html to view detailed report${colours.reset}`);

    // Check if targets are met
    const targetsMet = jsonReport.summary.averagePerformance >= 90 &&
                      jsonReport.summary.averageLCP < 2500 &&
                      jsonReport.summary.averageCLS < 0.1;

    if (targetsMet) {
      console.log(`\n${colours.green}${colours.bold}🎉 Congratulations! Performance targets achieved!${colours.reset}`);
    } else {
      console.log(`\n${colours.yellow}⚠️  Performance optimisation needed to meet targets${colours.reset}`);
    }

  } catch (error) {
    console.error(`${colours.red}Error during audit:${colours.reset}`, error);
    throw error;
  } finally {
    await chrome.kill();
  }
}

// Run if called directly
if (require.main === module) {
  runPerformanceAudit()
    .then(() => {
      console.log(`\n${colours.green}✅ Performance audit complete!${colours.reset}\n`);
      process.exit(0);
    })
    .catch((error) => {
      console.error(`\n${colours.red}❌ Audit failed:${colours.reset}`, error);
      process.exit(1);
    });
}

module.exports = { runPerformanceAudit, runLighthouseAudit, generateRecommendations };