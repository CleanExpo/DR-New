/**
 * Quality Validation Service
 * Multi-stage validation for generated articles
 * Ensures: word count, readability, SEO, structure, schema markup
 */

import { GeneratedArticle, QualityValidationResult } from './templates/types';

/**
 * Calculate Flesch Reading Ease score (0-100)
 * Higher score = easier to read
 * 60-70 = Plain English (recommended)
 * 50-60 = Fairly Difficult
 */
function calculateReadabilityScore(text: string): number {
  // Remove HTML tags if present
  const cleanText = text.replace(/<[^>]*>/g, '');

  // Count words
  const words = cleanText.trim().split(/\s+/).length;

  // Count sentences (rough estimate: ends with . ! ?)
  const sentences = cleanText.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

  // Count syllables (rough estimate)
  const syllables = estimateSyllables(cleanText);

  // Flesch Reading Ease formula
  if (words === 0 || sentences === 0) return 0;

  const score = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);

  // Clamp between 0 and 100
  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Estimate syllable count (simplified)
 */
function estimateSyllables(text: string): number {
  const words = text.toLowerCase().split(/\s+/);
  let totalSyllables = 0;

  words.forEach(word => {
    // Remove non-alphabetic characters
    const cleanWord = word.replace(/[^a-z]/g, '');

    // Rough syllable estimation
    let syllableCount = 0;
    let vowelSequence = false;

    for (let i = 0; i < cleanWord.length; i++) {
      const isVowel = 'aeiouy'.includes(cleanWord[i]);

      if (isVowel && !vowelSequence) {
        syllableCount++;
        vowelSequence = true;
      } else if (!isVowel) {
        vowelSequence = false;
      }
    }

    // Adjust for silent e
    if (cleanWord.endsWith('e')) {
      syllableCount--;
    }

    // Minimum 1 syllable per word
    if (syllableCount < 1) syllableCount = 1;

    totalSyllables += syllableCount;
  });

  return totalSyllables;
}

/**
 * Calculate keyword density
 */
function calculateKeywordDensity(text: string, keyword: string): number {
  if (!keyword || keyword.length === 0) return 0;

  const cleanText = text.toLowerCase();
  const keywordLower = keyword.toLowerCase();

  // Count keyword occurrences (word boundaries)
  const regex = new RegExp(`\\b${keywordLower}\\b`, 'g');
  const matches = cleanText.match(regex) || [];
  const keywordCount = matches.length;

  // Count total words
  const totalWords = cleanText.split(/\s+/).length;

  // Calculate density as percentage
  return totalWords > 0 ? (keywordCount / totalWords) * 100 : 0;
}

/**
 * Count internal links in content
 */
function countInternalLinks(article: GeneratedArticle): number {
  return article.seo.internalLinks.length;
}

/**
 * Validate schema markup
 */
function validateSchemaMarkup(article: GeneratedArticle): { found: string[]; valid: boolean } {
  const found: string[] = [];

  if (article.seo.schema.type) {
    found.push(article.seo.schema.type);
  }

  if (article.faqs && article.faqs.length > 0) {
    found.push('FAQSchema');
  }

  if (article.seo.schema.author) {
    found.push('PersonSchema');
  }

  // Check if sections have schema types
  const hasHowToSteps = article.sections.some(s => s.schemaType === 'HowToStep');
  if (hasHowToSteps) {
    found.push('HowToSchema');
  }

  // Valid if we have Article + at least one additional schema
  const valid = found.length >= 2;

  return { found, valid };
}

/**
 * Validate article structure
 */
function validateStructure(article: GeneratedArticle): { valid: boolean; issues: string[] } {
  const issues: string[] = [];

  // Check for H1 in title
  if (!article.title || article.title.length < 10) {
    issues.push('Title is too short (< 10 characters)');
  }

  // Check sections exist
  if (!article.sections || article.sections.length === 0) {
    issues.push('Article has no sections');
  }

  // Check for missing sections
  if (article.sections.length < 5) {
    issues.push(`Article only has ${article.sections.length} sections (recommend 7+)`);
  }

  // Check first section is substantial
  if (article.sections[0] && article.sections[0].wordCount < 150) {
    issues.push('Opening section too short (< 150 words)');
  }

  // Check FAQs exist
  if (!article.faqs || article.faqs.length === 0) {
    issues.push('Article has no FAQs');
  } else if (article.faqs.length < 3) {
    issues.push(`Only ${article.faqs.length} FAQs (recommend 3+)`);
  }

  return {
    valid: issues.length === 0,
    issues
  };
}

/**
 * Generate quality suggestions
 */
function generateSuggestions(result: QualityValidationResult, article: GeneratedArticle): string[] {
  const suggestions: string[] = [];

  // Word count suggestions
  if (result.wordCount < 1500) {
    suggestions.push(`Expand content to 1500+ words (currently ${result.wordCount})`);
  }
  if (result.wordCount > 2500) {
    suggestions.push(`Consider breaking 2500+ word article into multiple pieces`);
  }

  // Readability suggestions
  if (result.readabilityScore < 50) {
    suggestions.push('Simplify language - use shorter sentences and common words');
  }
  if (result.readabilityScore > 80) {
    suggestions.push('Content might be too simple - add more sophisticated vocabulary');
  }

  // Keyword suggestions
  if (result.keywordDensity.primary < 0.5) {
    suggestions.push(`Primary keyword appears only ${result.keywordDensity.primary.toFixed(2)}% - increase mentions`);
  }
  if (result.keywordDensity.primary > 3) {
    suggestions.push(`Primary keyword appears ${result.keywordDensity.primary.toFixed(2)}% - reduce to avoid over-optimization`);
  }

  // Internal link suggestions
  if (result.internalLinks < 3) {
    suggestions.push(`Only ${result.internalLinks} internal links - add 3-5 more`);
  }
  if (result.internalLinks > 10) {
    suggestions.push(`${result.internalLinks} internal links - reduce to 3-10`);
  }

  // Schema suggestions
  if (!result.schemaMarkup.valid) {
    suggestions.push('Add missing schema markup for better search visibility');
  }

  return suggestions;
}

/**
 * Validate complete article
 */
export function validateArticle(article: GeneratedArticle): QualityValidationResult {
  // Word count validation
  const wordCount = article.wordCount || 0;
  const wordCountValid = wordCount >= 1500 && wordCount <= 2500;

  // Readability validation
  const readabilityScore = calculateReadabilityScore(article.content);
  const readabilityValid = readabilityScore >= 50 && readabilityScore <= 75;

  // Keyword density validation
  const primaryDensity = calculateKeywordDensity(article.content, article.seo.primaryKeyword);
  const secondaryDensities = article.seo.secondaryKeywords.map(
    kw => calculateKeywordDensity(article.content, kw)
  );

  const keywordDensityValid = primaryDensity >= 0.5 && primaryDensity <= 3;

  // Internal links validation
  const internalLinksCount = countInternalLinks(article);
  const internalLinksValid = internalLinksCount >= 3 && internalLinksCount <= 10;

  // Schema markup validation
  const schemaMarkup = validateSchemaMarkup(article);

  // Structure validation
  const structure = validateStructure(article);

  // Collect all issues
  const issues = [...structure.issues];

  if (!wordCountValid) {
    issues.push(`Word count ${wordCount} outside range (1500-2500)`);
  }

  if (!readabilityValid) {
    issues.push(`Readability score ${readabilityScore} outside range (50-75)`);
  }

  if (!keywordDensityValid) {
    issues.push(`Primary keyword density ${primaryDensity.toFixed(2)}% outside range (0.5%-3%)`);
  }

  if (!internalLinksValid) {
    issues.push(`Internal links ${internalLinksCount} outside range (3-10)`);
  }

  if (!schemaMarkup.valid) {
    issues.push('Missing required schema markup');
  }

  // Generate suggestions
  const suggestions = generateSuggestions({
    passed: issues.length === 0,
    wordCount,
    wordCountValid,
    readabilityScore,
    readabilityValid,
    keywordDensity: {
      primary: primaryDensity,
      secondary: secondaryDensities,
      valid: keywordDensityValid
    },
    internalLinks: internalLinksCount,
    internalLinksValid,
    schemaMarkup,
    issues: [],
    suggestions: [],
    qualityScore: 0
  }, article);

  // Calculate quality score (0-100)
  let qualityScore = 100;

  if (!wordCountValid) qualityScore -= 15;
  if (!readabilityValid) qualityScore -= 15;
  if (!keywordDensityValid) qualityScore -= 10;
  if (!internalLinksValid) qualityScore -= 10;
  if (!schemaMarkup.valid) qualityScore -= 15;
  if (!structure.valid) qualityScore -= 20;

  // Ensure score doesn't go below 0
  qualityScore = Math.max(0, qualityScore);

  return {
    passed: issues.length === 0,
    wordCount,
    wordCountValid,
    readabilityScore,
    readabilityValid,
    keywordDensity: {
      primary: primaryDensity,
      secondary: secondaryDensities,
      valid: keywordDensityValid
    },
    internalLinks: internalLinksCount,
    internalLinksValid,
    schemaMarkup,
    issues,
    suggestions,
    qualityScore
  };
}

/**
 * Batch validate multiple articles
 */
export function validateBatch(articles: GeneratedArticle[]): {
  totalArticles: number;
  passedCount: number;
  failedCount: number;
  averageQualityScore: number;
  results: { article: GeneratedArticle; validation: QualityValidationResult }[];
} {
  const results = articles.map(article => ({
    article,
    validation: validateArticle(article)
  }));

  const passedCount = results.filter(r => r.validation.passed).length;
  const failedCount = results.filter(r => !r.validation.passed).length;
  const averageQualityScore = results.reduce((sum, r) => sum + r.validation.qualityScore, 0) / results.length;

  return {
    totalArticles: articles.length,
    passedCount,
    failedCount,
    averageQualityScore: Math.round(averageQualityScore),
    results
  };
}

/**
 * Generate validation report
 */
export function generateValidationReport(validation: QualityValidationResult): string {
  const statusEmoji = validation.passed ? '✅' : '❌';
  const lines: string[] = [
    `${statusEmoji} **Article Quality Report**`,
    '',
    `**Overall Score**: ${validation.qualityScore}/100`,
    `**Status**: ${validation.passed ? 'PASSED' : 'NEEDS REVISION'}`,
    '',
    `**Word Count**: ${validation.wordCount} (${validation.wordCountValid ? '✓' : '✗'} target: 1500-2500)`,
    `**Readability**: ${validation.readabilityScore}/100 (${validation.readabilityValid ? '✓' : '✗'} target: 50-75)`,
    `**Primary Keyword Density**: ${validation.keywordDensity.primary.toFixed(2)}% (${validation.keywordDensity.valid ? '✓' : '✗'} target: 0.5-3%)`,
    `**Internal Links**: ${validation.internalLinks} (${validation.internalLinksValid ? '✓' : '✗'} target: 3-10)`,
    `**Schema Markup**: ${validation.schemaMarkup.found.join(', ') || 'None'} (${validation.schemaMarkup.valid ? '✓' : '✗'})`,
    ''
  ];

  if (validation.issues.length > 0) {
    lines.push('**Issues Found:**');
    validation.issues.forEach(issue => {
      lines.push(`- ❌ ${issue}`);
    });
    lines.push('');
  }

  if (validation.suggestions.length > 0) {
    lines.push('**Suggestions:**');
    validation.suggestions.forEach(suggestion => {
      lines.push(`- 💡 ${suggestion}`);
    });
  }

  return lines.join('\n');
}
