#!/usr/bin/env node
/**
 * Test Module API Loading
 * Tests that modules can be loaded through the getTrainingModuleHtmlById function
 */

import path from 'path';

// Set working directory to apps/web so the paths work correctly
process.chdir(path.join(__dirname, 'apps', 'web'));

async function main() {
  console.log('🧪 Testing Module API Loading');
  console.log('='.repeat(80));
  console.log('Working directory:', process.cwd());
  console.log('');

  try {
    // Dynamically import the function after changing directory
    const { getTrainingModuleHtmlById } = await import('./apps/web/lib/training/nrp-training');

    // Test sample of modules including new ones
    const testModules = [
      'NRP-001',
      'NRP-003', // Modified for RestoreAssist.ai
      'NRP-012',
      'NRP-020', // Modified for RestoreAssist.ai
      'NRP-021', // New DR-NRPG Platform Operations
      'NRP-022', // New CEC System
      'NRP-023', // New Association Memberships
      'NRP-024', // New Members Gatherings
    ];

    console.log(`Testing ${testModules.length} sample modules...`);
    console.log('');

    let passed = 0;
    let failed = 0;

    for (const moduleId of testModules) {
      process.stdout.write(`  ${moduleId.padEnd(10)} `);

      try {
        const result = await getTrainingModuleHtmlById(moduleId);

        // Verify result structure
        if (!result.html || !result.sourcePath || !result.sha256) {
          throw new Error('Incomplete result structure');
        }

        // Verify HTML content
        if (!result.html.includes('<html')) {
          throw new Error('Invalid HTML structure');
        }

        if (!result.html.includes('<title>')) {
          throw new Error('Missing title tag');
        }

        // Check for RestoreAssist.ai in modified modules
        if (['NRP-003', 'NRP-004', 'NRP-017', 'NRP-019', 'NRP-020'].includes(moduleId)) {
          if (result.html.toLowerCase().includes('xactimate')) {
            throw new Error('Still contains Xactimate reference!');
          }
          if (!result.html.includes('RestoreAssist.ai')) {
            console.log(`⚠️  WARNING: No RestoreAssist.ai found`);
          }
        }

        // Check for DR-NRPG content in new modules
        if (['NRP-021', 'NRP-022', 'NRP-023', 'NRP-024'].includes(moduleId)) {
          if (!result.html.toLowerCase().includes('dr-nrpg') && !result.html.toLowerCase().includes('nrpg')) {
            console.log(`⚠️  WARNING: No NRPG content found`);
          }
        }

        const sizeKb = (result.html.length / 1024).toFixed(1);
        console.log(`✅ ${sizeKb.padStart(6)}KB  Hash: ${result.sha256.substring(0, 8)}...`);
        passed++;
      } catch (error) {
        console.log(`❌ FAIL`);
        if (error instanceof Error) {
          console.log(`     Error: ${error.message}`);
        }
        failed++;
      }
    }

    console.log('');
    console.log('='.repeat(80));
    console.log('📊 API Test Summary');
    console.log('='.repeat(80));
    console.log(`Tests run:       ${testModules.length}`);
    console.log(`✅ Passed:       ${passed}`);
    console.log(`❌ Failed:       ${failed}`);
    console.log(`Success rate:   ${((passed / testModules.length) * 100).toFixed(1)}%`);
    console.log('');

    if (failed > 0) {
      console.log('❌ Some API tests failed');
      process.exit(1);
    }

    console.log('✅ All API tests passed!');
    console.log('');
    console.log('Next: Test in browser');
    console.log('  1. Start dev server: npm run dev');
    console.log('  2. Navigate to: http://localhost:3000/dashboard/contractor/onboarding/training');
    console.log('  3. Click on any module to verify it loads');
    console.log('');
    process.exit(0);
  } catch (error) {
    console.error('');
    console.error('❌ Test failed:');
    console.error(error);
    console.error('');
    process.exit(1);
  }
}

main();
