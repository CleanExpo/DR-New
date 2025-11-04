/**
 * React hook for real-time updates via SSE
 */

import { useEffect, useState, useRef, useCallback } from 'react';
import { useSession } from 'next-auth/react';

export interface RealtimeUpdate {
  event: string;
  data: any;
  timestamp: Date;
}

interface UseRealtimeUpdatesOptions {
  events?: string[];
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
}

export function useRealtimeUpdates(options: UseRealtimeUpdatesOptions = {}) {
  const { data: session } = useSession();
  const [updates, setUpdates] = useState<RealtimeUpdate[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<Error | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);

  // Clear updates
  const clearUpdates = useCallback(() => {
    setUpdates([]);
  }, []);

  // Reconnect logic with exponential backoff
  const reconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    const delay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 30000);
    reconnectAttemptsRef.current++;

    console.log(`Reconnecting SSE in ${delay}ms (attempt ${reconnectAttemptsRef.current})`);

    reconnectTimeoutRef.current = setTimeout(() => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      connect();
    }, delay);
  }, []);

  // Connect to SSE
  const connect = useCallback(() => {
    if (!session?.user) {
      console.log('No session, skipping SSE connection');
      return;
    }

    try {
      const eventSource = new EventSource('/api/realtime/subscribe');
      eventSourceRef.current = eventSource;

      eventSource.addEventListener('open', () => {
        console.log('SSE connected');
        setIsConnected(true);
        setConnectionError(null);
        reconnectAttemptsRef.current = 0;
        options.onConnect?.();
      });

      eventSource.addEventListener('connected', (e) => {
        console.log('SSE connection confirmed:', JSON.parse(e.data));
      });

      eventSource.addEventListener('heartbeat', () => {
        // Keep-alive signal received
      });

      // Handle specific events if provided
      const eventsToListen = options.events || [
        'JOB_CREATED',
        'JOB_ASSIGNED',
        'JOB_STATUS_CHANGED',
        'PAYMENT_RECEIVED',
        'EMERGENCY_JOB',
        'NOTIFICATION',
        'METRICS_UPDATE',
      ];

      eventsToListen.forEach((event) => {
        eventSource.addEventListener(event, (e) => {
          try {
            const data = JSON.parse(e.data);
            const update: RealtimeUpdate = {
              event,
              data,
              timestamp: new Date(),
            };
            setUpdates((prev) => [...prev.slice(-99), update]); // Keep last 100 updates
          } catch (err) {
            console.error(`Error parsing ${event} data:`, err);
          }
        });
      });

      eventSource.addEventListener('error', (e) => {
        console.error('SSE error:', e);
        setIsConnected(false);

        if (eventSource.readyState === EventSource.CLOSED) {
          const error = new Error('SSE connection closed');
          setConnectionError(error);
          options.onError?.(error);
          reconnect();
        } else if (eventSource.readyState === EventSource.CONNECTING) {
          console.log('SSE reconnecting...');
        }

        options.onDisconnect?.();
      });
    } catch (error) {
      console.error('Failed to create SSE connection:', error);
      setConnectionError(error as Error);
      options.onError?.(error as Error);
      reconnect();
    }
  }, [session, options.events, reconnect]);

  // Disconnect from SSE
  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    setIsConnected(false);
    reconnectAttemptsRef.current = 0;
  }, []);

  // Setup connection on mount/session change
  useEffect(() => {
    if (session?.user) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [session]);

  return {
    updates,
    isConnected,
    connectionError,
    clearUpdates,
    reconnect: () => {
      disconnect();
      connect();
    },
  };
}