/**
 * Disaster Recovery Bot - TypeScript Implementation
 *
 * Serverless-compatible bot for Vercel deployment
 * Replaces Python bot with native TypeScript implementation
 *
 * Business: Phill McGurk - IICRC Master Restorer
 * Service Areas: Brisbane, Ipswich, Logan
 * Emergency Contact: 1300 309 361
 *
 * NOT FOR RESTOREASSIST - DISASTER RECOVERY & NRPG ONLY
 */

// ============================================================================
// TYPES & ENUMS
// ============================================================================

export enum ServiceType {
  WATER_DAMAGE = 'water_damage',
  FIRE_DAMAGE = 'fire_damage',
  MOULD_REMEDIATION = 'mould_remediation',
  STORM_DAMAGE = 'storm_damage',
  BIOHAZARD = 'biohazard',
  SEWAGE_CLEANUP = 'sewage_cleanup',
  TRAUMA_CLEANING = 'trauma_cleaning',
  COMMERCIAL = 'commercial',
  GENERAL_INQUIRY = 'general_inquiry'
}

export enum EmergencyLevel {
  CRITICAL = 10,    // Immediate response required
  URGENT = 7,       // Same day response required
  HIGH = 5,         // 24-48 hour response
  STANDARD = 3,     // Normal scheduling
  INQUIRY = 1       // Information only
}

export enum ServiceRegion {
  BRISBANE = 'Brisbane',
  IPSWICH = 'Ipswich',
  LOGAN = 'Logan',
  OUTSIDE_AREA = 'Outside Service Area'
}

export interface IntentClassification {
  serviceType: ServiceType;
  emergencyLevel: EmergencyLevel;
  confidence: number;
  keywordsMatched: string[];
  suggestedResponse: string;
}

export interface EmergencyRoute {
  routeTo: string;
  priority: string;
  responseTime: string;
  contactMethod: string;
  message: string;
  escalate: boolean;
}

export interface ServiceAreaValidation {
  isServiced: boolean;
  region: ServiceRegion;
  suburb: string | null;
  confidence: number;
  message: string;
  alternativeSuggestions: string[];
}

export interface BotResponse {
  response: string;
  classification: {
    service_type: string;
    emergency_level: string;
    confidence: number;
    keywords_matched: string[];
  };
  routing: {
    route_to: string;
    priority: string;
    response_time: string;
    escalate: boolean;
    contact_method: string;
  };
  area_validation?: {
    is_serviced: boolean;
    region: string;
    suburb: string;
  };
}

// ============================================================================
// INTENT CLASSIFIER
// ============================================================================

class IntentClassifier {
  private serviceKeywords: Record<ServiceType, string[]> = {
    [ServiceType.WATER_DAMAGE]: [
      'flood', 'flooding', 'water damage', 'burst pipe', 'leak', 'leaking',
      'wet', 'soaked', 'saturated', 'water through ceiling', 'water on floor',
      'rising water', 'water everywhere', 'wet carpet', 'wet walls'
    ],
    [ServiceType.FIRE_DAMAGE]: [
      'fire', 'smoke', 'smoke damage', 'fire damage', 'burnt', 'burning',
      'soot', 'ash', 'charred', 'flames', 'blaze', 'house fire', 'kitchen fire'
    ],
    [ServiceType.MOULD_REMEDIATION]: [
      'mould', 'mold', 'mildew', 'fungus', 'musty smell', 'black spots',
      'fuzzy growth', 'damp smell', 'moisture problem', 'condensation'
    ],
    [ServiceType.STORM_DAMAGE]: [
      'storm', 'storm damage', 'hail', 'wind damage', 'tree fell', 'roof damage',
      'debris', 'cyclone', 'severe weather', 'tornado', 'structural damage'
    ],
    [ServiceType.BIOHAZARD]: [
      'biohazard', 'bio hazard', 'contamination', 'bodily fluids', 'blood',
      'crime scene', 'death', 'hazardous materials', 'chemical spill'
    ],
    [ServiceType.SEWAGE_CLEANUP]: [
      'sewage', 'sewer', 'waste water', 'toilet overflow', 'septic',
      'contaminated water', 'brown water', 'foul smell', 'sewerage'
    ],
    [ServiceType.TRAUMA_CLEANING]: [
      'trauma', 'crime scene', 'death cleanup', 'suicide cleanup',
      'unattended death', 'trauma scene', 'biohazard cleanup'
    ],
    [ServiceType.COMMERCIAL]: [
      'commercial', 'business', 'office', 'warehouse', 'shop', 'store',
      'industrial', 'factory', 'restaurant', 'hotel', 'shopping centre'
    ],
    [ServiceType.GENERAL_INQUIRY]: [
      'quote', 'cost', 'price', 'how much', 'insurance', 'information',
      'do you service', 'what areas', 'business hours', 'contact'
    ]
  };

  private urgencyKeywords: Record<string, string[]> = {
    CRITICAL: [
      'emergency', 'urgent', 'now', 'immediately', 'help', 'asap',
      'flooding now', 'fire now', 'active', 'ongoing', 'getting worse',
      'spreading', 'can\'t stop', 'still flooding', 'right now'
    ],
    URGENT: [
      'today', 'same day', 'this morning', 'this afternoon', 'tonight',
      'happened today', 'just happened', 'recently', 'few hours ago'
    ],
    HIGH: [
      'soon', 'this week', 'couple days', 'few days', 'happened yesterday',
      'last night', 'weekend', 'need help', 'concerned'
    ],
    STANDARD: [
      'next week', 'when available', 'schedule', 'appointment', 'planning',
      'preventative', 'maintenance', 'assessment'
    ]
  };

  private aussieVariations: Record<string, string> = {
    'mold': 'mould',
    'color': 'colour',
    'odor': 'odour',
    'vapor': 'vapour',
    'center': 'centre'
  };

  classify(userInput: string): IntentClassification {
    const normalized = this.normalizeInput(userInput);

    // Detect service type
    const { serviceType, confidence: serviceConfidence, keywords: serviceKeywords } =
      this.detectServiceType(normalized);

    // Detect emergency level
    const { level: emergencyLevel, keywords: urgencyKeywords } =
      this.detectEmergencyLevel(normalized, serviceType);

    // Calculate overall confidence
    const confidence = this.calculateConfidence(serviceConfidence, serviceKeywords.length);

    // Generate response
    const suggestedResponse = this.generateResponse(serviceType, emergencyLevel);

    return {
      serviceType,
      emergencyLevel,
      confidence,
      keywordsMatched: [...serviceKeywords, ...urgencyKeywords],
      suggestedResponse
    };
  }

  private normalizeInput(text: string): string {
    let normalized = text.toLowerCase().trim();

    // Apply Australian spelling variations
    for (const [usSpelling, auSpelling] of Object.entries(this.aussieVariations)) {
      normalized = normalized.replace(new RegExp(usSpelling, 'g'), auSpelling);
    }

    return normalized;
  }

  private detectServiceType(text: string): {
    serviceType: ServiceType;
    confidence: number;
    keywords: string[]
  } {
    const matches: Record<ServiceType, string[]> = {} as any;

    // Initialize matches
    for (const serviceType of Object.values(ServiceType)) {
      matches[serviceType] = [];
    }

    // Find keyword matches for each service type
    for (const [serviceType, keywords] of Object.entries(this.serviceKeywords)) {
      for (const keyword of keywords) {
        if (text.includes(keyword)) {
          matches[serviceType as ServiceType].push(keyword);
        }
      }
    }

    // Find service type with most matches
    let bestMatch: ServiceType = ServiceType.GENERAL_INQUIRY;
    let maxMatches = 0;

    for (const [serviceType, matchedKeywords] of Object.entries(matches)) {
      if (matchedKeywords.length > maxMatches) {
        maxMatches = matchedKeywords.length;
        bestMatch = serviceType as ServiceType;
      }
    }

    const matchedKeywords = matches[bestMatch];

    // If no matches, default to general inquiry
    if (matchedKeywords.length === 0) {
      return { serviceType: ServiceType.GENERAL_INQUIRY, confidence: 0.5, keywords: [] };
    }

    // Calculate confidence based on number of matches
    const confidence = Math.min(1.0, matchedKeywords.length * 0.3 + 0.4);

    return { serviceType: bestMatch, confidence, keywords: matchedKeywords };
  }

  private detectEmergencyLevel(
    text: string,
    serviceType: ServiceType
  ): { level: EmergencyLevel; keywords: string[] } {
    const urgencyMatches: Record<string, string[]> = {
      CRITICAL: [],
      URGENT: [],
      HIGH: [],
      STANDARD: []
    };

    // Find urgency keyword matches
    for (const [level, keywords] of Object.entries(this.urgencyKeywords)) {
      for (const keyword of keywords) {
        if (text.includes(keyword)) {
          urgencyMatches[level].push(keyword);
        }
      }
    }

    // Find highest urgency level with matches
    if (urgencyMatches.CRITICAL.length > 0) {
      return { level: EmergencyLevel.CRITICAL, keywords: urgencyMatches.CRITICAL };
    }
    if (urgencyMatches.URGENT.length > 0) {
      return { level: EmergencyLevel.URGENT, keywords: urgencyMatches.URGENT };
    }
    if (urgencyMatches.HIGH.length > 0) {
      return { level: EmergencyLevel.HIGH, keywords: urgencyMatches.HIGH };
    }
    if (urgencyMatches.STANDARD.length > 0) {
      return { level: EmergencyLevel.STANDARD, keywords: urgencyMatches.STANDARD };
    }

    // Default based on service type
    if ([ServiceType.FIRE_DAMAGE, ServiceType.BIOHAZARD,
         ServiceType.SEWAGE_CLEANUP, ServiceType.TRAUMA_CLEANING].includes(serviceType)) {
      return { level: EmergencyLevel.URGENT, keywords: [] };
    } else if (serviceType === ServiceType.WATER_DAMAGE) {
      return { level: EmergencyLevel.HIGH, keywords: [] };
    } else {
      return { level: EmergencyLevel.STANDARD, keywords: [] };
    }
  }

  private calculateConfidence(serviceConfidence: number, keywordCount: number): number {
    let confidence = serviceConfidence;

    // Boost confidence for multiple keyword matches
    if (keywordCount >= 3) {
      confidence = Math.min(1.0, confidence + 0.2);
    } else if (keywordCount >= 2) {
      confidence = Math.min(1.0, confidence + 0.1);
    }

    return Math.round(confidence * 100) / 100;
  }

  private generateResponse(serviceType: ServiceType, emergencyLevel: EmergencyLevel): string {
    const serviceName = serviceType.replace(/_/g, ' ');

    if (emergencyLevel >= EmergencyLevel.URGENT) {
      return `I understand this is an emergency ${serviceName} situation. Let me connect you with our emergency response team immediately. Phill McGurk, our IICRC Master Restorer, has teams available 24/7. Please call 1300 309 361 for immediate assistance.`;
    } else {
      return `I can help you with ${serviceName}. Phill McGurk is one of a limited number of Master Restorers in Brisbane & QLD. Would you like to provide your location so I can confirm we service your area?`;
    }
  }
}

// ============================================================================
// EMERGENCY ROUTER
// ============================================================================

class EmergencyRouter {
  private emergencyContact = '1300 309 361';
  private businessName = 'Disaster Recovery Brisbane/Ipswich/Logan';
  private masterRestorer = 'Phill McGurk - IICRC Master Restorer';

  private responseTimes: Record<number, string> = {
    [EmergencyLevel.CRITICAL]: 'Immediate (within 60 minutes)',
    [EmergencyLevel.URGENT]: 'Same day (within 4 hours)',
    [EmergencyLevel.HIGH]: 'Within 24 hours',
    [EmergencyLevel.STANDARD]: 'Within 48 hours',
    [EmergencyLevel.INQUIRY]: 'Within 1 business day'
  };

  route(classification: IntentClassification, location?: string): EmergencyRoute {
    const escalate = this.shouldEscalate(classification.serviceType, classification.emergencyLevel);

    if (escalate) {
      return this.createEmergencyRoute(classification, location);
    } else {
      return this.createStandardRoute(classification, location);
    }
  }

  private shouldEscalate(serviceType: ServiceType, emergencyLevel: EmergencyLevel): boolean {
    // Always escalate critical emergencies
    if (emergencyLevel === EmergencyLevel.CRITICAL) {
      return true;
    }

    // Escalate urgent calls for high-risk services
    if (emergencyLevel === EmergencyLevel.URGENT) {
      const highRiskServices = [
        ServiceType.FIRE_DAMAGE,
        ServiceType.BIOHAZARD,
        ServiceType.SEWAGE_CLEANUP,
        ServiceType.TRAUMA_CLEANING
      ];
      if (highRiskServices.includes(serviceType)) {
        return true;
      }
    }

    // Escalate high priority water damage (time-sensitive)
    if (serviceType === ServiceType.WATER_DAMAGE && emergencyLevel >= 5) {
      return true;
    }

    return false;
  }

  private createEmergencyRoute(classification: IntentClassification, location?: string): EmergencyRoute {
    const locationMsg = location ? ` in ${location}` : '';
    const serviceName = classification.serviceType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    const message = `*** EMERGENCY: ${serviceName}${locationMsg} ***

IMMEDIATE ACTION REQUIRED:
Call our 24/7 emergency line: ${this.emergencyContact}

Our emergency response team will be dispatched immediately.

Why choose ${this.businessName}:
- ${this.masterRestorer}
- One of a limited number of Master Restorers in Brisbane & QLD
- 24/7 emergency response
- Professional damage assessments from $550
- Service areas: Brisbane, Ipswich, and Logan

Emergency Contact: ${this.emergencyContact}
(Available 24/7 - Call Now)`;

    return {
      routeTo: 'Emergency Response Team',
      priority: 'CRITICAL',
      responseTime: this.responseTimes[classification.emergencyLevel],
      contactMethod: `Phone: ${this.emergencyContact}`,
      message,
      escalate: true
    };
  }

  private createStandardRoute(classification: IntentClassification, location?: string): EmergencyRoute {
    const locationMsg = location ? ` in ${location}` : '';
    const serviceName = classification.serviceType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    const message = `Thank you for contacting ${this.businessName}.

Service: ${serviceName}${locationMsg}

${this.masterRestorer} provides professional restoration services across:
- Brisbane (Hamilton, Ascot, New Farm, and surrounding suburbs)
- Ipswich (Karalee, Brookwater, Springfield Lakes, and surrounding areas)
- Logan (Springwood, Shailer Park, Daisy Hill, and surrounding suburbs)

Our Credentials:
- IICRC Master Restorer (one of a limited number in Brisbane & QLD)

Next Steps:
1. Call ${this.emergencyContact} for immediate quote
2. Provide property location and damage details
3. We'll schedule an assessment at your convenience

Contact: ${this.emergencyContact}
Hours: 24/7 Emergency Service Available`;

    return {
      routeTo: 'Customer Service',
      priority: 'STANDARD',
      responseTime: this.responseTimes[classification.emergencyLevel],
      contactMethod: `Phone: ${this.emergencyContact} or online form`,
      message,
      escalate: false
    };
  }
}

// ============================================================================
// SERVICE AREA VALIDATOR
// ============================================================================

class ServiceAreaValidator {
  private brisbaneSuburbs = {
    premium: [
      'hamilton', 'ascot', 'new farm', 'bulimba', 'hawthorne',
      'teneriffe', 'fortitude valley', 'newstead'
    ],
    standard: [
      'morningside', 'balmoral', 'cannon hill', 'murarrie', 'tingalpa',
      'wynnum', 'carina', 'camp hill', 'seven hills', 'norman park',
      'woolloongabba', 'greenslopes', 'stones corner', 'coorparoo',
      'east brisbane', 'kangaroo point', 'south brisbane', 'west end',
      'highgate hill', 'annerley', 'fairfield', 'dutton park',
      'brisbane city', 'spring hill', 'paddington', 'red hill',
      'milton', 'auchenflower', 'toowong', 'taringa', 'indooroopilly'
    ]
  };

  private ipswichSuburbs = {
    premium: [
      'karalee', 'brookwater', 'springfield lakes', 'augustine heights'
    ],
    standard: [
      'bellbird park', 'redbank plains', 'goodna', 'camira',
      'booval', 'bundamba', 'raceview', 'forest lake', 'springfield',
      'ipswich', 'eastern heights', 'leichhardt', 'north ipswich',
      'west ipswich', 'yamanto', 'ripley', 'deebing heights'
    ]
  };

  private loganSuburbs = {
    premium: [
      'springwood', 'shailer park', 'daisy hill', 'rochedale'
    ],
    standard: [
      'underwood', 'eight mile plains', 'slacks creek', 'meadowbrook',
      'loganholme', 'tanah merah', 'waterford', 'beenleigh', 'eagleby',
      'logan central', 'woodridge', 'kingston', 'logan reserve',
      'browns plains', 'park ridge', 'greenbank', 'forestdale'
    ]
  };

  private nearbyAreas = [
    'gold coast', 'sunshine coast', 'redlands', 'redland bay',
    'cleveland', 'victoria point', 'capalaba', 'pine rivers',
    'north lakes', 'strathpine', 'caboolture'
  ];

  validate(locationInput: string): ServiceAreaValidation {
    const normalized = this.normalizeLocation(locationInput);

    // Check each region
    const brisbaneResult = this.checkRegion(normalized, ServiceRegion.BRISBANE);
    if (brisbaneResult) return brisbaneResult;

    const ipswichResult = this.checkRegion(normalized, ServiceRegion.IPSWICH);
    if (ipswichResult) return ipswichResult;

    const loganResult = this.checkRegion(normalized, ServiceRegion.LOGAN);
    if (loganResult) return loganResult;

    // Check if nearby area
    if (this.nearbyAreas.some(area => normalized.includes(area))) {
      return this.createNearbyValidation(normalized);
    }

    // Not in service area
    return this.createOutsideAreaValidation(normalized);
  }

  private normalizeLocation(location: string): string {
    let normalized = location.toLowerCase().trim();

    // Remove common words
    const removeWords = ['suburb', 'area', 'near', 'around', 'close to', 'in'];
    for (const word of removeWords) {
      normalized = normalized.replace(word, '');
    }

    // Clean up spaces
    normalized = normalized.split(/\s+/).join(' ').trim();

    return normalized;
  }

  private checkRegion(location: string, region: ServiceRegion): ServiceAreaValidation | null {
    const suburbs = this.getRegionSuburbs(region);

    // Check premium suburbs
    for (const suburb of suburbs.premium) {
      if (location.includes(suburb) || suburb.includes(location)) {
        return {
          isServiced: true,
          region,
          suburb: this.toTitleCase(suburb),
          confidence: 0.95,
          message: this.createServicedMessage(region, suburb, true),
          alternativeSuggestions: []
        };
      }
    }

    // Check standard suburbs
    for (const suburb of suburbs.standard) {
      if (location.includes(suburb) || suburb.includes(location)) {
        return {
          isServiced: true,
          region,
          suburb: this.toTitleCase(suburb),
          confidence: 0.90,
          message: this.createServicedMessage(region, suburb, false),
          alternativeSuggestions: []
        };
      }
    }

    // Check if region name mentioned without specific suburb
    if (location.includes(region.toLowerCase())) {
      return {
        isServiced: true,
        region,
        suburb: null,
        confidence: 0.75,
        message: `YES - We service the ${region} area\n\nCould you please specify which suburb in ${region}?\n\nCall: 1300 309 361`,
        alternativeSuggestions: []
      };
    }

    return null;
  }

  private getRegionSuburbs(region: ServiceRegion): { premium: string[]; standard: string[] } {
    switch (region) {
      case ServiceRegion.BRISBANE:
        return this.brisbaneSuburbs;
      case ServiceRegion.IPSWICH:
        return this.ipswichSuburbs;
      case ServiceRegion.LOGAN:
        return this.loganSuburbs;
      default:
        return { premium: [], standard: [] };
    }
  }

  private createServicedMessage(region: ServiceRegion, suburb: string, premium: boolean): string {
    const suburbTitle = this.toTitleCase(suburb);

    if (premium) {
      return `YES - We service ${suburbTitle}, ${region}

${suburbTitle} is in our priority service area. Phill McGurk, one of a limited number of Master Restorers in Brisbane & QLD, provides comprehensive disaster recovery services to your area.

24/7 Emergency Response Available
Call: 1300 309 361`;
    } else {
      return `YES - We service ${suburbTitle}, ${region}

Phill McGurk provides professional disaster recovery services to ${suburbTitle} and surrounding ${region} suburbs.

Our team responds 24/7 to emergencies across the greater ${region} region.

Call: 1300 309 361`;
    }
  }

  private createNearbyValidation(location: string): ServiceAreaValidation {
    return {
      isServiced: false,
      region: ServiceRegion.OUTSIDE_AREA,
      suburb: this.toTitleCase(location),
      confidence: 0.60,
      message: `Your location (${this.toTitleCase(location)}) is outside our primary service areas of Brisbane, Ipswich, and Logan.

However, we may be able to assist depending on emergency severity and property type.

Please call us to discuss: 1300 309 361`,
      alternativeSuggestions: [
        'Contact us to discuss your specific situation',
        'We can recommend trusted contractors in your area'
      ]
    };
  }

  private createOutsideAreaValidation(location: string): ServiceAreaValidation {
    return {
      isServiced: false,
      region: ServiceRegion.OUTSIDE_AREA,
      suburb: this.toTitleCase(location),
      confidence: 0.50,
      message: `Unfortunately, ${this.toTitleCase(location)} is outside our current service areas.

We service:
- Brisbane (Hamilton, Ascot, New Farm, and surrounding suburbs)
- Ipswich (Karalee, Brookwater, Springfield Lakes, and surrounding areas)
- Logan (Springwood, Shailer Park, Daisy Hill, and surrounding suburbs)

Call us for referrals: 1300 309 361`,
      alternativeSuggestions: [
        'Ask for a referral to a local IICRC certified professional'
      ]
    };
  }

  private toTitleCase(str: string): string {
    return str.replace(/\b\w/g, l => l.toUpperCase());
  }
}

// ============================================================================
// MAIN BOT CLASS
// ============================================================================

export class DisasterRecoveryBot {
  private classifier: IntentClassifier;
  private router: EmergencyRouter;
  private validator: ServiceAreaValidator;

  constructor() {
    this.classifier = new IntentClassifier();
    this.router = new EmergencyRouter();
    this.validator = new ServiceAreaValidator();
  }

  async processMessage(message: string, location?: string): Promise<BotResponse> {
    // Classify intent
    const classification = this.classifier.classify(message);

    // Route based on classification
    const routing = this.router.route(classification, location);

    // Validate service area if location provided
    let areaValidation: ServiceAreaValidation | undefined;
    if (location) {
      areaValidation = this.validator.validate(location);
    }

    // Build response
    const response: BotResponse = {
      response: routing.message,
      classification: {
        service_type: classification.serviceType,
        emergency_level: EmergencyLevel[classification.emergencyLevel],
        confidence: classification.confidence,
        keywords_matched: classification.keywordsMatched
      },
      routing: {
        route_to: routing.routeTo,
        priority: routing.priority,
        response_time: routing.responseTime,
        escalate: routing.escalate,
        contact_method: routing.contactMethod
      }
    };

    // Add area validation if available
    if (areaValidation) {
      response.area_validation = {
        is_serviced: areaValidation.isServiced,
        region: areaValidation.region,
        suburb: areaValidation.suburb || ''
      };

      // Prepend area validation message if outside service area
      if (!areaValidation.isServiced) {
        response.response = areaValidation.message + '\n\n' + response.response;
      }
    }

    return response;
  }
}
