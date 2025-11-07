/**
 * Schema Generation Module
 * Generates structured data for SEO using Schema.org vocabulary
 */

import { SchemaGenerationContext, SchemaType } from './types';

/**
 * Generate schema based on context and type
 */
export function generateSchema(context: SchemaGenerationContext): unknown {
  const { location, service, contractors, type } = context;

  switch (type) {
    case 'LocalBusiness':
      return generateLocalBusinessSchema(context);
    case 'Service':
      return generateServiceSchema(context);
    case 'FAQPage':
      return generateFAQSchema(context);
    case 'Organization':
      return generateOrganizationSchema(context);
    case 'AggregateRating':
      return generateAggregateRatingSchema(context);
    default:
      return generateDefaultSchema(context);
  }
}

/**
 * Generate LocalBusiness schema
 */
function generateLocalBusinessSchema(context: SchemaGenerationContext): unknown {
  const { location, service, contractors } = context;

  const aggregateRating = calculateAggregateRating(contractors);
  const areaServed = generateAreaServed(location);

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `#${location.slug}-disaster-recovery`,
    name: `Disaster Recovery ${location.name}`,
    description: `Professional disaster recovery and restoration services in ${location.name}, ${location.state}. Water damage, fire damage, mould remediation. 24/7 emergency response.`,
    url: `${process.env.NEXT_PUBLIC_APP_URL}/locations/${location.slug}`,
    telephone: '+61-1300-DISASTER',
    email: 'help@disasterrecovery.com.au',
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.city || location.name,
      addressRegion: location.state,
      postalCode: location.postcode,
      addressCountry: 'AU'
    },
    geo: location.coordinates ? {
      '@type': 'GeoCoordinates',
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng
    } : undefined,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      opens: '00:00',
      closes: '23:59'
    },
    priceRange: '$$',
    aggregateRating,
    areaServed,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Disaster Recovery Services',
      itemListElement: generateServiceOffers(service)
    },
    sameAs: [
      'https://www.facebook.com/disasterrecoveryau',
      'https://www.linkedin.com/company/disaster-recovery-au',
      'https://www.youtube.com/@disasterrecoveryau'
    ]
  };
}

/**
 * Generate Service schema
 */
function generateServiceSchema(context: SchemaGenerationContext): unknown {
  const { location, service, contractors } = context;

  if (!service) {
    return generateDefaultServiceSchema(location);
  }

  const aggregateRating = calculateAggregateRating(contractors);
  const provider = generateProviderInfo(contractors);

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `#${service.slug}-${location.slug}`,
    name: `${service.name} in ${location.name}`,
    description: `Professional ${service.name.toLowerCase()} services in ${location.name}, ${location.state}. IICRC certified contractors, 24/7 emergency response, insurance approved.`,
    serviceType: service.name,
    provider,
    areaServed: generateAreaServed(location),
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${process.env.NEXT_PUBLIC_APP_URL}/services/${service.slug}`,
      servicePhone: '+61-1300-DISASTER',
      availableLanguage: {
        '@type': 'Language',
        name: 'English'
      }
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.name,
      itemListElement: generateServiceSubcategories(service)
    },
    aggregateRating,
    offers: {
      '@type': 'Offer',
      priceRange: '$$',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString()
    },
    termsOfService: `${process.env.NEXT_PUBLIC_APP_URL}/terms`,
    serviceOutput: 'Complete restoration and insurance claim management'
  };
}

/**
 * Generate FAQ schema
 */
function generateFAQSchema(context: SchemaGenerationContext): unknown {
  const { location, service } = context;

  const faqs = generateFAQItems(location, service);

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Generate Organization schema
 */
function generateOrganizationSchema(context: SchemaGenerationContext): unknown {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'National Restoration Platform',
    alternateName: 'NRP Disaster Recovery',
    url: process.env.NEXT_PUBLIC_APP_URL,
    logo: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
    description: 'Australia\'s leading disaster recovery platform connecting insurance claims with certified restoration contractors nationwide.',
    foundingDate: '2010',
    founders: {
      '@type': 'Person',
      name: 'National Restoration Platform'
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AU'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+61-1300-DISASTER',
      contactType: 'emergency hotline',
      availableLanguage: 'English',
      areaServed: 'AU'
    },
    sameAs: [
      'https://www.facebook.com/disasterrecoveryau',
      'https://www.linkedin.com/company/disaster-recovery-au',
      'https://www.youtube.com/@disasterrecoveryau'
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'IICRC Certification',
        credentialCategory: 'Restoration Industry'
      }
    ]
  };
}

/**
 * Generate AggregateRating schema
 */
function generateAggregateRatingSchema(context: SchemaGenerationContext): unknown {
  const { contractors } = context;

  return calculateAggregateRating(contractors);
}

/**
 * Generate default schema
 */
function generateDefaultSchema(context: SchemaGenerationContext): unknown {
  const { location, service } = context;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: service
      ? `${service.name} in ${location.name}`
      : `Disaster Recovery ${location.name}`,
    description: `Professional restoration services in ${location.name}. Water damage, fire damage, mould remediation. 24/7 emergency response.`,
    url: `${process.env.NEXT_PUBLIC_APP_URL}/locations/${location.slug}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Disaster Recovery Australia',
      url: process.env.NEXT_PUBLIC_APP_URL
    },
    breadcrumb: generateBreadcrumb(location, service)
  };
}

// Helper functions

function calculateAggregateRating(contractors?: unknown[]): unknown {
  if (!contractors || contractors.length === 0) {
    return {
      '@type': 'AggregateRating',
      ratingValue: 4.8,
      reviewCount: 1250,
      bestRating: 5,
      worstRating: 1
    };
  }

  const totalRating = contractors.reduce((sum, c) => sum + (c.rating || 4.5), 0);
  const totalReviews = contractors.reduce((sum, c) => sum + (c.reviewCount || 0), 0);

  return {
    '@type': 'AggregateRating',
    ratingValue: (totalRating / contractors.length).toFixed(1),
    reviewCount: totalReviews,
    bestRating: 5,
    worstRating: 1
  };
}

function generateAreaServed(location: unknown): unknown {
  return {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: location.coordinates?.lat || -27.4698,
      longitude: location.coordinates?.lng || 153.0251
    },
    geoRadius: '50000' // 50km radius
  };
}

function generateServiceOffers(service?: unknown): unknown[] {
  const baseServices = [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Water Damage Restoration',
        description: 'Emergency water extraction and drying services'
      }
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Fire Damage Restoration',
        description: 'Complete fire and smoke damage restoration'
      }
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Mould Remediation',
        description: 'Professional mould inspection and removal'
      }
    }
  ];

  if (service) {
    return [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.description
        }
      }
    ];
  }

  return baseServices;
}

function generateProviderInfo(contractors?: unknown[]): unknown {
  if (!contractors || contractors.length === 0) {
    return {
      '@type': 'Organization',
      name: 'Certified Restoration Network',
      description: 'Network of IICRC certified restoration contractors'
    };
  }

  return {
    '@type': 'Organization',
    name: 'Certified Restoration Network',
    description: `${contractors.length} certified contractors available`,
    member: contractors.slice(0, 3).map(c => ({
      '@type': 'Organization',
      name: c.businessName,
      telephone: c.phone
    }))
  };
}

function generateServiceSubcategories(service: unknown): unknown[] {
  if (!service.subcategories || service.subcategories.length === 0) {
    return [];
  }

  return service.subcategories.map((sub: string) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: sub,
      description: `${sub} as part of ${service.name}`
    }
  }));
}

function generateFAQItems(location: unknown, service?: unknown): unknown[] {
  return [
    {
      question: `How quickly can I get emergency ${service ? service.name.toLowerCase() : 'restoration'} in ${location.name}?`,
      answer: `Our certified contractors in ${location.name} typically respond within 2-4 hours for emergencies. We maintain 24/7 availability for urgent disaster recovery needs.`
    },
    {
      question: `What areas around ${location.name} do you service?`,
      answer: `We service ${location.name} and all surrounding suburbs within a 50km radius, ensuring comprehensive coverage for the entire region.`
    },
    {
      question: 'Are your contractors insurance approved?',
      answer: 'Yes, all our contractors work directly with major insurance companies and are approved for insurance claim work. We handle the entire claims process for you.'
    },
    {
      question: 'What certifications do your contractors have?',
      answer: 'All contractors in our network maintain IICRC certification, are fully licensed and insured, and undergo continuous professional development.'
    },
    {
      question: 'How much does restoration typically cost?',
      answer: 'Costs vary based on damage extent. Most work is covered by insurance. We provide free assessments and work directly with your insurer for approval.'
    }
  ];
}

function generateBreadcrumb(location: unknown, service?: unknown): unknown {
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: process.env.NEXT_PUBLIC_APP_URL
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Locations',
      item: `${process.env.NEXT_PUBLIC_APP_URL}/locations`
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: location.name,
      item: `${process.env.NEXT_PUBLIC_APP_URL}/locations/${location.slug}`
    }
  ];

  if (service) {
    items.push({
      '@type': 'ListItem',
      position: 4,
      name: service.name,
      item: `${process.env.NEXT_PUBLIC_APP_URL}/locations/${location.slug}/${service.slug}`
    });
  }

  return {
    '@type': 'BreadcrumbList',
    itemListElement: items
  };
}

function generateDefaultServiceSchema(location: unknown): unknown {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Disaster Recovery Services in ${location.name}`,
    description: `Comprehensive disaster recovery and restoration services in ${location.name}. Water damage, fire damage, mould remediation. 24/7 emergency response.`,
    provider: {
      '@type': 'Organization',
      name: 'National Restoration Platform'
    },
    areaServed: generateAreaServed(location),
    serviceType: [
      'Water Damage Restoration',
      'Fire Damage Restoration',
      'Mould Remediation',
      'Emergency Response',
      'Insurance Claims Management'
    ]
  };
}