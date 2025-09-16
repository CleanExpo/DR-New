/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Image optimization configuration
  images: {
    // Enable image optimization API
    domains: [],

    // Device sizes for responsive images
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920, 2048, 3840],

    // Image sizes for srcset generation
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Supported image formats
    formats: ['image/avif', 'image/webp'],

    // Quality settings for optimized images
    quality: 85,

    // Minimum cache time for optimized images (31 days)
    minimumCacheTTL: 60 * 60 * 24 * 31,

    // Disable static imports to reduce bundle size
    disableStaticImages: false,

    // Enable dangerously allow SVG
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Performance optimizations
  swcMinify: true,

  // Compiler options for better performance
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',

    // Enable emotion for CSS-in-JS if needed
    emotion: false,

    // React Remove Properties in production
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },

  // Experimental features for better performance
  experimental: {
    // Optimize CSS loading
    optimizeCss: true,

    // Enable server components
    serverActions: {
      bodySizeLimit: '2mb',
    },

    // Optimize package imports
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-accordion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-tabs',
      '@radix-ui/react-tooltip',
      'framer-motion'
    ],
  },

  // Production optimizations
  productionBrowserSourceMaps: false,

  // Compress responses
  compress: true,

  // PoweredBy header removal for security
  poweredByHeader: false,

  // Custom headers for caching and security
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      },
      {
        // Static assets with long cache
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        // Font files with long cache
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        // API routes with no cache
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate'
          }
        ]
      }
    ];
  },

  // Resource hints and preloading
  async rewrites() {
    return {
      beforeFiles: [
        // Proxy image optimization through CDN if needed
        {
          source: '/cdn/images/:path*',
          destination: process.env.CDN_URL
            ? `${process.env.CDN_URL}/images/:path*`
            : '/images/:path*',
        },
      ],
    };
  },

  // Webpack configuration for bundle optimization
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      // Enable module concatenation
      config.optimization.concatenateModules = true;

      // Split chunks for better caching
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Framework chunk
          framework: {
            name: 'framework',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          // Library chunk
          lib: {
            test(module) {
              return module.size() > 160000 &&
                /node_modules[\\/]/.test(module.identifier());
            },
            name(module) {
              const hash = require('crypto')
                .createHash('sha1')
                .update(module.identifier())
                .digest('hex')
                .substring(0, 8);
              return `lib-${hash}`;
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          // Common chunk
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
            priority: 20,
          },
          // Shared chunk
          shared: {
            name(module, chunks) {
              return 'shared';
            },
            priority: 10,
            minChunks: 2,
            reuseExistingChunk: true,
          },
        },
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
      };

      // Minimize JavaScript
      config.optimization.minimize = true;

      // Use content hash for better caching
      config.optimization.moduleIds = 'deterministic';
      config.optimization.chunkIds = 'deterministic';
    }

    return config;
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://disasterrecovery.com.au',
    NEXT_PUBLIC_CDN_URL: process.env.NEXT_PUBLIC_CDN_URL || '',
  },

  // Output configuration
  output: 'standalone',

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;