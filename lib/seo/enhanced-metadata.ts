/**
 * Enhanced Metadata Generator for Maximum SEO Impact
 * Implements 2025 Google Algorithm Optimization
 */

import type { Metadata } from 'next';
import {
  metaTitleTemplates,
  metaDescriptionTemplates,
  keywordResearch,
  localSEOConfig
} from '@/config/seo-master-config';

export interface PageSEOConfig {
  title: string;
  description: string;
  keywords: string[];
  location?: string;
  service?: string;
  type?: 'service' | 'location' | 'emergency' | 'commercial' | 'suburb';
  schema?: unknown[];
  priority?: number;
  changeFreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

/**
 * Generate SEO-optimized metadata for any page type
 * Implements location-specific optimization for Brisbane/Ipswich/Logan
 */
export function generateEnhancedMetadata(config: PageSEOConfig): Metadata {
  const {
    title,
    description,
    keywords,
    location,
    service,
    type = 'service'
  } = config;

  // Generate optimized title based on type
  let optimizedTitle = title;
  if (type && location) {
    switch (type) {
      case 'service':
        optimizedTitle = service ? metaTitleTemplates.service(service, location) : title;
        break;
      case 'emergency':
        optimizedTitle = service ? metaTitleTemplates.emergency(service, location) : title;
        break;
      case 'location':
        optimizedTitle = metaTitleTemplates.location(location);
        break;
      case 'commercial':
        optimizedTitle = service ? metaTitleTemplates.commercial(service, location) : title;
        break;
      case 'suburb':
        const city = location.includes('Brisbane') ? 'Brisbane' :
                    location.includes('Ipswich') ? 'Ipswich' : 'Logan';
        optimizedTitle = metaTitleTemplates.suburb(location, city);
        break;
    }
  }

  // Generate optimized description
  let optimizedDescription = description;
  if (type && location) {
    switch (type) {
      case 'service':
        optimizedDescription = service ? metaDescriptionTemplates.service(service, location) : description;
        break;
      case 'emergency':
        optimizedDescription = service ? metaDescriptionTemplates.emergency(service, location) : description;
        break;
      case 'location':
        optimizedDescription = metaDescriptionTemplates.location(location);
        break;
      case 'commercial':
        optimizedDescription = service ? metaDescriptionTemplates.commercial(service, location) : description;
        break;
      case 'suburb':
        optimizedDescription = metaDescriptionTemplates.suburb(location);
        break;
    }
  }

  // Ensure description is 155-160 chars
  if (optimizedDescription.length > 160) {
    optimizedDescription = `${optimizedDescription.substring(0, 157)  }...`;
  }

  // Add location-based keywords
  const enhancedKeywords = [...keywords];
  if (location) {
    enhancedKeywords.push(
      `${location} restoration`,
      `${location} emergency services`,
      `${location} water damage`,
      `${location} Master Restorer`
    );
  }

  const baseUrl = 'https://disasterrecovery.com.au';
  const canonicalUrl = `${baseUrl}${getCurrentPath(config)}`;

  return {
    title: optimizedTitle,
    description: optimizedDescription,
    keywords: enhancedKeywords.join(', '),

    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-AU': canonicalUrl,
        'en': canonicalUrl
      }
    },

    openGraph: {
      title: optimizedTitle,
      description: optimizedDescription,
      url: canonicalUrl,
      siteName: 'Disaster Recovery Brisbane - Master Restorer',
      type: 'website',
      locale: 'en_AU',
      images: [{
        url: `${baseUrl}/images/disaster-recovery-og.jpg`,
        width: 1200,
        height: 630,
        alt: `Disaster Recovery ${location || 'Brisbane'} - Emergency Restoration Services`
      }]
    },

    twitter: {
      card: 'summary_large_image',
      title: optimizedTitle,
      description: optimizedDescription,
      site: '@DisasterRecovBNE',
      creator: '@PhillMcGurk',
      images: [`${baseUrl}/images/disaster-recovery-twitter.jpg`]
    },

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },

    verification: {
      google: 'google-site-verification-code',
      yandex: undefined,
      yahoo: undefined,
      bing: 'bing-site-verification-code'
    },

    category: 'Emergency Services',

    other: {
      'geo.region': 'AU-QLD',
      'geo.placename': location || 'Brisbane',
      'geo.position': getGeoPosition(location),
      'ICBM': getGeoPosition(location),
      'dc.language': 'en-AU',
      'dc.creator': 'Disaster Recovery Brisbane',
      'dc.publisher': 'Master Restorer Phill McGurk',
      'dc.title': optimizedTitle,
      'dc.description': optimizedDescription
    }
  };
}

/**
 * Get current path based on config
 */
function getCurrentPath(config: PageSEOConfig): string {
  const { type, location, service } = config;

  if (type === 'suburb' && location) {
    return `/locations/${location.toLowerCase().replace(/\s+/g, '-')}`;
  }

  if (type === 'service' && service) {
    return `/services/${service.toLowerCase().replace(/\s+/g, '-')}`;
  }

  if (type === 'emergency' && service) {
    return `/emergency/${service.toLowerCase().replace(/\s+/g, '-')}`;
  }

  if (type === 'commercial' && service) {
    return `/commercial/${service.toLowerCase().replace(/\s+/g, '-')}`;
  }

  if (type === 'location' && location) {
    return `/service-areas/${location.toLowerCase().replace(/\s+/g, '-')}`;
  }

  return '/';
}

/**
 * Get geo position for location
 */
function getGeoPosition(location?: string): string {
  if (!location) {return '-27.4705;153.0260';} // Brisbane default

  const coords = localSEOConfig.geoCoordinates;

  if (location.toLowerCase().includes('brisbane')) {
    return `${coords.brisbane.lat};${coords.brisbane.lng}`;
  }

  if (location.toLowerCase().includes('ipswich')) {
    return `${coords.ipswich.lat};${coords.ipswich.lng}`;
  }

  if (location.toLowerCase().includes('logan')) {
    return `${coords.logan.lat};${coords.logan.lng}`;
  }

  return `${coords.brisbane.lat};${coords.brisbane.lng}`;
}

/**
 * Generate metadata for all service pages
 */
export function generateServicePageMetadata(
  serviceName: string,
  shortDescription?: string
): Metadata {
  const keywords = keywordResearch
    .filter(k => k.keyword.toLowerCase().includes(serviceName.toLowerCase()))
    .map(k => k.keyword);

  return generateEnhancedMetadata({
    title: `${serviceName} Brisbane, Ipswich & Logan`,
    description: shortDescription || `Professional ${serviceName.toLowerCase()} services across Brisbane, Ipswich & Logan. Master Restorer Phill McGurk. 24/7 emergency response. Insurance approved.`,
    keywords: [
      ...keywords,
      `${serviceName} Brisbane`,
      `${serviceName} Ipswich`,
      `${serviceName} Logan`,
      'Master Restorer',
      'IICRC certified',
      '24/7 emergency',
      'insurance approved'
    ],
    location: 'Brisbane',
    service: serviceName,
    type: 'service'
  });
}

/**
 * Generate metadata for location pages
 */
export function generateLocationPageMetadata(location: string): Metadata {
  const locationKeywords = keywordResearch
    .filter(k => k.locations.includes(location))
    .map(k => k.keyword);

  return generateEnhancedMetadata({
    title: `${location} Disaster Recovery Services`,
    description: `Emergency water damage, fire damage & mould restoration in ${location}. Master Restorer Phill McGurk leads 24/7 response team. Insurance approved. Call 1300 309 361.`,
    keywords: [
      ...locationKeywords,
      `${location} water damage`,
      `${location} fire damage`,
      `${location} emergency restoration`,
      `${location} Master Restorer`,
      'disaster recovery',
      'property restoration'
    ],
    location,
    type: 'location'
  });
}

/**
 * Generate metadata for suburb pages
 */
export function generateSuburbPageMetadata(
  suburb: string,
  city: string
): Metadata {
  return generateEnhancedMetadata({
    title: `${suburb} Emergency Restoration Services`,
    description: `${suburb} residents trust Master Restorer for water & fire damage restoration. 60-minute response, insurance approved, available 24/7. Call 1300 309 361.`,
    keywords: [
      `${suburb} water damage`,
      `${suburb} fire damage`,
      `${suburb} restoration`,
      `${suburb} emergency services`,
      `${city} Master Restorer`,
      'property restoration',
      '24/7 emergency response'
    ],
    location: suburb,
    type: 'suburb'
  });
}

/**
 * Generate metadata for emergency pages
 */
export function generateEmergencyPageMetadata(
  emergency: string,
  location: string = 'Brisbane'
): Metadata {
  return generateEnhancedMetadata({
    title: `Emergency ${emergency} ${location}`,
    description: `URGENT: ${emergency} in ${location}? Master Restorer responds in 60 minutes. Available 24/7 including holidays. Insurance approved. Call 1300 309 361 NOW.`,
    keywords: [
      `emergency ${emergency} ${location}`,
      `urgent ${emergency}`,
      `24 hour ${emergency}`,
      `after hours ${emergency}`,
      `weekend ${emergency}`,
      'Master Restorer emergency',
      'immediate response'
    ],
    location,
    service: emergency,
    type: 'emergency'
  });
}

/**
 * Generate metadata for commercial pages
 */
export function generateCommercialPageMetadata(
  service: string,
  location: string = 'Brisbane'
): Metadata {
  return generateEnhancedMetadata({
    title: `Commercial ${service} ${location}`,
    description: `Commercial ${service.toLowerCase()} for ${location} businesses. Master Restorer minimizes downtime with 24/7 response. Major insurers approved. Call 1300 309 361.`,
    keywords: [
      `commercial ${service} ${location}`,
      `business ${service}`,
      `office ${service}`,
      `industrial ${service}`,
      `commercial restoration ${location}`,
      'business continuity',
      'insurance claims'
    ],
    location,
    service,
    type: 'commercial'
  });
}

export default {
  generateEnhancedMetadata,
  generateServicePageMetadata,
  generateLocationPageMetadata,
  generateSuburbPageMetadata,
  generateEmergencyPageMetadata,
  generateCommercialPageMetadata
};