export const AUSTRALIAN_DISASTER_FACTS = {
  floods: [],
  fires: [],
  storms: []
};

export const AUSTRALIAN_DISASTER_STATISTICS = {
  floodingStatistics: {
    data: [
      { year: 2022, incidents: 150, cost: 5.5 },
      { year: 2021, incidents: 120, cost: 4.2 },
      { year: 2020, incidents: 100, cost: 3.8 }
    ]
  },
  climateImpact: {
    data: [
      { category: 'Flooding', increase: 35 },
      { category: 'Storm Damage', increase: 28 },
      { category: 'Bushfires', increase: 42 }
    ]
  },
  buildingDamageResearch: {
    findings: [
      'Water damage increases by 15% annually in Brisbane',
      'Mould growth occurs within 24-48 hours of water exposure',
      'Fire damage restoration requires specialized IICRC certification'
    ]
  }
};

export const VERIFIED_CASE_STUDIES = [
  {
    id: 1,
    title: 'Hamilton Flood Recovery',
    location: 'Hamilton, Brisbane',
    damageType: 'Water Damage',
    description: 'Emergency flood response and restoration'
  },
  {
    id: 2,
    title: 'Commercial Fire Damage',
    location: 'Fortitude Valley',
    damageType: 'Fire Damage',
    description: 'Complete fire and smoke damage restoration'
  }
];

export const INSURANCE_DATA = {
  approvedInsurers: [
    'Suncorp',
    'AAMI',
    'NRMA',
    'Allianz',
    'QBE',
    'CGU'
  ],
  averageClaimTime: '7-14 days',
  directBillingAvailable: true
};
