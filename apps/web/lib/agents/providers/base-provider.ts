/**
 * Base AI Provider - Abstract interface for AI model providers
 */

import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { AIProviderConfig, AIProviderType, ProviderHealth } from '../types';

export abstract class BaseAIProvider {
  protected config: AIProviderConfig;
  protected _model: BaseChatModel | null = null;
  protected lastHealthCheck: ProviderHealth | null = null;

  constructor(config: AIProviderConfig) {
    this.config = config;
  }

  /**
   * Get the provider type identifier
   */
  abstract getType(): AIProviderType;

  /**
   * Get a human-readable provider name
   */
  abstract getName(): string;

  /**
   * Create and return the LangChain chat model instance
   */
  abstract createModel(): BaseChatModel;

  /**
   * Check if the provider is available and responding
   */
  abstract checkHealth(): Promise<ProviderHealth>;

  /**
   * Get the model instance, creating it if necessary
   */
  getModel(): BaseChatModel {
    if (!this._model) {
      this._model = this.createModel();
    }
    return this._model;
  }

  /**
   * Get the current configuration
   */
  getConfig(): AIProviderConfig {
    return { ...this.config };
  }

  /**
   * Update configuration and recreate model
   */
  updateConfig(newConfig: Partial<AIProviderConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this._model = null; // Force model recreation on next getModel() call
  }

  /**
   * Check if the provider is available based on last health check
   */
  async isAvailable(): Promise<boolean> {
    // If we have a recent health check (within 5 minutes), use it
    if (
      this.lastHealthCheck &&
      Date.now() - this.lastHealthCheck.lastChecked.getTime() < 5 * 60 * 1000
    ) {
      return this.lastHealthCheck.available;
    }

    // Otherwise, perform a new health check
    const health = await this.checkHealth();
    this.lastHealthCheck = health;
    return health.available;
  }

  /**
   * Get the last health check result
   */
  getLastHealthCheck(): ProviderHealth | null {
    return this.lastHealthCheck;
  }

  /**
   * Estimate token count for a string (rough approximation)
   */
  estimateTokens(text: string): number {
    // Rough approximation: ~4 characters per token for English
    return Math.ceil(text.length / 4);
  }

  /**
   * Calculate cost estimate for tokens (provider-specific override recommended)
   */
  estimateCost(promptTokens: number, completionTokens: number): number {
    // Default implementation returns 0, providers should override with actual pricing
    return 0;
  }
}
