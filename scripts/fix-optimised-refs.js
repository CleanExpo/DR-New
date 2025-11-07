const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    const filePath = path.join(dirPath, file);

    if (fs.statSync(filePath).isDirectory()) {
      // Skip node_modules, .next, .git, dist
      if (!['node_modules', '.next', '.git', 'dist'].includes(file)) {
        arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
      }
    } else {
      // Only process .ts, .tsx, .js, .jsx files
      if (['.ts', '.tsx', '.js', '.jsx'].includes(path.extname(file))) {
        arrayOfFiles.push(filePath);
      }
    }
  });

  return arrayOfFiles;
}

const rootDir = path.join(__dirname, '..');
const files = getAllFiles(rootDir);

let updatedCount = 0;
let totalReplacements = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');

  if (content.includes('/images/optimized/')) {
    const matches = content.match(/\/images\/optimised\//g);
    const replacementCount = matches ? matches.length : 0;

    const newContent = content.replace(/\/images\/optimised\//g, '/images/optimized/');
    fs.writeFileSync(file, newContent, 'utf8');

    console.log(`✅ Updated: ${file} (${replacementCount} replacements)`);
    updatedCount++;
    totalReplacements += replacementCount;
  }
});

console.log(`\n=== SUMMARY ===`);
console.log(`Files updated: ${updatedCount}`);
console.log(`Total replacements: ${totalReplacements}`);
