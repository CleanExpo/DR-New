/**
 * Benchmarking Engine
 * Compares performance across contractors, services, and regions
 */

export interface ContractorBenchmark {
  contractorId: string;
  businessName: string;
  jobsCompleted: number;
  totalEarnings: number;
  averageRating: number;
  acceptanceRate: number;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
}

export interface ServiceBenchmark {
  serviceType: string;
  averagePrice: number;
  completionRate: number;
  totalJobs: number;
  totalRevenue: number;
  averageRating: number;
}

export interface RegionalBenchmark {
  region: string;
  jobsCompleted: number;
  averagePrice: number;
  averageRating: number;
  activeContractors: number;
}

export interface PerformanceMetric {
  metric: string;
  platformAverage: number;
  industryAverage?: number;
  status: 'above' | 'at' | 'below';
  performanceGap: number;
}

/**
 * Calculate contractor tier based on performance
 */
export function calculateContractorTier(
  jobsCompleted: number,
  rating: number,
  acceptanceRate: number
): 'platinum' | 'gold' | 'silver' | 'bronze' {
  const score = (jobsCompleted / 100) * 0.4 + (rating / 5) * 0.4 + (acceptanceRate / 100) * 0.2;

  if (score >= 3.5) return 'platinum';
  if (score >= 2.8) return 'gold';
  if (score >= 2.0) return 'silver';
  return 'bronze';
}

/**
 * Compare contractor to platform average
 */
export function compareContractorPerformance(
  contractor: ContractorBenchmark,
  platformAverage: { avgRating: number; avgEarnings: number }
): PerformanceMetric[] {
  return [
    {
      metric: 'Average Rating',
      platformAverage: platformAverage.avgRating,
      status: contractor.averageRating > platformAverage.avgRating ? 'above' : contractor.averageRating === platformAverage.avgRating ? 'at' : 'below',
      performanceGap: parseFloat((contractor.averageRating - platformAverage.avgRating).toFixed(2)),
    },
    {
      metric: 'Total Earnings',
      platformAverage: platformAverage.avgEarnings,
      status: contractor.totalEarnings > platformAverage.avgEarnings ? 'above' : contractor.totalEarnings === platformAverage.avgEarnings ? 'at' : 'below',
      performanceGap: parseFloat((contractor.totalEarnings - platformAverage.avgEarnings).toFixed(2)),
    },
  ];
}

/**
 * Get tier benefits/descriptions
 */
export function getTierDescription(tier: 'platinum' | 'gold' | 'silver' | 'bronze'): string {
  const descriptions: Record<string, string> = {
    platinum: 'Top performer - Consistently excellent quality and reliability',
    gold: 'Strong performer - High quality with good reliability',
    silver: 'Reliable performer - Meets platform standards',
    bronze: 'Developing performer - Meeting minimum requirements',
  };

  return descriptions[tier];
}

/**
 * Calculate service type benchmark
 */
export function calculateServiceBenchmark(
  serviceType: string,
  jobs: Array<{ finalPrice: number; rating: number; status: string }>
): ServiceBenchmark {
  const completedJobs = jobs.filter((j) => j.status === 'COMPLETED');
  const totalRevenue = jobs.reduce((sum, j) => sum + (j.finalPrice || 0), 0);

  const avgPrice = jobs.length > 0 ? totalRevenue / jobs.length : 0;
  const completionRate = jobs.length > 0 ? (completedJobs.length / jobs.length) * 100 : 0;
  const avgRating = completedJobs.length > 0
    ? completedJobs.reduce((sum, j) => sum + (j.rating || 0), 0) / completedJobs.length
    : 0;

  return {
    serviceType,
    averagePrice: parseFloat(avgPrice.toFixed(2)),
    completionRate: parseFloat(completionRate.toFixed(2)),
    totalJobs: jobs.length,
    totalRevenue: parseFloat(totalRevenue.toFixed(2)),
    averageRating: parseFloat(avgRating.toFixed(2)),
  };
}

/**
 * Rank contractors by metric
 */
export function rankContractors(
  contractors: ContractorBenchmark[],
  metric: 'earnings' | 'rating' | 'jobs'
): ContractorBenchmark[] {
  const sorted = [...contractors];

  switch (metric) {
    case 'earnings':
      return sorted.sort((a, b) => b.totalEarnings - a.totalEarnings);
    case 'rating':
      return sorted.sort((a, b) => b.averageRating - a.averageRating);
    case 'jobs':
      return sorted.sort((a, b) => b.jobsCompleted - a.jobsCompleted);
    default:
      return sorted;
  }
}

/**
 * Identify top services
 */
export function identifyTopServices(services: ServiceBenchmark[], limit: number = 5): ServiceBenchmark[] {
  return [...services].sort((a, b) => b.totalRevenue - a.totalRevenue).slice(0, limit);
}

/**
 * Calculate platform performance metrics
 */
export function calculatePlatformMetrics(
  contractors: ContractorBenchmark[],
  services: ServiceBenchmark[]
): Record<string, number> {
  const avgRating = contractors.reduce((sum, c) => sum + c.averageRating, 0) / (contractors.length || 1);
  const avgEarnings = contractors.reduce((sum, c) => sum + c.totalEarnings, 0) / (contractors.length || 1);
  const avgCompletionRate = services.reduce((sum, s) => sum + s.completionRate, 0) / (services.length || 1);

  return {
    avgRating: parseFloat(avgRating.toFixed(2)),
    avgEarnings: parseFloat(avgEarnings.toFixed(2)),
    avgCompletionRate: parseFloat(avgCompletionRate.toFixed(2)),
  };
}

/**
 * Compare two contractors
 */
export function compareContractors(
  contractor1: ContractorBenchmark,
  contractor2: ContractorBenchmark
): Record<string, { contractor1: number; contractor2: number; winner: string }> {
  return {
    rating: {
      contractor1: contractor1.averageRating,
      contractor2: contractor2.averageRating,
      winner: contractor1.averageRating > contractor2.averageRating ? 'contractor1' : contractor1.averageRating < contractor2.averageRating ? 'contractor2' : 'tie',
    },
    earnings: {
      contractor1: contractor1.totalEarnings,
      contractor2: contractor2.totalEarnings,
      winner: contractor1.totalEarnings > contractor2.totalEarnings ? 'contractor1' : contractor1.totalEarnings < contractor2.totalEarnings ? 'contractor2' : 'tie',
    },
    jobs: {
      contractor1: contractor1.jobsCompleted,
      contractor2: contractor2.jobsCompleted,
      winner: contractor1.jobsCompleted > contractor2.jobsCompleted ? 'contractor1' : contractor1.jobsCompleted < contractor2.jobsCompleted ? 'contractor2' : 'tie',
    },
  };
}
