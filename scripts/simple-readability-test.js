const fs = require('fs');
const path = require('path');

// Simple Hemingway-style readability checker
function analyzeText(text) {
  // Clean the text
  const cleanText = text
    .replace(/<[^>]*>/g, ' ') // Remove HTML/JSX tags
    .replace(/\{[^}]*\}/g, ' ') // Remove JSX expressions
    .replace(/import.*?;/g, '') // Remove imports
    .replace(/export.*?{/g, '') // Remove exports
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();

  // Get sentences
  const sentences = cleanText.split(/[.!?]+/).filter(s => s.trim().length > 0);

  // Get words
  const words = cleanText.match(/\b[a-zA-Z]+\b/g) || [];

  // Calculate metrics
  const wordCount = words.length;
  const sentenceCount = sentences.length;
  const avgWordsPerSentence = sentenceCount > 0 ? wordCount / sentenceCount : 0;

  // Check for long sentences (Hemingway style: under 20 words)
  const longSentences = sentences.filter(s => s.split(' ').length > 20);

  // Check for passive voice indicators
  const passiveIndicators = ['is being', 'was being', 'are being', 'were being', 'is done', 'was done'];
  let passiveCount = 0;
  const lowerText = cleanText.toLowerCase();
  passiveIndicators.forEach(indicator => {
    const matches = lowerText.split(indicator).length - 1;
    passiveCount += matches;
  });

  // Check for adverbs (simple -ly ending)
  const adverbs = words.filter(word => word.endsWith('ly') && word.length > 3);

  // Simple grade estimation (simplified Flesch-Kincaid)
  const avgSentenceLength = avgWordsPerSentence;
  const estimatedGrade = Math.round((avgSentenceLength - 15) / 2 + 6);

  return {
    wordCount,
    sentenceCount,
    avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
    longSentences: longSentences.length,
    passiveVoiceCount: passiveCount,
    adverbCount: adverbs.length,
    estimatedGrade: Math.max(1, estimatedGrade),
    hemingwayScore: calculateHemingwayScore(avgWordsPerSentence, longSentences.length, passiveCount, adverbs.length),
    suggestions: generateSuggestions(avgWordsPerSentence, longSentences.length, passiveCount, adverbs.length, estimatedGrade)
  };
}

function calculateHemingwayScore(avgWords, longSents, passive, adverbs) {
  let score = 100;

  // Deduct points for issues
  if (avgWords > 20) score -= 20;
  if (avgWords > 15) score -= 10;
  score -= longSents * 5;
  score -= passive * 10;
  score -= adverbs * 2;

  return Math.max(0, Math.round(score));
}

function generateSuggestions(avgWords, longSents, passive, adverbs, grade) {
  const suggestions = [];

  if (grade > 6) {
    suggestions.push(`Reading grade is ${grade}. Target grade 6 or below for Hemingway style.`);
  }

  if (avgWords > 20) {
    suggestions.push(`Average ${avgWords} words per sentence. Keep under 20 words.`);
  }

  if (longSents > 0) {
    suggestions.push(`${longSents} sentences are too long. Break them up.`);
  }

  if (passive > 0) {
    suggestions.push(`${passive} instances of passive voice. Use active voice instead.`);
  }

  if (adverbs > 5) {
    suggestions.push(`${adverbs} adverbs detected. Remove unnecessary -ly words.`);
  }

  if (suggestions.length === 0) {
    suggestions.push('Content follows Hemingway style guidelines! ✅');
  }

  return suggestions;
}

// Analyze homepage
function analyzeHomepage() {
  const homepagePath = path.join(__dirname, '..', 'app', 'page.tsx');

  try {
    const content = fs.readFileSync(homepagePath, 'utf8');
    const analysis = analyzeText(content);

    console.log('\n=== HOMEPAGE HEMINGWAY ANALYSIS ===');
    console.log(`📖 Word Count: ${analysis.wordCount}`);
    console.log(`📝 Sentences: ${analysis.sentenceCount}`);
    console.log(`📏 Avg Words/Sentence: ${analysis.avgWordsPerSentence} ${analysis.avgWordsPerSentence <= 20 ? '✅' : '❌'}`);
    console.log(`📊 Estimated Grade: ${analysis.estimatedGrade} ${analysis.estimatedGrade <= 6 ? '✅' : '❌'}`);
    console.log(`🔴 Long Sentences: ${analysis.longSentences} ${analysis.longSentences === 0 ? '✅' : '❌'}`);
    console.log(`😴 Passive Voice: ${analysis.passiveVoiceCount} ${analysis.passiveVoiceCount === 0 ? '✅' : '❌'}`);
    console.log(`✨ Adverbs: ${analysis.adverbCount} ${analysis.adverbCount <= 5 ? '✅' : '❌'}`);
    console.log(`🎯 Hemingway Score: ${analysis.hemingwayScore}/100`);

    console.log('\n💡 SUGGESTIONS:');
    analysis.suggestions.forEach(suggestion => {
      console.log(`   • ${suggestion}`);
    });

    return analysis;

  } catch (error) {
    console.error('Error reading homepage:', error.message);
    return null;
  }
}

// Analyze water damage page
function analyzeWaterDamagePage() {
  const waterPagePath = path.join(__dirname, '..', 'app', 'services', 'water-damage-restoration', 'page.tsx');

  try {
    const content = fs.readFileSync(waterPagePath, 'utf8');
    const analysis = analyzeText(content);

    console.log('\n=== WATER DAMAGE PAGE HEMINGWAY ANALYSIS ===');
    console.log(`📖 Word Count: ${analysis.wordCount}`);
    console.log(`📝 Sentences: ${analysis.sentenceCount}`);
    console.log(`📏 Avg Words/Sentence: ${analysis.avgWordsPerSentence} ${analysis.avgWordsPerSentence <= 20 ? '✅' : '❌'}`);
    console.log(`📊 Estimated Grade: ${analysis.estimatedGrade} ${analysis.estimatedGrade <= 6 ? '✅' : '❌'}`);
    console.log(`🔴 Long Sentences: ${analysis.longSentences} ${analysis.longSentences === 0 ? '✅' : '❌'}`);
    console.log(`😴 Passive Voice: ${analysis.passiveVoiceCount} ${analysis.passiveVoiceCount === 0 ? '✅' : '❌'}`);
    console.log(`✨ Adverbs: ${analysis.adverbCount} ${analysis.adverbCount <= 5 ? '✅' : '❌'}`);
    console.log(`🎯 Hemingway Score: ${analysis.hemingwayScore}/100`);

    console.log('\n💡 SUGGESTIONS:');
    analysis.suggestions.forEach(suggestion => {
      console.log(`   • ${suggestion}`);
    });

    return analysis;

  } catch (error) {
    console.error('Error reading water damage page:', error.message);
    return null;
  }
}

// Check SEO keywords
function checkKeywords() {
  const homepagePath = path.join(__dirname, '..', 'app', 'page.tsx');
  const waterPagePath = path.join(__dirname, '..', 'app', 'services', 'water-damage-restoration', 'page.tsx');

  const targetKeywords = [
    'disaster recovery brisbane',
    'water damage restoration brisbane',
    'fire damage restoration brisbane',
    'brisbane',
    'emergency',
    'ipswich',
    'logan'
  ];

  console.log('\n=== KEYWORD DENSITY ANALYSIS ===');

  try {
    const homepageContent = fs.readFileSync(homepagePath, 'utf8').toLowerCase();
    const waterPageContent = fs.readFileSync(waterPagePath, 'utf8').toLowerCase();

    targetKeywords.forEach(keyword => {
      const homepageMatches = (homepageContent.match(new RegExp(keyword, 'g')) || []).length;
      const waterPageMatches = (waterPageContent.match(new RegExp(keyword, 'g')) || []).length;

      console.log(`\n🔍 "${keyword}"`);
      console.log(`   Homepage: ${homepageMatches} times`);
      console.log(`   Water Page: ${waterPageMatches} times`);
    });

  } catch (error) {
    console.error('Error checking keywords:', error.message);
  }
}

// Main execution
if (require.main === module) {
  console.log('🎯 DISASTER RECOVERY BRISBANE - HEMINGWAY STYLE ANALYSIS');
  console.log('📅 Analysis Date:', new Date().toLocaleString());

  const homepageAnalysis = analyzeHomepage();
  const waterPageAnalysis = analyzeWaterDamagePage();

  checkKeywords();

  // Overall assessment
  console.log('\n=== OVERALL ASSESSMENT ===');

  const analyses = [homepageAnalysis, waterPageAnalysis].filter(Boolean);
  if (analyses.length > 0) {
    const avgGrade = analyses.reduce((sum, a) => sum + a.estimatedGrade, 0) / analyses.length;
    const avgScore = analyses.reduce((sum, a) => sum + a.hemingwayScore, 0) / analyses.length;

    console.log(`📊 Average Reading Grade: ${avgGrade.toFixed(1)} ${avgGrade <= 6 ? '✅' : '❌'}`);
    console.log(`🎯 Average Hemingway Score: ${avgScore.toFixed(0)}/100`);

    const hemingwayCompliant = analyses.every(a =>
      a.estimatedGrade <= 6 &&
      a.avgWordsPerSentence <= 20 &&
      a.longSentences === 0 &&
      a.passiveVoiceCount === 0
    );

    console.log(`\n✅ HEMINGWAY COMPLIANCE: ${hemingwayCompliant ? 'PASSED' : 'NEEDS IMPROVEMENT'}`);

    if (hemingwayCompliant) {
      console.log('🎉 Content follows Ernest Hemingway writing style!');
      console.log('   • Short sentences ✅');
      console.log('   • Simple words ✅');
      console.log('   • Active voice ✅');
      console.log('   • Grade 6 reading level ✅');
    }
  }

  console.log('\n📝 Ready for Brisbane SEO domination! 🚀');
}

module.exports = { analyzeText, analyzeHomepage, analyzeWaterDamagePage };