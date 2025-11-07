/**
 * Professional Image Optimization Script for Service Pages
 * Converts PNG images to high-quality WebP with proper sizing
 *
 * Target: 300-800KB WebP files with 85% quality (excellent visual quality)
 * Original PNGs: 3.6-4.9MB each
 * Expected reduction: ~85% file size while maintaining quality
 */

const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp').default || require('imagemin-webp');
const fs = require('fs').promises;
const path = require('path');

const CONFIG = {
  // Source directory with original high-quality PNGs
  sourceDir: path.join(__dirname, '../public/images/services-original'),

  // Output directory for optimized WebP files
  outputDir: path.join(__dirname, '../public/images/services'),

  // WebP optimization settings
  webpOptions: {
    quality: 85,        // 85% quality - excellent visual quality
    method: 6,          // Compression method (0-6, higher = better but slower)
    resize: {
      width: 1200,      // Max width for hero images
      height: 800,      // Max height, maintains aspect ratio
    },
    metadata: 'all',    // Preserve all metadata (EXIF, etc.)
  },

  // Image mappings (original PNG -> output WebP name)
  images: [
    {
      source: 'sewage-remediation.png',
      output: 'sewage-remediation.webp',
      alt: 'Sewage Remediation Brisbane - IICRC Master Restorer Phill McGurk Professional Category 3 Black Water Cleanup',
      service: 'Sewage Cleanup'
    },
    {
      source: 'fire-smoke-damage.png',
      output: 'fire-damage-restoration.webp',
      alt: 'Fire and Smoke Damage Restoration Brisbane - IICRC Master Restorer Phill McGurk Emergency Response',
      service: 'Fire Damage'
    },
    {
      source: 'mould-remediation.png',
      output: 'mould-remediation.webp',
      alt: 'Mould Remediation Brisbane - IICRC AMRT Certified Master Restorer Professional Removal Services',
      service: 'Mould Remediation'
    },
    {
      source: 'commercial-disaster-recovery.png',
      output: 'commercial-disaster-recovery.webp',
      alt: 'Commercial Disaster Recovery Brisbane - 24/7 Business Restoration IICRC Master Restorer',
      service: 'Commercial Services'
    },
    {
      source: 'biohazard-remediation.png',
      output: 'biohazard-remediation.webp',
      alt: 'Biohazard Remediation Brisbane - IICRC S540 Certified Crime Scene and Trauma Cleanup',
      service: 'Biohazard Cleanup'
    }
  ]
};

async function ensureDirectories() {
  try {
    await fs.mkdir(CONFIG.sourceDir, { recursive: true });
    await fs.mkdir(CONFIG.outputDir, { recursive: true });
    console.log('✅ Directories created/verified');
  } catch (error) {
    console.error('❌ Error creating directories:', error.message);
    throw error;
  }
}

async function checkSourceImages() {
  console.log('\n📋 Checking source images...\n');

  const missingImages = [];

  for (const img of CONFIG.images) {
    const sourcePath = path.join(CONFIG.sourceDir, img.source);
    try {
      const stats = await fs.stat(sourcePath);
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      console.log(`✅ ${img.source} (${sizeMB} MB) - ${img.service}`);
    } catch (error) {
      console.log(`❌ ${img.source} - MISSING`);
      missingImages.push(img.source);
    }
  }

  if (missingImages.length > 0) {
    console.log('\n⚠️  Missing source images. Please place the original PNG files in:');
    console.log(`   ${CONFIG.sourceDir}\n`);
    console.log('Missing files:');
    missingImages.forEach(img => console.log(`   - ${img}`));
    return false;
  }

  return true;
}

async function optimizeImages() {
  console.log('\n🔄 Starting image optimization...\n');

  const results = [];

  for (const img of CONFIG.images) {
    const sourcePath = path.join(CONFIG.sourceDir, img.source);

    try {
      console.log(`Processing: ${img.source} → ${img.output}`);

      // Optimize with imagemin-webp
      const files = await imagemin([sourcePath], {
        destination: CONFIG.outputDir,
        plugins: [
          imageminWebp(CONFIG.webpOptions)
        ]
      });

      if (files && files.length > 0) {
        // Get source and output file sizes
        const sourceStats = await fs.stat(sourcePath);
        const outputPath = path.join(CONFIG.outputDir, img.source.replace('.png', '.webp'));

        // Rename to desired output name if different
        if (img.output !== img.source.replace('.png', '.webp')) {
          await fs.rename(outputPath, path.join(CONFIG.outputDir, img.output));
        }

        const outputStats = await fs.stat(path.join(CONFIG.outputDir, img.output));

        const sourceSizeMB = (sourceStats.size / (1024 * 1024)).toFixed(2);
        const outputSizeKB = (outputStats.size / 1024).toFixed(0);
        const reduction = (((sourceStats.size - outputStats.size) / sourceStats.size) * 100).toFixed(1);

        console.log(`  ✅ ${img.service}: ${sourceSizeMB}MB → ${outputSizeKB}KB (${reduction}% reduction)`);

        results.push({
          service: img.service,
          originalSize: sourceStats.size,
          optimizedSize: outputStats.size,
          reduction: reduction,
          output: img.output
        });
      }
    } catch (error) {
      console.error(`  ❌ Error processing ${img.source}:`, error.message);
    }
  }

  return results;
}

function printSummary(results) {
  console.log('\n' + '='.repeat(60));
  console.log('📊 OPTIMIZATION SUMMARY');
  console.log('='.repeat(60) + '\n');

  let totalOriginal = 0;
  let totalOptimized = 0;

  results.forEach(result => {
    totalOriginal += result.originalSize;
    totalOptimized += result.optimizedSize;

    const originalMB = (result.originalSize / (1024 * 1024)).toFixed(2);
    const optimizedKB = (result.optimizedSize / 1024).toFixed(0);

    console.log(`${result.service}:`);
    console.log(`  Original:  ${originalMB} MB`);
    console.log(`  Optimized: ${optimizedKB} KB`);
    console.log(`  Reduction: ${result.reduction}%`);
    console.log(`  Output:    ${result.output}\n`);
  });

  const totalOriginalMB = (totalOriginal / (1024 * 1024)).toFixed(2);
  const totalOptimizedKB = (totalOptimized / 1024).toFixed(0);
  const totalReduction = (((totalOriginal - totalOptimized) / totalOriginal) * 100).toFixed(1);

  console.log('─'.repeat(60));
  console.log(`TOTAL: ${totalOriginalMB}MB → ${totalOptimizedKB}KB (${totalReduction}% reduction)`);
  console.log('─'.repeat(60) + '\n');

  console.log('✅ Image optimization complete!');
  console.log(`📁 Optimized images saved to: ${CONFIG.outputDir}\n`);
  console.log('Next steps:');
  console.log('1. Review the optimized images for quality');
  console.log('2. Commit and push the optimized WebP files');
  console.log('3. Deploy to Vercel for production\n');
}

async function main() {
  console.log('\n🎨 Professional Service Image Optimizer');
  console.log('Target: High-quality WebP at 85% quality\n');

  try {
    // Ensure directories exist
    await ensureDirectories();

    // Check if source images exist
    const hasAllImages = await checkSourceImages();

    if (!hasAllImages) {
      console.log('\n⚠️  Setup Instructions:');
      console.log('1. Create directory: public/images/services-original/');
      console.log('2. Copy your original high-quality PNG files there:');
      CONFIG.images.forEach(img => console.log(`   - ${img.source}`));
      console.log('3. Run this script again: node scripts/optimize-service-images.js\n');
      process.exit(1);
    }

    // Optimize images
    const results = await optimizeImages();

    // Print summary
    if (results.length > 0) {
      printSummary(results);
    } else {
      console.log('\n❌ No images were optimized. Please check for errors above.\n');
    }

  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { main, CONFIG };
