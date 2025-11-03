#!/usr/bin/env node

/**
 * Image Optimization and Metadata Tagging Script
 * Optimizes images, adds perfect metadata, and creates multiple formats
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeAndTagImage(inputPath, metadata) {
  const { dir, name } = path.parse(inputPath);

  console.log(`\n🎨 Processing: ${name}`);

  // Read original image
  const image = sharp(inputPath);
  const imageMetadata = await image.metadata();

  console.log(`📐 Original: ${imageMetadata.width}x${imageMetadata.height} (${imageMetadata.format})`);

  // Create metadata object
  const exifData = {
    Title: metadata.title,
    Description: metadata.description,
    Keywords: metadata.keywords.join(', '),
    Copyright: metadata.copyright,
    Creator: metadata.creator,
    Subject: metadata.subject,
    Location: metadata.location,
  };

  // Optimize and save in multiple formats

  // 1. Original PNG with metadata (lossless)
  await image
    .png({ quality: 100, compressionLevel: 9 })
    .withMetadata({
      exif: {
        IFD0: {
          Copyright: metadata.copyright,
          ImageDescription: metadata.description,
          Software: 'Disaster Recovery Image Processor',
        }
      }
    })
    .toFile(path.join(dir, `${name}-optimized.png`));
  console.log(`✅ PNG optimized`);

  // 2. WebP format (modern, excellent compression)
  await image
    .webp({ quality: 90, effort: 6 })
    .withMetadata({
      exif: {
        IFD0: {
          Copyright: metadata.copyright,
          ImageDescription: metadata.description,
        }
      }
    })
    .toFile(path.join(dir, `${name}.webp`));
  console.log(`✅ WebP created (90% quality)`);

  // 3. AVIF format (best compression, future-proof)
  await image
    .avif({ quality: 85, effort: 4 })
    .toFile(path.join(dir, `${name}.avif`));
  console.log(`✅ AVIF created (85% quality)`);

  // 4. JPG fallback (universal compatibility)
  await image
    .jpeg({ quality: 85, mozjpeg: true })
    .withMetadata({
      exif: {
        IFD0: {
          Copyright: metadata.copyright,
          ImageDescription: metadata.description,
        }
      }
    })
    .toFile(path.join(dir, `${name}.jpg`));
  console.log(`✅ JPG created (85% quality)`);

  // 5. Thumbnail (for previews)
  await image
    .resize(400, 300, { fit: 'cover' })
    .webp({ quality: 80 })
    .toFile(path.join(dir, `${name}-thumb.webp`));
  console.log(`✅ Thumbnail created (400x300)`);

  // Create metadata JSON file
  const metadataFile = {
    ...metadata,
    originalFile: `${name}.png`,
    formats: {
      webp: `${name}.webp`,
      avif: `${name}.avif`,
      jpg: `${name}.jpg`,
      thumbnail: `${name}-thumb.webp`,
    },
    dimensions: {
      width: imageMetadata.width,
      height: imageMetadata.height,
    },
    processed: new Date().toISOString(),
  };

  fs.writeFileSync(
    path.join(dir, `${name}-metadata.json`),
    JSON.stringify(metadataFile, null, 2)
  );
  console.log(`✅ Metadata JSON saved`);

  // Get file sizes
  const sizes = {};
  for (const [format, filename] of Object.entries(metadataFile.formats)) {
    const filepath = path.join(dir, filename);
    if (fs.existsSync(filepath)) {
      const stats = fs.statSync(filepath);
      sizes[format] = `${(stats.size / 1024).toFixed(2)} KB`;
    }
  }

  console.log('\n📊 File Sizes:');
  Object.entries(sizes).forEach(([format, size]) => {
    console.log(`   ${format.toUpperCase()}: ${size}`);
  });

  console.log('\n✨ Image optimization complete!\n');
}

// Metadata for the Brisbane premium suburb hero image
const metadata = {
  title: 'Brisbane Premium Suburb - Disaster Recovery Services',
  description: 'Luxury residential neighborhood in Brisbane showing high-end Queenslander homes with lush tropical landscaping. Professional disaster recovery services protecting premium properties across Brisbane, Ipswich, and surrounding areas.',
  keywords: [
    'Brisbane suburbs',
    'luxury homes Brisbane',
    'Queenslander homes',
    'premium properties',
    'disaster recovery Brisbane',
    'water damage restoration',
    'Ascot Brisbane',
    'Hamilton Brisbane',
    'New Farm Brisbane',
    'residential restoration',
    'emergency services',
    'IICRC certified',
    '24/7 emergency',
    'high-end property protection',
    'Brisbane property services',
  ],
  subject: 'Brisbane Premium Residential Properties',
  copyright: '© 2025 Disaster Recovery. All rights reserved.',
  creator: 'Disaster Recovery',
  location: 'Brisbane, Queensland, Australia',
  geoLocation: {
    city: 'Brisbane',
    state: 'Queensland',
    country: 'Australia',
    latitude: '-27.4705',
    longitude: '153.0260',
  },
  altText: 'Aerial view of luxury Brisbane residential neighborhood with Queenslander homes, lush tropical landscaping, and tree-lined streets showing premium properties protected by Disaster Recovery services',
  seoFilename: 'brisbane-premium-suburb-hero',
  usedOn: [
    '/locations/ascot-disaster-recovery',
    '/locations/hamilton-disaster-recovery',
    '/locations/new-farm-disaster-recovery',
    '/locations/teneriffe-disaster-recovery',
    '/locations/brookfield-disaster-recovery',
    '/locations/chapel-hill-disaster-recovery',
    '/locations/fig-tree-pocket-disaster-recovery',
    '/locations/pullenvale-disaster-recovery',
    '/locations/ipswich-cbd-disaster-recovery',
    '/locations/springfield-lakes-disaster-recovery',
    '/locations/indooroopilly-disaster-recovery',
    '/locations/toowong-disaster-recovery',
    '/locations/west-end-disaster-recovery',
    '/locations/kangaroo-point-disaster-recovery',
    '/locations/bulimba-disaster-recovery',
    '/locations/camp-hill-disaster-recovery',
    '/locations/carina-disaster-recovery',
    '/locations/carindale-disaster-recovery',
    '/locations/chermside-disaster-recovery',
    '/locations/stafford-disaster-recovery',
  ],
};

// Process the image
const imagePath = 'D:\\DR New\\public\\images\\locations\\brisbane-premium-suburb-hero.png';

optimizeAndTagImage(imagePath, metadata)
  .then(() => {
    console.log('🎉 Processing complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error processing image:', error);
    process.exit(1);
  });
