/**
 * Analytics Metrics Engine
 *
 * Calculates and manages real-time metrics for the platform
 * Handles financial, operational, contractor, and client metrics
 */

import { prisma } from '@/lib/prisma';
import { Decimal } from '@prisma/client/runtime/library';

export interface MetricsSnapshot {
  // Financial
  totalRevenue: number;
  platformFees: number;
  contractorPayouts: number;

  // Operational
  jobsCompleted: number;
  jobsRequested: number;
  avgCompletionTime: number;
  paymentSuccessRate: number;
  paymentFailureCount: number;

  // Users
  activeContractors: number;
  activeClients: number;
  newContractors: number;
  newClients: number;
  avgContractorEarnings: number;
  avgClientSpend: number;

  // Services
  totalJobsInProgress: number;
  avgJobValue: number;
  totalServiceRequests: number;
}

export interface MetricsPeriod {
  startDate: Date;
  endDate: Date;
  snapshot: MetricsSnapshot;
}

export interface TrendData {
  metric: string;
  current: number;
  previous: number;
  percentageChange: number;
  trend: 'up' | 'down' | 'flat';
}

/**
 * Calculate all metrics for a given date
 */
export async function calculateDailyMetrics(date: Date): Promise<MetricsSnapshot> {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  // Get all payments from Stripe
  const payments = await prisma.payment.findMany({
    where: {
      createdAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

  // Get all bookings completed today
  const completedBookings = await prisma.booking.findMany({
    where: {
      completedAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    include: {
      contractorMatch: true,
      serviceRequest: true,
    },
  });

  // Get all service requests created today
  const newServiceRequests = await prisma.serviceRequest.findMany({
    where: {
      createdAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

  // Calculate financial metrics
  const totalRevenue = payments
    .filter((p) => p.status === 'COMPLETED')
    .reduce((sum, p) => sum + Number(p.amountAUD), 0);

  const platformFees = Number((totalRevenue * 0.2).toFixed(2)); // 20% platform fee
  const contractorPayouts = Number((totalRevenue * 0.8).toFixed(2)); // 80% to contractors

  // Calculate operational metrics
  const jobsCompleted = completedBookings.length;
  const jobsRequested = newServiceRequests.length;

  // Calculate average completion time
  const completionTimes = completedBookings
    .map((b) => {
      if (b.acceptedAt && b.completedAt) {
        return (
          (b.completedAt.getTime() - b.acceptedAt.getTime()) /
          (1000 * 60)
        ); // minutes
      }
      return 0;
    })
    .filter((t) => t > 0);

  const avgCompletionTime =
    completionTimes.length > 0
      ? Math.round(
          completionTimes.reduce((a, b) => a + b, 0) /
          completionTimes.length
        )
      : 0;

  // Calculate payment success rate
  const successfulPayments = payments.filter((p) => p.status === 'COMPLETED').length;
  const totalPaymentAttempts = payments.filter(
    (p) => p.status === 'COMPLETED' || p.status === 'FAILED'
  ).length;
  const paymentSuccessRate =
    totalPaymentAttempts > 0
      ? Number(((successfulPayments / totalPaymentAttempts) * 100).toFixed(2))
      : 0;

  const paymentFailureCount = payments.filter((p) => p.status === 'FAILED').length;

  // Calculate user metrics
  const activeContractors = await prisma.contractor.count({
    where: {
      isVerified: true,
      isActive: true,
    },
  });

  const activeClients = await prisma.user.count({
    where: {
      role: 'CLIENT',
      emailVerified: true,
    },
  });

  // Get new users today
  const newContractors = await prisma.contractor.count({
    where: {
      createdAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

  const newClients = await prisma.user.count({
    where: {
      role: 'CLIENT',
      createdAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

  // Calculate average earnings and spend
  const contractorEarnings = completedBookings
    .map((b) => {
      const amount = Number(b.finalPrice) || 0;
      return amount * 0.8; // Contractor gets 80%
    })
    .filter((a) => a > 0);

  const avgContractorEarnings =
    contractorEarnings.length > 0
      ? Number(
          (
            contractorEarnings.reduce((a, b) => a + b, 0) /
            contractorEarnings.length
          ).toFixed(2)
        )
      : 0;

  const avgClientSpend =
    totalPaymentAttempts > 0
      ? Number((totalRevenue / totalPaymentAttempts).toFixed(2))
      : 0;

  // Calculate service metrics
  const jobsInProgress = await prisma.booking.count({
    where: {
      status: 'IN_PROGRESS',
    },
  });

  const avgJobValue =
    completedBookings.length > 0
      ? Number(
          (
            completedBookings.reduce((sum, b) => sum + Number(b.finalPrice || 0), 0) /
            completedBookings.length
          ).toFixed(2)
        )
      : 0;

  return {
    totalRevenue: Number(totalRevenue.toFixed(2)),
    platformFees: Number(platformFees.toFixed(2)),
    contractorPayouts: Number(contractorPayouts.toFixed(2)),
    jobsCompleted,
    jobsRequested,
    avgCompletionTime,
    paymentSuccessRate,
    paymentFailureCount,
    activeContractors,
    activeClients,
    newContractors,
    newClients,
    avgContractorEarnings,
    avgClientSpend,
    totalJobsInProgress: jobsInProgress,
    avgJobValue,
    totalServiceRequests: newServiceRequests.length,
  };
}

/**
 * Calculate trend between two time periods
 */
export function calculateTrend(
  current: number,
  previous: number
): TrendData['trend'] {
  if (current > previous) return 'up';
  if (current < previous) return 'down';
  return 'flat';
}

/**
 * Calculate percentage change between two values
 */
export function calculatePercentageChange(
  current: number,
  previous: number
): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Number((((current - previous) / previous) * 100).toFixed(2));
}

/**
 * Get metrics for a specific period
 */
export async function getMetricsForPeriod(
  startDate: Date,
  endDate: Date
): Promise<MetricsPeriod[]> {
  const current = new Date(startDate);
  const results: MetricsPeriod[] = [];

  while (current <= endDate) {
    const snapshot = await calculateDailyMetrics(current);
    results.push({
      startDate: new Date(current),
      endDate: new Date(current),
      snapshot,
    });

    current.setDate(current.getDate() + 1);
  }

  return results;
}

/**
 * Aggregate metrics across a period
 */
export function aggregateMetrics(metrics: MetricsSnapshot[]): MetricsSnapshot {
  if (metrics.length === 0) {
    return {
      totalRevenue: 0,
      platformFees: 0,
      contractorPayouts: 0,
      jobsCompleted: 0,
      jobsRequested: 0,
      avgCompletionTime: 0,
      paymentSuccessRate: 0,
      paymentFailureCount: 0,
      activeContractors: 0,
      activeClients: 0,
      newContractors: 0,
      newClients: 0,
      avgContractorEarnings: 0,
      avgClientSpend: 0,
      totalJobsInProgress: 0,
      avgJobValue: 0,
      totalServiceRequests: 0,
    };
  }

  return {
    totalRevenue: Number(
      (metrics.reduce((sum, m) => sum + m.totalRevenue, 0)).toFixed(2)
    ),
    platformFees: Number(
      (metrics.reduce((sum, m) => sum + m.platformFees, 0)).toFixed(2)
    ),
    contractorPayouts: Number(
      (metrics.reduce((sum, m) => sum + m.contractorPayouts, 0)).toFixed(2)
    ),
    jobsCompleted: metrics.reduce((sum, m) => sum + m.jobsCompleted, 0),
    jobsRequested: metrics.reduce((sum, m) => sum + m.jobsRequested, 0),
    avgCompletionTime: Math.round(
      metrics.reduce((sum, m) => sum + m.avgCompletionTime, 0) / metrics.length
    ),
    paymentSuccessRate: Number(
      (
        metrics.reduce((sum, m) => sum + m.paymentSuccessRate, 0) /
        metrics.length
      ).toFixed(2)
    ),
    paymentFailureCount: metrics.reduce((sum, m) => sum + m.paymentFailureCount, 0),
    activeContractors: Math.max(...metrics.map((m) => m.activeContractors)),
    activeClients: Math.max(...metrics.map((m) => m.activeClients)),
    newContractors: metrics.reduce((sum, m) => sum + m.newContractors, 0),
    newClients: metrics.reduce((sum, m) => sum + m.newClients, 0),
    avgContractorEarnings: Number(
      (
        metrics.reduce((sum, m) => sum + m.avgContractorEarnings, 0) /
        metrics.length
      ).toFixed(2)
    ),
    avgClientSpend: Number(
      (metrics.reduce((sum, m) => sum + m.avgClientSpend, 0) / metrics.length).toFixed(
        2
      )
    ),
    totalJobsInProgress: Math.max(...metrics.map((m) => m.totalJobsInProgress)),
    avgJobValue: Number(
      (metrics.reduce((sum, m) => sum + m.avgJobValue, 0) / metrics.length).toFixed(2)
    ),
    totalServiceRequests: metrics.reduce((sum, m) => sum + m.totalServiceRequests, 0),
  };
}
