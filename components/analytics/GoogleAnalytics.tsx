'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'set',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Google Analytics tracking component for Next.js applications
 * Tracks page views and custom events using Google Analytics 4 (GA4)
 *
 * @component
 * @example
 * ```tsx
 * // In your root layout.tsx
 * import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <GoogleAnalytics measurementId="G-XXXXXXXXXX" />
 *         {children}
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export function GoogleAnalytics(...args: any[]): void {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!measurementId || !window.gtag) {
      return;
    }

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    // Track page view
    window.gtag('config', measurementId, {
      page_path: url,
    });
  }, [pathname, searchParams, measurementId]);

  if (!measurementId) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('GoogleAnalytics: No measurement ID provided');
    }
    return null;
  }

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(...args: any[]): void {dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

/**
 * Helper function to track custom events
 *
 * @param eventName - The name of the event to track
 * @param parameters - Additional parameters to send with the event
 *
 * @example
 * ```tsx
 * import { trackEvent } from '@/components/analytics/GoogleAnalytics';
 *
 * // Track a button click
 * trackEvent('click', {
 *   event_category: 'engagement',
 *   event_label: 'hero_cta',
 * });
 * ```
 */
export function trackEvent(
  eventName: string,
  parameters?: Record<string, unknown>
): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters || {});
  }
}

export default GoogleAnalytics;