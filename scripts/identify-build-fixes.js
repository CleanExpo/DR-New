#!/usr/bin/env node

/**
 * Build Fix Identification Script
 *
 * Since Vercel deployments may require authentication, this script
 * analyzes the codebase locally to identify potential fixes needed
 * based on common build patterns and errors.
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 DISASTER RECOVERY - BUILD FIX IDENTIFICATION');
console.log('📅 Analysis Date:', new Date().toLocaleString());
console.log('🎯 Target Deployments:');
console.log('   • Latest: https://dr-gyshmkcj0-unite-group.vercel.app');
console.log('   • Previous: https://dr-kv13xi3us-unite-group.vercel.app');
console.log('');

// Common build issues to check for
const buildIssues = [];

function checkFile(filePath, description) {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      return { exists: true, content, size: content.length };
    }
    return { exists: false };
  } catch (error) {
    return { exists: false, error: error.message };
  }
}

function analyzeComponent(filePath) {
  const result = checkFile(filePath);
  if (!result.exists) return null;

  const issues = [];
  const content = result.content;

  // Check for hydration issues
  if (content.includes('useState') && content.includes('useEffect')) {
    if (!content.includes("'use client'")) {
      issues.push('Missing "use client" directive for component with hooks');
    }
  }

  // Check for server-side only code in client components
  if (content.includes("'use client'")) {
    if (content.includes('fs.') || content.includes('path.') || content.includes('process.env') && !content.includes('NEXT_PUBLIC_')) {
      issues.push('Server-side code in client component');
    }
  }

  // Check for dynamic imports without proper error handling
  if (content.includes('import(') && !content.includes('catch')) {
    issues.push('Dynamic import without error handling');
  }

  return { path: filePath, issues, lines: content.split('\n').length };
}

function analyzeDependencies() {
  console.log('📦 DEPENDENCY ANALYSIS');

  const packageJson = checkFile('./package.json');
  if (!packageJson.exists) {
    console.log('❌ package.json not found');
    return;
  }

  try {
    const pkg = JSON.parse(packageJson.content);

    // Check for version conflicts
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };

    // Known problematic combinations
    const conflicts = [];

    if (deps['i18next'] && deps['react-i18next']) {
      const i18nextVersion = deps['i18next'].replace(/[\^~]/, '');
      const reactI18nextVersion = deps['react-i18next'].replace(/[\^~]/, '');

      console.log(`✅ i18next: ${deps['i18next']}`);
      console.log(`✅ react-i18next: ${deps['react-i18next']}`);

      // Check if they're compatible (basic check)
      if (i18nextVersion.startsWith('23.') && reactI18nextVersion.startsWith('15.')) {
        conflicts.push('i18next version may be incompatible with react-i18next');
      }
    }

    if (conflicts.length > 0) {
      console.log('⚠️  Potential dependency conflicts:');
      conflicts.forEach(conflict => console.log(`   • ${conflict}`));
    } else {
      console.log('✅ No obvious dependency conflicts detected');
    }

  } catch (error) {
    console.log('❌ Error parsing package.json:', error.message);
  }
  console.log('');
}

function analyzeProviders() {
  console.log('🔧 PROVIDER ANALYSIS');

  const layoutFile = checkFile('./app/layout.tsx');
  const clientProvidersFile = checkFile('./components/providers/ClientProviders.tsx');

  if (layoutFile.exists) {
    const issues = [];

    // Check if providers are properly separated
    if (layoutFile.content.includes('useState') || layoutFile.content.includes('useEffect')) {
      issues.push('Client-side hooks in layout.tsx (should be in ClientProviders)');
    }

    if (layoutFile.content.includes('PersonalizationProvider') || layoutFile.content.includes('ChatProvider')) {
      issues.push('Client providers directly in layout.tsx (should use ClientProviders wrapper)');
    }

    if (issues.length > 0) {
      console.log('⚠️  Layout issues:');
      issues.forEach(issue => console.log(`   • ${issue}`));
    } else {
      console.log('✅ Layout.tsx looks clean');
    }
  }

  if (clientProvidersFile.exists) {
    console.log('✅ ClientProviders component exists');

    if (!clientProvidersFile.content.includes("'use client'")) {
      console.log('❌ ClientProviders missing "use client" directive');
    }
  } else {
    console.log('❌ ClientProviders component not found');
  }
  console.log('');
}

function analyzeSchemaMarkup() {
  console.log('📋 SCHEMA MARKUP ANALYSIS');

  const schemaFiles = [
    './components/schema/VoiceSearchSchema.tsx',
    './components/schema/AggregateRatingSchema.tsx',
    './components/seo/SchemaMarkup.tsx'
  ];

  schemaFiles.forEach(file => {
    const result = checkFile(file);
    if (result.exists) {
      console.log(`✅ ${path.basename(file)} exists (${result.size} bytes)`);

      // Check for common schema issues
      if (result.content.includes('JSON.stringify') && !result.content.includes('dangerouslySetInnerHTML')) {
        console.log(`⚠️  ${path.basename(file)} may have JSON rendering issues`);
      }
    } else {
      console.log(`❌ ${path.basename(file)} not found`);
    }
  });
  console.log('');
}

function analyzeImages() {
  console.log('🖼️  IMAGE ANALYSIS');

  const imageDir = './public/images';
  if (fs.existsSync(imageDir)) {
    const images = fs.readdirSync(imageDir, { recursive: true })
      .filter(file => /\.(jpg|jpeg|png|svg|webp)$/i.test(file));

    console.log(`✅ Found ${images.length} images in public/images/`);

    // Check for very large images
    const largeImages = [];
    images.forEach(img => {
      const fullPath = path.join(imageDir, img);
      const stats = fs.statSync(fullPath);
      if (stats.size > 1024 * 1024) { // > 1MB
        largeImages.push({ file: img, size: Math.round(stats.size / 1024 / 1024 * 10) / 10 });
      }
    });

    if (largeImages.length > 0) {
      console.log('⚠️  Large images detected (may affect build performance):');
      largeImages.forEach(img => console.log(`   • ${img.file}: ${img.size}MB`));
    }
  } else {
    console.log('❌ /public/images directory not found');
  }
  console.log('');
}

function generateFixRecommendations() {
  console.log('💡 RECOMMENDED FIXES BASED ON ANALYSIS');
  console.log('');

  const recommendations = [
    {
      category: 'Build Performance',
      fixes: [
        'Ensure all client components have "use client" directive',
        'Verify ClientProviders wrapper is used in layout.tsx',
        'Check for server-side code in client components',
        'Optimize large images with next/image component'
      ]
    },
    {
      category: 'Hydration Issues',
      fixes: [
        'Separate client-side providers from layout.tsx',
        'Use dynamic imports for client-only components',
        'Add fallback components for SSR mismatches',
        'Ensure consistent server/client rendering'
      ]
    },
    {
      category: 'Schema Markup',
      fixes: [
        'Verify all schema components render valid JSON-LD',
        'Check LocalBusiness schema has required fields',
        'Ensure schema scripts use dangerouslySetInnerHTML correctly',
        'Validate schema markup with Google structured data tool'
      ]
    },
    {
      category: 'Dependencies',
      fixes: [
        'Update i18next to version 25.5.2+ for react-i18next compatibility',
        'Run npm audit fix for security vulnerabilities',
        'Check for peer dependency warnings during install',
        'Use exact versions for critical dependencies'
      ]
    }
  ];

  recommendations.forEach(rec => {
    console.log(`🔧 ${rec.category}:`);
    rec.fixes.forEach(fix => console.log(`   • ${fix}`));
    console.log('');
  });
}

// Main analysis
function main() {
  analyzeDependencies();
  analyzeProviders();
  analyzeSchemaMarkup();
  analyzeImages();
  generateFixRecommendations();

  console.log('🎯 PLAYWRIGHT MCP MONITORING COMMANDS:');
  console.log('');
  console.log('// Test latest deployment');
  console.log('await page.goto("https://dr-gyshmkcj0-unite-group.vercel.app");');
  console.log('console.log(await page.evaluate(() => window.location.href));');
  console.log('');
  console.log('// Check for console errors');
  console.log('const errors = await page.evaluate(() => {');
  console.log('  return Array.from(console._errors || []);');
  console.log('});');
  console.log('');
  console.log('// Monitor for hydration errors');
  console.log('page.on("console", msg => {');
  console.log('  if (msg.type() === "error" && msg.text().includes("hydration")) {');
  console.log('    console.log("🚨 Hydration error detected:", msg.text());');
  console.log('  }');
  console.log('});');
  console.log('');
  console.log('📋 Analysis complete! Use these insights to perform targeted fixes.');
}

if (require.main === module) {
  main();
}

module.exports = { analyzeComponent, analyzeDependencies, analyzeProviders };