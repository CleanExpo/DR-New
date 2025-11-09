/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? {
      '@fullhuman/postcss-purgecss': {
        content: [
          './app/**/*.{js,jsx,ts,tsx}',
          './components/**/*.{js,jsx,ts,tsx}',
          './lib/**/*.{js,jsx,ts,tsx}',
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: {
          standard: [
            'html',
            'body',
            'sr-only',
            'focus:not-sr-only',
            // Emergency CTA classes
            /^emergency-/,
            // Animation classes
            /^animate-/,
            // Dynamic classes
            /^bg-/,
            /^text-/,
            /^border-/,
            /^hover:/,
            /^focus:/,
            /^active:/,
            /^group-hover:/,
            // Radix UI dynamic classes
            /^data-\[/,
            /^rdx-/,
            // Framer Motion
            /^motion-/,
            // Toast notifications
            /^toast-/,
            /^sonner-/,
          ],
          deep: [
            // Keep all Radix UI styles
            /radix/,
            // Keep monitoring/analytics
            /gtag/,
            /clarity/,
            // Keep chart styles
            /recharts/,
            /chartjs/,
          ],
          greedy: [
            // Keep responsive variants
            /^sm:/,
            /^md:/,
            /^lg:/,
            /^xl:/,
            /^2xl:/,
          ],
        },
      },
      cssnano: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          normalizeWhitespace: true,
          minifyFontValues: true,
          minifyGradients: true,
          calc: true,
          colormin: true,
          convertValues: true,
          discardDuplicates: true,
          discardEmpty: true,
          discardOverridden: true,
          mergeLonghand: true,
          mergeRules: true,
          minifySelectors: true,
          normalizeCharset: true,
          normalizeDisplayValues: true,
          normalizePositions: true,
          normalizeRepeatStyle: true,
          normalizeString: true,
          normalizeTimingFunctions: true,
          normalizeUnicode: true,
          normalizeUrl: true,
          orderedValues: true,
          reduceIdents: false, // Keep this false to prevent breaking animations
          reduceInitial: true,
          reduceTransforms: true,
          svgo: true,
          uniqueSelectors: true,
        }],
      },
    } : {}),
  },
};

export default config;
