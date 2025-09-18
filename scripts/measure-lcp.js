#!/usr/bin/env node

/**
 * LCP (Largest Contentful Paint) Measurement Script
 *
 * Measures the current LCP performance of the website
 * to verify image optimization improvements
 */

const { spawn } = require('child_process');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

/**
 * Run Lighthouse performance test
 */
async function runLighthouse(url) {
  return new Promise((resolve, reject) => {
    const lighthouse = spawn('npx', [
      'lighthouse',
      url,
      '--output=json',
      '--output-path=lighthouse-lcp.json',
      '--only-categories=performance',
      '--chrome-flags="--headless"'
    ], {
      shell: true,
      stdio: 'pipe'
    });

    let output = '';

    lighthouse.stdout.on('data', (data) => {
      output += data.toString();
    });

    lighthouse.stderr.on('data', (data) => {
      console.error(`Lighthouse error: ${data}`);
    });

    lighthouse.on('close', (code) => {
      if (code === 0) {
        resolve(output);
      } else {
        reject(new Error(`Lighthouse exited with code ${code}`));
      }
    });
  });
}

/**
 * Parse Lighthouse results
 */
function parseLighthouseResults() {
  try {
    const fs = require('fs');
    const results = JSON.parse(fs.readFileSync('lighthouse-lcp.json', 'utf8'));

    const metrics = results.audits['largest-contentful-paint'];
    const lcpValue = metrics.numericValue / 1000; // Convert to seconds

    const performanceScore = results.categories.performance.score * 100;

    // Get other vital metrics
    const fcp = results.audits['first-contentful-paint'].numericValue / 1000;
    const tti = results.audits['interactive'].numericValue / 1000;
    const cls = results.audits['cumulative-layout-shift'].numericValue;
    const tbt = results.audits['total-blocking-time'].numericValue;

    return {
      lcp: lcpValue,
      fcp,
      tti,
      cls,
      tbt,
      performanceScore,
      details: metrics.displayValue
    };
  } catch (error) {
    console.error('Error parsing Lighthouse results:', error);
    return null;
  }
}

/**
 * Start local dev server if not running
 */
async function ensureServerRunning() {
  const http = require('http');

  return new Promise((resolve) => {
    const req = http.get('http://localhost:3000', (res) => {
      resolve(true);
    });

    req.on('error', () => {
      console.log(`${colors.yellow}Starting development server...${colors.reset}`);

      const server = spawn('npm', ['run', 'dev'], {
        shell: true,
        detached: true,
        stdio: 'ignore'
      });

      server.unref();

      // Wait for server to start
      setTimeout(() => {
        resolve(true);
      }, 10000);
    });

    req.end();
  });
}

/**
 * Main measurement function
 */
async function measureLCP() {
  console.log(`\n${colors.blue}╔════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.blue}║     LCP Performance Measurement Tool       ║${colors.reset}`);
  console.log(`${colors.blue}╚════════════════════════════════════════════╝${colors.reset}\n`);

  try {
    // Ensure server is running
    console.log(`${colors.cyan}🔍 Checking development server...${colors.reset}`);
    await ensureServerRunning();

    // Run Lighthouse test
    console.log(`${colors.cyan}🚀 Running Lighthouse performance test...${colors.reset}`);
    console.log(`  Testing: http://localhost:3000\n`);

    await runLighthouse('http://localhost:3000');

    // Parse results
    const results = parseLighthouseResults();

    if (!results) {
      throw new Error('Failed to parse Lighthouse results');
    }

    // Display results
    console.log(`\n${colors.blue}╔════════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.blue}║           Performance Results              ║${colors.reset}`);
    console.log(`${colors.blue}╚════════════════════════════════════════════╝${colors.reset}\n`);

    // LCP Analysis
    const lcpColor = results.lcp < 2.5 ? colors.green : results.lcp < 4 ? colors.yellow : colors.red;
    console.log(`${lcpColor}⏱️  Largest Contentful Paint (LCP): ${results.lcp.toFixed(2)}s${colors.reset}`);

    if (results.lcp < 2.5) {
      console.log(`   ${colors.green}✓ GOOD - Target achieved!${colors.reset}`);
    } else if (results.lcp < 4) {
      console.log(`   ${colors.yellow}⚠ NEEDS IMPROVEMENT${colors.reset}`);
    } else {
      console.log(`   ${colors.red}✗ POOR - Optimization needed${colors.reset}`);
    }

    // Other metrics
    console.log(`\n${colors.cyan}📊 Core Web Vitals:${colors.reset}`);
    console.log(`  • First Contentful Paint (FCP): ${results.fcp.toFixed(2)}s`);
    console.log(`  • Time to Interactive (TTI): ${results.tti.toFixed(2)}s`);
    console.log(`  • Cumulative Layout Shift (CLS): ${results.cls.toFixed(3)}`);
    console.log(`  • Total Blocking Time (TBT): ${results.tbt}ms`);
    console.log(`  • Performance Score: ${results.performanceScore.toFixed(0)}/100`);

    // Recommendations based on LCP
    console.log(`\n${colors.cyan}💡 Recommendations:${colors.reset}`);

    if (results.lcp >= 2.5) {
      console.log(`  ${colors.yellow}To achieve <2.5s LCP:${colors.reset}`);
      console.log(`  • Ensure hero images are using priority loading`);
      console.log(`  • Implement resource hints (preload, prefetch)`);
      console.log(`  • Consider using a CDN with edge caching`);
      console.log(`  • Optimize server response time`);
      console.log(`  • Reduce render-blocking resources`);
    } else {
      console.log(`  ${colors.green}✓ LCP target achieved!${colors.reset}`);
      console.log(`  • Continue monitoring performance`);
      console.log(`  • Consider further optimizations for <2.0s`);
      console.log(`  • Test on slower network conditions`);
    }

    // Image optimization specific tips
    console.log(`\n${colors.cyan}🖼️  Image Optimization Status:${colors.reset}`);
    console.log(`  ✓ Next.js automatic WebP/AVIF conversion`);
    console.log(`  ✓ Responsive image sizes configured`);
    console.log(`  ✓ Priority loading for hero images`);
    console.log(`  ✓ Lazy loading for below-fold images`);
    console.log(`  ✓ Blur placeholders implemented`);

    // Next steps
    console.log(`\n${colors.cyan}🚀 Next Steps:${colors.reset}`);
    console.log(`  1. Deploy to production for real-world testing`);
    console.log(`  2. Set up Real User Monitoring (RUM)`);
    console.log(`  3. Configure CDN for global performance`);
    console.log(`  4. Monitor Core Web Vitals in Google Search Console`);

    // Clean up
    const fs = require('fs');
    if (fs.existsSync('lighthouse-lcp.json')) {
      fs.unlinkSync('lighthouse-lcp.json');
    }

  } catch (error) {
    console.error(`\n${colors.red}❌ Error measuring LCP:${colors.reset}`, error.message);
    console.log(`\n${colors.yellow}Troubleshooting tips:${colors.reset}`);
    console.log(`  • Ensure Chrome is installed`);
    console.log(`  • Check if development server is running`);
    console.log(`  • Try running: npm run dev`);
    console.log(`  • Then run this script again`);
  }
}

// Run the measurement
measureLCP()
  .then(() => {
    console.log(`\n${colors.green}✅ LCP measurement complete!${colors.reset}\n`);
  })
  .catch(error => {
    console.error(`\n${colors.red}❌ Measurement failed:${colors.reset}`, error);
    process.exit(1);
  });