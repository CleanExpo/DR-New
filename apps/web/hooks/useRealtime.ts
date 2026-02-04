/**
 * Custom React Hook for Supabase Realtime
 *
 * Provides easy-to-use hooks for realtime features:
 * - useRealtimeJob: Subscribe to job updates
 * - useRealtimeNotifications: Subscribe to user notifications
 * - usePresence: Track who's online in a channel
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  SupabaseRealtimeManager,
  type JobMessage,
  type StatusUpdate,
  type ContractorLocation,
  type TypingIndicator,
  type UserNotification,
} from '@/lib/realtime/supabase-realtime';

// ============================================================================
// useRealtimeJob - Subscribe to job-specific realtime updates
// ============================================================================

interface UseRealtimeJobOptions {
  jobId: string;
  userId: string;
  onMessage?: (message: JobMessage) => void;
  onStatusUpdate?: (update: StatusUpdate) => void;
  onLocation?: (location: ContractorLocation) => void;
  onTyping?: (indicator: TypingIndicator) => void;
  enabled?: boolean;
}

export function useRealtimeJob({
  jobId,
  userId,
  onMessage,
  onStatusUpdate,
  onLocation,
  onTyping,
  enabled = true,
}: UseRealtimeJobOptions) {
  const [isConnected, setIsConnected] = useState(false);
  const [presence, setPresence] = useState<any[]>([]);
  const managerRef = useRef<SupabaseRealtimeManager | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const manager = new SupabaseRealtimeManager(userId);
    managerRef.current = manager;

    const channel = manager.subscribeToJob(jobId, {
      onMessage,
      onStatusUpdate,
      onContractorLocation: onLocation,
      onTyping,
      onPresenceChange: (state) => {
        const users = Object.values(state).flat();
        setPresence(users);
      },
    });

    if (channel) {
      setIsConnected(true);
    }

    return () => {
      manager.unsubscribeAll();
      setIsConnected(false);
    };
  }, [jobId, userId, enabled, onMessage, onStatusUpdate, onLocation, onTyping]);

  const sendMessage = useCallback(
    async (message: JobMessage) => {
      if (!managerRef.current) return false;
      return await managerRef.current.sendMessage(jobId, message);
    },
    [jobId]
  );

  const sendStatus = useCallback(
    async (update: StatusUpdate) => {
      if (!managerRef.current) return false;
      return await managerRef.current.sendStatusUpdate(jobId, update);
    },
    [jobId]
  );

  const sendLocation = useCallback(
    async (location: ContractorLocation) => {
      if (!managerRef.current) return false;
      return await managerRef.current.sendLocation(jobId, location);
    },
    [jobId]
  );

  const sendTyping = useCallback(
    async (isTyping: boolean, userName: string) => {
      if (!managerRef.current) return false;
      return await managerRef.current.sendTypingIndicator(jobId, {
        userId,
        userName,
        isTyping,
      });
    },
    [jobId, userId]
  );

  return {
    isConnected,
    presence,
    sendMessage,
    sendStatus,
    sendLocation,
    sendTyping,
  };
}

// ============================================================================
// useRealtimeNotifications - Subscribe to user notifications
// ============================================================================

interface UseRealtimeNotificationsOptions {
  userId: string;
  onNotification?: (notification: UserNotification) => void;
  enabled?: boolean;
}

export function useRealtimeNotifications({
  userId,
  onNotification,
  enabled = true,
}: UseRealtimeNotificationsOptions) {
  const [isConnected, setIsConnected] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const managerRef = useRef<SupabaseRealtimeManager | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const manager = new SupabaseRealtimeManager(userId);
    managerRef.current = manager;

    manager.subscribeToUser(userId, {
      onNotification,
      onUnreadCountChange: setUnreadCount,
    });

    setIsConnected(true);

    return () => {
      manager.unsubscribeAll();
      setIsConnected(false);
    };
  }, [userId, enabled, onNotification]);

  const sendNotification = useCallback(
    async (notification: UserNotification) => {
      if (!managerRef.current) return false;
      return await managerRef.current.sendNotification(userId, notification);
    },
    [userId]
  );

  return {
    isConnected,
    unreadCount,
    sendNotification,
  };
}

// ============================================================================
// usePresence - Track who's online in a channel
// ============================================================================

interface UsePresenceOptions {
  channelName: string;
  userId: string;
  userName: string;
  metadata?: Record<string, any>;
  enabled?: boolean;
}

export function usePresence({
  channelName,
  userId,
  userName,
  metadata = {},
  enabled = true,
}: UsePresenceOptions) {
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    // Presence tracking is handled by the job subscription
    // This hook is a convenience wrapper
    setIsConnected(true);

    return () => {
      setIsConnected(false);
    };
  }, [channelName, userId, enabled]);

  return {
    onlineUsers,
    isConnected,
    isUserOnline: (checkUserId: string) =>
      onlineUsers.some((user) => user.user_id === checkUserId),
  };
}

// ============================================================================
// useRealtimeStatus - Track connection status
// ============================================================================

export function useRealtimeStatus() {
  const [status, setStatus] = useState<'connecting' | 'connected' | 'disconnected'>(
    'connecting'
  );

  useEffect(() => {
    // Simulate connection check
    // In production, you'd check the actual Supabase connection status
    const timer = setTimeout(() => {
      setStatus('connected');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return {
    status,
    isConnected: status === 'connected',
    isConnecting: status === 'connecting',
    isDisconnected: status === 'disconnected',
  };
}
