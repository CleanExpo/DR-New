import { promises as fs } from 'fs';
import path from 'path';

async function testModuleLookup() {
  const indexPath = path.join(process.cwd(), 'apps/web/src/lib/training/generated/nrp-training-index.json');
  const indexContent = await fs.readFile(indexPath, 'utf8');
  const index = JSON.parse(indexContent);

  console.log('\n📋 Testing Module Lookup\n');
  console.log(`Total modules in index: ${index.modules.length}\n`);

  // Test specific modules
  const testModules = ['NRP-001', 'NRP-020', 'NRP-021', 'NRP-022', 'NRP-023', 'NRP-024'];

  for (const moduleId of testModules) {
    const entry = index.modules.find((m: any) => m.moduleId.toUpperCase() === moduleId.toUpperCase());

    if (entry) {
      console.log(`✅ ${moduleId}: Found in index`);
      console.log(`   Title: ${entry.title}`);
      console.log(`   Source: ${entry.sourcePath}`);
      console.log(`   SHA256: ${entry.sourceSha256}`);

      // Check if file exists
      const filePath = path.join(process.cwd(), 'training-sources', entry.sourcePath.replace('training-sources/', ''));
      try {
        await fs.access(filePath);
        const stats = await fs.stat(filePath);
        console.log(`   File exists: ${stats.size} bytes\n`);
      } catch (error) {
        console.log(`   ❌ File NOT found at: ${filePath}\n`);
      }
    } else {
      console.log(`❌ ${moduleId}: NOT found in index\n`);
    }
  }
}

testModuleLookup().catch(console.error);
