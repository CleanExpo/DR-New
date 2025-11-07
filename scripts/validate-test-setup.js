#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('\n===========================================');
console.log('  Test Setup Validation');
console.log('===========================================\n');

const checks = {
  passed: [],
  failed: [],
  warnings: [],
};

function checkFile(filePath, description) {
  const fullPath = path.join(process.cwd(), filePath);
  if (fs.existsSync(fullPath)) {
    checks.passed.push(`✓ ${description}`);
    return true;
  } else {
    checks.failed.push(`✗ ${description} (${filePath})`);
    return false;
  }
}

function checkDirectory(dirPath, description) {
  const fullPath = path.join(process.cwd(), dirPath);
  if (fs.existsSync(fullPath)) {
    const files = fs.readdirSync(fullPath);
    if (files.length > 0) {
      checks.passed.push(`✓ ${description} (${files.length} files)`);
      return true;
    } else {
      checks.warnings.push(`⚠ ${description} is empty`);
      return false;
    }
  } else {
    checks.failed.push(`✗ ${description} (${dirPath})`);
    return false;
  }
}

console.log('Checking test configuration files...\n');

// Check config files
checkFile('playwright.config.ts', 'Playwright configuration');
checkFile('jest.config.js', 'Jest configuration');
checkFile('jest.setup.js', 'Jest setup file');

console.log('\nChecking test directories...\n');

// Check test directories
checkDirectory('__tests__/e2e', 'E2E tests directory');
checkDirectory('__tests__/unit', 'Unit tests directory');
checkDirectory('__tests__/integration', 'Integration tests directory');
checkDirectory('__tests__/performance', 'Performance tests directory');
checkDirectory('__tests__/visual', 'Visual regression tests directory');
checkDirectory('__tests__/accessibility', 'Accessibility tests directory');
checkDirectory('__tests__/security', 'Security tests directory');
checkDirectory('__tests__/smoke', 'Smoke tests directory');

console.log('\nChecking critical test files...\n');

// Check critical test files
checkFile('__tests__/e2e/homepage-critical.spec.ts', 'Homepage critical tests');
checkFile('__tests__/e2e/service-pages-critical.spec.ts', 'Service pages tests');
checkFile('__tests__/e2e/contact-form-flow.spec.ts', 'Contact form tests');
checkFile('__tests__/e2e/navigation-flow.spec.ts', 'Navigation tests');
checkFile('__tests__/e2e/emergency-contact-flow.spec.ts', 'Emergency contact tests');
checkFile('__tests__/performance/core-web-vitals.spec.ts', 'Core Web Vitals tests');
checkFile('__tests__/visual/visual-regression.spec.ts', 'Visual regression tests');
checkFile('__tests__/smoke/quick-smoke-test.spec.ts', 'Smoke tests');

console.log('\nChecking helper files...\n');

// Check helper files
checkFile('__tests__/helpers/test-utils.tsx', 'Test utilities');
checkFile('__tests__/helpers/mock-data.ts', 'Mock data');

console.log('\nChecking scripts...\n');

// Check scripts
checkFile('scripts/run-all-tests.js', 'Comprehensive test runner');
checkFile('scripts/validate-test-setup.js', 'Test validation script');

console.log('\nChecking documentation...\n');

// Check documentation
checkFile('TEST_IMPLEMENTATION_SUMMARY.md', 'Test implementation summary');
checkFile('TEST_QUICK_START.md', 'Test quick start guide');
checkFile('__tests__/README.md', 'Tests README');

console.log('\nChecking package.json scripts...\n');

// Check package.json
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const scripts = packageJson.scripts || {};

  const requiredScripts = [
    'test',
    'test:watch',
    'test:coverage',
    'test:ci',
    'test:e2e',
    'test:e2e:ui',
    'test:e2e:debug',
  ];

  requiredScripts.forEach((script) => {
    if (scripts[script]) {
      checks.passed.push(`✓ npm script: ${script}`);
    } else {
      checks.warnings.push(`⚠ Missing npm script: ${script}`);
    }
  });
} else {
  checks.failed.push('✗ package.json not found');
}

console.log('\nCounting test files...\n');

// Count test files
function countTestFiles(dir) {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) return 0;

  let count = 0;
  const files = fs.readdirSync(fullPath, { withFileTypes: true });

  for (const file of files) {
    const filePath = path.join(fullPath, file.name);
    if (file.isDirectory()) {
      count += countTestFiles(path.relative(process.cwd(), filePath));
    } else if (file.name.endsWith('.spec.ts') || file.name.endsWith('.test.tsx') || file.name.endsWith('.test.ts')) {
      count++;
    }
  }

  return count;
}

const testCounts = {
  e2e: countTestFiles('__tests__/e2e'),
  unit: countTestFiles('__tests__/unit'),
  integration: countTestFiles('__tests__/integration'),
  performance: countTestFiles('__tests__/performance'),
  visual: countTestFiles('__tests__/visual'),
  accessibility: countTestFiles('__tests__/accessibility'),
  security: countTestFiles('__tests__/security'),
  smoke: countTestFiles('__tests__/smoke'),
};

console.log('Test File Counts:');
Object.entries(testCounts).forEach(([type, count]) => {
  console.log(`  ${type.padEnd(15)}: ${count} file(s)`);
});

const totalTests = Object.values(testCounts).reduce((a, b) => a + b, 0);
console.log(`\nTotal Test Files: ${totalTests}`);

// Print summary
console.log('\n===========================================');
console.log('  Validation Summary');
console.log('===========================================\n');

console.log(`✓ Passed:   ${checks.passed.length}`);
checks.passed.forEach((msg) => console.log(`  ${msg}`));

if (checks.warnings.length > 0) {
  console.log(`\n⚠ Warnings: ${checks.warnings.length}`);
  checks.warnings.forEach((msg) => console.log(`  ${msg}`));
}

if (checks.failed.length > 0) {
  console.log(`\n✗ Failed:   ${checks.failed.length}`);
  checks.failed.forEach((msg) => console.log(`  ${msg}`));
}

console.log('\n===========================================');

// Calculate score
const totalChecks = checks.passed.length + checks.failed.length;
const score = ((checks.passed.length / totalChecks) * 100).toFixed(1);

console.log(`\nTest Setup Score: ${score}%`);

if (score >= 90) {
  console.log('\n✅ Test setup is EXCELLENT!\n');
  process.exit(0);
} else if (score >= 75) {
  console.log('\n⚠️  Test setup is GOOD but could be improved.\n');
  process.exit(0);
} else if (checks.failed.length > 0) {
  console.log('\n❌ Test setup has CRITICAL ISSUES!\n');
  console.log('Please fix the failed checks before running tests.\n');
  process.exit(1);
} else {
  console.log('\n⚠️  Test setup is ACCEPTABLE.\n');
  process.exit(0);
}
