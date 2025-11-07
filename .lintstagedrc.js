module.exports = {
  // TypeScript and JavaScript files
  '*.{js,jsx,ts,tsx}': [
    'eslint --fix',
    'prettier --write',
  ],

  // JSON files
  '*.json': [
    'prettier --write',
  ],

  // CSS and SCSS files
  '*.{css,scss}': [
    'prettier --write',
  ],

  // Markdown files
  '*.md': [
    'prettier --write',
  ],

  // TypeScript files (type check)
  '*.{ts,tsx}': () => 'tsc --noEmit',
};
