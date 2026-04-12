// @ts-nocheck
/**
 * POST /api/notifications/[notificationId]/read
 *
 * Marks a specific notification as read for the authenticated user.
 * Verifies the notification belongs to the session user before updating.
 * Response: { success: boolean, unreadCount: number }
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { getUnreadCount } from '@/lib/notifications';
import { handleUnexpectedError, ErrorCode } from '@/lib/api-errors';

export const dynamic = 'force-dynamic';

export async function POST(
  request: NextRequest,
  { params }: { params: { notificationId: string } }
) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) return authResult.response;

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);
    const { notificationId } = params;

    if (!notificationId) {
      return NextResponse.json(
        { error: ErrorCode.INVALID_INPUT, message: 'notificationId is required' },
        { status: 400 }
      );
    }

    // Verify the notification belongs to the authenticated user before marking read
    const notification = await db.notification.findFirst({
      where: { id: notificationId, userId: user.id },
    });

    if (!notification) {
      return NextResponse.json(
        { error: ErrorCode.RESOURCE_NOT_FOUND, message: 'Notification not found' },
        { status: 404 }
      );
    }

    // Mark the notification as read
    await db.notification.update({
      where: { id: notificationId },
      data: { read: true },
    });

    const unreadCount = await getUnreadCount(user.id);

    return NextResponse.json({
      success: true,
      message: 'Notification marked as read',
      unreadCount,
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return handleUnexpectedError(error);
  }
}
