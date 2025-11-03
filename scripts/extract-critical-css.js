#!/usr/bin/env node

/**
 * Critical CSS Extraction for Disaster Recovery Website
 * Extracts and inlines critical CSS for above-the-fold content
 *
 * Benefits:
 * - Reduces render-blocking CSS
 * - Improves First Contentful Paint (FCP)
 * - Optimises Largest Contentful Paint (LCP)
 * - Enhances Core Web Vitals scores
 */

const fs = require('fs').promises;
const path = require('path');
const { chromium } = require('playwright');
const CleanCSS = require('clean-css');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// Configuration
const CONFIG = {
  // Pages to extract critical CSS from
  pages: [
    { url: '/', name: 'home' },
    { url: '/services/water-damage', name: 'water-damage' },
    { url: '/services/fire-damage', name: 'fire-damage' },
    { url: '/services/mould-remediation', name: 'mould-remediation' },
    { url: '/locations/brisbane', name: 'brisbane' },
    { url: '/contact', name: 'contact' },
  ],

  // Viewport sizes for critical CSS extraction
  viewports: [
    { width: 320, height: 568, name: 'mobile-small' },
    { width: 375, height: 667, name: 'mobile' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 1366, height: 768, name: 'desktop' },
    { width: 1920, height: 1080, name: 'desktop-full' },
  ],

  // Output directory
  outputDir: path.join(process.cwd(), 'public', 'css', 'critical'),

  // Base URL for local development
  baseUrl: 'http://localhost:3000',

  // CSS minification options
  minifyOptions: {
    level: {
      2: {
        mergeAdjacentRules: true,
        mergeIntoShorthands: true,
        mergeMedia: true,
        mergeNonAdjacentRules: true,
        mergeSemantically: false,
        overrideProperties: true,
        removeEmpty: true,
        reduceNonAdjacentRules: true,
        removeDuplicateFontRules: true,
        removeDuplicateMediaBlocks: true,
        removeDuplicateRules: true,
        removeUnusedAtRules: false,
        restructureRules: false,
        skipProperties: [],
      },
    },
  },

  // Critical CSS options
  criticalOptions: {
    // Fold height for above-the-fold content
    foldHeight: {
      mobile: 667,
      tablet: 768,
      desktop: 900,
    },

    // CSS to always include
    forceInclude: [
      // Font faces
      /^@font-face/,
      // CSS custom properties (variables)
      /^:root/,
      // Critical animations
      /^@keyframes/,
      // Media queries for responsive design
      /^@media/,
    ],

    // CSS to exclude
    forceExclude: [
      // Print styles
      /@media print/,
      // Below-fold animations
      /\.fade-in-up/,
      // Modal styles (loaded on demand)
      /\.modal/,
      // Tooltip styles
      /\.tooltip/,
    ],
  },
};

// Colour codes for console output
const colours = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

/**
 * Extract critical CSS from a page
 */
async function extractCriticalCSS(page, viewport, pageUrl) {
  console.log(`  ${colours.cyan}→ Extracting for ${viewport.name} (${viewport.width}x${viewport.height})${colours.reset}`);

  // Set viewport
  await page.setViewportSize({
    width: viewport.width,
    height: viewport.height,
  });

  // Navigate to page
  await page.goto(pageUrl, { waitUntil: 'networkidle' });

  // Wait for fonts to load
  await page.evaluate(() => document.fonts.ready);

  // Extract all stylesheets
  const stylesheets = await page.evaluate(() => {
    const sheets = [];
    for (const sheet of document.styleSheets) {
      try {
        const rules = Array.from(sheet.cssRules || []);
        sheets.push({
          href: sheet.href,
          media: sheet.media.mediaText,
          rules: rules.map(rule => rule.cssText),
        });
      } catch (e) {
        // Skip cross-origin stylesheets
      }
    }
    return sheets;
  });

  // Get above-the-fold elements
  const foldHeight = CONFIG.criticalOptions.foldHeight[
    viewport.width <= 375 ? 'mobile' : viewport.width <= 768 ? 'tablet' : 'desktop'
  ];

  const visibleSelectors = await page.evaluate((height) => {
    const elements = document.querySelectorAll('*');
    const selectors = new Set();

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < height && rect.bottom > 0) {
        // Element is visible above the fold
        if (element.id) {
          selectors.add(`#${element.id}`);
        }
        if (element.className && typeof element.className === 'string') {
          element.className.split(' ').forEach((cls) => {
            if (cls) selectors.add(`.${cls}`);
          });
        }
        selectors.add(element.tagName.toLowerCase());
      }
    });

    return Array.from(selectors);
  }, foldHeight);

  // Filter CSS rules for critical styles
  const criticalRules = [];

  stylesheets.forEach((sheet) => {
    sheet.rules.forEach((rule) => {
      // Check if rule should be forced included
      const shouldForceInclude = CONFIG.criticalOptions.forceInclude.some((pattern) =>
        pattern.test(rule)
      );

      // Check if rule should be forced excluded
      const shouldForceExclude = CONFIG.criticalOptions.forceExclude.some((pattern) =>
        pattern.test(rule)
      );

      if (shouldForceInclude && !shouldForceExclude) {
        criticalRules.push(rule);
      } else if (!shouldForceExclude) {
        // Check if rule matches visible selectors
        const matchesVisible = visibleSelectors.some((selector) =>
          rule.includes(selector)
        );

        if (matchesVisible) {
          criticalRules.push(rule);
        }
      }
    });
  });

  return criticalRules.join('\n');
}

/**
 * Optimise CSS with PostCSS
 */
async function optimiseCSS(css) {
  const result = await postcss([
    autoprefixer(),
    cssnano({
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
        normalizeWhitespace: true,
        colormin: true,
        convertValues: true,
        calc: true,
        reduceIdents: true,
        mergeIdents: true,
        mergeRules: true,
        discardUnused: true,
        discardOverridden: true,
        discardDuplicates: true,
        discardEmpty: true,
        minifySelectors: true,
        minifyParams: true,
        minifyFontValues: true,
        minifyGradients: true,
        normalizePositions: true,
        normalizeRepeatStyle: true,
        normalizeString: true,
        normalizeTimingFunctions: true,
        normalizeUnicode: true,
        normalizeUrl: true,
        orderedValues: true,
        reduceTransforms: true,
        svgo: true,
        uniqueSelectors: true,
      }],
    }),
  ]).process(css, { from: undefined });

  return result.css;
}

/**
 * Minify CSS with clean-css
 */
function minifyCSS(css) {
  const minifier = new CleanCSS(CONFIG.minifyOptions);
  const output = minifier.minify(css);

  if (output.errors.length > 0) {
    console.error(`${colours.red}Minification errors:${colours.reset}`, output.errors);
  }

  if (output.warnings.length > 0) {
    console.warn(`${colours.yellow}Minification warnings:${colours.reset}`, output.warnings);
  }

  return output.styles;
}

/**
 * Generate critical CSS for all pages
 */
async function generateCriticalCSS() {
  console.log(`\n${colours.blue}╔════════════════════════════════════════════╗${colours.reset}`);
  console.log(`${colours.blue}║  Critical CSS Extraction for DR Website   ║${colours.reset}`);
  console.log(`${colours.blue}╚════════════════════════════════════════════╝${colours.reset}\n`);

  // Ensure output directory exists
  await fs.mkdir(CONFIG.outputDir, { recursive: true });

  // Launch browser
  console.log(`${colours.yellow}🚀 Launching browser...${colours.reset}`);
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    const allCriticalCSS = {};

    // Process each page
    for (const pageConfig of CONFIG.pages) {
      console.log(`\n${colours.yellow}📄 Processing ${pageConfig.name}...${colours.reset}`);

      const pageCriticalCSS = {};
      const pageUrl = `${CONFIG.baseUrl}${pageConfig.url}`;

      // Extract critical CSS for each viewport
      for (const viewport of CONFIG.viewports) {
        const css = await extractCriticalCSS(page, viewport, pageUrl);

        // Optimise CSS
        const optimised = await optimiseCSS(css);

        // Minify CSS
        const minified = minifyCSS(optimised);

        pageCriticalCSS[viewport.name] = minified;

        const size = (Buffer.byteLength(minified, 'utf8') / 1024).toFixed(2);
        console.log(`  ${colours.green}✓${colours.reset} ${viewport.name}: ${size}KB`);
      }

      allCriticalCSS[pageConfig.name] = pageCriticalCSS;

      // Save individual page critical CSS
      const pageOutputPath = path.join(CONFIG.outputDir, `${pageConfig.name}.css`);
      const combinedCSS = Object.values(pageCriticalCSS).join('\n');
      await fs.writeFile(pageOutputPath, combinedCSS, 'utf8');
    }

    // Save combined critical CSS manifest
    const manifestPath = path.join(CONFIG.outputDir, 'critical-css-manifest.json');
    await fs.writeFile(manifestPath, JSON.stringify(allCriticalCSS, null, 2), 'utf8');

    // Generate inline script for loading critical CSS
    const inlineScript = generateInlineScript();
    const scriptPath = path.join(CONFIG.outputDir, 'load-critical-css.js');
    await fs.writeFile(scriptPath, inlineScript, 'utf8');

    // Print summary
    console.log(`\n${colours.blue}╔════════════════════════════════════════════╗${colours.reset}`);
    console.log(`${colours.blue}║              Extraction Summary            ║${colours.reset}`);
    console.log(`${colours.blue}╚════════════════════════════════════════════╝${colours.reset}\n`);

    let totalSize = 0;
    for (const [page, viewports] of Object.entries(allCriticalCSS)) {
      const sizes = Object.values(viewports).map(css => Buffer.byteLength(css, 'utf8'));
      const pageSize = sizes.reduce((a, b) => a + b, 0);
      totalSize += pageSize;

      console.log(`${colours.green}✓${colours.reset} ${page}: ${(pageSize / 1024).toFixed(2)}KB total`);
    }

    console.log(`\n${colours.cyan}📊 Total critical CSS size: ${(totalSize / 1024).toFixed(2)}KB${colours.reset}`);
    console.log(`${colours.cyan}📁 Output directory: ${CONFIG.outputDir}${colours.reset}`);

    // Performance recommendations
    console.log(`\n${colours.cyan}📊 Implementation Recommendations:${colours.reset}`);
    console.log(`  • Inline critical CSS in <head> for each page`);
    console.log(`  • Load full CSS asynchronously with rel="preload"`);
    console.log(`  • Use media queries to serve viewport-specific CSS`);
    console.log(`  • Implement CSS caching with Service Worker`);
    console.log(`  • Consider using CSS-in-JS for component-level critical CSS`);

  } catch (error) {
    console.error(`${colours.red}Error during extraction:${colours.reset}`, error);
    throw error;
  } finally {
    await browser.close();
  }
}

/**
 * Generate inline script for loading critical CSS
 */
function generateInlineScript() {
  return `
// Critical CSS Loader for Disaster Recovery Website
// Loads viewport-specific critical CSS for optimal performance

(function() {
  'use strict';

  // Detect viewport size
  function getViewportCategory() {
    const width = window.innerWidth;
    if (width <= 375) return 'mobile';
    if (width <= 768) return 'tablet';
    if (width <= 1366) return 'desktop';
    return 'desktop-full';
  }

  // Load critical CSS for current page and viewport
  function loadCriticalCSS() {
    const viewport = getViewportCategory();
    const page = window.location.pathname === '/' ? 'home' :
                 window.location.pathname.split('/').filter(Boolean)[0] || 'home';

    // Fetch critical CSS
    fetch('/css/critical/' + page + '.css')
      .then(response => response.text())
      .then(css => {
        // Create style element
        const style = document.createElement('style');
        style.textContent = css;
        style.setAttribute('data-critical', 'true');
        document.head.appendChild(style);

        // Mark critical CSS as loaded
        document.documentElement.classList.add('critical-css-loaded');
      })
      .catch(error => {
        console.error('Failed to load critical CSS:', error);
      });
  }

  // Load on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadCriticalCSS);
  } else {
    loadCriticalCSS();
  }

  // Preload full CSS asynchronously
  function preloadFullCSS() {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = '/css/main.css';
    link.onload = function() {
      this.rel = 'stylesheet';
    };
    document.head.appendChild(link);
  }

  // Preload after critical CSS
  window.addEventListener('load', preloadFullCSS);
})();
  `.trim();
}

// Run if called directly
if (require.main === module) {
  generateCriticalCSS()
    .then(() => {
      console.log(`\n${colours.green}✅ Critical CSS extraction complete!${colours.reset}\n`);
      process.exit(0);
    })
    .catch((error) => {
      console.error(`\n${colours.red}❌ Extraction failed:${colours.reset}`, error);
      process.exit(1);
    });
}

module.exports = { generateCriticalCSS, extractCriticalCSS, optimiseCSS };