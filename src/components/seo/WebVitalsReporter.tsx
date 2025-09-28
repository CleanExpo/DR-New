'use client';

import { useEffect } from 'react';
import { getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals';

// Reports Core Web Vitals to Google Analytics for SEO monitoring
export function WebVitalsReporter() {
  useEffect(() => {
    const sendToAnalytics = (metric: any) => {
      // Send to Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          non_interaction: true,
        });
      }

      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Web Vital] ${metric.name}:`, metric.value);

        // Provide performance insights
        const thresholds: Record<string, { good: number; needsImprovement: number }> = {
          CLS: { good: 0.1, needsImprovement: 0.25 },
          FCP: { good: 1800, needsImprovement: 3000 },
          FID: { good: 100, needsImprovement: 300 },
          LCP: { good: 2500, needsImprovement: 4000 },
          TTFB: { good: 800, needsImprovement: 1800 }
        };

        const threshold = thresholds[metric.name];
        if (threshold) {
          const value = metric.name === 'CLS' ? metric.value : metric.value;
          let rating = 'Poor';

          if (value <= threshold.good) {
            rating = 'Good';
          } else if (value <= threshold.needsImprovement) {
            rating = 'Needs Improvement';
          }

          console.log(`[Web Vital Rating] ${metric.name}: ${rating}`);
        }
      }

      // Send to custom monitoring endpoint
      if (process.env.NEXT_PUBLIC_MONITORING_ENDPOINT) {
        fetch(process.env.NEXT_PUBLIC_MONITORING_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            metric: metric.name,
            value: metric.value,
            id: metric.id,
            url: window.location.href,
            timestamp: new Date().toISOString()
          })
        }).catch(console.error);
      }
    };

    // Measure all Core Web Vitals
    getCLS(sendToAnalytics);
    getFCP(sendToAnalytics);
    getFID(sendToAnalytics);
    getLCP(sendToAnalytics);
    getTTFB(sendToAnalytics);

    // Additional performance metrics
    if (typeof window !== 'undefined' && window.performance) {
      // First Input Delay alternative for better browser support
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'first-input') {
            const delay = entry.processingStart - entry.startTime;
            sendToAnalytics({
              name: 'FID_OBSERVED',
              value: delay,
              id: 'first-input-delay'
            });
          }
        }
      });

      try {
        observer.observe({ type: 'first-input', buffered: true });
      } catch (e) {
        // First Input observer not supported
      }

      // Time to Interactive
      if (window.performance.timing) {
        const tti = window.performance.timing.domInteractive - window.performance.timing.navigationStart;
        sendToAnalytics({
          name: 'TTI',
          value: tti,
          id: 'time-to-interactive'
        });
      }
    }
  }, []);

  return null;
}