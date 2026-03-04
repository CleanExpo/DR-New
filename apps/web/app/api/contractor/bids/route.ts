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
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
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
    // 1. Authenticate and get tenant context
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // 2. Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    // 3. Get contractor record - automatically tenant-scoped
    const contractor = await db.contractor.findUnique({
      where: { userId: user.id },
      select: { id: true },
    });

    if (!contractor) {
      return NextResponse.json(
        { error: 'Contractor profile not found' },
        { status: 404 }
      );
    }

    // 4. Parse and validate request body
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

    // 5. Get the ContractorMatch record - automatically tenant-scoped
    const match = await db.contractorMatch.findUnique({
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

    // 6. Verify contractor owns this match
    if (match.contractorId !== contractor.id) {
      return NextResponse.json(
        { error: 'Unauthorized - You do not own this match' },
        { status: 403 }
      );
    }

    // 7. Update ContractorMatch with bid details - automatically tenant-scoped
    const updatedMatch = await db.contractorMatch.update({
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

    // 8. Get booking and contractor info in parallel for event emission
    const [contractorInfo, booking] = await Promise.all([
      db.contractor.findUnique({ where: { id: contractor.id }, select: { businessName: true } }),
      db.booking.findUnique({ where: { id: updatedMatch.serviceRequest.id }, select: { clientId: true } }),
    ]);

    // 9. Emit bid submitted event
    if (contractorInfo && booking) {
      try {
        const { emitBidSubmitted } = await import('@/lib/realtime/emit-handlers');
        await emitBidSubmitted(
          updatedMatch.serviceRequest.id,
          validatedData.matchId,
          contractor.id,
          user.name || 'Contractor',
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
      },
      { status: 500 }
    );
  }
}

// GET: Get contractor's submitted bids
export async function GET(request: NextRequest) {
  try {
    // 1. Authenticate and get tenant context
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // 2. Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    // 3. Get contractor record - automatically tenant-scoped
    const contractor = await db.contractor.findUnique({
      where: { userId: user.id },
      select: { id: true },
    });

    if (!contractor) {
      return NextResponse.json(
        { error: 'Contractor profile not found' },
        { status: 404 }
      );
    }

    // 4. Get contractor's bids (submitted matches) - automatically tenant-scoped
    const bids = await db.contractorMatch.findMany({
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
