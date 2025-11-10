/**
 * Lead Scoring Service
 *
 * Classifies leads as hot/warm/cold based on multiple signals
 */

export interface LeadScoringInput {
  serviceType: string;
  urgencyLevel: string;
  propertyType: string;
  hasInsurance: boolean;
  insuranceCompany?: string;
  estimatedArea?: number;
  propertyValue?: string;
  budget?: string;
  readyToStart?: string;
  decisionMaker: boolean;
  hasPhotos: boolean;
  responseTime?: number; // milliseconds since form submission
  source?: string;
  previousCustomer?: boolean;
}

export interface LeadScore {
  score: number; // 0-100
  classification: 'hot' | 'warm' | 'cold';
  priority: 'critical' | 'high' | 'medium' | 'low';
  estimatedValue: number;
  conversionProbability: number; // 0-1
  recommendedAction: string;
  scoringFactors: Array<{
    factor: string;
    points: number;
    weight: number;
    impact: 'positive' | 'negative' | 'neutral';
  }>;
}

/**
 * Calculate comprehensive lead score
 */
export function calculateLeadScore(input: LeadScoringInput): LeadScore {
  let score = 0;
  const factors: LeadScore['scoringFactors'] = [];

  // 1. Urgency scoring (25 points max)
  const urgencyPoints = {
    critical: 25,
    urgent: 18,
    standard: 10,
  }[input.urgencyLevel.toLowerCase()] || 5;

  score += urgencyPoints;
  factors.push({
    factor: 'Urgency Level',
    points: urgencyPoints,
    weight: 0.25,
    impact: urgencyPoints > 15 ? 'positive' : 'neutral',
  });

  // 2. Service type complexity/value (15 points max)
  const servicePoints = {
    fire: 15,
    biohazard: 15,
    water: 12,
    storm: 12,
    mould: 10,
  }[input.serviceType.toLowerCase()] || 8;

  score += servicePoints;
  factors.push({
    factor: 'Service Type',
    points: servicePoints,
    weight: 0.15,
    impact: servicePoints >= 12 ? 'positive' : 'neutral',
  });

  // 3. Property type (15 points max)
  const propertyPoints = input.propertyType === 'commercial' ? 15 : 8;
  score += propertyPoints;
  factors.push({
    factor: 'Property Type',
    points: propertyPoints,
    weight: 0.15,
    impact: propertyPoints > 10 ? 'positive' : 'neutral',
  });

  // 4. Insurance status (10 points max)
  let insurancePoints = 0;
  if (input.hasInsurance) {
    insurancePoints = 10;
    // Bonus for known insurance partners
    const partnerInsurers = ['AAMI', 'Suncorp', 'RACQ', 'Allianz', 'QBE'];
    if (input.insuranceCompany && partnerInsurers.includes(input.insuranceCompany)) {
      insurancePoints = 12;
    }
  } else {
    insurancePoints = 5; // Self-pay can still be valuable
  }

  score += insurancePoints;
  factors.push({
    factor: 'Insurance Status',
    points: insurancePoints,
    weight: 0.10,
    impact: insurancePoints >= 10 ? 'positive' : 'neutral',
  });

  // 5. Project size (15 points max)
  let sizePoints = 8; // Default
  if (input.estimatedArea) {
    if (input.estimatedArea > 200) {sizePoints = 15;}
    else if (input.estimatedArea > 100) {sizePoints = 12;}
    else if (input.estimatedArea > 50) {sizePoints = 10;}
  }

  score += sizePoints;
  factors.push({
    factor: 'Project Size',
    points: sizePoints,
    weight: 0.15,
    impact: sizePoints >= 12 ? 'positive' : 'neutral',
  });

  // 6. Decision maker (5 points)
  const decisionPoints = input.decisionMaker ? 5 : 0;
  score += decisionPoints;
  factors.push({
    factor: 'Decision Maker',
    points: decisionPoints,
    weight: 0.05,
    impact: decisionPoints > 0 ? 'positive' : 'negative',
  });

  // 7. Readiness to start (10 points max)
  const readinessPoints = {
    'Immediately': 10,
    'Within 24 hours': 8,
    'Within a week': 5,
    'Within a month': 3,
  }[input.readyToStart || ''] || 2;

  score += readinessPoints;
  factors.push({
    factor: 'Ready to Start',
    points: readinessPoints,
    weight: 0.10,
    impact: readinessPoints >= 8 ? 'positive' : 'neutral',
  });

  // 8. Has photos/documentation (5 points)
  const photoPoints = input.hasPhotos ? 5 : 0;
  score += photoPoints;
  factors.push({
    factor: 'Documentation Provided',
    points: photoPoints,
    weight: 0.05,
    impact: photoPoints > 0 ? 'positive' : 'neutral',
  });

  // 9. Previous customer bonus (10 points)
  const loyaltyPoints = input.previousCustomer ? 10 : 0;
  score += loyaltyPoints;
  if (loyaltyPoints > 0) {
    factors.push({
      factor: 'Previous Customer',
      points: loyaltyPoints,
      weight: 0.10,
      impact: 'positive',
    });
  }

  // 10. Response time (time since form submission)
  let responsePoints = 0;
  if (input.responseTime !== undefined) {
    const minutesSinceSubmission = input.responseTime / (1000 * 60);
    if (minutesSinceSubmission < 5) {responsePoints = 5;}
    else if (minutesSinceSubmission < 15) {responsePoints = 3;}
    else if (minutesSinceSubmission < 60) {responsePoints = 1;}
    else {responsePoints = -2;} // Penalty for slow response

    factors.push({
      factor: 'Response Timeliness',
      points: responsePoints,
      weight: 0.05,
      impact: responsePoints > 0 ? 'positive' : 'negative',
    });
    score += responsePoints;
  }

  // Normalize score to 0-100
  score = Math.max(0, Math.min(100, score));

  // Classification
  let classification: 'hot' | 'warm' | 'cold';
  let priority: 'critical' | 'high' | 'medium' | 'low';

  if (score >= 80) {
    classification = 'hot';
    priority = 'critical';
  } else if (score >= 60) {
    classification = 'hot';
    priority = 'high';
  } else if (score >= 40) {
    classification = 'warm';
    priority = 'medium';
  } else {
    classification = 'cold';
    priority = 'low';
  }

  // Estimate conversion probability (0-1)
  const conversionProbability = Math.min(1, score / 100);

  // Estimate value
  const estimatedValue = estimateLeadValue(input);

  // Recommended action
  const recommendedAction = getRecommendedAction(classification, priority, input);

  return {
    score,
    classification,
    priority,
    estimatedValue,
    conversionProbability,
    recommendedAction,
    scoringFactors: factors,
  };
}

/**
 * Estimate lead value in AUD
 */
function estimateLeadValue(input: LeadScoringInput): number {
  let baseValue = 2500;

  // Service type base value
  const serviceValues = {
    fire: 8000,
    biohazard: 7000,
    water: 4500,
    storm: 5000,
    mould: 3500,
  };
  baseValue = serviceValues[input.serviceType.toLowerCase() as keyof typeof serviceValues] || 2500;

  // Property type multiplier
  if (input.propertyType === 'commercial') {
    baseValue *= 2.5;
  }

  // Area-based adjustment
  if (input.estimatedArea) {
    baseValue += input.estimatedArea * 50;
  }

  // Urgency multiplier
  const urgencyMultipliers = {
    critical: 2.0,
    urgent: 1.5,
    standard: 1.0,
  };
  baseValue *= urgencyMultipliers[input.urgencyLevel.toLowerCase() as keyof typeof urgencyMultipliers] || 1.0;

  return Math.round(baseValue);
}

/**
 * Get recommended action based on classification
 */
function getRecommendedAction(
  classification: string,
  priority: string,
  input: LeadScoringInput
): string {
  if (classification === 'hot' && priority === 'critical') {
    return 'IMMEDIATE CALLBACK REQUIRED - Contact within 5 minutes. Consider auto-assignment to available contractor.';
  }

  if (classification === 'hot') {
    return 'High priority lead - Contact within 15 minutes. Prepare quote and schedule immediate assessment.';
  }

  if (classification === 'warm') {
    return 'Contact within 1 hour. Send initial information and schedule follow-up call.';
  }

  return 'Standard follow-up - Contact within 4 hours during business hours. Add to nurture sequence.';
}

/**
 * Batch score multiple leads
 */
export function batchScoreLeads(leads: LeadScoringInput[]): LeadScore[] {
  return leads.map((lead) => calculateLeadScore(lead));
}

/**
 * Re-score lead after interaction
 */
export function rescoreLead(
  currentScore: LeadScore,
  interaction: {
    type: 'call_attempted' | 'call_connected' | 'email_opened' | 'quote_viewed' | 'quote_declined' | 'no_answer';
    timestamp: Date;
  }
): LeadScore {
  const adjustments = {
    call_connected: 10,
    email_opened: 3,
    quote_viewed: 5,
    call_attempted: -2,
    quote_declined: -15,
    no_answer: -5,
  };

  const adjustment = adjustments[interaction.type] || 0;
  const newScore = Math.max(0, Math.min(100, currentScore.score + adjustment));

  return {
    ...currentScore,
    score: newScore,
    classification: newScore >= 60 ? 'hot' : newScore >= 40 ? 'warm' : 'cold',
    priority:
      newScore >= 80
        ? 'critical'
        : newScore >= 60
        ? 'high'
        : newScore >= 40
        ? 'medium'
        : 'low',
  };
}

/**
 * Get leads requiring follow-up
 */
export function getLeadsRequiringFollowUp(
  leads: Array<{
    id: string;
    score: LeadScore;
    lastContactedAt?: Date;
    status: string;
  }>
): Array<{ id: string; reason: string; urgency: string }> {
  const now = new Date();
  const followUps = [];

  for (const lead of leads) {
    if (lead.status === 'COMPLETED' || lead.status === 'REJECTED') {
      continue;
    }

    const hoursSinceContact = lead.lastContactedAt
      ? (now.getTime() - lead.lastContactedAt.getTime()) / (1000 * 60 * 60)
      : 999;

    if (lead.score.classification === 'hot' && hoursSinceContact > 2) {
      followUps.push({
        id: lead.id,
        reason: 'Hot lead not contacted in 2+ hours',
        urgency: 'critical',
      });
    } else if (lead.score.classification === 'warm' && hoursSinceContact > 24) {
      followUps.push({
        id: lead.id,
        reason: 'Warm lead not contacted in 24+ hours',
        urgency: 'high',
      });
    } else if (hoursSinceContact > 72) {
      followUps.push({
        id: lead.id,
        reason: 'Lead not contacted in 72+ hours',
        urgency: 'medium',
      });
    }
  }

  return followUps;
}
