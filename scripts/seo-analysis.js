const fs = require('fs');
const path = require('path');

// Hemingway Readability Analysis
class ReadabilityAnalyzer {
  constructor(text) {
    this.text = text.toLowerCase();
    this.sentences = this.getSentences();
    this.words = this.getWords();
    this.syllables = this.getSyllables();
  }

  getSentences() {
    return this.text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  }

  getWords() {
    return this.text.match(/\b\w+\b/g) || [];
  }

  getSyllables() {
    let syllableCount = 0;
    for (const word of this.words) {
      syllableCount += this.countSyllables(word);
    }
    return syllableCount;
  }

  countSyllables(word) {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;

    const vowels = 'aeiouy';
    let syllables = 0;
    let prevChar = '';

    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (vowels.includes(char) && !vowels.includes(prevChar)) {
        syllables++;
      }
      prevChar = char;
    }

    // Handle silent e
    if (word.endsWith('e')) syllables--;

    return Math.max(1, syllables);
  }

  getAverageWordsPerSentence() {
    return this.sentences.length > 0 ? this.words.length / this.sentences.length : 0;
  }

  getAverageSyllablesPerWord() {
    return this.words.length > 0 ? this.syllables / this.words.length : 0;
  }

  getFleschKincaidGrade() {
    const avgWordsPerSentence = this.getAverageWordsPerSentence();
    const avgSyllablesPerWord = this.getAverageSyllablesPerWord();

    return (0.39 * avgWordsPerSentence) + (11.8 * avgSyllablesPerWord) - 15.59;
  }

  getReadabilityScore() {
    const avgWordsPerSentence = this.getAverageWordsPerSentence();
    const avgSyllablesPerWord = this.getAverageSyllablesPerWord();

    return 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
  }

  getHemingwayAnalysis() {
    const longSentences = this.sentences.filter(s => s.split(' ').length > 20);
    const veryLongSentences = this.sentences.filter(s => s.split(' ').length > 25);

    // Check for passive voice (simple detection)
    const passiveVoiceCount = this.countPassiveVoice();

    // Check for adverbs (words ending in -ly)
    const adverbs = this.words.filter(word => word.endsWith('ly') && word.length > 3);

    return {
      grade: Math.round(this.getFleschKincaidGrade()),
      readabilityScore: Math.round(this.getReadabilityScore()),
      sentenceCount: this.sentences.length,
      wordCount: this.words.length,
      avgWordsPerSentence: Math.round(this.getAverageWordsPerSentence() * 10) / 10,
      longSentences: longSentences.length,
      veryLongSentences: veryLongSentences.length,
      passiveVoiceCount: passiveVoiceCount,
      adverbs: adverbs.length,
      suggestions: this.getSuggestions()
    };
  }

  countPassiveVoice() {
    const passiveIndicators = [
      'is being', 'was being', 'are being', 'were being',
      'is written', 'was written', 'are written', 'were written',
      'is done', 'was done', 'are done', 'were done',
      'is made', 'was made', 'are made', 'were made'
    ];

    let count = 0;
    for (const indicator of passiveIndicators) {
      const regex = new RegExp(indicator, 'gi');
      const matches = this.text.match(regex);
      if (matches) count += matches.length;
    }

    return count;
  }

  getSuggestions() {
    const suggestions = [];
    const analysis = this.getHemingwayAnalysis();

    if (analysis.grade > 6) {
      suggestions.push('Reduce reading grade level to 6 or below for better readability');
    }

    if (analysis.avgWordsPerSentence > 20) {
      suggestions.push('Break up long sentences. Keep sentences under 20 words');
    }

    if (analysis.longSentences > 0) {
      suggestions.push(`${analysis.longSentences} sentences are hard to read. Make them shorter`);
    }

    if (analysis.veryLongSentences > 0) {
      suggestions.push(`${analysis.veryLongSentences} sentences are very hard to read. Break them up`);
    }

    if (analysis.passiveVoiceCount > 0) {
      suggestions.push(`${analysis.passiveVoiceCount} instances of passive voice. Use active voice instead`);
    }

    if (analysis.adverbs > analysis.wordCount * 0.05) {
      suggestions.push('Too many adverbs. Remove unnecessary -ly words');
    }

    return suggestions;
  }
}

// SEO Content Analyzer
class SEOAnalyzer {
  constructor(content, targetKeywords = []) {
    this.content = content;
    this.targetKeywords = targetKeywords;
    this.wordCount = this.getWordCount();
  }

  getWordCount() {
    return (this.content.match(/\b\w+\b/g) || []).length;
  }

  getKeywordDensity(keyword) {
    const regex = new RegExp(keyword.toLowerCase(), 'gi');
    const matches = this.content.toLowerCase().match(regex);
    const count = matches ? matches.length : 0;
    return {
      count: count,
      density: (count / this.wordCount) * 100
    };
  }

  analyzeKeywords() {
    const analysis = {};

    for (const keyword of this.targetKeywords) {
      const density = this.getKeywordDensity(keyword);
      analysis[keyword] = {
        ...density,
        optimal: density.density >= 1 && density.density <= 3,
        recommendation: this.getKeywordRecommendation(density.density)
      };
    }

    return analysis;
  }

  getKeywordRecommendation(density) {
    if (density < 1) return 'Too low - increase keyword usage';
    if (density > 3) return 'Too high - reduce keyword usage to avoid over-optimization';
    return 'Good keyword density';
  }

  getContentAnalysis() {
    return {
      wordCount: this.wordCount,
      keywordAnalysis: this.analyzeKeywords(),
      recommendations: this.getContentRecommendations()
    };
  }

  getContentRecommendations() {
    const recommendations = [];

    if (this.wordCount < 300) {
      recommendations.push('Content too short. Add more valuable content (minimum 300 words)');
    }

    if (this.wordCount > 2000) {
      recommendations.push('Content very long. Consider breaking into multiple pages');
    }

    // Check for title tags
    if (!this.content.includes('<h1')) {
      recommendations.push('Missing H1 tag. Add a main heading');
    }

    // Check for meta description content
    if (this.content.length < 150) {
      recommendations.push('Content too short for effective meta description');
    }

    return recommendations;
  }
}

// Main Analysis Function
function analyzePage(filePath, targetKeywords = []) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // Extract text content from React/HTML
    const textContent = content
      .replace(/<[^>]*>/g, ' ') // Remove HTML/JSX tags
      .replace(/\{[^}]*\}/g, ' ') // Remove JSX expressions
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();

    const readabilityAnalyzer = new ReadabilityAnalyzer(textContent);
    const seoAnalyzer = new SEOAnalyzer(textContent, targetKeywords);

    const hemingwayAnalysis = readabilityAnalyzer.getHemingwayAnalysis();
    const seoAnalysis = seoAnalyzer.getContentAnalysis();

    return {
      file: filePath,
      readability: hemingwayAnalysis,
      seo: seoAnalysis,
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error(`Error analyzing ${filePath}:`, error.message);
    return null;
  }
}

// Analyze all pages
function analyzeAllPages() {
  const pages = [
    {
      file: 'app/page.tsx',
      keywords: [
        'disaster recovery brisbane',
        'water damage restoration',
        'fire damage restoration',
        'brisbane',
        'emergency'
      ]
    },
    {
      file: 'app/services/water-damage-restoration/page.tsx',
      keywords: [
        'water damage restoration brisbane',
        'flood damage repair',
        'water extraction',
        'brisbane'
      ]
    }
  ];

  const results = [];

  for (const page of pages) {
    const analysis = analyzePage(path.join(__dirname, '..', page.file), page.keywords);
    if (analysis) {
      results.push(analysis);
    }
  }

  return results;
}

// Generate Report
function generateReport(results) {
  console.log('\n=== DISASTER RECOVERY BRISBANE - SEO & READABILITY ANALYSIS ===\n');

  for (const result of results) {
    console.log(`\n📄 FILE: ${result.file}`);
    console.log('─'.repeat(50));

    // Readability Analysis
    console.log('\n📖 READABILITY ANALYSIS (Hemingway Style):');
    console.log(`   Grade Level: ${result.readability.grade} ${result.readability.grade <= 6 ? '✅' : '❌'}`);
    console.log(`   Reading Score: ${result.readability.readabilityScore}`);
    console.log(`   Word Count: ${result.readability.wordCount}`);
    console.log(`   Sentences: ${result.readability.sentenceCount}`);
    console.log(`   Avg Words/Sentence: ${result.readability.avgWordsPerSentence} ${result.readability.avgWordsPerSentence <= 20 ? '✅' : '❌'}`);
    console.log(`   Long Sentences: ${result.readability.longSentences} ${result.readability.longSentences === 0 ? '✅' : '❌'}`);
    console.log(`   Passive Voice: ${result.readability.passiveVoiceCount} ${result.readability.passiveVoiceCount === 0 ? '✅' : '❌'}`);
    console.log(`   Adverbs: ${result.readability.adverbs} ${result.readability.adverbs <= 5 ? '✅' : '❌'}`);

    // SEO Analysis
    console.log('\n🔍 SEO ANALYSIS:');
    console.log(`   Content Length: ${result.seo.wordCount} words ${result.seo.wordCount >= 300 ? '✅' : '❌'}`);

    if (Object.keys(result.seo.keywordAnalysis).length > 0) {
      console.log('\n   Keyword Analysis:');
      for (const [keyword, analysis] of Object.entries(result.seo.keywordAnalysis)) {
        console.log(`     "${keyword}": ${analysis.count} times (${analysis.density.toFixed(1)}%) ${analysis.optimal ? '✅' : '❌'}`);
        console.log(`       → ${analysis.recommendation}`);
      }
    }

    // Suggestions
    if (result.readability.suggestions.length > 0) {
      console.log('\n💡 READABILITY SUGGESTIONS:');
      result.readability.suggestions.forEach(suggestion => {
        console.log(`   • ${suggestion}`);
      });
    }

    if (result.seo.recommendations.length > 0) {
      console.log('\n💡 SEO RECOMMENDATIONS:');
      result.seo.recommendations.forEach(recommendation => {
        console.log(`   • ${recommendation}`);
      });
    }

    console.log('\n' + '='.repeat(50));
  }

  // Overall Score
  const overallGrade = results.reduce((sum, r) => sum + r.readability.grade, 0) / results.length;
  const overallWordCount = results.reduce((sum, r) => sum + r.seo.wordCount, 0);

  console.log('\n📊 OVERALL SUMMARY:');
  console.log(`   Average Reading Grade: ${overallGrade.toFixed(1)} ${overallGrade <= 6 ? '✅' : '❌'}`);
  console.log(`   Total Words: ${overallWordCount}`);
  console.log(`   Pages Analyzed: ${results.length}`);
  console.log(`   Analysis Date: ${new Date().toLocaleString()}`);

  // Hemingway Compliance
  const hemingwayCompliant = results.every(r =>
    r.readability.grade <= 6 &&
    r.readability.avgWordsPerSentence <= 20 &&
    r.readability.passiveVoiceCount === 0
  );

  console.log(`\n🎯 HEMINGWAY COMPLIANCE: ${hemingwayCompliant ? '✅ PASSED' : '❌ NEEDS WORK'}`);
}

// Run Analysis
if (require.main === module) {
  console.log('Starting SEO and Readability Analysis...');
  const results = analyzeAllPages();

  if (results.length > 0) {
    generateReport(results);

    // Save detailed report
    const reportPath = path.join(__dirname, '..', 'seo-readability-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    console.log(`\n📁 Detailed report saved to: ${reportPath}`);
  } else {
    console.log('No files could be analyzed.');
  }
}

module.exports = {
  ReadabilityAnalyzer,
  SEOAnalyzer,
  analyzePage,
  analyzeAllPages,
  generateReport
};