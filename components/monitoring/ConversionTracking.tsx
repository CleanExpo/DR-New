/**
 * Conversion Tracking Components
 * Track business-critical conversions and user actions
 */

'use client';

import { analytics, ConversionEvent } from '@/lib/monitoring/analytics';
import { useEffect, useCallback } from 'react';

/**
 * Track phone call clicks
 */
export function usePhoneCallTracking(phoneNumber: string) {
  return useCallback((location?: string) => {
    analytics.emergencyCall(phoneNumber, location || window.location.pathname);

    // Also track as click event
    analytics.event('phone_click', {
      phone_number: phoneNumber,
      click_location: location || window.location.pathname,
      event_category: 'conversion',
    });
  }, [phoneNumber]);
}

/**
 * Track email clicks
 */
export function useEmailTracking(email: string) {
  return useCallback((location?: string) => {
    analytics.conversion(ConversionEvent.EMAIL_CLICK, 50, {
      email_address: email,
      click_location: location || window.location.pathname,
    });
  }, [email]);
}

/**
 * Track form submissions
 */
export function useFormTracking(formName: string) {
  const trackSubmit = useCallback((formData?: Record<string, any>) => {
    if (formName === 'contact') {
      analytics.contactForm({
        serviceType: formData?.serviceType,
        urgency: formData?.urgency,
        location: formData?.location,
        email: formData?.email,
      });
    } else if (formName === 'quote') {
      analytics.quoteRequest(
        formData?.serviceType || 'unknown',
        formData?.propertyType || 'residential',
        formData?.estimatedValue
      );
    } else {
      analytics.conversion(ConversionEvent.CONTACT_FORM, 500, {
        form_name: formName,
        ...formData,
      });
    }
  }, [formName]);

  const trackFieldInteraction = useCallback((fieldName: string) => {
    analytics.event('form_field_interaction', {
      form_name: formName,
      field_name: fieldName,
      event_category: 'engagement',
    });
  }, [formName]);

  const trackError = useCallback((fieldName: string, errorMessage: string) => {
    analytics.event('form_validation_error', {
      form_name: formName,
      field_name: fieldName,
      error_message: errorMessage,
      event_category: 'form',
    });
  }, [formName]);

  return {
    trackSubmit,
    trackFieldInteraction,
    trackError,
  };
}

/**
 * Phone Call Button Component
 */
interface PhoneButtonProps {
  phoneNumber: string;
  className?: string;
  children: React.ReactNode;
  location?: string;
}

export function PhoneButton({
  phoneNumber,
  className,
  children,
  location,
}: PhoneButtonProps) {
  const trackCall = usePhoneCallTracking(phoneNumber);

  return (
    <a
      href={`tel:${phoneNumber.replace(/\s/g, '')}`}
      className={className}
      onClick={() => trackCall(location)}
    >
      {children}
    </a>
  );
}

/**
 * Email Button Component
 */
interface EmailButtonProps {
  email: string;
  subject?: string;
  className?: string;
  children: React.ReactNode;
  location?: string;
}

export function EmailButton({
  email,
  subject,
  className,
  children,
  location,
}: EmailButtonProps) {
  const trackEmail = useEmailTracking(email);
  const href = subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`;

  return (
    <a
      href={href}
      className={className}
      onClick={() => trackEmail(location)}
    >
      {children}
    </a>
  );
}

/**
 * Track CTA Button Clicks
 */
interface CTAButtonProps {
  ctaType: 'emergency' | 'quote' | 'contact' | 'service' | 'insurance';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function CTAButton({ ctaType, className, children, onClick }: CTAButtonProps) {
  const handleClick = () => {
    // Track based on CTA type
    const eventValue = {
      emergency: 1000,
      quote: 750,
      contact: 500,
      service: 250,
      insurance: 2000,
    }[ctaType];

    analytics.engagement(`cta_${ctaType}_clicked`, window.location.pathname, eventValue);

    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

/**
 * Track scroll to section
 */
export function useScrollTracking(sectionName: string) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            analytics.engagement('section_viewed', sectionName);
          }
        });
      },
      { threshold: 0.5 } // 50% visible
    );

    const element = document.getElementById(sectionName);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [sectionName]);
}

/**
 * Track video views
 */
export function useVideoTracking(videoTitle: string) {
  const trackPlay = useCallback(() => {
    analytics.video('play', videoTitle);
  }, [videoTitle]);

  const trackPause = useCallback((progress: number) => {
    analytics.video('pause', videoTitle, progress);
  }, [videoTitle]);

  const trackComplete = useCallback(() => {
    analytics.video('complete', videoTitle, 100);
  }, [videoTitle]);

  return {
    trackPlay,
    trackPause,
    trackComplete,
  };
}

/**
 * Track link clicks
 */
export function useTrackableLink(linkName: string) {
  return useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.href;
    const isExternal = new URL(href).hostname !== window.location.hostname;

    if (isExternal) {
      analytics.outboundLink(href, linkName);
    } else {
      analytics.event('internal_link_click', {
        link_name: linkName,
        link_url: href,
        event_category: 'navigation',
      });
    }
  }, [linkName]);
}

/**
 * Track insurance claim flow
 */
export function useInsuranceClaimTracking() {
  const trackStart = useCallback((provider: string, claimType: string) => {
    analytics.insuranceClaim(provider, claimType);
  }, []);

  const trackStep = useCallback((step: number, stepName: string) => {
    analytics.event('insurance_claim_step', {
      step_number: step,
      step_name: stepName,
      event_category: 'conversion',
    });
  }, []);

  const trackComplete = useCallback(() => {
    analytics.conversion(ConversionEvent.INSURANCE_CLAIM, 5000, {
      status: 'completed',
      lead_quality: 'very_high',
    });
  }, []);

  return {
    trackStart,
    trackStep,
    trackComplete,
  };
}

/**
 * Track service page interactions
 */
export function useServiceTracking(serviceName: string, serviceArea?: string) {
  useEffect(() => {
    // Track service page view
    analytics.serviceView(serviceName, serviceArea);
  }, [serviceName, serviceArea]);

  const trackCTA = useCallback((ctaType: string) => {
    analytics.event('service_cta_click', {
      service_name: serviceName,
      service_area: serviceArea,
      cta_type: ctaType,
      event_category: 'conversion',
    });
  }, [serviceName, serviceArea]);

  return { trackCTA };
}

/**
 * Track search interactions
 */
export function useSearchTracking() {
  const trackSearch = useCallback((query: string, results?: number) => {
    analytics.search(query, results);
  }, []);

  const trackResultClick = useCallback((query: string, resultUrl: string, position: number) => {
    analytics.event('search_result_click', {
      search_query: query,
      result_url: resultUrl,
      result_position: position,
      event_category: 'engagement',
    });
  }, []);

  return {
    trackSearch,
    trackResultClick,
  };
}

/**
 * Auto-track time on page
 */
export function useTimeOnPage() {
  useEffect(() => {
    const startTime = Date.now();

    return () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);

      // Only track if user stayed more than 5 seconds
      if (timeOnPage > 5) {
        analytics.timing(
          'engagement',
          'time_on_page',
          timeOnPage,
          window.location.pathname
        );
      }
    };
  }, []);
}

/**
 * Track file downloads
 */
export function useDownloadTracking() {
  return useCallback((fileName: string, fileType: string) => {
    analytics.download(fileName, fileType);
  }, []);
}
