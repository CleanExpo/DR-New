/**
 * Comprehensive Monitoring System
 * Integrates error tracking, performance monitoring, and business metrics
 */

import { ErrorTracker, PerformanceMonitor } from './error-tracking';
import { analytics } from './analytics';
import type { Metric } from 'web-vitals';

// Performance thresholds
export const PERFORMANCE_THRESHOLDS = {
  // Core Web Vitals (milliseconds, except CLS)
  LCP: { good: 2500, poor: 4000, critical: 5000 },
  FID: { good: 100, poor: 300, critical: 500 },
  CLS: { good: 0.1, poor: 0.25, critical: 0.5 },
  TTFB: { good: 800, poor: 1800, critical: 3000 },
  INP: { good: 200, poor: 500, critical: 1000 },

  // Custom metrics
  API_RESPONSE: { good: 200, poor: 1000, critical: 3000 },
  PAGE_LOAD: { good: 2000, poor: 4000, critical: 8000 },
  RENDER_TIME: { good: 1000, poor: 2500, critical: 5000 },
};

// Business metrics thresholds
export const BUSINESS_THRESHOLDS = {
  CONVERSION_RATE: { good: 0.03, poor: 0.01, critical: 0.005 }, // 3%, 1%, 0.5%
  BOUNCE_RATE: { good: 0.4, poor: 0.6, critical: 0.75 }, // 40%, 60%, 75%
  ERROR_RATE: { good: 0.001, poor: 0.01, critical: 0.05 }, // 0.1%, 1%, 5%
  AVAILABILITY: { good: 0.999, poor: 0.99, critical: 0.95 }, // 99.9%, 99%, 95%
};

interface MonitoringConfig {
  enablePerformanceMonitoring: boolean;
  enableErrorTracking: boolean;
  enableAnalytics: boolean;
  enableWebVitals: boolean;
  enableAlerts: boolean;
  alertThresholds: typeof PERFORMANCE_THRESHOLDS;
  sampleRate: number; // 0-1, percentage of events to track
}

const DEFAULT_CONFIG: MonitoringConfig = {
  enablePerformanceMonitoring: true,
  enableErrorTracking: true,
  enableAnalytics: true,
  enableWebVitals: true,
  enableAlerts: true,
  alertThresholds: PERFORMANCE_THRESHOLDS,
  sampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0, // 10% in prod, 100% in dev
};

export class ComprehensiveMonitoring {
  private static instance: ComprehensiveMonitoring;
  private config: MonitoringConfig;
  private errorTracker: ErrorTracker;
  private performanceMonitor: typeof PerformanceMonitor;
  private metrics: Map<string, any[]> = new Map();
  private alertsSent: Set<string> = new Set();

  private constructor(config: Partial<MonitoringConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.errorTracker = ErrorTracker.getInstance();
    this.performanceMonitor = PerformanceMonitor;

    if (typeof window !== 'undefined') {
      this.initialize();
    }
  }

  static getInstance(config?: Partial<MonitoringConfig>): ComprehensiveMonitoring {
    if (!ComprehensiveMonitoring.instance) {
      ComprehensiveMonitoring.instance = new ComprehensiveMonitoring(config);
    }
    return ComprehensiveMonitoring.instance;
  }

  private initialize(): void {
    console.log('[Monitoring] Initializing comprehensive monitoring system');

    if (this.config.enableWebVitals) {
      this.initWebVitals();
    }

    if (this.config.enablePerformanceMonitoring) {
      this.initPerformanceMonitoring();
    }

    if (this.config.enableErrorTracking) {
      this.initErrorTracking();
    }

    if (this.config.enableAnalytics) {
      this.initAnalytics();
    }

    // Start health checks
    this.startHealthChecks();
  }

  /**
   * Initialize Web Vitals monitoring
   */
  private async initWebVitals(): Promise<void> {
    try {
      const webVitals = await import('web-vitals');
      const { onCLS, onLCP, onTTFB, onINP, onFCP } = webVitals;

      const handleMetric = (metric: Metric) => {
        this.recordWebVital(metric);
        this.checkPerformanceThreshold(metric);

        // Send to analytics
        if (this.shouldSample()) {
          analytics.webVitals(metric);
        }
      };

      onCLS(handleMetric);
      onLCP(handleMetric);
      onTTFB(handleMetric);
      if (onINP) {onINP(handleMetric);}
      if (onFCP) {onFCP(handleMetric);}

      console.log('[Monitoring] Web Vitals initialized');
    } catch (error) {
      console.error('[Monitoring] Failed to initialize Web Vitals:', error);
    }
  }

  /**
   * Initialize performance monitoring
   */
  private initPerformanceMonitoring(): void {
    if (typeof window === 'undefined') {return;}

    // Monitor navigation timing
    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

      if (perfData) {
        this.recordMetric('page_load_time', perfData.loadEventEnd - perfData.fetchStart);
        this.recordMetric('dom_content_loaded', perfData.domContentLoadedEventEnd - perfData.fetchStart);
        this.recordMetric('dom_interactive', perfData.domInteractive - perfData.fetchStart);
        this.recordMetric('time_to_first_byte', perfData.responseStart - perfData.requestStart);

        // Check thresholds
        const pageLoadTime = perfData.loadEventEnd - perfData.fetchStart;
        this.checkCustomThreshold('page_load', pageLoadTime, PERFORMANCE_THRESHOLDS.PAGE_LOAD);
      }
    });

    // Monitor resource timing
    const resourceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const resource = entry as PerformanceResourceTiming;

        // Track slow resources
        if (resource.duration > 1000) {
          this.recordMetric('slow_resource', {
            name: resource.name,
            duration: resource.duration,
            type: resource.initiatorType,
          });

          if (this.shouldSample()) {
            analytics.event('slow_resource', {
              resource_name: resource.name,
              resource_duration: Math.round(resource.duration),
              resource_type: resource.initiatorType,
              event_category: 'performance',
            });
          }
        }
      }
    });

    try {
      resourceObserver.observe({ entryTypes: ['resource'] });
    } catch (e) {
      console.warn('[Monitoring] Resource observer not supported');
    }

    console.log('[Monitoring] Performance monitoring initialized');
  }

  /**
   * Initialize error tracking
   */
  private initErrorTracking(): void {
    if (typeof window === 'undefined') {return;}

    // Global error handler
    window.addEventListener('error', (event) => {
      const error = event.error || new Error(event.message);
      this.errorTracker.captureError(error, {
        tags: {
          type: 'global_error',
          filename: event.filename || 'unknown',
          lineno: String(event.lineno || 0),
          colno: String(event.colno || 0),
        },
      }, 'error');

      // Track to analytics
      if (this.shouldSample()) {
        analytics.error(error.message, 'error', {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        });
      }
    });

    // Unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      const error = event.reason instanceof Error
        ? event.reason
        : new Error(String(event.reason));

      this.errorTracker.captureError(error, {
        tags: { type: 'unhandled_rejection' },
      }, 'critical');

      // Track to analytics
      if (this.shouldSample()) {
        analytics.error(error.message, 'critical', {
          type: 'unhandled_rejection',
        });
      }
    });

    console.log('[Monitoring] Error tracking initialized');
  }

  /**
   * Initialize analytics auto-tracking
   */
  private initAnalytics(): void {
    if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
      analytics.init(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
      analytics.setupAutoTracking();
      console.log('[Monitoring] Analytics initialized');
    }
  }

  /**
   * Record Web Vital metric (enhanced with persistence)
   */
  private recordWebVital(metric: Metric): void {
    if (!this.metrics.has('web_vitals')) {
      this.metrics.set('web_vitals', []);
    }

    this.metrics.get('web_vitals')!.push({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      timestamp: Date.now(),
    });

    // Send to backend (in-memory)
    if (this.shouldSample()) {
      this.sendToBackend('/api/monitoring/web-vitals', {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
        url: window.location.pathname,
        timestamp: new Date().toISOString(),
      });

      // NEW: Persist to database
      this.persistWebVital(metric);
    }
  }

  /**
   * Persist Web Vital to database
   */
  private async persistWebVital(metric: Metric): Promise<void> {
    try {
      await fetch('/api/monitoring/web-vitals/persist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metricName: metric.name,
          value: metric.value,
          rating: metric.rating,
          page: window.location.pathname,
          deviceType: this.getDeviceType(),
          timestamp: new Date().toISOString(),
        }),
        keepalive: true,
      });
    } catch (error) {
      // Fail silently - don't impact user experience
      if (process.env.NODE_ENV === 'development') {
        console.error('[Monitoring] Failed to persist web vital:', error);
      }
    }
  }

  /**
   * Get device type
   */
  private getDeviceType(): string {
    const width = window.innerWidth;
    if (width < 768) {return 'mobile';}
    if (width < 1024) {return 'tablet';}
    return 'desktop';
  }

  /**
   * Record custom metric
   */
  private recordMetric(name: string, value: any): void {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }

    this.metrics.get(name)!.push({
      value,
      timestamp: Date.now(),
    });

    // Keep only last 100 metrics per type
    const metrics = this.metrics.get(name)!;
    if (metrics.length > 100) {
      metrics.shift();
    }

    PerformanceMonitor.recordMetric(name, typeof value === 'number' ? value : 0);
  }

  /**
   * Check performance threshold and alert if exceeded
   */
  private checkPerformanceThreshold(metric: Metric): void {
    const thresholds = this.config.alertThresholds[metric.name as keyof typeof PERFORMANCE_THRESHOLDS];
    if (!thresholds) {return;}

    const value = metric.value;
    const { good, poor, critical } = thresholds;

    if (value > critical) {
      this.sendAlert('critical', `${metric.name} is critical: ${Math.round(value)}`, {
        metric: metric.name,
        value,
        threshold: critical,
        page: window.location.pathname,
      });
    } else if (value > poor) {
      this.sendAlert('warning', `${metric.name} is poor: ${Math.round(value)}`, {
        metric: metric.name,
        value,
        threshold: poor,
        page: window.location.pathname,
      });
    }
  }

  /**
   * Check custom threshold
   */
  private checkCustomThreshold(
    name: string,
    value: number,
    thresholds: { good: number; poor: number; critical: number }
  ): void {
    if (value > thresholds.critical) {
      this.sendAlert('critical', `${name} is critical: ${Math.round(value)}ms`, {
        metric: name,
        value,
        threshold: thresholds.critical,
      });
    } else if (value > thresholds.poor) {
      this.sendAlert('warning', `${name} is poor: ${Math.round(value)}ms`, {
        metric: name,
        value,
        threshold: thresholds.poor,
      });
    }
  }

  /**
   * Send alert
   */
  private sendAlert(
    level: 'warning' | 'critical',
    message: string,
    context: Record<string, any>
  ): void {
    if (!this.config.enableAlerts) {return;}

    const alertKey = `${level}:${message}`;

    // Prevent duplicate alerts within 5 minutes
    if (this.alertsSent.has(alertKey)) {return;}

    this.alertsSent.add(alertKey);
    setTimeout(() => this.alertsSent.delete(alertKey), 5 * 60 * 1000);

    console.warn(`[Monitoring] ${level.toUpperCase()} ALERT:`, message, context);

    // Send to backend alerting system
    if (process.env.NODE_ENV === 'production') {
      this.sendToBackend('/api/monitoring/alerts', {
        level,
        message,
        context,
        timestamp: new Date().toISOString(),
      });
    }

    // Track alert in analytics
    analytics.event('monitoring_alert', {
      alert_level: level,
      alert_message: message,
      ...context,
      event_category: 'monitoring',
    });
  }

  /**
   * Send data to backend
   */
  private async sendToBackend(endpoint: string, data: any): Promise<void> {
    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        keepalive: true,
      });
    } catch (error) {
      // Silently fail - don't impact user experience
      console.error('[Monitoring] Failed to send to backend:', error);
    }
  }

  /**
   * Check if should sample (rate limiting)
   */
  private shouldSample(): boolean {
    return Math.random() < this.config.sampleRate;
  }

  /**
   * Start periodic health checks
   */
  private startHealthChecks(): void {
    // Check every 5 minutes
    setInterval(() => {
      this.runHealthCheck();
    }, 5 * 60 * 1000);

    // Initial check after 30 seconds
    setTimeout(() => this.runHealthCheck(), 30 * 1000);
  }

  /**
   * Run health check
   */
  private async runHealthCheck(): Promise<void> {
    const metrics = this.getMetricsSummary();
    const errorStats = this.errorTracker.getStatistics();

    // Check error rate
    if (errorStats.totalErrors > 50) {
      this.sendAlert('warning', `High error count: ${errorStats.totalErrors} errors`, {
        unique_errors: errorStats.uniqueErrors,
      });
    }

    // Send health metrics
    if (this.shouldSample()) {
      this.sendToBackend('/api/monitoring/health', {
        metrics,
        errors: errorStats,
        timestamp: new Date().toISOString(),
      });
    }
  }

  /**
   * Get metrics summary
   */
  public getMetricsSummary(): Record<string, any> {
    const summary: Record<string, any> = {};

    this.metrics.forEach((values, name) => {
      if (values.length === 0) {return;}

      const numericValues = values
        .map(v => typeof v.value === 'number' ? v.value : 0)
        .filter(v => v > 0);

      if (numericValues.length > 0) {
        const sorted = [...numericValues].sort((a, b) => a - b);
        summary[name] = {
          count: values.length,
          min: sorted[0],
          max: sorted[sorted.length - 1],
          avg: sorted.reduce((a, b) => a + b, 0) / sorted.length,
          p50: sorted[Math.floor(sorted.length * 0.5)],
          p75: sorted[Math.floor(sorted.length * 0.75)],
          p95: sorted[Math.floor(sorted.length * 0.95)],
          p99: sorted[Math.floor(sorted.length * 0.99)],
        };
      }
    });

    return summary;
  }

  /**
   * Get monitoring dashboard data
   */
  public getDashboardData(): any {
    return {
      performance: this.getMetricsSummary(),
      errors: this.errorTracker.getStatistics(),
      webVitals: this.metrics.get('web_vitals')?.slice(-10) || [],
      timestamp: new Date().toISOString(),
    };
  }
}

// Export singleton instance
export const monitoring = ComprehensiveMonitoring.getInstance();

// Export helper functions
export function initMonitoring(config?: Partial<MonitoringConfig>): void {
  ComprehensiveMonitoring.getInstance(config);
}

export function getMonitoringDashboard(): any {
  return monitoring.getDashboardData();
}
