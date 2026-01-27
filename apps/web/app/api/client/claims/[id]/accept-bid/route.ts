/**
 * Client API: Accept Contractor Bid
 *
 * POST /api/client/claims/[id]/accept-bid
 * Accepts a contractor bid on a booking, assigns the contractor,
 * rejects remaining bids, and updates booking status.
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
    const { matchId } = body;

    if (!matchId) {
      return NextResponse.json(
        { error: 'matchId is required' },
        { status: 400 }
      );
    }

    // 3. Get booking and verify ownership
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      select: {
        id: true,
        clientId: true,
        contractorId: true,
        status: true,
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

    // 4. Check booking is still pending
    if (booking.contractorId) {
      return NextResponse.json(
        { error: 'A contractor has already been assigned to this claim' },
        { status: 409 }
      );
    }

    if (booking.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'This claim is no longer accepting bids' },
        { status: 409 }
      );
    }

    // 5. Get the contractor match
    const match = await prisma.contractorMatch.findUnique({
      where: { id: matchId },
      include: {
        contractor: {
          select: {
            id: true,
            userId: true,
            businessName: true,
          },
        },
      },
    });

    if (!match) {
      return NextResponse.json(
        { error: 'Bid not found' },
        { status: 404 }
      );
    }

    if (match.serviceRequestId !== bookingId) {
      return NextResponse.json(
        { error: 'This bid does not belong to this claim' },
        { status: 400 }
      );
    }

    if (match.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'This bid is no longer available' },
        { status: 409 }
      );
    }

    // 6. Find the Contractor record linked to the same user
    const contractor = await prisma.contractor.findUnique({
      where: { userId: match.contractor.userId },
      select: { id: true },
    });

    if (!contractor) {
      return NextResponse.json(
        { error: 'Contractor profile not found' },
        { status: 404 }
      );
    }

    // 7. Execute transaction: accept bid, reject others, assign contractor
    await prisma.$transaction([
      // Accept the selected match
      prisma.contractorMatch.update({
        where: { id: matchId },
        data: { status: 'ACCEPTED' },
      }),

      // Reject all other pending matches for this booking
      prisma.contractorMatch.updateMany({
        where: {
          serviceRequestId: bookingId,
          id: { not: matchId },
          status: 'PENDING',
        },
        data: { status: 'REJECTED' },
      }),

      // Assign the contractor to the booking and update status
      prisma.booking.update({
        where: { id: bookingId },
        data: {
          contractorId: contractor.id,
          status: 'CONFIRMED',
          estimatedCostAUD: match.budget ? parseFloat(match.budget) : undefined,
        },
      }),

      // Log the action
      prisma.auditLog.create({
        data: {
          action: 'BID_ACCEPTED',
          entityType: 'Booking',
          entityId: bookingId,
          userId: session.user.id,
          resourceType: 'ContractorMatch',
          resourceId: matchId,
          details: `Client accepted bid from ${match.contractor.businessName}`,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Bid accepted successfully. Your contractor has been assigned.',
      booking: {
        id: bookingId,
        status: 'CONFIRMED',
        contractorId: contractor.id,
        contractorName: match.contractor.businessName,
      },
    });
  } catch (error) {
    console.error('Error accepting bid:', error);

    return NextResponse.json(
      { error: 'Failed to accept bid' },
      { status: 500 }
    );
  }
}
