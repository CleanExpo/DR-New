/**
 * Cross-Sell Recommendation System
 * Suggest related services based on customer behavior and patterns
 */

export interface CrossSellRecommendation {
  serviceType: string;
  serviceName: string;
  relevance: number; // 0-100
  bundleDiscount?: number; // Percentage
  reasoning: string;
  customerSegment: string[];
  seasonalRelevance?: number; // 0-100
}

export interface CustomerBehavior {
  purchasedServices: string[];
  serviceHistory: Array<{
    service: string;
    date: Date;
    value: number;
  }>;
  propertyType: 'residential' | 'commercial';
  location: string;
  preferredContactTime: 'business-hours' | 'after-hours' | 'weekend';
}

/**
 * Generate cross-sell recommendations
 */
export function generateCrossSellRecommendations(
  currentService: string,
  customerBehavior: CustomerBehavior,
  seasonalContext?: {
    month: number;
    weatherForecast: 'clear' | 'rain' | 'storm';
  }
): CrossSellRecommendation[] {
  const recommendations: CrossSellRecommendation[] = [];

  // Service affinity matrix
  const serviceAffinity = getServiceAffinityMatrix();

  // Get related services
  const relatedServices =
    serviceAffinity[currentService as keyof typeof serviceAffinity] || [];

  // Generate recommendations based on affinity
  relatedServices.forEach((related) => {
    // Skip if already purchased
    if (customerBehavior.purchasedServices.includes(related.service)) {
      return;
    }

    let relevance = related.affinity;

    // Adjust for seasonal factors
    if (seasonalContext) {
      const seasonalBoost = calculateSeasonalRelevance(
        related.service,
        seasonalContext
      );
      relevance += seasonalBoost;
    }

    // Adjust for property type
    if (customerBehavior.propertyType === 'commercial') {
      if (['emergency-plan', 'priority-service'].includes(related.service)) {
        relevance += 15;
      }
    }

    recommendations.push({
      serviceType: related.service,
      serviceName: related.name,
      relevance: Math.min(100, relevance),
      bundleDiscount: related.bundleDiscount,
      reasoning: related.reasoning,
      customerSegment: related.segments,
      seasonalRelevance: seasonalContext
        ? calculateSeasonalRelevance(related.service, seasonalContext)
        : undefined,
    });
  });

  // Sort by relevance
  return recommendations.sort((a, b) => b.relevance - a.relevance);
}

/**
 * Service affinity matrix
 * Defines which services are commonly purchased together
 */
function getServiceAffinityMatrix() {
  return {
    'water-damage': [
      {
        service: 'mould-remediation',
        name: 'Mould Remediation',
        affinity: 85,
        bundleDiscount: 15,
        reasoning:
          'Water damage often leads to mould growth within 24-48 hours',
        segments: ['residential', 'commercial'],
      },
      {
        service: 'dehumidification',
        name: 'Professional Dehumidification',
        affinity: 75,
        bundleDiscount: 10,
        reasoning:
          'Ongoing moisture control prevents recurring water damage',
        segments: ['residential', 'commercial'],
      },
      {
        service: 'waterproofing',
        name: 'Preventive Waterproofing',
        affinity: 70,
        bundleDiscount: 20,
        reasoning: 'Prevent future water intrusion in vulnerable areas',
        segments: ['residential'],
      },
      {
        service: 'leak-detection',
        name: 'Smart Leak Detection System',
        affinity: 65,
        bundleDiscount: 25,
        reasoning: 'Early detection prevents catastrophic water damage',
        segments: ['commercial', 'high-value-residential'],
      },
    ],
    'fire-damage': [
      {
        service: 'air-quality-testing',
        name: 'Indoor Air Quality Testing',
        affinity: 90,
        bundleDiscount: 10,
        reasoning:
          'Verify air quality after smoke and soot removal',
        segments: ['residential', 'commercial'],
      },
      {
        service: 'content-restoration',
        name: 'Content Cleaning & Restoration',
        affinity: 80,
        bundleDiscount: 15,
        reasoning: 'Save valuable items affected by smoke and soot',
        segments: ['residential'],
      },
      {
        service: 'odor-removal',
        name: 'Advanced Odor Neutralization',
        affinity: 85,
        bundleDiscount: 0,
        reasoning: 'Eliminate persistent smoke odors completely',
        segments: ['residential', 'commercial'],
      },
      {
        service: 'fire-safety-upgrades',
        name: 'Fire Safety System Upgrades',
        affinity: 60,
        bundleDiscount: 20,
        reasoning: 'Prevent future fire incidents',
        segments: ['commercial', 'high-value-residential'],
      },
    ],
    'mould': [
      {
        service: 'moisture-audit',
        name: 'Comprehensive Moisture Audit',
        affinity: 95,
        bundleDiscount: 5,
        reasoning: 'Identify root cause of mould to prevent recurrence',
        segments: ['residential', 'commercial'],
      },
      {
        service: 'air-purification',
        name: 'HEPA Air Purification',
        affinity: 75,
        bundleDiscount: 15,
        reasoning: 'Remove airborne mould spores for healthier environment',
        segments: ['residential'],
      },
      {
        service: 'ventilation-upgrade',
        name: 'Ventilation System Upgrade',
        affinity: 70,
        bundleDiscount: 20,
        reasoning: 'Improve air circulation to prevent mould growth',
        segments: ['residential'],
      },
      {
        service: 'dehumidification',
        name: 'Dehumidification System',
        affinity: 80,
        bundleDiscount: 15,
        reasoning: 'Control humidity levels to prevent mould',
        segments: ['residential', 'commercial'],
      },
    ],
    'storm-damage': [
      {
        service: 'roof-inspection',
        name: 'Professional Roof Inspection',
        affinity: 90,
        bundleDiscount: 10,
        reasoning: 'Identify all storm damage for complete restoration',
        segments: ['residential', 'commercial'],
      },
      {
        service: 'emergency-tarping',
        name: 'Emergency Roof Tarping',
        affinity: 85,
        bundleDiscount: 0,
        reasoning: 'Prevent further damage from weather exposure',
        segments: ['residential', 'commercial'],
      },
      {
        service: 'tree-management',
        name: 'Hazardous Tree Removal',
        affinity: 70,
        bundleDiscount: 15,
        reasoning: 'Remove trees that pose risk in future storms',
        segments: ['residential'],
      },
      {
        service: 'water-damage',
        name: 'Water Damage Restoration',
        affinity: 75,
        bundleDiscount: 10,
        reasoning: 'Storm damage often includes water intrusion',
        segments: ['residential', 'commercial'],
      },
    ],
  };
}

/**
 * Calculate seasonal relevance
 */
function calculateSeasonalRelevance(
  service: string,
  context: { month: number; weatherForecast: string }
): number {
  const { month, weatherForecast } = context;

  // Storm season (October - March in Brisbane)
  const isStormSeason = month >= 9 || month <= 2;

  // Winter (June - August)
  const isWinter = month >= 5 && month <= 7;

  let boost = 0;

  // Storm-related services
  if (
    ['storm-damage', 'roof-inspection', 'emergency-tarping'].includes(service)
  ) {
    if (isStormSeason) boost += 20;
    if (weatherForecast === 'storm') boost += 30;
  }

  // Water damage (higher in storm season)
  if (service === 'water-damage') {
    if (isStormSeason) boost += 15;
    if (weatherForecast === 'rain' || weatherForecast === 'storm') boost += 20;
  }

  // Mould (higher in humid months)
  if (['mould-remediation', 'dehumidification'].includes(service)) {
    if (!isWinter) boost += 15; // Less mould in winter
  }

  // Fire safety (higher in dry season)
  if (service === 'fire-safety-upgrades') {
    if (isWinter) boost += 10; // Dry season = fire risk
  }

  return boost;
}

/**
 * Create service bundle recommendations
 */
export function createServiceBundles(
  currentService: string,
  customerType: 'residential' | 'commercial'
): Array<{
  bundleName: string;
  services: string[];
  totalValue: number;
  bundlePrice: number;
  savings: number;
  description: string;
}> {
  const bundles: Array<{
    bundleName: string;
    services: string[];
    totalValue: number;
    bundlePrice: number;
    savings: number;
    description: string;
  }> = [];

  // Water damage bundles
  if (currentService === 'water-damage') {
    if (customerType === 'residential') {
      bundles.push({
        bundleName: 'Complete Water Damage Protection',
        services: [
          'water-damage',
          'mould-inspection',
          'dehumidification',
          'antimicrobial-treatment',
        ],
        totalValue: 6500,
        bundlePrice: 5200,
        savings: 1300,
        description:
          'Comprehensive water damage restoration with mould prevention and ongoing protection',
      });
    }

    if (customerType === 'commercial') {
      bundles.push({
        bundleName: 'Commercial Water Emergency Package',
        services: [
          'water-damage',
          'priority-service',
          'content-packout',
          'leak-detection-system',
        ],
        totalValue: 12000,
        bundlePrice: 9600,
        savings: 2400,
        description:
          'Priority response, content protection, and prevention system for businesses',
      });
    }
  }

  // Fire damage bundles
  if (currentService === 'fire-damage') {
    bundles.push({
      bundleName: 'Complete Fire Restoration',
      services: [
        'fire-damage',
        'air-quality-testing',
        'content-restoration',
        'odor-removal',
      ],
      totalValue: 14000,
      bundlePrice: 11200,
      savings: 2800,
      description:
        'Full fire and smoke damage restoration with air quality verification',
    });
  }

  // Mould bundles
  if (currentService === 'mould') {
    bundles.push({
      bundleName: 'Mould Eradication & Prevention',
      services: [
        'mould-remediation',
        'moisture-audit',
        'air-purification',
        'dehumidification',
      ],
      totalValue: 7500,
      bundlePrice: 6000,
      savings: 1500,
      description:
        'Complete mould removal with root cause fix and prevention',
    });
  }

  return bundles;
}

/**
 * Predict cross-sell conversion rate
 */
export function predictCrossSellConversion(
  recommendation: CrossSellRecommendation,
  customerBehavior: CustomerBehavior
): number {
  let baseRate = recommendation.relevance / 100;

  // Boost for bundle discount
  if (recommendation.bundleDiscount) {
    baseRate *= 1 + recommendation.bundleDiscount / 100;
  }

  // Boost for loyal customers (multiple services)
  if (customerBehavior.purchasedServices.length > 2) {
    baseRate *= 1.2;
  }

  // Boost for commercial customers
  if (customerBehavior.propertyType === 'commercial') {
    baseRate *= 1.15;
  }

  // Seasonal boost
  if (recommendation.seasonalRelevance && recommendation.seasonalRelevance > 15) {
    baseRate *= 1.1;
  }

  return Math.min(0.85, baseRate);
}

/**
 * Calculate cross-sell revenue potential
 */
export function calculateCrossSellRevenue(
  recommendations: CrossSellRecommendation[],
  customerBehavior: CustomerBehavior,
  averageServiceValues: Record<string, number>
): {
  totalPotential: number;
  weightedExpected: number;
  topRecommendations: CrossSellRecommendation[];
} {
  let totalPotential = 0;
  let weightedExpected = 0;

  recommendations.forEach((rec) => {
    const serviceValue = averageServiceValues[rec.serviceType] || 2000;
    const discountedValue = rec.bundleDiscount
      ? serviceValue * (1 - rec.bundleDiscount / 100)
      : serviceValue;

    totalPotential += discountedValue;

    const conversionProb = predictCrossSellConversion(rec, customerBehavior);
    weightedExpected += discountedValue * conversionProb;
  });

  const topRecommendations = recommendations
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 3);

  return {
    totalPotential: Math.round(totalPotential),
    weightedExpected: Math.round(weightedExpected),
    topRecommendations,
  };
}
