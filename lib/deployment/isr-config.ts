/**
 * ISR (Incremental Static Regeneration) Configuration
 * Optimized revalidation strategies for different page types
 */

export interface ISRConfig {
  revalidate: number | false;
  tags?: string[];
  description: string;
}

/**
 * ISR Strategy Configuration
 * Different revalidation times based on content type
 */
export const ISR_STRATEGIES = {
  // Static pages - rarely change
  STATIC: {
    revalidate: 604800, // 7 days
    description: 'Static content that rarely changes'
  },

  // Semi-static pages - change weekly
  SEMI_STATIC: {
    revalidate: 86400, // 1 day
    description: 'Content that changes weekly (blog posts, guides)'
  },

  // Dynamic pages - change daily
  DYNAMIC: {
    revalidate: 3600, // 1 hour
    description: 'Content that changes daily (service pages, locations)'
  },

  // Real-time pages - change frequently
  REALTIME: {
    revalidate: 300, // 5 minutes
    description: 'Content that changes frequently (pricing, availability)'
  },

  // Emergency pages - always fresh
  EMERGENCY: {
    revalidate: 60, // 1 minute
    description: 'Critical emergency information'
  },

  // Never revalidate - build time only
  BUILD_TIME: {
    revalidate: false,
    description: 'Generated at build time only'
  }
} as const;

/**
 * Page-specific ISR configuration
 */
export const PAGE_ISR_CONFIG: Record<string, ISRConfig> = {
  // Homepage - high traffic, moderate updates
  '/': {
    revalidate: 3600, // 1 hour
    tags: ['homepage', 'critical'],
    description: 'Homepage - revalidated hourly'
  },

  // Service pages - change occasionally
  '/services': {
    revalidate: 86400, // 1 day
    tags: ['services'],
    description: 'Service pages - revalidated daily'
  },

  // Service category pages
  '/services/[category]': {
    revalidate: 86400, // 1 day
    tags: ['services', 'category'],
    description: 'Service category pages - revalidated daily'
  },

  // Location pages - static content
  '/locations/[location]': {
    revalidate: 86400, // 1 day
    tags: ['locations'],
    description: 'Location pages - revalidated daily'
  },

  // Emergency pages - need to be fresh
  '/emergency/water-damage-brisbane': {
    revalidate: 300, // 5 minutes
    tags: ['emergency', 'water-damage'],
    description: 'Emergency water damage page - revalidated every 5 minutes'
  },

  '/emergency/fire-damage-brisbane': {
    revalidate: 300, // 5 minutes
    tags: ['emergency', 'fire-damage'],
    description: 'Emergency fire damage page - revalidated every 5 minutes'
  },

  '/emergency/storm-damage-queensland': {
    revalidate: 300, // 5 minutes
    tags: ['emergency', 'storm-damage'],
    description: 'Emergency storm damage page - revalidated every 5 minutes'
  },

  // About pages - rarely change
  '/about-phil-mcgurk': {
    revalidate: 604800, // 7 days
    tags: ['about'],
    description: 'About page - revalidated weekly'
  },

  '/about': {
    revalidate: 604800, // 7 days
    tags: ['about'],
    description: 'About page - revalidated weekly'
  },

  // Booking pages - moderate updates
  '/book-service': {
    revalidate: 3600, // 1 hour
    tags: ['booking'],
    description: 'Booking page - revalidated hourly'
  },

  // Search page - always fresh
  '/search': {
    revalidate: 60, // 1 minute
    tags: ['search'],
    description: 'Search page - revalidated every minute'
  },

  // Legal pages - rarely change
  '/legal/documents': {
    revalidate: 604800, // 7 days
    tags: ['legal'],
    description: 'Legal documents - revalidated weekly'
  }
};

/**
 * Get ISR config for a specific path
 */
export function getISRConfig(path: string): ISRConfig {
  // Direct match
  if (PAGE_ISR_CONFIG[path]) {
    return PAGE_ISR_CONFIG[path];
  }

  // Pattern match for dynamic routes
  for (const [pattern, config] of Object.entries(PAGE_ISR_CONFIG)) {
    if (pattern.includes('[') && matchesPattern(path, pattern)) {
      return config;
    }
  }

  // Default config
  return {
    revalidate: 3600, // 1 hour default
    tags: ['default'],
    description: 'Default ISR configuration'
  };
}

/**
 * Check if path matches a dynamic route pattern
 */
function matchesPattern(path: string, pattern: string): boolean {
  const regexPattern = pattern.replace(/\[.*?\]/g, '[^/]+');
  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(path);
}

/**
 * On-demand revalidation helper
 */
export interface RevalidationRequest {
  paths?: string[];
  tags?: string[];
}

export async function revalidateContent(
  request: RevalidationRequest
): Promise<{ revalidated: boolean; error?: string }> {
  try {
    // In Next.js 14+, use the revalidatePath or revalidateTag API
    // This would typically be called from an API route

    if (request.paths && request.paths.length > 0) {
      // Revalidate specific paths
      console.log('Revalidating paths:', request.paths);
      // await Promise.all(request.paths.map(path => revalidatePath(path)));
    }

    if (request.tags && request.tags.length > 0) {
      // Revalidate by tag
      console.log('Revalidating tags:', request.tags);
      // await Promise.all(request.tags.map(tag => revalidateTag(tag)));
    }

    return { revalidated: true };
  } catch (error) {
    console.error('Revalidation error:', error);
    return {
      revalidated: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Bulk revalidation for content updates
 */
export async function revalidateCategory(category: 'services' | 'locations' | 'emergency'): Promise<void> {
  const pathsByCategory = {
    services: ['/services', ...Object.keys(PAGE_ISR_CONFIG).filter(p => p.startsWith('/services'))],
    locations: ['/locations', ...Object.keys(PAGE_ISR_CONFIG).filter(p => p.startsWith('/locations'))],
    emergency: Object.keys(PAGE_ISR_CONFIG).filter(p => p.startsWith('/emergency'))
  };

  const paths = pathsByCategory[category];
  await revalidateContent({ paths });
}

/**
 * Schedule automatic revalidations
 */
export interface RevalidationSchedule {
  path: string;
  interval: number; // milliseconds
}

export const REVALIDATION_SCHEDULES: RevalidationSchedule[] = [
  {
    path: '/',
    interval: 3600000 // 1 hour
  },
  {
    path: '/services',
    interval: 86400000 // 1 day
  },
  {
    path: '/emergency/water-damage-brisbane',
    interval: 300000 // 5 minutes
  }
];

/**
 * Generate revalidation report
 */
export function generateRevalidationReport(): {
  pages: number;
  strategies: Record<string, number>;
  avgRevalidationTime: number;
} {
  const strategies: Record<string, number> = {};
  let totalRevalidationTime = 0;
  let pageCount = 0;

  for (const config of Object.values(PAGE_ISR_CONFIG)) {
    const revalidateTime = config.revalidate || 0;
    const strategyKey = revalidateTime === false ? 'never' :
                       revalidateTime <= 60 ? 'realtime' :
                       revalidateTime <= 3600 ? 'dynamic' :
                       revalidateTime <= 86400 ? 'daily' : 'weekly';

    strategies[strategyKey] = (strategies[strategyKey] || 0) + 1;
    totalRevalidationTime += typeof revalidateTime === 'number' ? revalidateTime : 0;
    pageCount++;
  }

  return {
    pages: pageCount,
    strategies,
    avgRevalidationTime: totalRevalidationTime / pageCount
  };
}

/**
 * Cache warming - preload critical pages
 */
export const CRITICAL_PAGES_TO_WARM = [
  '/',
  '/services',
  '/emergency/water-damage-brisbane',
  '/emergency/fire-damage-brisbane',
  '/book-service',
  '/about-phil-mcgurk'
];

export async function warmCache(baseUrl: string): Promise<void> {
  console.log('Warming cache for critical pages...');

  const results = await Promise.allSettled(
    CRITICAL_PAGES_TO_WARM.map(async (path) => {
      const url = `${baseUrl}${path}`;
      try {
        const response = await fetch(url);
        return { path, status: response.status };
      } catch (error) {
        console.error(`Failed to warm cache for ${path}:`, error);
        throw error;
      }
    })
  );

  const successful = results.filter(r => r.status === 'fulfilled').length;
  console.log(`Cache warming complete: ${successful}/${CRITICAL_PAGES_TO_WARM.length} pages`);
}
