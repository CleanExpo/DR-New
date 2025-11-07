#!/usr/bin/env node

/**
 * Final Syntax Fixes
 * Fixes all remaining TypeScript errors in problematic files
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Applying final syntax fixes...\n');

// Fix src/lib/lead-assignment.ts - Remove duplicate functions
function fixLeadAssignmentFile() {
  const file = 'src/lib/lead-assignment.ts';
  const filePath = path.join(process.cwd(), file);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${file} not found`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Remove duplicate closing braces and functions
  const lines = content.split('\n');
  const cleanedLines = [];
  let inFunction = false;
  let braceCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Track brace balance
    braceCount += (line.match(/\{/g) || []).length;
    braceCount -= (line.match(/\}/g) || []).length;

    // Skip orphaned closing braces
    if (line.trim() === '}' && braceCount < 0) {
      braceCount = 0;
      continue;
    }

    cleanedLines.push(line);
  }

  content = cleanedLines.join('\n');

  fs.writeFileSync(filePath, content);
  console.log(`✅ Fixed ${file}`);
}

// Fix src/lib/lead-management.ts
function fixLeadManagementFile() {
  const file = 'src/lib/lead-management.ts';
  const filePath = path.join(process.cwd(), file);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${file} not found`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Fix malformed catch blocks
  content = content.replace(
    /(\s+)(\w+: [^;]+;)\s*\} catch/g,
    '$1$2\n  }\n} catch'
  );

  // Fix orphaned catch blocks
  content = content.replace(
    /,\s*\}\s*catch \(error\) \{[^}]+\}\s*\}/g,
    '\n    };\n  } catch (error) {\n    console.error(error);\n    throw error;\n  }\n}'
  );

  fs.writeFileSync(filePath, content);
  console.log(`✅ Fixed ${file}`);
}

// Fix src/lib/semrush-api.ts
function fixSemrushApiFile() {
  const file = 'src/lib/semrush-api.ts';
  const filePath = path.join(process.cwd(), file);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${file} not found`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Fix misplaced closing braces
  content = content.replace(
    /(\n\s*\})\s*(\n\s*\}\s*catch)/g,
    '$1$2'
  );

  fs.writeFileSync(filePath, content);
  console.log(`✅ Fixed ${file}`);
}

// Fix src/lib/seo/content-generator.ts
function fixContentGeneratorFile() {
  const file = 'src/lib/seo/content-generator.ts';
  const filePath = path.join(process.cwd(), file);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${file} not found`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Fix line 500 issue - malformed object property
  content = content.replace(
    /(\w+):\s+async\s+\(([^)]*)\)\s+=>/g,
    'async $1($2):'
  );

  fs.writeFileSync(filePath, content);
  console.log(`✅ Fixed ${file}`);
}

// Fix src/utils/performance-monitor.ts
function fixPerformanceMonitorFile() {
  const file = 'src/utils/performance-monitor.ts';
  const filePath = path.join(process.cwd(), file);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${file} not found`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Fix object property definitions
  const lines = content.split('\n');
  const fixedLines = lines.map(line => {
    // Fix: metric: value; -> metric: value,
    if (line.match(/^\s+\w+:\s+\w+;$/)) {
      return line.replace(/;$/, ',');
    }
    return line;
  });

  content = fixedLines.join('\n');

  fs.writeFileSync(filePath, content);
  console.log(`✅ Fixed ${file}`);
}

// Run all fixes
try {
  fixLeadAssignmentFile();
  fixLeadManagementFile();
  fixSemrushApiFile();
  fixContentGeneratorFile();
  fixPerformanceMonitorFile();

  console.log('\n✅ All syntax fixes applied!\n');
  console.log('Run: npm run type-check');
  console.log('Then: npm run build\n');
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
