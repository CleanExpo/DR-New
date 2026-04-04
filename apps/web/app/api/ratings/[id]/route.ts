// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { updateRatingSchema } from '@/lib/validation/rating';
import { ZodError } from 'zod';

export const dynamic = 'force-dynamic';

/**
 * GET /api/ratings/[id]
 * Get single review details
 *
 * Authorization: Any authenticated user
 * @returns Review with full details including client, contractor, and booking info
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const db = getTenantDb(authResult.context);

    const rating = await db.rating.findUnique({
      where: { id: params.id },
      include: {
        client: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        contractor: {
          select: {
            id: true,
            businessName: true,
            averageRating: true,
          },
        },
        booking: {
          select: {
            id: true,
            australianServiceType: true,
            completedAt: true,
          },
        },
      },
    });

    if (!rating) {
      return NextResponse.json(
        {
          error: 'Review not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: rating,
    });
  } catch (error) {
    console.error('Error fetching rating:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch review',
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/ratings/[id]
 * Edit own review
 *
 * Authorization: Review author OR admin
 * Transaction: Updates rating + recalculates contractor averageRating if rating changed
 * @returns Updated review data
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const db = getTenantDb(authResult.context);

    // Fetch existing rating
    const existingRating = await db.rating.findUnique({
      where: { id: params.id },
    });

    if (!existingRating) {
      return NextResponse.json(
        {
          error: 'Review not found',
        },
        { status: 404 }
      );
    }

    // Authorization: only review author or admin can edit
    if (
      authResult.context.user.id !== existingRating.clientId &&
      authResult.context.user.userType !== 'ADMIN' &&
      authResult.context.user.userType !== 'SUPER_ADMIN'
    ) {
      return NextResponse.json(
        {
          error: 'Not authorized to edit this review',
        },
        { status: 403 }
      );
    }

    // Validate request body
    const body = await request.json();
    const validated = updateRatingSchema.parse(body);

    // Update rating in transaction with aggregation
    const result = await db.$transaction(async (tx) => {
      // Update rating
      const updatedRating = await tx.rating.update({
        where: { id: params.id },
        data: {
          ...validated,
          updatedAt: new Date(),
        },
        include: {
          client: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          contractor: {
            select: {
              id: true,
              businessName: true,
            },
          },
          booking: {
            select: {
              id: true,
              australianServiceType: true,
              completedAt: true,
            },
          },
        },
      });

      // Recalculate contractor average if rating changed
      if (validated.rating !== undefined) {
        const avgResult = await tx.rating.aggregate({
          where: { contractorId: existingRating.contractorId },
          _avg: { rating: true },
        });

        await tx.contractor.update({
          where: { id: existingRating.contractorId },
          data: { averageRating: avgResult._avg.rating ?? 0 },
        });
      }

      return updatedRating;
    });

    // Audit log
    await db.auditLog.create({
      data: {
        action: 'UPDATE',
        entityType: 'Rating',
        entityId: params.id,
        performedBy: authResult.context.user.id,
        oldValues: existingRating as any,
        newValues: result as any,
        tenantId: authResult.context.tenantId,
      },
    });

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Review updated successfully',
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    console.error('Error updating rating:', error);
    return NextResponse.json(
      {
        error: 'Failed to update review',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/ratings/[id]
 * Delete own review
 *
 * Authorization: Review author OR admin
 * Transaction: Deletes rating + recalculates contractor averageRating
 * @returns Success message
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const db = getTenantDb(authResult.context);

    // Fetch existing rating
    const existingRating = await db.rating.findUnique({
      where: { id: params.id },
    });

    if (!existingRating) {
      return NextResponse.json(
        {
          error: 'Review not found',
        },
        { status: 404 }
      );
    }

    // Authorization: only review author or admin can delete
    if (
      authResult.context.user.id !== existingRating.clientId &&
      authResult.context.user.userType !== 'ADMIN' &&
      authResult.context.user.userType !== 'SUPER_ADMIN'
    ) {
      return NextResponse.json(
        {
          error: 'Not authorized to delete this review',
        },
        { status: 403 }
      );
    }

    // Delete rating in transaction with aggregation
    await db.$transaction(async (tx) => {
      // Delete rating
      await tx.rating.delete({
        where: { id: params.id },
      });

      // Recalculate contractor average
      const avgResult = await tx.rating.aggregate({
        where: { contractorId: existingRating.contractorId },
        _avg: { rating: true },
      });

      await tx.contractor.update({
        where: { id: existingRating.contractorId },
        data: { averageRating: avgResult._avg.rating ?? 0 },
      });
    });

    // Audit log
    await db.auditLog.create({
      data: {
        action: 'DELETE',
        entityType: 'Rating',
        entityId: params.id,
        performedBy: authResult.context.user.id,
        oldValues: existingRating as any,
        tenantId: authResult.context.tenantId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting rating:', error);
    return NextResponse.json(
      {
        error: 'Failed to delete review',
      },
      { status: 500 }
    );
  }
}
