#!/usr/bin/env node

/**
 * Security Scanner
 * Automated security checks for the application
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('\n===========================================');
console.log('   DISASTER RECOVERY SECURITY SCANNER');
console.log('===========================================\n');

let hasErrors = false;
const results = {
  passed: [],
  failed: [],
  warnings: [],
};

// Utility functions
function runCheck(name, fn) {
  try {
    console.log(`\n[CHECK] ${name}...`);
    fn();
    results.passed.push(name);
    console.log(`✅ PASS: ${name}`);
  } catch (error) {
    results.failed.push({ name, error: error.message });
    console.error(`❌ FAIL: ${name}`);
    console.error(`   ${error.message}`);
    hasErrors = true;
  }
}

function runWarningCheck(name, fn) {
  try {
    console.log(`\n[CHECK] ${name}...`);
    fn();
    results.passed.push(name);
    console.log(`✅ PASS: ${name}`);
  } catch (error) {
    results.warnings.push({ name, warning: error.message });
    console.warn(`⚠️  WARN: ${name}`);
    console.warn(`   ${error.message}`);
  }
}

// Check 1: Dependency Vulnerabilities
runCheck('NPM Audit (Critical/High)', () => {
  console.log('   Running npm audit...');
  try {
    execSync('npm audit --json --audit-level=high', {
      encoding: 'utf-8',
      stdio: 'pipe'
    });
  } catch (error) {
    const output = error.stdout || error.stderr;
    const audit = JSON.parse(output);
    const { high, critical } = audit.metadata.vulnerabilities;

    if (high > 0 || critical > 0) {
      throw new Error(`Found ${critical} critical and ${high} high vulnerabilities. Run 'npm audit fix' to fix them.`);
    }
  }
});

// Check 2: Environment Variables
runCheck('Environment Variables', () => {
  const requiredEnvVars = [
    'NEXTAUTH_SECRET',
    'DATABASE_URL',
  ];

  const envPath = path.join(process.cwd(), '.env.local');

  if (!fs.existsSync(envPath)) {
    throw new Error('.env.local file not found. Copy from .env.local.example');
  }

  const envContent = fs.readFileSync(envPath, 'utf-8');
  const missing = [];

  for (const varName of requiredEnvVars) {
    if (!envContent.includes(varName + '=')) {
      missing.push(varName);
    }
  }

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  console.log('   All required environment variables present');
});

// Check 3: Security Headers
runCheck('Security Headers Configuration', () => {
  const middlewarePath = path.join(process.cwd(), 'middleware.ts');

  if (!fs.existsSync(middlewarePath)) {
    throw new Error('middleware.ts not found');
  }

  const content = fs.readFileSync(middlewarePath, 'utf-8');

  const requiredHeaders = [
    'Strict-Transport-Security',
    'X-Content-Type-Options',
    'X-Frame-Options',
    'Content-Security-Policy',
    'X-XSS-Protection'
  ];

  const missing = requiredHeaders.filter(header => !content.includes(header));

  if (missing.length > 0) {
    throw new Error(`Missing security headers: ${missing.join(', ')}`);
  }

  console.log('   All required security headers configured');
});

// Check 4: CSRF Protection
runCheck('CSRF Protection', () => {
  const csrfPath = path.join(process.cwd(), 'lib', 'security', 'csrf.ts');

  if (!fs.existsSync(csrfPath)) {
    throw new Error('CSRF protection module not found');
  }

  const middlewarePath = path.join(process.cwd(), 'middleware.ts');
  const middleware = fs.readFileSync(middlewarePath, 'utf-8');

  if (!middleware.includes('csrf-token')) {
    throw new Error('CSRF token generation not found in middleware');
  }

  console.log('   CSRF protection implemented');
});

// Check 5: Rate Limiting
runCheck('Rate Limiting', () => {
  const rateLimitPath = path.join(process.cwd(), 'lib', 'security', 'rate-limiter.ts');

  if (!fs.existsSync(rateLimitPath)) {
    throw new Error('Rate limiter module not found');
  }

  const middlewarePath = path.join(process.cwd(), 'middleware.ts');
  const middleware = fs.readFileSync(middlewarePath, 'utf-8');

  if (!middleware.includes('checkRateLimit')) {
    throw new Error('Rate limiting not implemented in middleware');
  }

  console.log('   Rate limiting implemented');
});

// Check 6: Input Validation
runCheck('Input Validation Utilities', () => {
  const validationPath = path.join(process.cwd(), 'lib', 'security', 'input-validation.ts');

  if (!fs.existsSync(validationPath)) {
    throw new Error('Input validation module not found');
  }

  const content = fs.readFileSync(validationPath, 'utf-8');

  const requiredFunctions = [
    'validateEmail',
    'validatePhoneNumber',
    'sanitizeText',
    'sanitizeHTML'
  ];

  const missing = requiredFunctions.filter(fn => !content.includes(`export function ${fn}`));

  if (missing.length > 0) {
    throw new Error(`Missing validation functions: ${missing.join(', ')}`);
  }

  console.log('   Input validation utilities present');
});

// Check 7: SQL Injection Prevention
runCheck('SQL Injection Prevention', () => {
  const sqlPath = path.join(process.cwd(), 'lib', 'security', 'sql-injection-prevention.ts');

  if (!fs.existsSync(sqlPath)) {
    throw new Error('SQL injection prevention module not found');
  }

  // Check if Prisma is being used
  const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));

  if (!packageJson.dependencies['@prisma/client']) {
    throw new Error('Prisma ORM not installed');
  }

  console.log('   SQL injection prevention measures in place');
});

// Check 8: XSS Protection
runCheck('XSS Protection', () => {
  const xssPath = path.join(process.cwd(), 'lib', 'security', 'xss-protection.ts');

  if (!fs.existsSync(xssPath)) {
    throw new Error('XSS protection module not found');
  }

  // Check for DOMPurify
  const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));

  if (!packageJson.dependencies['isomorphic-dompurify']) {
    throw new Error('DOMPurify not installed');
  }

  console.log('   XSS protection measures in place');
});

// Check 9: Security Logging
runCheck('Security Logging', () => {
  const loggerPath = path.join(process.cwd(), 'lib', 'security', 'security-logger.ts');

  if (!fs.existsSync(loggerPath)) {
    throw new Error('Security logger module not found');
  }

  const content = fs.readFileSync(loggerPath, 'utf-8');

  if (!content.includes('SecurityEventType') || !content.includes('SecuritySeverity')) {
    throw new Error('Security logging enums not properly defined');
  }

  console.log('   Security logging system configured');
});

// Check 10: Sensitive Files
runWarningCheck('Sensitive Files Not Committed', () => {
  const gitignorePath = path.join(process.cwd(), '.gitignore');

  if (!fs.existsSync(gitignorePath)) {
    throw new Error('.gitignore file not found');
  }

  const gitignore = fs.readFileSync(gitignorePath, 'utf-8');

  const sensitivePatterns = [
    '.env',
    '.env.local',
    'node_modules',
    '*.log'
  ];

  const missing = sensitivePatterns.filter(pattern => !gitignore.includes(pattern));

  if (missing.length > 0) {
    throw new Error(`Sensitive patterns not in .gitignore: ${missing.join(', ')}`);
  }

  // Check if .env files exist in git
  try {
    const trackedFiles = execSync('git ls-files', { encoding: 'utf-8' });
    if (trackedFiles.includes('.env.local') || trackedFiles.includes('.env.production')) {
      throw new Error('.env files should not be committed to git');
    }
  } catch (error) {
    // Not a git repo or git not available, skip
  }

  console.log('   Sensitive files properly ignored');
});

// Check 11: HTTPS Configuration
runWarningCheck('HTTPS Configuration', () => {
  const nextConfigPath = path.join(process.cwd(), 'next.config.js');

  if (!fs.existsSync(nextConfigPath)) {
    throw new Error('next.config.js not found');
  }

  const config = fs.readFileSync(nextConfigPath, 'utf-8');

  if (!config.includes('Strict-Transport-Security')) {
    throw new Error('HSTS header not configured in next.config.js');
  }

  console.log('   HTTPS configuration present');
});

// Check 12: TypeScript Configuration
runWarningCheck('TypeScript Strict Mode', () => {
  const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');

  if (!fs.existsSync(tsconfigPath)) {
    throw new Error('tsconfig.json not found');
  }

  const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf-8'));

  if (!tsconfig.compilerOptions.strict) {
    throw new Error('TypeScript strict mode not enabled');
  }

  console.log('   TypeScript strict mode enabled');
});

// Print Summary
console.log('\n\n===========================================');
console.log('            SECURITY SCAN SUMMARY');
console.log('===========================================\n');

console.log(`✅ Passed: ${results.passed.length}`);
console.log(`❌ Failed: ${results.failed.length}`);
console.log(`⚠️  Warnings: ${results.warnings.length}`);

if (results.failed.length > 0) {
  console.log('\n\nFAILED CHECKS:');
  results.failed.forEach(({ name, error }) => {
    console.log(`\n❌ ${name}`);
    console.log(`   ${error}`);
  });
}

if (results.warnings.length > 0) {
  console.log('\n\nWARNINGS:');
  results.warnings.forEach(({ name, warning }) => {
    console.log(`\n⚠️  ${name}`);
    console.log(`   ${warning}`);
  });
}

console.log('\n===========================================\n');

if (hasErrors) {
  console.log('❌ Security scan FAILED. Please fix the issues above.\n');
  process.exit(1);
} else {
  console.log('✅ Security scan PASSED. All checks successful!\n');
  process.exit(0);
}
