/**
 * Security headers and configuration validation script
 * Run this to verify security hardening is properly configured
 */

const https = require('https');
const { URL } = require('url');

// Configuration
const TARGET_URL = process.env.TARGET_URL || 'http://localhost:3000';
const EXPECTED_HEADERS = {
  'strict-transport-security': {
    required: true,
    pattern: /max-age=\d+/,
    description: 'HSTS header for HTTPS enforcement'
  },
  'content-security-policy': {
    required: true,
    pattern: /default-src/,
    description: 'CSP header for XSS protection'
  },
  'x-frame-options': {
    required: true,
    pattern: /DENY|SAMEORIGIN/,
    description: 'Clickjacking protection'
  },
  'x-content-type-options': {
    required: true,
    pattern: /nosniff/,
    description: 'MIME type sniffing protection'
  },
  'x-xss-protection': {
    required: true,
    pattern: /1;\s*mode=block/,
    description: 'XSS filter activation'
  },
  'referrer-policy': {
    required: true,
    pattern: /strict-origin|no-referrer/,
    description: 'Referrer information control'
  },
  'permissions-policy': {
    required: true,
    pattern: /camera|microphone/,
    description: 'Feature permissions control'
  }
};

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Security test results
let testResults = {
  passed: 0,
  failed: 0,
  warnings: 0,
  score: 0
};

/**
 * Perform security headers check
 */
async function checkSecurityHeaders(url) {
  console.log(`${colors.cyan}[SECURITY CHECK]${colors.reset} Testing: ${url}\n`);

  try {
    const response = await fetchWithHeaders(url);
    const headers = response.headers;

    console.log(`${colors.blue}[HEADERS CHECK]${colors.reset}`);
    console.log('─'.repeat(60));

    // Check each expected header
    for (const [headerName, config] of Object.entries(EXPECTED_HEADERS)) {
      const headerValue = headers[headerName];

      if (headerValue) {
        if (config.pattern && config.pattern.test(headerValue)) {
          console.log(`${colors.green}✓${colors.reset} ${headerName}: ${headerValue.substring(0, 50)}...`);
          testResults.passed++;
        } else {
          console.log(`${colors.yellow}⚠${colors.reset} ${headerName}: Present but invalid format`);
          console.log(`  Expected pattern: ${config.pattern}`);
          console.log(`  Actual value: ${headerValue}`);
          testResults.warnings++;
        }
      } else {
        console.log(`${colors.red}✗${colors.reset} ${headerName}: Missing`);
        console.log(`  ${config.description}`);
        testResults.failed++;
      }
    }

    // Check for headers that should NOT be present
    console.log(`\n${colors.blue}[SECURITY ISSUES]${colors.reset}`);
    console.log('─'.repeat(60));

    const badHeaders = ['x-powered-by', 'server', 'x-aspnet-version'];
    let issuesFound = false;

    for (const badHeader of badHeaders) {
      if (headers[badHeader]) {
        console.log(`${colors.red}✗${colors.reset} ${badHeader}: Should be removed (reveals server info)`);
        testResults.failed++;
        issuesFound = true;
      }
    }

    if (!issuesFound) {
      console.log(`${colors.green}✓${colors.reset} No server information disclosure headers found`);
      testResults.passed++;
    }

    // SSL/TLS Check (if HTTPS)
    if (url.startsWith('https://')) {
      console.log(`\n${colors.blue}[SSL/TLS CHECK]${colors.reset}`);
      console.log('─'.repeat(60));
      // Note: Full SSL check would require additional tools
      console.log(`${colors.green}✓${colors.reset} HTTPS enabled`);
      testResults.passed++;
    } else if (!url.includes('localhost')) {
      console.log(`\n${colors.blue}[SSL/TLS CHECK]${colors.reset}`);
      console.log('─'.repeat(60));
      console.log(`${colors.red}✗${colors.reset} HTTPS not enabled (required for production)`);
      testResults.failed++;
    }

    // Additional security checks
    console.log(`\n${colors.blue}[ADDITIONAL CHECKS]${colors.reset}`);
    console.log('─'.repeat(60));

    // Check for CORS headers
    if (headers['access-control-allow-origin']) {
      const corsValue = headers['access-control-allow-origin'];
      if (corsValue === '*') {
        console.log(`${colors.yellow}⚠${colors.reset} CORS: Wildcard origin detected (security risk)`);
        testResults.warnings++;
      } else {
        console.log(`${colors.green}✓${colors.reset} CORS: Properly configured`);
        testResults.passed++;
      }
    }

    // Check cache headers for sensitive endpoints
    if (url.includes('/api/')) {
      if (headers['cache-control'] && headers['cache-control'].includes('no-store')) {
        console.log(`${colors.green}✓${colors.reset} API caching: Properly disabled`);
        testResults.passed++;
      } else {
        console.log(`${colors.yellow}⚠${colors.reset} API caching: Should be disabled for sensitive data`);
        testResults.warnings++;
      }
    }

  } catch (error) {
    console.error(`${colors.red}[ERROR]${colors.reset} Failed to fetch headers:`, error.message);
    process.exit(1);
  }
}

/**
 * Fetch URL and return headers
 */
function fetchWithHeaders(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname,
      method: 'HEAD',
      headers: {
        'User-Agent': 'Security-Check/1.0'
      }
    };

    const protocol = urlObj.protocol === 'https:' ? https : require('http');

    const req = protocol.request(options, (res) => {
      resolve({
        statusCode: res.statusCode,
        headers: res.headers
      });
    });

    req.on('error', reject);
    req.end();
  });
}

/**
 * Calculate security score
 */
function calculateScore() {
  const total = testResults.passed + testResults.failed + testResults.warnings;
  if (total === 0) return 0;

  // Weight: passed = 1, warning = 0.5, failed = 0
  const weightedScore = (testResults.passed + (testResults.warnings * 0.5)) / total;
  return Math.round(weightedScore * 100);
}

/**
 * Generate recommendations
 */
function generateRecommendations() {
  const recommendations = [];

  if (testResults.failed > 0) {
    recommendations.push('• Fix all missing security headers immediately');
    recommendations.push('• Review middleware.ts configuration');
  }

  if (testResults.warnings > 0) {
    recommendations.push('• Review and update header configurations for warnings');
    recommendations.push('• Ensure CSP is properly configured for your use case');
  }

  if (!TARGET_URL.startsWith('https://') && !TARGET_URL.includes('localhost')) {
    recommendations.push('• Enable HTTPS with a valid SSL certificate');
    recommendations.push('• Configure HSTS header after enabling HTTPS');
  }

  recommendations.push('• Run regular security audits');
  recommendations.push('• Keep dependencies updated');
  recommendations.push('• Implement security monitoring');

  return recommendations;
}

/**
 * Print summary report
 */
function printSummary() {
  testResults.score = calculateScore();

  console.log(`\n${colors.cyan}${'='.repeat(60)}${colors.reset}`);
  console.log(`${colors.cyan}SECURITY AUDIT SUMMARY${colors.reset}`);
  console.log(`${colors.cyan}${'='.repeat(60)}${colors.reset}\n`);

  console.log(`Target URL: ${TARGET_URL}`);
  console.log(`Date: ${new Date().toISOString()}\n`);

  console.log(`${colors.green}Passed:${colors.reset} ${testResults.passed}`);
  console.log(`${colors.yellow}Warnings:${colors.reset} ${testResults.warnings}`);
  console.log(`${colors.red}Failed:${colors.reset} ${testResults.failed}\n`);

  // Score with color coding
  let scoreColor = colors.red;
  if (testResults.score >= 80) scoreColor = colors.green;
  else if (testResults.score >= 60) scoreColor = colors.yellow;

  console.log(`${scoreColor}SECURITY SCORE: ${testResults.score}/100${colors.reset}\n`);

  // Grade
  let grade = 'F';
  if (testResults.score >= 90) grade = 'A';
  else if (testResults.score >= 80) grade = 'B';
  else if (testResults.score >= 70) grade = 'C';
  else if (testResults.score >= 60) grade = 'D';

  console.log(`Grade: ${scoreColor}${grade}${colors.reset}\n`);

  // Recommendations
  console.log(`${colors.blue}[RECOMMENDATIONS]${colors.reset}`);
  console.log('─'.repeat(60));
  const recommendations = generateRecommendations();
  recommendations.forEach(rec => console.log(rec));

  console.log(`\n${colors.cyan}${'='.repeat(60)}${colors.reset}`);

  // Exit with appropriate code
  if (testResults.failed > 0) {
    console.log(`\n${colors.red}⚠ Security audit failed. Address critical issues before deployment.${colors.reset}`);
    process.exit(1);
  } else if (testResults.score < 80) {
    console.log(`\n${colors.yellow}⚠ Security score below recommended threshold (80).${colors.reset}`);
    process.exit(0);
  } else {
    console.log(`\n${colors.green}✓ Security audit passed successfully!${colors.reset}`);
    process.exit(0);
  }
}

// Main execution
async function main() {
  console.log(`${colors.cyan}${'='.repeat(60)}${colors.reset}`);
  console.log(`${colors.cyan}DR-NEW SECURITY HEADERS VALIDATION${colors.reset}`);
  console.log(`${colors.cyan}${'='.repeat(60)}${colors.reset}\n`);

  // Test main page
  await checkSecurityHeaders(TARGET_URL);

  // Test API endpoint if exists
  if (TARGET_URL.includes('localhost')) {
    await checkSecurityHeaders(`${TARGET_URL}/api/contact`);
  }

  // Print summary
  printSummary();
}

// Run the security check
main().catch(error => {
  console.error(`${colors.red}[FATAL ERROR]${colors.reset}`, error);
  process.exit(1);
});

// Instructions
console.log(`${colors.cyan}[INFO]${colors.reset} To test production: TARGET_URL=https://disasterrecovery.com.au node security-check.js`);
console.log(`${colors.cyan}[INFO]${colors.reset} To test local: node security-check.js\n`);