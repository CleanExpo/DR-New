/**
 * GET /api/contractor/analytics/dashboard
 * Get contractor-specific analytics including earnings and performance
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

    const contractorId = session.user.id;

    // Verify user is a contractor
    const contractor = await prisma.contractor.findUnique({
      where: { id: contractorId },
    });

    if (!contractor) {
      return NextResponse.json(
        { error: 'Contractor profile not found' },
        { status: 404 }
      );
    }

    // Earnings overview (all-time)
    const allPayments = await prisma.payment.findMany({
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

    const monthlyPayments = await prisma.payment.findMany({
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
    const completedJobs = await prisma.booking.count({
      where: {
        contractorId,
        status: 'COMPLETED',
      },
    });

    // Jobs in progress
    const activeJobs = await prisma.booking.count({
      where: {
        contractorId,
        status: {
          in: ['ACCEPTED', 'IN_PROGRESS'],
        },
      },
    });

    // Pending payouts
    const pendingPayments = await prisma.payment.findMany({
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

    // Performance metrics
    const completedBookings = await prisma.booking.findMany({
      where: {
        contractorId,
        status: 'COMPLETED',
      },
      select: {
        rating: true,
      },
    });

    const ratingsCount = completedBookings.filter((b) => b.rating).length;
    const averageRating =
      ratingsCount > 0
        ? completedBookings.filter((b) => b.rating).reduce((sum, b) => sum + (b.rating || 0), 0) / ratingsCount
        : 0;

    // Job acceptance rate
    const receivedJobs = await prisma.contractorMatch.count({
      where: {
        contractorId,
      },
    });

    const acceptedJobs = await prisma.booking.count({
      where: {
        contractorId,
        status: {
          not: 'REJECTED',
        },
      },
    });

    const acceptanceRate = receivedJobs > 0 ? (acceptedJobs / receivedJobs) * 100 : 0;

    // Earnings by service type (top 5)
    const earningsByServiceType = await prisma.booking.groupBy({
      by: ['australianServiceType'],
      _sum: {
        finalPrice: true,
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
          .sort((a, b) => (Number(b._sum.finalPrice || 0) - Number(a._sum.finalPrice || 0)))
          .slice(0, 5)
          .map((item) => ({
            serviceType: item.australianServiceType,
            earnings: Number(item._sum.finalPrice || 0),
            jobs: item._count,
          })),
      },
    });
  } catch (error) {
    console.error('[Contractor Analytics] Error fetching dashboard:', error);

    const message = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        error: 'Failed to fetch contractor analytics',
        details: message,
      },
      { status: 500 }
    );
  }
}
