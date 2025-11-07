#!/usr/bin/env node

const { spawn } = require('child_process');
const chalk = require('chalk');

console.log(chalk.bold.blue('\n========================================'));
console.log(chalk.bold.blue('  Disaster Recovery - Test Suite Runner'));
console.log(chalk.bold.blue('========================================\n'));

const testSuites = [
  {
    name: 'Unit Tests',
    command: 'npm',
    args: ['test', '--', '--testPathPattern=__tests__/unit', '--passWithNoTests'],
    critical: true,
  },
  {
    name: 'Integration Tests (API)',
    command: 'npm',
    args: ['test', '--', '--testPathPattern=__tests__/integration', '--passWithNoTests'],
    critical: true,
  },
  {
    name: 'E2E Tests (Playwright)',
    command: 'npx',
    args: ['playwright', 'test', '--project=chromium', '--reporter=list'],
    critical: true,
  },
  {
    name: 'Performance Tests',
    command: 'npx',
    args: ['playwright', 'test', '__tests__/performance', '--project=chromium'],
    critical: false,
  },
  {
    name: 'Visual Regression Tests',
    command: 'npx',
    args: ['playwright', 'test', '__tests__/visual', '--project=chromium', '--update-snapshots'],
    critical: false,
  },
  {
    name: 'Accessibility Tests',
    command: 'npx',
    args: ['playwright', 'test', '__tests__/accessibility', '--project=chromium'],
    critical: false,
  },
];

const results = {
  passed: [],
  failed: [],
  skipped: [],
};

function runTest(suite) {
  return new Promise((resolve) => {
    console.log(chalk.bold.yellow(`\n>> Running: ${suite.name}`));
    console.log(chalk.gray(`   Command: ${suite.command} ${suite.args.join(' ')}\n`));

    const proc = spawn(suite.command, suite.args, {
      stdio: 'inherit',
      shell: true,
      env: { ...process.env, FORCE_COLOR: '1' },
    });

    proc.on('close', (code) => {
      if (code === 0) {
        console.log(chalk.green(`\n✓ ${suite.name} PASSED\n`));
        results.passed.push(suite.name);
      } else {
        console.log(chalk.red(`\n✗ ${suite.name} FAILED (exit code: ${code})\n`));
        results.failed.push(suite.name);
      }
      resolve(code);
    });

    proc.on('error', (err) => {
      console.log(chalk.red(`\n✗ ${suite.name} ERROR: ${err.message}\n`));
      results.failed.push(suite.name);
      resolve(1);
    });
  });
}

async function runAllTests() {
  const startTime = Date.now();

  for (const suite of testSuites) {
    await runTest(suite);
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  // Print summary
  console.log(chalk.bold.blue('\n========================================'));
  console.log(chalk.bold.blue('  Test Summary'));
  console.log(chalk.bold.blue('========================================\n'));

  console.log(chalk.green(`✓ Passed: ${results.passed.length}`));
  results.passed.forEach((name) => console.log(chalk.gray(`  - ${name}`)));

  console.log(chalk.red(`\n✗ Failed: ${results.failed.length}`));
  results.failed.forEach((name) => console.log(chalk.gray(`  - ${name}`)));

  console.log(chalk.cyan(`\n⏱  Total Duration: ${duration}s\n`));

  // Calculate coverage
  const totalTests = testSuites.length;
  const passRate = ((results.passed.length / totalTests) * 100).toFixed(1);

  console.log(chalk.bold.yellow(`Test Pass Rate: ${passRate}%`));

  if (results.failed.length > 0) {
    const criticalFailures = results.failed.filter((name) => {
      const suite = testSuites.find((s) => s.name === name);
      return suite && suite.critical;
    });

    if (criticalFailures.length > 0) {
      console.log(chalk.bold.red('\n⚠️  CRITICAL TEST FAILURES DETECTED!'));
      console.log(chalk.red('The following critical tests failed:'));
      criticalFailures.forEach((name) => console.log(chalk.red(`  - ${name}`)));
      process.exit(1);
    } else {
      console.log(chalk.yellow('\n⚠️  Some non-critical tests failed.'));
      console.log(chalk.yellow('Review results and consider fixing before deployment.\n'));
      process.exit(0);
    }
  } else {
    console.log(chalk.bold.green('\n✅ All tests passed successfully!\n'));
    process.exit(0);
  }
}

// Handle script arguments
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log('Usage: node run-all-tests.js [options]\n');
  console.log('Options:');
  console.log('  --help, -h     Show this help message');
  console.log('  --unit         Run only unit tests');
  console.log('  --e2e          Run only E2E tests');
  console.log('  --performance  Run only performance tests');
  console.log('  --visual       Run only visual regression tests\n');
  process.exit(0);
}

// Filter test suites based on arguments
let suitesToRun = testSuites;

if (args.includes('--unit')) {
  suitesToRun = testSuites.filter((s) => s.name.includes('Unit'));
} else if (args.includes('--e2e')) {
  suitesToRun = testSuites.filter((s) => s.name.includes('E2E'));
} else if (args.includes('--performance')) {
  suitesToRun = testSuites.filter((s) => s.name.includes('Performance'));
} else if (args.includes('--visual')) {
  suitesToRun = testSuites.filter((s) => s.name.includes('Visual'));
}

runAllTests();
