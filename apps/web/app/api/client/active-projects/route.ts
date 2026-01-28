import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { handleUnexpectedError } from '@/lib/api-errors';

export const dynamic = 'force-dynamic';

/**
 * GET /api/client/active-projects
 * Retrieves all active projects for authenticated client
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { user } = authResult.context;

    // Validate user is client
    if (!requireRole(user, ['CLIENT', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CLIENT', 'ADMIN']);
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    // Fetch active projects (accepted contractor matches) - automatically tenant-scoped
    const activeProjects = await db.contractorMatch.findMany({
      where: {
        serviceRequest: {
          userId: user.id,
        },
        status: 'ACCEPTED',
      },
      include: {
        contractor: {
          select: {
            id: true,
          },
        },
        serviceRequest: {
          select: {
            id: true,
            serviceTitle: true,
            description: true,
            location: true,
            serviceCategory: true,
            urgency: true,
            budget: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Transform data for response
    const transformedProjects = activeProjects.map(project => ({
      id: project.id,
      contractor: project.contractor ? { id: project.contractor.id } : null,
      serviceRequest: project.serviceRequest,
      budget: project.budget,
      timeline: project.timeline,
      startDate: project.startDate,
      estimatedHours: project.estimatedHours,
      message: project.contractorMessage,
      status: project.status,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    }));

    return NextResponse.json({
      success: true,
      data: transformedProjects,
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
