import { cacheClient } from './redis';
import { CacheKeys, CacheTags } from './strategies';

/**
 * Cache invalidation on database mutations
 */
export class CacheInvalidation {
  /**
   * Invalidate cache after creating a lead
   */
  static async onLeadCreate(leadId: string, partnerId?: string) {
    const tasks = [
      cacheClient.invalidateByTags([CacheTags.LEADS]),
      cacheClient.delete(CacheKeys.leadsCount()),
      cacheClient.deletePattern('leads:status:*'),
    ];

    if (partnerId) {
      tasks.push(cacheClient.deletePattern(`leads:partner:${partnerId}:*`));
    }

    await Promise.all(tasks);
  }

  /**
   * Invalidate cache after updating a lead
   */
  static async onLeadUpdate(leadId: string, partnerId?: string, previousPartnerId?: string) {
    const tasks = [
      cacheClient.delete(CacheKeys.lead(leadId)),
      cacheClient.invalidateByTags([CacheTags.LEAD]),
      cacheClient.deletePattern('leads:status:*'),
    ];

    // Invalidate both old and new partner caches if partner changed
    if (partnerId) {
      tasks.push(cacheClient.deletePattern(`leads:partner:${partnerId}:*`));
    }
    if (previousPartnerId && previousPartnerId !== partnerId) {
      tasks.push(cacheClient.deletePattern(`leads:partner:${previousPartnerId}:*`));
    }

    await Promise.all(tasks);
  }

  /**
   * Invalidate cache after deleting a lead
   */
  static async onLeadDelete(leadId: string, partnerId?: string) {
    const tasks = [
      cacheClient.delete(CacheKeys.lead(leadId)),
      cacheClient.invalidateByTags([CacheTags.LEAD, CacheTags.LEADS]),
      cacheClient.delete(CacheKeys.leadsCount()),
      cacheClient.deletePattern('leads:status:*'),
    ];

    if (partnerId) {
      tasks.push(cacheClient.deletePattern(`leads:partner:${partnerId}:*`));
    }

    await Promise.all(tasks);
  }

  /**
   * Invalidate cache after creating a partner
   */
  static async onPartnerCreate(partnerId: string) {
    await Promise.all([
      cacheClient.invalidateByTags([CacheTags.PARTNERS]),
      cacheClient.delete(CacheKeys.partnersCount()),
      cacheClient.deletePattern('partners:active:*'),
    ]);
  }

  /**
   * Invalidate cache after updating a partner
   */
  static async onPartnerUpdate(partnerId: string, email?: string) {
    const tasks = [
      cacheClient.delete(CacheKeys.partner(partnerId)),
      cacheClient.invalidateByTags([CacheTags.PARTNER]),
      cacheClient.deletePattern('partners:active:*'),
    ];

    if (email) {
      tasks.push(cacheClient.delete(CacheKeys.partnerByEmail(email)));
    }

    await Promise.all(tasks);
  }

  /**
   * Invalidate cache after deleting a partner
   */
  static async onPartnerDelete(partnerId: string, email?: string) {
    const tasks = [
      cacheClient.delete(CacheKeys.partner(partnerId)),
      cacheClient.invalidateByTags([CacheTags.PARTNER, CacheTags.PARTNERS]),
      cacheClient.delete(CacheKeys.partnersCount()),
      cacheClient.deletePattern('partners:active:*'),
      cacheClient.deletePattern(`leads:partner:${partnerId}:*`),
    ];

    if (email) {
      tasks.push(cacheClient.delete(CacheKeys.partnerByEmail(email)));
    }

    await Promise.all(tasks);
  }

  /**
   * Invalidate cache after creating a contractor
   */
  static async onContractorCreate(contractorId: string) {
    await Promise.all([
      cacheClient.invalidateByTags([CacheTags.CONTRACTORS]),
      cacheClient.delete(CacheKeys.contractorsCount()),
      cacheClient.deletePattern('contractors:approved:*'),
    ]);
  }

  /**
   * Invalidate cache after updating a contractor
   */
  static async onContractorUpdate(contractorId: string, email?: string) {
    const tasks = [
      cacheClient.delete(CacheKeys.contractor(contractorId)),
      cacheClient.invalidateByTags([CacheTags.CONTRACTOR]),
      cacheClient.deletePattern('contractors:approved:*'),
    ];

    if (email) {
      tasks.push(cacheClient.delete(CacheKeys.contractorByEmail(email)));
    }

    // Invalidate analytics if contractor status changed
    tasks.push(cacheClient.invalidateByTags([CacheTags.ANALYTICS, CacheTags.KPI]));

    await Promise.all(tasks);
  }

  /**
   * Invalidate cache after deleting a contractor
   */
  static async onContractorDelete(contractorId: string, email?: string) {
    const tasks = [
      cacheClient.delete(CacheKeys.contractor(contractorId)),
      cacheClient.invalidateByTags([CacheTags.CONTRACTOR, CacheTags.CONTRACTORS]),
      cacheClient.delete(CacheKeys.contractorsCount()),
      cacheClient.deletePattern('contractors:approved:*'),
      cacheClient.invalidateByTags([CacheTags.ANALYTICS, CacheTags.KPI]),
    ];

    if (email) {
      tasks.push(cacheClient.delete(CacheKeys.contractorByEmail(email)));
    }

    await Promise.all(tasks);
  }

  /**
   * Invalidate cache after creating a client
   */
  static async onClientCreate(clientId: string, agencyId?: string) {
    const tasks = [
      cacheClient.invalidateByTags([CacheTags.CLIENTS]),
    ];

    if (agencyId) {
      tasks.push(cacheClient.deletePattern(`clients:agency:${agencyId}:*`));
    }

    await Promise.all(tasks);
  }

  /**
   * Invalidate cache after updating a client
   */
  static async onClientUpdate(clientId: string, agencyId?: string) {
    const tasks = [
      cacheClient.delete(CacheKeys.client(clientId)),
      cacheClient.invalidateByTags([CacheTags.CLIENT]),
    ];

    if (agencyId) {
      tasks.push(cacheClient.deletePattern(`clients:agency:${agencyId}:*`));
    }

    await Promise.all(tasks);
  }

  /**
   * Invalidate cache after deleting a client
   */
  static async onClientDelete(clientId: string, agencyId?: string) {
    const tasks = [
      cacheClient.delete(CacheKeys.client(clientId)),
      cacheClient.invalidateByTags([CacheTags.CLIENT, CacheTags.CLIENTS]),
    ];

    if (agencyId) {
      tasks.push(cacheClient.deletePattern(`clients:agency:${agencyId}:*`));
    }

    await Promise.all(tasks);
  }

  /**
   * Invalidate cache after creating an audit
   */
  static async onAuditCreate(auditId: string, clientId?: string) {
    const tasks = [
      cacheClient.invalidateByTags([CacheTags.AUDITS]),
    ];

    if (clientId) {
      tasks.push(cacheClient.deletePattern(`audits:client:${clientId}:*`));
    }

    await Promise.all(tasks);
  }

  /**
   * Invalidate cache after updating an audit
   */
  static async onAuditUpdate(auditId: string, clientId?: string) {
    const tasks = [
      cacheClient.delete(CacheKeys.audit(auditId)),
      cacheClient.invalidateByTags([CacheTags.AUDIT]),
    ];

    if (clientId) {
      tasks.push(cacheClient.deletePattern(`audits:client:${clientId}:*`));
    }

    await Promise.all(tasks);
  }

  /**
   * Invalidate cache after deleting an audit
   */
  static async onAuditDelete(auditId: string, clientId?: string) {
    const tasks = [
      cacheClient.delete(CacheKeys.audit(auditId)),
      cacheClient.invalidateByTags([CacheTags.AUDIT, CacheTags.AUDITS]),
    ];

    if (clientId) {
      tasks.push(cacheClient.deletePattern(`audits:client:${clientId}:*`));
    }

    await Promise.all(tasks);
  }

  /**
   * Invalidate analytics cache
   */
  static async onAnalyticsChange() {
    await cacheClient.invalidateByTags([CacheTags.ANALYTICS, CacheTags.KPI]);
  }

  /**
   * Scheduled cache cleanup (run daily)
   */
  static async scheduledCleanup() {
    console.log('[Cache] Running scheduled cleanup...');

    // Get cache stats before cleanup
    const statsBefore = await cacheClient.getStats();
    console.log('[Cache] Before cleanup:', statsBefore);

    // Invalidate short-lived and stale data
    const deleted = await cacheClient.deletePattern('*:page:*');

    // Get cache stats after cleanup
    const statsAfter = await cacheClient.getStats();
    console.log('[Cache] After cleanup:', statsAfter);
    console.log(`[Cache] Deleted ${deleted} keys`);
  }
}

/**
 * Batch invalidation for bulk operations
 */
export class BatchCacheInvalidation {
  private operations: Array<() => Promise<any>> = [];

  add(operation: () => Promise<any>) {
    this.operations.push(operation);
    return this;
  }

  async execute() {
    await Promise.all(this.operations.map(op => op()));
    this.operations = [];
  }

  static create() {
    return new BatchCacheInvalidation();
  }
}

// Export convenience functions
export const onLeadCreate = CacheInvalidation.onLeadCreate.bind(CacheInvalidation);
export const onLeadUpdate = CacheInvalidation.onLeadUpdate.bind(CacheInvalidation);
export const onLeadDelete = CacheInvalidation.onLeadDelete.bind(CacheInvalidation);
export const onPartnerCreate = CacheInvalidation.onPartnerCreate.bind(CacheInvalidation);
export const onPartnerUpdate = CacheInvalidation.onPartnerUpdate.bind(CacheInvalidation);
export const onPartnerDelete = CacheInvalidation.onPartnerDelete.bind(CacheInvalidation);
export const onContractorCreate = CacheInvalidation.onContractorCreate.bind(CacheInvalidation);
export const onContractorUpdate = CacheInvalidation.onContractorUpdate.bind(CacheInvalidation);
export const onContractorDelete = CacheInvalidation.onContractorDelete.bind(CacheInvalidation);
