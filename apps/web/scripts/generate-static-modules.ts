#!/usr/bin/env tsx
/**
 * Generate static JSON files for all training modules
 * This runs during build to pre-generate all module content as static files
 */

import { promises as fs } from 'fs';
import path from 'path';
import { getTrainingModuleHtmlById, loadNrpgTrainingIndex } from '../lib/training/nrp-training';

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'training-modules');

async function generateStaticModules() {
  console.log('🔨 Generating static training modules...\n');

  // Ensure output directory exists
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  // Load the module index
  const index = await loadNrpgTrainingIndex();
  console.log(`📋 Found ${index.modules.length} modules to generate\n`);

  let successCount = 0;
  let failCount = 0;

  // Generate static JSON for each module
  for (const mod of index.modules) {
    try {
      console.log(`  Processing ${mod.moduleId}...`);

      // Load the module content
      const moduleData = await getTrainingModuleHtmlById(mod.moduleId);

      // Create the static JSON file
      const staticData = {
        success: true,
        module: {
          moduleId: module.moduleId,
          title: module.title,
          sourcePath: moduleData.sourcePath,
          sha256: moduleData.sha256,
          html: moduleData.html,
        },
        generatedAt: new Date().toISOString(),
      };

      // Write to public folder
      const outputPath = path.join(OUTPUT_DIR, `${module.moduleId}.json`);
      await fs.writeFile(outputPath, JSON.stringify(staticData, null, 2), 'utf8');

      console.log(`    ✅ Generated ${module.moduleId}.json (${Math.round(moduleData.html.length / 1024)}KB)`);
      successCount++;
    } catch (error) {
      console.error(`    ❌ Failed to generate ${module.moduleId}:`, error instanceof Error ? error.message : error);
      failCount++;
    }
  }

  console.log(`\n📊 Generation Summary:`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   📁 Output: ${OUTPUT_DIR}\n`);

  if (failCount > 0) {
    process.exit(1);
  }

  console.log('✅ Static module generation complete!\n');
}

// Run the generator
generateStaticModules().catch((error) => {
  console.error('\n❌ Fatal error during generation:', error);
  process.exit(1);
});
