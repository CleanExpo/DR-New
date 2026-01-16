/**
 * GET /api/admin/analytics/benchmarks
 *
 * Comprehensive benchmarking system for contractors, services, and regional performance.
 * Provides tier calculations, rankings, and platform-wide metrics comparison.
 *
 * Query Parameters:
 * - type: 'contractor' | 'service' | 'regional' | 'all' (default: 'all')
 *   - contractor: Returns only contractor benchmarks and tier distribution
 *   - service: Returns only service type benchmarks
 *   - regional: Returns only regional benchmarks by state
 *   - all: Returns all benchmark data
 *
 * Response Structure:
 * {
 *   success: true,
 *   benchmarkData: {
 *     contractorBenchmarks: ContractorBenchmark[],
 *     serviceBenchmarks: ServiceBenchmark[],
 *     regionalBenchmarks: RegionalBenchmark[],
 *     platformMetrics: { avgRating, avgEarnings, avgCompletionRate },
 *     tierDistribution: { platinum, gold, silver, bronze }
 *   }
 * }
 *
 * Authentication:
 * - Requires NextAuth session with ADMIN role
 *
 * Uses:
 * - @/lib/analytics/benchmarking-engine for tier calculations and comparisons
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import {
  calculateContractorTier,
  calculatePlatformMetrics,
  identifyTopServices,
  rankContractors,
  type ContractorBenchmark,
  type ServiceBenchmark,
  type RegionalBenchmark,
} from '@/lib/analytics/benchmarking-engine';

/**
 * Type guard for benchmark type parameter
 */
type BenchmarkType = 'contractor' | 'service' | 'regional' | 'all';

function isBenchmarkType(value: string): value is BenchmarkType {
  return ['contractor', 'service', 'regional', 'all'].includes(value);
}

/**
 * GET /api/admin/analytics/benchmarks
 * Calculate and return comprehensive benchmark data
 */
export async function GET(request: NextRequest) {
  try {
    // 1. Authorization check - Admin only
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    // 2. Parse and validate query parameters
    const { searchParams } = new URL(request.url);
    const typeParam = searchParams.get('type') || 'all';
    const benchmarkType: BenchmarkType = isBenchmarkType(typeParam) ? typeParam : 'all';

    // 3. Fetch contractors with their performance data
    const contractors = await prisma.contractor.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        bookingsAsContractor: {
          where: {
            status: 'COMPLETED',
          },
          include: {
            ratings: true,
            payments: {
              where: {
                status: 'COMPLETED',
              },
            },
          },
        },
      },
    });

    // 4. Calculate contractor benchmarks
    const contractorBenchmarks: ContractorBenchmark[] = contractors.map((contractor) => {
      const bookings = contractor.bookingsAsContractor || [];
      const totalBookings = bookings.length;

      // Calculate total earnings from completed payments
      const totalEarnings = bookings.reduce((sum, booking) => {
        const bookingPayments = booking.payments || [];
        return sum + bookingPayments.reduce((paymentSum, payment) => {
          return paymentSum + Number(payment.amountAUD || 0);
        }, 0);
      }, 0);

      // Calculate average rating from all ratings
      const allRatings = bookings.flatMap(booking => booking.ratings || []);
      const averageRating = allRatings.length > 0
        ? allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length
        : 0;

      // Calculate acceptance rate (for contractors, we approximate using completion rate)
      // In a full system, track job offers vs acceptances
      const acceptanceRate = totalBookings > 0 ? 95 : 0; // Placeholder - implement actual tracking

      // Calculate tier using benchmarking engine
      const tier = calculateContractorTier(
        totalBookings,
        averageRating,
        acceptanceRate
      );

      return {
        contractorId: contractor.id,
        businessName: contractor.businessName || contractor.user?.name || 'Unknown',
        jobsCompleted: totalBookings,
        totalEarnings: parseFloat(totalEarnings.toFixed(2)),
        averageRating: parseFloat(averageRating.toFixed(2)),
        acceptanceRate,
        tier,
      };
    });

    // 5. Calculate service type benchmarks
    let serviceBenchmarks: ServiceBenchmark[] = [];

    if (benchmarkType === 'all' || benchmarkType === 'service') {
      // Group bookings by service type
      const serviceTypeData = await prisma.booking.groupBy({
        by: ['australianServiceType'],
        _count: {
          id: true,
        },
        _sum: {
          finalCostAUD: true,
        },
        where: {
          status: 'COMPLETED',
        },
      });

      // For each service type, calculate detailed metrics
      serviceBenchmarks = await Promise.all(
        serviceTypeData.map(async (serviceGroup) => {
          const serviceType = serviceGroup.australianServiceType;

          // Get all bookings for this service type
          const bookings = await prisma.booking.findMany({
            where: {
              australianServiceType: serviceType,
            },
            include: {
              ratings: true,
            },
          });

          const completedBookings = bookings.filter(b => b.status === 'COMPLETED');
          const totalJobs = bookings.length;
          const completedJobs = completedBookings.length;

          // Calculate metrics
          const totalRevenue = completedBookings.reduce(
            (sum, b) => sum + Number(b.finalCostAUD || 0),
            0
          );

          const averagePrice = completedJobs > 0 ? totalRevenue / completedJobs : 0;
          const completionRate = totalJobs > 0 ? (completedJobs / totalJobs) * 100 : 0;

          // Calculate average rating
          const allRatings = completedBookings.flatMap(b => b.ratings || []);
          const averageRating = allRatings.length > 0
            ? allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length
            : 0;

          return {
            serviceType,
            averagePrice: parseFloat(averagePrice.toFixed(2)),
            completionRate: parseFloat(completionRate.toFixed(2)),
            totalJobs,
            totalRevenue: parseFloat(totalRevenue.toFixed(2)),
            averageRating: parseFloat(averageRating.toFixed(2)),
          };
        })
      );

      // Sort by total revenue descending
      serviceBenchmarks.sort((a, b) => b.totalRevenue - a.totalRevenue);
    }

    // 6. Calculate regional benchmarks by Australian state
    let regionalBenchmarks: RegionalBenchmark[] = [];

    if (benchmarkType === 'all' || benchmarkType === 'regional') {
      // Group bookings by state
      const stateData = await prisma.booking.groupBy({
        by: ['serviceState'],
        _count: {
          id: true,
        },
        _sum: {
          finalCostAUD: true,
        },
        where: {
          status: 'COMPLETED',
        },
      });

      // Calculate metrics for each state
      regionalBenchmarks = await Promise.all(
        stateData.map(async (stateGroup) => {
          const region = stateGroup.serviceState;

          // Get completed bookings for this state
          const completedBookings = await prisma.booking.findMany({
            where: {
              serviceState: region,
              status: 'COMPLETED',
            },
            include: {
              ratings: true,
            },
          });

          const jobsCompleted = completedBookings.length;
          const totalRevenue = completedBookings.reduce(
            (sum, b) => sum + Number(b.finalCostAUD || 0),
            0
          );

          const averagePrice = jobsCompleted > 0 ? totalRevenue / jobsCompleted : 0;

          // Calculate average rating
          const allRatings = completedBookings.flatMap(b => b.ratings || []);
          const averageRating = allRatings.length > 0
            ? allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length
            : 0;

          // Count active contractors in this state
          const activeContractors = await prisma.contractor.count({
            where: {
              primaryState: region,
            },
          });

          return {
            region,
            jobsCompleted,
            averagePrice: parseFloat(averagePrice.toFixed(2)),
            averageRating: parseFloat(averageRating.toFixed(2)),
            activeContractors,
          };
        })
      );

      // Sort by jobs completed descending
      regionalBenchmarks.sort((a, b) => b.jobsCompleted - a.jobsCompleted);
    }

    // 7. Calculate platform-wide metrics using benchmarking engine
    const platformMetrics = calculatePlatformMetrics(
      contractorBenchmarks,
      serviceBenchmarks
    );

    // 8. Calculate tier distribution
    const tierDistribution = {
      platinum: contractorBenchmarks.filter(c => c.tier === 'platinum').length,
      gold: contractorBenchmarks.filter(c => c.tier === 'gold').length,
      silver: contractorBenchmarks.filter(c => c.tier === 'silver').length,
      bronze: contractorBenchmarks.filter(c => c.tier === 'bronze').length,
    };

    // 9. Build response based on type filter
    const benchmarkData: {
      contractorBenchmarks?: ContractorBenchmark[];
      serviceBenchmarks?: ServiceBenchmark[];
      regionalBenchmarks?: RegionalBenchmark[];
      platformMetrics: Record<string, number>;
      tierDistribution: Record<string, number>;
    } = {
      platformMetrics,
      tierDistribution,
    };

    // Conditionally include benchmark types based on query parameter
    if (benchmarkType === 'all' || benchmarkType === 'contractor') {
      benchmarkData.contractorBenchmarks = contractorBenchmarks;
    }

    if (benchmarkType === 'all' || benchmarkType === 'service') {
      benchmarkData.serviceBenchmarks = serviceBenchmarks;
    }

    if (benchmarkType === 'all' || benchmarkType === 'regional') {
      benchmarkData.regionalBenchmarks = regionalBenchmarks;
    }

    // 10. Return successful response
    return NextResponse.json({
      success: true,
      benchmarkData,
    });

  } catch (error) {
    console.error('[Admin Analytics] Error calculating benchmarks:', error);

    return NextResponse.json(
      {
        error: 'Failed to calculate benchmarks',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
