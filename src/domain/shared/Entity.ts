/**
 * Base Entity Class
 *
 * All domain entities should extend this class.
 * Entities have identity - they are distinguished by their ID, not their attributes.
 *
 * @example
 * ```typescript
 * class ServiceRequest extends Entity<string> {
 *   constructor(
 *     id: string,
 *     public readonly serviceType: ServiceType,
 *     public status: ServiceStatus
 *   ) {
 *     super(id);
 *   }
 * }
 * ```
 */

export abstract class Entity<ID = string> {
  protected readonly _id: ID;
  protected readonly _createdAt: Date;
  protected _updatedAt: Date;

  constructor(id: ID, createdAt?: Date) {
    this._id = id;
    this._createdAt = createdAt ?? new Date();
    this._updatedAt = new Date();
  }

  /**
   * Unique identifier for this entity
   */
  get id(): ID {
    return this._id;
  }

  /**
   * When this entity was created
   */
  get createdAt(): Date {
    return this._createdAt;
  }

  /**
   * When this entity was last updated
   */
  get updatedAt(): Date {
    return this._updatedAt;
  }

  /**
   * Mark entity as updated
   */
  protected touch(): void {
    this._updatedAt = new Date();
  }

  /**
   * Entities are equal if they have the same ID
   */
  equals(other: Entity<ID>): boolean {
    if (!other) return false;
    if (!(other instanceof Entity)) return false;
    return this._id === other._id;
  }

  /**
   * Clone this entity with updated properties
   */
  abstract clone(): this;

  /**
   * Validate entity state
   * Override in subclasses to add validation
   */
  protected validate(): void {
    // Override in subclasses
  }
}

/**
 * Aggregate Root marker
 *
 * Aggregate roots are the entry points for modifying a cluster of related entities.
 * Only aggregate roots should have repositories.
 */
export abstract class AggregateRoot<ID = string> extends Entity<ID> {
  private _domainEvents: DomainEvent[] = [];

  /**
   * Add a domain event to this aggregate
   */
  protected addDomainEvent(event: DomainEvent): void {
    this._domainEvents.push(event);
  }

  /**
   * Get all domain events and clear them
   */
  public pullDomainEvents(): DomainEvent[] {
    const events = [...this._domainEvents];
    this._domainEvents = [];
    return events;
  }

  /**
   * Get domain events without clearing them
   */
  public getDomainEvents(): readonly DomainEvent[] {
    return this._domainEvents;
  }

  /**
   * Clear all domain events
   */
  public clearDomainEvents(): void {
    this._domainEvents = [];
  }
}

/**
 * Base interface for domain events
 */
export interface DomainEvent {
  readonly eventId: string;
  readonly occurredAt: Date;
  readonly aggregateId: string;
  readonly eventType: string;
}
