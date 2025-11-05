/**
 * Suburb Data - Complete Configuration for All Locations
 * Scalable template system for 40+ suburbs across Brisbane, Ipswich, Logan
 */

import { SuburbTemplate } from './types';

/**
 * INNER BRISBANE SUBURBS
 * High-value, heritage, riverside properties
 */
const innerBrisbane: Record<string, SuburbTemplate> = {
  'hamilton': {
    name: 'Hamilton',
    slug: 'hamilton-disaster-recovery',
    postcode: '4007',
    region: 'inner-brisbane',
    coordinates: {
      latitude: -27.4378,
      longitude: 153.0657,
    },
    distanceFromHQ: 23,
    responseTime: '25-35 minutes',
    responseTimeMinutes: 30,
    demographics: {
      medianPrice: '$2.8 million',
      population: '7,500',
      primaryPropertyTypes: ['Riverfront mansions', 'Luxury apartments', 'High-rise units'],
      secondaryPropertyTypes: ['Marina facilities'],
      householdComposition: 'CEOs, business leaders, professionals',
    },
    disasterRisks: [
      {
        type: 'water-damage',
        severity: 'critical',
        affectedProperties: ['Riverfront mansions', 'Ground-floor apartments', 'Marina properties'],
        likelihood: 'frequent',
        historicalIncidents: 'Major flooding 2011, 2022',
      },
      {
        type: 'flood',
        severity: 'high',
        affectedProperties: ['Properties within 100m of Brisbane River'],
        likelihood: 'seasonal',
      },
      {
        type: 'storm-damage',
        severity: 'high',
        affectedProperties: ['High-rise apartments', 'Exposed balconies'],
        likelihood: 'seasonal',
      },
    ],
    notableFeatures: ['Brisbane River frontage', 'Portside Wharf', 'Hamilton Harbour', 'Marina precinct'],
    floodHistory: 'Significant 2011 and 2022 flooding, especially riverside properties',
    floodZone: 'critical',
    stormRisk: 'high',
    keySpecialties: [
      'Luxury mansion restoration',
      'Waterfront property expertise',
      'High-rise apartment coordination',
      'Executive emergency response',
    ],
    uniqueCharacteristics: [
      'Brisbane River frontage creates unique flood risks',
      'Mix of heritage and modern luxury properties',
      'Marina and boat damage coordination required',
      'High-profile resident confidentiality important',
    ],
    landmarks: ['Portside Wharf', 'Hamilton Harbour', 'Eat Street Markets', 'Brett\'s Wharf', 'Captain Burke Park'],
    nearbySuburbs: ['ascot', 'bulimba', 'hawthorne', 'newstead'],
    regionParent: 'brisbane',
  },

  'new-farm': {
    name: 'New Farm',
    slug: 'new-farm-disaster-recovery',
    postcode: '4005',
    region: 'inner-brisbane',
    coordinates: {
      latitude: -27.4674,
      longitude: 153.0494,
    },
    distanceFromHQ: 20,
    responseTime: '20-30 minutes',
    responseTimeMinutes: 25,
    demographics: {
      medianPrice: '$1.8 million',
      population: '12,500',
      primaryPropertyTypes: ['Heritage Queenslanders', 'Modern apartments', 'Terrace houses'],
      householdComposition: 'Young professionals, families, artists',
    },
    disasterRisks: [
      {
        type: 'water-damage',
        severity: 'high',
        affectedProperties: ['Heritage Queenslanders', 'Ground-floor apartments', 'Garden-level units'],
        likelihood: 'frequent',
      },
      {
        type: 'mould',
        severity: 'high',
        affectedProperties: ['Older heritage properties', 'High-humidity areas'],
        likelihood: 'frequent',
      },
      {
        type: 'fire-damage',
        severity: 'medium',
        affectedProperties: ['Wooden heritage homes', 'Close-set terrace properties'],
        likelihood: 'rare',
      },
    ],
    floodHistory: 'Creek flooding from Breakfast Creek, basement water intrusion',
    keySpecialties: [
      'Heritage property restoration',
      'Queenslander specialist knowledge',
      'Mould remediation',
      'Period-correct repairs',
    ],
    uniqueCharacteristics: [
      'High concentration of heritage properties requiring specialised care',
      'Mixed commercial (galleries, restaurants) and residential areas',
      'Close-set terrace configuration requires careful planning',
      'Cultural and artistic community values aesthetic restoration',
    ],
    landmarks: ['New Farm Park', 'Breakfast Creek', 'Gallery Walk', 'New Farm Markets', 'Merthyr Road'],
    nearbySuburbs: ['hamilton', 'teneriffe', 'fortitude-valley', 'kelvin-grove'],
    regionParent: 'brisbane',
  },

  'ascot': {
    name: 'Ascot',
    slug: 'ascot-disaster-recovery',
    postcode: '4007',
    region: 'inner-brisbane',
    coordinates: {
      latitude: -27.4285,
      longitude: 153.0579,
    },
    distanceFromHQ: 22,
    responseTime: '25-35 minutes',
    responseTimeMinutes: 30,
    demographics: {
      medianPrice: '$2.4 million',
      population: '6,000',
      primaryPropertyTypes: ['Luxury homes', 'Heritage Queenslanders', 'Executive estates'],
    },
    disasterRisks: [
      {
        type: 'flood',
        severity: 'high',
        affectedProperties: ['Properties near Breakfast Creek', 'Low-lying areas'],
        likelihood: 'seasonal',
        historicalIncidents: '2011 and 2022 Brisbane floods affected waterfront areas',
      },
      {
        type: 'storm-damage',
        severity: 'high',
        affectedProperties: ['Exposed properties', 'Large trees'],
        likelihood: 'seasonal',
      },
    ],
    floodHistory: 'Affected by 2011 and 2022 Brisbane floods, particularly properties near Breakfast Creek',
    floodZone: 'high',
    keySpecialties: [
      'Luxury property restoration',
      'Racecourse precinct expertise',
      'Heritage home specialists',
      'High-end content protection',
    ],
    uniqueCharacteristics: [
      'Prestigious racecourse area with ultra-high-value properties',
      'Established wealthy demographic requiring discrete service',
      'Mix of heritage and contemporary architecture',
    ],
    landmarks: ['Eagle Farm Racecourse', 'Doomben Racecourse', 'Ascot State School', 'Oriel Park'],
    nearbySuburbs: ['hamilton', 'eagle-farm', 'clayfield', 'hendra'],
    regionParent: 'brisbane',
  },

  'toowong': {
    name: 'Toowong',
    slug: 'toowong-disaster-recovery',
    postcode: '4066',
    region: 'inner-brisbane',
    coordinates: {
      latitude: -27.4837,
      longitude: 152.9956,
    },
    distanceFromHQ: 18,
    responseTime: '20-30 minutes',
    responseTimeMinutes: 25,
    demographics: {
      medianPrice: '$1.9 million',
      population: '10,000',
      primaryPropertyTypes: ['Heritage homes', 'Modern townhouses', 'University-area properties'],
    },
    disasterRisks: [
      {
        type: 'subsidence',
        severity: 'medium',
        affectedProperties: ['Elevated properties on hillsides'],
        likelihood: 'rare',
      },
      {
        type: 'water-damage',
        severity: 'medium',
        affectedProperties: ['Lower-level apartments', 'Garden-level units'],
        likelihood: 'frequent',
      },
      {
        type: 'storm-damage',
        severity: 'high',
        affectedProperties: ['Exposed hillside properties'],
        likelihood: 'seasonal',
      },
    ],
    keySpecialties: [
      'Heritage home restoration',
      'Hillside property specialists',
      'University precinct knowledge',
      'Rental property repairs',
    ],
    uniqueCharacteristics: [
      'Hilly topography with unique subsidence and drainage challenges',
      'High student population with rental properties',
      'Mix of heritage and contemporary architecture',
      'Proximity to University of Queensland',
    ],
    landmarks: ['University of Queensland', 'Toowong Pool', 'Toowong Village', 'Toowong Cemetery'],
    nearbySuburbs: ['auchenflower', 'indooroopilly', 'west-end', 'milton'],
    regionParent: 'brisbane',
  },

  'milton': {
    name: 'Milton',
    slug: 'milton-disaster-recovery',
    postcode: '4064',
    region: 'inner-brisbane',
    coordinates: {
      latitude: -27.4712,
      longitude: 153.0043,
    },
    distanceFromHQ: 16,
    responseTime: '15-25 minutes',
    responseTimeMinutes: 20,
    demographics: {
      medianPrice: '$1.6 million',
      population: '8,500',
      primaryPropertyTypes: ['Entertainment venues', 'Commercial buildings', 'Modern apartments', 'Terrace houses'],
      secondaryPropertyTypes: ['Sports facilities', 'Retail spaces'],
      householdComposition: 'Young professionals, entertainment workers, sports fans',
    },
    disasterRisks: [
      {
        type: 'water-damage',
        severity: 'high',
        affectedProperties: ['Ground-floor commercial', 'Basement car parks', 'Entertainment venues'],
        likelihood: 'frequent',
        historicalIncidents: '2011 Brisbane floods severely impacted Suncorp Stadium precinct',
      },
      {
        type: 'flood',
        severity: 'critical',
        affectedProperties: ['Properties within 200m of Brisbane River', 'Low-lying commercial areas'],
        likelihood: 'seasonal',
      },
      {
        type: 'fire-damage',
        severity: 'medium',
        affectedProperties: ['Commercial kitchens', 'Entertainment venues', 'Densely packed terraces'],
        likelihood: 'occasional',
      },
      {
        type: 'storm-damage',
        severity: 'high',
        affectedProperties: ['Stadium facilities', 'Outdoor entertainment areas', 'High-rise apartments'],
        likelihood: 'seasonal',
      },
    ],
    notableFeatures: ['Suncorp Stadium', 'XXXX Brewery', 'Park Road entertainment precinct', 'Brisbane River access'],
    floodHistory: 'Major 2011 flooding affected entire precinct including Suncorp Stadium, significant 2022 impact',
    floodZone: 'critical',
    stormRisk: 'high',
    keySpecialties: [
      'Commercial property restoration',
      'Entertainment venue specialists',
      'Sports facility emergency response',
      'High-traffic business continuity',
      'Restaurant and bar restoration',
    ],
    uniqueCharacteristics: [
      'Major entertainment and sports precinct requiring rapid response',
      'High concentration of commercial properties and businesses',
      'Critical business continuity needs for venues and retailers',
      'Mix of heritage terraces and modern developments',
      'Proximity to Brisbane River creates flood risk',
    ],
    landmarks: ['Suncorp Stadium', 'XXXX Brewery', 'Park Road', 'Milton Tennis Centre', 'Frew Park'],
    nearbySuburbs: ['toowong', 'auchenflower', 'paddington', 'west-end'],
    regionParent: 'brisbane',
  },

  'west-end': {
    name: 'West End',
    slug: 'west-end-disaster-recovery',
    postcode: '4101',
    region: 'inner-brisbane',
    coordinates: {
      latitude: -27.4817,
      longitude: 153.0095,
    },
    distanceFromHQ: 14,
    responseTime: '15-20 minutes',
    responseTimeMinutes: 17,
    demographics: {
      medianPrice: '$1.3 million',
      population: '11,000',
      primaryPropertyTypes: ['Riverside apartments', 'Modern high-rises', 'Heritage Queenslanders', 'Student housing'],
      secondaryPropertyTypes: ['Commercial restaurants', 'Retail spaces'],
      householdComposition: 'Young professionals, students, artists, multicultural families',
    },
    disasterRisks: [
      {
        type: 'flood',
        severity: 'critical',
        affectedProperties: ['Riverside apartments', 'Ground-floor units', 'Basement car parks', 'Commercial properties'],
        likelihood: 'frequent',
        historicalIncidents: '2011 and 2022 Brisbane floods caused severe damage, particularly riverside developments',
      },
      {
        type: 'water-damage',
        severity: 'critical',
        affectedProperties: ['Riverside properties', 'Low-lying apartments', 'Heritage homes near river'],
        likelihood: 'frequent',
      },
      {
        type: 'mould',
        severity: 'high',
        affectedProperties: ['Post-flood properties', 'High-humidity riverside units', 'Basement areas'],
        likelihood: 'frequent',
      },
      {
        type: 'storm-damage',
        severity: 'medium',
        affectedProperties: ['High-rise balconies', 'Exposed riverside developments'],
        likelihood: 'seasonal',
      },
    ],
    notableFeatures: ['Brisbane River frontage', 'Boundary Street precinct', 'West End Markets', 'Cultural diversity hub'],
    floodHistory: 'Critical flood zone with major 2011 and 2022 flooding events, extensive riverside damage',
    floodZone: 'critical',
    stormRisk: 'medium',
    keySpecialties: [
      'Riverside apartment restoration',
      'High-rise flood recovery',
      'Heritage Queenslander repairs',
      'Multi-unit building coordination',
      'Post-flood mould remediation',
      'Commercial restaurant restoration',
    ],
    uniqueCharacteristics: [
      'One of Brisbane\'s highest flood risk areas due to riverside location',
      'Dense mix of modern high-rises and heritage homes',
      'Vibrant commercial precinct requires rapid business restoration',
      'Multicultural community with diverse property needs',
      'Student housing requires quick turnaround during term time',
    ],
    landmarks: ['South Bank Parklands', 'Boundary Street', 'West End Markets', 'Davies Park', 'Brisbane River'],
    nearbySuburbs: ['south-brisbane', 'milton', 'highgate-hill', 'toowong'],
    regionParent: 'brisbane',
  },

  'paddington': {
    name: 'Paddington',
    slug: 'paddington-disaster-recovery',
    postcode: '4064',
    region: 'inner-brisbane',
    coordinates: {
      latitude: -27.4598,
      longitude: 153.0098,
    },
    distanceFromHQ: 17,
    responseTime: '20-30 minutes',
    responseTimeMinutes: 25,
    demographics: {
      medianPrice: '$2.1 million',
      population: '7,200',
      primaryPropertyTypes: ['Heritage Queenslanders', 'Character terraces', 'Renovated workers cottages', 'Boutique apartments'],
      householdComposition: 'Professionals, families, heritage enthusiasts, creative class',
    },
    disasterRisks: [
      {
        type: 'fire-damage',
        severity: 'high',
        affectedProperties: ['Wooden Queenslanders', 'Historic workers cottages', 'Close-set terrace houses'],
        likelihood: 'occasional',
        historicalIncidents: 'Historic suburb with older wooden structures vulnerable to fire spread',
      },
      {
        type: 'water-damage',
        severity: 'medium',
        affectedProperties: ['Hillside properties', 'Homes with poor drainage', 'Basement-level areas'],
        likelihood: 'frequent',
      },
      {
        type: 'storm-damage',
        severity: 'high',
        affectedProperties: ['Elevated Queenslanders', 'Properties with large trees', 'Exposed hilltop homes'],
        likelihood: 'seasonal',
      },
      {
        type: 'mould',
        severity: 'medium',
        affectedProperties: ['Under-house areas of Queenslanders', 'Older properties with ventilation issues'],
        likelihood: 'occasional',
      },
    ],
    notableFeatures: ['Heritage character suburb', 'Given Terrace shopping', 'Latrobe Terrace cafes', 'Hilly terrain'],
    floodHistory: 'Minimal flood risk due to elevation, but drainage issues from hillside location',
    floodZone: 'low',
    stormRisk: 'high',
    keySpecialties: [
      'Heritage Queenslander restoration',
      'Period-correct carpentry and joinery',
      'Character property preservation',
      'Fire damage restoration for wooden homes',
      'Hillside drainage solutions',
      'Under-house ventilation and moisture control',
    ],
    uniqueCharacteristics: [
      'Premium heritage suburb requiring specialist restoration knowledge',
      'High concentration of protected and character buildings',
      'Hilly topography creates unique drainage challenges',
      'Owners prioritise authentic heritage restoration',
      'Wooden construction increases fire risk',
      'Close-set properties require careful planning to prevent damage spread',
    ],
    landmarks: ['Given Terrace', 'Latrobe Terrace', 'Paddington Central', 'Rosalie Village', 'Caxton Street'],
    nearbySuburbs: ['milton', 'red-hill', 'bardon', 'auchenflower'],
    regionParent: 'brisbane',
  },

  'bulimba': {
    name: 'Bulimba',
    slug: 'bulimba-disaster-recovery',
    postcode: '4171',
    region: 'inner-brisbane',
    coordinates: {
      latitude: -27.4534,
      longitude: 153.0605,
    },
    distanceFromHQ: 19,
    responseTime: '20-30 minutes',
    responseTimeMinutes: 25,
    demographics: {
      medianPrice: '$2.3 million',
      population: '6,800',
      primaryPropertyTypes: ['Riverfront estates', 'Heritage Queenslanders', 'Renovated character homes', 'Modern luxury builds'],
      householdComposition: 'Affluent families, executives, retirees, heritage property owners',
    },
    disasterRisks: [
      {
        type: 'flood',
        severity: 'critical',
        affectedProperties: ['Riverfront properties', 'Homes within 100m of Brisbane River', 'Low-lying estates'],
        likelihood: 'seasonal',
        historicalIncidents: '2011 and 2022 Brisbane floods severely impacted riverfront homes',
      },
      {
        type: 'water-damage',
        severity: 'high',
        affectedProperties: ['Riverfront mansions', 'Heritage Queenslanders', 'Basement areas', 'Ground-floor living areas'],
        likelihood: 'frequent',
      },
      {
        type: 'storm-damage',
        severity: 'high',
        affectedProperties: ['Riverfront properties', 'Large established trees', 'Exposed elevated homes'],
        likelihood: 'seasonal',
      },
      {
        type: 'mould',
        severity: 'medium',
        affectedProperties: ['Post-flood properties', 'Heritage homes with poor ventilation', 'Riverside humidity exposure'],
        likelihood: 'occasional',
      },
    ],
    notableFeatures: ['Brisbane River frontage', 'Oxford Street village', 'Bulimba Ferry', 'Hawthorne Park'],
    floodHistory: 'Significant flooding in 2011 and 2022, particularly riverfront properties and low-lying areas',
    floodZone: 'critical',
    stormRisk: 'high',
    keySpecialties: [
      'Luxury riverfront property restoration',
      'Heritage Queenslander specialists',
      'High-value content protection and restoration',
      'Executive-level service and discretion',
      'Flood recovery for prestigious properties',
      'Period-correct heritage restoration',
    ],
    uniqueCharacteristics: [
      'Prestigious riverside suburb with ultra-high property values',
      'Mix of heritage character homes and modern luxury builds',
      'Riverfront location creates critical flood risk',
      'Wealthy demographic requires white-glove service approach',
      'Heritage properties need specialist restoration expertise',
      'Close-knit village atmosphere values local reputation',
    ],
    landmarks: ['Oxford Street', 'Bulimba Ferry Terminal', 'Hawthorne Park', 'Bulimba Memorial Park', 'Brisbane River'],
    nearbySuburbs: ['hawthorne', 'balmoral', 'morningside', 'hamilton'],
    regionParent: 'brisbane',
  },
};

/**
 * OUTER BRISBANE SUBURBS
 * Suburban, family-focused, commercial centres
 */
const outerBrisbane: Record<string, SuburbTemplate> = {
  'chermside': {
    name: 'Chermside',
    slug: 'chermside-disaster-recovery',
    postcode: '4032',
    region: 'outer-brisbane',
    coordinates: {
      latitude: -27.3870,
      longitude: 153.0796,
    },
    distanceFromHQ: 27,
    responseTime: '35-45 minutes',
    responseTimeMinutes: 40,
    demographics: {
      medianPrice: '$750,000',
      population: '14,000',
      primaryPropertyTypes: ['Family homes', 'Modern units', 'Commercial retail'],
      householdComposition: 'Families, young families, retirees',
    },
    disasterRisks: [
      {
        type: 'water-damage',
        severity: 'medium',
        affectedProperties: ['Ground-floor apartments', 'Commercial spaces'],
        likelihood: 'frequent',
      },
      {
        type: 'storm-damage',
        severity: 'medium',
        affectedProperties: ['Retail properties', 'Exposed shopfronts'],
        likelihood: 'seasonal',
      },
    ],
    keySpecialties: [
      'Suburban family home restoration',
      'Commercial property repair',
      'Shopping centre emergency response',
      'Retail water damage mitigation',
    ],
    uniqueCharacteristics: [
      'Major commercial hub with Chermside Shopping Centre',
      'High volume of family-oriented residential properties',
      'Mixed residential and retail density',
      'Significant storm exposure due to open areas',
    ],
    landmarks: ['Chermside Shopping Centre', 'Woolworths', 'Westfield', 'Chermside Pool'],
    nearbySuburbs: ['brown-plains', 'stafford', 'carseldine', 'sandgate'],
    regionParent: 'brisbane',
  },

  'carindale': {
    name: 'Carindale',
    slug: 'carindale-disaster-recovery',
    postcode: '4152',
    region: 'outer-brisbane',
    coordinates: {
      latitude: -27.5520,
      longitude: 153.1141,
    },
    distanceFromHQ: 28,
    responseTime: '35-50 minutes',
    responseTimeMinutes: 42,
    demographics: {
      medianPrice: '$650,000',
      population: '10,500',
      primaryPropertyTypes: ['Suburban homes', 'Modern apartments', 'Shopping centre'],
      householdComposition: 'Families, young professionals',
    },
    disasterRisks: [
      {
        type: 'water-damage',
        severity: 'medium',
        affectedProperties: ['Low-lying properties', 'Drainage-prone areas'],
        likelihood: 'frequent',
      },
      {
        type: 'storm-damage',
        severity: 'medium',
        affectedProperties: ['Open suburban properties'],
        likelihood: 'seasonal',
      },
    ],
    keySpecialties: [
      'Family home restoration',
      'Commercial property services',
      'Shopping centre emergency response',
      'Rapid residential turnaround',
    ],
    uniqueCharacteristics: [
      'Major shopping and entertainment precinct',
      'Established suburban family community',
      'Mix of older and newer homes',
      'Good accessibility for emergency response',
    ],
    landmarks: ['Westfield Carindale', 'Event Cinemas', 'Spring Garden Shopping Centre', 'Carindale Pool'],
    nearbySuburbs: ['camp-hill', 'mount-gravatt', 'carina', 'curved-pines'],
    regionParent: 'brisbane',
  },
};

/**
 * IPSWICH SUBURBS
 * Growth corridor, new development, suburban expansion
 */
const ipswich: Record<string, SuburbTemplate> = {
  'springfield-lakes': {
    name: 'Springfield Lakes',
    slug: 'springfield-lakes-disaster-recovery',
    postcode: '4300',
    region: 'ipswich',
    coordinates: {
      latitude: -27.7193,
      longitude: 152.7876,
    },
    distanceFromHQ: 55,
    responseTime: '60-75 minutes',
    responseTimeMinutes: 67,
    demographics: {
      medianPrice: '$550,000',
      population: '8,500',
      primaryPropertyTypes: ['Modern homes', 'New estates', 'Family houses'],
      householdComposition: 'Young families, growing households',
    },
    disasterRisks: [
      {
        type: 'water-damage',
        severity: 'medium',
        affectedProperties: ['New construction properties', 'Low-lying blocks'],
        likelihood: 'frequent',
      },
      {
        type: 'storm-damage',
        severity: 'low',
        affectedProperties: ['Newer properties', 'Established trees'],
        likelihood: 'seasonal',
      },
    ],
    keySpecialties: [
      'New construction defect management',
      'Family home water damage',
      'Builder coordination',
      'Growth corridor expertise',
    ],
    uniqueCharacteristics: [
      'Major growth corridor with rapid new home development',
      'Master-planned community with lakes and facilities',
      'High percentage of young first-time homebuyers',
      'Modern construction standards throughout',
      'Inland location with lower storm exposure',
    ],
    landmarks: ['Springfield Lake', 'Town centre', 'Springfield Sporting Complex', 'Shopping precinct'],
    nearbySuburbs: ['karalee', 'brookwater', 'forest-lake', 'ipswich-cbd'],
    regionParent: 'ipswich',
  },

  'karalee': {
    name: 'Karalee',
    slug: 'karalee-disaster-recovery',
    postcode: '4306',
    region: 'ipswich',
    coordinates: {
      latitude: -27.7432,
      longitude: 152.8215,
    },
    distanceFromHQ: 52,
    responseTime: '55-70 minutes',
    responseTimeMinutes: 62,
    demographics: {
      medianPrice: '$575,000',
      population: '6,000',
      primaryPropertyTypes: ['Executive homes', 'Spacious family houses', 'Golf course properties'],
      householdComposition: 'Established families, professionals',
    },
    disasterRisks: [
      {
        type: 'water-damage',
        severity: 'low',
        affectedProperties: ['Properties on elevated terrain'],
        likelihood: 'rare',
      },
      {
        type: 'storm-damage',
        severity: 'low',
        affectedProperties: ['Open golf course areas'],
        likelihood: 'seasonal',
      },
    ],
    keySpecialties: [
      'Executive home restoration',
      'Golf course property specialists',
      'Luxury suburban homes',
      'Spacious property management',
    ],
    uniqueCharacteristics: [
      'Elevated location with lower flood risk',
      'Karalee Golf Club and exclusive properties',
      'Spacious home blocks with established gardens',
      'Executive and professional demographic',
      'Premium suburban community',
    ],
    landmarks: ['Karalee Golf Club', 'Karalee Village Shopping Centre', 'Scenic lakes and reserves'],
    nearbySuburbs: ['springfield-lakes', 'brookwater', 'forest-lake'],
    regionParent: 'ipswich',
  },

  'brookwater': {
    name: 'Brookwater',
    slug: 'brookwater-disaster-recovery',
    postcode: '4300',
    region: 'ipswich',
    coordinates: {
      latitude: -27.7547,
      longitude: 152.8389,
    },
    distanceFromHQ: 54,
    responseTime: '60-75 minutes',
    responseTimeMinutes: 67,
    demographics: {
      medianPrice: '$520,000',
      population: '4,500',
      primaryPropertyTypes: ['Family homes', 'New estates', 'Townhouses'],
      householdComposition: 'Young families, first-time buyers',
    },
    disasterRisks: [
      {
        type: 'water-damage',
        severity: 'medium',
        affectedProperties: ['New construction homes', 'Drainage-prone areas'],
        likelihood: 'frequent',
      },
    ],
    keySpecialties: [
      'New home water damage',
      'Builder defect coordination',
      'Young family home restoration',
      'Construction defect expertise',
    ],
    uniqueCharacteristics: [
      'Master-planned estate community',
      'Predominantly new homes with warranties',
      'Family-focused amenities and facilities',
      'Rapid infrastructure development',
      'Young, growing demographic',
    ],
    landmarks: ['Brookwater Town centre', 'Community lake', 'Shopping precinct', 'Recreation facilities'],
    nearbySuburbs: ['springfield-lakes', 'karalee', 'forest-lake'],
    regionParent: 'ipswich',
  },
};

/**
 * LOGAN SUBURBS
 * Growth areas, commercial-residential mix
 */
const logan: Record<string, SuburbTemplate> = {
  'springwood': {
    name: 'Springwood',
    slug: 'springwood-disaster-recovery',
    postcode: '4127',
    region: 'logan',
    coordinates: {
      latitude: -27.8263,
      longitude: 153.1174,
    },
    distanceFromHQ: 45,
    responseTime: '50-65 minutes',
    responseTimeMinutes: 57,
    demographics: {
      medianPrice: '$450,000',
      population: '8,000',
      primaryPropertyTypes: ['Family homes', 'Investment properties', 'Commercial spaces'],
      householdComposition: 'Working families, investors',
    },
    disasterRisks: [
      {
        type: 'water-damage',
        severity: 'medium',
        affectedProperties: ['Ground-floor properties', 'Commercial spaces'],
        likelihood: 'frequent',
      },
      {
        type: 'storm-damage',
        severity: 'medium',
        affectedProperties: ['Commercial buildings'],
        likelihood: 'seasonal',
      },
    ],
    keySpecialties: [
      'Family home restoration',
      'Commercial property damage',
      'Investment property management',
      'Rapid turnaround services',
    ],
    uniqueCharacteristics: [
      'Mixed residential and commercial area',
      'Growing employment hub',
      'Affordable housing with investment appeal',
      'Good road access for service delivery',
    ],
    landmarks: ['Springwood Business District', 'Shopping centres', 'Transport hubs'],
    nearbySuburbs: ['beenleigh', 'browns-plains', 'waterford'],
    regionParent: 'logan',
  },
};

/**
 * BAYSIDE & HINTERLAND SUBURBS
 */
const bayside: Record<string, SuburbTemplate> = {
  'wynnum': {
    name: 'Wynnum',
    slug: 'wynnum-disaster-recovery',
    postcode: '4178',
    region: 'bayside',
    coordinates: {
      latitude: -27.4645,
      longitude: 153.1702,
    },
    distanceFromHQ: 33,
    responseTime: '40-50 minutes',
    responseTimeMinutes: 45,
    demographics: {
      medianPrice: '$890,000',
      population: '11,000',
      primaryPropertyTypes: ['Beach homes', 'Coastal apartments', 'Waterfront properties'],
      householdComposition: 'Beach-loving families, retirees',
    },
    disasterRisks: [
      {
        type: 'storm-surge',
        severity: 'high',
        affectedProperties: ['Beachfront properties', 'Elevated waterfront homes'],
        likelihood: 'seasonal',
        historicalIncidents: 'Cyclone season flooding common',
      },
      {
        type: 'water-damage',
        severity: 'medium',
        affectedProperties: ['Ground-floor apartments'],
        likelihood: 'frequent',
      },
      {
        type: 'mould',
        severity: 'medium',
        affectedProperties: ['High-humidity waterfront properties'],
        likelihood: 'frequent',
      },
    ],
    floodZone: 'high',
    stormRisk: 'high',
    keySpecialties: [
      'Coastal property experts',
      'Storm surge damage',
      'Salt corrosion remediation',
      'Waterfront restoration',
    ],
    uniqueCharacteristics: [
      'Bayside location creates unique storm surge risks',
      'Salt air affects materials and finishes',
      'High humidity increases mould risk',
      'Premium beach community with expensive properties',
    ],
    landmarks: ['Wynnum Beach', 'Manly Beach', 'Bayside shopping', 'Waterfront parks'],
    nearbySuburbs: ['manly', 'lytton', 'tingalpa'],
    regionParent: 'brisbane',
  },
};

/**
 * Combine all suburb data
 */
export const allSuburbData: Record<string, SuburbTemplate> = {
  ...innerBrisbane,
  ...outerBrisbane,
  ...ipswich,
  ...logan,
  ...bayside,
};

/**
 * Get suburb by slug
 */
export function getSuburbData(slug: string): SuburbTemplate | undefined {
  return allSuburbData[slug];
}

/**
 * Get all suburbs in a region
 */
export function getSuburbsByRegion(region: string): SuburbTemplate[] {
  return Object.values(allSuburbData).filter(s => s.region === region);
}

/**
 * Get nearby suburb names for linking
 */
export function getNearbySuburbNames(
  slug: string
): Record<string, string> {
  const suburb = allSuburbData[slug];
  if (!suburb) return {};

  const nearby: Record<string, string> = {};
  suburb.nearbySuburbs.forEach(nearbySlug => {
    const nearbySuburb = allSuburbData[nearbySlug];
    if (nearbySuburb) {
      nearby[nearbySlug] = nearbySuburb.name;
    }
  });

  return nearby;
}

/**
 * Get all suburb slugs (for sitemap, routing, etc.)
 */
export function getAllSuburbSlugs(): string[] {
  return Object.keys(allSuburbData);
}

/**
 * Get statistics on coverage
 */
export function getCoverageStatistics() {
  return {
    totalSuburbs: Object.keys(allSuburbData).length,
    byRegion: {
      'inner-brisbane': getSuburbsByRegion('inner-brisbane').length,
      'outer-brisbane': getSuburbsByRegion('outer-brisbane').length,
      'bayside': getSuburbsByRegion('bayside').length,
      'ipswich': getSuburbsByRegion('ipswich').length,
      'logan': getSuburbsByRegion('logan').length,
    },
    totalPopulation: Object.values(allSuburbData).reduce((sum, s) => {
      const pop = parseInt(s.demographics.population?.replace(/,/g, '') || '0');
      return sum + pop;
    }, 0),
  };
}
