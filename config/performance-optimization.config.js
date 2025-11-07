/**
 * Comprehensive Performance Optimization Configuration
 * Target: Lighthouse 95+ | Core Web Vitals: Green
 * LCP < 2.5s | FID < 100ms | CLS < 0.1
 */

module.exports = {
  // Core Web Vitals Targets
  targets: {
    lcp: 2500, // 2.5 seconds
    fid: 100,  // 100ms
    cls: 0.1,  // Cumulative Layout Shift
    ttfb: 800, // Time to First Byte
    fcp: 1800, // First Contentful Paint
    lighthouse: {
      performance: 95,
      accessibility: 100,
      bestPractices: 100,
      seo: 100,
      pwa: 90
    }
  },

  // Image Optimization Settings
  images: {
    formats: ['avif', 'webp'],
    deviceSizes: [640, 750, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentDispositionType: 'inline',
    domains: ['dr-new-ten.vercel.app', 'disasterrecovery.com.au'],
    loader: 'default',
    loaderFile: '',
    disableStaticImages: false,
    staticImageMaxAge: 31536000,
    minimumCacheTTL: 60,
    formats: ['image/avif', 'image/webp'],
    unoptimized: false
  },

  // Critical CSS Configuration
  criticalCSS: {
    enabled: true,
    inline: true,
    extract: true,
    minify: true,
    penthouse: {
      url: 'http://localhost:3000',
      width: 1920,
      height: 1080,
      keepLargerMediaQueries: false,
      forceInclude: [
        '.emergency-cta',
        '.hero-section',
        '.header',
        '.nav'
      ],
      timeout: 30000,
      pageLoadSkipTimeout: 10000,
      renderTimeout: 10000,
      blockJS: false,
      screenshots: false,
      puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    }
  },

  // JavaScript Optimization
  javascript: {
    // Bundle Splitting Strategy
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // React Core
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
          name: 'react',
          priority: 40,
          reuseExistingChunk: true
        },
        // Next.js Framework
        framework: {
          test: /[\\/]node_modules[\\/](next|@next)[\\/]/,
          name: 'framework',
          priority: 35,
          reuseExistingChunk: true
        },
        // UI Libraries
        ui: {
          test: /[\\/]node_modules[\\/](@radix-ui|@headlessui|framer-motion|@heroicons)[\\/]/,
          name: 'ui',
          priority: 30,
          reuseExistingChunk: true
        },
        // Utilities
        utils: {
          test: /[\\/]node_modules[\\/](lodash|date-fns|axios|clsx|tailwind-merge)[\\/]/,
          name: 'utils',
          priority: 25,
          reuseExistingChunk: true
        },
        // Large Libraries (>160KB)
        lib: {
          test(module) {
            return module.size() > 160000 && /node_modules[/\\]/.test(module.identifier());
          },
          name(module) {
            const hash = require('crypto')
              .createHash('sha256')
              .update(module.identifier())
              .digest('hex');
            return `lib-${hash.substring(0, 8)}`;
          },
          priority: 20,
          minChunks: 1,
          reuseExistingChunk: true
        },
        // Common chunks
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
          priority: 10,
          reuseExistingChunk: true
        },
        // Default vendors
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 5,
          reuseExistingChunk: true
        }
      }
    },
    // Tree Shaking
    treeShaking: true,
    sideEffects: false,
    usedExports: true,
    // Minification
    minify: true,
    removeConsole: true,
    removeDebugger: true,
    // Module replacement for smaller bundles
    moduleReplacements: {
      'lodash': 'lodash-es',
      'moment': 'date-fns'
    }
  },

  // Font Optimization
  fonts: {
    preload: true,
    display: 'swap',
    adjustFontFallback: true,
    subsetRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
    formats: ['woff2'],
    selfHost: true,
    inline: false,
    prefetch: true,
    preconnect: ['https://fonts.googleapis.com', 'https://fonts.gstatic.com']
  },

  // CSS Optimization
  css: {
    minify: true,
    purge: {
      enabled: true,
      content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './app/**/*.{js,ts,jsx,tsx}'
      ],
      safelist: [
        'dark',
        /^(hover|focus|active|disabled|group-hover):/,
        /^(sm|md|lg|xl|2xl):/,
        /^(bg|text|border)-/
      ]
    },
    cssnano: {
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
    }
  },

  // Caching Strategy
  caching: {
    // Static assets - 1 year
    static: {
      maxAge: 31536000,
      immutable: true,
      sMaxAge: 31536000,
      staleWhileRevalidate: 86400
    },
    // HTML pages - 1 hour with revalidation
    html: {
      maxAge: 3600,
      sMaxAge: 3600,
      staleWhileRevalidate: 86400,
      mustRevalidate: true
    },
    // API responses - 5 minutes
    api: {
      maxAge: 300,
      sMaxAge: 300,
      staleWhileRevalidate: 60,
      private: false
    },
    // Images - 1 year
    images: {
      maxAge: 31536000,
      sMaxAge: 31536000,
      mustRevalidate: false
    },
    // Fonts - 1 year
    fonts: {
      maxAge: 31536000,
      immutable: true,
      crossOrigin: 'anonymous'
    }
  },

  // Preloading & Prefetching
  resourceHints: {
    preconnect: [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://vitals.vercel-insights.com'
    ],
    dns: [
      'https://cdn.jsdelivr.net',
      'https://unpkg.com'
    ],
    preload: [
      { href: '/fonts/inter.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
      { href: '/fonts/poppins.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' }
    ],
    prefetch: [
      '/api/services',
      '/api/testimonials'
    ]
  },

  // Service Worker Configuration
  serviceWorker: {
    enabled: true,
    strategies: {
      '/': 'NetworkFirst',
      '/api/*': 'NetworkFirst',
      '/_next/static/*': 'CacheFirst',
      '/_next/image/*': 'CacheFirst',
      '/images/*': 'CacheFirst',
      '/fonts/*': 'CacheFirst',
      '*.js': 'CacheFirst',
      '*.css': 'CacheFirst'
    },
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 31536000 // 1 year
          }
        }
      },
      {
        urlPattern: /^https:\/\/(www\.)?googletagmanager\.com/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'gtm-cache',
          networkTimeoutSeconds: 5
        }
      }
    ]
  },

  // CDN Configuration Recommendations
  cdn: {
    enabled: true,
    providers: ['cloudflare', 'vercel'],
    compression: ['gzip', 'brotli'],
    http2Push: true,
    edgeCaching: true,
    imageOptimization: true,
    minification: true,
    autoWebP: true,
    lazyLoad: true,
    http3: true
  },

  // Third-party Script Optimization
  thirdParty: {
    strategy: {
      'google-analytics': 'afterInteractive',
      'google-tag-manager': 'afterInteractive',
      'microsoft-clarity': 'lazyOnload',
      'facebook-pixel': 'lazyOnload',
      'hotjar': 'lazyOnload',
      'intercom': 'lazyOnload',
      'drift': 'lazyOnload'
    },
    loadDelay: 5000, // Delay non-critical scripts by 5s
    facade: true // Use facades for embedded content
  },

  // Lazy Loading Configuration
  lazyLoading: {
    images: {
      enabled: true,
      rootMargin: '100px',
      threshold: 0.01,
      placeholders: true,
      blurDataURL: true
    },
    components: {
      enabled: true,
      rootMargin: '200px',
      threshold: 0,
      suspense: true
    },
    routes: {
      enabled: true,
      prefetch: true,
      prefetchOnHover: true,
      priority: ['/', '/services', '/contact', '/emergency']
    }
  },

  // Bundle Analysis
  analyze: {
    enabled: process.env.ANALYZE === 'true',
    openAnalyzer: true,
    reportFilename: 'bundle-analysis.html',
    analyzerMode: 'static',
    defaultSizes: 'gzip'
  },

  // Monitoring & Reporting
  monitoring: {
    webVitals: true,
    realUserMonitoring: true,
    errorTracking: true,
    performanceMarks: true,
    customMetrics: true,
    reportUri: '/api/performance-report'
  },

  // Webpack Optimizations
  webpack: {
    optimization: {
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      minimize: true,
      sideEffects: false,
      usedExports: true,
      providedExports: true,
      concatenateModules: true,
      flagIncludedChunks: true,
      removeAvailableModules: true,
      removeEmptyChunks: true,
      mergeDuplicateChunks: true,
      nodeEnv: 'production'
    },
    performance: {
      maxAssetSize: 250000, // 250KB
      maxEntrypointSize: 500000, // 500KB
      hints: 'warning'
    }
  },

  // Production Optimizations
  production: {
    sourceMap: false,
    removeComments: true,
    removeConsole: true,
    minify: true,
    compress: true,
    mangle: true,
    deadCodeElimination: true,
    inlineStylesheets: true,
    optimizeFonts: true,
    optimizeImages: true,
    optimizeCss: true
  }
};