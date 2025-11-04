/**
 * Real-time Event Emitter
 * Server-side singleton for managing real-time events across the CRM
 */

export enum RealtimeEventType {
  JOB_CREATED = 'JOB_CREATED',
  JOB_UPDATED = 'JOB_UPDATED',
  JOB_STATUS_CHANGED = 'JOB_STATUS_CHANGED',
  CONTRACTOR_ASSIGNED = 'CONTRACTOR_ASSIGNED',
  SCHEDULE_UPDATED = 'SCHEDULE_UPDATED',
  PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
  NOTIFICATION = 'NOTIFICATION',
}

export interface RealtimeEventPayload {
  JOB_CREATED: {
    jobId: string;
    jobNumber: string;
    tenantId: string;
    customerId: string;
    serviceType: string;
    priority: string;
  };
  JOB_UPDATED: {
    jobId: string;
    jobNumber: string;
    tenantId: string;
    changes: Record<string, any>;
  };
  JOB_STATUS_CHANGED: {
    jobId: string;
    jobNumber: string;
    tenantId: string;
    oldStatus: string;
    newStatus: string;
  };
  CONTRACTOR_ASSIGNED: {
    jobId: string;
    jobNumber: string;
    contractorId: string;
    contractorName: string;
    tenantId: string;
  };
  SCHEDULE_UPDATED: {
    appointmentId: string;
    jobId: string;
    tenantId: string;
    technicianId: string;
    scheduledDate: string;
  };
  PAYMENT_RECEIVED: {
    invoiceId: string;
    invoiceNumber: string;
    amount: number;
    tenantId: string;
    contractorId?: string;
  };
  NOTIFICATION: {
    notificationId: string;
    userId: string;
    tenantId: string;
    title: string;
    message: string;
    type: string;
  };
}

export interface RealtimeEvent<T extends RealtimeEventType = RealtimeEventType> {
  type: T;
  payload: RealtimeEventPayload[T];
  timestamp: string;
  tenantId: string;
}

export type EventListener = (event: RealtimeEvent) => void;

/**
 * Real-time Event Emitter Singleton
 * Manages event subscriptions and emissions with tenant isolation
 */
class RealtimeEventEmitter {
  private static instance: RealtimeEventEmitter;
  private listeners: Map<string, Set<EventListener>> = new Map();
  private tenantListeners: Map<string, Set<EventListener>> = new Map();

  private constructor() {}

  static getInstance(): RealtimeEventEmitter {
    if (!RealtimeEventEmitter.instance) {
      RealtimeEventEmitter.instance = new RealtimeEventEmitter();
    }
    return RealtimeEventEmitter.instance;
  }

  /**
   * Subscribe to events for a specific user
   */
  subscribe(userId: string, listener: EventListener): void {
    if (!this.listeners.has(userId)) {
      this.listeners.set(userId, new Set());
    }
    this.listeners.get(userId)!.add(listener);
  }

  /**
   * Unsubscribe from events
   */
  unsubscribe(userId: string, listener: EventListener): void {
    const userListeners = this.listeners.get(userId);
    if (userListeners) {
      userListeners.delete(listener);
      if (userListeners.size === 0) {
        this.listeners.delete(userId);
      }
    }
  }

  /**
   * Subscribe to all events for a tenant
   */
  subscribeTenant(tenantId: string, listener: EventListener): void {
    if (!this.tenantListeners.has(tenantId)) {
      this.tenantListeners.set(tenantId, new Set());
    }
    this.tenantListeners.get(tenantId)!.add(listener);
  }

  /**
   * Unsubscribe from tenant events
   */
  unsubscribeTenant(tenantId: string, listener: EventListener): void {
    const listeners = this.tenantListeners.get(tenantId);
    if (listeners) {
      listeners.delete(listener);
      if (listeners.size === 0) {
        this.tenantListeners.delete(tenantId);
      }
    }
  }

  /**
   * Emit event to specific users
   */
  emitToUsers<T extends RealtimeEventType>(
    type: T,
    payload: RealtimeEventPayload[T],
    tenantId: string,
    targetUserIds: string[]
  ): void {
    const event: RealtimeEvent<T> = {
      type,
      payload,
      timestamp: new Date().toISOString(),
      tenantId,
    };

    targetUserIds.forEach((userId) => {
      const userListeners = this.listeners.get(userId);
      if (userListeners) {
        userListeners.forEach((listener) => listener(event));
      }
    });
  }

  /**
   * Broadcast event to all users in a tenant
   */
  broadcastToTenant<T extends RealtimeEventType>(
    type: T,
    payload: RealtimeEventPayload[T],
    tenantId: string
  ): void {
    const event: RealtimeEvent<T> = {
      type,
      payload,
      timestamp: new Date().toISOString(),
      tenantId,
    };

    // Send to tenant-wide listeners
    const tenantListenerSet = this.tenantListeners.get(tenantId);
    if (tenantListenerSet) {
      tenantListenerSet.forEach((listener) => listener(event));
    }

    // Send to all user listeners (they will filter by tenant if needed)
    this.listeners.forEach((userListeners) => {
      userListeners.forEach((listener) => listener(event));
    });
  }

  /**
   * Get active connection count
   */
  getConnectionCount(): number {
    return this.listeners.size;
  }

  /**
   * Get active tenant connection count
   */
  getTenantConnectionCount(tenantId: string): number {
    return this.tenantListeners.get(tenantId)?.size || 0;
  }
}

export const eventEmitter = RealtimeEventEmitter.getInstance();
