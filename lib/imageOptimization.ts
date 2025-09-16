// Image Optimization Configuration for DR-New Disaster Recovery Website
// Achieves 90+ Lighthouse scores with premium visual quality

import { StaticImageData } from 'next/image';

// Image format configurations for different use cases
export const IMAGE_FORMATS = {
  hero: {
    formats: ['avif', 'webp', 'jpg'],
    quality: {
      avif: 80,
      webp: 85,
      jpg: 90
    }
  },
  gallery: {
    formats: ['webp', 'jpg'],
    quality: {
      webp: 80,
      jpg: 85
    }
  },
  thumbnail: {
    formats: ['webp', 'jpg'],
    quality: {
      webp: 75,
      jpg: 80
    }
  },
  icon: {
    formats: ['svg', 'png'],
    quality: {
      png: 90
    }
  }
} as const;

// Responsive breakpoints for srcset generation
export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
  ultrawide: 1536
} as const;

// Device pixel ratios for retina support
export const PIXEL_RATIOS = [1, 2, 3] as const;

// Generate srcset for responsive images
export function generateSrcSet(imagePath: string, widths: number[]): string {
  return widths
    .map(width => `${imagePath}?w=${width} ${width}w`)
    .join(', ');
}

// Generate sizes attribute for responsive images
export function generateSizes(breakpoints: Record<string, number>): string {
  const sizes = Object.entries(breakpoints)
    .map(([key, value]) => {
      if (key === 'default') return `${value}px`;
      return `(max-width: ${value}px) ${value}px`;
    })
    .reverse()
    .join(', ');

  return sizes || '100vw';
}

// Calculate optimal image widths for srcset
export function calculateImageWidths(
  maxWidth: number,
  minWidth: number = 320,
  step: number = 200
): number[] {
  const widths: number[] = [];

  // Add standard breakpoints
  for (let width = minWidth; width <= maxWidth; width += step) {
    widths.push(width);
  }

  // Add retina versions for key breakpoints
  Object.values(BREAKPOINTS).forEach(breakpoint => {
    if (breakpoint <= maxWidth) {
      widths.push(breakpoint);
      if (breakpoint * 2 <= maxWidth) {
        widths.push(breakpoint * 2); // 2x retina
      }
    }
  });

  // Remove duplicates and sort
  return [...new Set(widths)].sort((a, b) => a - b);
}

// Generate blur placeholder data URL
export async function generateBlurPlaceholder(
  imagePath: string,
  width: number = 10,
  height: number = 10
): Promise<string> {
  // For production, this would use plaiceholder or similar library
  // Returning a simple blur placeholder for now
  return `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <filter id="blur">
        <feGaussianBlur stdDeviation="5"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#blur)" fill="#e5e7eb"/>
    </svg>`
  ).toString('base64')}`;
}

// Image optimization presets for different components
export const IMAGE_PRESETS = {
  hero: {
    priority: true,
    loading: 'eager' as const,
    quality: 90,
    sizes: '100vw',
    placeholder: 'blur' as const
  },
  aboveFold: {
    priority: true,
    loading: 'eager' as const,
    quality: 85,
    placeholder: 'blur' as const
  },
  gallery: {
    priority: false,
    loading: 'lazy' as const,
    quality: 80,
    placeholder: 'blur' as const
  },
  thumbnail: {
    priority: false,
    loading: 'lazy' as const,
    quality: 75,
    placeholder: 'blur' as const
  }
} as const;

// CDN configuration for image delivery
export const CDN_CONFIG = {
  provider: 'vercel',
  baseUrl: process.env.NEXT_PUBLIC_CDN_URL || '',
  cacheControl: {
    hero: 'public, max-age=31536000, immutable',
    gallery: 'public, max-age=604800, stale-while-revalidate=86400',
    thumbnail: 'public, max-age=2592000, stale-while-revalidate=86400'
  },
  transforms: {
    auto: 'format,compress',
    quality: 'auto:good',
    fit: 'cover'
  }
} as const;

// Performance metrics thresholds
export const PERFORMANCE_THRESHOLDS = {
  lcp: 2500, // Largest Contentful Paint (ms)
  fid: 100,  // First Input Delay (ms)
  cls: 0.1,  // Cumulative Layout Shift
  fcp: 1800, // First Contentful Paint (ms)
  ttfb: 600, // Time to First Byte (ms)
  totalBlockingTime: 300 // Total Blocking Time (ms)
} as const;

// Image loading priority calculator
export function calculateLoadingPriority(
  imagePosition: 'hero' | 'above-fold' | 'below-fold',
  isCritical: boolean = false
): {
  priority: boolean;
  loading: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
} {
  if (imagePosition === 'hero' || isCritical) {
    return {
      priority: true,
      loading: 'eager',
      fetchPriority: 'high'
    };
  }

  if (imagePosition === 'above-fold') {
    return {
      priority: true,
      loading: 'eager',
      fetchPriority: 'auto'
    };
  }

  return {
    priority: false,
    loading: 'lazy',
    fetchPriority: 'low'
  };
}

// Generate modern picture element with format fallbacks
export function generatePictureElement(
  src: string,
  alt: string,
  sizes: string,
  formats: string[] = ['avif', 'webp', 'jpg']
): string {
  const sources = formats.slice(0, -1).map(format =>
    `<source
      type="image/${format}"
      srcset="${src.replace(/\.[^.]+$/, `.${format}`)}"
      sizes="${sizes}"
    />`
  ).join('\n');

  const fallbackFormat = formats[formats.length - 1];

  return `
    <picture>
      ${sources}
      <img
        src="${src.replace(/\.[^.]+$/, `.${fallbackFormat}`)}"
        alt="${alt}"
        loading="lazy"
        decoding="async"
      />
    </picture>
  `;
}

// Cache control headers for different asset types
export const CACHE_HEADERS = {
  images: {
    static: 'public, max-age=31536000, immutable',
    dynamic: 'public, max-age=3600, stale-while-revalidate=86400',
    userGenerated: 'public, max-age=300, must-revalidate'
  },
  fonts: 'public, max-age=31536000, immutable',
  css: 'public, max-age=31536000, immutable',
  js: 'public, max-age=31536000, immutable'
} as const;

// Export optimization utilities
export default {
  IMAGE_FORMATS,
  BREAKPOINTS,
  PIXEL_RATIOS,
  IMAGE_PRESETS,
  CDN_CONFIG,
  PERFORMANCE_THRESHOLDS,
  CACHE_HEADERS,
  generateSrcSet,
  generateSizes,
  calculateImageWidths,
  generateBlurPlaceholder,
  calculateLoadingPriority,
  generatePictureElement
};