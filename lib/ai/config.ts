/**
 * AI Configuration and Provider Management
 * Centralized configuration for AI services with fallback support
 */

export type AIProvider = 'openai' | 'anthropic' | 'fallback';

export interface AIConfig {
  provider: AIProvider;
  apiKey: string;
  model: string;
  maxTokens: number;
  temperature: number;
  timeout: number;
  rateLimit: {
    requestsPerMinute: number;
    requestsPerHour: number;
  };
}

export interface AIProviderConfig {
  openai: {
    apiKey: string;
    models: {
      chat: string;
      embedding: string;
      moderation: string;
    };
  };
  anthropic: {
    apiKey: string;
    models: {
      chat: string;
    };
  };
}

/**
 * Get AI provider configuration from environment
 */
export function getAIProviderConfig(): AIProviderConfig {
  return {
    openai: {
      apiKey: process.env.OPENAI_API_KEY || '',
      models: {
        chat: process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini',
        embedding: process.env.OPENAI_EMBEDDING_MODEL || 'text-embedding-3-small',
        moderation: 'text-moderation-latest',
      },
    },
    anthropic: {
      apiKey: process.env.ANTHROPIC_API_KEY || '',
      models: {
        chat: process.env.ANTHROPIC_CHAT_MODEL || 'claude-3-5-sonnet-20250929',
      },
    },
  };
}

/**
 * Get active AI provider based on available API keys
 */
export function getActiveProvider(): AIProvider {
  const config = getAIProviderConfig();

  if (config.openai.apiKey) {return 'openai';}
  if (config.anthropic.apiKey) {return 'anthropic';}

  return 'fallback';
}

/**
 * Default AI configuration
 */
export const DEFAULT_AI_CONFIG: AIConfig = {
  provider: getActiveProvider(),
  apiKey: '',
  model: 'gpt-4o-mini',
  maxTokens: 1000,
  temperature: 0.7,
  timeout: 30000, // 30 seconds
  rateLimit: {
    requestsPerMinute: 20,
    requestsPerHour: 500,
  },
};

/**
 * Emergency chatbot specific configuration
 */
export const EMERGENCY_CHATBOT_CONFIG: Partial<AIConfig> = {
  temperature: 0.3, // Lower temperature for more consistent responses
  maxTokens: 500,
  timeout: 15000, // Faster timeout for emergency responses
};

/**
 * Content generation configuration
 */
export const CONTENT_GENERATION_CONFIG: Partial<AIConfig> = {
  temperature: 0.7,
  maxTokens: 2000,
  timeout: 45000,
};

/**
 * Analytics and prediction configuration
 */
export const ANALYTICS_CONFIG: Partial<AIConfig> = {
  temperature: 0.1, // Very low for consistent predictions
  maxTokens: 1000,
  timeout: 30000,
};

/**
 * Check if AI features are enabled
 */
export function isAIEnabled(): boolean {
  const provider = getActiveProvider();
  return provider !== 'fallback';
}

/**
 * Get AI feature flags from environment
 */
export function getAIFeatureFlags() {
  return {
    chatbot: process.env.NEXT_PUBLIC_AI_CHATBOT_ENABLED === 'true',
    contentGeneration: process.env.AI_CONTENT_GENERATION_ENABLED === 'true',
    analytics: process.env.AI_ANALYTICS_ENABLED === 'true',
    recommendations: process.env.AI_RECOMMENDATIONS_ENABLED === 'true',
    semanticSearch: process.env.AI_SEMANTIC_SEARCH_ENABLED === 'true',
  };
}

/**
 * Privacy-compliant data sanitization
 * Removes PII before sending to AI services
 */
export function sanitizeForAI(text: string): string {
  // Remove phone numbers
  let sanitized = text.replace(/(\+?61|0)[2-478](?:[ -]?[0-9]){8}/g, '[PHONE]');

  // Remove emails
  sanitized = sanitized.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL]');

  // Remove street addresses (Australian format)
  sanitized = sanitized.replace(/\d+\s+[A-Z][a-z]+\s+(Street|St|Road|Rd|Avenue|Ave|Drive|Dr|Court|Ct|Lane|Ln)/gi, '[ADDRESS]');

  // Remove credit card patterns
  sanitized = sanitized.replace(/\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g, '[CARD]');

  return sanitized;
}
