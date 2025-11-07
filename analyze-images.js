const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'public/images');

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
      if (stats.size > 100000) {
        fileList.push({
          path: filePath.replace(__dirname + path.sep, ''),
          size: stats.size,
          ext: path.extname(file).toLowerCase()
        });
      }
    }
  });
  return fileList;
}

// Check for existing WebP files
function hasWebP(imagePath) {
  const webpPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  return fs.existsSync(path.join(__dirname, webpPath));
}

console.log('Analyzing images in', imgDir, '\n');

const images = getAllFiles(imgDir).sort((a, b) => b.size - a.size);

console.log('='.repeat(80));
console.log('IMAGE ANALYSIS REPORT');
console.log('='.repeat(80));
console.log('\nTotal images > 100KB:', images.length);

const totalSize = images.reduce((sum, img) => sum + img.size, 0);
console.log('Total size:', (totalSize / 1024 / 1024).toFixed(2), 'MB');

// Categorize by directory
const byCategory = {};
images.forEach(img => {
  const category = img.path.split(path.sep)[2] || 'root'; // public/images/[category]
  if (!byCategory[category]) {
    byCategory[category] = { count: 0, size: 0, files: [] };
  }
  byCategory[category].count++;
  byCategory[category].size += img.size;
  byCategory[category].files.push(img);
});

console.log('\n' + '='.repeat(80));
console.log('BY CATEGORY');
console.log('='.repeat(80));

Object.keys(byCategory)
  .sort((a, b) => byCategory[b].size - byCategory[a].size)
  .forEach(cat => {
    const data = byCategory[cat];
    console.log(`\n${cat}: ${data.count} files, ${(data.size / 1024 / 1024).toFixed(2)} MB`);
  });

console.log('\n' + '='.repeat(80));
console.log('TOP 50 LARGEST FILES REQUIRING WEBP CONVERSION');
console.log('='.repeat(80) + '\n');

let needsWebP = images.filter(img => !hasWebP(img.path));
console.log('Images needing WebP conversion:', needsWebP.length);
console.log('Images with WebP:', images.length - needsWebP.length, '\n');

needsWebP.slice(0, 50).forEach((img, i) => {
  const sizeMB = (img.size / 1024 / 1024).toFixed(2);
  const sizeKB = (img.size / 1024).toFixed(0);
  console.log(`${(i+1).toString().padStart(2)}. ${img.path}`);
  console.log(`    Size: ${sizeMB} MB (${sizeKB} KB) | Type: ${img.ext}`);
});

console.log('\n' + '='.repeat(80));
console.log('PRIORITY CATEGORIES FOR WEBP CONVERSION');
console.log('='.repeat(80) + '\n');

// Show categories sorted by size with conversion needs
Object.keys(byCategory)
  .sort((a, b) => byCategory[b].size - byCategory[a].size)
  .slice(0, 10)
  .forEach((cat, i) => {
    const data = byCategory[cat];
    const withoutWebP = data.files.filter(img => !hasWebP(img.path));
    console.log(`${i+1}. ${cat}`);
    console.log(`   Total: ${data.count} files, ${(data.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Need WebP: ${withoutWebP.length} files`);
    console.log(`   Estimated WebP savings: ${((data.size * 0.3) / 1024 / 1024).toFixed(2)} MB (30%)\n`);
  });

// Estimate total savings
const needsWebPSize = needsWebP.reduce((sum, img) => sum + img.size, 0);
const estimatedWebPSize = needsWebPSize * 0.70; // WebP typically 70% of original
const estimatedSavings = needsWebPSize - estimatedWebPSize;

console.log('='.repeat(80));
console.log('ESTIMATED SAVINGS WITH WEBP CONVERSION');
console.log('='.repeat(80));
console.log(`\nCurrent total size (images >100KB): ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`Images needing conversion size: ${(needsWebPSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`Estimated WebP size: ${(estimatedWebPSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`Estimated savings: ${(estimatedSavings / 1024 / 1024).toFixed(2)} MB (${((estimatedSavings / needsWebPSize) * 100).toFixed(1)}%)`);
console.log('\n' + '='.repeat(80) + '\n');
