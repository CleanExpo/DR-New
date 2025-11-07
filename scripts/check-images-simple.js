#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const imageRefs = [
  "/images/team/3d-shane.png",
  "/images/storm-damage/storms-ahead.png",
  "/images/hero/fire-water-damage-restoration.jpg",
  "/images/education/understanding-water-categories.png",
  "/images/services/crime-scene-remediation.webp",
  "/images/optimized/process/3d-emergency-squalor-cleanup.png",
  "/images/optimized/equipment/3d-extraction-unit.png",
  "/images/optimized/equipment/3d-industrial-fan.png",
  "/images/optimized/equipment/3d-thermal-fogging.png",
  "/images/optimized/equipment/3d-moisture-meter-reading.png",
  "/images/services/fire-damage-restoration.webp",
  "/images/optimized/flood/flood-recovery-team.jpg",
  "/images/optimized/damage/Mould Remediation - Black Mould.png",
  "/images/optimized/process/3d-remediation.png",
  "/images/services/mould-remediation.webp",
  "/images/services/sewage-sanitisation.webp",
  "/images/optimized/damage/3D Vehicle into Home.png",
  "/images/optimized/equipment/3d-thermal-camera.png",
  "/images/optimized/damage/3D Water Damage.png",
  "/images/optimized/damage/3D Flood Damage.png",
  "/images/optimized/process/3d-assessment.png",
  "/images/optimized/equipment/3d-moisture-meter.png",
  "/images/optimized/equipment/3d-dehumidifier.png",
  "/images/optimized/process/3d-restoration.png",
  "/images/optimized/damage/3D Burst Water Pipe.png",
  "/images/optimized/equipment/industrial-water-pump.png",
  "/images/optimized/equipment/hazmat-cleanup.png",
  "/images/optimized/equipment/dehumidifier-industrial.png",
  "/images/commercial-management-brisbane.png",
  "/images/phil-mcgurk-iicrc-certification.png"
];

console.log('🔍 Checking image files...\n');

const missing = [];
const existing = [];

const uniqueRefs = [...new Set(imageRefs)];

uniqueRefs.forEach(img => {
  const fullPath = path.join(process.cwd(), 'public', img);
  if (fs.existsSync(fullPath)) {
    existing.push(img);
  } else {
    missing.push(img);
  }
});

console.log(`✅ Existing: ${existing.length}`);
console.log(`❌ Missing: ${missing.length}\n`);

if (missing.length > 0) {
  console.log('Missing images:');
  missing.forEach(img => console.log(`  - ${img}`));
}
