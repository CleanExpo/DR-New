import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import Script from 'next/script'
import '@/styles/globals.css'
import '@/styles/modern-system.css'
import '@/styles/logo-transparency.css'
import '@/styles/mobile-responsive.css'
import '@/styles/mobile-fixes.css'
import '@/styles/storm-clouds.css'
import '@/styles/enhanced-storm.css'
import '@/styles/performance-optimizations.css'
import '@/styles/mobile-touch-targets.css'
import { Providers } from './providers'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import EmergencyCTA from '@/components/EmergencyCTA'
import MobileEmergencyCTA from '@/components/emergency/MobileEmergencyCTA'
import Breadcrumb from '@/components/Breadcrumb'
import NavigationIndicator from '@/components/NavigationIndicator'
import LoadingIndicator from '@/components/LoadingIndicator'
import ProgressSpinner from '@/components/ProgressSpinner'
import LazyImage from '@/components/LazyImage'

// PERFORMANCE OPTIMIZATIONS
import { ServiceWorkerRegistration } from '@/components/performance/ServiceWorkerRegistration'
import { AdvancedWebVitals } from '@/components/performance/AdvancedWebVitals'
import { ResourceHints } from '@/components/performance/ResourceHints'

// Dynamic imports for analytics (load after user interaction)
import dynamic from 'next/dynamic'

const GoogleTagManager = dynamic(
  () => import('@/components/analytics/GoogleTagManager'),
  { ssr: false }
)

const MicrosoftClarity = dynamic(
  () => import('@/components/analytics/MicrosoftClarity'),
  { ssr: false }
)

const GoogleAnalytics = dynamic(
  () => import('@/components/analytics/GoogleAnalytics'),
  { ssr: false }
)

const WebVitalsReporter = dynamic(
  () => import('@/components/seo/WebVitalsReporter'),
  { ssr: false }
)

// Optimized font loading with font-display: swap
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
  variable: '--font-inter'
})

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://disasterrecovery.com.au'),
  title: {
    default: 'Water Damage Restoration Brisbane | Master Restorer Phill McGurk | 24/7 Emergency',
    template: '%s | Master Restorer Brisbane'
  },
  description: 'Master Restorer provides 24/7 water damage, fire damage & mould restoration in Brisbane, Ipswich & Logan. 60-minute response. Insurance approved. Call 1300 309 361.',
  keywords: 'water damage restoration brisbane, emergency water damage brisbane, fire damage restoration brisbane, mould removal brisbane, storm damage repairs brisbane, flood restoration brisbane, master restorer brisbane, phill mcgurk, iicrc certified brisbane, disaster recovery brisbane, water damage ipswich, water damage logan, 24 hour emergency restoration, insurance approved restoration',
  authors: [{ name: 'Disaster Recovery Brisbane - Master Restorer Phill McGurk' }],
  creator: 'Master Restorer Phill McGurk',
  publisher: 'Disaster Recovery Brisbane',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Master Restorer Brisbane'
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://disasterrecovery.com.au',
    siteName: 'Disaster Recovery Brisbane - Master Restorer',
    title: 'Brisbane Water Damage Restoration | Master Restorer | 60-Min Response',
    description: 'Brisbane\'s only Master Restorer. 24/7 water damage, fire damage & flood restoration. Serving Brisbane, Ipswich & Logan. Insurance approved. Call 1300 309 361.',
    images: [{
      url: '/images/disaster-recovery-og.jpg',
      width: 1200,
      height: 630,
      alt: 'Master Restorer Brisbane - Emergency Water Damage Restoration'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Master Restorer Brisbane | 24/7 Water Damage Emergency',
    description: 'IICRC Master Restorer. 60-minute emergency response Brisbane, Ipswich & Logan. Water, fire, mould damage specialists.',
    images: ['/images/disaster-recovery-twitter.jpg'],
    creator: '@PhillMcGurk'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'google8f4d3e5a7b9c2d1e',
    other: {
      'msvalidate.01': 'DB030D197A83DF2F524BF0DFBACDC52C',
      'facebook-domain-verification': 'abcdef123456789'
    }
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au',
    languages: {
      'en-AU': 'https://disasterrecovery.com.au'
    }
  },
  category: 'Disaster Recovery Services'
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' }
  ]
}

// Optimized for ISR (Incremental Static Regeneration)
export const revalidate = 3600 // Revalidate every hour

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-AU">
      <head>
        {/* Resource Hints for Performance */}
        <ResourceHints />

        {/* Critical Meta Tags */}
        <meta name="msvalidate.01" content="DB030D197A83DF2F524BF0DFBACDC52C" />

        {/* Optimized Icons with proper sizes */}
        <link rel="icon" type="image/png" sizes="32x32" href="/logos/disaster-recovery-logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logos/disaster-recovery-logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logos/disaster-recovery-logo.png" />
        <link rel="shortcut icon" href="/logos/disaster-recovery-logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0052CC" />

        {/* Inline Critical CSS for instant first paint */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical above-the-fold styles */
            *,::before,::after{box-sizing:border-box;border:0 solid #e5e7eb}
            html{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif}
            body{margin:0;line-height:inherit}
            .min-h-screen{min-height:100vh}
            .bg-white{background-color:#fff}
            .text-gray-900{color:#111827}
          `
        }} />

        {/* Structured Data for SEO */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Disaster Recovery Australia",
              "alternateName": "Disaster Recovery",
              "url": "https://disasterrecovery.com.au",
              "logo": "https://disasterrecovery.com.au/logos/3D%20Disaster%20Recovery%20Logo%20Image.png",
              "description": "Australia's elite network of IICRC-certified disaster restoration specialists. 24/7 emergency response preventing secondary damage across all major cities and regional areas.",
              "areaServed": {
                "@type": "Country",
                "name": "Australia"
              },
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": -25.2744,
                  "longitude": 133.7751
                },
                "geoRadius": "4000000"
              },
              "sameAs": [
                "https://www.facebook.com/DisasterRecoveryAU",
                "https://www.linkedin.com/company/disaster-recovery-au",
                "https://www.instagram.com/disasterrecoveryau",
                "https://www.youtube.com/@DisasterRecoveryAU"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+61-1300-309-361",
                "contactType": "Emergency Service",
                "availableLanguage": "English",
                "areaServed": "AU",
                "contactOption": "TollFree",
                "availableHours": "Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "AU",
                "addressRegion": "QLD",
                "addressLocality": "Brisbane"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Disaster Recovery Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Water Damage Restoration",
                      "description": "24/7 emergency water damage restoration and flood recovery"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Fire Damage Restoration",
                      "description": "Complete fire and smoke damage restoration services"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Mould Remediation",
                      "description": "Professional mould removal and remediation services"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Biohazard Cleanup",
                      "description": "Specialized biohazard and trauma scene cleanup"
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body className={`${poppins.variable} ${inter.variable} font-sans`}>
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="skip-to-main sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[9999] focus:p-4 focus:bg-blue-700 focus:text-white focus:no-underline focus:min-w-[200px] focus:min-h-[44px] focus:text-center focus:flex focus:items-center focus:justify-center"
        >
          Skip to main content
        </a>

        {/* Performance Monitoring */}
        <ServiceWorkerRegistration />
        <AdvancedWebVitals />

        {/* Analytics - Loaded after interaction */}
        <GoogleTagManager />
        <MicrosoftClarity />

        <Providers>
          <Header />
          <Breadcrumb />
          <NavigationIndicator />

          <main id="main-content" className="min-h-screen">
            {children}
          </main>

          <div className="pb-16 lg:pb-0">
            <Footer />
          </div>

          {/* Emergency CTAs */}
          <EmergencyCTA />
          <MobileEmergencyCTA />

          {/* Loading Indicators */}
          <LoadingIndicator />
          <ProgressSpinner />
        </Providers>

        {/* Google Analytics - Optimized Loading */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: true
            });
            ${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID_SECONDARY ? `gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID_SECONDARY}');` : ''}
          `}
        </Script>

        {/* Web Vitals Reporting */}
        <WebVitalsReporter />
      </body>
    </html>
  )
}