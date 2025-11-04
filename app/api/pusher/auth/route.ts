/**
 * Pusher authentication endpoint
 * Authenticates users for private and presence channels
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { pusherServer } from '@/lib/realtime/pusher';

export async function POST(request: NextRequest) {
  try {
    // Get session
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || !session?.user?.tenantId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { socket_id, channel_name } = await request.json();

    if (!socket_id || !channel_name) {
      return NextResponse.json(
        { error: 'Missing socket_id or channel_name' },
        { status: 400 }
      );
    }

    const userId = session.user.id;
    const tenantId = session.user.tenantId;

    // Validate channel access
    if (!isAuthorizedForChannel(channel_name, userId, tenantId)) {
      return NextResponse.json(
        { error: 'Unauthorized for this channel' },
        { status: 403 }
      );
    }

    // Authenticate the channel
    let auth;

    if (channel_name.startsWith('presence-')) {
      // For presence channels, include user info
      auth = pusherServer.authorizeChannel(socket_id, channel_name, {
        user_id: userId,
        user_info: {
          id: userId,
          name: session.user.name || 'Unknown',
          email: session.user.email || '',
          role: session.user.role || 'user',
          tenantId,
        },
      });
    } else {
      // For private channels
      auth = pusherServer.authorizeChannel(socket_id, channel_name);
    }

    return NextResponse.json(auth);
  } catch (error) {
    console.error('Pusher auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

/**
 * Validate if user is authorized for the requested channel
 */
function isAuthorizedForChannel(
  channel: string,
  userId: string,
  tenantId: string
): boolean {
  // Private user channel
  if (channel === `private-user-${userId}`) {
    return true;
  }

  // Private tenant channel
  if (channel === `private-tenant-${tenantId}`) {
    return true;
  }

  // Presence tenant channel
  if (channel === `presence-tenant-${tenantId}`) {
    return true;
  }

  // Dashboard channel
  if (channel === `private-dashboard-${tenantId}`) {
    return true;
  }

  // Job-specific channels (check if user has access to the job)
  if (channel.startsWith('private-job-')) {
    // TODO: Validate user has access to this specific job
    return true;
  }

  return false;
}