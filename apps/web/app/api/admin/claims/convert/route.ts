/**
 * Admin API: Convert PublicClaim to Booking
 *
 * POST /api/admin/claims/convert
 * Converts a pending PublicClaim into a Booking and initiates contractor matching
 *
 * Required role: ADMIN
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import {
  convertPublicClaimToBooking,
  matchContractorsToBooking,
  notifyContractorsOfNewJob,
} from '@/lib/claim-intake';
import {
  emitBookingCreated,
  emitContractorsAvailable,
  emitContractorMatched,
} from '@/lib/realtime/emit-handlers';
import { getTenantDb } from '@/lib/get-tenant-db';
import { logClaimAction } from '@/lib/services/audit.service';

export async function POST(request: NextRequest) {
  try {
    // 1. Verify admin authentication
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    // 2. Get claim ID from request
    const body = await request.json();
    const { publicClaimId } = body;

    if (!publicClaimId) {
      return NextResponse.json(
        { error: 'publicClaimId is required' },
        { status: 400 }
      );
    }

    // 3. Get the original PublicClaim
    const publicClaim = await db.publicClaim.findUnique({
      where: { id: publicClaimId },
    });

    if (!publicClaim) {
      return NextResponse.json(
        { error: 'Claim not found' },
        { status: 404 }
      );
    }

    // 4. Convert PublicClaim to Booking
    const convertedBooking = await convertPublicClaimToBooking(publicClaimId);

    // 5. Match contractors
    const matches = await matchContractorsToBooking(convertedBooking.bookingId);

    // 6. Emit real-time events
    try {
      // Emit booking created event
      await emitBookingCreated(
        convertedBooking.bookingId,
        publicClaimId,
        convertedBooking.clientId,
        convertedBooking.clientName,
        publicClaim.disasterType,
        `${publicClaim.suburb}, ${publicClaim.postcode}`,
        parseFloat(publicClaim.priority || '1000'),
        matches.length
      );

      // Emit contractors available event
      if (matches.length > 0) {
        await emitContractorsAvailable(
          convertedBooking.bookingId,
          matches.length,
          matches.slice(0, 3).map((m) => ({
            contractorId: m.contractorId,
            businessName: m.businessName,
            matchScore: m.matchScore,
          }))
        );
      }

      // Emit individual contractor matched events
      for (const match of matches.slice(0, 5)) {
        await emitContractorMatched(
          convertedBooking.bookingId,
          match.contractorId,
          match.contractorName,
          match.businessName,
          match.matchScore
        );
      }
    } catch (eventError) {
      console.error('Failed to emit events:', eventError);
      // Don't fail the request if event emission fails
    }

    // 7. Notify matched contractors
    const contractorIds = matches.map((m) => m.contractorId);
    const notifications = await notifyContractorsOfNewJob(
      convertedBooking.bookingId,
      contractorIds
    );

    // 8. Log conversion for audit
    await logClaimAction(request, session.user.id, publicClaimId, 'CLAIM_CONVERTED', {
      bookingId: convertedBooking.bookingId,
      clientName: convertedBooking.clientName,
      matchedContractors: matches.length,
      notificationsSent: notifications.successCount,
      notificationsFailed: notifications.failureCount,
    });

    // 9. Return success response
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

    const pendingClaims = await db.publicClaim.findMany({
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
