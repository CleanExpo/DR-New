const fs = require('fs');
const path = require('path');
const { PurgeCSS } = require('purgecss');

/**
 * Extract Critical CSS for above-the-fold content
 * This significantly improves First Contentful Paint (FCP)
 */

async function extractCriticalCSS() {
  console.log('Extracting critical CSS...');

  const purgeCSSResults = await new PurgeCSS().purge({
    content: [
      './app/page.tsx',
      './app/layout.tsx',
      './components/LandingHeader.tsx',
      './components/hero/**/*.tsx',
      './components/ui/button.tsx',
      './components/ui/emergency-cta.tsx',
    ],
    css: [
      './src/styles/globals.css',
      './.next/static/css/*.css',
    ],
    safelist: {
      standard: [
        'html',
        'body',
        'main',
        /^animate-/,
        /^transition-/,
      ],
      deep: [
        /^hover:/,
        /^focus:/,
        /^active:/,
      ],
    },
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
  });

  // Combine all purged CSS
  const criticalCSS = purgeCSSResults.map(result => result.css).join('\n');

  // Minify the critical CSS
  const minifiedCSS = criticalCSS
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\s+/g, ' ') // Collapse whitespace
    .replace(/\s*([{}:;,])\s*/g, '$1') // Remove whitespace around special chars
    .trim();

  // Create output directory
  const outputDir = path.join(__dirname, '..', 'public', 'critical-css');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write critical CSS to file
  const outputPath = path.join(outputDir, 'critical.css');
  fs.writeFileSync(outputPath, minifiedCSS);

  // Also create an inline version for direct injection
  const inlineOutputPath = path.join(outputDir, 'critical.inline.js');
  const inlineJS = `export const criticalCSS = \`${minifiedCSS.replace(/`/g, '\\`')}\`;`;
  fs.writeFileSync(inlineOutputPath, inlineJS);

  console.log(`Critical CSS extracted: ${minifiedCSS.length} bytes`);
  console.log(`Saved to: ${outputPath}`);
  console.log(`Inline version: ${inlineOutputPath}`);

  // Calculate compression ratio
  const originalSize = fs.readFileSync('./src/styles/globals.css', 'utf8').length;
  const compressionRatio = ((1 - minifiedCSS.length / originalSize) * 100).toFixed(2);
  console.log(`Compression ratio: ${compressionRatio}%`);

  return minifiedCSS;
}

// Run if executed directly
if (require.main === module) {
  extractCriticalCSS()
    .then(() => console.log('Critical CSS extraction complete'))
    .catch(error => {
      console.error('Critical CSS extraction failed:', error);
      process.exit(1);
    });
}

module.exports = { extractCriticalCSS };