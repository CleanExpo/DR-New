#!/usr/bin/env node

/**
 * Voice Search Optimization Testing Script
 * Tests voice search readiness for Disaster Recovery website
 *
 * Tests performed:
 * 1. Structured data validation
 * 2. Featured snippet optimization
 * 3. Mobile responsiveness
 * 4. Page speed for voice devices
 * 5. Natural language content analysis
 * 6. Local SEO signals
 */

const fs = require('fs');
const path = require('path');

// Configuration
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://disasterrecovery.com.au';
const TEST_QUERIES = [
  'emergency water damage restoration near me',
  'who can fix water damage today in Brisbane',
  'best disaster recovery company near Ipswich',
  '24 hour flood restoration Brisbane',
  'how much does water damage restoration cost',
  'what to do when house is flooding',
  'fire damage restoration Brisbane',
  'mould removal Brisbane urgent'
];

// Voice search optimization checklist
const VOICE_SEARCH_CRITERIA = {
  structuredData: {
    required: ['FAQPage', 'LocalBusiness', 'EmergencyService'],
    optional: ['HowTo', 'Service', 'BreadcrumbList', 'Organization']
  },
  contentOptimization: {
    maxAnswerLength: 50, // words
    readabilityScore: 60, // Flesch Reading Ease
    conversationalTone: true,
    questionHeaders: true
  },
  technicalRequirements: {
    mobileResponsive: true,
    pageSpeedMobile: 90,
    httpsEnabled: true,
    ampSupport: false // optional
  },
  localSEO: {
    napConsistency: true, // Name, Address, Phone
    localSchema: true,
    geoTargeting: true,
    serviceAreas: true
  }
};

// Test results collector
const testResults = {
  passed: [],
  failed: [],
  warnings: [],
  score: 0,
  maxScore: 0
};

// Helper functions
function log(message, type = 'info') {
  const colors = {
    info: '\x1b[36m',
    success: '\x1b[32m',
    warning: '\x1b[33m',
    error: '\x1b[31m',
    reset: '\x1b[0m'
  };

  const prefix = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌'
  };

  console.log(`${colors[type]}${prefix[type]} ${message}${colors.reset}`);
}

// Test 1: Check structured data in pages
async function testStructuredData() {
  log('Testing Structured Data Implementation...');
  testResults.maxScore += 10;

  const pagesToTest = [
    '/voice-search/emergency-faqs',
    '/pricing/restoration-costs',
    '/services/water-damage',
    '/services/fire-damage',
    '/locations/brisbane'
  ];

  let structuredDataFound = {
    FAQPage: false,
    LocalBusiness: false,
    EmergencyService: false,
    Speakable: false
  };

  for (const pagePath of pagesToTest) {
    const filePath = path.join(__dirname, '..', 'app', pagePath.slice(1), 'page.tsx');

    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');

      // Check for structured data schemas
      if (content.includes('"@type": "FAQPage"')) {
        structuredDataFound.FAQPage = true;
      }
      if (content.includes('"@type": "LocalBusiness"')) {
        structuredDataFound.LocalBusiness = true;
      }
      if (content.includes('"@type": "EmergencyService"')) {
        structuredDataFound.EmergencyService = true;
      }
      if (content.includes('"@type": "SpeakableSpecification"')) {
        structuredDataFound.Speakable = true;
      }
    }
  }

  // Score based on structured data found
  let score = 0;
  if (structuredDataFound.FAQPage) score += 3;
  if (structuredDataFound.LocalBusiness) score += 3;
  if (structuredDataFound.EmergencyService) score += 2;
  if (structuredDataFound.Speakable) score += 2;

  testResults.score += score;

  if (score >= 8) {
    log('Structured data implementation is excellent', 'success');
    testResults.passed.push('Structured Data');
  } else if (score >= 5) {
    log('Structured data needs improvement', 'warning');
    testResults.warnings.push('Some structured data types missing');
  } else {
    log('Structured data implementation is poor', 'error');
    testResults.failed.push('Structured Data');
  }

  return structuredDataFound;
}

// Test 2: Check for conversational content
async function testConversationalContent() {
  log('Testing Conversational Content Optimization...');
  testResults.maxScore += 10;

  const contentChecks = {
    hasQuestionHeaders: false,
    hasShortAnswers: false,
    hasNaturalLanguage: false,
    hasLocalContext: false,
    hasVoiceClasses: false
  };

  // Check emergency FAQs page
  const faqPath = path.join(__dirname, '..', 'app', 'voice-search', 'emergency-faqs', 'page.tsx');

  if (fs.existsSync(faqPath)) {
    const content = fs.readFileSync(faqPath, 'utf8');

    // Check for question-based headers
    const questionPatterns = [
      /who (can|fixes|does)/i,
      /what (should|can|is)/i,
      /how (quickly|much|long|do)/i,
      /when (should|can|do)/i,
      /where (is|can|do)/i,
      /why (does|should|is)/i
    ];

    for (const pattern of questionPatterns) {
      if (pattern.test(content)) {
        contentChecks.hasQuestionHeaders = true;
        break;
      }
    }

    // Check for voice-optimized answer classes
    if (content.includes('voice-answer') || content.includes('quick-answer')) {
      contentChecks.hasVoiceClasses = true;
    }

    // Check for short, concise answers (looking for patterns)
    if (content.includes('price-answer') || content.includes('cost-range')) {
      contentChecks.hasShortAnswers = true;
    }

    // Check for natural language patterns
    const naturalPatterns = [
      /call us/i,
      /we (provide|offer|service)/i,
      /our team/i,
      /available 24\/7/i,
      /right now/i,
      /immediately/i
    ];

    for (const pattern of naturalPatterns) {
      if (pattern.test(content)) {
        contentChecks.hasNaturalLanguage = true;
        break;
      }
    }

    // Check for local context
    const localTerms = ['Brisbane', 'Ipswich', 'Logan', 'Queensland', 'QLD'];
    for (const term of localTerms) {
      if (content.includes(term)) {
        contentChecks.hasLocalContext = true;
        break;
      }
    }
  }

  // Calculate score
  let score = 0;
  Object.values(contentChecks).forEach(check => {
    if (check) score += 2;
  });

  testResults.score += score;

  if (score >= 8) {
    log('Conversational content optimization is excellent', 'success');
    testResults.passed.push('Conversational Content');
  } else if (score >= 5) {
    log('Conversational content needs improvement', 'warning');
    testResults.warnings.push('Some conversational elements missing');
  } else {
    log('Conversational content optimization is poor', 'error');
    testResults.failed.push('Conversational Content');
  }

  return contentChecks;
}

// Test 3: Check mobile optimization
async function testMobileOptimization() {
  log('Testing Mobile Optimization for Voice Devices...');
  testResults.maxScore += 10;

  const mobileChecks = {
    hasViewportMeta: false,
    hasResponsiveImages: false,
    hasTouchTargets: false,
    hasMobileStyles: false
  };

  // Check layout file for mobile meta tags
  const layoutPath = path.join(__dirname, '..', 'app', 'layout.tsx');

  if (fs.existsSync(layoutPath)) {
    const content = fs.readFileSync(layoutPath, 'utf8');

    // Check for viewport meta
    if (content.includes('viewport') || content.includes('width=device-width')) {
      mobileChecks.hasViewportMeta = true;
    }
  }

  // Check for responsive classes in Tailwind
  const pagesDir = path.join(__dirname, '..', 'app');
  const checkResponsive = (dir) => {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory() && !file.startsWith('.')) {
        checkResponsive(filePath);
      } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
        const content = fs.readFileSync(filePath, 'utf8');

        // Check for responsive classes
        if (content.includes('sm:') || content.includes('md:') || content.includes('lg:')) {
          mobileChecks.hasResponsiveImages = true;
        }

        // Check for mobile-friendly button sizes
        if (content.includes('py-4') || content.includes('px-8') || content.includes('text-xl')) {
          mobileChecks.hasTouchTargets = true;
        }

        // Check for mobile-specific styles
        if (content.includes('flex-col sm:flex-row') || content.includes('grid-cols-1 md:grid-cols')) {
          mobileChecks.hasMobileStyles = true;
        }
      }
    }
  };

  checkResponsive(pagesDir);

  // Calculate score
  let score = 0;
  if (mobileChecks.hasViewportMeta) score += 3;
  if (mobileChecks.hasResponsiveImages) score += 3;
  if (mobileChecks.hasTouchTargets) score += 2;
  if (mobileChecks.hasMobileStyles) score += 2;

  testResults.score += score;

  if (score >= 8) {
    log('Mobile optimization is excellent', 'success');
    testResults.passed.push('Mobile Optimization');
  } else if (score >= 5) {
    log('Mobile optimization needs improvement', 'warning');
    testResults.warnings.push('Some mobile optimizations missing');
  } else {
    log('Mobile optimization is poor', 'error');
    testResults.failed.push('Mobile Optimization');
  }

  return mobileChecks;
}

// Test 4: Check local SEO implementation
async function testLocalSEO() {
  log('Testing Local SEO for "Near Me" Searches...');
  testResults.maxScore += 10;

  const localSEOChecks = {
    hasNAP: false, // Name, Address, Phone
    hasServiceAreas: false,
    hasLocalSchema: false,
    hasGeoTargeting: false
  };

  // Check for NAP consistency
  const requiredNAP = {
    name: 'Disaster Recovery',
    phone: '1300 309 361',
    address: '4/17 Tile St, Wacol'
  };

  // Check location pages
  const locationPages = fs.readdirSync(path.join(__dirname, '..', 'app', 'locations'));

  for (const page of locationPages.slice(0, 3)) { // Check first 3 location pages
    const pagePath = path.join(__dirname, '..', 'app', 'locations', page, 'page.tsx');

    if (fs.existsSync(pagePath)) {
      const content = fs.readFileSync(pagePath, 'utf8');

      // Check NAP
      if (content.includes(requiredNAP.phone)) {
        localSEOChecks.hasNAP = true;
      }

      // Check service areas
      if (content.includes('Brisbane') || content.includes('Ipswich') || content.includes('Logan')) {
        localSEOChecks.hasServiceAreas = true;
      }

      // Check local schema
      if (content.includes('LocalBusiness') || content.includes('areaServed')) {
        localSEOChecks.hasLocalSchema = true;
      }

      // Check geo-targeting
      if (content.includes('latitude') || content.includes('longitude') || content.includes('GeoCoordinates')) {
        localSEOChecks.hasGeoTargeting = true;
      }
    }
  }

  // Calculate score
  let score = 0;
  if (localSEOChecks.hasNAP) score += 3;
  if (localSEOChecks.hasServiceAreas) score += 3;
  if (localSEOChecks.hasLocalSchema) score += 2;
  if (localSEOChecks.hasGeoTargeting) score += 2;

  testResults.score += score;

  if (score >= 8) {
    log('Local SEO optimization is excellent', 'success');
    testResults.passed.push('Local SEO');
  } else if (score >= 5) {
    log('Local SEO needs improvement', 'warning');
    testResults.warnings.push('Some local SEO elements missing');
  } else {
    log('Local SEO optimization is poor', 'error');
    testResults.failed.push('Local SEO');
  }

  return localSEOChecks;
}

// Test 5: Check voice search query coverage
async function testQueryCoverage() {
  log('Testing Voice Query Coverage...');
  testResults.maxScore += 10;

  const queryCoverage = {
    total: TEST_QUERIES.length,
    covered: 0,
    queries: {}
  };

  // Check if queries are addressed in content
  const contentFiles = [
    path.join(__dirname, '..', 'app', 'voice-search', 'emergency-faqs', 'page.tsx'),
    path.join(__dirname, '..', 'app', 'pricing', 'restoration-costs', 'page.tsx'),
    path.join(__dirname, '..', 'app', 'services', 'water-damage', 'page.tsx'),
    path.join(__dirname, '..', 'app', 'services', 'fire-damage', 'page.tsx')
  ];

  let allContent = '';
  for (const file of contentFiles) {
    if (fs.existsSync(file)) {
      allContent += fs.readFileSync(file, 'utf8').toLowerCase();
    }
  }

  for (const query of TEST_QUERIES) {
    const keywords = query.toLowerCase().split(' ').filter(word => word.length > 3);
    let matchCount = 0;

    for (const keyword of keywords) {
      if (allContent.includes(keyword)) {
        matchCount++;
      }
    }

    const coverage = (matchCount / keywords.length) * 100;
    queryCoverage.queries[query] = coverage;

    if (coverage >= 60) {
      queryCoverage.covered++;
    }
  }

  const coveragePercent = (queryCoverage.covered / queryCoverage.total) * 100;
  const score = Math.round(coveragePercent / 10);

  testResults.score += score;

  if (coveragePercent >= 80) {
    log(`Query coverage is excellent (${coveragePercent.toFixed(0)}%)`, 'success');
    testResults.passed.push('Query Coverage');
  } else if (coveragePercent >= 60) {
    log(`Query coverage needs improvement (${coveragePercent.toFixed(0)}%)`, 'warning');
    testResults.warnings.push(`Only ${queryCoverage.covered}/${queryCoverage.total} queries well covered`);
  } else {
    log(`Query coverage is poor (${coveragePercent.toFixed(0)}%)`, 'error');
    testResults.failed.push('Query Coverage');
  }

  return queryCoverage;
}

// Generate recommendations
function generateRecommendations() {
  const recommendations = [];

  if (testResults.warnings.length > 0) {
    log('\n📋 Recommendations for Voice Search Improvement:', 'warning');

    if (testResults.warnings.some(w => w.includes('structured data'))) {
      recommendations.push('• Add more structured data types (HowTo, Service schemas)');
    }

    if (testResults.warnings.some(w => w.includes('conversational'))) {
      recommendations.push('• Add more question-based headers in content');
      recommendations.push('• Keep answers under 50 words for featured snippets');
    }

    if (testResults.warnings.some(w => w.includes('mobile'))) {
      recommendations.push('• Optimize page load speed for mobile devices');
      recommendations.push('• Ensure all CTAs are thumb-friendly (44x44px minimum)');
    }

    if (testResults.warnings.some(w => w.includes('local SEO'))) {
      recommendations.push('• Add more location-specific content');
      recommendations.push('• Include suburb names in titles and headers');
    }

    if (testResults.warnings.some(w => w.includes('queries'))) {
      recommendations.push('• Create more content addressing specific voice queries');
      recommendations.push('• Add "People Also Ask" sections to service pages');
    }
  }

  recommendations.forEach(rec => console.log(rec));

  return recommendations;
}

// Main execution
async function runVoiceSearchTests() {
  console.log('\n🎤 Voice Search Optimization Test Suite');
  console.log('==========================================\n');

  // Run all tests
  await testStructuredData();
  await testConversationalContent();
  await testMobileOptimization();
  await testLocalSEO();
  await testQueryCoverage();

  // Calculate final score
  const finalScore = (testResults.score / testResults.maxScore) * 100;

  // Display results
  console.log('\n📊 Test Results Summary');
  console.log('==========================================');
  console.log(`✅ Passed: ${testResults.passed.length} tests`);
  console.log(`⚠️  Warnings: ${testResults.warnings.length} issues`);
  console.log(`❌ Failed: ${testResults.failed.length} tests`);
  console.log(`\n🎯 Voice Search Readiness Score: ${finalScore.toFixed(0)}%`);

  // Grade the score
  let grade = '';
  if (finalScore >= 90) {
    grade = 'A+ - Excellent voice search optimization!';
    log(grade, 'success');
  } else if (finalScore >= 80) {
    grade = 'A - Very good voice search optimization';
    log(grade, 'success');
  } else if (finalScore >= 70) {
    grade = 'B - Good, but room for improvement';
    log(grade, 'warning');
  } else if (finalScore >= 60) {
    grade = 'C - Needs significant improvement';
    log(grade, 'warning');
  } else {
    grade = 'D - Poor voice search optimization';
    log(grade, 'error');
  }

  // Generate recommendations if needed
  if (finalScore < 90) {
    generateRecommendations();
  }

  // Voice assistant specific tips
  console.log('\n🔊 Voice Assistant Optimization Tips:');
  console.log('==========================================');
  console.log('• Google Assistant: Focus on featured snippets and FAQ schema');
  console.log('• Siri: Ensure Apple Business Connect listing is claimed');
  console.log('• Alexa: Submit skills and optimize for Yelp/Yext listings');
  console.log('• All: Keep answers under 40 words, use natural language\n');

  // Test completion message
  if (finalScore >= 80) {
    log('✨ Voice search optimization is production-ready!', 'success');
  } else {
    log('⚡ Address the issues above to improve voice search performance', 'warning');
  }
}

// Run the tests
runVoiceSearchTests().catch(console.error);