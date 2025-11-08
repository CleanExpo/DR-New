/**
 * Comprehensive Schema Markup Library
 * Award-Level SEO Implementation for Disaster Recovery Brisbane
 *
 * This library provides complete Schema.org structured data for:
 * - LocalBusiness (main organization)
 * - Person (Phill McGurk - Master Restorer)
 * - Service (all restoration services)
 * - FAQPage (FAQ sections)
 * - BreadcrumbList (navigation)
 * - AggregateRating (when testimonials exist)
 */

export interface SchemaConfig {
  baseUrl: string;
  organizationName: string;
  telephone: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
}

const DEFAULT_CONFIG: SchemaConfig = {
  baseUrl: 'https://disasterrecovery.com.au',
  organizationName: 'Disaster Recovery Brisbane',
  telephone: '+61-1300-309-361',
  email: 'admin@disasterrecovery.com.au',
  address: {
    streetAddress: '4/17 Tile St',
    addressLocality: 'Wacol',
    addressRegion: 'QLD',
    postalCode: '4076',
    addressCountry: 'AU'
  },
  geo: {
    latitude: -27.5969,
    longitude: 152.9294
  }
};

/**
 * Person Schema for Phill McGurk - IICRC Master Restorer
 */
export function generatePersonSchema(config: SchemaConfig = DEFAULT_CONFIG) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${config.baseUrl}/#phill-mcgurk`,
    name: 'Phill McGurk',
    jobTitle: 'Master Restorer',
    description: 'IICRC Master Restorer - One of limited Master Restorers in Queensland. Expert in water damage restoration, fire damage restoration, and disaster recovery.',
    url: `${config.baseUrl}/about-phil-mcgurk`,
    image: `${config.baseUrl}/images/team/phill-mcgurk.jpg`,
    knowsAbout: [
      'Water Damage Restoration',
      'Fire Damage Restoration',
      'Mould Remediation',
      'Storm Damage Repair',
      'Flood Recovery',
      'IICRC Standards',
      'Emergency Response',
      'Insurance Restoration',
      'Structural Drying',
      'Biohazard Cleanup'
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'IICRC Master Restorer',
        credentialCategory: 'Master Certification',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Institute of Inspection, Cleaning and Restoration Certification (IICRC)'
        }
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'IICRC Water Damage Restoration Technician (WRT)',
        credentialCategory: 'Professional Certification'
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'IICRC Fire & Smoke Restoration Technician (FSRT)',
        credentialCategory: 'Professional Certification'
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'IICRC Applied Microbial Remediation Technician (AMRT)',
        credentialCategory: 'Professional Certification'
      }
    ],
    worksFor: {
      '@id': `${config.baseUrl}/#organization`
    },
    memberOf: {
      '@type': 'Organization',
      name: 'IICRC - Institute of Inspection, Cleaning and Restoration Certification',
      url: 'https://www.iicrc.org'
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Brisbane',
        containedInPlace: {
          '@type': 'State',
          name: 'Queensland',
          containedInPlace: {
            '@type': 'Country',
            name: 'Australia'
          }
        }
      },
      {
        '@type': 'City',
        name: 'Ipswich'
      },
      {
        '@type': 'City',
        name: 'Logan'
      }
    ]
  };
}

/**
 * LocalBusiness Schema - Main Organization
 */
export function generateLocalBusinessSchema(config: SchemaConfig = DEFAULT_CONFIG) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${config.baseUrl}/#organization`,
    name: config.organizationName,
    alternateName: 'Disaster Recovery',
    legalName: 'Disaster Recovery Brisbane Pty Ltd',
    url: config.baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${config.baseUrl}/logos/3D-Disaster-Recovery-Logo.png`,
      width: 1200,
      height: 630,
      caption: 'Disaster Recovery Brisbane - IICRC Master Restorer Phill McGurk'
    },
    image: [
      `${config.baseUrl}/logos/3D-Disaster-Recovery-Logo.png`,
      `${config.baseUrl}/images/team/phill-mcgurk.jpg`
    ],
    description: "Brisbane's IICRC Master Restorer providing 24/7 emergency water damage, fire damage, mould restoration, and storm damage services. Serving Brisbane, Ipswich & Logan with 60-minute response time.",
    slogan: "Brisbane's Master Restorer - Expert Emergency Response",
    priceRange: '$$',
    telephone: config.telephone,
    email: config.email,
    address: {
      '@type': 'PostalAddress',
      ...config.address
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: config.geo.latitude,
      longitude: config.geo.longitude
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Brisbane',
        sameAs: 'https://en.wikipedia.org/wiki/Brisbane'
      },
      {
        '@type': 'City',
        name: 'Ipswich',
        sameAs: 'https://en.wikipedia.org/wiki/Ipswich,_Queensland'
      },
      {
        '@type': 'City',
        name: 'Logan',
        sameAs: 'https://en.wikipedia.org/wiki/City_of_Logan'
      },
      {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: -27.4698,
          longitude: 153.0251
        },
        geoRadius: '50000'
      }
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59'
      }
    ],
    sameAs: [
      'https://www.facebook.com/DisasterRecoveryAU',
      'https://www.linkedin.com/company/disaster-recovery-au',
      'https://www.instagram.com/disasterrecoveryau',
      'https://www.youtube.com/@DisasterRecoveryAU'
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: config.telephone,
        contactType: 'Emergency Service',
        availableLanguage: ['English'],
        areaServed: ['AU'],
        contactOption: 'TollFree',
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59'
        }
      }
    ],
    founder: {
      '@id': `${config.baseUrl}/#phill-mcgurk`
    },
    employee: {
      '@id': `${config.baseUrl}/#phill-mcgurk`
    }
  };
}

/**
 * Service Schema Generator
 */
interface ServiceSchemaOptions {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  areaServed?: string[];
  provider?: string;
}

export function generateServiceSchema(
  options: ServiceSchemaOptions,
  config: SchemaConfig = DEFAULT_CONFIG
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: options.name,
    description: options.description,
    url: options.url,
    serviceType: options.serviceType,
    provider: {
      '@id': `${config.baseUrl}/#organization`
    },
    areaServed: (options.areaServed || ['Brisbane', 'Ipswich', 'Logan']).map(city => ({
      '@type': 'City',
      name: city
    })),
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: config.baseUrl,
      servicePhone: {
        '@type': 'ContactPoint',
        telephone: config.telephone,
        contactType: 'Emergency Service',
        availableLanguage: 'English',
        hoursAvailable: '24/7'
      }
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      availabilityStarts: new Date().toISOString().split('T')[0],
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'AUD'
      }
    }
  };
}

/**
 * FAQPage Schema Generator
 */
interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQPageSchema(faqs: FAQItem[], config: SchemaConfig = DEFAULT_CONFIG) {
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
 * BreadcrumbList Schema Generator
 */
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(
  items: BreadcrumbItem[],
  config: SchemaConfig = DEFAULT_CONFIG
) {
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

/**
 * Location-Specific Schema Generator
 */
interface LocationSchemaOptions {
  locationName: string;
  suburb: string;
  latitude: number;
  longitude: number;
  description?: string;
}

export function generateLocationSchema(
  options: LocationSchemaOptions,
  config: SchemaConfig = DEFAULT_CONFIG
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `${config.organizationName} - ${options.locationName}`,
    description: options.description || `Emergency disaster restoration services in ${options.locationName}. IICRC Master Restorer providing 24/7 water damage, fire damage, and flood recovery.`,
    telephone: config.telephone,
    email: config.email,
    address: {
      '@type': 'PostalAddress',
      ...config.address
    },
    areaServed: {
      '@type': 'City',
      name: options.suburb,
      containedInPlace: {
        '@type': 'City',
        name: 'Brisbane',
        containedInPlace: {
          '@type': 'State',
          name: 'Queensland'
        }
      }
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: options.latitude,
      longitude: options.longitude
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59'
    },
    priceRange: '$$',
    url: `${config.baseUrl}/locations/${options.suburb.toLowerCase().replace(/\s+/g, '-')}`,
    parentOrganization: {
      '@id': `${config.baseUrl}/#organization`
    }
  };
}

/**
 * AggregateRating Schema (use when testimonials exist)
 */
interface RatingOptions {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}

export function generateAggregateRatingSchema(
  options: RatingOptions,
  config: SchemaConfig = DEFAULT_CONFIG
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: options.ratingValue,
    reviewCount: options.reviewCount,
    bestRating: options.bestRating || 5,
    worstRating: options.worstRating || 1,
    itemReviewed: {
      '@id': `${config.baseUrl}/#organization`
    }
  };
}

/**
 * Pre-configured service schemas for common services
 */
export const SERVICE_SCHEMAS = {
  waterDamage: (config: SchemaConfig = DEFAULT_CONFIG) => generateServiceSchema({
    name: 'Water Damage Restoration Brisbane',
    description: '24/7 emergency water damage restoration, flood recovery, burst pipe repair, and structural drying services across Brisbane, Ipswich, and Logan.',
    url: `${config.baseUrl}/services/water-damage-restoration`,
    serviceType: 'Water Damage Restoration',
    areaServed: ['Brisbane', 'Ipswich', 'Logan']
  }, config),

  fireDamage: (config: SchemaConfig = DEFAULT_CONFIG) => generateServiceSchema({
    name: 'Fire Damage Restoration Brisbane',
    description: 'Complete fire and smoke damage restoration, soot removal, odor elimination, and contents restoration services.',
    url: `${config.baseUrl}/services/fire-damage-restoration`,
    serviceType: 'Fire Damage Restoration',
    areaServed: ['Brisbane', 'Ipswich', 'Logan']
  }, config),

  mouldRemediation: (config: SchemaConfig = DEFAULT_CONFIG) => generateServiceSchema({
    name: 'Mould Remediation Brisbane',
    description: 'Professional mould removal, black mould remediation, air quality restoration, and moisture control services.',
    url: `${config.baseUrl}/services/mould-remediation`,
    serviceType: 'Mould Remediation',
    areaServed: ['Brisbane', 'Ipswich', 'Logan']
  }, config),

  stormDamage: (config: SchemaConfig = DEFAULT_CONFIG) => generateServiceSchema({
    name: 'Storm Damage Restoration Brisbane',
    description: 'Emergency storm damage repair, roof tarping, wind and hail damage restoration, and tree damage cleanup.',
    url: `${config.baseUrl}/services/storm-damage-restoration`,
    serviceType: 'Storm Damage Restoration',
    areaServed: ['Brisbane', 'Ipswich', 'Logan']
  }, config),

  floodRecovery: (config: SchemaConfig = DEFAULT_CONFIG) => generateServiceSchema({
    name: 'Flood Recovery Brisbane',
    description: 'Complete flood damage restoration, emergency water extraction, structural drying, and flood damage cleanup.',
    url: `${config.baseUrl}/services/flood-recovery`,
    serviceType: 'Flood Recovery',
    areaServed: ['Brisbane', 'Ipswich', 'Logan']
  }, config),

  commercialServices: (config: SchemaConfig = DEFAULT_CONFIG) => generateServiceSchema({
    name: 'Commercial Disaster Restoration Brisbane',
    description: 'Large-scale commercial property disaster restoration, business continuity planning, and rapid emergency response.',
    url: `${config.baseUrl}/services/commercial`,
    serviceType: 'Commercial Disaster Restoration',
    areaServed: ['Brisbane', 'Ipswich', 'Logan']
  }, config),

  biohazardCleanup: (config: SchemaConfig = DEFAULT_CONFIG) => generateServiceSchema({
    name: 'Biohazard Cleanup Brisbane',
    description: 'Specialized biohazard, trauma scene, sewage cleanup, and infectious disease decontamination services.',
    url: `${config.baseUrl}/services/biohazard-cleanup`,
    serviceType: 'Biohazard Cleanup',
    areaServed: ['Brisbane', 'Ipswich', 'Logan']
  }, config)
};

/**
 * Location-specific schemas with actual coordinates
 */
export const LOCATION_SCHEMAS = {
  hamilton: (config: SchemaConfig = DEFAULT_CONFIG) => generateLocationSchema({
    locationName: 'Hamilton',
    suburb: 'Hamilton',
    latitude: -27.4380,
    longitude: 153.0650,
    description: 'Emergency disaster restoration for Hamilton high-value riverside properties. 30-minute response time.'
  }, config),

  ascot: (config: SchemaConfig = DEFAULT_CONFIG) => generateLocationSchema({
    locationName: 'Ascot',
    suburb: 'Ascot',
    latitude: -27.4320,
    longitude: 153.0580,
    description: 'Specialist emergency restoration for Ascot prestige properties. IICRC Master Restorer services.'
  }, config),

  newFarm: (config: SchemaConfig = DEFAULT_CONFIG) => generateLocationSchema({
    locationName: 'New Farm',
    suburb: 'New Farm',
    latitude: -27.4650,
    longitude: 153.0500,
    description: 'Emergency water damage and fire restoration for New Farm riverside heritage and modern properties.'
  }, config),

  toowong: (config: SchemaConfig = DEFAULT_CONFIG) => generateLocationSchema({
    locationName: 'Toowong',
    suburb: 'Toowong',
    latitude: -27.4850,
    longitude: 152.9900,
    description: 'Rapid emergency restoration for Toowong properties. 24/7 water damage and fire damage specialists.'
  }, config),

  karalee: (config: SchemaConfig = DEFAULT_CONFIG) => generateLocationSchema({
    locationName: 'Karalee',
    suburb: 'Karalee',
    latitude: -27.5700,
    longitude: 152.7800,
    description: 'Premium emergency restoration for Karalee Ipswich properties. Master Restorer certified services.'
  }, config),

  brookwater: (config: SchemaConfig = DEFAULT_CONFIG) => generateLocationSchema({
    locationName: 'Brookwater',
    suburb: 'Brookwater',
    latitude: -27.6700,
    longitude: 152.9100,
    description: 'High-end disaster restoration for Brookwater golf course estates. IICRC certified emergency response.'
  }, config),

  springfieldLakes: (config: SchemaConfig = DEFAULT_CONFIG) => generateLocationSchema({
    locationName: 'Springfield Lakes',
    suburb: 'Springfield Lakes',
    latitude: -27.6700,
    longitude: 152.9200,
    description: 'Emergency restoration services for Springfield Lakes properties. 24/7 water and fire damage specialists.'
  }, config)
};

/**
 * Utility function to render schema as JSON-LD script tag
 */
export function renderSchemaScript(schema: object) {
  return `<script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
</script>`;
}

/**
 * Combined schema for homepage
 */
export function generateHomepageSchema(config: SchemaConfig = DEFAULT_CONFIG) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      generateLocalBusinessSchema(config),
      generatePersonSchema(config),
      ...Object.values(SERVICE_SCHEMAS).map(fn => fn(config))
    ]
  };
}
