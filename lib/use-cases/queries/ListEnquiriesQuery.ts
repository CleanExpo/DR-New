/**
 * List Enquiries Query - Use Cases Layer
 * CQRS Query Handler with filtering
 */

import { UnitOfWork } from '@/lib/infrastructure/persistence/UnitOfWork';
import { EnquiryReadModel } from './GetEnquiryQuery';
import {
  EmergencyEnquirySpecification,
  UnrespondedEnquirySpecification,
  ServiceTypeSpecification,
} from '@/lib/infrastructure/repositories/EnquiryRepository';

export interface ListEnquiriesQueryDTO {
  status?: string;
  urgency?: 'low' | 'medium' | 'high' | 'emergency';
  service?: string;
  onlyUnresponded?: boolean;
  onlyEmergency?: boolean;
  limit?: number;
  offset?: number;
}

export class ListEnquiriesQuery {
  constructor(private uow: UnitOfWork) {}

  async execute(dto: ListEnquiriesQueryDTO = {}): Promise<EnquiryReadModel[]> {
    let enquiries = await this.uow.enquiryRepository.findAll();

    // Apply specifications
    if (dto.onlyEmergency) {
      const spec = new EmergencyEnquirySpecification();
      enquiries = enquiries.filter(e => spec.isSatisfiedBy(e));
    }

    if (dto.onlyUnresponded) {
      const spec = new UnrespondedEnquirySpecification();
      enquiries = enquiries.filter(e => spec.isSatisfiedBy(e));
    }

    if (dto.service) {
      const spec = new ServiceTypeSpecification(dto.service);
      enquiries = enquiries.filter(e => spec.isSatisfiedBy(e));
    }

    // Apply filters
    if (dto.status) {
      enquiries = enquiries.filter(e => e.status.value === dto.status);
    }

    if (dto.urgency) {
      enquiries = enquiries.filter(e => e.urgency === dto.urgency);
    }

    // Apply pagination
    const offset = dto.offset || 0;
    const limit = dto.limit || 50;
    enquiries = enquiries.slice(offset, offset + limit);

    // Convert to read models
    return enquiries.map(e => this.toReadModel(e));
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
