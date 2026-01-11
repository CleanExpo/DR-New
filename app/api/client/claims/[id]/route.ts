/**
 * Client API: Get Single Claim/Booking Details
 *
 * GET /api/client/claims/[id]
 * Returns detailed information about a specific booking (claim)
 *
 * Required role: CLIENT (must own the booking)
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Verify client authentication
    const session = await getServerSession(authOptions);

    if (!session || !session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const bookingId = params.id;

    // 2. Get booking details
    const booking = await prisma.booking.findUnique({
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
            review: true,
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
    if (booking.clientId !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized - You do not own this claim' },
        { status: 403 }
      );
    }

    // 4. Get contractor matches (bids) if no contractor assigned yet
    let contractorMatches = [];
    if (!booking.contractorId) {
      const matches = await prisma.contractorMatch.findMany({
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
              iicrcCertifications: {
                where: { isActive: true },
                select: {
                  certificationLevel: true,
                },
              },
            },
          },
        },
        orderBy: { matchScore: 'desc' },
      });

      contractorMatches = matches.map((m) => ({
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
        rating: Number(m.contractor.averageRating),
        completedJobs: m.contractor.completedJobs,
        certifications: m.contractor.iicrcCertifications.map((c) => c.certificationLevel),
      }));
    }

    // 5. Format response
    return NextResponse.json({
      success: true,
      claim: {
        id: booking.id,
        serviceType: booking.australianServiceType,
        description: booking.description,
        location: {
          address: booking.streetAddress,
          suburb: booking.serviceSuburb,
          postcode: booking.servicePostcode,
          state: booking.serviceState,
        },
        status: booking.status,
        emergencyLevel: booking.emergencyResponseLevel,
        estimatedCost: Number(booking.estimatedCostAUD),
        finalCost: booking.finalCostAUD ? Number(booking.finalCostAUD) : null,
        client: {
          id: booking.client.id,
          name: booking.client.name,
          email: booking.client.email,
        },
        contractor: booking.contractor
          ? {
              id: booking.contractor.id,
              name: booking.contractor.user.name,
              email: booking.contractor.user.email,
              businessName: booking.contractor.businessName,
              rating: Number(booking.contractor.averageRating),
              completedJobs: booking.contractor.completedJobs,
              certifications: booking.contractor.iicrcCertifications.map((c) => c.certificationLevel),
            }
          : null,
        contractorMatches,
        notes: booking.notes,
        internalNotes: booking.internalNotes,
        clientNotes: booking.clientNotes,
        damagePhotos: booking.damagePhotos,
        payments: booking.payments.map((p) => ({
          id: p.id,
          amount: Number(p.amountAUD),
          status: p.status,
          date: p.processedAt,
        })),
        rating: booking.ratings[0]
          ? {
              rating: booking.ratings[0].rating,
              review: booking.ratings[0].review,
              date: booking.ratings[0].createdAt,
            }
          : null,
        timeline: {
          submitted: booking.createdAt,
          started: booking.startedAt,
          completed: booking.completedAt,
          updated: booking.updatedAt,
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
