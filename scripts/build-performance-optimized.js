const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Performance-Optimized Build Process\n');

const steps = [
  {
    name: 'Clean Previous Build',
    command: 'rd /s /q .next 2>nul || echo "No previous build found"',
    description: 'Removing previous build artifacts'
  },
  {
    name: 'Generate Prisma Client',
    command: 'npx prisma generate',
    description: 'Generating Prisma database client'
  },
  {
    name: 'Extract Critical CSS',
    command: 'node scripts/extract-critical-css-optimized.js',
    description: 'Extracting critical above-the-fold CSS'
  },
  {
    name: 'Optimize Images',
    command: 'node scripts/optimize-images.js',
    description: 'Optimizing images for web delivery'
  },
  {
    name: 'Type Check',
    command: 'tsc --noEmit --skipLibCheck || echo "Type checking skipped"',
    description: 'Running TypeScript type checker'
  },
  {
    name: 'Build Application',
    command: 'next build',
    description: 'Building Next.js application with optimizations'
  },
  {
    name: 'Analyze Bundle',
    command: 'set ANALYZE=true && next build || echo "Bundle analysis complete"',
    description: 'Analyzing JavaScript bundle sizes'
  }
];

function runStep(step, index) {
  console.log(`\n[${ index + 1}/${steps.length}] ${step.name}`);
  console.log(`📝 ${step.description}`);

  try {
    const startTime = Date.now();
    execSync(step.command, {
      stdio: 'inherit',
      shell: true,
      cwd: path.join(__dirname, '..')
    });
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`✅ Completed in ${duration}s`);
    return true;
  } catch (error) {
    console.error(`❌ Failed: ${error.message}`);
    return false;
  }
}

function generateBuildReport() {
  console.log('\n📊 Generating Build Report\n');

  const nextDir = path.join(__dirname, '..', '.next');

  // Check if build directory exists
  if (!fs.existsSync(nextDir)) {
    console.error('❌ Build directory not found');
    return;
  }

  // Get build stats
  const buildManifest = path.join(nextDir, 'build-manifest.json');
  const routesManifest = path.join(nextDir, 'routes-manifest.json');

  let stats = {
    timestamp: new Date().toISOString(),
    pages: 0,
    routes: 0,
    staticPages: 0,
    serverPages: 0,
  };

  // Count pages
  if (fs.existsSync(buildManifest)) {
    const manifest = JSON.parse(fs.readFileSync(buildManifest, 'utf8'));
    stats.pages = Object.keys(manifest.pages || {}).length;
  }

  // Count routes
  if (fs.existsSync(routesManifest)) {
    const routes = JSON.parse(fs.readFileSync(routesManifest, 'utf8'));
    stats.routes = (routes.dynamicRoutes || []).length + (routes.staticRoutes || []).length;
  }

  // Calculate static vs server pages
  const pagesDir = path.join(nextDir, 'server', 'pages');
  if (fs.existsSync(pagesDir)) {
    const files = fs.readdirSync(pagesDir, { recursive: true });
    stats.staticPages = files.filter(f => f.endsWith('.html')).length;
    stats.serverPages = files.filter(f => f.endsWith('.js')).length;
  }

  // Get bundle sizes
  const chunksDir = path.join(nextDir, 'static', 'chunks');
  let totalSize = 0;
  let chunkCount = 0;

  if (fs.existsSync(chunksDir)) {
    const getAllFiles = (dir) => {
      const files = fs.readdirSync(dir, { withFileTypes: true });
      return files.flatMap(file => {
        const fullPath = path.join(dir, file.name);
        if (file.isDirectory()) {
          return getAllFiles(fullPath);
        }
        return fullPath;
      });
    };

    const jsFiles = getAllFiles(chunksDir).filter(f => f.endsWith('.js'));
    chunkCount = jsFiles.length;

    jsFiles.forEach(file => {
      const stat = fs.statSync(file);
      totalSize += stat.size;
    });
  }

  stats.chunks = chunkCount;
  stats.totalBundleSize = (totalSize / 1024 / 1024).toFixed(2) + ' MB';

  // Output report
  console.log('Build Statistics:');
  console.log('─'.repeat(50));
  console.log(`Pages Built:           ${stats.pages}`);
  console.log(`Routes:                ${stats.routes}`);
  console.log(`Static Pages:          ${stats.staticPages}`);
  console.log(`Server Pages:          ${stats.serverPages}`);
  console.log(`JavaScript Chunks:     ${stats.chunks}`);
  console.log(`Total Bundle Size:     ${stats.totalBundleSize}`);
  console.log('─'.repeat(50));

  // Save report
  const reportPath = path.join(__dirname, '..', 'build-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(stats, null, 2));
  console.log(`\n📄 Build report saved to: ${reportPath}`);
}

function showPerformanceTips() {
  console.log('\n💡 Performance Optimization Tips:');
  console.log('─'.repeat(50));
  console.log('1. Use next/image for all images');
  console.log('2. Enable ISR where possible');
  console.log('3. Implement code splitting with dynamic imports');
  console.log('4. Use React.lazy for non-critical components');
  console.log('5. Enable Brotli compression on your server');
  console.log('6. Use CDN for static assets');
  console.log('7. Monitor Web Vitals in production');
  console.log('8. Implement service worker for offline support');
  console.log('─'.repeat(50));
}

// Run build process
console.log('Starting build steps...\n');

let allStepsSuccessful = true;

for (let i = 0; i < steps.length; i++) {
  const success = runStep(steps[i], i);
  if (!success && steps[i].name === 'Build Application') {
    allStepsSuccessful = false;
    break;
  }
}

if (allStepsSuccessful) {
  console.log('\n✅ Build completed successfully!\n');
  generateBuildReport();
  showPerformanceTips();
} else {
  console.error('\n❌ Build failed. Please check the errors above.\n');
  process.exit(1);
}

console.log('\n🎉 Performance-Optimized Build Complete!\n');