#!/usr/bin/env node

/**
 * DESIGN IMPLEMENTATION VERIFICATION SCRIPT
 *
 * Checks that all enhanced design files are properly implemented
 * Run with: node scripts/verify-design-implementation.js
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  bold: '\x1b[1m',
};

const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  section: (msg) => console.log(`\n${colors.bold}${msg}${colors.reset}\n`),
};

// Track results
let checks = { passed: 0, failed: 0, warnings: 0 };

// Helper to check if file exists
function fileExists(filePath) {
  return fs.existsSync(path.join(__dirname, '..', filePath));
}

// Helper to read file content
function readFile(filePath) {
  try {
    return fs.readFileSync(path.join(__dirname, '..', filePath), 'utf8');
  } catch (error) {
    return null;
  }
}

// Verification checks
log.section('🎨 DESIGN SYSTEM VERIFICATION');

// Check 1: Design Token File
log.info('Checking design system files...');
if (fileExists('lib/design-system/tokens.ts')) {
  log.success('Design tokens file exists');
  checks.passed++;
} else {
  log.error('Design tokens file missing: lib/design-system/tokens.ts');
  checks.failed++;
}

// Check 2: Enhanced CSS
if (fileExists('src/styles/design-system-enhanced.css')) {
  log.success('Enhanced design CSS exists');
  checks.passed++;
} else {
  log.error('Enhanced CSS missing: src/styles/design-system-enhanced.css');
  checks.failed++;
}

// Check 3: Component Files
log.section('📦 COMPONENT VERIFICATION');

const componentFiles = [
  { path: 'components/Header-Enhanced.tsx', name: 'Enhanced Header' },
  { path: 'components/Footer-Enhanced.tsx', name: 'Enhanced Footer' },
  { path: 'components/EmergencyCTA-Enhanced.tsx', name: 'Enhanced Emergency CTA' },
  { path: 'components/ui/button-enhanced.tsx', name: 'Enhanced Buttons' },
  { path: 'components/ui/card-enhanced.tsx', name: 'Enhanced Cards' },
];

componentFiles.forEach(({ path: filePath, name }) => {
  if (fileExists(filePath)) {
    log.success(`${name} component exists`);
    checks.passed++;
  } else {
    log.error(`${name} component missing: ${filePath}`);
    checks.failed++;
  }
});

// Check 4: Page Files
log.section('📄 PAGE VERIFICATION');

if (fileExists('app/page-enhanced.tsx')) {
  log.success('Enhanced homepage exists');
  checks.passed++;
} else {
  log.error('Enhanced homepage missing: app/page-enhanced.tsx');
  checks.failed++;
}

if (fileExists('components/templates/ServicePageTemplate.tsx')) {
  log.success('Service page template exists');
  checks.passed++;
} else {
  log.warning('Service page template missing (optional)');
  checks.warnings++;
}

// Check 5: CSS Import
log.section('🎨 CSS CONFIGURATION');

const globalsCSS = readFile('src/styles/globals.css');
if (globalsCSS) {
  if (globalsCSS.includes('design-system-enhanced.css')) {
    log.success('Enhanced CSS is imported in globals.css');
    checks.passed++;
  } else {
    log.warning('Enhanced CSS not imported in globals.css - Add: @import \'./design-system-enhanced.css\';');
    checks.warnings++;
  }
} else {
  log.warning('Could not read src/styles/globals.css');
  checks.warnings++;
}

// Check 6: Active Components
log.section('🔄 ACTIVE COMPONENT CHECK');

const activeComponents = [
  { path: 'components/Header.tsx', enhanced: 'components/Header-Enhanced.tsx', name: 'Header' },
  { path: 'components/Footer.tsx', enhanced: 'components/Footer-Enhanced.tsx', name: 'Footer' },
  { path: 'components/EmergencyCTA.tsx', enhanced: 'components/EmergencyCTA-Enhanced.tsx', name: 'Emergency CTA' },
  { path: 'app/page.tsx', enhanced: 'app/page-enhanced.tsx', name: 'Homepage' },
];

activeComponents.forEach(({ path: activePath, enhanced, name }) => {
  const activeContent = readFile(activePath);
  const enhancedContent = readFile(enhanced);

  if (activeContent && enhancedContent) {
    // Check if they're the same (indicating replacement was done)
    if (activeContent === enhancedContent) {
      log.success(`${name} has been replaced with enhanced version`);
      checks.passed++;
    } else {
      log.warning(`${name} exists but may not be using enhanced version`);
      log.info(`  → To update: cp ${enhanced} ${activePath}`);
      checks.warnings++;
    }
  } else if (enhancedContent && !activeContent) {
    log.warning(`${name} not activated - Enhanced version exists but not in use`);
    log.info(`  → To activate: cp ${enhanced} ${activePath}`);
    checks.warnings++;
  }
});

// Check 7: Package Dependencies
log.section('📦 DEPENDENCIES CHECK');

const packageJSON = readFile('package.json');
if (packageJSON) {
  const pkg = JSON.parse(packageJSON);
  const requiredDeps = [
    'next',
    'react',
    'tailwindcss',
    'lucide-react',
    '@radix-ui/react-slot',
    'class-variance-authority',
  ];

  requiredDeps.forEach((dep) => {
    if (pkg.dependencies?.[dep] || pkg.devDependencies?.[dep]) {
      // log.success(`${dep} is installed`);
      checks.passed++;
    } else {
      log.warning(`${dep} may not be installed`);
      checks.warnings++;
    }
  });
}

// Check 8: Tailwind Configuration
log.section('⚙️  TAILWIND CONFIGURATION');

if (fileExists('tailwind.config.ts') || fileExists('tailwind.config.js')) {
  const configPath = fileExists('tailwind.config.ts') ? 'tailwind.config.ts' : 'tailwind.config.js';
  const tailwindConfig = readFile(configPath);

  if (tailwindConfig && tailwindConfig.includes('primary')) {
    log.success('Tailwind config includes custom colors');
    checks.passed++;
  } else {
    log.warning('Tailwind config may need color updates');
    checks.warnings++;
  }
} else {
  log.error('Tailwind config file not found');
  checks.failed++;
}

// Check 9: Documentation
log.section('📚 DOCUMENTATION CHECK');

const docs = [
  'COMPLETE_UI_UX_REDESIGN.md',
  'QUICK_START_GUIDE.md',
  'DESIGN_TRANSFORMATION_SUMMARY.md',
];

docs.forEach((doc) => {
  if (fileExists(doc)) {
    log.success(`${doc} exists`);
    checks.passed++;
  } else {
    log.warning(`${doc} not found (recommended)`);
    checks.warnings++;
  }
});

// Final Summary
log.section('📊 VERIFICATION SUMMARY');

const total = checks.passed + checks.failed + checks.warnings;
const passRate = total > 0 ? Math.round((checks.passed / total) * 100) : 0;

console.log(`Total Checks: ${total}`);
console.log(`${colors.green}Passed: ${checks.passed}${colors.reset}`);
console.log(`${colors.red}Failed: ${checks.failed}${colors.reset}`);
console.log(`${colors.yellow}Warnings: ${checks.warnings}${colors.reset}`);
console.log(`\nPass Rate: ${passRate}%`);

if (checks.failed === 0 && checks.warnings === 0) {
  log.section(`${colors.green}✓ ALL CHECKS PASSED!${colors.reset}`);
  console.log('Your design system is fully implemented and ready to use! 🎉');
  process.exit(0);
} else if (checks.failed === 0) {
  log.section(`${colors.yellow}⚠ IMPLEMENTATION INCOMPLETE${colors.reset}`);
  console.log('Core files exist but some optional steps remain.');
  console.log('Review warnings above and see QUICK_START_GUIDE.md for next steps.');
  process.exit(0);
} else {
  log.section(`${colors.red}✗ IMPLEMENTATION REQUIRED${colors.reset}`);
  console.log('Some required files are missing.');
  console.log('Follow QUICK_START_GUIDE.md to complete implementation.');
  process.exit(1);
}
