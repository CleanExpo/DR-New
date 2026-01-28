/**
 * Admin API: Get Contractor Matches for a Booking
 *
 * GET /api/admin/claims/match?bookingId=xxx
 * Returns list of matched contractors with scores
 *
 * POST /api/admin/claims/match
 * Manually re-match contractors for a booking
 *
 * Required role: ADMIN
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { matchContractorsToBooking } from '@/lib/claim-intake';

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
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

    // Get bookingId from query params
    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('bookingId');

    if (!bookingId) {
      return NextResponse.json(
        { error: 'bookingId query parameter is required' },
        { status: 400 }
      );
    }

    const { prisma } = await import('@/lib/prisma');

    // Get existing ContractorMatch records
    const matches = await db.contractorMatch.findMany({
      where: { serviceRequestId: bookingId },
      include: {
        contractor: {
          select: {
            id: true,
            businessName: true,
            averageRating: true,
            completedJobs: true,
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: { matchScore: 'desc' },
    });

    if (matches.length === 0) {
      return NextResponse.json(
        { error: 'No matches found for this booking' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      bookingId,
      matches: matches.map((m) => ({
        matchId: m.id,
        contractorId: m.contractorId,
        contractorName: m.contractor.user.name,
        businessName: m.contractor.businessName,
        email: m.contractor.user.email,
        matchScore: m.matchScore,
        status: m.status,
        rating: Number(m.contractor.averageRating),
        completedJobs: m.contractor.completedJobs,
        createdAt: m.createdAt,
      })),
      total: matches.length,
    });
  } catch (error) {
    console.error('Error fetching matches:', error);

    return NextResponse.json(
      { error: 'Failed to fetch contractor matches' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
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

    const body = await request.json();
    const { bookingId, removeExisting = false } = body;

    if (!bookingId) {
      return NextResponse.json(
        { error: 'bookingId is required' },
        { status: 400 }
      );
    }

    const { prisma } = await import('@/lib/prisma');

    // Verify booking exists
    const booking = await db.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Optionally remove existing matches before re-matching
    if (removeExisting) {
      await db.contractorMatch.deleteMany({
        where: { serviceRequestId: bookingId },
      });
    }

    // Run contractor matching algorithm
    const matches = await matchContractorsToBooking(bookingId);

    console.log('=== CONTRACTOR MATCHING ===');
    console.log('Booking ID:', bookingId);
    console.log('Matched contractors:', matches.length);
    matches.forEach((m) => {
      console.log(`  - ${m.businessName} (Score: ${m.matchScore}) - ${m.reason.join(', ')}`);
    });

    return NextResponse.json(
      {
        success: true,
        bookingId,
        matches: matches.map((m) => ({
          contractorId: m.contractorId,
          contractorName: m.contractorName,
          businessName: m.businessName,
          matchScore: m.matchScore,
          reason: m.reason,
          rating: m.averageRating,
          completedJobs: m.completedJobs,
        })),
        total: matches.length,
        message: `Re-matched ${matches.length} contractors for booking ${bookingId}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contractor matching error:', error);

    return NextResponse.json(
      { error: 'Failed to match contractors' },
      { status: 500 }
    );
  }
}
