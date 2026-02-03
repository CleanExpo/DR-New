#!/usr/bin/env node
/**
 * Copy training-sources from repository root to apps/web/lib/training/sources
 * This ensures files are available in Vercel deployment
 */

const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(dest)) {
    console.log(`  📁 Creating directory: ${dest}`);
    fs.mkdirSync(dest, { recursive: true });
  }

  // Read source directory
  const entries = fs.readdirSync(src, { withFileTypes: true });
  console.log(`  📂 Reading ${entries.length} entries from ${src}`);

  let fileCount = 0;
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      fileCount++;
      // Only log NRP-02X files explicitly for verification
      if (entry.name.includes('NRP-02')) {
        console.log(`  ✓✓✓ COPIED NRP-02X: ${entry.name} (${fs.statSync(destPath).size} bytes)`);
      } else {
        console.log(`  ✓ Copied: ${path.relative(process.cwd(), destPath)}`);
      }
    }
  }
  console.log(`  ✅ Copied ${fileCount} files from ${path.basename(src)}`);
}

// Main execution
const repoRoot = path.join(__dirname, '..', '..', '..');
const sourcePath = path.join(repoRoot, 'training-sources');
const destPath = path.join(__dirname, '..', 'lib', 'training', 'sources');

// Also copy generated index files
const generatedSourcePath = path.join(__dirname, '..', 'src', 'lib', 'training', 'generated');
const generatedDestPath = path.join(__dirname, '..', 'lib', 'training', 'generated');

console.log('📦 Copying training sources for deployment...\n');

try {
  // Copy training HTML files
  console.log(`Source: ${sourcePath}`);
  console.log(`Destination: ${destPath}\n`);
  copyDir(sourcePath, destPath);

  // Copy generated index files
  console.log(`\nSource: ${generatedSourcePath}`);
  console.log(`Destination: ${generatedDestPath}\n`);
  copyDir(generatedSourcePath, generatedDestPath);

  console.log('\n✅ Training sources copied successfully!');
} catch (error) {
  console.error('\n❌ Error copying training sources:', error.message);
  process.exit(1);
}
