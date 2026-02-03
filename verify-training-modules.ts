#!/usr/bin/env node
/**
 * Simple Module Verification Script
 * Run from repository root to verify all 24 training modules
 */

import { createHash } from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';

interface ModuleEntry {
  moduleId: string;
  moduleNumber: number;
  title: string;
  sourcePath: string;
  sourceSha256: string;
}

interface TrainingIndex {
  generatedAt: string;
  modules: ModuleEntry[];
}

async function calculateSha256(filePath: string): Promise<string> {
  const buffer = await fs.readFile(filePath);
  return createHash('sha256').update(buffer).digest('hex');
}

async function main() {
  console.log('🔍 Training Module Verification');
  console.log('='.repeat(80));
  console.log('');

  try {
    // Load the index from the correct location
    const indexPath = path.join(
      process.cwd(),
      'apps',
      'web',
      'src',
      'lib',
      'training',
      'generated',
      'nrp-training-index.json'
    );

    console.log(`📋 Loading index from: ${indexPath}`);
    const indexContent = await fs.readFile(indexPath, 'utf8');
    const index: TrainingIndex = JSON.parse(indexContent);

    console.log(`✅ Index loaded: ${index.modules.length} modules`);
    console.log(`   Generated: ${index.generatedAt}`);
    console.log('');

    let passed = 0;
    let failed = 0;
    const errors: string[] = [];

    console.log('🔬 Verifying modules...');
    console.log('');

    for (const module of index.modules) {
      process.stdout.write(`  ${module.moduleId.padEnd(10)} `);

      // Build absolute path
      const absolutePath = path.join(process.cwd(), module.sourcePath);

      try {
        // Check file exists and get size
        const stat = await fs.stat(absolutePath);
        const sizeKb = (stat.size / 1024).toFixed(1);

        // Calculate hash
        const actualHash = await calculateSha256(absolutePath);

        // Verify hash matches
        if (actualHash === module.sourceSha256) {
          console.log(`✅ ${sizeKb.padStart(6)}KB  Hash: ${actualHash.substring(0, 8)}...`);
          passed++;
        } else {
          console.log(`❌ HASH MISMATCH`);
          console.log(`     Expected: ${module.sourceSha256.substring(0, 16)}...`);
          console.log(`     Got:      ${actualHash.substring(0, 16)}...`);
          failed++;
          errors.push(`${module.moduleId}: Hash mismatch`);
        }
      } catch (error) {
        console.log(`❌ FILE ERROR`);
        if (error instanceof Error) {
          console.log(`     ${error.message}`);
          errors.push(`${module.moduleId}: ${error.message}`);
        }
        failed++;
      }
    }

    console.log('');
    console.log('='.repeat(80));
    console.log('📊 Verification Summary');
    console.log('='.repeat(80));
    console.log(`Total modules:    ${index.modules.length}`);
    console.log(`✅ Passed:        ${passed}`);
    console.log(`❌ Failed:        ${failed}`);
    console.log(`Success rate:    ${((passed / index.modules.length) * 100).toFixed(1)}%`);

    if (failed > 0) {
      console.log('');
      console.log('❌ Errors:');
      errors.forEach((err) => console.log(`   ${err}`));
      console.log('');
      process.exit(1);
    }

    // Verify we have all expected modules
    console.log('');
    console.log('✅ Module completeness check:');
    const expectedCount = 24;
    const actualCount = index.modules.length;

    if (actualCount === expectedCount) {
      console.log(`   ✅ All ${expectedCount} modules present (NRP-001 to NRP-024)`);
    } else {
      console.log(`   ❌ Expected ${expectedCount} modules, found ${actualCount}`);
      process.exit(1);
    }

    // Check for specific new modules
    const newModules = ['NRP-021', 'NRP-022', 'NRP-023', 'NRP-024'];
    const foundNewModules = newModules.filter((id) =>
      index.modules.some((m) => m.moduleId === id)
    );

    console.log('');
    console.log('✅ New DR-NRPG process modules:');
    newModules.forEach((id) => {
      const found = index.modules.find((m) => m.moduleId === id);
      if (found) {
        console.log(`   ✅ ${id}: ${found.title}`);
      } else {
        console.log(`   ❌ ${id}: MISSING`);
      }
    });

    console.log('');
    console.log('✅ All modules verified successfully!');
    console.log('');
    console.log('Next steps:');
    console.log('  1. Start dev server: npm run dev');
    console.log('  2. Navigate to contractor onboarding');
    console.log('  3. Test module loading in browser');
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('');
    console.error('❌ Verification failed:');
    console.error(error);
    console.error('');
    process.exit(1);
  }
}

main();
