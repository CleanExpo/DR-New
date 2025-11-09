'use client';

import Script from 'next/script';

// Geo-coordinates for key locations
export const GEO_COORDS = {
  brisbane: { lat: -27.4698, lng: 153.0251 },
  hamilton: { lat: -27.4375, lng: 153.0625 },
  ascot: { lat: -27.4297, lng: 153.0531 },
  newFarm: { lat: -27.4697, lng: 153.0475 },
  toowong: { lat: -27.4848, lng: 152.9897 },
  ipswich: { lat: -27.6144, lng: 152.7598 },
  logan: { lat: -27.6394, lng: 153.1089 },
  wacol: { lat: -27.5969, lng: 152.9294 }, // Main office
};

// Person Schema - Phill McGurk (IICRC Master Restorer)
export function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://disasterrecovery.com.au/#phillmcgurk",
    "name": "Phill McGurk",
    "givenName": "Phill",
    "familyName": "McGurk",
    "jobTitle": "Master Restorer & CEO",
    "description": "IICRC Master Restorer - One of a limited number of Master Restorers in Brisbane and Queensland. Expert in water damage restoration, fire damage recovery, and emergency disaster response.",
    "url": "https://disasterrecovery.com.au/about",
    "image": "https://disasterrecovery.com.au/images/team/phill-mcgurk.webp",
    "sameAs": [
      "https://www.linkedin.com/in/phillmcgurk",
      "https://www.iicrc.org"
    ],
    "worksFor": {
      "@id": "https://disasterrecovery.com.au/#organization"
    },
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Master Restorer",
      "occupationalCategory": "Disaster Recovery Specialist",
      "skills": [
        "Water Damage Restoration",
        "Fire Damage Restoration",
        "Mould Remediation",
        "Emergency Response",
        "IICRC Certification",
        "Insurance Claims Management"
      ]
    },
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "IICRC Master Restorer",
        "credentialCategory": "Professional Certification",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Institute of Inspection Cleaning and Restoration Certification",
          "url": "https://www.iicrc.org"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "IICRC Water Damage Restoration Technician",
        "credentialCategory": "Professional Certification"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "IICRC Fire & Smoke Restoration Technician",
        "credentialCategory": "Professional Certification"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "IICRC Applied Microbial Remediation Technician",
        "credentialCategory": "Professional Certification"
      }
    ],
    "knowsAbout": [
      "Water Damage Restoration",
      "Fire Damage Restoration",
      "Mould Remediation",
      "Storm Damage Repair",
      "Emergency Disaster Response",
      "Insurance Restoration",
      "IICRC Standards",
      "Structural Drying"
    ]
  };

  return (
    <Script
      id="person-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Organization Schema
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://disasterrecovery.com.au/#organization",
    "name": "Disaster Recovery Brisbane",
    "alternateName": "Disaster Recovery",
    "legalName": "Disaster Recovery Brisbane Pty Ltd",
    "url": "https://disasterrecovery.com.au",
    "logo": {
      "@type": "ImageObject",
      "url": "https://disasterrecovery.com.au/logos/3D-Disaster-Recovery-Logo.png",
      "width": 1200,
      "height": 630
    },
    "image": "https://disasterrecovery.com.au/logos/3D-Disaster-Recovery-Logo.png",
    "description": "Brisbane's IICRC Master Restorer providing 24/7 emergency disaster recovery services. Water damage, fire damage, mould remediation, and storm damage restoration across Brisbane, Ipswich, and Logan.",
    "slogan": "Brisbane's Master Restorer - Expert Emergency Response",
    "founder": {
      "@id": "https://disasterrecovery.com.au/#phillmcgurk"
    },
    "foundingDate": "2010",
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
      "latitude": GEO_COORDS.wacol.lat,
      "longitude": GEO_COORDS.wacol.lng
    },
    "telephone": "+61-1300-309-361",
    "email": "info@disasterrecoverybrisbane.com.au",
    "sameAs": [
      "https://www.facebook.com/DisasterRecoveryAU",
      "https://www.linkedin.com/company/disaster-recovery-au",
      "https://www.instagram.com/disasterrecoveryau",
      "https://www.youtube.com/@DisasterRecoveryAU"
    ],
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
      }
    ]
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Service Schema Generator
interface ServiceSchemaProps {
  name: string;
  description: string;
  serviceType: string;
  areaServed?: string[];
  url?: string;
  offers?: {
    price?: string;
    priceCurrency?: string;
    availability?: string;
  };
}

export function ServiceSchema({
  name,
  description,
  serviceType,
  areaServed = ['Brisbane', 'Ipswich', 'Logan'],
  url,
  offers
}: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "serviceType": serviceType,
    "provider": {
      "@id": "https://disasterrecovery.com.au/#organization"
    },
    "areaServed": areaServed.map(area => ({
      "@type": "City",
      "name": area
    })),
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": url || "https://disasterrecovery.com.au",
      "servicePhone": "+61-1300-309-361",
      "availableLanguage": {
        "@type": "Language",
        "name": "English"
      }
    },
    "hoursAvailable": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    }
  };

  if (offers) {
    schema['offers'] = {
      "@type": "Offer",
      "price": offers.price || "0",
      "priceCurrency": offers.priceCurrency || "AUD",
      "availability": offers.availability || "https://schema.org/InStock",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "priceCurrency": "AUD",
        "price": offers.price || "0"
      }
    };
  }

  return (
    <Script
      id={`service-schema-${serviceType.toLowerCase().replace(/\s+/g, '-')}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Emergency Service Schema
export function EmergencyServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["EmergencyService", "LocalBusiness"],
    "@id": "https://disasterrecovery.com.au/#emergencyservice",
    "name": "Disaster Recovery Brisbane - 24/7 Emergency Service",
    "description": "24/7 Emergency disaster recovery response. Water damage, fire damage, flood restoration. 60-minute response time Brisbane metro. IICRC Master Restorer certified.",
    "provider": {
      "@id": "https://disasterrecovery.com.au/#organization"
    },
    "telephone": "+61-1300-309-361",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "availableService": [
      {
        "@type": "Service",
        "name": "Emergency Water Damage Response",
        "serviceType": "Emergency Service"
      },
      {
        "@type": "Service",
        "name": "Emergency Fire Damage Response",
        "serviceType": "Emergency Service"
      },
      {
        "@type": "Service",
        "name": "24/7 Flood Restoration",
        "serviceType": "Emergency Service"
      }
    ]
  };

  return (
    <Script
      id="emergency-service-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQ Schema Generator
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// BreadcrumbList Schema Generator
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// HowTo Schema Generator
interface HowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

interface HowToSchemaProps {
  name: string;
  description: string;
  totalTime?: string;
  steps: HowToStep[];
}

export function HowToSchema({ name, description, totalTime, steps }: HowToSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "totalTime": totalTime,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      "image": step.image,
      "url": step.url
    }))
  };

  return (
    <Script
      id="howto-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Location-specific LocalBusiness Schema
interface LocationSchemaProps {
  locationName: string;
  suburb: string;
  coordinates: { lat: number; lng: number };
  description?: string;
  serviceRadius?: string; // in meters
}

export function LocationSchema({
  locationName,
  suburb,
  coordinates,
  description,
  serviceRadius = "50000"
}: LocationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://disasterrecovery.com.au/locations/${suburb.toLowerCase().replace(/\s+/g, '-')}#localbusiness`,
    "name": `Disaster Recovery ${locationName}`,
    "description": description || `24/7 Emergency disaster recovery services in ${locationName}. IICRC Master Restorer. Water damage, fire damage, mould remediation. 60-minute response.`,
    "parentOrganization": {
      "@id": "https://disasterrecovery.com.au/#organization"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": coordinates.lat,
      "longitude": coordinates.lng
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": coordinates.lat,
        "longitude": coordinates.lng
      },
      "geoRadius": serviceRadius
    },
    "telephone": "+61-1300-309-361",
    "email": "info@disasterrecoverybrisbane.com.au",
    "url": `https://disasterrecovery.com.au/locations/${suburb.toLowerCase().replace(/\s+/g, '-')}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": locationName,
      "addressRegion": "QLD",
      "addressCountry": "AU"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "priceRange": "$$",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Emergency Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": `Water Damage Restoration ${locationName}`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": `Fire Damage Restoration ${locationName}`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": `Mould Remediation ${locationName}`
          }
        }
      ]
    }
  };

  return (
    <Script
      id={`location-schema-${suburb.toLowerCase().replace(/\s+/g, '-')}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// AggregateRating Schema (for future use with reviews)
interface AggregateRatingSchemaProps {
  ratingValue?: number;
  reviewCount?: number;
  bestRating?: number;
  worstRating?: number;
}

export function AggregateRatingSchema({
  ratingValue = 4.9,
  reviewCount = 0,
  bestRating = 5,
  worstRating = 1
}: AggregateRatingSchemaProps) {
  // Only render if we have reviews
  if (reviewCount === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "ratingValue": ratingValue,
    "reviewCount": reviewCount,
    "bestRating": bestRating,
    "worstRating": worstRating
  };

  return (
    <Script
      id="aggregate-rating-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Combined Schema Component for easy import
interface StructuredDataProps {
  page?: 'home' | 'service' | 'location' | 'emergency' | 'about';
  service?: ServiceSchemaProps;
  location?: LocationSchemaProps;
  faqs?: FAQItem[];
  breadcrumbs?: BreadcrumbItem[];
  howTo?: HowToSchemaProps;
}

export default function StructuredData({
  page = 'home',
  service,
  location,
  faqs,
  breadcrumbs,
  howTo
}: StructuredDataProps) {
  return (
    <>
      {/* Core schemas on all pages */}
      <OrganizationSchema />
      <PersonSchema />

      {/* Emergency service on home and emergency pages */}
      {(page === 'home' || page === 'emergency') && <EmergencyServiceSchema />}

      {/* Service-specific schema */}
      {service && <ServiceSchema {...service} />}

      {/* Location-specific schema */}
      {location && <LocationSchema {...location} />}

      {/* FAQ schema */}
      {faqs && faqs.length > 0 && <FAQSchema faqs={faqs} />}

      {/* Breadcrumb schema */}
      {breadcrumbs && breadcrumbs.length > 0 && <BreadcrumbSchema items={breadcrumbs} />}

      {/* HowTo schema */}
      {howTo && <HowToSchema {...howTo} />}
    </>
  );
}
