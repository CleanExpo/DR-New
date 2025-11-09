/**
 * Lazy Loading Components
 * Dynamically import below-fold components for improved LCP
 */

'use client';

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

// Loading placeholder component
const LoadingPlaceholder = () => (
  <div className="animate-pulse bg-gray-200 rounded-lg" style={{ minHeight: '200px' }} />
);

// Lazy load below-fold sections with loading state
export const LazyTrustIndicators = dynamic(
  () => import('../sections/TrustIndicatorsSection').then(mod => ({ default: mod.TrustIndicatorsSection })),
  {
    loading: () => <LoadingPlaceholder />,
    ssr: true, // Server-side render for SEO
  }
);

export const LazyEmergencyServices = dynamic(
  () => import('../sections/EmergencyServicesSection').then(mod => ({ default: mod.EmergencyServicesSection })),
  {
    loading: () => <LoadingPlaceholder />,
    ssr: true,
  }
);

export const LazyWhyChooseUs = dynamic(
  () => import('../sections/WhyChooseUsSection').then(mod => ({ default: mod.WhyChooseUsSection })),
  {
    loading: () => <LoadingPlaceholder />,
    ssr: true,
  }
);

export const LazyServiceAreas = dynamic(
  () => import('../sections/ServiceAreasSection').then(mod => ({ default: mod.ServiceAreasSection })),
  {
    loading: () => <LoadingPlaceholder />,
    ssr: true,
  }
);

export const LazyMobileShowcase = dynamic(
  () => import('../sections/MobileShowcaseSection').then(mod => ({ default: mod.MobileShowcaseSection })),
  {
    loading: () => <LoadingPlaceholder />,
    ssr: false, // Not critical for initial render
  }
);

export const LazyFAQ = dynamic(
  () => import('../sections/FAQSection').then(mod => ({ default: mod.FAQSection })),
  {
    loading: () => <LoadingPlaceholder />,
    ssr: true, // Important for SEO
  }
);

export const LazyFinalCTA = dynamic(
  () => import('../sections/FinalCTASection').then(mod => ({ default: mod.FinalCTASection })),
  {
    loading: () => <LoadingPlaceholder />,
    ssr: false, // Not critical for initial render
  }
);

// Lazy load heavy third-party components
export const LazyGoogleMaps = dynamic(
  () => import('@react-google-maps/api').then(mod => ({ default: mod.GoogleMap })),
  {
    loading: () => <div className="bg-gray-200 rounded-lg" style={{ minHeight: '400px' }} />,
    ssr: false,
  }
);

// Lazy load analytics components
export const LazyConversionTracking = dynamic(
  () => import('../monitoring/ConversionTracking'),
  {
    ssr: false,
  }
);

// Utility function for intersection observer-based lazy loading
export function useLazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  options?: IntersectionObserverInit
): T | null {
  const [Component, setComponent] = React.useState<T | null>(null);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !Component) {
            importFunc().then((mod) => {
              setComponent(() => mod.default);
            });
            if (ref.current) {
              observer.unobserve(ref.current);
            }
          }
        });
      },
      {
        rootMargin: '200px', // Load 200px before element comes into view
        ...options,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [Component, importFunc, options]);

  return Component;
}

// Import React for useLazyLoad hook
import * as React from 'react';
