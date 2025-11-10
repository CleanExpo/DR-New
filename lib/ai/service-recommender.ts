/**
 * Service Recommendation Engine
 * Suggest additional services based on current job and customer history
 */

export interface JobContext {
  serviceType: string;
  damageExtent: 'minor' | 'moderate' | 'major' | 'severe';
  location: string;
  propertyType: 'residential' | 'commercial';
  propertyAge?: number;
  hasInsurance: boolean;
  seasonalFactors?: {
    isStormSeason: boolean;
    isWinterSeason: boolean;
  };
}

export interface ServiceRecommendation {
  serviceType: string;
  serviceName: string;
  priority: 'high' | 'medium' | 'low';
  relevanceScore: number; // 0-100
  reasoning: string;
  estimatedCost: number;
  benefits: string[];
  timing: 'immediate' | 'follow-up' | 'preventive';
}

/**
 * Recommend additional services for current job
 */
export function recommendServices(
  context: JobContext,
  customerHistory?: {
    previousServices: string[];
    lastServiceDate: Date;
  }
): ServiceRecommendation[] {
  const recommendations: ServiceRecommendation[] = [];

  // Service-specific recommendations
  switch (context.serviceType) {
    case 'water-damage':
      recommendations.push(...getWaterDamageRecommendations(context));
      break;

    case 'fire-damage':
      recommendations.push(...getFireDamageRecommendations(context));
      break;

    case 'mould':
      recommendations.push(...getMouldRecommendations(context));
      break;

    case 'storm-damage':
      recommendations.push(...getStormDamageRecommendations(context));
      break;
  }

  // Add preventive maintenance recommendations
  recommendations.push(...getPreventiveRecommendations(context));

  // Filter based on customer history (avoid duplicates)
  let filtered = recommendations;
  if (customerHistory) {
    filtered = recommendations.filter(
      (rec) => !customerHistory.previousServices.includes(rec.serviceType)
    );
  }

  // Sort by priority and relevance
  return filtered.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const priorityDiff =
      priorityOrder[b.priority] - priorityOrder[a.priority];
    if (priorityDiff !== 0) {return priorityDiff;}
    return b.relevanceScore - a.relevanceScore;
  });
}

/**
 * Water damage specific recommendations
 */
function getWaterDamageRecommendations(
  context: JobContext
): ServiceRecommendation[] {
  const recommendations: ServiceRecommendation[] = [];

  // Mould inspection (high correlation with water damage)
  if (
    context.damageExtent === 'moderate' ||
    context.damageExtent === 'major' ||
    context.damageExtent === 'severe'
  ) {
    recommendations.push({
      serviceType: 'mould-inspection',
      serviceName: 'Mould Inspection & Testing',
      priority: 'high',
      relevanceScore: 90,
      reasoning:
        'Water damage frequently leads to mould growth within 24-48 hours. Early detection prevents health risks.',
      estimatedCost: 500,
      benefits: [
        'Prevent health hazards from mould exposure',
        'Identify hidden moisture issues',
        'Insurance documentation for claims',
        'Peace of mind for property safety',
      ],
      timing: 'immediate',
    });
  }

  // Waterproofing
  recommendations.push({
    serviceType: 'waterproofing',
    serviceName: 'Preventive Waterproofing',
    priority: 'medium',
    relevanceScore: 70,
    reasoning:
      'Prevent future water damage by waterproofing vulnerable areas identified during restoration.',
    estimatedCost: 1500,
    benefits: [
      'Prevent recurring water damage',
      'Protect property value',
      'May reduce insurance premiums',
      'Long-term cost savings',
    ],
    timing: 'follow-up',
  });

  // Dehumidification system
  if (context.propertyType === 'commercial' || context.damageExtent === 'severe') {
    recommendations.push({
      serviceType: 'dehumidification-system',
      serviceName: 'Permanent Dehumidification System',
      priority: 'medium',
      relevanceScore: 65,
      reasoning:
        'Ongoing moisture control prevents future damage in high-risk properties.',
      estimatedCost: 3000,
      benefits: [
        'Continuous moisture monitoring',
        'Prevent mould and structural damage',
        'Protect valuable contents',
        'Energy efficient operation',
      ],
      timing: 'follow-up',
    });
  }

  return recommendations;
}

/**
 * Fire damage specific recommendations
 */
function getFireDamageRecommendations(
  context: JobContext
): ServiceRecommendation[] {
  const recommendations: ServiceRecommendation[] = [];

  // Air quality testing
  recommendations.push({
    serviceType: 'air-quality-testing',
    serviceName: 'Indoor Air Quality Testing',
    priority: 'high',
    relevanceScore: 85,
    reasoning:
      'Fire and smoke release harmful particles. Air quality testing ensures safe occupancy.',
    estimatedCost: 600,
    benefits: [
      'Verify safe indoor air quality',
      'Detect lingering smoke particles',
      'Insurance claim documentation',
      'Health and safety compliance',
    ],
    timing: 'immediate',
  });

  // Content restoration
  if (context.propertyType === 'residential' || context.damageExtent === 'major') {
    recommendations.push({
      serviceType: 'content-restoration',
      serviceName: 'Specialized Content Cleaning',
      priority: 'high',
      relevanceScore: 80,
      reasoning:
        'Smoke damage affects personal belongings. Professional cleaning can save valuable items.',
      estimatedCost: 2000,
      benefits: [
        'Restore valuable personal items',
        'Specialized cleaning techniques',
        'Insurance coverage available',
        'Reduce replacement costs',
      ],
      timing: 'immediate',
    });
  }

  // Fire safety upgrades
  recommendations.push({
    serviceType: 'fire-safety-upgrades',
    serviceName: 'Fire Safety System Upgrades',
    priority: 'medium',
    relevanceScore: 70,
    reasoning:
      'Prevent future fire incidents with modern detection and suppression systems.',
    estimatedCost: 4000,
    benefits: [
      'Enhanced fire protection',
      'Early warning systems',
      'May reduce insurance costs',
      'Code compliance upgrades',
    ],
    timing: 'follow-up',
  });

  return recommendations;
}

/**
 * Mould specific recommendations
 */
function getMouldRecommendations(context: JobContext): ServiceRecommendation[] {
  const recommendations: ServiceRecommendation[] = [];

  // Moisture source identification
  recommendations.push({
    serviceType: 'moisture-audit',
    serviceName: 'Comprehensive Moisture Audit',
    priority: 'high',
    relevanceScore: 95,
    reasoning:
      'Identify and fix moisture sources to prevent mould recurrence.',
    estimatedCost: 800,
    benefits: [
      'Find hidden moisture problems',
      'Thermal imaging inspection',
      'Prevent mould return',
      'Long-term solution',
    ],
    timing: 'immediate',
  });

  // Air purification
  recommendations.push({
    serviceType: 'air-purification',
    serviceName: 'HEPA Air Purification System',
    priority: 'medium',
    relevanceScore: 75,
    reasoning:
      'Remove airborne mould spores and improve indoor air quality.',
    estimatedCost: 1200,
    benefits: [
      'Remove airborne contaminants',
      'Improve respiratory health',
      'Continuous air filtration',
      'Reduce allergens',
    ],
    timing: 'follow-up',
  });

  // Ventilation improvements
  if (context.propertyType === 'residential') {
    recommendations.push({
      serviceType: 'ventilation-upgrade',
      serviceName: 'Ventilation System Upgrade',
      priority: 'medium',
      relevanceScore: 70,
      reasoning:
        'Improved ventilation prevents moisture buildup and mould growth.',
      estimatedCost: 2500,
      benefits: [
        'Better air circulation',
        'Reduce humidity levels',
        'Energy efficient',
        'Prevent future mould',
      ],
      timing: 'follow-up',
    });
  }

  return recommendations;
}

/**
 * Storm damage specific recommendations
 */
function getStormDamageRecommendations(
  context: JobContext
): ServiceRecommendation[] {
  const recommendations: ServiceRecommendation[] = [];

  // Structural assessment
  if (context.damageExtent === 'major' || context.damageExtent === 'severe') {
    recommendations.push({
      serviceType: 'structural-assessment',
      serviceName: 'Professional Structural Assessment',
      priority: 'high',
      relevanceScore: 90,
      reasoning:
        'Storm damage can compromise structural integrity. Professional assessment ensures safety.',
      estimatedCost: 1000,
      benefits: [
        'Verify structural safety',
        'Insurance claim support',
        'Identify hidden damage',
        'Engineer certification',
      ],
      timing: 'immediate',
    });
  }

  // Roof reinforcement
  recommendations.push({
    serviceType: 'roof-reinforcement',
    serviceName: 'Roof Reinforcement & Weatherproofing',
    priority: 'high',
    relevanceScore: 85,
    reasoning:
      'Strengthen roof against future storms and prevent recurring damage.',
    estimatedCost: 5000,
    benefits: [
      'Storm-resistant improvements',
      'Prevent future damage',
      'May reduce insurance premiums',
      'Increase property value',
    ],
    timing: 'follow-up',
  });

  // Tree removal/trimming
  if (context.propertyType === 'residential') {
    recommendations.push({
      serviceType: 'tree-management',
      serviceName: 'Hazardous Tree Removal/Trimming',
      priority: 'medium',
      relevanceScore: 70,
      reasoning:
        'Remove or trim trees that pose risk during storms.',
      estimatedCost: 1500,
      benefits: [
        'Prevent storm damage',
        'Remove safety hazards',
        'Protect property',
        'Improve aesthetics',
      ],
      timing: 'follow-up',
    });
  }

  return recommendations;
}

/**
 * Preventive maintenance recommendations
 */
function getPreventiveRecommendations(
  context: JobContext
): ServiceRecommendation[] {
  const recommendations: ServiceRecommendation[] = [];

  // Annual maintenance
  recommendations.push({
    serviceType: 'annual-inspection',
    serviceName: 'Annual Property Maintenance Inspection',
    priority: 'low',
    relevanceScore: 60,
    reasoning:
      'Regular inspections catch issues early before they become major problems.',
    estimatedCost: 400,
    benefits: [
      'Early problem detection',
      'Prevent costly repairs',
      'Maintain property value',
      'Insurance requirements',
    ],
    timing: 'preventive',
  });

  // Emergency preparedness
  if (context.propertyType === 'commercial') {
    recommendations.push({
      serviceType: 'emergency-plan',
      serviceName: 'Emergency Response Plan Development',
      priority: 'low',
      relevanceScore: 55,
      reasoning:
        'Prepare for future emergencies with a customized response plan.',
      estimatedCost: 800,
      benefits: [
        'Minimize damage in emergencies',
        'Staff training included',
        'Insurance compliance',
        'Business continuity',
      ],
      timing: 'preventive',
    });
  }

  return recommendations;
}

/**
 * Calculate upsell potential
 */
export function calculateUpsellValue(
  recommendations: ServiceRecommendation[]
): {
  totalPotential: number;
  highPriority: number;
  mediumPriority: number;
  lowPriority: number;
} {
  return {
    totalPotential: recommendations.reduce(
      (sum, rec) => sum + rec.estimatedCost,
      0
    ),
    highPriority: recommendations
      .filter((r) => r.priority === 'high')
      .reduce((sum, rec) => sum + rec.estimatedCost, 0),
    mediumPriority: recommendations
      .filter((r) => r.priority === 'medium')
      .reduce((sum, rec) => sum + rec.estimatedCost, 0),
    lowPriority: recommendations
      .filter((r) => r.priority === 'low')
      .reduce((sum, rec) => sum + rec.estimatedCost, 0),
  };
}
