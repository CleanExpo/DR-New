// @ts-nocheck
/**
 * Real-time Event Emitter
 *
 * Emits events to WebSocket connections for real-time updates
 * Falls back to storing events if WebSocket is not available
 */

import type { RealtimeEvent } from './events';

// In-memory event queue for when WebSocket is not available
const eventQueue: RealtimeEvent[] = [];
const MAX_QUEUE_SIZE = 1000;

/**
 * Emit a real-time event
 * In production, this would connect to Socket.io server
 */
export async function emitEvent(event: RealtimeEvent): Promise<void> {
  try {
    // Log the event for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('[RealtimeEvent]', event.type, event);
    }

    // Add to queue (for later processing or SSE)
    eventQueue.push(event);

    // Trim queue if too large
    if (eventQueue.length > MAX_QUEUE_SIZE) {
      eventQueue.splice(0, eventQueue.length - MAX_QUEUE_SIZE);
    }

    // In a production environment with Socket.io:
    // const io = getSocketIOServer();
    // if (io) {
    //   io.emit(event.type, event);
    // }

  } catch (error) {
    console.error('[RealtimeEvent] Failed to emit event:', error);
  }
}

/**
 * Emit event to specific users
 */
export async function emitToUser(
  userId: string,
  event: RealtimeEvent
): Promise<void> {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('[RealtimeEvent] To user:', userId, event.type);
    }

    // In production with Socket.io:
    // const io = getSocketIOServer();
    // if (io) {
    //   io.to(`user:${userId}`).emit(event.type, event);
    // }

    // Add to queue with user context
    eventQueue.push({ ...event, targetUserId: userId } as RealtimeEvent);

  } catch (error) {
    console.error('[RealtimeEvent] Failed to emit to user:', error);
  }
}

/**
 * Emit event to specific room/channel
 */
export async function emitToRoom(
  room: string,
  event: RealtimeEvent
): Promise<void> {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('[RealtimeEvent] To room:', room, event.type);
    }

    // In production with Socket.io:
    // const io = getSocketIOServer();
    // if (io) {
    //   io.to(room).emit(event.type, event);
    // }

  } catch (error) {
    console.error('[RealtimeEvent] Failed to emit to room:', error);
  }
}

/**
 * Get recent events from queue
 * Useful for SSE or polling fallback
 */
export function getRecentEvents(limit: number = 50): RealtimeEvent[] {
  return eventQueue.slice(-limit);
}

/**
 * Clear event queue
 */
export function clearEventQueue(): void {
  eventQueue.length = 0;
}

export default {
  emitEvent,
  emitToUser,
  emitToRoom,
  getRecentEvents,
  clearEventQueue,
};
