import { AggregateRoot, DomainEvent } from '../shared/Entity';
import { Result } from '../shared/Result';
import { ValidationError, BusinessRuleViolation } from '../errors/DomainError';
import { Address } from '../value-objects/Address';
import { PhoneNumber } from '../value-objects/PhoneNumber';
import { Money } from '../value-objects/Money';

export type ServiceType =
  | 'water-damage'
  | 'fire-damage'
  | 'mould-remediation'
  | 'storm-damage'
  | 'flood-damage'
  | 'emergency-board-up'
  | 'sewage-cleanup';

export type ServicePriority = 'emergency' | 'urgent' | 'normal';

export type ServiceStatus =
  | 'pending'
  | 'scheduled'
  | 'in-progress'
  | 'completed'
  | 'cancelled';

export interface ServiceRequestProps {
  customerId: string;
  serviceType: ServiceType;
  priority: ServicePriority;
  location: Address;
  contactPhone: PhoneNumber;
  description: string;
  status: ServiceStatus;
  estimatedCost?: Money;
  scheduledDate?: Date;
  completedDate?: Date;
}

/**
 * ServiceRequest Aggregate Root
 *
 * Represents a customer's request for disaster recovery services
 * Enforces business rules around service requests
 */
export class ServiceRequest extends AggregateRoot<string> {
  private props: ServiceRequestProps;

  private constructor(
    id: string,
    props: ServiceRequestProps,
    createdAt?: Date
  ) {
    super(id, createdAt);
    this.props = props;
    this.validate();
  }

  /**
   * Create a new Service Request
   */
  static create(
    props: Omit<ServiceRequestProps, 'status'>,
    id?: string
  ): Result<ServiceRequest> {
    // Business rule: Emergency requests must have valid contact phone
    if (props.priority === 'emergency' && !props.contactPhone.isMobile()) {
      return Result.fail(
        new BusinessRuleViolation(
          'Emergency requests require a mobile phone number',
          'EMERGENCY_MOBILE_REQUIRED'
        )
      );
    }

    // Business rule: Location must be in service area
    if (!props.location.isInServiceArea()) {
      return Result.fail(
        new ValidationError(
          `Service area not supported: ${props.location.suburb}`,
          'location',
          'service_area'
        )
      );
    }

    // Business rule: Description must be meaningful
    if (props.description.trim().length < 20) {
      return Result.fail(
        new ValidationError(
          'Description must be at least 20 characters',
          'description',
          'min_length'
        )
      );
    }

    const requestId = id || crypto.randomUUID();

    const serviceRequest = new ServiceRequest(
      requestId,
      {
        ...props,
        status: 'pending',
      }
    );

    // Domain event: Service requested
    serviceRequest.addDomainEvent({
      eventId: crypto.randomUUID(),
      occurredAt: new Date(),
      aggregateId: requestId,
      eventType: 'ServiceRequested',
      serviceType: props.serviceType,
      priority: props.priority,
      location: props.location.suburb,
    } as ServiceRequestedEvent);

    return Result.ok(serviceRequest);
  }

  /**
   * Schedule the service request
   */
  schedule(scheduledDate: Date, estimatedCost: Money): Result<void> {
    // Business rule: Cannot schedule completed or cancelled requests
    if (this.props.status === 'completed' || this.props.status === 'cancelled') {
      return Result.fail(
        new BusinessRuleViolation(
          'Cannot schedule completed or cancelled requests',
          'INVALID_STATUS_TRANSITION'
        )
      );
    }

    // Business rule: Scheduled date must be in the future
    if (scheduledDate <= new Date()) {
      return Result.fail(
        new ValidationError(
          'Scheduled date must be in the future',
          'scheduledDate',
          'future_date'
        )
      );
    }

    // Business rule: Emergency requests must be scheduled within 24 hours
    if (this.props.priority === 'emergency') {
      const hoursDiff = (scheduledDate.getTime() - Date.now()) / (1000 * 60 * 60);
      if (hoursDiff > 24) {
        return Result.fail(
          new BusinessRuleViolation(
            'Emergency requests must be scheduled within 24 hours',
            'EMERGENCY_SCHEDULE_CONSTRAINT'
          )
        );
      }
    }

    this.props.scheduledDate = scheduledDate;
    this.props.estimatedCost = estimatedCost;
    this.props.status = 'scheduled';
    this.touch();

    // Domain event: Service scheduled
    this.addDomainEvent({
      eventId: crypto.randomUUID(),
      occurredAt: new Date(),
      aggregateId: this.id,
      eventType: 'ServiceScheduled',
      scheduledDate,
    } as ServiceScheduledEvent);

    return Result.ok(undefined);
  }

  /**
   * Start the service
   */
  startService(): Result<void> {
    // Business rule: Can only start scheduled requests
    if (this.props.status !== 'scheduled') {
      return Result.fail(
        new BusinessRuleViolation(
          'Can only start scheduled requests',
          'INVALID_STATUS_TRANSITION'
        )
      );
    }

    this.props.status = 'in-progress';
    this.touch();

    // Domain event: Service started
    this.addDomainEvent({
      eventId: crypto.randomUUID(),
      occurredAt: new Date(),
      aggregateId: this.id,
      eventType: 'ServiceStarted',
    } as ServiceStartedEvent);

    return Result.ok(undefined);
  }

  /**
   * Complete the service
   */
  complete(): Result<void> {
    // Business rule: Can only complete in-progress requests
    if (this.props.status !== 'in-progress') {
      return Result.fail(
        new BusinessRuleViolation(
          'Can only complete in-progress requests',
          'INVALID_STATUS_TRANSITION'
        )
      );
    }

    this.props.status = 'completed';
    this.props.completedDate = new Date();
    this.touch();

    // Domain event: Service completed
    this.addDomainEvent({
      eventId: crypto.randomUUID(),
      occurredAt: new Date(),
      aggregateId: this.id,
      eventType: 'ServiceCompleted',
      completedDate: this.props.completedDate,
    } as ServiceCompletedEvent);

    return Result.ok(undefined);
  }

  /**
   * Cancel the service request
   */
  cancel(reason: string): Result<void> {
    // Business rule: Cannot cancel completed requests
    if (this.props.status === 'completed') {
      return Result.fail(
        new BusinessRuleViolation(
          'Cannot cancel completed requests',
          'INVALID_STATUS_TRANSITION'
        )
      );
    }

    this.props.status = 'cancelled';
    this.touch();

    // Domain event: Service cancelled
    this.addDomainEvent({
      eventId: crypto.randomUUID(),
      occurredAt: new Date(),
      aggregateId: this.id,
      eventType: 'ServiceCancelled',
      reason,
    } as ServiceCancelledEvent);

    return Result.ok(undefined);
  }

  /**
   * Calculate response time based on priority
   */
  getExpectedResponseTime(): number {
    switch (this.props.priority) {
      case 'emergency':
        return 60; // 60 minutes
      case 'urgent':
        return 240; // 4 hours
      case 'normal':
        return 1440; // 24 hours
    }
  }

  /**
   * Check if request is overdue
   */
  isOverdue(): boolean {
    if (this.props.status === 'completed' || this.props.status === 'cancelled') {
      return false;
    }

    if (!this.props.scheduledDate) {
      return false;
    }

    return this.props.scheduledDate < new Date();
  }

  /**
   * Validate entity state
   */
  protected validate(): void {
    if (!this.props.customerId) {
      throw new Error('Customer ID is required');
    }

    if (!this.props.contactPhone) {
      throw new Error('Contact phone is required');
    }

    if (!this.props.location) {
      throw new Error('Location is required');
    }
  }

  /**
   * Clone this entity
   */
  clone(): this {
    return new ServiceRequest(
      this.id,
      { ...this.props },
      this.createdAt
    ) as this;
  }

  // Getters
  get customerId(): string {
    return this.props.customerId;
  }

  get serviceType(): ServiceType {
    return this.props.serviceType;
  }

  get priority(): ServicePriority {
    return this.props.priority;
  }

  get location(): Address {
    return this.props.location;
  }

  get contactPhone(): PhoneNumber {
    return this.props.contactPhone;
  }

  get description(): string {
    return this.props.description;
  }

  get status(): ServiceStatus {
    return this.props.status;
  }

  get estimatedCost(): Money | undefined {
    return this.props.estimatedCost;
  }

  get scheduledDate(): Date | undefined {
    return this.props.scheduledDate;
  }

  get completedDate(): Date | undefined {
    return this.props.completedDate;
  }
}

// Domain Events
export interface ServiceRequestedEvent extends DomainEvent {
  eventType: 'ServiceRequested';
  serviceType: ServiceType;
  priority: ServicePriority;
  location: string;
}

export interface ServiceScheduledEvent extends DomainEvent {
  eventType: 'ServiceScheduled';
  scheduledDate: Date;
}

export interface ServiceStartedEvent extends DomainEvent {
  eventType: 'ServiceStarted';
}

export interface ServiceCompletedEvent extends DomainEvent {
  eventType: 'ServiceCompleted';
  completedDate: Date;
}

export interface ServiceCancelledEvent extends DomainEvent {
  eventType: 'ServiceCancelled';
  reason: string;
}
