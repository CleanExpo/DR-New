#!/usr/bin/env node

/**
 * WebP Conversion Script
 * Converts priority images to WebP format with quality optimization
 * Usage: node convert-images-to-webp.js [--all|--priority|--category=places]
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is installed
let sharp;
try {
  sharp = require('sharp');
  console.log('✅ Sharp library loaded successfully\n');
} catch (error) {
  console.error('❌ Sharp library not found. Installing...');
  console.error('Run: npm install --save-dev sharp');
  process.exit(1);
}

const imgDir = path.join(__dirname, 'public/images');

// Configuration
const CONFIG = {
  quality: 85, // WebP quality (80-90 recommended)
  effort: 6,   // Compression effort (0-6, higher = better compression but slower)
  skipExisting: true, // Skip if WebP already exists
};

// Priority categories (highest impact first)
const PRIORITY_CATEGORIES = [
  { name: 'places', files: 17, size: 90.50 },
  { name: 'optimized', files: 50, size: 91.17 },
  { name: 'optimised', files: 21, size: 39.78 },
  { name: 'logos', files: 10, size: 20.32 },
  { name: 'hero', files: 7, size: 2.71 },
  { name: 'icons', files: 4, size: 3.17 },
];

// Statistics
const stats = {
  total: 0,
  converted: 0,
  skipped: 0,
  failed: 0,
  originalSize: 0,
  webpSize: 0,
  savings: 0,
  results: []
};

/**
 * Get all image files in directory
 */
function getAllImages(dir, category = null) {
  const images = [];

  function traverse(currentDir) {
    const files = fs.readdirSync(currentDir);

    for (const file of files) {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        traverse(filePath);
      } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
        const relativePath = filePath.replace(__dirname + path.sep, '');
        const fileCategory = relativePath.split(path.sep)[2]; // public/images/[category]

        // Filter by category if specified
        if (!category || fileCategory === category) {
          if (stat.size > 100000) { // > 100KB
            images.push({
              path: filePath,
              relativePath: relativePath,
              category: fileCategory,
              size: stat.size,
              ext: path.extname(file).toLowerCase()
            });
          }
        }
      }
    }
  }

  traverse(dir);
  return images;
}

/**
 * Convert image to WebP
 */
async function convertToWebP(image) {
  const webpPath = image.path.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const webpRelativePath = webpPath.replace(__dirname + path.sep, '');

  // Check if WebP already exists
  if (CONFIG.skipExisting && fs.existsSync(webpPath)) {
    console.log(`⏭️  SKIP: ${image.relativePath} (WebP exists)`);
    stats.skipped++;
    return;
  }

  try {
    console.log(`🔄 Converting: ${image.relativePath}`);
    console.log(`   Source: ${(image.size / 1024 / 1024).toFixed(2)} MB`);

    // Convert to WebP
    await sharp(image.path)
      .webp({
        quality: CONFIG.quality,
        effort: CONFIG.effort
      })
      .toFile(webpPath);

    // Get WebP file size
    const webpStats = fs.statSync(webpPath);
    const webpSize = webpStats.size;
    const savings = image.size - webpSize;
    const savingsPercent = (savings / image.size) * 100;

    console.log(`   WebP: ${(webpSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   ✅ Saved: ${(savings / 1024 / 1024).toFixed(2)} MB (${savingsPercent.toFixed(1)}%)\n`);

    stats.converted++;
    stats.originalSize += image.size;
    stats.webpSize += webpSize;
    stats.savings += savings;
    stats.results.push({
      original: image.relativePath,
      webp: webpRelativePath,
      originalSize: image.size,
      webpSize: webpSize,
      savings: savings,
      savingsPercent: savingsPercent
    });

  } catch (error) {
    console.error(`❌ FAILED: ${image.relativePath}`);
    console.error(`   Error: ${error.message}\n`);
    stats.failed++;
  }
}

/**
 * Print summary
 */
function printSummary() {
  console.log('\n' + '='.repeat(80));
  console.log('📊 WEBP CONVERSION SUMMARY');
  console.log('='.repeat(80));
  console.log(`\nTotal images processed: ${stats.total}`);
  console.log(`✅ Converted: ${stats.converted}`);
  console.log(`⏭️  Skipped: ${stats.skipped}`);
  console.log(`❌ Failed: ${stats.failed}`);

  if (stats.converted > 0) {
    console.log(`\n📦 Original size: ${(stats.originalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📦 WebP size: ${(stats.webpSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`💾 Total savings: ${(stats.savings / 1024 / 1024).toFixed(2)} MB (${((stats.savings / stats.originalSize) * 100).toFixed(1)}%)`);

    // Top savings
    if (stats.results.length > 0) {
      console.log('\n🏆 Top 10 Space Savings:');
      stats.results
        .sort((a, b) => b.savings - a.savings)
        .slice(0, 10)
        .forEach((result, i) => {
          console.log(`${i + 1}. ${result.original}`);
          console.log(`   Saved: ${(result.savings / 1024 / 1024).toFixed(2)} MB (${result.savingsPercent.toFixed(1)}%)`);
        });
    }
  }

  console.log('\n' + '='.repeat(80) + '\n');
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);

  console.log('='.repeat(80));
  console.log('🎨 WEBP IMAGE CONVERTER');
  console.log('='.repeat(80));
  console.log(`\nQuality: ${CONFIG.quality}%`);
  console.log(`Compression effort: ${CONFIG.effort}/6`);
  console.log(`Skip existing: ${CONFIG.skipExisting}\n`);

  let images = [];

  if (args.includes('--all')) {
    console.log('Mode: Converting ALL images >100KB\n');
    images = getAllImages(imgDir);
  } else if (args.some(arg => arg.startsWith('--category='))) {
    const category = args.find(arg => arg.startsWith('--category=')).split('=')[1];
    console.log(`Mode: Converting category "${category}"\n`);
    images = getAllImages(imgDir, category);
  } else {
    // Default: Convert priority categories only
    console.log('Mode: Converting PRIORITY categories\n');
    console.log('Priority categories:');
    PRIORITY_CATEGORIES.forEach((cat, i) => {
      console.log(`  ${i + 1}. ${cat.name}: ~${cat.files} files, ~${cat.size} MB`);
    });
    console.log('');

    for (const cat of PRIORITY_CATEGORIES) {
      images = images.concat(getAllImages(imgDir, cat.name));
    }
  }

  if (images.length === 0) {
    console.log('❌ No images found to convert');
    process.exit(0);
  }

  stats.total = images.length;
  console.log(`📁 Found ${images.length} images to convert\n`);
  console.log('='.repeat(80) + '\n');

  // Convert images
  for (const image of images) {
    await convertToWebP(image);
  }

  // Print summary
  printSummary();

  // Save results to JSON
  const resultsPath = path.join(__dirname, 'webp-conversion-results.json');
  fs.writeFileSync(resultsPath, JSON.stringify(stats, null, 2));
  console.log(`💾 Results saved to: webp-conversion-results.json\n`);

  process.exit(stats.failed > 0 ? 1 : 0);
}

// Run
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
