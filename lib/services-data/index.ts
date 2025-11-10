/**
 * Services Data Module
 * Manages all disaster recovery service categories and types
 */

import { ServiceData, ServiceCategory, CostRange } from '../page-generator/types';

// Service categories
const SERVICE_CATEGORIES: ServiceCategory[] = [
  { id: 'water-damage', name: 'Water Damage', slug: 'water-damage', priority: 1 },
  { id: 'fire-damage', name: 'Fire Damage', slug: 'fire-damage', priority: 2 },
  { id: 'mould', name: 'Mould Remediation', slug: 'mould-remediation', priority: 3 },
  { id: 'storm', name: 'Storm Damage', slug: 'storm-damage', priority: 4 },
  { id: 'biohazard', name: 'Biohazard Cleaning', slug: 'biohazard-cleaning', priority: 5 },
  { id: 'sewage', name: 'Sewage Cleanup', slug: 'sewage-cleanup', priority: 6 },
  { id: 'emergency', name: 'Emergency Services', slug: 'emergency-services', priority: 7 }
];

// Comprehensive service list
const SERVICES: ServiceData[] = [
  // Water Damage Services
  {
    id: 'water-extraction',
    name: 'Water Extraction',
    slug: 'water-extraction',
    category: SERVICE_CATEGORIES[0],
    subcategories: ['emergency-extraction', 'basement-flooding', 'carpet-water'],
    description: 'Emergency water extraction and removal services to prevent secondary damage',
    keywords: [
      'water extraction', 'water removal', 'flood extraction', 'emergency pumping',
      'water pump out', 'standing water removal', 'flood water extraction'
    ],
    equipment: ['submersible pumps', 'truck-mounted extractors', 'portable extractors'],
    certifications: ['IICRC WRT', 'IICRC ASD'],
    averageResponseTime: 2,
    averageCost: { min: 500, max: 5000, unit: 'project' }
  },
  {
    id: 'structural-drying',
    name: 'Structural Drying',
    slug: 'structural-drying',
    category: SERVICE_CATEGORIES[0],
    subcategories: ['wall-drying', 'floor-drying', 'ceiling-drying'],
    description: 'Professional structural drying to prevent mould growth and structural damage',
    keywords: [
      'structural drying', 'building drying', 'wall cavity drying',
      'floor drying', 'ceiling drying', 'dehumidification'
    ],
    equipment: ['air movers', 'dehumidifiers', 'moisture meters', 'thermal cameras'],
    certifications: ['IICRC ASD', 'IICRC WRT'],
    averageResponseTime: 4,
    averageCost: { min: 1000, max: 10000, unit: 'project' }
  },
  {
    id: 'burst-pipe-restoration',
    name: 'Burst Pipe Restoration',
    slug: 'burst-pipe-restoration',
    category: SERVICE_CATEGORIES[0],
    subcategories: ['pipe-leak', 'plumbing-failure', 'water-main-break'],
    description: 'Complete restoration services for burst pipe water damage',
    keywords: [
      'burst pipe', 'pipe leak', 'broken pipe', 'pipe burst damage',
      'plumbing leak', 'water pipe repair', 'pipe failure'
    ],
    equipment: ['leak detection equipment', 'pipe repair tools', 'drying equipment'],
    certifications: ['IICRC WRT'],
    averageResponseTime: 2,
    averageCost: { min: 800, max: 8000, unit: 'project' }
  },

  // Fire Damage Services
  {
    id: 'fire-damage-restoration',
    name: 'Fire Damage Restoration',
    slug: 'fire-damage-restoration',
    category: SERVICE_CATEGORIES[1],
    subcategories: ['structural-fire', 'content-restoration', 'fire-rebuild'],
    description: 'Complete fire damage restoration including structure and contents',
    keywords: [
      'fire damage', 'fire restoration', 'burn damage', 'fire cleanup',
      'fire damage repair', 'post-fire restoration', 'fire recovery'
    ],
    equipment: ['HEPA vacuums', 'ozone generators', 'ultrasonic cleaners'],
    certifications: ['IICRC FSRT', 'IICRC CCT'],
    averageResponseTime: 4,
    averageCost: { min: 5000, max: 50000, unit: 'project' }
  },
  {
    id: 'smoke-odor-removal',
    name: 'Smoke Odor Removal',
    slug: 'smoke-odor-removal',
    category: SERVICE_CATEGORIES[1],
    subcategories: ['deodorization', 'air-purification', 'ozone-treatment'],
    description: 'Professional smoke odor elimination and air quality restoration',
    keywords: [
      'smoke odor', 'smoke smell removal', 'fire smell', 'odor elimination',
      'deodorization', 'smoke damage', 'air purification'
    ],
    equipment: ['ozone generators', 'hydroxyl generators', 'thermal foggers'],
    certifications: ['IICRC FSRT', 'IICRC OCT'],
    averageResponseTime: 6,
    averageCost: { min: 500, max: 5000, unit: 'project' }
  },
  {
    id: 'soot-cleanup',
    name: 'Soot Cleanup',
    slug: 'soot-cleanup',
    category: SERVICE_CATEGORIES[1],
    subcategories: ['wall-soot', 'ceiling-soot', 'content-soot'],
    description: 'Thorough soot removal and cleaning from all surfaces',
    keywords: [
      'soot cleanup', 'soot removal', 'black soot', 'fire soot',
      'soot damage', 'carbon removal', 'ash cleanup'
    ],
    equipment: ['HEPA vacuums', 'dry sponges', 'chemical sponges'],
    certifications: ['IICRC FSRT'],
    averageResponseTime: 6,
    averageCost: { min: 1000, max: 8000, unit: 'project' }
  },

  // Mould Remediation Services
  {
    id: 'mould-inspection',
    name: 'Mould Inspection',
    slug: 'mould-inspection',
    category: SERVICE_CATEGORIES[2],
    subcategories: ['air-quality-testing', 'surface-testing', 'moisture-mapping'],
    description: 'Professional mould inspection and testing services',
    keywords: [
      'mould inspection', 'mold testing', 'mould assessment', 'air quality test',
      'mould detection', 'black mould test', 'mould survey'
    ],
    equipment: ['air sampling pumps', 'moisture meters', 'borescopes', 'thermal cameras'],
    certifications: ['IICRC AMRT', 'IAC2 CRMI'],
    averageResponseTime: 24,
    averageCost: { min: 300, max: 1500, unit: 'project' }
  },
  {
    id: 'mould-removal',
    name: 'Mould Removal',
    slug: 'mould-removal',
    category: SERVICE_CATEGORIES[2],
    subcategories: ['black-mould', 'toxic-mould', 'surface-mould'],
    description: 'Safe and complete mould removal and remediation',
    keywords: [
      'mould removal', 'mold remediation', 'black mould removal',
      'toxic mould', 'mould treatment', 'fungus removal'
    ],
    equipment: ['negative air machines', 'HEPA vacuums', 'containment barriers'],
    certifications: ['IICRC AMRT'],
    averageResponseTime: 24,
    averageCost: { min: 1000, max: 15000, unit: 'project' }
  },

  // Storm Damage Services
  {
    id: 'storm-damage-restoration',
    name: 'Storm Damage Restoration',
    slug: 'storm-damage-restoration',
    category: SERVICE_CATEGORIES[3],
    subcategories: ['wind-damage', 'hail-damage', 'tree-damage'],
    description: 'Complete storm damage assessment and restoration services',
    keywords: [
      'storm damage', 'wind damage', 'hail damage', 'cyclone damage',
      'storm restoration', 'weather damage', 'storm recovery'
    ],
    equipment: ['tarps', 'board-up materials', 'chainsaws', 'debris removal equipment'],
    certifications: ['IICRC WRT', 'IICRC ASD'],
    averageResponseTime: 4,
    averageCost: { min: 2000, max: 30000, unit: 'project' }
  },
  {
    id: 'roof-tarping',
    name: 'Roof Tarping',
    slug: 'roof-tarping',
    category: SERVICE_CATEGORIES[3],
    subcategories: ['emergency-tarping', 'temporary-roof', 'weather-protection'],
    description: 'Emergency roof tarping to prevent further water damage',
    keywords: [
      'roof tarp', 'emergency tarping', 'roof cover', 'temporary roof',
      'storm tarp', 'roof protection', 'emergency roof'
    ],
    equipment: ['heavy-duty tarps', 'sandbags', 'fasteners', 'safety equipment'],
    certifications: ['Working at Heights'],
    averageResponseTime: 2,
    averageCost: { min: 500, max: 3000, unit: 'project' }
  },

  // Biohazard Cleaning Services
  {
    id: 'trauma-cleaning',
    name: 'Trauma Scene Cleaning',
    slug: 'trauma-cleaning',
    category: SERVICE_CATEGORIES[4],
    subcategories: ['crime-scene', 'accident-cleanup', 'unattended-death'],
    description: 'Compassionate and thorough trauma scene cleaning services',
    keywords: [
      'trauma cleaning', 'crime scene cleanup', 'biohazard cleaning',
      'blood cleanup', 'accident cleanup', 'death cleanup'
    ],
    equipment: ['PPE', 'biohazard containers', 'hospital-grade disinfectants'],
    certifications: ['IICRC TCT', 'Bloodborne Pathogen'],
    averageResponseTime: 2,
    averageCost: { min: 2000, max: 10000, unit: 'project' }
  },
  {
    id: 'infectious-disease-cleaning',
    name: 'Infectious Disease Cleaning',
    slug: 'infectious-disease-cleaning',
    category: SERVICE_CATEGORIES[4],
    subcategories: ['covid-cleaning', 'virus-disinfection', 'bacteria-removal'],
    description: 'Specialized cleaning for infectious disease contamination',
    keywords: [
      'covid cleaning', 'virus cleaning', 'disease cleanup', 'sanitization',
      'disinfection', 'pathogen removal', 'contamination cleaning'
    ],
    equipment: ['electrostatic sprayers', 'ULV foggers', 'EPA-registered disinfectants'],
    certifications: ['IICRC CCT', 'Infection Control'],
    averageResponseTime: 4,
    averageCost: { min: 500, max: 5000, unit: 'project' }
  },

  // Sewage Cleanup Services
  {
    id: 'sewage-backup-cleanup',
    name: 'Sewage Backup Cleanup',
    slug: 'sewage-backup-cleanup',
    category: SERVICE_CATEGORIES[5],
    subcategories: ['toilet-overflow', 'main-line-backup', 'septic-backup'],
    description: 'Safe sewage backup cleanup and sanitization services',
    keywords: [
      'sewage cleanup', 'sewage backup', 'black water', 'toilet overflow',
      'sewer backup', 'septic backup', 'waste cleanup'
    ],
    equipment: ['extraction equipment', 'PPE', 'antimicrobial treatments'],
    certifications: ['IICRC WRT', 'IICRC AMRT'],
    averageResponseTime: 2,
    averageCost: { min: 1500, max: 8000, unit: 'project' }
  },

  // Emergency Services
  {
    id: 'emergency-board-up',
    name: 'Emergency Board Up',
    slug: 'emergency-board-up',
    category: SERVICE_CATEGORIES[6],
    subcategories: ['window-boarding', 'door-boarding', 'security-boarding'],
    description: '24/7 emergency board up services to secure your property',
    keywords: [
      'board up', 'emergency boarding', 'window board up', 'security board',
      'property securing', 'break-in board up', 'vandalism board up'
    ],
    equipment: ['plywood', 'fasteners', 'security screens', 'tools'],
    certifications: ['General Construction'],
    averageResponseTime: 2,
    averageCost: { min: 300, max: 2000, unit: 'project' }
  },
  {
    id: '24-hour-emergency',
    name: '24 Hour Emergency Response',
    slug: '24-hour-emergency',
    category: SERVICE_CATEGORIES[6],
    subcategories: ['after-hours', 'weekend-emergency', 'holiday-response'],
    description: 'Round-the-clock emergency disaster response services',
    keywords: [
      '24 hour emergency', '24/7 response', 'emergency service', 'after hours',
      'immediate response', 'urgent restoration', 'emergency contractor'
    ],
    equipment: ['emergency response vehicles', 'mobile equipment', 'communication systems'],
    certifications: ['IICRC Certified Firm'],
    averageResponseTime: 1,
    averageCost: { min: 500, max: 10000, unit: 'project' }
  }
];

/**
 * Get all services
 */
export async function getAllServices(): Promise<ServiceData[]> {
  try {
  return SERVICES;

  } catch (error) {
    console.error(`Error in getAllServices:`, error);
    throw error;
  }}

/**
 * Get services by category
 */
export async function getServicesByCategory(categorySlug: string): Promise<ServiceData[]> {
  try {
  return SERVICES.filter(service => service.category.slug === categorySlug);

  } catch (error) {
    console.error(`Error in getServicesByCategory:`, error);
    throw error;
  }}

/**
 * Get service by slug
 */
export async function getServiceBySlug(slug: string): Promise<ServiceData | null> {
  try {
  return SERVICES.find(service => service.slug === slug) || null;

  } catch (error) {
    console.error(`Error in getServiceBySlug:`, error);
    throw error;
  }}

/**
 * Get all service categories
 */
export async function getServiceCategories(): Promise<ServiceCategory[]> {
  try {
  return SERVICE_CATEGORIES;

  } catch (error) {
    console.error(`Error in getServiceCategories:`, error);
    throw error;
  }}

/**
 * Get priority services (for contractor onboarding)
 */
export async function getPriorityServices(): Promise<ServiceData[]> {
  try {
  const prioritySlugs = ['water-extraction', 'fire-damage-restoration', 'mould-removal'];
  return SERVICES.filter(service => prioritySlugs.includes(service.slug));

  } catch (error) {
    console.error(`Error in getPriorityServices:`, error);
    throw error;
  }}

/**
 * Get emergency services
 */
export async function getEmergencyServices(): Promise<ServiceData[]> {
  try {
  return SERVICES.filter(service =>
    service.averageResponseTime <= 4 ||
    service.category.slug === 'emergency-services'
  );

  } catch (error) {
    console.error(`Error in getEmergencyServices:`, error);
    throw error;
  }}

/**
 * Generate service variations for SEO
 */
export function generateServiceVariations(service: ServiceData): string[] {
  const variations: string[] = [];

  // Basic variations
  variations.push(service.name);
  variations.push(service.slug.replace(/-/g, ' '));

  // With modifiers
  const modifiers = ['emergency', 'professional', 'certified', 'local', '24 hour', 'same day'];
  modifiers.forEach(modifier => {
    variations.push(`${modifier} ${service.name.toLowerCase()}`);
  });

  // Action variations
  const actions = ['need', 'require', 'looking for', 'find', 'hire'];
  actions.forEach(action => {
    variations.push(`${action} ${service.name.toLowerCase()}`);
  });

  // Cost variations
  variations.push(`${service.name.toLowerCase()} cost`);
  variations.push(`${service.name.toLowerCase()} price`);
  variations.push(`cheap ${service.name.toLowerCase()}`);
  variations.push(`affordable ${service.name.toLowerCase()}`);

  // Near me variations
  variations.push(`${service.name.toLowerCase()} near me`);
  variations.push(`${service.name.toLowerCase()} nearby`);
  variations.push(`local ${service.name.toLowerCase()}`);

  return variations;
}

/**
 * Get related services
 */
export function getRelatedServices(serviceSlug: string): ServiceData[] {
  const service = SERVICES.find(s => s.slug === serviceSlug);
  if (!service) {return [];}

  // Get services from same category
  const sameCategory = SERVICES.filter(
    s => s.category.id === service.category.id && s.id !== service.id
  );

  // Limit to 3 related services
  return sameCategory.slice(0, 3);
}

/**
 * Calculate service pricing estimate
 */
export function calculateServiceEstimate(
  service: ServiceData,
  propertySize: number, // in square meters
  damageLevel: 'minor' | 'moderate' | 'major' | 'severe'
): { min: number; max: number } {
  const baseCost = service.averageCost || { min: 1000, max: 5000, unit: 'project' };

  const multipliers = {
    minor: 0.5,
    moderate: 1,
    major: 2,
    severe: 3
  };

  const sizeMultiplier = Math.max(1, propertySize / 100); // Base on 100sqm
  const damageMultiplier = multipliers[damageLevel];

  return {
    min: Math.round(baseCost.min * sizeMultiplier * damageMultiplier),
    max: Math.round(baseCost.max * sizeMultiplier * damageMultiplier)
  };
}

/**
 * Get service availability by location
 */
export async function getServiceAvailability(
  serviceSlug: string,
  locationSlug: string
): Promise<'available' | 'limited' | 'unavailable'> {
  try {
  // In production, this would check contractor availability
  // For now, return mock availability
  const random = Math.random();
  if (random > 0.7) {return 'available';}
  if (random > 0.3) {return 'limited';}
  return 'unavailable';

  } catch (error) {
    console.error(`Error in getServiceAvailability:`, error);
    throw error;
  }}

export * from '../page-generator/types';