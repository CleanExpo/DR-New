#!/usr/bin/env node

/**
 * Bundle Analysis Script
 * Analyzes the Next.js bundle to identify heavy dependencies
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Starting Bundle Analysis...\n');

// Function to get file size in KB
function getFileSizeInKB(filePath) {
  if (!fs.existsSync(filePath)) return 0;
  const stats = fs.statSync(filePath);
  return (stats.size / 1024).toFixed(2);
}

// Function to analyze package.json dependencies
function analyzeDependencies() {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const deps = packageJson.dependencies;

  console.log('📦 Analyzing Dependencies...\n');

  // Heavy dependencies to check
  const heavyDeps = {
    'openai': { estimated: '500KB+', usage: 'AI SDK - Should be server-side only!' },
    'playwright': { estimated: '100KB+', usage: 'Testing - Should not be in production!' },
    'recharts': { estimated: '300KB+', usage: 'Charting library' },
    'framer-motion': { estimated: '150KB+', usage: 'Animation library' },
    'i18next': { estimated: '100KB+', usage: 'Internationalization' },
    'react-i18next': { estimated: '50KB+', usage: 'React i18n bindings' },
    'ai': { estimated: '200KB+', usage: 'Vercel AI SDK' },
    'react-markdown': { estimated: '100KB+', usage: 'Markdown renderer' },
    'react-speech-recognition': { estimated: '50KB+', usage: 'Speech recognition' },
    'critters': { estimated: '50KB+', usage: 'CSS optimization' },
    'axios': { estimated: '50KB+', usage: 'HTTP client - Use native fetch!' },
    '@upstash/redis': { estimated: '50KB+', usage: 'Redis client' },
    'uuid': { estimated: '20KB+', usage: 'UUID generation - Use crypto.randomUUID!' },
    'date-fns': { estimated: '75KB+', usage: 'Date utilities' },
    'react-dropzone': { estimated: '50KB+', usage: 'File upload' },
    'react-hook-form': { estimated: '50KB+', usage: 'Form handling' },
    '@tanstack/react-query': { estimated: '100KB+', usage: 'Data fetching' },
    'swr': { estimated: '50KB+', usage: 'Data fetching - Duplicate of react-query!' },
    'zustand': { estimated: '30KB+', usage: 'State management' }
  };

  const radixPackages = Object.keys(deps).filter(dep => dep.startsWith('@radix-ui/'));

  console.log('⚠️  HEAVY DEPENDENCIES FOUND:\n');

  let totalEstimated = 0;

  Object.keys(heavyDeps).forEach(dep => {
    if (deps[dep]) {
      const info = heavyDeps[dep];
      console.log(`  ❌ ${dep}: ${info.estimated} - ${info.usage}`);
      totalEstimated += parseInt(info.estimated);
    }
  });

  console.log(`\n  📊 Radix UI Components: ${radixPackages.length} packages`);
  console.log(`     Estimated: ${radixPackages.length * 20}KB+ (avg 20KB each)\n`);
  totalEstimated += radixPackages.length * 20;

  console.log(`  💣 Total Estimated Impact: ${totalEstimated}KB+\n`);

  return { heavyDeps, radixPackages, totalEstimated };
}

// Function to check actual imports in the codebase
function checkActualUsage() {
  console.log('🔎 Checking Actual Usage in Codebase...\n');

  const unusedPatterns = [
    { pattern: 'openai', files: [] },
    { pattern: 'playwright', files: [] },
    { pattern: 'recharts', files: [] },
    { pattern: 'i18next', files: [] },
    { pattern: 'react-markdown', files: [] },
    { pattern: 'react-speech-recognition', files: [] },
    { pattern: 'critters', files: [] },
    { pattern: 'axios', files: [] },
    { pattern: '@upstash/redis', files: [] },
    { pattern: 'uuid', files: [] },
    { pattern: 'react-dropzone', files: [] },
    { pattern: 'swr', files: [] }
  ];

  // Check app and components directories
  const checkDirs = ['app', 'components', 'lib'];

  function searchInFile(filePath, pattern) {
    const content = fs.readFileSync(filePath, 'utf8');
    return content.includes(`from '${pattern}'`) ||
           content.includes(`from "${pattern}"`) ||
           content.includes(`require('${pattern}')`) ||
           content.includes(`require("${pattern}")`);
  }

  function searchDirectory(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });

    files.forEach(file => {
      const fullPath = path.join(dir, file.name);

      if (file.isDirectory() && !file.name.startsWith('.')) {
        searchDirectory(fullPath);
      } else if (file.name.endsWith('.ts') || file.name.endsWith('.tsx') || file.name.endsWith('.js') || file.name.endsWith('.jsx')) {
        unusedPatterns.forEach(item => {
          if (searchInFile(fullPath, item.pattern)) {
            item.files.push(fullPath);
          }
        });
      }
    });
  }

  checkDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      searchDirectory(dir);
    }
  });

  console.log('📋 Usage Report:\n');

  unusedPatterns.forEach(item => {
    if (item.files.length === 0) {
      console.log(`  ✅ ${item.pattern}: NOT USED - Safe to remove!`);
    } else {
      console.log(`  ⚠️  ${item.pattern}: Used in ${item.files.length} file(s)`);
      item.files.slice(0, 3).forEach(file => {
        console.log(`      - ${file}`);
      });
    }
  });

  return unusedPatterns;
}

// Main recommendations
function generateRecommendations(analysis, usage) {
  console.log('\n📝 OPTIMIZATION RECOMMENDATIONS:\n');

  console.log('1. REMOVE UNUSED DEPENDENCIES:');
  console.log('   Run: npm uninstall', usage.filter(u => u.files.length === 0).map(u => u.pattern).join(' '));

  console.log('\n2. DYNAMIC IMPORTS FOR HEAVY COMPONENTS:');
  console.log('   - Recharts: Only used in admin dashboards');
  console.log('   - Use next/dynamic with ssr: false for admin components');

  console.log('\n3. RADIX UI OPTIMIZATION:');
  console.log('   - Review and remove unused Radix components');
  console.log('   - Consider replacing with lighter alternatives');

  console.log('\n4. REPLACE HEAVY LIBRARIES:');
  console.log('   - axios → native fetch()');
  console.log('   - uuid → crypto.randomUUID()');
  console.log('   - date-fns → native Date or lighter alternative');
  console.log('   - swr → Already have @tanstack/react-query');

  console.log('\n5. SERVER-SIDE ONLY:');
  console.log('   - Move OpenAI SDK to API routes only');
  console.log('   - Move Redis client to server components');

  console.log('\n6. BUILD OPTIMIZATIONS:');
  console.log('   - Enable SWC minification');
  console.log('   - Use modularizeImports for lodash-like imports');
  console.log('   - Enable experimental optimizeCss');

  console.log('\n🎯 TARGET: Reduce bundle from 850KB to <300KB');
  console.log(`📊 Potential Savings: ${analysis.totalEstimated}KB+\n`);
}

// Run analysis
const analysis = analyzeDependencies();
const usage = checkActualUsage();
generateRecommendations(analysis, usage);

// Check if .next directory exists for actual bundle size
if (fs.existsSync('.next')) {
  console.log('📦 Checking Actual Build Output...\n');

  const buildManifest = path.join('.next', 'build-manifest.json');
  if (fs.existsSync(buildManifest)) {
    const manifest = JSON.parse(fs.readFileSync(buildManifest, 'utf8'));
    console.log('  Build chunks found:', Object.keys(manifest.pages).length, 'pages\n');
  }
}

console.log('✅ Analysis Complete!\n');