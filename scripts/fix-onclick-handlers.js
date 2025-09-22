#!/usr/bin/env node

/**
 * Fix onClick handlers in server components
 * Converts button onClick handlers to anchor tags with href
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all TSX files in app directory
const files = glob.sync('app/**/*.tsx', {
  ignore: ['app/**/*.client.tsx', 'app/**/components/**/*.tsx']
});

console.log(`Found ${files.length} files to check`);

let fixedCount = 0;

files.forEach(file => {
  const filePath = path.resolve(file);
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  // Pattern to match onClick with tel: links
  const telPattern = /onClick\s*=\s*{\s*\(\)\s*=>\s*window\.location\.href\s*=\s*['"`]tel:([^'"`]+)['"`]\s*}/g;

  // Pattern to match onClick with email: links
  const emailPattern = /onClick\s*=\s*{\s*\(\)\s*=>\s*window\.location\.href\s*=\s*['"`]mailto:([^'"`]+)['"`]\s*}/g;

  // Pattern to match onClick with URL navigation
  const urlPattern = /onClick\s*=\s*{\s*\(\)\s*=>\s*window\.location\.href\s*=\s*['"`]([^'"`]+)['"`]\s*}/g;

  // Replace tel: onClick handlers
  content = content.replace(telPattern, 'href="tel:$1"');

  // Replace mailto: onClick handlers
  content = content.replace(emailPattern, 'href="mailto:$1"');

  // Replace URL onClick handlers
  content = content.replace(urlPattern, 'href="$1"');

  // Convert button elements with href to anchor tags
  content = content.replace(/<button\s+([^>]*href=["'][^"']+["'][^>]*)>(.*?)<\/button>/gs, (match, attrs, children) => {
    // Remove button-specific attributes and keep the rest
    const cleanAttrs = attrs
      .replace(/type\s*=\s*["'][^"']*["']/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    return `<a ${cleanAttrs}>${children}</a>`;
  });

  // Special case: buttons with onClick that navigate to tel:
  content = content.replace(
    /<button\s+([^>]*)onClick\s*=\s*{\s*\(\)\s*=>\s*window\.location\.href\s*=\s*['"`](tel:[^'"`]+)['"`]\s*}([^>]*)>(.*?)<\/button>/gs,
    '<a $1href="$2"$3>$4</a>'
  );

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed: ${file}`);
    fixedCount++;
  }
});

console.log(`\n✨ Fixed ${fixedCount} files with onClick handlers`);