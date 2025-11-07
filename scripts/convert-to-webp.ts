#!/usr/bin/env node

/**
 * Convert Images to WebP Script
 * Converts all JPG/PNG images to WebP format
 * Preserves originals and creates optimized versions
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import sharp from 'sharp';

interface ConversionResult {
  original: string;
  webp: string;
  originalSize: number;
  webpSize: number;
  savings: number;
  savingsPercent: number;
}

interface ConversionStats {
  total: number;
  converted: number;
  failed: number;
  totalOriginalSize: number;
  totalWebpSize: number;
  totalSavings: number;
  results: ConversionResult[];
}

class ImageConverter {
  private projectRoot: string;
  private stats: ConversionStats;
  private quality: number;
  private skipExisting: boolean;

  constructor(
    projectRoot: string,
    quality: number = 80,
    skipExisting: boolean = true
  ) {
    this.projectRoot = projectRoot;
    this.quality = quality;
    this.skipExisting = skipExisting;
    this.stats = {
      total: 0,
      converted: 0,
      failed: 0,
      totalOriginalSize: 0,
      totalWebpSize: 0,
      totalSavings: 0,
      results: [],
    };
  }

  /**
   * Convert all images in public/images
   */
  async convertAll(): Promise<ConversionStats> {
    console.log('🎨 Starting image conversion to WebP...\n');
    console.log(`Quality: ${this.quality}%`);
    console.log(`Skip existing: ${this.skipExisting}\n`);

    // Find all JPG and PNG images
    const patterns = [
      'public/images/**/*.jpg',
      'public/images/**/*.jpeg',
      'public/images/**/*.png',
    ];

    let allImages: string[] = [];
    for (const pattern of patterns) {
      const images = await glob(pattern, { cwd: this.projectRoot });
      allImages = allImages.concat(images);
    }

    this.stats.total = allImages.length;
    console.log(`📁 Found ${allImages.length} images to convert\n`);

    // Convert each image
    for (const imagePath of allImages) {
      await this.convertImage(imagePath);
    }

    this.printSummary();
    return this.stats;
  }

  /**
   * Convert a single image to WebP
   */
  private async convertImage(imagePath: string): Promise<void> {
    const fullPath = path.join(this.projectRoot, imagePath);
    const webpPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

    try {
      // Skip if WebP already exists and skipExisting is true
      if (this.skipExisting && fs.existsSync(webpPath)) {
        console.log(`⏭️  Skipping (exists): ${path.relative(this.projectRoot, fullPath)}`);
        return;
      }

      // Get original file size
      const originalStats = fs.statSync(fullPath);
      const originalSize = originalStats.size;

      // Convert to WebP
      await sharp(fullPath)
        .webp({ quality: this.quality })
        .toFile(webpPath);

      // Get WebP file size
      const webpStats = fs.statSync(webpPath);
      const webpSize = webpStats.size;

      // Calculate savings
      const savings = originalSize - webpSize;
      const savingsPercent = (savings / originalSize) * 100;

      // Record result
      const result: ConversionResult = {
        original: path.relative(this.projectRoot, fullPath),
        webp: path.relative(this.projectRoot, webpPath),
        originalSize,
        webpSize,
        savings,
        savingsPercent,
      };

      this.stats.results.push(result);
      this.stats.converted++;
      this.stats.totalOriginalSize += originalSize;
      this.stats.totalWebpSize += webpSize;
      this.stats.totalSavings += savings;

      console.log(`✅ ${result.original}`);
      console.log(`   → ${this.formatBytes(originalSize)} → ${this.formatBytes(webpSize)} (${savingsPercent.toFixed(1)}% savings)\n`);
    } catch (error) {
      this.stats.failed++;
      console.error(`❌ Failed to convert ${imagePath}:`, error);
    }
  }

  /**
   * Format bytes to human-readable
   */
  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }

  /**
   * Print conversion summary
   */
  private printSummary(): void {
    console.log('\n' + '='.repeat(80));
    console.log('📊 CONVERSION SUMMARY');
    console.log('='.repeat(80));
    console.log(`\nTotal images: ${this.stats.total}`);
    console.log(`Converted: ${this.stats.converted}`);
    console.log(`Failed: ${this.stats.failed}`);
    console.log(`Skipped: ${this.stats.total - this.stats.converted - this.stats.failed}`);
    console.log(`\nOriginal total size: ${this.formatBytes(this.stats.totalOriginalSize)}`);
    console.log(`WebP total size: ${this.formatBytes(this.stats.totalWebpSize)}`);
    console.log(`Total savings: ${this.formatBytes(this.stats.totalSavings)}`);

    if (this.stats.totalOriginalSize > 0) {
      const totalSavingsPercent = (this.stats.totalSavings / this.stats.totalOriginalSize) * 100;
      console.log(`Average savings: ${totalSavingsPercent.toFixed(1)}%`);
    }

    console.log('\n' + '='.repeat(80) + '\n');

    // Show top savings
    if (this.stats.results.length > 0) {
      console.log('🏆 Top 10 Space Savings:\n');
      const sorted = [...this.stats.results].sort((a, b) => b.savings - a.savings);
      sorted.slice(0, 10).forEach((result, index) => {
        console.log(`${index + 1}. ${result.original}`);
        console.log(`   Saved: ${this.formatBytes(result.savings)} (${result.savingsPercent.toFixed(1)}%)\n`);
      });
    }
  }

  /**
   * Save results to JSON
   */
  saveResults(outputPath: string): void {
    fs.writeFileSync(outputPath, JSON.stringify(this.stats, null, 2));
    console.log(`💾 Results saved to: ${outputPath}`);
  }
}

/**
 * Optimize images with responsive sizes
 */
class ResponsiveImageGenerator {
  private projectRoot: string;
  private sizes: number[];

  constructor(projectRoot: string, sizes: number[] = [640, 768, 1024, 1280, 1920]) {
    this.projectRoot = projectRoot;
    this.sizes = sizes;
  }

  /**
   * Generate responsive variants for all images
   */
  async generateResponsiveImages(imagePattern: string = 'public/images/**/*.{jpg,jpeg,png,webp}'): Promise<void> {
    console.log('🖼️  Generating responsive image variants...\n');

    const images = await glob(imagePattern, { cwd: this.projectRoot });

    for (const imagePath of images) {
      await this.generateVariants(imagePath);
    }
  }

  /**
   * Generate variants for a single image
   */
  private async generateVariants(imagePath: string): Promise<void> {
    const fullPath = path.join(this.projectRoot, imagePath);
    const parsed = path.parse(fullPath);
    const dir = parsed.dir;
    const name = parsed.name;
    const ext = parsed.ext;

    try {
      // Get original dimensions
      const metadata = await sharp(fullPath).metadata();
      const originalWidth = metadata.width || 0;

      console.log(`Processing: ${imagePath}`);

      // Generate each size
      for (const size of this.sizes) {
        // Skip if size is larger than original
        if (size > originalWidth) continue;

        const outputPath = path.join(dir, `${name}-${size}w${ext}`);

        // Skip if already exists
        if (fs.existsSync(outputPath)) {
          console.log(`  ⏭️  ${size}w (exists)`);
          continue;
        }

        await sharp(fullPath)
          .resize(size, null, { withoutEnlargement: true })
          .toFile(outputPath);

        console.log(`  ✅ ${size}w`);
      }

      console.log('');
    } catch (error) {
      console.error(`❌ Failed to generate variants for ${imagePath}:`, error);
    }
  }
}

/**
 * Main execution
 */
async function main() {
  const projectRoot = process.cwd();
  const args = process.argv.slice(2);

  const quality = parseInt(args.find(arg => arg.startsWith('--quality='))?.split('=')[1] || '80');
  const skipExisting = !args.includes('--overwrite');
  const generateResponsive = args.includes('--responsive');

  // Convert to WebP
  const converter = new ImageConverter(projectRoot, quality, skipExisting);
  const stats = await converter.convertAll();

  // Save results
  const resultsPath = path.join(projectRoot, 'webp-conversion-results.json');
  converter.saveResults(resultsPath);

  // Generate responsive variants if requested
  if (generateResponsive) {
    const responsiveGen = new ResponsiveImageGenerator(projectRoot);
    await responsiveGen.generateResponsiveImages();
  }

  // Exit
  if (stats.failed > 0) {
    console.log('\n⚠️  Conversion completed with errors');
    process.exit(1);
  } else {
    console.log('\n✅ All conversions completed successfully');
    process.exit(0);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export { ImageConverter, ResponsiveImageGenerator };
