const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const { glob } = require('glob');

// Configuration for optimal image optimization
const CONFIG = {
  quality: {
    webp: 85,
    avif: 80,
    jpg: 85
  },
  sizes: {
    // Mobile first responsive sizes
    thumbnail: { width: 400, suffix: '-400w' },
    mobile: { width: 768, suffix: '-768w' },
    tablet: { width: 1024, suffix: '-1024w' },
    desktop: { width: 1920, suffix: '-1920w' },
    retina: { width: 2560, suffix: '-2560w' }
  },
  formats: ['webp', 'avif'], // Next-gen formats
  maxFileSize: 200 * 1024, // 200KB max for web images
  publicDir: path.join(process.cwd(), 'public'),
  outputDir: path.join(process.cwd(), 'public', 'optimized')
};

// Ensure Sharp is properly configured for Windows
if (process.platform === 'win32') {
  sharp.cache(false);
}

class ImageOptimizer {
  constructor() {
    this.stats = {
      processed: 0,
      skipped: 0,
      errors: 0,
      totalSaved: 0,
      largestReduction: 0,
      largestFile: ''
    };
  }

  async initialize() {
    // Create output directories
    await fs.mkdir(CONFIG.outputDir, { recursive: true });

    for (const size of Object.keys(CONFIG.sizes)) {
      await fs.mkdir(path.join(CONFIG.outputDir, size), { recursive: true });
    }

    console.log('🚀 Image Optimizer initialized');
    console.log(`📁 Output directory: ${CONFIG.outputDir}`);
  }

  async optimizeImage(imagePath) {
    try {
      const stats = await fs.stat(imagePath);
      const originalSize = stats.size;
      const filename = path.basename(imagePath, path.extname(imagePath));
      const ext = path.extname(imagePath).toLowerCase();

      console.log(`\n📸 Processing: ${path.basename(imagePath)} (${this.formatBytes(originalSize)})`);

      // Skip if already optimized
      if (imagePath.includes('/optimized/')) {
        this.stats.skipped++;
        console.log('  ⏭️  Already optimized, skipping');
        return;
      }

      // Load image with Sharp
      const image = sharp(imagePath);
      const metadata = await image.metadata();

      // Generate responsive images for each size
      for (const [sizeName, sizeConfig] of Object.entries(CONFIG.sizes)) {
        // Skip if image is smaller than target size
        if (metadata.width <= sizeConfig.width) {
          continue;
        }

        // Generate WebP version
        const webpPath = path.join(
          CONFIG.outputDir,
          sizeName,
          `${filename}${sizeConfig.suffix}.webp`
        );

        await image
          .clone()
          .resize(sizeConfig.width, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          .webp({
            quality: CONFIG.quality.webp,
            effort: 6, // Higher effort = better compression
            lossless: false,
            nearLossless: false,
            smartSubsample: true,
            reductionEffort: 6
          })
          .toFile(webpPath);

        const webpStats = await fs.stat(webpPath);
        console.log(`  ✅ WebP ${sizeName}: ${this.formatBytes(webpStats.size)}`);

        // Generate AVIF version (even better compression)
        const avifPath = path.join(
          CONFIG.outputDir,
          sizeName,
          `${filename}${sizeConfig.suffix}.avif`
        );

        await image
          .clone()
          .resize(sizeConfig.width, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          .avif({
            quality: CONFIG.quality.avif,
            effort: 9, // Max effort for best compression
            chromaSubsampling: '4:4:4'
          })
          .toFile(avifPath);

        const avifStats = await fs.stat(avifPath);
        console.log(`  ✅ AVIF ${sizeName}: ${this.formatBytes(avifStats.size)}`);

        // Also create optimized JPG fallback
        if (ext !== '.svg' && ext !== '.gif') {
          const jpgPath = path.join(
            CONFIG.outputDir,
            sizeName,
            `${filename}${sizeConfig.suffix}.jpg`
          );

          await image
            .clone()
            .resize(sizeConfig.width, null, {
              withoutEnlargement: true,
              fit: 'inside'
            })
            .jpeg({
              quality: CONFIG.quality.jpg,
              progressive: true,
              optimizeScans: true,
              mozjpeg: true
            })
            .toFile(jpgPath);

          const jpgStats = await fs.stat(jpgPath);
          console.log(`  ✅ JPG ${sizeName}: ${this.formatBytes(jpgStats.size)}`);
        }
      }

      // Create a base optimized version at original size
      const baseWebpPath = path.join(CONFIG.outputDir, `${filename}.webp`);
      await image
        .webp({ quality: CONFIG.quality.webp })
        .toFile(baseWebpPath);

      const baseStats = await fs.stat(baseWebpPath);
      const saved = originalSize - baseStats.size;
      const reduction = ((saved / originalSize) * 100).toFixed(1);

      console.log(`  💾 Saved: ${this.formatBytes(saved)} (${reduction}% reduction)`);

      this.stats.processed++;
      this.stats.totalSaved += saved;

      if (saved > this.stats.largestReduction) {
        this.stats.largestReduction = saved;
        this.stats.largestFile = path.basename(imagePath);
      }

    } catch (error) {
      console.error(`  ❌ Error processing ${imagePath}:`, error.message);
      this.stats.errors++;
    }
  }

  async processAllImages() {
    const patterns = [
      'public/images/**/*.{jpg,jpeg,png,webp}',
      'public/logos/**/*.{jpg,jpeg,png,webp}',
      'public/*.{jpg,jpeg,png,webp}'
    ];

    let allImages = [];
    for (const pattern of patterns) {
      const images = await glob(pattern, {
        cwd: process.cwd(),
        ignore: ['**/optimized/**', '**/node_modules/**']
      });
      allImages = allImages.concat(images);
    }

    console.log(`\n🔍 Found ${allImages.length} images to process\n`);

    for (const imagePath of allImages) {
      await this.optimizeImage(path.join(process.cwd(), imagePath));
    }

    this.printSummary();
  }

  async generatePictureComponent() {
    // Generate a React component for optimal image loading
    const componentCode = `
import React from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  loading?: 'lazy' | 'eager';
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
  loading = 'lazy'
}) => {
  const basePath = src.replace(/\\.[^/.]+$/, '');

  return (
    <picture className={className}>
      {/* AVIF - Best compression */}
      <source
        type="image/avif"
        srcSet={\`
          /optimized/thumbnail/\${basePath}-400w.avif 400w,
          /optimized/mobile/\${basePath}-768w.avif 768w,
          /optimized/tablet/\${basePath}-1024w.avif 1024w,
          /optimized/desktop/\${basePath}-1920w.avif 1920w,
          /optimized/retina/\${basePath}-2560w.avif 2560w
        \`}
        sizes={sizes}
      />

      {/* WebP - Good compression, wide support */}
      <source
        type="image/webp"
        srcSet={\`
          /optimized/thumbnail/\${basePath}-400w.webp 400w,
          /optimized/mobile/\${basePath}-768w.webp 768w,
          /optimized/tablet/\${basePath}-1024w.webp 1024w,
          /optimized/desktop/\${basePath}-1920w.webp 1920w,
          /optimized/retina/\${basePath}-2560w.webp 2560w
        \`}
        sizes={sizes}
      />

      {/* Fallback JPEG */}
      <img
        src={\`/optimized/desktop/\${basePath}-1920w.jpg\`}
        srcSet={\`
          /optimized/thumbnail/\${basePath}-400w.jpg 400w,
          /optimized/mobile/\${basePath}-768w.jpg 768w,
          /optimized/tablet/\${basePath}-1024w.jpg 1024w,
          /optimized/desktop/\${basePath}-1920w.jpg 1920w,
          /optimized/retina/\${basePath}-2560w.jpg 2560w
        \`}
        sizes={sizes}
        alt={alt}
        className={className}
        loading={loading}
        decoding="async"
      />
    </picture>
  );
};
`;

    const componentPath = path.join(process.cwd(), 'components', 'OptimizedImage.tsx');
    await fs.mkdir(path.dirname(componentPath), { recursive: true });
    await fs.writeFile(componentPath, componentCode.trim());

    console.log('\n✅ Generated OptimizedImage component at:', componentPath);
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 OPTIMIZATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Processed: ${this.stats.processed} images`);
    console.log(`⏭️  Skipped: ${this.stats.skipped} images`);
    console.log(`❌ Errors: ${this.stats.errors} images`);
    console.log(`💾 Total saved: ${this.formatBytes(this.stats.totalSaved)}`);
    console.log(`🏆 Largest reduction: ${this.formatBytes(this.stats.largestReduction)} (${this.stats.largestFile})`);
    console.log('='.repeat(60));
    console.log('\n🎉 Image optimization complete!');
    console.log('📌 Next steps:');
    console.log('   1. Update components to use OptimizedImage component');
    console.log('   2. Implement lazy loading with Intersection Observer');
    console.log('   3. Add blur placeholders for better UX');
    console.log('   4. Configure CDN for optimized images');
  }
}

// Run the optimizer
async function main() {
  console.log('🖼️  ADVANCED IMAGE OPTIMIZATION SYSTEM');
  console.log('=====================================\n');

  const optimizer = new ImageOptimizer();
  await optimizer.initialize();
  await optimizer.processAllImages();
  await optimizer.generatePictureComponent();
}

// Check if sharp is installed
try {
  require.resolve('sharp');
  main().catch(console.error);
} catch (error) {
  console.error('❌ Sharp is not installed. Installing now...');
  const { execSync } = require('child_process');
  execSync('npm install sharp --save-dev', { stdio: 'inherit' });
  console.log('✅ Sharp installed. Please run the script again.');
}