/**
 * Supabase Realtime Manager
 *
 * Manages real-time communication channels for:
 * - Job-specific messages
 * - Status updates
 * - Contractor location tracking
 * - User notifications
 */

import { createClient, RealtimeChannel, RealtimePresenceState } from '@supabase/supabase-js';

// Supabase client (will be initialized with environment variables)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Message types
export interface JobMessage {
  id: string;
  jobId: string;
  senderId: string;
  senderName: string;
  senderRole: 'client' | 'contractor';
  message: string;
  timestamp: string;
  attachments?: string[];
  read: boolean;
}

export interface StatusUpdate {
  jobId: string;
  status: string;
  previousStatus: string;
  updatedBy: string;
  timestamp: string;
  message?: string;
}

export interface ContractorLocation {
  jobId: string;
  contractorId: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  estimatedArrival?: string;
}

export interface UserNotification {
  id: string;
  userId: string;
  type: 'message' | 'status_update' | 'payment' | 'review' | 'general';
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

// Typing indicator
export interface TypingIndicator {
  userId: string;
  userName: string;
  isTyping: boolean;
}

// Callbacks interface
export interface JobChannelCallbacks {
  onMessage?: (message: JobMessage) => void;
  onStatusUpdate?: (update: StatusUpdate) => void;
  onContractorLocation?: (location: ContractorLocation) => void;
  onTyping?: (indicator: TypingIndicator) => void;
  onPresenceChange?: (state: RealtimePresenceState) => void;
}

export interface UserChannelCallbacks {
  onNotification?: (notification: UserNotification) => void;
  onUnreadCountChange?: (count: number) => void;
}

/**
 * Supabase Realtime Manager Class
 */
export class SupabaseRealtimeManager {
  private channels: Map<string, RealtimeChannel> = new Map();
  private userId: string | null = null;

  constructor(userId?: string) {
    this.userId = userId || null;
  }

  /**
   * Set the current user ID
   */
  setUserId(userId: string) {
    this.userId = userId;
  }

  /**
   * Subscribe to a job channel
   */
  subscribeToJob(jobId: string, callbacks: JobChannelCallbacks): RealtimeChannel | null {
    if (!this.userId) {
      console.error('User ID not set. Call setUserId() first.');
      return null;
    }

    const channelName = `job:${jobId}`;

    // Remove existing channel if any
    this.unsubscribe(channelName);

    // Create new channel
    const channel = supabase.channel(channelName, {
      config: {
        broadcast: { ack: true },
        presence: { key: this.userId },
      },
    });

    // Listen for messages
    if (callbacks.onMessage) {
      channel.on('broadcast', { event: 'message' }, (payload) => {
        callbacks.onMessage!(payload.payload as JobMessage);
      });
    }

    // Listen for status updates
    if (callbacks.onStatusUpdate) {
      channel.on('broadcast', { event: 'status' }, (payload) => {
        callbacks.onStatusUpdate!(payload.payload as StatusUpdate);
      });
    }

    // Listen for contractor location
    if (callbacks.onContractorLocation) {
      channel.on('broadcast', { event: 'location' }, (payload) => {
        callbacks.onContractorLocation!(payload.payload as ContractorLocation);
      });
    }

    // Listen for typing indicators
    if (callbacks.onTyping) {
      channel.on('broadcast', { event: 'typing' }, (payload) => {
        callbacks.onTyping!(payload.payload as TypingIndicator);
      });
    }

    // Listen for presence changes
    if (callbacks.onPresenceChange) {
      channel.on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        callbacks.onPresenceChange!(state);
      });

      channel.on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('User joined:', key, newPresences);
      });

      channel.on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('User left:', key, leftPresences);
      });
    }

    // Subscribe to channel
    channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        console.log(`Subscribed to ${channelName}`);

        // Track presence if enabled
        if (callbacks.onPresenceChange && this.userId) {
          await channel.track({
            user_id: this.userId,
            online_at: new Date().toISOString(),
          });
        }
      } else if (status === 'CHANNEL_ERROR') {
        console.error(`Error subscribing to ${channelName}`);
      } else if (status === 'TIMED_OUT') {
        console.error(`Timeout subscribing to ${channelName}`);
      }
    });

    // Store channel
    this.channels.set(channelName, channel);

    return channel;
  }

  /**
   * Subscribe to user notification channel
   */
  subscribeToUser(userId: string, callbacks: UserChannelCallbacks): RealtimeChannel {
    const channelName = `user:${userId}`;

    // Remove existing channel if any
    this.unsubscribe(channelName);

    // Create new channel
    const channel = supabase.channel(channelName);

    // Listen for notifications
    if (callbacks.onNotification) {
      channel.on('broadcast', { event: 'notification' }, (payload) => {
        callbacks.onNotification!(payload.payload as UserNotification);
      });
    }

    // Listen for unread count changes
    if (callbacks.onUnreadCountChange) {
      channel.on('broadcast', { event: 'unread_count' }, (payload) => {
        callbacks.onUnreadCountChange!(payload.payload as number);
      });
    }

    // Subscribe to channel
    channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log(`Subscribed to ${channelName}`);
      }
    });

    // Store channel
    this.channels.set(channelName, channel);

    return channel;
  }

  /**
   * Send a message to a job channel
   */
  async sendMessage(jobId: string, message: JobMessage): Promise<boolean> {
    const channelName = `job:${jobId}`;
    const channel = this.channels.get(channelName);

    if (!channel) {
      console.error(`Not subscribed to ${channelName}`);
      return false;
    }

    try {
      await channel.send({
        type: 'broadcast',
        event: 'message',
        payload: message,
      });
      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      return false;
    }
  }

  /**
   * Send a status update to a job channel
   */
  async sendStatusUpdate(jobId: string, update: StatusUpdate): Promise<boolean> {
    const channelName = `job:${jobId}`;
    const channel = this.channels.get(channelName);

    if (!channel) {
      console.error(`Not subscribed to ${channelName}`);
      return false;
    }

    try {
      await channel.send({
        type: 'broadcast',
        event: 'status',
        payload: update,
      });
      return true;
    } catch (error) {
      console.error('Error sending status update:', error);
      return false;
    }
  }

  /**
   * Send contractor location update
   */
  async sendLocation(jobId: string, location: ContractorLocation): Promise<boolean> {
    const channelName = `job:${jobId}`;
    const channel = this.channels.get(channelName);

    if (!channel) {
      console.error(`Not subscribed to ${channelName}`);
      return false;
    }

    try {
      await channel.send({
        type: 'broadcast',
        event: 'location',
        payload: location,
      });
      return true;
    } catch (error) {
      console.error('Error sending location:', error);
      return false;
    }
  }

  /**
   * Send typing indicator
   */
  async sendTypingIndicator(jobId: string, indicator: TypingIndicator): Promise<boolean> {
    const channelName = `job:${jobId}`;
    const channel = this.channels.get(channelName);

    if (!channel) {
      console.error(`Not subscribed to ${channelName}`);
      return false;
    }

    try {
      await channel.send({
        type: 'broadcast',
        event: 'typing',
        payload: indicator,
      });
      return true;
    } catch (error) {
      console.error('Error sending typing indicator:', error);
      return false;
    }
  }

  /**
   * Send notification to a user
   */
  async sendNotification(userId: string, notification: UserNotification): Promise<boolean> {
    const channelName = `user:${userId}`;
    const channel = this.channels.get(channelName);

    if (!channel) {
      console.error(`Not subscribed to ${channelName}`);
      return false;
    }

    try {
      await channel.send({
        type: 'broadcast',
        event: 'notification',
        payload: notification,
      });
      return true;
    } catch (error) {
      console.error('Error sending notification:', error);
      return false;
    }
  }

  /**
   * Unsubscribe from a specific channel
   */
  async unsubscribe(channelName: string): Promise<void> {
    const channel = this.channels.get(channelName);
    if (channel) {
      await channel.unsubscribe();
      this.channels.delete(channelName);
      console.log(`Unsubscribed from ${channelName}`);
    }
  }

  /**
   * Unsubscribe from all channels
   */
  async unsubscribeAll(): Promise<void> {
    const unsubscribePromises = Array.from(this.channels.values()).map((channel) =>
      channel.unsubscribe()
    );
    await Promise.all(unsubscribePromises);
    this.channels.clear();
    console.log('Unsubscribed from all channels');
  }

  /**
   * Get list of active channels
   */
  getActiveChannels(): string[] {
    return Array.from(this.channels.keys());
  }

  /**
   * Check if subscribed to a channel
   */
  isSubscribed(channelName: string): boolean {
    return this.channels.has(channelName);
  }
}

// Export singleton instance
export const realtimeManager = new SupabaseRealtimeManager();
