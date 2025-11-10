import {
  Droplets,
  Flame,
  AlertTriangle,
  Wind,
  Home,
  Building2,
  Waves,
  TreeDeciduous,
  Thermometer,
  Fan,
  Zap,
} from 'lucide-react';
import { GEO_LOCATIONS } from '@/lib/seo/local-seo-config';
import type { LocationServiceData } from '@/components/templates/LocationServiceTemplate';

/**
 * LOCATION-SERVICE DATA GENERATOR
 * Generates comprehensive data for all location × service combinations
 * Total: 10 locations × 4 services = 40 pages
 */

// Service definitions
export const SERVICES = {
  waterDamage: {
    name: 'Water Damage Restoration',
    slug: 'water-damage-restoration',
    description: 'Emergency water damage restoration and flood recovery services.',
    icon: Droplets,
    color: 'blue' as const,
  },
  fireDamage: {
    name: 'Fire Damage Restoration',
    slug: 'fire-damage-restoration',
    description: 'Professional fire damage restoration, smoke removal, and structural cleaning.',
    icon: Flame,
    color: 'red' as const,
  },
  mouldRemediation: {
    name: 'Mould Remediation',
    slug: 'mould-remediation',
    description: 'IICRC-certified mould removal and remediation services.',
    icon: AlertTriangle,
    color: 'green' as const,
  },
  stormDamage: {
    name: 'Storm Damage Restoration',
    slug: 'storm-damage-restoration',
    description: 'Emergency storm damage repair, roof tarping, and structural restoration.',
    icon: Wind,
    color: 'cyan' as const,
  },
};

// Location mappings
export const LOCATION_MAPPINGS = {
  brisbane: {
    name: 'Brisbane CBD',
    slug: 'brisbane',
    description: 'Brisbane central business district emergency restoration services',
    region: 'Brisbane',
    responseTime: '45-Minute',
    neighborhoods: ['Brisbane CBD', 'Fortitude Valley', 'South Bank', 'West End'],
  },
  hamilton: {
    name: 'Hamilton',
    slug: 'hamilton',
    description: 'Hamilton Brisbane riverside prestige property emergency restoration',
    region: 'Brisbane',
    responseTime: '60-Minute',
    neighborhoods: ['Hamilton', 'Ascot', 'Clayfield', 'Hendra'],
  },
  ascot: {
    name: 'Ascot',
    slug: 'ascot',
    description: 'Ascot Brisbane prestige property disaster restoration',
    region: 'Brisbane',
    responseTime: '60-Minute',
    neighborhoods: ['Ascot', 'Hamilton', 'Eagle Farm', 'Doomben'],
  },
  newFarm: {
    name: 'New Farm',
    slug: 'new-farm',
    description: 'New Farm Brisbane riverside property emergency restoration',
    region: 'Brisbane',
    responseTime: '60-Minute',
    neighborhoods: ['New Farm', 'Teneriffe', 'Fortitude Valley', 'Bowen Hills'],
  },
  toowong: {
    name: 'Toowong',
    slug: 'toowong',
    description: 'Toowong Brisbane emergency disaster restoration services',
    region: 'Brisbane',
    responseTime: '60-Minute',
    neighborhoods: ['Toowong', 'Taringa', 'Indooroopilly', 'Auchenflower'],
  },
  ipswich: {
    name: 'Ipswich',
    slug: 'ipswich',
    description: 'Ipswich Queensland emergency disaster restoration services',
    region: 'Ipswich',
    responseTime: '75-Minute',
    neighborhoods: ['Ipswich CBD', 'Booval', 'Goodna', 'Redbank'],
  },
  karalee: {
    name: 'Karalee',
    slug: 'karalee',
    description: 'Karalee Ipswich prestige property emergency restoration',
    region: 'Ipswich',
    responseTime: '75-Minute',
    neighborhoods: ['Karalee', 'Barellan Point', 'Tivoli', 'Bellbird Park'],
  },
  brookwater: {
    name: 'Brookwater',
    slug: 'brookwater',
    description: 'Brookwater Ipswich luxury golf estate emergency restoration',
    region: 'Ipswich',
    responseTime: '75-Minute',
    neighborhoods: ['Brookwater', 'Augustine Heights', 'Springfield', 'Spring Mountain'],
  },
  springfieldLakes: {
    name: 'Springfield Lakes',
    slug: 'springfield-lakes',
    description: 'Springfield Lakes Ipswich emergency disaster restoration',
    region: 'Ipswich',
    responseTime: '75-Minute',
    neighborhoods: ['Springfield Lakes', 'Springfield Central', 'Augustine Heights', 'Brookwater'],
  },
  logan: {
    name: 'Logan',
    slug: 'logan',
    description: 'Logan Queensland emergency disaster restoration services',
    region: 'Logan',
    responseTime: '90-Minute',
    neighborhoods: ['Logan Central', 'Springwood', 'Shailer Park', 'Browns Plains'],
  },
};

/**
 * Generate location-specific local issues for each service
 */
function generateLocalIssues(locationKey: string, serviceKey: string) {
  const location = LOCATION_MAPPINGS[locationKey as keyof typeof LOCATION_MAPPINGS];

  const issuesMap: Record<string, any> = {
    waterDamage: [
      {
        title: `Brisbane River Proximity ${location.name === 'Hamilton' || location.name === 'New Farm' ? '(High Risk Area)' : ''}`,
        description: `${location.name} properties ${location.name === 'Hamilton' || location.name === 'New Farm' ? 'are particularly vulnerable to' : 'can experience'} flooding from Brisbane River catchment areas, requiring rapid water extraction and specialized drying techniques.`,
        icon: Waves,
      },
      {
        title: 'Heritage & Queenslander Construction',
        description: `Many ${location.name} homes feature traditional Queenslander construction with timber subfloors and elevated design. Water damage in these properties requires specialized drying to prevent structural issues and mould growth.`,
        icon: Home,
      },
      {
        title: 'Subtropical Climate Moisture',
        description: `Southeast Queensland's subtropical climate creates perfect conditions for rapid mould growth after water damage. Immediate extraction and dehumidification are critical for ${location.name} properties.`,
        icon: Thermometer,
      },
    ],
    fireDamage: [
      {
        title: `${location.region} Fire Risk Factors`,
        description: `${location.name} properties face fire risks from electrical faults, kitchen fires, and ${location.region === 'Brisbane' ? 'urban density factors' : 'bushfire exposure'}. Professional smoke and soot removal protects property value.`,
        icon: Flame,
      },
      {
        title: 'Smoke Damage in Timber Structures',
        description: `Traditional ${location.name} Queenslander homes with timber construction absorb smoke and odors deep into wood grain. Specialized cleaning and ozone treatment are essential for complete restoration.`,
        icon: Building2,
      },
      {
        title: 'High-Value Property Protection',
        description: `${location.name} ${location.region === 'Brisbane' ? 'prestige properties' : 'homes'} require expert fire damage restoration to preserve market value. Professional content restoration and structural cleaning protect your investment.`,
        icon: Home,
      },
    ],
    mouldRemediation: [
      {
        title: 'Subtropical Mould Growth',
        description: `Queensland's high humidity creates rapid mould growth in ${location.name} properties. Professional IICRC-certified remediation prevents health issues and structural damage.`,
        icon: AlertTriangle,
      },
      {
        title: 'Subfloor & Cavity Mould',
        description: `${location.name} Queenslander homes with elevated subfloors are prone to hidden mould growth. Thermal imaging and moisture mapping identify all affected areas for complete remediation.`,
        icon: Fan,
      },
      {
        title: 'Post-Water Damage Mould',
        description: `After flooding or water damage, ${location.name} properties require immediate mould prevention. Our Master Restorer ensures complete drying and antimicrobial treatment.`,
        icon: Droplets,
      },
    ],
    stormDamage: [
      {
        title: `${location.region} Storm Frequency`,
        description: `Southeast Queensland experiences severe summer storms. ${location.name} properties require emergency board-up, roof tarping, and rapid water extraction after storm events.`,
        icon: Wind,
      },
      {
        title: 'Tree Impact & Wind Damage',
        description: `${location.name} areas with mature tree canopy face storm damage from falling branches and tree impacts. Professional structural assessment and emergency repairs protect your property.`,
        icon: TreeDeciduous,
      },
      {
        title: 'Hail & Roof Damage',
        description: `Severe hailstorms cause roof damage and water intrusion in ${location.name} properties. Immediate tarping and structural drying prevent secondary water damage and mould growth.`,
        icon: Zap,
      },
    ],
  };

  return issuesMap[serviceKey] || [];
}

/**
 * Generate process steps for each service
 */
function generateProcessSteps(locationKey: string, serviceKey: string) {
  const location = LOCATION_MAPPINGS[locationKey as keyof typeof LOCATION_MAPPINGS];

  const processMap: Record<string, any> = {
    waterDamage: [
      {
        name: 'Emergency Call & Dispatch',
        text: `Call 1300 309 361 for immediate dispatch to ${location.name}. Our Master Restorer team arrives within ${location.responseTime?.toLowerCase()} with industrial water extraction equipment and moisture detection tools.`,
      },
      {
        name: 'Assessment & Water Extraction',
        text: `Comprehensive damage assessment using thermal imaging and moisture meters. Immediate water extraction begins using truck-mounted pumps and portable extractors to minimize damage to your ${location.name} property.`,
      },
      {
        name: 'Structural Drying & Monitoring',
        text: `Industrial dehumidifiers and air movers placed strategically throughout ${location.name} property. Daily moisture monitoring ensures complete drying to IICRC standards, preventing mould growth in Queensland's humid climate.`,
      },
      {
        name: 'Restoration & Handover',
        text: `Complete restoration of affected areas including repairs, painting, and final inspection. Full documentation provided for insurance claims. Your ${location.name} property restored to pre-loss condition.`,
      },
    ],
    fireDamage: [
      {
        name: 'Emergency Response & Assessment',
        text: `${location.responseTime} emergency response to ${location.name}. Complete fire damage assessment, safety evaluation, and immediate board-up services to secure your property.`,
      },
      {
        name: 'Smoke & Soot Removal',
        text: `Professional cleaning of all smoke and soot damage. Specialized techniques for ${location.name} Queenslander timber structures and high-value property contents.`,
      },
      {
        name: 'Odor Elimination & Air Quality',
        text: `Advanced ozone treatment and thermal fogging eliminate smoke odors. HEPA air filtration and air quality testing ensure safe environment for ${location.name} property occupants.`,
      },
      {
        name: 'Complete Restoration',
        text: `Full structural cleaning, repairs, and restoration. Content pack-out and restoration services. Your ${location.name} property returned to pre-fire condition with complete insurance documentation.`,
      },
    ],
    mouldRemediation: [
      {
        name: 'Mould Inspection & Testing',
        text: `Professional mould inspection of ${location.name} property using thermal imaging and moisture meters. Air quality testing identifies mould species and contamination levels.`,
      },
      {
        name: 'Containment & Removal',
        text: `IICRC-certified mould remediation with full containment to prevent spread. HEPA filtration and negative air pressure protect unaffected areas of your ${location.name} property.`,
      },
      {
        name: 'Source Identification & Repair',
        text: `Moisture source identification and repair to prevent mould recurrence. Critical for ${location.name} properties in Southeast Queensland's humid climate.`,
      },
      {
        name: 'Verification & Clearance Testing',
        text: `Post-remediation verification testing confirms successful mould removal. Air quality clearance certificate provided for ${location.name} property. Full documentation for insurance and property records.`,
      },
    ],
    stormDamage: [
      {
        name: 'Emergency Call & Immediate Response',
        text: `24/7 emergency response to ${location.name} storm damage. Emergency board-up and roof tarping within ${location.responseTime?.toLowerCase()} to prevent further damage.`,
      },
      {
        name: 'Damage Assessment & Documentation',
        text: `Comprehensive structural assessment of ${location.name} property. Complete photo documentation and moisture mapping for insurance claims.`,
      },
      {
        name: 'Water Extraction & Drying',
        text: `Immediate water extraction and structural drying. Industrial dehumidifiers prevent mould growth in Queensland's humid conditions following storm water intrusion.`,
      },
      {
        name: 'Structural Repairs & Restoration',
        text: `Complete roof repairs, structural restoration, and finishing work. Your ${location.name} property restored to pre-storm condition with full insurance documentation and quality guarantee.`,
      },
    ],
  };

  return processMap[serviceKey] || [];
}

/**
 * Generate FAQs for each location-service combination
 */
function generateFAQs(locationKey: string, serviceKey: string) {
  const location = LOCATION_MAPPINGS[locationKey as keyof typeof LOCATION_MAPPINGS];
  const service = SERVICES[serviceKey as keyof typeof SERVICES];

  const faqMap: Record<string, any> = {
    waterDamage: [
      {
        question: `How quickly can you respond to water damage in ${location.name}?`,
        answer: `We provide ${location.responseTime?.toLowerCase()} emergency response to ${location.name} and surrounding ${location.neighborhoods?.join(', ')} areas. Our IICRC Master Restorer team is available 24/7/365 with industrial water extraction equipment ready to deploy immediately from our Brisbane base.`,
      },
      {
        question: `What types of water damage do you restore in ${location.name}?`,
        answer: `We restore all water damage in ${location.name} properties including burst pipes, flooding, storm damage, roof leaks, appliance failures, and sewage backups. Our certified team handles clean water, grey water, and black water contamination using IICRC-approved methods specifically designed for ${location.region} properties.`,
      },
      {
        question: `Will insurance cover water damage restoration in ${location.name}?`,
        answer: `Most insurance policies cover sudden and accidental water damage for ${location.name} properties. We work directly with all major insurers including Suncorp, RACQ, Allianz, QBE, and NRMA. We handle direct billing and manage your entire claim process - no upfront costs for approved insurance work.`,
      },
    ],
    fireDamage: [
      {
        question: `How quickly can you respond to fire damage in ${location.name}?`,
        answer: `We provide ${location.responseTime?.toLowerCase()} emergency fire damage response to ${location.name}. Our Master Restorer team arrives with professional fire restoration equipment, securing your property and beginning smoke and soot removal immediately.`,
      },
      {
        question: `Can you remove smoke odor from ${location.name} properties?`,
        answer: `Yes, we specialize in complete smoke odor removal for ${location.name} properties including traditional Queenslander homes. We use ozone treatment, thermal fogging, and specialized cleaning techniques to eliminate smoke odors from all surfaces and materials.`,
      },
      {
        question: `Do you handle fire damage insurance claims in ${location.name}?`,
        answer: `Absolutely. We manage the entire insurance claim process for ${location.name} fire damage, working directly with all major insurers. We provide comprehensive documentation, moisture mapping, and professional reporting to maximize your coverage with no upfront costs for approved claims.`,
      },
    ],
    mouldRemediation: [
      {
        question: `Why is mould common in ${location.name} properties?`,
        answer: `${location.name} properties in Southeast Queensland experience high humidity and subtropical moisture conditions that create perfect mould growth environments. Water damage, poor ventilation, and Queensland's wet season all contribute to mould problems requiring professional IICRC-certified remediation.`,
      },
      {
        question: `How do you remove mould from ${location.name} Queenslander homes?`,
        answer: `We use IICRC-certified mould remediation protocols specifically designed for ${location.name} Queenslander properties. This includes containment, HEPA filtration, antimicrobial treatment, and complete subfloor drying to address mould in elevated timber structures common in ${location.region}.`,
      },
      {
        question: `Do you provide mould clearance testing in ${location.name}?`,
        answer: `Yes, all ${location.name} mould remediation projects include post-remediation verification testing. We provide air quality clearance certificates confirming successful mould removal and safe conditions for your property occupants.`,
      },
    ],
    stormDamage: [
      {
        question: `How quickly can you respond to storm damage in ${location.name}?`,
        answer: `We provide ${location.responseTime?.toLowerCase()} emergency storm damage response to ${location.name}. Our team performs immediate emergency board-up and roof tarping to prevent further damage, followed by complete structural assessment and restoration.`,
      },
      {
        question: `What storm damage services do you provide in ${location.name}?`,
        answer: `We provide complete storm damage restoration for ${location.name} properties including emergency tarping, board-up, water extraction, structural drying, tree damage cleanup, roof repairs, and full structural restoration. All services meet IICRC standards and insurance requirements.`,
      },
      {
        question: `Will insurance cover storm damage in ${location.name}?`,
        answer: `Most comprehensive insurance policies cover storm damage for ${location.name} properties. We work directly with all major insurers, providing complete documentation, damage assessment, and professional reporting. We handle direct billing for approved claims with no upfront costs.`,
      },
    ],
  };

  return faqMap[serviceKey] || [];
}

/**
 * Generate related services for internal linking
 */
function generateRelatedServices(locationKey: string, currentServiceKey: string) {
  const location = LOCATION_MAPPINGS[locationKey as keyof typeof LOCATION_MAPPINGS];
  const allServices = Object.entries(SERVICES)
    .filter(([key]) => key !== currentServiceKey)
    .map(([key, service]) => ({
      name: service.name,
      href: `/locations/${location.slug}/${service.slug}`,
      icon: service.icon,
    }));

  return allServices;
}

/**
 * Get hero image path based on service
 */
function getHeroImage(serviceKey: string): string {
  const heroImageMap: Record<string, string> = {
    waterDamage: '/images/hero/fire-water-damage-restoration.webp',
    fireDamage: '/images/hero/fire-water-damage-restoration.webp',
    mouldRemediation: '/images/hero/mould-remediation-services.webp',
    stormDamage: '/images/hero/fire-water-damage-restoration.webp', // Fallback to water/fire image
  };

  return heroImageMap[serviceKey] || '/images/hero/fire-water-damage-restoration.webp';
}

/**
 * Main function to generate location-service data
 */
export function getLocationServiceData(
  locationKey: string,
  serviceKey: string
): LocationServiceData | null {
  const location = LOCATION_MAPPINGS[locationKey as keyof typeof LOCATION_MAPPINGS];
  const service = SERVICES[serviceKey as keyof typeof SERVICES];
  const geoLocation = GEO_LOCATIONS[locationKey];

  if (!location || !service || !geoLocation) {
    return null;
  }

  return {
    // Location Info
    locationName: location.name,
    locationSlug: location.slug,
    locationDescription: location.description,
    coordinates: {
      lat: geoLocation.latitude,
      lng: geoLocation.longitude,
    },
    neighborhoods: location.neighborhoods,

    // Service Info
    serviceName: service.name,
    serviceSlug: service.slug,
    serviceDescription: service.description,
    serviceIcon: service.icon,
    serviceColor: service.color,

    // Combined Content
    heroImage: getHeroImage(serviceKey),
    heroImageAlt: `${service.name} ${location.name} - Emergency ${service.name.toLowerCase()} by IICRC Master Restorer Phill McGurk - ${location.responseTime} response for ${location.name} properties - 24/7 emergency service Brisbane Ipswich Logan`,
    responseTime: location.responseTime,

    // Local Issues
    localIssues: generateLocalIssues(locationKey, serviceKey),

    // Process Steps
    processSteps: generateProcessSteps(locationKey, serviceKey),

    // FAQs
    faqs: generateFAQs(locationKey, serviceKey),

    // Related Services
    relatedServices: generateRelatedServices(locationKey, serviceKey),
  };
}

/**
 * Get all location-service combinations
 */
export function getAllLocationServiceCombinations() {
  const combinations: Array<{ location: string; service: string }> = [];

  Object.keys(LOCATION_MAPPINGS).forEach(locationKey => {
    Object.keys(SERVICES).forEach(serviceKey => {
      combinations.push({
        location: locationKey,
        service: serviceKey,
      });
    });
  });

  return combinations;
}

/**
 * Get all combinations count
 */
export function getLocationServiceCount() {
  return Object.keys(LOCATION_MAPPINGS).length * Object.keys(SERVICES).length;
}
