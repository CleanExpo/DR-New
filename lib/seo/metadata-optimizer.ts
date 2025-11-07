/**
 * Advanced Metadata Optimization System
 * Comprehensive metadata generation and validation for all pages
 */

import type { Metadata } from 'next';
import { siteConfig } from './metadata';

// Extended metadata configuration
export interface ExtendedMetadata extends Metadata {
  // Additional SEO fields
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleAuthor?: string;
  articleSection?: string;
  articleTags?: string[];

  // Local business fields
  businessName?: string;
  businessPhone?: string;
  businessAddress?: string;
  businessHours?: string;
  businessServices?: string[];

  // Emergency service fields
  emergencyResponse?: string;
  availableServices?: string[];
  serviceAreas?: string[];
  certifications?: string[];
}

// Metadata templates for different page types
export const metadataTemplates = {
  // Home page template
  home: {
    title: 'Disaster Recovery Brisbane | Master Restorer Phill McGurk | 24/7 Emergency',
    description: 'IICRC Master Restorer providing 24/7 emergency disaster recovery in Brisbane, Ipswich & Logan. Water damage, fire restoration, mould removal. Insurance approved. Call 1300 309 361',
    keywords: [
      'disaster recovery Brisbane',
      'Master Restorer Queensland',
      'emergency restoration Brisbane',
      'water damage restoration Brisbane',
      'fire damage restoration Ipswich',
      'mould removal Logan',
      '24/7 emergency service',
      'insurance approved restoration',
      'Phill McGurk Master Restorer',
      'IICRC certified Brisbane'
    ]
  },

  // Service page template
  service: {
    titleTemplate: '[Service] Brisbane, Ipswich & Logan | 24/7 Master Restorer',
    descriptionTemplate: 'Professional [service] by Master Restorer Phill McGurk. 24/7 emergency response across Brisbane, Ipswich & Logan. Insurance approved. Call 1300 309 361',
    keywordTemplates: [
      '[service] Brisbane',
      '[service] Ipswich',
      '[service] Logan',
      'emergency [service]',
      '24/7 [service]',
      'insurance [service]',
      'Master Restorer [service]',
      'certified [service] Queensland'
    ]
  },

  // Location page template
  location: {
    titleTemplate: 'Disaster Recovery [Location] | 24/7 Emergency Restoration | Master Restorer',
    descriptionTemplate: 'Emergency disaster recovery services in [location]. Master Restorer Phill McGurk provides 24/7 water damage, fire & mould restoration. Insurance approved. Call 1300 309 361',
    keywordTemplates: [
      'disaster recovery [location]',
      'water damage [location]',
      'fire damage [location]',
      'mould removal [location]',
      'emergency restoration [location]',
      '24 hour service [location]',
      'Master Restorer [location]',
      'insurance restoration [location]'
    ]
  },

  // Emergency page template
  emergency: {
    titleTemplate: '[Time] Emergency Restoration Brisbane | 24/7 Master Restorer Response',
    descriptionTemplate: 'Need [time] emergency restoration? Master Restorer available 24/7 for water damage, fire & storm emergencies in Brisbane, Ipswich & Logan. Call 1300 309 361 NOW',
    keywordTemplates: [
      '[time] emergency restoration',
      '[time] water damage Brisbane',
      '[time] disaster recovery',
      'after hours emergency service',
      '24/7 emergency response',
      'urgent restoration Brisbane',
      'Master Restorer emergency',
      'immediate disaster response'
    ]
  }
};

// Generate optimized metadata for any page type
export function generateOptimizedMetadata(
  pageType: 'home' | 'service' | 'location' | 'emergency' | 'guide' | 'insurance' | 'about',
  params?: {
    service?: string;
    location?: string;
    time?: string;
    topic?: string;
  }
): ExtendedMetadata {
  let metadata: ExtendedMetadata = {};

  switch (pageType) {
    case 'home':
      metadata = {
        title: metadataTemplates.home.title,
        description: metadataTemplates.home.description,
        keywords: metadataTemplates.home.keywords.join(', '),
        openGraph: {
          title: metadataTemplates.home.title,
          description: metadataTemplates.home.description,
          type: 'website',
          locale: 'en_AU',
          url: siteConfig.url,
          siteName: siteConfig.name,
          images: [{
            url: '/images/og/home-disaster-recovery.jpg',
            width: 1200,
            height: 630,
            alt: 'Disaster Recovery Brisbane - Master Restorer Services'
          }]
        },
        twitter: {
          card: 'summary_large_image',
          title: metadataTemplates.home.title,
          description: metadataTemplates.home.description,
          images: ['/images/twitter/home-disaster-recovery.jpg']
        },
        alternates: {
          canonical: siteConfig.url
        },
        robots: {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1
          }
        }
      };
      break;

    case 'service':
      if (params?.service) {
        const title = metadataTemplates.service.titleTemplate.replace('[Service]', params.service);
        const description = metadataTemplates.service.descriptionTemplate.replace(/\[service\]/g, params.service.toLowerCase());
        const keywords = metadataTemplates.service.keywordTemplates.map(k => k.replace(/\[service\]/g, params.service.toLowerCase()));

        metadata = {
          title,
          description,
          keywords: keywords.join(', '),
          openGraph: {
            title,
            description,
            type: 'website',
            locale: 'en_AU',
            url: `${siteConfig.url}/services/${params.service.toLowerCase().replace(/\s+/g, '-')}`,
            siteName: siteConfig.name
          }
        };
      }
      break;

    case 'location':
      if (params?.location) {
        const title = metadataTemplates.location.titleTemplate.replace('[Location]', params.location);
        const description = metadataTemplates.location.descriptionTemplate.replace(/\[location\]/g, params.location);
        const keywords = metadataTemplates.location.keywordTemplates.map(k => k.replace(/\[location\]/g, params.location));

        metadata = {
          title,
          description,
          keywords: keywords.join(', '),
          openGraph: {
            title,
            description,
            type: 'website',
            locale: 'en_AU',
            url: `${siteConfig.url}/service-areas/${params.location.toLowerCase()}`,
            siteName: siteConfig.name
          }
        };
      }
      break;

    case 'emergency':
      if (params?.time) {
        const title = metadataTemplates.emergency.titleTemplate.replace('[Time]', params.time);
        const description = metadataTemplates.emergency.descriptionTemplate.replace(/\[time\]/g, params.time.toLowerCase());
        const keywords = metadataTemplates.emergency.keywordTemplates.map(k => k.replace(/\[time\]/g, params.time.toLowerCase()));

        metadata = {
          title,
          description,
          keywords: keywords.join(', '),
          openGraph: {
            title,
            description,
            type: 'website',
            locale: 'en_AU',
            url: `${siteConfig.url}/emergency/${params.time.toLowerCase().replace(/\s+/g, '-')}`,
            siteName: siteConfig.name
          }
        };
      }
      break;
  }

  // Add common metadata fields
  metadata = {
    ...metadata,
    metadataBase: new URL(siteConfig.url),
    applicationName: siteConfig.name,
    referrer: 'origin-when-cross-origin',
    authors: [{ name: siteConfig.masterRestorer }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false
    },
    verification: {
      google: 'your-google-verification-code',
      other: {
        'msvalidate.01': 'your-bing-verification-code'
      }
    }
  };

  return metadata;
}

// Metadata validation rules
export interface MetadataValidationResult {
  isValid: boolean;
  score: number;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

export function validateMetadata(metadata: ExtendedMetadata): MetadataValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];
  let score = 100;

  // Title validation
  if (!metadata.title) {
    errors.push('Missing page title');
    score -= 25;
  } else {
    const title = typeof metadata.title === 'string' ? metadata.title : metadata.title.default || '';
    if (title.length < 30) {
      warnings.push(`Title too short: ${title.length} characters (min 30)`);
      score -= 10;
    }
    if (title.length > 60) {
      warnings.push(`Title too long: ${title.length} characters (max 60)`);
      score -= 5;
    }
    if (!title.includes('Brisbane') && !title.includes('Ipswich') && !title.includes('Logan')) {
      suggestions.push('Consider adding location (Brisbane/Ipswich/Logan) to title');
      score -= 5;
    }
    if (!title.includes('Master Restorer') && !title.includes('24/7')) {
      suggestions.push('Consider adding "Master Restorer" or "24/7" to title for authority');
    }
  }

  // Description validation
  if (!metadata.description) {
    errors.push('Missing meta description');
    score -= 20;
  } else {
    if (metadata.description.length < 120) {
      warnings.push(`Description too short: ${metadata.description.length} characters (min 120)`);
      score -= 10;
    }
    if (metadata.description.length > 160) {
      warnings.push(`Description too long: ${metadata.description.length} characters (max 160)`);
      score -= 5;
    }
    if (!metadata.description.includes(siteConfig.phone)) {
      suggestions.push('Consider adding phone number to description for CTR');
    }
  }

  // Keywords validation
  if (!metadata.keywords) {
    warnings.push('Missing meta keywords');
    score -= 5;
  } else {
    const keywordList = metadata.keywords.split(',').map(k => k.trim());
    if (keywordList.length < 5) {
      warnings.push('Too few keywords (min 5)');
      score -= 5;
    }
    if (keywordList.length > 15) {
      warnings.push('Too many keywords (max 15)');
      score -= 3;
    }
  }

  // OpenGraph validation
  if (!metadata.openGraph) {
    warnings.push('Missing OpenGraph metadata');
    score -= 10;
  } else {
    if (!metadata.openGraph.title) warnings.push('Missing OG title');
    if (!metadata.openGraph.description) warnings.push('Missing OG description');
    if (!metadata.openGraph.url) warnings.push('Missing OG URL');
    if (!metadata.openGraph.images || metadata.openGraph.images.length === 0) {
      warnings.push('Missing OG image');
      score -= 5;
    }
  }

  // Canonical URL validation
  if (!metadata.alternates?.canonical) {
    warnings.push('Missing canonical URL');
    score -= 10;
  }

  // Robots validation
  if (!metadata.robots) {
    suggestions.push('Consider adding robots metadata for crawl control');
  }

  return {
    isValid: errors.length === 0,
    score: Math.max(0, score),
    errors,
    warnings,
    suggestions
  };
}

// Batch metadata optimizer
export interface PageMetadataInput {
  url: string;
  type: 'home' | 'service' | 'location' | 'emergency' | 'guide' | 'insurance' | 'about';
  params?: {
    service?: string;
    location?: string;
    time?: string;
    topic?: string;
  };
}

export function optimizeAllMetadata(pages: PageMetadataInput[]): Map<string, ExtendedMetadata> {
  const optimizedMetadata = new Map<string, ExtendedMetadata>();

  for (const page of pages) {
    const metadata = generateOptimizedMetadata(page.type, page.params);

    // Add page-specific URL
    if (metadata.alternates) {
      metadata.alternates.canonical = `${siteConfig.url}${page.url}`;
    }

    // Validate and log any issues
    const validation = validateMetadata(metadata);
    if (!validation.isValid || validation.score < 80) {
      console.warn(`Metadata issues for ${page.url}:`, validation);
    }

    optimizedMetadata.set(page.url, metadata);
  }

  return optimizedMetadata;
}

// Dynamic metadata generator for Next.js pages
export async function generateDynamicMetadata(
  params: { slug?: string[] },
  searchParams: { [key: string]: string | string[] | undefined }
): Promise<Metadata> {
  try {
    // Parse the slug to determine page type and parameters
    const slug = params.slug?.join('/') || '';

    let pageType: PageMetadataInput['type'] = 'home';
    let metadataParams: PageMetadataInput['params'] = {};

    // Route parsing logic
    if (slug.startsWith('services/')) {
      pageType = 'service';
      metadataParams.service = slug.replace('services/', '').replace(/-/g, ' ');
    } else if (slug.startsWith('service-areas/')) {
      pageType = 'location';
      metadataParams.location = slug.replace('service-areas/', '').replace(/-/g, ' ');
    } else if (slug.startsWith('emergency/')) {
      pageType = 'emergency';
      metadataParams.time = slug.replace('emergency/', '').replace(/-/g, ' ');
    } else if (slug.startsWith('guides/')) {
      pageType = 'guide';
      metadataParams.topic = slug.replace('guides/', '').replace(/-/g, ' ');
    } else if (slug.startsWith('insurance/')) {
      pageType = 'insurance';
      metadataParams.topic = slug.replace('insurance/', '').replace(/-/g, ' ');
    } else if (slug === 'about-phil-mcgurk') {
      pageType = 'about';
    }

    // Generate and return optimized metadata
    return generateOptimizedMetadata(pageType, metadataParams);
  } catch (error) {
    console.error('Error generating dynamic metadata:', error);
    return generateOptimizedMetadata('home', {});
  }
}

// Export metadata presets for common pages
export const metadataPresets = {
  errorPage: {
    title: 'Page Not Found | Disaster Recovery Brisbane',
    description: 'The page you are looking for could not be found. Return to our 24/7 emergency disaster recovery services.',
    robots: { index: false, follow: true }
  },

  thankYouPage: {
    title: 'Thank You | Disaster Recovery Brisbane',
    description: 'Thank you for contacting Disaster Recovery Brisbane. Our Master Restorer team will respond within 60 minutes.',
    robots: { index: false, follow: false }
  },

  privacyPage: {
    title: 'Privacy Policy | Disaster Recovery Brisbane',
    description: 'Privacy policy for Disaster Recovery Brisbane. Learn how we protect your information.',
    robots: { index: true, follow: true }
  }
};