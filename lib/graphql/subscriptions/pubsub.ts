import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';

/**
 * PubSub instance for GraphQL subscriptions
 * Uses Redis for distributed pub/sub in production
 */
class PubSubManager {
  private pubsub: RedisPubSub | null = null;
  private enabled: boolean = false;

  constructor() {
    this.initialize();
  }

  private initialize() {
    const redisUrl = process.env.REDIS_URL;

    if (redisUrl) {
      try {
        const options = {
          retryStrategy: (times: number) => {
            const delay = Math.min(times * 50, 2000);
            return delay;
          },
          maxRetriesPerRequest: 3,
        };

        this.pubsub = new RedisPubSub({
          publisher: new Redis(redisUrl, options),
          subscriber: new Redis(redisUrl, options),
        });

        this.enabled = true;
        console.log('[PubSub] Redis PubSub initialized');
      } catch (error) {
        console.error('[PubSub] Failed to initialize:', error);
        this.enabled = false;
      }
    } else {
      console.warn('[PubSub] No REDIS_URL provided, subscriptions disabled');
    }
  }

  /**
   * Publish event
   */
  async publish(triggerName: string, payload: any): Promise<void> {
    if (!this.enabled || !this.pubsub) {
      console.warn(`[PubSub] Cannot publish ${triggerName}, PubSub not enabled`);
      return;
    }

    try {
      await this.pubsub.publish(triggerName, payload);
      console.log(`[PubSub] Published ${triggerName}`);
    } catch (error) {
      console.error(`[PubSub] Failed to publish ${triggerName}:`, error);
    }
  }

  /**
   * Subscribe to events
   */
  asyncIterator<T>(triggers: string | string[]): AsyncIterator<T> {
    if (!this.enabled || !this.pubsub) {
      throw new Error('PubSub not enabled. Set REDIS_URL to enable subscriptions.');
    }

    return this.pubsub.asyncIterator<T>(triggers);
  }

  /**
   * Check if subscriptions are enabled
   */
  isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Close connections
   */
  async close(): Promise<void> {
    if (this.pubsub) {
      // RedisPubSub doesn't have a close method, close Redis clients manually
      console.log('[PubSub] Closing connections');
    }
  }
}

// Singleton instance
export const pubsubManager = new PubSubManager();

/**
 * Subscription event types
 */
export enum SubscriptionEvent {
  BOOKING_CREATED = 'BOOKING_CREATED',
  BOOKING_UPDATED = 'BOOKING_UPDATED',
  BOOKING_CANCELLED = 'BOOKING_CANCELLED',
  EMERGENCY_BOOKING_CREATED = 'EMERGENCY_BOOKING_CREATED',
  QUOTE_CREATED = 'QUOTE_CREATED',
  QUOTE_UPDATED = 'QUOTE_UPDATED',
  QUOTE_APPROVED = 'QUOTE_APPROVED',
  TECHNICIAN_ASSIGNED = 'TECHNICIAN_ASSIGNED',
  JOB_STATUS_CHANGED = 'JOB_STATUS_CHANGED',
}

/**
 * Helper function to publish booking updates
 */
export async function publishBookingUpdate(
  bookingId: string,
  booking: any,
  updateType: string,
  updatedFields: string[]
) {
  await pubsubManager.publish(`BOOKING_UPDATED_${bookingId}`, {
    bookingUpdated: {
      booking,
      updateType,
      updatedFields,
    },
  });

  // Also publish to general booking updates channel
  await pubsubManager.publish(SubscriptionEvent.BOOKING_UPDATED, {
    bookingUpdated: {
      booking,
      updateType,
      updatedFields,
    },
  });
}

/**
 * Helper function to publish emergency bookings
 */
export async function publishEmergencyBooking(booking: any) {
  await pubsubManager.publish(SubscriptionEvent.EMERGENCY_BOOKING_CREATED, {
    emergencyBookingCreated: booking,
  });
}

/**
 * Helper function to publish quote updates
 */
export async function publishQuoteUpdate(quoteId: string, quote: any) {
  await pubsubManager.publish(`QUOTE_UPDATED_${quoteId}`, {
    quoteUpdated: quote,
  });

  await pubsubManager.publish(SubscriptionEvent.QUOTE_UPDATED, {
    quoteUpdated: quote,
  });
}
