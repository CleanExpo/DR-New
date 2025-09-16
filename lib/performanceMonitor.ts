/**
 * Performance Monitoring System for Disaster Recovery Brisbane
 * Tracks Core Web Vitals and custom metrics
 */

// Core Web Vitals thresholds
const THRESHOLDS = {
  FCP: { good: 1800, poor: 3000 },      // First Contentful Paint
  LCP: { good: 2500, poor: 4000 },      // Largest Contentful Paint
  FID: { good: 100, poor: 300 },        // First Input Delay
  CLS: { good: 0.1, poor: 0.25 },       // Cumulative Layout Shift
  TTFB: { good: 800, poor: 1800 },      // Time to First Byte
  INP: { good: 200, poor: 500 },        // Interaction to Next Paint
};

// Performance data collection
class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map();
  private observer: PerformanceObserver | null = null;
  private reportCallback: ((metrics: any) => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private init() {
    // Track page load metrics
    this.trackPageLoad();

    // Track Core Web Vitals
    this.trackWebVitals();

    // Track resource loading
    this.trackResources();

    // Track custom metrics
    this.trackCustomMetrics();

    // Setup visibility change tracking
    this.trackVisibilityChange();

    // Report metrics periodically
    this.setupPeriodicReporting();
  }

  // Track page load performance
  private trackPageLoad() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      window.addEventListener('load', () => {
        const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

        if (navigationTiming) {
          // TTFB
          const ttfb = navigationTiming.responseStart - navigationTiming.requestStart;
          this.addMetric('TTFB', ttfb);

          // DOM Content Loaded
          const dcl = navigationTiming.domContentLoadedEventEnd - navigationTiming.domContentLoadedEventStart;
          this.addMetric('DCL', dcl);

          // Load Complete
          const loadComplete = navigationTiming.loadEventEnd - navigationTiming.loadEventStart;
          this.addMetric('LoadComplete', loadComplete);

          // Total Page Load Time
          const totalPageLoad = navigationTiming.loadEventEnd - navigationTiming.fetchStart;
          this.addMetric('TotalPageLoad', totalPageLoad);

          console.log('[Performance] Page Load Metrics:', {
            TTFB: `${ttfb.toFixed(2)}ms`,
            DCL: `${dcl.toFixed(2)}ms`,
            LoadComplete: `${loadComplete.toFixed(2)}ms`,
            TotalPageLoad: `${totalPageLoad.toFixed(2)}ms`,
          });
        }
      });
    }
  }

  // Track Core Web Vitals
  private trackWebVitals() {
    if (!('PerformanceObserver' in window)) return;

    // Largest Contentful Paint
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        const lcp = lastEntry.renderTime || lastEntry.loadTime;
        this.addMetric('LCP', lcp);
        this.evaluateMetric('LCP', lcp);
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      console.error('[Performance] LCP observer failed:', e);
    }

    // First Input Delay
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          const fid = entry.processingStart - entry.startTime;
          this.addMetric('FID', fid);
          this.evaluateMetric('FID', fid);
        });
      });
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (e) {
      console.error('[Performance] FID observer failed:', e);
    }

    // Cumulative Layout Shift
    let clsValue = 0;
    let clsEntries: any[] = [];
    try {
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const e = entry as any;
          if (!e.hadRecentInput) {
            clsValue += e.value;
            clsEntries.push(e);
          }
        }
        this.addMetric('CLS', clsValue);
        this.evaluateMetric('CLS', clsValue);
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      console.error('[Performance] CLS observer failed:', e);
    }

    // First Contentful Paint
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.name === 'first-contentful-paint') {
            this.addMetric('FCP', entry.startTime);
            this.evaluateMetric('FCP', entry.startTime);
          }
        });
      });
      fcpObserver.observe({ type: 'paint', buffered: true });
    } catch (e) {
      console.error('[Performance] FCP observer failed:', e);
    }

    // Interaction to Next Paint (INP)
    try {
      const inpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          const inp = entry.duration;
          this.addMetric('INP', inp);
          this.evaluateMetric('INP', inp);
        });
      });
      inpObserver.observe({ type: 'event', buffered: true });
    } catch (e) {
      // INP might not be supported in all browsers
    }
  }

  // Track resource loading performance
  private trackResources() {
    if (!('PerformanceObserver' in window)) return;

    try {
      const resourceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          const duration = entry.responseEnd - entry.startTime;

          // Track by resource type
          if (entry.initiatorType === 'img') {
            this.addMetric('ImageLoadTime', duration);
          } else if (entry.initiatorType === 'script') {
            this.addMetric('ScriptLoadTime', duration);
          } else if (entry.initiatorType === 'css') {
            this.addMetric('CSSLoadTime', duration);
          } else if (entry.initiatorType === 'fetch' || entry.initiatorType === 'xmlhttprequest') {
            this.addMetric('APICallTime', duration);
          }

          // Warn about slow resources
          if (duration > 3000) {
            console.warn('[Performance] Slow resource:', {
              url: entry.name,
              duration: `${duration.toFixed(2)}ms`,
              type: entry.initiatorType,
            });
          }
        });
      });
      resourceObserver.observe({ type: 'resource', buffered: true });
    } catch (e) {
      console.error('[Performance] Resource observer failed:', e);
    }
  }

  // Track custom business metrics
  private trackCustomMetrics() {
    // Time to Interactive
    if ('performance' in window) {
      const measureTTI = () => {
        const tti = performance.now();
        this.addMetric('TTI', tti);
        console.log('[Performance] Time to Interactive:', `${tti.toFixed(2)}ms`);
      };

      if (document.readyState === 'complete') {
        measureTTI();
      } else {
        window.addEventListener('load', measureTTI);
      }
    }

    // Track emergency button visibility
    const trackEmergencyButton = () => {
      const emergencyButton = document.querySelector('.emergency-phone');
      if (emergencyButton) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const timeToVisible = performance.now();
                this.addMetric('EmergencyButtonVisible', timeToVisible);
                console.log('[Performance] Emergency button visible:', `${timeToVisible.toFixed(2)}ms`);
                observer.disconnect();
              }
            });
          },
          { threshold: 0.5 }
        );
        observer.observe(emergencyButton);
      }
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', trackEmergencyButton);
    } else {
      trackEmergencyButton();
    }
  }

  // Track page visibility changes
  private trackVisibilityChange() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // Page hidden - pause heavy operations
        this.addMetric('PageHidden', performance.now());
      } else {
        // Page visible - resume operations
        this.addMetric('PageVisible', performance.now());
      }
    });
  }

  // Add metric value
  private addMetric(name: string, value: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    this.metrics.get(name)!.push(value);
  }

  // Evaluate metric against thresholds
  private evaluateMetric(name: string, value: number) {
    const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
    if (!threshold) return;

    let rating: 'good' | 'needs-improvement' | 'poor';
    if (value <= threshold.good) {
      rating = 'good';
    } else if (value <= threshold.poor) {
      rating = 'needs-improvement';
    } else {
      rating = 'poor';
    }

    console.log(`[Performance] ${name}: ${value.toFixed(2)}ms (${rating})`);

    // Send to analytics if poor
    if (rating === 'poor') {
      this.reportPoorMetric(name, value);
    }
  }

  // Report poor metric
  private reportPoorMetric(name: string, value: number) {
    // Send to monitoring service
    if (typeof window !== 'undefined' && 'navigator' in window && 'sendBeacon' in navigator) {
      const data = JSON.stringify({
        metric: name,
        value: value,
        url: window.location.href,
        timestamp: Date.now(),
      });

      navigator.sendBeacon('/api/performance', data);
    }
  }

  // Setup periodic reporting
  private setupPeriodicReporting() {
    // Report every 30 seconds
    setInterval(() => {
      this.reportMetrics();
    }, 30000);

    // Report on page unload
    window.addEventListener('beforeunload', () => {
      this.reportMetrics();
    });
  }

  // Get aggregated metrics
  public getMetrics() {
    const aggregated: any = {};

    this.metrics.forEach((values, name) => {
      if (values.length > 0) {
        aggregated[name] = {
          count: values.length,
          min: Math.min(...values),
          max: Math.max(...values),
          avg: values.reduce((a, b) => a + b, 0) / values.length,
          median: this.getMedian(values),
          p75: this.getPercentile(values, 75),
          p95: this.getPercentile(values, 95),
          p99: this.getPercentile(values, 99),
        };
      }
    });

    return aggregated;
  }

  // Calculate median
  private getMedian(values: number[]): number {
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  }

  // Calculate percentile
  private getPercentile(values: number[], percentile: number): number {
    const sorted = [...values].sort((a, b) => a - b);
    const index = Math.ceil((percentile / 100) * sorted.length) - 1;
    return sorted[index];
  }

  // Report metrics
  private reportMetrics() {
    const metrics = this.getMetrics();
    console.log('[Performance] Aggregated Metrics:', metrics);

    if (this.reportCallback) {
      this.reportCallback(metrics);
    }

    // Send to analytics
    if (typeof window !== 'undefined' && 'navigator' in window && 'sendBeacon' in navigator) {
      navigator.sendBeacon('/api/performance/aggregate', JSON.stringify(metrics));
    }
  }

  // Set custom reporting callback
  public onReport(callback: (metrics: any) => void) {
    this.reportCallback = callback;
  }

  // Manual timing API
  public startTiming(label: string) {
    if ('performance' in window && 'mark' in performance) {
      performance.mark(`${label}-start`);
    }
  }

  public endTiming(label: string) {
    if ('performance' in window && 'mark' in performance && 'measure' in performance) {
      performance.mark(`${label}-end`);
      try {
        performance.measure(label, `${label}-start`, `${label}-end`);
        const measure = performance.getEntriesByName(label)[0];
        if (measure) {
          this.addMetric(label, measure.duration);
          console.log(`[Performance] ${label}: ${measure.duration.toFixed(2)}ms`);
        }
      } catch (e) {
        console.error(`[Performance] Failed to measure ${label}:`, e);
      }
    }
  }

  // Resource timing buffer management
  public clearResourceTimings() {
    if ('performance' in window && 'clearResourceTimings' in performance) {
      performance.clearResourceTimings();
    }
  }

  // Get network information
  public getNetworkInfo() {
    if ('navigator' in window && 'connection' in navigator) {
      const connection = (navigator as any).connection;
      return {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData,
      };
    }
    return null;
  }

  // Memory usage (Chrome only)
  public getMemoryInfo() {
    if ('performance' in window && 'memory' in performance) {
      const memory = (performance as any).memory;
      return {
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit,
      };
    }
    return null;
  }
}

// Export singleton instance
export const performanceMonitor = typeof window !== 'undefined' ? new PerformanceMonitor() : null;

// Export utility functions
export const startTiming = (label: string) => performanceMonitor?.startTiming(label);
export const endTiming = (label: string) => performanceMonitor?.endTiming(label);
export const getMetrics = () => performanceMonitor?.getMetrics() || {};
export const getNetworkInfo = () => performanceMonitor?.getNetworkInfo() || null;
export const getMemoryInfo = () => performanceMonitor?.getMemoryInfo() || null;