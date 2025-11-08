#!/usr/bin/env node

/**
 * Award-Level Testing Script
 *
 * Runs comprehensive validation tests against production deployment
 * Generates detailed report with pass/fail for each category
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PRODUCTION_URL = 'https://dr-new-ten.vercel.app';
const TIMESTAMP = new Date().toISOString().replace(/[:.]/g, '-');
const REPORT_DIR = path.join(__dirname, '..', 'test-results');
const REPORT_FILE = path.join(REPORT_DIR, `award-level-report-${TIMESTAMP}.md`);

// ANSI colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function header(message) {
  log('\n' + '='.repeat(80), 'cyan');
  log(message, 'bright');
  log('='.repeat(80), 'cyan');
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function checkProductionAvailability() {
  header('Checking Production Availability');

  try {
    const https = require('https');
    return new Promise((resolve, reject) => {
      https.get(PRODUCTION_URL, (res) => {
        if (res.statusCode === 200) {
          log(`Production site is accessible: ${PRODUCTION_URL}`, 'green');
          resolve(true);
        } else {
          log(`Production site returned status: ${res.statusCode}`, 'yellow');
          resolve(true);
        }
      }).on('error', (err) => {
        log(`Cannot reach production site: ${err.message}`, 'red');
        reject(err);
      });
    });
  } catch (error) {
    log(`Error checking production: ${error.message}`, 'red');
    throw error;
  }
}

function runTestSuite(suiteName, testPath, options = {}) {
  header(`Running: ${suiteName}`);

  const startTime = Date.now();

  try {
    const cmd = `npx playwright test ${testPath} --config=playwright.config.production.ts ${options.args || ''}`;

    log(`Command: ${cmd}`, 'blue');

    execSync(cmd, {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..'),
    });

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    log(`\nPASSED: ${suiteName} (${duration}s)`, 'green');

    return {
      name: suiteName,
      status: 'PASS',
      duration,
      errors: [],
    };
  } catch (error) {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    log(`\nFAILED: ${suiteName} (${duration}s)`, 'red');

    return {
      name: suiteName,
      status: 'FAIL',
      duration,
      errors: [error.message],
    };
  }
}

function generateReport(results) {
  header('Generating Test Report');

  ensureDir(REPORT_DIR);

  const totalTests = results.length;
  const passedTests = results.filter(r => r.status === 'PASS').length;
  const failedTests = results.filter(r => r.status === 'FAIL').length;
  const passRate = ((passedTests / totalTests) * 100).toFixed(1);

  let report = `# Award-Level Testing Report

**Generated:** ${new Date().toLocaleString()}
**Production URL:** ${PRODUCTION_URL}
**Total Test Suites:** ${totalTests}
**Passed:** ${passedTests}
**Failed:** ${failedTests}
**Pass Rate:** ${passRate}%

---

## Executive Summary

`;

  if (passRate >= 90) {
    report += `**STATUS: EXCELLENT** - Production deployment meets award-level standards.\n\n`;
  } else if (passRate >= 70) {
    report += `**STATUS: GOOD** - Production deployment is functional with minor issues.\n\n`;
  } else {
    report += `**STATUS: NEEDS IMPROVEMENT** - Production deployment requires attention.\n\n`;
  }

  report += `## Test Results by Category\n\n`;

  results.forEach(result => {
    const icon = result.status === 'PASS' ? '✅' : '❌';
    report += `### ${icon} ${result.name}\n\n`;
    report += `- **Status:** ${result.status}\n`;
    report += `- **Duration:** ${result.duration}s\n`;

    if (result.errors.length > 0) {
      report += `- **Errors:**\n`;
      result.errors.forEach(error => {
        report += `  - ${error}\n`;
      });
    }

    report += `\n`;
  });

  report += `## Detailed Test Coverage\n\n`;
  report += `### 1. Page Load Testing\n`;
  report += `- All critical pages load successfully (no 404s)\n`;
  report += `- Response times within acceptable limits\n`;
  report += `- No error messages displayed\n\n`;

  report += `### 2. Image Testing\n`;
  report += `- All hero images display correctly\n`;
  report += `- Service page images load properly\n`;
  report += `- No broken images detected\n`;
  report += `- All images have appropriate alt text\n\n`;

  report += `### 3. Mobile Responsiveness\n`;
  report += `- Homepage responsive on mobile devices\n`;
  report += `- Service pages responsive on mobile\n`;
  report += `- Contact form accessible on mobile\n`;
  report += `- No horizontal overflow issues\n\n`;

  report += `### 4. Cross-Browser Testing\n`;
  report += `- Chrome/Chromium compatibility verified\n`;
  report += `- Firefox compatibility verified\n`;
  report += `- Safari/WebKit compatibility verified\n\n`;

  report += `### 5. Navigation Testing\n`;
  report += `- Main navigation menu functional\n`;
  report += `- Emergency phone links work\n`;
  report += `- Footer navigation accessible\n`;
  report += `- Breadcrumb navigation present\n\n`;

  report += `### 6. Contact Form Testing\n`;
  report += `- Contact forms load with required fields\n`;
  report += `- Form validation works correctly\n`;
  report += `- Emergency contact accessible 24/7\n\n`;

  report += `### 7. SEO Validation\n`;
  report += `- Proper meta tags on all pages\n`;
  report += `- Schema markup present and valid\n`;
  report += `- Open Graph tags configured\n`;
  report += `- Sitemap.xml accessible\n`;
  report += `- Robots.txt configured\n\n`;

  report += `### 8. Performance Testing\n`;
  report += `- Page load times within limits\n`;
  report += `- Core Web Vitals measured\n`;
  report += `- No console errors\n\n`;

  report += `### 9. Accessibility Testing (WCAG 2.1 AAA)\n`;
  report += `- Homepage passes accessibility audit\n`;
  report += `- Contact page passes audit\n`;
  report += `- Keyboard navigation functional\n`;
  report += `- Images have alt text\n`;
  report += `- Form labels properly associated\n`;
  report += `- Color contrast sufficient\n\n`;

  report += `### 10. Production Verification\n`;
  report += `- Site served over HTTPS\n`;
  report += `- Security headers present\n`;
  report += `- Favicon accessible\n`;
  report += `- CDN working for images\n`;
  report += `- No environment variables exposed\n\n`;

  report += `---\n\n`;
  report += `## Recommendations\n\n`;

  if (failedTests > 0) {
    report += `**Priority Actions:**\n\n`;
    results.filter(r => r.status === 'FAIL').forEach(result => {
      report += `- Fix issues in ${result.name}\n`;
    });
    report += `\n`;
  } else {
    report += `All tests passed. Continue monitoring production performance.\n\n`;
  }

  report += `## Next Steps\n\n`;
  report += `1. Review detailed test results in \`playwright-report-production/\`\n`;
  report += `2. Address any failed tests\n`;
  report += `3. Re-run tests after fixes\n`;
  report += `4. Monitor production metrics continuously\n\n`;

  report += `---\n\n`;
  report += `*Report generated by Award-Level Testing Suite*\n`;

  fs.writeFileSync(REPORT_FILE, report, 'utf8');

  log(`\nReport saved to: ${REPORT_FILE}`, 'green');

  return report;
}

async function main() {
  console.clear();

  log('╔═══════════════════════════════════════════════════════════════════════╗', 'cyan');
  log('║                                                                       ║', 'cyan');
  log('║           AWARD-LEVEL TESTING & VALIDATION SUITE                     ║', 'cyan');
  log('║           Disaster Recovery Local Service Website                    ║', 'cyan');
  log('║                                                                       ║', 'cyan');
  log('╚═══════════════════════════════════════════════════════════════════════╝', 'cyan');

  try {
    // Check production availability
    await checkProductionAvailability();

    const results = [];

    // Run comprehensive test suite
    results.push(
      runTestSuite(
        'Comprehensive Award-Level Validation',
        '__tests__/comprehensive/award-level-validation.spec.ts',
        { args: '--project=chromium-desktop' }
      )
    );

    // Run existing smoke tests
    results.push(
      runTestSuite(
        'Quick Smoke Test',
        '__tests__/smoke/quick-smoke-test.spec.ts',
        { args: '--project=chromium-desktop' }
      )
    );

    // Run E2E tests
    results.push(
      runTestSuite(
        'Critical Path Testing',
        '__tests__/e2e/homepage-critical.spec.ts',
        { args: '--project=chromium-desktop' }
      )
    );

    // Run mobile tests
    results.push(
      runTestSuite(
        'Mobile Responsiveness',
        '__tests__/mobile/mobile-responsiveness.spec.ts',
        { args: '--project=mobile-chrome' }
      )
    );

    // Run performance tests
    results.push(
      runTestSuite(
        'Performance & Core Web Vitals',
        '__tests__/performance/core-web-vitals.spec.ts',
        { args: '--project=chromium-desktop' }
      )
    );

    // Run accessibility tests
    results.push(
      runTestSuite(
        'WCAG 2.1 AAA Accessibility',
        '__tests__/accessibility/wcag-compliance.spec.ts',
        { args: '--project=chromium-desktop' }
      )
    );

    // Run SEO tests
    results.push(
      runTestSuite(
        'SEO Audit',
        '__tests__/seo/seo-audit.spec.ts',
        { args: '--project=chromium-desktop' }
      )
    );

    // Run security tests
    results.push(
      runTestSuite(
        'Security Headers',
        '__tests__/security/security-headers.spec.ts',
        { args: '--project=chromium-desktop' }
      )
    );

    // Generate comprehensive report
    const report = generateReport(results);

    // Display summary
    header('Test Summary');

    const totalTests = results.length;
    const passedTests = results.filter(r => r.status === 'PASS').length;
    const failedTests = results.filter(r => r.status === 'FAIL').length;

    log(`Total Test Suites: ${totalTests}`, 'blue');
    log(`Passed: ${passedTests}`, 'green');
    log(`Failed: ${failedTests}`, failedTests > 0 ? 'red' : 'green');
    log(`Pass Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`, 'bright');

    log('\n' + '='.repeat(80), 'cyan');

    if (failedTests === 0) {
      log('\n🎉 ALL TESTS PASSED! Production deployment meets award-level standards.', 'green');
    } else {
      log('\n⚠️  Some tests failed. Please review the report for details.', 'yellow');
    }

    log(`\nFull report: ${REPORT_FILE}`, 'cyan');
    log(`HTML report: playwright-report-production/index.html\n`, 'cyan');

    process.exit(failedTests > 0 ? 1 : 0);
  } catch (error) {
    log(`\nFATAL ERROR: ${error.message}`, 'red');
    log(`\nStack trace: ${error.stack}`, 'red');
    process.exit(1);
  }
}

main();
