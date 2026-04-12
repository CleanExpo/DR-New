/**
 * Admin Contractors Bulk Actions API
 *
 * POST /api/admin/contractors/bulk — verify or suspend multiple contractors
 * DELETE /api/admin/contractors/bulk — permanently delete multiple contractors
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { handleUnexpectedError } from '@/lib/api-errors';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) return authResult.response;
    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    const body: unknown = await request.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { contractorIds, action } = body as Record<string, unknown>;

    if (!Array.isArray(contractorIds) || contractorIds.length === 0) {
      return NextResponse.json({ error: 'contractorIds must be a non-empty array' }, { status: 400 });
    }

    if (action !== 'verify' && action !== 'suspend') {
      return NextResponse.json(
        { error: "action must be 'verify' or 'suspend'" },
        { status: 400 }
      );
    }

    const db = getTenantDb(authResult.context);

    const result = await db.contractorProfile.updateMany({
      where: {
        id: { in: contractorIds as string[] },
      },
      data: {
        isVerified: action === 'verify',
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, affected: result.count });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) return authResult.response;
    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    const body: unknown = await request.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { contractorIds, confirm } = body as Record<string, unknown>;

    if (!Array.isArray(contractorIds) || contractorIds.length === 0) {
      return NextResponse.json({ error: 'contractorIds must be a non-empty array' }, { status: 400 });
    }

    if (confirm !== true) {
      return NextResponse.json(
        { error: 'Bulk delete requires confirm: true in the request body' },
        { status: 400 }
      );
    }

    const db = getTenantDb(authResult.context);

    // Cascade is handled at DB level (ContractorProfile.user onDelete: Cascade)
    // Delete profiles; associated matches and user cascade automatically.
    const result = await db.contractorProfile.deleteMany({
      where: {
        id: { in: contractorIds as string[] },
      },
    });

    return NextResponse.json({ success: true, deletedCount: result.count });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
