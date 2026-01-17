/**
 * OpenAI Provider - GPT API implementation
 */

import { ChatOpenAI } from '@langchain/openai';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { HumanMessage } from '@langchain/core/messages';
import { BaseAIProvider } from './base-provider';
import { AIProviderConfig, AIProviderType, ProviderHealth } from '../types';

// OpenAI model pricing (per 1M tokens) - as of January 2025
const OPENAI_PRICING = {
  'gpt-4o': { input: 2.5, output: 10.0 },
  'gpt-4o-mini': { input: 0.15, output: 0.6 },
  'gpt-4-turbo': { input: 10.0, output: 30.0 },
  'gpt-4-turbo-preview': { input: 10.0, output: 30.0 },
  'gpt-4': { input: 30.0, output: 60.0 },
  'gpt-3.5-turbo': { input: 0.5, output: 1.5 },
  'o1': { input: 15.0, output: 60.0 },
  'o1-mini': { input: 3.0, output: 12.0 },
} as const;

type OpenAIModel = keyof typeof OPENAI_PRICING;

export class OpenAIProvider extends BaseAIProvider {
  constructor(config?: Partial<AIProviderConfig>) {
    const defaultConfig: AIProviderConfig = {
      type: 'openai',
      apiKey: process.env.OPENAI_API_KEY,
      model: process.env.OPENAI_DEFAULT_MODEL || 'gpt-4o',
      temperature: 0.1,
      maxTokens: 4096,
      timeout: parseInt(process.env.AGENT_TIMEOUT_MS || '55000', 10),
    };

    super({ ...defaultConfig, ...config });
  }

  getType(): AIProviderType {
    return 'openai';
  }

  getName(): string {
    return 'OpenAI GPT';
  }

  createModel(): BaseChatModel {
    if (!this.config.apiKey) {
      throw new Error('OPENAI_API_KEY is required for OpenAI provider');
    }

    return new ChatOpenAI({
      modelName: this.config.model,
      openAIApiKey: this.config.apiKey,
      temperature: this.config.temperature ?? 0.1,
      maxTokens: this.config.maxTokens ?? 4096,
      timeout: this.config.timeout,
      // Enable streaming for better UX
      streaming: true,
    });
  }

  async checkHealth(): Promise<ProviderHealth> {
    const startTime = Date.now();

    try {
      if (!this.config.apiKey) {
        return {
          available: false,
          lastChecked: new Date(),
          error: 'API key not configured',
        };
      }

      // Create a test model and send a minimal request
      const model = this.createModel();
      await model.invoke([new HumanMessage('Hi')]);

      const latencyMs = Date.now() - startTime;

      return {
        available: true,
        latencyMs,
        lastChecked: new Date(),
      };
    } catch (error) {
      return {
        available: false,
        latencyMs: Date.now() - startTime,
        lastChecked: new Date(),
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Calculate cost estimate based on OpenAI pricing
   */
  estimateCost(promptTokens: number, completionTokens: number): number {
    const modelPricing = OPENAI_PRICING[this.config.model as OpenAIModel];

    if (!modelPricing) {
      // Fallback to GPT-4o pricing for unknown models
      const fallback = OPENAI_PRICING['gpt-4o'];
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
   * Get available OpenAI models
   */
  static getAvailableModels(): string[] {
    return Object.keys(OPENAI_PRICING);
  }

  /**
   * Check if model supports vision (image input)
   */
  supportsVision(): boolean {
    const visionModels = ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-4-turbo-preview'];
    return visionModels.includes(this.config.model);
  }

  /**
   * Check if model supports function calling
   */
  supportsFunctionCalling(): boolean {
    // All modern GPT models support function calling
    const nonFunctionModels = ['o1', 'o1-mini']; // o1 models don't support tools yet
    return !nonFunctionModels.includes(this.config.model);
  }
}
