/**
 * Image Metadata and Optimization System
 * Handles image SEO, lazy loading, and performance optimization
 */

import { siteConfig } from './metadata';

// Image metadata structure
export interface ImageMetadata {
  src: string;
  alt: string;
  title?: string;
  width: number;
  height: number;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  sizes?: string;
  srcSet?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

// Image optimization presets
export const imagePresets = {
  hero: {
    sizes: '100vw',
    loading: 'eager' as const,
    priority: true,
    dimensions: { width: 1920, height: 1080 }
  },
  thumbnail: {
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    loading: 'lazy' as const,
    priority: false,
    dimensions: { width: 400, height: 300 }
  },
  gallery: {
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px',
    loading: 'lazy' as const,
    priority: false,
    dimensions: { width: 800, height: 600 }
  },
  beforeAfter: {
    sizes: '(max-width: 768px) 100vw, 50vw',
    loading: 'lazy' as const,
    priority: false,
    dimensions: { width: 600, height: 400 }
  },
  team: {
    sizes: '(max-width: 768px) 100vw, 300px',
    loading: 'lazy' as const,
    priority: false,
    dimensions: { width: 300, height: 300 }
  },
  logo: {
    sizes: '200px',
    loading: 'eager' as const,
    priority: true,
    dimensions: { width: 200, height: 80 }
  },
  og: {
    sizes: '1200px',
    loading: 'eager' as const,
    priority: false,
    dimensions: { width: 1200, height: 630 }
  }
};

// Generate optimized image metadata
export function generateImageMetadata(
  imagePath: string,
  altText: string,
  preset: keyof typeof imagePresets = 'gallery',
  customOptions?: Partial<ImageMetadata>
): ImageMetadata {
  const presetConfig = imagePresets[preset];

  // Generate SEO-friendly alt text if not provided
  const optimizedAlt = optimizeAltText(altText);

  // Generate title from alt text
  const title = generateImageTitle(optimizedAlt);

  // Create srcSet for responsive images
  const srcSet = generateSrcSet(imagePath, preset);

  return {
    src: imagePath,
    alt: optimizedAlt,
    title,
    width: presetConfig.dimensions.width,
    height: presetConfig.dimensions.height,
    loading: presetConfig.loading,
    priority: presetConfig.priority,
    sizes: presetConfig.sizes,
    srcSet,
    placeholder: 'blur',
    ...customOptions
  };
}

// Optimize alt text for SEO
function optimizeAltText(altText: string): string {
  // Remove file extensions and special characters
  let optimized = altText
    .replace(/\.(jpg|jpeg|png|gif|webp|svg)$/i, '')
    .replace(/[-_]/g, ' ')
    .trim();

  // Add context if too short
  if (optimized.length < 10) {
    optimized = `${optimized} - Disaster Recovery Brisbane`;
  }

  // Add location context for service images
  if (optimized.toLowerCase().includes('water damage') ||
      optimized.toLowerCase().includes('fire damage') ||
      optimized.toLowerCase().includes('mould') ||
      optimized.toLowerCase().includes('storm damage')) {
    if (!optimized.toLowerCase().includes('brisbane') &&
        !optimized.toLowerCase().includes('ipswich') &&
        !optimized.toLowerCase().includes('logan')) {
      optimized += ' Brisbane';
    }
  }

  // Capitalize first letter of each word
  optimized = optimized.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  return optimized;
}

// Generate SEO-friendly image title
function generateImageTitle(altText: string): string {
  // Create title from alt text with business context
  const baseTitle = altText.replace(' - Disaster Recovery Brisbane', '');
  return `${baseTitle} | Master Restorer Phill McGurk | ${siteConfig.phone}`;
}

// Generate responsive srcSet
function generateSrcSet(imagePath: string, preset: keyof typeof imagePresets): string {
  const widths = getSrcSetWidths(preset);
  const baseUrl = imagePath.substring(0, imagePath.lastIndexOf('.'));
  const extension = imagePath.substring(imagePath.lastIndexOf('.'));

  return widths
    .map(width => `${baseUrl}-${width}w${extension} ${width}w`)
    .join(', ');
}

// Get appropriate widths for srcSet based on preset
function getSrcSetWidths(preset: keyof typeof imagePresets): number[] {
  const presetWidths = {
    hero: [640, 768, 1024, 1280, 1920],
    thumbnail: [200, 300, 400],
    gallery: [400, 600, 800],
    beforeAfter: [400, 600],
    team: [150, 300],
    logo: [100, 200],
    og: [1200]
  };

  return presetWidths[preset] || [400, 800, 1200];
}

// Image SEO validator
export interface ImageSEOValidation {
  isValid: boolean;
  score: number;
  issues: string[];
  suggestions: string[];
}

export function validateImageSEO(image: ImageMetadata): ImageSEOValidation {
  const issues: string[] = [];
  const suggestions: string[] = [];
  let score = 100;

  // Alt text validation
  if (!image.alt) {
    issues.push('Missing alt text');
    score -= 25;
  } else {
    if (image.alt.length < 5) {
      issues.push('Alt text too short (min 5 characters)');
      score -= 15;
    }
    if (image.alt.length > 125) {
      issues.push('Alt text too long (max 125 characters)');
      score -= 10;
    }
    if (image.alt === 'image' || image.alt === 'photo') {
      issues.push('Alt text not descriptive');
      score -= 20;
    }
  }

  // Title validation
  if (!image.title) {
    suggestions.push('Consider adding title attribute for better accessibility');
    score -= 5;
  }

  // Dimensions validation
  if (!image.width || !image.height) {
    issues.push('Missing image dimensions');
    score -= 15;
  }

  // Loading strategy validation
  if (!image.loading) {
    suggestions.push('Specify loading strategy (lazy/eager)');
    score -= 5;
  }

  // Responsive images validation
  if (!image.srcSet && image.src.startsWith('/images/')) {
    suggestions.push('Consider using srcSet for responsive images');
    score -= 5;
  }

  if (!image.sizes && image.srcSet) {
    issues.push('srcSet specified without sizes attribute');
    score -= 10;
  }

  return {
    isValid: issues.length === 0,
    score: Math.max(0, score),
    issues,
    suggestions
  };
}

// Service-specific image metadata generator
export function generateServiceImageMetadata(
  service: 'water-damage' | 'fire-damage' | 'mould' | 'storm-damage' | 'commercial',
  imageType: 'before' | 'after' | 'process' | 'equipment' | 'team',
  location?: string
): ImageMetadata {
  const serviceNames = {
    'water-damage': 'Water Damage Restoration',
    'fire-damage': 'Fire Damage Restoration',
    'mould': 'Mould Remediation',
    'storm-damage': 'Storm Damage Repair',
    'commercial': 'Commercial Restoration'
  };

  const imageTypeDescriptions = {
    'before': 'before restoration',
    'after': 'after professional restoration',
    'process': 'restoration process',
    'equipment': 'professional equipment',
    'team': 'Master Restorer team'
  };

  const serviceName = serviceNames[service];
  const imageDesc = imageTypeDescriptions[imageType];
  const locationText = location || 'Brisbane';

  const altText = `${serviceName} ${imageDesc} ${locationText}`;
  const imagePath = `/images/services/${service}/${imageType}.webp`;

  return generateImageMetadata(
    imagePath,
    altText,
    imageType === 'before' || imageType === 'after' ? 'beforeAfter' : 'gallery'
  );
}

// Before/After image pair generator
export interface BeforeAfterImagePair {
  before: ImageMetadata;
  after: ImageMetadata;
  caption?: string;
  location?: string;
  service?: string;
}

export function generateBeforeAfterPair(
  service: string,
  location: string,
  beforePath: string,
  afterPath: string
): BeforeAfterImagePair {
  const beforeAlt = `${service} damage before restoration in ${location}`;
  const afterAlt = `${service} after professional restoration in ${location}`;

  return {
    before: generateImageMetadata(beforePath, beforeAlt, 'beforeAfter'),
    after: generateImageMetadata(afterPath, afterAlt, 'beforeAfter'),
    caption: `${service} restoration completed by Master Restorer Phill McGurk in ${location}`,
    location,
    service
  };
}

// Image optimization report
export interface ImageOptimizationReport {
  totalImages: number;
  optimizedImages: number;
  averageScore: number;
  criticalIssues: string[];
  commonProblems: Map<string, number>;
  recommendations: string[];
  imagesToOptimize: Array<{
    path: string;
    issues: string[];
    score: number;
  }>;
}

export function generateImageOptimizationReport(
  images: ImageMetadata[]
): ImageOptimizationReport {
  const scores: number[] = [];
  const allIssues: string[] = [];
  const imagesToOptimize: Array<{ path: string; issues: string[]; score: number }> = [];
  const commonProblems = new Map<string, number>();

  for (const image of images) {
    const validation = validateImageSEO(image);
    scores.push(validation.score);

    if (validation.score < 80) {
      imagesToOptimize.push({
        path: image.src,
        issues: validation.issues,
        score: validation.score
      });
    }

    // Track common problems
    validation.issues.forEach(issue => {
      commonProblems.set(issue, (commonProblems.get(issue) || 0) + 1);
    });

    allIssues.push(...validation.issues);
  }

  const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  const optimizedImages = scores.filter(s => s >= 80).length;

  // Sort common problems by frequency
  const sortedProblems = Array.from(commonProblems.entries())
    .sort((a, b) => b[1] - a[1]);

  const recommendations = [];
  if (sortedProblems[0] && sortedProblems[0][0].includes('alt text')) {
    recommendations.push('Review and improve alt text across all images for better SEO');
  }
  if (averageScore < 70) {
    recommendations.push('Consider implementing an automated image optimization pipeline');
  }
  if (imagesToOptimize.length > images.length * 0.3) {
    recommendations.push('More than 30% of images need optimization - prioritize hero and gallery images');
  }

  return {
    totalImages: images.length,
    optimizedImages,
    averageScore,
    criticalIssues: sortedProblems.slice(0, 5).map(p => `${p[0]} (${p[1]} images)`),
    commonProblems: new Map(sortedProblems),
    recommendations,
    imagesToOptimize: imagesToOptimize.slice(0, 10) // Top 10 worst performing
  };
}

// Export image metadata for Next.js Image component
export function getNextImageProps(metadata: ImageMetadata): Record<string, any> {
  return {
    src: metadata.src,
    alt: metadata.alt,
    title: metadata.title,
    width: metadata.width,
    height: metadata.height,
    loading: metadata.loading,
    priority: metadata.priority,
    sizes: metadata.sizes,
    placeholder: metadata.placeholder,
    blurDataURL: metadata.blurDataURL,
    quality: 85,
    ...(metadata.srcSet && { srcSet: metadata.srcSet })
  };
}