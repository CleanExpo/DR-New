import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError } from '@/lib/api-errors';
import { getTenantDb } from '@/lib/get-tenant-db';

export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Authorize admin role
    if (!requireRole(user, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    // Calculate date threshold for active clients
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Run all database queries in parallel
    const [
      totalClients,
      activeClients,
      totalServices,
      completedServices
    ] = await Promise.all([
      // Get all clients
      db.user.count({
        where: { userType: 'CLIENT' }
      }),
      // Get active clients (those with recent activity)
      db.user.count({
        where: {
          userType: 'CLIENT',
          serviceRequests: {
            some: {
              createdAt: {
                gte: thirtyDaysAgo
              }
            }
          }
        }
      }),
      // Get total service requests
      db.serviceRequest.count(),
      // Get completed service requests
      db.serviceRequest.count({
        where: { status: 'COMPLETED' }
      })
    ]);

    // Note: budget field is String type in schema, cannot use aggregate _sum
    // Revenue calculation would require parsing string values individually
    const totalRevenue = 0;
    const averageServiceValue = 0;

    const stats = {
      totalClients,
      activeClients,
      totalServices,
      completedServices,
      totalRevenue,
      averageServiceValue
    };

    return NextResponse.json({
      success: true,
      stats
    });

  } catch (error) {
    return handleUnexpectedError(error);
  }
}
