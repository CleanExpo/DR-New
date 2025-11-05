'use client';

import Script from 'next/script';

interface SchemaProps {
  pageType?: 'home' | 'service' | 'location' | 'article' | 'faq';
  location?: string;
  service?: string;
}

/**
 * Comprehensive Schema Markup System
 * Implements all relevant schema types for maximum rich snippet eligibility
 */
export const ComprehensiveSchema: React.FC<SchemaProps> = ({
  pageType = 'home',
  location,
  service
}) => {
  // Organization Schema with extensive details
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://disaster-recovery-seven.vercel.app/#organization",
    "name": "Disaster Recovery Australia",
    "alternateName": "National Restoration Platform",
    "url": "https://disaster-recovery-seven.vercel.app",
    "logo": {
      "@type": "ImageObject",
      "url": "https://disaster-recovery-seven.vercel.app/logos/disaster-recovery-logo.png",
      "width": 512,
      "height": 512
    },
    "image": [
      "https://disaster-recovery-seven.vercel.app/images/hero/disaster-recovery-services.jpg",
      "https://disaster-recovery-seven.vercel.app/images/team.jpg"
    ],
    "description": "Australia's leading network of 10,000+ IICRC-certified disaster restoration specialists providing 24/7 emergency response nationwide.",
    "telephone": "1300-DISASTER",
    "email": "emergency@disasterrecovery.com.au",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "AU",
      "addressRegion": "National Coverage"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -25.2744,
      "longitude": 133.7751
    },
    "areaServed": {
      "@type": "Country",
      "name": "Australia"
    },
    "sameAs": [
      "https://www.facebook.com/DisasterRecoveryAU",
      "https://www.linkedin.com/company/disaster-recovery-au",
      "https://www.instagram.com/disasterrecoveryau",
      "https://www.youtube.com/@DisasterRecoveryAU",
      "https://twitter.com/DisasterRecovAU"
    ],
    "founder": {
      "@type": "Person",
      "name": "National Restoration Platform"
    },
    "foundingDate": "2020",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": 10000,
      "minValue": 10000
    },
    "slogan": "Restoring Australia, One Property at a Time",
    "award": [
      "IICRC Certified Network 2023",
      "Australia's Most Trusted Restoration Service 2023",
      "Best Emergency Response Time 2023"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 4.8,
      "reviewCount": 15234,
      "bestRating": 5
    }
  };

  // Local Business Schema for location pages
  const localBusinessSchema = location ? {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Disaster Recovery ${location}`,
    "image": "https://disaster-recovery-seven.vercel.app/images/locations/" + location.toLowerCase() + ".jpg",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": location,
      "addressRegion": getStateFromCity(location),
      "addressCountry": "AU"
    },
    "telephone": "1300-DISASTER",
    "url": `https://disaster-recovery-seven.vercel.app/locations/${location.toLowerCase()}`,
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Emergency Restoration Services",
      "itemListElement": generateServiceOffers()
    }
  } : null;

  // Service Schema for service pages
  const serviceSchema = service ? {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service,
    "provider": {
      "@id": "https://disaster-recovery-seven.vercel.app/#organization"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Australia"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": service + " Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Emergency " + service,
            "description": "24/7 emergency response for " + service.toLowerCase()
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Insurance " + service,
            "description": "Insurance approved " + service.toLowerCase() + " services"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 4.8,
      "reviewCount": 3456
    }
  } : null;

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How quickly can you respond to emergency calls?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We guarantee response within 2-4 hours for emergency situations, with 24/7 availability across Australia. Our network of 10,000+ certified technicians ensures rapid response in all major cities and regional areas."
        }
      },
      {
        "@type": "Question",
        "name": "Do you work with insurance companies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we work with all major insurance companies in Australia. We handle the entire claims process, providing detailed documentation, photos, and reports required for insurance approval."
        }
      },
      {
        "@type": "Question",
        "name": "What certifications do your technicians have?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "All our technicians are IICRC certified (Institute of Inspection, Cleaning and Restoration Certification), which is the global standard for restoration professionals. They undergo continuous training in the latest restoration techniques."
        }
      },
      {
        "@type": "Question",
        "name": "What areas do you service?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide nationwide coverage across Australia, including all capital cities, regional centres, and remote areas. From Sydney to Perth, Brisbane to Hobart, and everywhere in between."
        }
      },
      {
        "@type": "Question",
        "name": "What types of damage do you handle?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We handle all types of property damage including water damage, fire damage, mould remediation, storm damage, biohazard cleanup, sewage overflow, and structural repairs for residential, commercial, and industrial properties."
        }
      }
    ]
  };

  // HowTo Schema for process pages
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Handle Emergency Water Damage",
    "description": "Step-by-step guide for immediate response to water damage",
    "image": "https://disaster-recovery-seven.vercel.app/images/water-damage-guide.jpg",
    "totalTime": "PT30M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "AUD",
      "value": "0"
    },
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "Towels and mops"
      },
      {
        "@type": "HowToSupply",
        "name": "Fans or dehumidifiers"
      }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "name": "Stop the water source",
        "text": "Turn off the main water supply if the leak is from plumbing",
        "image": "https://disaster-recovery-seven.vercel.app/images/step1.jpg"
      },
      {
        "@type": "HowToStep",
        "name": "Call professionals",
        "text": "Contact Disaster Recovery Australia at 1300-DISASTER for immediate assistance",
        "image": "https://disaster-recovery-seven.vercel.app/images/step2.jpg"
      },
      {
        "@type": "HowToStep",
        "name": "Document the damage",
        "text": "Take photos and videos for insurance purposes before cleanup",
        "image": "https://disaster-recovery-seven.vercel.app/images/step3.jpg"
      },
      {
        "@type": "HowToStep",
        "name": "Remove water",
        "text": "Use mops, towels, or wet vacuum to remove standing water",
        "image": "https://disaster-recovery-seven.vercel.app/images/step4.jpg"
      }
    ]
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": generateBreadcrumbs(pageType, location, service)
  };

  // WebSite Schema with SiteLinks Search Box
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://disaster-recovery-seven.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://disaster-recovery-seven.vercel.app/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Emergency Service Schema
  const emergencyServiceSchema = {
    "@context": "https://schema.org",
    "@type": "EmergencyService",
    "name": "Disaster Recovery Emergency Response",
    "telephone": "1300-DISASTER",
    "availableLanguage": ["en-AU"],
    "serviceArea": {
      "@type": "Country",
      "name": "Australia"
    }
  };

  // Helper functions
  function getStateFromCity(city: string): string {
    const stateMap: { [key: string]: string } = {
      'Sydney': 'NSW',
      'Melbourne': 'VIC',
      'Brisbane': 'QLD',
      'Perth': 'WA',
      'Adelaide': 'SA',
      'Hobart': 'TAS',
      'Darwin': 'NT',
      'Canberra': 'ACT'
    };
    return stateMap[city] || 'Australia';
  }

  function generateServiceOffers() {
    const services = [
      'Water Damage Restoration',
      'Fire Damage Restoration',
      'Mould Remediation',
      'Storm Damage Repair',
      'Biohazard Cleanup'
    ];

    return services.map(service => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": service,
        "description": `Professional ${service.toLowerCase()} services available 24/7`
      }
    }));
  }

  function generateBreadcrumbs(type: string, loc?: string, srv?: string) {
    const breadcrumbs = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://disaster-recovery-seven.vercel.app"
      }
    ];

    if (type === 'location' && loc) {
      breadcrumbs.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Locations",
        "item": "https://disaster-recovery-seven.vercel.app/locations"
      });
      breadcrumbs.push({
        "@type": "ListItem",
        "position": 3,
        "name": loc,
        "item": `https://disaster-recovery-seven.vercel.app/locations/${loc.toLowerCase()}`
      });
    }

    if (type === 'service' && srv) {
      breadcrumbs.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://disaster-recovery-seven.vercel.app/services"
      });
      breadcrumbs.push({
        "@type": "ListItem",
        "position": 3,
        "name": srv,
        "item": `https://disaster-recovery-seven.vercel.app/services/${srv.toLowerCase()}`
      });
    }

    return breadcrumbs;
  }

  // Combine all schemas
  const allSchemas = [
    organizationSchema,
    localBusinessSchema,
    serviceSchema,
    faqSchema,
    howToSchema,
    breadcrumbSchema,
    websiteSchema,
    emergencyServiceSchema
  ].filter(Boolean);

  return (
    <Script
      id="comprehensive-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(allSchemas)
      }}
    />
  );
};

export default ComprehensiveSchema;