/**
 * Database Module - Main Export
 *
 * Optimized database layer with:
 * - Connection pooling
 * - Query optimization
 * - N+1 query prevention
 * - Repository pattern
 * - Performance monitoring
 */

// Core exports
export { prisma, redis, db, cache } from './connection';

// Repository exports
export {
  BaseRepository,
  LeadRepository,
  leadRepository,
  PartnerRepository,
  partnerRepository,
  ContractorRepository,
  contractorRepository,
  repositories,
} from './repositories';

// Query optimization exports
export {
  DataLoader,
  createDataLoaders,
  QueryMonitor,
  queryMonitor,
  BatchOperations,
  OptimizedQueryBuilder,
  ConnectionStats,
} from './query-optimizer';

// Performance monitoring exports
export {
  performanceMonitor,
  trackQueryPerformance,
  trackCachePerformance,
  healthCheck,
  getPerformanceDashboard,
} from './performance-monitoring';

// Type exports
export type { PerformanceMetrics } from './performance-monitoring';
export type { CreateLeadData, LeadFilters } from './repositories/leads';
export type { CreatePartnerData } from './repositories/partners';
export type { CreateContractorData } from './repositories/contractors';
