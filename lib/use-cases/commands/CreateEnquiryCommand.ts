/**
 * Create Enquiry Command - Use Cases Layer
 * CQRS Command Handler
 */

import { EnquiryEntity } from '@/lib/domain/entities/EnquiryEntity';
import { Email } from '@/lib/domain/value-objects/Email';
import { Phone } from '@/lib/domain/value-objects/Phone';
import { EnquiryStatus } from '@/lib/domain/value-objects/EnquiryStatus';
import { UnitOfWork } from '@/lib/infrastructure/persistence/UnitOfWork';
import { EventDispatcher } from '@/lib/domain/events/EventDispatcher';
import { EventStore } from '@/lib/domain/events/EventStore';
import { EnquiryCreatedEvent } from '@/lib/domain/events/DomainEvent';

export interface CreateEnquiryCommandDTO {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  urgency?: 'low' | 'medium' | 'high' | 'emergency';
  source?: string;
}

export class CreateEnquiryCommand {
  constructor(
    private uow: UnitOfWork,
    private eventDispatcher: EventDispatcher,
    private eventStore: EventStore
  ) {}

  async execute(dto: CreateEnquiryCommandDTO): Promise<EnquiryEntity> {
    // Validate and create value objects
    const email = Email.create(dto.email);
    const phone = Phone.create(dto.phone);

    // Create entity
    const enquiry = EnquiryEntity.create(crypto.randomUUID(), {
      name: dto.name.trim(),
      email,
      phone,
      service: dto.service,
      message: dto.message.trim(),
      status: EnquiryStatus.new(),
      urgency: dto.urgency || 'medium',
      source: dto.source,
    });

    // Save to repository
    const savedEnquiry = await this.uow.enquiryRepository.save(enquiry);

    // Create and dispatch domain event
    const event = new EnquiryCreatedEvent(savedEnquiry.id, {
      name: savedEnquiry.name,
      email: savedEnquiry.email.value,
      service: savedEnquiry.service,
      urgency: savedEnquiry.urgency,
      source: savedEnquiry.source,
    });

    await this.eventStore.save(event);
    await this.eventDispatcher.dispatch(event);

    return savedEnquiry;
  }
}
