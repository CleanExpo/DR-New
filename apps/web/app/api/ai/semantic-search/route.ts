/**
 * Semantic Search API Endpoint
 *
 * Provides AI-powered natural language search for contractors:
 * - Parse natural language queries into structured filters
 * - Extract intent, urgency, location, and service type
 * - Map to contractor search parameters
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getDefaultProvider } from '@/lib/agents/providers';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

export const dynamic = 'force-dynamic';

interface SemanticSearchRequest {
  query: string;
  context?: {
    userId?: string;
    location?: { suburb?: string; state?: string; postcode?: string };
  };
}

interface ParsedFilters {
  serviceTypes: string[];
  urgencyLevel: 'EMERGENCY' | 'URGENT' | 'HIGH' | 'STANDARD' | 'FLEXIBLE';
  location: {
    suburb?: string;
    state?: string;
    postcode?: string;
    city?: string;
  };
  keywords: string[];
  priceRange?: { min?: number; max?: number };
  availability?: string;
}

interface SemanticSearchResponse {
  success: boolean;
  parsed?: {
    intent: 'find_contractor' | 'get_quote' | 'emergency_help' | 'general_inquiry';
    serviceType: string | null;
    urgency: string;
    location: ParsedFilters['location'];
    confidence: number;
    originalQuery: string;
  };
  filters?: ParsedFilters;
  suggestions?: string[];
  error?: string;
}

// Australian service types
const SERVICE_TYPES = [
  'WATER_DAMAGE',
  'FIRE_DAMAGE',
  'STORM_DAMAGE',
  'MOULD_REMEDIATION',
  'BIOHAZARD',
  'STRUCTURAL',
  'CARPET_CLEANING',
  'CONTENT_RESTORATION',
  'EMERGENCY_RESPONSE',
];

// Service type keyword mapping
const SERVICE_KEYWORDS: Record<string, string[]> = {
  WATER_DAMAGE: [
    'water', 'flood', 'flooding', 'flooded', 'leak', 'leaking', 'burst pipe',
    'rain damage', 'wet', 'moisture', 'damp', 'water damage', 'plumbing',
  ],
  FIRE_DAMAGE: [
    'fire', 'smoke', 'burn', 'burnt', 'flames', 'soot', 'fire damage',
    'smoke damage', 'arson', 'electrical fire',
  ],
  STORM_DAMAGE: [
    'storm', 'wind', 'hail', 'cyclone', 'tornado', 'lightning', 'fallen tree',
    'storm damage', 'roof damage', 'wind damage', 'hail damage',
  ],
  MOULD_REMEDIATION: [
    'mould', 'mold', 'fungus', 'mildew', 'spores', 'black mould', 'toxic mould',
    'mould removal', 'mold remediation',
  ],
  BIOHAZARD: [
    'biohazard', 'blood', 'sewage', 'hazardous', 'contamination', 'crime scene',
    'bodily fluids', 'hoarding', 'unattended death',
  ],
  STRUCTURAL: [
    'structural', 'foundation', 'wall', 'roof', 'ceiling', 'collapse',
    'crack', 'building', 'structural damage',
  ],
  CARPET_CLEANING: [
    'carpet', 'rug', 'upholstery', 'carpet cleaning', 'steam clean',
  ],
  CONTENT_RESTORATION: [
    'furniture', 'belongings', 'contents', 'restoration', 'salvage',
  ],
  EMERGENCY_RESPONSE: [
    'emergency', '24/7', 'urgent', 'immediately', 'asap', 'now',
  ],
};

// Urgency indicators
const URGENCY_INDICATORS: Record<string, string[]> = {
  EMERGENCY: ['emergency', 'life threatening', 'dangerous', 'call 000', 'evacuate', 'collapse'],
  URGENT: ['urgent', 'immediately', 'asap', 'right now', 'today', 'this moment'],
  HIGH: ['soon', 'quickly', 'fast', 'within 24 hours', 'tomorrow'],
  STANDARD: ['when available', 'this week', 'next few days'],
  FLEXIBLE: ['no rush', 'whenever', 'at your convenience'],
};

// Australian states and major cities
const AUSTRALIAN_LOCATIONS: Record<string, { state: string; variations: string[] }> = {
  sydney: { state: 'NSW', variations: ['sydney', 'syd'] },
  melbourne: { state: 'VIC', variations: ['melbourne', 'melb'] },
  brisbane: { state: 'QLD', variations: ['brisbane', 'bris'] },
  perth: { state: 'WA', variations: ['perth'] },
  adelaide: { state: 'SA', variations: ['adelaide'] },
  hobart: { state: 'TAS', variations: ['hobart'] },
  darwin: { state: 'NT', variations: ['darwin'] },
  canberra: { state: 'ACT', variations: ['canberra'] },
  gold_coast: { state: 'QLD', variations: ['gold coast', 'goldcoast'] },
  newcastle: { state: 'NSW', variations: ['newcastle'] },
  wollongong: { state: 'NSW', variations: ['wollongong'] },
  geelong: { state: 'VIC', variations: ['geelong'] },
};

const STATE_NAMES: Record<string, string> = {
  nsw: 'NSW',
  'new south wales': 'NSW',
  vic: 'VIC',
  victoria: 'VIC',
  qld: 'QLD',
  queensland: 'QLD',
  wa: 'WA',
  'western australia': 'WA',
  sa: 'SA',
  'south australia': 'SA',
  tas: 'TAS',
  tasmania: 'TAS',
  nt: 'NT',
  'northern territory': 'NT',
  act: 'ACT',
  'australian capital territory': 'ACT',
};

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const body: SemanticSearchRequest = await request.json();
    const { query, context } = body;

    if (!query || query.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: 'Query must be at least 3 characters' },
        { status: 400 }
      );
    }

    const queryLower = query.toLowerCase().trim();

    // Parse the query
    const parsed = await parseQuery(queryLower, context);
    const filters = buildFilters(parsed, context);

    return NextResponse.json({
      success: true,
      parsed: {
        intent: parsed.intent,
        serviceType: parsed.serviceType,
        urgency: parsed.urgency,
        location: parsed.location,
        confidence: parsed.confidence,
        originalQuery: query,
      },
      filters,
      suggestions: generateSuggestions(parsed, filters),
    } as SemanticSearchResponse);
  } catch (error) {
    console.error('Semantic search error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process search query',
      },
      { status: 500 }
    );
  }
}

interface ParsedQuery {
  intent: 'find_contractor' | 'get_quote' | 'emergency_help' | 'general_inquiry';
  serviceType: string | null;
  urgency: string;
  location: ParsedFilters['location'];
  keywords: string[];
  confidence: number;
}

async function parseQuery(
  query: string,
  context?: SemanticSearchRequest['context']
): Promise<ParsedQuery> {
  // Detect service type
  let serviceType: string | null = null;
  let maxMatches = 0;

  for (const [type, keywords] of Object.entries(SERVICE_KEYWORDS)) {
    const matches = keywords.filter((kw) => query.includes(kw.toLowerCase()));
    if (matches.length > maxMatches) {
      maxMatches = matches.length;
      serviceType = type;
    }
  }

  // Detect urgency
  let urgency = 'STANDARD';
  for (const [level, indicators] of Object.entries(URGENCY_INDICATORS)) {
    if (indicators.some((ind) => query.includes(ind.toLowerCase()))) {
      urgency = level;
      break;
    }
  }

  // Detect location
  const location: ParsedFilters['location'] = { ...context?.location };

  // Check for city names
  for (const [city, info] of Object.entries(AUSTRALIAN_LOCATIONS)) {
    if (info.variations.some((v) => query.includes(v))) {
      location.city = city.charAt(0).toUpperCase() + city.slice(1).replace('_', ' ');
      location.state = info.state;
      break;
    }
  }

  // Check for state names
  for (const [name, code] of Object.entries(STATE_NAMES)) {
    if (query.includes(name)) {
      location.state = code;
      break;
    }
  }

  // Check for postcode (4 digits)
  const postcodeMatch = query.match(/\b(\d{4})\b/);
  if (postcodeMatch) {
    location.postcode = postcodeMatch[1];
  }

  // Detect intent
  let intent: ParsedQuery['intent'] = 'find_contractor';
  if (urgency === 'EMERGENCY') {
    intent = 'emergency_help';
  } else if (query.includes('quote') || query.includes('price') || query.includes('cost')) {
    intent = 'get_quote';
  } else if (query.includes('how') || query.includes('what') || query.includes('?')) {
    intent = 'general_inquiry';
  }

  // Extract additional keywords
  const keywords = extractKeywords(query);

  // Calculate confidence
  let confidence = 0.5;
  if (serviceType) confidence += 0.2;
  if (location.state || location.city) confidence += 0.15;
  if (urgency !== 'STANDARD') confidence += 0.1;

  // Try AI enhancement if available
  try {
    const aiParsed = await aiEnhancedParsing(query);
    if (aiParsed) {
      serviceType = aiParsed.serviceType || serviceType;
      urgency = aiParsed.urgency || urgency;
      confidence = Math.min(confidence + 0.15, 0.95);
    }
  } catch {
    // Continue with rule-based parsing
  }

  return {
    intent,
    serviceType,
    urgency,
    location,
    keywords,
    confidence: Math.min(confidence, 0.95),
  };
}

async function aiEnhancedParsing(query: string): Promise<{
  serviceType?: string;
  urgency?: string;
} | null> {
  try {
    const provider = getDefaultProvider();
    const model = provider.getModel();

    const systemPrompt = `You are an Australian disaster recovery search assistant. Parse the user's search query and extract:
1. serviceType: One of [WATER_DAMAGE, FIRE_DAMAGE, STORM_DAMAGE, MOULD_REMEDIATION, BIOHAZARD, STRUCTURAL, CARPET_CLEANING, CONTENT_RESTORATION, EMERGENCY_RESPONSE] or null
2. urgency: One of [EMERGENCY, URGENT, HIGH, STANDARD, FLEXIBLE]

Respond with JSON only:
{"serviceType": "...", "urgency": "..."}`;

    const response = await model.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(query),
    ]);

    const content = typeof response.content === 'string' ? response.content : '';
    const jsonMatch = content.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0]);
      return {
        serviceType: SERVICE_TYPES.includes(result.serviceType) ? result.serviceType : undefined,
        urgency: Object.keys(URGENCY_INDICATORS).includes(result.urgency) ? result.urgency : undefined,
      };
    }
  } catch (error) {
    console.warn('AI parsing failed:', error);
  }

  return null;
}

function extractKeywords(query: string): string[] {
  // Remove common words
  const stopWords = [
    'i', 'need', 'want', 'looking', 'for', 'a', 'an', 'the', 'my', 'in', 'at',
    'to', 'and', 'or', 'is', 'are', 'was', 'were', 'help', 'me', 'please',
    'can', 'you', 'find', 'get', 'have', 'has', 'with', 'from', 'on',
  ];

  return query
    .split(/\s+/)
    .filter((word) => word.length > 2 && !stopWords.includes(word))
    .slice(0, 10);
}

function buildFilters(
  parsed: ParsedQuery,
  context?: SemanticSearchRequest['context']
): ParsedFilters {
  const filters: ParsedFilters = {
    serviceTypes: parsed.serviceType ? [parsed.serviceType] : [],
    urgencyLevel: parsed.urgency as ParsedFilters['urgencyLevel'],
    location: {
      ...context?.location,
      ...parsed.location,
    },
    keywords: parsed.keywords,
  };

  // Add related service types
  if (parsed.serviceType === 'WATER_DAMAGE') {
    filters.serviceTypes.push('MOULD_REMEDIATION');
  } else if (parsed.serviceType === 'FIRE_DAMAGE') {
    filters.serviceTypes.push('CONTENT_RESTORATION');
  }

  return filters;
}

function generateSuggestions(parsed: ParsedQuery, filters: ParsedFilters): string[] {
  const suggestions: string[] = [];

  if (!parsed.serviceType) {
    suggestions.push('Try specifying the type of damage (e.g., "water damage", "fire damage")');
  }

  if (!filters.location.state && !filters.location.city) {
    suggestions.push('Add your location for more relevant results (e.g., "in Sydney" or "NSW")');
  }

  if (parsed.urgency === 'EMERGENCY') {
    suggestions.push('For life-threatening emergencies, please call 000');
  }

  if (parsed.intent === 'get_quote') {
    suggestions.push('Request free quotes from multiple contractors for comparison');
  }

  return suggestions;
}
