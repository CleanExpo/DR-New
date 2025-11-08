const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

async function verifyImages() {
  console.log('🔍 Verifying all image files exist...\n');

  const files = await glob('**/*.{tsx,ts,jsx,js}', {
    cwd: 'D:\DR New',
    ignore: ['node_modules/**', '.next/**', 'dist/**', 'build/**', 'scripts/**'],
    absolute: true
  });

  const imageReferences = new Set();
  const missingImages = [];

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');

    // Find all image src references
    const srcMatches = content.match(/src=["']([^"']+\.(?:jpg|jpeg|png|webp|svg|gif))["']/g) || [];
    srcMatches.forEach(match => {
      const src = match.match(/src=["']([^"']+)["']/)[1];
      if (src.startsWith('/')) {
        imageReferences.add(src);
      }
    });

    // Find image: references
    const imageMatches = content.match(/image:\s*["']([^"']+\.(?:jpg|jpeg|png|webp|svg|gif))["']/g) || [];
    imageMatches.forEach(match => {
      const src = match.match(/image:\s*["']([^"']+)["']/)[1];
      if (src.startsWith('/')) {
        imageReferences.add(src);
      }
    });
  }

  console.log(`Found ${imageReferences.size} unique image references\n`);

  for (const imgPath of imageReferences) {
    const fullPath = path.join('D:\DR New\public', imgPath.substring(1));
    if (!fs.existsSync(fullPath)) {
      missingImages.push(imgPath);
      console.log(`  ❌ MISSING: ${imgPath}`);
    }
  }

  if (missingImages.length === 0) {
    console.log('✅ All referenced images exist!\n');
  } else {
    console.log(`\n⚠️  Found ${missingImages.length} missing images\n`);
  }

  return { total: imageReferences.size, missing: missingImages.length };
}

verifyImages().catch(console.error);
