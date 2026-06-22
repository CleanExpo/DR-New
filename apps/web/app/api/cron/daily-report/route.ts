
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isValidCronRequest(request: NextRequest): boolean {
  const cronSecret =
    request.headers.get('x-vercel-cron-secret') ||
    request.headers.get('authorization')?.replace('Bearer ', '');
  const expectedSecret = process.env.CRON_SECRET;

  if (process.env.NODE_ENV === 'development' && !expectedSecret) {
    return true;
  }

  if (!expectedSecret) return false;
  return cronSecret === expectedSecret;
}

export async function GET(request: NextRequest) {
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const prisma = new PrismaClient();

  try {
    // Gather daily metrics
    const [newBookings, completedBookings, newContractors, agentJobStats, activeUsers] =
      await Promise.all([
        // New bookings yesterday
        prisma.booking.count({
          where: {
            createdAt: { gte: yesterday, lt: today },
          },
        }),
        // Completed bookings yesterday
        prisma.booking.count({
          where: {
            status: 'COMPLETED',
            updatedAt: { gte: yesterday, lt: today },
          },
        }),
        // New contractors registered
        prisma.contractor.count({
          where: {
            createdAt: { gte: yesterday, lt: today },
          },
        }),
        // Agent job statistics
        prisma.agentJob.groupBy({
          by: ['status'],
          where: {
            createdAt: { gte: yesterday, lt: today },
          },
          _count: true,
        }),
        // Active users (logged in yesterday)
        prisma.user.count({
          where: {
            lastLoginAt: { gte: yesterday, lt: today },
          },
        }),
      ]);

    const report = {
      date: yesterday.toISOString().split('T')[0],
      generatedAt: new Date().toISOString(),
      metrics: {
        bookings: {
          new: newBookings,
          completed: completedBookings,
        },
        contractors: {
          newRegistrations: newContractors,
        },
        agentJobs: agentJobStats.reduce(
          (acc, stat) => {
            acc[stat.status.toLowerCase()] = stat._count;
            return acc;
          },
          {} as Record<string, number>
        ),
        users: {
          activeYesterday: activeUsers,
        },
      },
    };

    // Log report for monitoring
    console.log('Daily report generated:', JSON.stringify(report, null, 2));

    // Store report in cloud storage for dashboard access
    try {
      const { uploadFile } = await import('@/lib/storage/cloud-storage');
      const reportKey = `reports/daily/${report.date}.json`;
      const reportContent = JSON.stringify(report, null, 2);

      await uploadFile(reportKey, reportContent, {
        contentType: 'application/json',
        cacheControl: 'private, max-age=86400', // 24 hours
        metadata: {
          type: 'daily-report',
          date: report.date,
          generatedAt: report.generatedAt,
        },
      });

      console.log(`[Daily Report] Stored report to ${reportKey}`);
    } catch (storageError) {
      // Log error but don't fail the cron job
      console.error('[Daily Report] Error storing report:', storageError);
    }

    return NextResponse.json({
      success: true,
      report,
    });
  } catch (error) {
    console.error('Daily report cron error:', error);
    return NextResponse.json(
      {
        error: 'Report generation failed',
        message: 'Internal server error',
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
