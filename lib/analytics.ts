/**
 * Comprehensive Google Analytics 4 Conversion Tracking
 * Disaster Recovery Services - Local Business Focus
 */

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

// Type definitions
export interface ConversionEvent {
  eventName: string;
  eventCategory: string;
  eventLabel?: string;
  eventValue?: number;
  currency?: string;
  userType?: string;
  serviceType?: string;
  location?: string;
}

export interface PhoneCallEvent {
  phoneNumber: string;
  context: string;
  pageTitle?: string;
  isEmergency?: boolean;
}

export interface FormSubmissionEvent {
  formName: string;
  formType?: string;
  serviceType?: string;
  location?: string;
  formData?: Record<string, any>;
}

// Declare global gtag interface
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

/**
 * Track phone number clicks (Primary Conversion)
 * Used for: 1300 309 361 call button tracking
 */
export const trackPhoneClick = (event: PhoneCallEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'phone_click', {
      event_category: 'Contact',
      event_label: event.context || 'phone_click',
      phone_number: event.phoneNumber,
      page_title: event.pageTitle || document.title,
      is_emergency: event.isEmergency || false,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Track form submissions
 * Used for: Contact forms, quote requests, emergency requests
 */
export const trackFormSubmission = (event: FormSubmissionEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_submit', {
      event_category: 'Conversion',
      event_label: event.formName,
      form_type: event.formType || 'contact',
      service_type: event.serviceType,
      location: event.location,
      value: 1,
      timestamp: new Date().toISOString(),
    });

    // Track as explicit conversion
    window.gtag('event', 'conversion', {
      send_to: `${GA_MEASUREMENT_ID}/conversion_id`,
      value: event.formData?.estimatedValue || 0,
      currency: 'AUD',
      transaction_id: event.formData?.leadId,
    });
  }
};

/**
 * Track quote requests
 * Used for: Quote form submissions
 */
export const trackQuoteRequest = (serviceType: string, location?: string) => {
  trackFormSubmission({
    formName: 'quote_request',
    formType: 'quote',
    serviceType,
    location,
  });
};

/**
 * Track emergency service requests
 * Used for: Emergency response calls/forms
 */
export const trackEmergencyRequest = (
  serviceType: string,
  location?: string,
  responseTime?: string
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'emergency_request', {
      event_category: 'Conversion',
      event_label: serviceType,
      service_type: serviceType,
      location: location,
      response_time: responseTime,
      is_emergency: true,
      value: 1,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Track service page views
 * Used for: Tracking which service pages are most viewed
 */
export const trackServiceView = (
  serviceName: string,
  location?: string,
  serviceCategory?: string
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_service', {
      event_category: 'Service',
      event_label: serviceName,
      service_name: serviceName,
      service_category: serviceCategory,
      location: location,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Track location page engagement
 * Used for: Brisbane, Ipswich, Logan specific pages
 */
export const trackLocationEngagement = (
  location: string,
  engagementType: 'view' | 'scroll' | 'click',
  details?: string
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', `location_${engagementType}`, {
      event_category: 'Location',
      event_label: location,
      location: location,
      engagement_details: details,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Track insurance partner referrals
 * Used for: Insurance company clicks/referrals
 */
export const trackInsuranceReferral = (insurerName: string, claimType?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'insurance_click', {
      event_category: 'Insurance',
      event_label: insurerName,
      insurer_name: insurerName,
      claim_type: claimType,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Track content downloads
 * Used for: Guides, checklists, case studies
 */
export const trackContentDownload = (
  contentTitle: string,
  contentType: string,
  contentCategory?: string
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'file_download', {
      event_category: 'Content',
      event_label: contentTitle,
      file_name: contentTitle,
      file_type: contentType,
      content_category: contentCategory,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Track video engagement
 * Used for: Before/After photos, testimonials, educational content
 */
export const trackVideoEngagement = (
  videoTitle: string,
  engagementType: 'play' | 'complete' | 'duration',
  duration?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const eventName =
      engagementType === 'complete'
        ? 'video_complete'
        : engagementType === 'duration'
          ? 'video_progress'
          : 'video_play';

    window.gtag('event', eventName, {
      event_category: 'Video',
      event_label: videoTitle,
      video_title: videoTitle,
      video_duration: duration,
      engagement_type: engagementType,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Track social media shares
 * Used for: Tracking viral content
 */
export const trackSocialShare = (platform: string, contentType: string, contentTitle?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'share', {
      event_category: 'Social',
      event_label: `${platform}_${contentType}`,
      platform: platform,
      content_type: contentType,
      content_title: contentTitle,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Track core web vitals
 * Used for: Performance monitoring
 */
export const trackWebVitals = (
  metricName: string,
  value: number,
  id: string
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metricName, {
      event_category: 'Web Vitals',
      event_label: id,
      value: Math.round(metricName === 'CLS' ? value * 1000 : value),
      non_interaction: true,
    });
  }
};

/**
 * Track engagement time
 * Used for: Monitoring user session quality
 */
export const trackEngagementTime = (timeSeconds: number, pageTitle?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'engagement', {
      event_category: 'Engagement',
      event_label: pageTitle || document.title,
      engagement_time_msec: timeSeconds * 1000,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Track scroll depth
 * Used for: Content engagement depth
 */
export const trackScrollDepth = (scrollPercentage: number, pageTitle?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'scroll', {
      event_category: 'Engagement',
      event_label: pageTitle || document.title,
      scroll_depth_percentage: scrollPercentage,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Track user type (insurance vs residential)
 * Used for: Segmenting traffic by business type
 */
export const trackUserType = (userType: 'insurance' | 'residential' | 'commercial') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      user_type: userType,
    });
  }
};

/**
 * Track link clicks
 * Used for: External links, CTA buttons
 */
export const trackLinkClick = (url: string, linkText: string, linkCategory?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'link_click', {
      event_category: linkCategory || 'Link',
      event_label: linkText,
      destination_url: url,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Initialize custom tracking for specific business metrics
 * Run this on page load for key pages
 */
export const initializePageTracking = (pageContext: {
  pageType?: 'service' | 'location' | 'insurance' | 'guide' | 'homepage';
  serviceType?: string;
  location?: string;
  title?: string;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    // Set custom dimensions
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title: pageContext.title || document.title,
      service_type: pageContext.serviceType,
      location: pageContext.location,
      page_context_type: pageContext.pageType,
    });
  }
};

// Export all tracking functions as a namespace
export const analytics = {
  trackPhoneClick,
  trackFormSubmission,
  trackQuoteRequest,
  trackEmergencyRequest,
  trackServiceView,
  trackLocationEngagement,
  trackInsuranceReferral,
  trackContentDownload,
  trackVideoEngagement,
  trackSocialShare,
  trackWebVitals,
  trackEngagementTime,
  trackScrollDepth,
  trackUserType,
  trackLinkClick,
  initializePageTracking,
};
