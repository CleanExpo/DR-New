/**
 * Enquiry Notification Job - Infrastructure Layer
 * Background job for enquiry-related notifications
 */

import { Job, JobProcessor } from './JobQueue';
import { EventDispatcher } from '@/lib/domain/events/EventDispatcher';
import { EnquiryCreatedEvent, EnquiryRespondedEvent } from '@/lib/domain/events/DomainEvent';

export interface EnquiryNotificationData {
  enquiryId: string;
  eventType: 'created' | 'responded' | 'assigned' | 'escalated';
  notifyAdmin: boolean;
  notifyCustomer: boolean;
  additionalRecipients?: string[];
}

export class EnquiryNotificationJobProcessor implements JobProcessor<EnquiryNotificationData> {
  async process(job: Job<EnquiryNotificationData>): Promise<void> {
    const { enquiryId, eventType, notifyAdmin, notifyCustomer, additionalRecipients } = job.data;

    console.log(`Processing enquiry notification for ${enquiryId} (${eventType})`);

    if (notifyAdmin) {
      await this.notifyAdmin(enquiryId, eventType);
    }

    if (notifyCustomer) {
      await this.notifyCustomer(enquiryId, eventType);
    }

    if (additionalRecipients && additionalRecipients.length > 0) {
      await this.notifyAdditionalRecipients(enquiryId, eventType, additionalRecipients);
    }

    console.log(`Enquiry notification completed for ${enquiryId}`);
  }

  private async notifyAdmin(enquiryId: string, eventType: string): Promise<void> {
    // Send email to admin@disasterrecovery.com.au
    console.log(`Notifying admin about enquiry ${enquiryId} (${eventType})`);
    // Implementation: Queue email job or send directly
  }

  private async notifyCustomer(enquiryId: string, eventType: string): Promise<void> {
    // Send confirmation email to customer
    console.log(`Notifying customer about enquiry ${enquiryId} (${eventType})`);
    // Implementation: Queue email job or send directly
  }

  private async notifyAdditionalRecipients(
    enquiryId: string,
    eventType: string,
    recipients: string[]
  ): Promise<void> {
    console.log(`Notifying additional recipients about enquiry ${enquiryId}:`, recipients);
    // Implementation: Queue email jobs for each recipient
  }
}

// Event handler to trigger notification jobs
export function setupEnquiryNotificationHandlers(dispatcher: EventDispatcher, jobQueue: any): void {
  dispatcher.subscribe('EnquiryCreated', async (event: EnquiryCreatedEvent) => {
    await jobQueue.enqueue('enquiry-notification', {
      enquiryId: event.aggregateId,
      eventType: 'created',
      notifyAdmin: true,
      notifyCustomer: true,
    });
  });

  dispatcher.subscribe('EnquiryResponded', async (event: EnquiryRespondedEvent) => {
    await jobQueue.enqueue('enquiry-notification', {
      enquiryId: event.aggregateId,
      eventType: 'responded',
      notifyAdmin: false,
      notifyCustomer: true,
    });
  });
}
