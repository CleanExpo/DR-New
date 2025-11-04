#!/usr/bin/env node

/**
 * Deployment Rendering Verification Script
 *
 * This script diagnoses rendering issues on deployed sites by:
 * 1. Fetching the HTML content
 * 2. Checking for Next.js hydration
 * 3. Verifying critical resources load
 * 4. Testing both preview and production URLs
 */

const https = require('https');
const http = require('http');

const URLS_TO_TEST = [
  'https://dr-new-ten.vercel.app',
  'https://disasterrecovery.com.au'
];

const CRITICAL_CHECKS = {
  hasDoctype: /<!\s*DOCTYPE\s+html/i,
  hasHtml: /<html/i,
  hasHead: /<head>/i,
  hasBody: /<body/i,
  hasNextScript: /_next\/static/i,
  hasTitle: /<title>.*?<\/title>/i,
  hasMetaViewport: /<meta\s+name=["']viewport["']/i,
  hasNoIndex: /<meta\s+.*?robots.*?noindex/i,
  hasNextData: /__NEXT_DATA__/i,
  hasReactRoot: /id=["']__next["']/i,
  hasStylesheets: /<link[^>]*rel=["']stylesheet["']/i,
  hasErrorIndicator: /Application error|error occurred/i,
  hasPlaceholder: /This page could not be found|404/i
};

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'identity',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
      timeout: 15000
    };

    protocol.get(url, options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    }).on('error', (err) => {
      reject(err);
    }).on('timeout', () => {
      reject(new Error('Request timeout'));
    });
  });
}

function analyzeHtml(html) {
  const results = {};

  for (const [check, pattern] of Object.entries(CRITICAL_CHECKS)) {
    results[check] = pattern.test(html);
  }

  // Additional analysis
  results.htmlLength = html.length;
  results.hasContent = html.length > 5000; // Minimum expected size
  results.scriptCount = (html.match(/<script/gi) || []).length;
  results.linkCount = (html.match(/<link/gi) || []).length;
  results.imageCount = (html.match(/<img/gi) || []).length;

  // Extract title
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  results.title = titleMatch ? titleMatch[1] : 'NO TITLE FOUND';

  // Check for Next.js app
  results.isNextApp = results.hasNextScript && results.hasNextData;

  // Check for errors
  results.hasErrors = results.hasErrorIndicator || results.hasPlaceholder;

  return results;
}

function generateReport(url, response, analysis) {
  console.log('\n' + '='.repeat(80));
  console.log(`DEPLOYMENT VERIFICATION REPORT: ${url}`);
  console.log('='.repeat(80));

  // HTTP Response
  console.log('\n📡 HTTP Response:');
  console.log(`   Status Code: ${response.statusCode} ${response.statusCode === 200 ? '✓' : '✗'}`);
  console.log(`   Content-Type: ${response.headers['content-type']}`);
  console.log(`   Content-Length: ${response.headers['content-length'] || analysis.htmlLength}`);
  console.log(`   Server: ${response.headers['server'] || 'Unknown'}`);

  // HTML Structure
  console.log('\n🏗️  HTML Structure:');
  console.log(`   Has DOCTYPE: ${analysis.hasDoctype ? '✓' : '✗'}`);
  console.log(`   Has <html>: ${analysis.hasHtml ? '✓' : '✗'}`);
  console.log(`   Has <head>: ${analysis.hasHead ? '✓' : '✗'}`);
  console.log(`   Has <body>: ${analysis.hasBody ? '✓' : '✗'}`);
  console.log(`   HTML Size: ${analysis.htmlLength} bytes ${analysis.hasContent ? '✓' : '✗ (Too small!)'}`);

  // Next.js Detection
  console.log('\n⚛️  Next.js Application:');
  console.log(`   Next.js Scripts: ${analysis.hasNextScript ? '✓' : '✗'}`);
  console.log(`   Next.js Data: ${analysis.hasNextData ? '✓' : '✗'}`);
  console.log(`   React Root: ${analysis.hasReactRoot ? '✓' : '✗'}`);
  console.log(`   Is Next.js App: ${analysis.isNextApp ? '✓ YES' : '✗ NO'}`);

  // Content
  console.log('\n📄 Page Content:');
  console.log(`   Title: "${analysis.title}"`);
  console.log(`   Has Viewport Meta: ${analysis.hasMetaViewport ? '✓' : '✗'}`);
  console.log(`   Stylesheets: ${analysis.linkCount}`);
  console.log(`   Scripts: ${analysis.scriptCount}`);
  console.log(`   Images: ${analysis.imageCount}`);

  // SEO
  console.log('\n🔍 SEO Status:');
  console.log(`   No-Index Present: ${analysis.hasNoIndex ? '⚠️  YES (Site won\'t be indexed!)' : '✓ NO'}`);

  // Errors
  console.log('\n❌ Error Detection:');
  console.log(`   Error Indicators: ${analysis.hasErrors ? '✗ ERRORS FOUND' : '✓ No errors'}`);
  console.log(`   Error Message: ${analysis.hasErrorIndicator ? '✗ YES' : '✓ NO'}`);
  console.log(`   404/Not Found: ${analysis.hasPlaceholder ? '✗ YES' : '✓ NO'}`);

  // Overall Status
  console.log('\n📊 Overall Assessment:');

  const criticalIssues = [];
  const warnings = [];

  if (response.statusCode !== 200) {
    criticalIssues.push(`HTTP ${response.statusCode} - Site not accessible`);
  }
  if (!analysis.isNextApp) {
    criticalIssues.push('Next.js application not detected');
  }
  if (!analysis.hasContent) {
    criticalIssues.push('HTML content too small - possible rendering failure');
  }
  if (analysis.hasErrors) {
    criticalIssues.push('Error indicators found in HTML');
  }
  if (analysis.hasNoIndex) {
    warnings.push('Site has noindex tag - won\'t appear in search engines');
  }
  if (analysis.scriptCount < 3) {
    warnings.push('Very few scripts - may indicate hydration failure');
  }

  if (criticalIssues.length > 0) {
    console.log('   Status: 🔴 CRITICAL ISSUES');
    criticalIssues.forEach(issue => console.log(`      - ${issue}`));
  } else if (warnings.length > 0) {
    console.log('   Status: 🟡 WARNINGS');
    warnings.forEach(warning => console.log(`      - ${warning}`));
  } else {
    console.log('   Status: 🟢 ALL CHECKS PASSED');
  }

  // Recommendations
  if (criticalIssues.length > 0 || warnings.length > 0) {
    console.log('\n💡 Recommendations:');

    if (response.statusCode !== 200) {
      console.log('   1. Check DNS configuration and domain assignment in Vercel');
      console.log('   2. Verify SSL certificate is provisioned');
    }

    if (!analysis.isNextApp) {
      console.log('   1. Check Vercel build logs for errors');
      console.log('   2. Verify next.config.mjs is correct');
      console.log('   3. Test local build with: npm run build');
    }

    if (!analysis.hasContent) {
      console.log('   1. Check if build generated static files');
      console.log('   2. Review server-side rendering configuration');
      console.log('   3. Check browser console for JavaScript errors');
    }

    if (analysis.hasNoIndex) {
      console.log('   1. Remove noindex meta tag for production');
      console.log('   2. Update robots.txt to allow crawling');
      console.log('   3. Verify VERCEL_ENV is set to "production"');
    }
  }

  console.log('\n' + '='.repeat(80) + '\n');
}

async function verifyDeployment(url) {
  try {
    console.log(`\n🔍 Fetching ${url}...`);
    const response = await fetchUrl(url);
    const analysis = analyzeHtml(response.body);
    generateReport(url, response, analysis);

    return {
      url,
      success: response.statusCode === 200 && analysis.isNextApp && !analysis.hasErrors,
      statusCode: response.statusCode,
      analysis
    };
  } catch (error) {
    console.log('\n' + '='.repeat(80));
    console.log(`❌ FAILED TO FETCH: ${url}`);
    console.log('='.repeat(80));
    console.log(`Error: ${error.message}`);
    console.log('='.repeat(80) + '\n');

    return {
      url,
      success: false,
      error: error.message
    };
  }
}

async function main() {
  console.log('🚀 Disaster Recovery - Deployment Rendering Verification');
  console.log('=' .repeat(80));
  console.log('Testing URLs:');
  URLS_TO_TEST.forEach((url, i) => console.log(`  ${i + 1}. ${url}`));

  const results = [];

  for (const url of URLS_TO_TEST) {
    const result = await verifyDeployment(url);
    results.push(result);
  }

  // Summary
  console.log('\n📊 VERIFICATION SUMMARY');
  console.log('='.repeat(80));

  results.forEach((result, i) => {
    const status = result.success ? '🟢 PASSED' : '🔴 FAILED';
    console.log(`${i + 1}. ${result.url}: ${status}`);

    if (!result.success) {
      if (result.error) {
        console.log(`   Error: ${result.error}`);
      } else {
        console.log(`   HTTP ${result.statusCode || 'N/A'}`);
        if (result.analysis && !result.analysis.isNextApp) {
          console.log('   Not detected as Next.js application');
        }
      }
    }
  });

  console.log('='.repeat(80));

  const allPassed = results.every(r => r.success);

  if (allPassed) {
    console.log('\n✅ All deployment checks passed!');
    console.log('   Your site is rendering correctly and ready for production.');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some deployment checks failed.');
    console.log('   Review the reports above and fix issues before deploying to production.');
    process.exit(1);
  }
}

// CLI
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Deployment Rendering Verification Script

Usage:
  node scripts/verify-deployment-rendering.js [url]

Options:
  --help, -h    Show this help message
  [url]         Verify a specific URL (optional)

Examples:
  # Verify both preview and production
  node scripts/verify-deployment-rendering.js

  # Verify specific URL
  node scripts/verify-deployment-rendering.js https://dr-new-ten.vercel.app

This script will:
  - Fetch the deployed page
  - Verify HTML structure
  - Check for Next.js hydration
  - Detect rendering errors
  - Provide actionable recommendations
    `);
    process.exit(0);
  }

  // Custom URL testing
  if (args.length > 0) {
    const customUrl = args[0];
    if (customUrl.startsWith('http')) {
      verifyDeployment(customUrl).then(() => process.exit(0));
    } else {
      console.error('Error: URL must start with http:// or https://');
      process.exit(1);
    }
  } else {
    main();
  }
}

module.exports = {
  verifyDeployment,
  analyzeHtml,
  fetchUrl
};
