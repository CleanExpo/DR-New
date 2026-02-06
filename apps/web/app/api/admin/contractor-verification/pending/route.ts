import { NextRequest, NextResponse } from 'next/server';
import { getTenantDb } from '@/lib/get-tenant-db';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError } from '@/lib/api-errors';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/contractor-verification/pending
 * Fetch all pending contractor registrations for admin review
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate and check admin role
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN']);
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    // Fetch pending contractors
    const contractors = await db.contractor.findMany({
      where: {
        nrpgVerificationLevel: 'PENDING',
      },
      include: {
        iicrcCertifications: {
          where: { isActive: true },
          orderBy: { expiryDate: 'desc' },
        },
        serviceAreas: {
          where: { isActive: true },
          select: {
            postcode: true,
            state: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc', // Oldest first (FIFO)
      },
    });

    // Calculate statistics
    const now = new Date();
    const totalWaitTimeMs = contractors.reduce((sum, c) => {
      return sum + (now.getTime() - new Date(c.createdAt).getTime());
    }, 0);

    const avgWaitTimeHours = contractors.length > 0
      ? totalWaitTimeMs / contractors.length / (1000 * 60 * 60)
      : 0;

    // Get approved/rejected counts
    const approvedCount = await db.contractor.count({
      where: { nrpgVerificationLevel: 'VERIFIED' },
    });

    const rejectedCount = await db.contractor.count({
      where: { nrpgVerificationLevel: 'REJECTED' },
    });

    return NextResponse.json({
      success: true,
      contractors,
      stats: {
        pending: contractors.length,
        approved: approvedCount,
        rejected: rejectedCount,
        avgWaitTimeHours: Math.round(avgWaitTimeHours),
      },
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
