// Emergency Detection and Response System
import { VisitorProfile, UrgencyLevel, VisitorIntent } from './types';

export class EmergencyDetector {
  private emergencyKeywords = [
    // Water emergencies
    'flood', 'flooding', 'burst pipe', 'water leak', 'water damage',
    'overflowing', 'submerged', 'soaked', 'water everywhere',

    // Fire emergencies
    'fire', 'smoke', 'burning', 'burnt', 'fire damage', 'smoke damage',
    'ash', 'soot', 'charred',

    // Sewage emergencies
    'sewage', 'sewage backup', 'toilet overflow', 'waste', 'contamination',
    'septic', 'black water',

    // Storm emergencies
    'storm damage', 'cyclone', 'hurricane', 'tornado', 'hail damage',
    'wind damage', 'tree fell', 'roof damage',

    // Biohazard emergencies
    'biohazard', 'trauma', 'crime scene', 'accident', 'blood',
    'hazardous', 'contaminated',

    // Urgent terms
    'emergency', 'urgent', 'immediately', 'right now', 'asap',
    'help', 'crisis', 'disaster', '24 hour', 'after hours',
    'cant wait', 'need help now'
  ];

  private emergencyPatterns = [
    /help.{0,10}(now|immediately|urgent|asap)/i,
    /need.{0,10}(help|someone|service).{0,10}(now|immediately|urgent)/i,
    /emergency.{0,10}(service|help|response)/i,
    /(water|flood|fire|smoke|sewage).{0,10}everywhere/i,
    /(house|home|property|building).{0,10}(flooded|damaged|destroyed)/i,
    /cant.{0,10}(wait|delay|postpone)/i,
    /(serious|severe|major|extensive).{0,10}damage/i,
    /insurance.{0,10}(claim|emergency|urgent)/i
  ];

  async detectEmergency(profile: VisitorProfile): Promise<boolean> {
    const signals: EmergencySignal[] = [];

    // Check multiple emergency indicators
    signals.push(this.checkIntentSignal(profile));
    signals.push(this.checkBehaviorSignal(profile));
    signals.push(this.checkTimeSignal(profile));
    signals.push(this.checkWeatherSignal(profile));
    signals.push(this.checkLocationSignal(profile));
    signals.push(this.checkSearchSignal(profile));
    signals.push(this.checkReferrerSignal(profile));
    signals.push(this.checkDeviceSignal(profile));

    // Calculate emergency score
    const emergencyScore = this.calculateEmergencyScore(signals);

    // Determine if emergency based on score and signals
    return this.isEmergency(emergencyScore, signals);
  }

  private checkIntentSignal(profile: VisitorProfile): EmergencySignal {
    const isEmergency = profile.intent === VisitorIntent.EMERGENCY;

    return {
      type: 'intent',
      detected: isEmergency,
      confidence: isEmergency ? 0.9 : 0.1,
      reason: isEmergency ? 'Emergency intent detected' : 'Non-emergency intent'
    };
  }

  private checkBehaviorSignal(profile: VisitorProfile): EmergencySignal {
    if (!profile.behavior) {
      return {
        type: 'behavior',
        detected: false,
        confidence: 0,
        reason: 'No behavior data available'
      };
    }

    const urgentBehaviors = [
      profile.behavior.timeOnSite < 30 && profile.behavior.scrollDepth > 0.5,
      profile.behavior.interactions.some(i => i.type === 'call'),
      profile.behavior.bounceRisk < 0.3,
      profile.behavior.searchTerms?.some(term =>
        this.emergencyKeywords.includes(term.toLowerCase())
      )
    ];

    const urgentCount = urgentBehaviors.filter(Boolean).length;
    const confidence = urgentCount / urgentBehaviors.length;

    return {
      type: 'behavior',
      detected: confidence > 0.5,
      confidence,
      reason: `${urgentCount} urgent behavior signals detected`
    };
  }

  private checkTimeSignal(profile: VisitorProfile): EmergencySignal {
    const now = new Date();
    const hour = now.getHours();
    const dayOfWeek = now.getDay();

    // After hours (before 7am or after 8pm)
    const isAfterHours = hour < 7 || hour >= 20;

    // Weekend
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // Late night (11pm - 5am) - highest urgency
    const isLateNight = hour >= 23 || hour < 5;

    let confidence = 0;
    let reason = 'Normal business hours';

    if (isLateNight) {
      confidence = 0.8;
      reason = 'Late night visit indicates emergency';
    } else if (isAfterHours && isWeekend) {
      confidence = 0.7;
      reason = 'Weekend after-hours visit';
    } else if (isAfterHours) {
      confidence = 0.6;
      reason = 'After-hours visit';
    } else if (isWeekend) {
      confidence = 0.4;
      reason = 'Weekend visit';
    }

    return {
      type: 'time',
      detected: confidence > 0.5,
      confidence,
      reason
    };
  }

  private checkWeatherSignal(profile: VisitorProfile): EmergencySignal {
    if (!profile.weatherContext) {
      return {
        type: 'weather',
        detected: false,
        confidence: 0,
        reason: 'No weather data available'
      };
    }

    const { condition, severity, alerts, recentEvents } = profile.weatherContext;

    // Active severe weather
    const hasSevereWeather = severity === 'high' || severity === 'extreme';
    const hasWeatherAlerts = alerts.length > 0;
    const hasRecentEvents = recentEvents.filter(e =>
      (Date.now() - e.date) < 86400000 // Within 24 hours
    ).length > 0;

    let confidence = 0;

    if (severity === 'extreme') confidence = 0.9;
    else if (severity === 'high') confidence = 0.7;
    else if (hasWeatherAlerts) confidence = 0.6;
    else if (hasRecentEvents) confidence = 0.5;
    else if (condition !== 'normal') confidence = 0.3;

    return {
      type: 'weather',
      detected: confidence > 0.5,
      confidence,
      reason: hasSevereWeather ? 'Severe weather conditions' :
              hasWeatherAlerts ? 'Weather alerts active' :
              hasRecentEvents ? 'Recent weather events' :
              'Normal weather conditions'
    };
  }

  private checkLocationSignal(profile: VisitorProfile): EmergencySignal {
    if (!profile.location) {
      return {
        type: 'location',
        detected: false,
        confidence: 0,
        reason: 'No location data available'
      };
    }

    // Check if visitor is far from service area (desperation)
    const isRemote = !profile.location.isInServiceArea;
    const isFar = profile.location?.distanceToService ? profile.location.distanceToService > 50 : false;

    let confidence = 0;
    let reason = 'Within service area';

    if (isRemote && isFar) {
      confidence = 0.6;
      reason = 'Remote location suggests desperation';
    } else if (isFar) {
      confidence = 0.4;
      reason = 'Far from service center';
    }

    return {
      type: 'location',
      detected: confidence > 0.5,
      confidence,
      reason
    };
  }

  private checkSearchSignal(profile: VisitorProfile): EmergencySignal {
    const searchTerms = profile.behavior?.searchTerms || [];
    const entryUrl = profile.behavior?.entryPoint || '';

    const allTerms = [...searchTerms, entryUrl].join(' ').toLowerCase();

    // Check for emergency keywords
    const keywordMatches = this.emergencyKeywords.filter(keyword =>
      allTerms.includes(keyword)
    ).length;

    // Check for emergency patterns
    const patternMatches = this.emergencyPatterns.filter(pattern =>
      pattern.test(allTerms)
    ).length;

    const totalPossible = this.emergencyKeywords.length + this.emergencyPatterns.length;
    const totalMatches = keywordMatches + patternMatches;

    const confidence = Math.min(1, totalMatches / 10); // Cap at 10 matches

    return {
      type: 'search',
      detected: confidence > 0.3,
      confidence,
      reason: totalMatches > 0 ?
        `${totalMatches} emergency keywords/patterns found` :
        'No emergency keywords found'
    };
  }

  private checkReferrerSignal(profile: VisitorProfile): EmergencySignal {
    const referrer = profile.behavior?.referrer || '';

    // Emergency referrer sources
    const emergencySources = [
      'emergency.gov.au',
      'ses.qld.gov.au',
      'disaster.qld.gov.au',
      'bom.gov.au/warnings',
      'facebook.com/groups', // Community emergency groups
      'reddit.com/r/brisbane' // Local emergency discussions
    ];

    const isEmergencyReferrer = emergencySources.some(source =>
      referrer.includes(source)
    );

    // Insurance company referrers
    const insuranceReferrers = [
      'suncorp.com.au',
      'nrma.com.au',
      'allianz.com.au',
      'qbe.com',
      'racq.com.au'
    ];

    const isInsuranceReferrer = insuranceReferrers.some(source =>
      referrer.includes(source)
    );

    let confidence = 0;
    let reason = 'Normal referrer source';

    if (isEmergencyReferrer) {
      confidence = 0.8;
      reason = 'Referred from emergency service';
    } else if (isInsuranceReferrer) {
      confidence = 0.7;
      reason = 'Referred from insurance company';
    } else if (referrer === '') {
      confidence = 0.3;
      reason = 'Direct visit (possible bookmark/saved number)';
    }

    return {
      type: 'referrer',
      detected: confidence > 0.5,
      confidence,
      reason
    };
  }

  private checkDeviceSignal(profile: VisitorProfile): EmergencySignal {
    if (!profile.device) {
      return {
        type: 'device',
        detected: false,
        confidence: 0,
        reason: 'No device data available'
      };
    }

    // Mobile devices often used in emergencies
    const isMobile = profile.device.type === 'mobile';
    const hasSlowConnection = profile.device.connection === 'slow';

    let confidence = 0;
    let reason = 'Desktop device';

    if (isMobile && hasSlowConnection) {
      confidence = 0.6;
      reason = 'Mobile with poor connection (possible emergency location)';
    } else if (isMobile) {
      confidence = 0.4;
      reason = 'Mobile device (often used in emergencies)';
    }

    return {
      type: 'device',
      detected: confidence > 0.5,
      confidence,
      reason
    };
  }

  private calculateEmergencyScore(signals: EmergencySignal[]): number {
    // Weight different signal types
    const weights: Record<string, number> = {
      intent: 2.0,
      behavior: 1.5,
      search: 1.5,
      weather: 1.3,
      time: 1.2,
      referrer: 1.1,
      location: 1.0,
      device: 0.8
    };

    let totalScore = 0;
    let totalWeight = 0;

    signals.forEach(signal => {
      const weight = weights[signal.type] || 1.0;
      totalScore += signal.confidence * weight;
      totalWeight += weight;
    });

    return totalWeight > 0 ? totalScore / totalWeight : 0;
  }

  private isEmergency(score: number, signals: EmergencySignal[]): boolean {
    // High confidence threshold
    if (score > 0.7) return true;

    // Multiple strong signals
    const strongSignals = signals.filter(s => s.confidence > 0.7).length;
    if (strongSignals >= 2) return true;

    // Specific critical combinations
    const hasEmergencyIntent = signals.find(s => s.type === 'intent')?.detected;
    const hasEmergencySearch = signals.find(s => s.type === 'search')?.detected;
    const hasSevereWeather = (signals.find(s => s.type === 'weather')?.confidence ?? 0) > 0.7;
    const isLateNight = (signals.find(s => s.type === 'time')?.confidence ?? 0) > 0.7;

    if (hasEmergencyIntent && (hasEmergencySearch || hasSevereWeather || isLateNight)) {
      return true;
    }

    // Medium confidence with supporting signals
    if (score > 0.5) {
      const supportingSignals = signals.filter(s => s.detected).length;
      return supportingSignals >= 4;
    }

    return false;
  }

  // Get emergency response recommendations
  getEmergencyResponse(profile: VisitorProfile): EmergencyResponse {
    const isEmergency = profile.urgencyLevel === UrgencyLevel.CRITICAL;

    if (!isEmergency) {
      return {
        showEmergencyBanner: false,
        redirectToEmergency: false,
        autoShowChat: false,
        priorityCallRouting: false,
        message: '',
        actions: []
      };
    }

    const response: EmergencyResponse = {
      showEmergencyBanner: true,
      redirectToEmergency: false,
      autoShowChat: true,
      priorityCallRouting: true,
      message: this.getEmergencyMessage(profile),
      actions: this.getEmergencyActions(profile)
    };

    // Extreme cases warrant immediate redirect
    if (profile.weatherContext?.severity === 'extreme') {
      response.redirectToEmergency = true;
    }

    return response;
  }

  private getEmergencyMessage(profile: VisitorProfile): string {
    if (profile.weatherContext?.severity === 'extreme') {
      return '⚠️ EXTREME WEATHER EMERGENCY - Immediate Response Available';
    }

    if (profile.weatherContext?.alerts && profile.weatherContext.alerts.length > 0) {
      return `⚠️ ${profile.weatherContext.alerts[0].type} - Emergency Team Standing By`;
    }

    const hour = new Date().getHours();
    if (hour >= 23 || hour < 5) {
      return '🚨 24/7 Emergency Response - We\'re Here to Help';
    }

    return '🚨 Emergency Response Team Ready - Call Now for Immediate Help';
  }

  private getEmergencyActions(profile: VisitorProfile): EmergencyAction[] {
    const actions: EmergencyAction[] = [
      {
        type: 'call',
        label: 'Call Emergency Hotline',
        action: 'tel:1300309361',
        priority: 1,
        style: 'emergency'
      }
    ];

    if (profile.device?.type === 'desktop') {
      actions.push({
        type: 'chat',
        label: 'Start Emergency Chat',
        action: 'openChat',
        priority: 2,
        style: 'urgent'
      });
    }

    if (profile.location?.isInServiceArea) {
      actions.push({
        type: 'form',
        label: 'Request Immediate Callback',
        action: 'emergencyCallback',
        priority: 3,
        style: 'urgent'
      });
    }

    return actions;
  }
}

interface EmergencySignal {
  type: 'intent' | 'behavior' | 'time' | 'weather' | 'location' | 'search' | 'referrer' | 'device';
  detected: boolean;
  confidence: number;
  reason: string;
}

interface EmergencyResponse {
  showEmergencyBanner: boolean;
  redirectToEmergency: boolean;
  autoShowChat: boolean;
  priorityCallRouting: boolean;
  message: string;
  actions: EmergencyAction[];
}

interface EmergencyAction {
  type: 'call' | 'chat' | 'form';
  label: string;
  action: string;
  priority: number;
  style: 'emergency' | 'urgent' | 'standard';
}