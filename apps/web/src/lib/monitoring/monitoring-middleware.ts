import { NextRequest, NextResponse } from 'next/server';
import { monitoringService } from './monitoring-service';
import { prometheusCollector } from './prometheus-config';

interface MonitoringContext {
  startTime: number;
  method: string;
  pathname: string;
  userId?: string;
}

export function createMonitoringMiddleware() {
  return async (request: NextRequest, next: any) => {
    const context: MonitoringContext = {
      startTime: Date.now(),
      method: request.method,
      pathname: new URL(request.url).pathname,
    };

    try {
      const response = await next();
      const duration = Date.now() - context.startTime;

      monitoringService.recordRequestMetric(
        context.method,
        response.status,
        duration
      );

      prometheusCollector.incrementCounter('nrpg_http_requests_total', {
        method: context.method,
        status: String(response.status),
      });

      prometheusCollector.observeHistogram('nrpg_http_request_duration_ms', duration);

      if (response.status >= 500) {
        monitoringService.recordWarning(
          `Server error: ${context.method} ${context.pathname} returned ${response.status}`,
          { duration }
        );
      }

      return response;
    } catch (error) {
      const duration = Date.now() - context.startTime;

      monitoringService.recordError(error, {
        method: context.method,
        pathname: context.pathname,
        duration,
        severity: 'high',
      });

      prometheusCollector.incrementCounter('nrpg_errors_total', {
        type: 'request_error',
      });

      throw error;
    }
  };
}

export function trackDatabaseOperation(
  operation: string,
  duration: number,
  rowCount?: number
): void {
  if (duration > 5000) {
    monitoringService.recordWarning(
      `Slow database operation: ${operation} took ${duration}ms`,
      { operation, rowCount }
    );
  }

  prometheusCollector.observeHistogram('nrpg_database_query_time_ms', duration, {
    operation,
  });
}

export function trackExternalApiCall(
  service: string,
  endpoint: string,
  status: number,
  duration: number
): void {
  monitoringService.recordApiCall(service, endpoint, status, duration);

  prometheusCollector.incrementCounter('nrpg_api_calls_total', {
    service,
    status: String(status),
  });

  if (duration > 10000) {
    monitoringService.recordWarning(
      `Slow external API call: ${service} ${endpoint} took ${duration}ms`,
      { service, endpoint, duration }
    );
  }
}

export function trackCacheOperation(
  operation: 'hit' | 'miss',
  key: string,
  duration?: number
): void {
  monitoringService.recordCacheMetric(operation, key, duration);

  const metric = operation === 'hit' 
    ? 'nrpg_cache_hits_total' 
    : 'nrpg_cache_misses_total';

  prometheusCollector.incrementCounter(metric, { key });
}

export function trackWebSocketActivity(
  event: string,
  userId?: string,
  duration?: number
): void {
  monitoringService.recordWebSocketEvent(event, userId, duration);

  prometheusCollector.incrementCounter('nrpg_active_connections', {
    event,
  });
}

export function updateSystemMetrics(): void {
  const memUsage = process.memoryUsage();

  prometheusCollector.setGauge('nrpg_memory_heap_used_bytes', memUsage.heapUsed);

  prometheusCollector.setGauge(
    'nrpg_uptime_seconds',
    Math.floor(process.uptime())
  );
}
