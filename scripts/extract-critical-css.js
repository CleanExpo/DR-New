#!/usr/bin/env node

/**
 * Critical CSS Extraction Script
 * Extracts and inlines critical CSS for improved Core Web Vitals
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const puppeteer = require('puppeteer');
const chalk = require('chalk');
const ora = require('ora');
const PurgeCSS = require('purgecss').PurgeCSS;

class CriticalCSSExtractor {
  constructor() {
    this.spinner = ora();
    this.criticalStyles = new Map();
    this.uncriticalStyles = new Map();
    this.pages = [
      '/',
      '/services',
      '/contact',
      '/about',
      '/emergency',
      '/about-phil-mcgurk',
      '/service-areas',
      '/commercial',
      '/residential'
    ];
    this.viewports = [
      { width: 1920, height: 1080, device: 'desktop' },
      { width: 768, height: 1024, device: 'tablet' },
      { width: 375, height: 812, device: 'mobile' }
    ];
  }

  /**
   * Extract critical CSS using Puppeteer
   */
  async extractCriticalCSS(url, viewport) {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
      const page = await browser.newPage();
      await page.setViewport(viewport);

      // Navigate to page
      await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });

      // Extract critical CSS
      const criticalCSS = await page.evaluate(() => {
        const critical = new Set();
        const uncritical = new Set();

        // Get all stylesheets
        const styleSheets = Array.from(document.styleSheets);

        // Function to check if element is above the fold
        const isAboveFold = (element) => {
          const rect = element.getBoundingClientRect();
          return rect.top < window.innerHeight && rect.bottom > 0;
        };

        // Get all visible elements above the fold
        const visibleElements = Array.from(document.querySelectorAll('*')).filter(isAboveFold);

        // Process each stylesheet
        for (const sheet of styleSheets) {
          try {
            const rules = Array.from(sheet.cssRules || sheet.rules || []);

            for (const rule of rules) {
              if (rule.type === CSSRule.STYLE_RULE) {
                const selector = rule.selectorText;
                const matchesVisible = visibleElements.some(el => {
                  try {
                    return el.matches(selector);
                  } catch {
                    return false;
                  }
                });

                if (matchesVisible) {
                  critical.add(rule.cssText);
                } else {
                  uncritical.add(rule.cssText);
                }
              } else if (rule.type === CSSRule.MEDIA_RULE) {
                // Include media queries that might affect above-fold content
                const mediaRules = Array.from(rule.cssRules || []);
                const criticalMediaRules = [];

                for (const mediaRule of mediaRules) {
                  if (mediaRule.type === CSSRule.STYLE_RULE) {
                    const selector = mediaRule.selectorText;
                    const matchesVisible = visibleElements.some(el => {
                      try {
                        return el.matches(selector);
                      } catch {
                        return false;
                      }
                    });

                    if (matchesVisible) {
                      criticalMediaRules.push(mediaRule.cssText);
                    }
                  }
                }

                if (criticalMediaRules.length > 0) {
                  critical.add(`@media ${rule.media.mediaText} { ${criticalMediaRules.join(' ')} }`);
                }
              } else if (
                rule.type === CSSRule.FONT_FACE_RULE ||
                rule.type === CSSRule.KEYFRAMES_RULE
              ) {
                // Always include font-face and keyframes
                critical.add(rule.cssText);
              }
            }
          } catch (error) {
            // Skip inaccessible stylesheets (cross-origin)
            continue;
          }
        }

        return {
          critical: Array.from(critical).join('\n'),
          uncritical: Array.from(uncritical).join('\n')
        };
      });

      await browser.close();
      return criticalCSS;
    } catch (error) {
      await browser.close();
      throw error;
    }
  }

  /**
   * Purge unused CSS
   */
  async purgeUnusedCSS(cssContent, htmlContent) {
    const purgeCSSResult = await new PurgeCSS().purge({
      content: [
        {
          raw: htmlContent,
          extension: 'html'
        }
      ],
      css: [
        {
          raw: cssContent
        }
      ],
      safelist: {
        standard: [
          /^(hover|focus|active|disabled|group-hover):/,
          /^(sm|md|lg|xl|2xl):/,
          /^(bg|text|border)-/,
          'dark',
          'emergency-cta',
          'hero-section'
        ],
        deep: [/^swiper/],
        greedy: [/data-/]
      },
      variables: true,
      keyframes: true,
      fontFace: true
    });

    return purgeCSSResult[0]?.css || '';
  }

  /**
   * Minify CSS
   */
  minifyCSS(css) {
    const cssnano = require('cssnano');
    const postcss = require('postcss');

    return postcss([
      cssnano({
        preset: [
          'advanced',
          {
            discardComments: { removeAll: true },
            reduceIdents: true,
            mergeIdents: true,
            discardUnused: true,
            minifySelectors: true,
            minifyFontValues: true
          }
        ]
      })
    ])
      .process(css, { from: undefined })
      .then(result => result.css);
  }

  /**
   * Generate critical CSS file
   */
  async generateCriticalCSSFile() {
    const criticalCSS = Array.from(this.criticalStyles.values()).join('\n');
    const minifiedCSS = await this.minifyCSS(criticalCSS);

    // Create critical CSS file
    const outputPath = path.join(process.cwd(), 'styles', 'critical.css');
    fs.writeFileSync(outputPath, minifiedCSS);

    // Create uncritical CSS file (to be loaded async)
    const uncriticalCSS = Array.from(this.uncriticalStyles.values()).join('\n');
    const minifiedUncriticalCSS = await this.minifyCSS(uncriticalCSS);
    const uncriticalPath = path.join(process.cwd(), 'styles', 'uncritical.css');
    fs.writeFileSync(uncriticalPath, minifiedUncriticalCSS);

    return {
      criticalSize: Buffer.byteLength(minifiedCSS, 'utf8'),
      uncriticalSize: Buffer.byteLength(minifiedUncriticalCSS, 'utf8'),
      criticalPath,
      uncriticalPath
    };
  }

  /**
   * Create critical CSS component
   */
  createCriticalCSSComponent() {
    const componentContent = `'use client';

import { useEffect } from 'react';

// Critical CSS for above-the-fold content
const criticalCSS = \`
/* This file is auto-generated. Do not edit directly. */
${Array.from(this.criticalStyles.values()).join('\n')}
\`;

export function CriticalCSS() {
  useEffect(() => {
    // Load uncritical CSS asynchronously
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = '/styles/uncritical.css';
    link.onload = () => {
      link.rel = 'stylesheet';
    };
    document.head.appendChild(link);
  }, []);

  return (
    <style
      dangerouslySetInnerHTML={{ __html: criticalCSS }}
      data-critical="true"
    />
  );
}

export default CriticalCSS;`;

    const componentPath = path.join(process.cwd(), 'components', 'CriticalCSS.tsx');
    fs.writeFileSync(componentPath, componentContent);

    return componentPath;
  }

  /**
   * Process all pages
   */
  async processAllPages() {
    console.log(chalk.blue('\n🎨 Extracting Critical CSS...\n'));

    // Start dev server if not running
    const serverUrl = 'http://localhost:3000';

    for (const pagePath of this.pages) {
      for (const viewport of this.viewports) {
        const url = `${serverUrl}${pagePath}`;
        this.spinner.start(`Processing ${pagePath} (${viewport.device})...`);

        try {
          const { critical, uncritical } = await this.extractCriticalCSS(url, viewport);

          // Merge critical styles
          const key = `${pagePath}-${viewport.device}`;
          this.criticalStyles.set(key, critical);
          this.uncriticalStyles.set(key, uncritical);

          this.spinner.succeed(`Processed ${pagePath} (${viewport.device})`);
        } catch (error) {
          this.spinner.fail(`Failed ${pagePath} (${viewport.device}): ${error.message}`);
        }
      }
    }

    // Generate files
    this.spinner.start('Generating critical CSS files...');
    const result = await this.generateCriticalCSSFile();
    this.spinner.succeed('Generated critical CSS files');

    // Create component
    this.spinner.start('Creating React component...');
    const componentPath = this.createCriticalCSSComponent();
    this.spinner.succeed('Created React component');

    return result;
  }

  /**
   * Print summary
   */
  printSummary(result) {
    console.log(chalk.blue('\n' + '='.repeat(50)));
    console.log(chalk.blue('📊 CRITICAL CSS EXTRACTION SUMMARY'));
    console.log(chalk.blue('='.repeat(50)));
    console.log(chalk.green(`✅ Critical CSS: ${this.formatBytes(result.criticalSize)}`));
    console.log(chalk.yellow(`📦 Uncritical CSS: ${this.formatBytes(result.uncriticalSize)}`));
    console.log(chalk.cyan(`📁 Critical Path: ${result.criticalPath}`));
    console.log(chalk.cyan(`📁 Uncritical Path: ${result.uncriticalPath}`));
    console.log(chalk.blue('='.repeat(50) + '\n'));

    console.log(chalk.green('✨ Critical CSS extraction complete!'));
    console.log(chalk.yellow('\n📝 Next Steps:'));
    console.log(chalk.gray('1. Import CriticalCSS component in your layout'));
    console.log(chalk.gray('2. Remove or defer loading of full stylesheets'));
    console.log(chalk.gray('3. Test performance improvements with Lighthouse\n'));
  }

  /**
   * Format bytes
   */
  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

// CLI Interface
async function main() {
  const extractor = new CriticalCSSExtractor();

  try {
    // Check if dev server is running
    console.log(chalk.yellow('⚠️  Make sure Next.js dev server is running on http://localhost:3000'));
    console.log(chalk.gray('If not, run "npm run dev" in another terminal\n'));

    // Wait for user confirmation
    await new Promise(resolve => {
      console.log(chalk.cyan('Press Enter to continue...'));
      process.stdin.once('data', resolve);
    });

    const result = await extractor.processAllPages();
    extractor.printSummary(result);
  } catch (error) {
    console.error(chalk.red('\n❌ Error:'), error.message);
    process.exit(1);
  }
}

// Check if dependencies are installed
const requiredPackages = ['puppeteer', 'purgecss', 'cssnano', 'postcss'];
for (const pkg of requiredPackages) {
  try {
    require(pkg);
  } catch {
    console.error(chalk.red(`\n❌ ${pkg} is not installed!`));
    console.log(chalk.yellow(`Please install with: npm install ${pkg}\n`));
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main().catch(error => {
    console.error(chalk.red('\n❌ Fatal error:'), error);
    process.exit(1);
  });
}

module.exports = CriticalCSSExtractor;