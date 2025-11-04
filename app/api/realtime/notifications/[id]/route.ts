/**
 * Individual Notification API Endpoint
 * DELETE: Delete notification
 * PATCH: Update notification
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
import { notificationService } from '@/lib/realtime/notification-service';

interface RouteContext {
  params: {
    id: string;
  };
}

/**
 * DELETE /api/realtime/notifications/:id
 * Delete a notification
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteContext
) {
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
    const notificationId = params.id;

    // Delete notification
    await notificationService.deleteNotification(
      notificationId,
      user.id,
      user.tenantId
    );

    return NextResponse.json({
      message: 'Notification deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting notification:', error);
    return NextResponse.json(
      { error: 'Failed to delete notification' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/realtime/notifications/:id
 * Mark notification as read
 */
export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
) {
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
    const notificationId = params.id;

    // Mark as read
    const notification = await notificationService.markAsRead(
      notificationId,
      user.id,
      user.tenantId
    );

    return NextResponse.json({
      notification,
      message: 'Notification marked as read',
    });
  } catch (error) {
    console.error('Error updating notification:', error);
    return NextResponse.json(
      { error: 'Failed to update notification' },
      { status: 500 }
    );
  }
}
