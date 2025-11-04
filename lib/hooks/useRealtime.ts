/**
 * useRealtime Hook
 * React hook for SSE connection and real-time event subscription
 */

'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { RealtimeEvent, RealtimeEventType } from '@/lib/realtime/event-emitter';

export interface RealtimeConnectionStatus {
  connected: boolean;
  reconnecting: boolean;
  error: string | null;
}

export interface UseRealtimeOptions {
  eventTypes?: RealtimeEventType[];
  onEvent?: (event: RealtimeEvent) => void;
  autoConnect?: boolean;
  reconnectDelay?: number;
  maxReconnectAttempts?: number;
}

export function useRealtime(options: UseRealtimeOptions = {}) {
  const {
    eventTypes,
    onEvent,
    autoConnect = true,
    reconnectDelay = 1000,
    maxReconnectAttempts = 5,
  } = options;

  const [status, setStatus] = useState<RealtimeConnectionStatus>({
    connected: false,
    reconnecting: false,
    error: null,
  });

  const [events, setEvents] = useState<RealtimeEvent[]>([]);
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Connect to SSE endpoint
  const connect = useCallback(() => {
    // Close existing connection
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    try {
      const eventSource = new EventSource('/api/realtime/events');
      eventSourceRef.current = eventSource;

      // Connection opened
      eventSource.addEventListener('connected', (e) => {
        console.log('SSE connected:', e.data);
        setStatus({
          connected: true,
          reconnecting: false,
          error: null,
        });
        reconnectAttemptsRef.current = 0;
      });

      // Heartbeat
      eventSource.addEventListener('heartbeat', () => {
        // Connection is alive
      });

      // Listen for specific event types
      if (eventTypes && eventTypes.length > 0) {
        eventTypes.forEach((eventType) => {
          eventSource.addEventListener(eventType, (e) => {
            try {
              const payload = JSON.parse(e.data);
              const event: RealtimeEvent = {
                type: eventType,
                payload,
                timestamp: new Date().toISOString(),
                tenantId: payload.tenantId || '',
              };

              setEvents((prev) => [event, ...prev.slice(0, 99)]); // Keep last 100 events
              onEvent?.(event);
            } catch (error) {
              console.error('Error parsing SSE event:', error);
            }
          });
        });
      } else {
        // Listen to all event types
        Object.values(RealtimeEventType).forEach((eventType) => {
          eventSource.addEventListener(eventType, (e) => {
            try {
              const payload = JSON.parse(e.data);
              const event: RealtimeEvent = {
                type: eventType,
                payload,
                timestamp: new Date().toISOString(),
                tenantId: payload.tenantId || '',
              };

              setEvents((prev) => [event, ...prev.slice(0, 99)]);
              onEvent?.(event);
            } catch (error) {
              console.error('Error parsing SSE event:', error);
            }
          });
        });
      }

      // Error handler
      eventSource.onerror = (error) => {
        console.error('SSE error:', error);
        eventSource.close();

        setStatus({
          connected: false,
          reconnecting: reconnectAttemptsRef.current < maxReconnectAttempts,
          error: 'Connection error',
        });

        // Attempt reconnection with exponential backoff
        if (reconnectAttemptsRef.current < maxReconnectAttempts) {
          const delay = reconnectDelay * Math.pow(2, reconnectAttemptsRef.current);
          reconnectAttemptsRef.current++;

          console.log(
            `Reconnecting in ${delay}ms (attempt ${reconnectAttemptsRef.current}/${maxReconnectAttempts})`
          );

          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, delay);
        } else {
          setStatus((prev) => ({
            ...prev,
            reconnecting: false,
            error: 'Max reconnection attempts reached',
          }));
        }
      };
    } catch (error) {
      console.error('Error creating EventSource:', error);
      setStatus({
        connected: false,
        reconnecting: false,
        error: 'Failed to create connection',
      });
    }
  }, [eventTypes, onEvent, reconnectDelay, maxReconnectAttempts]);

  // Disconnect
  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    setStatus({
      connected: false,
      reconnecting: false,
      error: null,
    });
  }, []);

  // Clear events
  const clearEvents = useCallback(() => {
    setEvents([]);
  }, []);

  // Auto-connect on mount
  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [autoConnect, connect, disconnect]);

  return {
    status,
    events,
    connect,
    disconnect,
    clearEvents,
  };
}
