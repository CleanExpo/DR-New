/**
 * Lighthouse CI Configuration for Disaster Recovery Website
 * Continuous performance monitoring and regression prevention
 */

module.exports = {
  ci: {
    collect: {
      // Static site collection
      staticDistDir: './out',

      // Or use URLs for dynamic collection
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/services/water-damage',
        'http://localhost:3000/services/fire-damage',
        'http://localhost:3000/services/mould-remediation',
        'http://localhost:3000/locations/brisbane',
        'http://localhost:3000/locations/ipswich',
        'http://localhost:3000/contact',
      ],

      // Number of runs per URL
      numberOfRuns: 3,

      // Chrome settings
      settings: {
        preset: 'desktop',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
        },
        screenEmulation: {
          mobile: false,
          width: 1920,
          height: 1080,
          deviceScaleFactor: 1,
          disabled: false,
        },
      },

      // Chrome flags
      chromeFlags: [
        '--disable-gpu',
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--disable-storage-reset',
      ],
    },

    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        // Performance metrics
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.95 }],

        // Core Web Vitals
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'first-contentful-paint': ['error', { maxNumericValue: 1800 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
        'max-potential-fid': ['error', { maxNumericValue: 100 }],
        'interactive': ['error', { maxNumericValue: 3800 }],
        'speed-index': ['error', { maxNumericValue: 3000 }],

        // Resource optimization
        'uses-webp-images': 'error',
        'uses-optimized-images': 'error',
        'uses-text-compression': 'error',
        'uses-responsive-images': 'error',
        'offscreen-images': 'error',
        'render-blocking-resources': ['error', { maxLength: 0 }],
        'unminified-css': ['error', { maxLength: 0 }],
        'unminified-javascript': ['error', { maxLength: 0 }],
        'unused-css-rules': ['error', { maxLength: 0 }],
        'unused-javascript': ['error', { maxNumericValue: 50000 }],

        // Caching
        'uses-long-cache-ttl': 'warn',
        'efficient-animated-content': 'warn',

        // Best practices
        'no-document-write': 'error',
        'js-libraries': 'warn',
        'image-aspect-ratio': 'warn',
        'image-size-responsive': 'warn',
        'preload-fonts': 'warn',

        // Accessibility
        'color-contrast': 'error',
        'document-title': 'error',
        'html-has-lang': 'error',
        'meta-description': 'error',
        'link-text': 'error',

        // Mobile specific (when running mobile tests)
        'viewport': 'error',
        'tap-targets': 'warn',
        'font-size': 'warn',
      },
    },

    upload: {
      // Temporary public storage (for testing)
      target: 'temporary-public-storage',

      // For production, use LHCI server
      // target: 'lhci',
      // serverBaseUrl: 'https://your-lhci-server.com',
      // token: 'YOUR_LHCI_BUILD_TOKEN',

      // GitHub status checks
      githubAppToken: process.env.LHCI_GITHUB_APP_TOKEN,
      githubStatusContextSuffix: '/performance',
    },

    // Server configuration (if running LHCI server)
    server: {
      port: 9001,
      storage: {
        storageMethod: 'sql',
        sqlDialect: 'sqlite',
        sqlDatabasePath: './lhci-data.db',
      },
    },
  },
};