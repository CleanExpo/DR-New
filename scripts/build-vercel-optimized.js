#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Vercel Optimized Build...\n');

// Clean previous builds
console.log('🧹 Cleaning previous builds...');
const nextDir = path.join(process.cwd(), '.next');
if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true });
  console.log('✅ Cleaned .next directory');
}

// Set optimized environment for Vercel
process.env.NODE_OPTIONS = '--max-old-space-size=4096';
process.env.NEXT_TELEMETRY_DISABLED = '1';
process.env.SKIP_ENV_VALIDATION = 'true';
process.env.NEXT_BUILD_WORKERS = '2'; // Limit concurrent builds

// Use SQLite for build
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'file:./build.db';
}

console.log('📊 Build Configuration:');
console.log(`   Memory Limit: 4096MB`);
console.log(`   Build Workers: 2`);
console.log(`   Telemetry: Disabled`);
console.log(`   Database: SQLite\n`);

try {
  // Generate Prisma client
  console.log('🔨 Generating Prisma client...');
  execSync('npx prisma generate', {
    stdio: 'inherit',
    env: process.env
  });
  console.log('✅ Prisma client generated\n');

  // Build with limited concurrency and memory
  console.log('🏗️  Building Next.js application...');
  console.log('   This may take a few minutes...\n');

  execSync('next build', {
    stdio: 'inherit',
    env: {
      ...process.env,
      NEXT_BUILD_WORKERS: '2',
      NODE_ENV: 'production',
    }
  });

  console.log('\n✅ Build completed successfully!');

  // Show build stats if available
  const buildManifest = path.join(process.cwd(), '.next', 'build-manifest.json');
  if (fs.existsSync(buildManifest)) {
    const stats = fs.statSync(path.join(process.cwd(), '.next'));
    console.log(`\n📦 Build Size: ${(stats.size / 1024 / 1024).toFixed(2)}MB`);
  }

} catch (error) {
  console.error('\n❌ Build failed:', error.message);

  // Provide specific error guidance
  if (error.message.includes('JavaScript heap out of memory')) {
    console.error('\n💡 Memory Error Detected!');
    console.error('   Try reducing the number of static pages or use ISR');
  } else if (error.message.includes('timeout')) {
    console.error('\n💡 Timeout Error Detected!');
    console.error('   Consider implementing dynamic routes with ISR');
  }

  process.exit(1);
}

console.log('\n🎉 Vercel optimized build complete!');
console.log('   Ready for deployment\n');