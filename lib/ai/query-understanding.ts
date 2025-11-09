/**
 * Query Understanding
 * Interpret user search intent and extract entities
 */

export interface QueryAnalysis {
  originalQuery: string;
  intent: QueryIntent;
  entities: {
    service?: string[];
    location?: string[];
    urgency?: 'emergency' | 'urgent' | 'normal';
    priceQuery?: boolean;
    insuranceRelated?: boolean;
  };
  suggestedFilters: {
    category?: string;
    location?: string;
    serviceType?: string;
  };
  reformulatedQuery: string;
  searchStrategies: ('semantic' | 'keyword' | 'hybrid')[];
}

export type QueryIntent =
  | 'emergency-help'
  | 'service-info'
  | 'pricing'
  | 'location-specific'
  | 'insurance-claim'
  | 'how-to'
  | 'general';

/**
 * Analyze search query to understand intent
 */
export function analyzeQuery(query: string): QueryAnalysis {
  const lower = query.toLowerCase();
  const entities = extractEntities(query);
  const intent = detectIntent(query, entities);
  const suggestedFilters = generateFilters(entities, intent);
  const reformulatedQuery = reformulateQuery(query, intent, entities);
  const searchStrategies = selectSearchStrategies(intent, query);

  return {
    originalQuery: query,
    intent,
    entities,
    suggestedFilters,
    reformulatedQuery,
    searchStrategies,
  };
}

/**
 * Detect user intent from query
 */
function detectIntent(
  query: string,
  entities: QueryAnalysis['entities']
): QueryIntent {
  const lower = query.toLowerCase();

  // Emergency patterns
  const emergencyKeywords = [
    'emergency',
    'urgent',
    'flooding',
    'burst pipe',
    'immediate',
    'help now',
    '24/7',
    'asap',
  ];
  if (
    emergencyKeywords.some((keyword) => lower.includes(keyword)) ||
    entities.urgency === 'emergency'
  ) {
    return 'emergency-help';
  }

  // Pricing patterns
  const pricingKeywords = [
    'cost',
    'price',
    'quote',
    'how much',
    'expensive',
    'cheap',
    'rate',
  ];
  if (pricingKeywords.some((keyword) => lower.includes(keyword))) {
    return 'pricing';
  }

  // Insurance patterns
  if (entities.insuranceRelated) {
    return 'insurance-claim';
  }

  // Location-specific
  if (entities.location && entities.location.length > 0) {
    return 'location-specific';
  }

  // How-to patterns
  const howToKeywords = ['how to', 'how do i', 'what should i', 'steps to'];
  if (howToKeywords.some((keyword) => lower.includes(keyword))) {
    return 'how-to';
  }

  // Service information
  if (entities.service && entities.service.length > 0) {
    return 'service-info';
  }

  return 'general';
}

/**
 * Extract entities from query
 */
function extractEntities(query: string): QueryAnalysis['entities'] {
  const lower = query.toLowerCase();
  const entities: QueryAnalysis['entities'] = {};

  // Service extraction
  const serviceKeywords = {
    'water-damage': [
      'water damage',
      'flood',
      'leak',
      'burst pipe',
      'wet',
      'moisture',
    ],
    'fire-damage': ['fire', 'smoke', 'burn', 'soot'],
    mould: ['mould', 'mold', 'mildew', 'fungus'],
    'storm-damage': ['storm', 'wind', 'hail', 'roof', 'tree'],
  };

  const detectedServices: string[] = [];
  Object.entries(serviceKeywords).forEach(([service, keywords]) => {
    if (keywords.some((keyword) => lower.includes(keyword))) {
      detectedServices.push(service);
    }
  });

  if (detectedServices.length > 0) {
    entities.service = detectedServices;
  }

  // Location extraction
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
    'fortitude valley',
    'cbd',
  ];

  const detectedLocations = locations.filter((loc) => lower.includes(loc));
  if (detectedLocations.length > 0) {
    entities.location = detectedLocations;
  }

  // Urgency detection
  if (
    lower.includes('emergency') ||
    lower.includes('urgent') ||
    lower.includes('immediate') ||
    lower.includes('asap')
  ) {
    entities.urgency = 'emergency';
  } else if (
    lower.includes('soon') ||
    lower.includes('quickly') ||
    lower.includes('fast')
  ) {
    entities.urgency = 'urgent';
  } else {
    entities.urgency = 'normal';
  }

  // Price query detection
  entities.priceQuery =
    lower.includes('cost') ||
    lower.includes('price') ||
    lower.includes('quote') ||
    lower.includes('how much') ||
    lower.includes('rate');

  // Insurance detection
  entities.insuranceRelated =
    lower.includes('insurance') ||
    lower.includes('claim') ||
    lower.includes('aami') ||
    lower.includes('suncorp') ||
    lower.includes('qbe');

  return entities;
}

/**
 * Generate search filters from entities
 */
function generateFilters(
  entities: QueryAnalysis['entities'],
  intent: QueryIntent
): QueryAnalysis['suggestedFilters'] {
  const filters: QueryAnalysis['suggestedFilters'] = {};

  // Category filter based on intent
  switch (intent) {
    case 'emergency-help':
      filters.category = 'emergency';
      break;
    case 'service-info':
      filters.category = 'service';
      break;
    case 'location-specific':
      filters.category = 'location';
      break;
    case 'insurance-claim':
      filters.category = 'insurance';
      break;
    case 'pricing':
      filters.category = 'service'; // Services pages have pricing info
      break;
  }

  // Location filter
  if (entities.location && entities.location.length > 0) {
    filters.location = entities.location[0];
  }

  // Service type filter
  if (entities.service && entities.service.length > 0) {
    filters.serviceType = entities.service[0];
  }

  return filters;
}

/**
 * Reformulate query for better search results
 */
function reformulateQuery(
  query: string,
  intent: QueryIntent,
  entities: QueryAnalysis['entities']
): string {
  let reformulated = query;

  // Add context based on intent
  switch (intent) {
    case 'emergency-help':
      reformulated += ' emergency response 24/7';
      break;

    case 'service-info':
      if (entities.service && entities.service.length > 0) {
        reformulated += ` ${entities.service[0].replace('-', ' ')} restoration service`;
      }
      break;

    case 'pricing':
      reformulated += ' cost quote pricing';
      break;

    case 'insurance-claim':
      reformulated += ' insurance claim approved contractor';
      break;

    case 'location-specific':
      if (entities.location && entities.location.length > 0) {
        reformulated += ` professional ${entities.location[0]} disaster recovery`;
      }
      break;
  }

  // Add Brisbane context if no location mentioned
  if (!entities.location || entities.location.length === 0) {
    reformulated += ' Brisbane';
  }

  return reformulated.trim();
}

/**
 * Select appropriate search strategies
 */
function selectSearchStrategies(
  intent: QueryIntent,
  query: string
): ('semantic' | 'keyword' | 'hybrid')[] {
  const strategies: ('semantic' | 'keyword' | 'hybrid')[] = [];

  // Short queries benefit from keyword search
  if (query.split(/\s+/).length <= 3) {
    strategies.push('keyword');
  }

  // Long, natural language queries benefit from semantic search
  if (query.split(/\s+/).length > 5) {
    strategies.push('semantic');
  }

  // Question-based queries benefit from semantic search
  if (
    query.toLowerCase().startsWith('how') ||
    query.toLowerCase().startsWith('what') ||
    query.toLowerCase().startsWith('why')
  ) {
    strategies.push('semantic');
  }

  // Emergency and specific service queries benefit from hybrid
  if (intent === 'emergency-help' || intent === 'service-info') {
    strategies.push('hybrid');
  }

  // Default to hybrid if no specific strategy selected
  if (strategies.length === 0) {
    strategies.push('hybrid');
  }

  return strategies;
}

/**
 * Generate search suggestions
 */
export function generateSearchSuggestions(
  partialQuery: string,
  popularSearches: string[]
): string[] {
  const lower = partialQuery.toLowerCase();

  // Filter popular searches that match
  const matchingPopular = popularSearches.filter((search) =>
    search.toLowerCase().includes(lower)
  );

  // Generate service-based suggestions
  const serviceSuggestions = [
    'water damage restoration Brisbane',
    'emergency fire damage repair',
    'mould remediation Brisbane',
    'storm damage restoration',
    '24/7 emergency restoration',
  ].filter((s) => s.toLowerCase().includes(lower));

  // Generate location-based suggestions
  const locationSuggestions = [
    'water damage Hamilton',
    'restoration services Ascot',
    'emergency services Brisbane CBD',
  ].filter((s) => s.toLowerCase().includes(lower));

  // Combine and deduplicate
  const allSuggestions = [
    ...matchingPopular,
    ...serviceSuggestions,
    ...locationSuggestions,
  ];

  return [...new Set(allSuggestions)].slice(0, 5);
}

/**
 * Did you mean? spell correction suggestions
 */
export function generateSpellingSuggestions(query: string): string[] {
  const commonMisspellings: Record<string, string> = {
    'warter': 'water',
    'waterdamage': 'water damage',
    'fier': 'fire',
    'smoak': 'smoke',
    'mold': 'mould',
    'brisban': 'brisbane',
    'ipswitch': 'ipswich',
    'emergancy': 'emergency',
    'resoration': 'restoration',
  };

  const suggestions: string[] = [];
  let correctedQuery = query.toLowerCase();

  Object.entries(commonMisspellings).forEach(([wrong, correct]) => {
    if (correctedQuery.includes(wrong)) {
      correctedQuery = correctedQuery.replace(wrong, correct);
    }
  });

  if (correctedQuery !== query.toLowerCase()) {
    suggestions.push(correctedQuery);
  }

  return suggestions;
}
