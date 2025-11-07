#!/usr/bin/env tsx
/**
 * Dead Code Removal Script
 * Removes unused API routes and features not needed for the local disaster recovery service
 */

import * as fs from 'fs/promises';
import * as path from 'path';

// Based on CLAUDE.md, these APIs are NOT needed for the local service
const UNUSED_API_ROUTES = [
  'app/api/contractors', // NO contractor management systems
  'app/api/fraud-detection', // Not needed for local service
  'app/api/proof-of-work', // Not needed for local service
  'app/api/demo', // Demo workflow not needed
  'app/api/elevenlabs', // TTS not needed
  'app/api/elevenlabs-tts', // TTS not needed
  'app/api/semrush', // SEO tool integration not needed
  'app/api/seo-intelligence', // Advanced SEO not needed
  'app/api/tickets', // Ticketing system not needed
  'app/admin/fraud-detection', // Admin pages not needed
  'app/admin/proof-of-work', // Admin pages not needed
  'app/admin/leads', // Lead management not needed
  'app/admin/seo-pages', // SEO admin not needed
  'app/admin/site-audit', // Audit admin not needed
];

// Directories that can be removed entirely
const UNUSED_DIRECTORIES = [
  'src/agents', // AI agents not needed
  'src/bots', // Bot system not needed
  'CRM_Reference', // CRM reference not needed
  'NRP-CRM', // CRM system not needed
  'Portals', // Portal system not needed
  'audio-system', // Audio system not needed
  'audio-system.backup', // Audio backup not needed
  'bots', // Bot system not needed
  'bots.backup', // Bot backup not needed
  'bot-system', // Bot system not needed
  'docker', // Docker not needed for local service
  'health-check', // Health check system not needed
];

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function removeFileOrDirectory(itemPath: string): Promise<void> {
  try {
    const stats = await fs.stat(itemPath);
    if (stats.isDirectory()) {
      await fs.rm(itemPath, { recursive: true, force: true });
      console.log(`  ✓ Removed directory: ${itemPath}`);
    } else {
      await fs.unlink(itemPath);
      console.log(`  ✓ Removed file: ${itemPath}`);
    }
  } catch (error: any) {
    if (error.code !== 'ENOENT') {
      console.error(`  ✗ Error removing ${itemPath}:`, error.message);
    }
  }
}

async function main() {
  console.log('🧹 Starting dead code removal...\n');

  // Remove unused API routes
  console.log('Removing unused API routes:');
  for (const route of UNUSED_API_ROUTES) {
    const fullPath = path.resolve(route);
    if (await fileExists(fullPath)) {
      await removeFileOrDirectory(fullPath);
    }
  }

  // Remove unused directories
  console.log('\nRemoving unused directories:');
  for (const dir of UNUSED_DIRECTORIES) {
    const fullPath = path.resolve(dir);
    if (await fileExists(fullPath)) {
      await removeFileOrDirectory(fullPath);
    }
  }

  // Clean up package.json scripts that reference removed code
  console.log('\nCleaning up package.json scripts...');
  const packageJsonPath = path.resolve('package.json');
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));

  const scriptsToRemove = [
    'dev:bot',
    'dev:all',
    'audit:site',
    'analyze:platform',
    'analyze:hrm',
    'analyze:agents'
  ];

  for (const script of scriptsToRemove) {
    if (packageJson.scripts[script]) {
      delete packageJson.scripts[script];
      console.log(`  ✓ Removed script: ${script}`);
    }
  }

  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

  console.log('\n✅ Dead code removal complete');
}

main().catch(console.error);