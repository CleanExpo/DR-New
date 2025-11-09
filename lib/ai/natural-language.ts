/**
 * Natural Language Understanding
 * Extract user intent and entities from messages
 */

import { sanitizeForAI, getAIProviderConfig, getActiveProvider } from './config';
import { rateLimiter } from './rate-limiter';
import { aiMonitor } from './monitoring';

export type UserIntent =
  | 'emergency_request'
  | 'quote_request'
  | 'general_inquiry'
  | 'service_info'
  | 'location_info'
  | 'pricing_info'
  | 'insurance_claim'
  | 'complaint'
  | 'follow_up';

export interface EntityExtraction {
  location?: string;
  serviceType?: string;
  urgency?: 'high' | 'medium' | 'low';
  contactPreference?: 'phone' | 'email' | 'callback';
  timeframe?: string;
}

export interface IntentAnalysis {
  intent: UserIntent;
  confidence: number;
  entities: EntityExtraction;
  suggestedResponse: string;
}

/**
 * Analyze user intent from message
 */
export async function analyzeIntent(
  message: string,
  context?: { previousMessages?: string[] }
): Promise<IntentAnalysis> {
  const provider = getActiveProvider();

  if (provider === 'fallback') {
    return fallbackIntentAnalysis(message);
  }

  try {
    const sanitized = sanitizeForAI(message);
    // Implementation would call AI API here
    // For now, use fallback
    return fallbackIntentAnalysis(message);
  } catch (error) {
    console.error('[Intent Analysis] Error:', error);
    return fallbackIntentAnalysis(message);
  }
}

/**
 * Fallback intent analysis using pattern matching
 */
function fallbackIntentAnalysis(message: string): IntentAnalysis {
  const lower = message.toLowerCase();
  let intent: UserIntent = 'general_inquiry';
  let confidence = 0.7;
  const entities: EntityExtraction = {};

  // Intent detection
  if (
    lower.includes('emergency') ||
    lower.includes('urgent') ||
    lower.includes('flooding') ||
    lower.includes('burst pipe')
  ) {
    intent = 'emergency_request';
    confidence = 0.95;
    entities.urgency = 'high';
  } else if (
    lower.includes('quote') ||
    lower.includes('price') ||
    lower.includes('cost') ||
    lower.includes('how much')
  ) {
    intent = lower.includes('insurance')
      ? 'insurance_claim'
      : 'quote_request';
    confidence = 0.9;
  } else if (
    lower.includes('service') ||
    lower.includes('do you') ||
    lower.includes('can you')
  ) {
    intent = 'service_info';
    confidence = 0.85;
  } else if (
    lower.includes('insurance') ||
    lower.includes('claim')
  ) {
    intent = 'insurance_claim';
    confidence = 0.9;
  } else if (
    lower.includes('complaint') ||
    lower.includes('unhappy') ||
    lower.includes('problem with')
  ) {
    intent = 'complaint';
    confidence = 0.85;
  }

  // Entity extraction - Location
  const locations = [
    'brisbane',
    'ipswich',
    'logan',
    'hamilton',
    'ascot',
    'new farm',
    'toowong',
    'karalee',
    'brookwater',
    'springfield',
  ];
  for (const loc of locations) {
    if (lower.includes(loc)) {
      entities.location = loc;
      break;
    }
  }

  // Entity extraction - Service type
  if (lower.includes('water') || lower.includes('flood') || lower.includes('leak')) {
    entities.serviceType = 'water-damage';
  } else if (lower.includes('fire') || lower.includes('smoke')) {
    entities.serviceType = 'fire-damage';
  } else if (lower.includes('mould') || lower.includes('mold')) {
    entities.serviceType = 'mould';
  } else if (lower.includes('storm') || lower.includes('roof')) {
    entities.serviceType = 'storm-damage';
  }

  // Entity extraction - Contact preference
  if (lower.includes('call me') || lower.includes('phone')) {
    entities.contactPreference = 'callback';
  } else if (lower.includes('email')) {
    entities.contactPreference = 'email';
  }

  // Entity extraction - Timeframe
  if (lower.includes('today') || lower.includes('now')) {
    entities.timeframe = 'today';
  } else if (lower.includes('tomorrow')) {
    entities.timeframe = 'tomorrow';
  } else if (lower.includes('this week')) {
    entities.timeframe = 'this-week';
  }

  // Generate suggested response
  const suggestedResponse = generateSuggestedResponse(intent, entities);

  return {
    intent,
    confidence,
    entities,
    suggestedResponse,
  };
}

/**
 * Generate suggested response based on intent
 */
function generateSuggestedResponse(
  intent: UserIntent,
  entities: EntityExtraction
): string {
  switch (intent) {
    case 'emergency_request':
      return `I understand this is urgent. For immediate emergency assistance, please call us at 1300 309 361. We provide 24/7 emergency response${
        entities.location ? ` in ${entities.location}` : ' across Brisbane, Ipswich, and Logan'
      } with a 60-minute response time.`;

    case 'quote_request':
      return `I'd be happy to help you get a quote${
        entities.serviceType ? ` for ${entities.serviceType} restoration` : ''
      }. To provide an accurate quote, I'll need some details about the damage. Would you like to fill out our quote form or speak with one of our specialists?`;

    case 'insurance_claim':
      return `We work directly with all major insurance companies and can help streamline your claim process. We're approved contractors for AAMI, Suncorp, QBE, and many others. Would you like us to coordinate directly with your insurer?`;

    case 'service_info':
      return `We specialize in professional disaster recovery services including water damage restoration, fire damage restoration, mould remediation, and storm damage repair. Our lead technician, Phill McGurk, is an IICRC Master Restorer. What specific service are you interested in?`;

    case 'location_info':
      return `We provide professional restoration services across Brisbane, Ipswich, and Logan areas${
        entities.location ? `, including ${entities.location}` : ''
      }. We offer 24/7 emergency response with a 60-minute arrival time.`;

    case 'complaint':
      return `I'm sorry to hear you've had a negative experience. Your feedback is important to us. I'd like to connect you with our customer service manager to address your concerns directly. Can you provide more details about the issue?`;

    case 'follow_up':
      return `I'd be happy to help you follow up on your previous inquiry. Could you provide your reference number or the details of your original request?`;

    default:
      return `Thank you for contacting Disaster Recovery Brisbane. How can we assist you today? We specialize in emergency restoration services for water damage, fire damage, mould remediation, and storm damage across Brisbane, Ipswich, and Logan.`;
  }
}

/**
 * Extract specific entities from text
 */
export function extractEntities(text: string): EntityExtraction {
  const analysis = fallbackIntentAnalysis(text);
  return analysis.entities;
}

/**
 * Determine if message requires human escalation
 */
export function requiresHumanEscalation(analysis: IntentAnalysis): boolean {
  // Escalate emergencies
  if (analysis.intent === 'emergency_request') {
    return true;
  }

  // Escalate complaints
  if (analysis.intent === 'complaint') {
    return true;
  }

  // Escalate if low confidence
  if (analysis.confidence < 0.6) {
    return true;
  }

  // Escalate complex insurance claims
  if (
    analysis.intent === 'insurance_claim' &&
    analysis.entities.urgency === 'high'
  ) {
    return true;
  }

  return false;
}
