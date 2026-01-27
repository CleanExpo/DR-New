import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { handleUnexpectedError, ErrorCode, createErrorResponse } from '@/lib/api-errors';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Check role authorization
    if (!requireRole(user, ['CLIENT', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CLIENT', 'ADMIN']);
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get('requestId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!requestId) {
      return createErrorResponse(
        ErrorCode.MISSING_FIELDS,
        'Request ID is required',
        400
      );
    }

    // Get the service request to verify ownership - automatically tenant-scoped
    const serviceRequest = await db.serviceRequest.findFirst({
      where: {
        id: requestId,
        userId: user.id
      }
    });

    if (!serviceRequest) {
      return createErrorResponse(
        ErrorCode.RESOURCE_NOT_FOUND,
        'Service request not found',
        404
      );
    }

    // NRPG uses private, automatic claim dispatch. Clients do not browse contractors.
    return NextResponse.json({
      contractors: [],
      pagination: { page, limit, total: 0, pages: 0 },
      dispatchMode: 'AUTO',
      request: {
        id: serviceRequest.id,
        serviceCategory: serviceRequest.serviceCategory,
        location: serviceRequest.location,
        urgency: serviceRequest.urgency,
      },
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
