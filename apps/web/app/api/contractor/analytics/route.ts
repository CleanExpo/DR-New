import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { handleDatabaseError, handleUnexpectedError } from '@/lib/api-errors';

/**
 * GET /api/contractor/analytics
 * Retrieves analytics dashboard data for authenticated contractor
 *
 * Returns:
 * - Overview metrics (views, bookings, ratings)
 * - Booking statistics (completed, in-progress, revenue)
 * - Rating breakdown and trends
 * - Recent activity
 * - Performance metrics
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { user } = authResult.context;

    // Validate user is contractor
    if (!requireRole(user, ['CONTRACTOR', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CONTRACTOR', 'ADMIN']);
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    // Get contractor profile
    const contractor = await db.contractor.findUnique({
      where: { userId: user.id },
      select: {
        id: true,
        businessName: true,
        profileViews: true,
        profileViewsThisMonth: true,
        lastProfileViewReset: true,
        directBookingRequests: true,
        quoteRequestCount: true,
        quoteAcceptanceRate: true,
        completedJobs: true,
        averageRating: true,
        averageResponseTimeMinutes: true,
        createdAt: true,
      },
    });

    if (!contractor) {
      return NextResponse.json({
        success: false,
        error: 'Contractor profile not found',
      }, { status: 404 });
    }

    // Get date ranges for time-based queries
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Fetch all analytics data in a single parallel batch
    const [
      totalBookings,
      completedBookings,
      activeBookings,
      cancelledBookings,
      bookingsThisMonth,
      bookingsLastMonth,
      bookingsLast30Days,
      recentBookings,
      totalRatings,
      ratingsLast30Days,
      ratingBreakdown,
      recentRatings,
    ] = await Promise.all([
      db.booking.count({ where: { contractorId: contractor.id } }),
      db.booking.count({ where: { contractorId: contractor.id, status: 'COMPLETED' } }),
      db.booking.count({
        where: { contractorId: contractor.id, status: { in: ['PENDING', 'CONFIRMED', 'IN_PROGRESS'] } },
      }),
      db.booking.count({
        where: { contractorId: contractor.id, status: { in: ['CANCELLED', 'DISPUTED'] } },
      }),
      db.booking.count({ where: { contractorId: contractor.id, createdAt: { gte: startOfMonth } } }),
      db.booking.count({
        where: { contractorId: contractor.id, createdAt: { gte: startOfLastMonth, lte: endOfLastMonth } },
      }),
      db.booking.count({ where: { contractorId: contractor.id, createdAt: { gte: thirtyDaysAgo } } }),
      db.booking.findMany({
        where: { contractorId: contractor.id },
        orderBy: { createdAt: 'desc' },
        take: 10,
        select: {
          id: true,
          status: true,
          australianServiceType: true,
          createdAt: true,
          scheduledDate: true,
          completedAt: true,
          finalCostAUD: true,
        },
      }),
      db.rating.count({ where: { contractorId: contractor.id } }),
      db.rating.count({ where: { contractorId: contractor.id, createdAt: { gte: thirtyDaysAgo } } }),
      db.rating.groupBy({ by: ['rating'], where: { contractorId: contractor.id }, _count: { rating: true } }),
      db.rating.findMany({
        where: { contractorId: contractor.id },
        orderBy: { createdAt: 'desc' },
        take: 10,
        select: { id: true, rating: true, comment: true, createdAt: true },
      }),
    ]);

    // Calculate rating distribution
    const ratingDistribution = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    ratingBreakdown.forEach((item: any) => {
      ratingDistribution[item.rating as keyof typeof ratingDistribution] = item._count.rating;
    });

    // Calculate percentage of 4-5 star ratings
    const positiveRatings = ratingDistribution[4] + ratingDistribution[5];
    const positiveRatingPercentage = totalRatings > 0
      ? Math.round((positiveRatings / totalRatings) * 100)
      : 0;

    // Calculate conversion rate (bookings / profile views)
    const conversionRate = contractor.profileViews > 0
      ? ((totalBookings / contractor.profileViews) * 100).toFixed(2)
      : '0.00';

    // Calculate month-over-month growth
    const bookingGrowth = bookingsLastMonth > 0
      ? (((bookingsThisMonth - bookingsLastMonth) / bookingsLastMonth) * 100).toFixed(1)
      : '0.0';

    // Calculate cancellation rate
    const cancellationRate = totalBookings > 0
      ? ((cancelledBookings / totalBookings) * 100).toFixed(1)
      : '0.0';

    // Calculate completion rate
    const completionRate = totalBookings > 0
      ? ((completedBookings / totalBookings) * 100).toFixed(1)
      : '0.0';

    // Get daily view trend (last 7 days) - simplified as we don't have daily tracking
    // In a production app, you'd store daily view counts in a separate analytics table
    const viewTrend = {
      last7Days: Math.max(0, contractor.profileViewsThisMonth - Math.floor(contractor.profileViewsThisMonth * 0.3)),
      percentageChange: '+0%', // Placeholder - would need historical data
    };

    return NextResponse.json({
      success: true,
      analytics: {
        overview: {
          profileViews: contractor.profileViews,
          profileViewsThisMonth: contractor.profileViewsThisMonth,
          totalBookings,
          completedBookings,
          activeBookings,
          averageRating: Number(contractor.averageRating),
          totalRatings,
          conversionRate: Number(conversionRate),
          memberSince: contractor.createdAt,
        },
        bookingStats: {
          total: totalBookings,
          completed: completedBookings,
          active: activeBookings,
          cancelled: cancelledBookings,
          thisMonth: bookingsThisMonth,
          lastMonth: bookingsLastMonth,
          last30Days: bookingsLast30Days,
          completionRate: Number(completionRate),
          cancellationRate: Number(cancellationRate),
          monthOverMonthGrowth: Number(bookingGrowth),
        },
        ratingStats: {
          totalRatings,
          averageRating: Number(contractor.averageRating),
          ratingsLast30Days,
          distribution: ratingDistribution,
          positiveRatingPercentage,
        },
        performance: {
          averageResponseTimeMinutes: contractor.averageResponseTimeMinutes,
          completedJobs: contractor.completedJobs,
          quoteRequestCount: contractor.quoteRequestCount,
          quoteAcceptanceRate: Number(contractor.quoteAcceptanceRate),
          directBookingRequests: contractor.directBookingRequests,
        },
        trends: {
          viewTrend,
          bookingGrowth: {
            thisMonth: bookingsThisMonth,
            lastMonth: bookingsLastMonth,
            percentageChange: bookingGrowth,
          },
        },
        recent: {
          bookings: recentBookings,
          ratings: recentRatings,
        },
      },
    });
  } catch (error) {
    console.error('Analytics fetch error:', error);
    return handleDatabaseError(error);
  }
}
