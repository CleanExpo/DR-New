#!/usr/bin/env node

/**
 * Simple Image Optimization Configuration Generator
 *
 * Creates a configuration file for Next.js image optimization
 * without requiring sharp library installation
 */

const fs = require('fs').promises;
const path = require('path');

// Configuration
const CONFIG = {
  inputDir: path.join(process.cwd(), 'public', 'images'),
  outputConfig: path.join(process.cwd(), 'lib', 'image-config.json'),
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
  skipDirs: ['optimized', 'favicons'],
  sizes: [320, 640, 1024, 1920]
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
        files.push({
          path: fullPath,
          relativePath: relativePath.replace(/\\/g, '/'),
          stats,
          isHero: CONFIG.heroImages.some(hero =>
            fullPath.toLowerCase().includes(hero.toLowerCase())
          )
        });
      }
    }
  }

  return files;
}

/**
 * Generate image configuration
 */
async function generateImageConfig() {
  console.log(`\n${colors.blue}╔════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.blue}║  Image Configuration for Disaster Recovery  ║${colors.reset}`);
  console.log(`${colors.blue}╚════════════════════════════════════════════╝${colors.reset}\n`);

  try {
    // Get all image files
    console.log(`${colors.yellow}📁 Scanning for images...${colors.reset}`);
    const imageFiles = await getImageFiles(CONFIG.inputDir);
    console.log(`${colors.green}✓${colors.reset} Found ${imageFiles.length} images\n`);

    // Sort to process hero images first
    imageFiles.sort((a, b) => {
      if (a.isHero && !b.isHero) return -1;
      if (!a.isHero && b.isHero) return 1;
      return 0;
    });

    // Generate configuration
    const imageConfig = {
      images: {},
      heroImages: [],
      recommendations: {},
      totalSize: 0,
      largestImages: []
    };

    let totalSize = 0;
    const largeImages = [];

    for (const { relativePath, stats, isHero } of imageFiles) {
      const sizeInKB = stats.size / 1024;
      totalSize += stats.size;

      // Determine optimal settings based on file size and type
      const recommendations = [];

      if (sizeInKB > 500) {
        recommendations.push('Convert to WebP format');
        recommendations.push('Reduce dimensions if possible');
        largeImages.push({ path: relativePath, size: sizeInKB });
      }

      if (sizeInKB > 200) {
        recommendations.push('Apply compression (quality: 80-85)');
      }

      if (isHero) {
        recommendations.push('Use priority loading');
        recommendations.push('Generate blur placeholder');
        imageConfig.heroImages.push(relativePath);
      } else {
        recommendations.push('Implement lazy loading');
      }

      imageConfig.images[relativePath] = {
        originalSize: stats.size,
        sizeInKB: sizeInKB.toFixed(1),
        isHero,
        recommendations,
        suggestedSizes: CONFIG.sizes.join(', '),
        priority: isHero
      };

      console.log(`${isHero ? '🌟 ' : '  '}${relativePath} (${sizeInKB.toFixed(1)}KB)`);
    }

    imageConfig.totalSize = totalSize;
    imageConfig.totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);
    imageConfig.largestImages = largeImages
      .sort((a, b) => b.size - a.size)
      .slice(0, 10);

    // Save configuration
    await fs.mkdir(path.dirname(CONFIG.outputConfig), { recursive: true });
    await fs.writeFile(
      CONFIG.outputConfig,
      JSON.stringify(imageConfig, null, 2),
      'utf8'
    );

    // Print summary
    console.log(`\n${colors.blue}╔════════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.blue}║              Configuration Summary          ║${colors.reset}`);
    console.log(`${colors.blue}╚════════════════════════════════════════════╝${colors.reset}\n`);

    console.log(`${colors.green}✓${colors.reset} Total images: ${imageFiles.length}`);
    console.log(`${colors.green}✓${colors.reset} Hero images: ${imageConfig.heroImages.length}`);
    console.log(`${colors.green}✓${colors.reset} Total size: ${imageConfig.totalSizeMB}MB`);
    console.log(`${colors.green}✓${colors.reset} Config saved to: lib/image-config.json`);

    if (largeImages.length > 0) {
      console.log(`\n${colors.yellow}⚠ Large images requiring optimization:${colors.reset}`);
      largeImages.slice(0, 5).forEach(img => {
        console.log(`  • ${img.path} (${img.size.toFixed(1)}KB)`);
      });
    }

    // Next.js configuration recommendations
    console.log(`\n${colors.cyan}📋 Next.js Configuration Recommendations:${colors.reset}`);
    console.log(`
Add to next.config.js:

const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },
}
`);

    // Component usage examples
    console.log(`${colors.cyan}📝 Component Usage Examples:${colors.reset}`);
    console.log(`
// For hero images (priority loading):
<Image
  src="/images/hero/disaster-recovery-services.jpg"
  alt="24/7 Disaster Recovery Services in Brisbane"
  width={1920}
  height={1080}
  priority
  quality={85}
  sizes="100vw"
/>

// For regular images (lazy loading):
<Image
  src="/images/services/water-damage.jpg"
  alt="Professional water damage restoration"
  width={800}
  height={600}
  loading="lazy"
  quality={80}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
`);

    // Performance tips
    console.log(`${colors.cyan}⚡ Performance Optimization Tips:${colors.reset}`);
    console.log(`  1. Use next/image component for automatic optimization`);
    console.log(`  2. Set priority={true} for above-fold images`);
    console.log(`  3. Configure proper sizes attribute for responsive loading`);
    console.log(`  4. Consider using a CDN like Cloudinary or Imgix`);
    console.log(`  5. Enable image optimization in production build`);

    // LCP estimation
    const largestHeroSize = Math.max(...imageFiles
      .filter(f => f.isHero)
      .map(f => f.stats.size)
    );

    const estimatedLCP = 0.8 + (largestHeroSize / (1024 * 1024)) * 1.5;
    console.log(`\n${colors.green}🎯 Current estimated LCP: ${estimatedLCP.toFixed(1)}s${colors.reset}`);

    if (estimatedLCP > 2.5) {
      console.log(`${colors.yellow}⚠ To achieve <2.5s LCP, consider:${colors.reset}`);
      console.log(`  • Converting large hero images to WebP`);
      console.log(`  • Reducing hero image dimensions to max 1920x1080`);
      console.log(`  • Using next/image with priority loading`);
      console.log(`  • Implementing resource hints (preload, prefetch)`);
      console.log(`  • Using a CDN with image optimization`);
    } else {
      console.log(`${colors.green}✓ With Next.js image optimization, <2.5s LCP is achievable!${colors.reset}`);
    }

  } catch (error) {
    console.error(`${colors.red}Error generating configuration:${colors.reset}`, error);
    process.exit(1);
  }
}

// Run the configuration generator
generateImageConfig()
  .then(() => {
    console.log(`\n${colors.green}✅ Image configuration complete!${colors.reset}\n`);
    console.log(`Next steps:`);
    console.log(`1. Update next.config.js with recommended settings`);
    console.log(`2. Replace <img> tags with Next.js <Image> component`);
    console.log(`3. Add priority={true} to hero images`);
    console.log(`4. Consider using an image CDN for automatic optimization`);
  })
  .catch(error => {
    console.error(`\n${colors.red}❌ Configuration failed:${colors.reset}`, error);
    process.exit(1);
  });