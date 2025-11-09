/**
 * Respond to Enquiry Command - Use Cases Layer
 * CQRS Command Handler
 */

import { EnquiryEntity } from '@/lib/domain/entities/EnquiryEntity';
import { UnitOfWork } from '@/lib/infrastructure/persistence/UnitOfWork';
import { EventDispatcher } from '@/lib/domain/events/EventDispatcher';
import { EventStore } from '@/lib/domain/events/EventStore';
import { EnquiryRespondedEvent } from '@/lib/domain/events/DomainEvent';

export interface RespondToEnquiryCommandDTO {
  enquiryId: string;
  respondedBy: string;
  responseMessage: string;
}

export class RespondToEnquiryCommand {
  constructor(
    private uow: UnitOfWork,
    private eventDispatcher: EventDispatcher,
    private eventStore: EventStore
  ) {}

  async execute(dto: RespondToEnquiryCommandDTO): Promise<EnquiryEntity> {
    // Find enquiry
    const enquiry = await this.uow.enquiryRepository.findById(dto.enquiryId);
    if (!enquiry) {
      throw new Error(`Enquiry not found: ${dto.enquiryId}`);
    }

    // Execute business logic
    enquiry.markAsResponded();

    // Save to repository
    const updatedEnquiry = await this.uow.enquiryRepository.save(enquiry);

    // Create and dispatch domain event
    const event = new EnquiryRespondedEvent(updatedEnquiry.id, {
      respondedBy: dto.respondedBy,
      responseMessage: dto.responseMessage,
      respondedAt: updatedEnquiry.respondedAt,
    });

    await this.eventStore.save(event);
    await this.eventDispatcher.dispatch(event);

    return updatedEnquiry;
  }
}
