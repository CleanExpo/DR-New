#!/usr/bin/env node

/**
 * Bundle Size Checker
 * Analyzes the Next.js production bundle size
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('📦 Bundle Size Analysis\n');
console.log('═══════════════════════════════════════════\n');

// Function to get file size in KB
function getFileSizeInKB(filePath) {
  if (!fs.existsSync(filePath)) return 0;
  const stats = fs.statSync(filePath);
  return (stats.size / 1024).toFixed(2);
}

// Function to analyze .next directory
function analyzeBuildOutput() {
  const nextDir = path.join(process.cwd(), '.next');

  if (!fs.existsSync(nextDir)) {
    console.log('❌ No .next directory found. Please run: npm run build\n');
    return false;
  }

  console.log('📊 Analyzing Build Output...\n');

  // Check static chunks
  const staticChunksDir = path.join(nextDir, 'static', 'chunks');
  if (fs.existsSync(staticChunksDir)) {
    const chunks = fs.readdirSync(staticChunksDir);

    let totalSize = 0;
    const chunkSizes = [];

    chunks.forEach(chunk => {
      const chunkPath = path.join(staticChunksDir, chunk);
      const size = parseFloat(getFileSizeInKB(chunkPath));
      totalSize += size;

      if (size > 1) { // Only show chunks larger than 1KB
        chunkSizes.push({ name: chunk, size });
      }
    });

    // Sort by size
    chunkSizes.sort((a, b) => b.size - a.size);

    console.log('🔍 Largest JavaScript Chunks:\n');
    chunkSizes.slice(0, 10).forEach(chunk => {
      const emoji = chunk.size > 100 ? '🔴' : chunk.size > 50 ? '🟡' : '🟢';
      console.log(`  ${emoji} ${chunk.name}: ${chunk.size}KB`);
    });

    console.log(`\n📈 Total Static Chunks Size: ${totalSize.toFixed(2)}KB`);

    const target = 300;
    const difference = totalSize - target;

    if (totalSize <= target) {
      console.log(`\n✅ SUCCESS! Bundle size (${totalSize.toFixed(2)}KB) is under ${target}KB target!`);
      console.log(`   You saved ${Math.abs(difference).toFixed(2)}KB below the target!\n`);
    } else {
      console.log(`\n⚠️  WARNING! Bundle size (${totalSize.toFixed(2)}KB) exceeds ${target}KB target!`);
      console.log(`   Need to reduce by ${difference.toFixed(2)}KB more.\n`);
    }

    return { totalSize, chunkSizes };
  }

  return false;
}

// Function to check current package sizes
function checkPackageSizes() {
  console.log('\n📦 Remaining Heavy Dependencies:\n');

  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const deps = packageJson.dependencies;

  const heavyPackages = [
    { name: 'framer-motion', estimatedSize: 150 },
    { name: 'recharts', estimatedSize: 300 },
    { name: '@vercel/analytics', estimatedSize: 30 },
    { name: 'react-hot-toast', estimatedSize: 30 },
    { name: 'zod', estimatedSize: 50 },
  ];

  let totalEstimated = 0;

  heavyPackages.forEach(pkg => {
    if (deps[pkg.name]) {
      console.log(`  ⚠️  ${pkg.name}: ~${pkg.estimatedSize}KB`);
      totalEstimated += pkg.estimatedSize;
    }
  });

  // Count Radix UI
  const radixCount = Object.keys(deps).filter(d => d.startsWith('@radix-ui/')).length;
  if (radixCount > 0) {
    const radixEstimate = radixCount * 20;
    console.log(`  📊 Radix UI: ${radixCount} packages (~${radixEstimate}KB)`);
    totalEstimated += radixEstimate;
  }

  console.log(`\n  💾 Total Estimated Impact: ${totalEstimated}KB`);

  return totalEstimated;
}

// Function to provide recommendations
function provideRecommendations(buildResult) {
  console.log('\n📝 OPTIMIZATION RECOMMENDATIONS:\n');

  if (!buildResult) {
    console.log('1. Run: npm run build');
    console.log('2. Then run this script again to analyze the bundle\n');
    return;
  }

  const { totalSize } = buildResult;

  if (totalSize > 300) {
    console.log('To further reduce bundle size:\n');

    console.log('1. DYNAMIC IMPORTS:');
    console.log('   - Convert all Framer Motion imports to dynamic');
    console.log('   - Lazy load heavy components with next/dynamic');
    console.log('   - Split code by route automatically\n');

    console.log('2. REMOVE/REPLACE:');
    console.log('   - Replace react-hot-toast with lighter alternative');
    console.log('   - Consider removing zod if validation is minimal');
    console.log('   - Use CSS animations instead of Framer Motion where possible\n');

    console.log('3. OPTIMIZE IMPORTS:');
    console.log('   - Import only needed icons from lucide-react');
    console.log('   - Tree-shake all libraries properly');
    console.log('   - Use production builds only\n');

    console.log('4. BUILD CONFIGURATION:');
    console.log('   - Enable all Next.js optimizations');
    console.log('   - Use SWC minifier (already enabled)');
    console.log('   - Implement aggressive code splitting\n');
  } else {
    console.log('🎉 Excellent work! Your bundle is optimized!\n');
    console.log('To maintain this:\n');
    console.log('- Monitor bundle size on each build');
    console.log('- Use dynamic imports for new heavy features');
    console.log('- Regularly audit and remove unused dependencies\n');
  }
}

// Main execution
console.log('🔄 Checking current build...\n');

const buildResult = analyzeBuildOutput();
const estimatedSize = checkPackageSizes();

provideRecommendations(buildResult);

// Summary
console.log('═══════════════════════════════════════════\n');
console.log('📊 SUMMARY:\n');

if (buildResult) {
  const { totalSize } = buildResult;
  const reduction = 850 - totalSize;
  const reductionPercent = ((reduction / 850) * 100).toFixed(1);

  console.log(`  Original Bundle: 850KB`);
  console.log(`  Current Bundle: ${totalSize.toFixed(2)}KB`);
  console.log(`  Reduction: ${reduction.toFixed(2)}KB (${reductionPercent}%)`);
  console.log(`  Target: <300KB`);
  console.log(`  Status: ${totalSize <= 300 ? '✅ ACHIEVED!' : `⚠️ ${(totalSize - 300).toFixed(2)}KB over target`}`);
} else {
  console.log('  ⏳ Build required to measure actual bundle size');
  console.log('  Estimated remaining heavy deps: ' + estimatedSize + 'KB');
}

console.log('\n═══════════════════════════════════════════\n');