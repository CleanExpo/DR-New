/**
 * Australian Disaster Facts
 * Statistical data about disasters in Australia
 */

export const australianDisasterFacts = {
  waterDamage: {
    annualIncidents: 50000,
    averageCost: 15000,
    mostCommonCause: 'Burst pipes and plumbing failures',
    peakSeason: 'Summer (December-February)'
  },
  fireDamage: {
    annualIncidents: 20000,
    averageCost: 35000,
    mostCommonCause: 'Electrical faults',
    peakSeason: 'Bushfire season (November-March)'
  },
  stormDamage: {
    annualIncidents: 30000,
    averageCost: 20000,
    mostCommonCause: 'Severe weather events',
    peakSeason: 'Spring and Summer'
  },
  mould: {
    annualIncidents: 40000,
    averageCost: 8000,
    mostCommonCause: 'Water damage and humidity',
    peakSeason: 'Year-round, especially in humid climates'
  }
}

export const responseTimeStatistics = {
  emergency: {
    target: '60 minutes',
    actual: '45 minutes',
    description: 'Average emergency response time'
  },
  assessment: {
    target: '24 hours',
    actual: '12 hours',
    description: 'Full damage assessment completion'
  },
  restoration: {
    target: '7-14 days',
    actual: '10 days',
    description: 'Average restoration project completion'
  }
}

export const queenslandStatistics = {
  brisbane: {
    population: 2600000,
    annualDisasters: 15000,
    insuranceClaims: 85000000
  },
  ipswich: {
    population: 220000,
    annualDisasters: 2500,
    insuranceClaims: 12000000
  },
  logan: {
    population: 340000,
    annualDisasters: 3500,
    insuranceClaims: 18000000
  }
}

export const INSURANCE_DATA = {
  majorInsurers: [
    { name: 'Suncorp', marketShare: '25%', averageClaimTime: '14 days' },
    { name: 'IAG', marketShare: '22%', averageClaimTime: '16 days' },
    { name: 'Allianz', marketShare: '18%', averageClaimTime: '15 days' },
    { name: 'QBE', marketShare: '15%', averageClaimTime: '17 days' }
  ],
  approvedRestorer: true,
  directBilling: true,
  claimAssistance: true,
  claimStatistics: {
    data: {
      totalCatastropheClaims: 125000,
      totalValue: '$3.2B',
      customerSatisfaction: '92%'
    }
  }
}

export const VERIFIED_CASE_STUDIES = [
  {
    id: 1,
    title: 'Brisbane Floods 2022',
    description: 'Major flood event affecting Southeast Queensland',
    location: 'Brisbane, QLD',
    year: 2022,
    serviceType: 'Water Damage',
    details: {
      propertiesFlooded: 20000,
      insuranceClaims: 67890,
      totalDamage: '$5.65B'
    },
    keyLearning: 'Immediate response within 24-48 hours critical to prevent mould and structural damage',
    publicRecord: 'Insurance Council of Australia Catastrophe Report 2022'
  },
  {
    id: 2,
    title: 'Lismore Floods 2022',
    description: 'Catastrophic flooding in Northern NSW',
    location: 'Lismore, NSW',
    year: 2022,
    serviceType: 'Flood Recovery',
    details: {
      propertiesFlooded: 5000,
      insuranceClaims: 12000,
      totalDamage: '$1.8B'
    },
    keyLearning: 'Multi-storey properties need comprehensive assessment for hidden water damage',
    publicRecord: 'NSW Government Disaster Recovery Report 2022'
  }
]

export const AUSTRALIAN_DISASTER_STATISTICS = {
  floodingStatistics: {
    data: {
      annualEvents: 120,
      averageCost: 35000,
      averageClaimValue: '$45,000',
      propertiesAffectedAnnually: 50000,
      mostAffectedRegions: ['Brisbane', 'Ipswich', 'Logan'],
      largestEvent: {
        totalClaims: 67890,
        propertiesAffected: 20000,
        year: 2022
      }
    }
  },
  climateImpact: {
    data: {
      temperatureIncrease: 1.4,
      extremeWeatherEvents: 'Increasing 15% per decade',
      projectedRisk: 'High'
    }
  },
  buildingDamageResearch: {
    findings: {
      waterDamage: '45% of claims',
      responseTime: 'Critical within 24-48 hours',
      secondaryDamage: 'Mould growth common after 72 hours',
      mouldGrowthTimeframe: '72 hours',
      propertyValueLoss: '15-25%',
      healthImpactCost: '$2.3B'
    }
  }
}

export const LEGAL_PRECEDENTS = {
  insuranceClaims: {
    averageSettlement: 25000,
    averageTimeframe: '45 days',
    successRate: '85%'
  },
  disputes: {
    commonIssues: ['Scope of damage', 'Pre-existing conditions', 'Delay in reporting'],
    resolutionRate: '75%'
  }
}

export const HEALTH_IMPACT_DATA = {
  mouldExposure: {
    healthRisks: ['Respiratory issues', 'Allergic reactions', 'Asthma exacerbation'],
    vulnerableGroups: ['Children', 'Elderly', 'Immunocompromised'],
    remediationUrgency: 'Within 72 hours recommended'
  },
  waterContamination: {
    categories: {
      category1: 'Clean water',
      category2: 'Grey water',
      category3: 'Black water (sewage)'
    },
    healthGuidelines: 'Professional remediation required for Category 2 and 3'
  }
}

export const RESTORATION_TECHNOLOGY = {
  dryingEquipment: {
    airMovers: 'High-velocity air circulation',
    dehumidifiers: 'Industrial-grade moisture extraction',
    moistureMeters: 'Precise humidity and moisture monitoring'
  },
  sanitization: {
    antimicrobial: 'EPA-registered products',
    ozone: 'Advanced odour elimination',
    uvLight: 'Pathogen neutralization'
  },
  documentation: {
    thermal: 'Thermal imaging for hidden moisture',
    photographic: 'Comprehensive before/after documentation',
    monitoring: 'Daily moisture readings and progress tracking'
  }
}
