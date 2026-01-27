import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { handleUnexpectedError } from '@/lib/api-errors';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) return authResult.response;
    const { user } = authResult.context;

    if (!requireRole(user, ['CLIENT', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CLIENT', 'ADMIN']);
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    const requests = await db.serviceRequest.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: requests });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
