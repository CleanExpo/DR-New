// Location Data for Brisbane and Ipswich suburbs
export interface SuburbData {
  name: string;
  slug: string;
  postcode: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  distanceFromWacol: number; // in km
  responseTime: string; // estimated response time
  demographics: {
    medianHousePrice?: string;
    population?: string;
    propertyType: string;
  };
  landmarks: string[];
  disasterRisks: string[];
  floodHistory?: string;
  uniqueSellingPoints: string[];
  localInsights: string;
  serviceAreas: string[]; // nearby areas also serviced
  heroImage?: string; // Optional: path to location-specific hero image
  heroImageAlt?: string; // Optional: alt text for hero image
}

export const suburbData: Record<string, SuburbData> = {
  'ascot': {
    name: 'Ascot',
    slug: 'ascot-disaster-recovery',
    postcode: '4007',
    coordinates: {
      latitude: -27.4285,
      longitude: 153.0579
    },
    distanceFromWacol: 22,
    responseTime: '25-35 minutes',
    demographics: {
      medianHousePrice: '$2.4 million',
      population: '6,000',
      propertyType: 'Luxury homes, Heritage Queenslanders'
    },
    landmarks: ['Eagle Farm Racecourse', 'Doomben Racecourse', 'Ascot State School', 'Oriel Park'],
    disasterRisks: ['Flash flooding', 'Storm damage', 'Heritage property vulnerabilities'],
    floodHistory: 'Affected by 2011 and 2022 Brisbane floods, particularly properties near Breakfast Creek',
    uniqueSellingPoints: [
      'Specialists in luxury and heritage property restoration',
      'Discreet service for high-profile residents',
      'Experience with high-value contents and artwork',
      'Direct billing with premium insurers'
    ],
    localInsights: 'Ascot\'s prestigious properties require specialised restoration techniques, particularly for heritage Queenslanders and luxury finishes.',
    serviceAreas: ['Hamilton', 'Clayfield', 'Eagle Farm', 'Hendra'],
    heroImage: '/images/fleet/ascot-storm-damage-service-vehicle.png',
    heroImageAlt: 'Disaster Recovery service vehicle responding to storm damage emergency in Ascot Brisbane premium suburb'
  },
  'hamilton': {
    name: 'Hamilton',
    slug: 'hamilton-disaster-recovery',
    postcode: '4007',
    coordinates: {
      latitude: -27.4378,
      longitude: 153.0657
    },
    distanceFromWacol: 23,
    responseTime: '25-35 minutes',
    demographics: {
      medianHousePrice: '$2.8 million',
      population: '7,500',
      propertyType: 'Waterfront mansions, Luxury apartments'
    },
    landmarks: ['Portside Wharf', 'Hamilton Harbour', 'Eat Street Markets', 'Brett\'s Wharf'],
    disasterRisks: ['Riverfront flooding', 'Storm surge', 'High-rise water damage'],
    floodHistory: 'Significant flooding in 2011 and 2022, especially riverside properties along Kingsford Smith Drive',
    uniqueSellingPoints: [
      'Waterfront property specialists',
      'High-rise apartment restoration expertise',
      'Marina and boat damage coordination',
      'Luxury apartment building certified'
    ],
    localInsights: 'Hamilton\'s mix of waterfront mansions and luxury apartments requires diverse restoration capabilities, from basement flooding to high-rise water damage.',
    serviceAreas: ['Ascot', 'Bulimba', 'Hawthorne', 'Newstead'],
    heroImage: '/images/fleet/hamilton-property-damage-service-vehicle.png',
    heroImageAlt: 'Disaster Recovery service vehicle at waterfront property damage site in Hamilton Brisbane riverside premium suburb'
  },
  'new-farm': {
    name: 'New Farm',
    slug: 'new-farm-disaster-recovery',
    postcode: '4005',
    coordinates: {
      latitude: -27.4674,
      longitude: 153.0494
    },
    distanceFromWacol: 20,
    responseTime: '20-30 minutes',
    demographics: {
      medianHousePrice: '$1.8 million',
      population: '12,500',
      propertyType: 'Heritage homes, Modern apartments'
    },
    landmarks: ['New Farm Park', 'Brisbane Powerhouse', 'James Street', 'Merthyr Village'],
    disasterRisks: ['River flooding', 'Storm water backup', 'Heritage building vulnerabilities'],
    floodHistory: 'Major flooding in 1974, 2011, and 2022 floods, with riverside properties most affected',
    uniqueSellingPoints: [
      'Heritage Queenslander restoration experts',
      'Art gallery and cultural precinct experience',
      'Apartment complex water damage specialists',
      'Brunswick Street business recovery'
    ],
    localInsights: 'New Farm\'s peninsula location makes it vulnerable to flooding from multiple directions, requiring rapid response capabilities.',
    serviceAreas: ['Teneriffe', 'Newstead', 'Fortitude Valley', 'Kangaroo Point'],
    heroImage: '/images/fleet/new-farm-commercial-storm-damage-vehicle.png',
    heroImageAlt: 'Disaster Recovery commercial services vehicle responding to storm damage in New Farm Brisbane CBD fringe business district'
  },
  'teneriffe': {
    name: 'Teneriffe',
    slug: 'teneriffe-disaster-recovery',
    postcode: '4005',
    coordinates: {
      latitude: -27.4548,
      longitude: 153.0533
    },
    distanceFromWacol: 21,
    responseTime: '20-30 minutes',
    demographics: {
      medianHousePrice: '$1.6 million',
      population: '5,000',
      propertyType: 'Converted warehouses, Luxury apartments'
    },
    landmarks: ['Gasworks Plaza', 'Teneriffe Ferry Terminal', 'Commercial Road dining', 'Woolstores'],
    disasterRisks: ['River flooding', 'Underground parking flooding', 'Warehouse conversion issues'],
    floodHistory: 'Severely impacted by 2011 and 2022 floods, particularly ground floor and basement areas',
    uniqueSellingPoints: [
      'Warehouse conversion specialists',
      'Underground parking water extraction',
      'Commercial kitchen restoration',
      'Historic woolstore expertise'
    ],
    localInsights: 'Teneriffe\'s converted warehouse apartments present unique challenges with exposed beams, high ceilings, and industrial features requiring specialised drying techniques.',
    serviceAreas: ['New Farm', 'Newstead', 'Bulimba', 'Hamilton']
  },
  'brookfield': {
    name: 'Brookfield',
    slug: 'brookfield-disaster-recovery',
    postcode: '4069',
    coordinates: {
      latitude: -27.4997,
      longitude: 152.9083
    },
    distanceFromWacol: 12,
    responseTime: '15-20 minutes',
    demographics: {
      medianHousePrice: '$1.9 million',
      population: '3,500',
      propertyType: 'Acreage estates, Luxury rural properties'
    },
    landmarks: ['Brookfield General Store', 'Brookfield Hall', 'Gold Creek Reservoir', 'Showgrounds'],
    disasterRisks: ['Bush fire smoke damage', 'Storm damage to large properties', 'Creek flooding'],
    floodHistory: 'Creek flooding affects lower-lying properties during heavy rain events',
    uniqueSellingPoints: [
      'Large acreage property specialists',
      'Equestrian facility restoration',
      'Swimming pool and tennis court repairs',
      'Bush fire smoke damage experts'
    ],
    localInsights: 'Brookfield\'s semi-rural luxury estates require equipment capable of accessing long driveways and managing large-scale property damage.',
    serviceAreas: ['Chapel Hill', 'Pullenvale', 'Kenmore', 'Upper Brookfield']
  },
  'chapel-hill': {
    name: 'Chapel Hill',
    slug: 'chapel-hill-disaster-recovery',
    postcode: '4069',
    coordinates: {
      latitude: -27.5047,
      longitude: 152.9517
    },
    distanceFromWacol: 9,
    responseTime: '10-15 minutes',
    demographics: {
      medianHousePrice: '$1.4 million',
      population: '10,000',
      propertyType: 'Family homes, Executive residences'
    },
    landmarks: ['Chapel Hill State School', 'Mt Coot-tha', 'Indooroopilly Golf Club', 'Chapel Hill Marketplace'],
    disasterRisks: ['Storm damage', 'Slope-related water damage', 'Retaining wall failures'],
    floodHistory: 'Generally elevated above flood zones, but experiences localised flooding during extreme rain',
    uniqueSellingPoints: [
      'Hillside property water diversion',
      'Retaining wall water damage experts',
      'Executive home restoration',
      'Quick response from nearby Wacol base'
    ],
    localInsights: 'Chapel Hill\'s sloped terrain can channel water into homes during storms, requiring expertise in hillside water management and structural drying.',
    serviceAreas: ['Kenmore', 'Indooroopilly', 'Brookfield', 'Fig Tree Pocket']
  },
  'fig-tree-pocket': {
    name: 'Fig Tree Pocket',
    slug: 'fig-tree-pocket-disaster-recovery',
    postcode: '4069',
    coordinates: {
      latitude: -27.5267,
      longitude: 152.9667
    },
    distanceFromWacol: 8,
    responseTime: '10-15 minutes',
    demographics: {
      medianHousePrice: '$1.3 million',
      population: '4,000',
      propertyType: 'Riverside estates, Family homes'
    },
    landmarks: ['Lone Pine Koala Sanctuary', 'Brisbane River', 'Fig Tree Pocket Equestrian Club', 'Cubberla Creek'],
    disasterRisks: ['River flooding', 'Creek flooding', 'Storm water runoff'],
    floodHistory: 'Low-lying areas near the river severely affected in 2011 and 2022 floods',
    uniqueSellingPoints: [
      'Riverside property flood specialists',
      'Rapid response from Wacol base',
      'Equestrian property restoration',
      'Coordination with wildlife sanctuary'
    ],
    localInsights: 'Fig Tree Pocket\'s riverside location requires immediate response during flood events, with our Wacol base providing the fastest response times.',
    serviceAreas: ['Chapel Hill', 'Kenmore', 'Indooroopilly', 'Chelmer']
  },
  'pullenvale': {
    name: 'Pullenvale',
    slug: 'pullenvale-disaster-recovery',
    postcode: '4069',
    coordinates: {
      latitude: -27.5233,
      longitude: 152.8833
    },
    distanceFromWacol: 14,
    responseTime: '15-25 minutes',
    demographics: {
      medianHousePrice: '$2.1 million',
      population: '2,000',
      propertyType: 'Acreage estates, Rural luxury homes'
    },
    landmarks: ['Pullenvale Hall', 'Pullenvale State School', 'Pullenvale Forest', 'Moggill Creek'],
    disasterRisks: ['Bush fire risk', 'Storm damage to large properties', 'Creek flooding'],
    floodHistory: 'Creek flooding during major rain events, bush fire smoke damage risk',
    uniqueSellingPoints: [
      'Acreage property specialists',
      'Bush fire smoke remediation',
      'Bore water system restoration',
      'Large property equipment access'
    ],
    localInsights: 'Pullenvale\'s rural luxury estates often have unique water systems and require equipment suitable for unsealed roads and long driveways.',
    serviceAreas: ['Brookfield', 'Anstead', 'Moggill', 'Pinjarra Hills']
  },
  'ipswich-cbd': {
    name: 'Ipswich CBD',
    slug: 'ipswich-cbd-disaster-recovery',
    postcode: '4305',
    coordinates: {
      latitude: -27.6140,
      longitude: 152.7595
    },
    distanceFromWacol: 15,
    responseTime: '15-20 minutes',
    demographics: {
      population: '5,000',
      propertyType: 'Heritage buildings, Commercial properties'
    },
    landmarks: ['Queens Park', 'Ipswich Art Gallery', 'Top of Town', 'Bremer River', 'Ipswich Hospital'],
    disasterRisks: ['Bremer River flooding', 'Heritage building vulnerabilities', 'Storm damage'],
    floodHistory: 'Major flooding in 1974, 2011, and 2022, with the CBD significantly impacted',
    uniqueSellingPoints: [
      'Heritage building restoration experts',
      'Commercial property specialists',
      'Rapid response to CBD businesses',
      'Government building experience'
    ],
    localInsights: 'Ipswich CBD\'s historic buildings and flood-prone location require specialised restoration techniques and rapid response capabilities.',
    serviceAreas: ['North Ipswich', 'East Ipswich', 'West Ipswich', 'Booval']
  },
  'springfield-lakes': {
    name: 'Springfield Lakes',
    slug: 'springfield-lakes-disaster-recovery',
    postcode: '4300',
    coordinates: {
      latitude: -27.6783,
      longitude: 152.9167
    },
    distanceFromWacol: 12,
    responseTime: '15-20 minutes',
    demographics: {
      medianHousePrice: '$750,000',
      population: '15,000',
      propertyType: 'Modern family homes, Townhouses'
    },
    landmarks: ['Orion Springfield Central', 'Robelle Domain', 'Springfield Lakes', 'USQ Springfield'],
    disasterRisks: ['Storm damage', 'Lake flooding', 'New construction water damage'],
    uniqueSellingPoints: [
      'Modern home water damage experts',
      'Master-planned community specialist',
      'Quick response to family emergencies',
      'New construction warranty work'
    ],
    localInsights: 'Springfield Lakes\' modern homes often have integrated technology and open-plan designs requiring careful restoration approaches.',
    serviceAreas: ['Springfield', 'Spring Mountain', 'Brookwater', 'Augustine Heights']
  },
  'indooroopilly': {
    name: 'Indooroopilly',
    slug: 'indooroopilly-disaster-recovery',
    postcode: '4068',
    coordinates: {
      latitude: -27.4997,
      longitude: 152.9733
    },
    distanceFromWacol: 7,
    responseTime: '10-15 minutes',
    demographics: {
      medianHousePrice: '$1.2 million',
      population: '13,000',
      propertyType: 'Family homes, Apartments, Heritage houses'
    },
    landmarks: ['Indooroopilly Shopping Centre', 'St Peters Lutheran College', 'Brisbane River', 'UQ St Lucia'],
    disasterRisks: ['River flooding', 'Storm water damage', 'Shopping centre impacts'],
    floodHistory: 'Riverside areas affected in 2011 and 2022 floods, with Station Road particularly impacted',
    uniqueSellingPoints: [
      'Fastest response times from Wacol',
      'Shopping centre flood recovery',
      'University precinct experience',
      'High-rise apartment specialists'
    ],
    localInsights: 'Indooroopilly\'s mix of riverside properties, shopping precincts, and residential areas requires versatile restoration capabilities.',
    serviceAreas: ['Taringa', 'St Lucia', 'Chapel Hill', 'Toowong']
  },
  'toowong': {
    name: 'Toowong',
    slug: 'toowong-disaster-recovery',
    postcode: '4066',
    coordinates: {
      latitude: -27.4850,
      longitude: 152.9917
    },
    distanceFromWacol: 10,
    responseTime: '15-20 minutes',
    demographics: {
      medianHousePrice: '$1.1 million',
      population: '12,000',
      propertyType: 'Heritage homes, Student accommodation, Apartments'
    },
    landmarks: ['Toowong Village', 'Brisbane Boys College', 'Toowong Cemetery', 'Regatta Hotel'],
    disasterRisks: ['River flooding', 'Storm damage to older properties', 'Student accommodation issues'],
    floodHistory: 'Riverside areas and Gailey Road affected during major floods',
    uniqueSellingPoints: [
      'Student accommodation specialists',
      'Heritage property restoration',
      'Commercial property experience',
      'Rapid multi-unit response'
    ],
    localInsights: 'Toowong\'s mix of student housing, heritage homes, and commercial properties requires diverse restoration expertise.',
    serviceAreas: ['Taringa', 'Auchenflower', 'Milton', 'St Lucia']
  },
  'west-end': {
    name: 'West End',
    slug: 'west-end-disaster-recovery',
    postcode: '4101',
    coordinates: {
      latitude: -27.4789,
      longitude: 153.0031
    },
    distanceFromWacol: 12,
    responseTime: '15-20 minutes',
    demographics: {
      medianHousePrice: '$950,000',
      population: '9,500',
      propertyType: 'Heritage cottages, Modern apartments, Townhouses'
    },
    landmarks: ['Davies Park Markets', 'Boundary Street', 'QPAC', 'Kurilpa Bridge', 'West End Ferry Terminal'],
    disasterRisks: ['River flooding', 'Flash flooding', 'Older building vulnerabilities'],
    floodHistory: 'Significant flooding in riverside areas during 2011 and 2022 events',
    uniqueSellingPoints: [
      'Character home restoration experts',
      'Rapid inner-city response',
      'Multi-cultural business district experience',
      'Artist studio and gallery restoration'
    ],
    localInsights: 'West End\'s eclectic mix of old and new properties, plus its vibrant business district, requires adaptable restoration services.',
    serviceAreas: ['South Brisbane', 'Highgate Hill', 'Hill End', 'Dutton Park']
  },
  'kangaroo-point': {
    name: 'Kangaroo Point',
    slug: 'kangaroo-point-disaster-recovery',
    postcode: '4169',
    coordinates: {
      latitude: -27.4808,
      longitude: 153.0347
    },
    distanceFromWacol: 15,
    responseTime: '15-25 minutes',
    demographics: {
      medianHousePrice: '$850,000',
      population: '8,500',
      propertyType: 'High-rise apartments, Heritage homes'
    },
    landmarks: ['Kangaroo Point Cliffs', 'Story Bridge', 'Captain Burke Park', 'CT White Park'],
    disasterRisks: ['River flooding', 'High-rise water damage', 'Cliff stability issues'],
    floodHistory: 'Lower areas near the river affected during major flood events',
    uniqueSellingPoints: [
      'High-rise apartment specialists',
      'Cliff-side property expertise',
      'Bridge precinct experience',
      'Rapid CBD access'
    ],
    localInsights: 'Kangaroo Point\'s dramatic topography and high-rise developments require specialised equipment and techniques.',
    serviceAreas: ['East Brisbane', 'Woolloongabba', 'South Brisbane', 'Norman Park']
  },
  'bulimba': {
    name: 'Bulimba',
    slug: 'bulimba-disaster-recovery',
    postcode: '4171',
    coordinates: {
      latitude: -27.4519,
      longitude: 153.0597
    },
    distanceFromWacol: 18,
    responseTime: '20-30 minutes',
    demographics: {
      medianHousePrice: '$1.5 million',
      population: '7,000',
      propertyType: 'Heritage Queenslanders, Modern renovations'
    },
    landmarks: ['Oxford Street', 'Bulimba Ferry Terminal', 'Bulimba Memorial Park', 'Hawthorne Cinema'],
    disasterRisks: ['River flooding', 'Storm damage to Queenslanders', 'Steep street water runoff'],
    floodHistory: 'Severely impacted in 2011 and 2022 floods, especially properties near Oxford Street',
    uniqueSellingPoints: [
      'Queenslander restoration specialists',
      'Oxford Street business recovery',
      'Riverside property experts',
      'Heritage feature preservation'
    ],
    localInsights: 'Bulimba\'s character homes and thriving retail precinct require careful restoration to preserve heritage features while ensuring modern safety standards.',
    serviceAreas: ['Hawthorne', 'Balmoral', 'Morningside', 'Norman Park']
  },
  'camp-hill': {
    name: 'Camp Hill',
    slug: 'camp-hill-disaster-recovery',
    postcode: '4152',
    coordinates: {
      latitude: -27.4944,
      longitude: 153.0764
    },
    distanceFromWacol: 20,
    responseTime: '20-30 minutes',
    demographics: {
      medianHousePrice: '$1.3 million',
      population: '11,000',
      propertyType: 'Post-war homes, Modern renovations'
    },
    landmarks: ['Camp Hill Marketplace', 'Whites Hill Reserve', 'Camp Hill State School', 'Coorparoo Secondary College'],
    disasterRisks: ['Storm damage', 'Overland flow flooding', 'Older home vulnerabilities'],
    uniqueSellingPoints: [
      'Post-war home specialists',
      'Elevated location advantages',
      'Family home focus',
      'School precinct experience'
    ],
    localInsights: 'Camp Hill\'s elevated position provides protection from river flooding, but storm damage remains a primary concern for its older housing stock.',
    serviceAreas: ['Carina', 'Coorparoo', 'Norman Park', 'Seven Hills']
  },
  'carina': {
    name: 'Carina',
    slug: 'carina-disaster-recovery',
    postcode: '4152',
    coordinates: {
      latitude: -27.4944,
      longitude: 153.0903
    },
    distanceFromWacol: 22,
    responseTime: '25-30 minutes',
    demographics: {
      medianHousePrice: '$950,000',
      population: '11,500',
      propertyType: 'Family homes, Townhouses'
    },
    landmarks: ['Westfield Carindale', 'Carina Leagues Club', 'Minnippi Parklands', 'Pacific Golf Club'],
    disasterRisks: ['Storm damage', 'Overland flow', 'Creek flooding'],
    uniqueSellingPoints: [
      'Family home restoration focus',
      'Westfield precinct experience',
      'Parkland flooding expertise',
      'Rapid response network'
    ],
    localInsights: 'Carina\'s established family neighbourhood requires sensitive restoration services that minimise disruption to family life.',
    serviceAreas: ['Carindale', 'Camp Hill', 'Carina Heights', 'Belmont']
  },
  'carindale': {
    name: 'Carindale',
    slug: 'carindale-disaster-recovery',
    postcode: '4152',
    coordinates: {
      latitude: -27.5047,
      longitude: 153.1011
    },
    distanceFromWacol: 24,
    responseTime: '25-35 minutes',
    demographics: {
      medianHousePrice: '$1.1 million',
      population: '16,000',
      propertyType: 'Modern homes, Townhouses, Apartments'
    },
    landmarks: ['Westfield Carindale', 'Pacific Golf Club', 'Belmont Private Hospital', 'Bulimba Creek'],
    disasterRisks: ['Creek flooding', 'Storm damage', 'Shopping centre impacts'],
    floodHistory: 'Bulimba Creek flooding affects lower-lying properties during heavy rain',
    uniqueSellingPoints: [
      'Modern home specialists',
      'Shopping centre coordination',
      'Golf course property expertise',
      'Healthcare facility experience'
    ],
    localInsights: 'Carindale\'s modern development and major shopping precinct require sophisticated restoration approaches and commercial coordination capabilities.',
    serviceAreas: ['Carina', 'Belmont', 'Tingalpa', 'Mansfield']
  },
  'chermside': {
    name: 'Chermside',
    slug: 'chermside-disaster-recovery',
    postcode: '4032',
    coordinates: {
      latitude: -27.3856,
      longitude: 153.0292
    },
    distanceFromWacol: 25,
    responseTime: '25-35 minutes',
    demographics: {
      medianHousePrice: '$750,000',
      population: '10,000',
      propertyType: 'Family homes, Units, Townhouses'
    },
    landmarks: ['Westfield Chermside', 'Prince Charles Hospital', 'Chermside Hills Reserve', 'Aquatic Centre'],
    disasterRisks: ['Storm damage', 'Overland flow', 'Kedron Brook flooding'],
    floodHistory: 'Kedron Brook can cause localised flooding during extreme weather',
    uniqueSellingPoints: [
      'Healthcare facility specialists',
      'Major shopping centre experience',
      'Multi-unit complex expertise',
      'Emergency hospital coordination'
    ],
    localInsights: 'Chermside\'s position as a major commercial and healthcare hub requires 24/7 availability and experience with critical infrastructure.',
    serviceAreas: ['Chermside West', 'Wavell Heights', 'Kedron', 'Stafford']
  },
  'stafford': {
    name: 'Stafford',
    slug: 'stafford-disaster-recovery',
    postcode: '4053',
    coordinates: {
      latitude: -27.4111,
      longitude: 153.0125
    },
    distanceFromWacol: 22,
    responseTime: '25-30 minutes',
    demographics: {
      medianHousePrice: '$850,000',
      population: '7,000',
      propertyType: 'Post-war homes, Modern townhouses'
    },
    landmarks: ['Stafford City Shopping Centre', 'Gibson Park', 'Kedron Brook', 'Stafford Road'],
    disasterRisks: ['Kedron Brook flooding', 'Storm damage', 'Overland flow'],
    floodHistory: 'Kedron Brook flooding impacts lower properties during major rain events',
    uniqueSellingPoints: [
      'Post-war home restoration',
      'Brook flooding specialists',
      'Rapid northside response',
      'Commercial precinct experience'
    ],
    localInsights: 'Stafford\'s mix of older homes near Kedron Brook and newer developments requires versatile flood response capabilities.',
    serviceAreas: ['Stafford Heights', 'Gordon Park', 'Kedron', 'Everton Park']
  },
  'kenmore': {
    name: 'Kenmore',
    slug: 'kenmore-disaster-recovery',
    postcode: '4069',
    coordinates: {
      latitude: -27.5069,
      longitude: 152.9378
    },
    distanceFromWacol: 10,
    responseTime: '12-18 minutes',
    demographics: {
      medianHousePrice: '$1.35 million',
      population: '9,500',
      propertyType: 'Hillside family homes, Executive residences, Modern estates'
    },
    landmarks: ['Kenmore Village', 'Moggill Creek', 'Kenmore State High School', 'Kenmore Library', 'Gold Creek Reservoir'],
    disasterRisks: ['Hillside water runoff', 'Retaining wall failures', 'Storm damage from elevated exposure', 'Slope subsidence'],
    floodHistory: 'Elevated position protects from major flooding, but steep terrain creates unique water flow challenges during storms',
    uniqueSellingPoints: [
      'Hillside property water management specialists',
      'Retaining wall water damage experts',
      'Slope stabilization coordination',
      'Executive home restoration expertise'
    ],
    localInsights: 'Kenmore\'s distinctive hillside topography requires specialised understanding of water flow patterns and structural considerations for elevated properties. Storm water management is critical due to steep gradients channeling water rapidly downslope.',
    serviceAreas: ['Chapel Hill', 'Brookfield', 'Fig Tree Pocket', 'Pullenvale']
  },
  'mt-gravatt': {
    name: 'Mt Gravatt',
    slug: 'mt-gravatt-disaster-recovery',
    postcode: '4122',
    coordinates: {
      latitude: -27.5344,
      longitude: 153.0825
    },
    distanceFromWacol: 19,
    responseTime: '22-30 minutes',
    demographics: {
      medianHousePrice: '$815,000',
      population: '8,800',
      propertyType: 'Post-war homes, Modern renovations, Elevated properties'
    },
    landmarks: ['Mt Gravatt Outlook Reserve', 'Westfield Garden City', 'Griffith University', 'Mt Gravatt Showgrounds', 'Toohey Forest'],
    disasterRisks: ['Elevated storm exposure', 'Hillside water drainage', 'Bushfire smoke impact', 'Tree damage from exposed position'],
    floodHistory: 'Elevated location provides excellent flood protection, but exposed position increases storm damage vulnerability',
    uniqueSellingPoints: [
      'Elevated property specialists',
      'Storm damage rapid response',
      'University precinct expertise',
      'Shopping centre coordination experience'
    ],
    localInsights: 'Mt Gravatt\'s elevated position on one of Brisbane\'s highest points creates unique weather exposure challenges. Properties experience stronger winds and more severe storm impacts while benefiting from superior flood protection. The mix of established homes and university student accommodation requires versatile restoration approaches.',
    serviceAreas: ['Upper Mt Gravatt', 'Wishart', 'Mansfield', 'Holland Park']
  },
  'manly': {
    name: 'Manly',
    slug: 'manly-disaster-recovery',
    postcode: '4179',
    coordinates: {
      latitude: -27.4533,
      longitude: 153.1844
    },
    distanceFromWacol: 36,
    responseTime: '40-50 minutes',
    demographics: {
      medianHousePrice: '$965,000',
      population: '4,000',
      propertyType: 'Bayside family homes, Waterfront properties, Coastal apartments'
    },
    landmarks: ['Manly Harbour', 'Royal Queensland Yacht Squadron', 'Manly Village', 'Wynnum Esplanade', 'Waterfront Marina'],
    disasterRisks: ['Storm surge from Moreton Bay', 'Coastal flooding', 'Salt corrosion damage', 'High humidity mould growth', 'King tide inundation'],
    floodHistory: 'Cyclone season brings storm surge risks. King tides periodically flood waterfront areas. 2022 floods impacted low-lying bayside properties',
    uniqueSellingPoints: [
      'Bayside property specialists',
      'Storm surge damage experts',
      'Salt corrosion remediation',
      'Marina and boat facility coordination'
    ],
    localInsights: 'Manly\'s unique bayside location presents distinct challenges from salt air corrosion, tidal influences, and storm surge risks. Properties require specialised treatments for coastal environments including salt-resistant materials and enhanced moisture control. The harbour and marina community demands understanding of both residential and marine facility restoration.',
    serviceAreas: ['Wynnum', 'Lota', 'Manly West', 'Tingalpa']
  }
};