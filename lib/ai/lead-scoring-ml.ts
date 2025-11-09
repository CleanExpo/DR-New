/**
 * ML-Based Lead Scoring
 * Predict lead quality and conversion probability
 */

export interface Lead {
  id: string;
  source: string;
  serviceType: string;
  location: string;
  urgency: 'critical' | 'high' | 'medium' | 'low';
  hasInsurance: boolean;
  propertyType: 'residential' | 'commercial';
  propertyValue?: number;
  responseTime?: number; // Minutes since enquiry
  previousCustomer: boolean;
  contactMethod: 'phone' | 'email' | 'form' | 'chat';
  additionalInfo?: {
    damageExtent?: 'minor' | 'moderate' | 'major' | 'severe';
    timeOfDay?: number; // Hour of day (0-23)
    dayOfWeek?: number; // Day of week (0-6)
  };
}

export interface LeadScore {
  lead: Lead;
  score: number; // 0-100
  probability: number; // 0-1
  tier: 'hot' | 'warm' | 'cold';
  estimatedValue: number;
  factors: {
    urgency: number;
    insurance: number;
    propertyType: number;
    source: number;
    timing: number;
    history: number;
  };
  recommendations: string[];
}

/**
 * Score a lead using ML-based algorithm
 */
export function scoreLead(lead: Lead): LeadScore {
  let score = 0;
  const factors = {
    urgency: 0,
    insurance: 0,
    propertyType: 0,
    source: 0,
    timing: 0,
    history: 0,
  };

  // Urgency factor (0-30 points)
  factors.urgency = calculateUrgencyScore(lead.urgency);
  score += factors.urgency;

  // Insurance factor (0-20 points)
  factors.insurance = lead.hasInsurance ? 20 : 5;
  score += factors.insurance;

  // Property type factor (0-15 points)
  factors.propertyType = calculatePropertyScore(
    lead.propertyType,
    lead.propertyValue
  );
  score += factors.propertyType;

  // Source factor (0-15 points)
  factors.source = calculateSourceScore(lead.source);
  score += factors.source;

  // Timing factor (0-10 points)
  factors.timing = calculateTimingScore(lead);
  score += factors.timing;

  // Customer history factor (0-10 points)
  factors.history = lead.previousCustomer ? 10 : 0;
  score += factors.history;

  // Ensure score is within bounds
  score = Math.min(100, Math.max(0, score));

  // Calculate conversion probability
  const probability = calculateConversionProbability(score, lead);

  // Determine tier
  let tier: 'hot' | 'warm' | 'cold' = 'cold';
  if (score >= 70) tier = 'hot';
  else if (score >= 40) tier = 'warm';

  // Estimate job value
  const estimatedValue = estimateJobValue(lead);

  // Generate recommendations
  const recommendations = generateLeadRecommendations(score, lead, tier);

  return {
    lead,
    score,
    probability,
    tier,
    estimatedValue,
    factors,
    recommendations,
  };
}

/**
 * Calculate urgency score
 */
function calculateUrgencyScore(urgency: Lead['urgency']): number {
  const scores = {
    critical: 30,
    high: 25,
    medium: 15,
    low: 5,
  };

  return scores[urgency];
}

/**
 * Calculate property type score
 */
function calculatePropertyScore(
  propertyType: Lead['propertyType'],
  propertyValue?: number
): number {
  let score = propertyType === 'commercial' ? 12 : 8;

  // High-value residential properties score higher
  if (propertyType === 'residential' && propertyValue) {
    if (propertyValue > 2000000) score = 15; // High net worth
    else if (propertyValue > 1000000) score = 12;
    else if (propertyValue > 500000) score = 10;
  }

  return score;
}

/**
 * Calculate source score
 */
function calculateSourceScore(source: string): number {
  const scores: Record<string, number> = {
    'insurance-referral': 15,
    'direct-call': 12,
    'website-form': 10,
    'google-search': 10,
    'emergency-call': 15,
    'repeat-customer': 15,
    'social-media': 7,
    email: 8,
    chat: 9,
  };

  return scores[source.toLowerCase()] || 5;
}

/**
 * Calculate timing score
 */
function calculateTimingScore(lead: Lead): number {
  let score = 5; // Base score

  // Response time bonus
  if (lead.responseTime !== undefined) {
    if (lead.responseTime < 5) score += 5; // Very quick response
    else if (lead.responseTime < 15) score += 3;
    else if (lead.responseTime > 60) score -= 3; // Late response penalty
  }

  // Time of day factor
  if (lead.additionalInfo?.timeOfDay !== undefined) {
    const hour = lead.additionalInfo.timeOfDay;
    // Emergency hours (evening/weekend) indicate higher urgency
    if (hour < 8 || hour > 18) score += 2;
  }

  // Day of week factor
  if (lead.additionalInfo?.dayOfWeek !== undefined) {
    const day = lead.additionalInfo.dayOfWeek;
    // Weekend emergencies score higher
    if (day === 0 || day === 6) score += 2;
  }

  return Math.min(10, score);
}

/**
 * Calculate conversion probability
 */
function calculateConversionProbability(score: number, lead: Lead): number {
  // Base probability from score
  let probability = score / 100;

  // Adjust for specific factors
  if (lead.urgency === 'critical' || lead.urgency === 'high') {
    probability *= 1.2; // Emergency leads convert better
  }

  if (lead.contactMethod === 'phone' || lead.contactMethod === 'chat') {
    probability *= 1.15; // Direct contact converts better
  }

  if (lead.previousCustomer) {
    probability *= 1.3; // Repeat customers very likely to convert
  }

  // Insurance referrals convert very well
  if (lead.source === 'insurance-referral') {
    probability *= 1.25;
  }

  // Cap probability
  probability = Math.min(0.95, probability);

  return probability;
}

/**
 * Estimate job value
 */
function estimateJobValue(lead: Lead): number {
  const baseValues: Record<string, number> = {
    'water-damage': 3500,
    'fire-damage': 8000,
    mould: 2500,
    'storm-damage': 5000,
  };

  let value = baseValues[lead.serviceType] || 3000;

  // Adjust for damage extent
  if (lead.additionalInfo?.damageExtent) {
    const multipliers = {
      minor: 0.5,
      moderate: 1.0,
      major: 2.0,
      severe: 3.5,
    };
    value *= multipliers[lead.additionalInfo.damageExtent];
  }

  // Adjust for property type
  if (lead.propertyType === 'commercial') {
    value *= 2.5;
  }

  // Adjust for property value (residential)
  if (lead.propertyType === 'residential' && lead.propertyValue) {
    if (lead.propertyValue > 2000000) value *= 1.5;
    else if (lead.propertyValue > 1000000) value *= 1.3;
  }

  return Math.round(value);
}

/**
 * Generate recommendations for lead handling
 */
function generateLeadRecommendations(
  score: number,
  lead: Lead,
  tier: 'hot' | 'warm' | 'cold'
): string[] {
  const recommendations: string[] = [];

  // Tier-based recommendations
  if (tier === 'hot') {
    recommendations.push('Priority lead - contact within 5 minutes');
    recommendations.push('Assign to senior technician for assessment');

    if (lead.urgency === 'critical') {
      recommendations.push('URGENT: Dispatch emergency team immediately');
    }

    if (lead.propertyType === 'commercial' || (lead.propertyValue && lead.propertyValue > 1000000)) {
      recommendations.push('High-value property - assign IICRC Master Restorer');
    }
  } else if (tier === 'warm') {
    recommendations.push('Contact within 30 minutes');
    recommendations.push('Send detailed service information');

    if (lead.hasInsurance) {
      recommendations.push('Offer to coordinate with insurance company');
    }
  } else {
    recommendations.push('Follow up within 2 hours');
    recommendations.push('Send automated quote request form');
  }

  // Specific recommendations
  if (lead.hasInsurance) {
    recommendations.push('Emphasize insurance billing and claim assistance');
  }

  if (!lead.previousCustomer) {
    recommendations.push('Provide IICRC certification and credentials information');
    recommendations.push('Share customer testimonials and case studies');
  }

  if (lead.contactMethod === 'form' || lead.contactMethod === 'email') {
    recommendations.push('Follow up with phone call for better conversion');
  }

  if (lead.urgency === 'critical' || lead.urgency === 'high') {
    recommendations.push('Emphasize 60-minute emergency response time');
  }

  return recommendations;
}

/**
 * Batch score multiple leads
 */
export function scoreLeads(leads: Lead[]): LeadScore[] {
  return leads
    .map((lead) => scoreLead(lead))
    .sort((a, b) => b.score - a.score); // Sort by score descending
}

/**
 * Get lead prioritization queue
 */
export function prioritizeLeads(
  leads: Lead[]
): {
  hot: LeadScore[];
  warm: LeadScore[];
  cold: LeadScore[];
} {
  const scored = scoreLeads(leads);

  return {
    hot: scored.filter((l) => l.tier === 'hot'),
    warm: scored.filter((l) => l.tier === 'warm'),
    cold: scored.filter((l) => l.tier === 'cold'),
  };
}

/**
 * Calculate expected revenue from lead pipeline
 */
export function calculatePipelineValue(leads: Lead[]): {
  totalExpectedValue: number;
  weightedValue: number;
  byTier: {
    hot: number;
    warm: number;
    cold: number;
  };
} {
  const scored = scoreLeads(leads);

  const totalExpectedValue = scored.reduce(
    (sum, l) => sum + l.estimatedValue,
    0
  );

  const weightedValue = scored.reduce(
    (sum, l) => sum + l.estimatedValue * l.probability,
    0
  );

  const byTier = {
    hot: scored
      .filter((l) => l.tier === 'hot')
      .reduce((sum, l) => sum + l.estimatedValue * l.probability, 0),
    warm: scored
      .filter((l) => l.tier === 'warm')
      .reduce((sum, l) => sum + l.estimatedValue * l.probability, 0),
    cold: scored
      .filter((l) => l.tier === 'cold')
      .reduce((sum, l) => sum + l.estimatedValue * l.probability, 0),
  };

  return {
    totalExpectedValue: Math.round(totalExpectedValue),
    weightedValue: Math.round(weightedValue),
    byTier: {
      hot: Math.round(byTier.hot),
      warm: Math.round(byTier.warm),
      cold: Math.round(byTier.cold),
    },
  };
}
