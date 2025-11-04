/**
 * SEO Utility Functions
 * Enhanced SEO and schema generation with unique meta tags for all page types
 * Fixes: Twitter Cards, Open Graph, Descriptions, Titles per BrightLocal audit
 */

/**
 * Generate SEO metadata with unique Twitter & OG tags
 * Supports: Pages, Locations, Services, Insurance Partners, Guides
 */
export function generateSEO(config: {
  title: string;
  description: string;
  keywords?: string[];
  url: string;
  image?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  type?: 'website' | 'article' | 'service';
  locale?: string;
}) {
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords?.join(', '),
    openGraph: {
      title: config.ogTitle || config.title,
      description: config.ogDescription || config.description,
      url: config.url,
      images: config.image ? [{ url: config.image, width: 1200, height: 630, alt: config.title }] : [],
      type: config.type || 'website',
      siteName: 'Disaster Recovery',
      locale: config.locale || 'en_AU',
    },
    twitter: {
      card: 'summary_large_image',
      title: config.twitterTitle || config.title,
      description: config.twitterDescription || config.description,
      images: config.image ? [config.image] : [],
      creator: '@DisasterRecoveryBrisbane',
    },
    canonical: config.url,
    alternates: {
      canonical: config.url,
    },
  };
}

/**
 * Generate service-specific metadata with unique variations
 */
export function generateServiceSEO(config: {
  serviceName: string;
  location: string;
  title: string;
  description: string;
  keywords?: string[];
  url: string;
  image?: string;
  responseTime?: string;
  certified?: boolean;
}) {
  const twitterDescription = `${config.serviceName} in ${config.location}. ${config.responseTime ? `${config.responseTime} response. ` : ''}Call 1300 309 361 24/7.`;

  return generateSEO({
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    url: config.url,
    image: config.image,
    ogTitle: `${config.serviceName} - ${config.location}`,
    ogDescription: config.description,
    twitterTitle: `${config.serviceName} ${config.location}`,
    twitterDescription: twitterDescription,
    type: 'website',
  });
}

/**
 * Generate location-specific metadata
 */
export function generateLocationSEO(config: {
  suburb: string;
  region: string;
  services: string[];
  title: string;
  description: string;
  url: string;
  image?: string;
  responseTime?: string;
}) {
  const servicesText = config.services.slice(0, 2).join(', ');
  const twitterDescription = `${config.suburb}, ${config.region} - ${servicesText}. Emergency response ${config.responseTime || 'within 1 hour'}. Call 1300 309 361.`;

  return generateSEO({
    title: config.title,
    description: config.description,
    keywords: [
      `water damage restoration ${config.suburb}`,
      `disaster recovery ${config.suburb}`,
      `${config.services[0] || 'restoration'} ${config.suburb}`,
      config.suburb,
    ],
    url: config.url,
    image: config.image,
    ogTitle: `Disaster Recovery ${config.suburb} | ${config.region}`,
    ogDescription: `Professional ${config.services[0] || 'restoration'} services in ${config.suburb}. IICRC certified.`,
    twitterTitle: `${config.suburb} Disaster Recovery`,
    twitterDescription: twitterDescription,
    type: 'website',
  });
}

/**
 * Generate insurance partner metadata
 */
export function generateInsuranceSEO(config: {
  insurerName: string;
  title: string;
  description: string;
  url: string;
  image?: string;
  direct?: boolean;
  approved?: boolean;
}) {
  const statusText = config.approved ? 'Approved' : config.direct ? 'Direct Billing' : 'Partner';
  const twitterDesc = `${statusText} ${config.insurerName} disaster restoration provider. Direct billing available. No upfront costs. Call 1300 309 361.`;

  return generateSEO({
    title: config.title,
    description: config.description,
    keywords: [
      `${config.insurerName} claims`,
      `${config.insurerName} approved restorer`,
      `${config.insurerName} restoration`,
      'direct billing disaster recovery',
    ],
    url: config.url,
    image: config.image,
    ogTitle: `${config.insurerName} Approved Restoration`,
    ogDescription: `${statusText} provider for ${config.insurerName} claims.`,
    twitterTitle: `${config.insurerName} Claims Support`,
    twitterDescription: twitterDesc,
    type: 'website',
  });
}

/**
 * Generate FAQ/Guide metadata
 */
export function generateGuideSEO(config: {
  title: string;
  topic: string;
  description: string;
  url: string;
  image?: string;
  readTime?: number;
}) {
  const twitterDesc = `${config.topic} guide. ${config.readTime ? `${config.readTime} min read. ` : ''}Get expert advice. Call 1300 309 361 for help.`;

  return generateSEO({
    title: config.title,
    description: config.description,
    keywords: [
      `${config.topic} guide`,
      `${config.topic} help`,
      `disaster recovery ${config.topic}`,
      config.topic,
    ],
    url: config.url,
    image: config.image,
    ogTitle: `${config.topic} Guide | Disaster Recovery`,
    ogDescription: `Learn everything about ${config.topic}. Expert guide for Brisbane homeowners.`,
    twitterTitle: `${config.topic} Expert Guide`,
    twitterDescription: twitterDesc,
    type: 'article',
  });
}

/**
 * Generate LocalBusiness schema
 */
export function generateLocalBusinessSchema(business: {
  name: string;
  description: string;
  telephone?: string;
  address: {
    streetAddress?: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  hours?: string;
  url: string;
  image?: string;
  priceRange?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    description: business.description,
    telephone: business.telephone || '',
    address: {
      '@type': 'PostalAddress',
      ...business.address,
    },
    openingHours: business.hours || '24/7',
    url: business.url,
    image: business.image,
    priceRange: business.priceRange || '$$',
  };
}

/**
 * Generate Service schema
 */
export function generateServiceSchema(service: {
  name: string;
  description: string;
  provider?: {
    name: string;
    telephone?: string;
  };
  areaServed?: string | string[];
  url?: string;
  image?: string;
}) {
  // Default provider if not provided
  const provider = service.provider || {
    name: 'Disaster Recovery Brisbane',
    telephone: '1300 309 361'
  };

  // Handle areaServed as string or array
  const areaServed = Array.isArray(service.areaServed)
    ? service.areaServed[0] || 'Queensland'
    : service.areaServed || 'Queensland';

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: provider.name,
      telephone: provider.telephone || '1300 309 361',
    },
    areaServed: {
      '@type': 'City',
      name: areaServed,
    },
    url: service.url || 'https://dr-new-ten.vercel.app',
    image: service.image,
  };
}

/**
 * Generate FAQ schema
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
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
 * Generate AggregateRating schema for services
 */
export function generateAggregateRatingSchema(config: {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}) {
  return {
    '@type': 'AggregateRating',
    '@context': 'https://schema.org',
    'ratingValue': config.ratingValue,
    'reviewCount': config.reviewCount,
    'bestRating': config.bestRating || 5,
    'worstRating': config.worstRating || 1,
  };
}

/**
 * Generate HowTo schema for step-by-step guides
 */
export function generateHowToSchema(config: {
  name: string;
  description: string;
  image: string;
  steps: Array<{
    name: string;
    text: string;
    image?: string;
  }>;
  tools?: string[];
  supplies?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': config.name,
    'description': config.description,
    'image': config.image,
    'step': config.steps.map((step, index) => ({
      '@type': 'HowToStep',
      'position': (index + 1).toString(),
      'name': step.name,
      'text': step.text,
      ...(step.image && {
        'image': step.image,
      }),
    })),
    ...(config.tools && { 'tool': config.tools }),
    ...(config.supplies && { 'supply': config.supplies }),
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{
  name: string;
  url: string;
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      'position': (index + 1).toString(),
      'name': item.name,
      'item': item.url,
    })),
  };
}

/**
 * Generate Article/BlogPost schema
 */
export function generateArticleSchema(config: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  keywords?: string[];
  articleBody?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': config.headline,
    'description': config.description,
    'image': config.image,
    'datePublished': config.datePublished,
    'dateModified': config.dateModified || config.datePublished,
    'author': config.author ? {
      '@type': 'Organization',
      'name': config.author,
    } : undefined,
    'keywords': config.keywords?.join(', '),
    'articleBody': config.articleBody,
  };
}

/**
 * Generate Organization schema with all service types
 */
export function generateOrganizationSchema(config: {
  name: string;
  url: string;
  logo: string;
  description: string;
  telephone: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  sameAs?: string[];
  rating?: {
    ratingValue: number;
    reviewCount: number;
  };
  serviceAreas?: Array<{
    name: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': config.name,
    'url': config.url,
    'logo': config.logo,
    'description': config.description,
    'telephone': config.telephone,
    'address': {
      '@type': 'PostalAddress',
      ...config.address,
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': config.telephone,
      'contactType': 'Customer Service',
      'availableLanguage': 'English',
      'areaServed': 'AU',
      'availableHours': 'Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59',
    },
    'sameAs': config.sameAs || [],
    ...(config.rating && {
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': config.rating.ratingValue,
        'reviewCount': config.rating.reviewCount,
      },
    }),
  };
}

/**
 * Generate LocalBusiness with ratings and service catalog
 */
export function generateLocalBusinessWithServices(config: {
  name: string;
  description: string;
  telephone: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  url: string;
  image: string;
  hours?: string;
  rating?: {
    ratingValue: number;
    reviewCount: number;
  };
  services: Array<{
    name: string;
    description: string;
    areaServed?: string[];
  }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': config.name,
    'description': config.description,
    'telephone': config.telephone,
    'address': {
      '@type': 'PostalAddress',
      ...config.address,
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': config.coordinates.latitude,
      'longitude': config.coordinates.longitude,
    },
    'url': config.url,
    'image': config.image,
    'openingHours': config.hours || '24/7',
    'priceRange': '$$$',
    ...(config.rating && {
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': config.rating.ratingValue,
        'reviewCount': config.rating.reviewCount,
        'bestRating': 5,
        'worstRating': 1,
      },
    }),
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Disaster Recovery Services',
      'itemListElement': config.services.map((service) => ({
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': service.name,
          'description': service.description,
          ...(service.areaServed && {
            'areaServed': service.areaServed.map((area) => ({
              '@type': 'City',
              'name': area,
            })),
          }),
        },
      })),
    },
  };
}
