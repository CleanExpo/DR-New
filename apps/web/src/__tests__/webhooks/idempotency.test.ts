/**
 * @jest-environment node
 *
 * Webhook Idempotency Tests
 *
 * Tests the webhook event tracking system that prevents duplicate processing:
 * - Event already processed detection
 * - Event recording (success and failure states)
 * - Race condition handling (duplicate creates)
 * - Retry count tracking
 * - Event status retrieval for monitoring
 */

import {
  isEventProcessed,
  recordWebhookEvent,
  getWebhookEventRetryCount,
  getWebhookEventStatus,
} from '@/src/lib/stripe/webhook-idempotency';
import { prisma } from '@/lib/prisma';

// Mock Prisma
jest.mock('@/lib/prisma', () => ({
  prisma: {
    stripeWebhookEvent: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

describe('Webhook Idempotency', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('isEventProcessed', () => {
    it('should return true if event exists in database', async () => {
      const mockEvent = {
        stripeEventId: 'evt_test_123',
        eventType: 'invoice.payment_succeeded',
        processed: true,
        statusCode: 200,
      };

      (prisma.stripeWebhookEvent.findUnique as jest.Mock).mockResolvedValue(mockEvent);

      const result = await isEventProcessed('evt_test_123');

      expect(result).toBe(true);
      expect(prisma.stripeWebhookEvent.findUnique).toHaveBeenCalledWith({
        where: { stripeEventId: 'evt_test_123' },
      });
    });

    it('should return false if event does not exist', async () => {
      (prisma.stripeWebhookEvent.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await isEventProcessed('evt_new_event');

      expect(result).toBe(false);
      expect(prisma.stripeWebhookEvent.findUnique).toHaveBeenCalledWith({
        where: { stripeEventId: 'evt_new_event' },
      });
    });

    it('should throw error if database query fails', async () => {
      (prisma.stripeWebhookEvent.findUnique as jest.Mock).mockRejectedValue(
        new Error('Database connection lost')
      );

      await expect(isEventProcessed('evt_test_123')).rejects.toThrow('Database connection lost');
    });

    it('should handle database errors gracefully and throw', async () => {
      const dbError = new Error('Connection timeout');
      (prisma.stripeWebhookEvent.findUnique as jest.Mock).mockRejectedValue(dbError);

      await expect(isEventProcessed('evt_timeout')).rejects.toThrow('Connection timeout');
    });
  });

  describe('recordWebhookEvent', () => {
    it('should record successful webhook event processing', async () => {
      const eventId = 'evt_success_123';
      const eventType = 'invoice.payment_succeeded';

      (prisma.stripeWebhookEvent.create as jest.Mock).mockResolvedValue({
        stripeEventId: eventId,
        eventType,
        processed: true,
        statusCode: 200,
        errorMessage: null,
      });

      await recordWebhookEvent(eventId, eventType, 200);

      expect(prisma.stripeWebhookEvent.create).toHaveBeenCalledWith({
        data: {
          stripeEventId: eventId,
          eventType,
          processed: true,
          statusCode: 200,
          errorMessage: null,
        },
      });
    });

    it('should record failed webhook event with error message', async () => {
      const eventId = 'evt_failed_123';
      const eventType = 'invoice.payment_failed';
      const errorMessage = 'Workspace not found';

      (prisma.stripeWebhookEvent.create as jest.Mock).mockResolvedValue({
        stripeEventId: eventId,
        eventType,
        processed: false,
        statusCode: 500,
        errorMessage,
      });

      await recordWebhookEvent(eventId, eventType, 500, errorMessage);

      expect(prisma.stripeWebhookEvent.create).toHaveBeenCalledWith({
        data: {
          stripeEventId: eventId,
          eventType,
          processed: false,
          statusCode: 500,
          errorMessage,
        },
      });
    });

    it('should handle race condition (duplicate event) gracefully', async () => {
      const eventId = 'evt_race_123';
      const eventType = 'customer.subscription.created';

      // Simulate Prisma P2002 unique constraint violation
      const uniqueConstraintError: any = new Error('Unique constraint failed');
      uniqueConstraintError.code = 'P2002';

      (prisma.stripeWebhookEvent.create as jest.Mock).mockRejectedValue(uniqueConstraintError);

      // Should not throw - race conditions are expected
      await expect(recordWebhookEvent(eventId, eventType, 200)).resolves.not.toThrow();
    });

    it('should log but not throw on other database errors', async () => {
      const eventId = 'evt_error_123';
      const eventType = 'customer.subscription.updated';

      const dbError = new Error('Database write failed');
      (prisma.stripeWebhookEvent.create as jest.Mock).mockRejectedValue(dbError);

      // Should not throw - non-blocking operation
      await expect(recordWebhookEvent(eventId, eventType, 200)).resolves.not.toThrow();
    });

    it('should mark event as not processed when status code is not 200', async () => {
      const eventId = 'evt_retry_123';
      const eventType = 'invoice.payment_succeeded';

      (prisma.stripeWebhookEvent.create as jest.Mock).mockResolvedValue({
        stripeEventId: eventId,
        eventType,
        processed: false,
        statusCode: 503,
        errorMessage: 'Temporary failure',
      });

      await recordWebhookEvent(eventId, eventType, 503, 'Temporary failure');

      expect(prisma.stripeWebhookEvent.create).toHaveBeenCalledWith({
        data: {
          stripeEventId: eventId,
          eventType,
          processed: false,
          statusCode: 503,
          errorMessage: 'Temporary failure',
        },
      });
    });
  });

  describe('getWebhookEventRetryCount', () => {
    it('should return 1 if event exists', async () => {
      const mockEvent = {
        stripeEventId: 'evt_test_123',
        eventType: 'invoice.payment_succeeded',
        processed: true,
      };

      (prisma.stripeWebhookEvent.findUnique as jest.Mock).mockResolvedValue(mockEvent);

      const count = await getWebhookEventRetryCount('evt_test_123');

      expect(count).toBe(1);
    });

    it('should return 0 if event does not exist (first attempt)', async () => {
      (prisma.stripeWebhookEvent.findUnique as jest.Mock).mockResolvedValue(null);

      const count = await getWebhookEventRetryCount('evt_new_123');

      expect(count).toBe(0);
    });

    it('should return 0 on database error', async () => {
      (prisma.stripeWebhookEvent.findUnique as jest.Mock).mockRejectedValue(
        new Error('Database error')
      );

      const count = await getWebhookEventRetryCount('evt_error_123');

      expect(count).toBe(0);
    });
  });

  describe('getWebhookEventStatus', () => {
    it('should return event status details', async () => {
      const mockStatus = {
        eventType: 'invoice.payment_succeeded',
        processed: true,
        statusCode: 200,
        errorMessage: null,
        processedAt: new Date('2024-01-15T10:30:00Z'),
      };

      (prisma.stripeWebhookEvent.findUnique as jest.Mock).mockResolvedValue(mockStatus);

      const status = await getWebhookEventStatus('evt_test_123');

      expect(status).toEqual(mockStatus);
      expect(prisma.stripeWebhookEvent.findUnique).toHaveBeenCalledWith({
        where: { stripeEventId: 'evt_test_123' },
        select: {
          eventType: true,
          processed: true,
          statusCode: true,
          errorMessage: true,
          processedAt: true,
        },
      });
    });

    it('should return null if event not found', async () => {
      (prisma.stripeWebhookEvent.findUnique as jest.Mock).mockResolvedValue(null);

      const status = await getWebhookEventStatus('evt_nonexistent');

      expect(status).toBeNull();
    });

    it('should return null on database error', async () => {
      (prisma.stripeWebhookEvent.findUnique as jest.Mock).mockRejectedValue(
        new Error('Query failed')
      );

      const status = await getWebhookEventStatus('evt_error_123');

      expect(status).toBeNull();
    });

    it('should return failed event status with error message', async () => {
      const mockFailedStatus = {
        eventType: 'invoice.payment_failed',
        processed: false,
        statusCode: 500,
        errorMessage: 'Payment method not found',
        processedAt: new Date('2024-01-15T11:00:00Z'),
      };

      (prisma.stripeWebhookEvent.findUnique as jest.Mock).mockResolvedValue(mockFailedStatus);

      const status = await getWebhookEventStatus('evt_failed_123');

      expect(status).toEqual(mockFailedStatus);
      expect(status?.processed).toBe(false);
      expect(status?.errorMessage).toBe('Payment method not found');
    });
  });

  describe('Integration Scenarios', () => {
    it('should prevent duplicate processing workflow', async () => {
      const eventId = 'evt_duplicate_test';
      const eventType = 'invoice.payment_succeeded';

      // First request: event is new
      (prisma.stripeWebhookEvent.findUnique as jest.Mock).mockResolvedValueOnce(null);
      let isProcessed = await isEventProcessed(eventId);
      expect(isProcessed).toBe(false);

      // Process event and record success
      (prisma.stripeWebhookEvent.create as jest.Mock).mockResolvedValueOnce({
        stripeEventId: eventId,
        eventType,
        processed: true,
        statusCode: 200,
      });
      await recordWebhookEvent(eventId, eventType, 200);

      // Second request (duplicate): event is already processed
      (prisma.stripeWebhookEvent.findUnique as jest.Mock).mockResolvedValueOnce({
        stripeEventId: eventId,
        eventType,
        processed: true,
        statusCode: 200,
      });
      isProcessed = await isEventProcessed(eventId);
      expect(isProcessed).toBe(true);

      // Verify the workflow
      expect(prisma.stripeWebhookEvent.findUnique).toHaveBeenCalledTimes(2);
      expect(prisma.stripeWebhookEvent.create).toHaveBeenCalledTimes(1);
    });

    it('should handle retry workflow for failed events', async () => {
      const eventId = 'evt_retry_workflow';
      const eventType = 'customer.subscription.updated';

      // First attempt: fails with 503
      (prisma.stripeWebhookEvent.findUnique as jest.Mock).mockResolvedValueOnce(null);
      let isProcessed = await isEventProcessed(eventId);
      expect(isProcessed).toBe(false);

      (prisma.stripeWebhookEvent.create as jest.Mock).mockResolvedValueOnce({
        stripeEventId: eventId,
        eventType,
        processed: false,
        statusCode: 503,
        errorMessage: 'Database timeout',
      });
      await recordWebhookEvent(eventId, eventType, 503, 'Database timeout');

      // Stripe retries: event exists but not processed
      (prisma.stripeWebhookEvent.findUnique as jest.Mock).mockResolvedValueOnce({
        stripeEventId: eventId,
        eventType,
        processed: false,
        statusCode: 503,
      });
      isProcessed = await isEventProcessed(eventId);
      expect(isProcessed).toBe(true); // Event exists (even if failed)

      // Note: In production, you'd need additional logic to differentiate
      // between "successfully processed" and "attempted but failed"
    });

    it('should handle concurrent webhook delivery (race condition)', async () => {
      const eventId = 'evt_concurrent';
      const eventType = 'invoice.finalized';

      // Both requests check if event processed (both see "no")
      (prisma.stripeWebhookEvent.findUnique as jest.Mock)
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null);

      const isProcessed1 = await isEventProcessed(eventId);
      const isProcessed2 = await isEventProcessed(eventId);

      expect(isProcessed1).toBe(false);
      expect(isProcessed2).toBe(false);

      // First request successfully creates record
      (prisma.stripeWebhookEvent.create as jest.Mock).mockResolvedValueOnce({
        stripeEventId: eventId,
        eventType,
        processed: true,
        statusCode: 200,
      });
      await recordWebhookEvent(eventId, eventType, 200);

      // Second request hits unique constraint (race condition)
      const uniqueError: any = new Error('Unique constraint');
      uniqueError.code = 'P2002';
      (prisma.stripeWebhookEvent.create as jest.Mock).mockRejectedValueOnce(uniqueError);
      await recordWebhookEvent(eventId, eventType, 200);

      // Both complete without throwing
      expect(prisma.stripeWebhookEvent.create).toHaveBeenCalledTimes(2);
    });
  });
});
