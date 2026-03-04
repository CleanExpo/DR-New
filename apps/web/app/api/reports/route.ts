/**
 * GET /api/reports
 * Management reporting — job completion, revenue, contractor performance
 * Requires ADMIN or SUPER_ADMIN role
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) return authResult.response;

    const { user } = authResult.context;
    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN']);
    }

    // Jobs by status
    const jobsByStatus = await prisma.job.groupBy({
      by: ['status'],
      _count: { id: true },
    });

    const statusCounts: Record<string, number> = {};
    let totalJobs = 0;
    for (const row of jobsByStatus) {
      statusCounts[row.status] = row._count.id;
      totalJobs += row._count.id;
    }

    // Average completion time (days) for COMPLETED, INVOICED, PAID jobs
    const completedJobs = await prisma.job.findMany({
      where: {
        status: { in: ['COMPLETED', 'INVOICED', 'PAID'] },
        completedDate: { not: null },
      },
      select: { createdAt: true, completedDate: true },
    });

    let avgCompletionDays = 0;
    if (completedJobs.length > 0) {
      const totalDays = completedJobs.reduce((sum, job) => {
        const diff = (job.completedDate!.getTime() - job.createdAt.getTime()) / (1000 * 60 * 60 * 24);
        return sum + diff;
      }, 0);
      avgCompletionDays = Math.round((totalDays / completedJobs.length) * 10) / 10;
    }

    // Revenue by month (last 6 months) from jobs with actualCost
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const revenueJobs = await prisma.job.findMany({
      where: {
        actualCost: { not: null },
        completedDate: { gte: sixMonthsAgo },
        status: { in: ['COMPLETED', 'INVOICED', 'PAID'] },
      },
      select: { actualCost: true, completedDate: true },
    });

    const revenueByMonth: Array<{ month: string; revenue: number }> = [];
    const monthMap = new Map<string, number>();

    for (const job of revenueJobs) {
      if (!job.completedDate || !job.actualCost) continue;
      const key = `${job.completedDate.getFullYear()}-${String(job.completedDate.getMonth() + 1).padStart(2, '0')}`;
      monthMap.set(key, (monthMap.get(key) || 0) + Number(job.actualCost));
    }

    // Fill in all 6 months (including zero-revenue months)
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      revenueByMonth.push({
        month: `${monthNames[d.getMonth()]} ${d.getFullYear()}`,
        revenue: Math.round((monthMap.get(key) || 0) * 100) / 100,
      });
    }

    const totalRevenue = revenueByMonth.reduce((sum, m) => sum + m.revenue, 0);

    // Outstanding invoices (INVOICED status)
    const outstandingJobs = await prisma.job.findMany({
      where: { status: 'INVOICED' },
      select: {
        id: true,
        jobNumber: true,
        actualCost: true,
        estimatedCost: true,
        completedDate: true,
        property: {
          select: { streetAddress: true, suburb: true },
        },
      },
      orderBy: { completedDate: 'asc' },
    });

    const now = new Date();
    const outstandingInvoices = outstandingJobs.map((job) => {
      const amount = Number(job.actualCost || job.estimatedCost || 0);
      const daysOutstanding = job.completedDate
        ? Math.floor((now.getTime() - job.completedDate.getTime()) / (1000 * 60 * 60 * 24))
        : 0;
      return {
        id: job.id,
        jobNumber: job.jobNumber,
        property: `${job.property.streetAddress}, ${job.property.suburb}`,
        amount,
        daysOutstanding,
      };
    });

    const outstandingTotal = outstandingInvoices.reduce((sum, inv) => sum + inv.amount, 0);

    // Top performing contractors
    const contractors = await prisma.contractor.findMany({
      where: {
        jobs: { some: { status: { in: ['COMPLETED', 'INVOICED', 'PAID'] } } },
      },
      select: {
        id: true,
        businessName: true,
        averageRating: true,
        jobs: {
          where: { status: { in: ['COMPLETED', 'INVOICED', 'PAID'] } },
          select: {
            actualCost: true,
            createdAt: true,
            completedDate: true,
          },
        },
      },
    });

    const contractorPerformance = contractors
      .map((c) => {
        const jobCount = c.jobs.length;
        const totalRev = c.jobs.reduce((sum, j) => sum + Number(j.actualCost || 0), 0);
        const completionTimes = c.jobs
          .filter((j) => j.completedDate)
          .map((j) => (j.completedDate!.getTime() - j.createdAt.getTime()) / (1000 * 60 * 60 * 24));
        const avgDays = completionTimes.length > 0
          ? Math.round((completionTimes.reduce((a, b) => a + b, 0) / completionTimes.length) * 10) / 10
          : 0;

        return {
          id: c.id,
          businessName: c.businessName,
          jobsCompleted: jobCount,
          avgCompletionDays: avgDays,
          totalRevenue: Math.round(totalRev * 100) / 100,
          avgRating: Number(c.averageRating),
        };
      })
      .sort((a, b) => b.jobsCompleted - a.jobsCompleted)
      .slice(0, 10);

    return NextResponse.json({
      success: true,
      data: {
        summary: {
          totalJobs,
          avgCompletionDays,
          totalRevenue: Math.round(totalRevenue * 100) / 100,
          outstandingAmount: Math.round(outstandingTotal * 100) / 100,
        },
        jobsByStatus: statusCounts,
        revenueByMonth,
        outstandingInvoices,
        contractorPerformance,
      },
    });
  } catch (error) {
    console.error('[Reports] Error generating report:', error);
    return NextResponse.json(
      { error: 'Failed to generate report' },
      { status: 500 }
    );
  }
}
