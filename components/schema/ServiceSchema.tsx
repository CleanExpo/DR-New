import Script from 'next/script';

interface ServiceSchemaProps {
  serviceName: string;
  description: string;
  serviceType?: string;
  url?: string;
  areaServed?: string[];
  provider?: {
    name: string;
    url: string;
  };
  offers?: {
    price?: string;
    priceCurrency?: string;
    priceRange?: string;
    description?: string;
  };
  aggregateRating?: {
    ratingValue: string;
    reviewCount: string;
    bestRating?: string;
    worstRating?: string;
  };
}

export const ServiceSchema: React.FC<ServiceSchemaProps> = ({
  serviceName,
  description,
  serviceType = 'Service',
  url = 'https://disasterrecovery.com.au',
  areaServed = ['Brisbane', 'Ipswich', 'Logan'],
  provider = {
    name: 'Disaster Recovery Brisbane',
    url: 'https://disasterrecovery.com.au'
  },
  offers,
  aggregateRating
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": serviceType,
    "name": serviceName,
    description,
    url,
    "provider": {
      "@type": "LocalBusiness",
      "@id": "https://disasterrecovery.com.au/#organization",
      "name": provider.name,
      "url": provider.url,
      "telephone": "+61-1300-309-361",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "4/17 Tile St",
        "addressLocality": "Wacol",
        "addressRegion": "QLD",
        "postalCode": "4076",
        "addressCountry": "AU"
      }
    },
    "areaServed": areaServed.map(area => ({
      "@type": "City",
      "name": area
    })),
    "serviceType": serviceName,
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": url,
      "servicePhone": {
        "@type": "ContactPoint",
        "telephone": "+61-1300-309-361",
        "contactType": "Emergency Service",
        "availableLanguage": "English",
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        }
      }
    },
    "category": "Emergency Disaster Recovery",
    "audience": {
      "@type": "Audience",
      "audienceType": ["Homeowners", "Property Managers", "Insurance Companies", "Commercial Property Owners"]
    },
    ...(offers && {
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "availabilityStarts": "2024-01-01",
        ...(offers.price && { "price": offers.price }),
        ...(offers.priceCurrency && { "priceCurrency": offers.priceCurrency }),
        ...(offers.priceRange && { "priceRange": offers.priceRange }),
        ...(offers.description && { "description": offers.description }),
        "seller": {
          "@id": "https://disasterrecovery.com.au/#organization"
        }
      }
    }),
    ...(aggregateRating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": aggregateRating.ratingValue,
        "reviewCount": aggregateRating.reviewCount,
        "bestRating": aggregateRating.bestRating || "5",
        "worstRating": aggregateRating.worstRating || "1"
      }
    })
  };

  return (
    <Script
      id={`service-schema-${serviceName.toLowerCase().replace(/\s+/g, '-')}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
