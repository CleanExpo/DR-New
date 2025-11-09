import { Partner } from '@prisma/client';
import { BaseRepository } from './base';
import { CacheKeys, CacheStrategies } from '../../cache/strategies';
import { CacheInvalidation } from '../../cache/invalidation';

export interface CreatePartnerData {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  abn?: string;
  serviceAreas: string;
  specializations: string;
  certifications?: string;
  insuranceApproved?: boolean;
  leadCredits?: number;
  accountBalance?: number;
  creditLimit?: number;
  paymentTerms?: number;
  autoAcceptScore?: number;
  maxLeadsPerDay?: number;
  receiveEmergency?: boolean;
  receiveCommercial?: boolean;
}

export class PartnerRepository extends BaseRepository<Partner> {
  constructor() {
    super('partner');
  }

  /**
   * Get partner by ID with caching
   */
  async getById(id: string): Promise<Partner | null> {
    return this.findById(id, {
      cache: true,
      cacheKey: CacheKeys.partner(id),
      cacheOptions: CacheStrategies.QUERY,
      include: {
        leads: {
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
        billing: {
          where: { status: 'PENDING' },
        },
      },
    });
  }

  /**
   * Get partner by email with caching
   */
  async getByEmail(email: string): Promise<Partner | null> {
    return this.findFirst({
      where: { email },
    });
  }

  /**
   * Get active partners with pagination and caching
   */
  async getActive(page: number = 1, pageSize: number = 20) {
    return this.paginate({
      where: {
        status: 'ACTIVE',
        verifiedAt: { not: null },
      },
      orderBy: { businessName: 'asc' },
      page,
      pageSize,
      cache: true,
      cacheKey: CacheKeys.partnersActive(page),
      cacheOptions: CacheStrategies.QUERY,
    });
  }

  /**
   * Create partner with cache invalidation
   */
  async createPartner(data: CreatePartnerData): Promise<Partner> {
    const partner = await this.create(data);

    await CacheInvalidation.onPartnerCreate(partner.id);

    return partner;
  }

  /**
   * Update partner with cache invalidation
   */
  async updatePartner(
    id: string,
    data: Partial<CreatePartnerData>
  ): Promise<Partner> {
    const partner = await this.update(id, data);

    await CacheInvalidation.onPartnerUpdate(id, data.email);

    return partner;
  }

  /**
   * Delete partner with cache invalidation
   */
  async deletePartner(id: string): Promise<Partner> {
    const partner = await this.findById(id);
    const deleted = await this.delete(id);

    await CacheInvalidation.onPartnerDelete(id, partner?.email);

    return deleted;
  }

  /**
   * Find partners by service area
   */
  async findByServiceArea(suburb: string): Promise<Partner[]> {
    return this.findMany({
      where: {
        status: 'ACTIVE',
        serviceAreas: {
          contains: suburb,
        },
      },
      orderBy: { leadCredits: 'desc' },
    });
  }

  /**
   * Update lead credits
   */
  async updateCredits(
    partnerId: string,
    amount: number
  ): Promise<Partner> {
    const partner = await this.findById(partnerId);

    if (!partner) {
      throw new Error('Partner not found');
    }

    return this.updatePartner(partnerId, {
      leadCredits: partner.leadCredits + amount,
    } as any);
  }

  /**
   * Get partners with low credits
   */
  async getLowCreditPartners(threshold: number = 100): Promise<Partner[]> {
    return this.findMany({
      where: {
        status: 'ACTIVE',
        leadCredits: {
          lt: threshold,
        },
      },
      include: {
        billing: {
          where: { status: 'PENDING' },
        },
      },
    });
  }

  /**
   * Get partner statistics
   */
  async getStats(partnerId: string) {
    return this.db.$transaction(async (tx) => {
      const [
        totalLeads,
        acceptedLeads,
        rejectedLeads,
        completedLeads,
        pendingBilling,
        totalRevenue,
      ] = await Promise.all([
        tx.lead.count({ where: { partnerId } }),
        tx.lead.count({ where: { partnerId, status: 'ACCEPTED' } }),
        tx.lead.count({ where: { partnerId, status: 'REJECTED' } }),
        tx.lead.count({ where: { partnerId, status: 'COMPLETED' } }),
        tx.partnerBilling.count({
          where: { partnerId, status: 'PENDING' },
        }),
        tx.partnerBilling.aggregate({
          where: { partnerId, status: 'PAID' },
          _sum: { amount: true },
        }),
      ]);

      return {
        totalLeads,
        acceptedLeads,
        rejectedLeads,
        completedLeads,
        pendingBilling,
        totalRevenue: totalRevenue._sum.amount || 0,
        acceptanceRate: totalLeads > 0 ? (acceptedLeads / totalLeads) * 100 : 0,
        completionRate: acceptedLeads > 0 ? (completedLeads / acceptedLeads) * 100 : 0,
      };
    });
  }

  /**
   * Verify partner
   */
  async verify(partnerId: string): Promise<Partner> {
    return this.updatePartner(partnerId, {
      verifiedAt: new Date(),
    } as any);
  }

  /**
   * Suspend partner
   */
  async suspend(partnerId: string): Promise<Partner> {
    return this.updatePartner(partnerId, {
      status: 'SUSPENDED',
      suspendedAt: new Date(),
    } as any);
  }

  /**
   * Reactivate partner
   */
  async reactivate(partnerId: string): Promise<Partner> {
    return this.updatePartner(partnerId, {
      status: 'ACTIVE',
      suspendedAt: null,
    } as any);
  }
}

// Export singleton instance
export const partnerRepository = new PartnerRepository();
