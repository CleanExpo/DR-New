#!/usr/bin/env node

/**
 * Image Optimization Script for Disaster Recovery Website
 *
 * This script optimizes all images in public/images/ by:
 * 1. Converting to WebP format with JPEG fallbacks
 * 2. Creating responsive sizes (320w, 640w, 1024w, 1920w)
 * 3. Generating blur placeholders for lazy loading
 * 4. Compressing images to reduce file sizes
 * 5. Creating a manifest file with optimization data
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

// Configuration
const CONFIG = {
  inputDir: path.join(process.cwd(), 'public', 'images'),
  outputDir: path.join(process.cwd(), 'public', 'images', 'optimized'),
  sizes: [320, 640, 1024, 1920],
  formats: ['webp', 'jpeg'],
  quality: {
    webp: 80,
    jpeg: 85,
    png: 90
  },
  // Hero images need priority optimization for LCP
  heroImages: [
    'disaster-recovery-services',
    'fire-smoke-damage-restoration',
    'fire-water-damage-restoration',
    'mould-remediation-services',
    'commercial-restoration-services',
    'sewage-remediation-services',
    'biohazard-remediation-services',
    'hero-disaster-tornado'
  ],
  // Skip optimization for these directories
  skipDirs: ['optimized', 'favicons'],
  // Image manifest for tracking optimizations
  manifestFile: path.join(process.cwd(), 'public', 'images', 'image-manifest.json')
};

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

/**
 * Generate a blur placeholder data URL
 */
async function generateBlurPlaceholder(imagePath) {
  try {
    const image = sharp(imagePath);
    const metadata = await image.metadata();

    // Create a tiny version for blur placeholder
    const placeholder = await image
      .resize(20, Math.round((20 / metadata.width) * metadata.height))
      .blur(10)
      .webp({ quality: 20 })
      .toBuffer();

    return `data:image/webp;base64,${placeholder.toString('base64')}`;
  } catch (error) {
    console.error(`${colors.red}Error generating placeholder for ${imagePath}:${colors.reset}`, error.message);
    return null;
  }
}

/**
 * Calculate image hash for cache busting
 */
async function getImageHash(imagePath) {
  try {
    const buffer = await fs.readFile(imagePath);
    return crypto.createHash('md5').update(buffer).digest('hex').substring(0, 8);
  } catch (error) {
    return null;
  }
}

/**
 * Optimize a single image
 */
async function optimizeImage(inputPath, relativePath, stats) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const outputSubDir = path.dirname(relativePath);
  const outputDir = path.join(CONFIG.outputDir, outputSubDir);

  // Create output directory if it doesn't exist
  await fs.mkdir(outputDir, { recursive: true });

  const results = {
    original: {
      path: relativePath,
      size: stats.size,
      format: path.extname(inputPath).substring(1)
    },
    optimized: [],
    placeholder: null,
    hash: await getImageHash(inputPath)
  };

  // Generate blur placeholder
  console.log(`  ${colors.cyan}→ Generating blur placeholder...${colors.reset}`);
  results.placeholder = await generateBlurPlaceholder(inputPath);

  // Get original metadata
  const image = sharp(inputPath);
  const metadata = await image.metadata();

  // Check if image is a hero image for priority optimization
  const isHeroImage = CONFIG.heroImages.some(hero =>
    inputPath.toLowerCase().includes(hero.toLowerCase())
  );

  // Process each size
  for (const width of CONFIG.sizes) {
    // Skip sizes larger than original
    if (width > metadata.width) continue;

    for (const format of CONFIG.formats) {
      const outputFilename = `${filename}-${width}w.${format}`;
      const outputPath = path.join(outputDir, outputFilename);

      try {
        let pipeline = sharp(inputPath)
          .resize(width, null, {
            withoutEnlargement: true,
            fit: 'inside'
          });

        // Apply format-specific optimizations
        if (format === 'webp') {
          pipeline = pipeline.webp({
            quality: isHeroImage ? 85 : CONFIG.quality.webp,
            effort: 6, // Higher effort for better compression
            smartSubsample: true
          });
        } else if (format === 'jpeg') {
          pipeline = pipeline.jpeg({
            quality: isHeroImage ? 90 : CONFIG.quality.jpeg,
            progressive: true,
            optimizeScans: true,
            mozjpeg: true
          });
        }

        const info = await pipeline.toFile(outputPath);

        results.optimized.push({
          path: path.join('optimized', outputSubDir, outputFilename).replace(/\\/g, '/'),
          width: info.width,
          height: info.height,
          size: info.size,
          format: format,
          compressionRatio: ((1 - info.size / stats.size) * 100).toFixed(1)
        });

        console.log(`  ${colors.green}✓${colors.reset} ${outputFilename} (${(info.size / 1024).toFixed(1)}KB, -${((1 - info.size / stats.size) * 100).toFixed(1)}%)`);
      } catch (error) {
        console.error(`  ${colors.red}✗ Error processing ${outputFilename}:${colors.reset}`, error.message);
      }
    }
  }

  return results;
}

/**
 * Get all image files recursively
 */
async function getImageFiles(dir, baseDir = dir) {
  const files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(baseDir, fullPath);

    if (entry.isDirectory()) {
      // Skip specified directories
      if (!CONFIG.skipDirs.includes(entry.name)) {
        files.push(...await getImageFiles(fullPath, baseDir));
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        const stats = await fs.stat(fullPath);
        files.push({ path: fullPath, relativePath, stats });
      }
    }
  }

  return files;
}

/**
 * Generate Next.js image loader configuration
 */
function generateImageLoaderConfig(manifest) {
  const config = {
    images: {},
    srcSets: {},
    placeholders: {}
  };

  for (const [imagePath, data] of Object.entries(manifest)) {
    const basename = path.basename(imagePath, path.extname(imagePath));

    // Generate srcset for responsive images
    const webpSrcSet = data.optimized
      .filter(img => img.format === 'webp')
      .map(img => `/images/${img.path} ${img.width}w`)
      .join(', ');

    const jpegSrcSet = data.optimized
      .filter(img => img.format === 'jpeg')
      .map(img => `/images/${img.path} ${img.width}w`)
      .join(', ');

    config.srcSets[imagePath] = {
      webp: webpSrcSet,
      jpeg: jpegSrcSet
    };

    // Store placeholder
    if (data.placeholder) {
      config.placeholders[imagePath] = data.placeholder;
    }

    // Store image data for components
    config.images[imagePath] = {
      original: data.original,
      optimized: data.optimized,
      placeholder: data.placeholder,
      hash: data.hash
    };
  }

  return config;
}

/**
 * Main optimization function
 */
async function optimizeAllImages() {
  console.log(`\n${colors.blue}╔════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.blue}║  Image Optimization for Disaster Recovery  ║${colors.reset}`);
  console.log(`${colors.blue}╚════════════════════════════════════════════╝${colors.reset}\n`);

  try {
    // Get all image files
    console.log(`${colors.yellow}📁 Scanning for images...${colors.reset}`);
    const imageFiles = await getImageFiles(CONFIG.inputDir);
    console.log(`${colors.green}✓${colors.reset} Found ${imageFiles.length} images\n`);

    // Sort to process hero images first
    imageFiles.sort((a, b) => {
      const aIsHero = CONFIG.heroImages.some(hero =>
        a.path.toLowerCase().includes(hero.toLowerCase())
      );
      const bIsHero = CONFIG.heroImages.some(hero =>
        b.path.toLowerCase().includes(hero.toLowerCase())
      );

      if (aIsHero && !bIsHero) return -1;
      if (!aIsHero && bIsHero) return 1;
      return 0;
    });

    // Create output directory
    await fs.mkdir(CONFIG.outputDir, { recursive: true });

    // Process each image
    const manifest = {};
    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;

    for (let i = 0; i < imageFiles.length; i++) {
      const { path: imagePath, relativePath, stats } = imageFiles[i];
      const isHero = CONFIG.heroImages.some(hero =>
        imagePath.toLowerCase().includes(hero.toLowerCase())
      );

      console.log(`\n${colors.yellow}[${i + 1}/${imageFiles.length}]${colors.reset} Processing: ${relativePath}${isHero ? ' 🌟 (Hero Image)' : ''}`);
      console.log(`  Original size: ${(stats.size / 1024).toFixed(1)}KB`);

      const results = await optimizeImage(imagePath, relativePath, stats);
      manifest[relativePath] = results;

      totalOriginalSize += stats.size;
      results.optimized.forEach(opt => totalOptimizedSize += opt.size);
    }

    // Save manifest
    console.log(`\n${colors.yellow}📝 Saving manifest...${colors.reset}`);
    await fs.writeFile(
      CONFIG.manifestFile,
      JSON.stringify(manifest, null, 2),
      'utf8'
    );

    // Generate Next.js configuration
    const loaderConfig = generateImageLoaderConfig(manifest);
    await fs.writeFile(
      path.join(process.cwd(), 'lib', 'image-loader-config.json'),
      JSON.stringify(loaderConfig, null, 2),
      'utf8'
    );

    // Print summary
    console.log(`\n${colors.blue}╔════════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.blue}║              Optimization Summary           ║${colors.reset}`);
    console.log(`${colors.blue}╚════════════════════════════════════════════╝${colors.reset}\n`);

    const totalReduction = ((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1);
    console.log(`${colors.green}✓${colors.reset} Images processed: ${imageFiles.length}`);
    console.log(`${colors.green}✓${colors.reset} Original size: ${(totalOriginalSize / (1024 * 1024)).toFixed(2)}MB`);
    console.log(`${colors.green}✓${colors.reset} Optimized size: ${(totalOptimizedSize / (1024 * 1024)).toFixed(2)}MB`);
    console.log(`${colors.green}✓${colors.reset} Size reduction: ${totalReduction}%`);
    console.log(`${colors.green}✓${colors.reset} Formats created: WebP + JPEG fallbacks`);
    console.log(`${colors.green}✓${colors.reset} Responsive sizes: ${CONFIG.sizes.join('w, ')}w`);
    console.log(`${colors.green}✓${colors.reset} Blur placeholders: Generated`);

    // Performance recommendations
    console.log(`\n${colors.cyan}📊 Performance Recommendations:${colors.reset}`);
    console.log(`  • Use <Image> component with priority={true} for hero images`);
    console.log(`  • Implement lazy loading for below-fold images`);
    console.log(`  • Serve WebP with JPEG fallbacks using <picture> element`);
    console.log(`  • Use blur placeholders for smooth loading experience`);
    console.log(`  • Consider CDN with automatic WebP conversion`);

    // LCP estimation
    const largestHeroSize = Math.max(...imageFiles
      .filter(f => CONFIG.heroImages.some(hero =>
        f.path.toLowerCase().includes(hero.toLowerCase())
      ))
      .map(f => f.stats.size)
    );

    const optimizedHeroSize = largestHeroSize * 0.3; // Assuming 70% reduction
    const estimatedLCP = 0.5 + (optimizedHeroSize / (1024 * 1024)) * 2; // Rough estimation

    console.log(`\n${colors.green}🎯 Estimated LCP with optimizations: ${estimatedLCP.toFixed(1)}s${colors.reset}`);
    if (estimatedLCP < 2.5) {
      console.log(`${colors.green}✓ Target LCP of <2.5s should be achievable!${colors.reset}`);
    } else {
      console.log(`${colors.yellow}⚠ Additional optimizations may be needed for <2.5s LCP${colors.reset}`);
    }

  } catch (error) {
    console.error(`${colors.red}Error during optimization:${colors.reset}`, error);
    process.exit(1);
  }
}

// Run the optimization
optimizeAllImages()
  .then(() => {
    console.log(`\n${colors.green}✅ Image optimization complete!${colors.reset}\n`);
  })
  .catch(error => {
    console.error(`\n${colors.red}❌ Optimization failed:${colors.reset}`, error);
    process.exit(1);
  });