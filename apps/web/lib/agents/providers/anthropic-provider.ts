/**
 * Anthropic Provider - Claude API implementation
 */

import { ChatAnthropic } from '@langchain/anthropic';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { HumanMessage } from '@langchain/core/messages';
import { BaseAIProvider } from './base-provider';
import { AIProviderConfig, AIProviderType, ProviderHealth } from '../types';

// Claude model pricing (per 1M tokens) - as of January 2025
const CLAUDE_PRICING = {
  'claude-sonnet-4-20250514': { input: 3.0, output: 15.0 },
  'claude-3-5-sonnet-20241022': { input: 3.0, output: 15.0 },
  'claude-3-5-haiku-20241022': { input: 0.8, output: 4.0 },
  'claude-3-opus-20240229': { input: 15.0, output: 75.0 },
} as const;

type ClaudeModel = keyof typeof CLAUDE_PRICING;

export class AnthropicProvider extends BaseAIProvider {
  constructor(config?: Partial<AIProviderConfig>) {
    const defaultConfig: AIProviderConfig = {
      type: 'anthropic',
      apiKey: process.env.ANTHROPIC_API_KEY,
      model: process.env.AGENT_DEFAULT_MODEL || 'claude-sonnet-4-20250514',
      temperature: 0.1,
      maxTokens: 4096,
      timeout: parseInt(process.env.AGENT_TIMEOUT_MS || '55000', 10),
    };

    super({ ...defaultConfig, ...config });
  }

  getType(): AIProviderType {
    return 'anthropic';
  }

  getName(): string {
    return 'Anthropic Claude';
  }

  createModel(): BaseChatModel {
    if (!this.config.apiKey) {
      throw new Error('ANTHROPIC_API_KEY is required for Anthropic provider');
    }

    return new ChatAnthropic({
      modelName: this.config.model,
      anthropicApiKey: this.config.apiKey,
      temperature: this.config.temperature ?? 0.1,
      maxTokens: this.config.maxTokens ?? 4096,
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
   * Calculate cost estimate based on Claude pricing
   */
  estimateCost(promptTokens: number, completionTokens: number): number {
    const modelPricing = CLAUDE_PRICING[this.config.model as ClaudeModel];

    if (!modelPricing) {
      // Fallback to Sonnet pricing for unknown models
      const fallback = CLAUDE_PRICING['claude-sonnet-4-20250514'];
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
   * Get available Claude models
   */
  static getAvailableModels(): string[] {
    return Object.keys(CLAUDE_PRICING);
  }
}
