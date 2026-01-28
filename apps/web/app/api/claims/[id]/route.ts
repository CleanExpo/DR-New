/**
 * Insurance Claim Detail API Route
 * GET    /api/claims/[id] - Get claim details and status
 * PATCH  /api/claims/[id] - Update claim (admin only)
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { getClaimStatus, updateClaimStatus } from '@/lib/services/insurance.service';

// ============================================================================
// GET /api/claims/[id] - Get claim details
// ============================================================================

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    const claim = await db.insuranceClaimAU.findUnique({
      where: { id: params.id },
      include: {
        insuranceProvider: {
          select: {
            name: true,
            code: true,
            contactEmail: true,
            contactPhone: true,
          },
        },
        booking: {
          select: {
            id: true,
            australianServiceType: true,
            description: true,
            estimatedCostAUD: true,
            finalCostAUD: true,
            contractor: {
              select: {
                businessName: true,
              },
            },
          },
        },
      },
    });

    if (!claim) {
      return NextResponse.json(
        { error: 'Claim not found' },
        { status: 404 }
      );
    }

    // Check authorization
    const isAuthorized =
      user.id === claim.clientId || user.role === 'ADMIN' || user.role === 'SUPER_ADMIN';

    if (!isAuthorized) {
      return NextResponse.json(
        { error: 'Not authorized to view this claim' },
        { status: 403 }
      );
    }

    // Get status information
    const statusInfo = await getClaimStatus(params.id);

    return NextResponse.json({
      success: true,
      data: {
        ...claim,
        ...statusInfo,
      },
    });
  } catch (error) {
    console.error('Error fetching claim:', error);
    return NextResponse.json(
      { error: 'Error fetching claim' },
      { status: 500 }
    );
  }
}

// ============================================================================
// PATCH /api/claims/[id] - Update claim (admin only)
// ============================================================================

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN']);
    }

    const db = getTenantDb(authResult.context);

    const claim = await db.insuranceClaimAU.findUnique({
      where: { id: params.id },
    });

    if (!claim) {
      return NextResponse.json(
        { error: 'Claim not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { status, approvedAmountAUD, denialReason } = body;

    if (!status) {
      return NextResponse.json(
        { error: 'status is required' },
        { status: 400 }
      );
    }

    // Update claim status
    const result = await updateClaimStatus(
      params.id,
      status,
      approvedAmountAUD
    );

    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: 400 }
      );
    }

    // Update denial reason if provided
    if (denialReason && status === 'DENIED') {
      await db.insuranceClaimAU.update({
        where: { id: params.id },
        data: { denialReason },
      });
    }

    // Log audit
    await db.auditLog.create({
      data: {
        action: 'UPDATE',
        entityType: 'InsuranceClaim',
        entityId: params.id,
        performedBy: user.id,
        newValues: {
          status,
          approvedAmountAUD,
          denialReason,
        } as any,
      },
    });

    const updatedClaim = await db.insuranceClaimAU.findUnique({
      where: { id: params.id },
    });

    return NextResponse.json({
      success: true,
      data: updatedClaim,
      message: result.message,
    });
  } catch (error) {
    console.error('Error updating claim:', error);
    return NextResponse.json(
      { error: 'Error updating claim' },
      { status: 500 }
    );
  }
}
