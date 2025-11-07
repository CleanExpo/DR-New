// Comprehensive structured data schemas for SEO

export interface LocalBusinessSchema {
  '@context': 'https://schema.org';
  '@type': 'LocalBusiness' | 'EmergencyService';
  '@id'?: string;
  name: string;
  description: string;
  url: string;
  telephone: string;
  email?: string;
  address: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  areaServed: Array<{
    '@type': 'City' | 'State';
    name: string;
  }>;
  openingHoursSpecification?: Array<{
    '@type': 'OpeningHoursSpecification';
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }>;
  priceRange?: string;
  image?: string[];
  sameAs?: string[];
  hasOfferCatalog?: {
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
}

export function generateLocalBusinessSchema(): LocalBusinessSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'EmergencyService',
    '@id': 'https://disasterrecovery.com.au/#organization',
    name: 'Disaster Recovery Brisbane - Master Restorer Phill McGurk',
    description: 'IICRC Master Restorer providing 24/7 emergency disaster recovery services across Brisbane, Ipswich & Logan. Water damage, fire damage, mould remediation specialist.',
    url: 'https://disasterrecovery.com.au',
    telephone: '+61-1300-309-361',
    email: 'admin@disasterrecovery.com.au',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '4/17 Tile St',
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
      { '@type': 'City', name: 'Logan' }
    ],
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59'
    }],
    priceRange: '$$',
    image: [
      'https://disasterrecovery.com.au/images/disaster-recovery-logo.png',
      'https://disasterrecovery.com.au/images/master-restorer-team.jpg'
    ],
    sameAs: [
      'https://www.facebook.com/DisasterRecoveryBrisbane',
      'https://www.linkedin.com/company/disaster-recovery-brisbane'
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
            description: '24/7 water extraction, drying & restoration. Master Restorer certified.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Fire Damage Restoration Brisbane',
            description: 'Complete fire & smoke damage restoration by certified professionals.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mould Remediation Brisbane',
            description: 'Professional mould removal & remediation. Health-safe protocols.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Storm Damage Repair Brisbane',
            description: 'Emergency storm damage response & complete restoration.'
          }
        }
      ]
    }
  };
}

export interface FAQSchema {
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

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): FAQSchema {
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

export interface BreadcrumbSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }>;
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url?: string }>): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export interface ServiceSchema {
  '@context': 'https://schema.org';
  '@type': 'Service';
  '@id': string;
  name: string;
  description: string;
  provider: {
    '@type': 'LocalBusiness';
    name: string;
    telephone: string;
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
  hasOfferCatalog?: {
    '@type': 'OfferCatalog';
    name: string;
    itemListElement: unknown[];
  };
}

export function generateServiceSchema(
  serviceName: string,
  description: string,
  serviceId: string
): ServiceSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `https://disasterrecovery.com.au/#${serviceId}`,
    name: serviceName,
    description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Disaster Recovery Brisbane - Master Restorer',
      telephone: '+61-1300-309-361'
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: -27.4705,  // Brisbane coordinates
        longitude: 153.0260
      },
      geoRadius: '50km'  // 50km radius covering Brisbane, Ipswich, Logan
    }
  };
}