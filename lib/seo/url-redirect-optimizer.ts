/**
 * URL Structure and Redirect Optimization System
 * Handles URL optimization, redirects, and 404 error management
 */

import { siteConfig } from './metadata';

// Redirect types
export type RedirectType = 301 | 302 | 307 | 308;

export interface Redirect {
  source: string;
  destination: string;
  type: RedirectType;
  reason?: string;
}

// URL structure rules
export const urlOptimizationRules = {
  maxLength: 115,
  maxDepth: 4,
  preferredSeparator: '-',
  forbiddenCharacters: /[^a-z0-9\-\/]/g,
  trailingSlash: false,
  lowercase: true,
  removeStopWords: ['a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for'],
  keywordPlacement: 'start' // Keywords should appear early in URL
};

// Common redirects for disaster recovery website
export const commonRedirects: Redirect[] = [
  // Service redirects
  { source: '/water-damage', destination: '/services/water-damage', type: 301, reason: 'Canonical service URL' },
  { source: '/fire-damage', destination: '/services/fire-damage', type: 301, reason: 'Canonical service URL' },
  { source: '/mould-removal', destination: '/services/mould-remediation', type: 301, reason: 'Canonical service URL' },
  { source: '/mold-removal', destination: '/services/mould-remediation', type: 301, reason: 'US to AU spelling' },
  { source: '/storm-damage', destination: '/services/storm-damage', type: 301, reason: 'Canonical service URL' },

  // Location redirects
  { source: '/brisbane', destination: '/service-areas/brisbane', type: 301, reason: 'Canonical location URL' },
  { source: '/ipswich', destination: '/service-areas/ipswich', type: 301, reason: 'Canonical location URL' },
  { source: '/logan', destination: '/service-areas/logan', type: 301, reason: 'Canonical location URL' },

  // Common misspellings and variations
  { source: '/phil-mcgurk', destination: '/about-phil-mcgurk', type: 301, reason: 'Name variation' },
  { source: '/phill-mcgurk', destination: '/about-phil-mcgurk', type: 301, reason: 'Name variation' },
  { source: '/about-us', destination: '/about-phil-mcgurk', type: 301, reason: 'Generic to specific' },
  { source: '/about', destination: '/about-phil-mcgurk', type: 301, reason: 'Canonical about page' },

  // Emergency variations
  { source: '/24-7', destination: '/emergency', type: 301, reason: 'Emergency service page' },
  { source: '/247', destination: '/emergency', type: 301, reason: 'Emergency service page' },
  { source: '/emergency-services', destination: '/emergency', type: 301, reason: 'Canonical emergency page' },

  // Old URL patterns
  { source: '/services.html', destination: '/services', type: 301, reason: 'Remove .html extension' },
  { source: '/index.html', destination: '/', type: 301, reason: 'Remove index.html' },
  { source: '/home', destination: '/', type: 301, reason: 'Home redirect' }
];

// Generate optimized URL slug
export function generateOptimizedSlug(text: string, includeKeyword?: string): string {
  let slug = text.toLowerCase().trim();

  // Remove special characters
  slug = slug.replace(/[^\w\s-]/g, '');

  // Replace spaces with hyphens
  slug = slug.replace(/\s+/g, '-');

  // Remove consecutive hyphens
  slug = slug.replace(/-+/g, '-');

  // Remove leading/trailing hyphens
  slug = slug.replace(/^-+|-+$/g, '');

  // Remove stop words if slug is too long
  if (slug.length > 50) {
    const words = slug.split('-');
    slug = words.filter(word => !urlOptimizationRules.removeStopWords.includes(word)).join('-');
  }

  // Add keyword if provided and not already present
  if (includeKeyword && !slug.includes(includeKeyword.toLowerCase())) {
    slug = `${includeKeyword.toLowerCase()}-${slug}`;
  }

  // Truncate if still too long
  if (slug.length > urlOptimizationRules.maxLength) {
    slug = slug.substring(0, urlOptimizationRules.maxLength);
    // Clean up any partial word at the end
    const lastHyphen = slug.lastIndexOf('-');
    if (lastHyphen > 80) {
      slug = slug.substring(0, lastHyphen);
    }
  }

  return slug;
}

// URL validation and scoring
export interface URLValidation {
  url: string;
  isValid: boolean;
  score: number;
  issues: string[];
  optimizedUrl?: string;
}

export function validateURL(url: string): URLValidation {
  const issues: string[] = [];
  let score = 100;
  let optimizedUrl = url;

  // Check length
  if (url.length > urlOptimizationRules.maxLength) {
    issues.push(`URL too long (${url.length} chars, max ${urlOptimizationRules.maxLength})`);
    score -= 15;
  }

  // Check depth
  const depth = url.split('/').filter(s => s.length > 0).length;
  if (depth > urlOptimizationRules.maxDepth) {
    issues.push(`URL too deep (${depth} levels, max ${urlOptimizationRules.maxDepth})`);
    score -= 10;
  }

  // Check for uppercase letters
  if (url !== url.toLowerCase()) {
    issues.push('URL contains uppercase letters');
    optimizedUrl = optimizedUrl.toLowerCase();
    score -= 5;
  }

  // Check for underscores
  if (url.includes('_')) {
    issues.push('URL contains underscores (use hyphens instead)');
    optimizedUrl = optimizedUrl.replace(/_/g, '-');
    score -= 5;
  }

  // Check for spaces
  if (url.includes(' ')) {
    issues.push('URL contains spaces');
    optimizedUrl = optimizedUrl.replace(/\s+/g, '-');
    score -= 10;
  }

  // Check for special characters
  const specialChars = url.match(urlOptimizationRules.forbiddenCharacters);
  if (specialChars) {
    issues.push(`URL contains forbidden characters: ${[...new Set(specialChars)].join(', ')}`);
    optimizedUrl = optimizedUrl.replace(urlOptimizationRules.forbiddenCharacters, '');
    score -= 15;
  }

  // Check for trailing slash (except root)
  if (url !== '/' && url.endsWith('/')) {
    issues.push('URL has trailing slash');
    optimizedUrl = optimizedUrl.replace(/\/$/, '');
    score -= 3;
  }

  // Check for double slashes
  if (url.includes('//')) {
    issues.push('URL contains double slashes');
    optimizedUrl = optimizedUrl.replace(/\/+/g, '/');
    score -= 5;
  }

  // Check for keyword presence
  const hasLocationKeyword = ['brisbane', 'ipswich', 'logan'].some(loc => url.toLowerCase().includes(loc));
  const hasServiceKeyword = ['water', 'fire', 'mould', 'storm', 'damage', 'restoration', 'emergency'].some(
    service => url.toLowerCase().includes(service)
  );

  if (!hasLocationKeyword && !hasServiceKeyword && url !== '/' && !url.includes('about') && !url.includes('contact')) {
    issues.push('URL missing relevant keywords');
    score -= 10;
  }

  // Check for query parameters
  if (url.includes('?')) {
    issues.push('URL contains query parameters (consider using clean URLs)');
    score -= 5;
  }

  // Check for file extensions
  if (url.match(/\.(html|htm|php|asp|aspx)$/i)) {
    issues.push('URL contains file extension');
    optimizedUrl = optimizedUrl.replace(/\.(html|htm|php|asp|aspx)$/i, '');
    score -= 10;
  }

  return {
    url,
    isValid: score >= 70,
    score: Math.max(0, score),
    issues,
    optimizedUrl: optimizedUrl !== url ? optimizedUrl : undefined
  };
}

// 404 error handler configuration
export interface ErrorPageConfig {
  title: string;
  heading: string;
  message: string;
  suggestions: string[];
  popularPages: Array<{ title: string; url: string; description: string }>;
  searchEnabled: boolean;
  autoRedirect?: { url: string; delay: number };
}

export function generate404PageConfig(): ErrorPageConfig {
  return {
    title: 'Page Not Found - Disaster Recovery Brisbane',
    heading: 'Oops! Page Not Found',
    message: 'The page you are looking for might have been moved or no longer exists. Don\'t worry, we\'re still here 24/7 for emergency assistance.',
    suggestions: [
      'Check the URL for any typos',
      'Use the navigation menu above',
      'Try searching for what you need',
      'Return to our homepage',
      'Call us directly at 1300 309 361'
    ],
    popularPages: [
      {
        title: '24/7 Emergency Services',
        url: '/emergency',
        description: 'Immediate disaster recovery response available now'
      },
      {
        title: 'Water Damage Restoration',
        url: '/services/water-damage',
        description: 'Professional water extraction and drying services'
      },
      {
        title: 'Service Areas',
        url: '/service-areas',
        description: 'Brisbane, Ipswich, and Logan coverage'
      },
      {
        title: 'Insurance Claims',
        url: '/insurance',
        description: 'We work with all major insurers'
      },
      {
        title: 'Contact Us',
        url: '/contact',
        description: 'Get in touch for immediate assistance'
      }
    ],
    searchEnabled: true,
    autoRedirect: {
      url: '/',
      delay: 10000 // 10 seconds
    }
  };
}

// Redirect chain detector
export interface RedirectChain {
  chain: string[];
  finalDestination: string;
  chainLength: number;
  issue?: string;
}

export function detectRedirectChains(redirects: Redirect[]): RedirectChain[] {
  const chains: RedirectChain[] = [];
  const redirectMap = new Map(redirects.map(r => [r.source, r]));

  for (const redirect of redirects) {
    const chain: string[] = [redirect.source];
    let current = redirect.destination;
    let iterations = 0;
    const maxIterations = 10;

    while (redirectMap.has(current) && iterations < maxIterations) {
      chain.push(current);
      const nextRedirect = redirectMap.get(current)!;
      current = nextRedirect.destination;
      iterations++;
    }

    if (iterations >= maxIterations) {
      chains.push({
        chain,
        finalDestination: current,
        chainLength: chain.length,
        issue: 'Possible redirect loop detected'
      });
    } else if (chain.length > 2) {
      chains.push({
        chain,
        finalDestination: current,
        chainLength: chain.length,
        issue: `Redirect chain too long (${chain.length} redirects)`
      });
    }
  }

  return chains.filter(c => c.chainLength > 2);
}

// Sitemap URL generator
export interface SitemapEntry {
  url: string;
  lastModified?: Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export function generateSitemapEntries(): SitemapEntry[] {
  const baseUrl = siteConfig.url;

  const entries: SitemapEntry[] = [
    // High priority pages
    { url: '/', changeFrequency: 'weekly', priority: 1.0 },
    { url: '/emergency', changeFrequency: 'monthly', priority: 1.0 },
    { url: '/contact', changeFrequency: 'monthly', priority: 0.9 },

    // Service pages
    { url: '/services', changeFrequency: 'monthly', priority: 0.9 },
    { url: '/services/water-damage', changeFrequency: 'monthly', priority: 0.9 },
    { url: '/services/fire-damage', changeFrequency: 'monthly', priority: 0.9 },
    { url: '/services/mould-remediation', changeFrequency: 'monthly', priority: 0.8 },
    { url: '/services/storm-damage', changeFrequency: 'monthly', priority: 0.8 },
    { url: '/services/commercial', changeFrequency: 'monthly', priority: 0.8 },

    // Location pages
    { url: '/service-areas', changeFrequency: 'monthly', priority: 0.8 },
    { url: '/service-areas/brisbane', changeFrequency: 'monthly', priority: 0.9 },
    { url: '/service-areas/ipswich', changeFrequency: 'monthly', priority: 0.9 },
    { url: '/service-areas/logan', changeFrequency: 'monthly', priority: 0.9 },

    // About and insurance
    { url: '/about-phil-mcgurk', changeFrequency: 'monthly', priority: 0.8 },
    { url: '/insurance', changeFrequency: 'monthly', priority: 0.7 },

    // Emergency time-based pages
    { url: '/emergency/after-hours', changeFrequency: 'monthly', priority: 0.7 },
    { url: '/emergency/weekend', changeFrequency: 'monthly', priority: 0.7 },
    { url: '/emergency/public-holiday', changeFrequency: 'monthly', priority: 0.7 }
  ];

  // Add full URLs
  return entries.map(entry => ({
    ...entry,
    url: `${baseUrl}${entry.url}`,
    lastModified: new Date()
  }));
}

// Robots.txt generator
export function generateRobotsTxt(): string {
  const baseUrl = siteConfig.url;

  return `# Robots.txt for Disaster Recovery Brisbane
# Master Restorer Emergency Services

User-agent: *
Allow: /

# Crawl-delay for responsible crawling
Crawl-delay: 1

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /client-portal/
Disallow: /_next/
Disallow: /tmp/

# Disallow duplicate content
Disallow: /print/
Disallow: /*?*
Disallow: /*#

# Allow important resources
Allow: /images/
Allow: /*.css$
Allow: /*.js$
Allow: /*.jpg$
Allow: /*.jpeg$
Allow: /*.png$
Allow: /*.webp$
Allow: /*.svg$

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Specific bot rules
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 1

# Block bad bots
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /`;
}

// Canonical URL generator
export function generateCanonicalURL(path: string, params?: URLSearchParams): string {
  const baseUrl = siteConfig.url;
  let canonical = `${baseUrl}${path}`;

  // Remove trailing slash except for root
  if (canonical !== `${baseUrl}/` && canonical.endsWith('/')) {
    canonical = canonical.slice(0, -1);
  }

  // Add only allowed parameters (for pagination, etc.)
  const allowedParams = ['page', 'category'];
  if (params) {
    const filteredParams = new URLSearchParams();
    for (const [key, value] of params) {
      if (allowedParams.includes(key)) {
        filteredParams.append(key, value);
      }
    }
    const paramString = filteredParams.toString();
    if (paramString) {
      canonical += `?${paramString}`;
    }
  }

  return canonical;
}