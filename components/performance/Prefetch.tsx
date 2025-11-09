'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Critical navigation paths for disaster recovery service
const PREFETCH_ROUTES = {
  // From homepage, likely to visit:
  '/': [
    '/services/water-damage',
    '/services/fire-damage',
    '/emergency',
    '/contact',
    '/locations',
  ],

  // From services, likely to visit:
  '/services': [
    '/services/water-damage',
    '/services/fire-damage',
    '/services/mould-remediation',
    '/emergency',
    '/contact',
  ],

  // From any service page, likely to visit:
  '/services/water-damage': ['/emergency', '/contact', '/services/fire-damage', '/locations'],
  '/services/fire-damage': ['/emergency', '/contact', '/services/water-damage', '/locations'],
  '/services/mould-remediation': ['/emergency', '/contact', '/services/water-damage', '/locations'],
  '/services/storm-damage': ['/emergency', '/contact', '/services/water-damage', '/locations'],

  // From emergency, likely to convert:
  '/emergency': ['/contact', '/locations', '/services'],

  // From locations, likely to visit:
  '/locations': ['/emergency', '/contact', '/areas/brisbane', '/areas/ipswich'],

  // From about, likely to visit:
  '/about': ['/about-phill-mcgurk', '/services', '/contact'],
  '/about-phill-mcgurk': ['/services', '/contact', '/emergency'],
};

export function Prefetch() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    // Get routes to prefetch based on current path
    const routesToPrefetch = PREFETCH_ROUTES[pathname as keyof typeof PREFETCH_ROUTES] || [];

    // Prefetch likely next routes after idle
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        routesToPrefetch.forEach(route => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.as = 'document';
          link.href = route;
          document.head.appendChild(link);
        });
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        routesToPrefetch.forEach(route => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.as = 'document';
          link.href = route;
          document.head.appendChild(link);
        });
      }, 2000);
    }
  }, [pathname]);

  return null;
}

// Hook for programmatic prefetching
export function usePrefetch() {
  const prefetchRoute = (route: string) => {
    if (typeof window === 'undefined') return;

    // Check if already prefetched
    const existing = document.querySelector(`link[href="${route}"][rel="prefetch"]`);
    if (existing) return;

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'document';
    link.href = route;
    document.head.appendChild(link);
  };

  const prefetchRoutes = (routes: string[]) => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        routes.forEach(prefetchRoute);
      });
    } else {
      setTimeout(() => {
        routes.forEach(prefetchRoute);
      }, 1000);
    }
  };

  return { prefetchRoute, prefetchRoutes };
}
