/**
 * Analytics Aggregator
 *
 * Handles periodic aggregation of metrics into daily, weekly, and monthly snapshots
 * Runs on a schedule (typically at midnight, end of week, and end of month)
 */

import { prisma } from '@/lib/prisma';
import { calculateDailyMetrics, aggregateMetrics, getMetricsForPeriod } from './metrics-engine';
import { eventProcessor } from './event-processor';

/**
 * Aggregate metrics for a specific day and store in database
 */
export async function aggregateDailyMetrics(date: Date): Promise<void> {
  try {
    console.log(`[Analytics] Starting daily aggregation for ${date.toISOString()}`);

    // Calculate metrics
    const snapshot = await calculateDailyMetrics(date);

    // Store in database — DRY: snapshot spread used for both create and update
    const snapshotDate = new Date(date.toISOString().split('T')[0]);
    const dailyMetric = await prisma.dailyMetrics.upsert({
      where: { date: snapshotDate },
      create: { date: snapshotDate, ...snapshot },
      update: { ...snapshot },
    });

    // Clear cache after aggregation
    await eventProcessor.clearCache(date);

    console.log(`[Analytics] Daily aggregation completed for ${date.toISOString()}`);
  } catch (error) {
    console.error(`[Analytics] Error in daily aggregation:`, error);
    throw error;
  }
}

/**
 * Aggregate metrics for a week and store in database
 */
export async function aggregateWeeklyMetrics(weekStartDate: Date): Promise<void> {
  try {
    console.log(`[Analytics] Starting weekly aggregation for ${weekStartDate.toISOString()}`);

    // Calculate week end date
    const weekEndDate = new Date(weekStartDate);
    weekEndDate.setDate(weekEndDate.getDate() + 6);

    // Get all daily metrics for the week
    const dailyMetrics = await prisma.dailyMetrics.findMany({
      where: {
        date: {
          gte: weekStartDate,
          lte: weekEndDate,
        },
      },
    });

    if (dailyMetrics.length === 0) {
      console.log('[Analytics] No daily metrics found for week');
      return;
    }

    // Convert to snapshots and aggregate
    const snapshots = dailyMetrics.map((dm) => ({
      totalRevenue: Number(dm.totalRevenue),
      platformFees: Number(dm.platformFees),
      contractorPayouts: Number(dm.contractorPayouts),
      jobsCompleted: dm.jobsCompleted,
      jobsRequested: dm.jobsRequested,
      avgCompletionTime: dm.avgCompletionTime,
      paymentSuccessRate: dm.paymentSuccessRate,
      paymentFailureCount: dm.paymentFailureCount,
      activeContractors: dm.activeContractors,
      activeClients: dm.activeClients,
      newContractors: dm.newContractors,
      newClients: dm.newClients,
      avgContractorEarnings: Number(dm.avgContractorEarnings),
      avgClientSpend: Number(dm.avgClientSpend),
      totalJobsInProgress: dm.totalJobsInProgress,
      avgJobValue: Number(dm.avgJobValue),
      totalServiceRequests: dm.totalServiceRequests,
    }));

    const aggregatedSnapshot = aggregateMetrics(snapshots);

    // Calculate trends
    const previousWeekStart = new Date(weekStartDate);
    previousWeekStart.setDate(previousWeekStart.getDate() - 7);
    const previousWeekEnd = new Date(weekStartDate);
    previousWeekEnd.setDate(previousWeekEnd.getDate() - 1);

    const previousWeekMetrics = await prisma.dailyMetrics.findMany({
      where: {
        date: {
          gte: previousWeekStart,
          lte: previousWeekEnd,
        },
      },
    });

    const trendAnalysis = calculateWeeklyTrends(snapshots, previousWeekMetrics);

    // Store in database
    await prisma.weeklyReport.create({
      data: {
        weekStartDate,
        weekEndDate,
        totalRevenue: aggregatedSnapshot.totalRevenue,
        platformFees: aggregatedSnapshot.platformFees,
        jobsCompleted: aggregatedSnapshot.jobsCompleted,
        avgCompletionTime: aggregatedSnapshot.avgCompletionTime,
        paymentSuccessRate: aggregatedSnapshot.paymentSuccessRate,
        metrics: aggregatedSnapshot,
        trendAnalysis,
        insights: generateWeeklyInsights(aggregatedSnapshot, trendAnalysis),
      },
    });

    console.log(`[Analytics] Weekly aggregation completed for ${weekStartDate.toISOString()}`);
  } catch (error) {
    console.error(`[Analytics] Error in weekly aggregation:`, error);
    throw error;
  }
}

/**
 * Aggregate metrics for a month and store in database
 */
export async function aggregateMonthlyMetrics(year: number, month: number): Promise<void> {
  try {
    console.log(`[Analytics] Starting monthly aggregation for ${year}-${month}`);

    const monthStart = new Date(year, month - 1, 1);
    const monthEnd = new Date(year, month, 0);

    // Get all daily metrics for the month
    const dailyMetrics = await prisma.dailyMetrics.findMany({
      where: {
        date: {
          gte: monthStart,
          lte: monthEnd,
        },
      },
    });

    if (dailyMetrics.length === 0) {
      console.log('[Analytics] No daily metrics found for month');
      return;
    }

    // Convert to snapshots and aggregate
    const snapshots = dailyMetrics.map((dm) => ({
      totalRevenue: Number(dm.totalRevenue),
      platformFees: Number(dm.platformFees),
      contractorPayouts: Number(dm.contractorPayouts),
      jobsCompleted: dm.jobsCompleted,
      jobsRequested: dm.jobsRequested,
      avgCompletionTime: dm.avgCompletionTime,
      paymentSuccessRate: dm.paymentSuccessRate,
      paymentFailureCount: dm.paymentFailureCount,
      activeContractors: dm.activeContractors,
      activeClients: dm.activeClients,
      newContractors: dm.newContractors,
      newClients: dm.newClients,
      avgContractorEarnings: Number(dm.avgContractorEarnings),
      avgClientSpend: Number(dm.avgClientSpend),
      totalJobsInProgress: dm.totalJobsInProgress,
      avgJobValue: Number(dm.avgJobValue),
      totalServiceRequests: dm.totalServiceRequests,
    }));

    const aggregatedSnapshot = aggregateMetrics(snapshots);

    // Calculate summary
    const summary = `
      Monthly Summary for ${monthStart.toLocaleString('en-AU', {
        month: 'long',
        year: 'numeric',
      })}

      Revenue: $${aggregatedSnapshot.totalRevenue.toLocaleString('en-AU')}
      Platform Fees: $${aggregatedSnapshot.platformFees.toLocaleString('en-AU')}
      Jobs Completed: ${aggregatedSnapshot.jobsCompleted}
      Success Rate: ${aggregatedSnapshot.paymentSuccessRate}%
    `.trim();

    // Store in database
    await prisma.monthlyMetrics.upsert({
      where: { month_year: { month, year } },
      create: {
        month,
        year,
        totalRevenue: aggregatedSnapshot.totalRevenue,
        platformFees: aggregatedSnapshot.platformFees,
        jobsCompleted: aggregatedSnapshot.jobsCompleted,
        avgCompletionTime: aggregatedSnapshot.avgCompletionTime,
        paymentSuccessRate: aggregatedSnapshot.paymentSuccessRate,
        metrics: aggregatedSnapshot,
        summary,
      },
      update: {
        totalRevenue: aggregatedSnapshot.totalRevenue,
        platformFees: aggregatedSnapshot.platformFees,
        jobsCompleted: aggregatedSnapshot.jobsCompleted,
        avgCompletionTime: aggregatedSnapshot.avgCompletionTime,
        paymentSuccessRate: aggregatedSnapshot.paymentSuccessRate,
        metrics: aggregatedSnapshot,
        summary,
      },
    });

    console.log(`[Analytics] Monthly aggregation completed for ${year}-${month}`);
  } catch (error) {
    console.error(`[Analytics] Error in monthly aggregation:`, error);
    throw error;
  }
}

/**
 * Calculate weekly trends by comparing to previous week
 */
function calculateWeeklyTrends(
  currentWeek: any[],
  previousWeek: any[]
): Record<string, any> {
  const currentSum = {
    revenue: currentWeek.reduce((sum, m) => sum + m.totalRevenue, 0),
    jobs: currentWeek.reduce((sum, m) => sum + m.jobsCompleted, 0),
  };

  const previousSum = {
    revenue: previousWeek.length
      ? previousWeek.reduce((sum, m) => sum + Number(m.totalRevenue), 0)
      : 0,
    jobs: previousWeek.length
      ? previousWeek.reduce((sum, m) => sum + m.jobsCompleted, 0)
      : 0,
  };

  return {
    revenueChange: previousSum.revenue
      ? (
          ((currentSum.revenue - previousSum.revenue) / previousSum.revenue) *
          100
        ).toFixed(2)
      : 0,
    jobsChange: previousSum.jobs
      ? (((currentSum.jobs - previousSum.jobs) / previousSum.jobs) * 100).toFixed(2)
      : 0,
  };
}

/**
 * Generate weekly insights based on metrics
 */
function generateWeeklyInsights(snapshot: any, trends: any): string[] {
  const insights: string[] = [];

  // Revenue insights
  if (snapshot.totalRevenue > 0) {
    insights.push(`Total revenue: $${snapshot.totalRevenue.toLocaleString('en-AU')}`);
  }

  // Jobs insights
  if (snapshot.jobsCompleted > 0) {
    insights.push(`Jobs completed: ${snapshot.jobsCompleted}`);
  }

  // Performance insights
  if (snapshot.paymentSuccessRate > 95) {
    insights.push('Excellent payment success rate');
  } else if (snapshot.paymentSuccessRate < 80) {
    insights.push('Payment success rate below target');
  }

  // Growth insights
  if (trends.revenueChange > 0) {
    insights.push(`Revenue growth: ${trends.revenueChange}% vs previous week`);
  }

  return insights;
}

/**
 * Run all aggregation jobs (typically called by a cron job)
 */
/**
 * Run all aggregation jobs — independent tasks are executed in parallel via Promise.all.
 * Complexity: O(1) wall-clock for the parallel branch regardless of how many jobs run.
 */
export async function runAggregationJobs(): Promise<void> {
  try {
    const now = new Date();

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    // Collect all jobs that should run now
    const jobs: Promise<void>[] = [aggregateDailyMetrics(yesterday)];

    if (now.getDay() === 1) {
      const weekStart = new Date(now);
      weekStart.setDate(weekStart.getDate() - 7);
      weekStart.setHours(0, 0, 0, 0);
      jobs.push(aggregateWeeklyMetrics(weekStart));
    }

    if (now.getDate() === 1) {
      const lastMonth = new Date(now);
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      jobs.push(aggregateMonthlyMetrics(lastMonth.getFullYear(), lastMonth.getMonth() + 1));
    }

    // Run all independent jobs concurrently
    await Promise.all(jobs);
  } catch (error) {
    console.error('[Analytics] Error running aggregation jobs:', error);
  }
}
