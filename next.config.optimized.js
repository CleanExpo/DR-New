/** @type {import('next').NextConfig} */

const perfConfig = require('./config/performance-optimization.config');

// Bundle Analyzer - optional
let withBundleAnalyzer = (config) => config;
try {
  withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
    openAnalyzer: true,
  });
} catch (e) {
  // Bundle analyzer not installed
}

// CSS Optimization Plugin
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const nextConfig = {
  // Core Configuration
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  generateEtags: true,

  // TypeScript & ESLint - Skip in production for faster builds
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },

  // Compiler Optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    reactRemoveProperties: process.env.NODE_ENV === 'production',
    styledComponents: true,
  },

  // Advanced Image Optimization
  images: {
    domains: perfConfig.images.domains,
    formats: perfConfig.images.formats,
    deviceSizes: perfConfig.images.deviceSizes,
    imageSizes: perfConfig.images.imageSizes,
    minimumCacheTTL: perfConfig.images.minimumCacheTTL,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'inline',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
  },

  // Headers for Optimal Caching and Performance
  async headers() {
    return [
      // Security Headers
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      },
      // Static Assets - 1 Year Cache
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      // Images - 1 Year Cache with Revalidation
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, must-revalidate'
          },
          {
            key: 'Accept-CH',
            value: 'DPR, Width, Viewport-Width'
          }
        ]
      },
      // Next.js Static Assets
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      // Fonts - 1 Year Cache
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          }
        ]
      },
      // API Routes - No Cache
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate'
          }
        ]
      },
      // HTML Pages - Short Cache with Revalidation
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400'
          }
        ]
      }
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      }
    ];
  },

  // Rewrites
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/v1/:path*',
          destination: '/api/:path*',
        }
      ]
    };
  },

  // Environment Variables
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  },

  // Advanced Webpack Configuration
  webpack: (config, { isServer, dev, webpack }) => {
    // Ignore warnings
    config.ignoreWarnings = [
      { module: /node_modules/ },
      /Attempted import error/,
    ];

    // Production Optimizations
    if (!dev) {
      // Advanced Minification
      config.optimization.minimizer = [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log', 'console.info', 'console.debug'],
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
        }),
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
                minifyFontValues: { removeQuotes: false },
              },
            ],
          },
        }),
      ];

      // Advanced Code Splitting
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        maxSize: 250000,
        cacheGroups: {
          // React Core
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            name: 'react',
            priority: 50,
            reuseExistingChunk: true,
          },
          // Next.js Framework
          framework: {
            test: /[\\/]node_modules[\\/](next|@next)[\\/]/,
            name: 'framework',
            priority: 45,
          },
          // UI Libraries
          ui: {
            test: /[\\/]node_modules[\\/](@radix-ui|@headlessui|framer-motion|@heroicons|lucide-react)[\\/]/,
            name: 'ui',
            priority: 40,
          },
          // Form & Validation
          forms: {
            test: /[\\/]node_modules[\\/](react-hook-form|@hookform|zod|yup)[\\/]/,
            name: 'forms',
            priority: 35,
          },
          // Utilities
          utils: {
            test: /[\\/]node_modules[\\/](lodash|date-fns|axios|clsx|tailwind-merge)[\\/]/,
            name: 'utils',
            priority: 30,
          },
          // Charts & Visualization
          charts: {
            test: /[\\/]node_modules[\\/](recharts|chart\.js|d3)[\\/]/,
            name: 'charts',
            priority: 25,
          },
          // Large Libraries
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
            reuseExistingChunk: true,
          },
          // Common chunks
          commons: {
            name: 'commons',
            chunks: 'initial',
            minChunks: 2,
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      };

      // Module concatenation
      config.optimization.concatenateModules = true;

      // Tree shaking
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;

      // Scope hoisting
      config.optimization.providedExports = true;

      // Performance hints
      config.performance = {
        maxAssetSize: 250000,
        maxEntrypointSize: 500000,
        hints: 'warning',
      };
    }

    // Module replacements for smaller bundles
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'lodash': 'lodash-es',
        'moment': 'date-fns',
      };

      // Preload critical chunks
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.BROWSER': true,
        })
      );
    }

    // Analyze bundle in production
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: './analyze.html',
          openAnalyzer: false,
        })
      );
    }

    return config;
  },

  // Experimental Features for Maximum Performance
  experimental: {
    // CSS Optimization
    optimizeCss: true,

    // Scroll Restoration
    scrollRestoration: true,

    // Output File Tracing Exclusions
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/core-linux-x64-gnu',
        'node_modules/@swc/core-linux-x64-musl',
        'node_modules/@prisma/engines',
        'node_modules/sharp',
        'node_modules/@next/swc-*',
        'node_modules/webpack',
      ],
    },

    // Optimize Package Imports
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'framer-motion',
      'recharts',
      'date-fns',
      '@headlessui/react',
      '@heroicons/react',
      'react-icons',
      'react-hook-form',
      '@hookform/resolvers',
      'zod',
      'axios',
      'clsx',
      'tailwind-merge',
    ],

    // Web Vitals Attribution
    webVitalsAttribution: ['CLS', 'LCP', 'FCP', 'FID', 'TTFB'],

    // Memory Optimization
    workerThreads: false,
    cpus: 1,

    // ISR Configuration
    isrFlushToDisk: true,

    // Incremental Cache
    incrementalCacheHandlerPath: undefined,

    // App Directory Features
    serverActions: {
      bodySizeLimit: '2mb',
    },

    // Turbo Mode (when available)
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // Production Browser Source Maps
  productionBrowserSourceMaps: false,

  // Output Configuration
  distDir: '.next',

  // Build Memory Management
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  // Static Page Generation Timeout
  staticPageGenerationTimeout: 120,

  // Build ID Generation
  generateBuildId: async () => {
    return 'dr-build-' + Date.now();
  },

  // Module Federation (for micro-frontends if needed)
  modularizeImports: {
    'lodash': {
      transform: 'lodash/{{member}}',
    },
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },

  // Trailing Slash Configuration
  trailingSlash: false,

  // Base Path (if needed)
  basePath: '',

  // Asset Prefix (for CDN)
  assetPrefix: process.env.CDN_URL || '',

  // Dev Indicators
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'bottom-right',
  },

  // Page Extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],

  // Serverless Target (deprecated, use output: 'standalone' instead)
  // target: 'serverless',

  // Output Mode
  output: process.env.VERCEL ? undefined : 'standalone',

  // HTTP Keep-Alive
  httpAgentOptions: {
    keepAlive: true,
  },

  // Cross-Origin Configuration
  crossOrigin: 'anonymous',
};

// Apply bundle analyzer if available
module.exports = withBundleAnalyzer(nextConfig);