/**
 * Footer Structure Optimization
 * Implements SEO-optimized footer with proper link organization and hierarchy
 */

export interface FooterSection {
  title: string;
  description?: string;
  links: FooterLink[];
  order: number;
}

export interface FooterLink {
  label: string;
  href: string;
  title?: string;
  rel?: string;
  isInternal: boolean;
}

// OPTIMIZED FOOTER STRUCTURE
export const FOOTER_STRUCTURE: Record<string, FooterSection> = {
  SERVICES: {
    title: 'Services',
    description: 'Professional disaster recovery and restoration services',
    order: 1,
    links: [
      {
        label: 'Water Damage Restoration',
        href: '/services/water-damage',
        title: 'Water damage restoration and recovery services',
        isInternal: true
      },
      {
        label: 'Fire Damage Restoration',
        href: '/services/fire-damage',
        title: 'Fire and smoke damage restoration',
        isInternal: true
      },
      {
        label: 'Mould Remediation',
        href: '/services/mould-remediation',
        title: 'Professional mould removal and remediation',
        isInternal: true
      },
      {
        label: 'Storm Damage Restoration',
        href: '/services/storm-damage',
        title: 'Storm and cyclone damage restoration',
        isInternal: true
      },
      {
        label: 'Commercial Restoration',
        href: '/services/commercial',
        title: 'Large-scale commercial restoration services',
        isInternal: true
      },
      {
        label: '24/7 Emergency Response',
        href: '/services/emergency-services',
        title: 'Emergency disaster response services',
        isInternal: true
      }
    ]
  },

  EXPERTISE: {
    title: 'Expertise & Credentials',
    description: 'Master Restorer credentials and professional qualifications',
    order: 2,
    links: [
      {
        label: 'Phill McGurk - Master Restorer',
        href: '/about-phil-mcgurk',
        title: 'IICRC certified Master Restorer',
        isInternal: true
      },
      {
        label: 'IICRC Certification',
        href: '/about-phil-mcgurk#iicrc',
        title: 'Institute of Inspection, Cleaning and Restoration Certification',
        isInternal: true
      }
    ]
  },

  SERVICE_AREAS: {
    title: 'Service Areas',
    description: 'Geographic coverage for disaster recovery services',
    order: 3,
    links: [
      {
        label: 'Brisbane Service Area',
        href: '/service-areas#brisbane',
        title: 'Water damage and restoration services in Brisbane',
        isInternal: true
      },
      {
        label: 'Ipswich Service Area',
        href: '/service-areas#ipswich',
        title: 'Disaster recovery services in Ipswich',
        isInternal: true
      },
      {
        label: 'Logan Service Area',
        href: '/service-areas#logan',
        title: 'Emergency restoration services in Logan',
        isInternal: true
      }
    ]
  },

  RESOURCES: {
    title: 'Resources & Guides',
    description: 'Educational content and disaster response guides',
    order: 4,
    links: [
      {
        label: 'Emergency Guide',
        href: '/emergency-guide',
        title: 'Immediate actions to take during a disaster',
        isInternal: true
      },
      {
        label: 'Water Damage Guides',
        href: '/guides/water-damage',
        title: 'Water damage restoration guides and tips',
        isInternal: true
      },
      {
        label: 'Fire Damage Guides',
        href: '/guides/fire-damage',
        title: 'Fire damage recovery and restoration guides',
        isInternal: true
      },
      {
        label: 'Mould Prevention Guides',
        href: '/guides/mould',
        title: 'Mould prevention and remediation guides',
        isInternal: true
      },
      {
        label: 'Storm Damage Guides',
        href: '/guides/storm-damage',
        title: 'Storm damage preparation and recovery guides',
        isInternal: true
      },
      {
        label: 'FAQ',
        href: '/faq',
        title: 'Frequently asked questions about disaster recovery',
        isInternal: true
      }
    ]
  },

  INSURANCE: {
    title: 'Insurance Support',
    description: 'Insurance claims assistance and partner information',
    order: 5,
    links: [
      {
        label: 'Insurance Claims Assistance',
        href: '/insurance-claims',
        title: 'Help with insurance claims process',
        isInternal: true
      },
      {
        label: 'Insurance Partners',
        href: '/insurance',
        title: 'Insurance companies we work with',
        isInternal: true
      },
      {
        label: 'Is It Covered',
        href: '/is-it-covered',
        title: 'Check if your situation is covered by insurance',
        isInternal: true
      }
    ]
  },

  COMPANY: {
    title: 'Company',
    description: 'About our company and legal information',
    order: 6,
    links: [
      {
        label: 'About Us',
        href: '/about',
        title: 'About Disaster Recovery Australia',
        isInternal: true
      },
      {
        label: 'Contact Us',
        href: '/contact',
        title: 'Get in touch with Disaster Recovery Australia',
        isInternal: true
      },
      {
        label: 'Privacy Policy',
        href: '/privacy',
        title: 'Privacy policy and data protection',
        isInternal: true
      },
      {
        label: 'Terms of Service',
        href: '/terms',
        title: 'Terms and conditions of service',
        isInternal: true
      },
      {
        label: 'Cookie Policy',
        href: '/cookies',
        title: 'Cookie policy and preferences',
        isInternal: true
      }
    ]
  }
};

/**
 * Footer SEO Features
 * List of SEO elements to include in footer
 */
export const FOOTER_SEO_FEATURES = {
  SCHEMA_MARKUP: {
    organization: true,
    localBusiness: true,
    breadcrumbList: false
  },
  INTERNAL_LINKS: {
    totalLinks: 35,
    strategy: 'Organize by topic cluster with clear hierarchy',
    avoidFooterLinks: ['Duplicate navigation', 'Too many footer-only links'],
    prioritize: ['Service pages', 'Essential guides', 'Contact information']
  },
  STRUCTURED_DATA: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Disaster Recovery Australia',
    'url': 'https://disasterrecovery.com.au',
    'logo': 'https://disasterrecovery.com.au/logo.png',
    'description': '24/7 IICRC Master Restorer disaster recovery and restoration services',
    'contact': {
      '@type': 'ContactPoint',
      'telephone': '1300309361',
      'contactType': 'Emergency Service'
    },
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '4/17 Tile St',
      'addressLocality': 'Wacol',
      'addressRegion': 'QLD',
      'postalCode': '4076',
      'addressCountry': 'AU'
    },
    'serviceArea': [
      {
        '@type': 'City',
        'name': 'Brisbane',
        'State': 'QLD'
      },
      {
        '@type': 'City',
        'name': 'Ipswich',
        'State': 'QLD'
      },
      {
        '@type': 'City',
        'name': 'Logan',
        'State': 'QLD'
      }
    ]
  },
  FOOTER_LINKS: {
    maxPerSection: 6,
    totalSections: 6,
    strategy: 'Group by topic cluster and relevance',
    accessibility: {
      ariaLabel: 'Footer navigation',
      properHeadings: true,
      listMarkup: true
    }
  }
};

/**
 * Get footer sections in order
 */
export function getFooterSections(): FooterSection[] {
  return Object.values(FOOTER_STRUCTURE).sort((a, b) => a.order - b.order);
}

/**
 * Get footer section by key
 */
export function getFooterSection(key: keyof typeof FOOTER_STRUCTURE): FooterSection | null {
  return FOOTER_STRUCTURE[key] || null;
}

/**
 * Get all footer links
 */
export function getAllFooterLinks(): FooterLink[] {
  return Object.values(FOOTER_STRUCTURE).flatMap(section => section.links);
}

/**
 * Footer Schema Markup Generation
 */
export function generateFooterSchema(...args: any[]): void {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Disaster Recovery Australia',
    'url': 'https://disasterrecovery.com.au',
    'logo': 'https://disasterrecovery.com.au/logo.png',
    'description': '24/7 IICRC Master Restorer disaster recovery and restoration services',
    'telephone': '1300309361',
    'email': 'admin@disasterrecovery.com.au',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '4/17 Tile St',
      'addressLocality': 'Wacol',
      'addressRegion': 'QLD',
      'postalCode': '4076',
      'addressCountry': 'AU'
    },
    'sameAs': [
      'https://www.facebook.com/disasterrecoveryaustralia',
      'https://www.linkedin.com/company/disaster-recovery-australia'
    ],
    'knowsAbout': [
      'Water damage restoration',
      'Fire damage restoration',
      'Mould remediation',
      'Storm damage restoration',
      'Commercial restoration',
      'Emergency response'
    ]
  };
}

/**
 * Sitemap Footer Links
 * Links for human-readable sitemap in footer
 */
export const SITEMAP_FOOTER_LINKS = {
  title: 'Sitemap',
  description: 'Complete site navigation',
  href: '/sitemap'
};

export default {
  FOOTER_STRUCTURE,
  FOOTER_SEO_FEATURES,
  getFooterSections,
  getFooterSection,
  getAllFooterLinks,
  generateFooterSchema,
  SITEMAP_FOOTER_LINKS
};
