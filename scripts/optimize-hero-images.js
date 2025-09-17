/**
 * Emergency Image Optimization Script
 * Fixes the critical 2MB hero image issue immediately
 *
 * Usage: node scripts/optimize-hero-images.js
 */

const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// Check if sharp is installed
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.log('⚠️  Sharp not installed. Installing now...');
  console.log('Run: npm install sharp --save-dev');
  process.exit(1);
}

const HERO_DIR = path.join(process.cwd(), 'public/images/hero');
const MAX_FILE_SIZE = 300 * 1024; // 300KB max for hero images

async function getFileSize(filePath) {
  const stats = await fs.stat(filePath);
  return stats.size;
}

async function formatFileSize(bytes) {
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(2)}MB` : `${(bytes / 1024).toFixed(0)}KB`;
}

async function optimizeHeroImages() {
  console.log('🚀 Starting Hero Image Optimization...\n');

  try {
    const files = await fs.readdir(HERO_DIR);
    const imageFiles = files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

    console.log(`Found ${imageFiles.length} images in hero directory\n`);

    for (const file of imageFiles) {
      const inputPath = path.join(HERO_DIR, file);
      const originalSize = await getFileSize(inputPath);
      const formattedSize = await formatFileSize(originalSize);

      console.log(`📸 Processing: ${file}`);
      console.log(`   Original size: ${formattedSize}`);

      // Skip if already optimized
      if (originalSize <= MAX_FILE_SIZE && !file.includes('hero-disaster-tornado')) {
        console.log(`   ✅ Already optimized\n`);
        continue;
      }

      const baseName = path.basename(file, path.extname(file));
      const isHeroTornado = file.includes('hero-disaster-tornado');

      try {
        // Create optimized versions
        const operations = [];

        // 1. WebP version (best compression)
        const webpPath = path.join(HERO_DIR, `${baseName}.webp`);
        operations.push(
          sharp(inputPath)
            .resize(1920, 1080, {
              fit: 'cover',
              position: 'center'
            })
            .webp({
              quality: isHeroTornado ? 80 : 85,
              effort: 6
            })
            .toFile(webpPath)
            .then(async () => {
              const size = await getFileSize(webpPath);
              console.log(`   ✅ WebP created: ${await formatFileSize(size)}`);
            })
        );

        // 2. Mobile WebP version
        const mobileWebpPath = path.join(HERO_DIR, `${baseName}-mobile.webp`);
        operations.push(
          sharp(inputPath)
            .resize(768, 432, {
              fit: 'cover',
              position: 'center'
            })
            .webp({
              quality: 75,
              effort: 6
            })
            .toFile(mobileWebpPath)
            .then(async () => {
              const size = await getFileSize(mobileWebpPath);
              console.log(`   ✅ Mobile WebP: ${await formatFileSize(size)}`);
            })
        );

        // 3. Optimized JPG fallback (for older browsers)
        if (path.extname(file).toLowerCase() !== '.jpg') {
          const jpgPath = path.join(HERO_DIR, `${baseName}-optimized.jpg`);
          operations.push(
            sharp(inputPath)
              .resize(1920, 1080, {
                fit: 'cover',
                position: 'center'
              })
              .jpeg({
                quality: 85,
                progressive: true,
                mozjpeg: true
              })
              .toFile(jpgPath)
              .then(async () => {
                const size = await getFileSize(jpgPath);
                console.log(`   ✅ JPG fallback: ${await formatFileSize(size)}`);
              })
          );
        }

        // 4. If PNG, create optimized PNG
        if (path.extname(file).toLowerCase() === '.png') {
          const pngPath = path.join(HERO_DIR, `${baseName}-optimized.png`);
          operations.push(
            sharp(inputPath)
              .resize(1920, 1080, {
                fit: 'cover',
                position: 'center'
              })
              .png({
                compressionLevel: 9,
                palette: true,
                quality: 85,
                effort: 10
              })
              .toFile(pngPath)
              .then(async () => {
                const size = await getFileSize(pngPath);
                console.log(`   ✅ PNG optimized: ${await formatFileSize(size)}`);
              })
          );
        }

        // 5. Create blur placeholder
        const placeholderPath = path.join(HERO_DIR, `${baseName}-placeholder.jpg`);
        operations.push(
          sharp(inputPath)
            .resize(20, 11, {
              fit: 'cover'
            })
            .blur(5)
            .jpeg({
              quality: 50
            })
            .toFile(placeholderPath)
            .then(async () => {
              console.log(`   ✅ Blur placeholder created`);
            })
        );

        await Promise.all(operations);

        // Calculate savings
        const webpSize = await getFileSize(path.join(HERO_DIR, `${baseName}.webp`));
        const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
        console.log(`   💰 Size reduction: ${savings}%\n`);

      } catch (error) {
        console.error(`   ❌ Error processing ${file}:`, error.message);
      }
    }

    console.log('\n✨ Hero Image Optimization Complete!');
    console.log('\n📝 Next Steps:');
    console.log('1. Update your components to use the .webp versions');
    console.log('2. Implement <picture> element for browser fallbacks');
    console.log('3. Use the -mobile versions for mobile viewports');
    console.log('4. Add lazy loading for below-the-fold images');

    // Generate implementation example
    console.log('\n📄 Example Implementation:');
    console.log(`
<picture>
  <source
    srcSet="/images/hero/hero-disaster-tornado-mobile.webp"
    media="(max-width: 768px)"
    type="image/webp"
  />
  <source
    srcSet="/images/hero/hero-disaster-tornado.webp"
    type="image/webp"
  />
  <img
    src="/images/hero/hero-disaster-tornado-optimized.jpg"
    alt="Disaster Recovery Services"
    loading="eager"
    priority
  />
</picture>
`);

  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run the optimization
optimizeHeroImages().catch(console.error);