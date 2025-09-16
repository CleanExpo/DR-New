#!/usr/bin/env node

/**
 * Image Optimization Script for DR-New
 * Converts images to modern formats and generates responsive variants
 */

const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');
const glob = require('glob-promise');

// Configuration
const IMAGE_QUALITY = {
  jpg: 85,
  webp: 80,
  avif: 75,
  png: 90
};

const BREAKPOINTS = [
  { name: 'mobile', width: 640 },
  { name: 'tablet', width: 768 },
  { name: 'desktop', width: 1024 },
  { name: 'wide', width: 1280 },
  { name: 'ultrawide', width: 1920 }
];

const IMAGE_FORMATS = ['webp', 'avif'];

// Helper functions
async function ensureDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    console.error(`Error creating directory ${dirPath}:`, error);
  }
}

async function getImageMetadata(imagePath) {
  try {
    const metadata = await sharp(imagePath).metadata();
    return metadata;
  } catch (error) {
    console.error(`Error reading metadata for ${imagePath}:`, error);
    return null;
  }
}

async function optimizeImage(inputPath, outputDir, options = {}) {
  const {
    formats = IMAGE_FORMATS,
    breakpoints = BREAKPOINTS,
    quality = IMAGE_QUALITY,
    generatePlaceholder = true
  } = options;

  const filename = path.basename(inputPath, path.extname(inputPath));
  const metadata = await getImageMetadata(inputPath);

  if (!metadata) {
    console.error(`Skipping ${inputPath} - unable to read metadata`);
    return;
  }

  const results = {
    original: inputPath,
    optimized: [],
    placeholder: null
  };

  // Generate base64 placeholder
  if (generatePlaceholder) {
    try {
      const placeholder = await sharp(inputPath)
        .resize(10, Math.round(10 * (metadata.height / metadata.width)))
        .blur(5)
        .toBuffer();

      results.placeholder = `data:image/jpeg;base64,${placeholder.toString('base64')}`;
    } catch (error) {
      console.error(`Error generating placeholder for ${inputPath}:`, error);
    }
  }

  // Process each format
  for (const format of formats) {
    // Process each breakpoint
    for (const breakpoint of breakpoints) {
      // Skip if the breakpoint is larger than original
      if (breakpoint.width > metadata.width) {
        continue;
      }

      const outputFilename = `${filename}-${breakpoint.name}.${format}`;
      const outputPath = path.join(outputDir, outputFilename);

      try {
        await sharp(inputPath)
          .resize(breakpoint.width, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          .toFormat(format, { quality: quality[format] || 80 })
          .toFile(outputPath);

        const stats = await fs.stat(outputPath);
        results.optimized.push({
          path: outputPath,
          format,
          width: breakpoint.width,
          size: stats.size
        });

        console.log(`✓ Generated ${outputFilename} (${(stats.size / 1024).toFixed(2)} KB)`);
      } catch (error) {
        console.error(`Error processing ${inputPath} to ${format}:`, error);
      }
    }

    // Also generate full-size version in new format
    const fullSizeFilename = `${filename}.${format}`;
    const fullSizePath = path.join(outputDir, fullSizeFilename);

    try {
      await sharp(inputPath)
        .toFormat(format, { quality: quality[format] || 80 })
        .toFile(fullSizePath);

      const stats = await fs.stat(fullSizePath);
      results.optimized.push({
        path: fullSizePath,
        format,
        width: metadata.width,
        size: stats.size
      });

      console.log(`✓ Generated ${fullSizeFilename} (${(stats.size / 1024).toFixed(2)} KB)`);
    } catch (error) {
      console.error(`Error processing full-size ${inputPath} to ${format}:`, error);
    }
  }

  return results;
}

async function processImageDirectory(inputDir, outputDir) {
  // Ensure output directory exists
  await ensureDir(outputDir);

  // Find all images
  const imagePatterns = ['*.jpg', '*.jpeg', '*.png'];
  const images = [];

  for (const pattern of imagePatterns) {
    const files = await glob(path.join(inputDir, pattern));
    images.push(...files);
  }

  console.log(`Found ${images.length} images to process in ${inputDir}`);

  const results = [];

  // Process each image
  for (const imagePath of images) {
    console.log(`\nProcessing ${path.basename(imagePath)}...`);
    const result = await optimizeImage(imagePath, outputDir);
    if (result) {
      results.push(result);
    }
  }

  // Generate manifest file
  const manifestPath = path.join(outputDir, 'manifest.json');
  await fs.writeFile(manifestPath, JSON.stringify(results, null, 2));

  console.log(`\n✓ Optimization complete! Manifest saved to ${manifestPath}`);

  // Calculate savings
  let originalSize = 0;
  let optimizedSize = 0;

  for (const result of results) {
    const originalStats = await fs.stat(result.original);
    originalSize += originalStats.size;

    for (const optimized of result.optimized) {
      optimizedSize += optimized.size;
    }
  }

  const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(2);
  console.log(`\nTotal savings: ${savings}% (${(originalSize / 1024 / 1024).toFixed(2)} MB → ${(optimizedSize / 1024 / 1024).toFixed(2)} MB)`);
}

// Main execution
async function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('Usage: node optimizeImages.js <input-directory> <output-directory>');
    console.log('Example: node optimizeImages.js public/images/hero public/images/optimized/hero');
    process.exit(1);
  }

  const inputDir = path.resolve(args[0]);
  const outputDir = path.resolve(args[1]);

  console.log('DR-New Image Optimization Script');
  console.log('=================================');
  console.log(`Input: ${inputDir}`);
  console.log(`Output: ${outputDir}`);
  console.log('');

  try {
    await processImageDirectory(inputDir, outputDir);
  } catch (error) {
    console.error('Error during optimization:', error);
    process.exit(1);
  }
}

// Check if sharp is installed
try {
  require('sharp');
} catch (error) {
  console.error('Sharp is not installed. Please run: npm install sharp glob-promise');
  process.exit(1);
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = {
  optimizeImage,
  processImageDirectory,
  getImageMetadata
};