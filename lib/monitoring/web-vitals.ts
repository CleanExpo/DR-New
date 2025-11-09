/**
 * Core Web Vitals Tracking with Database Persistence
 * Production-grade implementation for Disaster Recovery Brisbane
 */

import type { Metric } from 'web-vitals';

interface WebVitalData {
  metricName: string;
  value: number;
  rating: string;
  page: string;
  deviceType: string;
  timestamp: string;
}

/**
 * Get device type based on viewport width
 */
function getDeviceType(): string {
  if (typeof window === 'undefined') return 'unknown';

  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

/**
 * Persist Web Vital to database
 */
async function persistWebVital(data: WebVitalData): Promise<void> {
  try {
    await fetch('/api/monitoring/web-vitals/persist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      keepalive: true,
    });
  } catch (error) {
    // Fail silently - don't impact user experience
    if (process.env.NODE_ENV === 'development') {
      console.error('[Web Vitals] Failed to persist:', error);
    }
  }
}

/**
 * Send Web Vital to analytics endpoint (in-memory)
 */
async function sendToAnalytics(metric: Metric): Promise<void> {
  try {
    await fetch('/api/monitoring/web-vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
        url: window.location.pathname,
        timestamp: new Date().toISOString(),
      }),
      keepalive: true,
    });
  } catch (error) {
    // Fail silently
    if (process.env.NODE_ENV === 'development') {
      console.error('[Web Vitals] Failed to send to analytics:', error);
    }
  }
}

/**
 * Track Core Web Vitals with dual persistence
 */
export async function trackWebVitals(): Promise<void> {
  if (typeof window === 'undefined') return;

  try {
    const { onCLS, onLCP, onFCP, onINP, onTTFB } = await import('web-vitals');

    const handleMetric = (metric: Metric) => {
      // Log in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Web Vitals] ${metric.name}:`, {
          value: metric.value,
          rating: metric.rating,
          page: window.location.pathname,
        });
      }

      // Send to in-memory analytics
      sendToAnalytics(metric);

      // Persist to database (10% sample rate in production)
      const sampleRate = process.env.NODE_ENV === 'production' ? 0.1 : 1.0;
      if (Math.random() < sampleRate) {
        persistWebVital({
          metricName: metric.name,
          value: metric.value,
          rating: metric.rating || 'unknown',
          page: window.location.pathname,
          deviceType: getDeviceType(),
          timestamp: new Date().toISOString(),
        });
      }
    };

    // Register all Core Web Vitals
    onCLS(handleMetric);
    onLCP(handleMetric);
    onFCP(handleMetric);
    if (onINP) onINP(handleMetric);
    onTTFB(handleMetric);

    console.log('[Web Vitals] Tracking initialized');
  } catch (error) {
    console.error('[Web Vitals] Failed to initialize:', error);
  }
}

/**
 * Get Web Vitals performance rating
 */
export function getPerformanceRating(metricName: string, value: number): string {
  const thresholds: Record<string, { good: number; poor: number }> = {
    LCP: { good: 2500, poor: 4000 },
    FID: { good: 100, poor: 300 },
    CLS: { good: 0.1, poor: 0.25 },
    TTFB: { good: 800, poor: 1800 },
    INP: { good: 200, poor: 500 },
    FCP: { good: 1800, poor: 3000 },
  };

  const threshold = thresholds[metricName];
  if (!threshold) return 'unknown';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Check if metric exceeds critical threshold
 */
export function isCriticalMetric(metricName: string, value: number): boolean {
  const criticalThresholds: Record<string, number> = {
    LCP: 5000,
    FID: 500,
    CLS: 0.5,
    TTFB: 3000,
    INP: 1000,
    FCP: 4000,
  };

  const threshold = criticalThresholds[metricName];
  return threshold ? value > threshold : false;
}
