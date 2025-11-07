/**
 * Content Structure and Hierarchy Optimizer
 * Ensures optimal content organization for SEO and user experience
 */

import { siteConfig } from './metadata';

// Content hierarchy structure
export interface ContentHierarchy {
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  text: string;
  keywords?: string[];
  id?: string;
}

// Page content structure
export interface PageContent {
  title: string;
  description: string;
  hierarchy: ContentHierarchy[];
  keywords: string[];
  lastModified?: Date;
  priority?: number;
  changeFreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

// Content optimization rules
export const contentOptimizationRules = {
  title: {
    minLength: 30,
    maxLength: 60,
    requiredKeywords: ['Brisbane', 'Ipswich', 'Logan', 'Master Restorer'],
    separator: ' | '
  },
  description: {
    minLength: 120,
    maxLength: 160,
    requiredMentions: ['24/7', 'emergency', 'insurance', siteConfig.phone]
  },
  headings: {
    h1: { min: 1, max: 1, includeKeyword: true },
    h2: { min: 2, max: 5, includeKeyword: true },
    h3: { min: 2, max: 10, includeKeyword: false },
    h4: { min: 0, max: 15, includeKeyword: false }
  },
  content: {
    minWords: 300,
    maxWords: 2000,
    keywordDensity: { min: 0.5, max: 2.5 }, // percentage
    readabilityScore: 60 // Flesch Reading Ease
  },
  images: {
    requireAlt: true,
    requireTitle: true,
    maxSize: 150000, // 150KB
    formats: ['webp', 'jpg', 'png'],
    dimensions: {
      hero: { width: 1920, height: 1080 },
      thumbnail: { width: 400, height: 300 },
      og: { width: 1200, height: 630 }
    }
  }
};

// Content scoring system
export function calculateContentScore(content: PageContent): {
  score: number;
  issues: string[];
  recommendations: string[];
} {
  let score = 100;
  const issues: string[] = [];
  const recommendations: string[] = [];

  // Title checks
  if (content.title.length < contentOptimizationRules.title.minLength) {
    score -= 10;
    issues.push(`Title too short (${content.title.length} chars, min ${contentOptimizationRules.title.minLength})`);
  }
  if (content.title.length > contentOptimizationRules.title.maxLength) {
    score -= 5;
    issues.push(`Title too long (${content.title.length} chars, max ${contentOptimizationRules.title.maxLength})`);
  }

  // Description checks
  if (content.description.length < contentOptimizationRules.description.minLength) {
    score -= 10;
    issues.push(`Description too short (${content.description.length} chars, min ${contentOptimizationRules.description.minLength})`);
  }
  if (content.description.length > contentOptimizationRules.description.maxLength) {
    score -= 5;
    issues.push(`Description too long (${content.description.length} chars, max ${contentOptimizationRules.description.maxLength})`);
  }

  // Keyword presence
  const hasLocationKeyword = content.keywords.some(k =>
    k.toLowerCase().includes('brisbane') ||
    k.toLowerCase().includes('ipswich') ||
    k.toLowerCase().includes('logan')
  );
  if (!hasLocationKeyword) {
    score -= 15;
    issues.push('Missing location keywords (Brisbane/Ipswich/Logan)');
    recommendations.push('Add location-specific keywords for local SEO');
  }

  // Hierarchy checks
  const h1Count = content.hierarchy.filter(h => h.level === 'h1').length;
  if (h1Count !== 1) {
    score -= 20;
    issues.push(`${h1Count === 0 ? 'Missing' : 'Multiple'} H1 tags (should have exactly 1)`);
  }

  // Master Restorer mention
  const hasMasterRestorerMention =
    content.title.includes('Master Restorer') ||
    content.description.includes('Master Restorer') ||
    content.description.includes('Phill McGurk');

  if (!hasMasterRestorerMention) {
    score -= 10;
    recommendations.push('Consider mentioning Master Restorer certification for authority');
  }

  // Emergency service emphasis
  const hasEmergencyKeywords = content.keywords.some(k =>
    k.toLowerCase().includes('emergency') ||
    k.toLowerCase().includes('24/7') ||
    k.toLowerCase().includes('urgent')
  );
  if (!hasEmergencyKeywords) {
    recommendations.push('Add emergency-related keywords for urgent service searches');
  }

  return { score, issues, recommendations };
}

// Content deduplication checker
export function checkContentDuplication(
  pages: Map<string, PageContent>
): Map<string, string[]> {
  const duplicates = new Map<string, string[]>();
  const contentHashes = new Map<string, string[]>();

  for (const [url, content] of pages) {
    // Create content hash (simplified - in production use crypto)
    const contentHash = `${content.title}::${content.description}`;

    if (contentHashes.has(contentHash)) {
      const existing = contentHashes.get(contentHash)!;
      existing.push(url);
      duplicates.set(contentHash, existing);
    } else {
      contentHashes.set(contentHash, [url]);
    }
  }

  // Filter to only actual duplicates
  for (const [hash, urls] of duplicates) {
    if (urls.length <= 1) {
      duplicates.delete(hash);
    }
  }

  return duplicates;
}

// Content freshness analyzer
export interface ContentFreshness {
  url: string;
  lastModified: Date;
  daysSinceUpdate: number;
  priority: number;
  needsUpdate: boolean;
  reason?: string;
}

export function analyzeContentFreshness(
  pages: Map<string, PageContent>
): ContentFreshness[] {
  const results: ContentFreshness[] = [];
  const now = new Date();

  for (const [url, content] of pages) {
    const lastModified = content.lastModified || new Date(0);
    const daysSinceUpdate = Math.floor(
      (now.getTime() - lastModified.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Determine if update needed based on priority and time
    let needsUpdate = false;
    let reason: string | undefined;

    if (content.priority && content.priority >= 0.8) {
      // High priority pages - update monthly
      if (daysSinceUpdate > 30) {
        needsUpdate = true;
        reason = 'High priority page not updated in 30+ days';
      }
    } else if (content.priority && content.priority >= 0.5) {
      // Medium priority - update quarterly
      if (daysSinceUpdate > 90) {
        needsUpdate = true;
        reason = 'Medium priority page not updated in 90+ days';
      }
    } else {
      // Low priority - update biannually
      if (daysSinceUpdate > 180) {
        needsUpdate = true;
        reason = 'Page not updated in 180+ days';
      }
    }

    results.push({
      url,
      lastModified,
      daysSinceUpdate,
      priority: content.priority || 0.5,
      needsUpdate,
      reason
    });
  }

  return results.sort((a, b) => {
    // Sort by update need, then priority, then days since update
    if (a.needsUpdate !== b.needsUpdate) {
      return a.needsUpdate ? -1 : 1;
    }
    if (a.priority !== b.priority) {
      return b.priority - a.priority;
    }
    return b.daysSinceUpdate - a.daysSinceUpdate;
  });
}

// URL structure optimizer
export interface URLOptimization {
  current: string;
  optimized: string;
  issues: string[];
  score: number;
}

export function optimizeURLStructure(url: string): URLOptimization {
  let optimized = url.toLowerCase();
  const issues: string[] = [];
  let score = 100;

  // Remove trailing slashes
  if (optimized.endsWith('/') && optimized !== '/') {
    optimized = optimized.slice(0, -1);
    issues.push('Removed trailing slash');
  }

  // Check for underscores
  if (optimized.includes('_')) {
    optimized = optimized.replace(/_/g, '-');
    issues.push('Replaced underscores with hyphens');
    score -= 5;
  }

  // Check for special characters
  const specialChars = /[^a-z0-9\-\/]/g;
  if (specialChars.test(optimized)) {
    optimized = optimized.replace(specialChars, '');
    issues.push('Removed special characters');
    score -= 10;
  }

  // Check for double slashes
  if (optimized.includes('//')) {
    optimized = optimized.replace(/\/+/g, '/');
    issues.push('Fixed double slashes');
    score -= 5;
  }

  // Check URL length
  if (optimized.length > 115) {
    issues.push('URL too long (>115 characters)');
    score -= 15;
  }

  // Check depth
  const depth = optimized.split('/').length - 1;
  if (depth > 4) {
    issues.push(`URL too deep (${depth} levels)`);
    score -= 10;
  }

  // Check for keywords
  const hasKeyword =
    optimized.includes('brisbane') ||
    optimized.includes('ipswich') ||
    optimized.includes('logan') ||
    optimized.includes('emergency') ||
    optimized.includes('restoration') ||
    optimized.includes('damage');

  if (!hasKeyword && optimized !== '/') {
    issues.push('Missing relevant keywords in URL');
    score -= 10;
  }

  return { current: url, optimized, issues, score };
}

// Navigation structure optimizer
export interface NavigationItem {
  label: string;
  url: string;
  priority: number;
  children?: NavigationItem[];
}

export function optimizeNavigationStructure(): NavigationItem[] {
  return [
    {
      label: 'Emergency Services',
      url: '/emergency',
      priority: 1.0,
      children: [
        { label: '24/7 Water Damage', url: '/emergency/water-damage-brisbane', priority: 0.9 },
        { label: 'Fire & Smoke Damage', url: '/emergency/fire-damage-brisbane', priority: 0.9 },
        { label: 'Storm Damage Queensland', url: '/emergency/storm-damage-queensland', priority: 0.9 },
        { label: 'After Hours Emergency', url: '/emergency/after-hours', priority: 0.8 }
      ]
    },
    {
      label: 'Services',
      url: '/services',
      priority: 0.9,
      children: [
        { label: 'Water Damage Restoration', url: '/services/water-damage', priority: 0.9 },
        { label: 'Fire Damage Restoration', url: '/services/fire-damage', priority: 0.9 },
        { label: 'Mould Remediation', url: '/services/mould-remediation', priority: 0.8 },
        { label: 'Storm Damage Repair', url: '/services/storm-damage', priority: 0.8 },
        { label: 'Commercial Restoration', url: '/services/commercial', priority: 0.8 },
        { label: 'Contents Restoration', url: '/services/contents-restoration', priority: 0.7 }
      ]
    },
    {
      label: 'Service Areas',
      url: '/service-areas',
      priority: 0.9,
      children: [
        { label: 'Brisbane', url: '/service-areas/brisbane', priority: 0.9 },
        { label: 'Ipswich', url: '/service-areas/ipswich', priority: 0.9 },
        { label: 'Logan', url: '/service-areas/logan', priority: 0.9 }
      ]
    },
    {
      label: 'About Phill McGurk',
      url: '/about-phil-mcgurk',
      priority: 0.8
    },
    {
      label: 'Insurance Claims',
      url: '/insurance',
      priority: 0.8,
      children: [
        { label: 'Claim Process', url: '/insurance/claim-process', priority: 0.7 },
        { label: 'Insurance Partners', url: '/insurance/partners', priority: 0.7 },
        { label: 'Make Safe Works', url: '/insurance/make-safe', priority: 0.7 }
      ]
    },
    {
      label: 'Contact 24/7',
      url: '/contact',
      priority: 1.0
    }
  ];
}

// Content optimization report generator
export interface OptimizationReport {
  timestamp: Date;
  totalPages: number;
  averageScore: number;
  criticalIssues: string[];
  recommendations: string[];
  duplicateContent: Map<string, string[]>;
  freshnessReport: ContentFreshness[];
  urlOptimizations: URLOptimization[];
}

export function generateOptimizationReport(
  pages: Map<string, PageContent>
): OptimizationReport {
  const scores: number[] = [];
  const allIssues: string[] = [];
  const allRecommendations: string[] = [];
  const urlOptimizations: URLOptimization[] = [];

  // Analyze each page
  for (const [url, content] of pages) {
    const { score, issues, recommendations } = calculateContentScore(content);
    scores.push(score);
    allIssues.push(...issues);
    allRecommendations.push(...recommendations);

    // Optimize URL
    const urlOpt = optimizeURLStructure(url);
    if (urlOpt.issues.length > 0) {
      urlOptimizations.push(urlOpt);
    }
  }

  // Calculate average score
  const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;

  // Get unique issues and recommendations
  const criticalIssues = [...new Set(allIssues)].slice(0, 10);
  const topRecommendations = [...new Set(allRecommendations)].slice(0, 10);

  // Check for duplicates
  const duplicateContent = checkContentDuplication(pages);

  // Analyze freshness
  const freshnessReport = analyzeContentFreshness(pages);

  return {
    timestamp: new Date(),
    totalPages: pages.size,
    averageScore,
    criticalIssues,
    recommendations: topRecommendations,
    duplicateContent,
    freshnessReport,
    urlOptimizations
  };
}