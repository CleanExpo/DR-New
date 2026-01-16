'use client';

import React from 'react';

/**
 * Real-Time Analytics Stream Client
 *
 * Connects to Server-Sent Events (SSE) endpoint for real-time analytics updates
 * Handles connection management, reconnection, and data parsing
 *
 * Usage:
 * ```tsx
 * import { streamClient } from '@/lib/analytics/stream-client';
 *
 * // Start streaming
 * streamClient.start((metrics) => {
 *   console.log('New metrics:', metrics);
 * });
 *
 * // Stop streaming
 * streamClient.stop();
 * ```
 */

export interface RealtimeMetrics {
  timestamp: string;
  activeJobs: number;
  activeUsers: number;
  averageResponseTime: number;
  messagesPerMinute: number;
  errorRate: number;
  activeConnections: number;
  systemHealth: {
    database: 'healthy' | 'degraded' | 'unhealthy';
    redis: 'healthy' | 'degraded' | 'unhealthy';
    socketio: 'healthy' | 'degraded' | 'unhealthy';
  };
}

type MetricsCallback = (metrics: RealtimeMetrics) => void;

class AnalyticsStreamClient {
  private eventSource: EventSource | null = null;
  private isConnected = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private listeners = new Set<MetricsCallback>();
  private lastMessageTime = 0;
  private messageTimeoutId: NodeJS.Timeout | null = null;
  private messageTimeout = 15000; // 15 seconds

  /**
   * Start streaming real-time analytics
   */
  start(onMetrics: MetricsCallback): () => void {
    // Add callback
    this.listeners.add(onMetrics);

    // Connect if not already connected
    if (!this.isConnected) {
      this.connect();
    }

    // Return unsubscribe function
    return () => {
      this.listeners.delete(onMetrics);
      if (this.listeners.size === 0) {
        this.stop();
      }
    };
  }

  /**
   * Connect to SSE stream
   */
  private connect(): void {
    if (this.isConnected || this.eventSource) {
      return;
    }

    try {
      const url = '/api/analytics/realtime';
      this.eventSource = new EventSource(url, {
        withCredentials: true,
      });

      this.eventSource.addEventListener('message', (event) => {
        this.handleMessage(event.data);
      });

      this.eventSource.addEventListener('error', () => {
        this.handleError();
      });

      this.eventSource.addEventListener('open', () => {
        console.log('[Analytics] Stream connected');
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.resetMessageTimeout();
      });
    } catch (error) {
      console.error('[Analytics] Failed to create EventSource:', error);
      this.scheduleReconnect();
    }
  }

  /**
   * Handle incoming message
   */
  private handleMessage(data: string): void {
    try {
      this.resetMessageTimeout();
      const metrics: RealtimeMetrics = JSON.parse(data);

      // Validate metrics object
      if (!metrics.timestamp) {
        console.warn('[Analytics] Invalid metrics object received');
        return;
      }

      // Update last message time
      this.lastMessageTime = Date.now();

      // Notify all listeners
      this.listeners.forEach((callback) => {
        try {
          callback(metrics);
        } catch (error) {
          console.error('[Analytics] Error in metrics callback:', error);
        }
      });
    } catch (error) {
      console.error('[Analytics] Failed to parse metrics:', error);
    }
  }

  /**
   * Handle connection error
   */
  private handleError(): void {
    console.error('[Analytics] Stream error, attempting to reconnect');
    this.isConnected = false;
    this.closeStream();
    this.scheduleReconnect();
  }

  /**
   * Schedule reconnection with exponential backoff
   */
  private scheduleReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('[Analytics] Max reconnection attempts reached');
      this.notifyListenersOfDisconnect();
      return;
    }

    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts);
    console.log(`[Analytics] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts + 1})`);

    setTimeout(() => {
      this.reconnectAttempts++;
      this.connect();
    }, delay);
  }

  /**
   * Reset message timeout (for detecting stale connections)
   */
  private resetMessageTimeout(): void {
    if (this.messageTimeoutId) {
      clearTimeout(this.messageTimeoutId);
    }

    this.messageTimeoutId = setTimeout(() => {
      console.warn('[Analytics] No messages received for 15 seconds, reconnecting');
      this.handleError();
    }, this.messageTimeout);
  }

  /**
   * Close the event stream
   */
  private closeStream(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }

    if (this.messageTimeoutId) {
      clearTimeout(this.messageTimeoutId);
      this.messageTimeoutId = null;
    }

    this.isConnected = false;
  }

  /**
   * Notify listeners of disconnection
   */
  private notifyListenersOfDisconnect(): void {
    const disconnectMetrics: RealtimeMetrics = {
      timestamp: new Date().toISOString(),
      activeJobs: 0,
      activeUsers: 0,
      averageResponseTime: 0,
      messagesPerMinute: 0,
      errorRate: 0,
      activeConnections: 0,
      systemHealth: {
        database: 'unhealthy',
        redis: 'unhealthy',
        socketio: 'unhealthy',
      },
    };

    this.listeners.forEach((callback) => {
      try {
        callback(disconnectMetrics);
      } catch (error) {
        console.error('[Analytics] Error notifying listener of disconnect:', error);
      }
    });
  }

  /**
   * Stop streaming
   */
  stop(): void {
    console.log('[Analytics] Stopping stream');
    this.closeStream();
    this.listeners.clear();
    this.reconnectAttempts = 0;
  }

  /**
   * Check if connected
   */
  isConnectedNow(): boolean {
    return this.isConnected;
  }

  /**
   * Get connection status
   */
  getStatus(): {
    connected: boolean;
    listeners: number;
    lastMessageTime: number;
    reconnectAttempts: number;
  } {
    return {
      connected: this.isConnected,
      listeners: this.listeners.size,
      lastMessageTime: this.lastMessageTime,
      reconnectAttempts: this.reconnectAttempts,
    };
  }
}

/**
 * Export singleton instance
 */
export const streamClient = new AnalyticsStreamClient();

/**
 * React hook for using analytics stream in components
 */
export function useAnalyticsStream() {
  const [metrics, setMetrics] = React.useState<RealtimeMetrics | null>(null);
  const [isConnected, setIsConnected] = React.useState(false);
  const unsubscribeRef = React.useRef<(() => void) | null>(null);

  React.useEffect(() => {
    // Subscribe to stream
    unsubscribeRef.current = streamClient.start((newMetrics) => {
      setMetrics(newMetrics);
      setIsConnected(streamClient.isConnectedNow());
    });

    return () => {
      // Unsubscribe on unmount
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, []);

  return { metrics, isConnected };
}
