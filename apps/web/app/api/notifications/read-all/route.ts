// @ts-nocheck
/**
 * POST /api/notifications/read-all
 *
 * Marks all notifications as read for the authenticated user.
 * Response: { success: boolean, message: string }
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { markNotificationsAsRead } from '@/lib/notifications';
import { handleUnexpectedError } from '@/lib/api-errors';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) return authResult.response;

    const { user } = authResult.context;

    // Mark all notifications as read for this user (no ids = all)
    await markNotificationsAsRead(user.id);

    return NextResponse.json({
      success: true,
      message: 'All notifications marked as read',
    });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    return handleUnexpectedError(error);
  }
}
