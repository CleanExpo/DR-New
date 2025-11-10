/**
 * Customer Churn Prediction
 * Identify at-risk customers and predict churn probability
 */

export interface Customer {
  id: string;
  firstJobDate: Date;
  lastJobDate: Date;
  totalJobs: number;
  totalRevenue: number;
  averageJobValue: number;
  daysSinceLastJob: number;
  jobFrequency: number; // Jobs per year
  hasInsurance: boolean;
  preferredServiceType: string;
  satisfactionScore?: number; // 1-5
  responseToFollowups: number; // 0-1 (response rate)
  location: string;
  propertyType: 'residential' | 'commercial';
  complaints: number;
  referrals: number;
}

export interface ChurnPrediction {
  customer: Customer;
  churnProbability: number; // 0-1
  riskLevel: 'high' | 'medium' | 'low';
  estimatedLifetimeValue: number;
  potentialLoss: number;
  factors: {
    recency: number;
    engagement: number;
    satisfaction: number;
    value: number;
  };
  retentionActions: string[];
}

/**
 * Predict customer churn probability
 */
export function predictChurn(customer: Customer): ChurnPrediction {
  let churnScore = 0;
  const factors = {
    recency: 0,
    engagement: 0,
    satisfaction: 0,
    value: 0,
  };

  // Recency factor (0-40 points)
  factors.recency = calculateRecencyScore(customer.daysSinceLastJob);
  churnScore += factors.recency;

  // Engagement factor (0-25 points)
  factors.engagement = calculateEngagementScore(customer);
  churnScore += factors.engagement;

  // Satisfaction factor (0-20 points)
  factors.satisfaction = calculateSatisfactionScore(customer);
  churnScore += factors.satisfaction;

  // Value factor (0-15 points) - Inverse relationship
  factors.value = calculateValueScore(customer);
  churnScore += factors.value;

  // Convert to probability (inverse - higher score = higher churn)
  const churnProbability = churnScore / 100;

  // Determine risk level
  let riskLevel: 'high' | 'medium' | 'low' = 'low';
  if (churnProbability >= 0.6) {riskLevel = 'high';}
  else if (churnProbability >= 0.35) {riskLevel = 'medium';}

  // Calculate lifetime value
  const estimatedLifetimeValue = calculateLifetimeValue(customer);

  // Calculate potential loss
  const potentialLoss = estimatedLifetimeValue * churnProbability;

  // Generate retention actions
  const retentionActions = generateRetentionActions(
    customer,
    riskLevel,
    factors
  );

  return {
    customer,
    churnProbability,
    riskLevel,
    estimatedLifetimeValue,
    potentialLoss,
    factors,
    retentionActions,
  };
}

/**
 * Calculate recency score (days since last job)
 */
function calculateRecencyScore(daysSinceLastJob: number): number {
  // More days = higher churn risk
  if (daysSinceLastJob > 365) {return 40;} // Very high risk
  if (daysSinceLastJob > 180) {return 30;} // High risk
  if (daysSinceLastJob > 90) {return 20;} // Medium risk
  if (daysSinceLastJob > 30) {return 10;} // Low risk

  return 0; // Recent customer
}

/**
 * Calculate engagement score
 */
function calculateEngagementScore(customer: Customer): number {
  let score = 0;

  // Job frequency (lower frequency = higher churn)
  if (customer.jobFrequency < 0.5) {score += 15;} // Less than 1 job every 2 years
  else if (customer.jobFrequency < 1) {score += 10;}
  else if (customer.jobFrequency < 2) {score += 5;}

  // Follow-up response rate (lower response = higher churn)
  if (customer.responseToFollowups < 0.2) {score += 10;}
  else if (customer.responseToFollowups < 0.5) {score += 5;}

  return score;
}

/**
 * Calculate satisfaction score
 */
function calculateSatisfactionScore(customer: Customer): number {
  let score = 0;

  // Satisfaction rating
  if (customer.satisfactionScore !== undefined) {
    if (customer.satisfactionScore <= 2) {score += 20;} // Very dissatisfied
    else if (customer.satisfactionScore <= 3) {score += 10;}
    else if (customer.satisfactionScore === 4) {score += 0;}
    else {score -= 5;} // Very satisfied (reduces churn)
  }

  // Complaints
  score += customer.complaints * 5;

  // Referrals (inverse - more referrals = lower churn)
  score -= customer.referrals * 3;

  return Math.max(0, Math.min(20, score));
}

/**
 * Calculate value score (inverse - higher value customers less likely to churn)
 */
function calculateValueScore(customer: Customer): number {
  // Higher value customers are less likely to churn
  if (customer.totalRevenue > 50000) {return 0;}
  if (customer.totalRevenue > 20000) {return 3;}
  if (customer.totalRevenue > 10000) {return 5;}
  if (customer.totalRevenue > 5000) {return 8;}

  return 15; // Low value = higher churn risk
}

/**
 * Calculate customer lifetime value
 */
function calculateLifetimeValue(customer: Customer): number {
  // Simple CLV calculation: Average job value * Expected jobs per year * Expected years
  const avgJobValue = customer.averageJobValue;
  const jobsPerYear = customer.jobFrequency;
  const expectedYears = customer.propertyType === 'commercial' ? 10 : 5;

  const clv = avgJobValue * jobsPerYear * expectedYears;

  // Adjust for satisfaction and engagement
  let multiplier = 1.0;
  if (customer.satisfactionScore && customer.satisfactionScore >= 4) {
    multiplier = 1.2;
  } else if (customer.satisfactionScore && customer.satisfactionScore <= 2) {
    multiplier = 0.7;
  }

  if (customer.referrals > 0) {
    multiplier *= 1.1; // Referrers are more valuable
  }

  return Math.round(clv * multiplier);
}

/**
 * Generate retention actions
 */
function generateRetentionActions(
  customer: Customer,
  riskLevel: 'high' | 'medium' | 'low',
  factors: ChurnPrediction['factors']
): string[] {
  const actions: string[] = [];

  // High-risk customers
  if (riskLevel === 'high') {
    actions.push('URGENT: Personal outreach from senior management required');
    actions.push('Offer loyalty discount or free maintenance inspection');
    actions.push('Schedule face-to-face meeting to address concerns');

    if (customer.complaints > 0) {
      actions.push(
        'Address and resolve past complaints with service recovery'
      );
    }

    if (customer.totalRevenue > 10000) {
      actions.push(
        'VIP customer - offer premium maintenance package at discounted rate'
      );
    }
  }

  // Medium-risk customers
  if (riskLevel === 'medium') {
    actions.push('Send personalized re-engagement email');
    actions.push('Offer seasonal maintenance check or preventive service');

    if (customer.hasInsurance) {
      actions.push('Remind about insurance-covered maintenance services');
    }
  }

  // Recency-based actions
  if (factors.recency > 20) {
    actions.push(
      `Last job was ${customer.daysSinceLastJob} days ago - send check-in communication`
    );
    actions.push('Offer free property inspection or damage assessment');
  }

  // Engagement-based actions
  if (factors.engagement > 10) {
    actions.push('Low engagement - add to nurture email campaign');
    actions.push('Send educational content about property maintenance');
    actions.push('Invite to customer appreciation event or webinar');
  }

  // Satisfaction-based actions
  if (factors.satisfaction > 10) {
    actions.push('Low satisfaction - conduct satisfaction survey');
    actions.push('Assign customer success manager for ongoing support');

    if (customer.satisfactionScore && customer.satisfactionScore <= 3) {
      actions.push(
        'Follow up on recent job to ensure complete satisfaction'
      );
    }
  }

  // Value-based actions
  if (customer.totalRevenue > 20000) {
    actions.push('High-value customer - enroll in VIP loyalty program');
    actions.push('Offer dedicated account manager');
  }

  // General retention
  if (actions.length === 0) {
    actions.push('Maintain regular contact through quarterly check-ins');
    actions.push('Send helpful property maintenance tips');
  }

  return actions;
}

/**
 * Batch predict churn for multiple customers
 */
export function batchPredictChurn(customers: Customer[]): ChurnPrediction[] {
  return customers
    .map((customer) => predictChurn(customer))
    .sort((a, b) => b.potentialLoss - a.potentialLoss); // Sort by potential loss
}

/**
 * Identify high-risk customers for immediate action
 */
export function identifyHighRiskCustomers(
  customers: Customer[],
  valueThreshold: number = 5000
): ChurnPrediction[] {
  const predictions = batchPredictChurn(customers);

  return predictions.filter(
    (p) =>
      p.riskLevel === 'high' && p.customer.totalRevenue >= valueThreshold
  );
}

/**
 * Calculate retention campaign ROI
 */
export function calculateRetentionROI(
  predictions: ChurnPrediction[],
  campaignCost: number,
  successRate: number = 0.3 // 30% retention success
): {
  totalAtRisk: number;
  potentialSaved: number;
  roi: number;
  recommendedInvestment: number;
} {
  const totalAtRisk = predictions.reduce(
    (sum, p) => sum + p.potentialLoss,
    0
  );

  const potentialSaved = totalAtRisk * successRate;
  const roi = (potentialSaved - campaignCost) / campaignCost;

  // Recommend investing up to 20% of potential loss
  const recommendedInvestment = totalAtRisk * 0.2;

  return {
    totalAtRisk: Math.round(totalAtRisk),
    potentialSaved: Math.round(potentialSaved),
    roi: Math.round(roi * 100) / 100,
    recommendedInvestment: Math.round(recommendedInvestment),
  };
}

/**
 * Segment customers by churn risk and value
 */
export function segmentCustomers(customers: Customer[]): {
  champions: ChurnPrediction[]; // High value, low churn
  atRisk: ChurnPrediction[]; // High value, high churn
  needAttention: ChurnPrediction[]; // Medium value, medium/high churn
  hibernating: ChurnPrediction[]; // Low engagement
  lost: ChurnPrediction[]; // Very high churn probability
} {
  const predictions = batchPredictChurn(customers);

  return {
    champions: predictions.filter(
      (p) =>
        p.churnProbability < 0.3 && p.customer.totalRevenue > 10000
    ),
    atRisk: predictions.filter(
      (p) =>
        p.churnProbability >= 0.6 && p.customer.totalRevenue > 5000
    ),
    needAttention: predictions.filter(
      (p) =>
        p.churnProbability >= 0.35 &&
        p.churnProbability < 0.6 &&
        p.customer.totalRevenue > 3000
    ),
    hibernating: predictions.filter(
      (p) => p.customer.daysSinceLastJob > 180 && p.churnProbability < 0.6
    ),
    lost: predictions.filter((p) => p.churnProbability >= 0.8),
  };
}
