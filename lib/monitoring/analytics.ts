/**
 * Google Analytics 4 (GA4) Implementation
 * Production-grade analytics tracking for disaster recovery service website
 */

import { Metric } from 'web-vitals';

// GA4 Event Types
export interface GAEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

// Conversion Events
export enum ConversionEvent {
  EMERGENCY_CALL = 'emergency_call_clicked',
  CONTACT_FORM = 'contact_form_submitted',
  QUOTE_REQUEST = 'quote_requested',
  EMAIL_CLICK = 'email_clicked',
  SERVICE_INQUIRY = 'service_inquiry',
  PHONE_REVEAL = 'phone_number_revealed',
  DOWNLOAD_GUIDE = 'guide_downloaded',
  VIDEO_PLAY = 'video_played',
  INSURANCE_CLAIM = 'insurance_claim_started',
}

// Custom Dimensions
export interface CustomDimensions {
  user_type?: 'residential' | 'commercial' | 'insurance';
  service_area?: string; // Brisbane, Ipswich, Logan
  service_type?: string; // water, fire, mould, storm
  emergency_type?: 'urgent' | 'standard' | 'consultation';
  page_category?: string;
  user_journey_stage?: 'awareness' | 'consideration' | 'decision';
}

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'set' | 'consent',
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

/**
 * Initialize Google Analytics 4
 */
export function initGA4(measurementId: string): void {
  if (!measurementId || typeof window === 'undefined') {return;}

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer!.push(arguments);
  };

  (window.gtag as any)('js', new Date());
  window.gtag('config', measurementId, {
    page_path: window.location.pathname,
    send_page_view: true,
    anonymize_ip: true, // GDPR compliance
    allow_google_signals: true,
    allow_ad_personalization_signals: false,
  });

  // Set custom dimensions
  window.gtag('set', 'user_properties', {
    platform: 'web',
    site_version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  });

  console.log('[GA4] Initialized:', measurementId);
}

/**
 * Track page views
 */
export function trackPageView(url: string, title?: string): void {
  if (!window.gtag) {return;}

  window.gtag('event', 'page_view', {
    page_title: title || document.title,
    page_location: url,
    page_path: new URL(url).pathname,
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('[GA4] Page view:', url);
  }
}

/**
 * Track custom events
 */
export function trackEvent(
  eventName: string,
  parameters?: Record<string, any>
): void {
  if (!window.gtag) {return;}

  window.gtag('event', eventName, {
    ...parameters,
    timestamp: new Date().toISOString(),
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('[GA4] Event:', eventName, parameters);
  }
}

/**
 * Track conversions - business-critical actions
 */
export function trackConversion(
  conversionEvent: ConversionEvent,
  value?: number,
  metadata?: Record<string, any>
): void {
  if (!window.gtag) {return;}

  // Track as conversion event
  window.gtag('event', conversionEvent, {
    value: value || 0,
    currency: 'AUD',
    ...metadata,
    event_category: 'conversion',
    conversion_type: conversionEvent,
  });

  // Also track in dataLayer for GTM
  window.dataLayer?.push({
    event: conversionEvent,
    value,
    ...metadata,
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('[GA4] Conversion:', conversionEvent, { value, ...metadata });
  }
}

/**
 * Track emergency phone calls with full context and persistence
 */
export function trackEmergencyCall(
  phoneNumber: string,
  location?: string
): void {
  // Original GA4 tracking
  trackConversion(ConversionEvent.EMERGENCY_CALL, 1000, {
    phone_number: phoneNumber,
    call_location: location || 'unknown',
    emergency_type: 'urgent',
    lead_quality: 'high',
  });

  // NEW: Persist to database for revenue attribution
  persistConversion({
    conversionType: 'emergency_call',
    value: 1000,
    source: getTrafficSource(),
    medium: getTrafficMedium(),
    campaign: getCampaign(),
    keyword: getReferrerKeyword(),
    page: typeof window !== 'undefined' ? window.location.pathname : '',
    referrer: typeof document !== 'undefined' ? document.referrer : '',
    serviceArea: typeof window !== 'undefined' ? extractServiceArea(window.location.pathname) : null,
    serviceType: typeof window !== 'undefined' ? extractServiceType(window.location.pathname) : null,
    leadScore: 90,
    leadQuality: 'high',
    urgencyLevel: 'emergency',
    deviceType: getDeviceTypeUtil(),
  });
}

/**
 * Track contact form submissions
 */
export function trackContactForm(
  formData: {
    serviceType?: string;
    urgency?: string;
    location?: string;
    email?: string;
  }
): void {
  trackConversion(ConversionEvent.CONTACT_FORM, 500, {
    service_type: formData.serviceType,
    urgency: formData.urgency,
    service_area: formData.location,
    has_email: !!formData.email,
    lead_quality: formData.urgency === 'urgent' ? 'high' : 'medium',
  });
}

/**
 * Track quote requests
 */
export function trackQuoteRequest(
  serviceType: string,
  propertyType: 'residential' | 'commercial',
  estimatedValue?: number
): void {
  trackConversion(ConversionEvent.QUOTE_REQUEST, estimatedValue || 750, {
    service_type: serviceType,
    property_type: propertyType,
    lead_quality: propertyType === 'commercial' ? 'high' : 'medium',
  });
}

/**
 * Track service page views
 */
export function trackServiceView(
  serviceName: string,
  serviceArea?: string
): void {
  trackEvent('view_service', {
    service_name: serviceName,
    service_area: serviceArea,
    event_category: 'engagement',
    content_type: 'service_page',
  });
}

/**
 * Track user engagement
 */
export function trackEngagement(
  action: string,
  label?: string,
  value?: number
): void {
  trackEvent('engagement', {
    engagement_action: action,
    engagement_label: label,
    engagement_value: value,
    event_category: 'engagement',
  });
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(percentage: number, page: string): void {
  trackEvent('scroll_depth', {
    scroll_percentage: percentage,
    page_path: page,
    event_category: 'engagement',
    non_interaction: true,
  });
}

/**
 * Track outbound links
 */
export function trackOutboundLink(url: string, label?: string): void {
  trackEvent('click_outbound', {
    outbound_url: url,
    link_label: label,
    event_category: 'navigation',
  });
}

/**
 * Track file downloads
 */
export function trackDownload(fileName: string, fileType: string): void {
  trackConversion(ConversionEvent.DOWNLOAD_GUIDE, 100, {
    file_name: fileName,
    file_type: fileType,
    event_category: 'content',
  });
}

/**
 * Track video interactions
 */
export function trackVideo(
  action: 'play' | 'pause' | 'complete',
  videoTitle: string,
  progress?: number
): void {
  if (action === 'play') {
    trackConversion(ConversionEvent.VIDEO_PLAY, 50, {
      video_title: videoTitle,
      video_action: action,
    });
  } else {
    trackEvent('video_interaction', {
      video_title: videoTitle,
      video_action: action,
      video_progress: progress,
      event_category: 'engagement',
    });
  }
}

/**
 * Track search queries
 */
export function trackSearch(query: string, results?: number): void {
  trackEvent('search', {
    search_term: query,
    search_results: results,
    event_category: 'engagement',
  });
}

/**
 * Track errors as events
 */
export function trackError(
  errorMessage: string,
  errorLevel: 'warning' | 'error' | 'critical',
  context?: Record<string, any>
): void {
  trackEvent('exception', {
    description: errorMessage,
    fatal: errorLevel === 'critical',
    error_level: errorLevel,
    ...context,
    event_category: 'error',
  });
}

/**
 * Track Web Vitals to GA4
 */
export function trackWebVitals(metric: Metric): void {
  if (!window.gtag) {return;}

  // Determine rating
  const rating = metric.rating || 'unknown';

  window.gtag('event', metric.name, {
    event_category: 'Web Vitals',
    event_label: metric.id,
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    metric_rating: rating,
    metric_delta: metric.delta,
    metric_id: metric.id,
    non_interaction: true,
  });

  // Track poor metrics as issues
  if (rating === 'poor') {
    trackEvent('poor_web_vital', {
      metric_name: metric.name,
      metric_value: metric.value,
      page_path: window.location.pathname,
      event_category: 'performance',
    });
  }
}

/**
 * Set custom dimensions
 */
export function setCustomDimensions(dimensions: CustomDimensions): void {
  if (!window.gtag) {return;}

  window.gtag('set', 'user_properties', dimensions);

  if (process.env.NODE_ENV === 'development') {
    console.log('[GA4] Custom dimensions set:', dimensions);
  }
}

/**
 * Track user timing
 */
export function trackTiming(
  category: string,
  variable: string,
  value: number,
  label?: string
): void {
  trackEvent('timing_complete', {
    timing_category: category,
    timing_variable: variable,
    timing_value: Math.round(value),
    timing_label: label,
    event_category: 'performance',
  });
}

/**
 * Set user ID for cross-device tracking
 */
export function setUserId(userId: string): void {
  if (!window.gtag) {return;}

  window.gtag('set', 'user_id', userId);
}

/**
 * Track ecommerce transactions (if applicable)
 */
export function trackTransaction(
  transactionId: string,
  value: number,
  items: any[]
): void {
  if (!window.gtag) {return;}

  window.gtag('event', 'purchase', {
    transaction_id: transactionId,
    value,
    currency: 'AUD',
    items,
  });
}

/**
 * Track insurance claim started
 */
export function trackInsuranceClaim(
  insuranceProvider: string,
  claimType: string
): void {
  trackConversion(ConversionEvent.INSURANCE_CLAIM, 2000, {
    insurance_provider: insuranceProvider,
    claim_type: claimType,
    lead_quality: 'very_high',
  });
}

/**
 * Setup automated event tracking
 */
export function setupAutoTracking(): void {
  if (typeof window === 'undefined') {return;}

  // Track scroll depth
  let maxScroll = 0;
  const scrollThresholds = [25, 50, 75, 90, 100];
  const scrollTracked = new Set<number>();

  const handleScroll = () => {
    const scrollPercentage = Math.round(
      ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100
    );

    if (scrollPercentage > maxScroll) {
      maxScroll = scrollPercentage;

      scrollThresholds.forEach(threshold => {
        if (scrollPercentage >= threshold && !scrollTracked.has(threshold)) {
          scrollTracked.add(threshold);
          trackScrollDepth(threshold, window.location.pathname);
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Track outbound links
  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest('a');
    if (target && target.href) {
      const url = new URL(target.href, window.location.origin);
      if (url.hostname !== window.location.hostname) {
        trackOutboundLink(target.href, target.textContent || undefined);
      }
    }
  });

  // Track time on page
  const startTime = Date.now();
  window.addEventListener('beforeunload', () => {
    const timeOnPage = Math.round((Date.now() - startTime) / 1000);
    trackTiming('engagement', 'time_on_page', timeOnPage, window.location.pathname);
  });

  console.log('[GA4] Auto-tracking enabled');
}

/**
 * GDPR Consent Management
 */
export function setConsentMode(
  analytics: boolean,
  advertising: boolean
): void {
  if (!window.gtag) {return;}

  (window.gtag as any)('consent', 'update', {
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: advertising ? 'granted' : 'denied',
    ad_user_data: advertising ? 'granted' : 'denied',
    ad_personalization: advertising ? 'granted' : 'denied',
  });
}

// Export analytics client
export const analytics = {
  init: initGA4,
  pageView: trackPageView,
  event: trackEvent,
  conversion: trackConversion,
  emergencyCall: trackEmergencyCall,
  contactForm: trackContactForm,
  quoteRequest: trackQuoteRequest,
  serviceView: trackServiceView,
  engagement: trackEngagement,
  scrollDepth: trackScrollDepth,
  outboundLink: trackOutboundLink,
  download: trackDownload,
  video: trackVideo,
  search: trackSearch,
  error: trackError,
  webVitals: trackWebVitals,
  setDimensions: setCustomDimensions,
  timing: trackTiming,
  setUserId,
  transaction: trackTransaction,
  insuranceClaim: trackInsuranceClaim,
  setupAutoTracking,
  setConsent: setConsentMode,
};

// Import conversion tracking utilities
export * from './conversion-tracking';
