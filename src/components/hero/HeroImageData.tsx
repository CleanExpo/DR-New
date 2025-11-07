/**
 * Hero Image Data and Metadata
 * Centralized management of hero section images with SEO metadata
 */

export interface HeroImageMetadata {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  width: number;
  height: number;
  priority?: boolean;
  keywords?: string[];
  category: 'water' | 'fire' | 'mould' | 'biohazard' | 'storm' | 'sewage' | 'emergency';
}

export const heroImages: HeroImageMetadata[] = [
  {
    id: 'biohazard-remediation',
    src: '/images/hero/biohazard-remediation-services.png',
    alt: 'Professional biohazard remediation services team in full PPE conducting safe cleanup of hazardous materials in Australian commercial property',
    title: 'Bio Hazard Remediation Services - 24/7 Emergency Response Australia',
    description: 'IICRC-certified biohazard remediation specialists providing trauma scene cleaning, infectious disease decontamination, and hazardous material removal across Australia. Available 24/7 with discrete, compassionate service.',
    width: 1920,
    height: 1080,
    priority: true,
    keywords: [
      'biohazard cleaning',
      'trauma scene cleanup',
      'infectious disease cleaning',
      'crime scene cleaning',
      'blood cleanup',
      'unattended death cleanup',
      'hoarding cleanup',
      'hazmat removal',
      'covid decontamination',
      'pathogen removal',
      'biohazard remediation australia',
      'emergency biohazard response'
    ],
    category: 'biohazard'
  },
  {
    id: 'sewage-remediation',
    src: '/images/hero/sewage-remediation-services.png',
    alt: 'Emergency sewage cleanup and Category 3 black water damage restoration team extracting contaminated water from Australian residential property',
    title: 'Sewage & Category 3 Water Damage Restoration - 24/7 Emergency Response',
    description: 'Certified Category 3 black water damage specialists providing emergency sewage cleanup, contaminated water extraction, and complete sanitization services. IICRC S500 certified technicians available 24/7 across Australia for sewage backups, toilet overflows, and grossly contaminated water emergencies.',
    width: 1920,
    height: 1080,
    priority: true,
    keywords: [
      'sewage cleanup',
      'category 3 water damage',
      'black water restoration',
      'sewage backup cleanup',
      'toilet overflow cleanup',
      'contaminated water removal',
      'sewer line backup',
      'septic tank overflow',
      'grey water damage',
      'grossly contaminated water',
      'emergency sewage removal',
      'raw sewage cleanup',
      'fecal contamination cleanup',
      'bacterial decontamination',
      'pathogen removal',
      'sewage sanitization',
      'category 3 water extraction'
    ],
    category: 'sewage'
  },
  {
    id: 'disaster-recovery-main',
    src: '/images/hero/disaster-recovery-services.jpg',
    alt: 'Comprehensive disaster recovery services team responding to water, storm, flood, mould, fire and biohazard emergencies across Australian properties',
    title: 'Complete Disaster Recovery Services - Water, Storm, Flood, Mould, Fire & Biohazard Remediation Australia',
    description: 'Full-service disaster recovery specialists providing comprehensive restoration for water damage, storm damage, flood recovery, mould remediation, fire restoration, and biohazard cleanup. IICRC-certified technicians available 24/7 nationwide with rapid emergency response for residential, commercial, and industrial properties.',
    width: 1920,
    height: 1080,
    priority: true,
    keywords: [
      'disaster recovery services',
      'water damage restoration',
      'storm damage repair',
      'flood recovery services',
      'mould remediation',
      'fire damage restoration',
      'biohazard cleanup',
      'emergency restoration services',
      'property damage restoration',
      'insurance claim restoration',
      'IICRC certified restoration',
      'natural disaster recovery',
      'commercial disaster recovery',
      'residential restoration services',
      '24/7 emergency response',
      'complete restoration services',
      'multi-peril restoration',
      'catastrophe response',
      'disaster mitigation services',
      'property recovery specialists'
    ],
    category: 'emergency'
  },
  {
    id: 'commercial-restoration',
    src: '/images/hero/commercial-restoration-services.jpg',
    alt: 'Professional commercial restoration team servicing strata properties, government buildings, and building management facilities across Australia',
    title: 'Commercial, Strata & Government Building Restoration Services - 24/7 Response Australia',
    description: 'Specialized commercial disaster restoration for strata properties, government facilities, building management companies, and large-scale commercial properties. Expert teams equipped for office towers, retail complexes, industrial facilities, and multi-unit residential buildings with minimal business disruption and compliance-focused restoration.',
    width: 1920,
    height: 1080,
    priority: true,
    keywords: [
      'commercial restoration services',
      'strata property restoration',
      'government building restoration',
      'building management services',
      'commercial water damage',
      'office building restoration',
      'retail property restoration',
      'industrial facility restoration',
      'body corporate restoration',
      'multi-unit restoration',
      'commercial fire restoration',
      'large loss restoration',
      'business continuity restoration',
      'commercial mould remediation',
      'facility management restoration',
      'property management restoration',
      'corporate building restoration',
      'commercial emergency response',
      'compliance restoration services',
      'commercial insurance restoration'
    ],
    category: 'water'
  },
  {
    id: 'fire-smoke-restoration',
    src: '/images/hero/fire-smoke-damage-restoration.jpg',
    alt: 'Professional fire and smoke damage restoration team performing soot removal and odour remediation in Australian residential and commercial properties',
    title: 'Fire, Smoke & Odour Damage Restoration - 24/7 Emergency Response Australia',
    description: 'Expert fire and smoke damage restoration specialists providing comprehensive soot removal, smoke odour elimination, and structural restoration for residential and commercial properties. IICRC-certified technicians use advanced thermal fogging, ozone treatment, and hydroxyl generators to completely eliminate fire damage and persistent smoke odours.',
    width: 1920,
    height: 1080,
    priority: true,
    keywords: [
      'fire damage restoration',
      'smoke damage cleanup',
      'odour remediation services',
      'soot removal',
      'fire restoration services',
      'smoke odour removal',
      'residential fire damage',
      'commercial fire restoration',
      'thermal fogging',
      'ozone treatment',
      'hydroxyl generators',
      'fire damage repair',
      'smoke smell elimination',
      'charring restoration',
      'content restoration fire',
      'structural fire damage',
      'kitchen fire cleanup',
      'electrical fire restoration',
      'bushfire smoke damage',
      'fire insurance restoration',
      'emergency fire response',
      'post-fire cleaning'
    ],
    category: 'fire'
  },
  {
    id: 'fire-water-damage-restoration',
    src: '/images/hero/fire-water-damage-restoration.jpg',
    alt: 'Comprehensive fire water smoke and mould damage restoration team providing multi-peril remediation services for residential and commercial properties across Australia',
    title: 'Fire, Water, Smoke, Odour & Mould Remediation Services - Complete Disaster Restoration Australia',
    description: 'Full-service disaster restoration specialists handling fire damage, water damage, smoke remediation, odour elimination, and mould removal for residential and commercial properties. Expert multi-peril restoration teams equipped to handle complex combined damage scenarios with 24/7 emergency response and complete property recovery.',
    width: 1920,
    height: 1080,
    priority: true,
    keywords: [
      'fire water damage restoration',
      'multi-peril restoration',
      'combined damage restoration',
      'fire and water damage',
      'smoke and mould remediation',
      'odour elimination services',
      'residential disaster restoration',
      'commercial property restoration',
      'complete damage restoration',
      'fire water smoke damage',
      'mould after water damage',
      'comprehensive restoration services',
      'emergency multi-peril response',
      'complex damage restoration',
      'fire suppression water damage',
      'secondary damage prevention',
      'total property restoration',
      'disaster recovery specialists',
      'insurance restoration services',
      'structural drying fire damage',
      'smoke odour mould removal',
      'integrated restoration services'
    ],
    category: 'water'
  },
  {
    id: 'mould-remediation',
    src: '/images/hero/mould-remediation-services.jpg',
    alt: 'Professional mould remediation specialists conducting comprehensive mould removal and air quality restoration in Australian residential and commercial properties',
    title: 'Mould Remediation Services - Expert Mould Removal & Prevention Australia',
    description: 'Certified mould remediation specialists providing complete mould inspection, removal, and prevention services. IICRC AMRT-certified technicians use advanced containment, HEPA filtration, and antimicrobial treatments to eliminate all mould species including black mould, ensuring safe and healthy indoor environments for residential and commercial properties.',
    width: 1920,
    height: 1080,
    priority: true,
    keywords: [
      'mould remediation services',
      'mould removal',
      'black mould removal',
      'mould inspection',
      'mould testing',
      'air quality restoration',
      'toxic mould cleanup',
      'mould prevention',
      'antimicrobial treatment',
      'HEPA air filtration',
      'moisture control',
      'mould assessment',
      'residential mould removal',
      'commercial mould remediation',
      'bathroom mould removal',
      'ceiling mould treatment',
      'wall cavity mould',
      'attic mould removal',
      'basement mould cleanup',
      'mould damage restoration',
      'indoor air quality',
      'mould health hazards',
      'IICRC AMRT certified',
      'mould contamination cleanup'
    ],
    category: 'mould'
  }
];

/**
 * Get hero image by category
 */
export function getHeroImageByCategory(category: string): HeroImageMetadata | undefined {
  return heroImages.find(img => img.category === category);
}

/**
 * Get hero image by ID
 */
export function getHeroImageById(id: string): HeroImageMetadata | undefined {
  return heroImages.find(img => img.id === id);
}

/**
 * Get random hero image
 */
export function getRandomHeroImage(): HeroImageMetadata {
  const randomIndex = Math.floor(Math.random() * heroImages.length);
  return heroImages[randomIndex];
}

/**
 * Generate structured data for hero image
 */
export function generateImageStructuredData(...args: any[]): void {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    name: image.title,
    description: image.description,
    url: `${process.env.NEXT_PUBLIC_APP_URL}${image.src}`,
    width: image.width,
    height: image.height,
    keywords: image.keywords?.join(', '),
    contentUrl: `${process.env.NEXT_PUBLIC_APP_URL}${image.src}`,
    thumbnailUrl: `${process.env.NEXT_PUBLIC_APP_URL}${image.src}`,
    uploadDate: new Date().toISOString(),
    acquireLicensePage: `${process.env.NEXT_PUBLIC_APP_URL}/terms`,
    copyrightHolder: {
      '@type': 'Organization',
      name: 'National Restoration Platform'
    }
  };
}