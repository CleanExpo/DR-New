/**
 * Sitemap Configuration - Optimized for SEO
 * Defines priorities, change frequencies, and organization strategy
 */

export interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  images?: Array<{ loc: string; title?: string }>;
}

export interface SitemapIndex {
  name: string;
  priority: number;
  entries: SitemapEntry[];
  description: string;
}

const BASE_URL = 'https://disasterrecovery.com.au';

// SITEMAP ORGANIZATION BY PRIORITY AND CATEGORY
export const SITEMAP_INDEXES: Record<string, SitemapIndex> = {
  // CRITICAL PAGES - Priority 1.0 & 0.95
  CRITICAL: {
    name: 'Critical Pages',
    priority: 1.0,
    description: 'Core pages essential for user experience and conversions',
    entries: [
      {
        loc: `${BASE_URL}/`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'daily',
        priority: 1.0
      },
      {
        loc: `${BASE_URL}/services`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: 0.95
      },
      {
        loc: `${BASE_URL}/about-phil-mcgurk`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.95
      },
      {
        loc: `${BASE_URL}/service-areas`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.95
      },
      {
        loc: `${BASE_URL}/contact`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.9
      }
    ]
  },

  // PRIMARY SERVICE PAGES - Priority 0.95 & 0.90
  PRIMARY_SERVICES: {
    name: 'Primary Service Pages',
    priority: 0.95,
    description: 'Main service category pages',
    entries: [
      {
        loc: `${BASE_URL}/services/water-damage`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: 0.95
      },
      {
        loc: `${BASE_URL}/services/fire-damage`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: 0.95
      },
      {
        loc: `${BASE_URL}/services/mould-remediation`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: 0.95
      },
      {
        loc: `${BASE_URL}/services/storm-damage`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: 0.95
      },
      {
        loc: `${BASE_URL}/services/commercial`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: 0.9
      },
      {
        loc: `${BASE_URL}/services/emergency-services`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: 0.95
      }
    ]
  },

  // SECONDARY SERVICE PAGES - Priority 0.85
  SECONDARY_SERVICES: {
    name: 'Secondary Service Pages',
    priority: 0.85,
    description: 'Specific service variations and sub-categories',
    entries: [
      // Water Damage Sub-services
      {
        loc: `${BASE_URL}/services/water-damage/burst-pipes`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.85
      },
      {
        loc: `${BASE_URL}/services/water-damage/ceiling-water-damage`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.85
      },
      {
        loc: `${BASE_URL}/services/water-damage/roof-leak-damage`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.85
      },
      // Fire Damage Sub-services
      {
        loc: `${BASE_URL}/services/fire-damage/smoke-odour-removal`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.85
      },
      {
        loc: `${BASE_URL}/services/fire-damage/soot-damage-cleanup`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.85
      },
      // Mould Sub-services
      {
        loc: `${BASE_URL}/services/mould-remediation/black-mould-removal`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.85
      },
      {
        loc: `${BASE_URL}/services/mould-remediation/bathroom-mould`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.85
      },
      // Storm Damage Sub-services
      {
        loc: `${BASE_URL}/services/storm-damage/cyclone-damage`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.85
      },
      {
        loc: `${BASE_URL}/services/storm-damage/hail-damage-repair`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.85
      }
    ]
  },

  // COMMERCIAL SERVICES - Priority 0.85
  COMMERCIAL_SERVICES: {
    name: 'Commercial Services',
    priority: 0.85,
    description: 'Large-scale commercial restoration services',
    entries: [
      {
        loc: `${BASE_URL}/services/commercial-services/office-water-damage`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.85
      },
      {
        loc: `${BASE_URL}/services/commercial-services/retail-flood-damage`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.85
      },
      {
        loc: `${BASE_URL}/services/commercial-services/hotel-flood-recovery`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.85
      },
      {
        loc: `${BASE_URL}/services/commercial-services/factory-water-damage`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.85
      }
    ]
  },

  // INFORMATION PAGES - Priority 0.80
  INFORMATION: {
    name: 'Information Pages',
    priority: 0.80,
    description: 'Important information and support pages',
    entries: [
      {
        loc: `${BASE_URL}/insurance-claims`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.85
      },
      {
        loc: `${BASE_URL}/emergency-guide`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.85
      },
      {
        loc: `${BASE_URL}/faq`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.8
      },
      {
        loc: `${BASE_URL}/insurance`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.8
      }
    ]
  },

  // GUIDES - Priority 0.75
  GUIDES: {
    name: 'Educational Guides',
    priority: 0.75,
    description: 'How-to guides and educational content',
    entries: [
      {
        loc: `${BASE_URL}/guides/water-damage`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.8
      },
      {
        loc: `${BASE_URL}/guides/fire-damage`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.8
      },
      {
        loc: `${BASE_URL}/guides/mould`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.8
      },
      {
        loc: `${BASE_URL}/guides/storm-damage`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.8
      }
    ]
  },

  // LEGAL & POLICY PAGES - Priority 0.50
  LEGAL: {
    name: 'Legal & Policy',
    priority: 0.50,
    description: 'Legal, privacy and policy pages',
    entries: [
      {
        loc: `${BASE_URL}/privacy`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'yearly',
        priority: 0.5
      },
      {
        loc: `${BASE_URL}/terms`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'yearly',
        priority: 0.5
      },
      {
        loc: `${BASE_URL}/cookies`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'yearly',
        priority: 0.5
      }
    ]
  }
};

// PRIORITIES BY PAGE TYPE
export const PRIORITY_GUIDELINES = {
  homepage: 1.0,
  primary_service: 0.95,
  secondary_service: 0.85,
  tertiary_service: 0.80,
  guide: 0.75,
  faq: 0.70,
  insurance_partner: 0.65,
  location_page: 0.75,
  blog_post: 0.70,
  legal_page: 0.50,
  archive_page: 0.40
};

// CHANGE FREQUENCY GUIDELINES
export const CHANGE_FREQUENCY_GUIDELINES = {
  homepage: 'daily',
  service_hub: 'weekly',
  service_page: 'monthly',
  guide: 'monthly',
  faq: 'monthly',
  blog: 'weekly',
  insurance_page: 'monthly',
  location: 'monthly',
  legal: 'yearly',
  archived: 'never'
};

/**
 * Get all sitemap entries
 */
export function getAllSitemapEntries(): SitemapEntry[] {
  return Object.values(SITEMAP_INDEXES).flatMap(index => index.entries);
}

/**
 * Get sitemap entries by index
 */
export function getSitemapIndex(key: keyof typeof SITEMAP_INDEXES): SitemapIndex | null {
  return SITEMAP_INDEXES[key] || null;
}

/**
 * Generate sitemap.xml content
 */
export function generateSitemapXML(): string {
  const entries = getAllSitemapEntries();

  const urlElements = entries
    .map(entry => `
  <url>
    <loc>${entry.loc}</loc>
    ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}
    ${entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : ''}
    <priority>${entry.priority}</priority>
  </url>`)
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">
${urlElements}
</urlset>`;
}

/**
 * Get priority for a given path
 */
export function getPriorityForPath(path: string): number {
  // Home
  if (path === '/') {return PRIORITY_GUIDELINES.homepage;}

  // Primary services
  if (path.match(/^\/services\/(water-damage|fire-damage|mould-remediation|storm-damage|commercial|emergency-services)$/)) {
    return PRIORITY_GUIDELINES.primary_service;
  }

  // Secondary services
  if (path.match(/^\/services\/[^/]+\/[^/]+$/)) {
    return PRIORITY_GUIDELINES.secondary_service;
  }

  // Guides
  if (path.match(/^\/guides\//)) {
    return PRIORITY_GUIDELINES.guide;
  }

  // FAQ
  if (path === '/faq' || path.match(/^\/faq\//)) {
    return PRIORITY_GUIDELINES.faq;
  }

  // Service areas
  if (path === '/service-areas' || path.match(/^\/service-areas\//)) {
    return PRIORITY_GUIDELINES.location_page;
  }

  // Insurance
  if (path === '/insurance' || path.match(/^\/insurance\//)) {
    return PRIORITY_GUIDELINES.insurance_partner;
  }

  // Legal pages
  if (path.match(/^(\/privacy|\/terms|\/cookies)/)) {
    return PRIORITY_GUIDELINES.legal_page;
  }

  // Default
  return 0.7;
}

export default {
  SITEMAP_INDEXES,
  PRIORITY_GUIDELINES,
  CHANGE_FREQUENCY_GUIDELINES,
  getAllSitemapEntries,
  getSitemapIndex,
  generateSitemapXML,
  getPriorityForPath
};
