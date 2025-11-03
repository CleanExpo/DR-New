/**
 * Advanced Performance Monitoring for Disaster Recovery Website
 * Tracks Core Web Vitals and custom performance metrics
 *
 * Metrics tracked:
 * - LCP (Largest Contentful Paint)
 * - FID (First Input Delay)
 * - CLS (Cumulative Layout Shift)
 * - INP (Interaction to Next Paint)
 * - FCP (First Contentful Paint)
 * - TTFB (Time to First Byte)
 * - Custom business metrics
 */

import { onCLS, onFCP, onFID, onINP, onLCP, onTTFB, Metric } from 'web-vitals';

// Performance thresholds based on Google's recommendations
const THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 }, // milliseconds
  FID: { good: 100, needsImprovement: 300 }, // milliseconds
  CLS: { good: 0.1, needsImprovement: 0.25 }, // score
  INP: { good: 200, needsImprovement: 500 }, // milliseconds
  FCP: { good: 1800, needsImprovement: 3000 }, // milliseconds
  TTFB: { good: 800, needsImprovement: 1800 }, // milliseconds
};

// Performance data interface
interface PerformanceData {
  metric: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
  metadata?: Record<string, any>;
}

// Performance observer configuration
interface ObserverConfig {
  reportToAnalytics?: boolean;
  reportToConsole?: boolean;
  sampleRate?: number; // 0-1, percentage of users to track
  debug?: boolean;
}

class PerformanceMonitor {
  private config: ObserverConfig;
  private metrics: Map<string, PerformanceData> = new Map();
  private observers: PerformanceObserver[] = [];
  private navigationTiming: PerformanceNavigationTiming | null = null;

  constructor(config: ObserverConfig = {}) {
    this.config = {
      reportToAnalytics: true,
      reportToConsole: process.env.NODE_ENV === 'development',
      sampleRate: 1,
      debug: false,
      ...config,
    };

    // Only initialize if we should track this user
    if (this.shouldTrack()) {
      this.initialize();
    }
  }

  /**
   * Initialize performance monitoring
   */
  private initialize(): void {
    // Check if Performance API is available
    if (typeof window === 'undefined' || !('performance' in window)) {
      console.warn('[PerformanceMonitor] Performance API not available');
      return;
    }

    // Set up Core Web Vitals monitoring
    this.setupWebVitals();

    // Set up custom performance observers
    this.setupCustomObservers();

    // Track navigation timing
    this.trackNavigationTiming();

    // Set up resource timing
    this.setupResourceTiming();

    // Monitor long tasks
    this.monitorLongTasks();

    // Track memory usage (if available)
    this.trackMemoryUsage();
  }

  /**
   * Set up Core Web Vitals monitoring
   */
  private setupWebVitals(): void {
    // Largest Contentful Paint
    onLCP((metric) => this.handleMetric('LCP', metric));

    // First Input Delay
    onFID((metric) => this.handleMetric('FID', metric));

    // Cumulative Layout Shift
    onCLS((metric) => this.handleMetric('CLS', metric));

    // Interaction to Next Paint
    onINP((metric) => this.handleMetric('INP', metric));

    // First Contentful Paint
    onFCP((metric) => this.handleMetric('FCP', metric));

    // Time to First Byte
    onTTFB((metric) => this.handleMetric('TTFB', metric));
  }

  /**
   * Handle Core Web Vitals metric
   */
  private handleMetric(name: string, metric: Metric): void {
    const rating = this.getRating(name, metric.value);
    const data: PerformanceData = {
      metric: name,
      value: metric.value,
      rating,
      timestamp: Date.now(),
      metadata: {
        navigationType: metric.navigationType,
        id: metric.id,
        delta: metric.delta,
        entries: metric.entries?.length || 0,
      },
    };

    // Store metric
    this.metrics.set(name, data);

    // Report based on configuration
    this.reportMetric(data);

    // Log warning for poor performance
    if (rating === 'poor' && this.config.reportToConsole) {
      console.warn(
        `[PerformanceMonitor] Poor ${name}: ${metric.value.toFixed(2)}${
          name === 'CLS' ? '' : 'ms'
        }`
      );
    }
  }

  /**
   * Set up custom performance observers
   */
  private setupCustomObservers(): void {
    // Observe paint timing
    this.observePaintTiming();

    // Observe element timing
    this.observeElementTiming();

    // Observe layout shifts
    this.observeLayoutShifts();
  }

  /**
   * Observe paint timing
   */
  private observePaintTiming(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'paint') {
            const paintEntry = entry as PerformancePaintTiming;
            this.reportCustomMetric({
              metric: paintEntry.name,
              value: paintEntry.startTime,
              rating: this.getRating('FCP', paintEntry.startTime),
              timestamp: Date.now(),
            });
          }
        }
      });

      observer.observe({ entryTypes: ['paint'] });
      this.observers.push(observer);
    } catch (error) {
      if (this.config.debug) {
        console.error('[PerformanceMonitor] Error setting up paint observer:', error);
      }
    }
  }

  /**
   * Observe element timing for critical elements
   */
  private observeElementTiming(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'element') {
            this.reportCustomMetric({
              metric: `element-${entry.identifier || 'unknown'}`,
              value: entry.startTime,
              rating: 'good',
              timestamp: Date.now(),
              metadata: {
                identifier: entry.identifier,
                url: entry.url,
                renderTime: entry.renderTime,
                loadTime: entry.loadTime,
                intersectionRect: entry.intersectionRect,
              },
            });
          }
        }
      });

      observer.observe({ entryTypes: ['element'] });
      this.observers.push(observer);
    } catch (error) {
      if (this.config.debug) {
        console.error('[PerformanceMonitor] Error setting up element observer:', error);
      }
    }
  }

  /**
   * Observe layout shifts for debugging CLS
   */
  private observeLayoutShifts(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'layout-shift') {
            const layoutShift = entry as any; // LayoutShift type not yet in TypeScript
            if (!layoutShift.hadRecentInput) {
              if (this.config.debug) {
                console.log('[PerformanceMonitor] Layout shift detected:', {
                  value: layoutShift.value,
                  sources: layoutShift.sources,
                });
              }
            }
          }
        }
      });

      observer.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(observer);
    } catch (error) {
      if (this.config.debug) {
        console.error('[PerformanceMonitor] Error setting up layout shift observer:', error);
      }
    }
  }

  /**
   * Track navigation timing
   */
  private trackNavigationTiming(): void {
    // Wait for the page to fully load
    if (document.readyState === 'complete') {
      this.captureNavigationTiming();
    } else {
      window.addEventListener('load', () => this.captureNavigationTiming());
    }
  }

  private captureNavigationTiming(): void {
    const navigation = performance.getEntriesByType(
      'navigation'
    )[0] as PerformanceNavigationTiming;

    if (navigation) {
      this.navigationTiming = navigation;

      // Calculate and report key metrics
      const metrics = {
        'dns-lookup': navigation.domainLookupEnd - navigation.domainLookupStart,
        'tcp-connection': navigation.connectEnd - navigation.connectStart,
        'request-time': navigation.responseStart - navigation.requestStart,
        'response-time': navigation.responseEnd - navigation.responseStart,
        'dom-interactive': navigation.domInteractive - navigation.fetchStart,
        'dom-complete': navigation.domComplete - navigation.fetchStart,
        'load-complete': navigation.loadEventEnd - navigation.fetchStart,
      };

      Object.entries(metrics).forEach(([name, value]) => {
        this.reportCustomMetric({
          metric: `navigation-${name}`,
          value,
          rating: value < 1000 ? 'good' : value < 3000 ? 'needs-improvement' : 'poor',
          timestamp: Date.now(),
        });
      });
    }
  }

  /**
   * Set up resource timing monitoring
   */
  private setupResourceTiming(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries() as PerformanceResourceTiming[];

        // Group resources by type
        const resourcesByType = new Map<string, number[]>();

        entries.forEach((entry) => {
          const type = this.getResourceType(entry.name);
          if (!resourcesByType.has(type)) {
            resourcesByType.set(type, []);
          }
          resourcesByType.get(type)!.push(entry.responseEnd - entry.startTime);
        });

        // Report aggregated metrics
        resourcesByType.forEach((times, type) => {
          const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
          const maxTime = Math.max(...times);

          this.reportCustomMetric({
            metric: `resource-${type}-avg`,
            value: avgTime,
            rating: avgTime < 200 ? 'good' : avgTime < 500 ? 'needs-improvement' : 'poor',
            timestamp: Date.now(),
            metadata: {
              count: times.length,
              max: maxTime,
            },
          });
        });
      });

      observer.observe({ entryTypes: ['resource'] });
      this.observers.push(observer);
    } catch (error) {
      if (this.config.debug) {
        console.error('[PerformanceMonitor] Error setting up resource observer:', error);
      }
    }
  }

  /**
   * Monitor long tasks that block the main thread
   */
  private monitorLongTasks(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            // Task longer than 50ms
            this.reportCustomMetric({
              metric: 'long-task',
              value: entry.duration,
              rating: entry.duration < 100 ? 'good' : entry.duration < 200 ? 'needs-improvement' : 'poor',
              timestamp: Date.now(),
              metadata: {
                startTime: entry.startTime,
                name: entry.name,
              },
            });

            if (this.config.debug) {
              console.warn(`[PerformanceMonitor] Long task detected: ${entry.duration}ms`);
            }
          }
        }
      });

      observer.observe({ entryTypes: ['longtask'] });
      this.observers.push(observer);
    } catch (error) {
      if (this.config.debug) {
        console.error('[PerformanceMonitor] Error setting up long task observer:', error);
      }
    }
  }

  /**
   * Track memory usage (Chrome only)
   */
  private trackMemoryUsage(): void {
    if ('memory' in performance) {
      const memory = (performance as any).memory;

      setInterval(() => {
        const usedMemory = memory.usedJSHeapSize / 1048576; // Convert to MB
        const totalMemory = memory.jsHeapSizeLimit / 1048576;

        this.reportCustomMetric({
          metric: 'memory-usage',
          value: usedMemory,
          rating: usedMemory < 50 ? 'good' : usedMemory < 100 ? 'needs-improvement' : 'poor',
          timestamp: Date.now(),
          metadata: {
            total: totalMemory,
            percentage: (usedMemory / totalMemory) * 100,
          },
        });
      }, 30000); // Check every 30 seconds
    }
  }

  /**
   * Get resource type from URL
   */
  private getResourceType(url: string): string {
    if (/\.(jpg|jpeg|png|gif|webp|avif|svg)$/i.test(url)) return 'image';
    if (/\.(js|mjs)$/i.test(url)) return 'script';
    if (/\.(css)$/i.test(url)) return 'style';
    if (/\.(woff|woff2|ttf|otf)$/i.test(url)) return 'font';
    if (/\/api\//i.test(url)) return 'api';
    return 'other';
  }

  /**
   * Get rating for a metric value
   */
  private getRating(
    metric: string,
    value: number
  ): 'good' | 'needs-improvement' | 'poor' {
    const threshold = THRESHOLDS[metric as keyof typeof THRESHOLDS];

    if (!threshold) return 'good';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.needsImprovement) return 'needs-improvement';
    return 'poor';
  }

  /**
   * Determine if we should track this user (sampling)
   */
  private shouldTrack(): boolean {
    return Math.random() < this.config.sampleRate!;
  }

  /**
   * Report metric to various destinations
   */
  private reportMetric(data: PerformanceData): void {
    // Console logging
    if (this.config.reportToConsole) {
      const emoji = data.rating === 'good' ? '✅' : data.rating === 'needs-improvement' ? '⚠️' : '❌';
      console.log(
        `[Performance] ${emoji} ${data.metric}: ${data.value.toFixed(2)}${
          data.metric === 'CLS' ? '' : 'ms'
        } (${data.rating})`
      );
    }

    // Analytics reporting
    if (this.config.reportToAnalytics && typeof window !== 'undefined') {
      this.sendToAnalytics(data);
    }
  }

  /**
   * Report custom metric
   */
  private reportCustomMetric(data: PerformanceData): void {
    this.metrics.set(data.metric, data);
    this.reportMetric(data);
  }

  /**
   * Send metrics to analytics
   */
  private sendToAnalytics(data: PerformanceData): void {
    // Google Analytics 4
    if ('gtag' in window) {
      (window as any).gtag('event', 'web_vitals', {
        metric_name: data.metric,
        metric_value: data.value,
        metric_rating: data.rating,
        ...data.metadata,
      });
    }

    // Custom analytics endpoint
    if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
      fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          url: window.location.href,
          userAgent: navigator.userAgent,
        }),
      }).catch((error) => {
        if (this.config.debug) {
          console.error('[PerformanceMonitor] Failed to send analytics:', error);
        }
      });
    }
  }

  /**
   * Get all collected metrics
   */
  public getMetrics(): Map<string, PerformanceData> {
    return new Map(this.metrics);
  }

  /**
   * Get specific metric
   */
  public getMetric(name: string): PerformanceData | undefined {
    return this.metrics.get(name);
  }

  /**
   * Get performance score (0-100)
   */
  public getPerformanceScore(): number {
    const weights = {
      LCP: 0.25,
      FID: 0.25,
      CLS: 0.25,
      INP: 0.25,
    };

    let score = 0;
    let totalWeight = 0;

    Object.entries(weights).forEach(([metric, weight]) => {
      const data = this.metrics.get(metric);
      if (data) {
        const metricScore = data.rating === 'good' ? 100 : data.rating === 'needs-improvement' ? 50 : 0;
        score += metricScore * weight;
        totalWeight += weight;
      }
    });

    return totalWeight > 0 ? Math.round(score / totalWeight) : 0;
  }

  /**
   * Clean up observers
   */
  public destroy(): void {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];
    this.metrics.clear();
  }
}

// Export singleton instance
let performanceMonitorInstance: PerformanceMonitor | null = null;

export function initializePerformanceMonitoring(config?: ObserverConfig): PerformanceMonitor {
  if (!performanceMonitorInstance && typeof window !== 'undefined') {
    performanceMonitorInstance = new PerformanceMonitor(config);
  }
  return performanceMonitorInstance!;
}

export function getPerformanceMonitor(): PerformanceMonitor | null {
  return performanceMonitorInstance;
}

export default PerformanceMonitor;