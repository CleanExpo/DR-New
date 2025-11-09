/**
 * Get Enquiry Query - Use Cases Layer
 * CQRS Query Handler (Read Model)
 */

import { UnitOfWork } from '@/lib/infrastructure/persistence/UnitOfWork';

export interface EnquiryReadModel {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: string;
  urgency: string;
  source?: string;
  respondedAt?: Date;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class GetEnquiryQuery {
  constructor(private uow: UnitOfWork) {}

  async execute(enquiryId: string): Promise<EnquiryReadModel | null> {
    const enquiry = await this.uow.enquiryRepository.findById(enquiryId);
    if (!enquiry) {
      return null;
    }

    return this.toReadModel(enquiry);
  }

  private toReadModel(enquiry: any): EnquiryReadModel {
    const plain = enquiry.toPlainObject();
    return {
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
    };
  }
}
