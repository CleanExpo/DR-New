'use client';

import { useEffect } from 'react';
import { initializePerformanceMonitoring } from '@/lib/performance/performanceMonitor';

/**
 * Performance Wrapper Component
 * Initializes performance monitoring and optimizations
 */
export function PerformanceWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize performance monitoring
    const monitor = initializePerformanceMonitoring({
      reportToAnalytics: true,
      reportToConsole: process.env.NODE_ENV === 'development',
      sampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1,
      debug: process.env.NODE_ENV === 'development',
    });

    // Register service worker for caching
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('[SW] Service Worker registered:', registration.scope);

            // Check for updates periodically
            setInterval(() => {
              registration.update();
            }, 60000); // Check every minute
          })
          .catch((error) => {
            console.error('[SW] Service Worker registration failed:', error);
          });
      });
    }

    // Preload critical resources
    const preloadResources = () => {
      // Preload fonts
      const fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.as = 'font';
      fontLink.href = '/fonts/inter-var.woff2';
      fontLink.type = 'font/woff2';
      fontLink.crossOrigin = 'anonymous';
      document.head.appendChild(fontLink);

      // Preconnect to external domains
      const domains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://www.googletagmanager.com',
      ];

      domains.forEach((domain) => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        document.head.appendChild(link);
      });
    };

    // Resource hints for faster loading
    const addResourceHints = () => {
      // DNS prefetch for external resources
      const dnsPrefetchDomains = [
        'https://www.google-analytics.com',
        'https://vitals.vercel-analytics.com',
      ];

      dnsPrefetchDomains.forEach((domain) => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = domain;
        document.head.appendChild(link);
      });

      // Prefetch next page resources
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          // Prefetch common next pages
          const nextPages = ['/services/water-damage', '/contact'];
          nextPages.forEach((page) => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = page;
            document.head.appendChild(link);
          });
        });
      }
    };

    // Lazy load images below the fold
    const setupLazyLoading = () => {
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const img = entry.target as HTMLImageElement;
                const src = img.dataset.src;
                if (src) {
                  img.src = src;
                  img.removeAttribute('data-src');
                  imageObserver.unobserve(img);
                }
              }
            });
          },
          {
            rootMargin: '50px 0px',
            threshold: 0.01,
          }
        );

        // Observe all images with data-src
        document.querySelectorAll('img[data-src]').forEach((img) => {
          imageObserver.observe(img);
        });
      }
    };

    // Progressive enhancement for smooth scrolling
    const setupSmoothScrolling = () => {
      if (!('scrollBehavior' in document.documentElement.style)) {
        // Polyfill smooth scrolling for older browsers
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
          anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(
              (e.currentTarget as HTMLAnchorElement).getAttribute('href') || ''
            );
            if (target) {
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          });
        });
      }
    };

    // Optimize third-party scripts
    const optimizeThirdPartyScripts = () => {
      // Load Google Analytics after page load
      if (typeof window !== 'undefined' && window.gtag) {
        window.addEventListener('load', () => {
          // GA is already loaded via next/script
        });
      }
    };

    // Execute optimizations
    preloadResources();
    addResourceHints();

    // Run after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setupLazyLoading();
        setupSmoothScrolling();
        optimizeThirdPartyScripts();
      });
    } else {
      setupLazyLoading();
      setupSmoothScrolling();
      optimizeThirdPartyScripts();
    }

    // Cleanup
    return () => {
      if (monitor) {
        monitor.destroy();
      }
    };
  }, []);

  // Add performance marks for debugging
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      performance.mark('app-wrapper-mounted');

      // Log performance metrics in development
      const logMetrics = () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          console.log('[Performance] Navigation Timing:', {
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
            loadComplete: navigation.loadEventEnd - navigation.fetchStart,
            firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime,
            firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
          });
        }
      };

      if (document.readyState === 'complete') {
        logMetrics();
      } else {
        window.addEventListener('load', logMetrics);
      }
    }
  }, []);

  return <>{children}</>;
}