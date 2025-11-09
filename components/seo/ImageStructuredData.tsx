/**
 * Image Structured Data Component
 * Provides schema.org ImageObject structured data for SEO optimization
 */

import React from 'react';

export interface ImageStructuredDataProps {
  url: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  contentLocation?: string;
  author?: string;
  uploadDate?: string;
  description?: string;
}

export function ImageStructuredData({
  url,
  alt,
  caption,
  width,
  height,
  contentLocation = 'Brisbane, Queensland, Australia',
  author = 'Phill McGurk - IICRC Master Restorer',
  uploadDate,
  description,
}: ImageStructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://dr-new-ten.vercel.app';
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;

  const imageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    url: fullUrl,
    contentUrl: fullUrl,
    name: alt,
    caption: caption || alt,
    description: description || alt,
    ...(width && { width: `${width}px` }),
    ...(height && { height: `${height}px` }),
    author: {
      '@type': 'Person',
      name: author,
      jobTitle: 'IICRC Master Restorer',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Brisbane',
        addressRegion: 'Queensland',
        addressCountry: 'AU',
      },
    },
    contentLocation: {
      '@type': 'Place',
      name: contentLocation,
    },
    ...(uploadDate && { uploadDate }),
    inLanguage: 'en-AU',
    license: 'https://dr-new-ten.vercel.app/terms',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }}
    />
  );
}

/**
 * Logo Structured Data Component
 * Provides schema.org Organization logo structured data
 */
export interface LogoStructuredDataProps {
  logoUrl: string;
  organizationName?: string;
  url?: string;
}

export function LogoStructuredData({
  logoUrl,
  organizationName = 'Disaster Recovery Brisbane',
  url = 'https://dr-new-ten.vercel.app',
}: LogoStructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://dr-new-ten.vercel.app';
  const fullLogoUrl = logoUrl.startsWith('http') ? logoUrl : `${baseUrl}${logoUrl}`;

  const logoSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: organizationName,
    url: url,
    logo: {
      '@type': 'ImageObject',
      url: fullLogoUrl,
      width: '512px',
      height: '512px',
      caption: `${organizationName} - IICRC Master Restorer Phill McGurk`,
    },
    telephone: '1300-309-361',
    email: 'admin@disasterrecovery.com.au',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Brisbane',
      addressRegion: 'Queensland',
      addressCountry: 'AU',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Brisbane',
        containedIn: {
          '@type': 'State',
          name: 'Queensland',
        },
      },
      {
        '@type': 'City',
        name: 'Ipswich',
        containedIn: {
          '@type': 'State',
          name: 'Queensland',
        },
      },
      {
        '@type': 'City',
        name: 'Logan',
        containedIn: {
          '@type': 'State',
          name: 'Queensland',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(logoSchema) }}
    />
  );
}

/**
 * Before/After Image Structured Data
 * Provides structured data for before/after restoration images
 */
export interface BeforeAfterImageDataProps {
  beforeImageUrl: string;
  afterImageUrl: string;
  serviceName: string;
  location: string;
  date?: string;
}

export function BeforeAfterImageStructuredData({
  beforeImageUrl,
  afterImageUrl,
  serviceName,
  location,
  date,
}: BeforeAfterImageDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://dr-new-ten.vercel.app';
  const fullBeforeUrl = beforeImageUrl.startsWith('http') ? beforeImageUrl : `${baseUrl}${beforeImageUrl}`;
  const fullAfterUrl = afterImageUrl.startsWith('http') ? afterImageUrl : `${baseUrl}${afterImageUrl}`;

  const beforeAfterSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `${serviceName} Process - ${location}`,
    description: `Professional ${serviceName} by IICRC Master Restorer Phill McGurk in ${location}`,
    step: [
      {
        '@type': 'HowToStep',
        name: 'Before Restoration',
        text: `Initial ${serviceName.toLowerCase()} condition requiring professional restoration`,
        image: {
          '@type': 'ImageObject',
          url: fullBeforeUrl,
          caption: `Before ${serviceName} - ${location}`,
        },
      },
      {
        '@type': 'HowToStep',
        name: 'During Restoration',
        text: 'IICRC Master certified restoration process using industrial equipment and thermal imaging',
        image: {
          '@type': 'ImageObject',
          url: `${baseUrl}/images/optimized/damage/3d-air-movement-drying-carpet.webp`,
          caption: 'Professional restoration in progress',
        },
      },
      {
        '@type': 'HowToStep',
        name: 'After Restoration',
        text: `Property restored to pre-loss condition - ${serviceName} complete`,
        image: {
          '@type': 'ImageObject',
          url: fullAfterUrl,
          caption: `After ${serviceName} - ${location}`,
        },
      },
    ],
    performer: {
      '@type': 'Person',
      name: 'Phill McGurk',
      jobTitle: 'IICRC Master Restorer',
    },
    ...(date && { datePublished: date }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(beforeAfterSchema) }}
    />
  );
}

export default ImageStructuredData;
