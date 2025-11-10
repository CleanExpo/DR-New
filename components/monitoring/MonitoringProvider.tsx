/**
 * Monitoring Provider Component
 * Initializes comprehensive monitoring for the application
 */

'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { initMonitoring } from '@/lib/monitoring/comprehensive-monitoring';
import { analytics } from '@/lib/monitoring/analytics';
import { setupGlobalErrorHandler } from '@/lib/monitoring/error-tracking';

interface MonitoringProviderProps {
  children: React.ReactNode;
  gaId?: string;
  clarityId?: string;
}

export function MonitoringProvider({
  children,
  gaId,
  clarityId
}: MonitoringProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize monitoring on mount
  useEffect(() => {
    console.log('[MonitoringProvider] Initializing monitoring system');

    // Initialize comprehensive monitoring
    initMonitoring({
      enablePerformanceMonitoring: true,
      enableErrorTracking: true,
      enableAnalytics: true,
      enableWebVitals: true,
      enableAlerts: process.env.NODE_ENV === 'production',
      sampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    });

    // Setup global error handlers
    setupGlobalErrorHandler();
  }, [gaId, clarityId]);

  // Track page views
  useEffect(() => {
    if (!pathname) {return;}

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    // Track page view
    analytics.pageView(window.location.origin + url, document.title);

    // Track page category
    const category = getPageCategory(pathname);
    if (category) {
      analytics.setDimensions({ page_category: category });
    }

    // Track service area from URL
    const serviceArea = extractServiceArea(pathname);
    if (serviceArea) {
      analytics.setDimensions({ service_area: serviceArea });
    }

    // Track service type from URL
    const serviceType = extractServiceType(pathname);
    if (serviceType) {
      analytics.setDimensions({ service_type: serviceType });
    }
  }, [pathname, searchParams]);

  return (
    <>
      {/* Microsoft Clarity - Deferred to not block main thread */}
      {clarityId && (
        <Script
          id="microsoft-clarity"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `
          }}
        />
      )}
      {children}
    </>
  );
}

/**
 * Get page category from pathname
 */
function getPageCategory(pathname: string): string | undefined {
  if (pathname === '/') {return 'home';}
  if (pathname.startsWith('/services')) {return 'services';}
  if (pathname.startsWith('/about')) {return 'about';}
  if (pathname.startsWith('/contact')) {return 'contact';}
  if (pathname.startsWith('/emergency')) {return 'emergency';}
  if (pathname.startsWith('/areas')) {return 'service-areas';}
  if (pathname.startsWith('/insurance')) {return 'insurance';}
  if (pathname.startsWith('/commercial')) {return 'commercial';}
  return undefined;
}

/**
 * Extract service area from pathname
 */
function extractServiceArea(pathname: string): string | undefined {
  const areas = ['brisbane', 'ipswich', 'logan', 'gold-coast'];
  const path = pathname.toLowerCase();

  for (const area of areas) {
    if (path.includes(area)) {
      return area;
    }
  }

  return undefined;
}

/**
 * Extract service type from pathname
 */
function extractServiceType(pathname: string): string | undefined {
  const services = ['water', 'fire', 'mould', 'storm', 'flood', 'biohazard'];
  const path = pathname.toLowerCase();

  for (const service of services) {
    if (path.includes(service)) {
      return service;
    }
  }

  return undefined;
}

export default MonitoringProvider;
