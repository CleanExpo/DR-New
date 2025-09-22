#!/usr/bin/env node

const fs = require('fs');
const glob = require('glob');
const path = require('path');

// Find all TSX files in app directory
const files = glob.sync('app/**/*.tsx');

console.log(`Checking ${files.length} files for onClick handlers without 'use client'...`);

const problemFiles = [];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');

  // Check if file has onClick
  if (content.includes('onClick')) {
    // Check if file has 'use client' directive
    if (!content.includes("'use client'") && !content.includes('"use client"')) {
      problemFiles.push(file);
    }
  }
});

if (problemFiles.length > 0) {
  console.log('\nFiles with onClick but no "use client" directive:');
  problemFiles.forEach(file => {
    console.log(`  - ${file}`);
  });

  console.log(`\nTotal: ${problemFiles.length} files need fixing`);
} else {
  console.log('\n✅ All files with onClick have proper client directives');
}