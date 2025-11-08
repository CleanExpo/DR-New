/**
 * Core Web Vitals Monitoring and Reporting
 * Tracks LCP, FID, CLS, TTFB, INP
 */

import type { Metric } from 'web-vitals';

interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: string;
}

// Thresholds for Core Web Vitals
const VITALS_THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  TTFB: { good: 800, poor: 1800 },
  INP: { good: 200, poor: 500 },
};

// Get rating based on thresholds
function getRating(
  name: string,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = VITALS_THRESHOLDS[name as keyof typeof VITALS_THRESHOLDS];
  if (!thresholds) return 'good';

  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.poor) return 'needs-improvement';
  return 'poor';
}

// Send to analytics
function sendToAnalytics(metric: WebVitalsMetric) {
  // Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      metric_rating: metric.rating,
      non_interaction: true,
    });
  }

  // Microsoft Clarity custom events
  if (typeof window !== 'undefined' && (window as any).clarity) {
    (window as any).clarity('set', metric.name, metric.value.toString());
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    const emoji = metric.rating === 'good' ? '✅' : metric.rating === 'needs-improvement' ? '⚠️' : '❌';
    console.log(
      `${emoji} ${metric.name}: ${Math.round(metric.value)}ms (${metric.rating})`
    );
  }
}

// Send to backend monitoring endpoint
async function sendToBackend(metric: WebVitalsMetric) {
  try {
    const endpoint = '/api/monitoring/web-vitals';

    await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...metric,
        url: window.location.pathname,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      }),
      keepalive: true, // Ensure request completes even if page unloads
    });
  } catch (error) {
    // Silently fail - don't impact user experience
    console.error('Failed to send metrics:', error);
  }
}

// Main Web Vitals reporter
export function reportWebVitals(metric: Metric) {
  const webVitalsMetric: WebVitalsMetric = {
    name: metric.name,
    value: metric.value,
    rating: getRating(metric.name, metric.value),
    delta: metric.delta,
    id: metric.id,
    navigationType: (metric as any).navigationType || 'navigate',
  };

  // Send to analytics immediately
  sendToAnalytics(webVitalsMetric);

  // Send to backend (don't await to avoid blocking)
  sendToBackend(webVitalsMetric);
}

// Initialize Web Vitals monitoring
export async function initWebVitals() {
  if (typeof window === 'undefined') return;

  try {
    const { onCLS, onFID, onLCP, onTTFB, onINP } = await import('web-vitals');

    // Monitor Core Web Vitals
    onCLS(reportWebVitals);
    onFID(reportWebVitals);
    onLCP(reportWebVitals);
    onTTFB(reportWebVitals);

    // INP (Interaction to Next Paint) - replaces FID
    if (onINP) {
      onINP(reportWebVitals);
    }
  } catch (error) {
    console.error('Failed to initialize Web Vitals:', error);
  }
}

// Performance observer for custom metrics
export class WebVitalsMonitor {
  private metrics: Map<string, number[]> = new Map();
  private observers: PerformanceObserver[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initObservers();
    }
  }

  private initObservers() {
    // LCP Observer
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.recordMetric('LCP', lastEntry.startTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(lcpObserver);
    } catch (e) {
      console.warn('LCP observer not supported');
    }

    // FID Observer
    try {
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fidEntry = entry as any;
          this.recordMetric('FID', fidEntry.processingStart - fidEntry.startTime);
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.push(fidObserver);
    } catch (e) {
      console.warn('FID observer not supported');
    }

    // CLS Observer
    try {
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const clsEntry = entry as any;
          if (!clsEntry.hadRecentInput) {
            this.recordMetric('CLS', clsEntry.value);
          }
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);
    } catch (e) {
      console.warn('CLS observer not supported');
    }
  }

  private recordMetric(name: string, value: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    this.metrics.get(name)!.push(value);
  }

  getMetrics() {
    const result: Record<string, any> = {};

    this.metrics.forEach((values, name) => {
      const sorted = [...values].sort((a, b) => a - b);
      result[name] = {
        current: values[values.length - 1],
        min: sorted[0],
        max: sorted[sorted.length - 1],
        avg: values.reduce((a, b) => a + b, 0) / values.length,
        p75: sorted[Math.floor(sorted.length * 0.75)],
        p95: sorted[Math.floor(sorted.length * 0.95)],
      };
    });

    return result;
  }

  disconnect() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.metrics.clear();
  }
}

// Export singleton instance
let monitor: WebVitalsMonitor | null = null;

export function getWebVitalsMonitor(): WebVitalsMonitor {
  if (!monitor && typeof window !== 'undefined') {
    monitor = new WebVitalsMonitor();
  }
  return monitor!;
}

// Utility to check if metrics are good
export function areWebVitalsGood(): Promise<boolean> {
  return new Promise((resolve) => {
    const monitor = getWebVitalsMonitor();

    setTimeout(() => {
      const metrics = monitor.getMetrics();

      const isGood =
        (!metrics.LCP || metrics.LCP.current <= VITALS_THRESHOLDS.LCP.good) &&
        (!metrics.FID || metrics.FID.current <= VITALS_THRESHOLDS.FID.good) &&
        (!metrics.CLS || metrics.CLS.current <= VITALS_THRESHOLDS.CLS.good);

      resolve(isGood);
    }, 3000); // Wait 3s for metrics to stabilize
  });
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
