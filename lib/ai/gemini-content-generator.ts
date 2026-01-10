/**
 * Gemini 3 Pro Content Generator
 *
 * Generates on-brand marketing copy, headlines, CTAs, and content variations
 * using Google's Gemini 3 Pro API with NRPG brand guidelines injection.
 *
 * Usage:
 * const generator = new GeminiContentGenerator();
 * const headline = await generator.generateHeadline({
 *   audience: 'emergency',
 *   context: 'Water damage flooding',
 *   maxLength: 60,
 * });
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  nrpgBrandGuidelines,
  getBrandContextString,
  validateBrandCompliance,
  getAudienceTone,
} from './brand-guidelines';

export interface ContentGenerationOptions {
  audience: 'emergency' | 'contractor' | 'insurance';
  context?: string;
  maxLength?: number;
  tone?: 'urgent' | 'professional' | 'aspirational';
  keywords?: string[];
  format?: 'headline' | 'cta' | 'paragraph' | 'value_prop' | 'testimonial';
}

export interface GeneratedContent {
  text: string;
  audience: string;
  compliant: boolean;
  complianceIssues?: string[];
  tokensUsed: number;
}

export interface ContentVariant {
  variant: string;
  text: string;
  psychological_appeal: string;
  estimated_conversion_lift: number;
}

class GeminiContentGenerator {
  private client: GoogleGenerativeAI;
  private model: any;
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.GEMINI_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('GEMINI_API_KEY not found in environment or constructor');
    }

    this.client = new GoogleGenerativeAI(this.apiKey);
    // Note: Using Gemini 2.5 Flash for now (API limitation)
    // TODO: Upgrade to gemini-3-pro when available
    this.model = this.client.getGenerativeModel({ model: 'gemini-2.5-flash' });
  }

  /**
   * Generate a headline for any content type
   */
  async generateHeadline(options: ContentGenerationOptions): Promise<GeneratedContent> {
    const { audience, context, maxLength = 60 } = options;

    const prompt = `
${getBrandContextString(audience)}

TASK: Generate a compelling headline for ${audience} audience.

CONTEXT: ${context || 'General NRPG service'}
MAX LENGTH: ${maxLength} characters
FORMAT: Headline (short, punchy, action-oriented)

REQUIREMENTS:
1. Must start with action verb or emotional trigger
2. Include at least one key benefit
3. Stay under ${maxLength} characters
4. Must feel urgent for emergency, aspirational for contractor
5. Use brand keywords naturally

Generate ONE headline only. Return just the text, no quotes or explanation.
`;

    try {
      const response = await this.model.generateContent(prompt);
      const text = response.response.text().trim();

      // Validate compliance
      const validation = validateBrandCompliance(text, audience);

      return {
        text,
        audience,
        compliant: validation.compliant,
        complianceIssues: validation.issues,
        tokensUsed: response.response.usageMetadata?.totalTokenCount || 0,
      };
    } catch (error) {
      throw new Error(`Failed to generate headline: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Generate a call-to-action button text
   */
  async generateCTA(options: ContentGenerationOptions): Promise<GeneratedContent> {
    const { audience, context, maxLength = 40 } = options;
    const tone = getAudienceTone(audience);

    const prompt = `
${getBrandContextString(audience)}

TASK: Generate a CTA button text for ${audience} audience.

CONTEXT: ${context || 'General action'}
MAX LENGTH: ${maxLength} characters
FORMAT: CTA Button Text (2-5 words, action-oriented)

REQUIREMENTS:
1. Start with action verb: Request, Join, Get, Schedule, Apply, Start, View, Learn
2. Create urgency (for emergency) or exclusivity (for contractor)
3. Use benefit-focused language
4. Stay under ${maxLength} characters
5. Match tone: ${tone.tone}

Generate ONE CTA only. Return just the text, no quotes or explanation.
`;

    try {
      const response = await this.model.generateContent(prompt);
      const text = response.response.text().trim();

      const validation = validateBrandCompliance(text, audience);

      return {
        text,
        audience,
        compliant: validation.compliant,
        complianceIssues: validation.issues,
        tokensUsed: response.response.usageMetadata?.totalTokenCount || 0,
      };
    } catch (error) {
      throw new Error(`Failed to generate CTA: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Generate a value proposition statement
   */
  async generateValueProp(options: ContentGenerationOptions): Promise<GeneratedContent> {
    const { audience, context } = options;

    const prompt = `
${getBrandContextString(audience)}

TASK: Generate a concise value proposition for ${audience} audience.

CONTEXT: ${context || 'NRPG service offering'}
MAX LENGTH: 150 characters
FORMAT: Value Proposition (one clear benefit statement)

REQUIREMENTS:
1. Answer "Why should [audience] choose NRPG?"
2. Lead with biggest benefit for audience
3. Include proof point (certification, speed, network size)
4. Make it distinctive vs competitors
5. Use brand keywords naturally

Generate ONE value prop only. Return just the text, no quotes or explanation.
`;

    try {
      const response = await this.model.generateContent(prompt);
      const text = response.response.text().trim();

      const validation = validateBrandCompliance(text, audience);

      return {
        text,
        audience,
        compliant: validation.compliant,
        complianceIssues: validation.issues,
        tokensUsed: response.response.usageMetadata?.totalTokenCount || 0,
      };
    } catch (error) {
      throw new Error(`Failed to generate value prop: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Generate A/B test variants with different psychological appeals
   */
  async generateABTestVariants(
    baseContent: string,
    audience: 'emergency' | 'contractor' | 'insurance',
    variantCount: 3 | 5 = 3
  ): Promise<ContentVariant[]> {
    const prompt = `
${getBrandContextString(audience)}

TASK: Generate ${variantCount} psychologically optimized variants of this content:

BASE CONTENT: "${baseContent}"

AUDIENCE: ${audience.toUpperCase()}

REQUIREMENTS:
1. Keep same core message but vary psychological appeal
2. Optimise for different decision triggers:
   - Variant A: Urgency/FOMO (for emergency: 60min, now, limited)
   - Variant B: Trust/Authority (for contractor: exclusive, vetted, certified)
   - Variant C: Value/ROI (highlight benefit/savings/reward)
   ${variantCount > 3 ? '- Variant D: Social Proof (others like you, highest rated)' : ''}
   ${variantCount > 4 ? '- Variant E: Curiosity/Exclusivity (only for elite, limited slots)' : ''}

3. Each variant must stay true to brand voice
4. Each should feel distinct but on-brand

OUTPUT FORMAT (JSON):
[
  {
    "variant": "A",
    "text": "...",
    "psychological_appeal": "urgency|trust|value|social_proof|exclusivity",
    "estimated_conversion_lift": 0.05
  },
  ...
]

Return ONLY the JSON array, no markdown or explanation.
`;

    try {
      const response = await this.model.generateContent(prompt);
      let jsonText = response.response.text().trim();

      // Clean up markdown code blocks if present
      if (jsonText.includes('```')) {
        jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      }

      const variants: ContentVariant[] = JSON.parse(jsonText);
      return variants;
    } catch (error) {
      throw new Error(
        `Failed to generate A/B variants: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Generate schema markup content for SEO (FAQ, HowTo, Service)
   */
  async generateSchemaContent(
    schemaType: 'FAQ' | 'HowTo' | 'Service' | 'LocalBusiness',
    topic: string,
    context?: string
  ): Promise<Record<string, any>> {
    const prompt = `
${getBrandContextString('insurance')}

TASK: Generate structured schema markup content for ${schemaType}.

SCHEMA TYPE: ${schemaType}
TOPIC: ${topic}
CONTEXT: ${context || 'NRPG service'}

REQUIREMENTS:
1. Generate realistic, high-quality schema data
2. Include 5-10 FAQ items (if FAQ)
3. Include 5-8 steps (if HowTo)
4. Make content SEO-optimized
5. Use brand keywords naturally
6. Ensure accuracy (no false claims)

OUTPUT FORMAT (JSON):
For FAQ: { "questions": [{ "question": "...", "answer": "..." }] }
For HowTo: { "steps": [{ "name": "...", "description": "..." }] }
For Service: { "serviceType": "...", "description": "...", "areaServed": ["state", ...] }
For LocalBusiness: { "name": "NRPG", "description": "...", "address": "Australia-wide", ... }

Return ONLY the JSON object, no markdown or explanation.
`;

    try {
      const response = await this.model.generateContent(prompt);
      let jsonText = response.response.text().trim();

      // Clean up markdown code blocks if present
      if (jsonText.includes('```')) {
        jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      }

      const schema = JSON.parse(jsonText);
      return schema;
    } catch (error) {
      throw new Error(
        `Failed to generate schema content: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Generate responsive design copy for different breakpoints
   */
  async generateResponsiveCopy(
    originalHeadline: string,
    maxLengthMobile: number = 40,
    maxLengthTablet: number = 60,
    maxLengthDesktop: number = 100
  ): Promise<{ mobile: string; tablet: string; desktop: string }> {
    const prompt = `
TASK: Generate responsive headline variants that work across devices.

ORIGINAL HEADLINE: "${originalHeadline}"

REQUIREMENTS:
1. Mobile (${maxLengthMobile} chars): Extra short, punchiest version
2. Tablet (${maxLengthTablet} chars): Medium version, more detail
3. Desktop (${maxLengthDesktop} chars): Full version with all benefits

All three must:
- Communicate same core message
- Be grammatically correct
- Sound natural for their context
- Maintain brand voice

OUTPUT FORMAT (JSON):
{
  "mobile": "...",
  "tablet": "...",
  "desktop": "..."
}

Return ONLY the JSON object, no markdown or explanation.
`;

    try {
      const response = await this.model.generateContent(prompt);
      let jsonText = response.response.text().trim();

      if (jsonText.includes('```')) {
        jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      }

      const variants = JSON.parse(jsonText);
      return variants;
    } catch (error) {
      throw new Error(
        `Failed to generate responsive copy: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
}

// Singleton instance
let instance: GeminiContentGenerator | null = null;

/**
 * Get or create the generator instance
 */
export function getContentGenerator(apiKey?: string): GeminiContentGenerator {
  if (!instance) {
    instance = new GeminiContentGenerator(apiKey);
  }
  return instance;
}

export default GeminiContentGenerator;
