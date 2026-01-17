/**
 * Dynamic Pricing Engine Service
 *
 * Phase D.2: AI-powered pricing for disaster recovery services
 *
 * Pricing Factors:
 * - Demand-based adjustment (availability, surge, geographic patterns)
 * - Value-based pricing (client tier, complexity, historical margins)
 * - Competitive positioning (market benchmarking, bid optimization)
 */

import { prisma } from '@/lib/prisma';
import { getDefaultProvider } from '@/lib/agents/providers';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

// ============================================================================
// Types and Interfaces
// ============================================================================

export interface PricingRequest {
  serviceType: string;
  location: {
    suburb: string;
    state: string;
    postcode: string;
  };
  urgency: 'STANDARD' | 'PRIORITY' | 'URGENT' | 'EMERGENCY';
  estimatedSize?: number; // Square metres
  jobComplexity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';
  clientId?: string;
  contractorId?: string;
  insuranceProvider?: string;
  scheduledDate?: Date;
}

export interface PricingResult {
  basePrice: number;
  adjustedPrice: number;
  priceRange: { min: number; max: number };
  breakdown: PriceBreakdown;
  factors: PricingFactors;
  confidence: number;
  recommendations: string[];
  reasoning: string;
  currency: 'AUD';
  calculatedAt: Date;
  processingTimeMs: number;
}

export interface PriceBreakdown {
  baseCost: number;
  demandAdjustment: number;
  urgencyPremium: number;
  complexityAdjustment: number;
  locationAdjustment: number;
  clientTierAdjustment: number;
  seasonalAdjustment: number;
  competitiveAdjustment: number;
  totalAdjustments: number;
}

export interface PricingFactors {
  // Demand factors
  contractorAvailability: number; // 0-1 (1 = many available)
  localDemand: 'LOW' | 'NORMAL' | 'HIGH' | 'SURGE';
  surgeMultiplier: number;

  // Value factors
  clientTier: 'STANDARD' | 'PREMIUM' | 'VIP';
  jobComplexity: number; // 0-100
  historicalMargin: number; // Historical profit margin percentage

  // Market factors
  marketRate: number; // Average market rate for this service
  competitorPricing: { average: number; range: { min: number; max: number } };
  seasonalDemand: number; // 0-1 multiplier
}

export interface ContractorBidOptimization {
  contractorId: string;
  suggestedBid: number;
  bidRange: { min: number; max: number };
  winProbability: number;
  profitEstimate: number;
  competitivePosition: 'UNDERCUT' | 'COMPETITIVE' | 'PREMIUM';
  recommendations: string[];
}

// ============================================================================
// Constants
// ============================================================================

// Base pricing by service type (AUD per square metre or flat rate)
const BASE_PRICING: Record<string, { perSqm: number; minCharge: number; maxCharge: number }> = {
  WATER_DAMAGE: { perSqm: 45, minCharge: 1500, maxCharge: 25000 },
  FIRE_DAMAGE: { perSqm: 85, minCharge: 5000, maxCharge: 100000 },
  SMOKE_DAMAGE: { perSqm: 35, minCharge: 2000, maxCharge: 30000 },
  MOULD_REMEDIATION: { perSqm: 55, minCharge: 2000, maxCharge: 40000 },
  STORM_DAMAGE: { perSqm: 50, minCharge: 2500, maxCharge: 50000 },
  FLOOD_DAMAGE: { perSqm: 60, minCharge: 3000, maxCharge: 60000 },
  CONTENT_RESTORATION: { perSqm: 25, minCharge: 500, maxCharge: 15000 },
  STRUCTURAL_DRYING: { perSqm: 40, minCharge: 2000, maxCharge: 20000 },
  BIOHAZARD_REMEDIATION: { perSqm: 120, minCharge: 3000, maxCharge: 50000 },
  HOARDING_CLEANUP: { perSqm: 35, minCharge: 2000, maxCharge: 30000 },
  CRIME_SCENE_CLEANING: { perSqm: 150, minCharge: 5000, maxCharge: 40000 },
};

// Urgency multipliers
const URGENCY_MULTIPLIERS: Record<string, number> = {
  STANDARD: 1.0,
  PRIORITY: 1.15,
  URGENT: 1.35,
  EMERGENCY: 1.65,
};

// Complexity multipliers
const COMPLEXITY_MULTIPLIERS: Record<string, number> = {
  LOW: 0.85,
  MEDIUM: 1.0,
  HIGH: 1.25,
  VERY_HIGH: 1.5,
};

// State-based location adjustments (relative to national average)
const STATE_ADJUSTMENTS: Record<string, number> = {
  NSW: 1.15, // Sydney premium
  VIC: 1.12, // Melbourne premium
  QLD: 1.0,
  WA: 1.08,
  SA: 0.95,
  TAS: 0.92,
  NT: 1.10,
  ACT: 1.05,
};

// Seasonal demand factors by month (Australian seasons)
const SEASONAL_FACTORS: Record<number, Record<string, number>> = {
  // January (Summer - bushfire/storm season)
  0: { FIRE_DAMAGE: 1.4, STORM_DAMAGE: 1.3, WATER_DAMAGE: 1.2, DEFAULT: 1.1 },
  // February
  1: { FIRE_DAMAGE: 1.3, STORM_DAMAGE: 1.2, FLOOD_DAMAGE: 1.3, DEFAULT: 1.1 },
  // March (Autumn - cyclone season QLD)
  2: { FLOOD_DAMAGE: 1.4, STORM_DAMAGE: 1.3, DEFAULT: 1.0 },
  // April
  3: { MOULD_REMEDIATION: 1.2, DEFAULT: 0.95 },
  // May
  4: { MOULD_REMEDIATION: 1.3, DEFAULT: 0.9 },
  // June (Winter - lower demand)
  5: { MOULD_REMEDIATION: 1.2, DEFAULT: 0.85 },
  // July
  6: { DEFAULT: 0.85 },
  // August
  7: { DEFAULT: 0.9 },
  // September (Spring - storm season starts)
  8: { STORM_DAMAGE: 1.1, DEFAULT: 0.95 },
  // October
  9: { STORM_DAMAGE: 1.2, FIRE_DAMAGE: 1.1, DEFAULT: 1.0 },
  // November (Summer approaching)
  10: { FIRE_DAMAGE: 1.2, STORM_DAMAGE: 1.2, DEFAULT: 1.05 },
  // December
  11: { FIRE_DAMAGE: 1.3, STORM_DAMAGE: 1.25, DEFAULT: 1.1 },
};

// Client tier discounts/premiums
const CLIENT_TIER_ADJUSTMENTS: Record<string, number> = {
  STANDARD: 1.0,
  PREMIUM: 0.95, // 5% loyalty discount
  VIP: 0.90, // 10% VIP discount
};

// ============================================================================
// Core Pricing Functions
// ============================================================================

/**
 * Calculate dynamic price for a service
 */
export async function calculatePrice(request: PricingRequest): Promise<PricingResult> {
  const startTime = Date.now();

  try {
    // Get base pricing
    const basePricing = BASE_PRICING[request.serviceType] || BASE_PRICING.WATER_DAMAGE;

    // Calculate base price from size or use default
    const estimatedSize = request.estimatedSize || 50; // Default 50 sqm
    let basePrice = Math.max(
      basePricing.minCharge,
      Math.min(basePricing.maxCharge, estimatedSize * basePricing.perSqm)
    );

    // Calculate all pricing factors
    const factors = await calculatePricingFactors(request);

    // Calculate adjustments
    const breakdown = calculatePriceBreakdown(basePrice, request, factors);

    // Apply all adjustments
    const adjustedPrice = basePrice + breakdown.totalAdjustments;

    // Calculate price range
    const priceRange = {
      min: Math.round(adjustedPrice * 0.85),
      max: Math.round(adjustedPrice * 1.15),
    };

    // Ensure within bounds
    const finalPrice = Math.max(
      basePricing.minCharge,
      Math.min(basePricing.maxCharge * 1.5, adjustedPrice)
    );

    // Generate recommendations
    const recommendations = generatePricingRecommendations(request, factors, finalPrice);

    // Generate AI reasoning
    const reasoning = await generatePricingReasoning(request, factors, breakdown, finalPrice);

    // Calculate confidence
    const confidence = calculateConfidence(factors, request);

    return {
      basePrice: Math.round(basePrice),
      adjustedPrice: Math.round(finalPrice),
      priceRange,
      breakdown,
      factors,
      confidence,
      recommendations,
      reasoning,
      currency: 'AUD',
      calculatedAt: new Date(),
      processingTimeMs: Date.now() - startTime,
    };
  } catch (error) {
    console.error('Dynamic pricing error:', error);
    throw error;
  }
}

/**
 * Optimise contractor bid for a job
 */
export async function optimiseContractorBid(
  contractorId: string,
  request: PricingRequest
): Promise<ContractorBidOptimization> {
  try {
    // Get market price
    const marketPrice = await calculatePrice(request);

    // Get contractor's historical data
    const contractor = await prisma.contractor.findUnique({
      where: { id: contractorId },
      include: {
        contractorProfile: true,
        contractorBookings: {
          where: { status: 'COMPLETED' },
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
      },
    });

    if (!contractor) {
      throw new Error('Contractor not found');
    }

    // Calculate contractor's average pricing
    const completedJobs = contractor.contractorBookings || [];
    const avgJobValue =
      completedJobs.length > 0
        ? completedJobs.reduce((sum, b) => sum + (parseFloat(b.finalCostAUD?.toString() || '0') || 0), 0) /
          completedJobs.length
        : marketPrice.adjustedPrice;

    // Determine competitive position
    const contractorRating = contractor.contractorProfile?.averageRating || 4.0;
    const completionRate = contractor.contractorProfile?.completedJobs || 0;

    // Calculate suggested bid based on contractor strength
    let suggestedBid = marketPrice.adjustedPrice;
    let competitivePosition: 'UNDERCUT' | 'COMPETITIVE' | 'PREMIUM' = 'COMPETITIVE';
    let winProbability = 0.5;

    if (contractorRating >= 4.5 && completionRate >= 50) {
      // Strong contractor - can charge premium
      suggestedBid = marketPrice.adjustedPrice * 1.1;
      competitivePosition = 'PREMIUM';
      winProbability = 0.6;
    } else if (contractorRating < 4.0 || completionRate < 10) {
      // Newer/lower-rated contractor - competitive pricing
      suggestedBid = marketPrice.adjustedPrice * 0.95;
      competitivePosition = 'UNDERCUT';
      winProbability = 0.7;
    }

    // Estimate profit (assuming 30% target margin)
    const estimatedCost = suggestedBid * 0.65;
    const profitEstimate = suggestedBid - estimatedCost;

    // Generate recommendations
    const recommendations = [
      `Market rate: $${marketPrice.adjustedPrice.toLocaleString()} AUD`,
      competitivePosition === 'PREMIUM'
        ? 'Your strong rating supports premium pricing'
        : competitivePosition === 'UNDERCUT'
          ? 'Competitive pricing recommended to build reputation'
          : 'Standard market-rate pricing recommended',
      request.urgency === 'EMERGENCY'
        ? 'Emergency jobs command higher rates - consider premium'
        : '',
    ].filter(Boolean);

    return {
      contractorId,
      suggestedBid: Math.round(suggestedBid),
      bidRange: {
        min: Math.round(marketPrice.priceRange.min * 0.95),
        max: Math.round(marketPrice.priceRange.max * 1.05),
      },
      winProbability,
      profitEstimate: Math.round(profitEstimate),
      competitivePosition,
      recommendations,
    };
  } catch (error) {
    console.error('Bid optimization error:', error);
    throw error;
  }
}

/**
 * Get market rate analysis for a service type and location
 */
export async function getMarketRateAnalysis(
  serviceType: string,
  location: { state: string; postcode?: string }
): Promise<{
  averageRate: number;
  medianRate: number;
  range: { min: number; max: number };
  recentTrend: 'INCREASING' | 'STABLE' | 'DECREASING';
  sampleSize: number;
  analysedAt: Date;
}> {
  try {
    // Query recent completed bookings
    const recentBookings = await prisma.booking.findMany({
      where: {
        australianServiceType: serviceType as any,
        serviceState: location.state as any,
        status: 'COMPLETED',
        finalCostAUD: { not: null },
        completedAt: {
          gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // Last 90 days
        },
      },
      select: {
        finalCostAUD: true,
        completedAt: true,
      },
      orderBy: { completedAt: 'desc' },
    });

    if (recentBookings.length === 0) {
      // Return base pricing if no data
      const basePricing = BASE_PRICING[serviceType] || BASE_PRICING.WATER_DAMAGE;
      return {
        averageRate: basePricing.minCharge + (basePricing.maxCharge - basePricing.minCharge) / 2,
        medianRate: basePricing.minCharge + (basePricing.maxCharge - basePricing.minCharge) / 2,
        range: { min: basePricing.minCharge, max: basePricing.maxCharge },
        recentTrend: 'STABLE',
        sampleSize: 0,
        analysedAt: new Date(),
      };
    }

    const costs = recentBookings
      .map((b) => parseFloat(b.finalCostAUD?.toString() || '0'))
      .filter((c) => c > 0);

    costs.sort((a, b) => a - b);

    const averageRate = costs.reduce((a, b) => a + b, 0) / costs.length;
    const medianRate = costs[Math.floor(costs.length / 2)];

    // Calculate trend by comparing recent vs older
    const midPoint = Math.floor(costs.length / 2);
    const recentAvg =
      recentBookings.slice(0, midPoint).reduce((sum, b) => sum + parseFloat(b.finalCostAUD?.toString() || '0'), 0) /
        midPoint || averageRate;
    const olderAvg =
      recentBookings.slice(midPoint).reduce((sum, b) => sum + parseFloat(b.finalCostAUD?.toString() || '0'), 0) /
        (recentBookings.length - midPoint) || averageRate;

    let recentTrend: 'INCREASING' | 'STABLE' | 'DECREASING' = 'STABLE';
    if (recentAvg > olderAvg * 1.05) recentTrend = 'INCREASING';
    if (recentAvg < olderAvg * 0.95) recentTrend = 'DECREASING';

    return {
      averageRate: Math.round(averageRate),
      medianRate: Math.round(medianRate),
      range: { min: Math.round(costs[0]), max: Math.round(costs[costs.length - 1]) },
      recentTrend,
      sampleSize: costs.length,
      analysedAt: new Date(),
    };
  } catch (error) {
    console.error('Market rate analysis error:', error);
    throw error;
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Calculate all pricing factors
 */
async function calculatePricingFactors(request: PricingRequest): Promise<PricingFactors> {
  // Calculate contractor availability
  const availableContractors = await prisma.contractor.count({
    where: {
      isActive: true,
      isVerified: true,
      australianSpecialties: { hasSome: [request.serviceType] },
      serviceAreas: {
        some: {
          OR: [
            { postcode: request.location.postcode },
            { state: request.location.state },
          ],
        },
      },
    },
  });

  const contractorAvailability = Math.min(1, availableContractors / 10);

  // Determine local demand based on pending bookings
  const pendingBookings = await prisma.booking.count({
    where: {
      serviceState: request.location.state as any,
      australianServiceType: request.serviceType as any,
      status: { in: ['PENDING', 'CONFIRMED'] },
    },
  });

  let localDemand: 'LOW' | 'NORMAL' | 'HIGH' | 'SURGE' = 'NORMAL';
  let surgeMultiplier = 1.0;

  if (pendingBookings > availableContractors * 3) {
    localDemand = 'SURGE';
    surgeMultiplier = 1.3;
  } else if (pendingBookings > availableContractors * 2) {
    localDemand = 'HIGH';
    surgeMultiplier = 1.15;
  } else if (pendingBookings < availableContractors / 2) {
    localDemand = 'LOW';
    surgeMultiplier = 0.95;
  }

  // Get client tier
  let clientTier: 'STANDARD' | 'PREMIUM' | 'VIP' = 'STANDARD';
  if (request.clientId) {
    const clientBookings = await prisma.booking.count({
      where: {
        clientId: request.clientId,
        status: 'COMPLETED',
      },
    });
    if (clientBookings >= 5) clientTier = 'VIP';
    else if (clientBookings >= 2) clientTier = 'PREMIUM';
  }

  // Calculate job complexity
  const jobComplexity = calculateJobComplexity(request);

  // Get market rate
  const marketAnalysis = await getMarketRateAnalysis(request.serviceType, request.location);

  // Get seasonal demand
  const month = new Date().getMonth();
  const seasonalFactors = SEASONAL_FACTORS[month] || { DEFAULT: 1.0 };
  const seasonalDemand = seasonalFactors[request.serviceType] || seasonalFactors.DEFAULT || 1.0;

  return {
    contractorAvailability,
    localDemand,
    surgeMultiplier,
    clientTier,
    jobComplexity,
    historicalMargin: 0.3, // Assumed 30% target margin
    marketRate: marketAnalysis.averageRate,
    competitorPricing: {
      average: marketAnalysis.averageRate,
      range: marketAnalysis.range,
    },
    seasonalDemand,
  };
}

/**
 * Calculate job complexity score
 */
function calculateJobComplexity(request: PricingRequest): number {
  let complexity = 50; // Base complexity

  // Adjust for urgency
  if (request.urgency === 'EMERGENCY') complexity += 20;
  else if (request.urgency === 'URGENT') complexity += 10;

  // Adjust for service type
  const highComplexityServices = ['FIRE_DAMAGE', 'BIOHAZARD_REMEDIATION', 'CRIME_SCENE_CLEANING'];
  if (highComplexityServices.includes(request.serviceType)) complexity += 15;

  // Adjust for size
  if (request.estimatedSize && request.estimatedSize > 100) complexity += 10;
  if (request.estimatedSize && request.estimatedSize > 200) complexity += 10;

  // Use provided complexity if available
  if (request.jobComplexity) {
    const complexityMap = { LOW: 25, MEDIUM: 50, HIGH: 75, VERY_HIGH: 90 };
    complexity = complexityMap[request.jobComplexity];
  }

  return Math.min(100, complexity);
}

/**
 * Calculate price breakdown
 */
function calculatePriceBreakdown(
  basePrice: number,
  request: PricingRequest,
  factors: PricingFactors
): PriceBreakdown {
  const baseCost = basePrice;

  // Demand adjustment
  const demandAdjustment = basePrice * (factors.surgeMultiplier - 1);

  // Urgency premium
  const urgencyMultiplier = URGENCY_MULTIPLIERS[request.urgency] || 1.0;
  const urgencyPremium = basePrice * (urgencyMultiplier - 1);

  // Complexity adjustment
  const complexityFactor = 0.8 + (factors.jobComplexity / 100) * 0.4; // 0.8 to 1.2
  const complexityAdjustment = basePrice * (complexityFactor - 1);

  // Location adjustment
  const stateMultiplier = STATE_ADJUSTMENTS[request.location.state] || 1.0;
  const locationAdjustment = basePrice * (stateMultiplier - 1);

  // Client tier adjustment
  const tierMultiplier = CLIENT_TIER_ADJUSTMENTS[factors.clientTier] || 1.0;
  const clientTierAdjustment = basePrice * (tierMultiplier - 1);

  // Seasonal adjustment
  const seasonalAdjustment = basePrice * (factors.seasonalDemand - 1);

  // Competitive adjustment (if below market, adjust up slightly)
  let competitiveAdjustment = 0;
  if (basePrice < factors.marketRate * 0.8) {
    competitiveAdjustment = (factors.marketRate * 0.8 - basePrice) * 0.5;
  }

  const totalAdjustments =
    demandAdjustment +
    urgencyPremium +
    complexityAdjustment +
    locationAdjustment +
    clientTierAdjustment +
    seasonalAdjustment +
    competitiveAdjustment;

  return {
    baseCost: Math.round(baseCost),
    demandAdjustment: Math.round(demandAdjustment),
    urgencyPremium: Math.round(urgencyPremium),
    complexityAdjustment: Math.round(complexityAdjustment),
    locationAdjustment: Math.round(locationAdjustment),
    clientTierAdjustment: Math.round(clientTierAdjustment),
    seasonalAdjustment: Math.round(seasonalAdjustment),
    competitiveAdjustment: Math.round(competitiveAdjustment),
    totalAdjustments: Math.round(totalAdjustments),
  };
}

/**
 * Generate pricing recommendations
 */
function generatePricingRecommendations(
  request: PricingRequest,
  factors: PricingFactors,
  finalPrice: number
): string[] {
  const recommendations: string[] = [];

  // Demand-based recommendations
  if (factors.localDemand === 'SURGE') {
    recommendations.push('High local demand - prices elevated due to contractor availability');
  } else if (factors.localDemand === 'LOW') {
    recommendations.push('Lower demand period - competitive pricing available');
  }

  // Urgency recommendations
  if (request.urgency === 'EMERGENCY') {
    recommendations.push('Emergency premium applied - consider scheduling if non-urgent');
  }

  // Client tier recommendations
  if (factors.clientTier === 'VIP') {
    recommendations.push('VIP discount applied - 10% loyalty reward');
  } else if (factors.clientTier === 'PREMIUM') {
    recommendations.push('Premium member discount applied - 5% off');
  }

  // Seasonal recommendations
  if (factors.seasonalDemand > 1.2) {
    recommendations.push('Peak season pricing in effect');
  } else if (factors.seasonalDemand < 0.9) {
    recommendations.push('Off-peak season - good time for non-urgent work');
  }

  // Price comparison
  if (finalPrice > factors.competitorPricing.range.max) {
    recommendations.push('Price above typical market range - premium service included');
  } else if (finalPrice < factors.competitorPricing.range.min) {
    recommendations.push('Competitive pricing below market average');
  }

  return recommendations;
}

/**
 * Generate AI reasoning for pricing
 */
async function generatePricingReasoning(
  request: PricingRequest,
  factors: PricingFactors,
  breakdown: PriceBreakdown,
  finalPrice: number
): Promise<string> {
  try {
    const provider = await getDefaultProvider();
    const model = provider.getModel();

    const prompt = `You are a pricing analyst for an Australian disaster recovery platform.
Explain this pricing calculation concisely.

SERVICE: ${request.serviceType}
LOCATION: ${request.location.suburb}, ${request.location.state}
URGENCY: ${request.urgency}

FINAL PRICE: $${finalPrice.toLocaleString()} AUD

BREAKDOWN:
- Base Cost: $${breakdown.baseCost.toLocaleString()}
- Urgency Premium: $${breakdown.urgencyPremium.toLocaleString()}
- Location Adjustment: $${breakdown.locationAdjustment.toLocaleString()}
- Demand Adjustment: $${breakdown.demandAdjustment.toLocaleString()}
- Seasonal Adjustment: $${breakdown.seasonalAdjustment.toLocaleString()}

MARKET CONTEXT:
- Average Market Rate: $${factors.marketRate.toLocaleString()}
- Local Demand: ${factors.localDemand}
- Client Tier: ${factors.clientTier}

Provide a 2-3 sentence explanation of the pricing. Use Australian English.`;

    const response = await model.invoke([
      new SystemMessage('You are a pricing analyst. Be concise and transparent.'),
      new HumanMessage(prompt),
    ]);

    return typeof response.content === 'string'
      ? response.content.trim()
      : `Price of $${finalPrice.toLocaleString()} AUD reflects ${request.urgency.toLowerCase()} service for ${request.serviceType.replace('_', ' ').toLowerCase()} in ${request.location.state}, adjusted for current market demand.`;
  } catch (error) {
    console.error('Error generating pricing reasoning:', error);
    return `Price of $${finalPrice.toLocaleString()} AUD reflects ${request.urgency.toLowerCase()} service for ${request.serviceType.replace('_', ' ').toLowerCase()} in ${request.location.state}, adjusted for current market demand and seasonal factors.`;
  }
}

/**
 * Calculate pricing confidence
 */
function calculateConfidence(factors: PricingFactors, request: PricingRequest): number {
  let confidence = 0.7; // Base confidence

  // Increase if we have market data
  if (factors.competitorPricing.average > 0) confidence += 0.1;

  // Increase for common service types
  const commonServices = ['WATER_DAMAGE', 'FIRE_DAMAGE', 'MOULD_REMEDIATION'];
  if (commonServices.includes(request.serviceType)) confidence += 0.1;

  // Decrease for extreme urgency (less predictable)
  if (request.urgency === 'EMERGENCY') confidence -= 0.1;

  // Decrease for surge demand (volatile)
  if (factors.localDemand === 'SURGE') confidence -= 0.1;

  return Math.max(0.3, Math.min(0.95, confidence));
}
