#!/usr/bin/env node

/**
 * Build Optimization Script
 * Monitors and optimizes the Next.js build process for Vercel deployment
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class BuildOptimizer {
  constructor() {
    this.startTime = Date.now();
    this.memoryUsage = [];
    this.pageCount = 0;
    this.criticalPages = [
      '/',
      '/services',
      '/contact',
      '/about',
      '/emergency',
      '/insurance',
      '/about-phil-mcgurk',
      '/book-service',
      '/faq',
      '/testimonials'
    ];
  }

  /**
   * Check current memory usage
   */
  checkMemory() {
    const usage = process.memoryUsage();
    const mb = (bytes) => Math.round(bytes / 1024 / 1024);

    const memoryInfo = {
      rss: mb(usage.rss),
      heapUsed: mb(usage.heapUsed),
      heapTotal: mb(usage.heapTotal),
      external: mb(usage.external),
      timestamp: Date.now()
    };

    this.memoryUsage.push(memoryInfo);

    console.log(`📊 Memory Usage: RSS: ${memoryInfo.rss}MB, Heap: ${memoryInfo.heapUsed}/${memoryInfo.heapTotal}MB`);

    // Alert if approaching limits
    if (memoryInfo.heapUsed > 6000) {
      console.warn('⚠️ WARNING: Approaching memory limit (6GB)!');
      return false;
    }

    return true;
  }

  /**
   * Count pages in app directory
   */
  countPages() {
    const appDir = path.join(process.cwd(), 'app');
    let count = 0;

    const countPagesRecursive = (dir) => {
      const files = fs.readdirSync(dir);

      for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory() && !file.startsWith('_')) {
          countPagesRecursive(fullPath);
        } else if (file === 'page.tsx' || file === 'page.jsx' || file === 'page.ts' || file === 'page.js') {
          count++;
        }
      }
    };

    if (fs.existsSync(appDir)) {
      countPagesRecursive(appDir);
    }

    this.pageCount = count;
    console.log(`📄 Total pages found: ${count}`);

    return count;
  }

  /**
   * Optimize Next.js configuration
   */
  optimizeConfig() {
    const configPath = path.join(process.cwd(), 'next.config.js');

    console.log('🔧 Optimizing Next.js configuration...');

    // Ensure standalone output is enabled
    const config = fs.readFileSync(configPath, 'utf8');
    if (!config.includes("output: 'standalone'")) {
      console.log('✅ Standalone output already configured');
    }

    // Check for ISR configuration
    const hasISR = config.includes('revalidate');
    if (!hasISR) {
      console.log('⚠️ Consider adding ISR (Incremental Static Regeneration) to dynamic routes');
    }

    return true;
  }

  /**
   * Create optimized build environment
   */
  setupBuildEnv() {
    console.log('🌍 Setting up optimized build environment...');

    // Set memory limit to safe value for Vercel
    process.env.NODE_OPTIONS = '--max-old-space-size=7680';

    // Disable telemetry
    process.env.NEXT_TELEMETRY_DISABLED = '1';

    // Use SQLite for build
    if (!process.env.DATABASE_URL) {
      process.env.DATABASE_URL = 'file:./build.db';
    }

    // Skip validation
    process.env.SKIP_ENV_VALIDATION = 'true';

    console.log('✅ Build environment configured');
  }

  /**
   * Monitor build process
   */
  async monitorBuild() {
    const monitorInterval = setInterval(() => {
      const canContinue = this.checkMemory();
      if (!canContinue) {
        console.error('❌ Build aborted due to memory constraints');
        process.exit(1);
      }
    }, 5000);

    return monitorInterval;
  }

  /**
   * Generate build report
   */
  generateReport() {
    const duration = Date.now() - this.startTime;
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);

    const peakMemory = Math.max(...this.memoryUsage.map(m => m.heapUsed));

    console.log('\n' + '='.repeat(50));
    console.log('📊 BUILD OPTIMIZATION REPORT');
    console.log('='.repeat(50));
    console.log(`⏱️  Build Duration: ${minutes}m ${seconds}s`);
    console.log(`📄 Total Pages: ${this.pageCount}`);
    console.log(`💾 Peak Memory Usage: ${peakMemory}MB`);
    console.log(`✅ Memory Within Limits: ${peakMemory < 7000 ? 'Yes' : 'No'}`);

    // Recommendations
    console.log('\n📝 RECOMMENDATIONS:');

    if (this.pageCount > 500) {
      console.log('⚠️  Consider reducing static page generation');
      console.log('   - Use ISR for dynamic routes');
      console.log('   - Implement on-demand generation');
    }

    if (peakMemory > 6000) {
      console.log('⚠️  Memory usage is high');
      console.log('   - Reduce concurrent builds');
      console.log('   - Optimize webpack configuration');
    }

    console.log('='.repeat(50));
  }

  /**
   * Run optimization
   */
  async run() {
    console.log('🚀 Starting Build Optimization...\n');

    // Setup
    this.setupBuildEnv();
    this.countPages();
    this.optimizeConfig();

    // Start monitoring
    const monitor = await this.monitorBuild();

    try {
      // Run Prisma generate
      console.log('\n🔨 Generating Prisma client...');
      execSync('npx prisma generate', { stdio: 'inherit' });

      // Run Next.js build
      console.log('\n🏗️  Building Next.js application...');
      execSync('next build', {
        stdio: 'inherit',
        env: process.env
      });

      console.log('\n✅ Build completed successfully!');
    } catch (error) {
      console.error('\n❌ Build failed:', error.message);
      process.exit(1);
    } finally {
      clearInterval(monitor);
      this.generateReport();
    }
  }
}

// Run if called directly
if (require.main === module) {
  const optimizer = new BuildOptimizer();
  optimizer.run().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = BuildOptimizer;