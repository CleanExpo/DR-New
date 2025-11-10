/**
 * Sentiment Analysis System for Disaster Recovery Reviews
 * Analyzes reviews from Google Business, Facebook, True Local, and social media
 */

export interface Review {
  id: string;
  platform: 'google' | 'facebook' | 'truelocal' | 'social' | 'direct';
  rating: number;
  text: string;
  author: string;
  date: Date;
  location?: string;
  serviceType?: string;
}

export interface SentimentAnalysis {
  category: SentimentCategory;
  subCategories: string[];
  urgency: 'high' | 'medium' | 'low';
  keywords: string[];
  recommendedTemplate: string;
  requiresCustomization: boolean;
  alerts: string[];
}

export type SentimentCategory =
  | 'positive'
  | 'neutral'
  | 'negative'
  | 'emergency_related'
  | 'insurance_related'
  | 'master_restorer_mention';

export class ReviewSentimentAnalyzer {
  private readonly emergencyKeywords = [
    'emergency', 'urgent', 'immediate', '24/7', 'fast response',
    'quick', 'rapid', 'same day', 'late night', 'weekend'
  ];

  private readonly insuranceKeywords = [
    'insurance', 'claim', 'adjuster', 'coverage', 'policy',
    'insurer', 'assessment', 'payout', 'excess', 'premium'
  ];

  private readonly masterRestorerKeywords = [
    'master restorer', 'certified', 'qualification', 'iicrc',
    'phill mcgurk', 'phil', 'expertise', 'professional',
    'accreditation', 'master certified'
  ];

  private readonly serviceKeywords = {
    water: ['water', 'flood', 'leak', 'moisture', 'drying', 'extraction'],
    fire: ['fire', 'smoke', 'soot', 'burn', 'ash'],
    mould: ['mould', 'mold', 'fungus', 'spores', 'growth'],
    storm: ['storm', 'wind', 'hail', 'weather', 'cyclone'],
    commercial: ['commercial', 'business', 'office', 'retail', 'warehouse']
  };

  private readonly highValueSuburbs = [
    'hamilton', 'ascot', 'new farm', 'toowong', 'paddington',
    'karalee', 'brookwater', 'springfield lakes'
  ];

  /**
   * Analyze review sentiment and categorize
   */
  analyzeReview(review: Review): SentimentAnalysis {
    const lowerText = review.text.toLowerCase();
    const categories: string[] = [];
    const keywords: string[] = [];
    const alerts: string[] = [];

    // Detect service type
    let serviceType: string | null = null;
    for (const [type, words] of Object.entries(this.serviceKeywords)) {
      if (words.some(word => lowerText.includes(word))) {
        serviceType = type;
        keywords.push(...words.filter(w => lowerText.includes(w)));
      }
    }

    // Check for emergency mentions
    const hasEmergency = this.emergencyKeywords.some(kw => lowerText.includes(kw));
    if (hasEmergency) {
      categories.push('emergency_related');
      keywords.push(...this.emergencyKeywords.filter(kw => lowerText.includes(kw)));
    }

    // Check for insurance mentions
    const hasInsurance = this.insuranceKeywords.some(kw => lowerText.includes(kw));
    if (hasInsurance) {
      categories.push('insurance_related');
      keywords.push(...this.insuranceKeywords.filter(kw => lowerText.includes(kw)));
    }

    // Check for Master Restorer mentions
    const hasMasterRestorer = this.masterRestorerKeywords.some(kw => lowerText.includes(kw));
    if (hasMasterRestorer) {
      categories.push('master_restorer_mention');
      keywords.push(...this.masterRestorerKeywords.filter(kw => lowerText.includes(kw)));
      alerts.push('Master Restorer mentioned - high priority response');
    }

    // Check for high-value location
    const isHighValueArea = this.highValueSuburbs.some(suburb =>
      lowerText.includes(suburb) || review.location?.toLowerCase().includes(suburb)
    );
    if (isHighValueArea) {
      alerts.push('High-value area client - personalized response required');
    }

    // Determine primary sentiment category
    let primaryCategory: SentimentCategory;
    if (review.rating >= 4) {
      primaryCategory = 'positive';
    } else if (review.rating === 3) {
      primaryCategory = 'neutral';
    } else {
      primaryCategory = 'negative';
      alerts.push('URGENT: Negative review requires immediate response');
    }

    // Override with specialized categories if detected
    if (categories.includes('emergency_related')) {
      primaryCategory = 'emergency_related';
    } else if (categories.includes('master_restorer_mention') && review.rating >= 4) {
      primaryCategory = 'master_restorer_mention';
    } else if (categories.includes('insurance_related') && review.rating <= 2) {
      alerts.push('Insurance complaint - may need claim specialist review');
    }

    // Determine urgency
    let urgency: 'high' | 'medium' | 'low' = 'medium';
    if (review.rating <= 2) {
      urgency = 'high';
    } else if (review.rating === 5 && hasMasterRestorer) {
      urgency = 'high'; // Excellent reviews worth quick response
    } else if (review.rating === 3) {
      urgency = 'medium';
    } else {
      urgency = 'low';
    }

    // Recommend template
    const recommendedTemplate = this.selectTemplate(
      primaryCategory,
      review.rating,
      serviceType,
      hasInsurance,
      hasEmergency,
      hasMasterRestorer
    );

    return {
      category: primaryCategory,
      subCategories: categories,
      urgency,
      keywords: [...new Set(keywords)],
      recommendedTemplate,
      requiresCustomization: review.rating <= 3 || isHighValueArea,
      alerts
    };
  }

  /**
   * Select appropriate response template
   */
  private selectTemplate(
    category: SentimentCategory,
    rating: number,
    serviceType: string | null,
    hasInsurance: boolean,
    hasEmergency: boolean,
    hasMasterRestorer: boolean
  ): string {
    if (rating === 5) {
      if (hasEmergency) {return 'positive_emergency_response';}
      if (serviceType === 'water') {return 'positive_water_damage';}
      if (serviceType === 'fire') {return 'positive_fire_damage';}
      if (hasInsurance) {return 'positive_insurance_claim';}
      if (hasMasterRestorer) {return 'positive_master_restorer';}
      return 'positive_general';
    }

    if (rating === 4) {
      return 'positive_general';
    }

    if (rating === 3) {
      if (hasInsurance) {return 'neutral_insurance_expensive';}
      return 'neutral_general';
    }

    // Rating 1-2
    if (hasInsurance) {return 'negative_insurance_coverage';}
    if (hasMasterRestorer) {return 'negative_expectations';}

    const lowerService = serviceType?.toLowerCase() || '';
    if (lowerService.includes('expensive') || lowerService.includes('cost')) {
      return 'negative_pricing';
    }
    if (lowerService.includes('slow') || lowerService.includes('time')) {
      return 'negative_timeline';
    }
    if (lowerService.includes('communication')) {
      return 'negative_communication';
    }

    return 'negative_general';
  }

  /**
   * Generate alert notifications for review monitoring
   */
  generateAlerts(analysis: SentimentAnalysis, review: Review): string[] {
    const alerts: string[] = [...analysis.alerts];

    // Add time-based alerts
    const hoursSinceReview = (Date.now() - review.date.getTime()) / (1000 * 60 * 60);

    if (analysis.urgency === 'high' && hoursSinceReview > 2) {
      alerts.push('⚠️ High priority review over 2 hours old - respond immediately');
    }

    if (review.rating <= 2 && hoursSinceReview > 24) {
      alerts.push('🚨 CRITICAL: Negative review over 24 hours without response');
    }

    // Platform-specific alerts
    if (review.platform === 'google' && review.rating <= 2) {
      alerts.push('📍 Google review impacts local SEO - priority response');
    }

    return alerts;
  }

  /**
   * Calculate overall sentiment score
   */
  calculateSentimentScore(reviews: Review[]): {
    averageRating: number;
    totalReviews: number;
    positivePercent: number;
    neutralPercent: number;
    negativePercent: number;
    responseRate: number;
  } {
    const total = reviews.length;
    if (total === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
        positivePercent: 0,
        neutralPercent: 0,
        negativePercent: 0,
        responseRate: 0
      };
    }

    const positive = reviews.filter(r => r.rating >= 4).length;
    const neutral = reviews.filter(r => r.rating === 3).length;
    const negative = reviews.filter(r => r.rating <= 2).length;
    const average = reviews.reduce((sum, r) => sum + r.rating, 0) / total;

    return {
      averageRating: Math.round(average * 10) / 10,
      totalReviews: total,
      positivePercent: Math.round((positive / total) * 100),
      neutralPercent: Math.round((neutral / total) * 100),
      negativePercent: Math.round((negative / total) * 100),
      responseRate: 0 // To be calculated based on response tracking
    };
  }
}

export default ReviewSentimentAnalyzer;
