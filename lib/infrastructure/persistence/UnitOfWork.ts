/**
 * Unit of Work Pattern - Infrastructure Layer
 * Transaction management across repositories
 */

import { PrismaClient } from '@prisma/client';
import { EnquiryRepository } from '../repositories/EnquiryRepository';

export class UnitOfWork {
  private prisma: PrismaClient;
  private _enquiryRepository?: EnquiryRepository;

  constructor(prisma?: PrismaClient) {
    this.prisma = prisma || new PrismaClient();
  }

  get enquiryRepository(): EnquiryRepository {
    if (!this._enquiryRepository) {
      this._enquiryRepository = new EnquiryRepository(this.prisma);
    }
    return this._enquiryRepository;
  }

  async transaction<T>(work: (uow: UnitOfWork) => Promise<T>): Promise<T> {
    return this.prisma.$transaction(async (tx) => {
      const transactionalUoW = new UnitOfWork(tx as PrismaClient);
      return work(transactionalUoW);
    });
  }

  async commit(): Promise<void> {
    // Prisma auto-commits, but this method maintains the pattern
    // for potential future use with explicit transaction management
  }

  async rollback(): Promise<void> {
    // Prisma handles rollback automatically on error
    // This method exists for interface completeness
  }

  async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }
}
