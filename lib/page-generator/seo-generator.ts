/**
 * SEO Generation Module
 * Generates SEO-optimized titles, descriptions, and keywords
 */

import { LocationData, ServiceData, ContractorData, SEOData } from './types';

/**
 * Generate SEO data for a page
 */
export function generateSEOData(
  location: LocationData,
  service?: ServiceData,
  contractors?: ContractorData[]
): SEOData {
  const title = generateTitle(location, service);
  const description = generateDescription(location, service, contractors);
  const keywords = generateKeywords(location, service);
  const h1 = generateH1(location, service);

  return {
    title,
    description,
    keywords,
    h1,
    canonicalUrl: generateCanonicalUrl(location, service),
    images: generateImages(location, service),
    publishedDate: new Date(),
    modifiedDate: new Date()
  };
}

/**
 * Generate SEO-optimized title (50-60 characters ideal)
 */
function generateTitle(location: LocationData, service?: ServiceData): string {
  const templates = [
    // Service + Location templates
    '{service} {location} | 24/7 Emergency Response',
    '{location} {service} | Certified Contractors',
    'Emergency {service} in {location} | Same Day Service',
    '{service} Services {location} | Insurance Approved',
    '{location} {service} Specialists | IICRC Certified',

    // Location-only templates
    'Disaster Recovery {location} | Water Fire Mould Damage',
    '{location} Emergency Restoration | 24/7 Response',
    'Insurance Claims {location} | Restoration Services',
    '{location} Disaster Recovery | Certified Contractors',
    'Emergency Services {location} | Water Fire Mould'
  ];

  const isServiceSpecific = !!service;
  const templatePool = isServiceSpecific
    ? templates.filter(t => t.includes('{service}'))
    : templates.filter(t => !t.includes('{service}'));

  const template = templatePool[Math.floor(Math.random() * templatePool.length)];

  let title = template
    .replace('{location}', location.name)
    .replace('{service}', service?.name || '');

  // Ensure title length is optimal
  if (title.length > 60) {
    title = `${title.substring(0, 57)  }...`;
  }

  return title;
}

/**
 * Generate SEO-optimized description (150-160 characters ideal)
 */
function generateDescription(
  location: LocationData,
  service?: ServiceData,
  contractors?: ContractorData[]
): string {
  const contractorCount = contractors?.length || 0;

  const templates = [
    // Service-specific templates
    'Professional {service} services in {location}. {contractors} certified contractors available 24/7. Insurance approved. Call now for emergency response.',
    '{service} restoration in {location} and surrounding areas. IICRC certified specialists. Same-day emergency service. Direct insurance billing available.',
    'Expert {service} contractors serving {location}. 2-4 hour response time. 94% insurance approval rate. Free assessments. Available 24/7.',
    'Emergency {service} in {location}. {contractors} local contractors ready to respond. Insurance claims assistance. No upfront costs.',

    // Location-only templates
    'Disaster recovery services in {location}. Water damage, fire restoration, mould remediation. {contractors} certified contractors. 24/7 emergency response.',
    '{location} restoration specialists. Complete disaster recovery services. Insurance approved contractors. Same-day emergency response available.',
    'Insurance-approved restoration in {location}. Water, fire, mould damage experts. Free assessments. {contractors} local contractors available 24/7.',
    'Emergency disaster recovery {location}. IICRC certified contractors for all restoration needs. Direct insurance billing. Rapid response guaranteed.'
  ];

  const isServiceSpecific = !!service;
  const templatePool = isServiceSpecific
    ? templates.filter(t => t.includes('{service}'))
    : templates.filter(t => !t.includes('{service}'));

  const template = templatePool[Math.floor(Math.random() * templatePool.length)];

  let description = template
    .replace(/{location}/g, location.name)
    .replace(/{service}/g, service?.name || '')
    .replace(/{contractors}/g, contractorCount > 0 ? `${contractorCount}+` : '50+');

  // Ensure description length is optimal
  if (description.length > 160) {
    description = `${description.substring(0, 157)  }...`;
  }

  return description;
}

/**
 * Generate comprehensive keyword list
 */
function generateKeywords(location: LocationData, service?: ServiceData): string[] {
  const keywords: string[] = [];

  // Location-based keywords
  keywords.push(
    location.name.toLowerCase(),
    `${location.name.toLowerCase()} ${location.state.toLowerCase()}`,
    location.postcode
  );

  if (location.city && location.city !== location.name) {
    keywords.push(location.city.toLowerCase());
  }

  if (location.suburb && location.suburb !== location.name) {
    keywords.push(location.suburb.toLowerCase());
  }

  // Service-based keywords
  if (service) {
    keywords.push(
      service.name.toLowerCase(),
      service.slug,
      ...service.keywords
    );

    // Service + Location combinations
    keywords.push(
      `${service.name.toLowerCase()} ${location.name.toLowerCase()}`,
      `${location.name.toLowerCase()} ${service.name.toLowerCase()}`,
      `${service.slug} ${location.slug}`,
      `emergency ${service.name.toLowerCase()} ${location.name.toLowerCase()}`
    );
  } else {
    // Generic disaster recovery keywords
    keywords.push(
      'disaster recovery',
      'restoration services',
      'emergency restoration',
      'insurance claims',
      'water damage',
      'fire damage',
      'mould remediation',
      'flood restoration',
      'storm damage'
    );

    // Generic + Location combinations
    keywords.push(
      `disaster recovery ${location.name.toLowerCase()}`,
      `restoration services ${location.name.toLowerCase()}`,
      `emergency services ${location.name.toLowerCase()}`
    );
  }

  // Industry-specific keywords
  keywords.push(
    'iicrc certified',
    '24/7 emergency',
    'insurance approved',
    'same day service',
    'free assessment',
    'no upfront costs',
    'direct billing',
    'certified contractors'
  );

  // Long-tail keywords
  if (service) {
    keywords.push(
      `best ${service.name.toLowerCase()} ${location.name.toLowerCase()}`,
      `cheap ${service.name.toLowerCase()} ${location.name.toLowerCase()}`,
      `${service.name.toLowerCase()} near me ${location.name.toLowerCase()}`,
      `${service.name.toLowerCase()} cost ${location.name.toLowerCase()}`,
      `${service.name.toLowerCase()} insurance claim ${location.name.toLowerCase()}`
    );
  }

  // Remove duplicates and return
  return [...new Set(keywords)];
}

/**
 * Generate H1 heading
 */
function generateH1(location: LocationData, service?: ServiceData): string {
  if (service) {
    const templates = [
      `${service.name} Services in ${location.name}`,
      `Emergency ${service.name} - ${location.name}`,
      `${location.name} ${service.name} Specialists`,
      `Professional ${service.name} in ${location.name}`,
      `${service.name} Contractors Serving ${location.name}`
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  }

  const templates = [
    `Disaster Recovery Services ${location.name}`,
    `${location.name} Emergency Restoration Services`,
    `Professional Restoration in ${location.name}`,
    `${location.name} Water Fire Mould Damage Experts`,
    `24/7 Disaster Recovery ${location.name}`
  ];

  return templates[Math.floor(Math.random() * templates.length)];
}

/**
 * Generate canonical URL
 */
function generateCanonicalUrl(location: LocationData, service?: ServiceData): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://disaster-recovery-seven.vercel.app';

  if (service) {
    return `${baseUrl}/locations/${location.slug}/${service.slug}`;
  }

  return `${baseUrl}/locations/${location.slug}`;
}

/**
 * Generate image URLs for SEO
 */
function generateImages(location: LocationData, service?: ServiceData): string[] {
  const images: string[] = [];

  // Default images
  images.push('/images/disaster-recovery-hero.jpg');

  if (service) {
    images.push(`/images/services/${service.slug}.jpg`);
  }

  // Location-specific images if available
  images.push(`/images/locations/${location.slug}.jpg`);

  return images;
}

/**
 * Generate location-specific modifiers for keywords
 */
export function generateLocationModifiers(location: LocationData): string[] {
  const modifiers: string[] = [];

  // Proximity modifiers
  modifiers.push(
    'near me',
    'nearby',
    'local',
    'in my area',
    `near ${location.name}`,
    `around ${location.name}`
  );

  // Regional modifiers
  if (location.state) {
    modifiers.push(
      location.state.toLowerCase(),
      `${location.state.toLowerCase()} australia`
    );
  }

  // Suburb/city modifiers
  if (location.suburb) {
    modifiers.push(
      `${location.suburb.toLowerCase()} area`,
      `${location.suburb.toLowerCase()} and surrounds`
    );
  }

  return modifiers;
}

/**
 * Generate service-specific modifiers for keywords
 */
export function generateServiceModifiers(service: ServiceData): string[] {
  const modifiers: string[] = [];

  // Urgency modifiers
  modifiers.push(
    'emergency',
    'urgent',
    'immediate',
    '24 hour',
    '24/7',
    'same day',
    'after hours'
  );

  // Quality modifiers
  modifiers.push(
    'best',
    'top rated',
    'certified',
    'professional',
    'licensed',
    'insured',
    'iicrc'
  );

  // Cost modifiers
  modifiers.push(
    'affordable',
    'cheap',
    'cost',
    'price',
    'quote',
    'free assessment',
    'no upfront cost'
  );

  // Service-specific modifiers
  if (service.category.slug === 'water-damage') {
    modifiers.push('flood', 'leak', 'burst pipe', 'extraction', 'drying');
  } else if (service.category.slug === 'fire-damage') {
    modifiers.push('smoke', 'soot', 'burn', 'char', 'restoration');
  } else if (service.category.slug === 'mould') {
    modifiers.push('mold', 'black mould', 'remediation', 'removal', 'treatment');
  }

  return modifiers;
}

/**
 * Generate competitor analysis keywords
 */
export function generateCompetitorKeywords(location: LocationData, service?: ServiceData): string[] {
  const competitors = [
    'servpro',
    'paul davis',
    'servicemaster',
    'rainbow international',
    'restoration 1',
    'puroclean'
  ];

  const keywords: string[] = [];

  competitors.forEach(competitor => {
    if (service) {
      keywords.push(
        `${competitor} ${service.slug} ${location.slug}`,
        `${competitor} alternative ${location.name}`,
        `better than ${competitor} ${location.name}`
      );
    } else {
      keywords.push(
        `${competitor} ${location.slug}`,
        `${competitor} alternative ${location.name}`
      );
    }
  });

  return keywords;
}