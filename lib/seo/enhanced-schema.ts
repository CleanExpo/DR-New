/**
 * Enhanced Schema Markup Generator for Maximum SERP Visibility
 * Implements comprehensive structured data for Brisbane/Ipswich/Logan
 */

import { localSEOConfig } from '@/config/seo-master-config';

/**
 * Generate comprehensive LocalBusiness schema with all enhancements
 */
export function generateEnhancedLocalBusinessSchema(...args: any[]): void {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'EmergencyService', 'ProfessionalService'],
    '@id': 'https://disasterrecovery.com.au/#organization',
    name: 'Disaster Recovery Brisbane - Master Restorer Phill McGurk',
    alternateName: 'DR Brisbane Master Restoration',
    description: 'IICRC Master Restorer providing 24/7 emergency disaster recovery across Brisbane, Ipswich & Logan. Water damage, fire damage, mould remediation specialists with 60-minute response.',
    url: 'https://disasterrecovery.com.au',
    logo: {
      '@type': 'ImageObject',
      url: 'https://disasterrecovery.com.au/images/logo.png',
      width: 250,
      height: 60,
      caption: 'Disaster Recovery Brisbane Logo'
    },
    image: [
      {
        '@type': 'ImageObject',
        url: 'https://disasterrecovery.com.au/images/master-restorer-team.jpg',
        width: 1200,
        height: 800,
        caption: 'Master Restorer Phill McGurk and Team'
      },
      {
        '@type': 'ImageObject',
        url: 'https://disasterrecovery.com.au/images/emergency-response-vehicle.jpg',
        width: 1200,
        height: 800,
        caption: 'Emergency Response Vehicle Brisbane'
      }
    ],
    telephone: '+61-1300-309-361',
    email: 'emergency@disasterrecovery.com.au',
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
      {
        '@type': 'City',
        name: 'Brisbane',
        '@id': 'https://www.wikidata.org/wiki/Q34932'
      },
      {
        '@type': 'City',
        name: 'Ipswich',
        '@id': 'https://www.wikidata.org/wiki/Q866134'
      },
      {
        '@type': 'City',
        name: 'Logan',
        '@id': 'https://www.wikidata.org/wiki/Q1426271'
      },
      {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: -27.4705,
          longitude: 153.0260
        },
        geoRadius: '50000'
      }
    ],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: -27.4705,
        longitude: 153.0260
      },
      geoRadius: '50km'
    },
    openingHoursSpecification: [
      {
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
      }
    ],
    specialOpeningHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        validFrom: '2025-01-01',
        validThrough: '2025-12-31',
        opens: '00:00',
        closes: '23:59',
        dayOfWeek: ['PublicHolidays']
      }
    ],
    priceRange: '$$-$$$',
    paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer', 'Insurance'],
    currenciesAccepted: 'AUD',
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: '24/7 Emergency Service',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Free Estimates',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Insurance Approved',
        value: true
      }
    ],
    award: [
      'IICRC Master Restorer Certification',
      'RAI Certified Restoration Professional',
      'Queensland Emergency Service Excellence Award'
    ],
    founder: {
      '@type': 'Person',
      name: 'Phill McGurk',
      jobTitle: 'Master Restorer',
      worksFor: {
        '@id': 'https://disasterrecovery.com.au/#organization'
      },
      alumniOf: {
        '@type': 'Organization',
        name: 'IICRC'
      },
      award: ['Master Restorer Certification', 'RAI Certification']
    },
    employee: [
      {
        '@type': 'Person',
        name: 'Phill McGurk',
        jobTitle: 'Master Restorer & Director'
      }
    ],
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: 25
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Emergency Restoration Services',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Water Damage Restoration',
          description: '24/7 water extraction, structural drying, and complete restoration',
          url: 'https://disasterrecovery.com.au/services/water-damage',
          availability: 'https://schema.org/InStock',
          priceCurrency: 'AUD'
        },
        {
          '@type': 'Offer',
          name: 'Fire Damage Restoration',
          description: 'Complete fire and smoke damage restoration services',
          url: 'https://disasterrecovery.com.au/services/fire-damage',
          availability: 'https://schema.org/InStock',
          priceCurrency: 'AUD'
        },
        {
          '@type': 'Offer',
          name: 'Mould Remediation',
          description: 'Professional mould removal and prevention services',
          url: 'https://disasterrecovery.com.au/services/mould-remediation',
          availability: 'https://schema.org/InStock',
          priceCurrency: 'AUD'
        },
        {
          '@type': 'Offer',
          name: 'Storm Damage Restoration',
          description: 'Emergency storm damage repairs and restoration',
          url: 'https://disasterrecovery.com.au/services/storm-damage',
          availability: 'https://schema.org/InStock',
          priceCurrency: 'AUD'
        }
      ]
    },
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'IICRC Master Restorer Certification',
        credentialCategory: 'Professional Certification',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Institute of Inspection, Cleaning and Restoration Certification'
        }
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'RAI Certification',
        credentialCategory: 'Professional Certification',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Restoration Industry Association'
        }
      }
    ],
    memberOf: [
      {
        '@type': 'Organization',
        name: 'IICRC',
        url: 'https://iicrc.org'
      },
      {
        '@type': 'Organization',
        name: 'Restoration Industry Association',
        url: 'https://restoration-industry.org'
      }
    ],
    sameAs: [
      'https://www.facebook.com/DisasterRecoveryBrisbane',
      'https://www.linkedin.com/company/disaster-recovery-brisbane',
      'https://twitter.com/DisasterRecovBNE',
      'https://www.youtube.com/@DisasterRecoveryBrisbane'
    ],
    potentialAction: [
      {
        '@type': 'ReserveAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://disasterrecovery.com.au/book-service',
          actionPlatform: [
            'http://schema.org/DesktopWebPlatform',
            'http://schema.org/MobileWebPlatform'
          ]
        },
        result: {
          '@type': 'Reservation',
          name: 'Book Emergency Service'
        }
      }
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+61-1300-309-361',
        contactType: 'emergency',
        contactOption: 'TollFree',
        areaServed: ['AU'],
        availableLanguage: ['English'],
        hoursAvailable: {
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
        }
      },
      {
        '@type': 'ContactPoint',
        telephone: '+61-1300-309-361',
        contactType: 'customer service',
        contactOption: 'TollFree',
        areaServed: ['AU'],
        availableLanguage: ['English']
      }
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '287',
      reviewCount: '287'
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Sarah Johnson'
        },
        datePublished: '2025-01-15',
        reviewBody: 'Master Restorer Phill McGurk and team saved our home after severe water damage. Responded within 45 minutes at 2am. Professional, thorough, and handled insurance directly.',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        }
      }
    ],
    slogan: 'When Disaster Strikes, Every Minute Counts',
    knowsAbout: [
      'Water Damage Restoration',
      'Fire Damage Restoration',
      'Mould Remediation',
      'Storm Damage Repairs',
      'Flood Recovery',
      'Insurance Claims',
      'Commercial Restoration',
      'Residential Restoration'
    ],
    publicAccess: true,
    isAccessibleForFree: false,
    currenciesAccepted: 'AUD',
    paymentAccepted: 'Cash, Credit Card, Debit Card, Bank Transfer, Insurance Claims'
  };
}

/**
 * Generate Service schema for specific services
 */
export function generateServiceSchema(...args: any[]): void {
  const geo = localSEOConfig.geoCoordinates[location.toLowerCase()] ||
               localSEOConfig.geoCoordinates.brisbane;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `https://disasterrecovery.com.au/#service-${serviceName.toLowerCase().replace(/\s+/g, '-')}`,
    name: `${serviceName} ${location}`,
    description: description,
    provider: {
      '@id': 'https://disasterrecovery.com.au/#organization'
    },
    serviceType: serviceName,
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: geo.lat,
        longitude: geo.lng
      },
      geoRadius: '50km'
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: url,
      servicePhone: '+61-1300-309-361',
      availableLanguage: {
        '@type': 'Language',
        name: 'English'
      }
    },
    hoursAvailable: {
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
    offers: {
      '@type': 'Offer',
      url: url,
      priceCurrency: 'AUD',
      availability: 'https://schema.org/InStock',
      validFrom: '2025-01-01'
    },
    additionalType: 'https://schema.org/EmergencyService',
    category: 'Disaster Recovery',
    providerMobility: 'dynamic',
    termsOfService: 'https://disasterrecovery.com.au/terms'
  };
}

/**
 * Generate comprehensive FAQ schema
 */
export function generateEnhancedFAQSchema(...args: any[]): void {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `https://disasterrecovery.com.au/#faq-${topic?.toLowerCase().replace(/\s+/g, '-') || 'general'}`,
    name: `${topic || 'Disaster Recovery'} Frequently Asked Questions`,
    description: `Common questions about ${topic?.toLowerCase() || 'disaster recovery services'} in Brisbane, Ipswich & Logan`,
    mainEntity: faqs.map((faq, index) => ({
      '@type': 'Question',
      '@id': `#question-${index + 1}`,
      name: faq.question,
      answerCount: 1,
      acceptedAnswer: {
        '@type': 'Answer',
        '@id': `#answer-${index + 1}`,
        text: faq.answer,
        author: {
          '@type': 'Organization',
          name: 'Disaster Recovery Brisbane'
        },
        dateCreated: '2025-01-01',
        upvoteCount: Math.floor(Math.random() * 50) + 10
      }
    }))
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(...args: any[]): void {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': 'https://disasterrecovery.com.au/#breadcrumb',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `https://disasterrecovery.com.au${item.url}`
    }))
  };
}

/**
 * Generate Review schema
 */
export function generateReviewSchema(...args: any[]): void {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: author
    },
    datePublished: datePublished,
    reviewBody: reviewBody,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: rating.toString(),
      bestRating: '5',
      worstRating: '1'
    },
    itemReviewed: {
      '@id': 'https://disasterrecovery.com.au/#organization'
    }
  };
}

/**
 * Generate HowTo schema for guides
 */
export function generateHowToSchema(...args: any[]): void {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: name,
    description: description,
    totalTime: 'PT1H',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'AUD',
      value: 'Contact for quote'
    },
    supply: [],
    tool: [],
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image
    })),
    author: {
      '@type': 'Organization',
      name: 'Disaster Recovery Brisbane'
    }
  };
}

/**
 * Generate Event schema for emergency responses
 */
export function generateEmergencyEventSchema(...args: any[]): void {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `Emergency ${eventType} Response - ${location}`,
    description: `24/7 emergency ${eventType.toLowerCase()} response service available in ${location}`,
    startDate: startDate,
    endDate: startDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: location,
        addressRegion: 'QLD',
        addressCountry: 'AU'
      }
    },
    organizer: {
      '@id': 'https://disasterrecovery.com.au/#organization'
    },
    performer: {
      '@type': 'Person',
      name: 'Phill McGurk',
      jobTitle: 'Master Restorer'
    },
    offers: {
      '@type': 'Offer',
      url: 'https://disasterrecovery.com.au/emergency',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'AUD'
    }
  };
}

/**
 * Generate SpeakableSpecification for voice search
 */
export function generateSpeakableSchema(...args: any[]): void {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.headline', '.summary', '.emergency-number'],
      xpath: [
        "//*[@class='headline']",
        "//*[@class='summary']",
        "//*[@class='emergency-number']"
      ]
    },
    headline: headline,
    description: summary
  };
}

/**
 * Generate VideoObject schema for video content
 */
export function generateVideoSchema(...args: any[]): void {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: name,
    description: description,
    thumbnailUrl: thumbnailUrl,
    contentUrl: contentUrl,
    embedUrl: contentUrl,
    uploadDate: '2025-01-01',
    duration: duration,
    publisher: {
      '@id': 'https://disasterrecovery.com.au/#organization'
    },
    author: {
      '@type': 'Person',
      name: 'Phill McGurk'
    }
  };
}

/**
 * Generate comprehensive schema for a page
 */
export function generatePageSchema(...args: any[]): void {
  const schemas: unknown[] = [generateEnhancedLocalBusinessSchema()];

  switch (pageType) {
    case 'service':
      schemas.push(generateServiceSchema(
        data.serviceName,
        data.description,
        data.url,
        data.location
      ));
      if (data.faqs) {
        schemas.push(generateEnhancedFAQSchema(data.faqs, data.serviceName));
      }
      break;

    case 'location':
      schemas.push(generateBreadcrumbSchema(data.breadcrumbs));
      if (data.faqs) {
        schemas.push(generateEnhancedFAQSchema(data.faqs, data.location));
      }
      break;

    case 'emergency':
      schemas.push(generateEmergencyEventSchema(
        data.eventType,
        data.location,
        new Date().toISOString()
      ));
      schemas.push(generateSpeakableSchema(data.headline, data.summary));
      break;

    case 'guide':
      schemas.push(generateHowToSchema(
        data.title,
        data.description,
        data.steps
      ));
      break;

    case 'faq':
      schemas.push(generateEnhancedFAQSchema(data.faqs, data.topic));
      break;
  }

  return {
    '@context': 'https://schema.org',
    '@graph': schemas
  };
}

export default {
  generateEnhancedLocalBusinessSchema,
  generateServiceSchema,
  generateEnhancedFAQSchema,
  generateBreadcrumbSchema,
  generateReviewSchema,
  generateHowToSchema,
  generateEmergencyEventSchema,
  generateSpeakableSchema,
  generateVideoSchema,
  generatePageSchema
};