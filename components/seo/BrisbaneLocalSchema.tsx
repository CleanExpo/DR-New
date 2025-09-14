'use client';

import Script from 'next/script';

interface Location {
  name: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  riskLevel: string;
}

// Real Brisbane suburb coordinates and data
const brisbaneLocations: Location[] = [
  // Extreme Risk Suburbs
  { name: 'Rocklea', postalCode: '4106', latitude: -27.5358, longitude: 153.0076, riskLevel: 'Extreme' },
  { name: 'Milton', postalCode: '4064', latitude: -27.4698, longitude: 153.0051, riskLevel: 'Extreme' },
  { name: 'West End', postalCode: '4101', latitude: -27.4862, longitude: 153.0033, riskLevel: 'Extreme' },
  { name: 'Newstead', postalCode: '4006', latitude: -27.4474, longitude: 153.0462, riskLevel: 'Extreme' },

  // High Value Areas
  { name: 'New Farm', postalCode: '4005', latitude: -27.4705, longitude: 153.0493, riskLevel: 'High' },
  { name: 'Ascot', postalCode: '4007', latitude: -27.4274, longitude: 153.0575, riskLevel: 'Medium' },
  { name: 'Hamilton', postalCode: '4007', latitude: -27.4385, longitude: 153.0642, riskLevel: 'High' },
  { name: 'Bulimba', postalCode: '4171', latitude: -27.4520, longitude: 153.0598, riskLevel: 'High' },

  // Commercial Centers
  { name: 'Brisbane CBD', postalCode: '4000', latitude: -27.4705, longitude: 153.0260, riskLevel: 'Medium' },
  { name: 'Fortitude Valley', postalCode: '4006', latitude: -27.4573, longitude: 153.0342, riskLevel: 'Medium' },
  { name: 'South Brisbane', postalCode: '4101', latitude: -27.4750, longitude: 153.0170, riskLevel: 'High' },

  // Ipswich Areas
  { name: 'Ipswich CBD', postalCode: '4305', latitude: -27.6144, longitude: 152.7594, riskLevel: 'High' },
  { name: 'Goodna', postalCode: '4300', latitude: -27.6104, longitude: 152.8981, riskLevel: 'Extreme' },
  { name: 'Bundamba', postalCode: '4304', latitude: -27.6050, longitude: 152.8110, riskLevel: 'High' },
];

export function BrisbaneLocalSchema() {
  // Generate schema for each location
  const locationSchemas = brisbaneLocations.map(location => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://disaster-recovery-seven.vercel.app/#${location.name.toLowerCase().replace(' ', '-')}`,
    "name": `Disaster Recovery Claims Consulting - ${location.name}`,
    "description": `Expert insurance claims consulting for ${location.name} residents. Specializing in ${location.riskLevel.toLowerCase()} flood risk areas. 24/7 emergency response for water damage, fire damage, and mould remediation claims.`,
    "url": `https://disaster-recovery-seven.vercel.app/locations/${location.name.toLowerCase().replace(' ', '-')}`,
    "telephone": "1300-XXX-XXX",
    "priceRange": "$850-$5000",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": location.name,
      "postalCode": location.postalCode,
      "addressRegion": "QLD",
      "addressCountry": "AU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": location.latitude,
      "longitude": location.longitude
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": location.latitude,
        "longitude": location.longitude
      },
      "geoRadius": "10000"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${location.name} Insurance Claims Services`,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": `${location.riskLevel} Flood Risk Assessment`,
            "description": `Specialized assessment for ${location.name}'s ${location.riskLevel.toLowerCase()} flood risk profile`
          }
        }
      ]
    }
  }));

  // Service Area schema covering all of Brisbane and Ipswich
  const serviceAreaSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://disaster-recovery-seven.vercel.app/#service-area",
    "serviceType": "Insurance Claims Consulting",
    "provider": {
      "@type": "Organization",
      "name": "Disaster Recovery Claims Consulting"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Brisbane",
        "containsPlace": brisbaneLocations.filter(l => l.postalCode.startsWith('4')).map(l => ({
          "@type": "Place",
          "name": l.name,
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": l.latitude,
            "longitude": l.longitude
          }
        }))
      },
      {
        "@type": "City",
        "name": "Ipswich",
        "containsPlace": [
          {
            "@type": "Place",
            "name": "Ipswich CBD"
          },
          {
            "@type": "Place",
            "name": "Goodna"
          },
          {
            "@type": "Place",
            "name": "Bundamba"
          }
        ]
      },
      {
        "@type": "City",
        "name": "Logan"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Southeast Queensland"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Regional Insurance Claims Services",
      "itemListElement": [
        {
          "@type": "OfferCategory",
          "name": "Flood Damage Claims",
          "itemListElement": brisbaneLocations.map(l => ({
            "@type": "Offer",
            "name": `${l.name} Flood Claims Assessment`,
            "eligibleRegion": {
              "@type": "Place",
              "name": l.name
            }
          }))
        }
      ]
    }
  };

  // Aggregate Rating schema with location-specific reviews
  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "itemReviewed": {
      "@type": "ProfessionalService",
      "name": "Disaster Recovery Claims Consulting",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "Queensland",
        "addressCountry": "AU"
      }
    },
    "ratingValue": "4.9",
    "reviewCount": "247",
    "bestRating": "5",
    "worstRating": "1",
    "ratingExplanation": "Based on verified insurance claim outcomes across Brisbane and Ipswich",
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Ken O.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Narangba"
          }
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "After 2 years fighting insurance for 2022 flood damage, their assessment got us full settlement in 6 weeks."
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Sarah M.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "West End"
          }
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "Saved $330,000 on commercial mould remediation. Local expertise made the difference."
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "David L.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Milton"
          }
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "They know every suburb's flood risk. Got us coverage when others said impossible."
      }
    ]
  };

  return (
    <>
      {locationSchemas.map((schema, index) => (
        <Script
          key={`location-${index}`}
          id={`location-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Script
        id="service-area-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceAreaSchema) }}
      />
      <Script
        id="aggregate-rating-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
      />
    </>
  );
}