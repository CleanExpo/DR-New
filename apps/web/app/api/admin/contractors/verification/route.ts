import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { handleValidationError, handleUnexpectedError, handleDatabaseError } from '@/lib/api-errors';

/**
 * GET /api/admin/contractors/verification
 * Fetch contractors pending verification (admin only)
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { user } = authResult.context;

    // Validate user is admin
    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN']);
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status'); // PENDING, SUBMITTED, UNDER_REVIEW, etc.
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const offset = (page - 1) * limit;

    // Build filter
    const where: any = {};

    if (status) {
      where.verificationStatus = status;
    } else {
      // Default: show all pending verification statuses
      where.verificationStatus = {
        in: ['PENDING', 'INCOMPLETE', 'SUBMITTED', 'UNDER_REVIEW']
      };
    }

    // Fetch contractors, total count, and summary statistics in parallel
    const [contractors, total, statistics] = await Promise.all([
      db.contractor.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              australianPhoneNumber: true,
              createdAt: true,
            },
          },
          serviceAreas: {
            orderBy: { postcode: 'asc' },
          },
          iicrcCertifications: {
            where: { isActive: true },
            orderBy: { certificationDate: 'desc' },
          },
        },
        orderBy: [
          { submittedForVerificationAt: 'asc' }, // Oldest submissions first
          { createdAt: 'asc' },
        ],
        take: limit,
        skip: offset,
      }),
      db.contractor.count({ where }),
      db.contractor.groupBy({
        by: ['verificationStatus'],
        _count: { id: true },
      }),
    ]);

    const statusCounts = statistics.reduce((acc: any, stat: any) => {
      acc[stat.verificationStatus] = stat._count.id;
      return acc;
    }, {});

    return NextResponse.json({
      success: true,
      contractors,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
      statistics: {
        pending: statusCounts.PENDING || 0,
        incomplete: statusCounts.INCOMPLETE || 0,
        submitted: statusCounts.SUBMITTED || 0,
        underReview: statusCounts.UNDER_REVIEW || 0,
        approved: statusCounts.APPROVED || 0,
        rejected: statusCounts.REJECTED || 0,
        resubmitted: statusCounts.RESUBMITTED || 0,
      },
    });
  } catch (error) {
    return handleDatabaseError(error);
  }
}
