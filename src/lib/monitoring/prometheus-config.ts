import type { NextApiRequest, NextApiResponse } from 'next';

export interface PrometheusMetric {
  name: string;
  help: string;
  type: 'counter' | 'gauge' | 'histogram' | 'summary';
  labels?: string[];
  value: number;
  labelValues?: Record<string, string>;
}

class PrometheusCollector {
  private metrics = new Map<string, PrometheusMetric>();

  registerMetric(metric: PrometheusMetric): void {
    this.metrics.set(metric.name, metric);
  }

  incrementCounter(name: string, labels?: Record<string, string>): void {
    const metric = this.metrics.get(name);
    if (metric && metric.type === 'counter') {
      metric.value += 1;
      if (labels) {
        metric.labelValues = labels;
      }
    }
  }

  setGauge(name: string, value: number, labels?: Record<string, string>): void {
    const metric = this.metrics.get(name);
    if (metric && metric.type === 'gauge') {
      metric.value = value;
      if (labels) {
        metric.labelValues = labels;
      }
    }
  }

  observeHistogram(name: string, value: number, labels?: Record<string, string>): void {
    const metric = this.metrics.get(name);
    if (metric && metric.type === 'histogram') {
      metric.value += 1;
      if (labels) {
        metric.labelValues = labels;
      }
    }
  }

  exportMetrics(): string {
    const lines: string[] = [];

    for (const [, metric] of this.metrics) {
      lines.push(`# HELP ${metric.name} ${metric.help}`);
      lines.push(`# TYPE ${metric.name} ${metric.type}`);

      if (metric.labelValues && Object.keys(metric.labelValues).length > 0) {
        const labels = Object.entries(metric.labelValues)
          .map(([k, v]) => `${k}="${v}"`)
          .join(',');
        lines.push(`${metric.name}{${labels}} ${metric.value}`);
      } else {
        lines.push(`${metric.name} ${metric.value}`);
      }
    }

    return lines.join('\n') + '\n';
  }

  getMetricsJSON() {
    const result: Record<string, any> = {};

    for (const [name, metric] of this.metrics) {
      result[name] = {
        help: metric.help,
        type: metric.type,
        value: metric.value,
        labels: metric.labelValues,
      };
    }

    return result;
  }
}

export const prometheusCollector = new PrometheusCollector();

export function initPrometheusMetrics(): void {
  prometheusCollector.registerMetric({
    name: 'nrpg_http_requests_total',
    help: 'Total HTTP requests',
    type: 'counter',
    value: 0,
  });

  prometheusCollector.registerMetric({
    name: 'nrpg_http_request_duration_ms',
    help: 'HTTP request duration in milliseconds',
    type: 'histogram',
    value: 0,
  });

  prometheusCollector.registerMetric({
    name: 'nrpg_active_sessions',
    help: 'Active user sessions',
    type: 'gauge',
    value: 0,
  });

  prometheusCollector.registerMetric({
    name: 'nrpg_active_connections',
    help: 'Active WebSocket connections',
    type: 'gauge',
    value: 0,
  });

  prometheusCollector.registerMetric({
    name: 'nrpg_database_query_time_ms',
    help: 'Database query execution time',
    type: 'histogram',
    value: 0,
  });

  prometheusCollector.registerMetric({
    name: 'nrpg_cache_hits_total',
    help: 'Total cache hits',
    type: 'counter',
    value: 0,
  });

  prometheusCollector.registerMetric({
    name: 'nrpg_cache_misses_total',
    help: 'Total cache misses',
    type: 'counter',
    value: 0,
  });

  prometheusCollector.registerMetric({
    name: 'nrpg_errors_total',
    help: 'Total errors',
    type: 'counter',
    value: 0,
  });

  prometheusCollector.registerMetric({
    name: 'nrpg_api_calls_total',
    help: 'Total external API calls',
    type: 'counter',
    value: 0,
  });

  prometheusCollector.registerMetric({
    name: 'nrpg_memory_heap_used_bytes',
    help: 'Heap memory used in bytes',
    type: 'gauge',
    value: 0,
  });

  prometheusCollector.registerMetric({
    name: 'nrpg_uptime_seconds',
    help: 'Application uptime in seconds',
    type: 'gauge',
    value: 0,
  });
}

export function getPrometheusMetrics(): string {
  return prometheusCollector.exportMetrics();
}

export function getPrometheusMetricsJSON() {
  return prometheusCollector.getMetricsJSON();
}
