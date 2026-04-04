// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { handleValidationError, handleUnexpectedError, handleDatabaseError } from '@/lib/api-errors';
import { ZodError, z } from 'zod';

// Validation schema for review submission
const reviewSubmissionSchema = z.object({
  bookingId: z.string().cuid(),
  rating: z.number().int().min(1).max(5),
  title: z.string().min(3).max(100).optional().nullable(),
  comment: z.string().min(10).max(2000).optional().nullable(),
  wouldRecommend: z.boolean().default(true),

  // Detailed attribute ratings (1-5)
  professionalism: z.number().int().min(1).max(5).optional().nullable(),
  qualityOfWork: z.number().int().min(1).max(5).optional().nullable(),
  timeliness: z.number().int().min(1).max(5).optional().nullable(),
  communication: z.number().int().min(1).max(5).optional().nullable(),
  valueForMoney: z.number().int().min(1).max(5).optional().nullable(),

  // Media
  photoUrls: z.array(z.string().url()).default([]),
  videoUrl: z.string().url().optional().nullable(),
});

/**
 * GET /api/contractors/[id]/reviews
 * Fetch all reviews for a contractor
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const contractorId = params.id;
    const { searchParams } = new URL(request.url);

    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const sortBy = searchParams.get('sortBy') || 'newest'; // newest, highest, lowest, helpful

    // Get database client (public endpoint, no auth required for viewing)
    const db = getTenantDb({ tenantId: null });

    // Build orderBy
    let orderBy: any = {};
    switch (sortBy) {
      case 'newest':
        orderBy = { createdAt: 'desc' };
        break;
      case 'highest':
        orderBy = { rating: 'desc' };
        break;
      case 'lowest':
        orderBy = { rating: 'asc' };
        break;
      case 'helpful':
        orderBy = { helpfulVotes: 'desc' };
        break;
      default:
        orderBy = { createdAt: 'desc' };
    }

    // Fetch reviews
    const [reviews, total, ratingStats] = await Promise.all([
      db.rating.findMany({
        where: {
          contractorId,
          isPublished: true,
        },
        include: {
          client: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
          booking: {
            select: {
              id: true,
              serviceType: true,
              completedAt: true,
            },
          },
        },
        orderBy,
        take: limit,
        skip: offset,
      }),
      db.rating.count({
        where: {
          contractorId,
          isPublished: true,
        },
      }),
      db.rating.aggregate({
        where: {
          contractorId,
          isPublished: true,
        },
        _avg: {
          rating: true,
          professionalism: true,
          qualityOfWork: true,
          timeliness: true,
          communication: true,
          valueForMoney: true,
        },
        _count: {
          rating: true,
        },
      }),
    ]);

    // Calculate rating distribution
    const ratingDistribution = await db.rating.groupBy({
      by: ['rating'],
      where: {
        contractorId,
        isPublished: true,
      },
      _count: {
        rating: true,
      },
    });

    const distribution = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    ratingDistribution.forEach(item => {
      distribution[item.rating as keyof typeof distribution] = item._count.rating;
    });

    return NextResponse.json({
      success: true,
      reviews,
      total,
      limit,
      offset,
      statistics: {
        averageRating: ratingStats._avg.rating || 0,
        totalReviews: ratingStats._count.rating || 0,
        averageAttributes: {
          professionalism: ratingStats._avg.professionalism || 0,
          qualityOfWork: ratingStats._avg.qualityOfWork || 0,
          timeliness: ratingStats._avg.timeliness || 0,
          communication: ratingStats._avg.communication || 0,
          valueForMoney: ratingStats._avg.valueForMoney || 0,
        },
        distribution,
      },
    });
  } catch (error) {
    return handleDatabaseError(error);
  }
}

/**
 * POST /api/contractors/[id]/reviews
 * Submit a new review (requires authentication)
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const contractorId = params.id;

    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { user } = authResult.context;

    // Only clients can leave reviews
    if (!requireRole(user, ['CLIENT', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CLIENT', 'ADMIN']);
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    // Parse and validate request body
    const body = await request.json();
    const validatedData = reviewSubmissionSchema.parse(body);

    // Verify booking exists and belongs to user
    const booking = await db.booking.findFirst({
      where: {
        id: validatedData.bookingId,
        clientId: user.id,
        contractorId,
        status: 'COMPLETED', // Only allow reviews for completed bookings
      },
    });

    if (!booking) {
      return NextResponse.json({
        success: false,
        error: 'Booking not found or not completed',
      }, { status: 404 });
    }

    // Check if review already exists
    const existingReview = await db.rating.findFirst({
      where: {
        bookingId: validatedData.bookingId,
        contractorId,
      },
    });

    if (existingReview) {
      return NextResponse.json({
        success: false,
        error: 'Review already submitted for this booking',
      }, { status: 409 });
    }

    // Create review
    const review = await db.rating.create({
      data: {
        bookingId: validatedData.bookingId,
        contractorId,
        clientId: user.id,
        rating: validatedData.rating,
        title: validatedData.title,
        comment: validatedData.comment,
        wouldRecommend: validatedData.wouldRecommend,
        professionalism: validatedData.professionalism,
        qualityOfWork: validatedData.qualityOfWork,
        timeliness: validatedData.timeliness,
        communication: validatedData.communication,
        valueForMoney: validatedData.valueForMoney,
        photoUrls: validatedData.photoUrls,
        videoUrl: validatedData.videoUrl,
        isPublished: true,
        isVerified: true, // Auto-verify if from completed booking
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    // Update contractor average rating
    const avgRating = await db.rating.aggregate({
      where: {
        contractorId,
        isPublished: true,
      },
      _avg: {
        rating: true,
      },
    });

    await db.contractor.update({
      where: { id: contractorId },
      data: {
        averageRating: avgRating._avg.rating || 0,
      },
    });

    return NextResponse.json({
      success: true,
      review,
      message: 'Review submitted successfully',
    }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return handleUnexpectedError(error);
  }
}
