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

    // Fetch all stats in parallel
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [activeMatches, completedMatches, todaysOpportunities] = await Promise.all([
      db.contractorMatch.findMany({
        where: { contractorId: contractorProfile.id, status: 'ACCEPTED' },
        include: { serviceRequest: true },
      }),
      db.contractorMatch.findMany({
        where: { contractorId: contractorProfile.id, serviceRequest: { status: 'COMPLETED' } },
      }),
      db.serviceRequest.count({
        where: {
          status: 'PENDING',
          serviceCategory: { in: contractorProfile.services },
          createdAt: { gte: today },
        },
      }),
    ]);

    // Calculate stats
    const activeProjects = activeMatches.length;
    const completedJobs = completedMatches.length;
    const totalEarnings = completedJobs * (contractorProfile.hourlyRate || 0) * 8; // Assuming 8 hours per job
    const rating = contractorProfile.rating || 0;

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
