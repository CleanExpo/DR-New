/**
 * Server-side Metadata Generation for Suburb Pages
 * Separated from client components to avoid hydration issues
 */

import { Metadata } from 'next';
import { SuburbTemplate } from './types';
import { generateSEOConfig, generateOpenGraphTags } from './seo-generator';

/**
 * Generate Next.js Metadata for suburb page
 */
export function generateSuburbMetadata(suburb: SuburbTemplate): Metadata {
  const seoConfig = generateSEOConfig(suburb);
  const ogTags = generateOpenGraphTags(suburb, seoConfig.metaDescription);

  return {
    title: `${suburb.name} Disaster Recovery | Emergency Restoration Services | 24/7`,
    description: seoConfig.metaDescription,
    keywords: [seoConfig.primaryKeyword, ...seoConfig.secondaryKeywords],
    alternates: {
      canonical: seoConfig.canonicalUrl,
    },
    openGraph: {
      title: ogTags['og:title'],
      description: ogTags['og:description'],
      url: ogTags['og:url'],
      type: 'website',
      locale: ogTags['og:locale'],
      siteName: ogTags['og:site_name'],
      images: [
        {
          url: ogTags['og:image'],
          width: 1200,
          height: 630,
          alt: ogTags['og:image:alt'],
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  };
}
