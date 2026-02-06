/**
 * GET /api/client/analytics/dashboard
 * Get client-specific analytics including spending and service quality
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';

export async function GET(request: NextRequest) {
  try {
    // Authenticate and get tenant context
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    const clientId = user.id;

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    // Spending overview - automatically tenant-scoped
    const allPayments = await db.payment.findMany({
      where: {
        clientId,
        status: 'COMPLETED',
      },
    });

    const totalSpent = allPayments.reduce((sum, p) => sum + Number(p.amountAUD), 0);
    const averageSpend = allPayments.length > 0 ? totalSpent / allPayments.length : 0;

    // Jobs completed - automatically tenant-scoped
    const completedJobs = await db.booking.count({
      where: {
        clientId,
        status: 'COMPLETED',
      },
    });

    // Service requests - automatically tenant-scoped
    const activeServiceRequests = await db.serviceRequest.count({
      where: {
        clientId,
        status: {
          in: ['PENDING', 'MATCHED', 'IN_PROGRESS'],
        },
      },
    });

    // Upcoming bookings - automatically tenant-scoped
    const upcomingBookings = await db.booking.count({
      where: {
        clientId,
        status: {
          in: ['CONFIRMED', 'IN_PROGRESS'],
        },
      },
    });

    // Spending by month (last 12 months) - automatically tenant-scoped
    const monthlyPayments = await db.payment.findMany({
      where: {
        clientId,
        status: 'COMPLETED',
        createdAt: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 12)),
        },
      },
      select: {
        amountAUD: true,
      },
    });
    const monthlyTotal = monthlyPayments.reduce((sum, p) => sum + Number(p.amountAUD), 0);

    // Spending by service type - automatically tenant-scoped
    const spendingByServiceType = await db.booking.groupBy({
      by: ['australianServiceType'],
      _sum: {
        finalCostAUD: true,
      },
      _count: true,
      where: {
        clientId,
        status: 'COMPLETED',
      },
    });

    // Service quality metrics - automatically tenant-scoped
    const bookingsWithRatings = await db.booking.findMany({
      where: {
        clientId,
        status: 'COMPLETED',
      },
      select: {
        id: true,
        ratings: {
          select: {
            rating: true,
          },
        },
      },
    });

    // Calculate average rating from ratings relation
    const allRatings = bookingsWithRatings.flatMap((b) => b.ratings.map((r) => r.rating));
    const averageRating =
      allRatings.length > 0
        ? allRatings.reduce((sum, r) => sum + r, 0) / allRatings.length
        : 0;

    // Refunds/disputes - automatically tenant-scoped
    const disputedPayments = await db.payment.count({
      where: {
        clientId,
        status: 'REFUNDED',
      },
    });

    return NextResponse.json({
      success: true,
      overview: {
        totalSpent: parseFloat(totalSpent.toFixed(2)),
        averageSpend: parseFloat(averageSpend.toFixed(2)),
        jobsCompleted: completedJobs,
        activeServiceRequests,
        upcomingBookings,
      },
      spending: {
        total: allPayments.length,
        byServiceType: spendingByServiceType.map((item) => ({
          serviceType: item.australianServiceType,
          amount: Number(item._sum?.finalCostAUD || 0),
          count: item._count,
        })),
        monthlyTotal: monthlyTotal,
      },
      quality: {
        averageRating: parseFloat(averageRating.toFixed(2)),
        ratingsCount: allRatings.length,
        disputes: disputedPayments,
      },
    });
  } catch (error) {
    console.error('[Client Analytics] Error fetching dashboard:', error);

    const message = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        error: 'Failed to fetch client analytics',
        details: message,
      },
      { status: 500 }
    );
  }
}
