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
import WebVitals from './web-vitals'
// Temporarily disabled to fix prerendering - client components using hooks
// import { MicrosoftClarity } from '@/components/analytics/MicrosoftClarity'
// import { GoogleTagManager } from '@/components/analytics/GoogleTagManager'
// import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
// import { WebVitalsReporter } from '@/components/seo/WebVitalsReporter'
// import { LocalBusinessSchema} from '@/components/seo/LocalBusinessSchema'
// import { BrisbaneLocalSchema } from '@/components/seo/BrisbaneLocalSchema'
// import { SEOChecklist } from '@/components/seo/SEOChecklist'
import MobileEmergencyCTA from '@/components/emergency/MobileEmergencyCTA'
import Breadcrumb from '@/components/Breadcrumb'
import NavigationIndicator from '@/components/NavigationIndicator'
import LoadingIndicator from '@/components/LoadingIndicator'
import ProgressSpinner from '@/components/ProgressSpinner'
import LazyImage from '@/components/LazyImage'
// import { LiveChat } from '@/components/support/LiveChat' - Removed duplicate
// import { AudioSystemSimple } from '@/components/audio/AudioSystemSimple' - Removed non-functioning

// Optimized font loading with reduced weights
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'], // Reduced from all weights
})

const poppins = Poppins({
  weight: ['400', '500', '600', '700'], // Reduced from 300-800
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-poppins',
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://disasterrecovery.com.au'),
  title: {
    default: 'Water Damage Restoration Brisbane | IICRC Master Restorer Phill McGurk | 24/7 Emergency',
    template: '%s | IICRC Master Restorer Brisbane'
  },
  description: 'IICRC Master Restorer provides 24/7 water damage, fire damage & mould restoration in Brisbane, Ipswich & Logan. 60-minute response. Insurance approved. Call 1300 309 361.',
  keywords: 'water damage restoration brisbane, emergency water damage brisbane, fire damage restoration brisbane, mould removal brisbane, storm damage repairs brisbane, flood restoration brisbane, iicrc master restorer brisbane, phill mcgurk, iicrc certified brisbane, disaster recovery brisbane, water damage ipswich, water damage logan, 24 hour emergency restoration, insurance approved restoration',
  authors: [{ name: 'Disaster Recovery Brisbane - IICRC Master Restorer Phill McGurk' }],
  creator: 'IICRC Master Restorer Phill McGurk',
  publisher: 'Disaster Recovery Brisbane',
  formatDetection: {
    email: false,
    address: false,
    telephone: false },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'IICRC Master Restorer Brisbane'
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://disasterrecovery.com.au',
    siteName: 'Disaster Recovery Brisbane - IICRC Master Restorer',
    title: 'Brisbane Water Damage Restoration | IICRC Master Restorer | 60-Min Response',
    description: 'Brisbane IICRC Master Restorer. 24/7 water damage, fire damage & flood restoration. Serving Brisbane, Ipswich & Logan. Insurance approved. Call 1300 309 361.',
    images: [
      {
        url: '/logos/3D-Disaster-Recovery-Logo.png',
        width: 1200,
        height: 630,
        alt: 'IICRC Master Restorer Brisbane - Emergency Water Damage Restoration' }
    ] },
  twitter: {
    card: 'summary_large_image',
    title: 'IICRC Master Restorer Brisbane | 24/7 Water Damage Emergency',
    description: 'IICRC Master Restorer. 60-minute emergency response Brisbane, Ipswich & Logan. Water, fire, mould damage specialists.',
    images: ['/logos/3D-Disaster-Recovery-Logo.png'],
    creator: '@PhillMcGurk' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1 } },
  verification: {
    google: 'google8f4d3e5a7b9c2d1e',
    yandex: '',
    yahoo: '',
    other: {
      'msvalidate.01': 'DB030D197A83DF2F524BF0DFBACDC52C',
      'facebook-domain-verification': 'abcdef123456789' } },
  alternates: {
    canonical: 'https://disasterrecovery.com.au',
    languages: {
      'en-AU': 'https://disasterrecovery.com.au' } },
  category: 'Disaster Recovery Services' }

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

// Force dynamic rendering to bypass prerendering errors temporarily
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function RootLayout({
  children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-AU">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {/* Preload critical hero image */}
        <link
          rel="preload"
          as="image"
          href="/images/hero/hero-main.jpg"
          fetchPriority="high"
        />
      </head>
      <body className={`${poppins.variable} ${inter.variable} font-sans`}>
        {/* Web Vitals Monitoring */}
        <WebVitals />

        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Disaster Recovery Brisbane",
              "alternateName": "Disaster Recovery",
              "url": "https://disasterrecovery.com.au",
              "logo": {
                "@type": "ImageObject",
                "url": "https://disasterrecovery.com.au/logos/3D-Disaster-Recovery-Logo.png",
                "width": 1200,
                "height": 630,
                "caption": "Disaster Recovery Brisbane - IICRC Master Restorer Phill McGurk"
              },
              "description": "Brisbane's IICRC Master Restorer providing 24/7 emergency water damage, fire damage, and mould restoration services. Serving Brisbane, Ipswich & Logan.",
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
        <a href="#main-content" className="skip-to-main sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[9999] focus:p-4 focus:bg-blue-600 focus:text-white focus:no-underline focus:min-w-[200px] focus:min-h-[44px] focus:text-center focus:flex focus:items-center focus:justify-center">
          Skip to main content
        </a>
        {/* Temporarily disabled to fix prerendering - client components using hooks */}
        {/* <GoogleTagManager /> */}
        {/* <MicrosoftClarity /> */}
        <Providers>
          <Header />
          {/* Temporarily disabled to fix prerendering errors - will re-enable after deployment */}
          {/* <Breadcrumb /> */}
          {/* <NavigationIndicator /> */}
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <div className="pb-16 lg:pb-0">
            <Footer />
          </div>
          {/* Emergency CTA - appears after scrolling */}
          <EmergencyCTA />
          {/* Temporarily disabled to fix prerendering errors */}
          {/* <MobileEmergencyCTA /> */}
          {/* <LoadingIndicator /> */}
          {/* <ProgressSpinner /> */}
          {/* <LazyImage /> */}
          {/* <LiveChat /> - Reserved for future version */}
          {/* <AudioSystemSimple /> - Removed as not functioning properly */}
        </Providers>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(...args: any[]): void {dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
            ${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID_SECONDARY ? `gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID_SECONDARY}');` : ''}
          `}
        </Script>
      </body>
    </html>
  )
}
