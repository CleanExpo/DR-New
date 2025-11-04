/**
 * Notifications API Endpoint
 * GET: List user notifications
 * POST: Create notification
 * PATCH: Mark as read
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { authenticateRequest } from '@/lib/auth';
import {
  notificationService,
  NotificationType,
} from '@/lib/realtime/notification-service';

// Validation schemas
const createNotificationSchema = z.object({
  userId: z.string().optional(),
  title: z.string().min(1).max(200),
  message: z.string().min(1).max(1000),
  type: z.nativeEnum(NotificationType),
  relatedEntityId: z.string().optional(),
  relatedEntityType: z.string().optional(),
  actionUrl: z.string().optional(),
});

const markAsReadSchema = z.object({
  notificationIds: z.array(z.string()).optional(),
  markAll: z.boolean().optional(),
});

/**
 * GET /api/realtime/notifications
 * List user notifications
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.authenticated || !authResult.user) {
      return NextResponse.json(
        { error: 'Unauthorised' },
        { status: 401 }
      );
    }

    const { user } = authResult;
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const unreadOnly = searchParams.get('unreadOnly') === 'true';

    // Get notifications
    const notifications = await notificationService.getNotifications(
      user.id,
      user.tenantId,
      { limit, offset, unreadOnly }
    );

    // Get unread count
    const unreadCount = await notificationService.getUnreadCount(
      user.id,
      user.tenantId
    );

    return NextResponse.json({
      notifications,
      unreadCount,
      total: notifications.length,
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/realtime/notifications
 * Create notification (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.authenticated || !authResult.user) {
      return NextResponse.json(
        { error: 'Unauthorised' },
        { status: 401 }
      );
    }

    const { user } = authResult;

    // Parse and validate request body
    const body = await request.json();
    const validationResult = createNotificationSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Create notification
    const notification = await notificationService.createNotification({
      userId: data.userId || user.id,
      tenantId: user.tenantId,
      title: data.title,
      message: data.message,
      type: data.type,
      relatedEntityId: data.relatedEntityId,
      relatedEntityType: data.relatedEntityType,
      actionUrl: data.actionUrl,
    });

    return NextResponse.json({
      notification,
      message: 'Notification created successfully',
    });
  } catch (error) {
    console.error('Error creating notification:', error);
    return NextResponse.json(
      { error: 'Failed to create notification' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/realtime/notifications
 * Mark notifications as read
 */
export async function PATCH(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.authenticated || !authResult.user) {
      return NextResponse.json(
        { error: 'Unauthorised' },
        { status: 401 }
      );
    }

    const { user } = authResult;

    // Parse and validate request body
    const body = await request.json();
    const validationResult = markAsReadSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    if (data.markAll) {
      // Mark all as read
      const count = await notificationService.markAllAsRead(
        user.id,
        user.tenantId
      );

      return NextResponse.json({
        message: `Marked ${count} notifications as read`,
        count,
      });
    } else if (data.notificationIds && data.notificationIds.length > 0) {
      // Mark specific notifications as read
      const promises = data.notificationIds.map((id) =>
        notificationService.markAsRead(id, user.id, user.tenantId)
      );

      await Promise.all(promises);

      return NextResponse.json({
        message: `Marked ${data.notificationIds.length} notifications as read`,
        count: data.notificationIds.length,
      });
    } else {
      return NextResponse.json(
        { error: 'Must specify notificationIds or markAll' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error marking notifications as read:', error);
    return NextResponse.json(
      { error: 'Failed to mark notifications as read' },
      { status: 500 }
    );
  }
}
