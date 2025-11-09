/**
 * Event Dispatcher - Domain Layer
 * Publish-subscribe pattern for domain events
 */

import { DomainEvent } from './DomainEvent';

export type EventHandler<T extends DomainEvent = DomainEvent> = (event: T) => void | Promise<void>;

export class EventDispatcher {
  private static instance: EventDispatcher;
  private handlers: Map<string, EventHandler[]> = new Map();

  private constructor() {}

  static getInstance(): EventDispatcher {
    if (!EventDispatcher.instance) {
      EventDispatcher.instance = new EventDispatcher();
    }
    return EventDispatcher.instance;
  }

  subscribe<T extends DomainEvent>(eventType: string, handler: EventHandler<T>): void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
    }
    this.handlers.get(eventType)!.push(handler as EventHandler);
  }

  unsubscribe<T extends DomainEvent>(eventType: string, handler: EventHandler<T>): void {
    const handlers = this.handlers.get(eventType);
    if (handlers) {
      const index = handlers.indexOf(handler as EventHandler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  async dispatch(event: DomainEvent): Promise<void> {
    const handlers = this.handlers.get(event.eventType) || [];

    // Execute handlers sequentially to maintain order
    for (const handler of handlers) {
      try {
        await handler(event);
      } catch (error) {
        console.error(`Error executing handler for ${event.eventType}:`, error);
        // Continue executing other handlers even if one fails
      }
    }
  }

  clear(): void {
    this.handlers.clear();
  }

  getHandlerCount(eventType: string): number {
    return this.handlers.get(eventType)?.length || 0;
  }
}
