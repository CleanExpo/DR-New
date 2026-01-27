/**
 * Contractor API: Get Available Job Requests
 *
 * GET /api/contractor/available-requests
 * Returns list of jobs available for the contractor to bid on
 * Uses ServiceRequest model with correct field mappings
 *
 * Required role: CONTRACTOR
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { handleUnexpectedError } from '@/lib/api-errors';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Authenticate and get tenant context
    const authResult = await authenticateRequest(request);
    if (!authResult.success) return authResult.response;
    const { user } = authResult.context;

    if (!requireRole(user, ['CONTRACTOR', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CONTRACTOR', 'ADMIN']);
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    // Get contractor profile - automatically tenant-scoped
    const contractorProfile = await db.contractorProfile.findUnique({
      where: { userId: user.id },
      select: {
        id: true,
        businessName: true,
        rating: true,
        totalJobs: true,
      },
    });

    if (!contractorProfile) {
      // Return sample data if no contractor profile exists
      return NextResponse.json({
        success: true,
        data: [],
        total: 0,
        contractor: null,
        message: 'Please complete your contractor profile to see available requests',
      });
    }

    // Get available service requests (all pending requests for now) - automatically tenant-scoped
    // In production, this would be filtered by contractor's service areas and specialisations
    const availableRequests = await db.serviceRequest.findMany({
      where: {
        status: { in: ['PENDING', 'MATCHED'] },
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    // Format response with correct field mappings
    const formattedRequests = availableRequests.map((request) => {
      // Calculate hours since posted
      const hoursPosted = Math.floor(
        (Date.now() - new Date(request.createdAt).getTime()) / (1000 * 60 * 60)
      );

      // Determine priority based on urgency
      const priorityMap: Record<string, 'Elite' | 'Strategic' | 'New Market' | 'Standard'> = {
        'Emergency': 'Elite',
        'High': 'Strategic',
        'Medium': 'New Market',
        'Low': 'Standard',
      };

      return {
        id: request.id,
        requestId: request.id,
        type: request.serviceCategory,
        serviceTitle: request.serviceTitle,
        description: request.description,
        priority: priorityMap[request.urgency] || 'Standard',
        location: request.location,
        distance: `${Math.floor(Math.random() * 50) + 5} km away`, // TODO: Calculate real distance
        potentialValue: request.budget || 'Quote Required',
        urgency: request.urgency,
        insurance: request.insurance,
        urgentResponse: request.urgentResponse,
        status: request.status,
        clientName: request.user?.name || 'Anonymous',
        postedAt: request.createdAt,
        hoursPosted,
        leadScore: request.leadScore,
      };
    });

    return NextResponse.json({
      success: true,
      data: formattedRequests,
      total: formattedRequests.length,
      contractor: {
        id: contractorProfile.id,
        name: contractorProfile.businessName,
        rating: contractorProfile.rating,
        completedJobs: contractorProfile.totalJobs,
      },
    });
  } catch (error) {
    console.error('Error fetching available requests:', error);
    return handleUnexpectedError(error);
  }
}
