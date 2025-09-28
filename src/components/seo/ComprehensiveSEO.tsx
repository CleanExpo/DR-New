'use client';

import Head from 'next/head';
import Script from 'next/script';

interface ComprehensiveSEOProps {
  page?: string;
  service?: string;
  location?: string;
  title?: string;
  description?: string;
  keywords?: string;
  ogType?: string;
  structuredData?: any;
}

export default function ComprehensiveSEO({
  page = 'home',
  service = 'disaster-recovery',
  location = 'Brisbane',
  title,
  description,
  keywords,
  ogType = 'website',
  structuredData
}: ComprehensiveSEOProps) {

  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://dr-new-ten.vercel.app';

  // Brisbane-specific schema for local SEO
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#organization`,
    "name": "Disaster Recovery Brisbane",
    "alternateName": "NRP Disaster Recovery Services",
    "description": "24/7 emergency disaster recovery services in Brisbane, Ipswich, and Logan. IICRC certified water damage, fire damage, mould remediation specialists.",
    "url": siteUrl,
    "telephone": "+61-1300-309-361",
    "priceRange": "$$$",
    "image": [
      `${siteUrl}/images/hero/disaster-recovery-services.jpg`,
      `${siteUrl}/logos/disaster-recovery-logo.png`
    ],
    "logo": {
      "@type": "ImageObject",
      "url": `${siteUrl}/logos/disaster-recovery-logo.png`,
      "width": 600,
      "height": 60
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Main Street",
      "addressLocality": "Brisbane",
      "addressRegion": "QLD",
      "postalCode": "4000",
      "addressCountry": "AU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -27.4698,
      "longitude": 153.0251
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Brisbane",
        "@id": "https://www.wikidata.org/wiki/Q34932"
      },
      {
        "@type": "City",
        "name": "Ipswich"
      },
      {
        "@type": "City",
        "name": "Logan"
      }
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
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
            "description": "24/7 emergency water extraction and drying services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Fire Damage Restoration",
            "description": "Complete fire and smoke damage restoration"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mould Remediation",
            "description": "Safe and effective mould removal services"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1247",
      "bestRating": "5"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Sarah M."
        },
        "datePublished": "2024-01-15",
        "reviewBody": "Incredible response time for water damage in our Brisbane home. Professional team, excellent results.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      }
    ],
    "sameAs": [
      "https://www.facebook.com/DisasterRecoveryBrisbane",
      "https://www.linkedin.com/company/disaster-recovery-brisbane",
      "https://www.instagram.com/disasterrecoverybrisbane"
    ]
  };

  // Emergency Service schema for GEO
  const emergencyServiceSchema = {
    "@context": "https://schema.org",
    "@type": "EmergencyService",
    "name": "Disaster Recovery Emergency Response",
    "description": "24/7 emergency disaster recovery services for water, fire, mould damage",
    "telephone": "+61-1300-309-361",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://disasterrecovery.com.au",
      "servicePhone": "+61-1300-309-361",
      "availableLanguage": "English"
    }
  };

  // FAQ Schema for voice search and featured snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How quickly can you respond to water damage in Brisbane?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide 24/7 emergency response to Brisbane, Ipswich, and Logan areas with typical arrival times of 60 minutes or less for critical water damage situations."
        }
      },
      {
        "@type": "Question",
        "name": "What areas do you service in Brisbane?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We service all of Greater Brisbane including Brisbane CBD, North Brisbane, South Brisbane, Ipswich, Logan, Redlands, Moreton Bay, and surrounding areas."
        }
      },
      {
        "@type": "Question",
        "name": "Are you insurance approved for disaster recovery?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we are fully insurance approved and work directly with all major insurance companies. We handle the entire claims process and provide detailed documentation."
        }
      },
      {
        "@type": "Question",
        "name": "How much does water damage restoration cost in Brisbane?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Water damage restoration in Brisbane typically ranges from $1,500 to $4,500 depending on the extent of damage, affected area size, and required equipment. We provide free assessments and quotes."
        }
      }
    ]
  };

  // HowTo Schema for process visibility
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Handle Water Damage Emergency",
    "description": "Steps to take when experiencing water damage in your Brisbane property",
    "image": "https://disasterrecovery.com.au/images/services/water-damage-restoration.webp",
    "totalTime": "PT30M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "AUD",
      "value": "0"
    },
    "supply": [],
    "tool": [],
    "step": [
      {
        "@type": "HowToStep",
        "name": "Ensure Safety",
        "text": "Turn off electricity to affected areas and avoid standing water if electrical hazards exist",
        "image": "https://disasterrecovery.com.au/images/process/safety.jpg"
      },
      {
        "@type": "HowToStep",
        "name": "Stop Water Source",
        "text": "If possible, stop the source of water by turning off main water supply",
        "image": "https://disasterrecovery.com.au/images/process/water-shutoff.jpg"
      },
      {
        "@type": "HowToStep",
        "name": "Call Professionals",
        "text": "Call 1300 309 361 for immediate emergency response",
        "image": "https://disasterrecovery.com.au/images/process/call.jpg"
      },
      {
        "@type": "HowToStep",
        "name": "Document Damage",
        "text": "Take photos for insurance purposes before cleanup begins",
        "image": "https://disasterrecovery.com.au/images/process/document.jpg"
      }
    ]
  };

  // Breadcrumb schema for navigation
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://disasterrecovery.com.au"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://disasterrecovery.com.au/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Brisbane",
        "item": "https://disasterrecovery.com.au/locations/brisbane"
      }
    ]
  };

  return (
    <>
      {/* Meta Tags */}
      {(title || description || keywords) && (
        <Head>
          {title && (
            <>
              <title>{title}</title>
              <meta property="og:title" content={title} />
              <meta name="twitter:title" content={title} />
            </>
          )}
          {description && (
            <>
              <meta name="description" content={description} />
              <meta property="og:description" content={description} />
              <meta name="twitter:description" content={description} />
            </>
          )}
          {keywords && <meta name="keywords" content={keywords} />}
          <meta property="og:type" content={ogType} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
      )}

      {/* Custom Structured Data */}
      {structuredData && (
        <Script
          id="custom-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}

      {/* Local Business Schema */}
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Emergency Service Schema */}
      <Script
        id="emergency-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(emergencyServiceSchema) }}
      />

      {/* FAQ Schema */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HowTo Schema */}
      <Script
        id="howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* Breadcrumb Schema */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}