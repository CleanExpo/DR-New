import { Contractor } from '@prisma/client';
import { BaseRepository } from './base';
import { CacheKeys, CacheStrategies } from '../../cache/strategies';
import { CacheInvalidation } from '../../cache/invalidation';

export interface CreateContractorData {
  username: string;
  email: string;
  passwordHash: string;
  mobileNumber: string;
}

export class ContractorRepository extends BaseRepository<Contractor> {
  constructor() {
    super('contractor');
  }

  /**
   * Get contractor by ID with caching
   */
  async getById(id: string): Promise<Contractor | null> {
    return this.findById(id, {
      cache: true,
      cacheKey: CacheKeys.contractor(id),
      cacheOptions: CacheStrategies.QUERY,
      include: {
        companyProfile: true,
        certifications: {
          where: { status: 'VERIFIED' },
        },
        insurance: {
          where: { status: 'ACTIVE' },
        },
        subscription: true,
        territories: {
          where: { active: true },
        },
      },
    });
  }

  /**
   * Get contractor by email with caching
   */
  async getByEmail(email: string): Promise<Contractor | null> {
    return this.findFirst({
      where: { email },
      include: {
        companyProfile: true,
        subscription: true,
      },
    });
  }

  /**
   * Get approved contractors with pagination and caching
   */
  async getApproved(page: number = 1, pageSize: number = 20) {
    return this.paginate({
      where: {
        status: 'APPROVED',
        onboardingCompleted: true,
      },
      include: {
        companyProfile: {
          select: {
            companyName: true,
            abn: true,
          },
        },
        subscription: {
          select: {
            tier: true,
            status: true,
          },
        },
      },
      orderBy: { approvedAt: 'desc' },
      page,
      pageSize,
      cache: true,
      cacheKey: CacheKeys.contractorsApproved(page),
      cacheOptions: CacheStrategies.QUERY,
    });
  }

  /**
   * Create contractor with cache invalidation
   */
  async createContractor(data: CreateContractorData): Promise<Contractor> {
    const contractor = await this.create(data);

    await CacheInvalidation.onContractorCreate(contractor.id);

    return contractor;
  }

  /**
   * Update contractor with cache invalidation
   */
  async updateContractor(
    id: string,
    data: Partial<Contractor>
  ): Promise<Contractor> {
    const contractor = await this.update(id, data);

    await CacheInvalidation.onContractorUpdate(id, data.email);

    return contractor;
  }

  /**
   * Delete contractor with cache invalidation
   */
  async deleteContractor(id: string): Promise<Contractor> {
    const contractor = await this.findById(id);
    const deleted = await this.delete(id);

    await CacheInvalidation.onContractorDelete(id, contractor?.email);

    return deleted;
  }

  /**
   * Approve contractor
   */
  async approve(contractorId: string): Promise<Contractor> {
    return this.updateContractor(contractorId, {
      status: 'APPROVED',
      approvedAt: new Date(),
      rejectedAt: null,
      rejectionReason: null,
    });
  }

  /**
   * Reject contractor
   */
  async reject(contractorId: string, reason: string): Promise<Contractor> {
    return this.updateContractor(contractorId, {
      status: 'REJECTED',
      rejectedAt: new Date(),
      rejectionReason: reason,
    });
  }

  /**
   * Suspend contractor
   */
  async suspend(contractorId: string): Promise<Contractor> {
    return this.updateContractor(contractorId, {
      status: 'SUSPENDED',
      suspendedAt: new Date(),
    });
  }

  /**
   * Update onboarding progress
   */
  async updateOnboardingStep(
    contractorId: string,
    step: number
  ): Promise<Contractor> {
    const update: any = { onboardingStep: step };

    // Mark as completed if final step
    if (step >= 14) {
      update.onboardingCompleted = true;
    }

    return this.updateContractor(contractorId, update);
  }

  /**
   * Get contractors by status
   */
  async getByStatus(status: string): Promise<Contractor[]> {
    return this.findMany({
      where: { status },
      include: {
        companyProfile: {
          select: {
            companyName: true,
            abn: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get contractors with expiring certifications
   */
  async getWithExpiringCertifications(daysUntilExpiry: number = 30): Promise<Contractor[]> {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + daysUntilExpiry);

    return this.db.$queryRaw`
      SELECT DISTINCT c.*
      FROM Contractor c
      INNER JOIN ContractorCertification cc ON c.id = cc.contractorId
      WHERE cc.expiryDate IS NOT NULL
        AND cc.expiryDate <= ${expiryDate}
        AND cc.status = 'VERIFIED'
        AND c.status = 'APPROVED'
    ` as Promise<Contractor[]>;
  }

  /**
   * Get contractors with expiring insurance
   */
  async getWithExpiringInsurance(daysUntilExpiry: number = 30): Promise<Contractor[]> {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + daysUntilExpiry);

    return this.db.$queryRaw`
      SELECT DISTINCT c.*
      FROM Contractor c
      INNER JOIN ContractorInsurance ci ON c.id = ci.contractorId
      WHERE ci.expiryDate <= ${expiryDate}
        AND ci.status = 'ACTIVE'
        AND c.status = 'APPROVED'
    ` as Promise<Contractor[]>;
  }

  /**
   * Get contractor statistics
   */
  async getStats(contractorId: string) {
    return this.db.$transaction(async (tx) => {
      const [
        totalProjects,
        completedProjects,
        averageRating,
        certifications,
        insurancePolicies,
      ] = await Promise.all([
        tx.contractorProject.count({ where: { contractorId } }),
        tx.contractorProject.count({
          where: { contractorId, endDate: { not: null } },
        }),
        tx.contractorProject.aggregate({
          where: { contractorId, customerRating: { not: null } },
          _avg: { customerRating: true },
        }),
        tx.contractorCertification.count({
          where: { contractorId, status: 'VERIFIED' },
        }),
        tx.contractorInsurance.count({
          where: { contractorId, status: 'ACTIVE' },
        }),
      ]);

      return {
        totalProjects,
        completedProjects,
        averageRating: averageRating._avg.customerRating || 0,
        certifications,
        insurancePolicies,
        completionRate: totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0,
      };
    });
  }

  /**
   * Update last login
   */
  async updateLastLogin(contractorId: string): Promise<Contractor> {
    return this.updateContractor(contractorId, {
      lastLoginAt: new Date(),
    });
  }

  /**
   * Search contractors by service area and specialization
   */
  async search(options: {
    serviceArea?: string;
    specialization?: string;
    status?: string;
  }): Promise<Contractor[]> {
    const where: any = {};

    if (options.status) {
      where.status = options.status;
    } else {
      where.status = 'APPROVED';
    }

    // This would need to be optimized based on actual data structure
    // For now, returning all matching contractors
    return this.findMany({
      where,
      include: {
        companyProfile: true,
        territories: {
          where: { active: true },
        },
        subscription: true,
      },
    });
  }
}

// Export singleton instance
export const contractorRepository = new ContractorRepository();
