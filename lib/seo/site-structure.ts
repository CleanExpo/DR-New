/**
 * Site Structure Configuration - Brisbane Disaster Recovery
 * Defines header hierarchy, content silos, and information architecture
 */

export interface HeaderHierarchy {
  h1: string;
  h2: string[];
  h3?: Record<string, string[]>;
}

export interface SiteSection {
  path: string;
  title: string;
  hierarchy: HeaderHierarchy;
  keywords: string[];
  priority: number;
  parent?: string;
  silos: string[];
}

// HEADER HIERARCHY STANDARDS
export const HEADER_STANDARDS = {
  h1: {
    maxPerPage: 1,
    shouldContain: ['primary keyword', 'service type'],
    avoidDuplication: true
  },
  h2: {
    maxPerPage: 3,
    shouldContain: ['secondary keywords', 'supporting topics'],
    useVariations: true
  },
  h3: {
    maxPerPage: 6,
    shouldContain: ['LSI keywords', 'long-tail variations'],
    supportMainTopic: true
  }
};

// PRIMARY CONTENT SILOS
export const CONTENT_SILOS = {
  EMERGENCY_SERVICES: {
    name: 'Emergency Services Silo',
    root: '/emergency',
    topics: [
      '24/7 Emergency Response',
      'After-Hours Restoration',
      'Disaster Response Protocols',
      'Weekend Emergency Services'
    ],
    keywords: ['emergency restoration', 'after hours', 'disaster response', '24/7 response']
  },
  WATER_DAMAGE: {
    name: 'Water Damage Silo',
    root: '/services/water-damage',
    topics: [
      'Water Damage Restoration',
      'Burst Pipes',
      'Flooding',
      'Water Extraction',
      'Structural Drying',
      'Water Categories'
    ],
    keywords: ['water damage', 'burst pipes', 'flooding', 'water extraction', 'water categories']
  },
  FIRE_DAMAGE: {
    name: 'Fire Damage Silo',
    root: '/services/fire-damage',
    topics: [
      'Fire Damage Restoration',
      'Smoke Odour Removal',
      'Soot Cleanup',
      'Structural Fire Damage',
      'Contents Restoration'
    ],
    keywords: ['fire damage', 'smoke damage', 'soot cleanup', 'fire restoration']
  },
  MOULD_REMEDIATION: {
    name: 'Mould Remediation Silo',
    root: '/services/mould-remediation',
    topics: [
      'Mould Remediation',
      'Black Mould Removal',
      'Bathroom Mould',
      'Commercial Mould',
      'HVAC Mould',
      'Air Quality Testing'
    ],
    keywords: ['mould remediation', 'black mould', 'mould removal', 'mould prevention']
  },
  STORM_DAMAGE: {
    name: 'Storm Damage Silo',
    root: '/services/storm-damage',
    topics: [
      'Storm Damage Restoration',
      'Cyclone Damage',
      'Hail Damage',
      'Wind Damage',
      'Tree Damage Cleanup',
      'Roof Leak Repair'
    ],
    keywords: ['storm damage', 'cyclone damage', 'hail damage', 'wind damage']
  },
  COMMERCIAL_SERVICES: {
    name: 'Commercial Services Silo',
    root: '/services/commercial',
    topics: [
      'Commercial Restoration',
      'Office Water Damage',
      'Retail Flood Damage',
      'Hotel Flood Recovery',
      'Factory Water Damage',
      'Hospital Water Damage',
      'Restaurant Damage'
    ],
    keywords: ['commercial restoration', 'office water damage', 'retail flooding']
  },
  INSURANCE_CLAIMS: {
    name: 'Insurance Claims Silo',
    root: '/insurance-claims',
    topics: [
      'Insurance Claims Process',
      'Insurance Approved Contractors',
      'Loss Assessor vs Contractor',
      'Insurance Depreciation',
      'Section 54 Rights',
      'Insurance Delays'
    ],
    keywords: ['insurance claims', 'insurance approved', 'loss assessor']
  },
  SERVICE_AREAS: {
    name: 'Service Areas Silo',
    root: '/service-areas',
    topics: [
      'Brisbane Service Area',
      'Ipswich Service Area',
      'Logan Service Area',
      'High Net Worth Suburbs',
      'Commercial Areas'
    ],
    keywords: ['Brisbane water damage', 'Ipswich restoration', 'Logan services']
  },
  EXPERTISE: {
    name: 'Expertise & Credentials Silo',
    root: '/about-phil-mcgurk',
    topics: [
      'Master Restorer Certification',
      'IICRC Certification',
      'RAI Certification',
      'Industry Experience',
      'Professional Credentials'
    ],
    keywords: ['Master Restorer', 'IICRC certified', 'Phill McGurk']
  }
};

// PAGE-SPECIFIC HEADER HIERARCHIES
export const PAGE_HIERARCHIES: Record<string, HeaderHierarchy> = {
  // HOME PAGE
  '/': {
    h1: 'When Disaster Strikes Your Brisbane Home, Every Minute Counts',
    h2: [
      'Emergency Restoration Services',
      'Why Brisbane Trusts Disaster Recovery',
      'Service Areas'
    ],
    h3: {
      'Emergency Restoration Services': [
        'Water Damage Restoration',
        'Fire & Smoke Damage',
        'Mould Remediation'
      ],
      'Why Brisbane Trusts Disaster Recovery': [
        'Master Restorer Certified',
        'Insurance Approved',
        '24/7 Emergency Response',
        'Local Brisbane Team'
      ],
      'Service Areas': [
        'Brisbane',
        'Ipswich',
        'Logan'
      ]
    }
  },

  // SERVICES - MAIN
  '/services': {
    h1: 'Professional Disaster Recovery & Restoration Services Brisbane',
    h2: [
      'Water Damage Restoration',
      'Fire Damage Restoration',
      'Mould Remediation',
      'Storm Damage Restoration',
      'Commercial Restoration',
      'Emergency Response Services'
    ]
  },

  // WATER DAMAGE
  '/services/water-damage': {
    h1: 'Water Damage Restoration Brisbane - 24/7 Emergency Response',
    h2: [
      'Water Damage Categories',
      'Water Extraction & Drying',
      'Burst Pipe Repair',
      'Flood Restoration',
      'Structural Drying',
      'Prevention & Recovery'
    ],
    h3: {
      'Water Extraction & Drying': [
        'Emergency Water Extraction',
        'Industrial Drying Equipment',
        'Dehumidification Process',
        'Carpet & Flooring Drying'
      ],
      'Burst Pipe Repair': [
        'Hot Water System Bursts',
        'Supply Pipe Leaks',
        'Hidden Pipe Damage',
        'Burst Pipe Restoration'
      ]
    }
  },

  // FIRE DAMAGE
  '/services/fire-damage': {
    h1: 'Fire Damage Restoration Brisbane - Professional Smoke & Soot Cleanup',
    h2: [
      'Fire Damage Assessment',
      'Smoke Odour Removal',
      'Soot Cleanup & Cleaning',
      'Structural Fire Restoration',
      'Contents Restoration',
      'Recovery Planning'
    ],
    h3: {
      'Smoke Odour Removal': [
        'Thermal Fogging',
        'Ozone Treatment',
        'Carbon Filters',
        'Long-term Odour Solutions'
      ],
      'Structural Fire Restoration': [
        'Structural Assessment',
        'Water Damage from Firefighting',
        'Electrical Safety',
        'Building Code Compliance'
      ]
    }
  },

  // MOULD REMEDIATION
  '/services/mould-remediation': {
    h1: 'Mould Remediation Brisbane - Professional Black Mould Removal',
    h2: [
      'Mould Assessment & Testing',
      'Black Mould Removal',
      'Bathroom Mould Treatment',
      'Commercial Mould Solutions',
      'Prevention & Prevention',
      'Health & Safety'
    ],
    h3: {
      'Mould Assessment & Testing': [
        'Air Quality Testing',
        'Surface Sampling',
        'Hidden Mould Detection',
        'Moisture Mapping'
      ],
      'Black Mould Removal': [
        'Containment Procedures',
        'Safe Removal Methods',
        'Structural Treatment',
        'Post-Remediation Verification'
      ]
    }
  },

  // STORM DAMAGE
  '/services/storm-damage': {
    h1: 'Storm Damage Restoration Brisbane - Cyclone & Hail Damage Repair',
    h2: [
      'Cyclone Damage Restoration',
      'Hail Damage Repair',
      'Wind Damage Assessment',
      'Tree Damage Cleanup',
      'Roof Leak Repair',
      'Emergency Board-Up Services'
    ],
    h3: {
      'Cyclone Damage Restoration': [
        'Structural Assessment',
        'Wind Damage Evaluation',
        'Water Intrusion Prevention',
        'Foundation Inspection'
      ],
      'Roof Leak Repair': [
        'Leak Detection',
        'Temporary Protection',
        'Structural Drying',
        'Permanent Repair'
      ]
    }
  },

  // COMMERCIAL SERVICES
  '/services/commercial': {
    h1: 'Commercial Disaster Recovery Brisbane - Large Scale Restoration',
    h2: [
      'Office Water Damage',
      'Retail Flood Damage',
      'Hotel Flood Recovery',
      'Factory Water Damage',
      'Hospital Water Damage',
      'Hospitality Restoration'
    ],
    h3: {
      'Office Water Damage': [
        'Rapid Response Protocols',
        'Business Continuity',
        'Document Preservation',
        'Equipment Salvage'
      ]
    }
  },

  // ABOUT PHIL MCGURK
  '/about-phil-mcgurk': {
    h1: 'Master Restorer Phill McGurk - IICRC & RAI Certified Brisbane Expert',
    h2: [
      'Master Restorer Certifications',
      'IICRC Certification',
      'RAI Certification',
      'Industry Experience',
      'Professional Achievements',
      'Local Brisbane Expertise'
    ],
    h3: {
      'Master Restorer Certifications': [
        'IICRC Master Restorer',
        'RAI Master Restorer',
        'Continuing Education',
        'Industry Recognition'
      ]
    }
  },

  // SERVICE AREAS
  '/service-areas': {
    h1: 'Service Areas - Brisbane, Ipswich & Logan Disaster Recovery',
    h2: [
      'Brisbane Service Coverage',
      'Ipswich Service Coverage',
      'Logan Service Coverage',
      'High Net Worth Suburbs',
      'Commercial Districts'
    ],
    h3: {
      'Brisbane Service Coverage': [
        'Hamilton',
        'Ascot',
        'New Farm',
        'Toowong',
        'Fortitude Valley',
        'Milton'
      ],
      'Ipswich Service Coverage': [
        'Karalee',
        'Brookwater',
        'Springfield Lakes',
        'Ipswich CBD'
      ]
    }
  },

  // INSURANCE CLAIMS
  '/insurance-claims': {
    h1: 'Insurance Claims Assistance - Brisbane Disaster Recovery',
    h2: [
      'Claims Process Overview',
      'Insurance Approved Status',
      'Loss Assessment',
      'Documentation Support',
      'Claim Maximization',
      'Common Issues & Solutions'
    ],
    h3: {
      'Claims Process Overview': [
        'Initial Assessment',
        'Documentation',
        'Claim Submission',
        'Settlement Process'
      ]
    }
  },

  // EMERGENCY GUIDE
  '/emergency-guide': {
    h1: 'Emergency Disaster Response Guide - Immediate Actions',
    h2: [
      'Immediate Safety Steps',
      'Water Damage Response',
      'Fire Damage Response',
      'Mould Prevention',
      'Documentation Steps',
      'Contact Emergency Services'
    ]
  },

  // FAQ
  '/faq': {
    h1: 'Frequently Asked Questions - Disaster Recovery Brisbane',
    h2: [
      'Emergency Response FAQ',
      'Water Damage FAQ',
      'Fire Damage FAQ',
      'Mould Remediation FAQ',
      'Insurance Claims FAQ',
      'General Questions'
    ]
  }
};

// BREADCRUMB SCHEMA MAPPINGS
export const BREADCRUMB_MAPPINGS: Record<string, string[]> = {
  '/': ['Home'],
  '/services': ['Home', 'Services'],
  '/services/water-damage': ['Home', 'Services', 'Water Damage Restoration'],
  '/services/water-damage/burst-pipes': ['Home', 'Services', 'Water Damage Restoration', 'Burst Pipes'],
  '/services/fire-damage': ['Home', 'Services', 'Fire Damage Restoration'],
  '/services/mould-remediation': ['Home', 'Services', 'Mould Remediation'],
  '/services/storm-damage': ['Home', 'Services', 'Storm Damage Restoration'],
  '/services/commercial': ['Home', 'Services', 'Commercial Restoration'],
  '/about-phil-mcgurk': ['Home', 'About', 'Phill McGurk - Master Restorer'],
  '/service-areas': ['Home', 'Service Areas'],
  '/insurance-claims': ['Home', 'Insurance Claims'],
  '/emergency-guide': ['Home', 'Emergency Guide'],
  '/faq': ['Home', 'FAQ'],
  '/contact': ['Home', 'Contact']
};

// INTERNAL LINKING OPPORTUNITIES
export const INTERNAL_LINK_CLUSTERS = {
  WATER_DAMAGE_CLUSTER: {
    hub: '/services/water-damage',
    spokes: [
      '/services/water-damage/burst-pipes',
      '/services/water-damage/ceiling-water-damage',
      '/services/water-damage/roof-leak-damage',
      '/services/water-damage/dishwasher-leaks',
      '/services/water-damage/washing-machine-flooding',
      '/services/water-damage/hot-water-system-burst',
      '/services/water-damage/shower-leaks',
      '/services/water-damage/toilet-overflow'
    ],
    guides: [
      '/guides/water-damage/burst-pipe-ceiling-repair-cost',
      '/guides/flood-damage/flood-damage-hardwood-floors'
    ],
    faq: '/faq/water-damage'
  },
  FIRE_DAMAGE_CLUSTER: {
    hub: '/services/fire-damage',
    spokes: [
      '/services/fire-damage/bushfire-smoke-damage',
      '/services/fire-damage/electrical-fire-damage',
      '/services/fire-damage/kitchen-fire-damage',
      '/services/fire-damage/smoke-odour-removal',
      '/services/fire-damage/soot-damage-cleanup',
      '/services/fire-damage/structural-fire-damage',
      '/services/fire-damage/commercial-fire-damage'
    ],
    guides: [
      '/guides/fire-damage/smoke-damage-cleaning-guide'
    ],
    faq: '/faq/fire-damage'
  },
  MOULD_CLUSTER: {
    hub: '/services/mould-remediation',
    spokes: [
      '/services/mould-remediation/bathroom-mould',
      '/services/mould-remediation/black-mould-removal',
      '/services/mould-remediation/commercial-mould',
      '/services/mould-remediation/hvac-mould'
    ],
    guides: [
      '/guides/mould/black-mould-bathroom-ceiling',
      '/guides/mould/why-mould-returns-6-months'
    ],
    faq: '/faq/mould-removal'
  },
  STORM_DAMAGE_CLUSTER: {
    hub: '/services/storm-damage',
    spokes: [
      '/services/storm-damage/cyclone-damage',
      '/services/storm-damage/hail-damage-repair',
      '/services/storm-damage/wind-damage-repair',
      '/services/storm-damage/tree-damage-cleanup',
      '/services/storm-damage/flood-damage-restoration'
    ],
    guides: [
      '/guides/storm-damage/storm-damage-roof-leak-repair'
    ],
    faq: '/faq/storm-damage'
  },
  COMMERCIAL_CLUSTER: {
    hub: '/services/commercial',
    spokes: [
      '/services/commercial-services/office-water-damage',
      '/services/commercial-services/retail-flood-damage',
      '/services/commercial-services/hotel-flood-recovery',
      '/services/commercial-services/factory-water-damage',
      '/services/commercial-services/hospital-water-damage',
      '/services/commercial-services/restaurant-water-damage',
      '/services/commercial-services/warehouse-flooding'
    ]
  },
  SERVICE_AREAS_CLUSTER: {
    hub: '/service-areas',
    spokes: [
      '/service-areas/brisbane',
      '/service-areas/ipswich',
      '/service-areas/logan'
    ]
  }
};

// TOPIC CLUSTERS FOR CONTENT EXPANSION
export const TOPIC_CLUSTERS = {
  EMERGENCY_RESPONSE: {
    cluster: 'Emergency Response Cluster',
    hub: '/emergency',
    topics: [
      'After-Hours Emergency Response',
      'Disaster Response Protocols',
      'Weekend Emergency Services',
      'Public Holiday Services',
      'Rapid Response Time',
      ' 24/7 Contact',
      'Mitigation Measures'
    ]
  },
  WATER_DAMAGE_RESTORATION: {
    cluster: 'Water Damage Restoration Cluster',
    hub: '/services/water-damage',
    topics: [
      'Water Extraction & Pumping',
      'Structural Drying',
      'Dehumidification',
      'Carpet Restoration',
      'Hardwood Floor Drying',
      'Tile & Grout Restoration',
      'Content Drying',
      'Documentation Drying'
    ]
  },
  FIRE_DAMAGE_RESTORATION: {
    cluster: 'Fire Damage Restoration Cluster',
    hub: '/services/fire-damage',
    topics: [
      'Smoke & Soot Cleanup',
      'Odour Remediation',
      'Structural Repairs',
      'Content Restoration',
      'Electronics Salvage',
      'Document Recovery',
      'Thermal Insulation'
    ]
  },
  MOULD_REMEDIATION: {
    cluster: 'Mould Remediation Cluster',
    hub: '/services/mould-remediation',
    topics: [
      'Mould Assessment',
      'HVAC Inspection',
      'Air Quality Testing',
      'Containment',
      'Removal & Disposal',
      'Decontamination',
      'Prevention Strategies'
    ]
  }
};

// CROSS-SILO LINKING (Only for highly relevant connections)
export const CROSS_SILO_LINKS = {
  '/services/water-damage': [
    { link: '/guides/water-damage', reason: 'Educational support' },
    { link: '/faq/water-damage', reason: 'Common questions' },
    { link: '/insurance-claims', reason: 'Claims support' }
  ],
  '/services/fire-damage': [
    { link: '/guides/fire-damage', reason: 'Educational support' },
    { link: '/faq/fire-damage', reason: 'Common questions' },
    { link: '/insurance-claims', reason: 'Claims support' }
  ],
  '/services/mould-remediation': [
    { link: '/guides/mould', reason: 'Educational support' },
    { link: '/faq/mould-removal', reason: 'Common questions' }
  ]
};

export default {
  HEADER_STANDARDS,
  CONTENT_SILOS,
  PAGE_HIERARCHIES,
  BREADCRUMB_MAPPINGS,
  INTERNAL_LINK_CLUSTERS,
  TOPIC_CLUSTERS,
  CROSS_SILO_LINKS
};
