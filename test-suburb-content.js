/**
 * Test script to verify suburb page content generation and word counts
 */

const fs = require('fs');
const path = require('path');

// Simple word count function
function countWords(text) {
  return text
    .replace(/<[^>]*>/g, ' ') // Remove HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
    .split(' ')
    .filter(word => word.length > 0).length;
}

// Read and analyze a suburb page
function analyzeSuburbPage(suburbName) {
  const pagePath = path.join(__dirname, 'app', suburbName, 'page.tsx');

  if (!fs.existsSync(pagePath)) {
    console.log(`❌ ${suburbName}: File not found`);
    return null;
  }

  const content = fs.readFileSync(pagePath, 'utf-8');

  // Extract string literals (approximate content)
  const stringContent = content.match(/'([^']*)'/g) || [];
  const templateContent = content.match(/`([^`]*)`/g) || [];

  const allText = [...stringContent, ...templateContent].join(' ');
  const wordCount = countWords(allText);

  return {
    suburb: suburbName,
    exists: true,
    fileSize: (content.length / 1024).toFixed(2) + ' KB',
    estimatedWords: wordCount,
    linesOfCode: content.split('\n').length,
  };
}

// Test all 5 suburbs
const suburbs = ['hamilton', 'ascot', 'new-farm', 'toowong', 'wynnum'];

console.log('\n📊 SUBURB LANDING PAGE ANALYSIS\n');
console.log('='.repeat(80));

suburbs.forEach(suburb => {
  const result = analyzeSuburbPage(suburb);
  if (result) {
    console.log(`\n✅ ${result.suburb.toUpperCase()}`);
    console.log(`   File Size: ${result.fileSize}`);
    console.log(`   Lines of Code: ${result.linesOfCode}`);
    console.log(`   Estimated Content Words: ${result.estimatedWords}`);
  }
});

console.log('\n' + '='.repeat(80));
console.log('\n📝 NOTE: Actual rendered word count will be higher due to:');
console.log('   - Template system generating dynamic content');
console.log('   - FAQ items from generateFAQs()');
console.log('   - Disaster type descriptions');
console.log('   - Why Choose Us points');
console.log('   - Service descriptions');
console.log('\n✨ Target: 750-800 words per page (rendered HTML content)\n');
