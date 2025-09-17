import { Suspense, lazy } from 'react';
import dynamic from 'next/dynamic';
import HeroPerformance from '@/components/sections/HeroPerformance';

// Dynamic imports with loading states
const Header = dynamic(() => import('@/components/layout/Header'), {
  loading: () => <div className="h-20 bg-white shadow-sm animate-pulse" />,
  ssr: true,
});

const Services = dynamic(() => import('@/components/sections/Services'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
  ssr: true,
});

const ServiceAreas = dynamic(() => import('@/components/sections/ServiceAreas'), {
  loading: () => <div className="h-64 bg-white animate-pulse" />,
  ssr: true,
});

// EmergencyContact removed

const Reviews = dynamic(() => import('@/components/sections/TestimonialsCarousel'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
  ssr: false, // Client-side only for testimonials
});


const Footer = dynamic(() => import('@/components/layout/Footer'), {
  loading: () => <div className="h-64 bg-gray-900 animate-pulse" />,
  ssr: true,
});

// Lazy load heavy components below the fold
const ProcessShowcase = lazy(() => import('@/components/process/ProcessShowcase'));
const EquipmentGallery = lazy(() => import('@/components/gallery/EquipmentGallery'));

// Loading skeleton component
const LoadingSkeleton = ({ height = 'h-64' }: { height?: string }) => (
  <div className={`${height} bg-gray-100 animate-pulse rounded-lg`}>
    <div className="h-full flex items-center justify-center">
      <svg className="w-8 h-8 text-gray-300 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    </div>
  </div>
);

// Performance-optimized metadata
export const metadata = {
  title: 'Disaster Recovery Brisbane | 24/7 Emergency Response | 1300 309 361',
  description: 'Professional disaster recovery services in Brisbane. Water damage, fire restoration, mould remediation. 24/7 emergency response with 1-hour arrival.',
  openGraph: {
    images: [
      {
        url: '/images/hero/disaster-recovery-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Disaster Recovery Brisbane',
      },
    ],
  },
};

export default function PerformanceHomePage() {
  return (
    <>
      {/* Header with emergency CTA */}
      <Header />

      {/* Main Content */}
      <main className="min-h-screen">
        {/* Hero Section - Priority Load */}
        <HeroPerformance />

        {/* Emergency Contact Bar - High Priority */}
        {/* EmergencyContact removed */}

        {/* Core Services - Above the fold */}
        <Services />

        {/* Service Areas - Important for SEO */}
        <ServiceAreas />

        {/* Below the fold content with lazy loading */}
        <Suspense fallback={<LoadingSkeleton height="h-96" />}>
          <ProcessShowcase />
        </Suspense>

        <Suspense fallback={<LoadingSkeleton height="h-96" />}>
          <EquipmentGallery />
        </Suspense>

        {/* Reviews - Client side only */}
        <Reviews />

      </main>

      {/* Footer */}
      <Footer />

      {/* Performance Monitoring Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Report Web Vitals
            if (typeof window !== 'undefined') {
              // First Paint
              new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                  if (entry.name === 'first-paint') {
                    console.log('First Paint:', entry.startTime);
                  }
                });
              }).observe({ entryTypes: ['paint'] });

              // Network Information API
              if ('connection' in navigator) {
                const connection = navigator.connection;
                console.log('Network Type:', connection.effectiveType);
                console.log('Downlink Speed:', connection.downlink, 'Mbps');

                // Adapt content based on network
                if (connection.effectiveType === '2g' || connection.saveData) {
                  // Reduce quality for slow connections
                  document.documentElement.classList.add('reduced-data');
                }
              }

              // Prefetch on idle
              if ('requestIdleCallback' in window) {
                requestIdleCallback(() => {
                  // Prefetch critical resources
                  const links = [
                    '/services/water-damage-restoration',
                    '/services/fire-damage-restoration',
                    '/locations/brisbane',
                  ];

                  links.forEach(href => {
                    const link = document.createElement('link');
                    link.rel = 'prefetch';
                    link.href = href;
                    document.head.appendChild(link);
                  });
                });
              }
            }
          `,
        }}
      />
    </>
  );
}