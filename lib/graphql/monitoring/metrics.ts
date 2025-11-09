/**
 * GraphQL metrics tracking
 * Monitors query performance, error rates, and usage patterns
 */

interface QueryMetric {
  operationName: string;
  duration: number;
  timestamp: Date;
  success: boolean;
  cacheHit: boolean;
  complexity?: number;
  depth?: number;
  errors?: string[];
}

interface ResolverMetric {
  path: string;
  duration: number;
  timestamp: Date;
  success: boolean;
}

interface ErrorMetric {
  operationName: string;
  errorCode: string;
  errorMessage: string;
  timestamp: Date;
  path?: string[];
}

class MetricsCollector {
  private queryMetrics: QueryMetric[] = [];
  private resolverMetrics: ResolverMetric[] = [];
  private errorMetrics: ErrorMetric[] = [];
  private maxMetrics = 1000; // Keep last 1000 metrics

  /**
   * Record query execution
   */
  recordQuery(metric: QueryMetric) {
    this.queryMetrics.push(metric);
    this.trimMetrics(this.queryMetrics);
  }

  /**
   * Record resolver execution
   */
  recordResolver(metric: ResolverMetric) {
    this.resolverMetrics.push(metric);
    this.trimMetrics(this.resolverMetrics);
  }

  /**
   * Record error
   */
  recordError(metric: ErrorMetric) {
    this.errorMetrics.push(metric);
    this.trimMetrics(this.errorMetrics);
  }

  /**
   * Trim metrics to max size
   */
  private trimMetrics(metrics: any[]) {
    if (metrics.length > this.maxMetrics) {
      metrics.splice(0, metrics.length - this.maxMetrics);
    }
  }

  /**
   * Get query performance stats
   */
  getQueryStats(since?: Date) {
    const metrics = this.getMetricsSince(this.queryMetrics, since);

    if (metrics.length === 0) {
      return null;
    }

    const durations = metrics.map(m => m.duration);
    const successful = metrics.filter(m => m.success).length;
    const cacheHits = metrics.filter(m => m.cacheHit).length;

    return {
      totalQueries: metrics.length,
      successRate: (successful / metrics.length) * 100,
      cacheHitRate: (cacheHits / metrics.length) * 100,
      avgDuration: this.average(durations),
      minDuration: Math.min(...durations),
      maxDuration: Math.max(...durations),
      p50Duration: this.percentile(durations, 50),
      p95Duration: this.percentile(durations, 95),
      p99Duration: this.percentile(durations, 99),
    };
  }

  /**
   * Get resolver performance stats
   */
  getResolverStats(since?: Date) {
    const metrics = this.getMetricsSince(this.resolverMetrics, since);

    const statsByPath = new Map<string, number[]>();

    metrics.forEach(metric => {
      if (!statsByPath.has(metric.path)) {
        statsByPath.set(metric.path, []);
      }
      statsByPath.get(metric.path)!.push(metric.duration);
    });

    const resolverStats = Array.from(statsByPath.entries()).map(([path, durations]) => ({
      path,
      count: durations.length,
      avgDuration: this.average(durations),
      maxDuration: Math.max(...durations),
      p95Duration: this.percentile(durations, 95),
    }));

    // Sort by p95 duration (slowest first)
    resolverStats.sort((a, b) => b.p95Duration - a.p95Duration);

    return resolverStats;
  }

  /**
   * Get error stats
   */
  getErrorStats(since?: Date) {
    const metrics = this.getMetricsSince(this.errorMetrics, since);

    const errorsByCode = new Map<string, number>();

    metrics.forEach(metric => {
      errorsByCode.set(
        metric.errorCode,
        (errorsByCode.get(metric.errorCode) || 0) + 1
      );
    });

    const errorStats = Array.from(errorsByCode.entries()).map(([code, count]) => ({
      code,
      count,
      percentage: (count / metrics.length) * 100,
    }));

    // Sort by count (most frequent first)
    errorStats.sort((a, b) => b.count - a.count);

    return {
      totalErrors: metrics.length,
      errorsByCode: errorStats,
    };
  }

  /**
   * Get operation stats
   */
  getOperationStats(since?: Date) {
    const metrics = this.getMetricsSince(this.queryMetrics, since);

    const statsByOperation = new Map<string, QueryMetric[]>();

    metrics.forEach(metric => {
      if (!statsByOperation.has(metric.operationName)) {
        statsByOperation.set(metric.operationName, []);
      }
      statsByOperation.get(metric.operationName)!.push(metric);
    });

    const operationStats = Array.from(statsByOperation.entries()).map(
      ([operationName, metrics]) => {
        const durations = metrics.map(m => m.duration);
        const successful = metrics.filter(m => m.success).length;
        const cacheHits = metrics.filter(m => m.cacheHit).length;

        return {
          operationName,
          count: metrics.length,
          successRate: (successful / metrics.length) * 100,
          cacheHitRate: (cacheHits / metrics.length) * 100,
          avgDuration: this.average(durations),
          p95Duration: this.percentile(durations, 95),
        };
      }
    );

    // Sort by count (most frequent first)
    operationStats.sort((a, b) => b.count - a.count);

    return operationStats;
  }

  /**
   * Get metrics since a specific time
   */
  private getMetricsSince<T extends { timestamp: Date }>(
    metrics: T[],
    since?: Date
  ): T[] {
    if (!since) return metrics;
    return metrics.filter(m => m.timestamp >= since);
  }

  /**
   * Calculate average
   */
  private average(numbers: number[]): number {
    if (numbers.length === 0) return 0;
    return numbers.reduce((a, b) => a + b, 0) / numbers.length;
  }

  /**
   * Calculate percentile
   */
  private percentile(numbers: number[], p: number): number {
    if (numbers.length === 0) return 0;

    const sorted = [...numbers].sort((a, b) => a - b);
    const index = Math.ceil((p / 100) * sorted.length) - 1;

    return sorted[index];
  }

  /**
   * Export all metrics
   */
  exportMetrics() {
    return {
      queries: this.queryMetrics,
      resolvers: this.resolverMetrics,
      errors: this.errorMetrics,
    };
  }

  /**
   * Clear all metrics
   */
  clearMetrics() {
    this.queryMetrics = [];
    this.resolverMetrics = [];
    this.errorMetrics = [];
  }

  /**
   * Get health status
   */
  getHealthStatus(): {
    status: 'healthy' | 'degraded' | 'unhealthy';
    metrics: any;
  } {
    const last5Minutes = new Date(Date.now() - 5 * 60 * 1000);
    const queryStats = this.getQueryStats(last5Minutes);
    const errorStats = this.getErrorStats(last5Minutes);

    if (!queryStats) {
      return { status: 'healthy', metrics: { message: 'No recent queries' } };
    }

    const errorRate = errorStats ? (errorStats.totalErrors / queryStats.totalQueries) * 100 : 0;
    const avgDuration = queryStats.avgDuration;

    let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';

    if (errorRate > 10 || avgDuration > 2000) {
      status = 'unhealthy';
    } else if (errorRate > 5 || avgDuration > 1000) {
      status = 'degraded';
    }

    return {
      status,
      metrics: {
        errorRate: `${errorRate.toFixed(2)}%`,
        avgDuration: `${avgDuration.toFixed(2)}ms`,
        successRate: `${queryStats.successRate.toFixed(2)}%`,
        cacheHitRate: `${queryStats.cacheHitRate.toFixed(2)}%`,
      },
    };
  }
}

// Singleton instance
export const metricsCollector = new MetricsCollector();

/**
 * Express/Next.js handler for metrics endpoint
 */
export function metricsHandler(req: any, res: any) {
  const { type = 'summary', since } = req.query;

  const sinceDate = since ? new Date(since) : new Date(Date.now() - 60 * 60 * 1000); // Last hour by default

  let data: any;

  switch (type) {
    case 'queries':
      data = metricsCollector.getQueryStats(sinceDate);
      break;
    case 'resolvers':
      data = metricsCollector.getResolverStats(sinceDate);
      break;
    case 'errors':
      data = metricsCollector.getErrorStats(sinceDate);
      break;
    case 'operations':
      data = metricsCollector.getOperationStats(sinceDate);
      break;
    case 'health':
      data = metricsCollector.getHealthStatus();
      break;
    case 'export':
      data = metricsCollector.exportMetrics();
      break;
    default:
      data = {
        queries: metricsCollector.getQueryStats(sinceDate),
        errors: metricsCollector.getErrorStats(sinceDate),
        health: metricsCollector.getHealthStatus(),
      };
  }

  res.json(data);
}
