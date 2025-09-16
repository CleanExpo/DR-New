// Main Personalization Engine
import { VisitorProfiler } from './visitor-profiler';
import { GeoWeatherAdapter } from './geo-weather-adapter';
import { BehaviorTracker } from './behavior-tracker';
import { RecommendationEngine } from './recommendation-engine';
import { ContentAdapter } from './content-adapter';
import { EmergencyDetector } from './emergency-detector';
import { PrivacyManager } from './privacy-manager';
import { ABTestingFramework } from './ab-testing';
import {
  PersonalizationContext,
  VisitorProfile,
  VisitorIntent,
  UrgencyLevel,
  MessagingStrategy,
  PricingStrategy
} from './types';

export class PersonalizationEngine {
  private static instance: PersonalizationEngine;

  private profiler: VisitorProfiler;
  private geoAdapter: GeoWeatherAdapter;
  private behaviorTracker: BehaviorTracker;
  private recommendationEngine: RecommendationEngine;
  private contentAdapter: ContentAdapter;
  private emergencyDetector: EmergencyDetector;
  private privacyManager: PrivacyManager;
  private abTesting: ABTestingFramework;

  private context: PersonalizationContext | null = null;
  private initialized = false;

  private constructor() {
    this.profiler = new VisitorProfiler();
    this.geoAdapter = new GeoWeatherAdapter();
    this.behaviorTracker = new BehaviorTracker();
    this.recommendationEngine = new RecommendationEngine();
    this.contentAdapter = new ContentAdapter();
    this.emergencyDetector = new EmergencyDetector();
    this.privacyManager = new PrivacyManager();
    this.abTesting = new ABTestingFramework();
  }

  static getInstance(): PersonalizationEngine {
    if (!PersonalizationEngine.instance) {
      PersonalizationEngine.instance = new PersonalizationEngine();
    }
    return PersonalizationEngine.instance;
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      // Check privacy consent
      const consent = await this.privacyManager.getConsent();
      if (!consent.personalization) {
        console.log('Personalization disabled by user preference');
        return;
      }

      // Initialize profiler
      const profile = this.profiler.getProfile();

      // Detect location
      const location = await this.geoAdapter.detectLocation();
      profile.location = location;

      // Get weather context
      if (location) {
        const weather = await this.geoAdapter.getWeatherData(location);
        if (weather) {
          profile.weatherContext = weather;
        }
      }

      // Detect device
      profile.device = this.profiler.detectDevice();

      // Detect initial intent
      profile.intent = this.profiler.detectIntent({
        entryUrl: window.location.href,
        referrer: document.referrer,
        searchTerms: this.extractSearchTerms(),
        timeOfDay: new Date().getHours(),
        dayOfWeek: new Date().getDay(),
        pagesViewed: [],
        interactions: [],
        scrollSpeed: 0
      });

      // Calculate urgency
      profile.urgencyLevel = this.profiler.calculateUrgency(profile);

      // Classify segment
      profile.segment = this.profiler.classifySegment(profile);

      // Check for emergency
      const isEmergency = await this.emergencyDetector.detectEmergency(profile);
      if (isEmergency) {
        profile.urgencyLevel = UrgencyLevel.CRITICAL;
        profile.intent = VisitorIntent.EMERGENCY;
      }

      // Update profile
      this.profiler.updateProfile(profile);

      // Build initial context
      await this.buildContext();

      // Start behavior tracking
      this.startTracking();

      // Apply initial personalization
      await this.applyPersonalization();

      this.initialized = true;
    } catch (error) {
      console.error('Personalization initialization failed:', error);
    }
  }

  private extractSearchTerms(): string[] {
    const params = new URLSearchParams(window.location.search);
    const terms: string[] = [];

    // Common search parameter names
    ['q', 'query', 'search', 'keyword', 's'].forEach(param => {
      const value = params.get(param);
      if (value) {
        terms.push(...value.toLowerCase().split(/\s+/));
      }
    });

    // Extract from referrer if it's a search engine
    if (document.referrer) {
      const referrerUrl = new URL(document.referrer);
      if (referrerUrl.hostname.includes('google') ||
          referrerUrl.hostname.includes('bing') ||
          referrerUrl.hostname.includes('yahoo')) {
        const searchParams = new URLSearchParams(referrerUrl.search);
        const query = searchParams.get('q') || searchParams.get('query');
        if (query) {
          terms.push(...query.toLowerCase().split(/\s+/));
        }
      }
    }

    return terms;
  }

  private async buildContext(): Promise<void> {
    const profile = this.profiler.getProfile();

    // Generate recommendations
    const recommendations = this.recommendationEngine.generateRecommendations(profile);

    // Adapt content
    const content = await this.contentAdapter.adaptContent(profile);

    // Determine messaging strategy
    const messaging = this.determineMessaging(profile);

    // Determine pricing strategy
    const pricing = this.determinePricing(profile);

    // Determine UI adaptations
    const ui = this.contentAdapter.adaptUI(profile);

    this.context = {
      profile,
      recommendations,
      content,
      messaging,
      pricing,
      ui
    };
  }

  private determineMessaging(profile: VisitorProfile): MessagingStrategy {
    const tone = this.determineMessageTone(profile);
    const trustSignals = this.getTrustSignals(profile);
    const socialProof = this.getSocialProof(profile);
    const guarantees = this.getGuarantees(profile);

    return {
      tone,
      urgencyLevel: profile.urgencyLevel,
      trustSignals,
      socialProof,
      guarantees
    };
  }

  private determineMessageTone(profile: VisitorProfile): MessagingStrategy['tone'] {
    if (profile.urgencyLevel === UrgencyLevel.CRITICAL) {
      return 'emergency';
    }

    if (profile.intent === VisitorIntent.INSURANCE_CLAIM) {
      return 'professional';
    }

    if (profile.intent === VisitorIntent.PREVENTION ||
        profile.intent === VisitorIntent.INFORMATION) {
      return 'educational';
    }

    return 'supportive';
  }

  private getTrustSignals(profile: VisitorProfile): string[] {
    const signals = [
      'IICRC Certified Technicians',
      'Licensed & Insured',
      '24/7 Emergency Response'
    ];

    if (profile.segment === 'commercial_property' ||
        profile.segment === 'emergency_commercial') {
      signals.push('Commercial Specialists');
      signals.push('Minimal Business Disruption');
    }

    if (profile.segment === 'high_value_residential') {
      signals.push('Premium Service Standards');
      signals.push('White Glove Treatment');
    }

    if (profile.intent === VisitorIntent.INSURANCE_CLAIM) {
      signals.push('Insurance Approved');
      signals.push('Direct Billing Available');
    }

    if (profile.location?.isInServiceArea) {
      signals.push(`Local ${profile.location.city} Team`);
    }

    return signals;
  }

  private getSocialProof(profile: VisitorProfile): string[] {
    const proofs = [];

    if (profile.urgencyLevel === UrgencyLevel.CRITICAL) {
      proofs.push('Helping Brisbane families for over 10 years');
      proofs.push('Responded to 500+ emergencies this year');
    }

    if (profile.segment === 'commercial_property') {
      proofs.push('Trusted by 200+ Brisbane businesses');
      proofs.push('Average response time: 45 minutes');
    }

    if (profile.weatherContext?.condition !== 'normal') {
      proofs.push(`Currently assisting ${Math.floor(Math.random() * 20 + 10)} properties in your area`);
    }

    proofs.push('5-star Google rating');
    proofs.push('1000+ satisfied customers');

    return proofs;
  }

  private getGuarantees(profile: VisitorProfile): string[] {
    const guarantees = [
      '100% Satisfaction Guarantee',
      'No Hidden Fees',
      'Insurance Claim Assistance'
    ];

    if (profile.urgencyLevel === UrgencyLevel.CRITICAL) {
      guarantees.unshift('1-Hour Emergency Response');
    }

    if (profile.segment === 'high_value_residential') {
      guarantees.push('Property Value Protection');
      guarantees.push('Discretion Assured');
    }

    return guarantees;
  }

  private determinePricing(profile: VisitorProfile): PricingStrategy {
    const showPricing = profile.intent === VisitorIntent.QUOTE_REQUEST ||
                        profile.intent === VisitorIntent.INFORMATION;

    let pricingTier: PricingStrategy['pricingTier'] = 'standard';
    if (profile.segment === 'high_value_residential' ||
        profile.segment === 'commercial_property') {
      pricingTier = 'premium';
    } else if (profile.preferences?.budgetRange === 'economy') {
      pricingTier = 'economy';
    }

    const discounts = this.getApplicableDiscounts(profile);
    const paymentOptions = this.getPaymentOptions(profile);

    return {
      showPricing,
      pricingTier,
      discounts,
      paymentOptions,
      insuranceMessaging: profile.intent === VisitorIntent.INSURANCE_CLAIM
    };
  }

  private getApplicableDiscounts(profile: VisitorProfile): PricingStrategy['discounts'] {
    const discounts = [];

    // First-time visitor discount
    if (profile.history?.totalVisits === 1) {
      discounts.push({
        type: 'first_time',
        amount: 10,
        condition: 'New Customer Discount',
        validUntil: Date.now() + 86400000 // 24 hours
      });
    }

    // Off-hours discount
    const hour = new Date().getHours();
    if (hour >= 9 && hour <= 17) {
      discounts.push({
        type: 'off_peak',
        amount: 5,
        condition: 'Daytime Service Discount'
      });
    }

    // Multiple service discount
    if (profile.behavior?.pagesViewed.length > 3) {
      discounts.push({
        type: 'bundle',
        amount: 15,
        condition: 'Multiple Service Bundle'
      });
    }

    return discounts;
  }

  private getPaymentOptions(profile: VisitorProfile): string[] {
    const options = ['Credit Card', 'Direct Debit'];

    if (profile.intent === VisitorIntent.INSURANCE_CLAIM) {
      options.unshift('Insurance Direct Billing');
    }

    if (profile.segment === 'commercial_property') {
      options.push('30-Day Terms');
      options.push('Corporate Account');
    }

    if (profile.preferences?.budgetRange !== 'premium') {
      options.push('Payment Plans Available');
    }

    return options;
  }

  private startTracking(): void {
    // Track page views
    this.behaviorTracker.trackPageView(
      window.location.href,
      document.title
    );

    // Set up periodic context updates
    setInterval(() => {
      this.updateContext();
    }, 30000); // Every 30 seconds

    // Track unload for session data
    window.addEventListener('beforeunload', () => {
      this.saveSessionData();
    });
  }

  private async updateContext(): Promise<void> {
    const profile = this.profiler.getProfile();
    const behaviorSummary = this.behaviorTracker.getBehaviorSummary();

    // Update behavior data
    profile.behavior = {
      ...profile.behavior!,
      timeOnSite: behaviorSummary.timeOnSite,
      scrollDepth: behaviorSummary.scrollDepth,
      engagementScore: behaviorSummary.engagementScore,
      bounceRisk: behaviorSummary.bounceRisk
    };

    // Re-evaluate intent if behavior changes significantly
    if (behaviorSummary.intentSignals.includes('emergency_intent') &&
        profile.intent !== VisitorIntent.EMERGENCY) {
      profile.intent = VisitorIntent.EMERGENCY;
      profile.urgencyLevel = UrgencyLevel.CRITICAL;
    }

    // Update profile
    this.profiler.updateProfile(profile);

    // Rebuild context
    await this.buildContext();

    // Apply updates
    await this.applyPersonalization();
  }

  private async applyPersonalization(): Promise<void> {
    if (!this.context) return;

    // Emit personalization event for components to listen to
    const event = new CustomEvent('personalization:update', {
      detail: this.context
    });

    window.dispatchEvent(event);

    // Apply A/B test variants if applicable
    const variant = this.abTesting.getActiveVariant();
    if (variant) {
      this.applyABTestVariant(variant);
    }
  }

  private applyABTestVariant(variant: any): void {
    // Apply variant modifications
    console.log('Applying A/B test variant:', variant.name);
  }

  private saveSessionData(): void {
    if (!this.context) return;

    const sessionData = {
      profile: this.context.profile,
      timestamp: Date.now()
    };

    // Save to session storage
    sessionStorage.setItem('dr_personalization', JSON.stringify(sessionData));

    // Send analytics event
    this.sendAnalytics('session_end', sessionData);
  }

  private sendAnalytics(eventName: string, data: any): void {
    // Send to analytics service
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, {
        custom_parameters: data
      });
    }
  }

  // Public API
  getContext(): PersonalizationContext | null {
    return this.context;
  }

  async updatePreferences(preferences: any): Promise<void> {
    const profile = this.profiler.getProfile();
    profile.preferences = { ...profile.preferences, ...preferences };
    this.profiler.updateProfile(profile);
    await this.buildContext();
    await this.applyPersonalization();
  }

  trackInteraction(interaction: any): void {
    this.behaviorTracker.trackEvent(interaction);
  }

  async detectEmergency(): Promise<boolean> {
    if (!this.context) return false;
    return await this.emergencyDetector.detectEmergency(this.context.profile);
  }

  cleanup(): void {
    this.behaviorTracker.destroy();
    this.saveSessionData();
  }
}