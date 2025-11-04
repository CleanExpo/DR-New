/**
 * React hook for Pusher WebSocket integration
 */

import { useEffect, useState, useRef, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { getPusherClient, PusherChannels, PusherEvent } from '@/lib/realtime/pusher';
import type { Channel, PresenceChannel } from 'pusher-js';

interface UsePusherOptions {
  channelName?: string;
  events?: PusherEvent[];
  enabled?: boolean;
}

interface PusherState {
  isConnected: boolean;
  members?: Map<string, any>;
  error?: Error;
}

export function usePusher(options: UsePusherOptions = {}) {
  const { data: session } = useSession();
  const [state, setState] = useState<PusherState>({ isConnected: false });
  const [messages, setMessages] = useState<any[]>([]);

  const pusherRef = useRef<ReturnType<typeof getPusherClient> | null>(null);
  const channelRef = useRef<Channel | null>(null);

  const { channelName, events = Object.values(PusherEvent), enabled = true } = options;

  // Initialize Pusher client and channel
  useEffect(() => {
    if (!session?.user || !enabled) return;

    try {
      // Initialize Pusher client
      const pusher = getPusherClient();
      pusherRef.current = pusher;

      // Handle connection state changes
      pusher.connection.bind('state_change', ({ current }: { current: string }) => {
        setState(prev => ({ ...prev, isConnected: current === 'connected' }));
      });

      pusher.connection.bind('error', (error: Error) => {
        console.error('Pusher connection error:', error);
        setState(prev => ({ ...prev, error }));
      });

      // Determine channel to subscribe to
      const channel = channelName || PusherChannels.user(session.user.id);

      // Subscribe to channel
      if (channel.startsWith('presence-')) {
        const presenceChannel = pusher.subscribe(channel) as PresenceChannel;
        channelRef.current = presenceChannel;

        // Handle presence events
        presenceChannel.bind('pusher:subscription_succeeded', () => {
          const members = new Map();
          presenceChannel.members.each((member: any) => {
            members.set(member.id, member.info);
          });
          setState(prev => ({ ...prev, members }));
        });

        presenceChannel.bind('pusher:member_added', (member: any) => {
          setState(prev => {
            const newMembers = new Map(prev.members);
            newMembers.set(member.id, member.info);
            return { ...prev, members: newMembers };
          });
        });

        presenceChannel.bind('pusher:member_removed', (member: any) => {
          setState(prev => {
            const newMembers = new Map(prev.members);
            newMembers.delete(member.id);
            return { ...prev, members: newMembers };
          });
        });
      } else {
        channelRef.current = pusher.subscribe(channel);
      }

      // Bind to specified events
      events.forEach((event) => {
        channelRef.current?.bind(event, (data: any) => {
          setMessages(prev => [...prev.slice(-99), { event, data, timestamp: new Date() }]);
        });
      });

      // Cleanup
      return () => {
        if (channelRef.current) {
          events.forEach((event) => {
            channelRef.current?.unbind(event);
          });
          pusher.unsubscribe(channel);
        }
        pusher.disconnect();
      };
    } catch (error) {
      console.error('Failed to initialize Pusher:', error);
      setState(prev => ({ ...prev, error: error as Error }));
    }
  }, [session, channelName, enabled]);

  // Send message (trigger client event)
  const sendMessage = useCallback((event: string, data: any) => {
    if (channelRef.current && state.isConnected) {
      channelRef.current.trigger(event, data);
    }
  }, [state.isConnected]);

  // Clear messages
  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    isConnected: state.isConnected,
    members: state.members,
    messages,
    error: state.error,
    sendMessage,
    clearMessages,
  };
}

/**
 * Hook for job-specific real-time updates
 */
export function useJobUpdates(jobId?: string) {
  return usePusher({
    channelName: jobId ? PusherChannels.job(jobId) : undefined,
    events: [
      PusherEvent.JOB_UPDATED,
      PusherEvent.JOB_STATUS_CHANGED,
      PusherEvent.JOB_ASSIGNED,
    ],
    enabled: !!jobId,
  });
}

/**
 * Hook for dashboard metrics updates
 */
export function useDashboardMetrics() {
  const { data: session } = useSession();

  return usePusher({
    channelName: session?.user?.tenantId
      ? PusherChannels.dashboard(session.user.tenantId)
      : undefined,
    events: [PusherEvent.METRICS_UPDATE],
    enabled: !!session?.user?.tenantId,
  });
}

/**
 * Hook for tenant-wide updates
 */
export function useTenantUpdates() {
  const { data: session } = useSession();

  return usePusher({
    channelName: session?.user?.tenantId
      ? PusherChannels.tenant(session.user.tenantId)
      : undefined,
    events: [
      PusherEvent.JOB_CREATED,
      PusherEvent.EMERGENCY_JOB,
      PusherEvent.CONTRACTOR_STATUS_CHANGED,
    ],
    enabled: !!session?.user?.tenantId,
  });
}

/**
 * Hook for presence (who's online)
 */
export function usePresence() {
  const { data: session } = useSession();

  return usePusher({
    channelName: session?.user?.tenantId
      ? PusherChannels.presence(session.user.tenantId)
      : undefined,
    events: [],
    enabled: !!session?.user?.tenantId,
  });
}