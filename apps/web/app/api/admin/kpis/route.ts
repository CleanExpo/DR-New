import { NextRequest, NextResponse } from 'next/server';
import { getTenantDb } from '@/lib/get-tenant-db';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError } from '@/lib/api-errors';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) return authResult.response;
    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    const [totalClients, totalContractors, totalRequests, activeProjects] = await Promise.all([
      db.user.count({ where: { userType: 'CLIENT' } }),
      db.contractorProfile.count(),
      db.serviceRequest.count(),
      db.contractorMatch.count({ where: { status: 'ACCEPTED' } }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalClients,
        totalContractors,
        totalRequests,
        activeProjects,
      },
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
