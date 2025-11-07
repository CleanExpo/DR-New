#!/usr/bin/env node

/**
 * WebP Image Conversion Script
 * Converts all images to WebP format with optimal compression
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const glob = require('glob');
const ora = require('ora');
const chalk = require('chalk');

class WebPConverter {
  constructor() {
    this.convertedCount = 0;
    this.skippedCount = 0;
    this.errorCount = 0;
    this.totalSaved = 0;
    this.spinner = ora();
  }

  /**
   * Convert single image to WebP
   */
  async convertToWebP(inputPath, options = {}) {
    const outputPath = inputPath.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');

    // Skip if WebP already exists and is newer
    if (fs.existsSync(outputPath)) {
      const inputStats = fs.statSync(inputPath);
      const outputStats = fs.statSync(outputPath);

      if (outputStats.mtime > inputStats.mtime) {
        this.skippedCount++;
        return null;
      }
    }

    try {
      const inputStats = fs.statSync(inputPath);
      const inputSize = inputStats.size;

      // Configure Sharp for optimal WebP conversion
      const sharpInstance = sharp(inputPath);
      const metadata = await sharpInstance.metadata();

      // Determine quality based on image type and size
      let quality = 85;
      if (metadata.width && metadata.width > 2000) {
        quality = 80;
      }
      if (inputSize > 500000) { // > 500KB
        quality = 75;
      }

      // Convert to WebP with optimizations
      await sharpInstance
        .webp({
          quality: options.quality || quality,
          lossless: options.lossless || false,
          nearLossless: options.nearLossless || false,
          smartSubsample: true,
          effort: 6, // Higher effort = better compression
          ...options
        })
        .toFile(outputPath);

      const outputStats = fs.statSync(outputPath);
      const outputSize = outputStats.size;
      const savedBytes = inputSize - outputSize;
      const savedPercent = ((savedBytes / inputSize) * 100).toFixed(2);

      this.convertedCount++;
      this.totalSaved += savedBytes;

      return {
        input: inputPath,
        output: outputPath,
        inputSize,
        outputSize,
        savedBytes,
        savedPercent
      };
    } catch (error) {
      console.error(chalk.red(`Error converting ${inputPath}:`), error.message);
      this.errorCount++;
      return null;
    }
  }

  /**
   * Create responsive image versions
   */
  async createResponsiveVersions(inputPath) {
    const dir = path.dirname(inputPath);
    const filename = path.basename(inputPath, path.extname(inputPath));
    const sizes = [
      { width: 640, suffix: 'sm' },
      { width: 1024, suffix: 'md' },
      { width: 1920, suffix: 'lg' },
      { width: 2560, suffix: 'xl' }
    ];

    for (const size of sizes) {
      const outputPath = path.join(dir, `${filename}-${size.suffix}.webp`);

      try {
        await sharp(inputPath)
          .resize(size.width, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          .webp({
            quality: 85,
            smartSubsample: true,
            effort: 6
          })
          .toFile(outputPath);
      } catch (error) {
        console.error(chalk.red(`Error creating responsive version ${size.suffix}:`), error.message);
      }
    }
  }

  /**
   * Generate AVIF versions for modern browsers
   */
  async createAVIFVersion(inputPath) {
    const outputPath = inputPath.replace(/\.(jpg|jpeg|png|gif)$/i, '.avif');

    try {
      await sharp(inputPath)
        .avif({
          quality: 80,
          effort: 9,
          chromaSubsampling: '4:2:0'
        })
        .toFile(outputPath);

      return outputPath;
    } catch (error) {
      console.error(chalk.red(`Error creating AVIF version:`), error.message);
      return null;
    }
  }

  /**
   * Optimize images in place (reduce size without format change)
   */
  async optimizeInPlace(inputPath) {
    const tempPath = inputPath + '.tmp';
    const ext = path.extname(inputPath).toLowerCase();

    try {
      const sharpInstance = sharp(inputPath);
      const metadata = await sharpInstance.metadata();

      // Apply optimizations based on format
      if (ext === '.jpg' || ext === '.jpeg') {
        await sharpInstance
          .jpeg({
            quality: 85,
            progressive: true,
            mozjpeg: true
          })
          .toFile(tempPath);
      } else if (ext === '.png') {
        await sharpInstance
          .png({
            compressionLevel: 9,
            palette: true,
            quality: 85
          })
          .toFile(tempPath);
      }

      // Compare sizes and replace if smaller
      const originalSize = fs.statSync(inputPath).size;
      const optimizedSize = fs.statSync(tempPath).size;

      if (optimizedSize < originalSize) {
        fs.renameSync(tempPath, inputPath);
        return originalSize - optimizedSize;
      } else {
        fs.unlinkSync(tempPath);
        return 0;
      }
    } catch (error) {
      if (fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
      }
      return 0;
    }
  }

  /**
   * Process all images in directory
   */
  async processDirectory(directory, options = {}) {
    console.log(chalk.blue(`\n🔍 Scanning for images in ${directory}...\n`));

    const patterns = [
      path.join(directory, '**/*.{jpg,jpeg,png,gif}'),
      path.join(directory, '**/*.{JPG,JPEG,PNG,GIF}')
    ];

    const files = [];
    for (const pattern of patterns) {
      const matches = glob.sync(pattern, {
        ignore: ['**/node_modules/**', '**/.next/**', '**/dist/**']
      });
      files.push(...matches);
    }

    // Remove duplicates
    const uniqueFiles = [...new Set(files)];

    console.log(chalk.green(`Found ${uniqueFiles.length} images to process\n`));

    for (let i = 0; i < uniqueFiles.length; i++) {
      const file = uniqueFiles[i];
      const progress = `[${i + 1}/${uniqueFiles.length}]`;

      this.spinner.start(`${progress} Converting ${path.basename(file)}...`);

      // Convert to WebP
      const result = await this.convertToWebP(file, options);

      // Create responsive versions if requested
      if (options.responsive && result) {
        await this.createResponsiveVersions(file);
      }

      // Create AVIF version if requested
      if (options.avif) {
        await this.createAVIFVersion(file);
      }

      // Optimize original if requested
      if (options.optimizeOriginal) {
        await this.optimizeInPlace(file);
      }

      if (result) {
        this.spinner.succeed(
          `${progress} ${path.basename(file)} → WebP (saved ${result.savedPercent}%)`
        );
      } else if (this.skippedCount > 0) {
        this.spinner.info(`${progress} ${path.basename(file)} (already converted)`);
      }
    }

    this.printSummary();
  }

  /**
   * Print conversion summary
   */
  printSummary() {
    console.log(chalk.blue('\n' + '='.repeat(50)));
    console.log(chalk.blue('📊 CONVERSION SUMMARY'));
    console.log(chalk.blue('='.repeat(50)));
    console.log(chalk.green(`✅ Converted: ${this.convertedCount} images`));
    console.log(chalk.yellow(`⏭️  Skipped: ${this.skippedCount} images`));
    console.log(chalk.red(`❌ Errors: ${this.errorCount} images`));
    console.log(chalk.cyan(`💾 Total saved: ${this.formatBytes(this.totalSaved)}`));
    console.log(chalk.blue('='.repeat(50) + '\n'));
  }

  /**
   * Format bytes to human readable
   */
  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

// CLI Interface
async function main() {
  const converter = new WebPConverter();
  const args = process.argv.slice(2);

  const options = {
    quality: 85,
    lossless: args.includes('--lossless'),
    responsive: args.includes('--responsive'),
    avif: args.includes('--avif'),
    optimizeOriginal: args.includes('--optimize-original')
  };

  // Parse quality argument
  const qualityIndex = args.indexOf('--quality');
  if (qualityIndex !== -1 && args[qualityIndex + 1]) {
    options.quality = parseInt(args[qualityIndex + 1]);
  }

  // Determine directory
  let directory = './public';
  const dirIndex = args.indexOf('--dir');
  if (dirIndex !== -1 && args[dirIndex + 1]) {
    directory = args[dirIndex + 1];
  } else if (args[0] && !args[0].startsWith('--')) {
    directory = args[0];
  }

  console.log(chalk.cyan('\n🚀 WebP Image Converter'));
  console.log(chalk.gray('Converting images for optimal web performance...\n'));

  if (options.lossless) {
    console.log(chalk.yellow('Mode: Lossless compression'));
  } else {
    console.log(chalk.yellow(`Mode: Lossy compression (quality: ${options.quality})`));
  }

  if (options.responsive) {
    console.log(chalk.yellow('Creating responsive versions'));
  }

  if (options.avif) {
    console.log(chalk.yellow('Creating AVIF versions'));
  }

  await converter.processDirectory(directory, options);
}

// Check if sharp is installed
try {
  require('sharp');
} catch (error) {
  console.error(chalk.red('\n❌ Sharp is not installed!'));
  console.log(chalk.yellow('Please install it with: npm install sharp\n'));
  process.exit(1);
}

// Run if executed directly
if (require.main === module) {
  main().catch(error => {
    console.error(chalk.red('\n❌ Fatal error:'), error);
    process.exit(1);
  });
}

module.exports = WebPConverter;