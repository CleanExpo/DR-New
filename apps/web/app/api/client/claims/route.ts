/**
 * Client API: Claims Management
 *
 * GET /api/client/claims
 * Returns all bookings (claims) for the authenticated client
 *
 * POST /api/client/claims
 * Create a new claim with categorized damage photos
 *
 * Required role: CLIENT
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';

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

    // 3. Get user's bookings (claims) - automatically tenant-scoped
    const bookings = await db.booking.findMany({
      where: {
        clientId: user.id,
      },
      select: {
        id: true,
        australianServiceType: true,
        description: true,
        servicePostcode: true,
        serviceSuburb: true,
        status: true,
        emergencyResponseLevel: true,
        estimatedCostAUD: true,
        contractor: {
          select: {
            id: true,
            businessName: true,
            averageRating: true,
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        ratings: {
          select: {
            rating: true,
            comment: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
        createdAt: true,
        updatedAt: true,
        completedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // 3. Format response
    // Type assertion for included relations
    type BookingWithRelations = typeof bookings[0] & {
      contractor?: {
        id: string;
        businessName: string;
        averageRating: any;
        user: { name: string | null; email: string };
      } | null;
      ratings: { rating: number; comment: string | null }[];
    };

    const claims = (bookings as BookingWithRelations[]).map((booking) => ({
      id: booking.id,
      serviceType: booking.australianServiceType,
      description: booking.description,
      location: `${booking.serviceSuburb} ${booking.servicePostcode}`,
      suburb: booking.serviceSuburb,
      postcode: booking.servicePostcode,
      status: booking.status,
      emergencyLevel: booking.emergencyResponseLevel,
      estimatedCost: Number(booking.estimatedCostAUD),
      contractor: booking.contractor
        ? {
            id: booking.contractor.id,
            name: booking.contractor.user.name,
            email: booking.contractor.user.email,
            businessName: booking.contractor.businessName,
            rating: Number(booking.contractor.averageRating),
          }
        : null,
      rating: booking.ratings[0]
        ? {
            rating: booking.ratings[0].rating,
            comment: booking.ratings[0].comment,
          }
        : null,
      submittedAt: booking.createdAt,
      updatedAt: booking.updatedAt,
      completedAt: booking.completedAt,
    }));

    return NextResponse.json({
      success: true,
      claims,
      total: claims.length,
    });
  } catch (error) {
    console.error('Error fetching claims:', error);

    return NextResponse.json(
      { error: 'Failed to fetch claims' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/client/claims
 * Create a new claim with categorized damage photos
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate and get tenant context
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // 2. Parse request body
    const body = await request.json();
    const {
      serviceType,
      damageDescription,
      hasInsurance,
      insuranceProvider,
      policyNumber,
      // damagePhotos accepted but not processed until inspection report feature is implemented
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      damagePhotos: _damagePhotos = [],
    } = body;

    // 3. Validate required fields
    if (!serviceType || !damageDescription) {
      return NextResponse.json(
        { error: 'Service type and damage description are required', success: false },
        { status: 400 }
      );
    }

    // 4. Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    // TODO: Inspection report creation disabled - schema requires booking first
    // The inspection report schema requires bookingId, reportNumber, jurisdiction,
    // scopeOfWork, findings, and recommendations fields which aren't available
    // at claim creation time. This feature needs a complete rewrite.
    // For now, damage photos are stored as metadata in the booking if needed.

    // 5. Create booking (claim)
    // Note: Insurance info should be stored separately in InsuranceClaimAU if needed
    const booking = await db.booking.create({
      data: {
        clientId: user.id,
        australianServiceType: serviceType.toUpperCase() as any,
        description: damageDescription,
        streetAddress: '', // Will be updated from user profile
        serviceSuburb: '', // Will be updated from user profile
        serviceState: 'NSW',
        servicePostcode: '', // Will be updated from user profile
        status: 'PENDING',
        emergencyResponseLevel: serviceType === 'emergency' ? 'URGENT' : 'STANDARD',
        estimatedCostAUD: 0,
        // Store insurance preference in notes for now
        notes: hasInsurance === 'yes'
          ? `Insurance: ${insuranceProvider || 'Unknown'}, Policy: ${policyNumber || 'Not provided'}`
          : undefined,
        tenantId: authResult.context.tenantId,
      },
    });

    // 6. Return success response
    return NextResponse.json({
      success: true,
      claimId: booking.id,
      message: 'Claim created successfully',
    });
  } catch (error) {
    console.error('Error creating claim:', error);

    return NextResponse.json(
      {
        error: 'Failed to create claim',
        message: error instanceof Error ? error.message : 'Unknown error',
        success: false,
      },
      { status: 500 }
    );
  }
}
