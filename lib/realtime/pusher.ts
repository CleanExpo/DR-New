/**
 * Pusher configuration for WebSocket real-time updates
 */

import Pusher from 'pusher';
import PusherClient from 'pusher-js';

// Server-side Pusher instance
export const pusherServer = new Pusher({
  appId: process.env.PUSHER_APP_ID || '',
  key: process.env.NEXT_PUBLIC_PUSHER_KEY || '',
  secret: process.env.PUSHER_SECRET || '',
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'ap4',
  useTLS: true,
});

// Client-side Pusher configuration
export const getPusherClient = () => {
  if (typeof window === 'undefined') {
    throw new Error('Pusher client can only be initialized on the client side');
  }

  return new PusherClient(
    process.env.NEXT_PUBLIC_PUSHER_KEY || '',
    {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'ap4',
      authEndpoint: '/api/pusher/auth',
      auth: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    }
  );
};

// Event types for Pusher channels
export enum PusherEvent {
  JOB_CREATED = 'job-created',
  JOB_UPDATED = 'job-updated',
  JOB_ASSIGNED = 'job-assigned',
  JOB_STATUS_CHANGED = 'job-status-changed',
  SCHEDULE_UPDATED = 'schedule-updated',
  INVOICE_CREATED = 'invoice-created',
  PAYMENT_RECEIVED = 'payment-received',
  EMERGENCY_JOB = 'emergency-job',
  NOTIFICATION = 'notification',
  METRICS_UPDATE = 'metrics-update',
  CONTRACTOR_STATUS_CHANGED = 'contractor-status-changed',
  SUBSCRIPTION_EXPIRING = 'subscription-expiring',
}

// Channel naming conventions
export const PusherChannels = {
  // Private user channel
  user: (userId: string) => `private-user-${userId}`,

  // Private tenant channel (for organization-wide updates)
  tenant: (tenantId: string) => `private-tenant-${tenantId}`,

  // Presence channel for active users
  presence: (tenantId: string) => `presence-tenant-${tenantId}`,

  // Job-specific channel
  job: (jobId: string) => `private-job-${jobId}`,

  // Admin dashboard channel
  dashboard: (tenantId: string) => `private-dashboard-${tenantId}`,
};

// Helper function to trigger events
export async function triggerPusherEvent(
  channel: string,
  event: PusherEvent,
  data: any
) {
  try {
    await pusherServer.trigger(channel, event, {
      ...data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error triggering Pusher event:', error);
  }
}

// Batch trigger for multiple channels
export async function triggerPusherBatch(
  channels: string[],
  event: PusherEvent,
  data: any
) {
  try {
    await pusherServer.trigger(channels, event, {
      ...data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error triggering batch Pusher event:', error);
  }
}