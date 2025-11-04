/**
 * Server-Sent Events (SSE) Connection Manager
 * Manages active SSE connections and event streaming
 */

import { eventEmitter, RealtimeEvent, EventListener } from './event-emitter';

export interface SSEConnection {
  userId: string;
  tenantId: string;
  controller: ReadableStreamDefaultController;
  encoder: TextEncoder;
  heartbeatInterval: NodeJS.Timeout;
  listener: EventListener;
}

class SSEManager {
  private static instance: SSEManager;
  private connections: Map<string, SSEConnection> = new Map();

  private constructor() {}

  static getInstance(): SSEManager {
    if (!SSEManager.instance) {
      SSEManager.instance = new SSEManager();
    }
    return SSEManager.instance;
  }

  /**
   * Register a new SSE connection
   */
  registerConnection(
    userId: string,
    tenantId: string,
    controller: ReadableStreamDefaultController
  ): () => void {
    const encoder = new TextEncoder();

    // Send event helper
    const sendEvent = (event: string, data: any) => {
      try {
        const message = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
        controller.enqueue(encoder.encode(message));
      } catch (error) {
        console.error('Error sending SSE event:', error);
      }
    };

    // Send initial connection event
    sendEvent('connected', {
      message: 'SSE connected',
      userId,
      tenantId,
      timestamp: new Date().toISOString(),
    });

    // Create event listener that filters by tenant
    const listener: EventListener = (event: RealtimeEvent) => {
      // Only send events for the user's tenant
      if (event.tenantId === tenantId) {
        sendEvent(event.type, event.payload);
      }
    };

    // Subscribe to events
    eventEmitter.subscribe(userId, listener);

    // Setup heartbeat (keep-alive every 30 seconds)
    const heartbeatInterval = setInterval(() => {
      sendEvent('heartbeat', {
        timestamp: new Date().toISOString(),
      });
    }, 30000);

    // Store connection
    const connection: SSEConnection = {
      userId,
      tenantId,
      controller,
      encoder,
      heartbeatInterval,
      listener,
    };

    this.connections.set(userId, connection);

    // Return cleanup function
    return () => {
      this.closeConnection(userId);
    };
  }

  /**
   * Send event to a specific user
   */
  sendToUser(userId: string, event: string, data: any): void {
    const connection = this.connections.get(userId);
    if (connection) {
      try {
        const message = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
        connection.controller.enqueue(connection.encoder.encode(message));
      } catch (error) {
        console.error(`Error sending event to user ${userId}:`, error);
        this.closeConnection(userId);
      }
    }
  }

  /**
   * Broadcast event to all users in a tenant
   */
  broadcastToTenant(tenantId: string, event: string, data: any): void {
    this.connections.forEach((connection, userId) => {
      if (connection.tenantId === tenantId) {
        this.sendToUser(userId, event, data);
      }
    });
  }

  /**
   * Close a specific connection
   */
  closeConnection(userId: string): void {
    const connection = this.connections.get(userId);
    if (connection) {
      // Clear heartbeat
      clearInterval(connection.heartbeatInterval);

      // Unsubscribe from events
      eventEmitter.unsubscribe(userId, connection.listener);

      // Close controller
      try {
        connection.controller.close();
      } catch (error) {
        // Controller might already be closed
      }

      // Remove from connections
      this.connections.delete(userId);
    }
  }

  /**
   * Get active connection count
   */
  getConnectionCount(): number {
    return this.connections.size;
  }

  /**
   * Get active connections for a tenant
   */
  getTenantConnections(tenantId: string): number {
    return Array.from(this.connections.values()).filter(
      (conn) => conn.tenantId === tenantId
    ).length;
  }

  /**
   * Check if user is connected
   */
  isConnected(userId: string): boolean {
    return this.connections.has(userId);
  }

  /**
   * Get all active user IDs
   */
  getActiveUserIds(): string[] {
    return Array.from(this.connections.keys());
  }

  /**
   * Get all active user IDs for a tenant
   */
  getActiveTenantUserIds(tenantId: string): string[] {
    return Array.from(this.connections.entries())
      .filter(([_, conn]) => conn.tenantId === tenantId)
      .map(([userId]) => userId);
  }
}

export const sseManager = SSEManager.getInstance();
