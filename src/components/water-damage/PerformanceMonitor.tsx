'use client';

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Report Web Vitals
    if ('web-vital' in window) {
      const reportWebVitals = (metric: any) => {
        // Send to analytics
        console.log(metric);
      };

      // @ts-ignore
      window['web-vital'].getCLS(reportWebVitals);
      // @ts-ignore
      window['web-vital'].getFID(reportWebVitals);
      // @ts-ignore
      window['web-vital'].getLCP(reportWebVitals);
    }

    // Optimize font loading
    if ('fonts' in document) {
      // @ts-ignore
      document.fonts.ready.then(() => {
        document.body.classList.add('fonts-loaded');
      });
    }

    // Preload critical resources
    const preloadLink = (href: string, as: string) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      if (as === 'font') {
        link.crossOrigin = 'anonymous';
      }
      document.head.appendChild(link);
    };

    // Resource hints for faster navigation
    const prefetchLink = (href: string) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
    };

    // Prefetch likely next pages
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const link = entry.target as HTMLAnchorElement;
            if (link.href && !link.dataset.prefetched) {
              prefetchLink(link.href);
              link.dataset.prefetched = 'true';
            }
          }
        });
      },
      { rootMargin: '0px 0px 50px 0px' }
    );

    // Observe all internal links
    document.querySelectorAll('a[href^="/"]').forEach((link) => {
      observer.observe(link);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}