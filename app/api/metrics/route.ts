/**
 * Prometheus Metrics Endpoint
 *
 * GET /api/metrics
 *
 * Exports application metrics in Prometheus text format
 * Can be scraped by Prometheus, Grafana, or similar monitoring tools
 *
 * Format: https://prometheus.io/docs/instrumenting/exposition_formats/
 */

import { NextRequest, NextResponse } from 'next/server';
import { logInfo, logError } from '@/lib/logger/helpers';

interface Metric {
  name: string;
  help: string;
  type: 'counter' | 'gauge' | 'histogram' | 'summary';
  labels?: Record<string, string>;
  value: number;
}

// In-memory metrics store (in production, use persistent storage)
const metrics = {
  httpRequests: new Map<string, number>(),
  httpRequestDuration: new Map<string, number[]>(),
  activeSessions: 0,
  activeConnections: 0,
  messagesProcessed: 0,
  messagesPerMinute: 0,
  responseLatency: 0,
  errorCount: 0,
  databaseQueryTime: 0,
  cacheHitRate: 0,
  uptime: Date.now(),
};

/**
 * Format metrics in Prometheus text format
 */
function formatMetrics(metricsData: typeof metrics): string {
  const lines: string[] = [];

  // HELP and TYPE declarations
  lines.push('# HELP nrpg_http_requests_total Total HTTP requests');
  lines.push('# TYPE nrpg_http_requests_total counter');

  lines.push('# HELP nrpg_http_request_duration_seconds HTTP request duration');
  lines.push('# TYPE nrpg_http_request_duration_seconds histogram');

  lines.push('# HELP nrpg_active_sessions Current active sessions');
  lines.push('# TYPE nrpg_active_sessions gauge');

  lines.push('# HELP nrpg_active_connections Current active WebSocket connections');
  lines.push('# TYPE nrpg_active_connections gauge');

  lines.push('# HELP nrpg_messages_processed_total Messages processed');
  lines.push('# TYPE nrpg_messages_processed_total counter');

  lines.push('# HELP nrpg_messages_per_minute Messages per minute');
  lines.push('# TYPE nrpg_messages_per_minute gauge');

  lines.push('# HELP nrpg_response_latency_seconds Average response latency');
  lines.push('# TYPE nrpg_response_latency_seconds gauge');

  lines.push('# HELP nrpg_errors_total Total errors');
  lines.push('# TYPE nrpg_errors_total counter');

  lines.push('# HELP nrpg_database_query_time_seconds Database query time');
  lines.push('# TYPE nrpg_database_query_time_seconds gauge');

  lines.push('# HELP nrpg_cache_hit_rate Cache hit rate (0-1)');
  lines.push('# TYPE nrpg_cache_hit_rate gauge');

  lines.push('# HELP nrpg_uptime_seconds Uptime in seconds');
  lines.push('# TYPE nrpg_uptime_seconds gauge');

  // Metrics values
  lines.push(`nrpg_active_sessions ${metricsData.activeSessions}`);
  lines.push(`nrpg_active_connections ${metricsData.activeConnections}`);
  lines.push(`nrpg_messages_processed_total ${metricsData.messagesProcessed}`);
  lines.push(`nrpg_messages_per_minute ${metricsData.messagesPerMinute}`);
  lines.push(`nrpg_response_latency_seconds ${metricsData.responseLatency}`);
  lines.push(`nrpg_errors_total ${metricsData.errorCount}`);
  lines.push(`nrpg_database_query_time_seconds ${metricsData.databaseQueryTime}`);
  lines.push(`nrpg_cache_hit_rate ${metricsData.cacheHitRate}`);
  lines.push(`nrpg_uptime_seconds ${(Date.now() - metricsData.uptime) / 1000}`);

  // HTTP request metrics
  metricsData.httpRequests.forEach((count, method) => {
    lines.push(`nrpg_http_requests_total{method="${method}"} ${count}`);
  });

  return lines.join('\n') + '\n';
}

/**
 * Record HTTP request metric
 */
export function recordMetric(method: string, status: number, duration: number) {
  // Count requests
  const key = `${method}_${status}`;
  metrics.httpRequests.set(key, (metrics.httpRequests.get(key) || 0) + 1);

  // Track request duration
  if (!metrics.httpRequestDuration.has(key)) {
    metrics.httpRequestDuration.set(key, []);
  }
  metrics.httpRequestDuration.get(key)!.push(duration);

  // Update latency
  const durations = Array.from(metrics.httpRequestDuration.values()).flat();
  if (durations.length > 0) {
    metrics.responseLatency =
      durations.reduce((a, b) => a + b, 0) / durations.length / 1000; // Convert to seconds
  }
}

/**
 * Update active metrics
 */
export function updateMetrics(data: Partial<typeof metrics>) {
  Object.assign(metrics, data);
}

/**
 * Get current metrics
 */
export function getMetrics() {
  return { ...metrics };
}

/**
 * GET /api/metrics
 * Returns Prometheus-format metrics
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const format = searchParams.get('format') || 'prometheus';

    // Authentication (optional - in production, verify Bearer token)
    const authHeader = request.headers.get('authorization');
    const metricsToken = process.env.METRICS_TOKEN;

    if (metricsToken && authHeader !== `Bearer ${metricsToken}`) {
      // Allow unauthenticated requests in development
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
    }

    let responseBody: string;

    if (format === 'json') {
      // JSON format for easier parsing
      const metricsData = getMetrics();
      responseBody = JSON.stringify(metricsData, null, 2);
    } else {
      // Prometheus text format
      responseBody = formatMetrics(metrics);
    }

    logInfo('Metrics endpoint accessed', {
      format,
      metricsCount: metrics.httpRequests.size,
    });

    return new NextResponse(responseBody, {
      status: 200,
      headers: {
        'Content-Type': format === 'json' ? 'application/json' : 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    logError(error, { context: 'metrics_endpoint' });
    return NextResponse.json(
      { error: 'Failed to generate metrics' },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS handler for CORS
 */
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json(
    { message: 'OK' },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Authorization',
      },
      status: 200,
    }
  );
}
