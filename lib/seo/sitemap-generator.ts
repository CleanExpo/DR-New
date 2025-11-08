/**
 * Comprehensive Sitemap Generator
 * Generates complete sitemap.xml with all pages, priorities, and change frequencies
 */

export interface SitemapEntry {
  url: string;
  lastModified?: Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export interface SitemapConfig {
  baseUrl: string;
  defaultChangeFreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  defaultPriority?: number;
}

const DEFAULT_CONFIG: SitemapConfig = {
  baseUrl: 'https://disasterrecovery.com.au',
  defaultChangeFreq: 'weekly',
  defaultPriority: 0.5
};

/**
 * All pages discovered in the website
 */
export const SITE_PAGES = {
  // Homepage
  home: '/',

  // Main Service Pages
  services: {
    index: '/services',
    waterDamageRestoration: '/services/water-damage-restoration',
    fireDamageRestoration: '/services/fire-damage-restoration',
    mouldRemediation: '/services/mould-remediation',
    stormDamageRestoration: '/services/storm-damage-restoration',
    floodRecovery: '/services/flood-recovery',
    floodDamageRestoration: '/services/flood-damage-restoration',
    commercial: '/services/commercial',
    commercialServices: '/services/commercial-services',
    biohazard: '/services/biohazard',
    biohazardCleanup: '/services/biohazard-cleanup',
    emergencyResponse: '/services/emergency-response',
    emergencyServices: '/services/emergency-services',
    fireDamage: '/services/fire-damage',
    waterDamage: '/services/water-damage',
    stormDamage: '/services/storm-damage',
    sewageCleanup: '/services/sewage-cleanup',
    structuralDrying: '/services/structural-drying',
    technicalAssessment: '/services/technical-assessment',
    indoorEnvironmentalProfessional: '/services/indoor-environmental-professional',
    indoorEnvironmentalHealth: '/services/indoor-environmental-health',
    moldRemediation: '/services/mold-remediation',
    traumaCleanup: '/services/trauma-cleanup',
    bushfireDamageRestoration: '/services/bushfire-damage-restoration',
    cycloneDamageRestoration: '/services/cyclone-damage-restoration'
  },

  // Water Damage Services
  waterDamageServices: {
    burstPipes: '/services/water-damage/burst-pipes',
    burstPipeRepair: '/services/water-damage-restoration/burst-pipe-repair',
    emergencyWaterExtraction: '/services/water-damage-restoration/emergency-water-extraction',
    structuralDrying: '/services/water-damage-restoration/structural-drying',
    sewageCleanup: '/services/water-damage-restoration/sewage-cleanup',
    ceilingWaterDamage: '/services/water-damage/ceiling-water-damage',
    dishwasherLeaks: '/services/water-damage/dishwasher-leaks',
    hotWaterSystemBurst: '/services/water-damage/hot-water-system-burst',
    roofLeakDamage: '/services/water-damage/roof-leak-damage',
    showerLeaks: '/services/water-damage/shower-leaks',
    toiletOverflow: '/services/water-damage/toilet-overflow',
    washingMachineFlooding: '/services/water-damage/washing-machine-flooding'
  },

  // Fire Damage Services
  fireDamageServices: {
    bushfireSmokeDamage: '/services/fire-damage/bushfire-smoke-damage',
    commercialFireDamage: '/services/fire-damage/commercial-fire-damage',
    electricalFireDamage: '/services/fire-damage/electrical-fire-damage',
    kitchenFireDamage: '/services/fire-damage/kitchen-fire-damage',
    smokeOdourRemoval: '/services/fire-damage/smoke-odour-removal',
    sootDamageCleanup: '/services/fire-damage/soot-damage-cleanup',
    structuralFireDamage: '/services/fire-damage/structural-fire-damage'
  },

  // Mould Services
  mouldServices: {
    bathroomMould: '/services/mould-remediation/bathroom-mould',
    blackMouldRemoval: '/services/mould-remediation/black-mould-removal',
    commercialMould: '/services/mould-remediation/commercial-mould',
    hvacMould: '/services/mould-remediation/hvac-mould'
  },

  // Storm Damage Services
  stormDamageServices: {
    cycloneDamage: '/services/storm-damage/cyclone-damage',
    floodDamageRestoration: '/services/storm-damage/flood-damage-restoration',
    hailDamageRepair: '/services/storm-damage/hail-damage-repair',
    treeDamageCleanup: '/services/storm-damage/tree-damage-cleanup',
    windDamageRepair: '/services/storm-damage/wind-damage-repair'
  },

  // Sewage Cleanup Services
  sewageServices: {
    blackWaterCleanup: '/services/sewage-cleanup/black-water-cleanup',
    commercialSewage: '/services/sewage-cleanup/commercial-sewage',
    mainLineBackup: '/services/sewage-cleanup/main-line-backup',
    sewageDecontamination: '/services/sewage-cleanup/sewage-decontamination',
    stormDrainBackup: '/services/sewage-cleanup/storm-drain-backup',
    toiletBackup: '/services/sewage-cleanup/toilet-backup'
  },

  // Commercial Services
  commercialServices: {
    factoryWaterDamage: '/services/commercial-services/factory-water-damage',
    hospitalWaterDamage: '/services/commercial-services/hospital-water-damage',
    hotelFloodRecovery: '/services/commercial-services/hotel-flood-recovery',
    officeWaterDamage: '/services/commercial-services/office-water-damage',
    restaurantWaterDamage: '/services/commercial-services/restaurant-water-damage',
    retailFloodDamage: '/services/commercial-services/retail-flood-damage',
    schoolWaterDamage: '/services/commercial-services/school-water-damage',
    warehouseFlooding: '/services/commercial-services/warehouse-flooding'
  },

  // Emergency Services
  emergencyServices: {
    twentyFourHourWaterExtraction: '/services/emergency-services/24-hour-water-extraction',
    afterHoursResponse: '/services/emergency-services/after-hours-response',
    disasterResponse: '/services/emergency-services/disaster-response',
    emergencyBoardUp: '/services/emergency-services/emergency-board-up',
    emergencyDrying: '/services/emergency-services/emergency-drying',
    emergencySanitization: '/services/emergency-services/emergency-sanitization'
  },

  // Biohazard Services
  biohazardServices: {
    animalWaste: '/services/biohazard-cleaning/animal-waste',
    bloodCleanup: '/services/biohazard-cleaning/blood-cleanup',
    bodilyFluids: '/services/biohazard-cleaning/bodily-fluids',
    hoardingCleanup: '/services/biohazard-cleaning/hoarding-cleanup',
    infectiousDisease: '/services/biohazard-cleaning/infectious-disease',
    biohazardCleanup: '/services/trauma-cleanup/biohazard-cleanup'
  },

  // Specialty Services
  specialtyServices: {
    asbestosWaterDamage: '/services/specialty-services/asbestos-water-damage',
    documentDrying: '/services/specialty-services/document-drying',
    electronicsWaterDamage: '/services/specialty-services/electronics-water-damage',
    solarPanelWaterDamage: '/services/specialty-services/solar-panel-water-damage'
  },

  // Location-Specific Services
  locationServices: {
    brisbaneCBDWaterDamage: '/services/location-specific/brisbane-cbd-water-damage',
    ipswichFloodRecovery: '/services/location-specific/ipswich-flood-recovery',
    loganWaterDamage: '/services/location-specific/logan-water-damage'
  },

  // Locations - Main Cities
  locations: {
    hamilton: '/locations/hamilton',
    ascot: '/locations/ascot',
    newFarm: '/locations/new-farm',
    toowong: '/locations/toowong',
    karalee: '/locations/karalee',
    brookwater: '/locations/brookwater',
    springfieldLakes: '/locations/springfield-lakes'
  },

  // Emergency Pages
  emergency: {
    index: '/emergency',
    afterHours: '/emergency/after-hours',
    afterHoursEmergency: '/emergency/after-hours-emergency',
    anzacDay: '/emergency/anzac-day',
    christmas: '/emergency/christmas',
    christmasEmergency: '/emergency/christmas-emergency',
    earlyMorning: '/emergency/early-morning',
    earlyMorningEmergency: '/emergency/early-morning-emergency',
    easter: '/emergency/easter',
    lateNight: '/emergency/late-night',
    midnight: '/emergency/midnight',
    midnightEmergency: '/emergency/midnight-emergency',
    newYear: '/emergency/new-year',
    newYearEmergency: '/emergency/new-year-emergency',
    publicHoliday: '/emergency/public-holiday',
    publicHolidayEmergency: '/emergency/public-holiday-emergency',
    sundayNightEmergency: '/emergency/sunday-night-emergency',
    weekend: '/emergency/weekend',
    weekendEmergency: '/emergency/weekend-emergency',
    emergencyGuide: '/emergency-guide'
  },

  // Emergency Checklists
  checklists: {
    index: '/emergency/checklists',
    general: '/emergency/checklists/general',
    waterDamage: '/emergency/checklists/water-damage',
    fireDamage: '/emergency/checklists/fire-damage',
    mould: '/emergency/checklists/mould',
    sewage: '/emergency/checklists/sewage',
    stormDamage: '/emergency/checklists/storm-damage'
  },

  // FAQ Pages
  faq: {
    index: '/faq',
    general: '/faq/general',
    waterDamage: '/faq/water-damage',
    fireDamage: '/faq/fire-damage',
    mouldRemoval: '/faq/mould-removal',
    stormDamage: '/faq/storm-damage',
    emergencyResponse: '/faq/emergency-response',
    insuranceClaims: '/faq/insurance-claims',
    floodRestoration: '/faq/flood-restoration',
    sewageCleanup: '/faq/sewage-cleanup',
    biohazardCleanup: '/faq/biohazard-cleanup',
    carpetDrying: '/faq/carpet-drying',
    ceilingRepairs: '/faq/ceiling-repairs',
    contentsRestoration: '/faq/contents-restoration',
    documentDrying: '/faq/document-drying',
    electronicsRestoration: '/faq/electronics-restoration',
    emergencyPlumbing: '/faq/emergency-plumbing',
    odourRemoval: '/faq/odour-removal'
  },

  // Insurance Companies
  insurance: {
    aami: '/insurance/aami',
    allianz: '/insurance/allianz',
    anzInsurance: '/insurance/anz-insurance',
    budgetDirect: '/insurance/budget-direct',
    cgu: '/insurance/cgu',
    colesInsurance: '/insurance/coles-insurance',
    comminsure: '/insurance/comminsure',
    gio: '/insurance/gio',
    nabInsurance: '/insurance/nab-insurance',
    nrma: '/insurance/nrma',
    qbe: '/insurance/qbe',
    raa: '/insurance/raa',
    rac: '/insurance/rac',
    racq: '/insurance/racq',
    ract: '/insurance/ract',
    racv: '/insurance/racv',
    sgic: '/insurance/sgic',
    sgio: '/insurance/sgio',
    shannons: '/insurance/shannons',
    suncorp: '/insurance/suncorp',
    vero: '/insurance/vero',
    westpacInsurance: '/insurance/westpac-insurance',
    woolworthsInsurance: '/insurance/woolworths-insurance'
  },

  // Guides
  guides: {
    waterDamage: '/guides/water-damage',
    burstPipeCeilingRepairCost: '/guides/water-damage/burst-pipe-ceiling-repair-cost',
    fireDamage: '/guides/fire-damage',
    smokeDamageCleaningGuide: '/guides/fire-damage/smoke-damage-cleaning-guide',
    mould: '/guides/mould',
    blackMouldBathroomCeiling: '/guides/mould/black-mould-bathroom-ceiling',
    whyMouldReturns6Months: '/guides/mould/why-mould-returns-6-months',
    stormDamage: '/guides/storm-damage',
    stormDamageRoofLeakRepair: '/guides/storm-damage/storm-damage-roof-leak-repair',
    floodDamageHardwoodFloors: '/guides/flood-damage/flood-damage-hardwood-floors'
  },

  // Emergency Guides
  emergencyGuides: {
    christmasEmergencyWaterDamage: '/guides/emergency/christmas-emergency-water-damage',
    easterWeekendEmergencyRestoration: '/guides/emergency/easter-weekend-emergency-restoration',
    emergencyBoardUpStormDamage: '/guides/emergency/emergency-board-up-storm-damage',
    find24HourEmergencyRestoration: '/guides/emergency/find-24-hour-emergency-restoration',
    middleNightFloodingEmergency: '/guides/emergency/middle-night-flooding-emergency',
    newYearsEveDisasterRecovery: '/guides/emergency/new-years-eve-disaster-recovery',
    weekendPublicHolidayEmergency: '/guides/emergency/weekend-public-holiday-emergency'
  },

  // Insurance Guides
  insuranceGuides: {
    category3WaterDamageInsurance: '/guides/insurance/category-3-water-damage-insurance',
    documentWaterDamageInsurance: '/guides/insurance/document-water-damage-insurance',
    insuranceApprovedContractors: '/guides/insurance/insurance-approved-contractors',
    insuranceDepreciationWaterDamage: '/guides/insurance/insurance-depreciation-water-damage',
    lossAssessorVsContractor: '/guides/insurance/loss-assessor-vs-contractor',
    makeSafeInsuranceCoverage: '/guides/insurance/make-safe-insurance-coverage',
    realCostInsuranceDelays: '/guides/insurance/real-cost-insurance-delays',
    section54ContractorRights: '/guides/insurance/section-54-contractor-rights'
  },

  // Other Pages
  other: {
    cookies: '/cookies'
  }
};

/**
 * Flatten all pages into a single array
 */
export function getAllPages(): string[] {
  const pages: string[] = [];

  function extractPages(obj: any) {
    for (const key in obj) {
      const value = obj[key];
      if (typeof value === 'string') {
        pages.push(value);
      } else if (typeof value === 'object') {
        extractPages(value);
      }
    }
  }

  extractPages(SITE_PAGES);
  return [...new Set(pages)]; // Remove duplicates
}

/**
 * Generate sitemap entries with priorities and change frequencies
 */
export function generateSitemapEntries(config: SitemapConfig = DEFAULT_CONFIG): SitemapEntry[] {
  const entries: SitemapEntry[] = [];
  const now = new Date();

  // Homepage - Highest priority
  entries.push({
    url: `${config.baseUrl}/`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 1.0
  });

  // Main service pages - High priority
  Object.values(SITE_PAGES.services).forEach(path => {
    entries.push({
      url: `${config.baseUrl}${path}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9
    });
  });

  // Location pages - High priority
  Object.values(SITE_PAGES.locations).forEach(path => {
    entries.push({
      url: `${config.baseUrl}${path}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9
    });
  });

  // Emergency pages - High priority
  Object.values(SITE_PAGES.emergency).forEach(path => {
    entries.push({
      url: `${config.baseUrl}${path}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8
    });
  });

  // Specific service pages - Medium-high priority
  [
    SITE_PAGES.waterDamageServices,
    SITE_PAGES.fireDamageServices,
    SITE_PAGES.mouldServices,
    SITE_PAGES.stormDamageServices,
    SITE_PAGES.sewageServices,
    SITE_PAGES.commercialServices,
    SITE_PAGES.emergencyServices,
    SITE_PAGES.biohazardServices,
    SITE_PAGES.specialtyServices,
    SITE_PAGES.locationServices
  ].forEach(category => {
    Object.values(category).forEach(path => {
      entries.push({
        url: `${config.baseUrl}${path}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7
      });
    });
  });

  // FAQ pages - Medium priority
  Object.values(SITE_PAGES.faq).forEach(path => {
    entries.push({
      url: `${config.baseUrl}${path}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6
    });
  });

  // Insurance pages - Medium priority
  Object.values(SITE_PAGES.insurance).forEach(path => {
    entries.push({
      url: `${config.baseUrl}${path}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6
    });
  });

  // Guide pages - Medium priority
  [
    SITE_PAGES.guides,
    SITE_PAGES.emergencyGuides,
    SITE_PAGES.insuranceGuides
  ].forEach(category => {
    Object.values(category).forEach(path => {
      entries.push({
        url: `${config.baseUrl}${path}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6
      });
    });
  });

  // Checklist pages - Lower priority
  Object.values(SITE_PAGES.checklists).forEach(path => {
    entries.push({
      url: `${config.baseUrl}${path}`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5
    });
  });

  // Other pages - Lower priority
  Object.values(SITE_PAGES.other).forEach(path => {
    entries.push({
      url: `${config.baseUrl}${path}`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3
    });
  });

  return entries;
}

/**
 * Generate XML sitemap
 */
export function generateSitemapXML(config: SitemapConfig = DEFAULT_CONFIG): string {
  const entries = generateSitemapEntries(config);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${entries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    ${entry.lastModified ? `<lastmod>${entry.lastModified.toISOString().split('T')[0]}</lastmod>` : ''}
    ${entry.changeFrequency ? `<changefreq>${entry.changeFrequency}</changefreq>` : ''}
    ${entry.priority !== undefined ? `<priority>${entry.priority.toFixed(1)}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`;

  return xml;
}

/**
 * Get sitemap statistics
 */
export function getSitemapStats(config: SitemapConfig = DEFAULT_CONFIG) {
  const entries = generateSitemapEntries(config);

  return {
    totalPages: entries.length,
    byPriority: {
      high: entries.filter(e => e.priority && e.priority >= 0.8).length,
      medium: entries.filter(e => e.priority && e.priority >= 0.5 && e.priority < 0.8).length,
      low: entries.filter(e => e.priority && e.priority < 0.5).length
    },
    byChangeFreq: {
      daily: entries.filter(e => e.changeFrequency === 'daily').length,
      weekly: entries.filter(e => e.changeFrequency === 'weekly').length,
      monthly: entries.filter(e => e.changeFrequency === 'monthly').length,
      yearly: entries.filter(e => e.changeFrequency === 'yearly').length
    },
    categories: {
      services: Object.values(SITE_PAGES.services).length,
      locations: Object.values(SITE_PAGES.locations).length,
      emergency: Object.values(SITE_PAGES.emergency).length,
      faq: Object.values(SITE_PAGES.faq).length,
      insurance: Object.values(SITE_PAGES.insurance).length,
      guides: Object.values(SITE_PAGES.guides).length + Object.values(SITE_PAGES.emergencyGuides).length + Object.values(SITE_PAGES.insuranceGuides).length
    }
  };
}
