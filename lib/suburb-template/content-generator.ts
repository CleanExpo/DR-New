/**
 * Content Generator - Suburb-Specific Content Creation
 * Generates unique, SEO-optimized content for each suburb
 */

import {
  SuburbTemplate,
  ContentBlock,
  FAQItem,
  ContentVariation,
} from './types';

/**
 * Library of intro paragraph variations
 * Can be selected based on suburb characteristics
 */
const introVariations: ContentVariation[] = [
  {
    id: 'intro-1',
    category: 'intro',
    template: 'Professional water damage restoration in {SUBURB}. {SPECIALTY} specialists with {DISTANCE} minutes emergency response to {REGION}. Master Restorer certified for {PROPERTY_TYPES}.',
    tags: ['standard', 'water-damage', 'all-types'],
    propertyTypes: ['all'],
  },
  {
    id: 'intro-2',
    category: 'intro',
    template: '24/7 emergency disaster recovery for {SUBURB} residents and businesses. When flooding strikes {SUBURB}, we respond in {DISTANCE} minutes with {SPECIALTY} expertise and Master Restorer certification.',
    tags: ['urgent', 'flood', 'residential'],
    propertyTypes: ['residential', 'mixed'],
  },
  {
    id: 'intro-3',
    category: 'intro',
    template: '{SUBURB} property damage emergency? {SPECIALTY} restoration specialists serving {REGION}. From water and fire damage to mould remediation, we protect {PROPERTY_TYPES} with certified Master Restorer expertise.',
    tags: ['comprehensive', 'multi-service', 'high-value'],
    propertyTypes: ['luxury', 'all'],
  },
  {
    id: 'intro-4',
    category: 'intro',
    template: 'Master Restorer specialists protecting {SUBURB}\'s valuable properties since operations began. Rapid {DISTANCE} minute response to {DISASTROUS_EVENTS} affecting {PROPERTY_TYPES} across {REGION}.',
    tags: ['established', 'experienced', 'local'],
    propertyTypes: ['all'],
  },
  {
    id: 'intro-5',
    category: 'intro',
    template: '{SUBURB} residents and business owners trust us for immediate disaster response. {SPECIALTY} restoration with {DISTANCE} minute emergency arrival. Serving {PROPERTY_TYPES} with {COVERAGE_FOCUS}.',
    tags: ['trust', 'reliability', 'local-focus'],
    propertyTypes: ['residential', 'commercial', 'mixed'],
  },
];

/**
 * Disaster type descriptions by risk factor
 */
const disasterDescriptions: Record<string, string[]> = {
  'water-damage': [
    'Rapid water extraction and drying following burst pipes, leaks, or emergency plumbing failures',
    'Emergency response to flood damage from heavy rainfall, overflowing creeks, or stormwater drainage failures',
    'Basement and foundation water mitigation for properties at risk of seepage and groundwater intrusion',
    'Apartment and unit water damage coordination with building management and strata services',
  ],
  'fire-damage': [
    'Professional smoke and soot removal from structure, contents, and HVAC systems',
    'Fire damage restoration including drywall repair, painting, and structural reconstruction',
    'Contents recovery and restoration including artwork, furniture, and personal belongings',
    'Odour remediation and air quality restoration following fire events',
  ],
  'mould': [
    'Mould detection and remediation following water damage events',
    'Indoor air quality testing and black mould specialist treatments',
    'Prevention strategies to avoid mould growth in high-humidity properties',
    'Remediation of hidden mould in walls, crawlspaces, and HVAC systems',
  ],
  'storm-damage': [
    'Roof damage repair and tarp-up services for weather emergency protection',
    'Window and door damage restoration following storm impact',
    'Tree damage cleanup and structural debris removal',
    'Gutter and downpipe restoration for proper stormwater management',
  ],
  'flood': [
    'Brisbane River and stormwater flooding emergency response',
    'Basement and ground-floor flood extraction and restoration',
    'Flood-damaged contents sorting, cleaning, and restoration',
    'Flood prevention planning and property assessment for future events',
  ],
  'subsidence': [
    'Structural assessment and foundation crack analysis',
    'Cosmetic repair of subsidence-related damage',
    'Coordination with structural engineers for complex cases',
  ],
  'storm-surge': [
    'Coastal property storm surge damage restoration',
    'Salt water damage cleanup and corrosion prevention',
    'Elevated property emergency response for bayside suburbs',
  ],
};

/**
 * FAQ questions organized by topic
 */
const faqTemplates: Record<string, FAQItem[]> = {
  'services': [
    {
      question: 'What services does {COMPANY} provide in {SUBURB}?',
      answer: 'We provide comprehensive disaster recovery services including water damage restoration, fire restoration, mould remediation, and storm damage repair. All services are available 24/7 in {SUBURB} with a typical {DISTANCE} minute response time.',
      category: 'services',
    },
    {
      question: 'Do you work with insurance companies?',
      answer: 'Yes, we work directly with all major insurance providers for streamlined claim processing. We can often bill your insurance directly, minimizing out-of-pocket expenses.',
      category: 'insurance',
    },
    {
      question: 'What areas in {SUBURB} do you service?',
      answer: 'We serve all of {SUBURB} and surrounding areas including {NEARBY_SUBURBS}. Our base location in {REGION} allows us to respond quickly to emergencies across the {REGION_NAME} region.',
      category: 'services',
    },
  ],
  'emergency': [
    {
      question: 'What should I do immediately after discovering water damage?',
      answer: 'First, ensure safety by turning off electricity to affected areas. Stop the water source if possible. Then call us immediately at 1300 309 361. Do not wait—every minute counts in water damage situations.',
      category: 'emergency',
    },
    {
      question: 'How quickly can you respond to {SUBURB}?',
      answer: 'Our typical response time to {SUBURB} is {DISTANCE} minutes, 24/7. We maintain equipment and staff availability to ensure rapid emergency response to all property damage situations.',
      category: 'emergency',
    },
  ],
  'prevention': [
    {
      question: 'What can I do to prevent property damage in {SUBURB}?',
      answer: 'Regular plumbing inspections, roof maintenance, and gutter cleaning are essential. For {SUBURB}, properties should also consider flood barriers or elevation strategies. We can provide a property assessment.',
      category: 'prevention',
    },
    {
      question: 'Are there specific {SUBURB} risks I should know about?',
      answer: '{RISK_SUMMARY}. Understanding your property\'s risks helps us provide targeted prevention and rapid response planning.',
      category: 'prevention',
    },
  ],
  'property-specific': [
    {
      question: 'Do you have experience with {PROPERTY_TYPE} properties?',
      answer: 'Yes, we specialize in restoring {PROPERTY_TYPE} properties. This includes understanding unique materials, construction methods, and preservation requirements specific to these properties.',
      category: 'property-specific',
    },
  ],
};

/**
 * Why Choose Us variations
 */
const whyChooseUsVariations: Record<string, string[]> = {
  'standard': [
    'Master Restorer certification with industry-leading expertise',
    '24/7 emergency response available throughout {REGION}',
    'Direct insurance billing to minimize your out-of-pocket costs',
    '{DISTANCE} minute typical response time in {SUBURB}',
    'Comprehensive services from water and fire restoration to mould remediation',
  ],
  'luxury': [
    'Master Restorer specialists experienced with luxury property restoration',
    'Discrete, professional service protecting privacy and reputation',
    'Heritage property expertise and period-specific restoration techniques',
    'Direct access to premium contractors and specialty materials suppliers',
    'Executive-level communication and priority scheduling',
  ],
  'riverside': [
    'Brisbane River flood zone specialists with historical expertise',
    'Rapid response protocols for riverside emergency situations',
    'Experience protecting valuable waterfront properties and contents',
    'Marina and boat damage coordination services',
    'Flood prevention planning specific to Brisbane River properties',
  ],
  'commercial': [
    'Minimal business disruption during restoration work',
    'Rapid equipment drying and data protection protocols',
    'Large-scale restoration capacity for commercial properties',
    'Strata and building management coordination',
    'Bulk contents restoration for office equipment and inventory',
  ],
};

/**
 * Generate intro paragraph for suburb
 */
export function generateIntro(suburb: SuburbTemplate, variation?: string): string {
  const selectedVariation = variation
    ? introVariations.find(v => v.id === variation)
    : introVariations[0];

  if (!selectedVariation) return '';

  let content = selectedVariation.template;

  // Replace placeholders
  content = content
    .replace(/{SUBURB}/g, suburb.name)
    .replace(/{SPECIALTY}/g, suburb.keySpecialties[0] || 'Disaster recovery')
    .replace(/{DISTANCE}/g, suburb.responseTime)
    .replace(/{REGION}/g, suburb.region)
    .replace(/{PROPERTY_TYPES}/g, suburb.demographics.primaryPropertyTypes.join(', '))
    .replace(/{DISASTROUS_EVENTS}/g, suburb.disasterRisks.map(r => r.type.replace('-', ' ')).slice(0, 2).join(' and '));

  return content;
}

/**
 * Generate disaster types section
 */
export function generateDisasterTypesSection(suburb: SuburbTemplate): ContentBlock[] {
  const blocks: ContentBlock[] = [];

  suburb.disasterRisks
    .sort((a, b) => {
      const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return severityOrder[a.severity] - severityOrder[b.severity];
    })
    .slice(0, 4) // Max 4 disaster types
    .forEach(risk => {
      const descriptions = disasterDescriptions[risk.type] || [];
      const description = descriptions[Math.floor(Math.random() * descriptions.length)] || '';

      blocks.push({
        heading: `${risk.type.replace('-', ' ').charAt(0).toUpperCase() + risk.type.replace('-', ' ').slice(1)} in ${suburb.name}`,
        content: description,
        sectionId: `disaster-${risk.type}`,
        featured: risk.severity === 'critical' || risk.severity === 'high',
      });
    });

  return blocks;
}

/**
 * Generate "Why Choose Us" section
 */
export function generateWhyChooseUs(suburb: SuburbTemplate): ContentBlock {
  // Select variation based on suburb characteristics
  let variationType = 'standard';

  if (suburb.keySpecialties.some(s => s.toLowerCase().includes('luxury'))) {
    variationType = 'luxury';
  } else if (suburb.keySpecialties.some(s => s.toLowerCase().includes('riverside'))) {
    variationType = 'riverside';
  } else if (suburb.keySpecialties.some(s => s.toLowerCase().includes('commercial'))) {
    variationType = 'commercial';
  }

  const points = whyChooseUsVariations[variationType] || whyChooseUsVariations['standard'];

  // Replace placeholders
  const customizedPoints = points.map(point =>
    point
      .replace(/{SUBURB}/g, suburb.name)
      .replace(/{REGION}/g, suburb.region)
      .replace(/{DISTANCE}/g, suburb.responseTime)
  );

  return {
    heading: `Why ${suburb.name} Residents Choose Us`,
    content: customizedPoints.join('\n\n'),
    sectionId: 'why-choose-us',
  };
}

/**
 * Generate FAQ items for suburb
 */
export function generateFAQs(suburb: SuburbTemplate): FAQItem[] {
  const faqs: FAQItem[] = [];

  // Add standard service FAQs
  faqTemplates['services'].slice(0, 2).forEach(faq => {
    faqs.push({
      ...faq,
      question: faq.question
        .replace(/{SUBURB}/g, suburb.name)
        .replace(/{COMPANY}/g, 'Disaster Recovery'),
      answer: faq.answer
        .replace(/{SUBURB}/g, suburb.name)
        .replace(/{DISTANCE}/g, suburb.responseTime)
        .replace(/{NEARBY_SUBURBS}/g, suburb.nearbySuburbs.slice(0, 3).join(', ') || 'surrounding areas'),
      featured: true,
    });
  });

  // Add property-specific FAQ if applicable
  if (suburb.demographics.primaryPropertyTypes.length > 0) {
    const propertyFAQ = {
      question: `Do you have experience with ${suburb.demographics.primaryPropertyTypes.join(' and ')} properties?`,
      answer: `Yes, we specialize in restoring ${suburb.demographics.primaryPropertyTypes.join(' and ')} properties in ${suburb.name}. This includes understanding unique materials, construction methods, and preservation requirements specific to these properties.`,
      category: 'property-specific' as const,
    };
    faqs.push(propertyFAQ);
  }

  // Add emergency FAQ
  faqTemplates['emergency'][0] && faqs.push({
    ...faqTemplates['emergency'][0],
    question: faqTemplates['emergency'][0].question.replace(/{SUBURB}/g, suburb.name),
    answer: faqTemplates['emergency'][0].answer.replace(/{SUBURB}/g, suburb.name),
  });

  // Add risk-specific prevention FAQ
  if (suburb.disasterRisks.length > 0) {
    const topRisk = suburb.disasterRisks[0];
    const riskSummary = `${suburb.name} faces elevated risks from ${topRisk.type.replace('-', ' ')}${suburb.floodHistory ? ' with historical flooding incidents' : ''}`;

    const preventionFAQ: FAQItem = {
      question: `Are there specific ${suburb.name} risks I should know about?`,
      answer: riskSummary,
      category: 'prevention',
    };
    faqs.push(preventionFAQ);
  }

  return faqs;
}

/**
 * Generate emergency response content block
 */
export function generateEmergencyResponse(suburb: SuburbTemplate): ContentBlock {
  const steps = [
    `Call us immediately at 1300 309 361`,
    `Our team responds within ${suburb.responseTime} to ${suburb.name}`,
    `Rapid assessment and emergency stabilization of damage`,
    `Documentation and insurance coordination`,
    `Professional restoration and remediation`,
    `Final inspection and restoration completion`,
  ];

  return {
    heading: `Our ${suburb.name} Emergency Response`,
    content: `When disaster strikes, every minute counts. Our emergency response protocol is designed to minimize property damage and protect your family or business:\n\n${steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`,
    sectionId: 'emergency-response',
  };
}

/**
 * Generate services available content
 */
export function generateServicesSection(suburb: SuburbTemplate): ContentBlock[] {
  const servicesByType: Record<string, string> = {
    'water-damage': 'Water Damage Restoration - burst pipes, leaks, flooding',
    'fire-damage': 'Fire & Smoke Restoration - fire recovery and odour removal',
    'mould': 'Mould Remediation - detection, removal, and prevention',
    'storm-damage': 'Storm Damage Repair - roofs, windows, debris removal',
    'flood': 'Flood Restoration - emergency extraction and recovery',
  };

  return suburb.disasterRisks
    .filter(risk => risk.type in servicesByType)
    .slice(0, 5)
    .map(risk => ({
      heading: servicesByType[risk.type],
      content: `Available 24/7 in ${suburb.name}. Rapid response with Master Restorer expertise. Direct insurance billing available.`,
      sectionId: `service-${risk.type}`,
    }));
}

/**
 * Generate nearby suburbs section
 */
export function generateNearbySuburbsText(suburb: SuburbTemplate, suburbNames: Record<string, string>): string {
  const nearbyLinks = suburb.nearbySuburbs
    .slice(0, 6)
    .map(slug => suburbNames[slug] || slug)
    .join(', ');

  return `We also serve ${nearbyLinks} and surrounding suburbs throughout the ${suburb.region} area.`;
}

/**
 * Select optimal variations based on suburb profile
 */
export function selectContentVariations(suburb: SuburbTemplate): {
  intro: string;
  whyChooseUs: string;
  faqCategory: string;
} {
  // This could be expanded to intelligently select variations
  return {
    intro: 'intro-1',
    whyChooseUs: 'standard',
    faqCategory: 'services',
  };
}
