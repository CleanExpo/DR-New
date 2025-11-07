/**
 * Master SEO Configuration for Brisbane/Ipswich/Logan Disaster Recovery
 * Target: #1 Local Rankings through 2025 Algorithm Optimization
 */

export interface KeywordData {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  cpc: number;
  intent: 'transactional' | 'informational' | 'navigational' | 'commercial';
  priority: 'primary' | 'secondary' | 'longtail';
  locations: string[];
}

export interface CompetitorData {
  name: string;
  domain: string;
  strengths: string[];
  weaknesses: string[];
  targetKeywords: string[];
  backlinks: number;
  domainAuthority: number;
}

// Primary keyword research data for Brisbane/Ipswich/Logan
export const keywordResearch: KeywordData[] = [
  // PRIMARY HIGH-VALUE KEYWORDS (Brisbane Focus)
  {
    keyword: 'water damage restoration brisbane',
    searchVolume: 1900,
    difficulty: 42,
    cpc: 8.50,
    intent: 'transactional',
    priority: 'primary',
    locations: ['Brisbane', 'Hamilton', 'Ascot', 'New Farm', 'Toowong']
  },
  {
    keyword: 'emergency water damage brisbane',
    searchVolume: 720,
    difficulty: 38,
    cpc: 9.20,
    intent: 'transactional',
    priority: 'primary',
    locations: ['Brisbane']
  },
  {
    keyword: 'fire damage restoration brisbane',
    searchVolume: 880,
    difficulty: 40,
    cpc: 7.80,
    intent: 'transactional',
    priority: 'primary',
    locations: ['Brisbane']
  },
  {
    keyword: 'mould removal brisbane',
    searchVolume: 2400,
    difficulty: 45,
    cpc: 6.50,
    intent: 'commercial',
    priority: 'primary',
    locations: ['Brisbane']
  },
  {
    keyword: 'storm damage repairs brisbane',
    searchVolume: 1100,
    difficulty: 35,
    cpc: 7.20,
    intent: 'transactional',
    priority: 'primary',
    locations: ['Brisbane']
  },
  {
    keyword: 'flood restoration brisbane',
    searchVolume: 3200,
    difficulty: 48,
    cpc: 8.90,
    intent: 'transactional',
    priority: 'primary',
    locations: ['Brisbane']
  },

  // IPSWICH TARGETED KEYWORDS
  {
    keyword: 'water damage restoration ipswich',
    searchVolume: 480,
    difficulty: 28,
    cpc: 7.80,
    intent: 'transactional',
    priority: 'primary',
    locations: ['Ipswich', 'Karalee', 'Brookwater', 'Springfield Lakes']
  },
  {
    keyword: 'emergency restoration ipswich',
    searchVolume: 320,
    difficulty: 25,
    cpc: 8.20,
    intent: 'transactional',
    priority: 'primary',
    locations: ['Ipswich']
  },
  {
    keyword: 'flood cleanup ipswich',
    searchVolume: 890,
    difficulty: 30,
    cpc: 7.50,
    intent: 'transactional',
    priority: 'primary',
    locations: ['Ipswich']
  },

  // LOGAN TARGETED KEYWORDS
  {
    keyword: 'water damage restoration logan',
    searchVolume: 390,
    difficulty: 26,
    cpc: 7.60,
    intent: 'transactional',
    priority: 'primary',
    locations: ['Logan', 'Logan Central', 'Springwood', 'Shailer Park']
  },
  {
    keyword: 'emergency water damage logan',
    searchVolume: 210,
    difficulty: 22,
    cpc: 8.10,
    intent: 'transactional',
    priority: 'primary',
    locations: ['Logan']
  },

  // MASTER RESTORER BRANDED KEYWORDS
  {
    keyword: 'master restorer brisbane',
    searchVolume: 140,
    difficulty: 15,
    cpc: 5.50,
    intent: 'navigational',
    priority: 'primary',
    locations: ['Brisbane', 'Ipswich', 'Logan']
  },
  {
    keyword: 'iicrc certified restoration brisbane',
    searchVolume: 90,
    difficulty: 20,
    cpc: 6.80,
    intent: 'commercial',
    priority: 'secondary',
    locations: ['Brisbane']
  },

  // COMMERCIAL KEYWORDS
  {
    keyword: 'commercial water damage restoration brisbane',
    searchVolume: 280,
    difficulty: 35,
    cpc: 12.50,
    intent: 'commercial',
    priority: 'primary',
    locations: ['Brisbane CBD', 'Fortitude Valley', 'Milton']
  },
  {
    keyword: 'office water damage brisbane',
    searchVolume: 150,
    difficulty: 30,
    cpc: 10.20,
    intent: 'transactional',
    priority: 'secondary',
    locations: ['Brisbane']
  },

  // 24/7 EMERGENCY KEYWORDS
  {
    keyword: '24 hour water damage brisbane',
    searchVolume: 420,
    difficulty: 32,
    cpc: 9.80,
    intent: 'transactional',
    priority: 'primary',
    locations: ['Brisbane']
  },
  {
    keyword: 'after hours emergency restoration brisbane',
    searchVolume: 180,
    difficulty: 28,
    cpc: 10.50,
    intent: 'transactional',
    priority: 'secondary',
    locations: ['Brisbane', 'Ipswich', 'Logan']
  },

  // INSURANCE KEYWORDS
  {
    keyword: 'insurance water damage claims brisbane',
    searchVolume: 320,
    difficulty: 38,
    cpc: 6.20,
    intent: 'informational',
    priority: 'secondary',
    locations: ['Brisbane']
  },
  {
    keyword: 'insurance approved restoration brisbane',
    searchVolume: 210,
    difficulty: 35,
    cpc: 7.40,
    intent: 'commercial',
    priority: 'secondary',
    locations: ['Brisbane', 'Ipswich', 'Logan']
  },

  // HIGH-NET-WORTH SUBURB KEYWORDS
  {
    keyword: 'water damage restoration hamilton',
    searchVolume: 120,
    difficulty: 18,
    cpc: 9.50,
    intent: 'transactional',
    priority: 'secondary',
    locations: ['Hamilton']
  },
  {
    keyword: 'water damage restoration ascot',
    searchVolume: 90,
    difficulty: 16,
    cpc: 9.20,
    intent: 'transactional',
    priority: 'secondary',
    locations: ['Ascot']
  },
  {
    keyword: 'water damage restoration new farm',
    searchVolume: 110,
    difficulty: 17,
    cpc: 9.30,
    intent: 'transactional',
    priority: 'secondary',
    locations: ['New Farm']
  },
  {
    keyword: 'water damage restoration toowong',
    searchVolume: 95,
    difficulty: 16,
    cpc: 8.90,
    intent: 'transactional',
    priority: 'secondary',
    locations: ['Toowong']
  },

  // LONGTAIL KEYWORDS
  {
    keyword: 'emergency water extraction brisbane northside',
    searchVolume: 50,
    difficulty: 12,
    cpc: 8.50,
    intent: 'transactional',
    priority: 'longtail',
    locations: ['Brisbane North']
  },
  {
    keyword: 'burst pipe water damage restoration brisbane',
    searchVolume: 70,
    difficulty: 14,
    cpc: 9.20,
    intent: 'transactional',
    priority: 'longtail',
    locations: ['Brisbane']
  },
  {
    keyword: 'ceiling water damage repair brisbane',
    searchVolume: 140,
    difficulty: 18,
    cpc: 7.80,
    intent: 'transactional',
    priority: 'longtail',
    locations: ['Brisbane']
  },
  {
    keyword: 'carpet water damage restoration brisbane',
    searchVolume: 160,
    difficulty: 20,
    cpc: 6.90,
    intent: 'transactional',
    priority: 'longtail',
    locations: ['Brisbane']
  },
  {
    keyword: 'sewage cleanup brisbane',
    searchVolume: 280,
    difficulty: 25,
    cpc: 8.40,
    intent: 'transactional',
    priority: 'secondary',
    locations: ['Brisbane', 'Ipswich', 'Logan']
  }
];

// Competitor analysis data
export const competitors: CompetitorData[] = [
  {
    name: 'Steamatic Brisbane',
    domain: 'steamatic.com.au',
    strengths: [
      'National franchise network',
      'Strong brand recognition',
      'Multiple location pages'
    ],
    weaknesses: [
      'Generic content',
      'Slow response times',
      'No Master Restorer certification mention',
      'Weak local SEO signals'
    ],
    targetKeywords: [
      'water damage restoration brisbane',
      'fire damage restoration brisbane',
      'mould remediation brisbane'
    ],
    backlinks: 450,
    domainAuthority: 42
  },
  {
    name: 'SERVPRO Brisbane',
    domain: 'servpro.com.au',
    strengths: [
      'International brand',
      'Good content depth',
      'Insurance partnerships'
    ],
    weaknesses: [
      'US-focused content',
      'Limited local presence',
      'Poor mobile experience',
      'No Brisbane-specific landing pages'
    ],
    targetKeywords: [
      'commercial water damage brisbane',
      'disaster restoration brisbane',
      'emergency restoration services'
    ],
    backlinks: 380,
    domainAuthority: 38
  },
  {
    name: 'AllAces Cleaning & Restoration',
    domain: 'allaces.com.au',
    strengths: [
      'Local Brisbane company',
      'Good review profile',
      'Multiple service pages'
    ],
    weaknesses: [
      'Limited technical SEO',
      'No schema markup',
      'Weak content strategy',
      'No Master Restorer positioning'
    ],
    targetKeywords: [
      'mould removal brisbane',
      'flood restoration brisbane',
      'water damage brisbane'
    ],
    backlinks: 220,
    domainAuthority: 31
  }
];

// Meta title templates optimized for CTR and rankings
export const metaTitleTemplates = {
  service: (service: string, location: string) =>
    `${service} ${location} | 24/7 Master Restorer | Call 1300 309 361`,

  emergency: (service: string, location: string) =>
    `Emergency ${service} ${location} | 60-Min Response | Master Restorer`,

  location: (location: string) =>
    `${location} Water & Fire Damage Restoration | Master Restorer Phill McGurk`,

  commercial: (service: string, location: string) =>
    `Commercial ${service} ${location} | IICRC Master Restorer | Insurance Approved`,

  suburb: (suburb: string, city: string) =>
    `${suburb} Emergency Restoration | ${city} Master Restorer | 24/7 Response`
};

// Meta description templates (155-160 chars)
export const metaDescriptionTemplates = {
  service: (service: string, location: string) =>
    `Master Restorer provides 24/7 ${service.toLowerCase()} in ${location}. 60-minute emergency response. Insurance approved. IICRC certified. Call 1300 309 361 now.`,

  emergency: (service: string, location: string) =>
    `Emergency ${service.toLowerCase()} in ${location}? Master Restorer responds in 60 minutes. Available 24/7. Insurance approved. Call 1300 309 361 for immediate help.`,

  location: (location: string) =>
    `${location}'s Master Restorer for water, fire & storm damage. Phill McGurk leads 24/7 emergency response. Insurance approved. Call 1300 309 361 for fast help.`,

  commercial: (service: string, location: string) =>
    `Commercial ${service.toLowerCase()} in ${location} CBD. Master Restorer minimizes downtime. 24/7 response. Major insurance approved. Call 1300 309 361 now.`,

  suburb: (suburb: string) =>
    `${suburb} residents trust Master Restorer for emergency water & fire damage. 60-minute response. Insurance claims handled. Call 1300 309 361 anytime.`
};

// H1 optimization templates with location keywords
export const h1Templates = {
  service: (service: string, location: string) =>
    `${service} ${location} - 24/7 Master Restorer Services`,

  emergency: (service: string, location: string) =>
    `Emergency ${service} ${location} - 60 Minute Response`,

  location: (location: string) =>
    `${location} Disaster Recovery - Master Restorer Phill McGurk`,

  commercial: (service: string, location: string) =>
    `Commercial ${service} ${location} - Minimize Business Downtime`,

  suburb: (suburb: string) =>
    `${suburb} Water Damage & Fire Restoration Specialists`
};

// Content optimization guidelines
export const contentOptimization = {
  keywordDensity: {
    primary: 0.02, // 2% for primary keywords
    secondary: 0.015, // 1.5% for secondary
    longtail: 0.01 // 1% for longtail
  },

  minWordCount: {
    servicePage: 1500,
    locationPage: 1200,
    suburbPage: 800,
    blogPost: 2000
  },

  semanticKeywords: {
    waterDamage: [
      'water extraction', 'moisture removal', 'structural drying',
      'dehumidification', 'water mitigation', 'flood cleanup',
      'burst pipe', 'ceiling leak', 'wet carpet', 'water restoration'
    ],
    fireDamage: [
      'smoke damage', 'soot removal', 'fire restoration',
      'smoke odor removal', 'fire cleanup', 'thermal fogging',
      'content restoration', 'structural repairs'
    ],
    mouldRemediation: [
      'mold removal', 'black mould', 'mould inspection',
      'air quality testing', 'antimicrobial treatment',
      'moisture control', 'mould prevention', 'health hazards'
    ],
    stormDamage: [
      'roof tarping', 'tree removal', 'debris cleanup',
      'structural stabilization', 'board up services',
      'emergency repairs', 'weather damage', 'hail damage'
    ]
  },

  entities: {
    locations: [
      'Brisbane', 'Ipswich', 'Logan', 'Queensland', 'QLD',
      'Brisbane CBD', 'Fortitude Valley', 'South Bank',
      'Hamilton', 'Ascot', 'New Farm', 'Toowong',
      'Karalee', 'Brookwater', 'Springfield Lakes',
      'Logan Central', 'Springwood', 'Shailer Park'
    ],
    certifications: [
      'IICRC', 'Master Restorer', 'Institute of Inspection Cleaning and Restoration Certification',
      'Water Damage Restoration Technician',
      'Applied Structural Drying', 'Fire and Smoke Restoration Technician'
    ],
    services: [
      'emergency restoration', 'disaster recovery', 'property restoration',
      'insurance restoration', 'commercial restoration', 'residential restoration'
    ]
  }
};

// Internal linking strategy
export const internalLinkingStrategy = {
  anchorTextVariation: [
    'water damage restoration Brisbane',
    'Brisbane water damage specialists',
    'emergency water damage services',
    'Master Restorer Brisbane',
    'IICRC certified restoration',
    '24/7 emergency restoration Brisbane'
  ],

  linkDistribution: {
    homePage: 0.15, // 15% of internal links
    servicePages: 0.35, // 35% to service pages
    locationPages: 0.25, // 25% to location pages
    blogPosts: 0.15, // 15% to informational content
    contactPages: 0.10 // 10% to contact/emergency pages
  },

  contextualRelevance: {
    waterDamage: ['/services/water-damage', '/emergency/water-damage-brisbane'],
    fireDamage: ['/services/fire-damage', '/emergency/fire-damage-brisbane'],
    locations: ['/service-areas', '/locations/brisbane', '/locations/ipswich'],
    emergency: ['/emergency', '/contact', '/book-service']
  }
};

// Local SEO configuration
export const localSEOConfig = {
  nap: {
    name: 'Disaster Recovery Brisbane - Master Restorer Phill McGurk',
    address: '4/17 Tile St, Wacol, QLD 4076',
    phone: '1300 309 361',
    phoneFormatted: '+61-1300-309-361'
  },

  serviceRadius: 50, // 50km from Brisbane CBD

  geoCoordinates: {
    brisbane: { lat: -27.4705, lng: 153.0260 },
    ipswich: { lat: -27.6141, lng: 152.7594 },
    logan: { lat: -27.6393, lng: 153.1094 },
    wacol: { lat: -27.5976, lng: 152.9323 }
  },

  structuredDataTypes: [
    'LocalBusiness',
    'EmergencyService',
    'ProfessionalService',
    'Service',
    'Organization'
  ]
};

// Google Business Profile optimization
export const gmbOptimization = {
  categories: {
    primary: 'Water Damage Restoration Service',
    secondary: [
      'Fire Damage Restoration Service',
      'Emergency Restoration Service',
      'Mold Remediation Service',
      'Disaster Recovery Service'
    ]
  },

  attributes: [
    'Emergency services available',
    '24/7 availability',
    'Insurance accepted',
    'Free estimates',
    'Commercial services',
    'Residential services',
    'Certified professionals',
    'Same-day service'
  ],

  postFrequency: 'weekly',

  postTypes: [
    'offers',
    'updates',
    'events',
    'products'
  ],

  responseTime: '< 1 hour',

  photoCategories: [
    'exterior',
    'interior',
    'team',
    'equipment',
    'before/after',
    'certifications'
  ]
};

// Backlink strategy
export const backlinkStrategy = {
  targetDomains: {
    local: [
      'brisbane.qld.gov.au',
      'couriermail.com.au',
      'brisbanetimes.com.au',
      'mustdobrisbane.com',
      'visitbrisbane.com.au'
    ],
    industry: [
      'iicrc.org',
      'restoration-industry.org',
      'insurancecouncil.com.au',
      'propertycouncil.com.au'
    ],
    business: [
      'yellowpages.com.au',
      'truelocal.com.au',
      'hotfrog.com.au',
      'yelp.com.au',
      'hipages.com.au'
    ]
  },

  anchorTextDistribution: {
    branded: 0.30, // 30% branded anchors
    exact: 0.15, // 15% exact match
    partial: 0.25, // 25% partial match
    generic: 0.20, // 20% generic (click here, website)
    naked: 0.10 // 10% naked URLs
  },

  linkVelocity: 10, // Target 10 quality links per month

  contentTypes: [
    'guest posts',
    'local citations',
    'industry directories',
    'resource pages',
    'testimonials',
    'case studies'
  ]
};

// Technical SEO configuration
export const technicalSEOConfig = {
  crawlBudget: {
    priority: {
      homepage: 1.0,
      servicePages: 0.9,
      locationPages: 0.8,
      suburbPages: 0.7,
      blogPosts: 0.6,
      legalPages: 0.3
    },

    updateFrequency: {
      homepage: 'daily',
      servicePages: 'weekly',
      locationPages: 'weekly',
      suburbPages: 'monthly',
      blogPosts: 'monthly',
      legalPages: 'yearly'
    }
  },

  schemaTypes: [
    'LocalBusiness',
    'EmergencyService',
    'FAQPage',
    'BreadcrumbList',
    'Service',
    'Review',
    'AggregateRating',
    'OpeningHoursSpecification',
    'ContactPoint'
  ],

  performance: {
    targetLCP: 2.5, // Largest Contentful Paint
    targetFID: 100, // First Input Delay (ms)
    targetCLS: 0.1, // Cumulative Layout Shift
    targetTTFB: 600 // Time to First Byte (ms)
  }
};

// Featured snippet optimization
export const featuredSnippetOptimization = {
  targetQueries: [
    'what to do after water damage',
    'how long does water damage restoration take',
    'cost of water damage restoration brisbane',
    'signs of water damage',
    'emergency water damage steps',
    'insurance cover water damage',
    'mould after water damage',
    'fire damage restoration process'
  ],

  formats: {
    paragraph: {
      wordCount: 50,
      structure: 'direct-answer'
    },
    list: {
      items: '5-8',
      format: 'numbered or bulleted'
    },
    table: {
      columns: '2-4',
      rows: '3-7'
    }
  }
};

export default {
  keywordResearch,
  competitors,
  metaTitleTemplates,
  metaDescriptionTemplates,
  h1Templates,
  contentOptimization,
  internalLinkingStrategy,
  localSEOConfig,
  gmbOptimization,
  backlinkStrategy,
  technicalSEOConfig,
  featuredSnippetOptimization
};