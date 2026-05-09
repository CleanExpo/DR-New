#!/usr/bin/env node
/**
 * Module Verification Script
 * Verifies all 24 NRPG training modules are correctly indexed and loadable
 */

import { createHash } from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';
import { loadNrpgTrainingIndex, getTrainingModuleHtmlById } from '../lib/training/nrp-training';

interface VerificationResult {
  moduleId: string;
  exists: boolean;
  hashMatch: boolean;
  loadable: boolean;
  size: number;
  errors: string[];
}

async function calculateSha256(filePath: string): Promise<string> {
  const buffer = await fs.readFile(filePath);
  return createHash('sha256').update(buffer).digest('hex');
}

async function verifyModule(
  moduleId: string,
  expectedPath: string,
  expectedHash: string
): Promise<VerificationResult> {
  const result: VerificationResult = {
    moduleId,
    exists: false,
    hashMatch: false,
    loadable: false,
    size: 0,
    errors: [],
  };

  try {
    // Check file exists
    const absolutePath = path.join(process.cwd(), expectedPath);
    const stat = await fs.stat(absolutePath);
    result.exists = true;
    result.size = stat.size;

    // Verify hash
    const actualHash = await calculateSha256(absolutePath);
    result.hashMatch = actualHash === expectedHash;
    if (!result.hashMatch) {
      result.errors.push(
        `Hash mismatch: expected ${expectedHash.substring(0, 8)}..., got ${actualHash.substring(0, 8)}...`
      );
    }

    // Test loading through API function
    try {
      const moduleContent = await getTrainingModuleHtmlById(moduleId);
      result.loadable = true;

      // Verify HTML content has minimum expected structure
      if (!moduleContent.html.includes('<html') || !module.html.includes('</html>')) {
        result.errors.push('HTML structure incomplete - missing html tags');
      }
      if (!moduleContent.html.includes('<title>')) {
        result.errors.push('HTML structure incomplete - missing title tag');
      }
      if (module.html.length < 10000) {
        result.errors.push(`HTML content too short: ${moduleContent.html.length} bytes (expected >10KB)`);
      }
    } catch (loadError) {
      result.errors.push(`Failed to load: ${loadError instanceof Error ? loadError.message : 'Unknown error'}`);
    }
  } catch (error) {
    result.errors.push(`File error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  return result;
}

async function main() {
  console.log('🔍 Module Verification Script');
  console.log('=' .repeat(80));
  console.log('');

  try {
    // Load index
    console.log('📋 Loading module index...');
    const index = await loadNrpgTrainingIndex();
    console.log(`✅ Index loaded: ${index.modules.length} modules, generated ${index.generatedAt}`);
    console.log('');

    // Verify each module
    console.log('🔬 Verifying modules...');
    console.log('');

    const results: VerificationResult[] = [];
    let passed = 0;
    let failed = 0;

    for (const mod of index.modules) {
      process.stdout.write(`  Testing ${mod.moduleId}...`);
      const result = await verifyModule(mod.moduleId, mod.sourcePath, mod.sourceSha256);
      results.push(result);

      if (result.exists && result.hashMatch && result.loadable && result.errors.length === 0) {
        console.log(` ✅ PASS (${(result.size / 1024).toFixed(1)}KB)`);
        passed++;
      } else {
        console.log(` ❌ FAIL`);
        failed++;
        if (result.errors.length > 0) {
          result.errors.forEach((err) => console.log(`      ⚠️  ${err}`));
        }
      }
    }

    console.log('');
    console.log('=' .repeat(80));
    console.log('📊 Summary');
    console.log('=' .repeat(80));
    console.log(`Total modules: ${results.length}`);
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`Success rate: ${((passed / results.length) * 100).toFixed(1)}%`);
    console.log('');

    // Detailed failure report
    if (failed > 0) {
      console.log('❌ Failed Modules:');
      results
        .filter((r) => !r.exists || !r.hashMatch || !r.loadable || r.errors.length > 0)
        .forEach((r) => {
          console.log(`  ${r.moduleId}:`);
          console.log(`    - File exists: ${r.exists ? '✅' : '❌'}`);
          console.log(`    - Hash match: ${r.hashMatch ? '✅' : '❌'}`);
          console.log(`    - Loadable: ${r.loadable ? '✅' : '❌'}`);
          if (r.errors.length > 0) {
            console.log(`    - Errors:`);
            r.errors.forEach((err) => console.log(`      • ${err}`));
          }
        });
      console.log('');
      process.exit(1);
    }

    // Check for expected modules
    console.log('✅ Verification complete!');
    console.log('');
    console.log('Expected modules present:');
    const expectedModules = Array.from({ length: 24 }, (_, i) => `NRP-${String(i + 1).padStart(3, '0')}`);
    const actualModules = results.map((r) => r.moduleId);
    const missing = expectedModules.filter((m) => !actualModules.includes(m));
    if (missing.length > 0) {
      console.log(`⚠️  Missing modules: ${missing.join(', ')}`);
      process.exit(1);
    } else {
      console.log('✅ All 24 modules (NRP-001 to NRP-024) are present and verified');
    }

    // Size analysis
    const totalSize = results.reduce((sum, r) => sum + r.size, 0);
    const avgSize = totalSize / results.length;
    console.log('');
    console.log('📦 Size Analysis:');
    console.log(`  Total: ${(totalSize / 1024).toFixed(1)}KB`);
    console.log(`  Average: ${(avgSize / 1024).toFixed(1)}KB per module`);
    console.log(`  Range: ${(Math.min(...results.map((r) => r.size)) / 1024).toFixed(1)}KB - ${(Math.max(...results.map((r) => r.size)) / 1024).toFixed(1)}KB`);

    console.log('');
    console.log('✅ All modules verified successfully!');
    process.exit(0);
  } catch (error) {
    console.error('');
    console.error('❌ Verification failed:');
    console.error(error instanceof Error ? error.message : 'Unknown error');
    console.error('');
    if (error instanceof Error && error.stack) {
      console.error('Stack trace:');
      console.error(error.stack);
    }
    process.exit(1);
  }
}

main();
