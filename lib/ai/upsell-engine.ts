/**
 * Intelligent Upselling Engine
 * Context-aware upselling suggestions during customer interactions
 */

import { JobContext, ServiceRecommendation } from './service-recommender';

export interface UpsellOpportunity {
  opportunity: string;
  confidence: number; // 0-1
  estimatedRevenue: number;
  effort: 'low' | 'medium' | 'high';
  timing: 'during-quote' | 'during-job' | 'after-job';
  pitch: string;
  objectionHandling: string[];
}

/**
 * Identify upsell opportunities during customer interaction
 */
export function identifyUpsellOpportunities(
  context: JobContext,
  customerProfile: {
    totalSpend: number;
    pricesensitivity: 'low' | 'medium' | 'high';
    previousUpsells: number;
  }
): UpsellOpportunity[] {
  const opportunities: UpsellOpportunity[] = [];

  // Service upgrades
  opportunities.push(...identifyServiceUpgrades(context, customerProfile));

  // Equipment upgrades
  opportunities.push(...identifyEquipmentUpgrades(context, customerProfile));

  // Extended services
  opportunities.push(...identifyExtendedServices(context, customerProfile));

  // Maintenance packages
  opportunities.push(...identifyMaintenancePackages(context, customerProfile));

  // Sort by confidence and revenue
  return opportunities.sort((a, b) => {
    const scoreA = a.confidence * a.estimatedRevenue;
    const scoreB = b.confidence * b.estimatedRevenue;
    return scoreB - scoreA;
  });
}

/**
 * Service upgrade opportunities
 */
function identifyServiceUpgrades(
  context: JobContext,
  customerProfile: any
): UpsellOpportunity[] {
  const opportunities: UpsellOpportunity[] = [];

  // Premium restoration upgrade
  if (
    context.propertyType === 'residential' &&
    customerProfile.pricesensitivity !== 'high'
  ) {
    opportunities.push({
      opportunity: 'Premium Restoration Package',
      confidence: 0.7,
      estimatedRevenue: 2000,
      effort: 'low',
      timing: 'during-quote',
      pitch:
        'Our Premium Restoration Package includes IICRC Master Restorer oversight, guaranteed 24-hour completion, and a 5-year warranty. This ensures the highest quality restoration with complete peace of mind.',
      objectionHandling: [
        'Cost concern: "The premium package prevents costly issues down the road and includes an extended warranty"',
        'Time concern: "Premium service actually saves time with our guaranteed 24-hour completion"',
        'Value concern: "Master Restorer oversight ensures insurance claims are approved quickly and completely"',
      ],
    });
  }

  // Commercial priority service
  if (context.propertyType === 'commercial') {
    opportunities.push({
      opportunity: 'Commercial Priority Service',
      confidence: 0.85,
      estimatedRevenue: 3500,
      effort: 'low',
      timing: 'during-quote',
      pitch:
        'Our Commercial Priority Service minimizes business disruption with after-hours work, dedicated project manager, and daily status updates. We understand downtime costs money.',
      objectionHandling: [
        'Cost concern: "Calculate your daily revenue loss vs. priority service cost - it pays for itself"',
        'Necessity concern: "Priority service reduces downtime by 40% on average, getting you back to business faster"',
        'Insurance concern: "Most commercial policies cover priority service when justified by business impact"',
      ],
    });
  }

  return opportunities;
}

/**
 * Equipment upgrade opportunities
 */
function identifyEquipmentUpgrades(
  context: JobContext,
  customerProfile: any
): UpsellOpportunity[] {
  const opportunities: UpsellOpportunity[] = [];

  // Advanced drying equipment
  if (context.serviceType === 'water-damage') {
    opportunities.push({
      opportunity: 'Advanced Desiccant Drying System',
      confidence: 0.6,
      estimatedRevenue: 1200,
      effort: 'medium',
      timing: 'during-job',
      pitch:
        'Our advanced desiccant drying system cuts drying time in half and prevents secondary damage like mould growth. It\'s especially effective for severe water damage.',
      objectionHandling: [
        'Cost concern: "Faster drying prevents mould, which would cost much more to remediate"',
        'Necessity concern: "Standard equipment takes 5-7 days; advanced system completes in 2-3 days"',
        'Insurance concern: "Insurance typically covers advanced equipment when it prevents additional damage"',
      ],
    });
  }

  // HEPA filtration upgrade
  if (context.serviceType === 'mould' || context.serviceType === 'fire-damage') {
    opportunities.push({
      opportunity: 'Medical-Grade HEPA Air Scrubbing',
      confidence: 0.75,
      estimatedRevenue: 800,
      effort: 'low',
      timing: 'during-job',
      pitch:
        'Medical-grade HEPA filtration removes 99.97% of airborne particles, including mould spores and smoke particles. Essential for health and safety, especially for children and elderly.',
      objectionHandling: [
        'Cost concern: "Health is priceless - this equipment protects your family from respiratory issues"',
        'Necessity concern: "Standard equipment removes 90%; medical-grade removes 99.97% - critical for vulnerable individuals"',
        'Insurance concern: "Often covered when occupants have respiratory conditions or allergies"',
      ],
    });
  }

  return opportunities;
}

/**
 * Extended service opportunities
 */
function identifyExtendedServices(
  context: JobContext,
  customerProfile: any
): UpsellOpportunity[] {
  const opportunities: UpsellOpportunity[] = [];

  // Antimicrobial treatment
  if (
    context.serviceType === 'water-damage' ||
    context.serviceType === 'mould'
  ) {
    opportunities.push({
      opportunity: 'Antimicrobial Protection Treatment',
      confidence: 0.8,
      estimatedRevenue: 600,
      effort: 'low',
      timing: 'during-job',
      pitch:
        'Our antimicrobial treatment creates a protective barrier preventing mould, mildew, and bacteria growth for up to 1 year. Applied during restoration for maximum effectiveness.',
      objectionHandling: [
        'Cost concern: "Prevents mould recurrence which would cost thousands to remediate"',
        'Necessity concern: "Brisbane\'s humid climate makes antimicrobial protection essential"',
        'Safety concern: "EPA-approved, non-toxic formula safe for children and pets"',
      ],
    });
  }

  // Content pack-out and storage
  if (context.damageExtent === 'major' || context.damageExtent === 'severe') {
    opportunities.push({
      opportunity: 'Professional Content Pack-Out & Storage',
      confidence: 0.65,
      estimatedRevenue: 2500,
      effort: 'medium',
      timing: 'during-quote',
      pitch:
        'We professionally pack, catalog, and store your belongings in climate-controlled facilities during restoration. Items are cleaned, restored, and returned when work is complete.',
      objectionHandling: [
        'Cost concern: "Prevents damage to your belongings and insurance covers most pack-out services"',
        'Convenience concern: "We handle everything - you don\'t lift a finger"',
        'Trust concern: "Full inventory documentation and insurance coverage for all stored items"',
      ],
    });
  }

  return opportunities;
}

/**
 * Maintenance package opportunities
 */
function identifyMaintenancePackages(
  context: JobContext,
  customerProfile: any
): UpsellOpportunity[] {
  const opportunities: UpsellOpportunity[] = [];

  // Annual maintenance plan
  if (customerProfile.totalSpend > 3000) {
    opportunities.push({
      opportunity: 'Annual Property Protection Plan',
      confidence: 0.5,
      estimatedRevenue: 1200,
      effort: 'medium',
      timing: 'after-job',
      pitch:
        'Our Annual Protection Plan includes bi-annual inspections, 24/7 priority emergency response, and 15% discount on all services. Catches problems early before they become emergencies.',
      objectionHandling: [
        'Cost concern: "Pays for itself with the 15% discount on just one service call"',
        'Necessity concern: "Brisbane properties face storms, floods, and humidity - prevention is cheaper than emergency repairs"',
        'Commitment concern: "Cancel anytime after first year, no long-term contract required"',
      ],
    });
  }

  // Monitoring system
  if (
    context.propertyType === 'commercial' ||
    customerProfile.totalSpend > 10000
  ) {
    opportunities.push({
      opportunity: 'Smart Leak Detection & Monitoring System',
      confidence: 0.6,
      estimatedRevenue: 3000,
      effort: 'high',
      timing: 'after-job',
      pitch:
        'Smart sensors monitor moisture, temperature, and humidity 24/7. Instant alerts to your phone prevent disasters. Professional installation and monitoring included.',
      objectionHandling: [
        'Cost concern: "One prevented flood pays for the entire system multiple times over"',
        'Technology concern: "Simple smartphone app, easy to use, works automatically"',
        'Maintenance concern: "We handle all monitoring and alerts - you just respond when needed"',
      ],
    });
  }

  return opportunities;
}

/**
 * Generate personalized upsell script
 */
export function generateUpsellScript(
  opportunity: UpsellOpportunity,
  customerName: string,
  currentJobValue: number
): string {
  const valuePercentage = (
    (opportunity.estimatedRevenue / currentJobValue) *
    100
  ).toFixed(0);

  let script = `${customerName}, I wanted to mention something that could really benefit you. `;

  // Add context based on timing
  if (opportunity.timing === 'during-quote') {
    script += `While we're putting together your quote, `;
  } else if (opportunity.timing === 'during-job') {
    script += `Since we're already on-site working on your property, `;
  } else {
    script += `Now that we've completed your restoration, `;
  }

  // Add pitch
  script += opportunity.pitch;

  // Add value proposition
  script += ` This adds about ${valuePercentage}% to your current service cost, but the benefits far outweigh the investment. `;

  // Add urgency
  if (opportunity.timing === 'during-job') {
    script += `The best part is we can add this right now while our team is here, so there's no need for another visit. `;
  }

  // Close
  script += `Would you like me to include this in your service?`;

  return script;
}

/**
 * Calculate upsell conversion probability
 */
export function predictUpsellConversion(
  opportunity: UpsellOpportunity,
  customerProfile: {
    priceSensitivity: 'low' | 'medium' | 'high';
    previousUpsells: number;
    totalSpend: number;
  }
): number {
  let probability = opportunity.confidence;

  // Adjust for price sensitivity
  if (customerProfile.priceSensitivity === 'low') {
    probability *= 1.3;
  } else if (customerProfile.priceSensitivity === 'high') {
    probability *= 0.7;
  }

  // Adjust for previous upsell success
  if (customerProfile.previousUpsells > 0) {
    probability *= 1.2;
  }

  // Adjust for total spend (higher spend = more likely to upsell)
  if (customerProfile.totalSpend > 10000) {
    probability *= 1.15;
  }

  // Cap at 0.95
  return Math.min(0.95, probability);
}

/**
 * Calculate expected upsell revenue
 */
export function calculateExpectedRevenue(
  opportunities: UpsellOpportunity[],
  customerProfile: any
): {
  total: number;
  weighted: number;
  byTiming: {
    'during-quote': number;
    'during-job': number;
    'after-job': number;
  };
} {
  const total = opportunities.reduce(
    (sum, opp) => sum + opp.estimatedRevenue,
    0
  );

  const weighted = opportunities.reduce((sum, opp) => {
    const conversionProb = predictUpsellConversion(opp, customerProfile);
    return sum + opp.estimatedRevenue * conversionProb;
  }, 0);

  const byTiming = {
    'during-quote': 0,
    'during-job': 0,
    'after-job': 0,
  };

  opportunities.forEach((opp) => {
    const conversionProb = predictUpsellConversion(opp, customerProfile);
    byTiming[opp.timing] += opp.estimatedRevenue * conversionProb;
  });

  return {
    total: Math.round(total),
    weighted: Math.round(weighted),
    byTiming: {
      'during-quote': Math.round(byTiming['during-quote']),
      'during-job': Math.round(byTiming['during-job']),
      'after-job': Math.round(byTiming['after-job']),
    },
  };
}
