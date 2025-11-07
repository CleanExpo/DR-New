/**
 * Internal Linking Strategy - Contextual Link Optimization
 * Defines optimal internal linking clusters and contextual relationships
 */

export interface InternalLink {
  href: string;
  text: string;
  context?: string;
  anchor?: string;
}

export interface LinkingCluster {
  hub: string;
  spokes: string[];
  context: string;
}

export interface ContextualLinks {
  path: string;
  primaryLinks: InternalLink[];
  secondaryLinks?: InternalLink[];
  relatedContent?: InternalLink[];
}

// PRIMARY LINKING CLUSTERS
export const LINKING_CLUSTERS: Record<string, LinkingCluster> = {
  // WATER DAMAGE CLUSTER
  WATER_DAMAGE: {
    hub: '/services/water-damage',
    context: 'Water damage restoration and recovery',
    spokes: [
      '/services/water-damage/burst-pipes',
      '/services/water-damage/ceiling-water-damage',
      '/services/water-damage/roof-leak-damage',
      '/services/water-damage/dishwasher-leaks',
      '/services/water-damage/washing-machine-flooding',
      '/services/water-damage/hot-water-system-burst',
      '/services/water-damage/shower-leaks',
      '/services/water-damage/toilet-overflow'
    ]
  },

  // FIRE DAMAGE CLUSTER
  FIRE_DAMAGE: {
    hub: '/services/fire-damage',
    context: 'Fire damage restoration and smoke cleanup',
    spokes: [
      '/services/fire-damage/bushfire-smoke-damage',
      '/services/fire-damage/electrical-fire-damage',
      '/services/fire-damage/kitchen-fire-damage',
      '/services/fire-damage/smoke-odour-removal',
      '/services/fire-damage/soot-damage-cleanup',
      '/services/fire-damage/structural-fire-damage',
      '/services/fire-damage/commercial-fire-damage'
    ]
  },

  // MOULD REMEDIATION CLUSTER
  MOULD_REMEDIATION: {
    hub: '/services/mould-remediation',
    context: 'Mould removal and remediation',
    spokes: [
      '/services/mould-remediation/bathroom-mould',
      '/services/mould-remediation/black-mould-removal',
      '/services/mould-remediation/commercial-mould',
      '/services/mould-remediation/hvac-mould'
    ]
  },

  // STORM DAMAGE CLUSTER
  STORM_DAMAGE: {
    hub: '/services/storm-damage',
    context: 'Storm damage restoration',
    spokes: [
      '/services/storm-damage/cyclone-damage',
      '/services/storm-damage/hail-damage-repair',
      '/services/storm-damage/wind-damage-repair',
      '/services/storm-damage/tree-damage-cleanup',
      '/services/storm-damage/flood-damage-restoration'
    ]
  },

  // COMMERCIAL SERVICES CLUSTER
  COMMERCIAL: {
    hub: '/services/commercial',
    context: 'Commercial property restoration',
    spokes: [
      '/services/commercial-services/office-water-damage',
      '/services/commercial-services/retail-flood-damage',
      '/services/commercial-services/hotel-flood-recovery',
      '/services/commercial-services/factory-water-damage',
      '/services/commercial-services/hospital-water-damage',
      '/services/commercial-services/restaurant-water-damage',
      '/services/commercial-services/warehouse-flooding',
      '/services/commercial-services/school-water-damage'
    ]
  },

  // SERVICE AREAS CLUSTER
  SERVICE_AREAS: {
    hub: '/service-areas',
    context: 'Local service coverage areas',
    spokes: [
      '/service-areas/brisbane',
      '/service-areas/ipswich',
      '/service-areas/logan'
    ]
  },

  // EMERGENCY SERVICES CLUSTER
  EMERGENCY: {
    hub: '/services/emergency-services',
    context: '24/7 emergency response',
    spokes: [
      '/services/emergency-services/24-hour-water-extraction',
      '/services/emergency-services/after-hours-response',
      '/services/emergency-services/disaster-response',
      '/services/emergency-services/emergency-board-up',
      '/services/emergency-services/emergency-drying',
      '/services/emergency-services/emergency-sanitization'
    ]
  }
};

// PAGE-SPECIFIC INTERNAL LINKING STRATEGY
export const PAGE_LINKING_STRATEGY: Record<string, ContextualLinks> = {
  // HOME PAGE
  '/': {
    path: '/',
    primaryLinks: [
      {
        href: '/services',
        text: 'View All Services',
        context: 'Main services hub',
        anchor: 'services-section'
      },
      {
        href: '/about-phil-mcgurk',
        text: 'About Phill McGurk',
        context: 'Master Restorer credentials',
        anchor: 'about-section'
      },
      {
        href: '/service-areas',
        text: 'Service Areas',
        context: 'Coverage information',
        anchor: 'coverage-section'
      },
      {
        href: '/emergency-guide',
        text: 'Emergency Guide',
        context: 'Immediate response actions',
        anchor: 'guide-section'
      }
    ],
    secondaryLinks: [
      {
        href: '/insurance-claims',
        text: 'Insurance Claims Assistance',
        context: 'Claims support'
      },
      {
        href: '/contact',
        text: 'Contact Us',
        context: 'Get in touch'
      }
    ]
  },

  // SERVICES HUB
  '/services': {
    path: '/services',
    primaryLinks: [
      {
        href: '/services/water-damage',
        text: 'Water Damage Restoration',
        context: 'Primary service offering'
      },
      {
        href: '/services/fire-damage',
        text: 'Fire Damage Restoration',
        context: 'Primary service offering'
      },
      {
        href: '/services/mould-remediation',
        text: 'Mould Remediation',
        context: 'Primary service offering'
      },
      {
        href: '/services/storm-damage',
        text: 'Storm Damage Restoration',
        context: 'Primary service offering'
      },
      {
        href: '/services/commercial',
        text: 'Commercial Restoration',
        context: 'Commercial services'
      }
    ],
    secondaryLinks: [
      {
        href: '/services/emergency-services',
        text: '24/7 Emergency Response',
        context: 'Emergency services cluster'
      },
      {
        href: '/services/sewage-cleanup',
        text: 'Sewage Cleanup',
        context: 'Specialized services'
      },
      {
        href: '/services/biohazard-cleaning',
        text: 'Biohazard Cleaning',
        context: 'Specialized services'
      }
    ]
  },

  // WATER DAMAGE HUB
  '/services/water-damage': {
    path: '/services/water-damage',
    primaryLinks: [
      {
        href: '/services/water-damage/burst-pipes',
        text: 'Burst Pipes Repair',
        context: 'Common water damage issue'
      },
      {
        href: '/services/water-damage/ceiling-water-damage',
        text: 'Ceiling Water Damage',
        context: 'Common water damage issue'
      },
      {
        href: '/services/water-damage/roof-leak-damage',
        text: 'Roof Leak Repair',
        context: 'Common water damage issue'
      },
      {
        href: '/guides/water-damage',
        text: 'Water Damage Guides',
        context: 'Educational content'
      },
      {
        href: '/faq/water-damage',
        text: 'Water Damage FAQ',
        context: 'Common questions'
      }
    ],
    secondaryLinks: [
      {
        href: '/services/water-damage/dishwasher-leaks',
        text: 'Dishwasher Leaks',
        context: 'Specific water damage'
      },
      {
        href: '/services/water-damage/washing-machine-flooding',
        text: 'Washing Machine Flooding',
        context: 'Specific water damage'
      },
      {
        href: '/services/water-damage/toilet-overflow',
        text: 'Toilet Overflow',
        context: 'Specific water damage'
      },
      {
        href: '/insurance-claims',
        text: 'Insurance Claims Support',
        context: 'Coverage and claims'
      }
    ],
    relatedContent: [
      {
        href: '/services/mould-remediation',
        text: 'Mould Remediation',
        context: 'Secondary water damage concern'
      },
      {
        href: '/resources/water-damage-categories',
        text: 'Water Damage Categories',
        context: 'Technical information'
      }
    ]
  },

  // FIRE DAMAGE HUB
  '/services/fire-damage': {
    path: '/services/fire-damage',
    primaryLinks: [
      {
        href: '/services/fire-damage/smoke-odour-removal',
        text: 'Smoke Odour Removal',
        context: 'Fire damage restoration aspect'
      },
      {
        href: '/services/fire-damage/soot-damage-cleanup',
        text: 'Soot Cleanup',
        context: 'Fire damage restoration aspect'
      },
      {
        href: '/services/fire-damage/structural-fire-damage',
        text: 'Structural Repair',
        context: 'Fire damage restoration aspect'
      },
      {
        href: '/guides/fire-damage',
        text: 'Fire Damage Guides',
        context: 'Educational content'
      },
      {
        href: '/faq/fire-damage',
        text: 'Fire Damage FAQ',
        context: 'Common questions'
      }
    ],
    secondaryLinks: [
      {
        href: '/services/fire-damage/electrical-fire-damage',
        text: 'Electrical Fire Damage',
        context: 'Specific fire damage type'
      },
      {
        href: '/services/fire-damage/kitchen-fire-damage',
        text: 'Kitchen Fire Damage',
        context: 'Specific fire damage type'
      },
      {
        href: '/insurance-claims',
        text: 'Insurance Claims Support',
        context: 'Coverage and claims'
      }
    ],
    relatedContent: [
      {
        href: '/services/water-damage',
        text: 'Water Damage Restoration',
        context: 'Common secondary damage from firefighting'
      }
    ]
  },

  // MOULD REMEDIATION HUB
  '/services/mould-remediation': {
    path: '/services/mould-remediation',
    primaryLinks: [
      {
        href: '/services/mould-remediation/black-mould-removal',
        text: 'Black Mould Removal',
        context: 'Mould remediation service'
      },
      {
        href: '/services/mould-remediation/bathroom-mould',
        text: 'Bathroom Mould Treatment',
        context: 'Common mould location'
      },
      {
        href: '/guides/mould',
        text: 'Mould Prevention Guides',
        context: 'Educational content'
      },
      {
        href: '/faq/mould-removal',
        text: 'Mould Removal FAQ',
        context: 'Common questions'
      }
    ],
    secondaryLinks: [
      {
        href: '/services/mould-remediation/commercial-mould',
        text: 'Commercial Mould Solutions',
        context: 'Specific mould scenario'
      },
      {
        href: '/services/mould-remediation/hvac-mould',
        text: 'HVAC Mould Remediation',
        context: 'Specific mould location'
      }
    ],
    relatedContent: [
      {
        href: '/services/water-damage',
        text: 'Water Damage Restoration',
        context: 'Moisture control essential for mould prevention'
      }
    ]
  },

  // STORM DAMAGE HUB
  '/services/storm-damage': {
    path: '/services/storm-damage',
    primaryLinks: [
      {
        href: '/services/storm-damage/cyclone-damage',
        text: 'Cyclone Damage Restoration',
        context: 'Storm damage type'
      },
      {
        href: '/services/storm-damage/hail-damage-repair',
        text: 'Hail Damage Repair',
        context: 'Storm damage type'
      },
      {
        href: '/services/storm-damage/roof-leak-damage',
        text: 'Roof Leak Damage',
        context: 'Storm damage consequence'
      },
      {
        href: '/guides/storm-damage',
        text: 'Storm Damage Guides',
        context: 'Educational content'
      },
      {
        href: '/faq/storm-damage',
        text: 'Storm Damage FAQ',
        context: 'Common questions'
      }
    ],
    relatedContent: [
      {
        href: '/services/water-damage',
        text: 'Water Damage Restoration',
        context: 'Common secondary damage'
      },
      {
        href: '/emergency/page',
        text: 'Emergency Response',
        context: 'Storm damage requires rapid response'
      }
    ]
  },

  // COMMERCIAL SERVICES HUB
  '/services/commercial': {
    path: '/services/commercial',
    primaryLinks: [
      {
        href: '/services/commercial-services/office-water-damage',
        text: 'Office Water Damage',
        context: 'Commercial property type'
      },
      {
        href: '/services/commercial-services/retail-flood-damage',
        text: 'Retail Flood Damage',
        context: 'Commercial property type'
      },
      {
        href: '/services/commercial-services/hotel-flood-recovery',
        text: 'Hotel Flood Recovery',
        context: 'Commercial property type'
      },
      {
        href: '/services/commercial-services/factory-water-damage',
        text: 'Factory Water Damage',
        context: 'Commercial property type'
      }
    ]
  },

  // ABOUT PHIL MCGURK
  '/about-phil-mcgurk': {
    path: '/about-phil-mcgurk',
    primaryLinks: [
      {
        href: '/services',
        text: 'View Services',
        context: 'Services provided'
      },
      {
        href: '/service-areas',
        text: 'Service Areas',
        context: 'Geographic coverage'
      }
    ],
    secondaryLinks: [
      {
        href: '/contact',
        text: 'Contact Phill McGurk',
        context: 'Direct contact'
      }
    ]
  },

  // SERVICE AREAS
  '/service-areas': {
    path: '/service-areas',
    primaryLinks: [
      {
        href: '/services',
        text: 'Services Available',
        context: 'Service offerings'
      },
      {
        href: '/about-phil-mcgurk',
        text: 'About Phill McGurk',
        context: 'Local expertise'
      }
    ]
  },

  // INSURANCE CLAIMS
  '/insurance-claims': {
    path: '/insurance-claims',
    primaryLinks: [
      {
        href: '/services',
        text: 'Covered Services',
        context: 'Insurance covered services'
      },
      {
        href: '/about-phil-mcgurk',
        text: 'Insurance Approved Status',
        context: 'Certification and approval'
      },
      {
        href: '/insurance',
        text: 'Insurance Partners',
        context: 'Working relationships'
      }
    ]
  },

  // EMERGENCY GUIDE
  '/emergency-guide': {
    path: '/emergency-guide',
    primaryLinks: [
      {
        href: '/services',
        text: 'Professional Services',
        context: 'Next steps after emergency'
      },
      {
        href: '/contact',
        text: 'Contact Emergency Response',
        context: 'Get immediate help'
      }
    ]
  }
};

/**
 * Get contextual links for a specific page
 */
export function getPageLinks(path: string): ContextualLinks | null {
  return PAGE_LINKING_STRATEGY[path] || null;
}

/**
 * Get hub page for a given spoke
 */
export function getClusterHub(path: string): string | null {
  for (const cluster of Object.values(LINKING_CLUSTERS)) {
    if (cluster.spokes.includes(path)) {
      return cluster.hub;
    }
  }
  return null;
}

/**
 * Get related spokes from same cluster
 */
export function getRelatedSpokes(path: string, limit: number = 3): string[] {
  for (const cluster of Object.values(LINKING_CLUSTERS)) {
    if (cluster.spokes.includes(path)) {
      return cluster.spokes
        .filter(spoke => spoke !== path)
        .slice(0, limit);
    }
  }
  return [];
}

export default {
  LINKING_CLUSTERS,
  PAGE_LINKING_STRATEGY,
  getPageLinks,
  getClusterHub,
  getRelatedSpokes
};
