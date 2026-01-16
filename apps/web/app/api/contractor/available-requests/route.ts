/**
 * Contractor API: Get Available Job Requests
 *
 * GET /api/contractor/available-requests
 * Returns list of jobs available for the contractor to bid on
 * (Bookings with ContractorMatches where contractor has not yet bid)
 *
 * Required role: CONTRACTOR
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError } from '@/lib/api-errors';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Use NextAuth session if available, otherwise fall back to custom auth middleware
    let userId: string | null = null;

    try {
      const session = await getServerSession(authOptions);
      if (session?.user?.id) {
        userId = session.user.id;
      }
    } catch {
      // Fallback to custom auth middleware
    }

    // If NextAuth didn't work, use custom middleware
    if (!userId) {
      const authResult = await authenticateRequest(request);
      if (!authResult.success) return authResult.response;
      const { user } = authResult.context;

      if (!requireRole(user, ['CONTRACTOR', 'ADMIN'])) {
        return unauthorizedRoleResponse(['CONTRACTOR', 'ADMIN']);
      }

      userId = user.id;
    }

    // Get contractor record
    const contractor = await prisma.contractor.findUnique({
      where: { userId },
      select: {
        id: true,
        businessName: true,
        averageRating: true,
        completedJobs: true,
      },
    });

    if (!contractor) {
      return NextResponse.json(
        { success: true, data: [], total: 0 },
        { status: 200 }
      );
    }

    // Get available job requests (ContractorMatches with PENDING status)
    const availableMatches = await prisma.contractorMatch.findMany({
      where: {
        contractorId: contractor.id,
        status: 'PENDING',
      },
      include: {
        serviceRequest: {
          select: {
            id: true,
            australianServiceType: true,
            description: true,
            servicePostcode: true,
            serviceSuburb: true,
            serviceState: true,
            status: true,
            emergencyResponseLevel: true,
            estimatedCostAUD: true,
            client: {
              select: {
                name: true,
                email: true,
              },
            },
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    // Format response
    const availableRequests = availableMatches.map((match) => ({
      matchId: match.id,
      requestId: match.serviceRequest.id,
      matchScore: match.matchScore,
      disasterType: match.serviceRequest.australianServiceType,
      description: match.serviceRequest.description,
      location: {
        suburb: match.serviceRequest.serviceSuburb,
        postcode: match.serviceRequest.servicePostcode,
        state: match.serviceRequest.serviceState,
      },
      estimatedBudget: Number(match.serviceRequest.estimatedCostAUD),
      emergencyLevel: match.serviceRequest.emergencyResponseLevel,
      status: match.serviceRequest.status,
      clientName: match.serviceRequest.client.name,
      postedAt: match.serviceRequest.createdAt,
      hoursPosted: Math.floor(
        (Date.now() - new Date(match.serviceRequest.createdAt).getTime()) / (1000 * 60 * 60)
      ),
    }));

    return NextResponse.json({
      success: true,
      data: availableRequests,
      total: availableRequests.length,
      contractor: {
        name: contractor.businessName,
        rating: Number(contractor.averageRating),
        completedJobs: contractor.completedJobs,
      },
    });
  } catch (error) {
    console.error('Error fetching available requests:', error);
    return handleUnexpectedError(error);
  }
}
