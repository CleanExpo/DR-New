import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { handleValidationError, handleUnexpectedError, handleDatabaseError } from '@/lib/api-errors';
import { ZodError, z } from 'zod';

// Validation schemas
const contractorReplySchema = z.object({
  reply: z.string().min(10).max(1000),
});

const voteSchema = z.object({
  voteType: z.enum(['helpful', 'unhelpful']),
});

const flagSchema = z.object({
  reason: z.string().min(10).max(500),
});

/**
 * POST /api/reviews/[reviewId]/reply
 * Contractor replies to a review
 */
export async function POST(request: NextRequest, props: { params: Promise<{ reviewId: string }> }) {
  const params = await props.params;
  try {
    const { reviewId } = params;
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action'); // reply, vote, flag

    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { user } = authResult.context;

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    // Handle different actions
    if (action === 'reply') {
      return handleContractorReply(db, reviewId, user, request);
    } else if (action === 'vote') {
      return handleVote(db, reviewId, user, request);
    } else if (action === 'flag') {
      return handleFlag(db, reviewId, user, request);
    }

    return NextResponse.json({
      success: false,
      error: 'Invalid action',
    }, { status: 400 });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}

/**
 * PUT /api/reviews/[reviewId]
 * Update a review (client edits their review)
 */
export async function PUT(request: NextRequest, props: { params: Promise<{ reviewId: string }> }) {
  const params = await props.params;
  try {
    const { reviewId } = params;

    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { user } = authResult.context;

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    // Find review
    const review = await db.rating.findUnique({
      where: { id: reviewId },
    });

    if (!review) {
      return NextResponse.json({
        success: false,
        error: 'Review not found',
      }, { status: 404 });
    }

    // Only the client who wrote the review can edit it
    if (review.clientId !== user.id && !requireRole(user, ['ADMIN'])) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized to edit this review',
      }, { status: 403 });
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = z.object({
      title: z.string().min(3).max(100).optional(),
      comment: z.string().min(10).max(2000).optional(),
      rating: z.number().int().min(1).max(5).optional(),
    }).parse(body);

    // Update review
    const updatedReview = await db.rating.update({
      where: { id: reviewId },
      data: {
        ...validatedData,
        isEdited: true,
        editedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      review: updatedReview,
      message: 'Review updated successfully',
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return handleUnexpectedError(error);
  }
}

/**
 * DELETE /api/reviews/[reviewId]
 * Delete a review (admin only or client within 24 hours)
 */
export async function DELETE(request: NextRequest, props: { params: Promise<{ reviewId: string }> }) {
  const params = await props.params;
  try {
    const { reviewId } = params;

    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { user } = authResult.context;

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    // Find review
    const review = await db.rating.findUnique({
      where: { id: reviewId },
    });

    if (!review) {
      return NextResponse.json({
        success: false,
        error: 'Review not found',
      }, { status: 404 });
    }

    // Check permissions
    const isAdmin = requireRole(user, ['ADMIN']);
    const isOwner = review.clientId === user.id;
    const within24Hours = Date.now() - review.createdAt.getTime() < 24 * 60 * 60 * 1000;

    if (!isAdmin && (!isOwner || !within24Hours)) {
      return NextResponse.json({
        success: false,
        error: 'Cannot delete review after 24 hours',
      }, { status: 403 });
    }

    // Delete review
    await db.rating.delete({
      where: { id: reviewId },
    });

    // Recalculate contractor average rating
    const avgRating = await db.rating.aggregate({
      where: {
        contractorId: review.contractorId,
        isPublished: true,
      },
      _avg: {
        rating: true,
      },
    });

    await db.contractor.update({
      where: { id: review.contractorId },
      data: {
        averageRating: avgRating._avg.rating || 0,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}

// Helper function: Contractor reply to review
async function handleContractorReply(db: any, reviewId: string, user: any, request: NextRequest) {
  try {
    // Only contractors can reply
    if (!requireRole(user, ['CONTRACTOR', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CONTRACTOR', 'ADMIN']);
    }

    // Parse and validate
    const body = await request.json();
    const validatedData = contractorReplySchema.parse(body);

    // Find review
    const review = await db.rating.findUnique({
      where: { id: reviewId },
    });

    if (!review) {
      return NextResponse.json({
        success: false,
        error: 'Review not found',
      }, { status: 404 });
    }

    // Verify contractor owns this review
    const contractor = await db.contractor.findFirst({
      where: {
        userId: user.id,
        id: review.contractorId,
      },
    });

    if (!contractor && !requireRole(user, ['ADMIN'])) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized to reply to this review',
      }, { status: 403 });
    }

    // Update review with reply
    const updatedReview = await db.rating.update({
      where: { id: reviewId },
      data: {
        contractorReply: validatedData.reply,
        repliedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      review: updatedReview,
      message: 'Reply posted successfully',
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    throw error;
  }
}

// Helper function: Vote on review
async function handleVote(db: any, reviewId: string, user: any, request: NextRequest) {
  try {
    // Parse and validate
    const body = await request.json();
    const validatedData = voteSchema.parse(body);

    // Find review
    const review = await db.rating.findUnique({
      where: { id: reviewId },
    });

    if (!review) {
      return NextResponse.json({
        success: false,
        error: 'Review not found',
      }, { status: 404 });
    }

    // Update vote count
    const updatedReview = await db.rating.update({
      where: { id: reviewId },
      data: {
        ...(validatedData.voteType === 'helpful'
          ? { helpfulVotes: { increment: 1 } }
          : { unhelpfulVotes: { increment: 1 } }),
      },
    });

    return NextResponse.json({
      success: true,
      review: updatedReview,
      message: 'Vote recorded successfully',
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    throw error;
  }
}

// Helper function: Flag review
async function handleFlag(db: any, reviewId: string, user: any, request: NextRequest) {
  try {
    // Parse and validate
    const body = await request.json();
    const validatedData = flagSchema.parse(body);

    // Find review
    const review = await db.rating.findUnique({
      where: { id: reviewId },
    });

    if (!review) {
      return NextResponse.json({
        success: false,
        error: 'Review not found',
      }, { status: 404 });
    }

    // Flag review
    const updatedReview = await db.rating.update({
      where: { id: reviewId },
      data: {
        isFlagged: true,
        flagReason: validatedData.reason,
        flaggedBy: user.id,
        flaggedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      review: updatedReview,
      message: 'Review flagged for moderation',
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    throw error;
  }
}
