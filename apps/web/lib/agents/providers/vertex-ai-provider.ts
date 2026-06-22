// @ts-nocheck

/**
 * Google Vertex AI Provider - Gemini implementation for Australian disaster recovery
 *
 * Uses Google's Vertex AI platform with Gemini models optimized for Australian context.
 * Recommended deployment region: australia-southeast1 (Sydney)
 */

import { ChatVertexAI } from '@langchain/google-vertexai';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { HumanMessage } from '@langchain/core/messages';
import { BaseAIProvider } from './base-provider';
import { AIProviderConfig, AIProviderType, ProviderHealth } from '../types';

// Gemini model pricing (per 1M tokens) - as of February 2026
// Source: https://cloud.google.com/vertex-ai/generative-ai/pricing
const GEMINI_PRICING = {
  'gemini-2.0-flash-exp': { input: 0.0, output: 0.0 }, // Free tier (experimental)
  'gemini-1.5-pro': { input: 1.25, output: 5.0 }, // Context: 2M tokens
  'gemini-1.5-flash': { input: 0.075, output: 0.30 }, // Context: 1M tokens
  'gemini-1.0-pro': { input: 0.50, output: 1.50 }, // Legacy model
} as const;

type GeminiModel = keyof typeof GEMINI_PRICING;

export class VertexAIProvider extends BaseAIProvider {
  constructor(config?: Partial<AIProviderConfig>) {
    const defaultConfig: AIProviderConfig = {
      type: 'vertexai',
      apiKey: process.env.GOOGLE_VERTEX_AI_API_KEY, // Optional: can use Application Default Credentials
      model: process.env.GEMINI_MODEL || 'gemini-1.5-flash', // Fast and cost-effective
      temperature: 0.7, // Slightly higher for natural language generation
      maxTokens: 8192,
      timeout: parseInt(process.env.AGENT_TIMEOUT_MS || '60000', 10),
    };

    super({ ...defaultConfig, ...config });
  }

  getType(): AIProviderType {
    return 'vertexai';
  }

  getName(): string {
    return 'Google Vertex AI (Gemini)';
  }

  createModel(): BaseChatModel {
    // Get Google Cloud configuration from environment
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
    const location = process.env.GOOGLE_CLOUD_LOCATION || 'australia-southeast1'; // Sydney region

    if (!projectId) {
      throw new Error(
        'GOOGLE_CLOUD_PROJECT_ID is required for Vertex AI provider. ' +
        'Set this in your .env file or use Application Default Credentials.'
      );
    }

    return new ChatVertexAI({
      model: this.config.model,
      temperature: this.config.temperature ?? 0.7,
      maxOutputTokens: this.config.maxTokens ?? 8192,

      // Google Cloud configuration
      authOptions: {
        projectId,
        location,
        // If GOOGLE_APPLICATION_CREDENTIALS is set, it will be used automatically
        // Otherwise, falls back to API key or Application Default Credentials
        ...(this.config.apiKey && { apiKey: this.config.apiKey }),
      },

      // Safety settings for disaster recovery content (allow medical/injury discussion)
      safetySettings: [
        {
          category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
          threshold: 'BLOCK_ONLY_HIGH',
        },
        {
          category: 'HARM_CATEGORY_HATE_SPEECH',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_HARASSMENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
      ],

      // Enable streaming for better UX
      streaming: true,
    });
  }

  async checkHealth(): Promise<ProviderHealth> {
    const startTime = Date.now();

    try {
      const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;

      if (!projectId) {
        return {
          available: false,
          lastChecked: new Date(),
          error: 'GOOGLE_CLOUD_PROJECT_ID not configured',
        };
      }

      // Create a test model and send a minimal request
      const model = this.createModel();
      await model.invoke([new HumanMessage('Test')]);

      const latencyMs = Date.now() - startTime;

      return {
        available: true,
        latencyMs,
        lastChecked: new Date(),
      };
    } catch (error) {
      const latencyMs = Date.now() - startTime;

      // Check for specific error types
      let errorMessage = error instanceof Error ? error.message : 'Unknown error';

      if (errorMessage.includes('PERMISSION_DENIED')) {
        errorMessage = 'Vertex AI API not enabled or insufficient permissions';
      } else if (errorMessage.includes('UNAUTHENTICATED')) {
        errorMessage = 'Authentication failed - check GOOGLE_APPLICATION_CREDENTIALS';
      } else if (errorMessage.includes('RESOURCE_EXHAUSTED')) {
        errorMessage = 'Quota exceeded - check Vertex AI quota in Google Cloud Console';
      }

      return {
        available: false,
        latencyMs,
        lastChecked: new Date(),
        error: errorMessage,
      };
    }
  }

  /**
   * Calculate cost estimate based on Gemini pricing
   */
  estimateCost(promptTokens: number, completionTokens: number): number {
    const modelPricing = GEMINI_PRICING[this.config.model as GeminiModel];

    if (!modelPricing) {
      // Fallback to Gemini 1.5 Flash pricing for unknown models
      const fallback = GEMINI_PRICING['gemini-1.5-flash'];
      return (
        (promptTokens * fallback.input) / 1_000_000 +
        (completionTokens * fallback.output) / 1_000_000
      );
    }

    return (
      (promptTokens * modelPricing.input) / 1_000_000 +
      (completionTokens * modelPricing.output) / 1_000_000
    );
  }

  /**
   * Get available Gemini models
   */
  static getAvailableModels(): string[] {
    return Object.keys(GEMINI_PRICING);
  }

  /**
   * Get recommended model for Australian disaster recovery
   *
   * For Australian disaster recovery, we recommend:
   * - gemini-1.5-flash: Best balance of cost, speed, and accuracy (DEFAULT)
   * - gemini-1.5-pro: Higher accuracy for complex damage assessment (costly)
   * - gemini-2.0-flash-exp: Experimental but free (may be unstable)
   */
  static getRecommendedModel(): string {
    return 'gemini-1.5-flash';
  }

  /**
   * Check if Vertex AI credentials are configured
   */
  static isConfigured(): boolean {
    return !!(
      process.env.GOOGLE_CLOUD_PROJECT_ID &&
      (process.env.GOOGLE_APPLICATION_CREDENTIALS || process.env.GOOGLE_VERTEX_AI_API_KEY)
    );
  }

  /**
   * Get configuration instructions for Vertex AI
   */
  static getSetupInstructions(): string {
    return `
To use Vertex AI with Gemini models, you need:

1. **Google Cloud Project:**
   - Create a project in Google Cloud Console
   - Enable Vertex AI API
   - Set GOOGLE_CLOUD_PROJECT_ID in your .env file

2. **Authentication (choose one):**

   Option A: Service Account (Recommended for production)
   - Create a service account with "Vertex AI User" role
   - Download JSON key file
   - Set GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json

   Option B: API Key (Simpler for development)
   - Generate API key in Google Cloud Console
   - Set GOOGLE_VERTEX_AI_API_KEY in your .env file

3. **Region (Optional):**
   - Set GOOGLE_CLOUD_LOCATION=australia-southeast1 (Sydney)
   - Default: us-central1

4. **Model Selection (Optional):**
   - Set GEMINI_MODEL=gemini-1.5-flash (default)
   - Options: gemini-2.0-flash-exp, gemini-1.5-pro, gemini-1.5-flash

Example .env configuration:
\`\`\`env
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_CLOUD_LOCATION=australia-southeast1
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json
GEMINI_MODEL=gemini-1.5-flash
\`\`\`

Cost estimates (per 1M tokens):
- gemini-1.5-flash: $0.075 input, $0.30 output (RECOMMENDED)
- gemini-1.5-pro: $1.25 input, $5.00 output
- gemini-2.0-flash-exp: FREE (experimental)
`;
  }
}
