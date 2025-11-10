// SEO utility functions for generating structured data

export function generateSEO(params: any): any {
  return {
    title: params.title || '',
    description: params.description || '',
    keywords: params.keywords || '',
    openGraph: {
      title: params.title || '',
      description: params.description || '',
      images: [params.image || '/images/default-og.jpg'],
    },
  };
}

export function generateLocalBusinessSchema(businessInfo: any): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessInfo.name,
    description: businessInfo.description,
    telephone: businessInfo.telephone,
    address: {
      '@type': 'PostalAddress',
      ...businessInfo.address,
    },
    openingHoursSpecification: businessInfo.hours,
    url: businessInfo.url,
    image: businessInfo.image,
    priceRange: businessInfo.priceRange,
  };
}

export function generateServiceSchema(serviceInfo: any): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceInfo.name,
    description: serviceInfo.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Disaster Recovery',
    },
    areaServed: serviceInfo.areaServed || 'Brisbane, QLD',
  };
}

export function generateFAQSchema(faqs: any[]): any {
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

export function generateBreadcrumbSchema(items: any[]): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateArticleSchema(title: string, description: string, datePublished: string, dateModified: string, url: string, keywords: string[]): any {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: {
      '@type': 'Organization',
      name: 'Disaster Recovery Brisbane',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Disaster Recovery Brisbane',
    },
    datePublished: datePublished || new Date().toISOString(),
    dateModified: dateModified || new Date().toISOString(),
    url,
    keywords,
  };
}
