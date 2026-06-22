
/**
 * Custom Analytics Tracking Utility
 *
 * Provides type-safe event tracking for marketing campaigns,
 * conversions, and user behavior analytics.
 *
 * Integrates with:
 * - Google Analytics 4 (GA4)
 * - Vercel Analytics
 * - Custom event tracking
 */

import * as Sentry from '@sentry/nextjs';

// Event categories for analytics
export enum EventCategory {
  // User Journey
  CONTRACTOR_SEARCH = 'contractor_search',
  CONTRACTOR_VIEW = 'contractor_view',
  CLAIM_SUBMISSION = 'claim_submission',
  USER_REGISTRATION = 'user_registration',

  // Conversions
  CONVERSION_QUOTE_REQUEST = 'conversion_quote_request',
  CONVERSION_CONTRACTOR_SIGNUP = 'conversion_contractor_signup',
  CONVERSION_EMAIL_SIGNUP = 'conversion_email_signup',

  // Engagement
  ENGAGEMENT_DIRECTORY_FILTER = 'engagement_directory_filter',
  ENGAGEMENT_MAP_INTERACTION = 'engagement_map_interaction',
  ENGAGEMENT_COMPARISON_TOOL = 'engagement_comparison_tool',
  ENGAGEMENT_REVIEW_SUBMISSION = 'engagement_review_submission',

  // Marketing
  MARKETING_CAMPAIGN_CLICK = 'marketing_campaign_click',
  MARKETING_LANDING_PAGE_VIEW = 'marketing_landing_page_view',

  // Errors (for Sentry context)
  ERROR_FORM_VALIDATION = 'error_form_validation',
  ERROR_API_FAILURE = 'error_api_failure',
  ERROR_PAYMENT_FAILED = 'error_payment_failed',
}

// Event action types
export enum EventAction {
  CLICK = 'click',
  VIEW = 'view',
  SUBMIT = 'submit',
  COMPLETE = 'complete',
  START = 'start',
  CANCEL = 'cancel',
  ERROR = 'error',
  FILTER = 'filter',
  SEARCH = 'search',
  SHARE = 'share',
  DOWNLOAD = 'download',
}

// Type-safe event properties
export interface AnalyticsEvent {
  category: EventCategory;
  action: EventAction;
  label?: string;
  value?: number;
  properties?: Record<string, any>;
}

// Conversion event types (for marketing attribution)
export interface ConversionEvent extends AnalyticsEvent {
  category:
    | EventCategory.CONVERSION_QUOTE_REQUEST
    | EventCategory.CONVERSION_CONTRACTOR_SIGNUP
    | EventCategory.CONVERSION_EMAIL_SIGNUP;
  value: number; // Estimated conversion value in cents
}

/**
 * Track a custom analytics event
 */
export function trackEvent(event: AnalyticsEvent): void {
  try {
    // Send to Google Analytics 4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        ...event.properties,
      });
    }

    // Send to Vercel Analytics (for conversion tracking)
    if (typeof window !== 'undefined' && window.va) {
      window.va('track', event.category, {
        action: event.action,
        label: event.label,
        value: event.value,
        ...event.properties,
      });
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics] Event tracked:', event);
    }

    // Add to Sentry breadcrumbs for error context
    Sentry.addBreadcrumb({
      category: 'analytics',
      message: `${event.category} - ${event.action}`,
      level: 'info',
      data: {
        label: event.label,
        value: event.value,
        ...event.properties,
      },
    });
  } catch (error) {
    // Silently fail - don't break user experience for analytics errors
    console.warn('[Analytics] Failed to track event:', error);
  }
}

/**
 * Track a conversion event (marketing attribution)
 */
export function trackConversion(event: ConversionEvent): void {
  try {
    trackEvent(event);

    // Send conversion-specific data to GA4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
        value: event.value / 100, // Convert cents to dollars
        currency: 'AUD',
        transaction_id: `conv_${Date.now()}`,
        ...event.properties,
      });
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics] Conversion tracked:', event);
    }
  } catch (error) {
    console.warn('[Analytics] Failed to track conversion:', error);
  }
}

/**
 * Track contractor profile view
 */
export function trackContractorView(contractorId: string, contractorName: string): void {
  trackEvent({
    category: EventCategory.CONTRACTOR_VIEW,
    action: EventAction.VIEW,
    label: contractorName,
    properties: {
      contractor_id: contractorId,
    },
  });
}

/**
 * Track contractor search/filter
 */
export function trackContractorSearch(filters: {
  postcode?: string;
  serviceType?: string;
  emergencyLevel?: string;
  minRating?: number;
}): void {
  trackEvent({
    category: EventCategory.CONTRACTOR_SEARCH,
    action: EventAction.SEARCH,
    properties: filters,
  });
}

/**
 * Track claim submission start
 */
export function trackClaimSubmissionStart(serviceType: string): void {
  trackEvent({
    category: EventCategory.CLAIM_SUBMISSION,
    action: EventAction.START,
    label: serviceType,
  });
}

/**
 * Track claim submission completion (CONVERSION)
 */
export function trackClaimSubmissionComplete(claimId: string, serviceType: string): void {
  trackConversion({
    category: EventCategory.CONVERSION_QUOTE_REQUEST,
    action: EventAction.COMPLETE,
    label: serviceType,
    value: 10000, // $100 estimated conversion value
    properties: {
      claim_id: claimId,
      service_type: serviceType,
    },
  });
}

/**
 * Track contractor signup (CONVERSION)
 */
export function trackContractorSignup(contractorId: string, businessName: string): void {
  trackConversion({
    category: EventCategory.CONVERSION_CONTRACTOR_SIGNUP,
    action: EventAction.COMPLETE,
    label: businessName,
    value: 50000, // $500 estimated contractor value
    properties: {
      contractor_id: contractorId,
    },
  });
}

/**
 * Track email signup (CONVERSION)
 */
export function trackEmailSignup(email: string, source: string): void {
  trackConversion({
    category: EventCategory.CONVERSION_EMAIL_SIGNUP,
    action: EventAction.COMPLETE,
    label: source,
    value: 500, // $5 estimated email value
    properties: {
      source,
      email_hash: hashEmail(email), // Privacy: only send hashed email
    },
  });
}

/**
 * Track directory filter usage
 */
export function trackDirectoryFilter(filterType: string, filterValue: string): void {
  trackEvent({
    category: EventCategory.ENGAGEMENT_DIRECTORY_FILTER,
    action: EventAction.FILTER,
    label: filterType,
    properties: {
      filter_type: filterType,
      filter_value: filterValue,
    },
  });
}

/**
 * Track service area map interaction
 */
export function trackMapInteraction(contractorId: string, interactionType: 'zoom' | 'pan' | 'marker_click'): void {
  trackEvent({
    category: EventCategory.ENGAGEMENT_MAP_INTERACTION,
    action: EventAction.CLICK,
    label: interactionType,
    properties: {
      contractor_id: contractorId,
      interaction_type: interactionType,
    },
  });
}

/**
 * Track contractor comparison usage
 */
export function trackContractorComparison(contractorIds: string[]): void {
  trackEvent({
    category: EventCategory.ENGAGEMENT_COMPARISON_TOOL,
    action: EventAction.VIEW,
    properties: {
      contractor_count: contractorIds.length,
      contractor_ids: contractorIds,
    },
  });
}

/**
 * Track review submission
 */
export function trackReviewSubmission(contractorId: string, rating: number): void {
  trackEvent({
    category: EventCategory.ENGAGEMENT_REVIEW_SUBMISSION,
    action: EventAction.SUBMIT,
    label: `${rating} stars`,
    value: rating,
    properties: {
      contractor_id: contractorId,
      rating,
    },
  });
}

/**
 * Track marketing campaign click (from ads, emails, social)
 */
export function trackCampaignClick(campaignName: string, source: string, medium: string): void {
  trackEvent({
    category: EventCategory.MARKETING_CAMPAIGN_CLICK,
    action: EventAction.CLICK,
    label: campaignName,
    properties: {
      campaign_name: campaignName,
      campaign_source: source,
      campaign_medium: medium,
    },
  });
}

/**
 * Track landing page view (for marketing attribution)
 */
export function trackLandingPageView(pageName: string, referrer?: string): void {
  trackEvent({
    category: EventCategory.MARKETING_LANDING_PAGE_VIEW,
    action: EventAction.VIEW,
    label: pageName,
    properties: {
      page_name: pageName,
      referrer: referrer || document.referrer,
    },
  });
}

/**
 * Track form validation errors (for UX improvement)
 */
export function trackFormValidationError(formName: string, fieldName: string, errorType: string): void {
  trackEvent({
    category: EventCategory.ERROR_FORM_VALIDATION,
    action: EventAction.ERROR,
    label: `${formName} - ${fieldName}`,
    properties: {
      form_name: formName,
      field_name: fieldName,
      error_type: errorType,
    },
  });

  // Also send to Sentry for monitoring
  Sentry.captureMessage(`Form validation error: ${formName}.${fieldName}`, {
    level: 'info',
    tags: {
      form: formName,
      field: fieldName,
      error_type: errorType,
    },
  });
}

/**
 * Track API failures (for reliability monitoring)
 */
export function trackAPIFailure(endpoint: string, statusCode: number, errorMessage: string): void {
  trackEvent({
    category: EventCategory.ERROR_API_FAILURE,
    action: EventAction.ERROR,
    label: endpoint,
    value: statusCode,
    properties: {
      endpoint,
      status_code: statusCode,
      error_message: errorMessage,
    },
  });

  // Send to Sentry for alerting
  Sentry.captureException(new Error(`API Failure: ${endpoint}`), {
    tags: {
      endpoint,
      status_code: statusCode,
    },
    extra: {
      error_message: errorMessage,
    },
  });
}

/**
 * Track payment failures (CRITICAL for monitoring)
 */
export function trackPaymentFailure(claimId: string, amount: number, errorCode: string): void {
  trackEvent({
    category: EventCategory.ERROR_PAYMENT_FAILED,
    action: EventAction.ERROR,
    label: errorCode,
    value: amount,
    properties: {
      claim_id: claimId,
      amount,
      error_code: errorCode,
    },
  });

  // Critical error - send to Sentry with high priority
  Sentry.captureException(new Error(`Payment failure: ${errorCode}`), {
    level: 'error',
    tags: {
      claim_id: claimId,
      error_code: errorCode,
    },
    extra: {
      amount,
    },
  });
}

/**
 * Hash email for privacy-safe tracking
 */
function hashEmail(email: string): string {
  // Simple hash for privacy - not cryptographically secure
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    const char = email.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString(36);
}

// TypeScript declarations for window objects
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    va?: (...args: any[]) => void;
  }
}
