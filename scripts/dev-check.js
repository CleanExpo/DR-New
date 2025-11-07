#!/usr/bin/env node

/**
 * Development Health Check Script
 * Validates the development environment is properly configured
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
};

const checks = [];
let passedChecks = 0;
let failedChecks = 0;
let warningChecks = 0;

function addCheck(name, passed, message = '') {
  checks.push({ name, passed, message });

  if (passed === true) {
    passedChecks++;
  } else if (passed === false) {
    failedChecks++;
  } else {
    warningChecks++;
  }
}

function checkFile(filePath, name) {
  const exists = fs.existsSync(path.join(process.cwd(), filePath));
  addCheck(name, exists, exists ? '' : `Missing: ${filePath}`);
  return exists;
}

function checkCommand(command, name) {
  try {
    execSync(command, { stdio: 'ignore' });
    addCheck(name, true);
    return true;
  } catch {
    addCheck(name, false, `Command failed: ${command}`);
    return false;
  }
}

function checkEnvironmentVariable(varName) {
  const exists = !!process.env[varName];
  addCheck(
    `Environment: ${varName}`,
    exists ? true : 'warning',
    exists ? '' : `${varName} not set`
  );
}

function runChecks() {
  console.log('\n' + colors.blue + '='.repeat(60) + colors.reset);
  console.log(colors.blue + 'Development Environment Health Check' + colors.reset);
  console.log(colors.blue + '='.repeat(60) + colors.reset + '\n');

  // File checks
  console.log('Checking configuration files...');
  checkFile('.env', '.env file');
  checkFile('.prettierrc.json', 'Prettier config');
  checkFile('.eslintrc.json', 'ESLint config');
  checkFile('tsconfig.json', 'TypeScript config');
  checkFile('next.config.js', 'Next.js config');
  checkFile('tailwind.config.ts', 'Tailwind config');
  checkFile('.editorconfig', 'EditorConfig');

  // Dependencies
  console.log('\nChecking dependencies...');
  checkCommand('npm list next', 'Next.js installed');
  checkCommand('npm list react', 'React installed');
  checkCommand('npm list typescript', 'TypeScript installed');
  checkCommand('npm list prisma', 'Prisma installed');

  // Environment variables
  console.log('\nChecking environment variables...');
  checkEnvironmentVariable('NEXT_PUBLIC_APP_URL');
  checkEnvironmentVariable('NEXTAUTH_URL');
  checkEnvironmentVariable('DATABASE_URL');

  // Git hooks
  console.log('\nChecking Git hooks...');
  checkFile('.husky/pre-commit', 'Pre-commit hook');
  checkFile('.husky/pre-push', 'Pre-push hook');

  // Build check
  console.log('\nChecking build system...');
  try {
    execSync('npm run type-check', { stdio: 'ignore', timeout: 30000 });
    addCheck('TypeScript compilation', true);
  } catch {
    addCheck('TypeScript compilation', false, 'Type errors found');
  }

  // Print results
  console.log('\n' + colors.blue + '='.repeat(60) + colors.reset);
  console.log('Results:');
  console.log(colors.blue + '='.repeat(60) + colors.reset + '\n');

  checks.forEach(({ name, passed, message }) => {
    const icon = passed === true ? colors.green + '✓' :
                 passed === false ? colors.red + '✗' :
                 colors.yellow + '⚠';
    const status = passed === true ? 'PASS' :
                   passed === false ? 'FAIL' :
                   'WARN';

    console.log(`${icon} ${name.padEnd(35)} [${status}]${colors.reset}`);
    if (message) {
      console.log(`  ${colors.yellow}${message}${colors.reset}`);
    }
  });

  console.log('\n' + colors.blue + '='.repeat(60) + colors.reset);
  console.log(`Total: ${checks.length} checks`);
  console.log(`${colors.green}Passed: ${passedChecks}${colors.reset}`);
  if (warningChecks > 0) {
    console.log(`${colors.yellow}Warnings: ${warningChecks}${colors.reset}`);
  }
  if (failedChecks > 0) {
    console.log(`${colors.red}Failed: ${failedChecks}${colors.reset}`);
  }
  console.log(colors.blue + '='.repeat(60) + colors.reset + '\n');

  if (failedChecks > 0) {
    console.log(colors.red + 'Some checks failed. Please fix the issues above.' + colors.reset);
    console.log('Run: npm run setup\n');
    process.exit(1);
  } else if (warningChecks > 0) {
    console.log(colors.yellow + 'Environment is functional but has some warnings.' + colors.reset + '\n');
  } else {
    console.log(colors.green + 'All checks passed! Environment is ready.' + colors.reset + '\n');
  }
}

runChecks();
