/**
 * AI Response Generator
 * Generate contextual, helpful responses to user inquiries
 */

import { sanitizeForAI, getAIProviderConfig, getActiveProvider } from './config';
import { IntentAnalysis } from './natural-language';
import { aiMonitor } from './monitoring';

export interface ResponseContext {
  userMessage: string;
  intentAnalysis: IntentAnalysis;
  conversationHistory?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  userInfo?: {
    location?: string;
    previousEnquiries?: number;
  };
}

export interface GeneratedResponse {
  message: string;
  suggestedActions?: Array<{
    label: string;
    action: 'call' | 'form' | 'link';
    value: string;
  }>;
  escalateToHuman: boolean;
}

/**
 * Knowledge base for disaster recovery
 */
const KNOWLEDGE_BASE = {
  services: {
    'water-damage': {
      description:
        'Professional water damage restoration using advanced drying equipment and IICRC-certified techniques',
      responseTime: '60 minutes for emergencies',
      process: [
        'Emergency response and water extraction',
        'Moisture detection and assessment',
        'Industrial drying and dehumidification',
        'Antimicrobial treatment',
        'Restoration and repair',
      ],
    },
    'fire-damage': {
      description:
        'Comprehensive fire and smoke damage restoration with odor removal and structural repair',
      responseTime: 'Same day emergency response',
      process: [
        'Site assessment and safety inspection',
        'Smoke and soot removal',
        'Odor neutralization using thermal fogging',
        'Content cleaning and restoration',
        'Structural repairs',
      ],
    },
    mould: {
      description:
        'Professional mould remediation with containment, removal, and prevention',
      responseTime: '24-48 hours',
      process: [
        'Mould inspection and testing',
        'Containment of affected areas',
        'HEPA air filtration',
        'Mould removal and cleaning',
        'Prevention and moisture control',
      ],
    },
    'storm-damage': {
      description:
        'Emergency storm damage repair including roof tarping, water extraction, and structural stabilization',
      responseTime: '60 minutes for emergencies',
      process: [
        'Emergency board-up and tarping',
        'Water extraction',
        'Structural assessment',
        'Debris removal',
        'Restoration and repair',
      ],
    },
  },
  company: {
    name: 'Disaster Recovery Brisbane',
    phone: '1300 309 361',
    email: 'admin@disasterrecovery.com.au',
    serviceAreas: ['Brisbane', 'Ipswich', 'Logan'],
    certifications: ['IICRC Master Restorer (Phill McGurk)'],
    availability: '24/7 Emergency Response',
    responseTime: '60 minutes',
    insurance: 'Approved contractors for all major insurers',
  },
  faqs: {
    cost: 'Costs vary based on damage extent. We provide free assessments and work directly with insurance companies. Most residential jobs are covered by insurance.',
    insurance:
      'Yes, we work with all major insurance companies including AAMI, Suncorp, QBE, Allianz, and more. We can handle the entire claims process.',
    response:
      'We guarantee 60-minute emergency response time across Brisbane, Ipswich, and Logan areas, 24/7.',
    certification:
      'Our lead technician, Phill McGurk, is an IICRC Master Restorer - one of the few in Queensland. All technicians are IICRC certified.',
  },
};

/**
 * Generate response to user message
 */
export async function generateResponse(
  context: ResponseContext
): Promise<GeneratedResponse> {
  const provider = getActiveProvider();

  if (provider === 'fallback') {
    return generateFallbackResponse(context);
  }

  try {
    // For now, use fallback with knowledge base
    // AI integration would go here
    return generateFallbackResponse(context);
  } catch (error) {
    console.error('[Response Generator] Error:', error);
    return generateFallbackResponse(context);
  }
}

/**
 * Generate response using knowledge base (no AI required)
 */
function generateFallbackResponse(
  context: ResponseContext
): GeneratedResponse {
  const { intentAnalysis, userInfo } = context;
  const { intent, entities } = intentAnalysis;

  let message = '';
  const suggestedActions: Array<{
    label: string;
    action: 'call' | 'form' | 'link';
    value: string;
  }> = [];
  let escalateToHuman = false;

  switch (intent) {
    case 'emergency_request':
      escalateToHuman = true;
      message = `This is an emergency situation requiring immediate attention.\n\n**CALL NOW: ${KNOWLEDGE_BASE.company.phone}**\n\nWe provide 24/7 emergency response${
        entities.location
          ? ` in ${entities.location}`
          : ' across Brisbane, Ipswich, and Logan'
      } with a guaranteed 60-minute arrival time.\n\n`;

      if (entities.serviceType) {
        const service = KNOWLEDGE_BASE.services[entities.serviceType as keyof typeof KNOWLEDGE_BASE.services];
        if (service) {
          message += `Our ${entities.serviceType} restoration process includes:\n${service.process
            .map((step, i) => `${i + 1}. ${step}`)
            .join('\n')}`;
        }
      }

      suggestedActions.push({
        label: 'Call Emergency Line',
        action: 'call',
        value: '1300309361',
      });
      break;

    case 'quote_request':
      message = `I'd be happy to help you get a quote${
        entities.serviceType
          ? ` for ${entities.serviceType.replace('-', ' ')} restoration`
          : ''
      }.\n\n`;

      if (entities.serviceType) {
        const service = KNOWLEDGE_BASE.services[entities.serviceType as keyof typeof KNOWLEDGE_BASE.services];
        if (service) {
          message += `**${entities.serviceType.replace('-', ' ')} Service:**\n${
            service.description
          }\n\n`;
        }
      }

      message += `**Cost Information:**\n${KNOWLEDGE_BASE.faqs.cost}\n\n`;
      message += `For an accurate quote, we'll need to assess the damage. Would you like to:\n`;
      message += `- Schedule a free on-site assessment\n`;
      message += `- Provide photos for a preliminary estimate\n`;
      message += `- Speak directly with our estimator`;

      suggestedActions.push(
        {
          label: 'Request Quote',
          action: 'form',
          value: '/quote-request',
        },
        {
          label: 'Call for Quote',
          action: 'call',
          value: '1300309361',
        }
      );
      break;

    case 'insurance_claim':
      message = `**Insurance Claim Assistance**\n\n${KNOWLEDGE_BASE.faqs.insurance}\n\n`;
      message += `Our process:\n`;
      message += `1. We assess the damage and document everything\n`;
      message += `2. We contact your insurer directly (with your permission)\n`;
      message += `3. We handle all paperwork and communication\n`;
      message += `4. We begin restoration once approved\n\n`;
      message += `Which insurance company are you with? We work with AAMI, Suncorp, QBE, Allianz, and many others.`;

      suggestedActions.push(
        {
          label: 'Insurance Info',
          action: 'link',
          value: '/insurance',
        },
        {
          label: 'Start Claim',
          action: 'form',
          value: '/insurance-claim',
        }
      );
      break;

    case 'service_info':
      if (entities.serviceType) {
        const service = KNOWLEDGE_BASE.services[entities.serviceType as keyof typeof KNOWLEDGE_BASE.services];
        if (service) {
          message = `**${entities.serviceType
            .replace('-', ' ')
            .toUpperCase()} RESTORATION**\n\n`;
          message += `${service.description}\n\n`;
          message += `**Response Time:** ${service.responseTime}\n\n`;
          message += `**Our Process:**\n${service.process
            .map((step, i) => `${i + 1}. ${step}`)
            .join('\n')}\n\n`;
          message += `**Certification:** ${KNOWLEDGE_BASE.company.certifications[0]}`;

          suggestedActions.push(
            {
              label: 'Learn More',
              action: 'link',
              value: `/services/${entities.serviceType}`,
            },
            {
              label: 'Get Quote',
              action: 'form',
              value: '/quote-request',
            }
          );
        }
      } else {
        message = `**Our Services:**\n\n`;
        message += `We specialize in professional disaster recovery:\n\n`;
        Object.entries(KNOWLEDGE_BASE.services).forEach(([key, service]) => {
          message += `**${key
            .replace('-', ' ')
            .toUpperCase()}**\n${service.description}\n\n`;
        });
        message += `All services backed by IICRC Master Restorer certification.`;
      }
      break;

    case 'location_info':
      message = `**Service Areas**\n\n`;
      message += `We provide professional disaster recovery services across:\n`;
      message += `- Brisbane (all suburbs)\n`;
      message += `- Ipswich\n`;
      message += `- Logan\n\n`;

      if (entities.location) {
        message += `Yes, we service ${entities.location}! `;
      }

      message += `**Emergency Response:** ${KNOWLEDGE_BASE.company.responseTime} arrival time, 24/7\n\n`;
      message += `High net-worth residential specialists in Hamilton, Ascot, New Farm, Toowong, Karalee, Brookwater, and Springfield Lakes.`;
      break;

    case 'complaint':
      escalateToHuman = true;
      message = `I sincerely apologize for any issues you've experienced. Your satisfaction is our top priority.\n\n`;
      message += `I'd like to connect you with our management team immediately to address your concerns.\n\n`;
      message += `Please call ${KNOWLEDGE_BASE.company.phone} and ask for the customer service manager, or provide your contact details and we'll call you within the hour.`;

      suggestedActions.push({
        label: 'Speak to Manager',
        action: 'call',
        value: '1300309361',
      });
      break;

    default:
      message = `Thank you for contacting ${KNOWLEDGE_BASE.company.name}.\n\n`;
      message += `We specialize in:\n`;
      message += `- Water Damage Restoration\n`;
      message += `- Fire Damage Restoration\n`;
      message += `- Mould Remediation\n`;
      message += `- Storm Damage Repair\n\n`;
      message += `**Available:** ${KNOWLEDGE_BASE.company.availability}\n`;
      message += `**Response Time:** ${KNOWLEDGE_BASE.company.responseTime}\n`;
      message += `**Service Areas:** ${KNOWLEDGE_BASE.company.serviceAreas.join(
        ', '
      )}\n\n`;
      message += `How can we help you today?`;
  }

  return {
    message,
    suggestedActions: suggestedActions.length > 0 ? suggestedActions : undefined,
    escalateToHuman,
  };
}

/**
 * Generate FAQ response
 */
export function generateFAQResponse(question: string): string {
  const lower = question.toLowerCase();

  if (lower.includes('cost') || lower.includes('price') || lower.includes('how much')) {
    return KNOWLEDGE_BASE.faqs.cost;
  }

  if (lower.includes('insurance') || lower.includes('claim')) {
    return KNOWLEDGE_BASE.faqs.insurance;
  }

  if (
    lower.includes('response time') ||
    lower.includes('how fast') ||
    lower.includes('how quick')
  ) {
    return KNOWLEDGE_BASE.faqs.response;
  }

  if (
    lower.includes('certified') ||
    lower.includes('qualified') ||
    lower.includes('credentials')
  ) {
    return KNOWLEDGE_BASE.faqs.certification;
  }

  return "I don't have a specific answer for that question. Would you like to speak with one of our specialists?";
}
