/**
 * Contractor API: Submit and Manage Bids
 *
 * POST /api/contractor/bids
 * Submit a bid on an available job request
 *
 * GET /api/contractor/bids
 * Get contractor's submitted bids
 *
 * Required role: CONTRACTOR
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schema for bid submission
const submitBidSchema = z.object({
  matchId: z.string(),
  proposedBudget: z.number().positive('Budget must be greater than 0'),
  estimatedHours: z.number().positive('Hours must be greater than 0').optional(),
  startDate: z.string().datetime().optional(),
  message: z.string().max(1000, 'Message cannot exceed 1000 characters').optional(),
});

type BidSubmission = z.infer<typeof submitBidSchema>;

// POST: Submit a bid
export async function POST(request: NextRequest) {
  try {
    // 1. Verify contractor authentication
    const session = await getServerSession(authOptions);

    if (!session || !session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 2. Get contractor record
    const contractor = await prisma.contractor.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });

    if (!contractor) {
      return NextResponse.json(
        { error: 'Contractor profile not found' },
        { status: 404 }
      );
    }

    // 3. Parse and validate request body
    const body = await request.json();

    let validatedData: BidSubmission;
    try {
      validatedData = submitBidSchema.parse(body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            error: 'Invalid bid data',
            details: error.errors,
          },
          { status: 400 }
        );
      }
      throw error;
    }

    // 4. Get the ContractorMatch record
    const match = await prisma.contractorMatch.findUnique({
      where: { id: validatedData.matchId },
      include: {
        contractor: {
          select: { id: true },
        },
      },
    });

    if (!match) {
      return NextResponse.json(
        { error: 'Match not found' },
        { status: 404 }
      );
    }

    // 5. Verify contractor owns this match
    if (match.contractorId !== contractor.id) {
      return NextResponse.json(
        { error: 'Unauthorized - You do not own this match' },
        { status: 403 }
      );
    }

    // 6. Update ContractorMatch with bid details
    const updatedMatch = await prisma.contractorMatch.update({
      where: { id: validatedData.matchId },
      data: {
        status: 'ACCEPTED', // Mark as bid submitted
        budget: validatedData.proposedBudget.toString(),
        estimatedHours: validatedData.estimatedHours?.toString(),
        startDate: validatedData.startDate,
        contractorMessage: validatedData.message,
        updatedAt: new Date(),
      },
      include: {
        serviceRequest: {
          select: { id: true },
        },
      },
    });

    console.log('=== BID SUBMITTED ===');
    console.log('Contractor:', contractor.id);
    console.log('Match ID:', validatedData.matchId);
    console.log('Budget:', validatedData.proposedBudget);
    console.log('Hours:', validatedData.estimatedHours);

    // 7. Get booking and contractor info for event emission
    const contractorInfo = await prisma.contractor.findUnique({
      where: { id: contractor.id },
      select: { businessName: true },
    });

    const booking = await prisma.booking.findUnique({
      where: { id: updatedMatch.serviceRequest.id },
      select: { clientId: true },
    });

    // 8. Emit bid submitted event
    if (contractorInfo && booking) {
      try {
        const { emitBidSubmitted } = await import('@/lib/realtime/emit-handlers');
        await emitBidSubmitted(
          updatedMatch.serviceRequest.id,
          validatedData.matchId,
          contractor.id,
          session.user.name || 'Contractor',
          contractorInfo.businessName,
          validatedData.proposedBudget,
          validatedData.estimatedHours || null,
          validatedData.message || null,
          booking.clientId
        );
      } catch (eventError) {
        console.error('Failed to emit bid submitted event:', eventError);
        // Don't fail the request
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Bid submitted successfully',
        bid: {
          matchId: updatedMatch.id,
          status: updatedMatch.status,
          budget: updatedMatch.budget,
          estimatedHours: updatedMatch.estimatedHours,
          startDate: updatedMatch.startDate,
          submittedAt: updatedMatch.updatedAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Bid submission error:', error);

    return NextResponse.json(
      {
        error: 'Failed to submit bid',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET: Get contractor's submitted bids
export async function GET(request: NextRequest) {
  try {
    // 1. Verify contractor authentication
    const session = await getServerSession(authOptions);

    if (!session || !session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 2. Get contractor record
    const contractor = await prisma.contractor.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });

    if (!contractor) {
      return NextResponse.json(
        { error: 'Contractor profile not found' },
        { status: 404 }
      );
    }

    // 3. Get contractor's bids (submitted matches)
    const bids = await prisma.contractorMatch.findMany({
      where: {
        contractorId: contractor.id,
        status: 'ACCEPTED', // Only submitted bids
      },
      include: {
        serviceRequest: {
          select: {
            id: true,
            australianServiceType: true,
            serviceSuburb: true,
            estimatedCostAUD: true,
            createdAt: true,
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    // 4. Format response
    const formattedBids = bids.map((bid) => ({
      bidId: bid.id,
      requestId: bid.serviceRequest.id,
      disasterType: bid.serviceRequest.australianServiceType,
      location: bid.serviceRequest.serviceSuburb,
      clientBudget: Number(bid.serviceRequest.estimatedCostAUD),
      proposedBudget: bid.budget ? Number(bid.budget) : null,
      estimatedHours: bid.estimatedHours ? Number(bid.estimatedHours) : null,
      startDate: bid.startDate,
      message: bid.contractorMessage,
      submittedAt: bid.updatedAt,
      status: bid.status,
    }));

    return NextResponse.json({
      success: true,
      bids: formattedBids,
      total: formattedBids.length,
    });
  } catch (error) {
    console.error('Error fetching bids:', error);

    return NextResponse.json(
      { error: 'Failed to fetch bids' },
      { status: 500 }
    );
  }
}
