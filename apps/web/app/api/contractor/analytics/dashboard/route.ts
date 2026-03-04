/**
 * GET /api/contractor/analytics/dashboard
 * Get contractor-specific analytics including earnings and performance
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
    const contractorId = user.id;

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    // Verify user is a contractor - automatically tenant-scoped
    const contractor = await db.contractor.findUnique({
      where: { id: contractorId },
    });

    if (!contractor) {
      return NextResponse.json(
        { error: 'Contractor profile not found' },
        { status: 404 }
      );
    }

    // Earnings overview (all-time) - automatically tenant-scoped
    const allPayments = await db.payment.findMany({
      where: {
        booking: {
          contractorId,
        },
        status: 'COMPLETED',
      },
    });

    const totalEarnings = allPayments.reduce((sum, p) => sum + Number(p.amountAUD), 0);
    const averageEarningPerJob = allPayments.length > 0 ? totalEarnings / allPayments.length : 0;

    // This month's earnings
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const monthlyPayments = await db.payment.findMany({
      where: {
        booking: {
          contractorId,
        },
        status: 'COMPLETED',
        createdAt: {
          gte: monthStart,
          lte: monthEnd,
        },
      },
    });

    const monthlyEarnings = monthlyPayments.reduce((sum, p) => sum + Number(p.amountAUD), 0);

    // Jobs completed
    const completedJobs = await db.booking.count({
      where: {
        contractorId,
        status: 'COMPLETED',
      },
    });

    // Jobs in progress
    const activeJobs = await db.booking.count({
      where: {
        contractorId,
        status: {
          in: ['CONFIRMED', 'IN_PROGRESS'],
        },
      },
    });

    // Pending payouts
    const pendingPayments = await db.payment.findMany({
      where: {
        booking: {
          contractorId,
        },
        status: {
          in: ['PENDING', 'PROCESSING'],
        },
      },
    });

    const pendingPayouts = pendingPayments.reduce((sum, p) => sum + Number(p.amountAUD), 0);

    // Performance metrics - get ratings through the ratings relation
    const completedBookings = await db.booking.findMany({
      where: {
        contractorId,
        status: 'COMPLETED',
      },
      select: {
        ratings: {
          select: { rating: true },
        },
      },
    });

    // Flatten all ratings from all bookings
    const allRatings = completedBookings.flatMap((b) => b.ratings.map((r) => r.rating));
    const ratingsCount = allRatings.length;
    const averageRating =
      ratingsCount > 0
        ? allRatings.reduce((sum, r) => sum + r, 0) / ratingsCount
        : 0;

    // Job acceptance rate
    const receivedJobs = await db.contractorMatch.count({
      where: {
        contractorId,
      },
    });

    const acceptedJobs = await db.booking.count({
      where: {
        contractorId,
        status: {
          not: 'CANCELLED',
        },
      },
    });

    const acceptanceRate = receivedJobs > 0 ? (acceptedJobs / receivedJobs) * 100 : 0;

    // Earnings by service type (top 5)
    const earningsByServiceType = await db.booking.groupBy({
      by: ['australianServiceType'],
      _sum: {
        finalCostAUD: true,
      },
      _count: true,
      where: {
        contractorId,
        status: 'COMPLETED',
      },
    });

    return NextResponse.json({
      success: true,
      overview: {
        totalEarnings: parseFloat(totalEarnings.toFixed(2)),
        monthlyEarnings: parseFloat(monthlyEarnings.toFixed(2)),
        averageEarningPerJob: parseFloat(averageEarningPerJob.toFixed(2)),
        completedJobs,
        activeJobs,
        pendingPayouts: parseFloat(pendingPayouts.toFixed(2)),
      },
      performance: {
        averageRating: parseFloat(averageRating.toFixed(2)),
        ratingsCount,
        acceptanceRate: parseFloat(acceptanceRate.toFixed(2)),
      },
      earnings: {
        byServiceType: earningsByServiceType
          .sort((a, b) => (Number(b._sum?.finalCostAUD || 0) - Number(a._sum?.finalCostAUD || 0)))
          .slice(0, 5)
          .map((item) => ({
            serviceType: item.australianServiceType,
            earnings: Number(item._sum?.finalCostAUD || 0),
            jobs: item._count,
          })),
      },
    });
  } catch (error) {
    console.error('[Contractor Analytics] Error fetching dashboard:', error);

    return NextResponse.json(
      { error: 'Failed to fetch contractor analytics' },
      { status: 500 }
    );
  }
}
