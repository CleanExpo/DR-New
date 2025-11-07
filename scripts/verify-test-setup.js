/**
 * Verify Test Setup Script
 * Checks that all test dependencies and configurations are in place
 */

const fs = require('fs');
const path = require('path');

const checks = [];

function checkFile(filePath, description) {
  const exists = fs.existsSync(filePath);
  checks.push({
    description,
    status: exists ? '✅' : '❌',
    passed: exists,
  });
  return exists;
}

function checkDirectory(dirPath, description) {
  const exists = fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  checks.push({
    description,
    status: exists ? '✅' : '❌',
    passed: exists,
  });
  return exists;
}

console.log('🔍 Verifying Test Suite Setup...\n');

// Check configuration files
console.log('📋 Configuration Files:');
checkFile('jest.config.js', 'Jest configuration');
checkFile('jest.setup.js', 'Jest setup file');
checkFile('playwright.config.ts', 'Playwright configuration');
checkFile('playwright.config.comprehensive.ts', 'Comprehensive Playwright config');

// Check test directories
console.log('\n📁 Test Directories:');
checkDirectory('__tests__', 'Main test directory');
checkDirectory('__tests__/unit', 'Unit tests directory');
checkDirectory('__tests__/integration', 'Integration tests directory');
checkDirectory('__tests__/e2e', 'E2E tests directory');
checkDirectory('__tests__/visual', 'Visual regression tests directory');
checkDirectory('__tests__/performance', 'Performance tests directory');
checkDirectory('__tests__/accessibility', 'Accessibility tests directory');
checkDirectory('__tests__/seo', 'SEO tests directory');
checkDirectory('__tests__/security', 'Security tests directory');
checkDirectory('__tests__/load', 'Load tests directory');
checkDirectory('__tests__/mobile', 'Mobile tests directory');
checkDirectory('__tests__/contract', 'Contract tests directory');
checkDirectory('__tests__/helpers', 'Test helpers directory');

// Check helper files
console.log('\n🛠️ Helper Files:');
checkFile('__tests__/helpers/test-utils.tsx', 'Test utilities');
checkFile('__tests__/helpers/mock-data.ts', 'Mock data');

// Check documentation
console.log('\n📚 Documentation:');
checkFile('__tests__/README.md', 'Test documentation');
checkFile('TEST_SUITE_SUMMARY.md', 'Test suite summary');

// Check scripts
console.log('\n🚀 Test Scripts:');
checkFile('scripts/run-all-tests.sh', 'Unix test runner');
checkFile('scripts/run-all-tests.bat', 'Windows test runner');

// Count test files
console.log('\n📊 Test Files Count:');
const testDirs = [
  '__tests__/unit',
  '__tests__/integration',
  '__tests__/e2e',
  '__tests__/visual',
  '__tests__/performance',
  '__tests__/accessibility',
  '__tests__/seo',
  '__tests__/security',
  '__tests__/load',
  '__tests__/mobile',
  '__tests__/contract',
];

let totalTestFiles = 0;
testDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    const testFiles = files.filter(f => f.match(/\.(test|spec)\.(ts|tsx|js)$/));
    totalTestFiles += testFiles.length;
    console.log(`  ${dir}: ${testFiles.length} test files`);
  }
});

console.log(`\n  Total: ${totalTestFiles} test files\n`);

// Summary
const passed = checks.filter(c => c.passed).length;
const total = checks.length;
const percentage = ((passed / total) * 100).toFixed(1);

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`\n📈 Setup Status: ${passed}/${total} checks passed (${percentage}%)\n`);

if (passed === total) {
  console.log('✅ Test suite setup is COMPLETE!');
  console.log('\n🎯 Next Steps:');
  console.log('  1. Run: npm test');
  console.log('  2. Run: npm run test:e2e');
  console.log('  3. Run: npm run test:coverage');
  console.log('  4. View coverage: open coverage/index.html\n');
  process.exit(0);
} else {
  console.log('❌ Some setup checks failed. Please review the output above.\n');
  process.exit(1);
}
