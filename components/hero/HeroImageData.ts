/**
 * Hero Image Data
 * Centralized hero image configuration for all pages
 */

export interface HeroImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
}

/**
 * Hero Images Database
 * Maps hero image IDs to their data
 */
const HERO_IMAGES: Record<string, HeroImage> = {
  // Main hero
  'hero-main': {
    id: 'hero-main',
    src: '/images/hero/hero-main.jpg',
    alt: 'Water Damage Restoration Brisbane - IICRC Master Restorer - 24/7 Emergency Response',
    title: 'Water Damage Restoration Brisbane | 24/7 Emergency',
    subtitle: '24-hour water damage, fire damage, and flood restoration. IICRC certified. Insurance approved.'
  },

  // Service heroes
  'fire-water-damage-restoration': {
    id: 'fire-water-damage-restoration',
    src: '/images/hero/fire-water-damage-restoration.webp',
    alt: 'Fire and Water Damage Restoration Brisbane - IICRC Master Restorer Phill McGurk',
    title: 'Fire, Water, Smoke & Mould Restoration Services',
    subtitle: 'Professional disaster recovery services across Brisbane, Ipswich, and Logan'
  },

  'fire-smoke-damage-restoration': {
    id: 'fire-smoke-damage-restoration',
    src: '/images/hero/fire-smoke-damage-restoration.webp',
    alt: 'Fire and Smoke Damage Restoration Brisbane - Emergency Response 24/7',
    title: 'Fire & Smoke Damage Restoration',
    subtitle: '24/7 emergency fire restoration services across Brisbane'
  },

  'mould-remediation-services': {
    id: 'mould-remediation-services',
    src: '/images/hero/mould-remediation-services.webp',
    alt: 'Mould Remediation Brisbane - Professional Mould Removal Services',
    title: 'Professional Mould Remediation',
    subtitle: 'Safe and effective mould removal across Brisbane, Ipswich, and Logan'
  },

  'disaster-recovery-services': {
    id: 'disaster-recovery-services',
    src: '/images/hero/disaster-recovery-services.webp',
    alt: 'Disaster Recovery Services Brisbane - IICRC Master Restorer',
    title: 'Disaster Recovery Services',
    subtitle: 'Complete disaster recovery and restoration services'
  },

  'commercial-restoration-services': {
    id: 'commercial-restoration-services',
    src: '/images/hero/commercial-restoration-services.webp',
    alt: 'Commercial Restoration Services Brisbane - Large-Scale Property Recovery',
    title: 'Commercial Restoration Services',
    subtitle: 'Enterprise-grade restoration for commercial properties'
  },

  'biohazard-remediation-services': {
    id: 'biohazard-remediation-services',
    src: '/images/hero/biohazard-remediation-services.webp',
    alt: 'Biohazard Remediation Brisbane - Professional Cleanup Services',
    title: 'Biohazard Remediation',
    subtitle: 'Professional biohazard cleanup and remediation services'
  },

  'sewage-remediation-services': {
    id: 'sewage-remediation-services',
    src: '/images/hero/sewage-remediation-services.webp',
    alt: 'Sewage Cleanup Brisbane - Emergency Sewage Remediation',
    title: 'Sewage Cleanup & Remediation',
    subtitle: 'Emergency sewage cleanup and decontamination services'
  },

  // Default fallback
  'default': {
    id: 'default',
    src: '/images/hero/disaster-recovery-services.webp',
    alt: 'Disaster Recovery Brisbane - IICRC Master Restorer Services',
    title: 'Professional Disaster Recovery',
    subtitle: 'Expert restoration services across Brisbane, Ipswich, and Logan'
  }
};

/**
 * Get hero image by ID
 * Returns the hero image data or default if not found
 */
export function getHeroImageById(id: string): HeroImage {
  return HERO_IMAGES[id] || HERO_IMAGES['default'];
}

/**
 * Get all hero images
 */
export function getAllHeroImages(): HeroImage[] {
  return Object.values(HERO_IMAGES);
}

/**
 * Check if hero image exists
 */
export function heroImageExists(id: string): boolean {
  return id in HERO_IMAGES;
}
