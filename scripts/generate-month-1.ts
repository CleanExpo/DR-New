/**
 * Month 1 Article Generation Script
 * Generates all 20 foundation articles for Phase 4
 * Uses service-pillar and emergency-guide templates
 *
 * Usage: npx ts-node scripts/generate-month-1.ts
 */

import * as fs from 'fs/promises';
import { generateServicePillar } from '../lib/content/templates/service-pillar.template';
import { generateEmergencyGuide } from '../lib/content/templates/emergency-guide.template';
import { validateArticle, generateValidationReport } from '../lib/content/quality-validator';
import { GeneratedArticle, TemplateInput } from '../lib/content/templates/types';

interface Month1Config {
  service_pillars: TemplateInput[];
  emergency_guides: TemplateInput[];
}

/**
 * Load Month 1 configuration
 */
async function loadConfig(): Promise<Month1Config> {
  const configFile = await fs.readFile('data/content/month-1-articles.json', 'utf-8');
  return JSON.parse(configFile) as Month1Config;
}

/**
 * Generate all Month 1 articles
 */
async function generateMonth1() {
  console.log('\n🚀 MONTH 1 ARTICLE GENERATION - Phase 4 Content Strategy\n');
  console.log('═'.repeat(70));

  const config = await loadConfig();
  const articles: GeneratedArticle[] = [];
  const validations: any[] = [];

  // Generate service pillars
  console.log('\n📘 GENERATING SERVICE PILLARS (6 × 2500 words)\n');
  console.log('─'.repeat(70));

  for (let i = 0; i < config.service_pillars.length; i++) {
    const input = config.service_pillars[i];
    console.log(`\n[${i + 1}/6] Generating: ${input.serviceName}`);

    try {
      const article = generateServicePillar(input);
      const validation = validateArticle(article);

      articles.push(article);
      validations.push({
        title: article.title,
        wordCount: article.wordCount,
        qualityScore: validation.qualityScore,
        passed: validation.passed,
        validation
      });

      // Display validation summary
      const statusIcon = validation.passed ? '✅' : '⚠️';
      console.log(`${statusIcon} Generated: ${article.wordCount} words | Quality: ${validation.qualityScore}/100`);

      if (!validation.passed) {
        console.log('\nIssues:');
        validation.issues.forEach(issue => console.log(`  ❌ ${issue}`));
      }
    } catch (error) {
      console.error(`❌ Failed: ${error instanceof Error ? error.message : error}`);
    }
  }

  // Generate emergency guides
  console.log('\n\n📕 GENERATING EMERGENCY GUIDES (14 × 1500 words)\n');
  console.log('─'.repeat(70));

  for (let i = 0; i < config.emergency_guides.length; i++) {
    const input = config.emergency_guides[i];
    console.log(`\n[${i + 1}/14] Generating: ${input.serviceName}`);

    try {
      const article = generateEmergencyGuide(input);
      const validation = validateArticle(article);

      articles.push(article);
      validations.push({
        title: article.title,
        wordCount: article.wordCount,
        qualityScore: validation.qualityScore,
        passed: validation.passed,
        validation
      });

      // Display validation summary
      const statusIcon = validation.passed ? '✅' : '⚠️';
      console.log(`${statusIcon} Generated: ${article.wordCount} words | Quality: ${validation.qualityScore}/100`);

      if (!validation.passed && validation.issues.length > 0) {
        console.log('\nIssues:');
        validation.issues.slice(0, 2).forEach(issue => console.log(`  ❌ ${issue}`));
      }
    } catch (error) {
      console.error(`❌ Failed: ${error instanceof Error ? error.message : error}`);
    }
  }

  // Generate summary report
  console.log('\n\n' + '═'.repeat(70));
  console.log('\n📊 MONTH 1 GENERATION SUMMARY\n');
  console.log('─'.repeat(70));

  const totalArticles = articles.length;
  const totalWords = articles.reduce((sum, a) => sum + a.wordCount, 0);
  const passedCount = validations.filter(v => v.passed).length;
  const averageQuality = Math.round(
    validations.reduce((sum, v) => sum + v.qualityScore, 0) / validations.length
  );

  console.log(`\n✅ Total Articles Generated: ${totalArticles}/20`);
  console.log(`📝 Total Word Count: ${totalWords.toLocaleString()} words`);
  console.log(`✅ Quality Passed: ${passedCount}/${totalArticles}`);
  console.log(`📈 Average Quality Score: ${averageQuality}/100\n`);

  // Word count breakdown
  console.log('Word Count Breakdown:');
  const servicePillars = articles.slice(0, 6);
  const emergencyGuides = articles.slice(6);
  const servicePillarWords = servicePillars.reduce((sum, a) => sum + a.wordCount, 0);
  const emergencyGuideWords = emergencyGuides.reduce((sum, a) => sum + a.wordCount, 0);

  console.log(`  • Service Pillars (6): ${servicePillarWords.toLocaleString()} words avg ${Math.round(servicePillarWords / 6)}/article`);
  console.log(`  • Emergency Guides (14): ${emergencyGuideWords.toLocaleString()} words avg ${Math.round(emergencyGuideWords / 14)}/article`);

  // Quality breakdown
  console.log('\nQuality Score Distribution:');
  const excellentCount = validations.filter(v => v.qualityScore >= 85).length;
  const goodCount = validations.filter(v => v.qualityScore >= 75 && v.qualityScore < 85).length;
  const fairCount = validations.filter(v => v.qualityScore >= 65 && v.qualityScore < 75).length;
  const poorCount = validations.filter(v => v.qualityScore < 65).length;

  console.log(`  • Excellent (85+): ${excellentCount} articles`);
  console.log(`  • Good (75-84): ${goodCount} articles`);
  console.log(`  • Fair (65-74): ${fairCount} articles`);
  console.log(`  • Needs Work (<65): ${poorCount} articles`);

  // Article listing
  console.log('\n' + '─'.repeat(70));
  console.log('\nGenerated Articles:\n');

  articles.forEach((article, i) => {
    const validation = validations[i];
    const statusIcon = validation.passed ? '✅' : '⚠️';
    console.log(`${statusIcon} ${i + 1}. ${article.title}`);
    console.log(`   Words: ${article.wordCount} | Quality: ${validation.qualityScore}/100 | Read time: ${article.estimatedReadTime} min`);
  });

  // Save results to JSON
  const results = {
    generatedAt: new Date().toISOString(),
    totalArticles,
    totalWords,
    passedCount,
    averageQuality,
    articles: articles.map((article, i) => ({
      title: article.title,
      slug: article.slug,
      wordCount: article.wordCount,
      qualityScore: validations[i].qualityScore,
      passed: validations[i].passed,
      type: article.templateType,
      readTime: article.estimatedReadTime
    })),
    stats: {
      servicePillars: {
        count: 6,
        totalWords: servicePillarWords,
        avgWords: Math.round(servicePillarWords / 6)
      },
      emergencyGuides: {
        count: 14,
        totalWords: emergencyGuideWords,
        avgWords: Math.round(emergencyGuideWords / 14)
      }
    }
  };

  await fs.writeFile(
    'data/content/month-1-generation-results.json',
    JSON.stringify(results, null, 2),
    'utf-8'
  );

  console.log('\n✅ Results saved to data/content/month-1-generation-results.json');

  // Save individual articles
  console.log('\n💾 Saving individual articles...');

  const articlesDir = 'data/content/articles';
  try {
    await fs.mkdir(articlesDir, { recursive: true });
  } catch {}

  for (const article of articles) {
    const filename = `${article.slug}.json`;
    await fs.writeFile(
      `${articlesDir}/${filename}`,
      JSON.stringify(article, null, 2),
      'utf-8'
    );
  }

  console.log(`✅ Saved ${articles.length} articles to ${articlesDir}/`);

  // Next steps
  console.log('\n' + '═'.repeat(70));
  console.log('\n📋 NEXT STEPS\n');
  console.log('1. ✅ Infrastructure created (types, templates, validator, CLI)');
  console.log('2. ✅ Month 1 articles generated (20 total)');
  console.log('3. 📝 Next: Review and optimize articles');
  console.log('4. 📅 Schedule for 7-week staggered publishing');
  console.log('5. 🚀 Create publishing automation cron job');
  console.log('6. 🌐 Deploy to Vercel');
  console.log('7. 📊 Monitor rankings and traffic\n');

  console.log('═'.repeat(70) + '\n');
}

// Run generation
generateMonth1().catch(error => {
  console.error('\n❌ Generation failed:', error);
  process.exit(1);
});
