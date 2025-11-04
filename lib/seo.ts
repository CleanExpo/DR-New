/**
 * SEO Utility Functions
 * Simplified SEO and schema generation for service pages
 */

/**
 * Generate SEO metadata
 */
export function generateSEO(config: {
  title: string;
  description: string;
  keywords?: string[];
  url: string;
  image?: string;
}) {
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords?.join(', '),
    openGraph: {
      title: config.title,
      description: config.description,
      url: config.url,
      images: config.image ? [{ url: config.image }] : [],
      type: 'website',
      siteName: 'Disaster Recovery',
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      images: config.image ? [config.image] : [],
    },
    canonical: config.url,
  };
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
  provider: {
    name: string;
    telephone?: string;
  };
  areaServed: string;
  url: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: service.provider.name,
      telephone: service.provider.telephone || '',
    },
    areaServed: {
      '@type': 'City',
      name: service.areaServed,
    },
    url: service.url,
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
