import { cacheClient, CacheOptions } from './redis';

/**
 * Cache strategy types and TTL configurations
 */
export const CacheStrategies = {
  // Static content - 24 hours
  STATIC: {
    ttl: 86400,
    tags: ['static'],
  },

  // Page data - 1 hour
  PAGE: {
    ttl: 3600,
    tags: ['page'],
  },

  // API responses - 5 minutes
  API: {
    ttl: 300,
    tags: ['api'],
  },

  // Database queries - 10 minutes
  QUERY: {
    ttl: 600,
    tags: ['query'],
  },

  // User sessions - 30 minutes
  SESSION: {
    ttl: 1800,
    tags: ['session'],
  },

  // Short-lived data - 1 minute
  SHORT: {
    ttl: 60,
    tags: ['short'],
  },

  // Long-lived data - 7 days
  LONG: {
    ttl: 604800,
    tags: ['long'],
  },
} as const;

/**
 * Cache key generators for consistent naming
 */
export const CacheKeys = {
  // Lead queries
  lead: (id: string) => `lead:${id}`,
  leadsByStatus: (status: string, page: number = 1) => `leads:status:${status}:page:${page}`,
  leadsByPartner: (partnerId: string, page: number = 1) => `leads:partner:${partnerId}:page:${page}`,
  leadsCount: () => 'leads:count',

  // Partner queries
  partner: (id: string) => `partner:${id}`,
  partnerByEmail: (email: string) => `partner:email:${email}`,
  partnersActive: (page: number = 1) => `partners:active:page:${page}`,
  partnersCount: () => 'partners:count',

  // Contractor queries
  contractor: (id: string) => `contractor:${id}`,
  contractorByEmail: (email: string) => `contractor:email:${email}`,
  contractorsApproved: (page: number = 1) => `contractors:approved:page:${page}`,
  contractorsCount: () => 'contractors:count',

  // Client queries
  client: (id: string) => `client:${id}`,
  clientsByAgency: (agencyId: string, page: number = 1) => `clients:agency:${agencyId}:page:${page}`,

  // Audit queries
  audit: (id: string) => `audit:${id}`,
  auditsByClient: (clientId: string, page: number = 1) => `audits:client:${clientId}:page:${page}`,

  // Analytics
  analytics: (metric: string, timeframe: string) => `analytics:${metric}:${timeframe}`,
  kpi: (timeframe: string) => `kpi:${timeframe}`,

  // SEO & Static content
  metadata: (path: string) => `metadata:${path}`,
  schema: (path: string) => `schema:${path}`,
  sitemap: () => 'sitemap:xml',

  // Rate limiting
  rateLimit: (identifier: string, window: string) => `ratelimit:${identifier}:${window}`,
};

/**
 * Cache invalidation tags for related data
 */
export const CacheTags = {
  // Entity tags
  LEAD: 'lead',
  LEADS: 'leads',
  PARTNER: 'partner',
  PARTNERS: 'partners',
  CONTRACTOR: 'contractor',
  CONTRACTORS: 'contractors',
  CLIENT: 'client',
  CLIENTS: 'clients',
  AUDIT: 'audit',
  AUDITS: 'audits',

  // Feature tags
  ANALYTICS: 'analytics',
  KPI: 'kpi',
  SEARCH: 'search',
  SEO: 'seo',
};

/**
 * Invalidation helpers
 */
export const invalidateCache = {
  // Invalidate all lead caches
  async leads() {
    return cacheClient.invalidateByTags([CacheTags.LEAD, CacheTags.LEADS]);
  },

  // Invalidate specific lead
  async lead(id: string) {
    await cacheClient.delete(CacheKeys.lead(id));
    return cacheClient.invalidateByTags([CacheTags.LEAD]);
  },

  // Invalidate all partner caches
  async partners() {
    return cacheClient.invalidateByTags([CacheTags.PARTNER, CacheTags.PARTNERS]);
  },

  // Invalidate specific partner
  async partner(id: string) {
    await cacheClient.delete(CacheKeys.partner(id));
    return cacheClient.invalidateByTags([CacheTags.PARTNER]);
  },

  // Invalidate all contractor caches
  async contractors() {
    return cacheClient.invalidateByTags([CacheTags.CONTRACTOR, CacheTags.CONTRACTORS]);
  },

  // Invalidate specific contractor
  async contractor(id: string) {
    await cacheClient.delete(CacheKeys.contractor(id));
    return cacheClient.invalidateByTags([CacheTags.CONTRACTOR]);
  },

  // Invalidate analytics
  async analytics() {
    return cacheClient.invalidateByTags([CacheTags.ANALYTICS, CacheTags.KPI]);
  },

  // Invalidate all caches
  async all() {
    return cacheClient.flush();
  },
};

/**
 * Decorator for caching function results
 */
export function cached<T extends (...args: any[]) => Promise<any>>(
  keyGenerator: (...args: Parameters<T>) => string,
  options: CacheOptions = CacheStrategies.QUERY
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: Parameters<T>) {
      const key = keyGenerator(...args);

      return cacheClient.getOrSet(
        key,
        () => originalMethod.apply(this, args),
        options
      );
    };

    return descriptor;
  };
}

/**
 * Stale-while-revalidate cache pattern
 */
export async function staleWhileRevalidate<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: CacheOptions = CacheStrategies.QUERY
): Promise<T> {
  const cached = await cacheClient.get<T>(key);

  // Return cached data immediately if available
  if (cached.cached && cached.data !== null) {
    // Revalidate in background
    fetcher()
      .then(data => cacheClient.set(key, data, options))
      .catch(err => console.error('[Cache] Background revalidation failed:', err));

    return cached.data;
  }

  // No cache - fetch and store
  const data = await fetcher();
  await cacheClient.set(key, data, options);

  return data;
}

/**
 * Cache warming utilities
 */
export const warmCache = {
  // Warm frequently accessed data
  async frequently() {
    // This would be called on app startup or scheduled
    console.log('[Cache] Warming frequently accessed data...');

    // Example: Pre-cache active partners, recent leads, etc.
    // Implementation depends on your specific needs
  },

  // Warm specific entity
  async entity(type: string, id: string, data: any, options?: CacheOptions) {
    let key: string;

    switch (type) {
      case 'lead':
        key = CacheKeys.lead(id);
        break;
      case 'partner':
        key = CacheKeys.partner(id);
        break;
      case 'contractor':
        key = CacheKeys.contractor(id);
        break;
      default:
        return;
    }

    await cacheClient.set(key, data, options || CacheStrategies.QUERY);
  },
};
