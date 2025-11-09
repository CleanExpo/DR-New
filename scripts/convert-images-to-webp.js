const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const SOURCE_DIR = path.join(__dirname, '..', 'public', 'images');
const QUALITY = 85;

async function getAllImageFiles(dir, fileList = []) {
  const files = await fs.readdir(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      await getAllImageFiles(filePath, fileList);
    } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
      fileList.push(filePath);
    }
  }

  return fileList;
}

async function convertToWebP(imagePath) {
  try {
    const ext = path.extname(imagePath);
    const webpPath = imagePath.replace(ext, '.webp');
    const avifPath = imagePath.replace(ext, '.avif');

    // Check if already converted
    try {
      await fs.access(webpPath);
      console.log(`Already exists: ${path.basename(webpPath)}`);
      return;
    } catch {
      // File doesn't exist, proceed with conversion
    }

    // Convert to WebP
    await sharp(imagePath)
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(webpPath);

    // Convert to AVIF (smaller but slower)
    await sharp(imagePath)
      .avif({ quality: QUALITY, effort: 6 })
      .toFile(avifPath);

    const originalSize = (await fs.stat(imagePath)).size;
    const webpSize = (await fs.stat(webpPath)).size;
    const avifSize = (await fs.stat(avifPath)).size;

    const savings = ((originalSize - Math.min(webpSize, avifSize)) / originalSize * 100).toFixed(1);

    console.log(`✓ ${path.basename(imagePath)} → WebP: ${(webpSize/1024).toFixed(1)}KB, AVIF: ${(avifSize/1024).toFixed(1)}KB (${savings}% smaller)`);

  } catch (error) {
    console.error(`✗ Failed to convert ${imagePath}:`, error.message);
  }
}

async function main() {
  console.log('🖼️  Converting images to WebP/AVIF...\n');

  const imageFiles = await getAllImageFiles(SOURCE_DIR);
  console.log(`Found ${imageFiles.length} images to convert\n`);

  for (const imagePath of imageFiles) {
    await convertToWebP(imagePath);
  }

  console.log('\n✅ Image conversion complete!');
}

main().catch(console.error);
