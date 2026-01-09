/**
 * Ollama Provider - Local AI model implementation
 * For development and testing without API costs
 */

import { ChatOllama } from '@langchain/ollama';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { HumanMessage } from '@langchain/core/messages';
import { BaseAIProvider } from './base-provider';
import { AIProviderConfig, AIProviderType, ProviderHealth } from '../types';

export class OllamaProvider extends BaseAIProvider {
  constructor(config?: Partial<AIProviderConfig>) {
    const defaultConfig: AIProviderConfig = {
      type: 'ollama',
      baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
      model: process.env.OLLAMA_MODEL || 'llama3.1:8b',
      temperature: 0.1,
      maxTokens: 4096,
      timeout: 120000, // Ollama can be slower, allow 2 minutes
    };

    super({ ...defaultConfig, ...config });
  }

  getType(): AIProviderType {
    return 'ollama';
  }

  getName(): string {
    return 'Ollama (Local)';
  }

  createModel(): BaseChatModel {
    return new ChatOllama({
      baseUrl: this.config.baseUrl,
      model: this.config.model,
      temperature: this.config.temperature ?? 0.1,
    });
  }

  async checkHealth(): Promise<ProviderHealth> {
    const startTime = Date.now();

    try {
      // First check if Ollama server is running
      const baseUrl = this.config.baseUrl || 'http://localhost:11434';
      const response = await fetch(`${baseUrl}/api/tags`, {
        method: 'GET',
        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) {
        return {
          available: false,
          latencyMs: Date.now() - startTime,
          lastChecked: new Date(),
          error: `Ollama server returned ${response.status}`,
        };
      }

      // Check if the required model is available
      const data = await response.json();
      const models = data.models || [];
      const modelName = this.config.model.split(':')[0]; // Handle tags like 'llama3.1:8b'
      const hasModel = models.some(
        (m: { name: string }) =>
          m.name.startsWith(modelName) || m.name === this.config.model
      );

      if (!hasModel) {
        return {
          available: false,
          latencyMs: Date.now() - startTime,
          lastChecked: new Date(),
          error: `Model ${this.config.model} not found. Available: ${models.map((m: { name: string }) => m.name).join(', ')}`,
        };
      }

      // Do a quick inference test
      const model = this.createModel();
      await model.invoke([new HumanMessage('Hi')]);

      return {
        available: true,
        latencyMs: Date.now() - startTime,
        lastChecked: new Date(),
      };
    } catch (error) {
      return {
        available: false,
        latencyMs: Date.now() - startTime,
        lastChecked: new Date(),
        error: error instanceof Error ? error.message : 'Failed to connect to Ollama',
      };
    }
  }

  /**
   * Ollama is free to run locally
   */
  estimateCost(_promptTokens: number, _completionTokens: number): number {
    return 0;
  }

  /**
   * List available models from Ollama server
   */
  async listAvailableModels(): Promise<string[]> {
    try {
      const baseUrl = this.config.baseUrl || 'http://localhost:11434';
      const response = await fetch(`${baseUrl}/api/tags`);
      const data = await response.json();
      return (data.models || []).map((m: { name: string }) => m.name);
    } catch {
      return [];
    }
  }

  /**
   * Pull a model from Ollama registry
   */
  async pullModel(modelName: string): Promise<boolean> {
    try {
      const baseUrl = this.config.baseUrl || 'http://localhost:11434';
      const response = await fetch(`${baseUrl}/api/pull`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: modelName }),
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}
