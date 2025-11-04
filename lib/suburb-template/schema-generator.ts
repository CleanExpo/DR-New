/**
 * Schema Markup Generator - SEO Structured Data
 * Generates LocalBusiness, FAQ, and other structured data for suburbs
 */

import { SuburbTemplate, FAQItem, SchemaData } from './types';

const BASE_URL = 'https://dr-new-ten.vercel.app';

/**
 * Generate LocalBusiness schema for suburb
 */
export function generateLocalBusinessSchema(
  suburb: SuburbTemplate,
  faqs?: FAQItem[]
) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/brisbane/${suburb.slug}`,
    name: `Disaster Recovery ${suburb.name} Specialists`,
    image: `${BASE_URL}/images/locations/${suburb.slug}-disaster-recovery.jpg`,
    description: `Professional disaster recovery and restoration services in ${suburb.name}. Water damage, fire restoration, mould remediation, and storm damage repair. Master Restorer certified.`,
    url: `${BASE_URL}/brisbane/${suburb.slug}`,
    telephone: '1300309361',
    email: 'emergency@disasterrecovery.com.au',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `Serving ${suburb.name} District`,
      addressLocality: suburb.name,
      addressRegion: 'QLD',
      postalCode: suburb.postcode,
      addressCountry: 'AU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: suburb.coordinates.latitude,
      longitude: suburb.coordinates.longitude,
    },
    areaServed: [
      {
        '@type': 'City',
        name: suburb.name,
        sameAs: `https://en.wikipedia.org/wiki/${suburb.name},_Queensland`,
      },
      ...suburb.nearbySuburbs.slice(0, 5).map(slug => ({
        '@type': 'City',
        name: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      })),
    ],
    openingHours: 'Mo-Su 00:00-23:59', // 24/7
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${suburb.name} Disaster Recovery Services`,
      itemListElement: suburb.disasterRisks.slice(0, 5).map((risk, index) => ({
        '@type': 'Offer',
        position: index + 1,
        itemOffered: {
          '@type': 'Service',
          name: formatServiceName(risk.type),
          description: `24/7 ${formatServiceName(risk.type)} services available in ${suburb.name}`,
        },
      })),
    },
    paymentAccepted: 'Insurance Direct Billing, Credit Card, Bank Transfer',
    currenciesAccepted: 'AUD',
    founder: {
      '@type': 'Person',
      name: 'Phill McGurk',
      jobTitle: 'Master Restorer',
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Professional Certification',
          name: 'IICRC Master Restorer',
          issuingOrganization: 'Institute of Inspection Cleaning and Restoration Certification',
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '49',
      bestRating: '5',
      worstRating: '1',
    },
  };

  // Add FAQPage schema if FAQs provided
  if (faqs && faqs.length > 0) {
    schema.mainEntity = generateFAQSchema(faqs);
  }

  return schema;
}

/**
 * Generate FAQ schema
 */
export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Breadcrumb schema
 */
export function generateBreadcrumbSchema(
  suburb: SuburbTemplate,
  regionName: string = 'Brisbane'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: regionName,
        item: `${BASE_URL}/${suburb.region}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: suburb.name,
        item: `${BASE_URL}/${suburb.region}/${suburb.slug}`,
      },
    ],
  };
}

/**
 * Generate Service schema for specific disaster types
 */
export function generateServiceSchema(
  suburb: SuburbTemplate,
  serviceType: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${formatServiceName(serviceType)} in ${suburb.name}`,
    description: `Professional ${serviceType.replace('-', ' ')} restoration services available 24/7 in ${suburb.name}. Master Restorer certified.`,
    serviceType: formatServiceName(serviceType),
    provider: {
      '@type': 'LocalBusiness',
      name: `Disaster Recovery ${suburb.name}`,
      url: `${BASE_URL}/brisbane/${suburb.slug}`,
      telephone: '1300309361',
    },
    areaServed: suburb.name,
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${BASE_URL}/emergency-contact`,
      servicePhone: '1300309361',
    },
  };
}

/**
 * Generate Organization schema (company-wide)
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Disaster Recovery Services',
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    description: 'Professional disaster recovery and restoration services across Brisbane, Ipswich, and Logan. Water damage, fire restoration, mould remediation.',
    foundingDate: '2015',
    founder: {
      '@type': 'Person',
      name: 'Phill McGurk',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: '1300309361',
      email: 'emergency@disasterrecovery.com.au',
      areaServed: ['Brisbane', 'Ipswich', 'Logan'],
      availableLanguage: 'en-AU',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Wacol',
      addressRegion: 'QLD',
      postalCode: '4076',
      addressCountry: 'AU',
    },
    sameAs: [
      'https://www.facebook.com/DisasterRecoveryServices',
      'https://www.instagram.com/disasterrecoveryservices',
    ],
  };
}

/**
 * Generate HowTo schema for disaster preparation
 */
export function generateHowToSchema(
  suburb: SuburbTemplate,
  disasterType: string
) {
  const steps: Record<string, string[]> = {
    'water-damage': [
      'Immediately turn off electricity to affected areas',
      'Stop the water source if possible',
      'Move valuable items to higher ground',
      'Call Disaster Recovery at 1300 309 361',
      'Document damage with photos for insurance',
      'Begin water extraction and drying',
    ],
    'fire-damage': [
      'Ensure all occupants are safely evacuated',
      'Call emergency services and fire department',
      'Do not re-enter the building',
      'Notify your insurance provider',
      'Call Disaster Recovery specialists at 1300 309 361',
      'Allow professionals to assess structural integrity',
    ],
    'mould': [
      'Identify visible mould growth',
      'Increase ventilation and reduce humidity',
      'Do not touch or disturb mould',
      'Call Disaster Recovery for professional testing',
      'Begin remediation process with specialists',
      'Implement prevention measures',
    ],
  };

  const stepsData = steps[disasterType] || steps['water-damage'];

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Respond to ${formatServiceName(disasterType)} in ${suburb.name}`,
    description: `Step-by-step guide for responding to ${disasterType.replace('-', ' ')} in ${suburb.name}. Professional restoration available 24/7.`,
    step: stepsData.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step,
    })),
  };
}

/**
 * Generate VideoObject schema
 */
export function generateVideoSchema(
  suburb: SuburbTemplate,
  videoId: string,
  title: string,
  description: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: title,
    description: description,
    thumbnailUrl: `https://img.youtube.com/vi/${videoId}/0.jpg`,
    uploadDate: new Date().toISOString().split('T')[0],
    duration: 'PT5M',
    contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
  };
}

/**
 * Generate Event schema for emergency preparedness workshops
 */
export function generateEventSchema(
  suburb: SuburbTemplate,
  eventDate: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `${suburb.name} Disaster Preparedness Workshop`,
    description: `Learn how to prepare for and respond to disasters in ${suburb.name}. Expert guidance from Disaster Recovery professionals.`,
    startDate: eventDate,
    endDate: eventDate,
    eventLocation: {
      '@type': 'Place',
      name: suburb.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: suburb.name,
        addressRegion: 'QLD',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'Disaster Recovery Services',
      url: BASE_URL,
    },
    offers: {
      '@type': 'Offer',
      url: `${BASE_URL}/events/${suburb.slug}`,
      price: '0',
      priceCurrency: 'AUD',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
    },
  };
}

/**
 * Generate WebPage schema with meta information
 */
export function generateWebPageSchema(
  suburb: SuburbTemplate,
  metaTitle: string,
  metaDescription: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: metaTitle,
    description: metaDescription,
    url: `${BASE_URL}/brisbane/${suburb.slug}`,
    dateModified: new Date().toISOString(),
    isPartOf: {
      '@type': 'WebSite',
      url: BASE_URL,
      name: 'Disaster Recovery Services',
    },
    breadcrumb: generateBreadcrumbSchema(suburb),
  };
}

/**
 * Format service name for display
 */
function formatServiceName(serviceType: string): string {
  return serviceType
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Generate all schemas for a suburb page
 */
export function generateAllSchemas(
  suburb: SuburbTemplate,
  faqs: FAQItem[],
  metaTitle: string,
  metaDescription: string
) {
  return {
    localBusiness: generateLocalBusinessSchema(suburb, faqs),
    organization: generateOrganizationSchema(),
    breadcrumb: generateBreadcrumbSchema(suburb),
    webpage: generateWebPageSchema(suburb, metaTitle, metaDescription),
    // Add specific service schemas for top disaster risks
    services: suburb.disasterRisks.slice(0, 3).map(risk =>
      generateServiceSchema(suburb, risk.type)
    ),
  };
}

/**
 * Minify and prepare schema for script tag
 */
export function formatSchemaForScript(schema: any): string {
  return JSON.stringify(schema, null, 0);
}
