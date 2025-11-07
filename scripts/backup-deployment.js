#!/usr/bin/env node

/**
 * Automated Deployment Backup System
 * Creates backups before deployments and enables quick rollback
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BACKUP_DIR = path.join(process.cwd(), '.backups');
const MAX_BACKUPS = 10; // Keep last 10 backups

class DeploymentBackup {
  constructor() {
    this.ensureBackupDirectory();
  }

  ensureBackupDirectory() {
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
      console.log('✅ Created backup directory');
    }
  }

  /**
   * Create a new backup
   */
  async createBackup(description = '') {
    console.log('\n📦 Creating deployment backup...\n');

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const gitCommit = this.getGitCommit();
    const gitBranch = this.getGitBranch();

    const backupName = `backup-${timestamp}-${gitCommit.substring(0, 7)}`;
    const backupPath = path.join(BACKUP_DIR, backupName);

    // Create backup metadata
    const metadata = {
      timestamp: new Date().toISOString(),
      commit: gitCommit,
      branch: gitBranch,
      description,
      files: []
    };

    // Create backup directory
    fs.mkdirSync(backupPath, { recursive: true });

    // Backup critical files and directories
    const itemsToBackup = [
      '.next',
      'package.json',
      'package-lock.json',
      'next.config.js',
      'vercel.json',
      'prisma/schema.prisma',
      '.env.production'
    ];

    for (const item of itemsToBackup) {
      try {
        const sourcePath = path.join(process.cwd(), item);
        if (fs.existsSync(sourcePath)) {
          const destPath = path.join(backupPath, item);
          this.copyRecursive(sourcePath, destPath);
          metadata.files.push(item);
          console.log(`✅ Backed up: ${item}`);
        }
      } catch (error) {
        console.warn(`⚠️  Failed to backup ${item}:`, error.message);
      }
    }

    // Create git bundle (full repository backup)
    try {
      const bundlePath = path.join(backupPath, 'repo.bundle');
      execSync(`git bundle create "${bundlePath}" --all`, {
        stdio: 'inherit'
      });
      console.log('✅ Created git bundle');
    } catch (error) {
      console.warn('⚠️  Failed to create git bundle:', error.message);
    }

    // Save metadata
    fs.writeFileSync(
      path.join(backupPath, 'metadata.json'),
      JSON.stringify(metadata, null, 2)
    );

    // Get backup size
    const size = this.getDirectorySize(backupPath);
    console.log(`\n✅ Backup created: ${backupName}`);
    console.log(`   Size: ${(size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Path: ${backupPath}\n`);

    // Cleanup old backups
    this.cleanupOldBackups();

    return {
      name: backupName,
      path: backupPath,
      metadata,
      size
    };
  }

  /**
   * List all available backups
   */
  listBackups() {
    console.log('\n📋 Available Backups:\n');

    const backups = fs.readdirSync(BACKUP_DIR)
      .filter(f => f.startsWith('backup-'))
      .sort()
      .reverse();

    if (backups.length === 0) {
      console.log('No backups found.\n');
      return [];
    }

    const backupList = backups.map((backup, index) => {
      const backupPath = path.join(BACKUP_DIR, backup);
      const metadataPath = path.join(backupPath, 'metadata.json');

      let metadata = { description: 'No description' };
      if (fs.existsSync(metadataPath)) {
        metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
      }

      const size = this.getDirectorySize(backupPath);
      const timestamp = new Date(metadata.timestamp);

      console.log(`${index + 1}. ${backup}`);
      console.log(`   Date: ${timestamp.toLocaleString()}`);
      console.log(`   Commit: ${metadata.commit}`);
      console.log(`   Branch: ${metadata.branch}`);
      console.log(`   Size: ${(size / 1024 / 1024).toFixed(2)} MB`);
      if (metadata.description) {
        console.log(`   Description: ${metadata.description}`);
      }
      console.log('');

      return {
        name: backup,
        path: backupPath,
        metadata,
        size
      };
    });

    return backupList;
  }

  /**
   * Restore from a backup
   */
  async restoreBackup(backupName) {
    console.log(`\n🔄 Restoring from backup: ${backupName}\n`);

    const backupPath = path.join(BACKUP_DIR, backupName);

    if (!fs.existsSync(backupPath)) {
      throw new Error(`Backup not found: ${backupName}`);
    }

    // Read metadata
    const metadataPath = path.join(backupPath, 'metadata.json');
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));

    console.log('Backup details:');
    console.log(`   Date: ${new Date(metadata.timestamp).toLocaleString()}`);
    console.log(`   Commit: ${metadata.commit}`);
    console.log(`   Branch: ${metadata.branch}\n`);

    // Confirm restore
    console.log('⚠️  This will overwrite current files!');
    console.log('Press Ctrl+C to cancel, or wait 5 seconds to continue...\n');
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Create backup of current state before restoring
    await this.createBackup('Pre-restore backup');

    // Restore files
    for (const file of metadata.files) {
      try {
        const sourcePath = path.join(backupPath, file);
        const destPath = path.join(process.cwd(), file);

        if (fs.existsSync(sourcePath)) {
          this.copyRecursive(sourcePath, destPath);
          console.log(`✅ Restored: ${file}`);
        }
      } catch (error) {
        console.error(`❌ Failed to restore ${file}:`, error.message);
      }
    }

    console.log('\n✅ Restore complete!\n');
    console.log('Next steps:');
    console.log('1. Review restored files');
    console.log('2. Run: npm install');
    console.log('3. Run: npm run build');
    console.log('4. Test the application\n');
  }

  /**
   * Cleanup old backups
   */
  cleanupOldBackups() {
    const backups = fs.readdirSync(BACKUP_DIR)
      .filter(f => f.startsWith('backup-'))
      .sort();

    if (backups.length > MAX_BACKUPS) {
      const toDelete = backups.slice(0, backups.length - MAX_BACKUPS);

      console.log(`\n🧹 Cleaning up ${toDelete.length} old backups...\n`);

      for (const backup of toDelete) {
        const backupPath = path.join(BACKUP_DIR, backup);
        fs.rmSync(backupPath, { recursive: true, force: true });
        console.log(`   Deleted: ${backup}`);
      }
    }
  }

  /**
   * Helper functions
   */
  getGitCommit() {
    try {
      return execSync('git rev-parse HEAD', { encoding: 'utf-8' }).trim();
    } catch {
      return 'unknown';
    }
  }

  getGitBranch() {
    try {
      return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
    } catch {
      return 'unknown';
    }
  }

  copyRecursive(source, dest) {
    const stats = fs.statSync(source);

    if (stats.isDirectory()) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }

      const files = fs.readdirSync(source);
      for (const file of files) {
        this.copyRecursive(
          path.join(source, file),
          path.join(dest, file)
        );
      }
    } else {
      const destDir = path.dirname(dest);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      fs.copyFileSync(source, dest);
    }
  }

  getDirectorySize(dirPath) {
    let size = 0;

    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        size += this.getDirectorySize(filePath);
      } else {
        size += stats.size;
      }
    }

    return size;
  }
}

// CLI Interface
async function main() {
  const command = process.argv[2] || 'create';
  const backup = new DeploymentBackup();

  try {
    switch (command) {
      case 'create':
        const description = process.argv[3] || '';
        await backup.createBackup(description);
        break;

      case 'list':
        backup.listBackups();
        break;

      case 'restore':
        const backupName = process.argv[3];
        if (!backupName) {
          console.error('❌ Please specify backup name');
          console.log('Usage: node backup-deployment.js restore <backup-name>');
          process.exit(1);
        }
        await backup.restoreBackup(backupName);
        break;

      case 'cleanup':
        backup.cleanupOldBackups();
        console.log('✅ Cleanup complete\n');
        break;

      default:
        console.log('Usage: node backup-deployment.js [command] [options]');
        console.log('Commands:');
        console.log('  create [description]  - Create a new backup');
        console.log('  list                  - List all backups');
        console.log('  restore <name>        - Restore from backup');
        console.log('  cleanup               - Remove old backups');
        process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { DeploymentBackup };
