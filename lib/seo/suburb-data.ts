// Comprehensive suburb data for Brisbane, Ipswich, and Logan
// This powers our programmatic SEO strategy for total market domination

export interface SuburbData {
  name: string;
  region: string;
  postcode: string;
  population: number;
  demographics: {
    medianHouseholdIncome: number;
    averagePropertyValue: number;
    ownerOccupied: number;
    businessDensity: number;
  };
  disasterRisk: {
    floodRisk: 'high' | 'medium' | 'low';
    bushfireRisk: 'high' | 'medium' | 'low';
    stormRisk: 'high' | 'medium' | 'low';
    historicalIncidents: string[];
  };
  nearbySuburbs: string[];
  landmarks: string[];
  insuranceProviders: string[];
  competitorPresence: number; // Scale of 1-10
  searchVolume: number; // Monthly searches
  difficulty: number; // SEO difficulty 0-100
}

// Priority suburbs for Brisbane (High Net Worth and Commercial Areas)
export const brisbaneSuburbs: SuburbData[] = [
  {
    name: 'Hamilton',
    region: 'Brisbane',
    postcode: '4007',
    population: 6780,
    demographics: {
      medianHouseholdIncome: 145000,
      averagePropertyValue: 1850000,
      ownerOccupied: 65,
      businessDensity: 8.5
    },
    disasterRisk: {
      floodRisk: 'high',
      bushfireRisk: 'low',
      stormRisk: 'medium',
      historicalIncidents: ['2022 Brisbane Floods', '2011 Brisbane Floods', '2021 Storm Damage']
    },
    nearbySuburbs: ['Ascot', 'Clayfield', 'Eagle Farm', 'Albion'],
    landmarks: ['Portside Wharf', 'Hamilton Harbour', 'Eat Street Markets'],
    insuranceProviders: ['RACQ', 'Suncorp', 'Allianz', 'NRMA', 'Budget Direct'],
    competitorPresence: 7,
    searchVolume: 890,
    difficulty: 42
  },
  {
    name: 'Ascot',
    region: 'Brisbane',
    postcode: '4007',
    population: 5889,
    demographics: {
      medianHouseholdIncome: 165000,
      averagePropertyValue: 2100000,
      ownerOccupied: 72,
      businessDensity: 6.2
    },
    disasterRisk: {
      floodRisk: 'medium',
      bushfireRisk: 'low',
      stormRisk: 'medium',
      historicalIncidents: ['2022 Brisbane Floods', '2011 Brisbane Floods', '2020 Hailstorm']
    },
    nearbySuburbs: ['Hamilton', 'Clayfield', 'Hendra', 'Eagle Farm'],
    landmarks: ['Eagle Farm Racecourse', 'Doomben Racecourse', 'Ascot State School'],
    insuranceProviders: ['RACQ', 'Suncorp', 'CGU', 'QBE', 'Youi'],
    competitorPresence: 6,
    searchVolume: 650,
    difficulty: 38
  },
  {
    name: 'New Farm',
    region: 'Brisbane',
    postcode: '4005',
    population: 12542,
    demographics: {
      medianHouseholdIncome: 125000,
      averagePropertyValue: 1650000,
      ownerOccupied: 45,
      businessDensity: 9.2
    },
    disasterRisk: {
      floodRisk: 'high',
      bushfireRisk: 'low',
      stormRisk: 'medium',
      historicalIncidents: ['2022 Brisbane Floods', '2011 Brisbane Floods', '2021 Storm Surge']
    },
    nearbySuburbs: ['Teneriffe', 'Newstead', 'Fortitude Valley', 'Kangaroo Point'],
    landmarks: ['New Farm Park', 'Brisbane Powerhouse', 'Howard Smith Wharves'],
    insuranceProviders: ['RACQ', 'Suncorp', 'AAMI', 'Allianz', 'Coles Insurance'],
    competitorPresence: 8,
    searchVolume: 1250,
    difficulty: 48
  },
  {
    name: 'Paddington',
    region: 'Brisbane',
    postcode: '4064',
    population: 8562,
    demographics: {
      medianHouseholdIncome: 115000,
      averagePropertyValue: 1450000,
      ownerOccupied: 58,
      businessDensity: 7.8
    },
    disasterRisk: {
      floodRisk: 'low',
      bushfireRisk: 'low',
      stormRisk: 'medium',
      historicalIncidents: ['2022 Storms', '2020 Hailstorm', '2019 Wind Damage']
    },
    nearbySuburbs: ['Milton', 'Rosalie', 'Petrie Terrace', 'Bardon'],
    landmarks: ['Suncorp Stadium', 'Caxton Street', 'Paddington Markets'],
    insuranceProviders: ['RACQ', 'Suncorp', 'CommInsure', 'ANZ Insurance', 'Westpac'],
    competitorPresence: 7,
    searchVolume: 980,
    difficulty: 45
  },
  {
    name: 'Toowong',
    region: 'Brisbane',
    postcode: '4066',
    population: 10830,
    demographics: {
      medianHouseholdIncome: 98000,
      averagePropertyValue: 1250000,
      ownerOccupied: 42,
      businessDensity: 8.5
    },
    disasterRisk: {
      floodRisk: 'medium',
      bushfireRisk: 'low',
      stormRisk: 'medium',
      historicalIncidents: ['2022 Brisbane Floods', '2011 Brisbane Floods', '2021 Storm Damage']
    },
    nearbySuburbs: ['St Lucia', 'Taringa', 'Indooroopilly', 'Auchenflower'],
    landmarks: ['Toowong Village', 'Toowong Cemetery', 'Brisbane Boys College'],
    insuranceProviders: ['RACQ', 'Suncorp', 'Allianz', 'NRMA', 'Progressive'],
    competitorPresence: 6,
    searchVolume: 1120,
    difficulty: 41
  },
  {
    name: 'Bulimba',
    region: 'Brisbane',
    postcode: '4171',
    population: 6843,
    demographics: {
      medianHouseholdIncome: 135000,
      averagePropertyValue: 1550000,
      ownerOccupied: 62,
      businessDensity: 7.2
    },
    disasterRisk: {
      floodRisk: 'high',
      bushfireRisk: 'low',
      stormRisk: 'medium',
      historicalIncidents: ['2022 Brisbane Floods', '2011 Brisbane Floods', '2020 Storm Damage']
    },
    nearbySuburbs: ['Hawthorne', 'Balmoral', 'Morningside', 'Seven Hills'],
    landmarks: ['Oxford Street', 'Bulimba Memorial Park', 'Bulimba Ferry Terminal'],
    insuranceProviders: ['RACQ', 'Suncorp', 'GIO', 'AAMI', 'Woolworths Insurance'],
    competitorPresence: 5,
    searchVolume: 780,
    difficulty: 35
  },
  {
    name: 'Kangaroo Point',
    region: 'Brisbane',
    postcode: '4169',
    population: 8063,
    demographics: {
      medianHouseholdIncome: 105000,
      averagePropertyValue: 950000,
      ownerOccupied: 35,
      businessDensity: 6.8
    },
    disasterRisk: {
      floodRisk: 'medium',
      bushfireRisk: 'low',
      stormRisk: 'medium',
      historicalIncidents: ['2022 Brisbane Floods', '2011 Brisbane Floods', '2019 Storm Surge']
    },
    nearbySuburbs: ['South Brisbane', 'East Brisbane', 'Woolloongabba', 'New Farm'],
    landmarks: ['Kangaroo Point Cliffs', 'Story Bridge', 'Captain Burke Park'],
    insuranceProviders: ['RACQ', 'Suncorp', 'Allianz', 'QBE', 'HCF Insurance'],
    competitorPresence: 7,
    searchVolume: 920,
    difficulty: 43
  },
  {
    name: 'West End',
    region: 'Brisbane',
    postcode: '4101',
    population: 9474,
    demographics: {
      medianHouseholdIncome: 92000,
      averagePropertyValue: 1150000,
      ownerOccupied: 38,
      businessDensity: 8.9
    },
    disasterRisk: {
      floodRisk: 'high',
      bushfireRisk: 'low',
      stormRisk: 'medium',
      historicalIncidents: ['2022 Brisbane Floods', '2011 Brisbane Floods', '2020 Flash Flooding']
    },
    nearbySuburbs: ['South Brisbane', 'Highgate Hill', 'Hill End', 'Dutton Park'],
    landmarks: ['Davies Park', 'West End Markets', 'Brisbane State High School'],
    insuranceProviders: ['RACQ', 'Suncorp', 'AAMI', 'Youi', 'Virgin Money Insurance'],
    competitorPresence: 6,
    searchVolume: 1050,
    difficulty: 40
  },
  {
    name: 'Fortitude Valley',
    region: 'Brisbane',
    postcode: '4006',
    population: 7282,
    demographics: {
      medianHouseholdIncome: 85000,
      averagePropertyValue: 850000,
      ownerOccupied: 25,
      businessDensity: 9.8
    },
    disasterRisk: {
      floodRisk: 'low',
      bushfireRisk: 'low',
      stormRisk: 'medium',
      historicalIncidents: ['2022 Storm Damage', '2020 Hailstorm', '2019 Flash Flooding']
    },
    nearbySuburbs: ['New Farm', 'Newstead', 'Bowen Hills', 'Spring Hill'],
    landmarks: ['Chinatown', 'Valley Metro', 'Brunswick Street Mall'],
    insuranceProviders: ['RACQ', 'Suncorp', 'Allianz', 'NRMA', 'IAG'],
    competitorPresence: 8,
    searchVolume: 1380,
    difficulty: 52
  },
  {
    name: 'Spring Hill',
    region: 'Brisbane',
    postcode: '4000',
    population: 6027,
    demographics: {
      medianHouseholdIncome: 78000,
      averagePropertyValue: 750000,
      ownerOccupied: 28,
      businessDensity: 8.2
    },
    disasterRisk: {
      floodRisk: 'low',
      bushfireRisk: 'low',
      stormRisk: 'medium',
      historicalIncidents: ['2022 Storm Damage', '2020 Water Main Burst', '2019 Building Fire']
    },
    nearbySuburbs: ['Brisbane CBD', 'Fortitude Valley', 'Petrie Terrace', 'Herston'],
    landmarks: ['St Andrews War Memorial Hospital', 'Victoria Barracks', 'Brisbane Grammar School'],
    insuranceProviders: ['RACQ', 'Suncorp', 'CGU', 'Zurich', 'AIG'],
    competitorPresence: 7,
    searchVolume: 820,
    difficulty: 44
  }
];

// Ipswich suburbs (Growth areas and established commercial zones)
export const ipswichSuburbs: SuburbData[] = [
  {
    name: 'Springfield Lakes',
    region: 'Ipswich',
    postcode: '4300',
    population: 15243,
    demographics: {
      medianHouseholdIncome: 95000,
      averagePropertyValue: 650000,
      ownerOccupied: 68,
      businessDensity: 5.5
    },
    disasterRisk: {
      floodRisk: 'low',
      bushfireRisk: 'medium',
      stormRisk: 'high',
      historicalIncidents: ['2022 Storms', '2021 Hailstorm', '2020 Flash Flooding']
    },
    nearbySuburbs: ['Springfield', 'Springfield Central', 'Brookwater', 'Augustine Heights'],
    landmarks: ['Orion Springfield', 'Robelle Domain', 'Springfield Central Station'],
    insuranceProviders: ['RACQ', 'Suncorp', 'AAMI', 'Budget Direct', 'Coles Insurance'],
    competitorPresence: 4,
    searchVolume: 680,
    difficulty: 28
  },
  {
    name: 'Karalee',
    region: 'Ipswich',
    postcode: '4306',
    population: 4821,
    demographics: {
      medianHouseholdIncome: 112000,
      averagePropertyValue: 850000,
      ownerOccupied: 82,
      businessDensity: 3.2
    },
    disasterRisk: {
      floodRisk: 'high',
      bushfireRisk: 'low',
      stormRisk: 'medium',
      historicalIncidents: ['2022 Brisbane River Floods', '2011 Floods', '2013 Tornado']
    },
    nearbySuburbs: ['Chuwar', 'Barellan Point', 'Karana Downs', 'Mount Crosby'],
    landmarks: ['Colleges Crossing', 'Brisbane River', 'Chuwar Shopping Village'],
    insuranceProviders: ['RACQ', 'Suncorp', 'Allianz', 'Youi', 'NRMA'],
    competitorPresence: 3,
    searchVolume: 320,
    difficulty: 22
  },
  {
    name: 'Brookwater',
    region: 'Ipswich',
    postcode: '4300',
    population: 2682,
    demographics: {
      medianHouseholdIncome: 145000,
      averagePropertyValue: 1250000,
      ownerOccupied: 88,
      businessDensity: 2.5
    },
    disasterRisk: {
      floodRisk: 'low',
      bushfireRisk: 'medium',
      stormRisk: 'medium',
      historicalIncidents: ['2022 Storms', '2020 Bushfire Threat', '2019 Hailstorm']
    },
    nearbySuburbs: ['Springfield Lakes', 'Springfield', 'Augustine Heights', 'Bellbird Park'],
    landmarks: ['Brookwater Golf Club', 'Brookwater Village', 'Greater Springfield'],
    insuranceProviders: ['RACQ', 'Suncorp', 'CGU', 'QBE', 'Allianz'],
    competitorPresence: 2,
    searchVolume: 240,
    difficulty: 18
  },
  {
    name: 'Ipswich Central',
    region: 'Ipswich',
    postcode: '4305',
    population: 3542,
    demographics: {
      medianHouseholdIncome: 68000,
      averagePropertyValue: 450000,
      ownerOccupied: 45,
      businessDensity: 9.2
    },
    disasterRisk: {
      floodRisk: 'high',
      bushfireRisk: 'low',
      stormRisk: 'medium',
      historicalIncidents: ['2022 Bremer River Floods', '2011 Floods', '2013 Floods']
    },
    nearbySuburbs: ['East Ipswich', 'West Ipswich', 'Sadliers Crossing', 'Newtown'],
    landmarks: ['Ipswich Mall', 'Queens Park', 'Ipswich Hospital'],
    insuranceProviders: ['RACQ', 'Suncorp', 'AAMI', 'GIO', 'Woolworths Insurance'],
    competitorPresence: 5,
    searchVolume: 520,
    difficulty: 32
  },
  {
    name: 'Brassall',
    region: 'Ipswich',
    postcode: '4305',
    population: 11892,
    demographics: {
      medianHouseholdIncome: 72000,
      averagePropertyValue: 480000,
      ownerOccupied: 62,
      businessDensity: 4.8
    },
    disasterRisk: {
      floodRisk: 'medium',
      bushfireRisk: 'low',
      stormRisk: 'high',
      historicalIncidents: ['2022 Storms', '2021 Flash Flooding', '2020 Hailstorm']
    },
    nearbySuburbs: ['North Ipswich', 'Wulkuraka', 'Karrabin', 'Barellan Point'],
    landmarks: ['Brassall Shopping Centre', 'Sutton Park', 'Pine Mountain Road'],
    insuranceProviders: ['RACQ', 'Suncorp', 'Budget Direct', 'Youi', 'Coles Insurance'],
    competitorPresence: 4,
    searchVolume: 420,
    difficulty: 26
  },
  {
    name: 'Booval',
    region: 'Ipswich',
    postcode: '4304',
    population: 6854,
    demographics: {
      medianHouseholdIncome: 65000,
      averagePropertyValue: 420000,
      ownerOccupied: 58,
      businessDensity: 6.2
    },
    disasterRisk: {
      floodRisk: 'high',
      bushfireRisk: 'low',
      stormRisk: 'medium',
      historicalIncidents: ['2022 Floods', '2011 Floods', '2019 Storm Damage']
    },
    nearbySuburbs: ['Bundamba', 'Blackstone', 'Silkstone', 'East Ipswich'],
    landmarks: ['Booval Fair Shopping Centre', 'Limestone Park', 'Bundamba Creek'],
    insuranceProviders: ['RACQ', 'Suncorp', 'AAMI', 'Progressive', 'Virgin Money'],
    competitorPresence: 4,
    searchVolume: 380,
    difficulty: 24
  }
];

// Logan suburbs (Commercial and growth areas)
export const loganSuburbs: SuburbData[] = [
  {
    name: 'Springwood',
    region: 'Logan',
    postcode: '4127',
    population: 9587,
    demographics: {
      medianHouseholdIncome: 78000,
      averagePropertyValue: 620000,
      ownerOccupied: 65,
      businessDensity: 7.8
    },
    disasterRisk: {
      floodRisk: 'low',
      bushfireRisk: 'medium',
      stormRisk: 'high',
      historicalIncidents: ['2022 Storms', '2020 Hailstorm', '2019 Flash Flooding']
    },
    nearbySuburbs: ['Underwood', 'Rochedale South', 'Daisy Hill', 'Shailer Park'],
    landmarks: ['Springwood Plaza', 'Springwood Bus Station', 'Dennis Road'],
    insuranceProviders: ['RACQ', 'Suncorp', 'AAMI', 'Budget Direct', 'Youi'],
    competitorPresence: 5,
    searchVolume: 750,
    difficulty: 34
  },
  {
    name: 'Beenleigh',
    region: 'Logan',
    postcode: '4207',
    population: 8252,
    demographics: {
      medianHouseholdIncome: 62000,
      averagePropertyValue: 450000,
      ownerOccupied: 52,
      businessDensity: 6.5
    },
    disasterRisk: {
      floodRisk: 'medium',
      bushfireRisk: 'low',
      stormRisk: 'medium',
      historicalIncidents: ['2022 Logan River Floods', '2017 Cyclone Debbie', '2019 Storms']
    },
    nearbySuburbs: ['Eagleby', 'Mount Warren Park', 'Holmview', 'Edens Landing'],
    landmarks: ['Beenleigh Town Centre', 'Beenleigh Train Station', 'Logan River'],
    insuranceProviders: ['RACQ', 'Suncorp', 'GIO', 'Coles Insurance', 'Woolworths Insurance'],
    competitorPresence: 4,
    searchVolume: 580,
    difficulty: 28
  },
  {
    name: 'Shailer Park',
    region: 'Logan',
    postcode: '4128',
    population: 11751,
    demographics: {
      medianHouseholdIncome: 85000,
      averagePropertyValue: 680000,
      ownerOccupied: 72,
      businessDensity: 4.2
    },
    disasterRisk: {
      floodRisk: 'low',
      bushfireRisk: 'medium',
      stormRisk: 'medium',
      historicalIncidents: ['2022 Storms', '2020 Bushfire Threat', '2019 Hailstorm']
    },
    nearbySuburbs: ['Tanah Merah', 'Loganholme', 'Cornubia', 'Carbrook'],
    landmarks: ['Hyperdome', 'Kimberley Park', 'Chatswood Road'],
    insuranceProviders: ['RACQ', 'Suncorp', 'Allianz', 'NRMA', 'QBE'],
    competitorPresence: 3,
    searchVolume: 480,
    difficulty: 25
  },
  {
    name: 'Loganholme',
    region: 'Logan',
    postcode: '4129',
    population: 6191,
    demographics: {
      medianHouseholdIncome: 72000,
      averagePropertyValue: 580000,
      ownerOccupied: 68,
      businessDensity: 5.8
    },
    disasterRisk: {
      floodRisk: 'medium',
      bushfireRisk: 'low',
      stormRisk: 'medium',
      historicalIncidents: ['2022 Logan River Floods', '2017 Floods', '2020 Storm Damage']
    },
    nearbySuburbs: ['Tanah Merah', 'Shailer Park', 'Meadowbrook', 'Loganlea'],
    landmarks: ['Logan Hyperdome', 'Alexander Clark Park', 'Logan River Parklands'],
    insuranceProviders: ['RACQ', 'Suncorp', 'AAMI', 'Budget Direct', 'Progressive'],
    competitorPresence: 4,
    searchVolume: 520,
    difficulty: 30
  },
  {
    name: 'Browns Plains',
    region: 'Logan',
    postcode: '4118',
    population: 7154,
    demographics: {
      medianHouseholdIncome: 68000,
      averagePropertyValue: 520000,
      ownerOccupied: 60,
      businessDensity: 6.8
    },
    disasterRisk: {
      floodRisk: 'low',
      bushfireRisk: 'low',
      stormRisk: 'high',
      historicalIncidents: ['2022 Storms', '2020 Hailstorm', '2019 Flash Flooding']
    },
    nearbySuburbs: ['Regents Park', 'Heritage Park', 'Hillcrest', 'Forestdale'],
    landmarks: ['Grand Plaza Shopping Centre', 'Browns Plains Bus Station', 'Berrinba Wetlands'],
    insuranceProviders: ['RACQ', 'Suncorp', 'Youi', 'Coles Insurance', 'Virgin Money'],
    competitorPresence: 5,
    searchVolume: 620,
    difficulty: 32
  },
  {
    name: 'Waterford',
    region: 'Logan',
    postcode: '4133',
    population: 5926,
    demographics: {
      medianHouseholdIncome: 70000,
      averagePropertyValue: 480000,
      ownerOccupied: 64,
      businessDensity: 5.2
    },
    disasterRisk: {
      floodRisk: 'medium',
      bushfireRisk: 'low',
      stormRisk: 'medium',
      historicalIncidents: ['2022 Logan River Floods', '2017 Floods', '2019 Storm Damage']
    },
    nearbySuburbs: ['Bethania', 'Loganlea', 'Waterford West', 'Slacks Creek'],
    landmarks: ['Canterbury College', 'Logan River', 'Kingston Road'],
    insuranceProviders: ['RACQ', 'Suncorp', 'AAMI', 'GIO', 'Woolworths Insurance'],
    competitorPresence: 3,
    searchVolume: 380,
    difficulty: 22
  }
];

// All suburbs combined for easy access
export const allSuburbs = [...brisbaneSuburbs, ...ipswichSuburbs, ...loganSuburbs];

// Function to get suburb by name
export const getSuburbByName = (name: string): SuburbData | undefined => {
  return allSuburbs.find(suburb =>
    suburb.name.toLowerCase() === name.toLowerCase()
  );
};

// Function to get suburbs by region
export const getSuburbsByRegion = (region: string): SuburbData[] => {
  return allSuburbs.filter(suburb =>
    suburb.region.toLowerCase() === region.toLowerCase()
  );
};

// Function to get high-value suburbs (for targeting)
export const getHighValueSuburbs = (minPropertyValue: number = 1000000): SuburbData[] => {
  return allSuburbs.filter(suburb =>
    suburb.demographics.averagePropertyValue >= minPropertyValue
  );
};

// Function to get low competition suburbs (for quick wins)
export const getLowCompetitionSuburbs = (maxDifficulty: number = 30): SuburbData[] => {
  return allSuburbs.filter(suburb =>
    suburb.difficulty <= maxDifficulty
  );
};

// Function to get high-risk suburbs (for emergency services focus)
export const getHighRiskSuburbs = (): SuburbData[] => {
  return allSuburbs.filter(suburb =>
    suburb.disasterRisk.floodRisk === 'high' ||
    suburb.disasterRisk.bushfireRisk === 'high' ||
    suburb.disasterRisk.stormRisk === 'high'
  );
};