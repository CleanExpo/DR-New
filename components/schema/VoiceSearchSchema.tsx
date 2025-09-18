import Script from 'next/script';

interface FAQSchemaProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

interface LocalBusinessSchemaProps {
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  phone: string;
  email: string;
  url: string;
  serviceArea: string[];
  services: string[];
  openingHours: string;
}

interface EmergencyServiceSchemaProps {
  name: string;
  description: string;
  serviceTypes: string[];
  responseTime: string;
  availability: string;
  phone: string;
  serviceArea: string[];
}

// FAQ Schema for Voice Search
export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData),
      }}
    />
  );
}

// Local Business Schema with Emergency Services
export function LocalBusinessSchema({
  name,
  address,
  phone,
  email,
  url,
  serviceArea,
  services,
  openingHours
}: LocalBusinessSchemaProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EmergencyService"],
    "name": name,
    "description": "Professional disaster recovery and emergency restoration services across Brisbane, Ipswich and Logan. 24/7 water damage, fire damage, flood restoration, mould remediation.",
    "image": `${url}/images/hero/disaster-recovery-services.jpg`,
    "url": url,
    "telephone": phone,
    "email": email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address.street,
      "addressLocality": address.city,
      "addressRegion": address.state,
      "postalCode": address.postalCode,
      "addressCountry": address.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -27.4698,
      "longitude": 153.0251
    },
    "areaServed": serviceArea.map(area => ({
      "@type": "City",
      "name": area
    })),
    "serviceType": services,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Emergency Disaster Recovery Services",
      "itemListElement": services.map((service, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service,
          "description": `Professional ${service.toLowerCase()} services available 24/7 with 1-hour emergency response across Brisbane, Ipswich and Logan.`
        }
      }))
    },
    "openingHours": openingHours,
    "hasMap": "https://www.google.com/maps/place/Brisbane+QLD/@-27.4677,153.0219,11z",
    "priceRange": "$$",
    "acceptsReservations": false,
    "paymentAccepted": ["Cash", "Credit Card", "Insurance"],
    "currenciesAccepted": "AUD",
    "foundingDate": "2008",
    "numberOfEmployees": "10-50",
    "slogan": "Brisbane's fastest emergency disaster recovery response",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "150"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Sarah Mitchell"
        },
        "datePublished": "2024-08-15",
        "reviewBody": "Outstanding service! When our office flooded after the storm, they arrived within 45 minutes and had everything under control. Professional, efficient, and helped us get back to business quickly.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        }
      }
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": phone,
        "contactType": "emergency",
        "availableLanguage": ["English"],
        "serviceUrl": url,
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "opens": "00:00",
          "closes": "23:59",
          "dayOfWeek": [
            "Monday", "Tuesday", "Wednesday", "Thursday",
            "Friday", "Saturday", "Sunday"
          ]
        }
      }
    ],
    "potentialAction": {
      "@type": "ReserveAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `tel:${phone}`,
        "inLanguage": "en-AU",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      },
      "result": {
        "@type": "Reservation",
        "name": "Emergency Service Call"
      }
    }
  };

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData),
      }}
    />
  );
}

// Emergency Service Schema
export function EmergencyServiceSchema({
  name,
  description,
  serviceTypes,
  responseTime,
  availability,
  phone,
  serviceArea
}: EmergencyServiceSchemaProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "EmergencyService",
    "name": name,
    "description": description,
    "serviceType": serviceTypes,
    "areaServed": serviceArea.map(area => ({
      "@type": "City",
      "name": area
    })),
    "telephone": phone,
    "availableChannel": {
      "@type": "ServiceChannel",
      "servicePhone": {
        "@type": "ContactPoint",
        "telephone": phone,
        "contactType": "emergency",
        "availableLanguage": "English"
      }
    },
    "hoursAvailable": {
      "@type": "OpeningHoursSpecification",
      "opens": "00:00",
      "closes": "23:59",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday", "Sunday"
      ]
    },
    "serviceOutput": {
      "@type": "Service",
      "name": "Emergency Disaster Recovery",
      "description": `${responseTime} emergency response for disaster recovery services`,
      "provider": {
        "@type": "Organization",
        "name": name,
        "telephone": phone
      }
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Response Time",
        "value": responseTime
      },
      {
        "@type": "PropertyValue",
        "name": "Availability",
        "value": availability
      },
      {
        "@type": "PropertyValue",
        "name": "Service Coverage",
        "value": serviceArea.join(", ")
      }
    ]
  };

  return (
    <Script
      id="emergency-service-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData),
      }}
    />
  );
}

// HowTo Schema for Emergency Response
export function EmergencyHowToSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "What to do if your house floods",
    "description": "Emergency steps to take when your house floods to minimise damage and ensure safety",
    "image": "https://disasterrecoverybrisbane.com.au/images/emergency-flood-response.jpg",
    "totalTime": "PT5M",
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "Phone"
      },
      {
        "@type": "HowToSupply",
        "name": "Camera for photos"
      }
    ],
    "tool": [
      {
        "@type": "HowToTool",
        "name": "Emergency contact: 1300 309 361"
      }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Ensure Safety",
        "text": "Turn off electricity if safe to do so and avoid standing water",
        "image": "https://disasterrecoverybrisbane.com.au/images/safety-first.jpg"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Call Emergency Services",
        "text": "Call Disaster Recovery Brisbane immediately at 1300 309 361 for professional emergency response",
        "image": "https://disasterrecoverybrisbane.com.au/images/emergency-call.jpg"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Document Damage",
        "text": "Take photos of damage for insurance purposes before moving items",
        "image": "https://disasterrecoverybrisbane.com.au/images/document-damage.jpg"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Remove Valuables",
        "text": "Move valuables and important documents to dry areas if safely accessible",
        "image": "https://disasterrecoverybrisbane.com.au/images/save-valuables.jpg"
      }
    ]
  };

  return (
    <Script
      id="emergency-howto-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData),
      }}
    />
  );
}

// Speakable Schema for Voice Assistants
export function SpeakableSchema({ content }: { content: string[] }) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": content
    }
  };

  return (
    <Script
      id="speakable-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData),
      }}
    />
  );
}