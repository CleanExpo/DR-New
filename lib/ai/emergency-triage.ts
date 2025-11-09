/**
 * Emergency Triage AI System
 * Assesses emergency urgency and routes appropriately
 */

import { sanitizeForAI, getAIProviderConfig, getActiveProvider } from './config';
import { rateLimiter } from './rate-limiter';
import { aiMonitor, calculateOpenAICost, calculateAnthropicCost } from './monitoring';

export type EmergencyUrgency = 'critical' | 'high' | 'medium' | 'low' | 'info';
export type ServiceType =
  | 'water-damage'
  | 'fire-damage'
  | 'mould'
  | 'storm-damage'
  | 'general';

export interface TriageResult {
  urgency: EmergencyUrgency;
  serviceType: ServiceType;
  recommendedAction: string;
  estimatedResponseTime: string;
  shouldCallNow: boolean;
  reasoning: string;
}

/**
 * Emergency triage prompts
 */
const TRIAGE_SYSTEM_PROMPT = `You are an emergency triage specialist for Disaster Recovery Brisbane, a professional restoration company.

Your role is to assess the urgency of disaster situations and recommend appropriate action.

Service Areas:
- Water Damage Restoration (burst pipes, flooding, leaks)
- Fire Damage Restoration (fire, smoke damage)
- Mould Remediation (mould growth, contamination)
- Storm Damage Restoration (roof damage, structural issues)

Urgency Levels:
- CRITICAL: Immediate threat to safety or major ongoing damage (active flooding, electrical hazards, structural collapse risk)
- HIGH: Significant damage requiring same-day response (major water leaks, recent fire, extensive mould)
- MEDIUM: Moderate issues requiring 24-48 hour response (minor leaks, smoke odor, small mould areas)
- LOW: Non-urgent maintenance or minor issues (old stains, preventive work)
- INFO: General questions or non-emergency inquiries

IMPORTANT: Always prioritize safety. If there's any risk to life or property, classify as CRITICAL.

Respond with a JSON object containing:
{
  "urgency": "critical|high|medium|low|info",
  "serviceType": "water-damage|fire-damage|mould|storm-damage|general",
  "recommendedAction": "Brief action recommendation",
  "estimatedResponseTime": "Time estimate (e.g., 'Within 60 minutes', '24-48 hours')",
  "shouldCallNow": true/false,
  "reasoning": "Brief explanation of assessment"
}`;

/**
 * Triage emergency using AI
 */
export async function triageEmergency(
  userMessage: string,
  context?: {
    ipAddress?: string;
    sessionId?: string;
  }
): Promise<TriageResult> {
  const startTime = Date.now();
  const identifier = context?.ipAddress || context?.sessionId || 'anonymous';

  try {
    // Rate limiting
    const rateLimit = await rateLimiter.checkLimit(identifier, {
      minuteLimit: 5,
      hourLimit: 50,
    });

    if (!rateLimit.allowed) {
      // Fallback to rule-based triage
      return fallbackTriage(userMessage);
    }

    // Sanitize input
    const sanitizedMessage = sanitizeForAI(userMessage);

    const provider = getActiveProvider();

    if (provider === 'fallback') {
      return fallbackTriage(userMessage);
    }

    const config = getAIProviderConfig();
    let result: TriageResult;

    if (provider === 'openai') {
      result = await triageWithOpenAI(sanitizedMessage, config.openai.apiKey);
    } else {
      result = await triageWithAnthropic(
        sanitizedMessage,
        config.anthropic.apiKey
      );
    }

    return result;
  } catch (error) {
    console.error('[Emergency Triage] Error:', error);

    // Record error
    aiMonitor.record({
      provider: getActiveProvider(),
      model: 'triage',
      operation: 'emergency-triage',
      latency: Date.now() - startTime,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    // Fallback to rule-based
    return fallbackTriage(userMessage);
  }
}

/**
 * Triage with OpenAI
 */
async function triageWithOpenAI(
  message: string,
  apiKey: string
): Promise<TriageResult> {
  const startTime = Date.now();

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: TRIAGE_SYSTEM_PROMPT },
          { role: 'user', content: message },
        ],
        temperature: 0.3,
        max_tokens: 500,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content) as TriageResult;

    // Record metrics
    const cost = calculateOpenAICost(
      'gpt-4o-mini',
      data.usage.prompt_tokens,
      data.usage.completion_tokens
    );

    aiMonitor.record({
      provider: 'openai',
      model: 'gpt-4o-mini',
      operation: 'emergency-triage',
      latency: Date.now() - startTime,
      success: true,
      tokens: {
        prompt: data.usage.prompt_tokens,
        completion: data.usage.completion_tokens,
        total: data.usage.total_tokens,
      },
      cost,
    });

    return result;
  } catch (error) {
    throw error;
  }
}

/**
 * Triage with Anthropic Claude
 */
async function triageWithAnthropic(
  message: string,
  apiKey: string
): Promise<TriageResult> {
  const startTime = Date.now();

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 500,
        temperature: 0.3,
        system: TRIAGE_SYSTEM_PROMPT,
        messages: [{ role: 'user', content: message }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.content[0].text;
    const result = JSON.parse(content) as TriageResult;

    // Record metrics
    const cost = calculateAnthropicCost(
      'claude-3-5-haiku-20241022',
      data.usage.input_tokens,
      data.usage.output_tokens
    );

    aiMonitor.record({
      provider: 'anthropic',
      model: 'claude-3-5-haiku-20241022',
      operation: 'emergency-triage',
      latency: Date.now() - startTime,
      success: true,
      tokens: {
        prompt: data.usage.input_tokens,
        completion: data.usage.output_tokens,
        total: data.usage.input_tokens + data.usage.output_tokens,
      },
      cost,
    });

    return result;
  } catch (error) {
    throw error;
  }
}

/**
 * Fallback rule-based triage (no AI required)
 */
function fallbackTriage(message: string): TriageResult {
  const lowerMessage = message.toLowerCase();

  // Critical keywords
  const criticalKeywords = [
    'flooding',
    'burst pipe',
    'electrical',
    'collapse',
    'immediate',
    'emergency',
    'fire',
    'smoke',
    'structural damage',
  ];

  // High urgency keywords
  const highKeywords = [
    'leak',
    'water damage',
    'mould',
    'storm damage',
    'ceiling',
    'wall damage',
  ];

  // Service type detection
  let serviceType: ServiceType = 'general';
  if (
    lowerMessage.includes('water') ||
    lowerMessage.includes('flood') ||
    lowerMessage.includes('leak') ||
    lowerMessage.includes('pipe')
  ) {
    serviceType = 'water-damage';
  } else if (
    lowerMessage.includes('fire') ||
    lowerMessage.includes('smoke')
  ) {
    serviceType = 'fire-damage';
  } else if (
    lowerMessage.includes('mould') ||
    lowerMessage.includes('mold')
  ) {
    serviceType = 'mould';
  } else if (
    lowerMessage.includes('storm') ||
    lowerMessage.includes('wind') ||
    lowerMessage.includes('roof')
  ) {
    serviceType = 'storm-damage';
  }

  // Urgency detection
  let urgency: EmergencyUrgency = 'info';
  let shouldCallNow = false;
  let estimatedResponseTime = '24-48 hours';
  let recommendedAction = 'Contact us for an assessment';

  if (criticalKeywords.some((keyword) => lowerMessage.includes(keyword))) {
    urgency = 'critical';
    shouldCallNow = true;
    estimatedResponseTime = 'Within 60 minutes';
    recommendedAction =
      'Call 1300 309 361 immediately for emergency response';
  } else if (highKeywords.some((keyword) => lowerMessage.includes(keyword))) {
    urgency = 'high';
    shouldCallNow = true;
    estimatedResponseTime = 'Same day';
    recommendedAction = 'Call 1300 309 361 for urgent assistance';
  } else if (
    lowerMessage.includes('help') ||
    lowerMessage.includes('need') ||
    lowerMessage.includes('problem')
  ) {
    urgency = 'medium';
    estimatedResponseTime = '24-48 hours';
    recommendedAction = 'Submit an enquiry or call for faster response';
  }

  return {
    urgency,
    serviceType,
    recommendedAction,
    estimatedResponseTime,
    shouldCallNow,
    reasoning: 'Assessed using rule-based fallback system',
  };
}
