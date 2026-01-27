import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { handleUnexpectedError, createErrorResponse, ErrorCode } from '@/lib/api-errors';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Check role
    if (!requireRole(user, ['CONTRACTOR', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CONTRACTOR', 'ADMIN']);
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    // Get contractor profile - automatically tenant-scoped
    const contractorProfile = await db.contractorProfile.findUnique({
      where: { userId: user.id }
    });

    if (!contractorProfile) {
      return createErrorResponse(
        ErrorCode.RESOURCE_NOT_FOUND,
        'Contractor profile not found',
        404
      );
    }

    // Get contractor matches (active projects) - automatically tenant-scoped
    const activeMatches = await db.contractorMatch.findMany({
      where: {
        contractorId: contractorProfile.id,
        status: 'ACCEPTED'
      },
      include: {
        serviceRequest: true
      }
    });

    // Get completed jobs (matches with completed service requests) - automatically tenant-scoped
    const completedMatches = await db.contractorMatch.findMany({
      where: {
        contractorId: contractorProfile.id,
        serviceRequest: {
          status: 'COMPLETED'
        }
      }
    });

    // Calculate stats
    const activeProjects = activeMatches.length;
    const completedJobs = completedMatches.length;
    const totalEarnings = completedJobs * (contractorProfile.hourlyRate || 0) * 8; // Assuming 8 hours per job
    const rating = contractorProfile.rating || 0;

    // Get today's opportunities (service requests in contractor's service areas) - automatically tenant-scoped
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaysOpportunities = await db.serviceRequest.count({
      where: {
        status: 'PENDING',
        serviceCategory: {
          in: contractorProfile.services
        },
        createdAt: {
          gte: today
        }
      }
    });

    const stats = {
      activeProjects,
      totalEarnings,
      completedJobs,
      rating,
      todaysOpportunities
    };

    return NextResponse.json({
      success: true,
      data: stats
    });

  } catch (error) {
    return handleUnexpectedError(error);
  }
}
