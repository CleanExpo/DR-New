import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

// Font optimization with font-display: swap
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

// SEO and performance metadata
export const metadata: Metadata = {
  title: {
    default: 'Disaster Recovery Brisbane | 24/7 Emergency Restoration Services',
    template: '%s | Disaster Recovery Brisbane'
  },
  description: 'Brisbane\'s fastest emergency disaster recovery service. Water damage, fire restoration, mould remediation. IICRC certified, 1-hour response. Call 1300 309 361.',
  keywords: 'disaster recovery brisbane, water damage restoration, fire damage cleanup, mould remediation, emergency restoration, IICRC certified, Brisbane, Ipswich, Logan',
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
    description: 'Professional disaster recovery services in Brisbane. Water damage, fire restoration, mould remediation. 1-hour emergency response.',
    url: 'https://disasterrecovery.com.au',
    siteName: 'Disaster Recovery Brisbane',
    images: [
      {
        url: '/images/disaster-recovery-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Disaster Recovery Brisbane Emergency Services',
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Disaster Recovery Brisbane | 24/7 Emergency Response',
    description: 'Professional disaster recovery services in Brisbane. Water damage, fire restoration, mould remediation.',
    images: ['/images/disaster-recovery-og.jpg'],
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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#2563eb',
      },
    ],
  },
  manifest: '/manifest.json',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

// Viewport configuration for optimal mobile experience
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1f2937' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-AU"
      className={`${inter.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Critical CSS inline - extracted from build */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Critical CSS for above-the-fold content */
              *,::after,::before{box-sizing:border-box;border:0;margin:0;padding:0}
              html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;
                font-family:var(--font-inter),system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
                font-feature-settings:'rlig' 1,'calt' 1}
              body{margin:0;line-height:inherit;min-height:100vh;background:#fff}
              h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}
              a{color:inherit;text-decoration:inherit}
              img,svg,video{display:block;max-width:100%;height:auto}
              button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}
              button,select{text-transform:none}
              button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;background-color:transparent;background-image:none}

              /* Hero critical styles */
              .hero-section{position:relative;min-height:100vh;background:#111827;color:#fff;overflow:hidden}
              .hero-overlay{position:absolute;inset:0;background:linear-gradient(to right,rgba(0,0,0,.7),rgba(0,0,0,.5),rgba(0,0,0,.3))}
              .hero-content{position:relative;z-index:10;display:flex;flex-direction:column;justify-content:center;min-height:100vh;padding:1.5rem}

              /* Critical layout styles */
              .section-padding{padding:5rem 1.5rem}
              .max-w-7xl{max-width:80rem;margin:0 auto}
              .text-center{text-align:center}
              .font-bold{font-weight:700}
              .text-3xl{font-size:1.875rem;line-height:2.25rem}
              .text-4xl{font-size:2.25rem;line-height:2.5rem}
              .text-5xl{font-size:3rem;line-height:1}
              .text-6xl{font-size:3.75rem;line-height:1}

              /* Loading states */
              @keyframes fadeIn{from{opacity:0}to{opacity:1}}
              @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
              .animate-fadeIn{animation:fadeIn 0.5s ease-out}
              .animate-pulse{animation:pulse 2s cubic-bezier(0.4,0,0.6,1) infinite}
            `,
          }}
        />

        {/* DNS Prefetch and Preconnect for performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/images/hero/disaster-recovery-services.jpg"
          as="image"
          type="image/jpeg"
        />

        {/* Resource hints for faster navigation */}
        <link rel="prefetch" href="/water-damage" />
        <link rel="prefetch" href="/fire-damage" />
        <link rel="prefetch" href="/mould-remediation" />
      </head>
      <body className="font-sans antialiased">
        {/* Immediate render of emergency banner for CLS prevention */}
        <div
          id="emergency-banner"
          className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 z-50"
          style={{ display: 'none' }}
        >
          <p className="font-semibold">
            24/7 Emergency Response - Call 1300 309 361 Now
          </p>
        </div>

        {children}

        {/* Structured data for SEO */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EmergencyService',
              name: 'Disaster Recovery Brisbane',
              description: 'Professional disaster recovery and restoration services in Brisbane, Ipswich, and Logan',
              url: 'https://disasterrecovery.com.au',
              telephone: '1300309361',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Brisbane',
                addressRegion: 'QLD',
                addressCountry: 'AU',
                postalCode: '4000'
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: -27.4698,
                longitude: 153.0251
              },
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
              serviceType: [
                'Water Damage Restoration',
                'Fire Damage Restoration',
                'Mould Remediation',
                'Biohazard Cleanup',
                'Storm Damage Recovery'
              ],
              logo: {
                '@type': 'ImageObject',
                url: 'https://disasterrecovery.com.au/images/logos/disaster-recovery-logo.png'
              },
              image: 'https://disasterrecovery.com.au/images/disaster-recovery-og.jpg',
              sameAs: [
                'https://www.facebook.com/disasterrecoverybrisbane',
                'https://www.instagram.com/disasterrecoverybrisbane',
                'https://www.linkedin.com/company/disaster-recovery-brisbane'
              ]
            }),
          }}
        />

        {/* Performance monitoring script (non-blocking) */}
        <Script
          id="web-vitals"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Web Vitals monitoring
              if ('PerformanceObserver' in window && 'PerformanceLongTaskTiming' in window) {
                const observer = new PerformanceObserver((list) => {
                  for (const entry of list.getEntries()) {
                    // Log to analytics
                    console.log('Web Vital:', entry.name, entry.value);
                  }
                });
                observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}