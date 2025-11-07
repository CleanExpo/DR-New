#!/usr/bin/env node

/**
 * DX Setup Verification Script
 * Verifies that all developer experience optimizations are working correctly
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const RESET = '\x1b[0m';

function log(message, color = RESET) {
  console.log(`${color}${message}${RESET}`);
}

function checkFile(filePath, description) {
  const fullPath = path.join(process.cwd(), filePath);
  const exists = fs.existsSync(fullPath);

  if (exists) {
    log(`✓ ${description}`, GREEN);
    return true;
  } else {
    log(`✗ ${description}`, RED);
    return false;
  }
}

function checkCommand(command, description) {
  try {
    execSync(command, { stdio: 'pipe' });
    log(`✓ ${description}`, GREEN);
    return true;
  } catch (error) {
    log(`✗ ${description}`, RED);
    return false;
  }
}

function checkScript(scriptName, description) {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const exists = packageJson.scripts && packageJson.scripts[scriptName];

    if (exists) {
      log(`✓ ${description}`, GREEN);
      return true;
    } else {
      log(`✗ ${description}`, RED);
      return false;
    }
  } catch (error) {
    log(`✗ ${description}`, RED);
    return false;
  }
}

console.log('\n' + '='.repeat(60));
log('DX Setup Verification', BLUE);
console.log('='.repeat(60) + '\n');

let totalChecks = 0;
let passedChecks = 0;

// Configuration Files
log('\n📄 Configuration Files:', BLUE);
totalChecks++;
if (checkFile('.env.example', 'Environment template exists')) passedChecks++;
totalChecks++;
if (checkFile('.editorconfig', 'EditorConfig exists')) passedChecks++;
totalChecks++;
if (checkFile('.prettierrc.json', 'Prettier config exists')) passedChecks++;
totalChecks++;
if (checkFile('.eslintrc.json', 'ESLint config exists')) passedChecks++;
totalChecks++;
if (checkFile('tsconfig.json', 'TypeScript config exists')) passedChecks++;
totalChecks++;
if (checkFile('.lintstagedrc.js', 'Lint-staged config exists')) passedChecks++;

// Documentation
log('\n📚 Documentation:', BLUE);
totalChecks++;
if (checkFile('DEVELOPER_QUICK_START.md', 'Quick start guide exists')) passedChecks++;
totalChecks++;
if (checkFile('DX_OPTIMIZATION_SUMMARY.md', 'DX summary exists')) passedChecks++;
totalChecks++;
if (checkFile('CLAUDE.md', 'Project guidelines exist')) passedChecks++;

// Git Configuration
log('\n🔧 Git Hooks:', BLUE);
totalChecks++;
if (checkFile('.husky/pre-commit', 'Pre-commit hook exists')) passedChecks++;
totalChecks++;
if (checkFile('.husky/commit-msg', 'Commit-msg hook exists')) passedChecks++;

// VS Code Configuration
log('\n💻 VS Code Setup:', BLUE);
totalChecks++;
if (checkFile('.vscode/settings.json', 'VS Code settings exist')) passedChecks++;
totalChecks++;
if (checkFile('.vscode/extensions.json', 'Extensions config exists')) passedChecks++;
totalChecks++;
if (checkFile('.vscode/launch.json', 'Debug config exists')) passedChecks++;

// CI/CD
log('\n🚀 CI/CD:', BLUE);
totalChecks++;
if (checkFile('.github/workflows/ci.yml', 'CI workflow exists')) passedChecks++;
totalChecks++;
if (checkFile('.github/pull_request_template.md', 'PR template exists')) passedChecks++;

// Essential NPM Scripts
log('\n📦 NPM Scripts:', BLUE);
totalChecks++;
if (checkScript('dev', 'dev script exists')) passedChecks++;
totalChecks++;
if (checkScript('dev:turbo', 'dev:turbo script exists')) passedChecks++;
totalChecks++;
if (checkScript('dev:debug', 'dev:debug script exists')) passedChecks++;
totalChecks++;
if (checkScript('build', 'build script exists')) passedChecks++;
totalChecks++;
if (checkScript('build:analyze', 'build:analyze script exists')) passedChecks++;
totalChecks++;
if (checkScript('lint', 'lint script exists')) passedChecks++;
totalChecks++;
if (checkScript('lint:fix', 'lint:fix script exists')) passedChecks++;
totalChecks++;
if (checkScript('type-check', 'type-check script exists')) passedChecks++;
totalChecks++;
if (checkScript('format', 'format script exists')) passedChecks++;
totalChecks++;
if (checkScript('validate', 'validate script exists')) passedChecks++;
totalChecks++;
if (checkScript('test', 'test script exists')) passedChecks++;
totalChecks++;
if (checkScript('test:e2e', 'test:e2e script exists')) passedChecks++;
totalChecks++;
if (checkScript('clean', 'clean script exists')) passedChecks++;

// Dependencies
log('\n📚 Dependencies:', BLUE);
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  totalChecks++;
  if (packageJson.devDependencies && packageJson.devDependencies.husky) {
    log('✓ Husky installed', GREEN);
    passedChecks++;
  } else {
    log('✗ Husky missing', RED);
  }
  totalChecks++;
  if (packageJson.devDependencies && packageJson.devDependencies['lint-staged']) {
    log('✓ Lint-staged installed', GREEN);
    passedChecks++;
  } else {
    log('✗ Lint-staged missing', RED);
  }
  totalChecks++;
  if (packageJson.devDependencies && packageJson.devDependencies.rimraf) {
    log('✓ Rimraf installed', GREEN);
    passedChecks++;
  } else {
    log('✗ Rimraf missing', RED);
  }
} catch (error) {
  log('✗ Error reading package.json', RED);
}

// Summary
console.log('\n' + '='.repeat(60));
const percentage = Math.round((passedChecks / totalChecks) * 100);
const status = percentage === 100 ? GREEN : percentage >= 80 ? YELLOW : RED;

log(`\nVerification Complete: ${passedChecks}/${totalChecks} checks passed (${percentage}%)`, status);

if (percentage === 100) {
  log('\n🎉 Perfect! All DX optimizations are in place.', GREEN);
  log('👉 Run "npm run dev" to start developing!\n', BLUE);
} else if (percentage >= 80) {
  log('\n⚠️  Most checks passed, but some items need attention.', YELLOW);
  log('Review the failed checks above.\n', YELLOW);
} else {
  log('\n❌ Several DX optimizations are missing.', RED);
  log('Please review the DX_OPTIMIZATION_SUMMARY.md file.\n', RED);
}

console.log('='.repeat(60) + '\n');

process.exit(percentage === 100 ? 0 : 1);
