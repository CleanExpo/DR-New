export interface WaterDamageCategory {
  category: number;
  name: string;
  description: string;
  sources: string[];
  healthRisk: 'Low' | 'Moderate' | 'High';
  actionRequired: string;
  timeline: string;
}

export const waterDamageCategories: WaterDamageCategory[] = [
  {
    category: 1,
    name: 'Clean Water',
    description: 'Water from a clean source that does not pose substantial threat to humans',
    sources: [
      'Broken water supply lines',
      'Tub or sink overflows',
      'Appliance malfunctions',
      'Melting ice or snow',
      'Falling rainwater',
      'Broken toilet tanks'
    ],
    healthRisk: 'Low',
    actionRequired: 'Extract water, dry structure within 24-48 hours',
    timeline: '24-48 hours before deterioration'
  },
  {
    category: 2,
    name: 'Grey Water',
    description: 'Water containing significant contamination that could cause illness or discomfort',
    sources: [
      'Washing machine overflow',
      'Dishwasher overflow',
      'Toilet overflow with urine',
      'Sump pump failures',
      'Seepage through foundations',
      'Punctured water beds'
    ],
    healthRisk: 'Moderate',
    actionRequired: 'Remove affected materials, sanitize, use PPE',
    timeline: '48-72 hours before becoming Category 3'
  },
  {
    category: 3,
    name: 'Black Water',
    description: 'Grossly contaminated water containing pathogenic agents and toxins',
    sources: [
      'Sewage backups',
      'Toilet overflow with feces',
      'Flooding from rivers/streams',
      'Storm surge',
      'Ground surface water',
      'Standing water with microbial growth'
    ],
    healthRisk: 'High',
    actionRequired: 'Full containment, professional remediation only, complete PPE required',
    timeline: 'Immediate health hazard - professional intervention required'
  }
];

export function generateWaterDamageSchema(...args: any[]): void {
  if (!category) {
    return {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to Identify Water Damage Categories',
      description: 'Professional guide to identifying and classifying water damage according to IICRC S500 standards',
      step: waterDamageCategories.map((cat, index) => ({
        '@type': 'HowToStep',
        name: `Identify Category ${cat.category} - ${cat.name}`,
        text: cat.description,
        position: index + 1
      }))
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Category ${category.category} Water Damage: ${category.name}`,
    description: category.description,
    about: {
      '@type': 'Thing',
      name: `Category ${category.category} Water Contamination`,
      description: category.description
    },
    mainEntity: {
      '@type': 'Question',
      name: `What is Category ${category.category} water damage?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${category.description}. Common sources include: ${category.sources.join(', ')}. ${category.actionRequired}`
      }
    }
  };
}

export function generateLocationSchema(...args: any[]): void {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://disaster-recovery-seven.vercel.app/locations/${location.toLowerCase().replace(' ', '-')}`,
    name: `${service.charAt(0).toUpperCase() + service.slice(1)} - ${location}`,
    description: `Professional ${service} services for all water damage categories in ${location}. 24/7 emergency response for Category 1, 2, and 3 water damage.`,
    url: `https://disaster-recovery-seven.vercel.app/locations/${location.toLowerCase().replace(' ', '-')}/${service.replace(' ', '-')}`,
    telephone: '1300-000-000',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: location,
      addressRegion: getStateFromCity(location),
      addressCountry: 'AU'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: getLatitude(location),
      longitude: getLongitude(location)
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      opens: '00:00',
      closes: '23:59'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Water Damage Restoration Services',
      itemListElement: waterDamageCategories.map(cat => ({
        '@type': 'Offer',
        name: `Category ${cat.category} ${cat.name} Restoration`,
        description: cat.description
      }))
    }
  };
}

// Helper functions for location data
function getStateFromCity(city: string): string {
  const stateMap: { [key: string]: string } = {
    'Sydney': 'NSW',
    'Melbourne': 'VIC',
    'Brisbane': 'QLD',
    'Perth': 'WA',
    'Adelaide': 'SA',
    'Hobart': 'TAS',
    'Darwin': 'NT',
    'Canberra': 'ACT',
    'Gold Coast': 'QLD',
    'Newcastle': 'NSW',
    'Sunshine Coast': 'QLD',
    'Wollongong': 'NSW'
  };
  return stateMap[city] || 'NSW';
}

function getLatitude(city: string): number {
  const latMap: { [key: string]: number } = {
    'Sydney': -33.8688,
    'Melbourne': -37.8136,
    'Brisbane': -27.4698,
    'Perth': -31.9505,
    'Adelaide': -34.9285,
    'Hobart': -42.8821,
    'Darwin': -12.4634,
    'Canberra': -35.2809
  };
  return latMap[city] || -33.8688;
}

function getLongitude(city: string): number {
  const lonMap: { [key: string]: number } = {
    'Sydney': 151.2093,
    'Melbourne': 144.9631,
    'Brisbane': 153.0251,
    'Perth': 115.8605,
    'Adelaide': 138.6007,
    'Hobart': 147.3272,
    'Darwin': 130.8456,
    'Canberra': 149.1300
  };
  return lonMap[city] || 151.2093;
}