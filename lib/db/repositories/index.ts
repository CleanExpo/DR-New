/**
 * Repository Pattern - Centralized data access layer
 *
 * Benefits:
 * - Separation of concerns
 * - Easier testing and mocking
 * - Consistent caching strategies
 * - Optimized queries with eager loading
 * - Cache invalidation hooks
 */

export { BaseRepository } from './base';
export { LeadRepository, leadRepository } from './leads';
export { PartnerRepository, partnerRepository } from './partners';
export { ContractorRepository, contractorRepository } from './contractors';

// Re-export for convenience
export const repositories = {
  leads: () => import('./leads').then(m => m.leadRepository),
  partners: () => import('./partners').then(m => m.partnerRepository),
  contractors: () => import('./contractors').then(m => m.contractorRepository),
};
