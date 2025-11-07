import { Metadata } from 'next'

interface SEOConfig {
  title: string
  description: string
  keywords: string[]
  canonical?: string
  openGraph?: {
    title?: string
    description?: string
    images?: { url: string; alt: string }[]
    type?: string
  }
  structuredData?: unknown
}

export function generateSEO(config: SEOConfig): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://disaster-recovery-seven.vercel.app'
  
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords.join(', '),
    alternates: {
      canonical: config.canonical || baseUrl },
    openGraph: {
      title: config.openGraph?.title || config.title,
      description: config.openGraph?.description || config.description,
      url: config.canonical || baseUrl,
      siteName: 'Disaster Recovery',
      images: config.openGraph?.images || [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Disaster Recovery - 24/7 Online Emergency Response' },
      ],
      locale: 'en_AU',
      type: (config.openGraph?.type || 'website') as 'website' | 'article' },
    twitter: {
      card: 'summary_large_image',
      title: config.openGraph?.title || config.title,
      description: config.openGraph?.description || config.description,
      images: config.openGraph?.images?.map(img => img.url) || [`${baseUrl}/og-image.jpg`] },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1 } } }
}

// Schema.org structured data generators
export const generateLocalBusinessSchema = (businessInfo: unknown) => ({
  '@context': 'https://schema.org',
  '@type': 'DamageRestorationService',
  '@id': 'https://disaster-recovery-seven.vercel.app/#organisation',
  name: 'Disaster Recovery Australia',
  url: 'https://disaster-recovery-seven.vercel.app',
  logo: {
    '@type': 'ImageObject',
    url: 'https://disaster-recovery-seven.vercel.app/logos/disaster-recovery-logo.png',
    width: 250,
    height: 60 },
  image: 'https://disaster-recovery-seven.vercel.app/images/disaster-recovery-og.jpg',
  description: 'Australia\'s leading IICRC-certified disaster restoration specialists. 24/7 emergency response for water damage, fire damage, mould remediation across Brisbane, Ipswich, Logan and nationwide.',
  telephone: "+61-1300-DISASTER",
  email: 'info@disaster-recovery-seven.vercel.app',
  address: {
    '@type': 'PostalAddress',
    streetAddress: businessInfo.streetAddress,
    addressLocality: 'Brisbane',
    addressRegion: 'QLD',
    postalCode: businessInfo.postalCode,
    addressCountry: 'AU' },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -27.4689682,
    longitude: 153.0234991 },
  areaServed: [
    {
      '@type': 'City',
      name: 'Brisbane',
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -27.4698,
        longitude: 153.0251
      }
    },
    {
      '@type': 'City',
      name: 'Ipswich',
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -27.6145,
        longitude: 152.7578
      }
    },
    {
      '@type': 'City',
      name: 'Logan',
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -27.6386,
        longitude: 153.1055
      }
    },
    {
      '@type': 'City',
      name: 'Gold Coast' },
    {
      '@type': 'City',
      name: 'Toowoomba' },
  ],
  priceRange: '$$',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59' },
  sameAs: [
    'https://www.facebook.com/DisasterRecoveryQLD',
    'https://www.linkedin.com/company/disaster-recovery-qld',
    'https://www.instagram.com/disasterrecoveryqld',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Disaster Recovery Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Water Damage Restoration',
          description: 'Emergency water extraction, drying, and restoration services' } },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Fire Damage Restoration',
          description: 'Smoke, soot, and fire damage cleanup and restoration' } },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Mould Remediation',
          description: 'Professional mould inspection, removal, and prevention' } },
    ] },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '487' } })

export const generateServiceSchema = (service: {
  name: string
  description: string
  image?: string
  provider?: unknown
  areaServed?: string[]
  availableChannel?: unknown
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: service.name,
  name: service.name,
  description: service.description,
  provider: service.provider || {
    '@type': 'Organisation',
    name: 'Disaster Recovery Australia',
    url: 'https://disaster-recovery-seven.vercel.app' },
  areaServed: service.areaServed || ['Brisbane', 'Ipswich', 'Logan', 'Gold Coast', 'Toowoomba'],
  availableChannel: service.availableChannel || {
    '@type': 'ServiceChannel',
    serviceUrl: 'https://disaster-recovery-seven.vercel.app/claim',
    servicePhone: '+61-1300-DISASTER',
    availableLanguage: {
      '@type': 'Language',
      name: 'English' } },
  termsOfService: 'https://disaster-recovery-seven.vercel.app/terms',
  image: service.image })

export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer } })) })

export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url })) })

export const generateArticleSchema = (article: {
  headline: string
  description: string
  image?: string
  author?: string
  datePublished: string
  dateModified?: string
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.headline,
  description: article.description,
  image: article.image,
  author: {
    '@type': 'Person',
    name: article.author || 'Disaster Recovery Australia Team' },
  publisher: {
    '@type': 'Organisation',
    name: 'Disaster Recovery Australia',
    logo: {
      '@type': 'ImageObject',
      url: 'https://disaster-recovery-seven.vercel.app/logos/disaster-recovery-logo.png' } },
  datePublished: article.datePublished,
  dateModified: article.dateModified || article.datePublished,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://disaster-recovery-seven.vercel.app' } })