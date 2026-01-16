/**
 * GET /api/client/analytics/dashboard
 * Get client-specific analytics including spending and service quality
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const clientId = session.user.id;

    // Spending overview
    const allPayments = await prisma.payment.findMany({
      where: {
        clientId,
        status: 'COMPLETED',
      },
    });

    const totalSpent = allPayments.reduce((sum, p) => sum + Number(p.amountAUD), 0);
    const averageSpend = allPayments.length > 0 ? totalSpent / allPayments.length : 0;

    // Jobs completed
    const completedJobs = await prisma.booking.count({
      where: {
        clientId,
        status: 'COMPLETED',
      },
    });

    // Service requests
    const activeServiceRequests = await prisma.serviceRequest.count({
      where: {
        clientId,
        status: {
          in: ['OPEN', 'MATCHED', 'ACCEPTED'],
        },
      },
    });

    // Upcoming bookings
    const upcomingBookings = await prisma.booking.count({
      where: {
        clientId,
        status: {
          in: ['ACCEPTED', 'IN_PROGRESS'],
        },
      },
    });

    // Spending by month (last 12 months)
    const monthlySpending = await prisma.payment.groupBy({
      by: [],
      _sum: {
        amountAUD: true,
      },
      where: {
        clientId,
        status: 'COMPLETED',
        createdAt: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 12)),
        },
      },
    });

    // Spending by service type
    const spendingByServiceType = await prisma.booking.groupBy({
      by: ['australianServiceType'],
      _sum: {
        finalPrice: true,
      },
      _count: true,
      where: {
        clientId,
        status: 'COMPLETED',
      },
    });

    // Service quality metrics
    const bookingsWithRatings = await prisma.booking.findMany({
      where: {
        clientId,
        status: 'COMPLETED',
      },
      select: {
        id: true,
        rating: true,
      },
    });

    const averageRating =
      bookingsWithRatings.length > 0
        ? bookingsWithRatings.filter((b) => b.rating).reduce((sum, b) => sum + (b.rating || 0), 0) /
          bookingsWithRatings.length
        : 0;

    // Refunds/disputes
    const disputedPayments = await prisma.payment.count({
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
          amount: Number(item._sum.finalPrice || 0),
          count: item._count,
        })),
        monthlyTotal: monthlySpending[0]?._sum.amountAUD
          ? Number(monthlySpending[0]._sum.amountAUD)
          : 0,
      },
      quality: {
        averageRating: parseFloat(averageRating.toFixed(2)),
        ratingsCount: bookingsWithRatings.filter((b) => b.rating).length,
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
