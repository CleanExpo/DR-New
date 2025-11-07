#!/usr/bin/env node
/**
 * Update Image References Script
 * Updates all code references to renamed image files
 */

const fs = require('fs');
const path = require('path');

const baseDir = 'D:\\DR New';

// Mapping of old filenames to new filenames (with spaces -> hyphens)
const imageMapping = {
  '3D Assessment.png': '3d-assessment.png',
  '3D Dehumidifier.png': '3d-dehumidifier.png',
  '3D Drying Process.png': '3d-drying-process.png',
  '3D Remediation.png': '3d-remediation.png',
  '3D Restoration.png': '3d-restoration.png',
  '3D Shane.png': '3d-shane.png',
  '3D CARSI Logo.png': '3d-carsi-logo.png',
  '3D NRP Logo.png': '3d-nrp-logo.png',
  '3D Extraction Unit.png': '3d-extraction-unit.png',
  '3D Industrial Fan.png': '3d-industrial-fan.png',
  '3D Moisture Meter.png': '3d-moisture-meter.png',
  '3D Moisture Meter Reading.png': '3d-moisture-meter-reading.png',
  '3D Thermal Camera.png': '3d-thermal-camera.png',
  '3D Thermal Fogging.png': '3d-thermal-fogging.png',
  '3D Emergency Squalor Cleanup.png': '3d-emergency-squalor-cleanup.png',
  '3D Hazardous Cleaning.png': '3d-hazardous-cleaning.png',
  'NRP Favicon.ico': 'nrp-favicon.ico',
  'NRP favicon_128x128.png': 'nrp-favicon-128x128.png',
  'NRP favicon_16x16.png': 'nrp-favicon-16x16.png',
  'NRP favicon_32x32.png': 'nrp-favicon-32x32.png',
  'NRP favicon_48x48.png': 'nrp-favicon-48x48.png',
  'NRP favicon_512x512.png': 'nrp-favicon-512x512.png',
  '3D Clean Claims Logo.png': '3d-clean-claims-logo.png',
  '3D Facebook.png': '3d-facebook.png',
  '3D Instagram.png': '3d-instagram.png',
  '3D LinkedIn.png': '3d-linkedin.png',
  '3D YouTube.png': '3d-youtube.png'
};

// Files that need updating (from grep results)
const filesToUpdate = [
  'app/about/page.tsx',
  'app/insurance/page.tsx',
  'app/services/biohazard-cleanup/page.tsx',
  'app/services/commercial/page.tsx.backup',
  'app/services/emergency-response/page.tsx',
  'app/services/fire-damage/page.tsx',
  'app/services/mold-remediation/page.tsx',
  'app/services/storm-damage/page.tsx',
  'app/services/structural-drying/page.tsx',
  'app/services/trauma-cleanup/page.tsx',
  'app/services/trauma-cleanup/biohazard-cleanup/page.tsx',
  'app/services/water-damage/page.tsx',
  'lib/image-optimization/config.ts',
  'src/components/Logo.tsx',
  'scripts/check-images-simple.js',
  'scripts/health-check-orchestrator.ps1',
  'scripts/health-check-runner.js',
  'scripts/pitch-deck-cli.ps1',
  'scripts/run-system-audit.js',
  'scripts/system-audit-cli.ps1',
  'scripts/web-optimize-images.js',
  'public/images/optimized/manifest.json',
  'public/images/optimized/seo-metadata.json',
  'public/images/optimized/images-sitemap.xml',
  'public/images/optimized/manifest.json',
  'public/images/optimized/seo-metadata.json',
  'public/images/optimized/images-sitemap.xml'
];

const results = {
  updated: [],
  errors: [],
  noChanges: []
};

console.log('\n========================================');
console.log('UPDATE IMAGE REFERENCES');
console.log('========================================\n');
console.log(`Files to process: ${filesToUpdate.length}\n`);

filesToUpdate.forEach((file, index) => {
  const filePath = path.join(baseDir, file);

  console.log(`[${index + 1}/${filesToUpdate.length}] Processing: ${file}`);

  if (!fs.existsSync(filePath)) {
    console.log(`  ⚠️  File not found, skipping`);
    results.noChanges.push(file);
    return;
  }

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    let changeCount = 0;

    // Replace each old filename with new filename
    Object.entries(imageMapping).forEach(([oldName, newName]) => {
      // Match the filename in various contexts (quotes, URLs, etc.)
      const regex = new RegExp(oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      const matches = (content.match(regex) || []).length;

      if (matches > 0) {
        content = content.replace(regex, newName);
        changeCount += matches;
        console.log(`    ✓ Replaced "${oldName}" -> "${newName}" (${matches} occurrence${matches > 1 ? 's' : ''})`);
      }
    });

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      results.updated.push({ file, changes: changeCount });
      console.log(`  ✅ Updated with ${changeCount} change${changeCount > 1 ? 's' : ''}`);
    } else {
      results.noChanges.push(file);
      console.log(`  ℹ️  No changes needed`);
    }
  } catch (error) {
    console.log(`  ❌ Error: ${error.message}`);
    results.errors.push({ file, error: error.message });
  }
});

console.log('\n========================================');
console.log('SUMMARY');
console.log('========================================\n');
console.log(`Files updated: ${results.updated.length}`);
console.log(`No changes needed: ${results.noChanges.length}`);
console.log(`Errors: ${results.errors.length}`);

if (results.updated.length > 0) {
  console.log('\n✅ UPDATED FILES:');
  results.updated.forEach(({ file, changes }) => {
    console.log(`  - ${file} (${changes} change${changes > 1 ? 's' : ''})`);
  });
}

if (results.errors.length > 0) {
  console.log('\n❌ ERRORS:');
  results.errors.forEach(({ file, error }) => {
    console.log(`  - ${file}: ${error}`);
  });
}

// Save detailed report
const reportPath = path.join(baseDir, 'scripts', 'image-reference-update-report.json');
fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), 'utf8');
console.log(`\n📄 Detailed report saved: ${reportPath}`);

console.log('\n✨ Done!\n');

process.exit(results.errors.length > 0 ? 1 : 0);
