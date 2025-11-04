import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { startOfMonth, endOfMonth, subMonths, differenceInDays } from 'date-fns';

/**
 * GET /api/admin/onboarding/analytics
 * Fetch onboarding analytics data
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const now = new Date();
    const thisMonthStart = startOfMonth(now);
    const lastMonthStart = startOfMonth(subMonths(now, 1));
    const lastMonthEnd = endOfMonth(subMonths(now, 1));

    // Applications this month
    const applicationsThisMonth = await prisma.contractor.count({
      where: {
        createdAt: {
          gte: thisMonthStart
        }
      }
    });

    // Applications last month
    const applicationsLastMonth = await prisma.contractor.count({
      where: {
        createdAt: {
          gte: lastMonthStart,
          lte: lastMonthEnd
        }
      }
    });

    // Monthly growth
    const monthlyGrowth = applicationsLastMonth > 0
      ? ((applicationsThisMonth - applicationsLastMonth) / applicationsLastMonth) * 100
      : 0;

    // Average approval time
    const approvedContractors = await prisma.contractor.findMany({
      where: {
        status: 'APPROVED',
        approvedAt: { not: null }
      },
      select: {
        createdAt: true,
        approvedAt: true
      }
    });

    const approvalTimes = approvedContractors.map(c =>
      differenceInDays(c.approvedAt!, c.createdAt)
    );
    const averageApprovalTime = approvalTimes.length > 0
      ? approvalTimes.reduce((a, b) => a + b, 0) / approvalTimes.length
      : 0;

    // Approval rate
    const totalApplications = await prisma.contractor.count({
      where: {
        status: { in: ['APPROVED', 'REJECTED'] }
      }
    });
    const approvedApplications = await prisma.contractor.count({
      where: { status: 'APPROVED' }
    });
    const approvalRate = totalApplications > 0
      ? (approvedApplications / totalApplications) * 100
      : 0;

    // Top rejection reasons
    const rejectedApplications = await prisma.contractor.findMany({
      where: {
        status: 'REJECTED',
        rejectionReason: { not: null }
      },
      select: {
        rejectionReason: true
      }
    });

    const reasonCounts = rejectedApplications.reduce((acc: any, app) => {
      const reason = app.rejectionReason || 'OTHER';
      acc[reason] = (acc[reason] || 0) + 1;
      return acc;
    }, {});

    const topRejectionReasons = Object.entries(reasonCounts)
      .map(([reason, count]) => ({
        reason,
        count: count as number,
        percentage: totalApplications > 0 ? ((count as number) / rejectedApplications.length) * 100 : 0
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Applications by service type (placeholder)
    const applicationsByServiceType = [
      { serviceType: 'Water Damage', count: 15 },
      { serviceType: 'Fire Damage', count: 8 },
      { serviceType: 'Mould Remediation', count: 12 },
      { serviceType: 'Storm Damage', count: 6 },
    ];

    // Applications by state (placeholder)
    const applicationsByState = [
      { state: 'QLD', count: 20 },
      { state: 'NSW', count: 12 },
      { state: 'VIC', count: 8 },
      { state: 'WA', count: 5 },
    ];

    // Recent approvals
    const recentApprovals = await prisma.contractor.findMany({
      where: { status: 'APPROVED' },
      include: {
        companyProfile: true
      },
      orderBy: { approvedAt: 'desc' },
      take: 10
    });

    // Recent rejections
    const recentRejections = await prisma.contractor.findMany({
      where: { status: 'REJECTED' },
      include: {
        companyProfile: true
      },
      orderBy: { rejectedAt: 'desc' },
      take: 10
    });

    // Applications over time (last 30 days)
    const applicationsOverTime: { date: string; count: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dayStart = new Date(date.setHours(0, 0, 0, 0));
      const dayEnd = new Date(date.setHours(23, 59, 59, 999));

      const count = await prisma.contractor.count({
        where: {
          createdAt: {
            gte: dayStart,
            lte: dayEnd
          }
        }
      });

      applicationsOverTime.push({
        date: dayStart.toISOString().split('T')[0],
        count
      });
    }

    return NextResponse.json({
      applicationsThisMonth,
      applicationsLastMonth,
      monthlyGrowth,
      averageApprovalTime,
      averageApprovalTimeChange: 0, // TODO: Calculate vs previous period
      approvalRate,
      approvalRateChange: 0, // TODO: Calculate vs previous period
      topRejectionReasons,
      applicationsByServiceType,
      applicationsByState,
      recentApprovals,
      recentRejections,
      applicationsOverTime
    });

  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
