/**
 * Broken Link Checker and Content Deduplication System
 * Identifies and fixes broken links, manages content freshness
 */

import { siteConfig } from './metadata';

// Link types
export type LinkType = 'internal' | 'external' | 'anchor' | 'tel' | 'mailto' | 'asset';

export interface Link {
  url: string;
  type: LinkType;
  sourceFile: string;
  lineNumber?: number;
  anchorText?: string;
  status?: number;
  valid?: boolean;
  error?: string;
}

// Link validation result
export interface LinkValidationResult {
  link: Link;
  isValid: boolean;
  statusCode?: number;
  error?: string;
  suggestion?: string;
}

// Content hash for deduplication
export interface ContentHash {
  url: string;
  title: string;
  description: string;
  contentHash: string;
  wordCount: number;
  lastModified: Date;
}

// Duplicate content detection
export interface DuplicateContent {
  pages: string[];
  similarity: number;
  type: 'exact' | 'near' | 'partial';
  recommendation: string;
}

// Parse link type
export function getLinkType(url: string): LinkType {
  if (url.startsWith('tel:')) return 'tel';
  if (url.startsWith('mailto:')) return 'mailto';
  if (url.startsWith('#')) return 'anchor';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    const urlObj = new URL(url);
    return urlObj.hostname === new URL(siteConfig.url).hostname ? 'internal' : 'external';
  }
  if (url.startsWith('/')) return 'internal';
  if (url.match(/\.(css|js|jpg|jpeg|png|gif|webp|svg|pdf|doc|docx)$/i)) return 'asset';
  return 'internal';
}

// Validate internal link
export function validateInternalLink(link: Link): LinkValidationResult {
  const validInternalPaths = [
    '/',
    '/emergency',
    '/services',
    '/services/water-damage',
    '/services/fire-damage',
    '/services/mould-remediation',
    '/services/storm-damage',
    '/services/commercial',
    '/services/contents-restoration',
    '/service-areas',
    '/service-areas/brisbane',
    '/service-areas/ipswich',
    '/service-areas/logan',
    '/about-phil-mcgurk',
    '/insurance',
    '/insurance/claim-process',
    '/insurance/partners',
    '/insurance/make-safe',
    '/contact',
    '/emergency/after-hours',
    '/emergency/weekend',
    '/emergency/public-holiday',
    '/emergency/water-damage-brisbane',
    '/emergency/fire-damage-brisbane',
    '/emergency/storm-damage-queensland',
    '/guides',
    '/faq'
  ];

  const url = link.url.split('?')[0].split('#')[0]; // Remove query and hash
  const isValid = validInternalPaths.some(path => url === path || url.startsWith(path + '/'));

  if (!isValid) {
    // Check if it's a common mistake
    const suggestions: { [key: string]: string } = {
      '/about': '/about-phil-mcgurk',
      '/about-us': '/about-phil-mcgurk',
      '/water-damage': '/services/water-damage',
      '/fire-damage': '/services/fire-damage',
      '/mould-removal': '/services/mould-remediation',
      '/mold-removal': '/services/mould-remediation',
      '/storm-damage': '/services/storm-damage',
      '/brisbane': '/service-areas/brisbane',
      '/ipswich': '/service-areas/ipswich',
      '/logan': '/service-areas/logan',
      '/24-7': '/emergency',
      '/247': '/emergency'
    };

    const suggestion = suggestions[url];

    return {
      link,
      isValid: false,
      error: 'Page not found',
      suggestion: suggestion ? `Did you mean: ${suggestion}` : 'Check URL path'
    };
  }

  return {
    link,
    isValid: true,
    statusCode: 200
  };
}

// Validate phone number link
export function validatePhoneLink(link: Link): LinkValidationResult {
  const phone = link.url.replace('tel:', '').replace(/[^\d+]/g, '');
  const expectedPhone = siteConfig.phone.replace(/[^\d]/g, '');

  if (!phone.includes(expectedPhone) && phone !== '+61' + expectedPhone) {
    return {
      link,
      isValid: false,
      error: `Phone number mismatch. Expected: ${siteConfig.phone}`,
      suggestion: `tel:${siteConfig.phone.replace(/\s/g, '')}`
    };
  }

  return {
    link,
    isValid: true
  };
}

// Validate email link
export function validateEmailLink(link: Link): LinkValidationResult {
  const email = link.url.replace('mailto:', '');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return {
      link,
      isValid: false,
      error: 'Invalid email format',
      suggestion: 'Use format: mailto:email@example.com'
    };
  }

  // Check if it's the business email
  if (!email.includes('disasterrecovery') && !email.includes('disaster-recovery')) {
    return {
      link,
      isValid: false,
      error: 'Email domain mismatch',
      suggestion: 'Use business email domain'
    };
  }

  return {
    link,
    isValid: true
  };
}

// Validate anchor link
export function validateAnchorLink(link: Link): LinkValidationResult {
  const anchor = link.url.substring(1);

  if (!anchor) {
    return {
      link,
      isValid: false,
      error: 'Empty anchor link',
      suggestion: 'Provide anchor target ID'
    };
  }

  // Common valid anchors
  const validAnchors = [
    'top',
    'services',
    'contact',
    'about',
    'emergency',
    'faq',
    'testimonials',
    'service-areas',
    'footer'
  ];

  if (!validAnchors.includes(anchor) && !anchor.match(/^[a-z0-9-]+$/)) {
    return {
      link,
      isValid: false,
      error: 'Invalid anchor format',
      suggestion: 'Use lowercase letters, numbers, and hyphens only'
    };
  }

  return {
    link,
    isValid: true
  };
}

// Comprehensive link validator
export function validateLink(link: Link): LinkValidationResult {
  switch (link.type) {
    case 'internal':
      return validateInternalLink(link);
    case 'tel':
      return validatePhoneLink(link);
    case 'mailto':
      return validateEmailLink(link);
    case 'anchor':
      return validateAnchorLink(link);
    case 'external':
      // External links require HTTP checking
      return {
        link,
        isValid: true, // Assume valid unless checked via HTTP
        suggestion: 'Consider rel="noopener noreferrer" for external links'
      };
    case 'asset':
      // Asset links need file system checking
      return {
        link,
        isValid: true, // Assume valid unless checked
        suggestion: 'Ensure asset is optimized and compressed'
      };
    default:
      return {
        link,
        isValid: false,
        error: 'Unknown link type'
      };
  }
}

// Extract links from HTML content
export function extractLinksFromHTML(html: string, sourceFile: string): Link[] {
  const links: Link[] = [];

  // Regular expressions for different link patterns
  const patterns = [
    // href attributes
    /<a[^>]+href=["']([^"']+)["']/gi,
    // src attributes (for assets)
    /<(?:img|script|link)[^>]+(?:src|href)=["']([^"']+)["']/gi,
    // Inline tel: and mailto:
    /\b(tel:|mailto:)[^\s<>"']+/gi
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(html)) !== null) {
      const url = match[1];
      if (url && !url.startsWith('javascript:') && !url.startsWith('data:')) {
        links.push({
          url,
          type: getLinkType(url),
          sourceFile,
          lineNumber: html.substring(0, match.index).split('\n').length
        });
      }
    }
  }

  return links;
}

// Content similarity calculator
export function calculateContentSimilarity(content1: string, content2: string): number {
  // Simple Jaccard similarity for demonstration
  const words1 = new Set(content1.toLowerCase().split(/\s+/));
  const words2 = new Set(content2.toLowerCase().split(/\s+/));

  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);

  return intersection.size / union.size;
}

// Detect duplicate content
export function detectDuplicateContent(
  contentHashes: ContentHash[]
): DuplicateContent[] {
  const duplicates: DuplicateContent[] = [];

  for (let i = 0; i < contentHashes.length; i++) {
    for (let j = i + 1; j < contentHashes.length; j++) {
      const hash1 = contentHashes[i];
      const hash2 = contentHashes[j];

      // Check exact duplicates
      if (hash1.contentHash === hash2.contentHash) {
        duplicates.push({
          pages: [hash1.url, hash2.url],
          similarity: 1.0,
          type: 'exact',
          recommendation: 'Consolidate duplicate pages or implement canonical tags'
        });
        continue;
      }

      // Check title/description duplicates
      if (hash1.title === hash2.title || hash1.description === hash2.description) {
        duplicates.push({
          pages: [hash1.url, hash2.url],
          similarity: 0.8,
          type: 'near',
          recommendation: 'Differentiate page titles and descriptions'
        });
        continue;
      }

      // Calculate content similarity
      const similarity = calculateContentSimilarity(
        `${hash1.title} ${hash1.description}`,
        `${hash2.title} ${hash2.description}`
      );

      if (similarity > 0.7) {
        duplicates.push({
          pages: [hash1.url, hash2.url],
          similarity,
          type: 'partial',
          recommendation: 'Review and differentiate similar content'
        });
      }
    }
  }

  return duplicates;
}

// Content freshness analyzer
export interface ContentFreshnessReport {
  url: string;
  lastModified: Date;
  daysSinceUpdate: number;
  updatePriority: 'urgent' | 'high' | 'medium' | 'low';
  reason: string;
  suggestions: string[];
}

export function analyzeContentFreshness(
  contentHash: ContentHash,
  pageType: 'service' | 'location' | 'emergency' | 'guide' | 'other'
): ContentFreshnessReport {
  const now = new Date();
  const daysSinceUpdate = Math.floor(
    (now.getTime() - contentHash.lastModified.getTime()) / (1000 * 60 * 60 * 24)
  );

  let updatePriority: ContentFreshnessReport['updatePriority'];
  let reason: string;
  const suggestions: string[] = [];

  // Determine update priority based on page type and age
  switch (pageType) {
    case 'emergency':
      if (daysSinceUpdate > 30) {
        updatePriority = 'urgent';
        reason = 'Emergency pages must be current';
        suggestions.push('Update emergency response times', 'Verify phone numbers', 'Check service availability');
      } else if (daysSinceUpdate > 14) {
        updatePriority = 'high';
        reason = 'Emergency content aging';
      } else {
        updatePriority = 'low';
        reason = 'Emergency content is fresh';
      }
      break;

    case 'service':
      if (daysSinceUpdate > 90) {
        updatePriority = 'high';
        reason = 'Service pages need quarterly updates';
        suggestions.push('Update service descriptions', 'Add recent case studies', 'Refresh pricing information');
      } else if (daysSinceUpdate > 60) {
        updatePriority = 'medium';
        reason = 'Service content aging';
      } else {
        updatePriority = 'low';
        reason = 'Service content is current';
      }
      break;

    case 'location':
      if (daysSinceUpdate > 180) {
        updatePriority = 'high';
        reason = 'Location pages need biannual updates';
        suggestions.push('Update local statistics', 'Add recent projects', 'Refresh area-specific content');
      } else if (daysSinceUpdate > 90) {
        updatePriority = 'medium';
        reason = 'Location content aging';
      } else {
        updatePriority = 'low';
        reason = 'Location content is acceptable';
      }
      break;

    case 'guide':
      if (daysSinceUpdate > 365) {
        updatePriority = 'high';
        reason = 'Guides need annual review';
        suggestions.push('Update technical information', 'Refresh examples', 'Review accuracy');
      } else if (daysSinceUpdate > 180) {
        updatePriority = 'medium';
        reason = 'Guide content aging';
      } else {
        updatePriority = 'low';
        reason = 'Guide content is current';
      }
      break;

    default:
      if (daysSinceUpdate > 365) {
        updatePriority = 'medium';
        reason = 'Content over one year old';
      } else {
        updatePriority = 'low';
        reason = 'Content age acceptable';
      }
  }

  // Add general suggestions based on age
  if (daysSinceUpdate > 180) {
    suggestions.push('Review for outdated information', 'Update images', 'Refresh meta descriptions');
  }

  return {
    url: contentHash.url,
    lastModified: contentHash.lastModified,
    daysSinceUpdate,
    updatePriority,
    reason,
    suggestions
  };
}

// Comprehensive link and content report
export interface LinkContentReport {
  timestamp: Date;
  brokenLinks: LinkValidationResult[];
  duplicateContent: DuplicateContent[];
  contentFreshness: ContentFreshnessReport[];
  summary: {
    totalLinks: number;
    brokenLinks: number;
    duplicatePages: number;
    staleContent: number;
    overallHealth: number; // 0-100 score
  };
  recommendations: string[];
}

export function generateLinkContentReport(
  links: Link[],
  contentHashes: ContentHash[],
  pageTypes: Map<string, 'service' | 'location' | 'emergency' | 'guide' | 'other'>
): LinkContentReport {
  // Validate all links
  const linkResults = links.map(link => validateLink(link));
  const brokenLinks = linkResults.filter(r => !r.isValid);

  // Detect duplicate content
  const duplicateContent = detectDuplicateContent(contentHashes);

  // Analyze content freshness
  const contentFreshness = contentHashes.map(hash =>
    analyzeContentFreshness(hash, pageTypes.get(hash.url) || 'other')
  );

  const staleContent = contentFreshness.filter(
    c => c.updatePriority === 'urgent' || c.updatePriority === 'high'
  );

  // Calculate overall health score
  const linkHealth = ((links.length - brokenLinks.length) / links.length) * 100;
  const contentHealth = ((contentHashes.length - duplicateContent.length) / contentHashes.length) * 100;
  const freshnessHealth = ((contentHashes.length - staleContent.length) / contentHashes.length) * 100;

  const overallHealth = (linkHealth * 0.4 + contentHealth * 0.3 + freshnessHealth * 0.3);

  // Generate recommendations
  const recommendations: string[] = [];

  if (brokenLinks.length > 0) {
    recommendations.push(`Fix ${brokenLinks.length} broken links immediately`);
  }
  if (duplicateContent.length > 0) {
    recommendations.push(`Address ${duplicateContent.length} duplicate content issues`);
  }
  if (staleContent.length > 0) {
    recommendations.push(`Update ${staleContent.length} stale pages`);
  }
  if (overallHealth < 80) {
    recommendations.push('Implement regular content audits and link checking');
  }

  // Add specific recommendations based on common issues
  const phoneErrors = brokenLinks.filter(l => l.link.type === 'tel');
  if (phoneErrors.length > 0) {
    recommendations.push('Standardize phone number format across all pages');
  }

  const internalErrors = brokenLinks.filter(l => l.link.type === 'internal');
  if (internalErrors.length > 5) {
    recommendations.push('Review site structure and implement proper redirects');
  }

  return {
    timestamp: new Date(),
    brokenLinks,
    duplicateContent,
    contentFreshness: staleContent, // Only return stale content
    summary: {
      totalLinks: links.length,
      brokenLinks: brokenLinks.length,
      duplicatePages: duplicateContent.length,
      staleContent: staleContent.length,
      overallHealth: Math.round(overallHealth)
    },
    recommendations
  };
}