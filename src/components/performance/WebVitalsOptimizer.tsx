'use client';

import { useEffect } from 'react';
import { onCLS, onFCP, onFID, onLCP, onTTFB, onINP } from 'web-vitals';

interface WebVitalsData {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

/**
 * Core Web Vitals Optimizer
 * Monitors and optimizes:
 * - LCP (Largest Contentful Paint) < 2.5s
 * - FID (First Input Delay) < 100ms
 * - CLS (Cumulative Layout Shift) < 0.1
 * - FCP (First Contentful Paint) < 1.8s
 * - TTFB (Time to First Byte) < 0.8s
 * - INP (Interaction to Next Paint) < 200ms
 */
export const WebVitalsOptimizer = () => {
  useEffect(() => {
    // Send metrics to analytics
    const sendToAnalytics = (metric: WebVitalsData) => {
      // Send to Google Analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', metric.name, {
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          metric_id: metric.id,
          metric_value: metric.value,
          metric_delta: metric.delta,
          metric_rating: metric.rating,
          non_interaction: true
        });
      }

      // Log performance issues
      if (metric.rating === 'poor') {
        console.warn(`Poor ${metric.name} performance:`, metric.value);

        // Apply runtime optimizations for poor metrics
        applyRuntimeOptimizations(metric);
      }

      // Send to custom monitoring endpoint
      if (process.env.NODE_ENV === 'production') {
        fetch('/api/vitals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...metric,
            url: window.location.href,
            timestamp: Date.now()
          })
        }).catch(() => {
          // Silent fail for analytics
        });
      }
    };

    // Apply runtime optimizations based on poor metrics
    const applyRuntimeOptimizations = (metric: WebVitalsData) => {
      switch (metric.name) {
        case 'CLS':
          // Fix layout shifts
          fixLayoutShifts();
          break;
        case 'LCP':
          // Optimize largest content
          optimizeLCP();
          break;
        case 'FID':
        case 'INP':
          // Optimize JavaScript execution
          optimizeJavaScript();
          break;
        case 'TTFB':
          // Cache optimization
          optimizeCaching();
          break;
      }
    };

    // Fix common CLS issues
    const fixLayoutShifts = () => {
      // Add dimensions to images without them
      document.querySelectorAll('img:not([width]):not([height])').forEach((img) => {
        const htmlImg = img as HTMLImageElement;
        if (htmlImg.naturalWidth && htmlImg.naturalHeight) {
          htmlImg.width = htmlImg.naturalWidth;
          htmlImg.height = htmlImg.naturalHeight;
        }
      });

      // Add font-display to font-face rules
      const styleSheets = Array.from(document.styleSheets);
      styleSheets.forEach(sheet => {
        try {
          const rules = Array.from(sheet.cssRules || []);
          rules.forEach(rule => {
            if (rule instanceof CSSFontFaceRule) {
              rule.style.fontDisplay = 'swap';
            }
          });
        } catch (e) {
          // Cross-origin stylesheets will throw
        }
      });

      // Reserve space for async content
      document.querySelectorAll('[data-async-height]').forEach((el) => {
        const element = el as HTMLElement;
        const height = element.dataset.asyncHeight;
        if (height) {
          element.style.minHeight = height;
        }
      });
    };

    // Optimize LCP element
    const optimizeLCP = () => {
      // Find LCP element (usually hero image or text)
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;

        if (lastEntry.element) {
          // Prioritize LCP element loading
          if (lastEntry.element.tagName === 'IMG') {
            const img = lastEntry.element as HTMLImageElement;
            img.loading = 'eager';
            img.fetchPriority = 'high';

            // Preload the image
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = img.src;
            document.head.appendChild(link);
          }
        }
      });

      try {
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // LCP observer not supported
      }
    };

    // Optimize JavaScript execution
    const optimizeJavaScript = () => {
      // Defer non-critical scripts
      document.querySelectorAll('script:not([defer]):not([async])').forEach((script) => {
        const htmlScript = script as HTMLScriptElement;
        if (!htmlScript.src.includes('critical')) {
          htmlScript.defer = true;
        }
      });

      // Use requestIdleCallback for non-critical work
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          // Load non-critical components
          import('../LazyComponents');
        });
      }
    };

    // Optimize caching
    const optimizeCaching = () => {
      // Prefetch likely navigation targets
      const links = document.querySelectorAll('a[href^="/"]');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const link = entry.target as HTMLAnchorElement;
            const prefetchLink = document.createElement('link');
            prefetchLink.rel = 'prefetch';
            prefetchLink.href = link.href;
            document.head.appendChild(prefetchLink);
            observer.unobserve(link);
          }
        });
      });

      links.forEach(link => observer.observe(link));
    };

    // Resource hints for faster loading
    const addResourceHints = () => {
      // DNS prefetch for external domains
      const domains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://www.google-analytics.com',
        'https://www.googletagmanager.com'
      ];

      domains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = domain;
        document.head.appendChild(link);
      });

      // Preconnect to critical origins
      const preconnectDomains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com'
      ];

      preconnectDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
    };

    // Initialize resource hints
    addResourceHints();

    // Set up Web Vitals monitoring
    onCLS(sendToAnalytics);
    onFCP(sendToAnalytics);
    onFID(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
    onINP(sendToAnalytics);

    // Monitor long tasks that block main thread
    if ('PerformanceObserver' in window) {
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 50) {
              console.warn('Long task detected:', {
                duration: entry.duration,
                startTime: entry.startTime,
                name: entry.name
              });
            }
          }
        });

        longTaskObserver.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        // Long task observer not supported
      }
    }

    // Optimize animations for better performance
    const optimizeAnimations = () => {
      // Use CSS transforms instead of position changes
      const animatedElements = document.querySelectorAll('[data-animate]');
      animatedElements.forEach(el => {
        const element = el as HTMLElement;
        element.style.willChange = 'transform';
        element.style.transform = 'translateZ(0)'; // Enable GPU acceleration
      });

      // Reduce animation complexity on low-end devices
      if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
        document.documentElement.classList.add('reduce-motion');
      }
    };

    optimizeAnimations();

    // Clean up on unmount
    return () => {
      // Cleanup code if needed
    };
  }, []);

  return null; // This component doesn't render anything
};

// Declare gtag on window
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default WebVitalsOptimizer;