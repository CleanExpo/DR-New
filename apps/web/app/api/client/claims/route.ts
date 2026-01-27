/**
 * Client API: Get User's Claims/Bookings
 *
 * GET /api/client/claims
 * Returns all bookings (claims) for the authenticated client
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
            review: true,
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
    const claims = bookings.map((booking) => ({
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
            review: booking.ratings[0].review,
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
