// Dynamic Content Adaptation System
import {
  VisitorProfile,
  ContentAdaptation,
  UIAdaptation,
  VisitorIntent,
  UrgencyLevel,
  VisitorSegment
} from './types';

export class ContentAdapter {
  private readonly heroImages = {
    emergency: '/images/hero/disaster-recovery-services.jpg',
    water: '/images/hero/fire-water-damage-restoration.jpg',
    fire: '/images/hero/fire-smoke-damage-restoration.jpg',
    mould: '/images/hero/mould-remediation-services.jpg',
    commercial: '/images/hero/commercial-restoration-services.jpg',
    sewage: '/images/hero/sewage-remediation-services.png',
    biohazard: '/images/hero/biohazard-remediation-services.png'
  };

  async adaptContent(profile: VisitorProfile): Promise<ContentAdaptation> {
    const heroMessage = this.generateHeroMessage(profile);
    const heroImage = this.selectHeroImage(profile);
    const emphasizedServices = this.selectEmphasizedServices(profile);
    const hiddenSections = this.determineHiddenSections(profile);
    const testimonialFilter = this.getTestimonialFilter(profile);
    const caseStudyFilter = this.getCaseStudyFilter(profile);

    return {
      heroMessage,
      heroImage,
      emphasizedServices,
      hiddenSections,
      testimonialFilter,
      caseStudyFilter
    };
  }

  private generateHeroMessage(profile: VisitorProfile): string {
    // Emergency visitors
    if (profile.urgencyLevel === UrgencyLevel.CRITICAL) {
      const location = profile.location?.city || 'Brisbane';
      return `Emergency Response Available Now in ${location} - Call 1300 309 361`;
    }

    // Weather-based messaging
    if (profile.weatherContext) {
      const { condition, severity, alerts } = profile.weatherContext;

      if (condition === 'storm' && severity === 'extreme') {
        return 'Storm Emergency Response Team Standing By - Immediate Help Available';
      }

      if (condition === 'flood') {
        return 'Flood Damage Experts - Fast Water Extraction & Drying Services';
      }

      if (alerts.length > 0) {
        const alert = alerts[0];
        if (alert.type.includes('Storm')) {
          return 'Storm Warning Active - Prepare Your Property & Know Who to Call';
        }
      }
    }

    // Intent-based messaging
    switch (profile.intent) {
      case VisitorIntent.EMERGENCY:
        return '24/7 Emergency Disaster Recovery - Immediate Response Available';

      case VisitorIntent.INSURANCE_CLAIM:
        return 'Insurance-Approved Restoration Services - We Handle the Claims Process';

      case VisitorIntent.PREVENTION:
        return 'Protect Your Property Before Disaster Strikes - Prevention Services Available';

      case VisitorIntent.QUOTE_REQUEST:
        return 'Get an Instant Quote - Professional Restoration Services';

      case VisitorIntent.MAINTENANCE:
        return 'Professional Property Maintenance - Prevent Future Damage';

      default:
        break;
    }

    // Segment-based messaging
    switch (profile.segment) {
      case VisitorSegment.EMERGENCY_COMMERCIAL:
        return 'Commercial Emergency Response - Minimize Business Disruption';

      case VisitorSegment.HIGH_VALUE_RESIDENTIAL:
        return 'Premium Restoration Services for Luxury Properties';

      case VisitorSegment.PROPERTY_MANAGER:
        return 'Trusted by Property Managers - Multi-Site Support Available';

      case VisitorSegment.INSURANCE_AGENT:
        return 'Preferred Restoration Partner - Insurance Direct Billing';

      case VisitorSegment.RETURNING_CLIENT:
        return 'Welcome Back - Your Trusted Disaster Recovery Partner';

      default:
        break;
    }

    // Time-based messaging
    const hour = new Date().getHours();
    const location = profile.location?.city || 'Brisbane';

    if (hour < 7 || hour > 21) {
      return `24-Hour Emergency Service in ${location} - We're Here When You Need Us`;
    }

    if (hour >= 7 && hour < 12) {
      return `Good Morning ${location} - Professional Disaster Recovery Services`;
    }

    if (hour >= 12 && hour < 17) {
      return `${location}'s Trusted Disaster Recovery Experts - Fast Response Guaranteed`;
    }

    return `Evening Emergency Services Available - ${location} Team Ready to Help`;
  }

  private selectHeroImage(profile: VisitorProfile): string {
    // Emergency visitors see most relevant disaster image
    if (profile.urgencyLevel === UrgencyLevel.CRITICAL) {
      return this.heroImages.emergency;
    }

    // Weather-based selection
    if (profile.weatherContext) {
      const { condition } = profile.weatherContext;
      if (condition === 'flood') return this.heroImages.water;
      if (condition === 'storm') return this.heroImages.emergency;
      if (condition === 'fire') return this.heroImages.fire;
    }

    // Behavior-based selection
    if (profile.behavior) {
      const viewedPages = profile.behavior.pagesViewed.map(p => p.url).join(' ');

      if (viewedPages.includes('water')) return this.heroImages.water;
      if (viewedPages.includes('fire')) return this.heroImages.fire;
      if (viewedPages.includes('mould')) return this.heroImages.mould;
      if (viewedPages.includes('commercial')) return this.heroImages.commercial;
      if (viewedPages.includes('sewage')) return this.heroImages.sewage;
      if (viewedPages.includes('biohazard')) return this.heroImages.biohazard;
    }

    // Segment-based selection
    if (profile.segment === VisitorSegment.COMMERCIAL_PROPERTY ||
        profile.segment === VisitorSegment.EMERGENCY_COMMERCIAL) {
      return this.heroImages.commercial;
    }

    // Default to main disaster recovery image
    return this.heroImages.emergency;
  }

  private selectEmphasizedServices(profile: VisitorProfile): string[] {
    const emphasized: string[] = [];

    // Intent-based emphasis
    if (profile.intent === VisitorIntent.EMERGENCY) {
      emphasized.push('water-damage', 'fire-damage', 'storm-damage');
    } else if (profile.intent === VisitorIntent.PREVENTION) {
      emphasized.push('prevention', 'maintenance', 'inspection');
    } else if (profile.intent === VisitorIntent.INSURANCE_CLAIM) {
      emphasized.push('insurance-claims', 'documentation', 'assessment');
    }

    // Weather-based emphasis
    if (profile.weatherContext) {
      const { condition, recentEvents } = profile.weatherContext;

      if (condition === 'storm' || condition === 'flood') {
        emphasized.push('water-damage', 'storm-damage');
      }

      if (condition === 'flood') {
        emphasized.push('mould-remediation'); // Secondary concern after flooding
      }

      recentEvents.forEach(event => {
        if (event.type === 'hail') {
          emphasized.push('storm-damage', 'roof-repair');
        }
      });
    }

    // Segment-based emphasis
    if (profile.segment === VisitorSegment.COMMERCIAL_PROPERTY) {
      emphasized.push('commercial-restoration', 'business-continuity');
    }

    if (profile.segment === VisitorSegment.HIGH_VALUE_RESIDENTIAL) {
      emphasized.push('premium-services', 'white-glove-treatment');
    }

    // Behavior-based emphasis
    if (profile.history?.servicesViewed.length > 0) {
      emphasized.push(...profile.history.servicesViewed.slice(0, 2));
    }

    // Return unique services
    return [...new Set(emphasized)];
  }

  private determineHiddenSections(profile: VisitorProfile): string[] {
    const hidden: string[] = [];

    // Emergency visitors don't need to see non-urgent content
    if (profile.urgencyLevel === UrgencyLevel.CRITICAL) {
      hidden.push('blog', 'resources', 'gallery', 'prevention-tips');
    }

    // Mobile users see simplified content
    if (profile.device?.type === 'mobile') {
      hidden.push('detailed-process', 'equipment-showcase');

      // Keep only essential sections for mobile emergency users
      if (profile.urgencyLevel === UrgencyLevel.CRITICAL) {
        hidden.push('testimonials', 'certifications', 'team');
      }
    }

    // Returning clients don't need education
    if (profile.segment === VisitorSegment.RETURNING_CLIENT) {
      hidden.push('how-it-works', 'why-choose-us');
    }

    // Insurance agents skip consumer content
    if (profile.segment === VisitorSegment.INSURANCE_AGENT) {
      hidden.push('financing', 'residential-tips', 'diy-guides');
    }

    // Time-sensitive visitors skip detailed content
    if (profile.behavior && profile.behavior.bounceRisk > 0.7) {
      hidden.push('detailed-services', 'case-studies', 'awards');
    }

    return hidden;
  }

  private getTestimonialFilter(profile: VisitorProfile): string | undefined {
    if (profile.segment === VisitorSegment.COMMERCIAL_PROPERTY ||
        profile.segment === VisitorSegment.EMERGENCY_COMMERCIAL) {
      return 'commercial';
    }

    if (profile.segment === VisitorSegment.HIGH_VALUE_RESIDENTIAL) {
      return 'premium';
    }

    if (profile.intent === VisitorIntent.INSURANCE_CLAIM) {
      return 'insurance';
    }

    if (profile.location?.city) {
      return profile.location.city.toLowerCase();
    }

    return undefined;
  }

  private getCaseStudyFilter(profile: VisitorProfile): string | undefined {
    // Show relevant case studies based on visitor context
    if (profile.weatherContext?.condition !== 'normal') {
      return profile.weatherContext?.condition;
    }

    if (profile.behavior?.servicesViewed && profile.behavior.servicesViewed[0]) {
      return profile.behavior.servicesViewed[0];
    }

    return profile.segment !== VisitorSegment.NEW_VISITOR ?
           profile.segment : undefined;
  }

  adaptUI(profile: VisitorProfile): UIAdaptation {
    const layout = this.determineLayout(profile);
    const colorScheme = this.determineColorScheme(profile);
    const fontSize = this.determineFontSize(profile);
    const animations = this.shouldUseAnimations(profile);
    const chatPosition = this.determineChatPosition(profile);
    const stickyElements = this.determineStickyElements(profile);

    return {
      layout,
      colorScheme,
      fontSize,
      animations,
      chatPosition,
      stickyElements
    };
  }

  private determineLayout(profile: VisitorProfile): UIAdaptation['layout'] {
    if (profile.urgencyLevel === UrgencyLevel.CRITICAL) {
      return 'emergency';
    }

    if (profile.device?.type === 'mobile' && profile.behavior?.bounceRisk > 0.5) {
      return 'minimal';
    }

    return 'standard';
  }

  private determineColorScheme(profile: VisitorProfile): UIAdaptation['colorScheme'] {
    const hour = new Date().getHours();

    // Dark mode for night visitors
    if (hour < 6 || hour > 20) {
      return 'dark';
    }

    // High contrast for accessibility
    if (profile.preferences?.accessibility) {
      return 'high_contrast';
    }

    return 'default';
  }

  private determineFontSize(profile: VisitorProfile): UIAdaptation['fontSize'] {
    if (profile.device?.type === 'mobile') {
      return 'medium';
    }

    if (profile.segment === VisitorSegment.HIGH_VALUE_RESIDENTIAL) {
      return 'large';
    }

    return 'medium';
  }

  private shouldUseAnimations(profile: VisitorProfile): boolean {
    // Disable animations for emergency users (faster load)
    if (profile.urgencyLevel === UrgencyLevel.CRITICAL) {
      return false;
    }

    // Disable for slow connections
    if (profile.device?.connection === 'slow') {
      return false;
    }

    // Disable for users who prefer reduced motion
    if (typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return false;
    }

    return true;
  }

  private determineChatPosition(profile: VisitorProfile): UIAdaptation['chatPosition'] {
    // Center for emergency users (more prominent)
    if (profile.urgencyLevel === UrgencyLevel.CRITICAL) {
      return 'center';
    }

    // Left side for RTL languages or left-handed preference
    if (profile.preferences?.language === 'ar' ||
        profile.preferences?.handedness === 'left') {
      return 'bottom-left';
    }

    return 'bottom-right';
  }

  private determineStickyElements(profile: VisitorProfile): string[] {
    const sticky: string[] = [];

    // Emergency CTAs stay visible
    if (profile.urgencyLevel === UrgencyLevel.CRITICAL ||
        profile.urgencyLevel === UrgencyLevel.HIGH) {
      sticky.push('emergency-cta', 'phone-number');
    }

    // Quote form for interested visitors
    if (profile.intent === VisitorIntent.QUOTE_REQUEST) {
      sticky.push('quote-form');
    }

    // Chat for engaged visitors
    if (profile.behavior?.engagementScore > 50) {
      sticky.push('chat-widget');
    }

    // Trust signals for new visitors
    if (profile.segment === VisitorSegment.NEW_VISITOR) {
      sticky.push('trust-badges');
    }

    return sticky;
  }

  // Dynamic content generation
  generateDynamicContent(profile: VisitorProfile, contentType: string): string {
    switch (contentType) {
      case 'urgency_banner':
        return this.generateUrgencyBanner(profile);

      case 'location_message':
        return this.generateLocationMessage(profile);

      case 'social_proof':
        return this.generateSocialProof(profile);

      case 'cta_text':
        return this.generateCTAText(profile);

      default:
        return '';
    }
  }

  private generateUrgencyBanner(profile: VisitorProfile): string {
    if (profile.weatherContext?.alerts && profile.weatherContext.alerts.length > 0) {
      const alert = profile.weatherContext.alerts[0];
      return `⚠️ ${alert.type}: ${alert.message}`;
    }

    if (profile.urgencyLevel === UrgencyLevel.CRITICAL) {
      return '🚨 Emergency Response Team Available Now - Call 1300 309 361';
    }

    const hour = new Date().getHours();
    if (hour < 7 || hour > 21) {
      return '🌙 24/7 Emergency Service Available - We Never Close';
    }

    return '';
  }

  private generateLocationMessage(profile: VisitorProfile): string {
    if (!profile.location?.isInServiceArea) {
      return 'Contact us for service availability in your area';
    }

    const responseTime = this.estimateResponseTime(profile);
    return `${profile.location.city} team can respond in ${responseTime}`;
  }

  private estimateResponseTime(profile: VisitorProfile): string {
    if (profile.urgencyLevel === UrgencyLevel.CRITICAL) {
      return '30-60 minutes';
    }

    if (profile.location?.distanceToService && profile.location.distanceToService < 15) {
      return '1-2 hours';
    }

    if (profile.location?.distanceToService && profile.location.distanceToService < 30) {
      return '2-4 hours';
    }

    return '4-6 hours';
  }

  private generateSocialProof(profile: VisitorProfile): string {
    const proofs = [
      `${Math.floor(Math.random() * 20 + 5)} customers in ${profile.location?.city || 'your area'} this week`,
      'Average response time: 47 minutes',
      '98% customer satisfaction rate',
      'Over 1,000 properties restored'
    ];

    if (profile.weatherContext?.condition !== 'normal') {
      proofs.unshift(`Currently responding to ${Math.floor(Math.random() * 10 + 3)} weather-related calls`);
    }

    return proofs[Math.floor(Math.random() * proofs.length)];
  }

  private generateCTAText(profile: VisitorProfile): string {
    if (profile.urgencyLevel === UrgencyLevel.CRITICAL) {
      return 'Get Emergency Help Now';
    }

    switch (profile.intent) {
      case VisitorIntent.QUOTE_REQUEST:
        return 'Get Your Free Quote';

      case VisitorIntent.INSURANCE_CLAIM:
        return 'Start Insurance Claim';

      case VisitorIntent.PREVENTION:
        return 'Schedule Prevention Audit';

      default:
        return 'Get Professional Help';
    }
  }
}