/**
 * Hero Image Data
 * Centralized hero image configuration
 */

export interface HeroImage {
  id: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

const heroImages: HeroImage[] = [
  {
    id: 'disaster-recovery-main',
    src: '/images/hero/disaster-recovery-hero.jpg',
    alt: 'Disaster Recovery Services',
    width: 1920,
    height: 1080,
  },
  {
    id: 'water-damage',
    src: '/images/hero/water-damage-hero.jpg',
    alt: 'Water Damage Restoration',
    width: 1920,
    height: 1080,
  },
  {
    id: 'fire-damage',
    src: '/images/hero/fire-damage-hero.jpg',
    alt: 'Fire Damage Restoration',
    width: 1920,
    height: 1080,
  },
  {
    id: 'mould-remediation',
    src: '/images/hero/mould-remediation-hero.jpg',
    alt: 'Mould Remediation Services',
    width: 1920,
    height: 1080,
  },
  {
    id: 'biohazard-remediation',
    src: '/images/services/crime-scene-remediation.webp',
    alt: 'Biohazard and Crime Scene Cleaning Services',
    width: 1920,
    height: 1080,
  },
  {
    id: 'fire-smoke-restoration',
    src: '/images/hero/fire-damage-hero.jpg',
    alt: 'Fire and Smoke Damage Restoration',
    width: 1920,
    height: 1080,
  },
  {
    id: 'sewage-remediation',
    src: '/images/services/sewage-cleanup.jpg',
    alt: 'Sewage Cleanup and Remediation Services',
    width: 1920,
    height: 1080,
  },
  {
    id: 'fire-water-damage-restoration',
    src: '/images/hero/disaster-recovery-hero.jpg',
    alt: 'Multi-Peril Disaster Recovery',
    width: 1920,
    height: 1080,
  },
];

export function getHeroImageById(id: string): HeroImage | undefined {
  return heroImages.find((img) => img.id === id);
}

export function getAllHeroImages(): HeroImage[] {
  return heroImages;
}
