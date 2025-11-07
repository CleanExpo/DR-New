/**
 * Location Service
 * Manages Australian location data for page generation
 */

import { LocationData, DisasterRisk, Demographics } from '../page-generator/types';

// Major Australian cities with coordinates
const MAJOR_CITIES: LocationData[] = [
  {
    id: 'sydney',
    name: 'Sydney',
    slug: 'sydney',
    state: 'NSW',
    city: 'Sydney',
    postcode: '2000',
    coordinates: { lat: -33.8688, lng: 151.2093 },
    population: 5312000,
    disasterRisk: [
      { type: 'flood', level: 'medium', seasonality: ['summer', 'autumn'] },
      { type: 'storm', level: 'high', seasonality: ['spring', 'summer'] },
      { type: 'bushfire', level: 'high', seasonality: ['summer'] }
    ]
  },
  {
    id: 'melbourne',
    name: 'Melbourne',
    slug: 'melbourne',
    state: 'VIC',
    city: 'Melbourne',
    postcode: '3000',
    coordinates: { lat: -37.8136, lng: 144.9631 },
    population: 5078000,
    disasterRisk: [
      { type: 'flood', level: 'medium', seasonality: ['winter', 'spring'] },
      { type: 'storm', level: 'medium', seasonality: ['winter'] },
      { type: 'bushfire', level: 'medium', seasonality: ['summer'] }
    ]
  },
  {
    id: 'brisbane',
    name: 'Brisbane',
    slug: 'brisbane',
    state: 'QLD',
    city: 'Brisbane',
    postcode: '4000',
    coordinates: { lat: -27.4698, lng: 153.0251 },
    population: 2514000,
    disasterRisk: [
      { type: 'flood', level: 'extreme', seasonality: ['summer'], historicalEvents: 5 },
      { type: 'storm', level: 'high', seasonality: ['summer', 'autumn'] },
      { type: 'cyclone', level: 'low', seasonality: ['summer', 'autumn'] }
    ]
  },
  {
    id: 'perth',
    name: 'Perth',
    slug: 'perth',
    state: 'WA',
    city: 'Perth',
    postcode: '6000',
    coordinates: { lat: -31.9505, lng: 115.8605 },
    population: 2089000,
    disasterRisk: [
      { type: 'bushfire', level: 'high', seasonality: ['summer'] },
      { type: 'storm', level: 'medium', seasonality: ['winter'] },
      { type: 'drought', level: 'medium', seasonality: ['summer'] }
    ]
  },
  {
    id: 'adelaide',
    name: 'Adelaide',
    slug: 'adelaide',
    state: 'SA',
    city: 'Adelaide',
    postcode: '5000',
    coordinates: { lat: -34.9285, lng: 138.6007 },
    population: 1360000,
    disasterRisk: [
      { type: 'bushfire', level: 'high', seasonality: ['summer'] },
      { type: 'storm', level: 'medium', seasonality: ['winter'] },
      { type: 'drought', level: 'high', seasonality: ['summer'] }
    ]
  }
];

// Regional centers
const REGIONAL_CENTERS: LocationData[] = [
  {
    id: 'newcastle',
    name: 'Newcastle',
    slug: 'newcastle',
    state: 'NSW',
    city: 'Newcastle',
    postcode: '2300',
    coordinates: { lat: -32.9283, lng: 151.7817 },
    population: 322000,
    disasterRisk: [
      { type: 'flood', level: 'medium', seasonality: ['summer'] },
      { type: 'storm', level: 'high', seasonality: ['summer'] }
    ]
  },
  {
    id: 'gold-coast',
    name: 'Gold Coast',
    slug: 'gold-coast',
    state: 'QLD',
    city: 'Gold Coast',
    postcode: '4217',
    coordinates: { lat: -28.0167, lng: 153.4000 },
    population: 640000,
    disasterRisk: [
      { type: 'cyclone', level: 'medium', seasonality: ['summer'] },
      { type: 'flood', level: 'high', seasonality: ['summer'] },
      { type: 'storm', level: 'high', seasonality: ['summer'] }
    ]
  },
  {
    id: 'geelong',
    name: 'Geelong',
    slug: 'geelong',
    state: 'VIC',
    city: 'Geelong',
    postcode: '3220',
    coordinates: { lat: -38.1499, lng: 144.3617 },
    population: 268000,
    disasterRisk: [
      { type: 'flood', level: 'low', seasonality: ['winter'] },
      { type: 'storm', level: 'medium', seasonality: ['winter'] }
    ]
  },
  {
    id: 'townsville',
    name: 'Townsville',
    slug: 'townsville',
    state: 'QLD',
    city: 'Townsville',
    postcode: '4810',
    coordinates: { lat: -19.2590, lng: 146.8169 },
    population: 195000,
    disasterRisk: [
      { type: 'cyclone', level: 'extreme', seasonality: ['summer'], historicalEvents: 10 },
      { type: 'flood', level: 'extreme', seasonality: ['summer'], historicalEvents: 7 },
      { type: 'storm', level: 'high', seasonality: ['summer'] }
    ]
  },
  {
    id: 'cairns',
    name: 'Cairns',
    slug: 'cairns',
    state: 'QLD',
    city: 'Cairns',
    postcode: '4870',
    coordinates: { lat: -16.9186, lng: 145.7781 },
    population: 152000,
    disasterRisk: [
      { type: 'cyclone', level: 'extreme', seasonality: ['summer'], historicalEvents: 15 },
      { type: 'flood', level: 'high', seasonality: ['summer'] }
    ]
  }
];

// Rural and remote locations
const RURAL_LOCATIONS: LocationData[] = [
  {
    id: 'dubbo',
    name: 'Dubbo',
    slug: 'dubbo',
    state: 'NSW',
    city: 'Dubbo',
    postcode: '2830',
    coordinates: { lat: -32.2569, lng: 148.6014 },
    population: 43000,
    disasterRisk: [
      { type: 'flood', level: 'medium', seasonality: ['summer'] },
      { type: 'drought', level: 'high', seasonality: ['all'] }
    ]
  },
  {
    id: 'broken-hill',
    name: 'Broken Hill',
    slug: 'broken-hill',
    state: 'NSW',
    city: 'Broken Hill',
    postcode: '2880',
    coordinates: { lat: -31.9539, lng: 141.4678 },
    population: 17000,
    disasterRisk: [
      { type: 'drought', level: 'extreme', seasonality: ['all'] },
      { type: 'storm', level: 'low', seasonality: ['summer'] }
    ]
  },
  {
    id: 'mount-isa',
    name: 'Mount Isa',
    slug: 'mount-isa',
    state: 'QLD',
    city: 'Mount Isa',
    postcode: '4825',
    coordinates: { lat: -20.7264, lng: 139.4927 },
    population: 22000,
    disasterRisk: [
      { type: 'drought', level: 'high', seasonality: ['all'] },
      { type: 'flood', level: 'medium', seasonality: ['summer'] }
    ]
  },
  {
    id: 'alice-springs',
    name: 'Alice Springs',
    slug: 'alice-springs',
    state: 'NT',
    city: 'Alice Springs',
    postcode: '0870',
    coordinates: { lat: -23.6980, lng: 133.8807 },
    population: 26000,
    disasterRisk: [
      { type: 'drought', level: 'extreme', seasonality: ['all'] },
      { type: 'flood', level: 'low', seasonality: ['summer'] }
    ]
  },
  {
    id: 'coober-pedy',
    name: 'Coober Pedy',
    slug: 'coober-pedy',
    state: 'SA',
    city: 'Coober Pedy',
    postcode: '5723',
    coordinates: { lat: -29.0135, lng: 134.7544 },
    population: 1700,
    disasterRisk: [
      { type: 'drought', level: 'extreme', seasonality: ['all'] }
    ]
  }
];

/**
 * Get all Australian locations
 */
export async function getAustralianLocations(): Promise<LocationData[]> {
  try {
  // In production, this would fetch from a database
  return [...MAJOR_CITIES, ...REGIONAL_CENTERS, ...RURAL_LOCATIONS];

  } catch (error) {
    console.error(`Error in getAustralianLocations:`, error);
    throw error;
  }}

/**
 * Get locations by state
 */
export async function getLocationsByState(state: string): Promise<LocationData[]> {
  try {
  const allLocations = await getAustralianLocations();
  return allLocations.filter(loc => loc.state === state.toUpperCase());

  } catch (error) {
    console.error(`Error in getLocationsByState:`, error);
    throw error;
  }}

/**
 * Get location by slug
 */
export async function getLocationBySlug(slug: string): Promise<LocationData | null> {
  try {
  const allLocations = await getAustralianLocations();
  return allLocations.find(loc => loc.slug === slug) || null;

  } catch (error) {
    console.error(`Error in getLocationBySlug:`, error);
    throw error;
  }}

/**
 * Get locations within radius of a point
 */
export async function getLocationsWithinRadius(
  center: { lat: number; lng: number },
  radiusKm: number
): Promise<LocationData[]> {
  try {
    const allLocations = await getAustralianLocations();

    return allLocations.filter(location => {
      if (!location.coordinates) return false;

      const distance = calculateDistance(
        center,
        location.coordinates
      );

      return distance <= radiusKm;
    });
  } catch (error) {
    console.error('Error in getLocationsWithinRadius:', error);
    throw error;
  }
}

/**
 * Calculate distance between two points
 */
function calculateDistance(
  point1: { lat: number; lng: number },
  point2: { lat: number; lng: number }
): number {
  const R = 6371; // Earth's radius in km
  const dLat = (point2.lat - point1.lat) * Math.PI / 180;
  const dLon = (point2.lng - point1.lng) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(point1.lat * Math.PI / 180) *
    Math.cos(point2.lat * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

/**
 * Get locations by disaster risk
 */
export async function getLocationsByDisasterRisk(
  disasterType: 'flood' | 'bushfire' | 'cyclone' | 'storm' | 'drought',
  minLevel: 'low' | 'medium' | 'high' | 'extreme' = 'low'
): Promise<LocationData[]> {
  try {
    const allLocations = await getAustralianLocations();
    const levelValues = { low: 1, medium: 2, high: 3, extreme: 4 };

    return allLocations.filter(location => {
      if (!location.disasterRisk) return false;

      const risk = location.disasterRisk.find(r => r.type === disasterType);
      if (!risk) return false;

      return levelValues[risk.level] >= levelValues[minLevel];
    });
  } catch (error) {
    console.error('Error in getLocationsByDisasterRisk:', error);
    throw error;
  }
}

/**
 * Get high-risk locations for any disaster type
 */
export async function getHighRiskLocations(): Promise<LocationData[]> {
  try {
    const allLocations = await getAustralianLocations();

    return allLocations.filter(location => {
      if (!location.disasterRisk) return false;

      return location.disasterRisk.some(
        risk => risk.level === 'high' || risk.level === 'extreme'
      );
    });
  } catch (error) {
    console.error('Error in getHighRiskLocations:', error);
    throw error;
  }
}

/**
 * Get suburb data for a city
 */
export async function getSuburbs(citySlug: string): Promise<LocationData[]> {
  try {
    // In production, this would fetch from a comprehensive suburbs database
    // For now, return mock suburb data
    const suburbs: Record<string, LocationData[]> = {
      'brisbane': [
        {
          id: 'brisbane-cbd',
          name: 'Brisbane CBD',
          slug: 'brisbane-cbd',
          state: 'QLD',
          city: 'Brisbane',
          suburb: 'CBD',
          postcode: '4000',
          coordinates: { lat: -27.4698, lng: 153.0251 }
        },
      {
        id: 'new-farm',
        name: 'New Farm',
        slug: 'new-farm',
        state: 'QLD',
        city: 'Brisbane',
        suburb: 'New Farm',
        postcode: '4005',
        coordinates: { lat: -27.4673, lng: 153.0451 }
      },
      {
        id: 'west-end',
        name: 'West End',
        slug: 'west-end',
        state: 'QLD',
        city: 'Brisbane',
        suburb: 'West End',
        postcode: '4101',
        coordinates: { lat: -27.4800, lng: 153.0039 }
      }
    ],
    'sydney': [
      {
        id: 'sydney-cbd',
        name: 'Sydney CBD',
        slug: 'sydney-cbd',
        state: 'NSW',
        city: 'Sydney',
        suburb: 'CBD',
        postcode: '2000',
        coordinates: { lat: -33.8688, lng: 151.2093 }
      },
      {
        id: 'bondi',
        name: 'Bondi',
        slug: 'bondi',
        state: 'NSW',
        city: 'Sydney',
        suburb: 'Bondi',
        postcode: '2026',
        coordinates: { lat: -33.8915, lng: 151.2767 }
      },
      {
        id: 'parramatta',
        name: 'Parramatta',
        slug: 'parramatta',
        state: 'NSW',
        city: 'Sydney',
        suburb: 'Parramatta',
        postcode: '2150',
        coordinates: { lat: -33.8151, lng: 151.0011 }
      }
    ]
  };

    return suburbs[citySlug] || [];
  } catch (error) {
    console.error('Error in getSuburbs:', error);
    throw error;
  }
}

/**
 * Generate location variations for SEO
 */
export function generateLocationVariations(location: LocationData): string[] {
  const variations: string[] = [];

  // Basic variations
  variations.push(location.name);
  variations.push(`${location.name} ${location.state}`);
  variations.push(`${location.name} ${location.postcode}`);

  // With suburb
  if (location.suburb) {
    variations.push(location.suburb);
    variations.push(`${location.suburb} ${location.city}`);
    variations.push(`${location.suburb} ${location.state}`);
  }

  // Regional variations
  if (location.city !== location.name) {
    variations.push(`${location.name} area`);
    variations.push(`${location.name} region`);
    variations.push(`${location.name} and surrounds`);
  }

  // Near me variations
  variations.push(`near ${location.name}`);
  variations.push(`around ${location.name}`);
  variations.push(`${location.name} nearby`);

  return variations;
}

/**
 * Get location demographics
 */
export async function getLocationDemographics(locationId: string): Promise<Demographics | null> {
  try {
    // In production, this would fetch from ABS data
    // For now, return mock demographics
    return {
      medianAge: 35,
      medianIncome: 75000,
      propertyTypes: {
        residential: 65,
        commercial: 25,
        industrial: 10
      }
    };
  } catch (error) {
    console.error('Error in getLocationDemographics:', error);
    throw error;
  }
}

/**
 * Check if location needs contractors
 */
export async function locationNeedsContractors(locationId: string): Promise<boolean> {
  try {
    // Check if location has adequate contractor coverage
    // In production, this would query the contractor database
    return Math.random() > 0.5; // Mock implementation
  } catch (error) {
    console.error('Error in locationNeedsContractors:', error);
    throw error;
  }
}

/**
 * Get underserved locations
 */
export async function getUnderservedLocations(): Promise<LocationData[]> {
  try {
    const allLocations = await getAustralianLocations();

    // Filter locations that need more contractors
    const underserved = [];

    for (const location of allLocations) {
      const needsContractors = await locationNeedsContractors(location.id);
      if (needsContractors) {
        underserved.push(location);
      }
    }

    return underserved;
  } catch (error) {
    console.error('Error in getUnderservedLocations:', error);
    throw error;
  }
}

export * from '../page-generator/types';