/**
 * Client API: Message Contractor
 *
 * POST /api/client/claims/[id]/message
 * Sends a message to the assigned contractor for a booking.
 * Creates a notification and stores the message.
 *
 * Required role: CLIENT (must own the booking)
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Verify client authentication
    const session = await getServerSession(authOptions);

    if (!session || !session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorised' },
        { status: 401 }
      );
    }

    const bookingId = params.id;

    // 2. Parse request body
    const body = await request.json();
    const { message, subject } = body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { error: 'Message must be under 2000 characters' },
        { status: 400 }
      );
    }

    // 3. Get booking and verify ownership
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        contractor: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        client: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Claim not found' },
        { status: 404 }
      );
    }

    if (booking.clientId !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorised - You do not own this claim' },
        { status: 403 }
      );
    }

    if (!booking.contractor) {
      return NextResponse.json(
        { error: 'No contractor assigned to this claim yet' },
        { status: 400 }
      );
    }

    // 4. Create activity record for the message
    await prisma.activity.create({
      data: {
        bookingId,
        type: 'NOTE',
        subject: subject || `Message from ${booking.client.name}`,
        description: message.trim(),
        performedById: session.user.id,
        contractorId: booking.contractorId!,
      },
    });

    // 5. Log the action
    await prisma.auditLog.create({
      data: {
        action: 'CLIENT_MESSAGE_SENT',
        entityType: 'Booking',
        entityId: bookingId,
        userId: session.user.id,
        details: `Client sent message to contractor regarding booking ${bookingId}`,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Message sent to contractor successfully.',
    });
  } catch (error) {
    console.error('Error sending message:', error);

    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
