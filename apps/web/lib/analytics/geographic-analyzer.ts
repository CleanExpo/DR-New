/**
 * Geographic Analytics
 * Analyzes geographic distribution of services and demand
 */

export interface GeographicMetrics {
  region: string;
  demand: number;
  activeContractors: number;
  avgServiceValue: number;
  jobsCompleted: number;
  coverage: number; // 0-100%
}

export interface HeatmapData {
  region: string;
  intensity: number; // 0-100
  latitude: number;
  longitude: number;
  jobs: number;
  revenue: number;
}

export interface RegionalAnalysis {
  totalDemand: number;
  totalContractors: number;
  averageServiceValue: number;
  regions: GeographicMetrics[];
  topRegions: GeographicMetrics[];
  underservedRegions: GeographicMetrics[];
  growthRegions: GeographicMetrics[];
}

/**
 * Australian states and their coordinates (for basic heatmap)
 */
const AustralianStates: Record<string, { lat: number; lon: number }> = {
  'NSW': { lat: -33.494, lon: 143.2104 },
  'VIC': { lat: -36.5626, lon: 142.9957 },
  'QLD': { lat: -22.4069, lon: 144.7674 },
  'WA': { lat: -27.0, lon: 133.0 },
  'SA': { lat: -30.0, lon: 135.0 },
  'TAS': { lat: -42.0, lon: 147.0 },
  'ACT': { lat: -35.2975, lon: 149.15 },
  'NT': { lat: -19.7522, lon: 134.1751 },
};

/**
 * Calculate demand intensity (0-100)
 */
export function calculateIntensity(value: number, maxValue: number): number {
  if (maxValue === 0) return 0;
  return Math.min(100, (value / maxValue) * 100);
}

/**
 * Group jobs by region
 */
export function groupByRegion(bookings: any[]): Record<string, any[]> {
  const grouped: Record<string, any[]> = {};

  bookings.forEach((booking) => {
    const region = booking.serviceState || 'Unknown';
    if (!grouped[region]) {
      grouped[region] = [];
    }
    grouped[region].push(booking);
  });

  return grouped;
}

/**
 * Calculate regional metrics
 */
export function calculateRegionalMetrics(
  bookings: any[],
  contractors: any[]
): Record<string, GeographicMetrics> {
  const grouped = groupByRegion(bookings);
  const metrics: Record<string, GeographicMetrics> = {};

  Object.entries(grouped).forEach(([region, jobs]) => {
    const jobCount = jobs.length;
    const totalValue = jobs.reduce((sum, j) => sum + (j.finalPrice || 0), 0);
    const avgValue = jobCount > 0 ? totalValue / jobCount : 0;

    // Count contractors in this region (simplified - would be more complex in reality)
    const regionContractors = contractors.filter((c) => c.serviceAreas?.includes(region)).length;

    metrics[region] = {
      region,
      demand: jobCount,
      activeContractors: regionContractors,
      avgServiceValue: avgValue,
      jobsCompleted: jobCount,
      coverage: regionContractors > 0 && jobCount > 0 ? (regionContractors / jobCount) * 100 : 0,
    };
  });

  return metrics;
}

/**
 * Generate heatmap data for all regions
 */
export function generateHeatmapData(
  metrics: Record<string, GeographicMetrics>,
  maxDemand: number = 0
): HeatmapData[] {
  const heatmapData: HeatmapData[] = [];
  const actualMaxDemand = maxDemand || Math.max(...Object.values(metrics).map((m) => m.demand), 1);

  Object.entries(metrics).forEach(([region, data]) => {
    const coords = AustralianStates[region] || { lat: -25.2744, lon: 133.7751 }; // Default to center of Australia
    const revenue = data.jobsCompleted * data.avgServiceValue;

    heatmapData.push({
      region,
      intensity: calculateIntensity(data.demand, actualMaxDemand),
      latitude: coords.lat,
      longitude: coords.lon,
      jobs: data.jobsCompleted,
      revenue,
    });
  });

  return heatmapData;
}

/**
 * Identify underserved regions
 */
export function identifyUnderservedRegions(
  metrics: Record<string, GeographicMetrics>,
  threshold: number = 30
): GeographicMetrics[] {
  return Object.values(metrics)
    .filter((m) => m.coverage < threshold && m.demand > 0)
    .sort((a, b) => a.coverage - b.coverage)
    .slice(0, 10);
}

/**
 * Identify growth regions (high demand, moderate contractor count)
 */
export function identifyGrowthRegions(
  metrics: Record<string, GeographicMetrics>
): GeographicMetrics[] {
  const avgDemand = Object.values(metrics).reduce((sum, m) => sum + m.demand, 0) / Object.keys(metrics).length;
  const avgContractors =
    Object.values(metrics).reduce((sum, m) => sum + m.activeContractors, 0) / Object.keys(metrics).length;

  return Object.values(metrics)
    .filter((m) => m.demand > avgDemand && m.activeContractors < avgContractors * 1.5)
    .sort((a, b) => b.demand - a.demand)
    .slice(0, 5);
}

/**
 * Analyze geographic distribution
 */
export function analyzeGeographicDistribution(
  bookings: any[],
  contractors: any[]
): RegionalAnalysis {
  const metrics = calculateRegionalMetrics(bookings, contractors);
  const topRegions = Object.values(metrics)
    .sort((a, b) => b.demand - a.demand)
    .slice(0, 5);

  const totalDemand = Object.values(metrics).reduce((sum, m) => sum + m.demand, 0);
  const totalContractors = Object.values(metrics).reduce((sum, m) => sum + m.activeContractors, 0);
  const totalValue = Object.values(metrics).reduce((sum, m) => sum + m.jobsCompleted * m.avgServiceValue, 0);
  const averageServiceValue = totalDemand > 0 ? totalValue / totalDemand : 0;

  return {
    totalDemand,
    totalContractors,
    averageServiceValue,
    regions: Object.values(metrics),
    topRegions,
    underservedRegions: identifyUnderservedRegions(metrics),
    growthRegions: identifyGrowthRegions(metrics),
  };
}

/**
 * Calculate coverage rate for a region
 */
export function calculateCoverageRate(demand: number, contractors: number): number {
  if (demand === 0) return 100; // No demand = full coverage
  return Math.min(100, (contractors / Math.max(demand / 5, 1)) * 100); // Assume 1 contractor per 5 jobs
}

/**
 * Get regional expansion recommendations
 */
export function getExpansionRecommendations(
  analysis: RegionalAnalysis
): Array<{ region: string; reason: string; priority: 'high' | 'medium' | 'low' }> {
  const recommendations: Array<{ region: string; reason: string; priority: 'high' | 'medium' | 'low' }> = [];

  // High priority: high demand, low coverage
  analysis.underservedRegions.slice(0, 3).forEach((region) => {
    recommendations.push({
      region: region.region,
      reason: `High demand (${region.demand} jobs) with limited contractor coverage (${region.coverage.toFixed(0)}%)`,
      priority: 'high',
    });
  });

  // Medium priority: growing demand
  analysis.growthRegions.slice(0, 3).forEach((region) => {
    recommendations.push({
      region: region.region,
      reason: `Growing market with ${region.demand} jobs but only ${region.activeContractors} contractors`,
      priority: 'medium',
    });
  });

  return recommendations;
}

/**
 * Calculate demand distribution across regions
 */
export function calculateDemandDistribution(
  metrics: Record<string, GeographicMetrics>
): Record<string, number> {
  const totalDemand = Object.values(metrics).reduce((sum, m) => sum + m.demand, 0);
  const distribution: Record<string, number> = {};

  Object.entries(metrics).forEach(([region, data]) => {
    distribution[region] = totalDemand > 0 ? (data.demand / totalDemand) * 100 : 0;
  });

  return distribution;
}

/**
 * Calculate revenue distribution across regions
 */
export function calculateRevenueDistribution(
  metrics: Record<string, GeographicMetrics>
): Record<string, number> {
  const totalRevenue = Object.values(metrics).reduce((sum, m) => sum + m.jobsCompleted * m.avgServiceValue, 0);
  const distribution: Record<string, number> = {};

  Object.entries(metrics).forEach(([region, data]) => {
    const regionRevenue = data.jobsCompleted * data.avgServiceValue;
    distribution[region] = totalRevenue > 0 ? (regionRevenue / totalRevenue) * 100 : 0;
  });

  return distribution;
}
