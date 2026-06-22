
/**
 * Provider Factory - Creates and manages AI providers
 */

import { BaseAIProvider } from './base-provider';
import { AnthropicProvider } from './anthropic-provider';
import { OpenAIProvider } from './openai-provider';
import { OllamaProvider } from './ollama-provider';
import {
  AIProviderConfig,
  AIProviderType,
  ProviderError,
  ProviderHealth,
} from '../types';

// Provider registry
const providers: Map<AIProviderType, BaseAIProvider> = new Map();

// Provider constructors
const providerConstructors: Record<
  AIProviderType,
  new (config?: Partial<AIProviderConfig>) => BaseAIProvider
> = {
  anthropic: AnthropicProvider,
  openai: OpenAIProvider,
  ollama: OllamaProvider,
};

/**
 * Get or create a provider instance
 */
export function getProvider(
  type: AIProviderType,
  config?: Partial<AIProviderConfig>
): BaseAIProvider {
  // Check if we already have this provider
  const existing = providers.get(type);
  if (existing && !config) {
    return existing;
  }

  // Create new provider
  const Constructor = providerConstructors[type];
  if (!Constructor) {
    throw new ProviderError(`Unknown provider type: ${type}`, type, false);
  }

  const provider = new Constructor(config);
  providers.set(type, provider);
  return provider;
}

/**
 * Get the default provider based on environment configuration
 */
export function getDefaultProvider(): BaseAIProvider {
  const defaultType =
    (process.env.AI_PROVIDER as AIProviderType) || 'anthropic';
  return getProvider(defaultType);
}

/**
 * Get the first available provider from a priority list
 */
export async function getFirstAvailableProvider(
  priority: AIProviderType[] = ['anthropic', 'openai', 'ollama']
): Promise<BaseAIProvider> {
  for (const type of priority) {
    try {
      const provider = getProvider(type);
      const available = await provider.isAvailable();
      if (available) {
        return provider;
      }
    } catch {
      // Continue to next provider
    }
  }

  throw new ProviderError(
    'No available AI providers found',
    priority[0] || 'anthropic',
    false
  );
}

/**
 * Check health of all configured providers
 */
export async function checkAllProvidersHealth(): Promise<
  Record<AIProviderType, ProviderHealth>
> {
  const results: Partial<Record<AIProviderType, ProviderHealth>> = {};
  const typesToCheck: AIProviderType[] = ['anthropic', 'openai', 'ollama'];

  await Promise.all(
    typesToCheck.map(async (type) => {
      try {
        const provider = getProvider(type);
        results[type] = await provider.checkHealth();
      } catch (error) {
        results[type] = {
          available: false,
          lastChecked: new Date(),
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    })
  );

  return results as Record<AIProviderType, ProviderHealth>;
}

/**
 * Clear provider cache (useful for testing)
 */
export function clearProviders(): void {
  providers.clear();
}

// Export provider classes for direct use if needed
export { BaseAIProvider } from './base-provider';
export { AnthropicProvider } from './anthropic-provider';
export { OpenAIProvider } from './openai-provider';
export { OllamaProvider } from './ollama-provider';
