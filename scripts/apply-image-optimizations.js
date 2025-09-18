#!/usr/bin/env node

/**
 * Apply Image Optimizations to Components
 *
 * This script updates all Image components to use optimized settings
 * for better LCP and performance
 */

const fs = require('fs').promises;
const path = require('path');

const OPTIMIZATION_RULES = {
  hero: {
    quality: 85,
    priority: true,
    placeholder: 'blur',
    sizes: '100vw',
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABmX/9k='
  },
  service: {
    quality: 80,
    loading: 'lazy',
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  },
  thumbnail: {
    quality: 75,
    loading: 'lazy',
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
  }
};

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

/**
 * Check if a file contains hero images
 */
function isHeroImage(content, imagePath) {
  const heroPatterns = [
    'hero/',
    'HeroPremium',
    'HeroConversion',
    'priority={true}',
    'above-fold'
  ];

  return heroPatterns.some(pattern =>
    content.includes(pattern) || imagePath.includes(pattern)
  );
}

/**
 * Apply optimizations to Image components
 */
function applyOptimizations(content, filePath) {
  let modified = false;
  let updatedContent = content;
  const updates = [];

  // Pattern to match Next.js Image components
  const imageRegex = /<Image[\s\S]*?\/>/g;
  const matches = content.match(imageRegex) || [];

  matches.forEach(match => {
    const srcMatch = match.match(/src=["']([^"']+)["']/);
    if (!srcMatch) return;

    const imageSrc = srcMatch[1];
    const isHero = isHeroImage(content, imageSrc);
    const rules = isHero ? OPTIMIZATION_RULES.hero : OPTIMIZATION_RULES.service;

    let optimizedMatch = match;
    let changes = [];

    // Add quality if not present
    if (!match.includes('quality=')) {
      optimizedMatch = optimizedMatch.replace(
        '/>',
        `\n            quality={${rules.quality}}\n          />`
      );
      changes.push(`quality={${rules.quality}}`);
    }

    // Add priority for hero images
    if (isHero && !match.includes('priority')) {
      optimizedMatch = optimizedMatch.replace(
        '/>',
        `\n            priority\n          />`
      );
      changes.push('priority');
    }

    // Add loading for non-hero images
    if (!isHero && !match.includes('loading=')) {
      optimizedMatch = optimizedMatch.replace(
        '/>',
        `\n            loading="${rules.loading}"\n          />`
      );
      changes.push(`loading="${rules.loading}"`);
    }

    // Add sizes if not present
    if (!match.includes('sizes=') && rules.sizes) {
      optimizedMatch = optimizedMatch.replace(
        '/>',
        `\n            sizes="${rules.sizes}"\n          />`
      );
      changes.push(`sizes="${rules.sizes}"`);
    }

    // Add placeholder for hero images
    if (isHero && rules.placeholder && !match.includes('placeholder=')) {
      optimizedMatch = optimizedMatch.replace(
        '/>',
        `\n            placeholder="${rules.placeholder}"\n            blurDataURL="${rules.blurDataURL}"\n          />`
      );
      changes.push('placeholder with blur');
    }

    if (changes.length > 0) {
      updatedContent = updatedContent.replace(match, optimizedMatch);
      modified = true;
      updates.push({
        image: imageSrc,
        changes: changes
      });
    }
  });

  return { content: updatedContent, modified, updates };
}

/**
 * Process all component files
 */
async function processFiles() {
  console.log(`\n${colors.blue}╔════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.blue}║   Applying Image Optimizations to Components ║${colors.reset}`);
  console.log(`${colors.blue}╚════════════════════════════════════════════╝${colors.reset}\n`);

  const directories = [
    path.join(process.cwd(), 'components'),
    path.join(process.cwd(), 'app')
  ];

  let totalFiles = 0;
  let modifiedFiles = 0;
  let totalOptimizations = 0;

  for (const dir of directories) {
    try {
      const files = await getFiles(dir);

      for (const file of files) {
        if (!file.endsWith('.tsx') && !file.endsWith('.jsx')) continue;

        const content = await fs.readFile(file, 'utf8');

        // Skip files without Image components
        if (!content.includes('next/image')) continue;

        totalFiles++;
        const { content: updatedContent, modified, updates } = applyOptimizations(content, file);

        if (modified) {
          // Create backup
          await fs.writeFile(file + '.backup', content, 'utf8');

          // Write optimized content
          await fs.writeFile(file, updatedContent, 'utf8');

          modifiedFiles++;
          totalOptimizations += updates.length;

          const relativePath = path.relative(process.cwd(), file);
          console.log(`${colors.green}✓${colors.reset} ${relativePath}`);

          updates.forEach(update => {
            console.log(`  ${colors.cyan}→${colors.reset} ${update.image}`);
            console.log(`    Added: ${update.changes.join(', ')}`);
          });
        }
      }
    } catch (error) {
      console.error(`${colors.red}Error processing ${dir}:${colors.reset}`, error.message);
    }
  }

  // Print summary
  console.log(`\n${colors.blue}╔════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.blue}║              Optimization Summary           ║${colors.reset}`);
  console.log(`${colors.blue}╚════════════════════════════════════════════╝${colors.reset}\n`);

  console.log(`${colors.green}✓${colors.reset} Files scanned: ${totalFiles}`);
  console.log(`${colors.green}✓${colors.reset} Files modified: ${modifiedFiles}`);
  console.log(`${colors.green}✓${colors.reset} Optimizations applied: ${totalOptimizations}`);

  console.log(`\n${colors.cyan}📋 Optimizations Applied:${colors.reset}`);
  console.log(`  • Quality settings for optimal compression`);
  console.log(`  • Priority loading for hero images`);
  console.log(`  • Lazy loading for below-fold images`);
  console.log(`  • Responsive sizes attributes`);
  console.log(`  • Blur placeholders for smooth loading`);

  console.log(`\n${colors.cyan}🎯 Expected Performance Improvements:${colors.reset}`);
  console.log(`  • Reduced LCP (Largest Contentful Paint)`);
  console.log(`  • Lower bandwidth usage`);
  console.log(`  • Smoother perceived loading`);
  console.log(`  • Better Core Web Vitals scores`);

  console.log(`\n${colors.yellow}⚠ Important:${colors.reset}`);
  console.log(`  • Backup files created with .backup extension`);
  console.log(`  • Test the application after optimizations`);
  console.log(`  • Run 'npm run build' to verify no build errors`);
  console.log(`  • Consider using a CDN for further optimization`);
}

/**
 * Get all files recursively
 */
async function getFiles(dir) {
  const files = [];

  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory() && !entry.name.includes('node_modules')) {
        files.push(...await getFiles(fullPath));
      } else if (entry.isFile()) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    // Directory might not exist
  }

  return files;
}

// Run the script
processFiles()
  .then(() => {
    console.log(`\n${colors.green}✅ Image optimizations complete!${colors.reset}\n`);
  })
  .catch(error => {
    console.error(`\n${colors.red}❌ Optimization failed:${colors.reset}`, error);
    process.exit(1);
  });