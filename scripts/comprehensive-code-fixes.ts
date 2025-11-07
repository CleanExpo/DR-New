#!/usr/bin/env tsx
/**
 * Comprehensive Code Quality Fixes Script
 * Performs automated fixes for common code quality issues
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { glob } from 'glob';

interface Fix {
  name: string;
  pattern: RegExp;
  replacement: string | ((match: string, ...args: any[]) => string);
  fileTypes: string[];
}

const fixes: Fix[] = [
  // Remove console.log statements
  {
    name: 'Remove console.log',
    pattern: /console\.(log|debug)\([^)]*\);?\n?/g,
    replacement: '',
    fileTypes: ['ts', 'tsx', 'js', 'jsx']
  },

  // Replace any with unknown or specific types
  {
    name: 'Replace any with unknown',
    pattern: /:\s*any\b/g,
    replacement: ': unknown',
    fileTypes: ['ts', 'tsx']
  },

  // Add return types to functions
  {
    name: 'Add void return type',
    pattern: /^(\s*)(export\s+)?(async\s+)?function\s+(\w+)\s*\([^)]*\)\s*{/gm,
    replacement: (match, indent, exp, async, name) => {
      return `${indent}${exp || ''}${async || ''}function ${name}(...args: any[]): ${async ? 'Promise<void>' : 'void'} {`;
    },
    fileTypes: ['ts', 'tsx']
  },

  // Fix == to ===
  {
    name: 'Use strict equality',
    pattern: /([^!=])={2}([^=])/g,
    replacement: '$1===$2',
    fileTypes: ['ts', 'tsx', 'js', 'jsx']
  },

  // Fix != to !==
  {
    name: 'Use strict inequality',
    pattern: /([^!])!={1}([^=])/g,
    replacement: '$1!==$2',
    fileTypes: ['ts', 'tsx', 'js', 'jsx']
  },

  // Add error handling to async functions
  {
    name: 'Wrap async function bodies in try-catch',
    pattern: /async\s+function\s+(\w+)\s*\([^)]*\)\s*(?::\s*[^{]+)?\s*{\n([^}]+)}/g,
    replacement: (match, name, body) => {
      if (!body.includes('try {')) {
        return match.replace(body, `  try {\n${body}\n  } catch (error) {\n    console.error(\`Error in ${name}:\`, error);\n    throw error;\n  }`);
      }
      return match;
    },
    fileTypes: ['ts', 'tsx']
  },

  // Remove unused imports
  {
    name: 'Remove React import in Next.js',
    pattern: /^import\s+React\s+from\s+['"]react['"];\s*\n/gm,
    replacement: '',
    fileTypes: ['tsx']
  },

  // Fix missing key props in map
  {
    name: 'Add key prop to mapped elements',
    pattern: /\.map\((\([^)]+\)|[^)]+)\s*=>\s*(<[^>]+)>/g,
    replacement: (match, params, element) => {
      if (!element.includes('key=')) {
        const indexParam = params.includes(',') ? params.split(',')[1].trim().replace(')', '') : 'index';
        return `.map((${params.replace(/[()]/g, '')}, ${indexParam}) => ${element} key={${indexParam}}>`;
      }
      return match;
    },
    fileTypes: ['tsx', 'jsx']
  }
];

async function processFile(filePath: string): Promise<number> {
  let fixCount = 0;
  try {
    let content = await fs.readFile(filePath, 'utf-8');
    const ext = path.extname(filePath).slice(1);

    for (const fix of fixes) {
      if (fix.fileTypes.includes(ext)) {
        const originalContent = content;
        content = content.replace(fix.pattern, fix.replacement as any);
        if (content !== originalContent) {
          fixCount++;
          console.log(`  ✓ Applied: ${fix.name}`);
        }
      }
    }

    if (fixCount > 0) {
      await fs.writeFile(filePath, content, 'utf-8');
    }

  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }

  return fixCount;
}

async function main() {
  console.log('🔧 Starting comprehensive code fixes...\n');

  const patterns = [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'lib/**/*.{ts,tsx}',
    'src/**/*.{ts,tsx}',
    'hooks/**/*.{ts,tsx}',
    'utils/**/*.{ts,tsx}'
  ];

  let totalFiles = 0;
  let totalFixes = 0;

  for (const pattern of patterns) {
    const files = await glob(pattern, {
      ignore: ['**/node_modules/**', '**/.next/**', '**/dist/**'],
      cwd: process.cwd()
    });

    for (const file of files) {
      const filePath = path.resolve(file);
      console.log(`Processing: ${file}`);
      const fixes = await processFile(filePath);
      if (fixes > 0) {
        totalFiles++;
        totalFixes += fixes;
      }
    }
  }

  console.log(`\n✅ Fixed ${totalFixes} issues in ${totalFiles} files`);
}

main().catch(console.error);