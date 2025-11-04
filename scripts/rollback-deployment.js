#!/usr/bin/env node

/**
 * Deployment Rollback Script
 *
 * This script provides quick rollback capabilities for failed deployments:
 * 1. List recent deployments
 * 2. Identify last known good deployment
 * 3. Promote previous deployment to production
 * 4. Or revert Git commits
 */

const { execSync } = require('child_process');
const readline = require('readline');

const VERCEL_PROJECT = 'dr-new';
const VERCEL_SCOPE = 'unite-group';

function exec(command, options = {}) {
  try {
    return execSync(command, {
      encoding: 'utf8',
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options
    });
  } catch (error) {
    if (options.ignoreError) {
      return null;
    }
    throw error;
  }
}

function askQuestion(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

function listRecentDeployments() {
  console.log('🔍 Fetching recent deployments...\n');

  try {
    const output = exec(
      `vercel ls --scope ${VERCEL_SCOPE} | grep -E "(dr-new|Age|Deployment)"`,
      { silent: true, ignoreError: true }
    );

    if (output) {
      console.log(output);
    } else {
      console.log('⚠️  Could not fetch deployments via CLI');
      console.log('Check Vercel Dashboard: https://vercel.com/unite-group/dr-new/deployments');
    }
  } catch (error) {
    console.log('⚠️  Error fetching deployments');
    console.log('Check Vercel Dashboard: https://vercel.com/unite-group/dr-new/deployments');
  }
}

function getRecentCommits() {
  console.log('\n📝 Recent Git commits:\n');

  try {
    const commits = exec('git log --oneline -10', { silent: true });
    console.log(commits);
    return commits.split('\n').filter(Boolean);
  } catch (error) {
    console.log('⚠️  Could not fetch git commits');
    return [];
  }
}

async function rollbackViaVercel() {
  console.log('\n🔄 Rollback via Vercel Dashboard');
  console.log('='.repeat(80));
  console.log('\nTo rollback to a previous deployment:');
  console.log('');
  console.log('1. Open Vercel Dashboard:');
  console.log('   https://vercel.com/unite-group/dr-new/deployments');
  console.log('');
  console.log('2. Find the last working deployment (should have ● Ready status)');
  console.log('');
  console.log('3. Click the ⋯ (three dots) menu on that deployment');
  console.log('');
  console.log('4. Select "Promote to Production"');
  console.log('');
  console.log('5. Confirm the promotion');
  console.log('');
  console.log('⏱️  Estimated rollback time: 2-3 minutes');
  console.log('='.repeat(80));

  const answer = await askQuestion('\nDo you want to open the Vercel Dashboard? (y/n): ');

  if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
    const url = 'https://vercel.com/unite-group/dr-new/deployments';
    console.log(`\n🌐 Opening: ${url}`);

    try {
      if (process.platform === 'darwin') {
        exec(`open "${url}"`);
      } else if (process.platform === 'win32') {
        exec(`start "" "${url}"`);
      } else {
        exec(`xdg-open "${url}"`);
      }
    } catch (error) {
      console.log('⚠️  Could not open browser automatically');
      console.log(`Please open manually: ${url}`);
    }
  }
}

async function rollbackViaGit() {
  console.log('\n🔄 Rollback via Git Revert');
  console.log('='.repeat(80));

  const commits = getRecentCommits();

  if (commits.length === 0) {
    console.log('⚠️  Could not retrieve git commits');
    return;
  }

  console.log('\nTo rollback via Git:');
  console.log('');
  console.log('Option 1: Revert the last commit');
  console.log('   git revert HEAD');
  console.log('   git push origin main');
  console.log('');
  console.log('Option 2: Revert a specific commit');
  console.log('   git revert <commit-hash>');
  console.log('   git push origin main');
  console.log('');
  console.log('Option 3: Hard reset to previous commit (DANGEROUS!)');
  console.log('   git reset --hard <commit-hash>');
  console.log('   git push origin main --force');
  console.log('   ⚠️  WARNING: This will permanently delete commits!');
  console.log('');
  console.log('⏱️  Estimated rollback time: 5-10 minutes (including build)');
  console.log('='.repeat(80));

  const answer = await askQuestion('\nDo you want to revert the last commit? (y/n): ');

  if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
    console.log('\n🔄 Reverting last commit...');

    try {
      exec('git revert HEAD --no-edit');
      console.log('✓ Commit reverted locally');

      const pushAnswer = await askQuestion('\nPush to remote and trigger redeployment? (y/n): ');

      if (pushAnswer.toLowerCase() === 'y' || pushAnswer.toLowerCase() === 'yes') {
        exec('git push origin main');
        console.log('✓ Pushed to remote - deployment will start automatically');
        console.log('\n📊 Monitor deployment:');
        console.log('   vercel logs dr-new --prod --follow');
      } else {
        console.log('\n⏸️  Revert created locally but not pushed');
        console.log('   To push later: git push origin main');
      }
    } catch (error) {
      console.log('❌ Failed to revert commit');
      console.log('   You may need to resolve conflicts manually');
    }
  }
}

async function emergencyRollback() {
  console.log('\n🚨 EMERGENCY ROLLBACK');
  console.log('='.repeat(80));
  console.log('\nThis will attempt to rollback to the most recent successful deployment.');
  console.log('Use this only if the site is completely broken.');
  console.log('');

  const answer = await askQuestion('Are you sure you want to proceed? (yes/no): ');

  if (answer.toLowerCase() !== 'yes') {
    console.log('❌ Emergency rollback cancelled');
    return;
  }

  console.log('\n📋 Emergency Rollback Steps:');
  console.log('');
  console.log('1. Open Vercel Dashboard:');
  console.log('   https://vercel.com/unite-group/dr-new/deployments');
  console.log('');
  console.log('2. Find most recent deployment with ● Ready status');
  console.log('   (Skip any with ● Error or ● Building)');
  console.log('');
  console.log('3. Click ⋯ > Promote to Production');
  console.log('');
  console.log('4. Verify site is working:');
  console.log('   https://disasterrecovery.com.au');
  console.log('');
  console.log('5. After confirming rollback works:');
  console.log('   - Update team about the rollback');
  console.log('   - Review logs to identify the issue');
  console.log('   - Fix the issue before next deployment');
  console.log('');
  console.log('='.repeat(80));
}

function showRollbackOptions() {
  console.log('\n🔧 ROLLBACK OPTIONS');
  console.log('='.repeat(80));
  console.log('\n1. Vercel Dashboard Rollback (RECOMMENDED)');
  console.log('   - Fastest method (2-3 minutes)');
  console.log('   - No code changes needed');
  console.log('   - Can easily rollback again if needed');
  console.log('   - Best for: Deployment issues, runtime errors');
  console.log('');
  console.log('2. Git Revert Rollback');
  console.log('   - Takes 5-10 minutes (rebuild required)');
  console.log('   - Creates a revert commit in history');
  console.log('   - Preserves full git history');
  console.log('   - Best for: Bad code commits, configuration errors');
  console.log('');
  console.log('3. Emergency Rollback');
  console.log('   - Guided emergency procedure');
  console.log('   - For critical production issues');
  console.log('   - Step-by-step instructions');
  console.log('   - Best for: Site completely broken');
  console.log('');
  console.log('='.repeat(80));
}

async function checkCurrentStatus() {
  console.log('\n📊 Current Deployment Status');
  console.log('='.repeat(80));

  try {
    console.log('\n🌐 Production Site:');
    const prodCheck = exec(
      'curl -I https://disasterrecovery.com.au 2>&1 | grep -i "HTTP\\|server"',
      { silent: true, ignoreError: true }
    );

    if (prodCheck && prodCheck.includes('200')) {
      console.log('   ✓ Site is responding (HTTP 200)');
    } else if (prodCheck) {
      console.log(`   ⚠️  ${prodCheck.trim()}`);
    } else {
      console.log('   ⚠️  Could not check production site');
    }
  } catch (error) {
    console.log('   ⚠️  Could not check production site status');
  }

  try {
    console.log('\n🔍 Preview Site:');
    const previewCheck = exec(
      'curl -I https://dr-new-ten.vercel.app 2>&1 | grep -i "HTTP\\|server"',
      { silent: true, ignoreError: true }
    );

    if (previewCheck && previewCheck.includes('200')) {
      console.log('   ✓ Preview is responding (HTTP 200)');
    } else if (previewCheck) {
      console.log(`   ⚠️  ${previewCheck.trim()}`);
    } else {
      console.log('   ⚠️  Could not check preview site');
    }
  } catch (error) {
    console.log('   ⚠️  Could not check preview site status');
  }

  console.log('\n📝 Git Status:');
  try {
    const gitStatus = exec('git status --short', { silent: true });
    if (gitStatus.trim()) {
      console.log(gitStatus);
    } else {
      console.log('   ✓ Working directory is clean');
    }
  } catch (error) {
    console.log('   ⚠️  Could not check git status');
  }

  console.log('='.repeat(80));
}

async function main() {
  console.log('🚨 Disaster Recovery - Deployment Rollback Tool');
  console.log('='.repeat(80));

  await checkCurrentStatus();
  listRecentDeployments();
  showRollbackOptions();

  console.log('\nWhat would you like to do?');
  console.log('  1 - Rollback via Vercel Dashboard (Recommended)');
  console.log('  2 - Rollback via Git Revert');
  console.log('  3 - Emergency Rollback (Guided)');
  console.log('  4 - Just show me the information (no action)');
  console.log('  q - Quit');
  console.log('');

  const choice = await askQuestion('Enter your choice (1-4 or q): ');

  switch (choice.trim()) {
    case '1':
      await rollbackViaVercel();
      break;
    case '2':
      await rollbackViaGit();
      break;
    case '3':
      await emergencyRollback();
      break;
    case '4':
      console.log('\n✓ Information displayed above');
      break;
    case 'q':
    case 'Q':
      console.log('\n👋 Exiting without making changes');
      break;
    default:
      console.log('\n❌ Invalid choice');
      break;
  }

  console.log('\n📚 Additional Resources:');
  console.log('   - Deployment Plan: DEPLOYMENT-PLAN.md');
  console.log('   - Deployment Checklist: DEPLOYMENT-CHECKLIST.md');
  console.log('   - Verify Deployment: node scripts/verify-deployment-rendering.js');
  console.log('');
  console.log('='.repeat(80));
  console.log('✅ Rollback tool completed');
  console.log('='.repeat(80) + '\n');
}

// CLI
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Deployment Rollback Tool

Usage:
  node scripts/rollback-deployment.js

This interactive script helps you rollback a failed deployment:
  - Shows current deployment status
  - Lists recent deployments
  - Provides multiple rollback options
  - Guides you through the rollback process

No arguments required - just run and follow the prompts.
    `);
    process.exit(0);
  }

  main().catch((error) => {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  });
}
