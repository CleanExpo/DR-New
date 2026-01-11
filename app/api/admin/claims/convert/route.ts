/**
 * Admin API: Convert PublicClaim to Booking
 *
 * POST /api/admin/claims/convert
 * Converts a pending PublicClaim into a Booking and initiates contractor matching
 *
 * Required role: ADMIN
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import {
  convertPublicClaimToBooking,
  matchContractorsToBooking,
  notifyContractorsOfNewJob,
} from '@/lib/claim-intake';

export async function POST(request: NextRequest) {
  try {
    // 1. Verify admin authentication
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    // 2. Get claim ID from request
    const body = await request.json();
    const { publicClaimId } = body;

    if (!publicClaimId) {
      return NextResponse.json(
        { error: 'publicClaimId is required' },
        { status: 400 }
      );
    }

    // 3. Convert PublicClaim to Booking
    const convertedBooking = await convertPublicClaimToBooking(publicClaimId);

    // 4. Match contractors
    const matches = await matchContractorsToBooking(convertedBooking.bookingId);

    // 5. Notify matched contractors
    const contractorIds = matches.map((m) => m.contractorId);
    const notifications = await notifyContractorsOfNewJob(
      convertedBooking.bookingId,
      contractorIds
    );

    // 6. Log conversion for audit
    console.log('=== CLAIM CONVERSION SUCCESSFUL ===');
    console.log('Public Claim ID:', publicClaimId);
    console.log('Booking ID:', convertedBooking.bookingId);
    console.log('Client:', convertedBooking.clientName);
    console.log('Matched contractors:', matches.length);
    console.log('Notifications sent:', notifications.successCount);
    console.log('Notifications failed:', notifications.failureCount);

    // 7. Return success response
    return NextResponse.json(
      {
        success: true,
        booking: convertedBooking,
        matches: matches.map((m) => ({
          contractorId: m.contractorId,
          contractorName: m.contractorName,
          businessName: m.businessName,
          matchScore: m.matchScore,
          reason: m.reason,
          rating: m.averageRating,
          completedJobs: m.completedJobs,
        })),
        notifications: {
          sent: notifications.successCount,
          failed: notifications.failureCount,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Claim conversion error:', error);

    const message = error instanceof Error ? error.message : 'Unknown error';

    // Check for specific errors
    if (message.includes('not found')) {
      return NextResponse.json(
        { error: message },
        { status: 404 }
      );
    }

    if (message.includes('not pending')) {
      return NextResponse.json(
        { error: message },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to convert claim', details: message },
      { status: 500 }
    );
  }
}

// GET: List pending public claims for admin dashboard
export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    const { prisma } = await import('@/lib/prisma');

    const pendingClaims = await prisma.publicClaim.findMany({
      where: { status: 'PENDING' },
      select: {
        id: true,
        clientName: true,
        clientEmail: true,
        clientPhone: true,
        suburb: true,
        postcode: true,
        disasterType: true,
        priority: true,
        isEmergency: true,
        hasInsurance: true,
        submittedAt: true,
      },
      orderBy: { submittedAt: 'desc' },
      take: 50, // Limit to 50 most recent
    });

    return NextResponse.json({
      success: true,
      claims: pendingClaims,
      total: pendingClaims.length,
    });
  } catch (error) {
    console.error('Error fetching pending claims:', error);

    return NextResponse.json(
      { error: 'Failed to fetch pending claims' },
      { status: 500 }
    );
  }
}
