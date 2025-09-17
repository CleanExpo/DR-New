#!/usr/bin/env node

/**
 * CRITICAL PERFORMANCE FIXES FOR LAUNCH DAY
 * Run this script to automatically fix the most critical performance issues
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting Critical Performance Fixes...\n');

const fixes = {
  completed: [],
  failed: [],
  warnings: []
};

// 1. Remove Heavy Unnecessary Dependencies
console.log('📦 Step 1: Removing unnecessary heavy dependencies...');
const unnecessaryPackages = [
  '@tensorflow/tfjs',        // AI library not needed
  'chart.js',                // Duplicate charting library
  'react-chartjs-2',         // Duplicate charting library
  'socket.io',               // Real-time not implemented
  'socket.io-client',        // Real-time not implemented
  'pusher',                  // Alternative real-time not used
  'pusher-js',               // Alternative real-time not used
];

unnecessaryPackages.forEach(pkg => {
  try {
    console.log(`  Removing ${pkg}...`);
    execSync(`npm uninstall ${pkg}`, { stdio: 'pipe' });
    fixes.completed.push(`Removed ${pkg}`);
  } catch (error) {
    console.log(`  ⚠️ Could not remove ${pkg} (may not be installed)`);
    fixes.warnings.push(`${pkg} not found or already removed`);
  }
});

// 2. Create image optimization instructions
console.log('\n🖼️ Step 2: Creating image optimization guide...');
const imageOptimizationGuide = `
# IMAGE OPTIMIZATION REQUIRED

## Critical Images to Optimize:

1. **hero-disaster-tornado.png** (2.0MB → needs to be <300KB)
   - Current: 2.0MB
   - Target: <300KB
   - Action: Resize to 1920px width, convert to WebP

2. **biohazard-remediation-services.png** (880KB → needs to be <200KB)
   - Current: 880KB
   - Target: <200KB
   - Action: Convert to WebP

3. **sewage-remediation-services.png** (640KB → needs to be <200KB)
   - Current: 640KB
   - Target: <200KB
   - Action: Convert to WebP

## Quick Fix Commands:

### Using ImageMagick (if installed):
\`\`\`bash
# Convert and resize hero-disaster-tornado.png
magick public/images/hero/hero-disaster-tornado.png -resize 1920x -quality 85 public/images/hero/hero-disaster-tornado.webp

# Convert other PNGs to WebP
magick public/images/hero/biohazard-remediation-services.png -quality 85 public/images/hero/biohazard-remediation-services.webp
magick public/images/hero/sewage-remediation-services.png -quality 85 public/images/hero/sewage-remediation-services.webp
\`\`\`

### Or use online tools:
1. https://squoosh.app/ (Google's image optimizer)
2. https://tinypng.com/ (For PNG optimization)
3. https://cloudconvert.com/png-to-webp (Batch conversion)

### Update component after optimization:
Replace image extensions in your components from .png to .webp
`;

fs.writeFileSync('IMAGE_OPTIMIZATION_GUIDE.md', imageOptimizationGuide);
fixes.completed.push('Created IMAGE_OPTIMIZATION_GUIDE.md');

// 3. Add performance optimization to next.config.js
console.log('\n⚡ Step 3: Optimizing Next.js configuration...');
const nextConfigPath = path.join(process.cwd(), 'next.config.js');
let nextConfig = fs.readFileSync(nextConfigPath, 'utf8');

// Check if optimizations already exist
if (!nextConfig.includes('deviceSizes')) {
  const optimizedConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,
  },
  // Optimize for production
  productionBrowserSourceMaps: false,
  // Enable standalone output for smaller deployments
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,`;

  nextConfig = nextConfig.replace('const nextConfig = {', optimizedConfig);
  fs.writeFileSync(nextConfigPath, nextConfig);
  fixes.completed.push('Optimized Next.js configuration');
} else {
  fixes.warnings.push('Next.js config already optimized');
}

// 4. Create emergency performance component
console.log('\n🆘 Step 4: Creating optimized hero component...');
const optimizedHeroComponent = `import Image from 'next/image';
import { memo } from 'react';

const HeroOptimized = memo(function HeroOptimized() {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center">
      {/* Optimized Hero Image with lazy loading */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/disaster-recovery-services.jpg"
          alt="24/7 Emergency Disaster Recovery Services in Brisbane"
          fill
          priority
          quality={75}
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
      </div>

      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          24/7 Emergency Disaster Recovery
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Brisbane's Trusted IICRC Certified Restoration Experts
        </p>

        {/* Emergency CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:1300309361"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call 1300 309 361
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-blue-600 bg-white rounded-lg hover:bg-gray-100 transition-colors"
          >
            Get Free Quote
          </a>
        </div>
      </div>
    </section>
  );
});

export default HeroOptimized;
`;

fs.writeFileSync('components/sections/HeroOptimized.tsx', optimizedHeroComponent);
fixes.completed.push('Created optimized hero component');

// 5. Create mobile sticky CTA component
console.log('\n📱 Step 5: Creating mobile sticky CTA...');
const mobileCTAComponent = `'use client';

import { useEffect, useState } from 'react';

export default function MobileStickyCAT() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <a
        href="tel:1300309361"
        className="flex items-center justify-center w-full py-4 text-white bg-red-600 hover:bg-red-700 transition-colors"
      >
        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <span className="font-bold text-lg">Emergency: 1300 309 361</span>
      </a>
    </div>
  );
}
`;

fs.writeFileSync('components/ui/MobileStickyCAT.tsx', mobileCTAComponent);
fixes.completed.push('Created mobile sticky CTA component');

// 6. Generate quick SSL setup guide
console.log('\n🔒 Step 6: Creating SSL setup guide...');
const sslGuide = `
# SSL CERTIFICATE SETUP GUIDE

## Option 1: Vercel Deployment (Recommended)
If deploying to Vercel, SSL is automatic. Just:
1. Connect your domain in Vercel dashboard
2. Vercel handles SSL automatically

## Option 2: Traditional Hosting

### Step 1: Obtain SSL Certificate
- Let's Encrypt (Free): https://letsencrypt.org/
- Or purchase from your hosting provider

### Step 2: Install Certificate
Contact your hosting provider for specific instructions.

### Step 3: Update Middleware
Add to middleware.ts:

\`\`\`typescript
// Force HTTPS redirect
if (process.env.NODE_ENV === 'production' &&
    !request.headers.get('x-forwarded-proto')?.includes('https')) {
  return NextResponse.redirect(
    \`https://\${request.headers.get('host')}\${request.nextUrl.pathname}\`,
    301
  );
}
\`\`\`

### Step 4: Update Environment Variables
In .env.production:
\`\`\`
NEXT_PUBLIC_SITE_URL=https://disasterrecovery.com.au
\`\`\`

## Verification
After setup, verify at: https://www.ssllabs.com/ssltest/
`;

fs.writeFileSync('SSL_SETUP_GUIDE.md', sslGuide);
fixes.completed.push('Created SSL setup guide');

// 7. Clean up and optimize package.json
console.log('\n🧹 Step 7: Cleaning package.json...');
try {
  execSync('npm prune', { stdio: 'pipe' });
  fixes.completed.push('Pruned unused packages');
} catch (error) {
  fixes.warnings.push('Could not prune packages');
}

// Generate final report
console.log('\n' + '='.repeat(60));
console.log('📊 PERFORMANCE FIX SUMMARY');
console.log('='.repeat(60));

console.log('\n✅ Completed Fixes:');
fixes.completed.forEach(fix => console.log(`   • ${fix}`));

if (fixes.warnings.length > 0) {
  console.log('\n⚠️ Warnings:');
  fixes.warnings.forEach(warning => console.log(`   • ${warning}`));
}

if (fixes.failed.length > 0) {
  console.log('\n❌ Failed:');
  fixes.failed.forEach(fail => console.log(`   • ${fail}`));
}

console.log('\n' + '='.repeat(60));
console.log('📋 NEXT STEPS:');
console.log('='.repeat(60));
console.log(`
1. IMAGES: Read IMAGE_OPTIMIZATION_GUIDE.md and optimize images
2. SSL: Follow SSL_SETUP_GUIDE.md for certificate setup
3. COMPONENT: Replace existing hero with HeroOptimized component
4. MOBILE: Add MobileStickyCAT to your layout
5. BUILD: Run 'npm run build' to test changes
6. TEST: Check load time is under 3 seconds

🎯 Target Metrics After Fixes:
   • Desktop Load: < 2 seconds
   • Mobile Load: < 3 seconds
   • Bundle Size: < 300KB
   • Image Sizes: < 300KB each

Run 'npm run build' to verify improvements.
`);

// Save summary to file
const summaryReport = {
  timestamp: new Date().toISOString(),
  fixes: fixes,
  nextSteps: [
    'Optimize images per IMAGE_OPTIMIZATION_GUIDE.md',
    'Setup SSL per SSL_SETUP_GUIDE.md',
    'Test build process',
    'Deploy to production'
  ]
};

fs.writeFileSync('performance-fix-summary.json', JSON.stringify(summaryReport, null, 2));
console.log('\n💾 Full report saved to performance-fix-summary.json');
console.log('✨ Script completed! Follow the next steps above.');