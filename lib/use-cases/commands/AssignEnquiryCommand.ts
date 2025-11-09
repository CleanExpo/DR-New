/**
 * Assign Enquiry Command - Use Cases Layer
 * CQRS Command Handler
 */

import { EnquiryEntity } from '@/lib/domain/entities/EnquiryEntity';
import { UnitOfWork } from '@/lib/infrastructure/persistence/UnitOfWork';
import { EventDispatcher } from '@/lib/domain/events/EventDispatcher';
import { EventStore } from '@/lib/domain/events/EventStore';
import { EnquiryAssignedEvent } from '@/lib/domain/events/DomainEvent';

export interface AssignEnquiryCommandDTO {
  enquiryId: string;
  userId: string;
  assignedBy: string;
}

export class AssignEnquiryCommand {
  constructor(
    private uow: UnitOfWork,
    private eventDispatcher: EventDispatcher,
    private eventStore: EventStore
  ) {}

  async execute(dto: AssignEnquiryCommandDTO): Promise<EnquiryEntity> {
    // Find enquiry
    const enquiry = await this.uow.enquiryRepository.findById(dto.enquiryId);
    if (!enquiry) {
      throw new Error(`Enquiry not found: ${dto.enquiryId}`);
    }

    // Execute business logic
    enquiry.assignTo(dto.userId);

    // Save to repository
    const updatedEnquiry = await this.uow.enquiryRepository.save(enquiry);

    // Create and dispatch domain event
    const event = new EnquiryAssignedEvent(updatedEnquiry.id, {
      assignedTo: dto.userId,
      assignedBy: dto.assignedBy,
      assignedAt: updatedEnquiry.updatedAt,
    });

    await this.eventStore.save(event);
    await this.eventDispatcher.dispatch(event);

    return updatedEnquiry;
  }
}
