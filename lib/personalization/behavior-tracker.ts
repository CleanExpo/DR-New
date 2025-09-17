// Behavioral Tracking and Analytics Module
import { BehaviorData, UserInteraction, PageView, VisitorProfile } from './types';

// Define missing interfaces
interface HeatmapPoint {
  x: number;
  y: number;
  timestamp: number;
  intensity: number;
}

interface FormEngagement {
  startTime: number;
  completedFields: string[];
  abandonedFields: string[];
  totalTime?: number;
}

export class BehaviorTracker {
  private sessionStartTime: number;
  private lastActivityTime: number;
  private inactivityTimer: NodeJS.Timeout | null = null;
  private scrollObserver: IntersectionObserver | null = null;
  private clickTracker: Map<string, number> = new Map();
  private heatmapData: HeatmapPoint[] = [];
  private formEngagement: Map<string, FormEngagement> = new Map();

  constructor() {
    this.sessionStartTime = Date.now();
    this.lastActivityTime = Date.now();

    if (typeof window !== 'undefined') {
      this.initializeTrackers();
    }
  }

  private initializeTrackers(): void {
    // Page visibility tracking
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));

    // Interaction tracking
    document.addEventListener('click', this.handleClick.bind(this), true);
    document.addEventListener('submit', this.handleFormSubmit.bind(this), true);

    // Scroll tracking
    window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
    this.initializeScrollObserver();

    // Mouse movement for heatmap
    document.addEventListener('mousemove', this.handleMouseMove.bind(this), { passive: true });

    // Form engagement tracking
    document.addEventListener('focus', this.handleFormFocus.bind(this), true);
    document.addEventListener('blur', this.handleFormBlur.bind(this), true);

    // Exit intent detection
    document.addEventListener('mouseout', this.handleMouseOut.bind(this));

    // Rage click detection
    this.initializeRageClickDetection();

    // Inactivity tracking
    this.resetInactivityTimer();
  }

  private initializeScrollObserver(): void {
    if (typeof IntersectionObserver === 'undefined') return;

    const sections = document.querySelectorAll('section, [data-track-visibility]');

    this.scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.trackEvent({
              type: 'visibility',
              target: entry.target.id || entry.target.className,
              metadata: {
                visibilityRatio: entry.intersectionRatio,
                timestamp: Date.now()
              }
            });
          }
        });
      },
      { threshold: [0.25, 0.5, 0.75, 1.0] }
    );

    sections.forEach(section => this.scrollObserver?.observe(section));
  }

  private handleVisibilityChange(): void {
    if (document.hidden) {
      this.trackEvent({
        type: 'visibility_change',
        target: 'tab_hidden',
        metadata: { timeOnPage: Date.now() - this.sessionStartTime }
      });
    } else {
      this.trackEvent({
        type: 'visibility_change',
        target: 'tab_visible',
        metadata: { awayTime: Date.now() - this.lastActivityTime }
      });
    }
  }

  private handleClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const trackableTarget = this.getTrackableElement(target);

    if (!trackableTarget) return;

    const interaction: UserInteraction = {
      type: 'click',
      target: this.getElementIdentifier(trackableTarget),
      timestamp: Date.now(),
      metadata: {
        tagName: trackableTarget.tagName,
        text: trackableTarget.textContent?.slice(0, 50),
        href: (trackableTarget as HTMLAnchorElement).href,
        position: { x: event.clientX, y: event.clientY }
      }
    };

    // Special handling for important elements
    if (trackableTarget.matches('[data-emergency], .emergency-cta, [href*="tel:"]')) {
      interaction.metadata!.isEmergency = true;
    }

    if (trackableTarget.matches('a[href*="tel:"]')) {
      interaction.type = 'call';
      interaction.metadata!.phoneNumber = (trackableTarget as HTMLAnchorElement).href;
    }

    this.trackEvent(interaction);
    this.updateClickMap(trackableTarget);
    this.resetInactivityTimer();
  }

  private getTrackableElement(element: HTMLElement): HTMLElement | null {
    // Find the nearest trackable parent element
    const trackableSelectors = [
      'a', 'button', 'input', 'select', 'textarea',
      '[role="button"]', '[onclick]', '[data-track]'
    ];

    for (const selector of trackableSelectors) {
      const trackable = element.closest(selector) as HTMLElement;
      if (trackable) return trackable;
    }

    return null;
  }

  private getElementIdentifier(element: HTMLElement): string {
    if (element.id) return `#${element.id}`;
    if (element.className) return `.${element.className.split(' ')[0]}`;
    if (element.getAttribute('data-track')) return element.getAttribute('data-track')!;
    return `${element.tagName.toLowerCase()}`;
  }

  private updateClickMap(element: HTMLElement): void {
    const identifier = this.getElementIdentifier(element);
    const currentCount = this.clickTracker.get(identifier) || 0;
    this.clickTracker.set(identifier, currentCount + 1);

    // Detect rage clicks (3+ clicks in 2 seconds)
    if (currentCount >= 2) {
      const recentClicks = this.getRecentClicksForElement(identifier);
      if (recentClicks >= 3) {
        this.trackEvent({
          type: 'rage_click',
          target: identifier,
          metadata: { clicks: recentClicks }
        });
      }
    }
  }

  private getRecentClicksForElement(identifier: string): number {
    // In production, track timestamps for accurate rage click detection
    return this.clickTracker.get(identifier) || 0;
  }

  private handleScroll(): void {
    const scrollDepth = this.calculateScrollDepth();
    const scrollSpeed = this.calculateScrollSpeed();

    this.trackEvent({
      type: 'scroll',
      target: 'window',
      metadata: {
        depth: scrollDepth,
        speed: scrollSpeed,
        direction: this.getScrollDirection()
      }
    });

    this.resetInactivityTimer();
  }

  private calculateScrollDepth(): number {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    return Math.min(1, (scrollTop + windowHeight) / documentHeight);
  }

  private lastScrollPosition = 0;
  private lastScrollTime = Date.now();

  private calculateScrollSpeed(): number {
    const currentPosition = window.pageYOffset;
    const currentTime = Date.now();

    const distance = Math.abs(currentPosition - this.lastScrollPosition);
    const time = currentTime - this.lastScrollTime;

    const speed = time > 0 ? distance / time : 0;

    this.lastScrollPosition = currentPosition;
    this.lastScrollTime = currentTime;

    return Math.min(1, speed / 10); // Normalize to 0-1
  }

  private getScrollDirection(): 'up' | 'down' | 'none' {
    const currentPosition = window.pageYOffset;
    if (currentPosition > this.lastScrollPosition) return 'down';
    if (currentPosition < this.lastScrollPosition) return 'up';
    return 'none';
  }

  private handleMouseMove(event: MouseEvent): void {
    // Sample mouse movements for heatmap (throttled)
    if (Math.random() > 0.95) {
      this.heatmapData.push({
        x: event.clientX,
        y: event.clientY,
        timestamp: Date.now(),
        intensity: 1
      });

      // Keep heatmap data size manageable
      if (this.heatmapData.length > 1000) {
        this.heatmapData = this.heatmapData.slice(-500);
      }
    }
  }

  private handleMouseOut(event: MouseEvent): void {
    // Detect exit intent
    if (event.clientY <= 0) {
      this.trackEvent({
        type: 'exit_intent',
        target: 'viewport_top',
        metadata: {
          timeOnPage: Date.now() - this.sessionStartTime,
          scrollDepth: this.calculateScrollDepth()
        }
      });
    }
  }

  private handleFormFocus(event: FocusEvent): void {
    const target = event.target as HTMLElement;
    if (!this.isFormField(target)) return;

    const formId = this.getFormIdentifier(target);
    const engagement = this.formEngagement.get(formId) || {
      startTime: Date.now(),
      fields: new Set(),
      completed: false
    };

    engagement.fields.add(this.getElementIdentifier(target));
    this.formEngagement.set(formId, engagement);

    this.trackEvent({
      type: 'form_start',
      target: formId,
      metadata: {
        field: this.getElementIdentifier(target)
      }
    });
  }

  private handleFormBlur(event: FocusEvent): void {
    const target = event.target as HTMLElement;
    if (!this.isFormField(target)) return;

    const formId = this.getFormIdentifier(target);
    const engagement = this.formEngagement.get(formId);

    if (engagement) {
      const timeSpent = Date.now() - engagement.startTime;

      this.trackEvent({
        type: 'form_field_complete',
        target: this.getElementIdentifier(target),
        metadata: {
          formId,
          timeSpent,
          hasValue: (target as HTMLInputElement).value?.length > 0
        }
      });
    }
  }

  private handleFormSubmit(event: Event): void {
    const form = event.target as HTMLFormElement;
    const formId = this.getFormIdentifier(form);
    const engagement = this.formEngagement.get(formId);

    this.trackEvent({
      type: 'form_submit',
      target: formId,
      timestamp: Date.now(),
      metadata: {
        formName: form.name || form.id,
        action: form.action,
        method: form.method,
        timeToComplete: engagement ? Date.now() - engagement.startTime : 0,
        fieldsEngaged: engagement ? engagement.fields.size : 0
      }
    });

    if (engagement) {
      engagement.completed = true;
      this.formEngagement.set(formId, engagement);
    }
  }

  private isFormField(element: HTMLElement): boolean {
    return ['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName);
  }

  private getFormIdentifier(element: HTMLElement): string {
    const form = element.closest('form');
    if (form) {
      return form.id || form.name || 'form_' + Array.from(document.forms).indexOf(form);
    }
    return 'no_form';
  }

  private initializeRageClickDetection(): void {
    let clickTimes: number[] = [];

    document.addEventListener('click', () => {
      const now = Date.now();
      clickTimes.push(now);

      // Keep only clicks from last 2 seconds
      clickTimes = clickTimes.filter(time => now - time < 2000);

      if (clickTimes.length >= 5) {
        this.trackEvent({
          type: 'frustration_signal',
          target: 'rapid_clicking',
          metadata: {
            clicks: clickTimes.length,
            timespan: now - clickTimes[0]
          }
        });
      }
    });
  }

  private resetInactivityTimer(): void {
    this.lastActivityTime = Date.now();

    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
    }

    this.inactivityTimer = setTimeout(() => {
      this.trackEvent({
        type: 'inactivity',
        target: 'user_idle',
        metadata: {
          idleTime: 30000, // 30 seconds
          lastActivity: this.lastActivityTime
        }
      });
    }, 30000);
  }

  // Track page view
  trackPageView(url: string, title: string): PageView {
    const pageView: PageView = {
      url,
      title,
      timestamp: Date.now(),
      duration: 0,
      exitIntent: false
    };

    // Calculate duration when leaving page
    window.addEventListener('beforeunload', () => {
      pageView.duration = Date.now() - pageView.timestamp;
    });

    return pageView;
  }

  // Track custom event
  trackEvent(interaction: Partial<UserInteraction>): void {
    const event: UserInteraction = {
      type: interaction.type || 'click',
      target: interaction.target || 'unknown',
      timestamp: interaction.timestamp || Date.now(),
      metadata: interaction.metadata
    };

    // Send to analytics or store locally
    this.sendToAnalytics(event);
  }

  private sendToAnalytics(event: UserInteraction): void {
    // In production, send to analytics service
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.type, {
        event_category: 'engagement',
        event_label: event.target,
        value: event.metadata?.value,
        custom_parameters: event.metadata
      });
    }

    // Store in session for profiling
    this.storeInSession(event);
  }

  private storeInSession(event: UserInteraction): void {
    if (typeof window === 'undefined') return;

    const stored = sessionStorage.getItem('dr_behavior_data');
    const data = stored ? JSON.parse(stored) : { interactions: [] };

    data.interactions.push(event);

    // Keep only last 100 interactions
    if (data.interactions.length > 100) {
      data.interactions = data.interactions.slice(-100);
    }

    sessionStorage.setItem('dr_behavior_data', JSON.stringify(data));
  }

  // Get behavior summary
  getBehaviorSummary(): BehaviorSummary {
    const timeOnSite = Date.now() - this.sessionStartTime;
    const scrollDepth = this.calculateScrollDepth();
    const engagementScore = this.calculateEngagementScore();

    return {
      timeOnSite,
      scrollDepth,
      engagementScore,
      clickCount: Array.from(this.clickTracker.values()).reduce((a, b) => a + b, 0),
      formsEngaged: this.formEngagement.size,
      formsCompleted: Array.from(this.formEngagement.values()).filter(e => e.completed).length,
      bounceRisk: this.calculateBounceRisk(),
      intentSignals: this.detectIntentSignals()
    };
  }

  private calculateEngagementScore(): number {
    const timeScore = Math.min(30, (Date.now() - this.sessionStartTime) / 10000);
    const scrollScore = this.calculateScrollDepth() * 20;
    const clickScore = Math.min(20, Array.from(this.clickTracker.values()).reduce((a, b) => a + b, 0) * 2);
    const formScore = this.formEngagement.size * 10;

    return Math.min(100, timeScore + scrollScore + clickScore + formScore);
  }

  private calculateBounceRisk(): number {
    const timeOnSite = (Date.now() - this.sessionStartTime) / 1000;
    const scrollDepth = this.calculateScrollDepth();
    const interactions = Array.from(this.clickTracker.values()).reduce((a, b) => a + b, 0);

    if (timeOnSite < 10 && scrollDepth < 0.1 && interactions === 0) return 0.9;
    if (timeOnSite < 30 && scrollDepth < 0.3 && interactions < 2) return 0.7;
    if (timeOnSite < 60 && scrollDepth < 0.5 && interactions < 3) return 0.5;
    if (timeOnSite < 120 && scrollDepth < 0.7 && interactions < 5) return 0.3;

    return 0.1;
  }

  private detectIntentSignals(): string[] {
    const signals: string[] = [];

    // Check for emergency signals
    if (this.clickTracker.has('.emergency-cta') || this.clickTracker.has('[data-emergency]')) {
      signals.push('emergency_intent');
    }

    // Check for quote interest
    if (this.formEngagement.has('quote_form') || this.clickTracker.has('.quote-button')) {
      signals.push('quote_interest');
    }

    // Check for information seeking
    if (this.calculateScrollDepth() > 0.7) {
      signals.push('information_seeking');
    }

    // Check for comparison shopping
    if (Array.from(this.clickTracker.keys()).filter(k => k.includes('service')).length > 3) {
      signals.push('comparing_services');
    }

    return signals;
  }

  // Cleanup
  destroy(): void {
    if (this.scrollObserver) {
      this.scrollObserver.disconnect();
    }

    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
    }

    // Remove all event listeners
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    document.removeEventListener('click', this.handleClick);
    document.removeEventListener('submit', this.handleFormSubmit);
    window.removeEventListener('scroll', this.handleScroll);
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseout', this.handleMouseOut);
    document.removeEventListener('focus', this.handleFormFocus);
    document.removeEventListener('blur', this.handleFormBlur);
  }
}

interface HeatmapPoint {
  x: number;
  y: number;
  timestamp: number;
}

interface FormEngagement {
  startTime: number;
  fields: Set<string>;
  completed: boolean;
}

interface BehaviorSummary {
  timeOnSite: number;
  scrollDepth: number;
  engagementScore: number;
  clickCount: number;
  formsEngaged: number;
  formsCompleted: number;
  bounceRisk: number;
  intentSignals: string[];
}

type EventType =
  | 'visibility'
  | 'visibility_change'
  | 'rage_click'
  | 'scroll'
  | 'exit_intent'
  | 'form_field_complete'
  | 'frustration_signal'
  | 'inactivity';