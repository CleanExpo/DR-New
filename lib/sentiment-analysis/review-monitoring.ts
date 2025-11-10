/**
 * Review Monitoring Process for Disaster Recovery Local Service
 * Automated monitoring and alert system for multi-platform reviews
 */

import { Review, SentimentAnalysis } from './review-analyzer';
import { ResponseTemplate } from './response-templates';

export interface MonitoringConfig {
  platforms: ReviewPlatform[];
  alertChannels: AlertChannel[];
  responseTimeTargets: ResponseTimeTarget[];
  escalationRules: EscalationRule[];
}

export interface ReviewPlatform {
  name: 'google' | 'facebook' | 'truelocal' | 'productreview' | 'wordofmouth';
  enabled: boolean;
  checkFrequency: number; // minutes
  apiEndpoint?: string;
  credentials?: Record<string, string>;
}

export interface AlertChannel {
  type: 'email' | 'sms' | 'slack' | 'dashboard';
  enabled: boolean;
  recipients: string[];
  urgencyFilter: ('high' | 'medium' | 'low')[];
}

export interface ResponseTimeTarget {
  urgency: 'high' | 'medium' | 'low';
  targetMinutes: number;
  warningMinutes: number;
}

export interface EscalationRule {
  condition: string;
  action: string;
  notifyPersonnel: string[];
}

export interface MonitoringAlert {
  id: string;
  timestamp: Date;
  review: Review;
  analysis: SentimentAnalysis;
  urgency: 'critical' | 'high' | 'medium' | 'low';
  message: string;
  actionRequired: string;
}

export class ReviewMonitoringSystem {
  private config: MonitoringConfig;

  constructor(config: MonitoringConfig) {
    this.config = config;
  }

  /**
   * Default monitoring configuration for disaster recovery business
   */
  static getDefaultConfig(): MonitoringConfig {
    return {
      platforms: [
        {
          name: 'google',
          enabled: true,
          checkFrequency: 60 // Check hourly
        },
        {
          name: 'facebook',
          enabled: true,
          checkFrequency: 120 // Check every 2 hours
        },
        {
          name: 'truelocal',
          enabled: true,
          checkFrequency: 180 // Check every 3 hours
        },
        {
          name: 'productreview',
          enabled: true,
          checkFrequency: 240 // Check every 4 hours
        },
        {
          name: 'wordofmouth',
          enabled: true,
          checkFrequency: 480 // Check every 8 hours
        }
      ],
      alertChannels: [
        {
          type: 'email',
          enabled: true,
          recipients: ['phill@disasterrecoverylocal.com.au'], // Replace with actual email
          urgencyFilter: ['high', 'medium', 'low']
        },
        {
          type: 'sms',
          enabled: true,
          recipients: ['+61400000000'], // Replace with actual mobile
          urgencyFilter: ['high'] // Only high urgency SMS
        },
        {
          type: 'dashboard',
          enabled: true,
          recipients: ['admin'],
          urgencyFilter: ['high', 'medium', 'low']
        }
      ],
      responseTimeTargets: [
        {
          urgency: 'high',
          targetMinutes: 120, // 2 hours for high priority
          warningMinutes: 90 // Warning at 1.5 hours
        },
        {
          urgency: 'medium',
          targetMinutes: 480, // 8 hours for medium priority
          warningMinutes: 360 // Warning at 6 hours
        },
        {
          urgency: 'low',
          targetMinutes: 1440, // 24 hours for low priority
          warningMinutes: 1200 // Warning at 20 hours
        }
      ],
      escalationRules: [
        {
          condition: 'rating <= 2 AND hours_since_review > 24',
          action: 'URGENT_ESCALATION',
          notifyPersonnel: ['director', 'operations_manager']
        },
        {
          condition: 'rating <= 2 AND platform = "google"',
          action: 'HIGH_PRIORITY',
          notifyPersonnel: ['director']
        },
        {
          condition: 'keywords_include "master restorer" AND rating <= 3',
          action: 'DIRECTOR_REVIEW',
          notifyPersonnel: ['director']
        },
        {
          condition: 'keywords_include "insurance" AND rating <= 2',
          action: 'INSURANCE_SPECIALIST_REVIEW',
          notifyPersonnel: ['director', 'insurance_coordinator']
        },
        {
          condition: 'location_in_high_value_suburbs AND rating <= 3',
          action: 'PERSONALIZED_RESPONSE_REQUIRED',
          notifyPersonnel: ['director']
        }
      ]
    };
  }

  /**
   * Generate monitoring alert for a review
   */
  generateAlert(
    review: Review,
    analysis: SentimentAnalysis
  ): MonitoringAlert | null {
    const hoursSinceReview = (Date.now() - review.date.getTime()) / (1000 * 60 * 60);

    // Determine alert urgency
    let urgency: 'critical' | 'high' | 'medium' | 'low' = 'low';
    let message = '';
    let actionRequired = '';

    // Critical: Negative review over 24 hours old
    if (review.rating <= 2 && hoursSinceReview > 24) {
      urgency = 'critical';
      message = `🚨 CRITICAL: ${review.rating}-star review on ${review.platform} from ${hoursSinceReview.toFixed(0)} hours ago has NO RESPONSE`;
      actionRequired = 'RESPOND IMMEDIATELY - Negative review severely impacting SEO and reputation';
    }
    // High: New negative review
    else if (review.rating <= 2 && hoursSinceReview < 2) {
      urgency = 'high';
      message = `⚠️ HIGH PRIORITY: New ${review.rating}-star review on ${review.platform}`;
      actionRequired = 'Respond within 2 hours - Use negative review template and offer direct resolution';
    }
    // High: Master Restorer mention in negative/neutral review
    else if (
      analysis.subCategories.includes('master_restorer_mention') &&
      review.rating <= 3
    ) {
      urgency = 'high';
      message = `⚠️ MASTER RESTORER MENTIONED: ${review.rating}-star review specifically references Master Restorer credentials`;
      actionRequired = 'Director (Phill McGurk) must respond personally - Use specialized template';
    }
    // High: Google review (impacts local SEO most)
    else if (review.platform === 'google' && review.rating <= 2) {
      urgency = 'high';
      message = `📍 HIGH PRIORITY: Google Business ${review.rating}-star review (impacts local SEO)`;
      actionRequired = 'Respond within 2 hours - Google reviews are most visible to potential clients';
    }
    // Medium: Neutral review or delayed response
    else if (review.rating === 3) {
      urgency = 'medium';
      message = `📊 Neutral 3-star review on ${review.platform}`;
      actionRequired = 'Respond within 8 hours - Address concerns and demonstrate commitment to improvement';
    }
    // Medium: Positive review with concerns
    else if (review.rating === 4) {
      urgency = 'medium';
      message = `⭐ 4-star review on ${review.platform} - mostly positive but with improvement areas`;
      actionRequired = 'Respond within 8 hours - Thank them and acknowledge areas for improvement';
    }
    // Low: Excellent 5-star review
    else if (review.rating === 5) {
      urgency = 'low';
      message = `✅ Excellent 5-star review on ${review.platform}`;
      actionRequired = 'Respond within 24 hours - Thank reviewer and reinforce positive experience';
    }
    else {
      // No alert needed
      return null;
    }

    // Add special alerts
    if (analysis.alerts.length > 0) {
      message += `\n${  analysis.alerts.map(a => `  • ${a}`).join('\n')}`;
    }

    return {
      id: `alert_${review.id}_${Date.now()}`,
      timestamp: new Date(),
      review,
      analysis,
      urgency,
      message,
      actionRequired
    };
  }

  /**
   * Check if response time target is being missed
   */
  checkResponseTimeTarget(review: Review, analysis: SentimentAnalysis): {
    isOverdue: boolean;
    warningIssued: boolean;
    minutesRemaining: number;
  } {
    const minutesSinceReview = (Date.now() - review.date.getTime()) / (1000 * 60);
    const target = this.config.responseTimeTargets.find(
      t => t.urgency === analysis.urgency
    );

    if (!target) {
      return { isOverdue: false, warningIssued: false, minutesRemaining: 0 };
    }

    const isOverdue = minutesSinceReview > target.targetMinutes;
    const warningIssued = minutesSinceReview > target.warningMinutes;
    const minutesRemaining = target.targetMinutes - minutesSinceReview;

    return { isOverdue, warningIssued, minutesRemaining };
  }

  /**
   * Evaluate escalation rules
   */
  evaluateEscalation(review: Review, analysis: SentimentAnalysis): EscalationRule[] {
    const triggeredRules: EscalationRule[] = [];
    const hoursSinceReview = (Date.now() - review.date.getTime()) / (1000 * 60 * 60);

    for (const rule of this.config.escalationRules) {
      let triggered = false;

      // Parse and evaluate condition
      if (rule.condition.includes('rating <= 2') && review.rating <= 2) {
        triggered = true;
      }
      if (rule.condition.includes('rating <= 3') && review.rating <= 3) {
        triggered = true;
      }
      if (
        rule.condition.includes('hours_since_review > 24') &&
        hoursSinceReview > 24
      ) {
        triggered = true;
      }
      if (
        rule.condition.includes('platform = "google"') &&
        review.platform === 'google'
      ) {
        triggered = true;
      }
      if (
        rule.condition.includes('keywords_include "master restorer"') &&
        analysis.subCategories.includes('master_restorer_mention')
      ) {
        triggered = true;
      }
      if (
        rule.condition.includes('keywords_include "insurance"') &&
        analysis.subCategories.includes('insurance_related')
      ) {
        triggered = true;
      }

      if (triggered) {
        triggeredRules.push(rule);
      }
    }

    return triggeredRules;
  }

  /**
   * Generate daily summary report
   */
  generateDailySummary(reviews: Review[]): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaysReviews = reviews.filter(r => r.date >= today);
    const pending = todaysReviews.filter(r => !this.hasResponse(r));

    const summary = `
📊 **Daily Review Summary - ${today.toLocaleDateString()}**

**Today's Reviews:**
• Total: ${todaysReviews.length}
• 5 Star: ${todaysReviews.filter(r => r.rating === 5).length}
• 4 Star: ${todaysReviews.filter(r => r.rating === 4).length}
• 3 Star: ${todaysReviews.filter(r => r.rating === 3).length}
• 2 Star: ${todaysReviews.filter(r => r.rating === 2).length}
• 1 Star: ${todaysReviews.filter(r => r.rating === 1).length}

**Platform Breakdown:**
• Google: ${todaysReviews.filter(r => r.platform === 'google').length}
• Facebook: ${todaysReviews.filter(r => r.platform === 'facebook').length}
• True Local: ${todaysReviews.filter(r => r.platform === 'truelocal').length}
• Other: ${todaysReviews.filter(r => !['google', 'facebook', 'truelocal'].includes(r.platform)).length}

**Pending Responses:**
• High Priority: ${pending.filter(r => r.rating <= 2).length}
• Medium Priority: ${pending.filter(r => r.rating === 3).length}
• Low Priority: ${pending.filter(r => r.rating >= 4).length}

**Action Required:**
${pending.length === 0 ? '✅ All reviews have been responded to!' : `⚠️ ${pending.length} reviews need responses`}

---
Generated by Disaster Recovery Review Monitoring System
Contact: 1300 309 361
    `.trim();

    return summary;
  }

  /**
   * Check if review has a response (stub - would integrate with actual platform APIs)
   */
  private hasResponse(review: Review): boolean {
    // This would integrate with actual platform APIs to check for responses
    // For now, return false to indicate all reviews need attention
    return false;
  }
}

/**
 * Review monitoring workflow checklist
 */
export const MONITORING_WORKFLOW = {
  title: 'Daily Review Monitoring Workflow',
  steps: [
    {
      time: '8:00 AM',
      task: 'Check overnight reviews',
      action: 'Review dashboard for new reviews received after hours',
      priority: 'high'
    },
    {
      time: '8:30 AM',
      task: 'Respond to urgent reviews',
      action: 'Address all negative (1-2 star) reviews from previous 24 hours',
      priority: 'critical'
    },
    {
      time: '10:00 AM',
      task: 'Process neutral reviews',
      action: 'Respond to 3-star reviews with appropriate templates',
      priority: 'medium'
    },
    {
      time: '2:00 PM',
      task: 'Thank positive reviewers',
      action: 'Respond to 4-5 star reviews with personalized thanks',
      priority: 'medium'
    },
    {
      time: '4:00 PM',
      task: 'Check compliance',
      action: 'Verify all reviews received today have responses',
      priority: 'high'
    },
    {
      time: '5:00 PM',
      task: 'Generate daily report',
      action: 'Review daily summary and identify any patterns',
      priority: 'medium'
    }
  ],
  notes: [
    'Negative reviews must be responded to within 2 hours during business hours',
    'All Google Business reviews are highest priority (impact local SEO)',
    'Master Restorer mentions require director (Phill McGurk) personal response',
    'Weekend and after-hours reviews should be checked first thing Monday morning',
    'Keep response templates updated based on recurring themes',
    'Track response times and client satisfaction with responses'
  ]
};

/**
 * Platform-specific monitoring tips
 */
export const PLATFORM_MONITORING_TIPS = {
  google: {
    importance: 'CRITICAL - Highest impact on local SEO',
    checkFrequency: 'Every hour during business hours',
    responseTime: 'Within 2 hours for negative, 24 hours for all others',
    specialNotes: [
      'Google reviews appear in Google Maps and Search results',
      'Response shows professionalism to all future potential clients',
      'Negative reviews without responses severely harm rankings',
      'Can only edit response within 7 days of posting'
    ]
  },
  facebook: {
    importance: 'HIGH - Social proof and community engagement',
    checkFrequency: 'Every 2 hours during business hours',
    responseTime: 'Within 4 hours for negative, 24 hours for positive',
    specialNotes: [
      'Facebook reviews visible to friends/family of reviewer',
      'Can lead to additional comments and discussion',
      'Good platform for showing personality and warmth',
      'Consider private message for sensitive issues'
    ]
  },
  truelocal: {
    importance: 'MEDIUM - Local directory visibility',
    checkFrequency: 'Every 3-4 hours',
    responseTime: 'Within 24 hours for all reviews',
    specialNotes: [
      'True Local specifically targets local service searches',
      'Often accessed by insurance companies and property managers',
      'Professional tone especially important here',
      'Good platform to highlight Master Restorer credentials'
    ]
  },
  productreview: {
    importance: 'MEDIUM - Consumer comparison platform',
    checkFrequency: 'Daily check',
    responseTime: 'Within 24 hours for negative, 48 hours for positive',
    specialNotes: [
      'ProductReview users are actively comparing services',
      'Detailed responses can influence potential clients',
      'Good platform for explaining process and value',
      'Can update responses as situations resolve'
    ]
  },
  wordofmouth: {
    importance: 'LOW-MEDIUM - General visibility',
    checkFrequency: 'Weekly check',
    responseTime: 'Within 48 hours',
    specialNotes: [
      'Less trafficked but still visible to searchers',
      'Consistent responses show attention to all platforms',
      'Maintain same professional standards as other platforms'
    ]
  }
};

export default ReviewMonitoringSystem;
