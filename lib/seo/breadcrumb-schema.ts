/**
 * Breadcrumb Schema Generator - BreadcrumbList JSON-LD
 * Implements breadcrumb navigation with structured data
 */

export interface BreadcrumbItem {
  position: number;
  name: string;
  item?: string;
}

export interface BreadcrumbListSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: BreadcrumbItem[];
}

const BASE_URL = 'https://disasterrecovery.com.au';

export function generateBreadcrumbSchema(
  breadcrumbs: string[],
  currentPath: string
): BreadcrumbListSchema {
  const items: BreadcrumbItem[] = breadcrumbs.map((name, index) => {
    const position = index + 1;
    let item: string | undefined;

    // Generate URL from breadcrumb path
    if (index === 0) {
      item = BASE_URL;
    } else if (index === breadcrumbs.length - 1) {
      item = `${BASE_URL}${currentPath}`;
    } else {
      // Generate intermediate path
      const pathParts = currentPath.split('/').filter(Boolean);
      const intermediateIndex = Math.floor((index / breadcrumbs.length) * pathParts.length);
      const intermediatePath = '/' + pathParts.slice(0, intermediateIndex + 1).join('/');
      item = `${BASE_URL}${intermediatePath}`;
    }

    return {
      position,
      name,
      item
    };
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items
  };
}

// Pre-configured breadcrumb paths for all main pages
export const BREADCRUMB_PATHS: Record<string, { items: BreadcrumbItem[]; title: string }> = {
  '/': {
    title: 'Home',
    items: []
  },
  '/services': {
    title: 'Services',
    items: [
      { position: 1, name: 'Home', item: BASE_URL },
      { position: 2, name: 'Services', item: `${BASE_URL}/services` }
    ]
  },
  '/services/water-damage': {
    title: 'Water Damage Restoration',
    items: [
      { position: 1, name: 'Home', item: BASE_URL },
      { position: 2, name: 'Services', item: `${BASE_URL}/services` },
      { position: 3, name: 'Water Damage Restoration', item: `${BASE_URL}/services/water-damage` }
    ]
  },
  '/services/water-damage/burst-pipes': {
    title: 'Burst Pipes Water Damage',
    items: [
      { position: 1, name: 'Home', item: BASE_URL },
      { position: 2, name: 'Services', item: `${BASE_URL}/services` },
      { position: 3, name: 'Water Damage Restoration', item: `${BASE_URL}/services/water-damage` },
      { position: 4, name: 'Burst Pipes', item: `${BASE_URL}/services/water-damage/burst-pipes` }
    ]
  },
  '/services/water-damage/ceiling-water-damage': {
    title: 'Ceiling Water Damage',
    items: [
      { position: 1, name: 'Home', item: BASE_URL },
      { position: 2, name: 'Services', item: `${BASE_URL}/services` },
      { position: 3, name: 'Water Damage Restoration', item: `${BASE_URL}/services/water-damage` },
      { position: 4, name: 'Ceiling Water Damage', item: `${BASE_URL}/services/water-damage/ceiling-water-damage` }
    ]
  },
  '/services/water-damage/roof-leak-damage': {
    title: 'Roof Leak Damage',
    items: [
      { position: 1, name: 'Home', item: BASE_URL },
      { position: 2, name: 'Services', item: `${BASE_URL}/services` },
      { position: 3, name: 'Water Damage Restoration', item: `${BASE_URL}/services/water-damage` },
      { position: 4, name: 'Roof Leak Damage', item: `${BASE_URL}/services/water-damage/roof-leak-damage` }
    ]
  },
  '/services/fire-damage': {
    title: 'Fire Damage Restoration',
    items: [
      { position: 1, name: 'Home', item: BASE_URL },
      { position: 2, name: 'Services', item: `${BASE_URL}/services` },
      { position: 3, name: 'Fire Damage Restoration', item: `${BASE_URL}/services/fire-damage` }
    ]
  },
  '/services/fire-damage/smoke-odour-removal': {
    title: 'Smoke Odour Removal',
    items: [
      { position: 1, name: 'Home', item: BASE_URL },
      { position: 2, name: 'Services', item: `${BASE_URL}/services` },
      { position: 3, name: 'Fire Damage Restoration', item: `${BASE_URL}/services/fire-damage` },
      { position: 4, name: 'Smoke Odour Removal', item: `${BASE_URL}/services/fire-damage/smoke-odour-removal` }
    ]
  },
  '/services/mould-remediation': {
    title: 'Mould Remediation',
    items: [
      { position: 1, name: 'Home', item: BASE_URL },
      { position: 2, name: 'Services', item: `${BASE_URL}/services` },
      { position: 3, name: 'Mould Remediation', item: `${BASE_URL}/services/mould-remediation` }
    ]
  },
  '/services/mould-remediation/black-mould-removal': {
    title: 'Black Mould Removal',
    items: [
      { position: 1, name: 'Home', item: BASE_URL },
      { position: 2, name: 'Services', item: `${BASE_URL}/services` },
      { position: 3, name: 'Mould Remediation', item: `${BASE_URL}/services/mould-remediation` },
      { position: 4, name: 'Black Mould Removal', item: `${BASE_URL}/services/mould-remediation/black-mould-removal` }
    ]
  },
  '/services/storm-damage': {
    title: 'Storm Damage Restoration',
    items: [
      { position: 1, name: 'Home', item: BASE_URL },
      { position: 2, name: 'Services', item: `${BASE_URL}/services` },
      { position: 3, name: 'Storm Damage Restoration', item: `${BASE_URL}/services/storm-damage` }
    ]
  },
  '/services/commercial': {
    title: 'Commercial Restoration',
    items: [
      { position: 1, name: 'Home', item: BASE_URL },
      { position: 2, name: 'Services', item: `${BASE_URL}/services` },
      { position: 3, name: 'Commercial Restoration', item: `${BASE_URL}/services/commercial` }
    ]
  },
  '/about-phil-mcgurk': {
    title: 'Phill McGurk - Master Restorer',
    items: [
      { position: 1, name: 'Home', item: BASE_URL },
      { position: 2, name: 'About', item: `${BASE_URL}/about-phil-mcgurk` }
    ]
  },
  '/service-areas': {
    title: 'Service Areas',
    items: [
      { position: 1, name: 'Home', item: BASE_URL },
      { position: 2, name: 'Service Areas', item: `${BASE_URL}/service-areas` }
    ]
  },
  '/insurance-claims': {
    title: 'Insurance Claims Assistance',
    items: [
      { position: 1, name: 'Home', item: BASE_URL },
      { position: 2, name: 'Insurance Claims', item: `${BASE_URL}/insurance-claims` }
    ]
  },
  '/emergency-guide': {
    title: 'Emergency Guide',
    items: [
      { position: 1, name: 'Home', item: BASE_URL },
      { position: 2, name: 'Emergency Guide', item: `${BASE_URL}/emergency-guide` }
    ]
  },
  '/faq': {
    title: 'FAQ',
    items: [
      { position: 1, name: 'Home', item: BASE_URL },
      { position: 2, name: 'FAQ', item: `${BASE_URL}/faq` }
    ]
  },
  '/contact': {
    title: 'Contact Us',
    items: [
      { position: 1, name: 'Home', item: BASE_URL },
      { position: 2, name: 'Contact', item: `${BASE_URL}/contact` }
    ]
  },
  '/guides/water-damage': {
    title: 'Water Damage Guides',
    items: [
      { position: 1, name: 'Home', item: BASE_URL },
      { position: 2, name: 'Guides', item: `${BASE_URL}/guides` },
      { position: 3, name: 'Water Damage', item: `${BASE_URL}/guides/water-damage` }
    ]
  },
  '/guides/fire-damage': {
    title: 'Fire Damage Guides',
    items: [
      { position: 1, name: 'Home', item: BASE_URL },
      { position: 2, name: 'Guides', item: `${BASE_URL}/guides` },
      { position: 3, name: 'Fire Damage', item: `${BASE_URL}/guides/fire-damage` }
    ]
  },
  '/guides/mould': {
    title: 'Mould Guides',
    items: [
      { position: 1, name: 'Home', item: BASE_URL },
      { position: 2, name: 'Guides', item: `${BASE_URL}/guides` },
      { position: 3, name: 'Mould', item: `${BASE_URL}/guides/mould` }
    ]
  },
  '/guides/storm-damage': {
    title: 'Storm Damage Guides',
    items: [
      { position: 1, name: 'Home', item: BASE_URL },
      { position: 2, name: 'Guides', item: `${BASE_URL}/guides` },
      { position: 3, name: 'Storm Damage', item: `${BASE_URL}/guides/storm-damage` }
    ]
  },
  '/insurance': {
    title: 'Insurance Partners',
    items: [
      { position: 1, name: 'Home', item: BASE_URL },
      { position: 2, name: 'Insurance Partners', item: `${BASE_URL}/insurance` }
    ]
  }
};

/**
 * Get breadcrumb schema for a given path
 */
export function getBreadcrumbSchemaForPath(path: string): BreadcrumbListSchema | null {
  const breadcrumb = BREADCRUMB_PATHS[path];
  if (!breadcrumb || breadcrumb.items.length === 0) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumb.items
  };
}

/**
 * Generate breadcrumb HTML for navigation
 */
export function generateBreadcrumbHTML(
  items: BreadcrumbItem[],
  className: string = 'breadcrumb'
): string {
  const itemsHTML = items
    .map((item, index) => {
      if (index === items.length - 1) {
        return `<span class="${className}__current">${item.name}</span>`;
      }
      return `<a href="${item.item}" class="${className}__link">${item.name}</a>`;
    })
    .join(`<span class="${className}__separator">/</span>`);

  return `<nav class="${className}" aria-label="Breadcrumb">${itemsHTML}</nav>`;
}

export default {
  generateBreadcrumbSchema,
  getBreadcrumbSchemaForPath,
  generateBreadcrumbHTML,
  BREADCRUMB_PATHS
};
