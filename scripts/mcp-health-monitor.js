#!/usr/bin/env node

/**
 * MCP Health Monitor & Failsafe System
 * Prevents MCP configuration from being accidentally destroyed
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const MCP_CONFIG_FILES = [
  '.mcp.json',
  'cline_mcp_config.json', 
  'mcp-complete-config.json',
  'claude_desktop_config.json'
];

const BACKUP_DIR = 'backups/mcp-configs';
const EXPECTED_SERVERS = [
  'context7',
  'sequential-thinking', 
  'memory',
  'stripe',
  'fetch',
  'github',
  'magic'
];

class MCPHealthMonitor {
  constructor() {
    this.ensureBackupDir();
  }

  ensureBackupDir() {
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }
  }

  // Create timestamped backup of all MCP configs
  createBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupSubDir = path.join(BACKUP_DIR, `mcp-backup-${timestamp}`);
    
    if (!fs.existsSync(backupSubDir)) {
      fs.mkdirSync(backupSubDir, { recursive: true });
    }

    console.log(`🔄 Creating MCP configuration backup...`);
    
    for (const configFile of MCP_CONFIG_FILES) {
      if (fs.existsSync(configFile)) {
        const backupPath = path.join(backupSubDir, configFile);
        fs.copyFileSync(configFile, backupPath);
        console.log(`✅ Backed up: ${configFile} -> ${backupPath}`);
      }
    }
    
    return backupSubDir;
  }

  // Validate MCP configuration health
  validateConfigurations() {
    console.log(`🔍 Validating MCP configurations...`);
    let issuesFound = [];

    for (const configFile of MCP_CONFIG_FILES) {
      if (!fs.existsSync(configFile)) {
        issuesFound.push(`❌ Missing config file: ${configFile}`);
        continue;
      }

      try {
        const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
        
        if (!config.mcpServers || Object.keys(config.mcpServers).length === 0) {
          issuesFound.push(`❌ ${configFile}: No MCP servers configured`);
          continue;
        }

        const configuredServers = Object.keys(config.mcpServers);
        const missingServers = EXPECTED_SERVERS.filter(server => !configuredServers.includes(server));
        
        if (missingServers.length > 0) {
          issuesFound.push(`⚠️  ${configFile}: Missing servers: ${missingServers.join(', ')}`);
        }

        // Check for the broken "filesystem" only configuration
        if (configuredServers.length === 1 && configuredServers[0] === 'filesystem') {
          issuesFound.push(`🚨 ${configFile}: CRITICAL - Contains only broken 'filesystem' server (commit dfdd2bd3 issue)`);
        }

        console.log(`✅ ${configFile}: ${configuredServers.length} servers configured`);
        
      } catch (error) {
        issuesFound.push(`❌ ${configFile}: Invalid JSON - ${error.message}`);
      }
    }

    return issuesFound;
  }

  // Test MCP server connectivity
  async testServerConnectivity() {
    console.log(`🔌 Testing MCP server connectivity...`);
    const results = [];

    // Test a few key servers with quick commands
    const testServers = [
      {
        name: 'memory',
        command: 'npx -y @modelcontextprotocol/server-memory --help',
        timeout: 5000
      },
      {
        name: 'context7',
        command: 'npx -y --node-options=--experimental-vm-modules @upstash/context7-mcp@1.0.6',
        timeout: 8000
      }
    ];

    for (const server of testServers) {
      try {
        console.log(`  Testing ${server.name}...`);
        // Quick test - we expect these to start running, not complete
        execSync(server.command, { 
          timeout: server.timeout,
          stdio: 'pipe'
        });
      } catch (error) {
        if (error.status === null) {
          // Timeout is expected for servers that start successfully
          results.push(`✅ ${server.name}: Server starts correctly`);
        } else {
          results.push(`❌ ${server.name}: Failed to start - ${error.message.split('\n')[0]}`);
        }
      }
    }

    return results;
  }

  // Generate health report
  generateHealthReport() {
    console.log(`\n📊 MCP HEALTH REPORT`);
    console.log(`==================`);
    
    const validationIssues = this.validateConfigurations();
    
    if (validationIssues.length === 0) {
      console.log(`✅ All MCP configurations are healthy`);
    } else {
      console.log(`🚨 Issues found:`);
      validationIssues.forEach(issue => console.log(`   ${issue}`));
    }
    
    console.log(`\n📝 Expected servers: ${EXPECTED_SERVERS.join(', ')}`);
    console.log(`📁 Backups stored in: ${BACKUP_DIR}`);
    
    return validationIssues.length === 0;
  }

  // Restore from most recent backup
  restoreFromBackup(backupDir = null) {
    if (!backupDir) {
      // Find most recent backup
      const backups = fs.readdirSync(BACKUP_DIR)
        .filter(dir => dir.startsWith('mcp-backup-'))
        .sort()
        .reverse();
      
      if (backups.length === 0) {
        console.log(`❌ No backups found in ${BACKUP_DIR}`);
        return false;
      }
      
      backupDir = path.join(BACKUP_DIR, backups[0]);
    }

    console.log(`🔄 Restoring MCP configurations from: ${backupDir}`);
    
    for (const configFile of MCP_CONFIG_FILES) {
      const backupPath = path.join(backupDir, configFile);
      if (fs.existsSync(backupPath)) {
        fs.copyFileSync(backupPath, configFile);
        console.log(`✅ Restored: ${configFile}`);
      }
    }
    
    return true;
  }
}

// CLI Interface
async function main() {
  const monitor = new MCPHealthMonitor();
  const args = process.argv.slice(2);
  const command = args[0] || 'check';

  switch (command) {
    case 'backup':
      monitor.createBackup();
      break;
      
    case 'check':
      const isHealthy = monitor.generateHealthReport();
      process.exit(isHealthy ? 0 : 1);
      break;
      
    case 'test':
      const testResults = await monitor.testServerConnectivity();
      testResults.forEach(result => console.log(result));
      break;
      
    case 'restore':
      const backupDir = args[1];
      monitor.restoreFromBackup(backupDir);
      break;
      
    case 'full-check':
      console.log(`🚀 Running full MCP health check...\n`);
      monitor.createBackup();
      const healthy = monitor.generateHealthReport();
      console.log(`\n🔌 Testing connectivity...`);
      const connectivity = await monitor.testServerConnectivity();
      connectivity.forEach(result => console.log(result));
      break;
      
    default:
      console.log(`
MCP Health Monitor Commands:
  backup      - Create backup of current MCP configurations  
  check       - Validate MCP configuration health
  test        - Test MCP server connectivity
  restore     - Restore from most recent backup
  full-check  - Run complete health check with backup and testing
`);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = MCPHealthMonitor;
