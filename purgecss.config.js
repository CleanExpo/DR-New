module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  css: [
    './src/styles/**/*.css',
    './app/**/*.css',
  ],
  safelist: {
    // Preserve animation classes
    standard: [
      /^animate-/,
      /^transition-/,
      /^duration-/,
      /^ease-/,
      /^delay-/,
    ],
    // Preserve dynamic classes
    deep: [
      /^hover:/,
      /^focus:/,
      /^active:/,
      /^group-hover:/,
      /^peer-/,
      /^dark:/,
      /^lg:/,
      /^md:/,
      /^sm:/,
      /^xl:/,
      /^2xl:/,
    ],
    // Preserve specific patterns
    greedy: [
      /^swiper/,
      /^recharts/,
      /^react-/,
      /^framer-/,
      /^radix-/,
      /toast/,
      /dialog/,
      /dropdown/,
      /popover/,
      /tooltip/,
      /sheet/,
      /accordion/,
      /tabs/,
      /skeleton/,
    ],
  },
  // More aggressive CSS removal
  defaultExtractor: content => {
    const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
    const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
    return broadMatches.concat(innerMatches);
  },
  // Remove unused keyframes
  keyframes: true,
  // Remove unused font faces
  fontFace: true,
  // Remove CSS variables that are not used
  variables: true,
};