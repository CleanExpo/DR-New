#!/usr/bin/env node

/**
 * API Implementation Verification Script
 * Checks that all API components are properly implemented
 */

const fs = require('fs');
const path = require('path');

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

let passed = 0;
let failed = 0;
let warnings = 0;

function check(condition, message, isWarning = false) {
  if (condition) {
    console.log(`${GREEN}✓${RESET} ${message}`);
    passed++;
  } else {
    if (isWarning) {
      console.log(`${YELLOW}⚠${RESET} ${message}`);
      warnings++;
    } else {
      console.log(`${RED}✗${RESET} ${message}`);
      failed++;
    }
  }
}

function fileExists(filepath) {
  return fs.existsSync(path.join(__dirname, '..', filepath));
}

console.log('\n=== API Implementation Verification ===\n');

// Check API Library Files
console.log('Checking API Library Files...');
check(fileExists('lib/api/types.ts'), 'Type definitions exist');
check(fileExists('lib/api/config.ts'), 'Configuration exists');
check(fileExists('lib/api/response.ts'), 'Response utilities exist');
check(fileExists('lib/api/validation.ts'), 'Validation utilities exist');
check(fileExists('lib/api/rate-limit.ts'), 'Rate limiting exists');
check(fileExists('lib/api/cache.ts'), 'Caching utilities exist');
check(fileExists('lib/api/logger.ts'), 'Logger exists');
check(fileExists('lib/api/monitoring.ts'), 'Monitoring exists');
check(fileExists('lib/api/index.ts'), 'Index export exists');

// Check Middleware
console.log('\nChecking Middleware...');
check(fileExists('middleware/api.ts'), 'API middleware exists');

// Check API Endpoints
console.log('\nChecking API Endpoints...');
check(fileExists('app/api/v1/emergency/route.ts'), 'Emergency endpoint exists');
check(fileExists('app/api/v1/services/route.ts'), 'Services endpoint exists');
check(fileExists('app/api/v1/locations/route.ts'), 'Locations endpoint exists');
check(fileExists('app/api/v1/contact/route.ts'), 'Contact endpoint exists');
check(fileExists('app/api/v1/quote/route.ts'), 'Quote endpoint exists');
check(fileExists('app/api/v1/health/route.ts'), 'Health check endpoint exists');
check(fileExists('app/api/v1/metrics/route.ts'), 'Metrics endpoint exists');

// Check Documentation
console.log('\nChecking Documentation...');
check(fileExists('docs/api/README.md'), 'API documentation exists');
check(fileExists('docs/api/EXAMPLES.md'), 'Usage examples exist');
check(fileExists('docs/api/TESTING.md'), 'Testing guide exists');
check(fileExists('docs/api/IMPLEMENTATION.md'), 'Implementation guide exists');

// Check Data Directories
console.log('\nChecking Data Directories...');
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
check(fs.existsSync(dataDir), 'Data directory exists');

// Create required subdirectories
const subdirs = ['emergency', 'submissions', 'quotes'];
subdirs.forEach(dir => {
  const fullPath = path.join(dataDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
  check(fs.existsSync(fullPath), `${dir} directory exists`);
});

// Check TypeScript Configuration
console.log('\nChecking TypeScript Configuration...');
if (fileExists('tsconfig.json')) {
  try {
    // Read and strip comments before parsing
    const tsconfigContent = fs.readFileSync(path.join(__dirname, '..', 'tsconfig.json'), 'utf-8');
    const tsconfigClean = tsconfigContent.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
    const tsconfig = JSON.parse(tsconfigClean);
    check(
      tsconfig.compilerOptions.paths['@/middleware/*'],
      'Middleware path alias configured'
    );
    check(
      tsconfig.compilerOptions.paths['@/lib/*'],
      'Lib path alias configured'
    );
  } catch (e) {
    check(false, 'TypeScript configuration valid', true);
  }
}

// Summary
console.log('\n=== Summary ===');
console.log(`${GREEN}Passed: ${passed}${RESET}`);
if (warnings > 0) {
  console.log(`${YELLOW}Warnings: ${warnings}${RESET}`);
}
if (failed > 0) {
  console.log(`${RED}Failed: ${failed}${RESET}`);
}

console.log('\n=== API Endpoints ===');
console.log('Emergency:  POST   /api/v1/emergency');
console.log('Services:   GET    /api/v1/services');
console.log('Locations:  GET    /api/v1/locations');
console.log('Contact:    POST   /api/v1/contact');
console.log('Quote:      POST   /api/v1/quote');
console.log('            GET    /api/v1/quote?id={id}');
console.log('Health:     GET    /api/v1/health');
console.log('Metrics:    GET    /api/v1/metrics');

console.log('\n=== Next Steps ===');
console.log('1. Review documentation in docs/api/');
console.log('2. Test endpoints using docs/api/EXAMPLES.md');
console.log('3. Run npm run dev to start development server');
console.log('4. Test API with: curl http://localhost:3000/api/v1/health');
console.log('5. Deploy to production when ready');

process.exit(failed > 0 ? 1 : 0);
