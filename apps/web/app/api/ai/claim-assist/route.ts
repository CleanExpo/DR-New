/**
 * AI Claim Assist API Endpoint
 *
 * Provides AI-powered assistance for insurance claim submission:
 * - Photo analysis for damage type detection
 * - Description parsing and field suggestions
 * - Service category recommendation
 * - Cost estimation
 */

import { NextRequest, NextResponse } from 'next/server';
import { getDefaultProvider } from '@/lib/agents/providers';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

export const dynamic = 'force-dynamic';

interface ClaimAssistRequest {
  action: 'analyze_description' | 'suggest_category' | 'estimate_cost' | 'validate_claim';
  data: {
    description?: string;
    damageType?: string;
    location?: { suburb?: string; state?: string };
    insuranceProvider?: string;
    photos?: string[]; // Base64 or URLs (future: image analysis)
  };
}

interface ClaimAssistResponse {
  success: boolean;
  result?: {
    damageType?: string;
    severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    confidence?: number;
    suggestedFields?: {
      australianServiceType?: string;
      emergencyLevel?: string;
      estimatedCost?: { min: number; max: number };
    };
    requiredDocuments?: string[];
    warnings?: string[];
    suggestions?: string[];
    validation?: {
      isComplete: boolean;
      missingFields: string[];
      recommendations: string[];
    };
  };
  error?: string;
}

// Australian service type mapping
const SERVICE_TYPE_KEYWORDS: Record<string, string[]> = {
  WATER_DAMAGE: ['water', 'flood', 'leak', 'burst pipe', 'storm', 'rain', 'wet', 'moisture', 'damp', 'mould', 'mold'],
  FIRE_DAMAGE: ['fire', 'smoke', 'burn', 'flames', 'soot', 'char', 'arson'],
  STORM_DAMAGE: ['storm', 'wind', 'hail', 'cyclone', 'hurricane', 'tornado', 'lightning', 'fallen tree'],
  MOULD_REMEDIATION: ['mould', 'mold', 'fungus', 'spores', 'black mould', 'toxic mould', 'damp'],
  BIOHAZARD: ['biohazard', 'blood', 'bodily fluids', 'sewage', 'hazardous', 'contamination'],
  STRUCTURAL: ['structural', 'foundation', 'wall', 'roof', 'ceiling', 'collapse', 'crack'],
};

// Emergency level keywords
const EMERGENCY_KEYWORDS = {
  URGENT: ['emergency', 'urgent', 'immediately', 'asap', 'dangerous', 'safety hazard', 'critical', 'evacuate'],
  HIGH: ['significant', 'major', 'severe', 'extensive', 'spreading', 'getting worse'],
  STANDARD: ['moderate', 'contained', 'stable', 'not urgent'],
};

export async function POST(request: NextRequest) {
  try {
    const body: ClaimAssistRequest = await request.json();
    const { action, data } = body;

    if (!action || !data) {
      return NextResponse.json(
        { success: false, error: 'Action and data are required' },
        { status: 400 }
      );
    }

    let result: ClaimAssistResponse['result'];

    switch (action) {
      case 'analyze_description':
        result = await analyzeDescription(data.description || '');
        break;

      case 'suggest_category':
        result = await suggestCategory(data.description || '', data.damageType);
        break;

      case 'estimate_cost':
        result = await estimateCost(data.description || '', data.damageType, data.location);
        break;

      case 'validate_claim':
        result = await validateClaim(data);
        break;

      default:
        return NextResponse.json(
          { success: false, error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error('Claim assist error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process claim assist request',
      },
      { status: 500 }
    );
  }
}

/**
 * Analyze damage description to extract key information
 */
async function analyzeDescription(description: string): Promise<ClaimAssistResponse['result']> {
  if (!description || description.length < 10) {
    return {
      warnings: ['Please provide a more detailed description of the damage'],
      suggestions: [
        'Describe what type of damage occurred (water, fire, storm, etc.)',
        'Mention which areas of the property are affected',
        'Include when the damage occurred or was discovered',
        'Note any immediate actions you have taken',
      ],
    };
  }

  const descLower = description.toLowerCase();

  // Detect damage type from keywords
  let detectedType: string | undefined;
  let confidence = 0;

  for (const [type, keywords] of Object.entries(SERVICE_TYPE_KEYWORDS)) {
    const matches = keywords.filter((kw) => descLower.includes(kw));
    if (matches.length > 0) {
      const typeConfidence = matches.length / keywords.length;
      if (typeConfidence > confidence) {
        confidence = typeConfidence;
        detectedType = type;
      }
    }
  }

  // Detect emergency level
  let emergencyLevel = 'STANDARD';
  for (const [level, keywords] of Object.entries(EMERGENCY_KEYWORDS)) {
    if (keywords.some((kw) => descLower.includes(kw))) {
      emergencyLevel = level;
      break;
    }
  }

  // Detect severity based on language
  let severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'MEDIUM';
  if (descLower.includes('minor') || descLower.includes('small') || descLower.includes('limited')) {
    severity = 'LOW';
  } else if (descLower.includes('significant') || descLower.includes('major') || descLower.includes('extensive')) {
    severity = 'HIGH';
  } else if (descLower.includes('critical') || descLower.includes('total') || descLower.includes('destroyed')) {
    severity = 'CRITICAL';
  }

  // Use AI for more sophisticated analysis if available
  try {
    const provider = getDefaultProvider();
    const model = provider.getModel();

    const systemPrompt = `You are an Australian disaster recovery expert. Analyse the following damage description and provide:
1. The most likely damage type (WATER_DAMAGE, FIRE_DAMAGE, STORM_DAMAGE, MOULD_REMEDIATION, BIOHAZARD, or STRUCTURAL)
2. Severity (LOW, MEDIUM, HIGH, or CRITICAL)
3. Any warnings or safety concerns
4. Suggestions for additional information needed

Respond in JSON format only:
{
  "damageType": "...",
  "severity": "...",
  "warnings": ["..."],
  "suggestions": ["..."]
}`;

    const response = await model.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(description),
    ]);

    const content = typeof response.content === 'string' ? response.content : '';

    // Try to parse JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const aiResult = JSON.parse(jsonMatch[0]);
      detectedType = aiResult.damageType || detectedType;
      severity = aiResult.severity || severity;

      return {
        damageType: detectedType,
        severity,
        confidence: Math.min(confidence + 0.3, 0.95),
        suggestedFields: {
          australianServiceType: detectedType,
          emergencyLevel,
        },
        warnings: aiResult.warnings || [],
        suggestions: aiResult.suggestions || [],
      };
    }
  } catch (aiError) {
    console.warn('AI analysis failed, using keyword-based analysis:', aiError);
  }

  // Fallback to keyword-based analysis
  return {
    damageType: detectedType,
    severity,
    confidence: Math.min(confidence, 0.7),
    suggestedFields: {
      australianServiceType: detectedType,
      emergencyLevel,
    },
    warnings: severity === 'CRITICAL' || severity === 'HIGH'
      ? ['Based on your description, this appears to be a serious situation. Consider contacting emergency services if there is immediate danger.']
      : [],
    suggestions: [
      !detectedType ? 'Please specify the type of damage more clearly' : null,
      'Include photos of the damage for faster processing',
      'Note down the exact time and date the damage occurred',
    ].filter(Boolean) as string[],
  };
}

/**
 * Suggest service category based on description
 */
async function suggestCategory(
  description: string,
  providedType?: string
): Promise<ClaimAssistResponse['result']> {
  const analysis = await analyzeDescription(description);

  return {
    damageType: providedType || analysis?.damageType,
    suggestedFields: {
      australianServiceType: providedType || analysis?.damageType,
      emergencyLevel: analysis?.suggestedFields?.emergencyLevel,
    },
    confidence: analysis?.confidence,
  };
}

/**
 * Estimate cost range based on damage description and location
 */
async function estimateCost(
  description: string,
  damageType?: string,
  location?: { suburb?: string; state?: string }
): Promise<ClaimAssistResponse['result']> {
  // Base cost ranges by damage type (AUD)
  const COST_RANGES: Record<string, { min: number; max: number; avgPerSqm: number }> = {
    WATER_DAMAGE: { min: 2000, max: 15000, avgPerSqm: 50 },
    FIRE_DAMAGE: { min: 5000, max: 50000, avgPerSqm: 150 },
    STORM_DAMAGE: { min: 1500, max: 20000, avgPerSqm: 40 },
    MOULD_REMEDIATION: { min: 1000, max: 10000, avgPerSqm: 30 },
    BIOHAZARD: { min: 3000, max: 25000, avgPerSqm: 100 },
    STRUCTURAL: { min: 10000, max: 100000, avgPerSqm: 200 },
  };

  const analysis = await analyzeDescription(description);
  const type = damageType || analysis?.damageType || 'WATER_DAMAGE';
  const costRange = COST_RANGES[type] || COST_RANGES.WATER_DAMAGE;

  // Adjust based on severity
  let multiplier = 1;
  switch (analysis?.severity) {
    case 'LOW':
      multiplier = 0.5;
      break;
    case 'MEDIUM':
      multiplier = 1;
      break;
    case 'HIGH':
      multiplier = 1.5;
      break;
    case 'CRITICAL':
      multiplier = 2;
      break;
  }

  // Regional adjustment (Sydney/Melbourne typically 10-20% higher)
  const premiumStates = ['NSW', 'VIC'];
  const regionMultiplier = location?.state && premiumStates.includes(location.state) ? 1.15 : 1;

  return {
    damageType: type,
    severity: analysis?.severity,
    suggestedFields: {
      australianServiceType: type,
      emergencyLevel: analysis?.suggestedFields?.emergencyLevel,
      estimatedCost: {
        min: Math.round(costRange.min * multiplier * regionMultiplier),
        max: Math.round(costRange.max * multiplier * regionMultiplier),
      },
    },
    suggestions: [
      'This is an estimate only. Final cost will depend on detailed inspection.',
      'Request quotes from multiple contractors for comparison.',
    ],
  };
}

/**
 * Validate claim completeness
 */
async function validateClaim(
  data: ClaimAssistRequest['data']
): Promise<ClaimAssistResponse['result']> {
  const missingFields: string[] = [];
  const recommendations: string[] = [];

  if (!data.description || data.description.length < 20) {
    missingFields.push('Detailed damage description');
    recommendations.push('Provide a comprehensive description of at least 20 characters');
  }

  if (!data.damageType) {
    missingFields.push('Damage type');
    recommendations.push('Select or confirm the type of damage');
  }

  if (!data.photos || data.photos.length === 0) {
    recommendations.push('Add photos of the damage to strengthen your claim');
  }

  if (!data.insuranceProvider) {
    missingFields.push('Insurance provider');
  }

  return {
    validation: {
      isComplete: missingFields.length === 0,
      missingFields,
      recommendations,
    },
  };
}
