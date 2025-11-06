// SEO utility functions for generating structured data

export function generateSEO(params: any) {
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

export function generateLocalBusinessSchema(businessInfo: any) {
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

export function generateServiceSchema(serviceInfo: any) {
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

export function generateFAQSchema(faqs: any[]) {
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

export function generateBreadcrumbSchema(items: any[]) {
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
