import { Prisma } from '@prisma/client';
import { prisma } from './connection';

/**
 * Query optimization utilities
 */

/**
 * N+1 Query Prevention - Use dataloader pattern
 */
export class DataLoader<T> {
  private cache = new Map<string, Promise<T | null>>();
  private queue: string[] = [];
  private batchFn: (ids: string[]) => Promise<(T | null)[]>;
  private maxBatchSize: number;
  private scheduledCallback: NodeJS.Timeout | null = null;

  constructor(
    batchFn: (ids: string[]) => Promise<(T | null)[]>,
    options: { maxBatchSize?: number } = {}
  ) {
    this.batchFn = batchFn;
    this.maxBatchSize = options.maxBatchSize || 100;
  }

  load(id: string): Promise<T | null> {
    const cached = this.cache.get(id);
    if (cached) return cached;

    const promise = new Promise<T | null>((resolve, reject) => {
      this.queue.push(id);

      if (!this.scheduledCallback) {
        this.scheduledCallback = setTimeout(() => {
          this.dispatch().catch(reject);
        }, 0);
      }
    });

    this.cache.set(id, promise);
    return promise;
  }

  private async dispatch(): Promise<void> {
    this.scheduledCallback = null;

    const ids = this.queue.splice(0, this.maxBatchSize);
    if (ids.length === 0) return;

    try {
      const results = await this.batchFn(ids);

      ids.forEach((id, index) => {
        const cached = this.cache.get(id);
        if (cached) {
          // Resolve the promise with the result
          const result = results[index];
          this.cache.set(id, Promise.resolve(result));
        }
      });
    } catch (error) {
      ids.forEach(id => {
        this.cache.delete(id);
      });
      throw error;
    }
  }

  clear(): void {
    this.cache.clear();
    this.queue = [];
    if (this.scheduledCallback) {
      clearTimeout(this.scheduledCallback);
      this.scheduledCallback = null;
    }
  }
}

/**
 * Create dataloaders for common entities
 */
export const createDataLoaders = () => ({
  leads: new DataLoader<any>(async (ids: string[]) => {
    const leads = await prisma.lead.findMany({
      where: { id: { in: ids } },
      include: {
        partner: true,
        billing: true,
      },
    });

    const leadMap = new Map(leads.map(lead => [lead.id, lead]));
    return ids.map(id => leadMap.get(id) || null);
  }),

  partners: new DataLoader<any>(async (ids: string[]) => {
    const partners = await prisma.partner.findMany({
      where: { id: { in: ids } },
      include: {
        billing: { where: { status: 'PENDING' } },
      },
    });

    const partnerMap = new Map(partners.map(p => [p.id, p]));
    return ids.map(id => partnerMap.get(id) || null);
  }),

  contractors: new DataLoader<any>(async (ids: string[]) => {
    const contractors = await prisma.contractor.findMany({
      where: { id: { in: ids } },
      include: {
        companyProfile: true,
        subscription: true,
      },
    });

    const contractorMap = new Map(contractors.map(c => [c.id, c]));
    return ids.map(id => contractorMap.get(id) || null);
  }),

  clients: new DataLoader<any>(async (ids: string[]) => {
    const clients = await prisma.client.findMany({
      where: { id: { in: ids } },
      include: {
        agency: true,
      },
    });

    const clientMap = new Map(clients.map(c => [c.id, c]));
    return ids.map(id => clientMap.get(id) || null);
  }),
});

/**
 * Query performance monitoring
 */
export class QueryMonitor {
  private slowQueryThreshold = 1000; // ms
  private queryLog: Array<{
    query: string;
    duration: number;
    timestamp: Date;
  }> = [];

  logQuery(query: string, duration: number) {
    if (duration > this.slowQueryThreshold) {
      console.warn(`[QueryMonitor] Slow query detected (${duration}ms):`, query);

      this.queryLog.push({
        query,
        duration,
        timestamp: new Date(),
      });

      // Keep only last 100 slow queries
      if (this.queryLog.length > 100) {
        this.queryLog.shift();
      }
    }
  }

  getSlowQueries(limit: number = 10) {
    return this.queryLog
      .sort((a, b) => b.duration - a.duration)
      .slice(0, limit);
  }

  clearLog() {
    this.queryLog = [];
  }
}

export const queryMonitor = new QueryMonitor();

/**
 * Batch operations helper
 */
export class BatchOperations {
  /**
   * Batch insert with chunks
   */
  static async batchInsert<T>(
    model: any,
    data: T[],
    chunkSize: number = 100
  ): Promise<number> {
    let totalInserted = 0;

    for (let i = 0; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize);

      const result = await model.createMany({
        data: chunk,
        skipDuplicates: true,
      });

      totalInserted += result.count;
    }

    return totalInserted;
  }

  /**
   * Batch update with chunks
   */
  static async batchUpdate<T>(
    model: any,
    updates: Array<{ where: any; data: T }>,
    chunkSize: number = 50
  ): Promise<number> {
    let totalUpdated = 0;

    for (let i = 0; i < updates.length; i += chunkSize) {
      const chunk = updates.slice(i, i + chunkSize);

      await prisma.$transaction(
        chunk.map(({ where, data }) =>
          model.update({ where, data })
        )
      );

      totalUpdated += chunk.length;
    }

    return totalUpdated;
  }

  /**
   * Batch delete with chunks
   */
  static async batchDelete(
    model: any,
    ids: string[],
    chunkSize: number = 100
  ): Promise<number> {
    let totalDeleted = 0;

    for (let i = 0; i < ids.length; i += chunkSize) {
      const chunk = ids.slice(i, i + chunkSize);

      const result = await model.deleteMany({
        where: { id: { in: chunk } },
      });

      totalDeleted += result.count;
    }

    return totalDeleted;
  }
}

/**
 * Query builder with common optimizations
 */
export class OptimizedQueryBuilder {
  /**
   * Build optimized pagination query
   */
  static paginate(options: {
    page: number;
    pageSize: number;
    orderBy?: any;
  }) {
    const { page, pageSize, orderBy } = options;
    const skip = (page - 1) * pageSize;

    return {
      skip,
      take: pageSize,
      orderBy: orderBy || { createdAt: 'desc' },
    };
  }

  /**
   * Build date range filter
   */
  static dateRange(field: string, from?: Date, to?: Date) {
    const filter: any = {};

    if (from || to) {
      filter[field] = {};
      if (from) filter[field].gte = from;
      if (to) filter[field].lte = to;
    }

    return filter;
  }

  /**
   * Build text search filter
   */
  static textSearch(fields: string[], query: string) {
    return {
      OR: fields.map(field => ({
        [field]: {
          contains: query,
          mode: 'insensitive' as const,
        },
      })),
    };
  }

  /**
   * Build optimized include for relations
   */
  static selectFields<T extends Record<string, boolean>>(
    fields: T
  ): { select: T } {
    return { select: fields };
  }
}

/**
 * Connection pooling statistics
 */
export class ConnectionStats {
  static async getStats() {
    try {
      // Get active connections (Prisma doesn't expose this directly)
      // This is a placeholder - implement based on your database
      return {
        activeConnections: 0,
        idleConnections: 0,
        totalConnections: 0,
        maxConnections: 10,
      };
    } catch (error) {
      console.error('[ConnectionStats] Error getting stats:', error);
      return null;
    }
  }
}
