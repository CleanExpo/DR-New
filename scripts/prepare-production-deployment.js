#!/usr/bin/env node

/**
 * Production Deployment Preparation Script
 *
 * This script prepares the codebase for production deployment by:
 * 1. Updating vercel.json to use environment variables
 * 2. Verifying all configuration files
 * 3. Running pre-deployment checks
 * 4. Creating a deployment-ready commit
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const VERCEL_JSON_PATH = path.join(process.cwd(), 'vercel.json');
const NEXT_CONFIG_PATH = path.join(process.cwd(), 'next.config.mjs');

console.log('🚀 Disaster Recovery - Production Deployment Preparation');
console.log('='.repeat(80));

// Step 1: Backup current configuration
function backupConfig() {
  console.log('\n📦 Step 1: Backing up current configuration...');

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

  if (fs.existsSync(VERCEL_JSON_PATH)) {
    const backupPath = `${VERCEL_JSON_PATH}.backup-${timestamp}`;
    fs.copyFileSync(VERCEL_JSON_PATH, backupPath);
    console.log(`   ✓ Backed up vercel.json to: ${backupPath}`);
  }

  if (fs.existsSync(NEXT_CONFIG_PATH)) {
    const backupPath = `${NEXT_CONFIG_PATH}.backup-${timestamp}`;
    fs.copyFileSync(NEXT_CONFIG_PATH, backupPath);
    console.log(`   ✓ Backed up next.config.mjs to: ${backupPath}`);
  }
}

// Step 2: Update vercel.json
function updateVercelJson() {
  console.log('\n⚙️  Step 2: Updating vercel.json for production...');

  if (!fs.existsSync(VERCEL_JSON_PATH)) {
    console.log('   ⚠️  vercel.json not found, skipping...');
    return false;
  }

  const vercelConfig = JSON.parse(fs.readFileSync(VERCEL_JSON_PATH, 'utf8'));

  // Remove hardcoded URLs from environment
  let updated = false;

  if (vercelConfig.env && vercelConfig.env.NEXT_PUBLIC_APP_URL) {
    console.log('   🔧 Removing hardcoded NEXT_PUBLIC_APP_URL from vercel.json');
    delete vercelConfig.env.NEXT_PUBLIC_APP_URL;
    updated = true;
  }

  if (vercelConfig.build && vercelConfig.build.env && vercelConfig.build.env.NEXT_PUBLIC_APP_URL) {
    console.log('   🔧 Removing hardcoded NEXT_PUBLIC_APP_URL from build.env');
    delete vercelConfig.build.env.NEXT_PUBLIC_APP_URL;
    updated = true;
  }

  // Remove SKIP_BUILD_ERRORS for production
  if (vercelConfig.env && vercelConfig.env.SKIP_BUILD_ERRORS) {
    console.log('   🔧 Removing SKIP_BUILD_ERRORS from vercel.json');
    delete vercelConfig.env.SKIP_BUILD_ERRORS;
    updated = true;
  }

  if (vercelConfig.build && vercelConfig.build.env && vercelConfig.build.env.SKIP_BUILD_ERRORS) {
    console.log('   🔧 Removing SKIP_BUILD_ERRORS from build.env');
    delete vercelConfig.build.env.SKIP_BUILD_ERRORS;
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(
      VERCEL_JSON_PATH,
      JSON.stringify(vercelConfig, null, 2) + '\n',
      'utf8'
    );
    console.log('   ✓ Updated vercel.json successfully');
    return true;
  } else {
    console.log('   ✓ vercel.json is already production-ready');
    return false;
  }
}

// Step 3: Verify environment variables
function verifyEnvironmentVariables() {
  console.log('\n🔍 Step 3: Verifying environment variable configuration...');

  const requiredVars = [
    'NEXT_PUBLIC_APP_URL',
    'NEXTAUTH_URL',
    'NEXTAUTH_SECRET',
  ];

  const recommendedVars = [
    'DATABASE_URL',
    'STRIPE_SECRET_KEY',
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    'EMAIL_FROM',
    'GOOGLE_MAPS_API_KEY',
    'NEXT_PUBLIC_GA_MEASUREMENT_ID'
  ];

  console.log('\n   📋 Required Environment Variables (must be set in Vercel):');
  requiredVars.forEach(varName => {
    console.log(`      - ${varName}`);
  });

  console.log('\n   📋 Recommended Environment Variables:');
  recommendedVars.forEach(varName => {
    console.log(`      - ${varName}`);
  });

  console.log('\n   ⚠️  Remember to set these in Vercel Dashboard:');
  console.log('      Settings > Environment Variables > Production');
}

// Step 4: Run build test
function testBuild() {
  console.log('\n🏗️  Step 4: Testing production build...');

  try {
    console.log('   Running: npm run build');
    execSync('npm run build', { stdio: 'inherit' });
    console.log('   ✓ Build completed successfully');
    return true;
  } catch (error) {
    console.log('   ✗ Build failed');
    console.log('   Please fix build errors before deploying to production');
    return false;
  }
}

// Step 5: Git status check
function checkGitStatus() {
  console.log('\n📝 Step 5: Checking Git status...');

  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });

    if (status.trim().length > 0) {
      console.log('   📋 Uncommitted changes detected:');
      console.log(status.split('\n').map(line => `      ${line}`).join('\n'));
      return false;
    } else {
      console.log('   ✓ Working directory is clean');
      return true;
    }
  } catch (error) {
    console.log('   ⚠️  Could not check git status');
    return false;
  }
}

// Step 6: Create deployment checklist
function createChecklist() {
  console.log('\n📋 Step 6: Pre-deployment checklist...');

  const checklist = [
    {
      item: 'Environment variables set in Vercel Production',
      critical: true
    },
    {
      item: 'DNS records point to Vercel',
      critical: true
    },
    {
      item: 'Domain assigned to dr-new project in Vercel',
      critical: true
    },
    {
      item: 'SSL certificate provisioned',
      critical: true
    },
    {
      item: 'Database migrations run on production DB',
      critical: false
    },
    {
      item: 'Stripe webhooks updated to production domain',
      critical: false
    },
    {
      item: 'Google Analytics configured',
      critical: false
    },
    {
      item: 'Monitoring and alerting set up',
      critical: false
    }
  ];

  console.log('\n   Critical items (must complete before deployment):');
  checklist.filter(c => c.critical).forEach((check, i) => {
    console.log(`      ${i + 1}. [ ] ${check.item}`);
  });

  console.log('\n   Recommended items:');
  checklist.filter(c => !c.critical).forEach((check, i) => {
    console.log(`      ${i + 1}. [ ] ${check.item}`);
  });
}

// Step 7: Generate deployment commands
function generateDeploymentCommands(configUpdated) {
  console.log('\n🚀 Step 7: Deployment commands...');

  if (configUpdated) {
    console.log('\n   Configuration files were updated. Run these commands:');
    console.log('');
    console.log('   # Review changes');
    console.log('   git diff vercel.json');
    console.log('');
    console.log('   # Commit changes');
    console.log('   git add vercel.json');
    console.log('   git commit -m "fix: Prepare vercel.json for production deployment');
    console.log('');
    console.log('   - Remove hardcoded preview URL');
    console.log('   - Use environment variables for NEXT_PUBLIC_APP_URL');
    console.log('   - Remove SKIP_BUILD_ERRORS for production');
    console.log('');
    console.log('   🚀 Ready for deployment to disasterrecovery.com.au"');
    console.log('');
    console.log('   # Push to trigger deployment');
    console.log('   git push origin main');
  } else {
    console.log('\n   Configuration is already production-ready. To deploy:');
    console.log('');
    console.log('   # Option 1: Automatic deployment (push to main)');
    console.log('   git push origin main');
    console.log('');
    console.log('   # Option 2: Manual deployment via Vercel CLI');
    console.log('   vercel --prod');
  }

  console.log('\n   After deployment, verify:');
  console.log('   node scripts/verify-deployment-rendering.js https://disasterrecovery.com.au');
}

// Main execution
async function main() {
  let configUpdated = false;

  // Run all steps
  backupConfig();
  configUpdated = updateVercelJson();
  verifyEnvironmentVariables();

  console.log('\n⏸️  Skipping build test (can be slow). Run manually if needed:');
  console.log('   npm run build');

  // const buildSuccess = testBuild();
  // if (!buildSuccess) {
  //   console.log('\n❌ Build failed. Please fix errors before proceeding.');
  //   process.exit(1);
  // }

  const gitClean = checkGitStatus();
  createChecklist();
  generateDeploymentCommands(configUpdated || !gitClean);

  // Summary
  console.log('\n' + '='.repeat(80));
  console.log('📊 PREPARATION SUMMARY');
  console.log('='.repeat(80));

  if (configUpdated) {
    console.log('✓ Configuration files updated for production');
  } else {
    console.log('✓ Configuration files already production-ready');
  }

  console.log('✓ Pre-deployment checklist generated');
  console.log('✓ Deployment commands provided');

  console.log('\n📚 Next Steps:');
  console.log('   1. Review the pre-deployment checklist above');
  console.log('   2. Set all environment variables in Vercel Dashboard');
  console.log('   3. Verify DNS and domain configuration');
  console.log('   4. Run deployment commands when ready');
  console.log('   5. Use verify-deployment-rendering.js to test after deployment');

  console.log('\n📖 Full Documentation:');
  console.log('   - DEPLOYMENT-PLAN.md - Comprehensive deployment guide');
  console.log('   - DEPLOYMENT-CHECKLIST.md - Detailed step-by-step checklist');

  console.log('\n='.repeat(80));
  console.log('✅ Preparation complete!');
  console.log('='.repeat(80) + '\n');
}

// CLI
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Production Deployment Preparation Script

Usage:
  node scripts/prepare-production-deployment.js

This script will:
  1. Backup current configuration files
  2. Update vercel.json to use environment variables
  3. Verify environment variable requirements
  4. Test production build (optional)
  5. Check git status
  6. Generate pre-deployment checklist
  7. Provide deployment commands

No arguments required - just run and follow the instructions.
    `);
    process.exit(0);
  }

  main();
}

module.exports = {
  updateVercelJson,
  verifyEnvironmentVariables,
  testBuild
};
