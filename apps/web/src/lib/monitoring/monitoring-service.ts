// @ts-nocheck

import { captureException, captureMessage, setContext, setTag } from './sentry-config';
import { updateMetrics, recordMetric } from '@/lib/metrics/prometheus';
import { logError, logInfo } from '@/lib/logger/helpers';

interface MonitoringEvent {
  type: 'error' | 'warning' | 'info' | 'metric';
  name: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  context?: Record<string, any>;
  timestamp: number;
}

class MonitoringService {
  private eventBuffer: MonitoringEvent[] = [];
  private readonly maxBufferSize = 1000;

  recordError(error: unknown, context?: Record<string, any>): void {
    const errorMsg = error instanceof Error ? error.message : String(error);

    captureException(error, context);
    logError(error, { context: 'monitoring_service', ...context });

    this.addEvent({
      type: 'error',
      name: errorMsg,
      severity: context?.severity || 'high',
      context,
      timestamp: Date.now(),
    });
  }

  recordWarning(message: string, context?: Record<string, any>): void {
    captureMessage(message, 'warning');
    logInfo(message, { context: 'monitoring_service', severity: 'warning', ...context });

    this.addEvent({
      type: 'warning',
      name: message,
      severity: 'medium',
      context,
      timestamp: Date.now(),
    });
  }

  recordInfo(message: string, context?: Record<string, any>): void {
    logInfo(message, { context: 'monitoring_service', ...context });

    this.addEvent({
      type: 'info',
      name: message,
      severity: 'low',
      context,
      timestamp: Date.now(),
    });
  }

  recordMetric(name: string, value: number, tags?: Record<string, string>): void {
    Object.entries(tags || {}).forEach(([key, val]) => {
      setTag(key, val);
    });

    this.addEvent({
      type: 'metric',
      name,
      severity: 'low',
      context: { value, tags },
      timestamp: Date.now(),
    });
  }

  recordRequestMetric(method: string, status: number, duration: number): void {
    recordMetric(method, status, duration);

    setTag('http.method', method);
    setTag('http.status', String(status));
    setContext('request_performance', { duration_ms: duration });
  }

  recordDatabaseQuery(query: string, duration: number, rowCount?: number): void {
    setContext('database_query', {
      duration_ms: duration,
      row_count: rowCount,
    });

    if (duration > 5000) {
      captureMessage('Slow database query detected', 'warning');
    }
  }

  recordApiCall(service: string, endpoint: string, status: number, duration: number): void {
    setTag('external_service', service);
    setContext('api_call', {
      endpoint,
      status,
      duration_ms: duration,
    });

    if (status >= 500) {
      captureMessage(`External API error: ${service} returned ${status}`, 'error');
    }
  }

  recordCacheMetric(operation: 'hit' | 'miss', key: string, duration?: number): void {
    setTag('cache_operation', operation);
    setContext('cache_metric', { key, duration_ms: duration });

    updateMetrics({
      cacheHitRate: operation === 'hit' ? 0.95 : 0.05,
    });
  }

  recordWebSocketEvent(event: string, userId?: string, duration?: number): void {
    setTag('websocket_event', event);

    if (userId) {
      setTag('user_id', userId);
    }

    if (duration) {
      setContext('websocket', { event, duration_ms: duration });
    }
  }

  private addEvent(event: MonitoringEvent): void {
    this.eventBuffer.push(event);

    if (this.eventBuffer.length > this.maxBufferSize) {
      this.eventBuffer.shift();
    }
  }

  getEvents(
    filter?: {
      type?: MonitoringEvent['type'];
      severity?: MonitoringEvent['severity'];
      startTime?: number;
      endTime?: number;
    }
  ): MonitoringEvent[] {
    let filtered = [...this.eventBuffer];

    if (filter?.type) {
      filtered = filtered.filter(e => e.type === filter.type);
    }

    if (filter?.severity) {
      filtered = filtered.filter(e => e.severity === filter.severity);
    }

    if (filter?.startTime) {
      filtered = filtered.filter(e => e.timestamp >= filter.startTime);
    }

    if (filter?.endTime) {
      filtered = filtered.filter(e => e.timestamp <= filter.endTime);
    }

    return filtered;
  }

  getEventsSummary() {
    const errors = this.eventBuffer.filter(e => e.type === 'error').length;
    const warnings = this.eventBuffer.filter(e => e.type === 'warning').length;
    const critical = this.eventBuffer.filter(e => e.severity === 'critical').length;

    return {
      totalEvents: this.eventBuffer.length,
      errors,
      warnings,
      critical,
      recentErrors: this.eventBuffer
        .filter(e => e.type === 'error')
        .slice(-5)
        .reverse(),
    };
  }

  clearOldEvents(olderThanMs: number = 7 * 24 * 60 * 60 * 1000): number {
    const threshold = Date.now() - olderThanMs;
    const sizeBefore = this.eventBuffer.length;

    this.eventBuffer = this.eventBuffer.filter(e => e.timestamp > threshold);

    return sizeBefore - this.eventBuffer.length;
  }
}

export const monitoringService = new MonitoringService();
