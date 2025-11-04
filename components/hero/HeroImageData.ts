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
];

export function getHeroImageById(id: string): HeroImage | undefined {
  return heroImages.find((img) => img.id === id);
}

export function getAllHeroImages(): HeroImage[] {
  return heroImages;
}
