const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// Map of incorrect paths to correct paths
const imagePathFixes = {
  // Fix PNG to WebP for existing files
  '/images/optimized/equipment/dehumidifier-industrial.png': '/images/optimized/equipment/dehumidifier-industrial.webp',
  '/images/optimized/equipment/hazmat-cleanup.png': '/images/optimized/equipment/hazmat-cleanup.webp',
  '/images/optimized/equipment/industrial-water-pump.png': '/images/optimized/equipment/industrial-water-pump.webp',

  // Fix spacing and casing issues in damage folder
  '/images/optimized/damage/3D Burst Water Pipe.png': '/images/optimized/damage/3d-burst-water-pipe.webp',
  '/images/optimized/damage/3D Water Damage.png': '/images/optimized/damage/3d-water-damage.webp',
  '/images/optimized/damage/3D Flood Damage.png': '/images/optimized/damage/3d-flood-damage.webp',
  '/images/optimized/damage/3D Mould Damage.png': '/images/optimized/damage/3d-mould-damage.webp',
  '/images/optimized/damage/3D Fire Damage.png': '/images/optimized/damage/3d-kitchen-fire.webp',
  '/images/optimized/damage/3D image of a house fire.png': '/images/optimized/damage/3d-image-of-a-house-fire.webp',
  '/images/optimized/damage/3D Vehicle into Home.png': '/images/optimized/damage/3d-vehicle-into-home.webp',
  '/images/optimized/damage/3D Hurricane Damage.png': '/images/optimized/damage/3D-Storm-Damage.webp',
  '/images/optimized/damage/Mould Remediation - Black Mould.png': '/images/optimized/damage/mould-remediation-black-mould.webp',

  // Fix process folder
  '/images/optimized/process/3d-emergency-squalor-cleanup.png': '/images/optimized/process/3d-emergency-squalor-cleanup.webp',
  '/images/optimized/process/3d-assessment.png': '/images/optimized/process/3d-assessment.webp',
  '/images/optimized/process/3d-drying-process.png': '/images/optimized/process/3d-drying-process.webp',
  '/images/optimized/process/3d-remediation.png': '/images/optimized/process/3d-remediation.webp',
  '/images/optimized/process/3d-restoration.png': '/images/optimized/process/3d-restoration.webp',
  '/images/optimized/process/3d-hazardous-cleaning.png': '/images/optimized/process/3d-hazardous-cleaning.webp',

  // Fix equipment folder
  '/images/optimized/equipment/3d-thermal-camera.png': '/images/optimized/equipment/3d-thermal-camera.webp',
  '/images/optimized/equipment/3d-moisture-meter.png': '/images/optimized/equipment/3d-moisture-meter.webp',
  '/images/optimized/equipment/3d-moisture-meter-reading.png': '/images/optimized/equipment/3d-moisture-meter-reading.webp',
  '/images/optimized/equipment/3d-extraction-unit.png': '/images/optimized/equipment/3d-extraction-unit.webp',
  '/images/optimized/equipment/3d-dehumidifier.png': '/images/optimized/equipment/3d-dehumidifier.webp',
  '/images/optimized/equipment/3d-industrial-fan.png': '/images/optimized/equipment/3d-industrial-fan.webp',
  '/images/optimized/equipment/3d-thermal-fogging.png': '/images/optimized/equipment/3d-thermal-fogging.webp',

  // Fix branding folder
  '/images/optimized/branding/Disaster Recovery Logo.png': '/images/optimized/branding/disaster-recovery-logo.webp',

  // Fix education folder
  '/images/education/understanding-water-categories.png': '/images/education/understanding-water-categories.webp',

  // Fix storm damage
  '/images/storm-damage/storms-ahead.png': '/images/storm-damage/storms-ahead.webp',

  // Fix logos with spaces
  '/logos/3D Disaster Recovery Logo Image.png': '/logos/3d-disaster-recovery-logo-image.png',
  '/logos/3D-Disaster-Recovery-Logo.png': '/logos/3D-Disaster-Recovery-Logo.png', // This one exists
  '/logos/3D Disaster Recovery Round Borders.png': '/logos/3d-disaster-recovery-round-borders.png',

  // Fix team images
  '/images/team/3d-shane.png': '/images/team/3d-shane.webp'
};

async function fixImagePaths() {
  console.log('🔍 Scanning for image references...\n');

  const files = await glob('**/*.{tsx,ts,jsx,js}', {
    cwd: 'D:\\DR New',
    ignore: ['node_modules/**', '.next/**', 'dist/**', 'build/**', 'scripts/fix-all-images.js'],
    absolute: true
  });

  let totalFixes = 0;
  const filesModified = [];

  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    let fileFixCount = 0;

    for (const [oldPath, newPath] of Object.entries(imagePathFixes)) {
      // Match both src="/path" and src='/path'
      const regex1 = new RegExp(`src="${oldPath.replace(/\//g, '\\/')}"`, 'g');
      const regex2 = new RegExp(`src='${oldPath.replace(/\//g, '\\/')}'`, 'g');
      const regex3 = new RegExp(`image: '${oldPath.replace(/\//g, '\\/')}'`, 'g');
      const regex4 = new RegExp(`image: "${oldPath.replace(/\//g, '\\/')}"`, 'g');
      const regex5 = new RegExp(`images: \\['${oldPath.replace(/\//g, '\\/')}'\\]`, 'g');
      const regex6 = new RegExp(`images: \\["${oldPath.replace(/\//g, '\\/')}"\\]`, 'g');
      const regex7 = new RegExp(`heroImage="${oldPath.replace(/\//g, '\\/')}"`, 'g');
      const regex8 = new RegExp(`heroImage='${oldPath.replace(/\//g, '\\/')}'`, 'g');

      const before = content;
      content = content.replace(regex1, `src="${newPath}"`);
      content = content.replace(regex2, `src='${newPath}'`);
      content = content.replace(regex3, `image: '${newPath}'`);
      content = content.replace(regex4, `image: "${newPath}"`);
      content = content.replace(regex5, `images: ['${newPath}']`);
      content = content.replace(regex6, `images: ["${newPath}"]`);
      content = content.replace(regex7, `heroImage="${newPath}"`);
      content = content.replace(regex8, `heroImage='${newPath}'`);

      if (content !== before) {
        modified = true;
        fileFixCount++;
        console.log(`  ✓ ${path.basename(file)}: ${oldPath} → ${newPath}`);
      }
    }

    if (modified) {
      fs.writeFileSync(file, content, 'utf8');
      totalFixes += fileFixCount;
      filesModified.push(file);
    }
  }

  console.log(`\n✅ Fixed ${totalFixes} image paths across ${filesModified.length} files\n`);

  // List modified files
  if (filesModified.length > 0) {
    console.log('Modified files:');
    filesModified.forEach(file => {
      console.log(`  - ${path.relative('D:\\DR New', file)}`);
    });
  }
}

fixImagePaths().catch(console.error);
