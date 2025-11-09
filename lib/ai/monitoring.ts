/**
 * AI Monitoring and Quality Tracking
 * Monitors AI response quality, latency, and errors
 */

export interface AIMetrics {
  provider: string;
  model: string;
  operation: string;
  latency: number;
  tokens?: {
    prompt: number;
    completion: number;
    total: number;
  };
  cost?: number;
  success: boolean;
  error?: string;
  timestamp: number;
}

export interface AIQualityMetrics {
  averageLatency: number;
  successRate: number;
  totalRequests: number;
  totalCost: number;
  errorsByType: Record<string, number>;
  latencyPercentiles: {
    p50: number;
    p95: number;
    p99: number;
  };
}

class AIMonitor {
  private metrics: AIMetrics[] = [];
  private maxMetricsSize = 10000;

  /**
   * Record AI operation metrics
   */
  record(metrics: Omit<AIMetrics, 'timestamp'>): void {
    this.metrics.push({
      ...metrics,
      timestamp: Date.now(),
    });

    // Keep only recent metrics to prevent memory leak
    if (this.metrics.length > this.maxMetricsSize) {
      this.metrics = this.metrics.slice(-this.maxMetricsSize);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[AI Monitor]', {
        operation: metrics.operation,
        latency: `${metrics.latency}ms`,
        success: metrics.success,
        tokens: metrics.tokens?.total,
        cost: metrics.cost ? `$${metrics.cost.toFixed(4)}` : undefined,
      });
    }
  }

  /**
   * Get quality metrics for time period
   */
  getQualityMetrics(
    timeWindowMs: number = 3600000 // Default: last hour
  ): AIQualityMetrics {
    const now = Date.now();
    const recentMetrics = this.metrics.filter(
      (m) => now - m.timestamp < timeWindowMs
    );

    if (recentMetrics.length === 0) {
      return {
        averageLatency: 0,
        successRate: 0,
        totalRequests: 0,
        totalCost: 0,
        errorsByType: {},
        latencyPercentiles: { p50: 0, p95: 0, p99: 0 },
      };
    }

    // Calculate metrics
    const successCount = recentMetrics.filter((m) => m.success).length;
    const totalLatency = recentMetrics.reduce((sum, m) => sum + m.latency, 0);
    const totalCost = recentMetrics.reduce((sum, m) => sum + (m.cost || 0), 0);

    // Error breakdown
    const errorsByType: Record<string, number> = {};
    recentMetrics.forEach((m) => {
      if (!m.success && m.error) {
        errorsByType[m.error] = (errorsByType[m.error] || 0) + 1;
      }
    });

    // Latency percentiles
    const sortedLatencies = recentMetrics
      .map((m) => m.latency)
      .sort((a, b) => a - b);

    const p50Index = Math.floor(sortedLatencies.length * 0.5);
    const p95Index = Math.floor(sortedLatencies.length * 0.95);
    const p99Index = Math.floor(sortedLatencies.length * 0.99);

    return {
      averageLatency: totalLatency / recentMetrics.length,
      successRate: successCount / recentMetrics.length,
      totalRequests: recentMetrics.length,
      totalCost,
      errorsByType,
      latencyPercentiles: {
        p50: sortedLatencies[p50Index] || 0,
        p95: sortedLatencies[p95Index] || 0,
        p99: sortedLatencies[p99Index] || 0,
      },
    };
  }

  /**
   * Get metrics by operation type
   */
  getMetricsByOperation(operation: string, timeWindowMs: number = 3600000) {
    const now = Date.now();
    const operationMetrics = this.metrics.filter(
      (m) => m.operation === operation && now - m.timestamp < timeWindowMs
    );

    return operationMetrics;
  }

  /**
   * Check if system health is good
   */
  checkHealth(): {
    healthy: boolean;
    issues: string[];
    metrics: AIQualityMetrics;
  } {
    const metrics = this.getQualityMetrics();
    const issues: string[] = [];

    // Check success rate
    if (metrics.successRate < 0.95) {
      issues.push(
        `Low success rate: ${(metrics.successRate * 100).toFixed(1)}%`
      );
    }

    // Check latency
    if (metrics.latencyPercentiles.p95 > 5000) {
      issues.push(
        `High p95 latency: ${metrics.latencyPercentiles.p95.toFixed(0)}ms`
      );
    }

    // Check cost
    if (metrics.totalCost > 100) {
      issues.push(`High hourly cost: $${metrics.totalCost.toFixed(2)}`);
    }

    return {
      healthy: issues.length === 0,
      issues,
      metrics,
    };
  }

  /**
   * Export metrics for external monitoring
   */
  exportMetrics(): AIMetrics[] {
    return [...this.metrics];
  }

  /**
   * Clear all metrics
   */
  clear(): void {
    this.metrics = [];
  }
}

// Singleton instance
export const aiMonitor = new AIMonitor();

/**
 * Monitoring decorator for AI functions
 */
export function withMonitoring<T extends (...args: any[]) => Promise<any>>(
  operation: string,
  provider: string,
  model: string
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const startTime = Date.now();
      let success = true;
      let error: string | undefined;
      let result: any;

      try {
        result = await originalMethod.apply(this, args);
        return result;
      } catch (err) {
        success = false;
        error = err instanceof Error ? err.message : 'Unknown error';
        throw err;
      } finally {
        const latency = Date.now() - startTime;

        aiMonitor.record({
          provider,
          model,
          operation,
          latency,
          success,
          error,
          tokens: result?.usage
            ? {
                prompt: result.usage.prompt_tokens,
                completion: result.usage.completion_tokens,
                total: result.usage.total_tokens,
              }
            : undefined,
          cost: result?.cost,
        });
      }
    };

    return descriptor;
  };
}

/**
 * Calculate approximate cost for OpenAI models
 */
export function calculateOpenAICost(
  model: string,
  promptTokens: number,
  completionTokens: number
): number {
  // Pricing as of 2025 (per 1M tokens)
  const pricing: Record<
    string,
    { prompt: number; completion: number }
  > = {
    'gpt-4o': { prompt: 2.5, completion: 10.0 },
    'gpt-4o-mini': { prompt: 0.15, completion: 0.6 },
    'gpt-4-turbo': { prompt: 10.0, completion: 30.0 },
    'gpt-3.5-turbo': { prompt: 0.5, completion: 1.5 },
    'text-embedding-3-small': { prompt: 0.02, completion: 0 },
    'text-embedding-3-large': { prompt: 0.13, completion: 0 },
  };

  const modelPricing = pricing[model] || { prompt: 0, completion: 0 };

  const promptCost = (promptTokens / 1_000_000) * modelPricing.prompt;
  const completionCost =
    (completionTokens / 1_000_000) * modelPricing.completion;

  return promptCost + completionCost;
}

/**
 * Calculate approximate cost for Anthropic models
 */
export function calculateAnthropicCost(
  model: string,
  promptTokens: number,
  completionTokens: number
): number {
  // Pricing as of 2025 (per 1M tokens)
  const pricing: Record<
    string,
    { prompt: number; completion: number }
  > = {
    'claude-3-5-sonnet-20250929': { prompt: 3.0, completion: 15.0 },
    'claude-3-5-haiku-20241022': { prompt: 0.8, completion: 4.0 },
    'claude-3-opus-20240229': { prompt: 15.0, completion: 75.0 },
  };

  const modelPricing = pricing[model] || { prompt: 0, completion: 0 };

  const promptCost = (promptTokens / 1_000_000) * modelPricing.prompt;
  const completionCost =
    (completionTokens / 1_000_000) * modelPricing.completion;

  return promptCost + completionCost;
}
