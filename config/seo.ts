// SEO configuration and metadata generators
import { Metadata } from 'next';
import { METADATA, CONTACT, BUSINESS_INFO } from './constants';

interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  noindex?: boolean;
  ogImage?: string;
}

export function generateMetadata(config: SEOConfig = {}): Metadata {
  const {
    title,
    description = METADATA.defaultDescription,
    keywords,
    canonical,
    noindex = false,
    ogImage = '/images/og-default.jpg',
  } = config;

  const fullTitle = title
    ? `${title} | ${METADATA.siteName}`
    : METADATA.defaultTitle;

  return {
    title: fullTitle,
    description,
    keywords,
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    alternates: {
      canonical: canonical || METADATA.siteUrl,
    },
    openGraph: {
      type: 'website',
      locale: METADATA.locale,
      url: canonical || METADATA.siteUrl,
      siteName: METADATA.siteName,
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title || METADATA.siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: METADATA.twitterHandle,
    },
  };
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': METADATA.siteUrl,
    name: BUSINESS_INFO.name,
    description: METADATA.defaultDescription,
    url: METADATA.siteUrl,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_INFO.location.address,
      addressLocality: BUSINESS_INFO.location.suburb,
      addressRegion: BUSINESS_INFO.location.state,
      postalCode: BUSINESS_INFO.location.postcode,
      addressCountry: BUSINESS_INFO.location.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS_INFO.coordinates.lat,
      longitude: BUSINESS_INFO.coordinates.lng,
    },
    openingHours: 'Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59',
    priceRange: '$$',
    image: `${METADATA.siteUrl}/logos/disaster-recovery-logo.png`,
  };
}

export function generateEmergencyServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EmergencyService',
    name: METADATA.siteName,
    description: '24/7 Emergency Restoration Services',
    url: METADATA.siteUrl,
    telephone: CONTACT.phone,
    availableLanguage: 'English',
    areaServed: [
      { '@type': 'City', name: 'Brisbane' },
      { '@type': 'City', name: 'Ipswich' },
      { '@type': 'City', name: 'Logan' },
    ],
    serviceType: [
      'Water Damage Restoration',
      'Fire Damage Restoration',
      'Mould Remediation',
      'Storm Damage Repair',
    ],
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: BUSINESS_INFO.name,
      telephone: CONTACT.phone,
    },
    areaServed: ['Brisbane', 'Ipswich', 'Logan'],
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${METADATA.siteUrl}/services/${service.slug}`,
      servicePhone: CONTACT.phone,
      availableLanguage: 'English',
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
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
