#!/usr/bin/env node
/**
 * Technical SEO Optimizer
 * Implements critical Core Web Vitals and performance optimizations
 */

const fs = require('fs');
const path = require('path');

class TechnicalSEOOptimizer {
  constructor() {
    this.optimizations = [];
    this.projectRoot = path.join(__dirname, '..');
  }

  async analyzeCurrentConfig() {
    console.log('🔍 Analyzing current technical SEO configuration...\n');

    const checks = [
      this.checkNextConfig(),
      this.checkImageOptimization(),
      this.checkFontOptimization(),
      this.checkCSSTail(),
      this.checkJavaScriptOptimization(),
      this.checkHTTPHeaders(),
      this.checkServiceWorker(),
      this.checkCoreWebVitals()
    ];

    const results = await Promise.all(checks);
    return results.flat();
  }

  checkNextConfig() {
    const configPath = path.join(this.projectRoot, 'next.config.js');
    const issues = [];

    try {
      const config = fs.readFileSync(configPath, 'utf8');

      // Check for performance optimizations
      if (!config.includes('swcMinify: true')) {
        issues.push({
          category: 'Performance',
          issue: 'SWC minification not enabled',
          impact: 'High',
          fix: 'Enable swcMinify in next.config.js'
        });
      }

      if (!config.includes('removeConsole:')) {
        issues.push({
          category: 'Performance',
          issue: 'Console.log statements not removed in production',
          impact: 'Medium',
          fix: 'Add removeConsole: process.env.NODE_ENV === "production"'
        });
      }

      if (!config.includes('optimizeCss')) {
        issues.push({
          category: 'Performance',
          issue: 'CSS optimization not enabled',
          impact: 'Medium',
          fix: 'Enable optimizeCss in experimental features'
        });
      }

      console.log('✅ Next.js config analysis complete');
    } catch (error) {
      issues.push({
        category: 'Configuration',
        issue: 'Cannot read next.config.js',
        impact: 'Critical',
        fix: 'Ensure next.config.js exists and is readable'
      });
    }

    return issues;
  }

  checkImageOptimization() {
    const issues = [];

    // Check for WebP/AVIF format support
    const configPath = path.join(this.projectRoot, 'next.config.js');
    try {
      const config = fs.readFileSync(configPath, 'utf8');

      if (!config.includes('image/avif')) {
        issues.push({
          category: 'Images',
          issue: 'AVIF format not configured',
          impact: 'High',
          fix: 'Add AVIF support to Next.js image config'
        });
      }

      if (!config.includes('minimumCacheTTL')) {
        issues.push({
          category: 'Images',
          issue: 'Image caching TTL not optimized',
          impact: 'Medium',
          fix: 'Set long cache TTL for images'
        });
      }

      console.log('✅ Image optimization analysis complete');
    } catch (error) {
      issues.push({
        category: 'Images',
        issue: 'Cannot analyze image configuration',
        impact: 'Medium',
        fix: 'Review image optimization settings'
      });
    }

    return issues;
  }

  checkFontOptimization() {
    const issues = [];
    const layoutPath = path.join(this.projectRoot, 'app', 'layout.tsx');

    try {
      const layout = fs.readFileSync(layoutPath, 'utf8');

      if (!layout.includes('display: \'swap\'')) {
        issues.push({
          category: 'Fonts',
          issue: 'Font display swap not configured',
          impact: 'High',
          fix: 'Add display: "swap" to font configurations'
        });
      }

      if (!layout.includes('preload: true')) {
        issues.push({
          category: 'Fonts',
          issue: 'Font preloading not enabled',
          impact: 'Medium',
          fix: 'Enable font preloading for critical fonts'
        });
      }

      console.log('✅ Font optimization analysis complete');
    } catch (error) {
      issues.push({
        category: 'Fonts',
        issue: 'Cannot analyze font configuration',
        impact: 'Medium',
        fix: 'Review font loading strategy'
      });
    }

    return issues;
  }

  checkCSSTail() {
    const issues = [];

    // Check for unused CSS
    const styleFiles = this.findStyleFiles();
    if (styleFiles.length > 8) {
      issues.push({
        category: 'CSS',
        issue: 'Multiple CSS files may cause render blocking',
        impact: 'Medium',
        fix: 'Consider consolidating CSS files'
      });
    }

    console.log('✅ CSS optimization analysis complete');
    return issues;
  }

  checkJavaScriptOptimization() {
    const issues = [];
    const configPath = path.join(this.projectRoot, 'next.config.js');

    try {
      const config = fs.readFileSync(configPath, 'utf8');

      if (!config.includes('splitChunks')) {
        issues.push({
          category: 'JavaScript',
          issue: 'Code splitting not optimized',
          impact: 'High',
          fix: 'Implement advanced code splitting strategy'
        });
      }

      console.log('✅ JavaScript optimization analysis complete');
    } catch (error) {
      issues.push({
        category: 'JavaScript',
        issue: 'Cannot analyze JS optimization',
        impact: 'Medium',
        fix: 'Review JavaScript bundling configuration'
      });
    }

    return issues;
  }

  checkHTTPHeaders() {
    const issues = [];
    const configPath = path.join(this.projectRoot, 'next.config.js');

    try {
      const config = fs.readFileSync(configPath, 'utf8');

      if (!config.includes('Cache-Control')) {
        issues.push({
          category: 'Caching',
          issue: 'Cache headers not optimized',
          impact: 'High',
          fix: 'Implement aggressive caching for static assets'
        });
      }

      if (!config.includes('X-DNS-Prefetch-Control')) {
        issues.push({
          category: 'Performance',
          issue: 'DNS prefetching not enabled',
          impact: 'Medium',
          fix: 'Enable DNS prefetch control headers'
        });
      }

      console.log('✅ HTTP headers analysis complete');
    } catch (error) {
      issues.push({
        category: 'Headers',
        issue: 'Cannot analyze HTTP headers',
        impact: 'Medium',
        fix: 'Review header configuration'
      });
    }

    return issues;
  }

  checkServiceWorker() {
    const issues = [];
    const swPath = path.join(this.projectRoot, 'public', 'sw.js');

    if (!fs.existsSync(swPath)) {
      issues.push({
        category: 'PWA',
        issue: 'Service Worker not implemented',
        impact: 'Medium',
        fix: 'Consider implementing Service Worker for caching'
      });
    }

    console.log('✅ Service Worker analysis complete');
    return issues;
  }

  checkCoreWebVitals() {
    const issues = [];
    const layoutPath = path.join(this.projectRoot, 'app', 'layout.tsx');

    try {
      const layout = fs.readFileSync(layoutPath, 'utf8');

      if (!layout.includes('WebVitalsReporter')) {
        issues.push({
          category: 'Core Web Vitals',
          issue: 'Web Vitals monitoring not found',
          impact: 'Medium',
          fix: 'Implement Web Vitals reporting'
        });
      }

      console.log('✅ Core Web Vitals analysis complete');
    } catch (error) {
      issues.push({
        category: 'Core Web Vitals',
        issue: 'Cannot analyze CWV setup',
        impact: 'Medium',
        fix: 'Review Core Web Vitals implementation'
      });
    }

    return issues;
  }

  findStyleFiles() {
    const stylesDir = path.join(this.projectRoot, 'styles');
    const appDir = path.join(this.projectRoot, 'app');
    let styleFiles = [];

    try {
      if (fs.existsSync(stylesDir)) {
        const files = fs.readdirSync(stylesDir);
        styleFiles = files.filter(file => file.endsWith('.css'));
      }
    } catch (error) {
      // Styles directory may not exist
    }

    return styleFiles;
  }

  generateOptimizations(issues) {
    const optimizations = {
      critical: issues.filter(i => i.impact === 'Critical'),
      high: issues.filter(i => i.impact === 'High'),
      medium: issues.filter(i => i.impact === 'Medium'),
      low: issues.filter(i => i.impact === 'Low')
    };

    const recommendations = {
      immediate: [
        'Enable SWC minification in Next.js config',
        'Implement aggressive caching headers',
        'Optimize font loading with display: swap',
        'Enable CSS optimization in production',
        'Remove console.log statements in production'
      ],
      performance: [
        'Implement advanced code splitting',
        'Add AVIF image format support',
        'Configure long-term image caching',
        'Enable DNS prefetch control',
        'Optimize Critical Rendering Path'
      ],
      monitoring: [
        'Implement Real User Monitoring (RUM)',
        'Set up Core Web Vitals tracking',
        'Monitor Largest Contentful Paint (LCP)',
        'Track Cumulative Layout Shift (CLS)',
        'Measure First Input Delay (FID)'
      ],
      advanced: [
        'Consider Service Worker implementation',
        'Implement resource hints (preload, prefetch)',
        'Optimize third-party scripts',
        'Implement lazy loading for below-fold content',
        'Consider HTTP/3 and QUIC protocol support'
      ]
    };

    return { optimizations, recommendations };
  }

  async generateReport() {
    console.log('🚀 Technical SEO Optimization Analysis\n');
    console.log('═══════════════════════════════════════\n');

    const issues = await this.analyzeCurrentConfig();
    const { optimizations, recommendations } = this.generateOptimizations(issues);

    const report = {
      analysisDate: new Date().toISOString(),
      domain: 'disasterrecovery.com.au',
      totalIssues: issues.length,
      issuesByCategory: {
        critical: optimizations.critical.length,
        high: optimizations.high.length,
        medium: optimizations.medium.length,
        low: optimizations.low.length
      },
      issues,
      recommendations,
      priorityActions: [
        '1. Fix all Critical and High impact issues immediately',
        '2. Implement Core Web Vitals monitoring',
        '3. Optimize Largest Contentful Paint (LCP) < 2.5s',
        '4. Minimize Cumulative Layout Shift (CLS) < 0.1',
        '5. Optimize First Input Delay (FID) < 100ms',
        '6. Implement Progressive Web App features',
        '7. Monitor and optimize Time to First Byte (TTFB)',
        '8. Set up performance budget monitoring'
      ],
      keyMetricsToTrack: [
        'Core Web Vitals scores',
        'PageSpeed Insights mobile/desktop scores',
        'First Contentful Paint (FCP)',
        'Largest Contentful Paint (LCP)',
        'First Input Delay (FID)',
        'Cumulative Layout Shift (CLS)',
        'Time to Interactive (TTI)',
        'Total Blocking Time (TBT)'
      ]
    };

    // Save report
    const reportPath = path.join(this.projectRoot, 'technical-seo-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // Display summary
    console.log('📊 TECHNICAL SEO ANALYSIS RESULTS:');
    console.log('════════════════════════════════════');
    console.log(`Total Issues Found: ${issues.length}`);
    console.log(`Critical: ${optimizations.critical.length} | High: ${optimizations.high.length} | Medium: ${optimizations.medium.length} | Low: ${optimizations.low.length}`);

    if (optimizations.critical.length > 0) {
      console.log('\n🚨 CRITICAL ISSUES:');
      optimizations.critical.forEach(issue => {
        console.log(`  • ${issue.issue}: ${issue.fix}`);
      });
    }

    if (optimizations.high.length > 0) {
      console.log('\n⚠️  HIGH PRIORITY ISSUES:');
      optimizations.high.forEach(issue => {
        console.log(`  • ${issue.issue}: ${issue.fix}`);
      });
    }

    console.log('\n🎯 IMMEDIATE ACTION ITEMS:');
    recommendations.immediate.forEach((rec, index) => {
      console.log(`  ${index + 1}. ${rec}`);
    });

    console.log('\n📈 CORE WEB VITALS TARGETS:');
    console.log('  • LCP (Largest Contentful Paint): < 2.5 seconds');
    console.log('  • FID (First Input Delay): < 100 milliseconds');
    console.log('  • CLS (Cumulative Layout Shift): < 0.1');

    console.log(`\n✅ Full technical SEO report saved to: technical-seo-report.json`);

    return report;
  }
}

// Run if called directly
if (require.main === module) {
  const optimizer = new TechnicalSEOOptimizer();
  optimizer.generateReport().catch(console.error);
}

module.exports = TechnicalSEOOptimizer;