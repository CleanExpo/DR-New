/**
 * Enquiry Repository - Infrastructure Layer
 * Concrete implementation with Prisma
 */

import { PrismaClient } from '@prisma/client';
import { IRepository, ISpecification } from './IRepository';
import { EnquiryEntity } from '@/lib/domain/entities/EnquiryEntity';
import { Email } from '@/lib/domain/value-objects/Email';
import { Phone } from '@/lib/domain/value-objects/Phone';
import { EnquiryStatus } from '@/lib/domain/value-objects/EnquiryStatus';

export class EnquiryRepository implements IRepository<EnquiryEntity, string> {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<EnquiryEntity | null> {
    const enquiry = await this.prisma.enquiry.findUnique({
      where: { id },
    });

    if (!enquiry) {
      return null;
    }

    return this.toDomain(enquiry);
  }

  async findAll(): Promise<EnquiryEntity[]> {
    const enquiries = await this.prisma.enquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return enquiries.map(e => this.toDomain(e));
  }

  async findBySpecification(spec: ISpecification<EnquiryEntity>): Promise<EnquiryEntity[]> {
    const allEnquiries = await this.findAll();
    return allEnquiries.filter(e => spec.isSatisfiedBy(e));
  }

  async save(entity: EnquiryEntity): Promise<EnquiryEntity> {
    const plain = entity.toPlainObject();

    const saved = await this.prisma.enquiry.upsert({
      where: { id: entity.id },
      create: {
        id: plain.id,
        name: plain.name,
        email: plain.email,
        phone: plain.phone,
        service: plain.service,
        message: plain.message,
        status: plain.status,
        urgency: plain.urgency,
        source: plain.source,
        respondedAt: plain.respondedAt,
        assignedTo: plain.assignedTo,
        createdAt: plain.createdAt,
        updatedAt: plain.updatedAt,
      },
      update: {
        name: plain.name,
        email: plain.email,
        phone: plain.phone,
        service: plain.service,
        message: plain.message,
        status: plain.status,
        urgency: plain.urgency,
        source: plain.source,
        respondedAt: plain.respondedAt,
        assignedTo: plain.assignedTo,
        updatedAt: plain.updatedAt,
      },
    });

    return this.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.enquiry.delete({
      where: { id },
    });
  }

  async count(): Promise<number> {
    return this.prisma.enquiry.count();
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.enquiry.count({
      where: { id },
    });
    return count > 0;
  }

  private toDomain(prismaEnquiry: any): EnquiryEntity {
    return EnquiryEntity.reconstitute(
      prismaEnquiry.id,
      {
        name: prismaEnquiry.name,
        email: Email.create(prismaEnquiry.email),
        phone: Phone.create(prismaEnquiry.phone),
        service: prismaEnquiry.service,
        message: prismaEnquiry.message,
        status: EnquiryStatus.fromString(prismaEnquiry.status),
        urgency: prismaEnquiry.urgency,
        source: prismaEnquiry.source,
        respondedAt: prismaEnquiry.respondedAt,
        assignedTo: prismaEnquiry.assignedTo,
      },
      prismaEnquiry.createdAt,
      prismaEnquiry.updatedAt
    );
  }
}

// Enquiry Specifications
export class EmergencyEnquirySpecification extends ISpecification<EnquiryEntity> {
  isSatisfiedBy(entity: EnquiryEntity): boolean {
    return entity.isEmergency();
  }
}

export class UnrespondedEnquirySpecification extends ISpecification<EnquiryEntity> {
  isSatisfiedBy(entity: EnquiryEntity): boolean {
    return !entity.status.isResponded();
  }
}

export class ServiceTypeSpecification extends ISpecification<EnquiryEntity> {
  constructor(private serviceType: string) {}

  isSatisfiedBy(entity: EnquiryEntity): boolean {
    return entity.service.toLowerCase().includes(this.serviceType.toLowerCase());
  }
}
