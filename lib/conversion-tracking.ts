'use client';

// Conversion Tracking System with Analytics Integration
// Tracks all user interactions and conversion events

interface ConversionEvent {
  eventName: string;
  eventType: 'click' | 'form_submit' | 'page_view' | 'scroll' | 'engagement' | 'conversion';
  value?: number;
  metadata?: Record<string, any>;
  timestamp: number;
  sessionId: string;
  userId?: string;
}

interface UserSession {
  sessionId: string;
  startTime: number;
  pageViews: number;
  events: ConversionEvent[];
  source?: string;
  medium?: string;
  campaign?: string;
  device: string;
  location?: string;
  exitIntent: boolean;
}

class ConversionTracker {
  private static instance: ConversionTracker;
  private session: UserSession;
  private conversionGoals: Map<string, number>;
  private heatMapData: Map<string, number>;

  private constructor() {
    this.session = this.initSession();
    this.conversionGoals = new Map();
    this.heatMapData = new Map();
    this.initializeTracking();
  }

  static getInstance(): ConversionTracker {
    if (!ConversionTracker.instance) {
      ConversionTracker.instance = new ConversionTracker();
    }
    return ConversionTracker.instance;
  }

  private initSession(): UserSession {
    const sessionId = this.generateSessionId();
    const urlParams = new URLSearchParams(window.location.search);

    return {
      sessionId,
      startTime: Date.now(),
      pageViews: 1,
      events: [],
      source: urlParams.get('utm_source') || document.referrer || 'direct',
      medium: urlParams.get('utm_medium') || 'organic',
      campaign: urlParams.get('utm_campaign') || '',
      device: this.detectDevice(),
      location: this.detectLocation(),
      exitIntent: false
    };
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private detectDevice(): string {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/mobile|android|iphone/i.test(userAgent)) return 'mobile';
    if (/tablet|ipad/i.test(userAgent)) return 'tablet';
    return 'desktop';
  }

  private detectLocation(): string {
    // In production, integrate with IP geolocation API
    // For now, return Brisbane as default
    return 'Brisbane';
  }

  private initializeTracking() {
    // Track page visibility
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.track('page_hidden', 'engagement');
      } else {
        this.track('page_visible', 'engagement');
      }
    });

    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

      if (scrollPercentage > maxScroll) {
        maxScroll = scrollPercentage;

        // Track milestone scrolls
        if (scrollPercentage >= 25 && maxScroll < 25) this.track('scroll_25', 'scroll');
        if (scrollPercentage >= 50 && maxScroll < 50) this.track('scroll_50', 'scroll');
        if (scrollPercentage >= 75 && maxScroll < 75) this.track('scroll_75', 'scroll');
        if (scrollPercentage >= 90 && maxScroll < 90) this.track('scroll_90', 'scroll');
      }
    });

    // Track exit intent
    document.addEventListener('mouseleave', (e) => {
      if (e.clientY <= 0 && !this.session.exitIntent) {
        this.session.exitIntent = true;
        this.track('exit_intent_triggered', 'engagement');
      }
    });

    // Track time on page
    setInterval(() => {
      const timeOnPage = Math.floor((Date.now() - this.session.startTime) / 1000);

      // Track engagement milestones
      if (timeOnPage === 30) this.track('engaged_30s', 'engagement');
      if (timeOnPage === 60) this.track('engaged_60s', 'engagement');
      if (timeOnPage === 180) this.track('engaged_3min', 'engagement');
      if (timeOnPage === 300) this.track('highly_engaged_5min', 'engagement');
    }, 1000);

    // Track clicks for heat mapping
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const selector = this.getUniqueSelector(target);

      this.heatMapData.set(selector, (this.heatMapData.get(selector) || 0) + 1);

      // Track specific conversion elements
      if (target.closest('[data-conversion]')) {
        const conversionType = target.closest('[data-conversion]')?.getAttribute('data-conversion');
        this.track(`conversion_click_${conversionType}`, 'click', 1);
      }
    });
  }

  private getUniqueSelector(element: HTMLElement): string {
    if (element.id) return `#${element.id}`;
    if (element.className) return `.${element.className.split(' ')[0]}`;
    return element.tagName.toLowerCase();
  }

  track(eventName: string, eventType: ConversionEvent['eventType'], value?: number, metadata?: Record<string, any>) {
    const event: ConversionEvent = {
      eventName,
      eventType,
      value,
      metadata,
      timestamp: Date.now(),
      sessionId: this.session.sessionId
    };

    this.session.events.push(event);

    // Send to analytics platforms
    this.sendToGA4(event);
    this.sendToGTM(event);
    this.sendToFacebook(event);
    this.sendToCustomAnalytics(event);

    // Update conversion goals
    if (eventType === 'conversion') {
      this.conversionGoals.set(eventName, (this.conversionGoals.get(eventName) || 0) + (value || 1));
    }
  }

  private sendToGA4(event: ConversionEvent) {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.eventName, {
        event_category: event.eventType,
        event_label: this.session.sessionId,
        value: event.value,
        ...event.metadata
      });
    }
  }

  private sendToGTM(event: ConversionEvent) {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: event.eventName,
        eventType: event.eventType,
        sessionId: this.session.sessionId,
        value: event.value,
        ...event.metadata
      });
    }
  }

  private sendToFacebook(event: ConversionEvent) {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      if (event.eventType === 'conversion') {
        (window as any).fbq('track', 'Lead', {
          value: event.value,
          currency: 'AUD',
          content_name: event.eventName
        });
      }
    }
  }

  private sendToCustomAnalytics(event: ConversionEvent) {
    // Send to custom analytics endpoint
    if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
      fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...event,
          session: this.session
        })
      }).catch(console.error);
    }
  }

  // Public methods for tracking specific conversions
  trackPhoneCall(phoneNumber: string) {
    this.track('phone_call_initiated', 'conversion', 100, { phoneNumber });
  }

  trackFormSubmit(formName: string, formData: Record<string, any>) {
    this.track(`form_submit_${formName}`, 'conversion', 50, formData);
  }

  trackChatInitiated() {
    this.track('live_chat_initiated', 'conversion', 30);
  }

  trackQuoteRequest(service: string, urgency: string) {
    this.track('quote_requested', 'conversion', 75, { service, urgency });
  }

  trackEmergencyContact() {
    this.track('emergency_contact', 'conversion', 150);
  }

  // Get session analytics
  getSessionAnalytics() {
    return {
      session: this.session,
      conversionGoals: Array.from(this.conversionGoals.entries()),
      heatMapData: Array.from(this.heatMapData.entries()),
      engagementScore: this.calculateEngagementScore(),
      conversionProbability: this.calculateConversionProbability()
    };
  }

  private calculateEngagementScore(): number {
    const factors = {
      timeOnPage: Math.min((Date.now() - this.session.startTime) / 300000, 1) * 30,
      scrollDepth: this.session.events.filter(e => e.eventType === 'scroll').length * 10,
      interactions: this.session.events.filter(e => e.eventType === 'click').length * 5,
      pageViews: Math.min(this.session.pageViews * 10, 30)
    };

    return Math.min(Object.values(factors).reduce((a, b) => a + b, 0), 100);
  }

  private calculateConversionProbability(): number {
    const score = this.calculateEngagementScore();
    const hasExitIntent = this.session.exitIntent;
    const device = this.session.device;

    let probability = score / 100;

    // Adjust based on behavior patterns
    if (hasExitIntent) probability *= 0.7;
    if (device === 'mobile') probability *= 0.8;
    if (this.session.events.some(e => e.eventName.includes('emergency'))) probability *= 1.5;

    return Math.min(probability, 1);
  }
}

// Export singleton instance
export const tracker = ConversionTracker.getInstance();

// Conversion tracking hooks for React components
export function useConversionTracking() {
  return {
    trackClick: (eventName: string, value?: number) => tracker.track(eventName, 'click', value),
    trackConversion: (eventName: string, value?: number, metadata?: Record<string, any>) =>
      tracker.track(eventName, 'conversion', value, metadata),
    trackEngagement: (eventName: string) => tracker.track(eventName, 'engagement'),
    trackPhoneCall: (phoneNumber: string) => tracker.trackPhoneCall(phoneNumber),
    trackFormSubmit: (formName: string, formData: Record<string, any>) =>
      tracker.trackFormSubmit(formName, formData),
    getAnalytics: () => tracker.getSessionAnalytics()
  };
}

// A/B Testing Framework
export class ABTestManager {
  private static instance: ABTestManager;
  private tests: Map<string, any>;
  private userVariants: Map<string, string>;

  private constructor() {
    this.tests = new Map();
    this.userVariants = new Map();
    this.loadUserVariants();
  }

  static getInstance(): ABTestManager {
    if (!ABTestManager.instance) {
      ABTestManager.instance = new ABTestManager();
    }
    return ABTestManager.instance;
  }

  private loadUserVariants() {
    const stored = localStorage.getItem('ab_test_variants');
    if (stored) {
      const variants = JSON.parse(stored);
      Object.entries(variants).forEach(([test, variant]) => {
        this.userVariants.set(test, variant as string);
      });
    }
  }

  private saveUserVariants() {
    const variants: Record<string, string> = {};
    this.userVariants.forEach((variant, test) => {
      variants[test] = variant;
    });
    localStorage.setItem('ab_test_variants', JSON.stringify(variants));
  }

  registerTest(testName: string, variants: string[], weights?: number[]) {
    this.tests.set(testName, { variants, weights: weights || variants.map(() => 1 / variants.length) });
  }

  getVariant(testName: string): string {
    // Check if user already has a variant
    if (this.userVariants.has(testName)) {
      return this.userVariants.get(testName)!;
    }

    // Assign new variant
    const test = this.tests.get(testName);
    if (!test) return 'control';

    const variant = this.selectVariant(test.variants, test.weights);
    this.userVariants.set(testName, variant);
    this.saveUserVariants();

    // Track assignment
    tracker.track(`ab_test_assigned_${testName}`, 'engagement', undefined, { variant });

    return variant;
  }

  private selectVariant(variants: string[], weights: number[]): string {
    const random = Math.random();
    let cumulative = 0;

    for (let i = 0; i < variants.length; i++) {
      cumulative += weights[i];
      if (random < cumulative) {
        return variants[i];
      }
    }

    return variants[variants.length - 1];
  }

  trackConversion(testName: string) {
    const variant = this.userVariants.get(testName);
    if (variant) {
      tracker.track(`ab_test_conversion_${testName}`, 'conversion', undefined, { variant });
    }
  }
}

export const abTest = ABTestManager.getInstance();