import React from 'react';

interface Question {
  question: string;
  answer: string;
}

interface VoiceSearchSchemaProps {
  faqs?: Question[];
  speakableSelectors?: string[];
  serviceName?: string;
  localBusiness?: {
    name: string;
    telephone: string;
    address: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
    openingHours?: string;
    priceRange?: string;
    areaServed?: string[];
  };
}

/**
 * Voice Search Schema Component
 * Generates structured data optimized for voice assistants (Google Assistant, Siri, Alexa)
 * Implements Speakable specification for voice-first content
 */
export default function VoiceSearchSchema({
  faqs = [],
  speakableSelectors = ['.voice-answer', '.quick-answer', '.emergency-cta'],
  serviceName,
  localBusiness
}: VoiceSearchSchemaProps) {

  // Generate FAQ schema with Speakable specification
  const generateFAQSchema = () => {
    if (faqs.length === 0) return null;

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": speakableSelectors
      },
      "mainEntity": faqs.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };
  };

  // Generate Emergency Service schema for local voice searches
  const generateEmergencyServiceSchema = () => {
    if (!serviceName) return null;

    return {
      "@context": "https://schema.org",
      "@type": "EmergencyService",
      "name": `${serviceName} - Disaster Recovery`,
      "description": `24/7 emergency ${serviceName.toLowerCase()} services in Brisbane, Ipswich, and Logan. IICRC certified, insurance approved, 1-hour response.`,
      "telephone": "1300309361",
      "url": "https://disasterrecovery.com.au",
      "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": -27.4698,
          "longitude": 153.0251
        },
        "geoRadius": "50km"
      },
      "availableLanguage": {
        "@type": "Language",
        "name": "English",
        "alternateName": "en-AU"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday",
          "Friday", "Saturday", "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      },
      "potentialAction": {
        "@type": "CallAction",
        "target": "tel:+61-1300-309-361",
        "name": "Call for Emergency Service"
      }
    };
  };

  // Generate LocalBusiness schema for "near me" searches
  const generateLocalBusinessSchema = () => {
    if (!localBusiness) return null;

    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": localBusiness.name,
      "telephone": localBusiness.telephone,
      "url": "https://disasterrecovery.com.au",
      "image": "https://disasterrecovery.com.au/images/logo.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": localBusiness.address.streetAddress,
        "addressLocality": localBusiness.address.addressLocality,
        "addressRegion": localBusiness.address.addressRegion,
        "postalCode": localBusiness.address.postalCode,
        "addressCountry": localBusiness.address.addressCountry
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -27.5729,
        "longitude": 152.9369
      },
      "areaServed": localBusiness.areaServed?.map(area => ({
        "@type": "City",
        "name": area
      })),
      "openingHours": localBusiness.openingHours || "Mo-Su 00:00-23:59",
      "priceRange": localBusiness.priceRange || "$$$",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "287",
        "bestRating": "5",
        "worstRating": "1"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Emergency Restoration Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Water Damage Restoration",
              "description": "24/7 water extraction and drying"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Fire Damage Restoration",
              "description": "Smoke and soot removal, odour elimination"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Mould Remediation",
              "description": "Professional mould removal and prevention"
            }
          }
        ]
      }
    };
  };

  // Generate HowTo schema for process-related voice queries
  const generateHowToSchema = (title: string, steps: string[]) => {
    if (!title || steps.length === 0) return null;

    return {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": title,
      "description": `Professional guidance on ${title.toLowerCase()} from Disaster Recovery Brisbane`,
      "step": steps.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": `Step ${index + 1}`,
        "text": step
      })),
      "totalTime": "PT1H",
      "supply": [],
      "tool": [],
      "performTime": "PT30M"
    };
  };

  // Combine all schemas
  const schemas = [
    generateFAQSchema(),
    generateEmergencyServiceSchema(),
    generateLocalBusinessSchema()
  ].filter(Boolean);

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

// Helper function to generate voice-optimized meta tags
export function VoiceSearchMetaTags() {
  return (
    <>
      {/* Google Assistant optimization */}
      <meta name="google-site-verification" content="verification-code" />
      <meta name="google" content="nositelinkssearchbox" />

      {/* Siri and Apple optimization */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="Disaster Recovery" />

      {/* Alexa optimization */}
      <meta name="alexa" content="true" />

      {/* General voice search optimization */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="format-detection" content="telephone=yes" />

      {/* Speech synthesis hints */}
      <meta name="synthesis" content="voice: en-AU" />
      <meta name="voice-locale" content="en-AU" />
    </>
  );
}