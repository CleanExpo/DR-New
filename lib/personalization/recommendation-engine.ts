// AI-Powered Recommendation Engine
import {
  VisitorProfile,
  ServiceRecommendation,
  VisitorIntent,
  UrgencyLevel,
  VisitorSegment,
  CallToAction
} from './types';

export class RecommendationEngine {
  private readonly services = [
    {
      id: 'water-damage',
      name: 'Water Damage Restoration',
      keywords: ['water', 'flood', 'leak', 'burst', 'pipe', 'wet', 'moisture'],
      urgencyWeight: 0.9,
      value: 3500,
      emergencyService: true
    },
    {
      id: 'fire-damage',
      name: 'Fire & Smoke Damage',
      keywords: ['fire', 'smoke', 'burn', 'soot', 'ash', 'heat', 'char'],
      urgencyWeight: 0.95,
      value: 5000,
      emergencyService: true
    },
    {
      id: 'mould-remediation',
      name: 'Mould Remediation',
      keywords: ['mould', 'mold', 'fungus', 'mildew', 'spores', 'musty'],
      urgencyWeight: 0.7,
      value: 2500,
      emergencyService: false
    },
    {
      id: 'storm-damage',
      name: 'Storm & Natural Disasters',
      keywords: ['storm', 'wind', 'hail', 'cyclone', 'disaster', 'emergency'],
      urgencyWeight: 0.85,
      value: 4000,
      emergencyService: true
    },
    {
      id: 'biohazard',
      name: 'Biohazard & Trauma Cleaning',
      keywords: ['biohazard', 'trauma', 'crime', 'accident', 'contamination'],
      urgencyWeight: 1.0,
      value: 3000,
      emergencyService: true
    },
    {
      id: 'sewage',
      name: 'Sewage Cleanup',
      keywords: ['sewage', 'waste', 'overflow', 'backup', 'septic', 'toilet'],
      urgencyWeight: 0.9,
      value: 2800,
      emergencyService: true
    },
    {
      id: 'carpet-cleaning',
      name: 'Carpet & Upholstery Cleaning',
      keywords: ['carpet', 'upholstery', 'fabric', 'stain', 'clean'],
      urgencyWeight: 0.3,
      value: 500,
      emergencyService: false
    },
    {
      id: 'prevention',
      name: 'Prevention & Maintenance',
      keywords: ['prevent', 'maintain', 'protect', 'inspect', 'check'],
      urgencyWeight: 0.2,
      value: 800,
      emergencyService: false
    }
  ];

  private readonly crossSellMatrix = {
    'water-damage': ['mould-remediation', 'carpet-cleaning', 'prevention'],
    'fire-damage': ['water-damage', 'biohazard', 'carpet-cleaning'],
    'storm-damage': ['water-damage', 'mould-remediation', 'fire-damage'],
    'mould-remediation': ['water-damage', 'prevention', 'carpet-cleaning'],
    'sewage': ['biohazard', 'water-damage', 'carpet-cleaning'],
    'biohazard': ['sewage', 'carpet-cleaning', 'prevention'],
    'carpet-cleaning': ['prevention', 'mould-remediation'],
    'prevention': ['water-damage', 'mould-remediation']
  };

  // Generate personalized recommendations
  generateRecommendations(profile: VisitorProfile): ServiceRecommendation[] {
    const recommendations: ServiceRecommendation[] = [];

    // Intent-based recommendations
    const intentRecommendations = this.getIntentBasedRecommendations(profile);

    // Weather-based recommendations
    const weatherRecommendations = this.getWeatherBasedRecommendations(profile);

    // Behavior-based recommendations
    const behaviorRecommendations = this.getBehaviorBasedRecommendations(profile);

    // Historical recommendations
    const historicalRecommendations = this.getHistoricalRecommendations(profile);

    // Merge and score all recommendations
    const allRecommendations = [
      ...intentRecommendations,
      ...weatherRecommendations,
      ...behaviorRecommendations,
      ...historicalRecommendations
    ];

    // Deduplicate and combine scores
    const serviceScores = new Map<string, number>();
    const serviceReasons = new Map<string, string[]>();

    allRecommendations.forEach(rec => {
      const currentScore = serviceScores.get(rec.service) || 0;
      serviceScores.set(rec.service, currentScore + rec.relevanceScore);

      const currentReasons = serviceReasons.get(rec.service) || [];
      currentReasons.push(rec.reason);
      serviceReasons.set(rec.service, currentReasons);
    });

    // Create final recommendations
    serviceScores.forEach((score, serviceId) => {
      const service = this.services.find(s => s.id === serviceId);
      if (!service) return;

      const reasons = serviceReasons.get(serviceId) || [];
      const primaryReason = this.selectPrimaryReason(reasons, profile);

      recommendations.push({
        service: serviceId,
        priority: this.calculatePriority(service, profile, score),
        reason: primaryReason,
        relevanceScore: Math.min(1, score),
        urgency: this.determineServiceUrgency(service, profile),
        estimatedValue: this.estimateValue(service, profile),
        cta: this.generateCTA(service, profile)
      });
    });

    // Sort by priority
    recommendations.sort((a, b) => b.priority - a.priority);

    // Return top recommendations
    return recommendations.slice(0, 6);
  }

  private getIntentBasedRecommendations(profile: VisitorProfile): ServiceRecommendation[] {
    const recommendations: ServiceRecommendation[] = [];

    switch (profile.intent) {
      case VisitorIntent.EMERGENCY:
        // Prioritize emergency services
        this.services
          .filter(s => s.emergencyService)
          .forEach(service => {
            recommendations.push({
              service: service.id,
              priority: service.urgencyWeight * 100,
              reason: 'Emergency service available 24/7',
              relevanceScore: service.urgencyWeight,
              urgency: UrgencyLevel.CRITICAL,
              estimatedValue: service.value,
              cta: this.generateEmergencyCTA(service)
            });
          });
        break;

      case VisitorIntent.INSURANCE_CLAIM:
        // Focus on documentation and assessment services
        recommendations.push({
          service: 'water-damage',
          priority: 80,
          reason: 'Insurance-approved restoration process',
          relevanceScore: 0.9,
          urgency: UrgencyLevel.HIGH,
          estimatedValue: 3500,
          cta: {
            text: 'Get Insurance Assessment',
            action: '/insurance-claims',
            style: 'urgent',
            placement: 'hero'
          }
        });
        break;

      case VisitorIntent.PREVENTION:
        // Recommend preventive services
        recommendations.push({
          service: 'prevention',
          priority: 70,
          reason: 'Protect your property before disaster strikes',
          relevanceScore: 0.8,
          urgency: UrgencyLevel.LOW,
          estimatedValue: 800,
          cta: {
            text: 'Schedule Inspection',
            action: '/prevention',
            style: 'standard',
            placement: 'inline'
          }
        });
        break;

      case VisitorIntent.QUOTE_REQUEST:
        // Show most popular services for quotes
        const popularServices = ['water-damage', 'fire-damage', 'mould-remediation'];
        popularServices.forEach((serviceId, index) => {
          const service = this.services.find(s => s.id === serviceId);
          if (service) {
            recommendations.push({
              service: service.id,
              priority: 60 - index * 10,
              reason: 'Get instant quote for our most requested service',
              relevanceScore: 0.7,
              urgency: UrgencyLevel.MEDIUM,
              estimatedValue: service.value,
              cta: {
                text: 'Get Free Quote',
                action: '/quote',
                style: 'standard',
                placement: 'inline'
              }
            });
          }
        });
        break;
    }

    return recommendations;
  }

  private getWeatherBasedRecommendations(profile: VisitorProfile): ServiceRecommendation[] {
    const recommendations: ServiceRecommendation[] = [];

    if (!profile.weatherContext) return recommendations;

    const { condition, severity, alerts, recentEvents } = profile.weatherContext;

    // Storm conditions
    if (condition === 'storm' || alerts.some(a => a.type.includes('storm'))) {
      recommendations.push({
        service: 'storm-damage',
        priority: severity === 'extreme' ? 100 : 80,
        reason: `Storm ${severity === 'extreme' ? 'warning' : 'alert'} in your area - be prepared`,
        relevanceScore: 0.9,
        urgency: severity === 'extreme' ? UrgencyLevel.CRITICAL : UrgencyLevel.HIGH,
        estimatedValue: 4000,
        cta: {
          text: 'Emergency Storm Response',
          action: 'tel:1300309361',
          style: 'emergency',
          placement: 'sticky'
        }
      });

      recommendations.push({
        service: 'water-damage',
        priority: 70,
        reason: 'Storm-related water damage prevention',
        relevanceScore: 0.8,
        urgency: UrgencyLevel.HIGH,
        estimatedValue: 3500,
        cta: {
          text: 'Prepare for Flooding',
          action: '/water-damage',
          style: 'urgent',
          placement: 'hero'
        }
      });
    }

    // Flood conditions
    if (condition === 'flood' || alerts.some(a => a.type.includes('flood'))) {
      recommendations.push({
        service: 'water-damage',
        priority: 95,
        reason: 'Flood warning - immediate response available',
        relevanceScore: 0.95,
        urgency: UrgencyLevel.CRITICAL,
        estimatedValue: 3500,
        cta: {
          text: 'Call Flood Response Team',
          action: 'tel:1300309361',
          style: 'emergency',
          placement: 'sticky'
        }
      });

      recommendations.push({
        service: 'mould-remediation',
        priority: 60,
        reason: 'Prevent mould growth after flooding',
        relevanceScore: 0.7,
        urgency: UrgencyLevel.MEDIUM,
        estimatedValue: 2500,
        cta: {
          text: 'Mould Prevention',
          action: '/mould-remediation',
          style: 'standard',
          placement: 'inline'
        }
      });
    }

    // Recent weather events
    recentEvents.forEach(event => {
      const daysSince = (Date.now() - event.date) / (1000 * 60 * 60 * 24);

      if (daysSince < 7) {
        if (event.type === 'hail') {
          recommendations.push({
            service: 'storm-damage',
            priority: 70,
            reason: `Recent hail damage in ${event.affectedSuburbs[0]} area`,
            relevanceScore: 0.75,
            urgency: UrgencyLevel.HIGH,
            estimatedValue: 4000,
            cta: {
              text: 'Hail Damage Assessment',
              action: '/storm-damage',
              style: 'urgent',
              placement: 'hero'
            }
          });
        }
      }
    });

    return recommendations;
  }

  private getBehaviorBasedRecommendations(profile: VisitorProfile): ServiceRecommendation[] {
    const recommendations: ServiceRecommendation[] = [];
    const { behavior } = profile;

    if (!behavior) return recommendations;

    // Analyze search terms and page content
    const allTerms = [
      ...(behavior.searchTerms || []),
      behavior.entryPoint,
      ...behavior.pagesViewed.map(p => p.url)
    ].join(' ').toLowerCase();

    // Match services based on keywords
    this.services.forEach(service => {
      const keywordMatches = service.keywords.filter(keyword =>
        allTerms.includes(keyword)
      ).length;

      if (keywordMatches > 0) {
        const relevance = Math.min(1, keywordMatches * 0.3);

        recommendations.push({
          service: service.id,
          priority: relevance * 50,
          reason: this.generateBehaviorReason(service, keywordMatches),
          relevanceScore: relevance,
          urgency: this.determineUrgencyFromBehavior(behavior),
          estimatedValue: service.value,
          cta: this.generateCTA(service, profile)
        });
      }
    });

    // High engagement with specific service pages
    const servicePageViews = behavior.pagesViewed.filter(p =>
      this.services.some(s => p.url.includes(s.id))
    );

    servicePageViews.forEach(pageView => {
      const serviceId = this.services.find(s => pageView.url.includes(s.id))?.id;
      if (serviceId) {
        recommendations.push({
          service: serviceId,
          priority: 60,
          reason: 'You recently viewed this service',
          relevanceScore: 0.7,
          urgency: UrgencyLevel.MEDIUM,
          estimatedValue: this.services.find(s => s.id === serviceId)?.value || 0,
          cta: {
            text: 'Continue Where You Left Off',
            action: `/${serviceId}`,
            style: 'standard',
            placement: 'inline'
          }
        });

        // Add cross-sell recommendations
        const crossSells = this.crossSellMatrix[serviceId as keyof typeof this.crossSellMatrix];
        if (crossSells) {
          crossSells.slice(0, 2).forEach(crossSellId => {
            const crossSellService = this.services.find(s => s.id === crossSellId);
            if (crossSellService) {
              recommendations.push({
                service: crossSellId,
                priority: 40,
                reason: 'Customers also need this service',
                relevanceScore: 0.5,
                urgency: UrgencyLevel.LOW,
                estimatedValue: crossSellService.value,
                cta: {
                  text: 'Learn More',
                  action: `/${crossSellId}`,
                  style: 'soft',
                  placement: 'inline'
                }
              });
            }
          });
        }
      }
    });

    // Quick, focused browsing indicates urgency
    if (behavior.timeOnSite < 60 && behavior.scrollDepth > 0.5) {
      const emergencyServices = this.services.filter(s => s.emergencyService);
      emergencyServices.slice(0, 2).forEach(service => {
        recommendations.push({
          service: service.id,
          priority: 70,
          reason: 'Fast emergency response available',
          relevanceScore: 0.75,
          urgency: UrgencyLevel.HIGH,
          estimatedValue: service.value,
          cta: {
            text: 'Get Immediate Help',
            action: 'tel:1300309361',
            style: 'urgent',
            placement: 'sticky'
          }
        });
      });
    }

    return recommendations;
  }

  private getHistoricalRecommendations(profile: VisitorProfile): ServiceRecommendation[] {
    const recommendations: ServiceRecommendation[] = [];
    const { history } = profile;

    if (!history || history.totalVisits === 1) return recommendations;

    // Returning visitor recommendations
    if (history.servicesViewed.length > 0) {
      // Recommend previously viewed services
      history.servicesViewed.slice(0, 2).forEach(serviceId => {
        const service = this.services.find(s => s.id === serviceId);
        if (service) {
          recommendations.push({
            service: service.id,
            priority: 50,
            reason: 'Welcome back! Continue with your previous inquiry',
            relevanceScore: 0.6,
            urgency: UrgencyLevel.MEDIUM,
            estimatedValue: service.value,
            cta: {
              text: 'Get Your Quote',
              action: '/quote',
              style: 'standard',
              placement: 'hero'
            }
          });
        }
      });
    }

    // Previous conversions
    if (history.conversions.length > 0) {
      const lastConversion = history.conversions[history.conversions.length - 1];
      if (lastConversion.service) {
        const service = this.services.find(s => s.id === lastConversion.service);
        if (service) {
          recommendations.push({
            service: 'prevention',
            priority: 40,
            reason: 'Protect your property with regular maintenance',
            relevanceScore: 0.5,
            urgency: UrgencyLevel.LOW,
            estimatedValue: 800,
            cta: {
              text: 'Schedule Maintenance',
              action: '/prevention',
              style: 'soft',
              placement: 'inline'
            }
          });
        }
      }
    }

    return recommendations;
  }

  private calculatePriority(
    service: any,
    profile: VisitorProfile,
    score: number
  ): number {
    let priority = score * 50;

    // Urgency multiplier
    if (profile.urgencyLevel === UrgencyLevel.CRITICAL) {
      priority *= 2;
    } else if (profile.urgencyLevel === UrgencyLevel.HIGH) {
      priority *= 1.5;
    }

    // Segment multiplier
    if (profile.segment === VisitorSegment.EMERGENCY_COMMERCIAL) {
      priority *= 1.3;
    } else if (profile.segment === VisitorSegment.HIGH_VALUE_RESIDENTIAL) {
      priority *= 1.2;
    }

    // Service urgency weight
    priority *= service.urgencyWeight;

    return Math.min(100, priority);
  }

  private determineServiceUrgency(service: any, profile: VisitorProfile): UrgencyLevel {
    if (profile.urgencyLevel === UrgencyLevel.CRITICAL && service.emergencyService) {
      return UrgencyLevel.CRITICAL;
    }

    if (service.urgencyWeight > 0.8) {
      return UrgencyLevel.HIGH;
    }

    if (service.urgencyWeight > 0.5) {
      return UrgencyLevel.MEDIUM;
    }

    return UrgencyLevel.LOW;
  }

  private determineUrgencyFromBehavior(behavior: BehaviorData): UrgencyLevel {
    const urgencySignals = [
      behavior.interactions.filter(i => i.type === 'call').length > 0,
      behavior.scrollDepth > 0.7 && behavior.timeOnSite < 60,
      behavior.searchTerms?.some(t => t.includes('emergency')),
      behavior.entryPoint.includes('emergency')
    ].filter(Boolean).length;

    if (urgencySignals >= 3) return UrgencyLevel.CRITICAL;
    if (urgencySignals >= 2) return UrgencyLevel.HIGH;
    if (urgencySignals >= 1) return UrgencyLevel.MEDIUM;

    return UrgencyLevel.LOW;
  }

  private estimateValue(service: any, profile: VisitorProfile): number {
    let value = service.value;

    // Adjust based on segment
    if (profile.segment === VisitorSegment.COMMERCIAL_PROPERTY ||
        profile.segment === VisitorSegment.EMERGENCY_COMMERCIAL) {
      value *= 2.5;
    } else if (profile.segment === VisitorSegment.HIGH_VALUE_RESIDENTIAL) {
      value *= 1.5;
    }

    // Adjust based on location
    if (profile.location && !profile.location.isInServiceArea) {
      value *= 1.2; // Travel surcharge
    }

    return Math.round(value);
  }

  private generateCTA(service: any, profile: VisitorProfile): CallToAction {
    if (profile.urgencyLevel === UrgencyLevel.CRITICAL && service.emergencyService) {
      return this.generateEmergencyCTA(service);
    }

    if (profile.intent === VisitorIntent.QUOTE_REQUEST) {
      return {
        text: 'Get Instant Quote',
        action: '/quote',
        style: 'standard',
        placement: 'inline'
      };
    }

    if (profile.segment === VisitorSegment.COMMERCIAL_PROPERTY) {
      return {
        text: 'Commercial Solutions',
        action: `/${service.id}#commercial`,
        style: 'standard',
        placement: 'inline'
      };
    }

    return {
      text: `Learn About ${service.name}`,
      action: `/${service.id}`,
      style: 'soft',
      placement: 'inline'
    };
  }

  private generateEmergencyCTA(service: any): CallToAction {
    return {
      text: 'Call Emergency Hotline Now',
      action: 'tel:1300309361',
      style: 'emergency',
      placement: 'sticky'
    };
  }

  private selectPrimaryReason(reasons: string[], profile: VisitorProfile): string {
    // Prioritize reasons based on profile
    if (profile.urgencyLevel === UrgencyLevel.CRITICAL) {
      const emergencyReason = reasons.find(r => r.includes('emergency') || r.includes('immediate'));
      if (emergencyReason) return emergencyReason;
    }

    if (profile.intent === VisitorIntent.INSURANCE_CLAIM) {
      const insuranceReason = reasons.find(r => r.includes('insurance'));
      if (insuranceReason) return insuranceReason;
    }

    // Return most relevant or first reason
    return reasons[0] || 'Recommended for you';
  }

  private generateBehaviorReason(service: any, keywordMatches: number): string {
    if (keywordMatches >= 3) {
      return `Perfect match for your ${service.name.toLowerCase()} needs`;
    }

    if (keywordMatches >= 2) {
      return `Highly relevant based on your search`;
    }

    return `May help with your current situation`;
  }
}