/**
 * URL Structure Optimization - Brisbane Disaster Recovery
 * SEO-optimized URL patterns and canonicalization strategy
 */

export interface URLPattern {
  pattern: string;
  description: string;
  keywords: string[];
  example: string;
  silo: string;
}

export interface CanonicalMapping {
  url: string;
  canonical: string;
  reason: string;
}

// OPTIMIZED URL STRUCTURE
export const URL_STRUCTURE: Record<string, URLPattern> = {
  // HOME
  HOME: {
    pattern: '/',
    description: 'Homepage - entry point',
    keywords: ['disaster recovery', 'restoration services', 'brisbane'],
    example: 'https://disasterrecovery.com.au/',
    silo: 'CORE'
  },

  // PRIMARY SERVICE SILOS
  SERVICES_HUB: {
    pattern: '/services',
    description: 'All services index page',
    keywords: ['disaster recovery services', 'restoration', 'water damage', 'fire damage'],
    example: 'https://disasterrecovery.com.au/services',
    silo: 'SERVICES'
  },

  WATER_DAMAGE_HUB: {
    pattern: '/services/water-damage',
    description: 'Water damage restoration hub',
    keywords: ['water damage', 'water restoration', 'water extraction'],
    example: 'https://disasterrecovery.com.au/services/water-damage',
    silo: 'WATER_DAMAGE'
  },

  WATER_DAMAGE_SPECIFIC: {
    pattern: '/services/water-damage/[specific-type]',
    description: 'Specific water damage type pages',
    keywords: ['burst pipes', 'ceiling damage', 'roof leak', 'flooding'],
    example: 'https://disasterrecovery.com.au/services/water-damage/burst-pipes',
    silo: 'WATER_DAMAGE'
  },

  FIRE_DAMAGE_HUB: {
    pattern: '/services/fire-damage',
    description: 'Fire damage restoration hub',
    keywords: ['fire damage', 'smoke damage', 'fire restoration'],
    example: 'https://disasterrecovery.com.au/services/fire-damage',
    silo: 'FIRE_DAMAGE'
  },

  FIRE_DAMAGE_SPECIFIC: {
    pattern: '/services/fire-damage/[specific-type]',
    description: 'Specific fire damage type pages',
    keywords: ['smoke odor removal', 'soot cleanup', 'structural damage'],
    example: 'https://disasterrecovery.com.au/services/fire-damage/smoke-odour-removal',
    silo: 'FIRE_DAMAGE'
  },

  MOULD_HUB: {
    pattern: '/services/mould-remediation',
    description: 'Mould remediation hub',
    keywords: ['mould remediation', 'mould removal', 'mould remediation'],
    example: 'https://disasterrecovery.com.au/services/mould-remediation',
    silo: 'MOULD'
  },

  MOULD_SPECIFIC: {
    pattern: '/services/mould-remediation/[specific-type]',
    description: 'Specific mould remediation pages',
    keywords: ['black mould', 'bathroom mould', 'mould removal'],
    example: 'https://disasterrecovery.com.au/services/mould-remediation/black-mould-removal',
    silo: 'MOULD'
  },

  STORM_DAMAGE_HUB: {
    pattern: '/services/storm-damage',
    description: 'Storm damage restoration hub',
    keywords: ['storm damage', 'cyclone damage', 'hail damage'],
    example: 'https://disasterrecovery.com.au/services/storm-damage',
    silo: 'STORM_DAMAGE'
  },

  STORM_DAMAGE_SPECIFIC: {
    pattern: '/services/storm-damage/[specific-type]',
    description: 'Specific storm damage pages',
    keywords: ['cyclone damage', 'hail damage', 'wind damage'],
    example: 'https://disasterrecovery.com.au/services/storm-damage/cyclone-damage',
    silo: 'STORM_DAMAGE'
  },

  COMMERCIAL_HUB: {
    pattern: '/services/commercial',
    description: 'Commercial restoration hub',
    keywords: ['commercial restoration', 'commercial services'],
    example: 'https://disasterrecovery.com.au/services/commercial',
    silo: 'COMMERCIAL'
  },

  COMMERCIAL_SPECIFIC: {
    pattern: '/services/commercial-services/[property-type]',
    description: 'Commercial property type pages',
    keywords: ['office water damage', 'retail flood', 'hotel restoration'],
    example: 'https://disasterrecovery.com.au/services/commercial-services/office-water-damage',
    silo: 'COMMERCIAL'
  },

  // EMERGENCY SERVICES
  EMERGENCY_SERVICES: {
    pattern: '/services/emergency-services',
    description: '24/7 emergency response hub',
    keywords: ['emergency services', '24 hour response'],
    example: 'https://disasterrecovery.com.au/services/emergency-services',
    silo: 'EMERGENCY'
  },

  EMERGENCY_SPECIFIC: {
    pattern: '/services/emergency-services/[service-type]',
    description: 'Specific emergency services',
    keywords: ['emergency response', 'disaster response', 'emergency drying'],
    example: 'https://disasterrecovery.com.au/services/emergency-services/emergency-board-up',
    silo: 'EMERGENCY'
  },

  // ABOUT & CREDENTIALS
  ABOUT_PHIL: {
    pattern: '/about-phil-mcgurk',
    description: 'About Master Restorer Phill McGurk',
    keywords: ['phill mcgurk', 'master restorer', 'IICRC certified'],
    example: 'https://disasterrecovery.com.au/about-phil-mcgurk',
    silo: 'EXPERTISE'
  },

  // SERVICE AREAS
  SERVICE_AREAS: {
    pattern: '/service-areas',
    description: 'Service coverage areas',
    keywords: ['service areas', 'brisbane', 'ipswich', 'logan'],
    example: 'https://disasterrecovery.com.au/service-areas',
    silo: 'SERVICE_AREAS'
  },

  SERVICE_AREAS_SPECIFIC: {
    pattern: '/service-areas/[location]',
    description: 'Location-specific service pages',
    keywords: ['brisbane water damage', 'ipswich restoration'],
    example: 'https://disasterrecovery.com.au/service-areas/brisbane',
    silo: 'SERVICE_AREAS'
  },

  // GUIDES & EDUCATION
  GUIDES_HUB: {
    pattern: '/guides',
    description: 'Educational guides index',
    keywords: ['guides', 'how to', 'tips and tricks'],
    example: 'https://disasterrecovery.com.au/guides',
    silo: 'EDUCATION'
  },

  GUIDES_CATEGORY: {
    pattern: '/guides/[category]',
    description: 'Guide category pages',
    keywords: ['water damage guide', 'fire damage guide'],
    example: 'https://disasterrecovery.com.au/guides/water-damage',
    silo: 'EDUCATION'
  },

  GUIDES_SPECIFIC: {
    pattern: '/guides/[category]/[specific-guide]',
    description: 'Individual guide pages',
    keywords: ['burst pipe repair', 'smoke damage cleaning'],
    example: 'https://disasterrecovery.com.au/guides/water-damage/burst-pipe-ceiling-repair-cost',
    silo: 'EDUCATION'
  },

  // FAQ
  FAQ: {
    pattern: '/faq',
    description: 'Frequently asked questions hub',
    keywords: ['faq', 'frequently asked questions'],
    example: 'https://disasterrecovery.com.au/faq',
    silo: 'SUPPORT'
  },

  FAQ_CATEGORY: {
    pattern: '/faq/[category]',
    description: 'FAQ by category',
    keywords: ['water damage faq', 'fire damage faq'],
    example: 'https://disasterrecovery.com.au/faq/water-damage',
    silo: 'SUPPORT'
  },

  // INSURANCE
  INSURANCE_CLAIMS: {
    pattern: '/insurance-claims',
    description: 'Insurance claims assistance',
    keywords: ['insurance claims', 'insurance help'],
    example: 'https://disasterrecovery.com.au/insurance-claims',
    silo: 'INSURANCE'
  },

  INSURANCE_PARTNERS: {
    pattern: '/insurance',
    description: 'Insurance partners directory',
    keywords: ['insurance partners', 'insurance companies'],
    example: 'https://disasterrecovery.com.au/insurance',
    silo: 'INSURANCE'
  },

  INSURANCE_PARTNER_SPECIFIC: {
    pattern: '/insurance/[company-name]',
    description: 'Individual insurance company pages',
    keywords: ['NRMA', 'RACQ', 'Allianz'],
    example: 'https://disasterrecovery.com.au/insurance/racq',
    silo: 'INSURANCE'
  },

  // EMERGENCY
  EMERGENCY: {
    pattern: '/emergency',
    description: 'Emergency response hub',
    keywords: ['emergency', 'disaster response'],
    example: 'https://disasterrecovery.com.au/emergency',
    silo: 'EMERGENCY'
  },

  EMERGENCY_SCENARIO: {
    pattern: '/emergency/[scenario]',
    description: 'Emergency scenario pages',
    keywords: ['after hours emergency', 'weekend emergency'],
    example: 'https://disasterrecovery.com.au/emergency/after-hours',
    silo: 'EMERGENCY'
  },

  // CORE PAGES
  CONTACT: {
    pattern: '/contact',
    description: 'Contact page',
    keywords: ['contact', 'get in touch'],
    example: 'https://disasterrecovery.com.au/contact',
    silo: 'CORE'
  },

  PRIVACY: {
    pattern: '/privacy',
    description: 'Privacy policy',
    keywords: ['privacy policy'],
    example: 'https://disasterrecovery.com.au/privacy',
    silo: 'LEGAL'
  },

  TERMS: {
    pattern: '/terms',
    description: 'Terms of service',
    keywords: ['terms of service'],
    example: 'https://disasterrecovery.com.au/terms',
    silo: 'LEGAL'
  }
};

// CANONICALIZATION RULES
export const CANONICAL_RULES: Record<string, CanonicalMapping[]> = {
  DUPLICATES: [
    {
      url: '/services/water-damage-restoration',
      canonical: '/services/water-damage',
      reason: 'URL consolidation for consistency'
    },
    {
      url: '/services/fire-damage-restoration',
      canonical: '/services/fire-damage',
      reason: 'URL consolidation for consistency'
    },
    {
      url: '/services/mould-remediation-services',
      canonical: '/services/mould-remediation',
      reason: 'URL consolidation for consistency'
    }
  ],
  PARAMETER_VARIATIONS: [
    {
      url: '/services/water-damage?utm_source=google',
      canonical: '/services/water-damage',
      reason: 'Remove tracking parameters'
    },
    {
      url: '/services/water-damage?sort=priority',
      canonical: '/services/water-damage',
      reason: 'Remove filter parameters'
    }
  ],
  PROTOCOL_VARIATIONS: [
    {
      url: 'http://disasterrecovery.com.au/services/water-damage',
      canonical: 'https://disasterrecovery.com.au/services/water-damage',
      reason: 'Force HTTPS'
    }
  ],
  WWW_VARIATIONS: [
    {
      url: 'https://www.disasterrecovery.com.au/services/water-damage',
      canonical: 'https://disasterrecovery.com.au/services/water-damage',
      reason: 'Non-www standard'
    }
  ]
};

// URL OPTIMIZATION BEST PRACTICES
export const URL_BEST_PRACTICES = {
  GENERAL: {
    maxLength: 75,
    separators: 'hyphens',
    lowercase: true,
    removeStopWords: false,
    meaningfulSegments: true,
    avoidParameters: true,
    avoidDynamicParameters: true,
    consistency: 'critical'
  },
  SERVICE_PAGES: {
    pattern: '/services/[service-category]/[specific-service]',
    maxDepth: 3,
    keywordIncluded: true,
    slugFormat: 'kebab-case'
  },
  GUIDE_PAGES: {
    pattern: '/guides/[category]/[specific-topic]',
    maxDepth: 3,
    keywordIncluded: true,
    slugFormat: 'kebab-case'
  },
  SERVICE_AREAS: {
    pattern: '/service-areas/[location]',
    maxDepth: 2,
    keywordIncluded: true,
    slugFormat: 'kebab-case'
  }
};

/**
 * Get URL pattern by key
 */
export function getURLPattern(key: keyof typeof URL_STRUCTURE): URLPattern | null {
  return URL_STRUCTURE[key] || null;
}

/**
 * Get all URL patterns
 */
export function getAllURLPatterns(): URLPattern[] {
  return Object.values(URL_STRUCTURE);
}

/**
 * Get canonical URL for a given path
 */
export function getCanonicalURL(path: string): string {
  const baseURL = 'https://disasterrecovery.com.au';

  // Check against canonical rules
  for (const mappings of Object.values(CANONICAL_RULES)) {
    for (const mapping of mappings) {
      if (path === mapping.url) {
        return baseURL + mapping.canonical;
      }
    }
  }

  // Default: return the path as-is
  return baseURL + path;
}

/**
 * Validate URL structure
 */
export function validateURLStructure(url: string): {
  valid: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  // Check length
  if (url.length > URL_BEST_PRACTICES.GENERAL.maxLength) {
    issues.push(`URL exceeds max length of ${URL_BEST_PRACTICES.GENERAL.maxLength} characters`);
  }

  // Check for uppercase letters
  if (url !== url.toLowerCase()) {
    issues.push('URL contains uppercase letters');
  }

  // Check for spaces
  if (url.includes(' ')) {
    issues.push('URL contains spaces');
  }

  // Check for special characters (except hyphens and slashes)
  if (!/^[a-z0-9\-/]+$/.test(url)) {
    issues.push('URL contains special characters');
  }

  return {
    valid: issues.length === 0,
    issues
  };
}

export default {
  URL_STRUCTURE,
  CANONICAL_RULES,
  URL_BEST_PRACTICES,
  getURLPattern,
  getAllURLPatterns,
  getCanonicalURL,
  validateURLStructure
};
