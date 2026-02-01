import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { createRatingSchema, queryRatingSchema } from '@/lib/validation/rating';
import { ZodError } from 'zod';

export const dynamic = 'force-dynamic';

/**
 * POST /api/ratings
 * Create a new rating/review after booking completion
 *
 * Authorization: CLIENT role only
 * Validates:
 * - Booking exists and is COMPLETED
 * - User owns the booking
 * - Contractor was assigned
 * - No existing review (unique constraint)
 *
 * @returns 201 with rating data on success
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate user (CLIENT role required)
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    if (authResult.context.user.userType !== 'CLIENT') {
      return NextResponse.json(
        { error: 'Only clients can create reviews' },
        { status: 403 }
      );
    }

    // 2. Get tenant-scoped database
    const db = getTenantDb(authResult.context);

    // 3. Parse and validate request body
    const body = await request.json();
    const validated = createRatingSchema.parse(body);

    // 4. Fetch booking with authorization check
    const booking = await db.booking.findUnique({
      where: { id: validated.bookingId },
      include: {
        contractor: {
          select: {
            id: true,
            businessName: true,
          },
        },
      },
    });

    // Validation checks
    if (!booking) {
      return NextResponse.json(
        {
          error: 'Booking not found',
        },
        { status: 404 }
      );
    }

    if (booking.clientId !== authResult.context.user.id) {
      return NextResponse.json(
        {
          error: 'You can only review your own bookings',
        },
        { status: 403 }
      );
    }

    if (booking.status !== 'COMPLETED') {
      return NextResponse.json(
        {
          error: 'You can only review completed bookings',
        },
        { status: 400 }
      );
    }

    if (!booking.contractorId) {
      return NextResponse.json(
        {
          error: 'No contractor was assigned to this booking',
        },
        { status: 400 }
      );
    }

    // 5. Check for duplicate review
    const existingRating = await db.rating.findUnique({
      where: {
        bookingId_contractorId: {
          bookingId: validated.bookingId,
          contractorId: booking.contractorId,
        },
      },
    });

    if (existingRating) {
      return NextResponse.json(
        {
          error: 'You have already reviewed this booking',
        },
        { status: 409 }
      );
    }

    // 6. Create rating in transaction with aggregation update
    const result = await db.$transaction(async (tx) => {
      // Create rating
      const newRating = await tx.rating.create({
        data: {
          bookingId: validated.bookingId,
          contractorId: booking.contractorId!,
          clientId: authResult.context.user.id,
          rating: validated.rating,
          comment: validated.comment,
          wouldRecommend: validated.wouldRecommend,
          tenantId: authResult.context.tenantId,
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

      // Recalculate contractor average rating
      const avgResult = await tx.rating.aggregate({
        where: { contractorId: booking.contractorId! },
        _avg: { rating: true },
      });

      // Update contractor averageRating
      await tx.contractor.update({
        where: { id: booking.contractorId! },
        data: { averageRating: avgResult._avg.rating ?? 0 },
      });

      return newRating;
    });

    // 7. Create audit log
    await db.auditLog.create({
      data: {
        action: 'CREATE',
        entityType: 'Rating',
        entityId: result.id,
        performedBy: authResult.context.user.id,
        newValues: result as any,
        tenantId: authResult.context.tenantId,
      },
    });

    // 8. Return success
    return NextResponse.json(
      {
        success: true,
        data: result,
        message: 'Review submitted successfully',
      },
      { status: 201 }
    );
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

    console.error('Error creating rating:', error);
    return NextResponse.json(
      {
        error: 'Failed to create review',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/ratings
 * List reviews (paginated, filtered)
 *
 * Query Params:
 * - contractorId: Filter by contractor
 * - clientId: Filter by client (only own reviews unless admin)
 * - bookingId: Filter by booking
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 10, max: 50)
 *
 * Authorization: Any authenticated user
 * @returns Paginated list of reviews
 */
export async function GET(request: NextRequest) {
  try {
    // 1. Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const db = getTenantDb(authResult.context);

    // 2. Parse and validate query params
    const searchParams = request.nextUrl.searchParams;
    const query = queryRatingSchema.parse({
      contractorId: searchParams.get('contractorId') || undefined,
      clientId: searchParams.get('clientId') || undefined,
      bookingId: searchParams.get('bookingId') || undefined,
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10,
    });

    // 3. Build where clause with authorization
    const where: any = {};

    if (query.contractorId) {
      where.contractorId = query.contractorId;
    }

    if (query.bookingId) {
      where.bookingId = query.bookingId;
    }

    // Authorization: clients can only see their own reviews unless filtering by contractor
    if (query.clientId) {
      // Admin can see any client's reviews, client can only see own
      if (
        authResult.context.user.userType === 'CLIENT' &&
        query.clientId !== authResult.context.user.id
      ) {
        return NextResponse.json(
          {
            error: 'Not authorized to view these reviews',
            },
          { status: 403 }
        );
      }
      where.clientId = query.clientId;
    } else if (authResult.context.user.userType === 'CLIENT' && !query.contractorId) {
      // If client doesn't specify contractorId, default to their own reviews
      where.clientId = authResult.context.user.id;
    }

    // 4. Fetch ratings with pagination
    const offset = (query.page - 1) * query.limit;

    const [ratings, total] = await Promise.all([
      db.rating.findMany({
        where,
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
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: query.limit,
      }),
      db.rating.count({ where }),
    ]);

    // 5. Return paginated results
    return NextResponse.json({
      success: true,
      data: ratings,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        pages: Math.ceil(total / query.limit),
        hasMore: offset + ratings.length < total,
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid query parameters',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    console.error('Error fetching ratings:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch reviews',
      },
      { status: 500 }
    );
  }
}
