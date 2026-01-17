/**
 * T5Gemma Service - Local Transformer Model Integration
 *
 * Provides local AI inference using Hugging Face transformers.js
 * Falls back gracefully if transformers package is not available
 */

import * as NodeCacheModule from 'node-cache';

// Handle both ESM and CJS imports
const NodeCache =
  (NodeCacheModule as unknown as { default: typeof NodeCacheModule }).default ||
  NodeCacheModule;

// Conditionally import transformers - may not be installed
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let pipelineFn: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let transformersEnv: any = null;

async function loadTransformers(): Promise<boolean> {
  if (pipelineFn) return true;

  // Use variable to prevent webpack from statically analyzing the import
  const hfPackage = '@huggingface/transformers';
  const xenovaPackage = '@xenova/transformers';

  try {
    // Dynamic import to avoid build errors if not installed
    // Using eval to prevent webpack from bundling the optional dependency
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-eval
    const transformers = await eval(`import('${hfPackage}')`);
    pipelineFn = transformers.pipeline;
    transformersEnv = transformers.env;
    return true;
  } catch {
    // Try alternative package name
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-eval
      const transformers = await eval(`import('${xenovaPackage}')`);
      pipelineFn = transformers.pipeline;
      transformersEnv = transformers.env;
      return true;
    } catch {
      console.warn(
        'T5Gemma: transformers package not available. Install @huggingface/transformers for local model support.'
      );
      return false;
    }
  }
}

export interface T5GemmaConfig {
  modelSize: string;
  device: string;
  maxLength: number;
  batchSize: number;
  cacheTTL: number;
}

export interface T5GemmaTask {
  type: 'summarization' | 'qa' | 'generation' | 'extraction';
  input: string;
  context?: string;
  parameters?: Record<string, unknown>;
}

export interface T5GemmaResponse {
  success: boolean;
  result?: string;
  error?: string;
  processingTime: number;
  cached: boolean;
}

class T5GemmaService {
  private pipelineInstance: any = null;
  private cache: NodeCache;
  private config: T5GemmaConfig;
  private isInitialized: boolean = false;
  private initPromise: Promise<void> | null = null;
  private transformersAvailable: boolean | null = null;

  constructor(config: Partial<T5GemmaConfig> = {}) {
    this.config = {
      modelSize: process.env.T5GEMMA_MODEL_SIZE || '2b',
      device: process.env.T5GEMMA_DEVICE || 'cpu',
      maxLength: parseInt(process.env.T5GEMMA_MAX_LENGTH || '512', 10),
      batchSize: parseInt(process.env.T5GEMMA_BATCH_SIZE || '8', 10),
      cacheTTL: 3600,
      ...config,
    };

    this.cache = new NodeCache({ stdTTL: this.config.cacheTTL });
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    if (this.initPromise) return this.initPromise;

    this.initPromise = this._initializeModel();
    await this.initPromise;
  }

  private async _initializeModel(): Promise<void> {
    try {
      // Check if transformers is available
      this.transformersAvailable = await loadTransformers();

      if (!this.transformersAvailable) {
        console.warn('T5Gemma: Running in stub mode - transformers not available');
        this.isInitialized = true;
        return;
      }

      // Configure transformers environment
      if (transformersEnv) {
        transformersEnv.allowLocalModels = true;
        transformersEnv.cacheDir = process.env.T5GEMMA_CACHE_DIR || './models';
      }

      console.log(
        `[T5Gemma] Initializing T5Gemma ${this.config.modelSize} on ${this.config.device}`
      );

      const modelId = this.getModelId();

      this.pipelineInstance = await pipelineFn('text2text-generation', modelId, {
        device: this.config.device === 'cuda' ? 'cuda' : 'cpu',
        dtype: 'fp32', // Use fp32 for CPU compatibility
      });

      this.isInitialized = true;
      console.log('[T5Gemma] Initialized successfully');
    } catch (error) {
      console.error('[T5Gemma] Failed to initialize:', error);
      // Don't throw - allow service to function in degraded mode
      this.transformersAvailable = false;
      this.isInitialized = true;
    }
  }

  private getModelId(): string {
    // Map size to actual model ID
    const modelMap: Record<string, string> = {
      '2b': 'google/flan-t5-small', // Smaller model for testing
      '7b': 'google/flan-t5-base',
      '13b': 'google/flan-t5-large',
    };
    return modelMap[this.config.modelSize] || 'google/flan-t5-small';
  }

  async process(task: T5GemmaTask): Promise<T5GemmaResponse> {
    const startTime = Date.now();

    try {
      await this.initialize();

      // Check cache first
      const cacheKey = this.generateCacheKey(task);
      const cachedResult = this.cache.get<string>(cacheKey);

      if (cachedResult) {
        console.log(`[T5Gemma] Cache hit for task: ${task.type}`);
        return {
          success: true,
          result: cachedResult,
          processingTime: Date.now() - startTime,
          cached: true,
        };
      }

      // If transformers not available, return error
      if (!this.transformersAvailable || !this.pipelineInstance) {
        return {
          success: false,
          error:
            'T5Gemma not available. Install @huggingface/transformers package.',
          processingTime: Date.now() - startTime,
          cached: false,
        };
      }

      let result: string;

      switch (task.type) {
        case 'summarization':
          result = await this.summarize(task.input);
          break;
        case 'qa':
          result = await this.answerQuestion(task.input, task.context || '');
          break;
        case 'generation':
          result = await this.generate(task.input);
          break;
        case 'extraction':
          result = await this.extract(task.input);
          break;
        default:
          throw new Error(`Unknown task type: ${task.type}`);
      }

      this.cache.set(cacheKey, result);

      return {
        success: true,
        result,
        processingTime: Date.now() - startTime,
        cached: false,
      };
    } catch (error) {
      console.error(`[T5Gemma] Processing error (${task.type}):`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        processingTime: Date.now() - startTime,
        cached: false,
      };
    }
  }

  private async summarize(text: string): Promise<string> {
    const output = await this.pipelineInstance(`summarize: ${text}`, {
      max_length: this.config.maxLength,
      min_length: 50,
    });
    return output[0]?.generated_text || output[0]?.summary_text || '';
  }

  private async answerQuestion(
    question: string,
    context: string
  ): Promise<string> {
    const output = await this.pipelineInstance(
      `question: ${question} context: ${context}`,
      {
        max_length: this.config.maxLength,
      }
    );
    return output[0]?.generated_text || '';
  }

  private async generate(prompt: string): Promise<string> {
    const output = await this.pipelineInstance(prompt, {
      max_length: this.config.maxLength,
      min_length: 50,
    });
    return output[0]?.generated_text || '';
  }

  private async extract(text: string): Promise<string> {
    const output = await this.pipelineInstance(
      `extract key information: ${text}`,
      {
        max_length: this.config.maxLength,
      }
    );
    return output[0]?.generated_text || '';
  }

  private generateCacheKey(task: T5GemmaTask): string {
    const inputHash = task.input.substring(0, 50).replace(/\s+/g, '_');
    return `t5_${task.type}_${inputHash}`;
  }

  async healthCheck(): Promise<{
    available: boolean;
    transformersInstalled: boolean;
    modelLoaded: boolean;
    config: T5GemmaConfig;
  }> {
    try {
      await this.initialize();
      return {
        available: this.transformersAvailable === true && !!this.pipelineInstance,
        transformersInstalled: this.transformersAvailable === true,
        modelLoaded: !!this.pipelineInstance,
        config: this.config,
      };
    } catch {
      return {
        available: false,
        transformersInstalled: false,
        modelLoaded: false,
        config: this.config,
      };
    }
  }

  /**
   * Get configuration
   */
  getConfig(): T5GemmaConfig {
    return { ...this.config };
  }

  /**
   * Check if service is ready
   */
  isReady(): boolean {
    return this.isInitialized && this.transformersAvailable === true;
  }

  /**
   * Clear the cache
   */
  clearCache(): void {
    this.cache.flushAll();
  }
}

// Singleton instance
let instance: T5GemmaService | null = null;

export function getT5GemmaService(
  config?: Partial<T5GemmaConfig>
): T5GemmaService {
  if (!instance) {
    instance = new T5GemmaService(config);
  }
  return instance;
}

export default T5GemmaService;
