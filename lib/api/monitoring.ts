/**
 * API Monitoring and Metrics
 * Track API usage, performance, and errors
 */

import { logger } from './logger';

// Metrics store (use external service like DataDog, New Relic in production)
interface MetricEntry {
  timestamp: number;
  endpoint: string;
  method: string;
  status: number;
  duration: number;
  ip?: string;
  error?: string;
}

const metrics: MetricEntry[] = [];
const MAX_METRICS = 10000; // Keep last 10k requests

/**
 * Record API request metric
 */
export function recordMetric(metric: MetricEntry): void {
  metrics.push(metric);

  // Keep only recent metrics
  if (metrics.length > MAX_METRICS) {
    metrics.shift();
  }

  // Log slow requests
  if (metric.duration > 1000) {
    logger.warn('Slow API request', {
      endpoint: metric.endpoint,
      method: metric.method,
      duration: metric.duration,
      status: metric.status,
    });
  }

  // Log errors
  if (metric.status >= 400) {
    logger.error('API error', undefined, {
      endpoint: metric.endpoint,
      method: metric.method,
      status: metric.status,
      error: metric.error,
      ip: metric.ip,
    });
  }
}

/**
 * Get metrics summary
 */
export function getMetricsSummary(timeWindowMs: number = 3600000): {
  totalRequests: number;
  successRate: number;
  averageResponseTime: number;
  errorRate: number;
  slowRequests: number;
  byEndpoint: Record<string, { count: number; avgDuration: number }>;
  byStatus: Record<number, number>;
} {
  const now = Date.now();
  const recentMetrics = metrics.filter(m => now - m.timestamp < timeWindowMs);

  const totalRequests = recentMetrics.length;
  const successfulRequests = recentMetrics.filter(m => m.status < 400).length;
  const errorRequests = recentMetrics.filter(m => m.status >= 400).length;
  const slowRequests = recentMetrics.filter(m => m.duration > 1000).length;

  const totalDuration = recentMetrics.reduce((sum, m) => sum + m.duration, 0);
  const averageResponseTime = totalRequests > 0 ? totalDuration / totalRequests : 0;

  // Group by endpoint
  const byEndpoint: Record<string, { count: number; totalDuration: number }> = {};
  recentMetrics.forEach(m => {
    if (!byEndpoint[m.endpoint]) {
      byEndpoint[m.endpoint] = { count: 0, totalDuration: 0 };
    }
    byEndpoint[m.endpoint].count++;
    byEndpoint[m.endpoint].totalDuration += m.duration;
  });

  const byEndpointSummary: Record<string, { count: number; avgDuration: number }> = {};
  Object.entries(byEndpoint).forEach(([endpoint, data]) => {
    byEndpointSummary[endpoint] = {
      count: data.count,
      avgDuration: data.totalDuration / data.count,
    };
  });

  // Group by status
  const byStatus: Record<number, number> = {};
  recentMetrics.forEach(m => {
    byStatus[m.status] = (byStatus[m.status] || 0) + 1;
  });

  return {
    totalRequests,
    successRate: totalRequests > 0 ? (successfulRequests / totalRequests) * 100 : 0,
    averageResponseTime: Math.round(averageResponseTime),
    errorRate: totalRequests > 0 ? (errorRequests / totalRequests) * 100 : 0,
    slowRequests,
    byEndpoint: byEndpointSummary,
    byStatus,
  };
}

/**
 * Get error trends
 */
export function getErrorTrends(timeWindowMs: number = 3600000): {
  endpoint: string;
  errorCount: number;
  errorRate: number;
  recentErrors: string[];
}[] {
  const now = Date.now();
  const recentMetrics = metrics.filter(m => now - m.timestamp < timeWindowMs);

  const errorsByEndpoint: Record<
    string,
    { total: number; errors: number; errorMessages: string[] }
  > = {};

  recentMetrics.forEach(m => {
    if (!errorsByEndpoint[m.endpoint]) {
      errorsByEndpoint[m.endpoint] = {
        total: 0,
        errors: 0,
        errorMessages: [],
      };
    }

    errorsByEndpoint[m.endpoint].total++;

    if (m.status >= 400) {
      errorsByEndpoint[m.endpoint].errors++;
      if (m.error && errorsByEndpoint[m.endpoint].errorMessages.length < 5) {
        errorsByEndpoint[m.endpoint].errorMessages.push(m.error);
      }
    }
  });

  return Object.entries(errorsByEndpoint)
    .map(([endpoint, data]) => ({
      endpoint,
      errorCount: data.errors,
      errorRate: (data.errors / data.total) * 100,
      recentErrors: data.errorMessages,
    }))
    .filter(e => e.errorCount > 0)
    .sort((a, b) => b.errorCount - a.errorCount);
}

/**
 * Get performance insights
 */
export function getPerformanceInsights(timeWindowMs: number = 3600000): {
  p50: number;
  p90: number;
  p95: number;
  p99: number;
  slowestEndpoints: Array<{ endpoint: string; avgDuration: number; count: number }>;
} {
  const now = Date.now();
  const recentMetrics = metrics.filter(m => now - m.timestamp < timeWindowMs);

  // Calculate percentiles
  const durations = recentMetrics.map(m => m.duration).sort((a, b) => a - b);
  const p50 = percentile(durations, 50);
  const p90 = percentile(durations, 90);
  const p95 = percentile(durations, 95);
  const p99 = percentile(durations, 99);

  // Find slowest endpoints
  const summary = getMetricsSummary(timeWindowMs);
  const slowestEndpoints = Object.entries(summary.byEndpoint)
    .map(([endpoint, data]) => ({
      endpoint,
      avgDuration: Math.round(data.avgDuration),
      count: data.count,
    }))
    .sort((a, b) => b.avgDuration - a.avgDuration)
    .slice(0, 5);

  return {
    p50: Math.round(p50),
    p90: Math.round(p90),
    p95: Math.round(p95),
    p99: Math.round(p99),
    slowestEndpoints,
  };
}

/**
 * Calculate percentile
 */
function percentile(values: number[], p: number): number {
  if (values.length === 0) return 0;

  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[Math.max(0, index)];
}

/**
 * Check if API is healthy
 */
export function isApiHealthy(timeWindowMs: number = 300000): {
  healthy: boolean;
  issues: string[];
} {
  const summary = getMetricsSummary(timeWindowMs);
  const performance = getPerformanceInsights(timeWindowMs);
  const issues: string[] = [];

  // Check error rate
  if (summary.errorRate > 10) {
    issues.push(`High error rate: ${summary.errorRate.toFixed(2)}%`);
  }

  // Check response time
  if (performance.p95 > 2000) {
    issues.push(`Slow p95 response time: ${performance.p95}ms`);
  }

  // Check success rate
  if (summary.successRate < 90) {
    issues.push(`Low success rate: ${summary.successRate.toFixed(2)}%`);
  }

  return {
    healthy: issues.length === 0,
    issues,
  };
}

/**
 * Create monitoring middleware
 */
export function createMonitoringMiddleware(endpoint: string, method: string) {
  const startTime = Date.now();

  return {
    complete: (status: number, error?: string) => {
      const duration = Date.now() - startTime;

      recordMetric({
        timestamp: Date.now(),
        endpoint,
        method,
        status,
        duration,
        error,
      });
    },
  };
}

/**
 * Export metrics for external monitoring
 * Format: Prometheus-compatible
 */
export function exportPrometheusMetrics(): string {
  const summary = getMetricsSummary();
  const performance = getPerformanceInsights();

  return `
# HELP api_requests_total Total number of API requests
# TYPE api_requests_total counter
api_requests_total ${summary.totalRequests}

# HELP api_success_rate API success rate percentage
# TYPE api_success_rate gauge
api_success_rate ${summary.successRate.toFixed(2)}

# HELP api_error_rate API error rate percentage
# TYPE api_error_rate gauge
api_error_rate ${summary.errorRate.toFixed(2)}

# HELP api_response_time_avg Average response time in milliseconds
# TYPE api_response_time_avg gauge
api_response_time_avg ${summary.averageResponseTime}

# HELP api_response_time_p50 50th percentile response time
# TYPE api_response_time_p50 gauge
api_response_time_p50 ${performance.p50}

# HELP api_response_time_p90 90th percentile response time
# TYPE api_response_time_p90 gauge
api_response_time_p90 ${performance.p90}

# HELP api_response_time_p95 95th percentile response time
# TYPE api_response_time_p95 gauge
api_response_time_p95 ${performance.p95}

# HELP api_response_time_p99 99th percentile response time
# TYPE api_response_time_p99 gauge
api_response_time_p99 ${performance.p99}

# HELP api_slow_requests_total Number of slow requests (>1s)
# TYPE api_slow_requests_total counter
api_slow_requests_total ${summary.slowRequests}
`.trim();
}
