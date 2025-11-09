/**
 * Domain Event Base - Domain Layer
 * Event-driven architecture foundation
 */

export interface DomainEvent {
  readonly eventId: string;
  readonly occurredAt: Date;
  readonly eventType: string;
  readonly aggregateId: string;
  readonly payload: Record<string, unknown>;
}

export abstract class BaseDomainEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly occurredAt: Date;
  public readonly eventType: string;
  public readonly aggregateId: string;
  public readonly payload: Record<string, unknown>;

  constructor(aggregateId: string, eventType: string, payload: Record<string, unknown>) {
    this.eventId = crypto.randomUUID();
    this.occurredAt = new Date();
    this.aggregateId = aggregateId;
    this.eventType = eventType;
    this.payload = payload;
  }
}

// Specific Domain Events
export class EnquiryCreatedEvent extends BaseDomainEvent {
  constructor(enquiryId: string, payload: Record<string, unknown>) {
    super(enquiryId, 'EnquiryCreated', payload);
  }
}

export class EnquiryRespondedEvent extends BaseDomainEvent {
  constructor(enquiryId: string, payload: Record<string, unknown>) {
    super(enquiryId, 'EnquiryResponded', payload);
  }
}

export class EnquiryAssignedEvent extends BaseDomainEvent {
  constructor(enquiryId: string, payload: Record<string, unknown>) {
    super(enquiryId, 'EnquiryAssigned', payload);
  }
}

export class EnquiryEscalatedEvent extends BaseDomainEvent {
  constructor(enquiryId: string, payload: Record<string, unknown>) {
    super(enquiryId, 'EnquiryEscalated', payload);
  }
}
