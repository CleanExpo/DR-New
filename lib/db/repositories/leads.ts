import { Lead } from '@prisma/client';
import { BaseRepository } from './base';
import { CacheKeys, CacheStrategies } from '../../cache/strategies';
import { CacheInvalidation } from '../../cache/invalidation';

export interface LeadFilters {
  status?: string;
  partnerId?: string;
  qualityStatus?: string;
  damageType?: string;
  suburb?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface CreateLeadData {
  fullName: string;
  phone: string;
  email: string;
  propertyType: string;
  propertyAddress: string;
  suburb: string;
  state: string;
  postcode: string;
  damageType: string;
  damageDate: Date;
  damageDescription: string;
  estimatedAreaAffected: string;
  hasInsurance: boolean;
  insuranceCompany?: string;
  claimNumber?: string;
  excessAmount?: string;
  urgencyLevel: string;
  propertyValue: string;
  isBusinessProperty: boolean;
  requiresAccommodation: boolean;
  leadScore: number;
  leadValue: number;
  hasPhotos: boolean;
  readyToStart: string;
  budget?: string;
  decisionMaker: boolean;
  qualityStatus: string;
  source?: string;
  ipAddress?: string;
  userAgent?: string;
}

export class LeadRepository extends BaseRepository<Lead> {
  constructor() {
    super('lead');
  }

  /**
   * Get lead by ID with caching
   */
  async getById(id: string): Promise<Lead | null> {
    return this.findById(id, {
      cache: true,
      cacheKey: CacheKeys.lead(id),
      cacheOptions: CacheStrategies.QUERY,
      include: {
        partner: {
          select: {
            id: true,
            businessName: true,
            email: true,
            phone: true,
          },
        },
        billing: true,
        tracking: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });
  }

  /**
   * Get leads by status with pagination and caching
   */
  async getByStatus(
    status: string,
    page: number = 1,
    pageSize: number = 20
  ) {
    return this.paginate({
      where: { status },
      include: {
        partner: {
          select: {
            id: true,
            businessName: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      page,
      pageSize,
      cache: true,
      cacheKey: CacheKeys.leadsByStatus(status, page),
      cacheOptions: CacheStrategies.QUERY,
    });
  }

  /**
   * Get leads by partner with pagination and caching
   */
  async getByPartner(
    partnerId: string,
    page: number = 1,
    pageSize: number = 20
  ) {
    return this.paginate({
      where: { partnerId },
      include: {
        billing: true,
        tracking: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
      orderBy: { createdAt: 'desc' },
      page,
      pageSize,
      cache: true,
      cacheKey: CacheKeys.leadsByPartner(partnerId, page),
      cacheOptions: CacheStrategies.QUERY,
    });
  }

  /**
   * Search leads with filters (no caching for complex queries)
   */
  async search(filters: LeadFilters, page: number = 1, pageSize: number = 20) {
    const where: any = {};

    if (filters.status) where.status = filters.status;
    if (filters.partnerId) where.partnerId = filters.partnerId;
    if (filters.qualityStatus) where.qualityStatus = filters.qualityStatus;
    if (filters.suburb) where.suburb = { contains: filters.suburb };
    if (filters.damageType) {
      where.damageType = { contains: filters.damageType };
    }

    if (filters.dateFrom || filters.dateTo) {
      where.createdAt = {};
      if (filters.dateFrom) where.createdAt.gte = filters.dateFrom;
      if (filters.dateTo) where.createdAt.lte = filters.dateTo;
    }

    return this.paginate({
      where,
      include: {
        partner: {
          select: {
            id: true,
            businessName: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      page,
      pageSize,
    });
  }

  /**
   * Create lead with cache invalidation
   */
  async createLead(data: CreateLeadData): Promise<Lead> {
    const lead = await this.create(data);

    // Invalidate relevant caches
    await CacheInvalidation.onLeadCreate(lead.id, data.partnerId);

    return lead;
  }

  /**
   * Update lead with cache invalidation
   */
  async updateLead(
    id: string,
    data: Partial<CreateLeadData>
  ): Promise<Lead> {
    // Get current lead to track partner changes
    const current = await this.findById(id);
    const previousPartnerId = current?.partnerId || undefined;

    const lead = await this.update(id, data);

    // Invalidate relevant caches
    await CacheInvalidation.onLeadUpdate(
      id,
      data.partnerId,
      previousPartnerId
    );

    return lead;
  }

  /**
   * Delete lead with cache invalidation
   */
  async deleteLead(id: string): Promise<Lead> {
    const lead = await this.findById(id);
    const partnerId = lead?.partnerId || undefined;

    const deleted = await this.delete(id);

    // Invalidate relevant caches
    await CacheInvalidation.onLeadDelete(id, partnerId);

    return deleted;
  }

  /**
   * Assign lead to partner
   */
  async assignToPartner(leadId: string, partnerId: string): Promise<Lead> {
    return this.updateLead(leadId, {
      partnerId,
      status: 'ASSIGNED',
      assignedAt: new Date(),
    } as any);
  }

  /**
   * Accept lead
   */
  async acceptLead(leadId: string): Promise<Lead> {
    return this.updateLead(leadId, {
      status: 'ACCEPTED',
      acceptedAt: new Date(),
    } as any);
  }

  /**
   * Reject lead
   */
  async rejectLead(leadId: string): Promise<Lead> {
    return this.updateLead(leadId, {
      status: 'REJECTED',
      rejectedAt: new Date(),
    } as any);
  }

  /**
   * Complete lead
   */
  async completeLead(leadId: string): Promise<Lead> {
    return this.updateLead(leadId, {
      status: 'COMPLETED',
      completedAt: new Date(),
    } as any);
  }

  /**
   * Get high-value leads (optimized query)
   */
  async getHighValueLeads(limit: number = 10): Promise<Lead[]> {
    return this.findMany({
      where: {
        qualityStatus: 'HIGH_VALUE',
        status: 'NEW',
      },
      orderBy: [
        { leadValue: 'desc' },
        { leadScore: 'desc' },
      ],
      take: limit,
      include: {
        partner: {
          select: {
            id: true,
            businessName: true,
          },
        },
      },
    });
  }

  /**
   * Get lead statistics (with caching)
   */
  async getStats(timeframe: 'today' | 'week' | 'month' = 'week') {
    const cacheKey = `leads:stats:${timeframe}`;

    return this.db.$transaction(async (tx) => {
      const now = new Date();
      let dateFrom: Date;

      switch (timeframe) {
        case 'today':
          dateFrom = new Date(now.setHours(0, 0, 0, 0));
          break;
        case 'week':
          dateFrom = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          dateFrom = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
      }

      const [total, newLeads, assigned, accepted, rejected, completed] = await Promise.all([
        tx.lead.count(),
        tx.lead.count({ where: { createdAt: { gte: dateFrom } } }),
        tx.lead.count({ where: { status: 'ASSIGNED', createdAt: { gte: dateFrom } } }),
        tx.lead.count({ where: { status: 'ACCEPTED', createdAt: { gte: dateFrom } } }),
        tx.lead.count({ where: { status: 'REJECTED', createdAt: { gte: dateFrom } } }),
        tx.lead.count({ where: { status: 'COMPLETED', createdAt: { gte: dateFrom } } }),
      ]);

      return {
        total,
        newLeads,
        assigned,
        accepted,
        rejected,
        completed,
        conversionRate: newLeads > 0 ? (completed / newLeads) * 100 : 0,
        acceptanceRate: assigned > 0 ? (accepted / assigned) * 100 : 0,
      };
    });
  }

  /**
   * Bulk update status
   */
  async bulkUpdateStatus(leadIds: string[], status: string): Promise<number> {
    const result = await this.updateMany(
      { id: { in: leadIds } },
      { status }
    );

    // Invalidate caches for all affected leads
    await Promise.all(
      leadIds.map(id => CacheInvalidation.onLeadUpdate(id))
    );

    return result.count;
  }
}

// Export singleton instance
export const leadRepository = new LeadRepository();
