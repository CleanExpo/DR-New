/**
 * AI Content Generator Service
 * Generates articles using Gemini API with template-based structuring
 * Integrates with templates to create SEO-optimised content
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeneratedArticle, TemplateInput } from './templates/types';
import { generateServicePillar } from './templates/service-pillar.template';
import { generateEmergencyGuide } from './templates/emergency-guide.template';

/**
 * Initialize Gemini AI client
 */
function initializeGemini() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  if (!apiKey) {
    throw new Error('GOOGLE_GENERATIVE_AI_API_KEY environment variable not set');
  }

  return new GoogleGenerativeAI(apiKey);
}

/**
 * Generate article using Gemini AI
 * Leverages template structure but uses AI for content generation
 */
export async function generateArticle(
  input: TemplateInput,
  templateType: 'service-pillar' | 'emergency-guide' = 'service-pillar'
): Promise<GeneratedArticle> {
  // First, generate base template
  let baseArticle: GeneratedArticle;

  if (templateType === 'service-pillar') {
    baseArticle = generateServicePillar(input);
  } else if (templateType === 'emergency-guide') {
    baseArticle = generateEmergencyGuide(input);
  } else {
    throw new Error(`Unknown template type: ${templateType}`);
  }

  // Optionally enhance with Gemini AI for additional content
  // (Implementation depends on whether AI enhancement is desired)
  // For now, templates provide complete content structure

  return baseArticle;
}

/**
 * Generate article with AI enhancement
 * Uses Gemini to expand sections and improve content
 */
export async function generateArticleWithEnhancement(
  input: TemplateInput,
  templateType: 'service-pillar' | 'emergency-guide' = 'service-pillar'
): Promise<GeneratedArticle> {
  // Get base template
  const baseArticle = await generateArticle(input, templateType);

  // Check if AI enhancement is enabled (via env var)
  const enhanceWithAI = process.env.ENABLE_AI_ENHANCEMENT !== 'false';

  if (!enhanceWithAI) {
    return baseArticle;
  }

  try {
    const genAI = initializeGemini();
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Enhance specific sections with AI
    const enhancedArticle = { ...baseArticle };

    // Get first 2-3 sections for AI enhancement
    const sectionsToEnhance = enhancedArticle.sections.slice(0, 3);

    for (const section of sectionsToEnhance) {
      try {
        const prompt = `
You are an expert SEO content writer specializing in Australian disaster recovery services.

Enhance this section of a blog post about "${input.serviceName}":

**Current Content**:
${section.content}

**Requirements**:
1. Maintain the same overall message and structure
2. Add 20-30% more content (expand from ${section.wordCount} to approximately ${Math.round(section.wordCount * 1.25)} words)
3. Keep Australian English (use "colour", "mould", "organisation", etc.)
4. Add more specific examples and practical details
5. Maintain an expert, professional tone
6. Include at least one specific statistic or fact
7. Do NOT add any HTML tags or markdown formatting
8. Keep the section cohesive and natural-reading

Return ONLY the enhanced section content, nothing else.
        `.trim();

        const result = await model.generateContent(prompt);
        const enhancedContent = result.response.text();

        // Update section with enhanced content
        section.content = enhancedContent;
        section.wordCount = Math.round(section.wordCount * 1.25);
      } catch (error) {
        console.warn(`Failed to enhance section "${section.heading}":`, error);
        // Continue with original content if enhancement fails
      }
    }

    // Recalculate total word count and read time
    enhancedArticle.wordCount = enhancedArticle.sections.reduce((sum, s) => sum + s.wordCount, 0) + 100;
    enhancedArticle.estimatedReadTime = Math.ceil(enhancedArticle.wordCount / 200);

    return enhancedArticle;
  } catch (error) {
    console.warn('AI enhancement failed, returning base article:', error);
    return baseArticle;
  }
}

/**
 * Generate multiple articles in batch
 */
export async function generateBatch(
  inputs: TemplateInput[],
  templateType: 'service-pillar' | 'emergency-guide' = 'service-pillar',
  parallel: number = 3
): Promise<{
  articles: GeneratedArticle[];
  errors: { input: TemplateInput; error: string }[];
  totalTime: number;
}> {
  const startTime = Date.now();
  const articles: GeneratedArticle[] = [];
  const errors: { input: TemplateInput; error: string }[] = [];

  // Process in parallel batches
  for (let i = 0; i < inputs.length; i += parallel) {
    const batch = inputs.slice(i, i + parallel);

    const results = await Promise.allSettled(
      batch.map(input => generateArticle(input, templateType))
    );

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        articles.push(result.value);
      } else {
        errors.push({
          input: batch[index],
          error: result.reason?.message || 'Unknown error'
        });
      }
    });
  }

  const totalTime = Date.now() - startTime;

  return {
    articles,
    errors,
    totalTime
  };
}

/**
 * Validate Gemini API key
 */
export async function validateGeminiKey(): Promise<boolean> {
  try {
    const genAI = initializeGemini();
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Simple test prompt
    const result = await model.generateContent('Say "API key is valid"');
    return result.response.text().includes('valid');
  } catch (error) {
    console.error('Gemini API key validation failed:', error);
    return false;
  }
}

/**
 * Generate article slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 75);
}

/**
 * Estimate generation time for batch
 */
export function estimateGenerationTime(count: number, templateType: string): number {
  // Rough estimates (in seconds)
  const timePerArticle = templateType === 'service-pillar' ? 5 : 3;
  return count * timePerArticle;
}
