import { NextRequest, NextResponse } from 'next/server';

import {
  authenticateRequest,
  requireRole,
  unauthorizedRoleResponse,
} from '@/lib/auth-middleware';
import { verifyLicence } from '@/lib/contractor-verification';

interface RouteParams {
  params: {
    id: string;
  };
}

/**
 * POST /api/contractors/[id]/verify-licence
 *
 * Triggers licence verification for a contractor. Only accessible by
 * ADMIN or SUPER_ADMIN users.
 *
 * Returns the verification result including current licence status,
 * expiry information, and whether the licence was successfully verified.
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN']);
    }

    const result = await verifyLicence(params.id);

    if (!result.success) {
      return NextResponse.json(
        { error: result.message, status: result.status },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      licenceStatus: result.status,
      isExpired: result.isExpired,
      daysUntilExpiry: result.daysUntilExpiry,
    });
  } catch (error) {
    console.error('Error verifying contractor licence:', error);
    return NextResponse.json(
      { error: 'Error verifying contractor licence' },
      { status: 500 }
    );
  }
}
