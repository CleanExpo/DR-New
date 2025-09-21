const fs = require('fs');
const path = require('path');

console.log('\n🔍 Validating Schema Markup...\n');

const issues = [];
const warnings = [];

// Check for fake reviews
const checkForFakeReviews = (content, file) => {
  const fakeNames = ['Sarah M.', 'John D.', 'Ken O.', 'David L.'];
  fakeNames.forEach(name => {
    if (content.includes(name)) {
      issues.push(`❌ Fake review found in ${file}: "${name}"`);
    }
  });
};

// Check for placeholder phone numbers in schema only
const checkForPlaceholders = (content, file) => {
  // Only check schema-related placeholders
  const schemaSection = content.match(/@context["']?\s*:\s*["']https:\/\/schema\.org["'][\s\S]*?(?=<\/Script>|$)/g);
  if (schemaSection) {
    const placeholders = ['XXX-XXX', 'DISASTER'];
    placeholders.forEach(placeholder => {
      if (schemaSection[0] && schemaSection[0].includes(placeholder)) {
        issues.push(`❌ Schema placeholder found in ${file}: "${placeholder}"`);
      }
    });
  }
};

// Check for valid phone format
const checkPhoneFormat = (content, file) => {
  const phoneRegex = /telephone["']?\s*:\s*["']([^"']+)["']/g;
  let match;
  while ((match = phoneRegex.exec(content)) !== null) {
    const phone = match[1];
    if (!phone.startsWith('+61') && !phone.includes('+61')) {
      warnings.push(`⚠️  Phone without country code in ${file}: "${phone}"`);
    }
  }
};

// Check for business type consistency
const checkBusinessType = (content, file) => {
  if (content.includes('Claims Consulting') || content.includes('claims consultant')) {
    issues.push(`❌ Incorrect business type in ${file}: Should be "Restoration Services" not "Claims Consulting"`);
  }
};

// Check for rating consistency
const checkRatings = (content, file) => {
  const ratingRegex = /ratingValue["']?\s*:\s*["']([^"']+)["']/g;
  const reviewCountRegex = /reviewCount["']?\s*:\s*["']([^"']+)["']/g;

  let ratingMatch;
  while ((ratingMatch = ratingRegex.exec(content)) !== null) {
    const rating = ratingMatch[1];
    warnings.push(`⚠️  Rating found in ${file}: ${rating} - Ensure this is from real reviews`);
  }

  let countMatch;
  while ((countMatch = reviewCountRegex.exec(content)) !== null) {
    const count = countMatch[1];
    warnings.push(`⚠️  Review count found in ${file}: ${count} - Ensure this is accurate`);
  }
};

// Files to check
const filesToCheck = [
  'app/layout.tsx',
  'components/seo/LocalBusinessSchema.tsx',
  'components/seo/BrisbaneLocalSchema.tsx'
];

filesToCheck.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    checkForFakeReviews(content, file);
    checkForPlaceholders(content, file);
    checkPhoneFormat(content, file);
    checkBusinessType(content, file);
    checkRatings(content, file);
    console.log(`✅ Checked: ${file}`);
  } else {
    console.log(`⚠️  File not found: ${file}`);
  }
});

console.log('\n═══════════════════════════════════════\n');

if (issues.length > 0) {
  console.log('❌ CRITICAL ISSUES FOUND:\n');
  issues.forEach(issue => console.log(issue));
} else {
  console.log('✅ No critical schema issues found!');
}

if (warnings.length > 0) {
  console.log('\n⚠️  WARNINGS:\n');
  warnings.forEach(warning => console.log(warning));
}

console.log('\n═══════════════════════════════════════\n');

if (issues.length > 0) {
  process.exit(1);
}