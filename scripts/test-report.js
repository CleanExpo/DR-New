#!/usr/bin/env node

/**
 * Generate comprehensive test report
 * Combines Jest, Playwright, and Lighthouse results
 */

const fs = require('fs')
const path = require('path')

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
}

function colorize(text, color) {
  return `${COLORS[color]}${text}${COLORS.reset}`
}

function printHeader(title) {
  console.log('\n' + colorize('='.repeat(60), 'cyan'))
  console.log(colorize(`  ${title}`, 'bright'))
  console.log(colorize('='.repeat(60), 'cyan') + '\n')
}

function printSection(title) {
  console.log(colorize(`\n📊 ${title}`, 'blue'))
  console.log(colorize('-'.repeat(60), 'dim'))
}

function getJestResults() {
  const coverageFile = path.join(__dirname, '../coverage/coverage-summary.json')

  if (!fs.existsSync(coverageFile)) {
    return null
  }

  try {
    const coverage = JSON.parse(fs.readFileSync(coverageFile, 'utf8'))
    return coverage.total
  } catch (error) {
    console.error('Error reading Jest coverage:', error.message)
    return null
  }
}

function getPlaywrightResults() {
  const resultsFile = path.join(__dirname, '../test-results/results.json')

  if (!fs.existsSync(resultsFile)) {
    return null
  }

  try {
    const results = JSON.parse(fs.readFileSync(resultsFile, 'utf8'))
    return results
  } catch (error) {
    console.error('Error reading Playwright results:', error.message)
    return null
  }
}

function formatPercentage(value) {
  const percentage = value.toFixed(2)
  const color = value >= 80 ? 'green' : value >= 60 ? 'yellow' : 'red'
  return colorize(`${percentage}%`, color)
}

function formatPassFail(passed, total) {
  const percentage = (passed / total) * 100
  const color = percentage === 100 ? 'green' : percentage >= 80 ? 'yellow' : 'red'
  return colorize(`${passed}/${total}`, color)
}

function printJestReport(results) {
  printSection('Jest Test Coverage')

  if (!results) {
    console.log(colorize('  No coverage data available', 'yellow'))
    return
  }

  console.log(`  Lines:      ${formatPercentage(results.lines.pct)}`)
  console.log(`  Statements: ${formatPercentage(results.statements.pct)}`)
  console.log(`  Functions:  ${formatPercentage(results.functions.pct)}`)
  console.log(`  Branches:   ${formatPercentage(results.branches.pct)}`)

  const allAbove80 =
    results.lines.pct >= 80 &&
    results.statements.pct >= 80 &&
    results.functions.pct >= 80 &&
    results.branches.pct >= 80

  if (allAbove80) {
    console.log(colorize('\n  ✅ All coverage thresholds met (80%)', 'green'))
  } else {
    console.log(colorize('\n  ⚠️  Some coverage thresholds not met', 'yellow'))
  }
}

function printPlaywrightReport(results) {
  printSection('Playwright E2E Tests')

  if (!results) {
    console.log(colorize('  No Playwright results available', 'yellow'))
    return
  }

  const { suites } = results

  if (!suites) {
    console.log(colorize('  No test suites found', 'yellow'))
    return
  }

  let totalTests = 0
  let passedTests = 0
  let failedTests = 0
  let skippedTests = 0

  function countTests(suite) {
    if (suite.specs) {
      suite.specs.forEach((spec) => {
        totalTests++
        if (spec.ok) passedTests++
        else if (spec.tests[0]?.status === 'skipped') skippedTests++
        else failedTests++
      })
    }
    if (suite.suites) {
      suite.suites.forEach(countTests)
    }
  }

  suites.forEach(countTests)

  console.log(`  Total:   ${totalTests}`)
  console.log(`  Passed:  ${colorize(passedTests, 'green')}`)
  console.log(`  Failed:  ${colorize(failedTests, failedTests > 0 ? 'red' : 'green')}`)
  console.log(`  Skipped: ${colorize(skippedTests, 'dim')}`)

  if (failedTests === 0) {
    console.log(colorize('\n  ✅ All E2E tests passed', 'green'))
  } else {
    console.log(colorize('\n  ❌ Some E2E tests failed', 'red'))
  }
}

function printLighthouseReport() {
  printSection('Lighthouse Performance')

  const lhciDir = path.join(__dirname, '../.lighthouseci')

  if (!fs.existsSync(lhciDir)) {
    console.log(colorize('  No Lighthouse data available', 'yellow'))
    return
  }

  console.log(colorize('  Run Lighthouse CI for detailed performance metrics', 'dim'))
  console.log(colorize('  Command: npm run test:lighthouse', 'dim'))
}

function printSummary() {
  printSection('Test Summary')

  const jestResults = getJestResults()
  const playwrightResults = getPlaywrightResults()

  const checks = []

  // Jest coverage
  if (jestResults) {
    const allAbove80 =
      jestResults.lines.pct >= 80 &&
      jestResults.statements.pct >= 80 &&
      jestResults.functions.pct >= 80 &&
      jestResults.branches.pct >= 80

    checks.push({
      name: 'Unit Test Coverage (80%)',
      passed: allAbove80,
    })
  }

  // Display checks
  console.log('')
  checks.forEach((check) => {
    const icon = check.passed ? '✅' : '❌'
    const color = check.passed ? 'green' : 'red'
    console.log(`  ${icon} ${colorize(check.name, color)}`)
  })

  // Overall status
  const allPassed = checks.every((c) => c.passed)

  console.log('')
  if (allPassed) {
    console.log(colorize('  🎉 All tests passed!', 'green'))
  } else {
    console.log(colorize('  ⚠️  Some tests need attention', 'yellow'))
  }
}

function generateReport() {
  printHeader('Comprehensive Test Report')

  const jestResults = getJestResults()
  const playwrightResults = getPlaywrightResults()

  printJestReport(jestResults)
  printPlaywrightReport(playwrightResults)
  printLighthouseReport()
  printSummary()

  console.log('\n' + colorize('='.repeat(60), 'cyan') + '\n')
}

// Run report
generateReport()
