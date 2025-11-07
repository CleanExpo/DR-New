/**
 * Advanced Schema.org Markup Generator
 * Generates comprehensive structured data for all page types
 */

export interface LocalBusinessSchemaData {
  '@context': 'https://schema.org';
  '@type': 'LocalBusiness' | 'EmergencyService' | 'ProfessionalService';
  '@id': string;
  name: string;
  description: string;
  image: string[];
  url: string;
  telephone: string;
  email: string;
  address: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  areaServed: Array<{
    '@type': 'City' | 'LocalArea';
    name: string;
  }>;
  priceRange: string;
  openingHoursSpecification: Array<{
    '@type': 'OpeningHoursSpecification';
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }>;
  sameAs: string[];
  hasOfferCatalog: {
    '@type': 'OfferCatalog';
    name: string;
    itemListElement: Array<{
      '@type': 'Offer';
      itemOffered: {
        '@type': 'Service';
        name: string;
        description: string;
      };
    }>;
  };
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: string;
    reviewCount: string;
  };
}

export function generateLocalBusinessSchema(): LocalBusinessSchemaData {
  return {
    '@context': 'https://schema.org',
    '@type': 'EmergencyService',
    '@id': 'https://disasterrecovery.com.au/#organization',
    name: 'Disaster Recovery Brisbane - Phill McGurk Master Restorer',
    description: 'IICRC & RAI certified Master Restorer providing 24/7 emergency disaster recovery and restoration services. Water damage, fire damage, mould remediation. Brisbane, Ipswich, Logan.',
    image: [
      'https://disasterrecovery.com.au/images/master-restorer-team.jpg',
      'https://disasterrecovery.com.au/images/disaster-recovery-logo.png',
      'https://disasterrecovery.com.au/images/fire-water-damage-restoration.jpg'
    ],
    url: 'https://disasterrecovery.com.au',
    telephone: '+61-1300-309-361',
    email: 'admin@disasterrecovery.com.au',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '4/17 Tile Street',
      addressLocality: 'Wacol',
      addressRegion: 'QLD',
      postalCode: '4076',
      addressCountry: 'AU'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -27.5976,
      longitude: 152.9323
    },
    areaServed: [
      { '@type': 'City', name: 'Brisbane' },
      { '@type': 'City', name: 'Ipswich' },
      { '@type': 'City', name: 'Logan' },
      { '@type': 'LocalArea', name: 'Hamilton' },
      { '@type': 'LocalArea', name: 'Ascot' },
      { '@type': 'LocalArea', name: 'New Farm' },
      { '@type': 'LocalArea', name: 'Toowong' },
      { '@type': 'LocalArea', name: 'Karalee' },
      { '@type': 'LocalArea', name: 'Brookwater' }
    ],
    priceRange: '$$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59'
      }
    ],
    sameAs: [
      'https://www.facebook.com/DisasterRecoveryBrisbane',
      'https://www.linkedin.com/company/disaster-recovery-brisbane',
      'https://www.google.com/maps/place/Disaster+Recovery+Brisbane'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Emergency Restoration Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Water Damage Restoration Brisbane',
            description: 'Emergency water extraction, drying, and restoration. IICRC S500 compliant.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Fire Damage Restoration Brisbane',
            description: 'Complete fire and smoke damage restoration. Professional soot cleanup.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mould Remediation Brisbane',
            description: 'Professional mould removal and remediation services. Health-safe protocols.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Storm Damage Restoration Brisbane',
            description: 'Emergency storm and cyclone damage response and restoration.'
          }
        }
      ]
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '150'
    }
  };
}

/**
 * Service Schema for specific services
 */
export interface ServiceSchemaData {
  '@context': 'https://schema.org';
  '@type': 'Service';
  '@id': string;
  name: string;
  description: string;
  provider: {
    '@type': 'LocalBusiness';
    name: string;
    telephone: string;
    url: string;
  };
  areaServed: {
    '@type': 'GeoCircle';
    geoMidpoint: {
      '@type': 'GeoCoordinates';
      latitude: number;
      longitude: number;
    };
    geoRadius: string;
  };
  availableChannel: {
    '@type': 'ServiceChannel';
    serviceUrl: string;
    servicePhone: string;
    availableLanguage: string;
  };
  offers?: {
    '@type': 'Offer';
    availability: string;
    priceCurrency: string;
    priceRange: string;
  };
}

export function generateServiceSchema(
  serviceName: string,
  serviceId: string,
  description: string
): ServiceSchemaData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `https://disasterrecovery.com.au/#${serviceId}`,
    name: serviceName,
    description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Disaster Recovery Brisbane',
      telephone: '+61-1300-309-361',
      url: 'https://disasterrecovery.com.au'
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: -27.4705,
        longitude: 153.0260
      },
      geoRadius: '50km'
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: 'https://disasterrecovery.com.au',
      servicePhone: '+61-1300-309-361',
      availableLanguage: 'English'
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'AUD',
      priceRange: '$$$'
    }
  };
}

/**
 * FAQ Page Schema
 */
export interface FAQPageSchemaData {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
): FAQPageSchemaData {
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
 * Breadcrumb Navigation Schema
 */
export interface BreadcrumbSchemaData {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }>;
}

export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url?: string }>
): BreadcrumbSchemaData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };
}

/**
 * Article/Guide Schema (for blog posts and guides)
 */
export interface ArticleSchemaData {
  '@context': 'https://schema.org';
  '@type': 'Article' | 'NewsArticle' | 'BlogPosting';
  '@id': string;
  headline: string;
  description: string;
  image: string[];
  datePublished: string;
  dateModified: string;
  author: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    url: string;
    logo: {
      '@type': 'ImageObject';
      url: string;
      width: number;
      height: number;
    };
  };
  mainEntity?: {
    '@type': 'Thing';
    name: string;
  };
}

export function generateArticleSchema(
  title: string,
  description: string,
  path: string,
  publishDate: string,
  imageUrl?: string
): ArticleSchemaData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `https://disasterrecovery.com.au${path}`,
    headline: title,
    description,
    image: imageUrl ? [imageUrl] : [],
    datePublished: publishDate,
    dateModified: new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: 'Disaster Recovery Brisbane',
      url: 'https://disasterrecovery.com.au'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Disaster Recovery Brisbane',
      url: 'https://disasterrecovery.com.au',
      logo: {
        '@type': 'ImageObject',
        url: 'https://disasterrecovery.com.au/logos/disaster-recovery-logo.png',
        width: 250,
        height: 250
      }
    }
  };
}

/**
 * Video Schema (for emergency response videos)
 */
export interface VideoSchemaData {
  '@context': 'https://schema.org';
  '@type': 'VideoObject';
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
  contentUrl?: string;
  embedUrl?: string;
}

export function generateVideoSchema(
  title: string,
  description: string,
  thumbnailUrl: string,
  duration: string
): VideoSchemaData {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: title,
    description,
    thumbnailUrl,
    uploadDate: new Date().toISOString(),
    duration
  };
}

/**
 * Organization Contact Point Schema
 */
export interface ContactPointSchemaData {
  '@context': 'https://schema.org';
  '@type': 'ContactPoint';
  telephone: string;
  contactType: string;
  areaServed: string;
  availableLanguage: string;
  availableHours?: string;
}

export function generateContactPointSchema(): ContactPointSchemaData {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPoint',
    telephone: '+61-1300-309-361',
    contactType: 'Emergency Service',
    areaServed: 'AU-QLD',
    availableLanguage: 'English',
    availableHours: 'Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59'
  };
}

/**
 * Location-specific LocalBusiness Schema
 */
export function generateLocationSchema(
  location: string,
  latitude: number,
  longitude: number
): LocalBusinessSchemaData {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://disasterrecovery.com.au/locations/${location.toLowerCase()}`,
    name: `Disaster Recovery ${location} - Master Restorer`,
    description: `Emergency disaster recovery and restoration services in ${location}. IICRC certified. Available 24/7.`,
    image: [
      'https://disasterrecovery.com.au/images/master-restorer-team.jpg'
    ],
    url: `https://disasterrecovery.com.au/locations/${location.toLowerCase()}`,
    telephone: '+61-1300-309-361',
    email: 'admin@disasterrecovery.com.au',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '4/17 Tile Street',
      addressLocality: location,
      addressRegion: 'QLD',
      postalCode: '4076',
      addressCountry: 'AU'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude,
      longitude
    },
    areaServed: [
      { '@type': 'LocalArea', name: location }
    ],
    priceRange: '$$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59'
      }
    ],
    sameAs: [
      'https://www.google.com/maps/place/Disaster+Recovery+Brisbane'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Restoration Services in ${location}`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: `Water Damage Restoration ${location}`,
            description: 'Emergency water extraction and restoration'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: `Fire Damage Restoration ${location}`,
            description: 'Professional fire and smoke damage restoration'
          }
        }
      ]
    }
  };
}

/**
 * JSON-LD Script Generator
 * Wraps schema data for Next.js Script component
 */
export function generateJSONLD(
  schema: Record<string, any>
): string {
  return JSON.stringify(schema, null, 2);
}

/**
 * Multiple schema generator (combines multiple schemas on one page)
 */
export function generateCombinedSchema(
  schemas: Record<string, any>[]
): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': schemas
  }, null, 2);
}

export default {
  generateLocalBusinessSchema,
  generateServiceSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateArticleSchema,
  generateVideoSchema,
  generateContactPointSchema,
  generateLocationSchema,
  generateJSONLD,
  generateCombinedSchema
};
