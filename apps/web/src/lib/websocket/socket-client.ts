'use client';

/**
 * Socket.io Client Wrapper
 *
 * Provides type-safe Socket.io client with auto-reconnection,
 * event subscription helpers, and connection state management
 *
 * Usage:
 * ```tsx
 * const socket = SocketClient.getInstance();
 *
 * // Connect with authentication
 * socket.connect({
 *   token: userToken,
 *   userId: userId,
 *   userName: userName,
 * });
 *
 * // Listen to events
 * socket.on('message_received', (message) => {
 *   console.log('New message:', message);
 * });
 *
 * // Emit events
 * socket.emit('send_message', {
 *   roomId: 'room123',
 *   content: 'Hello!',
 * });
 * ```
 */

import { io, Socket as IOSocket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from './events';

type SocketType = IOSocket<ServerToClientEvents, ClientToServerEvents>;

interface ConnectionOptions {
  token: string;
  userId: string;
  userName: string;
  userRole?: string;
  email?: string;
}

interface ConnectionState {
  connected: boolean;
  connecting: boolean;
  error: Error | null;
  lastError?: string;
}

class SocketClientManager {
  private static instance: SocketClientManager | null = null;
  private socket: SocketType | null = null;
  private connectionState: ConnectionState = {
    connected: false,
    connecting: false,
    error: null,
  };
  private listeners = new Map<string, Set<Function>>();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  private constructor() {}

  /**
   * Get singleton instance of Socket client
   */
  static getInstance(): SocketClientManager {
    if (!this.instance) {
      this.instance = new SocketClientManager();
    }
    return this.instance;
  }

  /**
   * Connect to Socket.io server with authentication
   */
  connect(options: ConnectionOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        if (this.socket?.connected) {
          resolve();
          return;
        }

        this.connectionState.connecting = true;

        // Initialize Socket.io client
        this.socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || '/', {
          path: '/socket.io',
          reconnection: true,
          reconnectionDelay: this.reconnectDelay,
          reconnectionDelayMax: 5000,
          reconnectionAttempts: this.maxReconnectAttempts,
          transports: ['websocket', 'polling'],
          auth: {
            token: options.token,
            userId: options.userId,
            userName: options.userName,
            userRole: options.userRole,
            email: options.email,
          },
        });

        // Connection success
        this.socket.on('connect', () => {
          this.connectionState.connected = true;
          this.connectionState.connecting = false;
          this.connectionState.error = null;
          this.reconnectAttempts = 0;

          console.log('[Socket] Connected', {
            socketId: this.socket?.id,
            userId: options.userId,
          });

          this.emitConnectionStateChange();
          resolve();
        });

        // Connection error
        this.socket.on('connect_error', (error: any) => {
          this.connectionState.error = error;
          this.connectionState.lastError = error.message;
          console.error('[Socket] Connection error:', error.message);
          this.emitConnectionStateChange();

          if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            reject(error);
          }
        });

        // Disconnection
        this.socket.on('disconnect', (reason) => {
          this.connectionState.connected = false;
          console.log('[Socket] Disconnected:', reason);
          this.emitConnectionStateChange();
        });

        // Reconnection attempt (manager-level events)
        (this.socket.io as any).on('reconnect_attempt', () => {
          this.reconnectAttempts++;
          console.log(`[Socket] Reconnection attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts}`);
        });

        // Reconnection success (manager-level events)
        (this.socket.io as any).on('reconnect', () => {
          this.reconnectAttempts = 0;
          console.log('[Socket] Reconnected');
        });
      } catch (error: any) {
        this.connectionState.error = error;
        this.connectionState.lastError = error?.message;
        reject(error);
      }
    });
  }

  /**
   * Disconnect from server
   */
  disconnect(): Promise<void> {
    return new Promise((resolve) => {
      if (!this.socket) {
        resolve();
        return;
      }

      this.socket.disconnect();
      this.connectionState.connected = false;
      this.connectionState.connecting = false;
      this.emitConnectionStateChange();

      // Clear listeners
      this.listeners.clear();

      resolve();
    });
  }

  /**
   * Get current connection state
   */
  getConnectionState(): ConnectionState {
    return { ...this.connectionState };
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.connectionState.connected;
  }

  /**
   * Get socket ID
   */
  getSocketId(): string | undefined {
    return this.socket?.id;
  }

  /**
   * Subscribe to server events with type safety
   */
  on<K extends keyof ServerToClientEvents>(
    event: K,
    callback: (data: Parameters<ServerToClientEvents[K]>[0]) => void
  ): () => void {
    if (!this.socket) {
      console.warn(`[Socket] Cannot subscribe to ${event}: socket not initialized`);
      return () => {};
    }

    this.socket.on(event as any, callback as any);

    // Track listener for cleanup
    if (!this.listeners.has(event as string)) {
      this.listeners.set(event as string, new Set());
    }
    this.listeners.get(event as string)!.add(callback);

    // Return unsubscribe function
    return () => {
      this.socket?.off(event as any, callback as any);
      this.listeners.get(event as string)?.delete(callback);
    };
  }

  /**
   * Subscribe to event once
   */
  once<K extends keyof ServerToClientEvents>(
    event: K,
    callback: (data: Parameters<ServerToClientEvents[K]>[0]) => void
  ): () => void {
    if (!this.socket) {
      return () => {};
    }

    this.socket.once(event as any, callback as any);
    return () => {
      this.socket?.off(event as any, callback as any);
    };
  }

  /**
   * Emit event to server with type safety
   */
  emit<K extends keyof ClientToServerEvents>(
    event: K,
    data: Parameters<ClientToServerEvents[K]>[0],
    callback?: (error?: Error | null) => void
  ): void {
    if (!this.socket?.connected) {
      console.warn(`[Socket] Cannot emit ${event}: socket not connected`);
      callback?.(new Error('Socket not connected'));
      return;
    }

    this.socket.emit(event as any, data, callback);
  }

  /**
   * Subscribe to multiple channels
   */
  subscribeToChannels(channels: string[]): void {
    this.emit('subscribe' as any, channels);
  }

  /**
   * Unsubscribe from channels
   */
  unsubscribeFromChannels(channels: string[]): void {
    this.emit('unsubscribe' as any, channels);
  }

  /**
   * Send chat message
   */
  sendMessage(
    roomId: string,
    content: string,
    callback?: (error?: Error | null) => void
  ): void {
    this.emit('chat_message_send' as any, {
      roomId,
      content,
      type: 'text',
      metadata: {},
    }, callback);
  }

  /**
   * Start typing indicator
   */
  startTyping(roomId: string): void {
    this.emit('chat_typing' as any, {
      roomId,
      userName: '',
      isTyping: true,
    });
  }

  /**
   * Stop typing indicator
   */
  stopTyping(roomId: string): void {
    this.emit('chat_typing_stop' as any, roomId);
  }

  /**
   * Ping keep-alive
   */
  ping(callback?: () => void): void {
    this.emit('ping' as any, undefined, () => {
      callback?.();
    });
  }

  /**
   * Mark notification as read
   */
  markNotificationAsRead(notificationId: string, callback?: () => void): void {
    this.emit('notification_read' as any, notificationId, callback);
  }

  /**
   * Internal: Emit connection state change event
   */
  private emitConnectionStateChange(): void {
    const callbacks = this.listeners.get('_connection_state_changed') || new Set();
    callbacks.forEach((callback) => {
      callback(this.connectionState);
    });
  }

  /**
   * Listen to connection state changes
   */
  onConnectionStateChange(callback: (state: ConnectionState) => void): () => void {
    if (!this.listeners.has('_connection_state_changed')) {
      this.listeners.set('_connection_state_changed', new Set());
    }
    this.listeners.get('_connection_state_changed')!.add(callback);

    return () => {
      this.listeners.get('_connection_state_changed')?.delete(callback);
    };
  }

  /**
   * Clean up and disconnect
   */
  async cleanup(): Promise<void> {
    await this.disconnect();
    this.listeners.clear();
    this.reconnectAttempts = 0;
  }
}

/**
 * Export singleton instance
 */
export const socketClient = SocketClientManager.getInstance();

/**
 * For React hooks and components
 */
export { SocketClientManager };
