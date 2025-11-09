/**
 * ROI Calculator Service
 *
 * Calculate marketing ROI and campaign performance metrics
 */

export interface CampaignMetrics {
  campaignName: string;
  startDate: Date;
  endDate: Date;
  spend: number;
  impressions: number;
  clicks: number;
  leads: number;
  conversions: number;
  revenue: number;
}

export interface ROIReport {
  campaignName: string;
  period: string;
  spend: number;
  revenue: number;
  profit: number;
  roi: number; // Percentage
  roas: number; // Return on Ad Spend
  cpl: number; // Cost per Lead
  cpa: number; // Cost per Acquisition
  conversionRate: number;
  averageOrderValue: number;
  ltv: number; // Lifetime Value estimate
  ltvToCAC: number; // LTV to Customer Acquisition Cost ratio
  breakEven: boolean;
  projectedAnnualRevenue: number;
}

/**
 * Calculate comprehensive ROI metrics
 */
export function calculateROI(metrics: CampaignMetrics): ROIReport {
  const revenue = metrics.revenue;
  const spend = metrics.spend;
  const profit = revenue - spend;
  const roi = spend > 0 ? (profit / spend) * 100 : 0;
  const roas = spend > 0 ? revenue / spend : 0;

  const cpl = metrics.leads > 0 ? spend / metrics.leads : 0;
  const cpa = metrics.conversions > 0 ? spend / metrics.conversions : 0;

  const conversionRate = metrics.leads > 0 ? (metrics.conversions / metrics.leads) * 100 : 0;

  const averageOrderValue = metrics.conversions > 0 ? revenue / metrics.conversions : 0;

  // Estimate LTV (Lifetime Value) - assume 3 repeat purchases over 3 years
  const ltv = averageOrderValue * 3;

  const ltvToCAC = cpa > 0 ? ltv / cpa : 0;

  const breakEven = roi >= 0;

  // Calculate campaign duration in days
  const durationDays =
    (metrics.endDate.getTime() - metrics.startDate.getTime()) / (1000 * 60 * 60 * 24);

  // Project to annual revenue
  const projectedAnnualRevenue = durationDays > 0 ? (revenue / durationDays) * 365 : 0;

  const period = `${metrics.startDate.toLocaleDateString()} - ${metrics.endDate.toLocaleDateString()}`;

  return {
    campaignName: metrics.campaignName,
    period,
    spend,
    revenue,
    profit,
    roi,
    roas,
    cpl,
    cpa,
    conversionRate,
    averageOrderValue,
    ltv,
    ltvToCAC,
    breakEven,
    projectedAnnualRevenue,
  };
}

/**
 * Compare multiple campaigns
 */
export function compareCampaigns(campaigns: CampaignMetrics[]): {
  campaigns: ROIReport[];
  totals: ROIReport;
  bestPerformer: {
    byROI: string;
    byRevenue: string;
    byConversionRate: string;
  };
} {
  const reports = campaigns.map((c) => calculateROI(c));

  // Calculate totals
  const totalSpend = campaigns.reduce((sum, c) => sum + c.spend, 0);
  const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0);
  const totalLeads = campaigns.reduce((sum, c) => sum + c.leads, 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
  const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);

  const totals = calculateROI({
    campaignName: 'Total',
    startDate: new Date(Math.min(...campaigns.map((c) => c.startDate.getTime()))),
    endDate: new Date(Math.max(...campaigns.map((c) => c.endDate.getTime()))),
    spend: totalSpend,
    revenue: totalRevenue,
    leads: totalLeads,
    conversions: totalConversions,
    impressions: totalImpressions,
    clicks: totalClicks,
  });

  // Find best performers
  const bestByROI = reports.reduce((best, current) =>
    current.roi > best.roi ? current : best
  );
  const bestByRevenue = reports.reduce((best, current) =>
    current.revenue > best.revenue ? current : best
  );
  const bestByConversionRate = reports.reduce((best, current) =>
    current.conversionRate > best.conversionRate ? current : best
  );

  return {
    campaigns: reports,
    totals,
    bestPerformer: {
      byROI: bestByROI.campaignName,
      byRevenue: bestByRevenue.campaignName,
      byConversionRate: bestByConversionRate.campaignName,
    },
  };
}

/**
 * Calculate break-even point
 */
export function calculateBreakEven(
  averageOrderValue: number,
  conversionRate: number // As decimal (0.05 = 5%)
): {
  maxCostPerClick: number;
  maxCostPerLead: number;
  breakEvenConversionRate: number;
} {
  // Assume 40% profit margin
  const profitMargin = 0.4;
  const maxCPA = averageOrderValue * profitMargin;

  const maxCostPerLead = maxCPA * conversionRate;

  // Assume 2% click-to-lead rate
  const clickToLeadRate = 0.02;
  const maxCostPerClick = maxCostPerLead * clickToLeadRate;

  // Break-even conversion rate at current CPA
  const breakEvenConversionRate = conversionRate; // Already at break-even if using actual rate

  return {
    maxCostPerClick,
    maxCostPerLead,
    breakEvenConversionRate,
  };
}

/**
 * Forecast future performance
 */
export function forecastPerformance(
  historicalMetrics: CampaignMetrics,
  forecastMonths: number,
  assumptions: {
    spendGrowth?: number; // Percentage per month
    conversionRateImprovement?: number; // Percentage
    averageOrderValueGrowth?: number; // Percentage
  } = {}
): Array<{
  month: number;
  spend: number;
  revenue: number;
  roi: number;
  conversions: number;
}> {
  const spendGrowth = assumptions.spendGrowth || 0;
  const conversionRateImprovement = assumptions.conversionRateImprovement || 0;
  const aovGrowth = assumptions.averageOrderValueGrowth || 0;

  const currentROI = calculateROI(historicalMetrics);
  let currentSpend = historicalMetrics.spend;
  let currentConversionRate = currentROI.conversionRate / 100;
  let currentAOV = currentROI.averageOrderValue;

  const forecast = [];

  for (let month = 1; month <= forecastMonths; month++) {
    currentSpend *= 1 + spendGrowth / 100;
    currentConversionRate *= 1 + conversionRateImprovement / 100;
    currentAOV *= 1 + aovGrowth / 100;

    const estimatedLeads = (currentSpend / currentROI.cpl) * (1 + spendGrowth / 100);
    const estimatedConversions = estimatedLeads * currentConversionRate;
    const estimatedRevenue = estimatedConversions * currentAOV;
    const estimatedROI = ((estimatedRevenue - currentSpend) / currentSpend) * 100;

    forecast.push({
      month,
      spend: Math.round(currentSpend),
      revenue: Math.round(estimatedRevenue),
      roi: Math.round(estimatedROI * 10) / 10,
      conversions: Math.round(estimatedConversions),
    });
  }

  return forecast;
}

/**
 * Channel mix optimization
 */
export function optimizeChannelMix(
  channels: Array<{
    name: string;
    currentSpend: number;
    roi: number;
    maxCapacity?: number;
  }>,
  totalBudget: number
): Array<{
  channel: string;
  currentSpend: number;
  recommendedSpend: number;
  change: number;
  expectedROI: number;
}> {
  // Sort channels by ROI (highest first)
  const sortedChannels = [...channels].sort((a, b) => b.roi - a.roi);

  let remainingBudget = totalBudget;
  const recommendations = [];

  for (const channel of sortedChannels) {
    const maxSpend = channel.maxCapacity || totalBudget;
    const recommendedSpend = Math.min(remainingBudget, maxSpend);

    recommendations.push({
      channel: channel.name,
      currentSpend: channel.currentSpend,
      recommendedSpend,
      change: recommendedSpend - channel.currentSpend,
      expectedROI: channel.roi,
    });

    remainingBudget -= recommendedSpend;

    if (remainingBudget <= 0) break;
  }

  return recommendations;
}

/**
 * LTV (Lifetime Value) calculator
 */
export function calculateLTV(
  averageOrderValue: number,
  purchaseFrequency: number, // Purchases per year
  customerLifespan: number // Years
): {
  ltv: number;
  monthlyValue: number;
  yearlyValue: number;
} {
  const yearlyValue = averageOrderValue * purchaseFrequency;
  const ltv = yearlyValue * customerLifespan;
  const monthlyValue = yearlyValue / 12;

  return {
    ltv: Math.round(ltv),
    monthlyValue: Math.round(monthlyValue),
    yearlyValue: Math.round(yearlyValue),
  };
}
