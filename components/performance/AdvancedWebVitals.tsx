'use client';

import { useEffect } from 'react';

interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  entries: PerformanceEntry[];
}

// Thresholds for Web Vitals (in milliseconds)
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
  INP: { good: 200, poor: 500 },
};

function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
  if (!threshold) {return 'good';}

  if (value <= threshold.good) {return 'good';}
  if (value <= threshold.poor) {return 'needs-improvement';}
  return 'poor';
}

function sendToAnalytics(metric: WebVitalsMetric) {
  // Send to Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
      metric_rating: metric.rating,
      non_interaction: true,
    });
  }

  // Send to custom analytics endpoint
  if (process.env.NODE_ENV === 'production') {
    fetch('/api/analytics/vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        metric: metric.name,
        value: metric.value,
        rating: metric.rating,
        id: metric.id,
        url: window.location.pathname,
        timestamp: Date.now(),
      }),
    }).catch((error) => {
      console.error('Failed to send Web Vitals to analytics:', error);
    });
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      id: metric.id,
    });
  }
}

export function AdvancedWebVitals() {
  useEffect(() => {
    if (typeof window === 'undefined') {return;}

    // Import web-vitals library dynamically
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB, onINP }) => {
      // Cumulative Layout Shift
      onCLS((metric) => {
        sendToAnalytics({
          ...metric,
          rating: getRating('CLS', metric.value),
        } as WebVitalsMetric);
      });

      // First Input Delay
      onFID((metric) => {
        sendToAnalytics({
          ...metric,
          rating: getRating('FID', metric.value),
        } as WebVitalsMetric);
      });

      // First Contentful Paint
      onFCP((metric) => {
        sendToAnalytics({
          ...metric,
          rating: getRating('FCP', metric.value),
        } as WebVitalsMetric);
      });

      // Largest Contentful Paint
      onLCP((metric) => {
        sendToAnalytics({
          ...metric,
          rating: getRating('LCP', metric.value),
        } as WebVitalsMetric);
      });

      // Time to First Byte
      onTTFB((metric) => {
        sendToAnalytics({
          ...metric,
          rating: getRating('TTFB', metric.value),
        } as WebVitalsMetric);
      });

      // Interaction to Next Paint
      onINP((metric) => {
        sendToAnalytics({
          ...metric,
          rating: getRating('INP', metric.value),
        } as WebVitalsMetric);
      });
    }).catch((error) => {
      console.error('Failed to load web-vitals:', error);
    });

    // Additional performance metrics
    if ('PerformanceObserver' in window) {
      // Long Tasks
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 50) {
              console.warn('[Performance] Long task detected:', {
                duration: entry.duration,
                startTime: entry.startTime,
              });

              // Send to analytics
              if (typeof window.gtag !== 'undefined') {
                window.gtag('event', 'long_task', {
                  event_category: 'Performance',
                  event_label: 'Long Task',
                  value: Math.round(entry.duration),
                  non_interaction: true,
                });
              }
            }
          }
        });

        longTaskObserver.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        // Long task API not supported
      }

      // Resource Timing
      try {
        const resourceObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const resourceEntry = entry as PerformanceResourceTiming;

            // Check for slow resources
            if (resourceEntry.duration > 1000) {
              console.warn('[Performance] Slow resource detected:', {
                name: resourceEntry.name,
                duration: resourceEntry.duration,
                size: resourceEntry.transferSize,
              });
            }

            // Check for large resources
            if (resourceEntry.transferSize > 500000) {
              console.warn('[Performance] Large resource detected:', {
                name: resourceEntry.name,
                size: resourceEntry.transferSize,
              });
            }
          }
        });

        resourceObserver.observe({ entryTypes: ['resource'] });
      } catch (e) {
        // Resource timing API not supported
      }

      // Navigation Timing
      try {
        const navigationObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const navEntry = entry as PerformanceNavigationTiming;

            // Calculate timing metrics
            const metrics = {
              dns: navEntry.domainLookupEnd - navEntry.domainLookupStart,
              tcp: navEntry.connectEnd - navEntry.connectStart,
              ttfb: navEntry.responseStart - navEntry.requestStart,
              download: navEntry.responseEnd - navEntry.responseStart,
              domInteractive: navEntry.domInteractive - navEntry.fetchStart,
              domComplete: navEntry.domComplete - navEntry.fetchStart,
              loadComplete: navEntry.loadEventEnd - navEntry.fetchStart,
            };

            console.log('[Performance] Navigation timing:', metrics);

            // Send to analytics
            if (typeof window.gtag !== 'undefined') {
              Object.entries(metrics).forEach(([key, value]) => {
                window.gtag('event', `navigation_${key}`, {
                  event_category: 'Navigation Timing',
                  event_label: key,
                  value: Math.round(value),
                  non_interaction: true,
                });
              });
            }
          }
        });

        navigationObserver.observe({ entryTypes: ['navigation'] });
      } catch (e) {
        // Navigation timing API not supported
      }
    }

    // Monitor memory usage (if available)
    if ('memory' in performance) {
      const checkMemory = () => {
        const memory = (performance as any).memory;
        if (memory) {
          const usedMemoryMB = memory.usedJSHeapSize / 1048576;
          const totalMemoryMB = memory.jsHeapSizeLimit / 1048576;
          const memoryUsagePercent = (usedMemoryMB / totalMemoryMB) * 100;

          if (memoryUsagePercent > 90) {
            console.warn('[Performance] High memory usage:', {
              used: `${usedMemoryMB.toFixed(2)} MB`,
              total: `${totalMemoryMB.toFixed(2)} MB`,
              percent: `${memoryUsagePercent.toFixed(2)}%`,
            });
          }
        }
      };

      // Check memory every 30 seconds
      const memoryInterval = setInterval(checkMemory, 30000);

      return () => clearInterval(memoryInterval);
    }
  }, []);

  return null;
}

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params: Record<string, any>
    ) => void;
  }
}

export default AdvancedWebVitals;