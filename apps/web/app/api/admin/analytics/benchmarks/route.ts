
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
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
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
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    // 2. Parse and validate query parameters
    const { searchParams } = new URL(request.url);
    const typeParam = searchParams.get('type') || 'all';
    const benchmarkType: BenchmarkType = isBenchmarkType(typeParam) ? typeParam : 'all';

    // 3. Fetch contractors with their performance data
    const contractors = await db.contractor.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        bookings: {
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
      const bookings = contractor.bookings || [];
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
      const serviceTypeData = await db.booking.groupBy({
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

      // Fetch all bookings for these service types in a single query (avoid N+1)
      const serviceTypes = serviceTypeData.map(sg => sg.australianServiceType);
      const allServiceBookings = await db.booking.findMany({
        where: { australianServiceType: { in: serviceTypes as any } },
        include: { ratings: true },
      });

      // Group bookings by service type using a Map for O(n) lookup
      const bookingsByServiceType = new Map<string, typeof allServiceBookings>();
      for (const booking of allServiceBookings) {
        const key = booking.australianServiceType;
        if (!bookingsByServiceType.has(key)) bookingsByServiceType.set(key, []);
        bookingsByServiceType.get(key)!.push(booking);
      }

      serviceBenchmarks = serviceTypes.map((serviceType) => {
        const bookings = bookingsByServiceType.get(serviceType) || [];
        const completedBookings = bookings.filter(b => b.status === 'COMPLETED');
        const totalJobs = bookings.length;
        const completedJobs = completedBookings.length;

        const totalRevenue = completedBookings.reduce(
          (sum, b) => sum + Number(b.finalCostAUD || 0),
          0
        );
        const averagePrice = completedJobs > 0 ? totalRevenue / completedJobs : 0;
        const completionRate = totalJobs > 0 ? (completedJobs / totalJobs) * 100 : 0;

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
      });

      // Sort by total revenue descending
      serviceBenchmarks.sort((a, b) => b.totalRevenue - a.totalRevenue);
    }

    // 6. Calculate regional benchmarks by Australian state
    let regionalBenchmarks: RegionalBenchmark[] = [];

    if (benchmarkType === 'all' || benchmarkType === 'regional') {
      // Group bookings by state
      const stateData = await db.booking.groupBy({
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

      // Fetch all regional completed bookings and contractor counts in parallel (avoid N+1)
      const regions = stateData.map(sg => sg.serviceState).filter(Boolean) as string[];
      const [allRegionalBookings, contractorsByState] = await Promise.all([
        db.booking.findMany({
          where: { serviceState: { in: regions as any }, status: 'COMPLETED' },
          include: { ratings: true },
        }),
        db.contractor.groupBy({
          by: ['primaryState'],
          where: { primaryState: { in: regions as any } },
          _count: { id: true },
        }),
      ]);

      // Build lookup maps
      const bookingsByState = new Map<string, typeof allRegionalBookings>();
      for (const b of allRegionalBookings) {
        const key = b.serviceState as string;
        if (!bookingsByState.has(key)) bookingsByState.set(key, []);
        bookingsByState.get(key)!.push(b);
      }
      const contractorCountByState = new Map(
        contractorsByState.map(c => [c.primaryState, (c._count as any)?.id ?? 0])
      );

      regionalBenchmarks = regions.map((region) => {
        const completedBookings = bookingsByState.get(region) || [];
        const jobsCompleted = completedBookings.length;
        const totalRevenue = completedBookings.reduce(
          (sum, b) => sum + Number(b.finalCostAUD || 0),
          0
        );
        const averagePrice = jobsCompleted > 0 ? totalRevenue / jobsCompleted : 0;
        const allRatings = completedBookings.flatMap(b => (b as any).ratings || []);
        const averageRating = allRatings.length > 0
          ? allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length
          : 0;

        return {
          region,
          jobsCompleted,
          averagePrice: parseFloat(averagePrice.toFixed(2)),
          averageRating: parseFloat(averageRating.toFixed(2)),
          activeContractors: contractorCountByState.get(region) || 0,
        };
      });

      // Sort by jobs completed descending
      regionalBenchmarks.sort((a, b) => b.jobsCompleted - a.jobsCompleted);
    }

    // 7. Calculate platform-wide metrics using benchmarking engine
    const platformMetrics = calculatePlatformMetrics(
      contractorBenchmarks,
      serviceBenchmarks
    );

    // 8. Calculate tier distribution — single pass instead of four .filter() calls
    const tierDistribution = { platinum: 0, gold: 0, silver: 0, bronze: 0 };
    for (const c of contractorBenchmarks) {
      if (c.tier === 'platinum') tierDistribution.platinum++;
      else if (c.tier === 'gold') tierDistribution.gold++;
      else if (c.tier === 'silver') tierDistribution.silver++;
      else if (c.tier === 'bronze') tierDistribution.bronze++;
    }

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
      { error: 'Failed to calculate benchmarks' },
      { status: 500 }
    );
  }
}
