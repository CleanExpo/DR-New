/** @type {import('next').NextConfig} */

// Optional bundle analyzer - only load if installed
let withBundleAnalyzer = (config) => config;
try {
  withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  });
} catch (e) {
  // Bundle analyzer not installed, continue without it
  console.log('Note: @next/bundle-analyzer not installed, skipping bundle analysis');
}

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Skip type checking and linting in production builds
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: true,
  },

  // Image optimization with SEO enhancements
  images: {
    domains: [
      'disaster-recovery-seven.vercel.app',
      'images.unsplash.com',
      'cloudinary.com'
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year for better SEO
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Headers for caching and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
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
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()'
          }
        ]
      },
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable, stale-while-revalidate=86400'
          }
        ]
      },
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable, stale-while-revalidate=86400'
          },
          {
            key: 'Accept-CH',
            value: 'DPR, Width, Viewport-Width'
          },
          {
            key: 'Vary',
            value: 'Accept-Encoding, DPR, Width'
          }
        ]
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/optimized/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable, stale-while-revalidate=86400'
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, max-age=31536000'
          }
        ]
      },
      {
        source: '/:all*(css|js)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
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

  // Rewrites for API routes
  async rewrites() {
    return {
      beforeFiles: [
        // API rewrites
        {
          source: '/api/v1/:path*',
          destination: '/api/:path*',
        }
      ]
    };
  },

  // Environment variables validation
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  },

  // Webpack configuration
  webpack: (config, { isServer, dev }) => {
    // Optimize chunks
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        sideEffects: false,
        usedExports: true,
        concatenateModules: true,
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          cacheGroups: {
            default: false,
            vendors: false,
            framework: {
              name: 'framework',
              chunks: 'all',
              test: /(?<!node_modules.*)[\\\\/]node_modules[\\\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\\\/]/,
              priority: 40,
              enforce: true,
            },
            commons: {
              name: 'commons',
              chunks: 'initial',
              minChunks: 2,
              priority: 20,
            },
            lib: {
              test(module) {
                return module.size() > 160000 &&
                  /node_modules[/\\]/.test(module.identifier());
              },
              name(module) {
                const crypto = require('crypto');
                const hash = crypto.createHash('sha256');
                hash.update(module.identifier());
                return hash.digest('hex').substring(0, 8);
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            styles: {
              name: 'styles',
              test: /\.(css|scss|sass)$/,
              chunks: 'all',
              enforce: true,
              priority: 10,
            }
          },
        },
      };
    }

    // Module replacements for smaller bundles
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'lodash': 'lodash-es',
      };
    }

    return config;
  },

  // Experimental features
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
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
      '@prisma/client'
    ],
    webVitalsAttribution: ['CLS', 'LCP', 'FID', 'FCP', 'TTFB'],
    gzipSize: true,
    cpus: 4,
    workerThreads: true,
    proxyTimeout: 30_000,
    craCompat: false,
    esmExternals: true,
    fullySpecified: false,
    adjustFontFallbacks: true,
    adjustFontFallbacksWithSizeAdjust: true,
  },

  // Production optimizations
  productionBrowserSourceMaps: false,
  compress: true,
  poweredByHeader: false,
  generateEtags: true,

  // Output configuration
  // Removed 'standalone' as it can cause issues with Vercel
  distDir: '.next',
};

module.exports = withBundleAnalyzer(nextConfig);