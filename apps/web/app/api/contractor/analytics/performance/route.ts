/**
 * GET /api/contractor/analytics/performance
 * Get detailed contractor performance metrics
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getTenantDb } from '@/lib/get-tenant-db';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const contractorId = session.user.id;
    const { searchParams } = new URL(request.url);

    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');

    const endDate = endDateParam ? new Date(endDateParam) : new Date();
    const startDate = startDateParam
      ? new Date(startDateParam)
      : new Date(endDate.getTime() - 365 * 24 * 60 * 60 * 1000); // 1 year

    // Verify contractor exists
    const contractor = await db.contractor.findUnique({
      where: { id: contractorId },
    });

    if (!contractor) {
      return NextResponse.json(
        { error: 'Contractor profile not found' },
        { status: 404 }
      );
    }

    // Get all completed bookings in date range
    const completedBookings = await db.booking.findMany({
      where: {
        contractorId,
        status: 'COMPLETED',
        completedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        payments: {
          select: {
            amountAUD: true,
            status: true,
          },
        },
      },
    });

    // Get all matched jobs to calculate acceptance rate
    const matchedJobs = await db.contractorMatch.findMany({
      where: {
        contractorId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const acceptedMatches = completedBookings.length;
    const acceptanceRate = matchedJobs.length > 0 ? (acceptedMatches / matchedJobs.length) * 100 : 0;

    // Calculate time to completion metrics
    const bookingsWithTimes = completedBookings
      .filter((b) => b.acceptedAt && b.completedAt)
      .map((b) => ({
        timeInHours: (b.completedAt!.getTime() - b.acceptedAt!.getTime()) / (1000 * 60 * 60),
      }));

    const avgCompletionTime =
      bookingsWithTimes.length > 0
        ? bookingsWithTimes.reduce((sum, b) => sum + b.timeInHours, 0) / bookingsWithTimes.length
        : 0;

    // Ratings analysis
    const ratingsData = completedBookings.filter((b) => b.rating);
    const averageRating =
      ratingsData.length > 0 ? ratingsData.reduce((sum, b) => sum + (b.rating || 0), 0) / ratingsData.length : 0;

    const ratingDistribution = {
      five: ratingsData.filter((b) => b.rating === 5).length,
      four: ratingsData.filter((b) => b.rating === 4).length,
      three: ratingsData.filter((b) => b.rating === 3).length,
      two: ratingsData.filter((b) => b.rating === 2).length,
      one: ratingsData.filter((b) => b.rating === 1).length,
    };

    // Earnings summary
    const totalEarnings = completedBookings.reduce((sum, b) => {
      const jobEarnings = b.payments.reduce((jobSum, p) => jobSum + Number(p.amountAUD), 0);
      return sum + jobEarnings;
    }, 0);

    // Monthly earnings trend
    const monthlyEarnings: Record<string, number> = {};
    completedBookings.forEach((b) => {
      const monthKey = b.completedAt!.toISOString().substring(0, 7); // YYYY-MM
      const earnings = b.payments.reduce((sum, p) => sum + Number(p.amountAUD), 0);
      monthlyEarnings[monthKey] = (monthlyEarnings[monthKey] || 0) + earnings;
    });

    const monthlyTrend = Object.entries(monthlyEarnings)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, earnings]) => ({ month, earnings }));

    // Service type breakdown
    const serviceTypeBreakdown = await db.booking.groupBy({
      by: ['australianServiceType'],
      _count: true,
      where: {
        contractorId,
        status: 'COMPLETED',
        completedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    // Complaints/issues count
    const disputes = await db.payment.count({
      where: {
        booking: {
          contractorId,
        },
        status: 'REFUNDED',
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    return NextResponse.json({
      success: true,
      dateRange: {
        start: startDate,
        end: endDate,
      },
      summary: {
        jobsCompleted: completedBookings.length,
        totalEarnings: parseFloat(totalEarnings.toFixed(2)),
        acceptanceRate: parseFloat(acceptanceRate.toFixed(2)),
        avgCompletionTimeHours: parseFloat(avgCompletionTime.toFixed(2)),
        averageRating: parseFloat(averageRating.toFixed(2)),
        ratingsCount: ratingsData.length,
        disputes,
      },
      performance: {
        avgCompletionTimeHours: parseFloat(avgCompletionTime.toFixed(2)),
        acceptanceRate: parseFloat(acceptanceRate.toFixed(2)),
        averageRating: parseFloat(averageRating.toFixed(2)),
        ratingDistribution,
      },
      earnings: {
        total: parseFloat(totalEarnings.toFixed(2)),
        monthly: monthlyTrend.map((m) => ({
          month: m.month,
          amount: parseFloat(m.earnings.toFixed(2)),
        })),
      },
      services: {
        breakdown: serviceTypeBreakdown
          .sort((a, b) => b._count - a._count)
          .map((item) => ({
            serviceType: item.australianServiceType,
            jobsCompleted: item._count,
          })),
      },
    });
  } catch (error) {
    console.error('[Contractor Analytics] Error fetching performance data:', error);

    const message = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        error: 'Failed to fetch performance analytics',
        details: message,
      },
      { status: 500 }
    );
  }
}
