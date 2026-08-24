/**
 * Client API: Get Single Claim/Booking Details
 *
 * GET /api/client/claims/[id]
 * Returns detailed information about a specific booking (claim)
 *
 * Required role: CLIENT (must own the booking)
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    // 1. Verify client authentication
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Validate user is client or admin
    if (!requireRole(user, ['CLIENT', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CLIENT', 'ADMIN']);
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    const bookingId = params.id;

    // 2. Get booking details - automatically tenant-scoped
    const booking = await db.booking.findUnique({
      where: { id: bookingId },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        contractor: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
            iicrcCertifications: {
              where: { isActive: true },
              select: {
                certificationLevel: true,
              },
            },
          },
        },
        payments: {
          select: {
            id: true,
            amountAUD: true,
            status: true,
            processedAt: true,
          },
          orderBy: { createdAt: 'desc' },
        },
        ratings: {
          select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Claim not found' },
        { status: 404 }
      );
    }

    // 3. Verify client owns this booking
    if (booking.clientId !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized - You do not own this claim' },
        { status: 403 }
      );
    }

    // 4. Get contractor matches (bids) if no contractor assigned yet - automatically tenant-scoped
    // Note: ContractorMatch.contractor points to ContractorProfile, not Contractor
    let contractorMatches: Array<{
      matchId: string;
      contractorId: string;
      contractorName: string | null;
      businessName: string | null;
      email: string;
      matchScore: number;
      status: string;
      proposedBudget: number | null;
      estimatedHours: string | null;
      startDate: string | null;
      message: string | null;
      rating: number;
      totalJobs: number;
    }> = [];
    if (!booking.contractorId) {
      const matches = await db.contractorMatch.findMany({
        where: { serviceRequestId: bookingId },
        include: {
          contractor: {
            include: {
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

      // Type assertion for included relations
      type MatchWithContractor = typeof matches[0] & {
        contractor: {
          user: { name: string | null; email: string };
          businessName: string | null;
          rating: number;
          totalJobs: number;
        };
      };

      contractorMatches = (matches as MatchWithContractor[]).map((m) => ({
        matchId: m.id,
        contractorId: m.contractorId,
        contractorName: m.contractor.user.name,
        businessName: m.contractor.businessName,
        email: m.contractor.user.email,
        matchScore: m.matchScore,
        status: m.status,
        proposedBudget: m.budget ? Number(m.budget) : null,
        estimatedHours: m.estimatedHours,
        startDate: m.startDate,
        message: m.contractorMessage,
        rating: Number(m.contractor.rating),
        totalJobs: m.contractor.totalJobs,
      }));
    }

    // 5. Format response
    // Type assertion for included relations
    type BookingWithRelations = typeof booking & {
      client: { id: string; name: string | null; email: string };
      contractor?: {
        id: string;
        businessName: string;
        averageRating: any;
        completedJobs: number;
        user: { name: string | null; email: string };
        iicrcCertifications: { certificationLevel: string }[];
      } | null;
      payments: { id: string; amountAUD: any; status: string; processedAt: Date | null }[];
      ratings: { id: string; rating: number; comment: string | null; createdAt: Date }[];
    };

    const bookingData = booking as BookingWithRelations;

    return NextResponse.json({
      success: true,
      claim: {
        id: bookingData.id,
        serviceType: bookingData.australianServiceType,
        description: bookingData.description,
        location: {
          address: bookingData.streetAddress,
          suburb: bookingData.serviceSuburb,
          postcode: bookingData.servicePostcode,
          state: bookingData.serviceState,
        },
        status: bookingData.status,
        emergencyLevel: bookingData.emergencyResponseLevel,
        estimatedCost: Number(bookingData.estimatedCostAUD),
        finalCost: bookingData.finalCostAUD ? Number(bookingData.finalCostAUD) : null,
        client: {
          id: bookingData.client.id,
          name: bookingData.client.name,
          email: bookingData.client.email,
        },
        contractor: bookingData.contractor
          ? {
              id: bookingData.contractor.id,
              name: bookingData.contractor.user.name,
              email: bookingData.contractor.user.email,
              businessName: bookingData.contractor.businessName,
              rating: Number(bookingData.contractor.averageRating),
              completedJobs: bookingData.contractor.completedJobs,
              certifications: bookingData.contractor.iicrcCertifications.map((c) => c.certificationLevel),
            }
          : null,
        contractorMatches,
        notes: bookingData.notes,
        internalNotes: bookingData.internalNotes,
        clientNotes: bookingData.clientNotes,
        damagePhotos: bookingData.damagePhotos,
        payments: bookingData.payments.map((p) => ({
          id: p.id,
          amount: Number(p.amountAUD),
          status: p.status,
          date: p.processedAt,
        })),
        rating: bookingData.ratings[0]
          ? {
              rating: bookingData.ratings[0].rating,
              comment: bookingData.ratings[0].comment,
              date: bookingData.ratings[0].createdAt,
            }
          : null,
        timeline: {
          submitted: bookingData.createdAt,
          started: bookingData.startedAt,
          completed: bookingData.completedAt,
          updated: bookingData.updatedAt,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching claim:', error);

    return NextResponse.json(
      { error: 'Failed to fetch claim' },
      { status: 500 }
    );
  }
}
