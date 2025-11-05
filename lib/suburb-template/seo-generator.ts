/**
 * SEO Configuration Generator - Keyword & Metadata Strategy
 * Generates SEO-optimised metadata, keywords, and link strategies per suburb
 */

import { SuburbTemplate, SEOConfig, InternalLinkingMap } from './types';

const BASE_URL = 'https://dr-new-ten.vercel.app';

/**
 * Primary keyword templates by region and property type
 */
const primaryKeywordTemplates: Record<string, string[]> = {
  'water-damage': [
    '{SUBURB} water damage restoration',
    'emergency water damage {SUBURB}',
    'water damage repair {SUBURB}',
    'flood damage {SUBURB}',
    'water damage emergency {SUBURB}',
  ],
  'fire-damage': [
    '{SUBURB} fire restoration',
    'fire damage restoration {SUBURB}',
    'smoke damage {SUBURB}',
  ],
  'mould': [
    'mould remediation {SUBURB}',
    'black mould removal {SUBURB}',
    'mould damage {SUBURB}',
  ],
  'storm': [
    'storm damage {SUBURB}',
    'emergency storm repair {SUBURB}',
    'storm restoration {SUBURB}',
  ],
  'general': [
    '{SUBURB} disaster recovery',
    'emergency restoration {SUBURB}',
    '{SUBURB} property damage repair',
  ],
};

/**
 * Secondary keyword patterns
 */
const secondaryKeywordPatterns: Record<string, string[]> = {
  'inner-brisbane': [
    '24/7 emergency response {SUBURB}',
    'Master Restorer {SUBURB}',
    'certified disaster recovery {SUBURB}',
    'insurance approved restoration {SUBURB}',
    'property damage {SUBURB}',
  ],
  'outer-brisbane': [
    'fast response disaster recovery {SUBURB}',
    'family home restoration {SUBURB}',
    'reliable repair service {SUBURB}',
    'local expertise {SUBURB}',
  ],
  'ipswich': [
    'Ipswich region disaster recovery',
    'new home restoration {SUBURB}',
    'construction defect {SUBURB}',
    'builder coordination {SUBURB}',
  ],
  'logan': [
    'Logan area emergency repair',
    'commercial property damage {SUBURB}',
    'affordable restoration {SUBURB}',
  ],
  'bayside': [
    'coastal property restoration {SUBURB}',
    'storm surge damage {SUBURB}',
    'waterfront emergency {SUBURB}',
    'cyclone damage {SUBURB}',
  ],
};

/**
 * LSI (Latent Semantic Indexing) keywords
 */
const lsiKeywordPatterns = [
  'emergency {SERVICE} {SUBURB}',
  'rapid response disaster {SUBURB}',
  '{SERVICE} specialist {SUBURB}',
  '{SUBURB} property protection',
  'certified restoration {SUBURB}',
  '{DISASTER_TYPE} recovery {SUBURB}',
  'professional damage repair {SUBURB}',
  'insurance claim assistance {SUBURB}',
  'disaster mitigation {SUBURB}',
  '24/7 availability {SUBURB}',
  'master restorer expertise',
  'IICRC certified professionals',
];

/**
 * Meta description templates
 */
const metaDescriptionTemplates: Record<string, string> = {
  'standard': 'Professional disaster recovery in {SUBURB}. {SERVICE} specialists with rapid emergency response. Master Restorer certified. Available 24/7. Call 1300 309 361.',
  'luxury': 'Master Restorer specialists protecting {SUBURB}\'s {PROPERTY_TYPE} properties. Discrete, executive-level service for high-value homes. 24/7 emergency response.',
  'riverside': '{SUBURB} flood damage experts on Brisbane River. Rapid response water damage restoration. Emergency services 24/7. Riverfront specialists.',
  'commercial': 'Commercial property disaster recovery in {SUBURB}. Fast restoration for businesses. Minimal disruption service. Insurance approved.',
  'coastal': 'Coastal property experts in {SUBURB}. Storm surge and water damage specialists. Waterfront emergency response 24/7.',
};

/**
 * Generate SEO configuration for suburb
 */
export function generateSEOConfig(suburb: SuburbTemplate): SEOConfig {
  // Determine primary keyword category
  const primaryDisaster = suburb.disasterRisks[0]?.type || 'general';
  const primaryKeywords = primaryKeywordTemplates[primaryDisaster] || primaryKeywordTemplates['general'];

  const selectedPrimary = primaryKeywords[0];
  const primaryKeyword = selectedPrimary
    .replace(/{SUBURB}/g, suburb.name)
    .replace(/{REGION}/g, suburb.region);

  // Generate secondary keywords
  const secondaryKeywords = generateSecondaryKeywords(suburb);

  // Generate LSI keywords
  const lsiKeywords = generateLSIKeywords(suburb);

  // Generate meta description
  const metaDescription = generateMetaDescription(suburb);

  // Generate title variants
  const titleVariants = generateTitleVariants(suburb);

  return {
    primaryKeyword,
    secondaryKeywords,
    lsiKeywords,
    metaDescription,
    ogTitle: titleVariants.og,
    ogDescription: metaDescription,
    canonicalUrl: `${BASE_URL}/${suburb.regionParent}/${suburb.slug}`,
    structured: {
      schema: {} as any, // Will be populated by schema generator
      faqSchema: [], // Will be populated by FAQ generator
      breadcrumbs: generateBreadcrumbs(suburb),
    },
  };
}

/**
 * Generate secondary keywords for suburb
 */
function generateSecondaryKeywords(suburb: SuburbTemplate): string[] {
  const patterns = secondaryKeywordPatterns[suburb.region] || secondaryKeywordPatterns['inner-brisbane'];

  return patterns.slice(0, 5).map(pattern =>
    pattern
      .replace(/{SUBURB}/g, suburb.name)
      .replace(/{SERVICE}/g, suburb.keySpecialties[0] || 'disaster recovery')
      .replace(/{PROPERTY_TYPES}/g, suburb.demographics.primaryPropertyTypes[0] || 'property')
  );
}

/**
 * Generate LSI keywords
 */
function generateLSIKeywords(suburb: SuburbTemplate): string[] {
  const keywords: string[] = [];

  lsiKeywordPatterns.forEach(pattern => {
    if (pattern.includes('{SERVICE}')) {
      const service = suburb.keySpecialties[0]?.toLowerCase() || 'restoration';
      keywords.push(pattern.replace(/{SERVICE}/g, service).replace(/{SUBURB}/g, suburb.name));
    } else if (pattern.includes('{DISASTER_TYPE}')) {
      suburb.disasterRisks.slice(0, 2).forEach(risk => {
        keywords.push(
          pattern
            .replace(/{DISASTER_TYPE}/g, risk.type.replace('-', ' '))
            .replace(/{SUBURB}/g, suburb.name)
        );
      });
    } else {
      keywords.push(
        pattern
          .replace(/{SUBURB}/g, suburb.name)
          .replace(/{SERVICE}/g, suburb.keySpecialties[0] || 'restoration')
      );
    }
  });

  return [...new Set(keywords)].slice(0, 20); // Remove duplicates, limit to 20
}

/**
 * Generate meta description
 */
function generateMetaDescription(suburb: SuburbTemplate): string {
  // Select template based on suburb characteristics
  let templateKey = 'standard';

  if (suburb.keySpecialties.some(s => s.toLowerCase().includes('luxury'))) {
    templateKey = 'luxury';
  } else if (suburb.region === 'bayside') {
    templateKey = 'coastal';
  } else if (suburb.region === 'ipswich' || suburb.region === 'logan') {
    templateKey = 'commercial';
  }

  const template = metaDescriptionTemplates[templateKey];
  return template
    .replace(/{SUBURB}/g, suburb.name)
    .replace(/{SERVICE}/g, suburb.keySpecialties[0] || 'disaster recovery')
    .replace(/{PROPERTY_TYPE}/g, suburb.demographics.primaryPropertyTypes[0] || 'properties')
    .substring(0, 160); // Google typically displays 150-160 characters
}

/**
 * Generate title variants for A/B testing
 */
function generateTitleVariants(suburb: SuburbTemplate): {
  primary: string;
  og: string;
  twitter: string;
} {
  const primaryDisaster = suburb.disasterRisks[0]?.type.replace('-', ' ') || 'disaster recovery';
  const specialty = suburb.keySpecialties[0] || 'disaster recovery';

  return {
    primary: `${suburb.name} ${capitalize(primaryDisaster)} | ${specialty} | 24/7 Emergency Response`,
    og: `${suburb.name} Disaster Recovery | ${capitalize(specialty)} Specialists`,
    twitter: `${suburb.name} Emergency ${capitalize(primaryDisaster)} - ${specialty}`,
  };
}

/**
 * Generate breadcrumb structure
 */
function generateBreadcrumbs(suburb: SuburbTemplate): string[] {
  const regionName = getRegionDisplayName(suburb.region);
  return [
    'Home',
    regionName,
    suburb.name,
  ];
}

/**
 * Generate internal linking strategy
 */
export function generateInternalLinkingMap(
  suburb: SuburbTemplate,
  allSuburbNames: Record<string, string>
): InternalLinkingMap {
  return {
    parentRegion: `/${suburb.regionParent}`,
    relatedSuburbs: suburb.nearbySuburbs
      .slice(0, 6)
      .map(slug => ({
        name: allSuburbNames[slug] || slug,
        slug,
        reason: 'nearby suburb',
      })),
    relatedServices: [
      {
        name: 'Water Damage Restoration',
        path: '/services/water-damage-restoration',
      },
      {
        name: 'Fire Damage Restoration',
        path: '/services/fire-restoration',
      },
      {
        name: 'Mould Remediation',
        path: '/services/mould-remediation',
      },
      {
        name: 'Storm Damage Repair',
        path: '/services/storm-damage-repair',
      },
      {
        name: 'Emergency Contact',
        path: '/emergency-contact',
      },
      {
        name: 'Insurance Claims',
        path: '/insurance-claims',
      },
    ],
  };
}

/**
 * Generate XML sitemap entry
 */
export function generateSitemapEntry(suburb: SuburbTemplate): {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
} {
  return {
    loc: `${BASE_URL}/${suburb.regionParent}/${suburb.slug}`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.8, // High priority for location pages
  };
}

/**
 * Generate robots meta tags
 */
export function generateRobotsMeta(suburb: SuburbTemplate): string {
  return 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
}

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(suburb: SuburbTemplate): string {
  return `${BASE_URL}/${suburb.regionParent}/${suburb.slug}`;
}

/**
 * Generate Open Graph tags
 */
export function generateOpenGraphTags(suburb: SuburbTemplate, metaDescription: string): {
  'og:type': string;
  'og:title': string;
  'og:description': string;
  'og:url': string;
  'og:image': string;
  'og:image:alt': string;
  'og:locale': string;
  'og:site_name': string;
} {
  return {
    'og:type': 'website',
    'og:title': `${suburb.name} Disaster Recovery | Emergency Restoration Services`,
    'og:description': metaDescription,
    'og:url': generateCanonicalUrl(suburb),
    'og:image': `${BASE_URL}/images/locations/${suburb.slug}-og.jpg`,
    'og:image:alt': `${suburb.name} emergency disaster recovery services`,
    'og:locale': 'en_AU',
    'og:site_name': 'Disaster Recovery Services',
  };
}

/**
 * Generate Twitter Card tags
 */
export function generateTwitterCardTags(suburb: SuburbTemplate, metaDescription: string): {
  'twitter:card': string;
  'twitter:title': string;
  'twitter:description': string;
  'twitter:image': string;
  'twitter:creator': string;
} {
  return {
    'twitter:card': 'summary_large_image',
    'twitter:title': `Emergency in ${suburb.name}? We Help with Disaster Recovery 24/7`,
    'twitter:description': metaDescription,
    'twitter:image': `${BASE_URL}/images/locations/${suburb.slug}-twitter.jpg`,
    'twitter:creator': '@DisasterRecoveryAU',
  };
}

/**
 * Generate hreflang tags for regional variants
 */
export function generateHreflangTags(suburb: SuburbTemplate): Array<{
  rel: string;
  hrefLang: string;
  href: string;
}> {
  return [
    {
      rel: 'alternate',
      hrefLang: 'en-AU',
      href: generateCanonicalUrl(suburb),
    },
    {
      rel: 'canonical',
      hrefLang: 'x-default',
      href: generateCanonicalUrl(suburb),
    },
  ];
}

/**
 * Generate structured search query suggestions
 */
export function generateSearchQueries(suburb: SuburbTemplate): string[] {
  const queries: string[] = [
    `water damage ${suburb.name}`,
    `${suburb.name} emergency repair`,
    `fire damage ${suburb.name}`,
    `mould removal ${suburb.name}`,
    `storm damage ${suburb.name}`,
    `${suburb.name} 24/7 emergency`,
    `disaster recovery ${suburb.name}`,
    `property damage ${suburb.name}`,
  ];

  return queries;
}

/**
 * Helper: Capitalize string
 */
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Helper: Get region display name
 */
function getRegionDisplayName(region: string): string {
  const names: Record<string, string> = {
    'inner-brisbane': 'Brisbane',
    'outer-brisbane': 'Brisbane',
    'bayside': 'Brisbane Bayside',
    'riverside': 'Brisbane Riverside',
    'hills': 'Brisbane Hills',
    'ipswich': 'Ipswich',
    'logan': 'Logan',
    'central-coast': 'Central Coast',
  };

  return names[region] || 'Brisbane';
}

/**
 * Generate complete SEO package
 */
export function generateCompleteSEOPackage(
  suburb: SuburbTemplate,
  allSuburbNames: Record<string, string>
) {
  const seoConfig = generateSEOConfig(suburb);
  const internalLinks = generateInternalLinkingMap(suburb, allSuburbNames);
  const sitemapEntry = generateSitemapEntry(suburb);
  const ogTags = generateOpenGraphTags(suburb, seoConfig.metaDescription);
  const twitterTags = generateTwitterCardTags(suburb, seoConfig.metaDescription);
  const hreflangTags = generateHreflangTags(suburb);
  const searchQueries = generateSearchQueries(suburb);

  return {
    seoConfig,
    internalLinks,
    sitemapEntry,
    ogTags,
    twitterTags,
    hreflangTags,
    searchQueries,
    robotsMeta: generateRobotsMeta(suburb),
    canonicalUrl: generateCanonicalUrl(suburb),
  };
}
