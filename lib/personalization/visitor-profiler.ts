// Visitor Profiling and Intent Detection System
import {
  VisitorProfile,
  VisitorIntent,
  UrgencyLevel,
  VisitorSegment,
  LocationData,
  DeviceInfo,
  BehaviorData,
  UserInteraction,
  PageView
} from './types';

export class VisitorProfiler {
  private profile: Partial<VisitorProfile> = {};

  constructor() {
    this.initializeProfile();
  }

  private initializeProfile(): void {
    this.profile = {
      id: this.generateVisitorId(),
      sessionId: this.generateSessionId(),
      timestamp: Date.now(),
      intent: VisitorIntent.UNKNOWN,
      urgencyLevel: UrgencyLevel.UNKNOWN,
      segment: VisitorSegment.NEW_VISITOR,
      behavior: {
        entryUrl: '',
        referrer: '',
        pagesViewed: [],
        interactions: [],
        scrollDepth: 0,
        timeOnSite: 0,
        bounceRisk: 0.5,
        engagementScore: 0
      },
      history: {
        firstVisit: Date.now(),
        lastVisit: Date.now(),
        totalVisits: 1,
        previousIntents: [],
        servicesViewed: [],
        quotesRequested: 0,
        conversions: []
      },
      preferences: {
        language: 'en',
        communicationPreference: 'call'
      }
    };
  }

  private generateVisitorId(): string {
    const stored = this.getStoredVisitorId();
    if (stored) return stored;

    const id = `v_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.storeVisitorId(id);
    return id;
  }

  private generateSessionId(): string {
    return `s_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getStoredVisitorId(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('dr_visitor_id');
  }

  private storeVisitorId(id: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('dr_visitor_id', id);
  }

  // Intent Detection Based on Multiple Signals
  detectIntent(signals: IntentSignals): VisitorIntent {
    const {
      entryUrl,
      referrer,
      searchTerms,
      timeOfDay,
      dayOfWeek,
      pagesViewed,
      interactions,
      scrollSpeed
    } = signals;

    // Emergency Intent Indicators
    const emergencyKeywords = [
      'emergency', 'urgent', 'flood', 'fire', 'now', 'help',
      'damage', 'disaster', 'immediately', 'asap', '24 hour',
      'after hours', 'weekend', 'burst pipe', 'sewage'
    ];

    const insuranceKeywords = [
      'insurance', 'claim', 'adjuster', 'coverage', 'deductible',
      'policy', 'assessment', 'documentation', 'report'
    ];

    const preventionKeywords = [
      'prevent', 'protect', 'maintenance', 'inspection', 'before',
      'prepare', 'avoid', 'tips', 'guide', 'checklist'
    ];

    // Check URL patterns
    if (entryUrl.includes('emergency') || entryUrl.includes('24-hour')) {
      return VisitorIntent.EMERGENCY;
    }

    if (entryUrl.includes('insurance') || entryUrl.includes('claims')) {
      return VisitorIntent.INSURANCE_CLAIM;
    }

    if (entryUrl.includes('prevention') || entryUrl.includes('maintenance')) {
      return VisitorIntent.PREVENTION;
    }

    // Check search terms and referrer
    const allTerms = [...(searchTerms || []), referrer].join(' ').toLowerCase();

    if (emergencyKeywords.some(keyword => allTerms.includes(keyword))) {
      return VisitorIntent.EMERGENCY;
    }

    if (insuranceKeywords.some(keyword => allTerms.includes(keyword))) {
      return VisitorIntent.INSURANCE_CLAIM;
    }

    if (preventionKeywords.some(keyword => allTerms.includes(keyword))) {
      return VisitorIntent.PREVENTION;
    }

    // Time-based inference
    const hour = new Date().getHours();
    const isAfterHours = hour < 7 || hour > 19;
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    if (isAfterHours || isWeekend) {
      // Higher probability of emergency during off-hours
      if (scrollSpeed > 0.7) { // Fast scrolling indicates urgency
        return VisitorIntent.EMERGENCY;
      }
    }

    // Behavior-based inference
    if (interactions.some(i => i.type === 'call' || i.target.includes('emergency'))) {
      return VisitorIntent.EMERGENCY;
    }

    if (pagesViewed.some(p => p.includes('quote') || p.includes('pricing'))) {
      return VisitorIntent.QUOTE_REQUEST;
    }

    // Default to information gathering
    return VisitorIntent.INFORMATION;
  }

  // Determine Urgency Level
  calculateUrgency(profile: Partial<VisitorProfile>): UrgencyLevel {
    const indicators = {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0
    };

    // Intent-based urgency
    if (profile.intent === VisitorIntent.EMERGENCY) {
      indicators.critical += 3;
    } else if (profile.intent === VisitorIntent.INSURANCE_CLAIM) {
      indicators.high += 2;
    } else if (profile.intent === VisitorIntent.QUOTE_REQUEST) {
      indicators.medium += 2;
    } else {
      indicators.low += 1;
    }

    // Time-based urgency
    const hour = new Date().getHours();
    if (hour < 7 || hour > 21) {
      indicators.high += 1; // After-hours visits often indicate urgency
    }

    // Behavior-based urgency
    const behavior = profile.behavior;
    if (behavior) {
      if (behavior.timeOnSite < 30 && behavior.scrollDepth > 0.5) {
        indicators.high += 1; // Quick, focused browsing
      }

      const callClicks = behavior.interactions.filter(i => i.type === 'call').length;
      if (callClicks > 0) {
        indicators.critical += callClicks;
      }
    }

    // Weather-based urgency (if available)
    if (profile.weatherContext) {
      if (profile.weatherContext.severity === 'extreme') {
        indicators.critical += 2;
      } else if (profile.weatherContext.severity === 'high') {
        indicators.high += 2;
      }
    }

    // Determine final urgency level
    const maxIndicator = Object.entries(indicators).reduce((a, b) =>
      indicators[a[0] as keyof typeof indicators] > indicators[b[0] as keyof typeof indicators] ? a : b
    );

    return UrgencyLevel[maxIndicator[0].toUpperCase() as keyof typeof UrgencyLevel];
  }

  // Segment Classification
  classifySegment(profile: Partial<VisitorProfile>): VisitorSegment {
    const { intent, location, device, behavior, history, preferences } = profile;

    // Returning client check
    if (history && history.totalVisits > 1) {
      return VisitorSegment.RETURNING_CLIENT;
    }

    // Emergency segmentation
    if (intent === VisitorIntent.EMERGENCY) {
      if (preferences?.propertyType === 'commercial' ||
          behavior?.entryPoint.includes('commercial')) {
        return VisitorSegment.EMERGENCY_COMMERCIAL;
      }
      return VisitorSegment.EMERGENCY_RESIDENTIAL;
    }

    // Insurance agent detection
    if (intent === VisitorIntent.INSURANCE_CLAIM) {
      const agentIndicators = [
        behavior?.referrer.includes('insurance'),
        behavior?.searchTerms?.some(t => t.includes('adjuster')),
        history?.quotesRequested && history.quotesRequested > 3
      ].filter(Boolean).length;

      if (agentIndicators >= 2) {
        return VisitorSegment.INSURANCE_AGENT;
      }
    }

    // Property manager detection
    const pmIndicators = [
      (behavior?.pagesViewed?.filter(p => p.url.includes('commercial')).length ?? 0) > 2,
      (history?.servicesViewed?.filter(s => s.includes('commercial')).length ?? 0) > 1,
      preferences?.propertyType === 'commercial'
    ].filter(Boolean).length;

    if (pmIndicators >= 2) {
      return VisitorSegment.PROPERTY_MANAGER;
    }

    // High-value residential detection
    const hvIndicators = [
      location?.suburb && this.isHighValueSuburb(location.suburb),
      preferences?.budgetRange === 'premium',
      behavior?.pagesViewed.some(p => p.url.includes('premium'))
    ].filter(Boolean).length;

    if (hvIndicators >= 2) {
      return VisitorSegment.HIGH_VALUE_RESIDENTIAL;
    }

    // Prevention focused
    if (intent === VisitorIntent.PREVENTION || intent === VisitorIntent.MAINTENANCE) {
      return VisitorSegment.PREVENTION_FOCUSED;
    }

    // Commercial property
    if (preferences?.propertyType === 'commercial') {
      return VisitorSegment.COMMERCIAL_PROPERTY;
    }

    return VisitorSegment.NEW_VISITOR;
  }

  private isHighValueSuburb(suburb: string): boolean {
    const highValueSuburbs = [
      'New Farm', 'Teneriffe', 'Ascot', 'Hamilton', 'Bulimba',
      'Hawthorne', 'Norman Park', 'Seven Hills', 'Paddington',
      'Bardon', 'Ashgrove', 'The Gap', 'Brookfield', 'Pullenvale',
      'Fig Tree Pocket', 'Kenmore', 'Chapel Hill', 'Toowong',
      'St Lucia', 'Indooroopilly', 'Taringa', 'Chelmer', 'Graceville'
    ];

    return highValueSuburbs.some(hvs =>
      suburb.toLowerCase().includes(hvs.toLowerCase())
    );
  }

  // Device Detection
  detectDevice(): DeviceInfo {
    if (typeof window === 'undefined') {
      return {
        type: 'desktop',
        os: 'unknown',
        browser: 'unknown',
        screenSize: { width: 1920, height: 1080 },
        isTouch: false
      };
    }

    const ua = navigator.userAgent;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Detect device type
    let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';
    if (/Mobile|Android|iPhone/i.test(ua) && screenWidth < 768) {
      deviceType = 'mobile';
    } else if (/iPad|Tablet/i.test(ua) || (screenWidth >= 768 && screenWidth < 1024)) {
      deviceType = 'tablet';
    }

    // Detect OS
    let os = 'unknown';
    if (/Windows/i.test(ua)) os = 'Windows';
    else if (/Mac/i.test(ua)) os = 'MacOS';
    else if (/Android/i.test(ua)) os = 'Android';
    else if (/iOS|iPhone|iPad/i.test(ua)) os = 'iOS';
    else if (/Linux/i.test(ua)) os = 'Linux';

    // Detect browser
    let browser = 'unknown';
    if (/Chrome/i.test(ua) && !/Edge/i.test(ua)) browser = 'Chrome';
    else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';
    else if (/Firefox/i.test(ua)) browser = 'Firefox';
    else if (/Edge/i.test(ua)) browser = 'Edge';

    // Detect connection speed (basic)
    let connection: 'slow' | 'fast' | 'unknown' = 'unknown';
    if ('connection' in navigator) {
      const conn = (navigator as any).connection;
      if (conn.effectiveType === '4g') connection = 'fast';
      else if (conn.effectiveType === '3g' || conn.effectiveType === '2g') connection = 'slow';
    }

    return {
      type: deviceType,
      os,
      browser,
      screenSize: { width: screenWidth, height: screenHeight },
      isTouch: 'ontouchstart' in window,
      connection
    };
  }

  // Behavior Tracking
  trackBehavior(event: UserInteraction | PageView): void {
    if (!this.profile.behavior) return;

    if ('duration' in event) {
      // It's a PageView
      this.profile.behavior.pagesViewed.push(event as PageView);
    } else {
      // It's a UserInteraction
      this.profile.behavior.interactions.push(event as UserInteraction);
    }

    // Update engagement score
    this.updateEngagementScore();
  }

  private updateEngagementScore(): void {
    if (!this.profile.behavior) return;

    const { pagesViewed, interactions, scrollDepth, timeOnSite } = this.profile.behavior;

    let score = 0;

    // Page views (max 20 points)
    score += Math.min(pagesViewed.length * 4, 20);

    // Interactions (max 30 points)
    score += Math.min(interactions.length * 5, 30);

    // Scroll depth (max 20 points)
    score += scrollDepth * 20;

    // Time on site (max 30 points)
    const minutes = timeOnSite / 60;
    score += Math.min(minutes * 3, 30);

    // High-value interactions bonus
    const highValueInteractions = interactions.filter(i =>
      i.type === 'form_submit' || i.type === 'call' || i.type === 'chat'
    ).length;
    score += highValueInteractions * 10;

    this.profile.behavior.engagementScore = Math.min(score, 100);
  }

  // Get current profile
  getProfile(): VisitorProfile {
    return this.profile as VisitorProfile;
  }

  // Update profile
  updateProfile(updates: Partial<VisitorProfile>): void {
    this.profile = { ...this.profile, ...updates };
  }
}

interface IntentSignals {
  entryUrl: string;
  referrer: string;
  searchTerms?: string[];
  timeOfDay: number;
  dayOfWeek: number;
  pagesViewed: string[];
  interactions: UserInteraction[];
  scrollSpeed: number;
}