import type { Metadata } from 'next';

// Brisbane-focused SEO keywords and location data
const BRISBANE_KEYWORDS = {
  primary: [
    'disaster recovery brisbane',
    'water damage restoration brisbane',
    'fire damage restoration brisbane',
    'emergency restoration brisbane',
    'mould remediation brisbane',
    'flood cleanup brisbane',
    'storm damage repair brisbane',
    'emergency response brisbane',
    'master restorer brisbane',
    'iicrc certified brisbane'
  ],
  secondary: [
    'ipswich restoration services',
    'logan flood recovery',
    'master restorer queensland',
    'certified disaster recovery',
    'insurance approved restoration',
    '24/7 emergency services',
    'rapid response restoration',
    'commercial water damage',
    'residential fire damage',
    'professional mould removal'
  ],
  locations: {
    brisbane: ['Hamilton', 'Ascot', 'New Farm', 'Toowong', 'CBD', 'Fortitude Valley', 'Milton', 'West End'],
    ipswich: ['Karalee', 'Brookwater', 'Springfield Lakes', 'Ipswich CBD'],
    logan: ['Logan Central', 'Springwood', 'Shailer Park', 'Meadowbrook']
  }
};

// Power words and emotional triggers for click-through optimization
const POWER_WORDS = {
  urgency: ['Emergency', 'Immediate', 'Urgent', 'Critical', 'Now', 'ASAP', 'Rapid'],
  trust: ['Master Restorer', 'Certified', 'Trusted', 'Professional', 'Expert', 'Verified'],
  benefit: ['Restore', 'Recover', 'Protect', 'Save', 'Prevent', 'Preserve', 'Guarantee'],
  action: ['Call Now', 'Get Help', 'Start Today', 'Book Free', 'Discover', 'Learn How']
};

// Character limits for optimal display
const CHAR_LIMITS = {
  titleTagDesktop: 60,
  titleTagMobile: 50,
  metaDescriptionOptimal: 155,
  metaDescriptionMax: 165,
  urlMaxLength: 60,
  h1MaxLength: 100
};

// Pixel-based title tag limits (varies by browser)
const PIXEL_LIMITS = {
  desktop: 600,
  mobile: 400
};

interface MetaOptimizationOptions {
  path: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  location?: string;
  service?: string;
  type: 'home' | 'service' | 'location' | 'guide' | 'faq' | 'insurance' | 'emergency';
  includes?: {
    powerWord?: string;
    number?: number;
    year?: number;
  };
}

interface OptimizedMeta {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  openGraph: {
    title: string;
    description: string;
    type: string;
    url: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
  };
  robots: {
    index: boolean;
    follow: boolean;
  };
  hreflang?: Array<{
    lang: string;
    href: string;
  }>;
  alternates?: {
    canonical: string;
  };
}

/**
 * Optimize title tag with power words and keyword placement
 * Rules: Primary keyword in first 30 chars, power word, under 60 chars
 */
export function optimizeTitle(
  primaryKeyword: string,
  powerWord: string,
  suffix: string = '| Brisbane Emergency',
  maxChars: number = 60
): string {
  let title = '';

  // Strategy: Primary keyword first, power word, then suffix
  const baseTitle = `${primaryKeyword} - ${powerWord}`;

  if (baseTitle.length <= maxChars) {
    title = baseTitle;
  } else {
    // Fallback: keyword + power word only
    title = `${primaryKeyword} ${powerWord}`;

    if (title.length > maxChars) {
      // Emergency truncation
      title = primaryKeyword.substring(0, maxChars);
    }
  }

  return title;
}

/**
 * Optimize meta description with natural keyword integration
 * Rules: 155-160 chars, action verb, benefit, CTA, natural keyword placement
 */
export function optimizeDescription(
  benefit: string,
  keyword: string,
  location: string = 'Brisbane',
  cta: string = 'Call now',
  maxChars: number = 160
): string {
  const actionVerbs = ['Get', 'Discover', 'Access', 'Experience', 'Receive', 'Unlock'];
  const verb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];

  let description = `${verb} professional ${keyword} in ${location}. ${benefit} ${cta} for 60-minute emergency response.`;

  // Trim if exceeds max
  if (description.length > maxChars) {
    description = `${description.substring(0, maxChars - 3)  }...`;
  }

  // Pad to optimal 155-160 if under
  if (description.length < 155) {
    description += ' IICRC certified specialists available 24/7.';
  }

  return description.substring(0, maxChars);
}

/**
 * Generate keyword array with location variants
 */
export function generateKeywords(
  primary: string,
  secondary: string[],
  location: string = 'Brisbane'
): string[] {
  return [
    primary,
    `${primary} ${location}`,
    `${primary} Ipswich`,
    `${primary} Logan`,
    ...secondary,
    `${location} restoration`,
    'Master Restorer',
    'emergency response',
    'IICRC certified',
    'insurance approved',
    '24/7 available'
  ];
}

/**
 * Create SEO-optimized canonical URL
 */
export function createCanonical(path: string): string {
  const baseUrl = 'https://disasterrecovery.com.au';
  // Remove trailing slash for consistency
  const cleanPath = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Generate hreflang tags for location variants
 */
export function generateHreflang(path: string): Array<{ lang: string; href: string }> {
  return [
    { lang: 'en-AU', href: createCanonical(path) },
    { lang: 'en', href: createCanonical(path) },
    { lang: 'x-default', href: createCanonical(path) }
  ];
}

/**
 * Main optimization function - returns complete meta package
 */
export function optimizeMeta(options: MetaOptimizationOptions): OptimizedMeta {
  const {
    path,
    primaryKeyword,
    secondaryKeywords,
    location = 'Brisbane',
    service,
    type,
    includes = {}
  } = options;

  // Build title
  const powerWord = includes.powerWord || POWER_WORDS.urgency[0];
  const title = optimizeTitle(primaryKeyword, powerWord);

  // Build description
  const benefit = service
    ? `Professional ${service} services using advanced equipment and IICRC S500 standards.`
    : `Expert disaster recovery and restoration services from Master Restorer specialists.`;

  const description = optimizeDescription(
    benefit,
    primaryKeyword,
    location,
    'Call now'
  );

  // Build keywords
  const keywords = generateKeywords(primaryKeyword, secondaryKeywords, location);

  // Build canonical
  const canonical = createCanonical(path);

  // Build open graph
  const ogTitle = `${primaryKeyword} - 24/7 Emergency ${location}`;
  const ogDescription = description;

  // Build hreflang
  const hreflang = generateHreflang(path);

  return {
    title,
    description,
    keywords,
    canonical,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: 'website',
      url: canonical
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle.substring(0, 70),
      description: description.substring(0, 160)
    },
    robots: {
      index: true,
      follow: true
    },
    hreflang,
    alternates: {
      canonical
    }
  };
}

/**
 * Convert optimized meta to Next.js Metadata object
 */
export function toNextMetadata(optimized: OptimizedMeta, imageUrl?: string): Metadata {
  return {
    title: optimized.title,
    description: optimized.description,
    keywords: optimized.keywords.join(', '),
    alternates: {
      canonical: optimized.canonical,
      languages: {
        'en-AU': optimized.canonical,
        'en': optimized.canonical
      }
    },
    openGraph: {
      title: optimized.openGraph.title,
      description: optimized.openGraph.description,
      url: optimized.openGraph.url,
      siteName: 'Disaster Recovery Brisbane',
      type: 'website',
      locale: 'en_AU',
      images: imageUrl ? [{
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: optimized.openGraph.title
      }] : []
    },
    twitter: {
      card: optimized.twitter.card,
      title: optimized.twitter.title,
      description: optimized.twitter.description,
      images: imageUrl ? [imageUrl] : []
    },
    robots: {
      index: optimized.robots.index,
      follow: optimized.robots.follow,
      googleBot: {
        index: optimized.robots.index,
        follow: optimized.robots.follow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    }
  };
}

/**
 * Service-specific metadata templates
 */
export const serviceMetaTemplates = {
  waterDamage: {
    title: 'Water Damage Restoration Brisbane - 60-Min Emergency',
    description: 'Master Restorer water extraction & structural drying across Brisbane, Ipswich, Logan. IICRC S500 certified. 24/7 response.',
    keywords: ['water damage brisbane', 'flood cleanup', 'water extraction', 'structural drying'],
    powerWord: 'Emergency'
  },
  fireDamage: {
    title: 'Fire & Smoke Damage Restoration - Brisbane Certified',
    description: 'Professional fire damage cleanup and smoke odour removal by IICRC certified Master Restorer. Available 24/7.',
    keywords: ['fire damage brisbane', 'smoke damage', 'fire restoration', 'soot cleanup'],
    powerWord: 'Immediate'
  },
  mould: {
    title: 'Mould Removal & Remediation Brisbane - Health Safe',
    description: 'IICRC certified mould remediation protecting your family health. Same-day assessment in Brisbane, Ipswich, Logan.',
    keywords: ['mould removal brisbane', 'mould remediation', 'black mould', 'professional mould'],
    powerWord: 'Professional'
  },
  storm: {
    title: 'Storm Damage Repair Brisbane - Rapid Response',
    description: 'Emergency storm and cyclone damage assessment. Master Restorer provides board-up, tarping, and restoration services.',
    keywords: ['storm damage brisbane', 'cyclone damage', 'hail damage', 'roof repair'],
    powerWord: 'Rapid'
  },
  commercial: {
    title: 'Commercial Water Damage & Restoration - Brisbane',
    description: 'Minimize business downtime with rapid commercial restoration. IICRC certified teams. Insurance approved.',
    keywords: ['commercial water damage', 'office restoration', 'retail flood recovery'],
    powerWord: 'Minimize'
  }
};

/**
 * Location-specific metadata templates
 */
export const locationMetaTemplates = {
  hamilton: {
    title: 'Water Damage Restoration Hamilton - 60 Min Response',
    description: 'Emergency water damage restoration for Hamilton properties. Master Restorer serves exclusive Brisbane suburb. 24/7 available.',
    keywords: ['water damage hamilton', 'hamilton restoration', 'hamilton flood']
  },
  ascot: {
    title: 'Fire & Water Damage Restoration Ascot - 60 Min',
    description: 'Ascot disaster recovery specialist. Master Restorer handles water, fire, storm damage in prestigious Brisbane location.',
    keywords: ['water damage ascot', 'fire damage ascot', 'ascot restoration']
  },
  karalee: {
    title: 'Water Damage Restoration Karalee - Ipswich Expert',
    description: 'Karalee flood cleanup and restoration. Master Restorer Ipswich specialist. Insurance approved, 24/7 emergency response.',
    keywords: ['water damage karalee', 'karalee flood', 'karalee restoration']
  }
};

/**
 * Validation function - checks metadata meets all requirements
 */
export function validateMeta(meta: OptimizedMeta): {
  isValid: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  // Title validation
  if (meta.title.length > CHAR_LIMITS.titleTagDesktop) {
    issues.push(`Title exceeds ${CHAR_LIMITS.titleTagDesktop} chars: ${meta.title.length}`);
  }
  if (meta.title.length < 30) {
    issues.push('Title too short (min 30 chars)');
  }

  // Description validation
  if (meta.description.length > CHAR_LIMITS.metaDescriptionMax) {
    issues.push(`Description exceeds ${CHAR_LIMITS.metaDescriptionMax} chars: ${meta.description.length}`);
  }
  if (meta.description.length < 120) {
    issues.push('Description too short (min 120 chars)');
  }

  // Keyword validation
  if (meta.keywords.length < 5) {
    issues.push('Insufficient keywords (min 5)');
  }
  if (!meta.keywords[0].toLowerCase().includes('brisbane') &&
      !meta.keywords[0].toLowerCase().includes('water') &&
      !meta.keywords[0].toLowerCase().includes('fire')) {
    issues.push('Primary keyword missing location or service type');
  }

  // URL validation
  if (meta.canonical.length > CHAR_LIMITS.urlMaxLength) {
    issues.push(`URL exceeds ${CHAR_LIMITS.urlMaxLength} chars`);
  }

  return {
    isValid: issues.length === 0,
    issues
  };
}

export const CHAR_LIMITS_EXPORT = CHAR_LIMITS;
export const BRISBANE_KEYWORDS_EXPORT = BRISBANE_KEYWORDS;
export const POWER_WORDS_EXPORT = POWER_WORDS;
