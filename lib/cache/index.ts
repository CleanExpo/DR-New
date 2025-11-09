/**
 * Cache Module - Main Export
 *
 * Multi-tier caching with:
 * - Redis/Upstash KV support
 * - Cache strategies (TTL, tags)
 * - Automatic invalidation
 * - Stale-while-revalidate
 * - Performance monitoring
 */

// Core exports
export {
  CacheClient,
  cacheClient,
  get,
  set,
  del,
  getOrSet,
  invalidateByTags,
  flush,
} from './redis';

// Strategy exports
export {
  CacheStrategies,
  CacheKeys,
  CacheTags,
  invalidateCache,
  cached,
  staleWhileRevalidate,
  warmCache,
} from './strategies';

// Invalidation exports
export {
  CacheInvalidation,
  BatchCacheInvalidation,
  onLeadCreate,
  onLeadUpdate,
  onLeadDelete,
  onPartnerCreate,
  onPartnerUpdate,
  onPartnerDelete,
  onContractorCreate,
  onContractorUpdate,
  onContractorDelete,
} from './invalidation';

// Type exports
export type { CacheOptions, CacheResult } from './redis';
