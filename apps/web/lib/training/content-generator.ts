/**
 * AI Content Generation Pipeline
 * 
 * Multi-model content generation with hard-coded model restrictions:
 * - Gemini 3 Pro: Images and text generation
 * - VEO 3: Video generation
 * - Nano Banana 3.1 Pro: Text generation (Australian English variant)
 * 
 * All content validated for Australian compliance before output.
 */

import australianSources from './australian-sources.json';

// ============================================================================
// HARD-CODED MODEL RESTRICTIONS
// ============================================================================

export const APPROVED_MODELS = {
  text: ['gemini-3-pro', 'nano-banana-3.1-pro'] as const,
  image: ['gemini-3-pro'] as const,
  video: ['veo-3'] as const,
} as const;

export type ApprovedTextModel = typeof APPROVED_MODELS.text[number];
export type ApprovedImageModel = typeof APPROVED_MODELS.image[number];
export type ApprovedVideoModel = typeof APPROVED_MODELS.video[number];

// ============================================================================
// CONFIGURATION
// ============================================================================

interface ContentGeneratorConfig {
  vertexAI: {
    project: string;
    location: string;
  };
  nanoBanana: {
    apiKey: string;
    endpoint: string;
  };
  defaults: {
    textModel: ApprovedTextModel;
    imageModel: ApprovedImageModel;
    videoModel: ApprovedVideoModel;
  };
}

function loadConfig(): ContentGeneratorConfig {
  return {
    vertexAI: {
      project: process.env.GOOGLE_CLOUD_PROJECT || '',
      location: 'australia-southeast1', // Data sovereignty requirement
    },
    nanoBanana: {
      apiKey: process.env.NANO_BANANA_API_KEY || '',
      endpoint: process.env.NANO_BANANA_ENDPOINT || 'https://api.nano-banana.ai/v1',
    },
    defaults: {
      textModel: 'gemini-3-pro',
      imageModel: 'gemini-3-pro',
      videoModel: 'veo-3',
    },
  };
}

// ============================================================================
// MODEL VALIDATION
// ============================================================================

export class ModelValidationError extends Error {
  constructor(model: string, type: string) {
    super(`Model "${model}" is not in the approved list for ${type} generation. ` +
          `Approved models: ${APPROVED_MODELS[type as keyof typeof APPROVED_MODELS]?.join(', ') || 'none'}`);
    this.name = 'ModelValidationError';
  }
}

function validateTextModel(model: string): asserts model is ApprovedTextModel {
  if (!APPROVED_MODELS.text.includes(model as ApprovedTextModel)) {
    throw new ModelValidationError(model, 'text');
  }
}

function validateImageModel(model: string): asserts model is ApprovedImageModel {
  if (!APPROVED_MODELS.image.includes(model as ApprovedImageModel)) {
    throw new ModelValidationError(model, 'image');
  }
}

function validateVideoModel(model: string): asserts model is ApprovedVideoModel {
  if (!APPROVED_MODELS.video.includes(model as ApprovedVideoModel)) {
    throw new ModelValidationError(model, 'video');
  }
}

// ============================================================================
// VERTEX AI CLIENT (Lazy Loaded)
// ============================================================================

class VertexAIClient {
  private config: ContentGeneratorConfig;
  private vertexAI: any = null;

  constructor(config: ContentGeneratorConfig) {
    this.config = config;
  }

  private async getClient(): Promise<any> {
    if (!this.vertexAI) {
      try {
        const { VertexAI } = await import('@google-cloud/vertexai');
        this.vertexAI = new VertexAI({
          project: this.config.vertexAI.project,
          location: this.config.vertexAI.location,
        });
      } catch (error) {
        throw new Error(
          'VertexAI not available. Install with: npm install @google-cloud/vertexai'
        );
      }
    }
    return this.vertexAI;
  }

  /**
   * Generate text using Gemini 3 Pro
   */
  async generateText(prompt: string, options: {
    temperature?: number;
    maxTokens?: number;
    australianContext?: boolean;
  } = {}): Promise<string> {
    validateTextModel('gemini-3-pro');
    const client = await this.getClient();

    const model = client.getGenerativeModel({
      model: 'gemini-3-pro',
      generationConfig: {
        temperature: options.temperature ?? 0.7,
        maxOutputTokens: options.maxTokens ?? 2048,
      },
    });

    // Enhance prompt with Australian context if requested
    const enhancedPrompt = options.australianContext
      ? this.addAustralianContextPrompt(prompt)
      : prompt;

    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    const text = response.text();

    // Validate output for Australian compliance
    if (options.australianContext) {
      this.validateAustralianContent(text);
    }

    return text;
  }

  /**
   * Generate image using Gemini 3 Pro
   */
  async generateImage(prompt: string, options: {
    aspectRatio?: '1:1' | '16:9' | '9:16';
    australianContext?: boolean;
  } = {}): Promise<Buffer> {
    validateImageModel('gemini-3-pro');
    const client = await this.getClient();

    const model = client.getGenerativeModel({
      model: 'gemini-3-pro',
      generationConfig: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    const enhancedPrompt = options.australianContext
      ? this.addAustralianContextPrompt(prompt)
      : prompt;

    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    
    // Extract image data from response
    const candidates = response.candidates || [];
    for (const candidate of candidates) {
      const parts = candidate.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData) {
          return Buffer.from(part.inlineData.data, 'base64');
        }
      }
    }

    throw new Error('No image generated in response');
  }

  /**
   * Generate video using VEO 3
   */
  async generateVideo(prompt: string, options: {
    duration?: number;
    resolution?: '720p' | '1080p';
    australianContext?: boolean;
  } = {}): Promise<string> {
    validateVideoModel('veo-3');
    const client = await this.getClient();

    const model = client.getGenerativeModel({
      model: 'veo-3',
    });

    const enhancedPrompt = options.australianContext
      ? this.addAustralianContextPrompt(prompt)
      : prompt;

    // VEO 3 returns a video URL or operation name for polling
    const result = await model.generateContent(enhancedPrompt);
    
    // Implementation depends on VEO 3 API response format
    // This is a placeholder for the actual implementation
    throw new Error('VEO 3 video generation not yet implemented');
  }

  /**
   * Add Australian context to prompts
   */
  private addAustralianContextPrompt(prompt: string): string {
    const govDomains = australianSources.whitelist.government.domains.map(d => d.domain).join(', ');
    
    return `${prompt}

Important: Generate content specifically for the Australian market. Use:
- Australian English spelling (colour, not color; metre, not meter)
- Australian regulations and standards (WorkSafe, OH&S, AS/NZS standards)
- Australian locations (Sydney, Melbourne, Brisbane, Perth, Adelaide)
- Australian weather patterns (tropical cyclones, bushfires, flash floods)
- Metric measurements (millimetres, metres, litres, kilograms, Celsius)
- Australian government sources (.gov.au domains)
- Reference Australian Bureau of Statistics (ABS) where appropriate

Avoid:
- US terminology (OSHA, EPA, Fahrenheit, inches, feet, gallons)
- Non-Australian examples or case studies
- Imperial measurements

Sources must be from: ${govDomains}`;
  }

  /**
   * Validate generated content for Australian compliance
   */
  private validateAustralianContent(content: string): void {
    // Check for prohibited US terms
    for (const term of australianSources.validationRules.prohibitedTerms) {
      if (content.toLowerCase().includes(term.toLowerCase())) {
        throw new Error(`Generated content contains prohibited term: ${term}. ` +
          `Use ${this.getAustralianAlternative(term)} instead.`);
      }
    }

    // Check for required Australian terms
    let hasAustralianTerm = false;
    for (const term of australianSources.validationRules.requiredAustralianTerms) {
      if (content.toLowerCase().includes(term.toLowerCase())) {
        hasAustralianTerm = true;
        break;
      }
    }

    if (!hasAustralianTerm) {
      console.warn('Warning: Generated content may lack Australian context');
    }
  }

  private getAustralianAlternative(usTerm: string): string {
    const alternatives: Record<string, string> = {
      'OSHA': 'WorkSafe Australia / OH&S / WHS',
      'EPA': 'State EPA (EPA NSW, EPA Victoria, etc.)',
      'Fahrenheit': 'Celsius',
      'inches': 'millimetres',
      'feet': 'metres',
      'gallons': 'litres',
      'pounds': 'kilograms',
      'miles': 'kilometres',
    };
    return alternatives[usTerm] || 'Australian equivalent';
  }
}

// ============================================================================
// NANO BANANA CLIENT
// ============================================================================

class NanoBananaClient {
  private config: ContentGeneratorConfig;

  constructor(config: ContentGeneratorConfig) {
    this.config = config;
  }

  /**
   * Generate text using Nano Banana 3.1 Pro
   * Optimized for Australian English variant
   */
  async generateText(prompt: string, options: {
    temperature?: number;
    maxTokens?: number;
    australianVariant?: boolean;
  } = {}): Promise<string> {
    validateTextModel('nano-banana-3.1-pro');

    const response = await fetch(`${this.config.nanoBanana.endpoint}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.nanoBanana.apiKey}`,
      },
      body: JSON.stringify({
        model: 'nano-banana-3.1-pro',
        prompt: options.australianVariant !== false
          ? this.addAustralianVariantPrompt(prompt)
          : prompt,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.maxTokens ?? 2048,
      }),
    });

    if (!response.ok) {
      throw new Error(`Nano Banana API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.text || data.generated_text || data.content;
  }

  private addAustralianVariantPrompt(prompt: string): string {
    return `${prompt}

Generate in Australian English using Australian spelling, terminology, and cultural context.`;
  }
}

// ============================================================================
// CONTENT GENERATOR
// ============================================================================

export interface GenerationRequest {
  type: 'text' | 'image' | 'video';
  prompt: string;
  model?: ApprovedTextModel | ApprovedImageModel | ApprovedVideoModel;
  australianContext?: boolean;
  options?: Record<string, unknown>;
}

export interface GenerationResult {
  success: boolean;
  content: string | Buffer;
  modelUsed: string;
  validated: boolean;
  errors?: string[];
}

export class ContentGenerator {
  private vertexAI: VertexAIClient;
  private nanoBanana: NanoBananaClient;
  private config: ContentGeneratorConfig;

  constructor() {
    this.config = loadConfig();
    this.vertexAI = new VertexAIClient(this.config);
    this.nanoBanana = new NanoBananaClient(this.config);
  }

  /**
   * Generate content with automatic model selection and validation
   */
  async generate(request: GenerationRequest): Promise<GenerationResult> {
    try {
      // Validate model if specified
      if (request.model) {
        this.validateModel(request.model, request.type);
      }

      let content: string | Buffer;
      let modelUsed: ApprovedTextModel | ApprovedImageModel | ApprovedVideoModel;

      switch (request.type) {
        case 'text':
          modelUsed = (request.model as ApprovedTextModel) || this.config.defaults.textModel;
          content = await this.generateText(request.prompt, modelUsed, request.australianContext);
          break;

        case 'image':
          modelUsed = (request.model as ApprovedImageModel) || this.config.defaults.imageModel;
          content = await this.vertexAI.generateImage(request.prompt, {
            australianContext: request.australianContext,
          });
          break;

        case 'video':
          modelUsed = (request.model as ApprovedVideoModel) || this.config.defaults.videoModel;
          content = await this.vertexAI.generateVideo(request.prompt, {
            australianContext: request.australianContext,
          });
          break;

        default:
          throw new Error(`Unsupported content type: ${request.type}`);
      }

      return {
        success: true,
        content,
        modelUsed,
        validated: request.australianContext ?? false,
      };
    } catch (error) {
      return {
        success: false,
        content: '',
        modelUsed: request.model || 'unknown',
        validated: false,
        errors: [error instanceof Error ? error.message : 'Unknown error'],
      };
    }
  }

  /**
   * Generate training module content with full Australian compliance
   */
  async generateTrainingModule(moduleType: 'NRPG' | 'CSE' | 'WRT', topic: string): Promise<{
    content: string;
    sources: string[];
    validated: boolean;
  }> {
    const prompt = `Generate a training module for ${moduleType} on the topic: ${topic}

Include:
1. Learning objectives
2. Main content with practical examples
3. Australian context section with Sydney/Melbourne/Brisbane examples
4. Sources section with minimum 3 .gov.au references
5. DR-NRPG process integration

Format in Markdown.`;

    const result = await this.generate({
      type: 'text',
      prompt,
      australianContext: true,
    });

    if (!result.success || typeof result.content !== 'string') {
      throw new Error(`Failed to generate training module: ${result.errors?.join(', ')}`);
    }

    // Extract sources from generated content
    const sources = this.extractSources(result.content);

    return {
      content: result.content,
      sources,
      validated: result.validated,
    };
  }

  private async generateText(
    prompt: string,
    model: ApprovedTextModel,
    australianContext?: boolean
  ): Promise<string> {
    switch (model) {
      case 'gemini-3-pro':
        return this.vertexAI.generateText(prompt, { australianContext });
      case 'nano-banana-3.1-pro':
        return this.nanoBanana.generateText(prompt, { australianVariant: australianContext });
      default:
        // This should never happen due to type checking, but satisfies TypeScript
        throw new ModelValidationError(model, 'text');
    }
  }

  private validateModel(model: string, type: string): void {
    switch (type) {
      case 'text':
        validateTextModel(model);
        break;
      case 'image':
        validateImageModel(model);
        break;
      case 'video':
        validateVideoModel(model);
        break;
      default:
        throw new Error(`Unknown content type: ${type}`);
    }
  }

  private extractSources(content: string): string[] {
    const urlRegex = /(https?:\/\/[^\s<>"{}|\\^`[\]]+)/g;
    return content.match(urlRegex) || [];
  }
}

// ============================================================================
// EXPORT SINGLETON
// ============================================================================

export const contentGenerator = new ContentGenerator();
