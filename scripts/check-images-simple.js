#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const imageRefs = [
  "/images/team/3D Shane.png",
  "/images/storm-damage/storms-ahead.png",
  "/images/hero/fire-water-damage-restoration.jpg",
  "/images/education/understanding-water-categories.png",
  "/images/services/crime-scene-remediation.webp",
  "/images/optimised/process/3D Emergency Squalor Cleanup.png",
  "/images/optimised/equipment/3D Extraction Unit.png",
  "/images/optimised/equipment/3D Industrial Fan.png",
  "/images/optimised/equipment/3D Thermal Fogging.png",
  "/images/optimised/equipment/3D Moisture Meter Reading.png",
  "/images/services/fire-damage-restoration.webp",
  "/images/optimized/flood/flood-recovery-team.jpg",
  "/images/optimized/damage/Mould Remediation - Black Mould.png",
  "/images/optimised/process/3D Remediation.png",
  "/images/services/mould-remediation.webp",
  "/images/services/sewage-sanitisation.webp",
  "/images/optimised/damage/3D Vehicle into Home.png",
  "/images/optimised/equipment/3D Thermal Camera.png",
  "/images/optimised/damage/3D Water Damage.png",
  "/images/optimised/damage/3D Flood Damage.png",
  "/images/optimised/process/3D Assessment.png",
  "/images/optimised/equipment/3D Moisture Meter.png",
  "/images/optimised/equipment/3D Dehumidifier.png",
  "/images/optimised/process/3D Restoration.png",
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
