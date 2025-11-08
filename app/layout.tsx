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
import { MonitoringProvider } from '@/components/monitoring/MonitoringProvider'

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
      <body className={`${poppins.variable} ${inter.variable} font-sans`}>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://disasterrecovery.com.au/#organization",
              "name": "Disaster Recovery Brisbane",
              "alternateName": "Disaster Recovery",
              "legalName": "Disaster Recovery Brisbane Pty Ltd",
              "url": "https://disasterrecovery.com.au",
              "logo": {
                "@type": "ImageObject",
                "url": "https://disasterrecovery.com.au/logos/3D-Disaster-Recovery-Logo.png",
                "width": 1200,
                "height": 630,
                "caption": "Disaster Recovery Brisbane - IICRC Master Restorer Phill McGurk"
              },
              "image": [
                "https://disasterrecovery.com.au/logos/3D-Disaster-Recovery-Logo.png",
                "https://disasterrecovery.com.au/images/team/3d-shane.webp"
              ],
              "description": "Brisbane's IICRC Master Restorer providing 24/7 emergency water damage, fire damage, mould restoration, and storm damage services. Serving Brisbane, Ipswich & Logan with 60-minute response time.",
              "slogan": "Brisbane's Master Restorer - Expert Emergency Response",
              "priceRange": "$$",
              "telephone": "+61-1300-309-361",
              "email": "info@disasterrecoverybrisbane.com.au",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "4/17 Tile St",
                "addressLocality": "Wacol",
                "addressRegion": "QLD",
                "postalCode": "4076",
                "addressCountry": "AU"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -27.5969,
                "longitude": 152.9294
              },
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Brisbane",
                  "sameAs": "https://en.wikipedia.org/wiki/Brisbane"
                },
                {
                  "@type": "City",
                  "name": "Ipswich",
                  "sameAs": "https://en.wikipedia.org/wiki/Ipswich,_Queensland"
                },
                {
                  "@type": "City",
                  "name": "Logan",
                  "sameAs": "https://en.wikipedia.org/wiki/City_of_Logan"
                },
                {
                  "@type": "GeoCircle",
                  "geoMidpoint": {
                    "@type": "GeoCoordinates",
                    "latitude": -27.4698,
                    "longitude": 153.0251
                  },
                  "geoRadius": "50000"
                }
              ],
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  "opens": "00:00",
                  "closes": "23:59"
                }
              ],
              "sameAs": [
                "https://www.facebook.com/DisasterRecoveryAU",
                "https://www.linkedin.com/company/disaster-recovery-au",
                "https://www.instagram.com/disasterrecoveryau",
                "https://www.youtube.com/@DisasterRecoveryAU"
              ],
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+61-1300-309-361",
                  "contactType": "Emergency Service",
                  "availableLanguage": ["English"],
                  "areaServed": ["AU"],
                  "contactOption": "TollFree",
                  "hoursAvailable": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    "opens": "00:00",
                    "closes": "23:59"
                  }
                },
                {
                  "@type": "ContactPoint",
                  "telephone": "+61-1300-309-361",
                  "contactType": "Customer Service",
                  "email": "info@disasterrecoverybrisbane.com.au",
                  "availableLanguage": ["English"]
                }
              ],
              "founder": {
                "@type": "Person",
                "name": "Phill McGurk",
                "jobTitle": "Master Restorer",
                "description": "IICRC Master Restorer - One of limited Master Restorers in Queensland"
              },
              "employee": {
                "@type": "Person",
                "name": "Phill McGurk",
                "jobTitle": "Master Restorer & CEO"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Emergency Disaster Recovery Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Water Damage Restoration",
                      "description": "24/7 emergency water damage restoration, flood recovery, burst pipe repair, and structural drying",
                      "provider": {
                        "@id": "https://disasterrecovery.com.au/#organization"
                      },
                      "areaServed": ["Brisbane", "Ipswich", "Logan"]
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Fire Damage Restoration",
                      "description": "Complete fire and smoke damage restoration, soot removal, odor elimination",
                      "provider": {
                        "@id": "https://disasterrecovery.com.au/#organization"
                      },
                      "areaServed": ["Brisbane", "Ipswich", "Logan"]
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Mould Remediation",
                      "description": "Professional mould removal, black mould remediation, and air quality restoration",
                      "provider": {
                        "@id": "https://disasterrecovery.com.au/#organization"
                      },
                      "areaServed": ["Brisbane", "Ipswich", "Logan"]
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Storm Damage Restoration",
                      "description": "Emergency storm damage repair, roof tarping, wind and hail damage restoration",
                      "provider": {
                        "@id": "https://disasterrecovery.com.au/#organization"
                      },
                      "areaServed": ["Brisbane", "Ipswich", "Logan"]
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Commercial Restoration",
                      "description": "Large-scale commercial property disaster restoration services",
                      "provider": {
                        "@id": "https://disasterrecovery.com.au/#organization"
                      },
                      "areaServed": ["Brisbane", "Ipswich", "Logan"]
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Biohazard Cleanup",
                      "description": "Specialized biohazard, trauma scene, and sewage cleanup services",
                      "provider": {
                        "@id": "https://disasterrecovery.com.au/#organization"
                      },
                      "areaServed": ["Brisbane", "Ipswich", "Logan"]
                    }
                  }
                ]
              },
              "makesOffer": [
                {
                  "@type": "Offer",
                  "name": "24/7 Emergency Response",
                  "description": "60-minute emergency response time for Brisbane metro area"
                },
                {
                  "@type": "Offer",
                  "name": "Insurance Direct Billing",
                  "description": "Direct billing with all major insurance companies - no upfront costs"
                }
              ],
              "knowsAbout": [
                "Water Damage Restoration",
                "Fire Damage Restoration",
                "Mould Remediation",
                "Storm Damage Repair",
                "Flood Recovery",
                "IICRC Standards",
                "Emergency Response",
                "Insurance Restoration"
              ],
              "award": [
                "IICRC Master Restorer Certification",
                "IICRC Certified Water Damage Restoration",
                "IICRC Certified Fire & Smoke Restoration",
                "IICRC Certified Mould Remediation"
              ],
              "accreditationIdentifier": [
                "IICRC Master Restorer",
                "IICRC WRT Certified",
                "IICRC FSRT Certified",
                "IICRC AMRT Certified"
              ]
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
          <MonitoringProvider
            gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
            clarityId={process.env.NEXT_PUBLIC_CLARITY_ID}
          >
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
          </MonitoringProvider>
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
