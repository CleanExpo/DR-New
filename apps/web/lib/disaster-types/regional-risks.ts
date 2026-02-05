/**
 * Australian Regional Risk Assessment
 *
 * Provides regional disaster risk data for Australian states and postcodes,
 * including bushfire zones, cyclone-prone areas, flood risk, and seasonal patterns.
 */

import { type AustralianState } from './australian-disasters';

// ============================================================================
// Risk Levels
// ============================================================================

export type RiskLevel = 'high' | 'moderate' | 'low' | 'minimal';

export interface RiskAssessment {
  level: RiskLevel;
  description: string;
  seasonActive: boolean; // Currently in disaster season
  buildingCodeRequired?: string;
  insuranceNotes?: string[];
}

// ============================================================================
// Bushfire Risk Zones
// ============================================================================

export const BUSHFIRE_RISK = {
  high: {
    states: ['NSW', 'VIC', 'SA', 'WA', 'TAS'] as AustralianState[],
    description: 'High bushfire risk area - properties should comply with BAL ratings',
    season: {
      start: 'October',
      end: 'March',
      peak: ['December', 'January', 'February'],
    },
    buildingCode: 'AS 3959-2018 (Bushfire Attack Level)',
    balRatings: ['BAL-LOW', 'BAL-12.5', 'BAL-19', 'BAL-29', 'BAL-40', 'BAL-FZ'],
    insuranceNotes: [
      'Bushfire insurance mandatory in high-risk zones',
      'Some insurers may exclude bushfire or charge higher premiums',
      'Fire levy applied to all property insurance in NSW, VIC, WA',
      'Must maintain defendable space (AS 3959-2018)',
    ],
  },
  moderate: {
    states: ['QLD', 'ACT'] as AustralianState[],
    description: 'Moderate bushfire risk - some areas require BAL compliance',
    season: {
      start: 'October',
      end: 'March',
      peak: ['November', 'December', 'January'],
    },
    buildingCode: 'AS 3959-2018 (where applicable)',
    insuranceNotes: [
      'Bushfire cover generally available',
      'Check specific policy exclusions',
    ],
  },
  low: {
    states: ['NT'] as AustralianState[],
    description: 'Low bushfire risk - minimal building code requirements',
    season: {
      start: 'August',
      end: 'November',
      peak: ['September', 'October'],
    },
    insuranceNotes: [
      'Bushfire cover typically included in standard policies',
    ],
  },
};

// ============================================================================
// Cyclone Risk Zones
// ============================================================================

export const CYCLONE_RISK = {
  high: {
    states: ['QLD', 'NT', 'WA'] as AustralianState[],
    regions: {
      QLD: ['Far North Queensland', 'North Queensland', 'Central Queensland'],
      NT: ['Top End', 'Darwin region', 'Katherine region'],
      WA: ['Kimberley', 'Pilbara', 'Gascoyne'],
    },
    description: 'Cyclone-prone area - must comply with wind ratings',
    season: {
      start: 'November',
      end: 'April',
      peak: ['January', 'February', 'March'],
    },
    buildingCode: 'AS 1170.2 Wind Actions',
    windRatings: ['C1', 'C2', 'C3', 'C4'],
    insuranceNotes: [
      'Cyclone cover may have higher excess (typically $5,000-$10,000)',
      'Wind rating affects insurance premiums',
      'Some areas may face insurance availability issues',
      'Cyclone Emergency Declarations can affect claim timelines',
    ],
  },
  moderate: {
    states: ['NSW'] as AustralianState[],
    regions: {
      NSW: ['Mid North Coast', 'North Coast'],
    },
    description: 'Occasional severe storms with cyclonic winds',
    season: {
      start: 'November',
      end: 'March',
      peak: ['February', 'March'],
    },
    insuranceNotes: [
      'Storm damage typically covered in standard policies',
    ],
  },
  low: {
    states: ['VIC', 'SA', 'TAS', 'ACT'] as AustralianState[],
    description: 'Minimal cyclone risk',
    insuranceNotes: [
      'Storm cover included in standard policies',
    ],
  },
};

// ============================================================================
// Flood Risk Zones
// ============================================================================

export const FLOOD_RISK = {
  high: {
    states: ['QLD', 'NSW', 'NT'] as AustralianState[],
    description: 'High flood risk - check council flood overlay maps',
    season: {
      start: 'November',
      end: 'February',
      peak: ['December', 'January'],
    },
    insuranceNotes: [
      'Flood cover often excluded from standard policies',
      'Separate flood insurance available through some insurers',
      'Riverine flooding vs flash flooding may be covered differently',
      'Properties in 1-in-100 year flood zones may be uninsurable',
      'Check with council for Q100 flood level',
    ],
    preventionMeasures: [
      'Install flood barriers or sandbags',
      'Raise electrical systems above flood levels',
      'Maintain drainage systems',
      'Review flood evacuation plans',
    ],
  },
  moderate: {
    states: ['VIC', 'WA', 'SA'] as AustralianState[],
    description: 'Moderate flood risk in some areas',
    season: {
      start: 'May',
      end: 'September',
    },
    insuranceNotes: [
      'Flood cover availability varies by insurer',
      'Check property flood history',
    ],
  },
  low: {
    states: ['TAS', 'ACT'] as AustralianState[],
    description: 'Low flood risk',
    insuranceNotes: [
      'Flood cover typically available',
    ],
  },
};

// ============================================================================
// Hail Risk Zones
// ============================================================================

export const HAIL_RISK = {
  high: {
    states: ['NSW', 'ACT', 'QLD'] as AustralianState[],
    description: 'High risk of severe hailstorms causing property damage',
    season: {
      start: 'October',
      end: 'March',
      peak: ['November', 'December', 'January'],
    },
    buildingCode: 'AS 4040.3 Hail Resistance',
    insuranceNotes: [
      'Hail damage typically covered in standard policies',
      'Higher premiums in hail-prone areas',
      'Hailstone size often exceeds 2cm in severe events',
      'Consider impact-resistant roofing materials',
    ],
  },
  moderate: {
    states: ['VIC', 'SA'] as AustralianState[],
    description: 'Moderate hail risk',
    season: {
      start: 'September',
      end: 'February',
      peak: ['November', 'December'],
    },
    insuranceNotes: [
      'Hail cover included in standard policies',
    ],
  },
  low: {
    states: ['WA', 'NT', 'TAS'] as AustralianState[],
    description: 'Low hail risk',
    insuranceNotes: [
      'Hail events rare but covered in standard policies',
    ],
  },
};

// ============================================================================
// Risk Assessment Functions
// ============================================================================

/**
 * Check if current month is within disaster season
 */
export function isInSeason(seasonStart: string, seasonEnd: string, month?: number): boolean {
  const monthNames = [
    '', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const currentMonth = month ?? new Date().getMonth() + 1; // 1-12

  const startMonth = monthNames.indexOf(seasonStart);
  const endMonth = monthNames.indexOf(seasonEnd);

  if (startMonth === -1 || endMonth === -1) return false;

  // Handle seasons that cross year boundary (e.g., Oct-Mar)
  if (startMonth > endMonth) {
    return currentMonth >= startMonth || currentMonth <= endMonth;
  }

  return currentMonth >= startMonth && currentMonth <= endMonth;
}

/**
 * Get bushfire risk for a state
 */
export function getBushfireRisk(state: AustralianState): RiskAssessment {
  if (BUSHFIRE_RISK.high.states.includes(state)) {
    return {
      level: 'high',
      description: BUSHFIRE_RISK.high.description,
      seasonActive: isInSeason(
        BUSHFIRE_RISK.high.season.start,
        BUSHFIRE_RISK.high.season.end
      ),
      buildingCodeRequired: BUSHFIRE_RISK.high.buildingCode,
      insuranceNotes: BUSHFIRE_RISK.high.insuranceNotes,
    };
  }

  if (BUSHFIRE_RISK.moderate.states.includes(state)) {
    return {
      level: 'moderate',
      description: BUSHFIRE_RISK.moderate.description,
      seasonActive: isInSeason(
        BUSHFIRE_RISK.moderate.season.start,
        BUSHFIRE_RISK.moderate.season.end
      ),
      buildingCodeRequired: BUSHFIRE_RISK.moderate.buildingCode,
      insuranceNotes: BUSHFIRE_RISK.moderate.insuranceNotes,
    };
  }

  return {
    level: 'low',
    description: BUSHFIRE_RISK.low.description,
    seasonActive: isInSeason(
      BUSHFIRE_RISK.low.season.start,
      BUSHFIRE_RISK.low.season.end
    ),
    insuranceNotes: BUSHFIRE_RISK.low.insuranceNotes,
  };
}

/**
 * Get cyclone risk for a state
 */
export function getCycloneRisk(state: AustralianState): RiskAssessment {
  if (CYCLONE_RISK.high.states.includes(state)) {
    return {
      level: 'high',
      description: CYCLONE_RISK.high.description,
      seasonActive: isInSeason(
        CYCLONE_RISK.high.season.start,
        CYCLONE_RISK.high.season.end
      ),
      buildingCodeRequired: CYCLONE_RISK.high.buildingCode,
      insuranceNotes: CYCLONE_RISK.high.insuranceNotes,
    };
  }

  if (CYCLONE_RISK.moderate.states.includes(state)) {
    return {
      level: 'moderate',
      description: CYCLONE_RISK.moderate.description,
      seasonActive: isInSeason(
        CYCLONE_RISK.moderate.season.start,
        CYCLONE_RISK.moderate.season.end
      ),
      insuranceNotes: CYCLONE_RISK.moderate.insuranceNotes,
    };
  }

  return {
    level: 'low',
    description: CYCLONE_RISK.low.description,
    seasonActive: false,
    insuranceNotes: CYCLONE_RISK.low.insuranceNotes,
  };
}

/**
 * Get flood risk for a state
 */
export function getFloodRisk(state: AustralianState): RiskAssessment {
  if (FLOOD_RISK.high.states.includes(state)) {
    return {
      level: 'high',
      description: FLOOD_RISK.high.description,
      seasonActive: isInSeason(
        FLOOD_RISK.high.season.start,
        FLOOD_RISK.high.season.end
      ),
      insuranceNotes: FLOOD_RISK.high.insuranceNotes,
    };
  }

  if (FLOOD_RISK.moderate.states.includes(state)) {
    return {
      level: 'moderate',
      description: FLOOD_RISK.moderate.description,
      seasonActive: isInSeason(
        FLOOD_RISK.moderate.season.start,
        FLOOD_RISK.moderate.season.end
      ),
      insuranceNotes: FLOOD_RISK.moderate.insuranceNotes,
    };
  }

  return {
    level: 'low',
    description: FLOOD_RISK.low.description,
    seasonActive: false,
    insuranceNotes: FLOOD_RISK.low.insuranceNotes,
  };
}

/**
 * Get hail risk for a state
 */
export function getHailRisk(state: AustralianState): RiskAssessment {
  if (HAIL_RISK.high.states.includes(state)) {
    return {
      level: 'high',
      description: HAIL_RISK.high.description,
      seasonActive: isInSeason(
        HAIL_RISK.high.season.start,
        HAIL_RISK.high.season.end
      ),
      buildingCodeRequired: HAIL_RISK.high.buildingCode,
      insuranceNotes: HAIL_RISK.high.insuranceNotes,
    };
  }

  if (HAIL_RISK.moderate.states.includes(state)) {
    return {
      level: 'moderate',
      description: HAIL_RISK.moderate.description,
      seasonActive: isInSeason(
        HAIL_RISK.moderate.season.start,
        HAIL_RISK.moderate.season.end
      ),
      insuranceNotes: HAIL_RISK.moderate.insuranceNotes,
    };
  }

  return {
    level: 'low',
    description: HAIL_RISK.low.description,
    seasonActive: false,
    insuranceNotes: HAIL_RISK.low.insuranceNotes,
  };
}

/**
 * Get comprehensive risk profile for a state
 */
export interface StateRiskProfile {
  state: AustralianState;
  bushfire: RiskAssessment;
  cyclone: RiskAssessment;
  flood: RiskAssessment;
  hail: RiskAssessment;
  activeSeasons: string[]; // Currently active disaster seasons
  highestRisks: string[]; // Disaster types with high risk
}

export function getStateRiskProfile(state: AustralianState): StateRiskProfile {
  const bushfire = getBushfireRisk(state);
  const cyclone = getCycloneRisk(state);
  const flood = getFloodRisk(state);
  const hail = getHailRisk(state);

  const activeSeasons: string[] = [];
  if (bushfire.seasonActive) activeSeasons.push('Bushfire Season');
  if (cyclone.seasonActive) activeSeasons.push('Cyclone Season');
  if (flood.seasonActive) activeSeasons.push('Flood Season');
  if (hail.seasonActive) activeSeasons.push('Hail Season');

  const highestRisks: string[] = [];
  if (bushfire.level === 'high') highestRisks.push('Bushfire');
  if (cyclone.level === 'high') highestRisks.push('Cyclone');
  if (flood.level === 'high') highestRisks.push('Flood');
  if (hail.level === 'high') highestRisks.push('Hailstorm');

  return {
    state,
    bushfire,
    cyclone,
    flood,
    hail,
    activeSeasons,
    highestRisks,
  };
}

/**
 * Get insurance recommendations based on state and disaster type
 */
export function getInsuranceRecommendations(
  state: AustralianState,
  disasterType: string
): string[] {
  const recommendations: string[] = [];

  // General recommendations
  recommendations.push('Contact your insurer within 48 hours of the incident');
  recommendations.push('Document all damage with photos and videos');
  recommendations.push('Keep all receipts for emergency repairs');

  // Disaster-specific recommendations
  if (disasterType === 'bushfire') {
    const bushfireRisk = getBushfireRisk(state);
    if (bushfireRisk.insuranceNotes) {
      recommendations.push(...bushfireRisk.insuranceNotes);
    }
    recommendations.push('Check if your policy covers ember attack and smoke damage');
  }

  if (disasterType === 'cyclone') {
    const cycloneRisk = getCycloneRisk(state);
    if (cycloneRisk.insuranceNotes) {
      recommendations.push(...cycloneRisk.insuranceNotes);
    }
    recommendations.push('Note your property\'s wind rating for the claim');
  }

  if (disasterType === 'flood') {
    const floodRisk = getFloodRisk(state);
    if (floodRisk.insuranceNotes) {
      recommendations.push(...floodRisk.insuranceNotes);
    }
    recommendations.push('Flood may not be covered - check your policy details');
  }

  if (disasterType === 'hailstorm') {
    const hailRisk = getHailRisk(state);
    if (hailRisk.insuranceNotes) {
      recommendations.push(...hailRisk.insuranceNotes);
    }
  }

  return recommendations;
}
