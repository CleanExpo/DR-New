import type { Metadata } from "next";
import "./globals.css";
import { LocalBusinessSchema, EmergencyServiceSchema, SpeakableSchema } from '@/components/schema/VoiceSearchSchema';
import { AggregateRatingSchema } from '@/components/schema/AggregateRatingSchema';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import SkipLinks from '@/components/accessibility/SkipLinks';
import ClientProviders from '@/components/providers/ClientProviders';

export const metadata: Metadata = {
  title: "Disaster Recovery Brisbane | Water Fire Damage Restoration | 1300 309 361",
  description: "Professional disaster recovery services in Brisbane, Ipswich & Logan. 24/7 emergency water damage, fire damage restoration & mould remediation. Fast response, quality results.",
  keywords: ["disaster recovery brisbane", "water damage restoration brisbane", "fire damage restoration", "mould removal brisbane", "emergency restoration", "flood damage repair", "storm damage brisbane", "ipswich disaster recovery", "logan disaster recovery"],
  authors: [{ name: "Disaster Recovery Brisbane" }],
  creator: "Disaster Recovery Brisbane",
  publisher: "Disaster Recovery Brisbane",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://disasterrecovery.com.au",
    siteName: "Disaster Recovery Brisbane",
    title: "Professional Disaster Recovery Services Brisbane | 24/7 Emergency Response",
    description: "Expert water damage, fire damage restoration & mould remediation services across Brisbane, Ipswich & Logan. Call 1300 309 361 for immediate assistance.",
    images: [
      {
        url: "https://disasterrecovery.com.au/images/hero/disaster-recovery-services.jpg",
        width: 1200,
        height: 630,
        alt: "Disaster Recovery Brisbane - Professional Emergency Restoration Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Disaster Recovery Brisbane | 24/7 Emergency Response",
    description: "Professional disaster recovery services across Brisbane, Ipswich & Logan. Water damage, fire damage & mould remediation specialists.",
    images: ["https://disasterrecovery.com.au/images/hero/disaster-recovery-services.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU">
      <head>
        {/* Performance Optimization - Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://disasterrecovery.com.au" />

        {/* SEO and Identity */}
        <link rel="canonical" href="https://disasterrecovery.com.au" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* Local SEO Geo Tags */}
        <meta name="geo.region" content="AU-QLD" />
        <meta name="geo.placename" content="Wacol" />
        <meta name="geo.position" content="-27.605;152.943" />
        <meta name="ICBM" content="-27.605, 152.943" />

        {/* Business Information */}
        <meta name="business.phone" content="1300309361" />
        <meta name="business.address" content="4/17 Tile St, Wacol, QLD 4076" />
        <meta name="business.hours" content="24/7" />

        {/* Theme and PWA */}
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Performance Hints */}
        <link rel="prefetch" href="/services/water-damage-restoration" />
        <link rel="prefetch" href="/services/fire-damage-restoration" />
        <link rel="prefetch" href="/contact" />
      </head>
      <body className="antialiased bg-gray-50 text-gray-900">
        <ClientProviders>
          {/* Accessibility: Skip Navigation Links */}
          <SkipLinks />

          {/* Schema Markup for Voice Search */}
          <LocalBusinessSchema
          name="Disaster Recovery"
          address={{
            street: "4/17 Tile St",
            city: "Wacol",
            state: "Queensland",
            postalCode: "4076",
            country: "Australia"
          }}
          phone="+61 1300 309 361"
          email="admin@disasterrecovery.com.au"
          url="https://disasterrecovery.com.au"
          serviceArea={["Brisbane", "Ipswich", "Logan", "Gold Coast", "Sunshine Coast"]}
          services={[
            "Water Damage Restoration",
            "Fire Damage Restoration",
            "Flood Restoration",
            "Mould Remediation",
            "Storm Damage Repair",
            "Emergency Restoration Services",
            "Sewage Cleanup",
            "Smoke Damage Cleanup"
          ]}
          openingHours="Mo-Su 00:00-23:59"
        />

        <EmergencyServiceSchema
          name="Disaster Recovery"
          description="24/7 emergency disaster recovery and restoration services across Brisbane, Ipswich and Logan with guaranteed 1-hour response time."
          serviceTypes={[
            "Emergency Water Damage Response",
            "Emergency Fire Damage Response",
            "Emergency Flood Response",
            "Emergency Storm Damage Response",
            "Emergency Mould Response"
          ]}
          responseTime="1 hour"
          availability="24/7/365"
          phone="+61 1300 309 361"
          serviceArea={["Brisbane", "Ipswich", "Logan"]}
        />

        <SpeakableSchema
          content={[
            ".emergency-phone",
            ".response-time",
            ".service-area",
            ".quick-answer"
          ]}
        />

        <AggregateRatingSchema />

        {/* Enhanced Schema Markup */}
        <SchemaMarkup type="LocalBusiness" />
        <SchemaMarkup type="FAQPage" />

          {children}
        </ClientProviders>
      </body>
    </html>
  );
}