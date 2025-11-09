/**
 * Event Store - Domain Layer
 * Persistent event storage for event sourcing
 */

import { DomainEvent } from './DomainEvent';

export interface EventStoreRepository {
  append(event: DomainEvent): Promise<void>;
  getEvents(aggregateId: string): Promise<DomainEvent[]>;
  getEventsByType(eventType: string): Promise<DomainEvent[]>;
  getAllEvents(): Promise<DomainEvent[]>;
  getEventsSince(timestamp: Date): Promise<DomainEvent[]>;
}

export class InMemoryEventStore implements EventStoreRepository {
  private events: DomainEvent[] = [];

  async append(event: DomainEvent): Promise<void> {
    this.events.push(event);
  }

  async getEvents(aggregateId: string): Promise<DomainEvent[]> {
    return this.events.filter(e => e.aggregateId === aggregateId);
  }

  async getEventsByType(eventType: string): Promise<DomainEvent[]> {
    return this.events.filter(e => e.eventType === eventType);
  }

  async getAllEvents(): Promise<DomainEvent[]> {
    return [...this.events];
  }

  async getEventsSince(timestamp: Date): Promise<DomainEvent[]> {
    return this.events.filter(e => e.occurredAt >= timestamp);
  }

  clear(): void {
    this.events = [];
  }

  get count(): number {
    return this.events.length;
  }
}

export class EventStore {
  private static instance: EventStore;
  private repository: EventStoreRepository;

  private constructor(repository: EventStoreRepository) {
    this.repository = repository;
  }

  static initialize(repository: EventStoreRepository): EventStore {
    if (!EventStore.instance) {
      EventStore.instance = new EventStore(repository);
    }
    return EventStore.instance;
  }

  static getInstance(): EventStore {
    if (!EventStore.instance) {
      EventStore.instance = new EventStore(new InMemoryEventStore());
    }
    return EventStore.instance;
  }

  async save(event: DomainEvent): Promise<void> {
    await this.repository.append(event);
  }

  async replay(aggregateId: string): Promise<DomainEvent[]> {
    return this.repository.getEvents(aggregateId);
  }

  async getEventsByType(eventType: string): Promise<DomainEvent[]> {
    return this.repository.getEventsByType(eventType);
  }

  async getAllEvents(): Promise<DomainEvent[]> {
    return this.repository.getAllEvents();
  }

  async getEventsSince(timestamp: Date): Promise<DomainEvent[]> {
    return this.repository.getEventsSince(timestamp);
  }
}
