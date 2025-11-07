module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' && {
      '@fullhuman/postcss-purgecss': {
        content: [
          './app/**/*.{js,ts,jsx,tsx,mdx}',
          './components/**/*.{js,ts,jsx,tsx,mdx}',
          './src/**/*.{js,ts,jsx,tsx,mdx}',
          './lib/**/*.{js,ts,jsx,tsx,mdx}',
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: {
          standard: [/^animate-/, /^transition-/, /^duration-/, /^ease-/, /^delay-/],
          deep: [/^hover:/, /^focus:/, /^active:/, /^group-hover:/, /^peer-/, /^dark:/, /^lg:/, /^md:/, /^sm:/, /^xl:/, /^2xl:/],
          greedy: [/^swiper/, /^recharts/, /^react-/, /^framer-/, /^radix-/, /toast/, /dialog/, /dropdown/, /popover/, /tooltip/, /sheet/, /accordion/, /tabs/, /skeleton/],
        },
      },
      'cssnano': {
        preset: ['advanced', {
          discardComments: {
            removeAll: true,
          },
          reduceIdents: true,
          zindex: false,
          autoprefixer: false,
        }],
      },
    }),
  },
}