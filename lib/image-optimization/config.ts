/**
 * Comprehensive Image Optimization Configuration
 * Centralized image optimization settings for the entire site
 */

export const IMAGE_CONFIG = {
  // Image formats in order of preference
  formats: ['image/avif', 'image/webp', 'image/jpeg'] as const,

  // Responsive breakpoints
  breakpoints: {
    mobile: 640,
    tablet: 768,
    laptop: 1024,
    desktop: 1280,
    wide: 1920,
    ultrawide: 2560,
  },

  // Device pixel ratios
  densities: [1, 2, 3] as const,

  // Quality settings by image type
  quality: {
    hero: 85,
    thumbnail: 75,
    icon: 90,
    gallery: 80,
    background: 70,
    default: 75,
  },

  // Cache settings
  cache: {
    ttl: 31536000, // 1 year in seconds
    staleWhileRevalidate: 86400, // 1 day
  },

  // Image domains
  domains: [
    'dr-new-ten.vercel.app',
    'images.unsplash.com',
    'cloudinary.com',
    'res.cloudinary.com',
  ],

  // Blur placeholder settings
  blur: {
    enabled: true,
    quality: 10,
    size: 8,
  },

  // Loading priorities
  priority: {
    hero: true,
    aboveFold: true,
    belowFold: false,
  },

  // Image paths
  paths: {
    base: '/images',
    optimized: '/images/optimized',
    thumbnails: '/images/optimized/thumbnails',
    heroes: '/images/heroes',
    logos: '/images/logos',
    services: '/images/services',
    damage: '/images/optimized/damage',
    equipment: '/images/optimized/equipment',
    process: '/images/optimized/process',
    places: '/images/places',
    team: '/images/team',
    icons: '/images/icons',
    branding: '/images/optimized/branding',
  },

  // Size presets for common use cases
  sizes: {
    hero: {
      width: 1920,
      height: 1080,
      quality: 85,
    },
    card: {
      width: 400,
      height: 300,
      quality: 75,
    },
    thumbnail: {
      width: 150,
      height: 150,
      quality: 75,
    },
    icon: {
      width: 64,
      height: 64,
      quality: 90,
    },
    logo: {
      width: 200,
      height: 80,
      quality: 90,
    },
    gallery: {
      width: 800,
      height: 600,
      quality: 80,
    },
    og: {
      width: 1200,
      height: 630,
      quality: 85,
    },
  },

  // Lazy loading settings
  lazy: {
    rootMargin: '50px',
    threshold: 0.01,
  },
} as const;

// SEO-optimized alt text templates
export const ALT_TEXT_TEMPLATES = {
  waterDamage: (location: string) =>
    `Emergency water damage restoration services in ${location} - 24/7 Brisbane response`,
  fireDamage: (location: string) =>
    `Professional fire damage restoration in ${location} - Certified Master Restorer`,
  mouldRemediation: (location: string) =>
    `Expert mould remediation services in ${location} - IICRC certified specialists`,
  stormDamage: (location: string) =>
    `Storm damage repair and restoration in ${location} - Emergency Queensland service`,
  sewageCleanup: (location: string) =>
    `Category 3 sewage cleanup and decontamination in ${location} - Biohazard specialists`,
  commercial: (location: string) =>
    `Commercial disaster restoration services in ${location} - Large-scale projects`,
  emergency: (location: string) =>
    `24/7 Emergency disaster recovery in ${location} - Rapid response guaranteed`,
  beforeAfter: (service: string) =>
    `Before and after ${service} restoration work - Brisbane professional results`,
  equipment: (equipmentName: string) =>
    `Professional ${equipmentName} for disaster restoration - Advanced equipment`,
  certification: (certName: string) =>
    `${certName} - Disaster Recovery professional certification badge`,
  team: (name: string, role: string) =>
    `${name} - ${role} at Disaster Recovery Brisbane`,
  process: (processName: string) =>
    `${processName} process for disaster restoration - Professional methodology`,
};

// Image asset inventory
export const IMAGE_INVENTORY = {
  // Hero images
  heroes: {
    'disaster-recovery-hero.webp': {
      alt: 'Emergency disaster recovery services Brisbane - 24/7 response team',
      width: 1920,
      height: 1080,
      priority: true,
    },
    'vehicles-fleet.jpg': {
      alt: 'Disaster Recovery Brisbane fleet - Emergency response vehicles',
      width: 1920,
      height: 1080,
      priority: false,
    },
    'mould-banner.jpg': {
      alt: 'Professional mould remediation services Brisbane - IICRC certified',
      width: 1920,
      height: 600,
      priority: false,
    },
  },

  // Service images
  services: {
    'water-damage-restoration.webp': {
      alt: ALT_TEXT_TEMPLATES.waterDamage('Brisbane'),
      width: 800,
      height: 600,
    },
    'fire-damage-restoration.webp': {
      alt: ALT_TEXT_TEMPLATES.fireDamage('Brisbane'),
      width: 800,
      height: 600,
    },
    'mould-remediation.webp': {
      alt: ALT_TEXT_TEMPLATES.mouldRemediation('Brisbane'),
      width: 800,
      height: 600,
    },
    'sewage-sanitisation.webp': {
      alt: ALT_TEXT_TEMPLATES.sewageCleanup('Brisbane'),
      width: 800,
      height: 600,
    },
    'crime-scene-remediation.webp': {
      alt: 'Crime scene and trauma cleanup Brisbane - Discrete professional service',
      width: 800,
      height: 600,
    },
  },

  // Logo images
  logos: {
    'dr-logo.svg': {
      alt: 'Disaster Recovery Brisbane - Master Restorer logo',
      width: 200,
      height: 80,
      priority: true,
    },
    'dr-logo-white.svg': {
      alt: 'Disaster Recovery Brisbane logo - white version',
      width: 200,
      height: 80,
      priority: false,
    },
  },

  // Certification badges
  certifications: {
    'IICRC logo.png': {
      alt: 'IICRC Certified - International Institute of Inspection Cleaning and Restoration',
      width: 150,
      height: 150,
    },
    '3d-carsi-logo.png': {
      alt: 'CARSI Member - Catastrophe Adjusters & Restoration Specialists International',
      width: 150,
      height: 150,
    },
  },
} as const;

// Responsive image sizes attribute generator
export function generateSizesAttribute(
  type: 'hero' | 'card' | 'thumbnail' | 'full' | 'sidebar'
): string {
  switch (type) {
    case 'hero':
      return '100vw';
    case 'card':
      return '(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw';
    case 'thumbnail':
      return '(min-width: 1024px) 150px, (min-width: 768px) 120px, 100px';
    case 'full':
      return '(min-width: 1280px) 1200px, (min-width: 768px) 90vw, 100vw';
    case 'sidebar':
      return '(min-width: 1280px) 300px, (min-width: 1024px) 250px, 100vw';
    default:
      return '100vw';
  }
}

// Generate srcset for responsive images
export function generateSrcSet(
  basePath: string,
  widths: number[]
): string {
  return widths
    .map((width) => `${basePath}?w=${width} ${width}w`)
    .join(', ');
}

// Image loader function for Next.js
export function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  // If it's an external URL, return as-is
  if (src.startsWith('http')) {
    return src;
  }

  // For local images, construct optimized path
  const params = new URLSearchParams();
  params.set('w', width.toString());
  if (quality) {
    params.set('q', quality.toString());
  }

  return `${src}?${params.toString()}`;
}

// Determine if image should be prioritized
export function shouldPrioritize(
  imagePath: string,
  position: 'hero' | 'above-fold' | 'below-fold'
): boolean {
  if (position === 'hero') {return true;}
  if (position === 'above-fold') {return true;}
  return false;
}

export type ImageType = keyof typeof IMAGE_CONFIG.sizes;
export type ImageFormat = typeof IMAGE_CONFIG.formats[number];
export type ImageQualityType = keyof typeof IMAGE_CONFIG.quality;
