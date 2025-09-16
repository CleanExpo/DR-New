import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

// Optimize font loading with subset and display swap
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
  variable: '--font-inter',
});

// Enhanced metadata for SEO and performance
export const metadata: Metadata = {
  title: {
    default: 'Disaster Recovery Brisbane | 24/7 Emergency Response | 1300 309 361',
    template: '%s | Disaster Recovery Brisbane'
  },
  description: 'Professional disaster recovery services in Brisbane, Ipswich & Logan. Water damage, fire restoration, mould remediation. 24/7 emergency response with 1-hour arrival guarantee. Call 1300 309 361.',
  keywords: [
    'disaster recovery brisbane',
    'water damage restoration brisbane',
    'fire damage restoration brisbane',
    'mould remediation brisbane',
    'emergency restoration services',
    'flood damage brisbane',
    'sewage cleanup brisbane',
    'biohazard cleaning brisbane'
  ],
  authors: [{ name: 'Disaster Recovery Brisbane' }],
  creator: 'Disaster Recovery Brisbane',
  publisher: 'Disaster Recovery Brisbane',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://disasterrecovery.com.au'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Disaster Recovery Brisbane | 24/7 Emergency Response',
    description: 'Professional disaster recovery services. Water damage, fire restoration, mould remediation. 24/7 emergency response.',
    url: 'https://disasterrecovery.com.au',
    siteName: 'Disaster Recovery Brisbane',
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: '/images/hero/disaster-recovery-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Disaster Recovery Brisbane Services',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Disaster Recovery Brisbane | 24/7 Emergency Response',
    description: 'Professional disaster recovery services. Call 1300 309 361.',
    images: ['/images/hero/disaster-recovery-services.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

// Critical CSS for above-the-fold content
const criticalCSS = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
    font-family: var(--font-inter), system-ui, -apple-system, sans-serif;
    background-color: #ffffff;
    color: #111827;
    line-height: 1.5;
    min-height: 100vh;
  }

  /* Emergency button critical styles */
  .emergency-focus {
    background-color: #dc2626;
    color: white;
    font-weight: bold;
    border-radius: 0.5rem;
    padding: 1rem 2rem;
    transition: transform 0.2s;
  }

  .emergency-focus:hover {
    transform: scale(1.05);
  }

  /* Hero critical styles */
  .hero-section {
    min-height: 100vh;
    position: relative;
    background: #111827;
  }

  /* Font loading optimization */
  .font-loading {
    font-family: sans-serif;
  }

  /* Prevent layout shift */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Critical animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .animate-fadeIn {
    animation: fadeIn 0.5s ease-in-out;
  }
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU" className={inter.variable}>
      <head>
        {/* Critical CSS inline */}
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/_next/static/media/inter-latin-400-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Preload hero image */}
        <link
          rel="preload"
          as="image"
          href="/images/hero/disaster-recovery-services.jpg"
          imageSrcSet="/images/hero/disaster-recovery-services.jpg 1x, /images/hero/disaster-recovery-services@2x.jpg 2x"
          fetchPriority="high"
        />

        {/* PWA Meta Tags */}
        <meta name="application-name" content="Disaster Recovery Brisbane" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DR Brisbane" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* Structured Data for Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EmergencyService',
              name: 'Disaster Recovery Brisbane',
              description: 'Professional disaster recovery and restoration services in Brisbane',
              url: 'https://disasterrecovery.com.au',
              telephone: '1300309361',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '4/17 Tile St',
                addressLocality: 'Wacol',
                addressRegion: 'QLD',
                postalCode: '4076',
                addressCountry: 'AU'
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: -27.5976,
                longitude: 152.9332
              },
              areaServed: [
                {
                  '@type': 'City',
                  name: 'Brisbane'
                },
                {
                  '@type': 'City',
                  name: 'Ipswich'
                },
                {
                  '@type': 'City',
                  name: 'Logan'
                }
              ],
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'Monday', 'Tuesday', 'Wednesday', 'Thursday',
                  'Friday', 'Saturday', 'Sunday'
                ],
                opens: '00:00',
                closes: '23:59'
              },
              priceRange: '$$',
              image: 'https://disasterrecovery.com.au/images/hero/disaster-recovery-services.jpg',
              sameAs: [
                'https://www.facebook.com/disasterrecoverybrisbane',
                'https://www.linkedin.com/company/disaster-recovery-brisbane'
              ]
            })
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}

        {/* Defer non-critical scripts */}
        <Script
          id="performance-observer"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Performance monitoring
              if ('PerformanceObserver' in window) {
                // Observe LCP
                new PerformanceObserver((entryList) => {
                  const entries = entryList.getEntries();
                  const lastEntry = entries[entries.length - 1];
                  console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
                }).observe({ entryTypes: ['largest-contentful-paint'] });

                // Observe FID
                new PerformanceObserver((entryList) => {
                  const entries = entryList.getEntries();
                  entries.forEach((entry) => {
                    console.log('FID:', entry.processingStart - entry.startTime);
                  });
                }).observe({ entryTypes: ['first-input'] });

                // Observe CLS
                let clsValue = 0;
                new PerformanceObserver((entryList) => {
                  for (const entry of entryList.getEntries()) {
                    if (!entry.hadRecentInput) {
                      clsValue += entry.value;
                      console.log('CLS:', clsValue);
                    }
                  }
                }).observe({ entryTypes: ['layout-shift'] });
              }

              // Prefetch on hover
              document.addEventListener('mouseover', (e) => {
                const link = e.target.closest('a');
                if (link && link.href && link.href.startsWith(window.location.origin)) {
                  const prefetchLink = document.createElement('link');
                  prefetchLink.rel = 'prefetch';
                  prefetchLink.href = link.href;
                  document.head.appendChild(prefetchLink);
                }
              });

              // Progressive enhancement for images
              if ('loading' in HTMLImageElement.prototype) {
                const images = document.querySelectorAll('img[data-src]');
                images.forEach((img) => {
                  img.src = img.dataset.src;
                });
              }
            `
          }}
        />

        {/* Service Worker Registration */}
        <Script
          id="service-worker"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js').then(
                    (registration) => {
                      console.log('Service Worker registered:', registration.scope);
                    },
                    (error) => {
                      console.log('Service Worker registration failed:', error);
                    }
                  );
                });
              }
            `
          }}
        />
      </body>
    </html>
  );
}