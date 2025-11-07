#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Scanning for missing images...\n');

// Get all image references from code
const grepOutput = execSync(
  'grep -rh \'src="/images/[^"]*"\' app/ components/ --include="*.tsx" --include="*.ts" 2>/dev/null || echo ""',
  { cwd: process.cwd(), encoding: 'utf-8' }
);

// Extract unique image paths
const imageRefs = new Set();
const regex = /src="(\/images\/[^"]+)"/g;
let match;

while ((match = regex.exec(grepOutput)) !== null) {
  imageRefs.add(match[1]);
}

console.log(`Found ${imageRefs.size} unique image references\n`);

// Check which images are missing
const missing = [];
const existing = [];

for (const imgPath of imageRefs) {
  const fullPath = path.join(process.cwd(), 'public', imgPath);
  if (fs.existsSync(fullPath)) {
    existing.push(imgPath);
  } else {
    missing.push(imgPath);
  }
}

console.log('✅ Existing images:', existing.length);
console.log('❌ Missing images:', missing.length);
console.log('');

if (missing.length > 0) {
  console.log('Missing image files:');
  missing.forEach(img => console.log(`  - ${img}`));
  console.log('');
}

// Check for unused images in public/images
console.log('\n📁 Checking for unused images...');
const allPublicImages = execSync(
  'find public/images -type f \\( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.webp" -o -name "*.gif" \\) 2>/dev/null',
  { cwd: process.cwd(), encoding: 'utf-8' }
).trim().split('\n').filter(Boolean);

const referencedImages = Array.from(imageRefs).map(img => path.join('public', img));
const unused = allPublicImages.filter(img => {
  const webPath = img.replace(/\\/g, '/');
  return !referencedImages.some(ref => webPath.includes(ref.replace(/\\/g, '/')));
});

console.log(`Total images in public/images: ${allPublicImages.length}`);
console.log(`Referenced in code: ${existing.length}`);
console.log(`Potentially unused: ${unused.length}`);

if (unused.length > 0 && unused.length < 20) {
  console.log('\nPotentially unused images:');
  unused.slice(0, 20).forEach(img => console.log(`  - ${img}`));
}

console.log('\n✅ Image audit complete!');
