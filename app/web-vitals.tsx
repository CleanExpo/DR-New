/**
 * Web Vitals Client Component
 * Must be imported and used in layout.tsx as a client component
 */

'use client';

import { useEffect } from 'react';
import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Send to analytics
    if (window.gtag) {
      window.gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        non_interaction: true,
      });
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vital:', metric);
    }

    // Send to monitoring endpoint
    fetch('/api/monitoring/web-vitals', {
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
    }).catch(() => {
      // Silently fail
    });
  });

  // Initialize web vitals library
  useEffect(() => {
    const initWebVitals = async () => {
      try {
        const { onCLS, onFID, onLCP, onTTFB, onINP } = await import('web-vitals');

        const sendMetric = (metric: any) => {
          const rating =
            metric.value <= (metric.name === 'CLS' ? 0.1 : metric.name === 'FID' || metric.name === 'INP' ? 100 : metric.name === 'LCP' ? 2500 : 800)
              ? 'good'
              : metric.value <= (metric.name === 'CLS' ? 0.25 : metric.name === 'FID' || metric.name === 'INP' ? 300 : metric.name === 'LCP' ? 4000 : 1800)
              ? 'needs-improvement'
              : 'poor';

          if (process.env.NODE_ENV === 'development') {
            const emoji = rating === 'good' ? '✅' : rating === 'needs-improvement' ? '⚠️' : '❌';
            console.log(`${emoji} ${metric.name}: ${Math.round(metric.value)}${metric.name === 'CLS' ? '' : 'ms'} (${rating})`);
          }
        };

        onCLS(sendMetric);
        onFID(sendMetric);
        onLCP(sendMetric);
        onTTFB(sendMetric);
        if (onINP) {onINP(sendMetric);}
      } catch (error) {
        console.error('Failed to initialize Web Vitals:', error);
      }
    };

    initWebVitals();
  }, []);

  return null;
}

export default WebVitals;
