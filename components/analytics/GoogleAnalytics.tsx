'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

// Google Analytics 4 implementation for comprehensive tracking
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

      // Track page views
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
        page_title: document.title,
        page_location: window.location.href
      });

      // Track Core Web Vitals
      if (typeof window !== 'undefined' && 'web-vital' in window) {
        const sendToGoogleAnalytics = ({ name, delta, id }: any) => {
          window.gtag('event', name, {
            event_category: 'Web Vitals',
            value: Math.round(name === 'CLS' ? delta * 1000 : delta),
            event_label: id,
            non_interaction: true,
          });
        };

        // Report all web vitals
        ['CLS', 'FID', 'FCP', 'LCP', 'TTFB'].forEach((metric) => {
          sendToGoogleAnalytics({ name: metric, delta: 0, id: metric });
        });
      }
    }
  }, [pathname, searchParams]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            send_page_view: true,
            cookie_flags: 'SameSite=None;Secure'
          });

          // Enhanced Ecommerce and Conversions
          gtag('config', '${GA_MEASUREMENT_ID}', {
            'custom_map.dimension1': 'user_type',
            'custom_map.dimension2': 'content_category',
            'custom_map.dimension3': 'insurance_type'
          });

          // Track scroll depth
          let scrollDepths = [25, 50, 75, 90, 100];
          let scrolledDepths = [];

          window.addEventListener('scroll', function() {
            let scrollPercent = (window.scrollY + window.innerHeight) / document.body.scrollHeight * 100;

            scrollDepths.forEach(function(depth) {
              if (scrollPercent >= depth && !scrolledDepths.includes(depth)) {
                gtag('event', 'scroll', {
                  'event_category': 'Engagement',
                  'event_label': depth + '%',
                  'value': depth
                });
                scrolledDepths.push(depth);
              }
            });
          });

          // Track time on page
          let startTime = new Date().getTime();
          window.addEventListener('beforeunload', function() {
            let timeOnPage = Math.round((new Date().getTime() - startTime) / 1000);
            gtag('event', 'timing_complete', {
              'name': 'time_on_page',
              'value': timeOnPage,
              'event_category': 'Engagement'
            });
          });
        `}
      </Script>
    </>
  );
}

// Custom event tracking helper
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track form submissions
export const trackFormSubmission = (formName: string, formData?: any) => {
  trackEvent('form_submit', 'Form', formName);

  // Track as conversion
  if (window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': `${GA_MEASUREMENT_ID}/conversion_id`,
      'value': formData?.value || 0,
      'currency': 'AUD'
    });
  }
};

// Track phone calls
export const trackPhoneCall = (phoneNumber: string, context: string) => {
  trackEvent('phone_call', 'Contact', context);

  if (window.gtag) {
    window.gtag('event', 'contact', {
      'event_category': 'engagement',
      'event_label': 'phone',
      'value': 1
    });
  }
};