/**
 * Image Optimization Utilities
 * Helper functions for image processing and optimization
 */

import { IMAGE_CONFIG } from './config';

interface ImageDimensions {
  width: number;
  height: number;
  aspectRatio: number;
}

/**
 * Calculate responsive image dimensions
 */
export function calculateDimensions(
  originalWidth: number,
  originalHeight: number,
  targetWidth?: number,
  targetHeight?: number
): ImageDimensions {
  const aspectRatio = originalWidth / originalHeight;

  if (targetWidth && !targetHeight) {
    return {
      width: targetWidth,
      height: Math.round(targetWidth / aspectRatio),
      aspectRatio,
    };
  }

  if (!targetWidth && targetHeight) {
    return {
      width: Math.round(targetHeight * aspectRatio),
      height: targetHeight,
      aspectRatio,
    };
  }

  if (targetWidth && targetHeight) {
    return {
      width: targetWidth,
      height: targetHeight,
      aspectRatio: targetWidth / targetHeight,
    };
  }

  return {
    width: originalWidth,
    height: originalHeight,
    aspectRatio,
  };
}

/**
 * Generate blur data URL for placeholder
 */
export function generateBlurDataURL(
  width: number = IMAGE_CONFIG.blur.size,
  height: number = IMAGE_CONFIG.blur.size
): string {
  // Create a simple SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="#e5e7eb"/>
    </svg>
  `;

  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Get image path with proper formatting
 */
export function getImagePath(
  category: keyof typeof IMAGE_CONFIG.paths,
  filename: string
): string {
  const basePath = IMAGE_CONFIG.paths[category];
  return `${basePath}/${filename}`;
}

/**
 * Extract filename from path
 */
export function extractFilename(path: string): string {
  return path.split('/').pop() || '';
}

/**
 * Get file extension
 */
export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

/**
 * Check if image format is supported
 */
export function isSupportedFormat(filename: string): boolean {
  const ext = getFileExtension(filename);
  const supportedFormats = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'svg', 'gif'];
  return supportedFormats.includes(ext);
}

/**
 * Convert image path to WebP
 */
export function toWebP(imagePath: string): string {
  return imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
}

/**
 * Generate responsive image widths
 */
export function getResponsiveWidths(maxWidth: number): number[] {
  const { breakpoints } = IMAGE_CONFIG;
  const widths = Object.values(breakpoints)
    .filter((width) => width <= maxWidth)
    .sort((a, b) => a - b);

  // Add the max width if not already included
  if (!widths.includes(maxWidth)) {
    widths.push(maxWidth);
  }

  return widths;
}

/**
 * Generate srcset string
 */
export function generateSrcSet(
  src: string,
  widths: number[],
  format?: string
): string {
  return widths
    .map((width) => {
      const url = new URL(src, 'https://dr-new-ten.vercel.app');
      url.searchParams.set('w', width.toString());
      if (format) {
        url.searchParams.set('fm', format);
      }
      return `${url.pathname}${url.search} ${width}w`;
    })
    .join(', ');
}

/**
 * Get optimal image quality based on type
 */
export function getOptimalQuality(
  imageType: keyof typeof IMAGE_CONFIG.quality
): number {
  return IMAGE_CONFIG.quality[imageType] || IMAGE_CONFIG.quality.default;
}

/**
 * Calculate optimal image size for viewport
 */
export function getOptimalSize(
  viewportWidth: number,
  imageType: 'hero' | 'card' | 'thumbnail' | 'full'
): { width: number; height: number } {
  const { sizes } = IMAGE_CONFIG;

  switch (imageType) {
    case 'hero':
      return {
        width: Math.min(viewportWidth, sizes.hero.width),
        height: sizes.hero.height,
      };
    case 'card':
      return {
        width: Math.min(viewportWidth * 0.5, sizes.card.width),
        height: sizes.card.height,
      };
    case 'thumbnail':
      return sizes.thumbnail;
    case 'full':
      return {
        width: Math.min(viewportWidth * 0.9, 1200),
        height: 0, // Auto-calculate
      };
    default:
      return { width: viewportWidth, height: 0 };
  }
}

/**
 * Generate sizes attribute for responsive images
 */
export function generateSizesAttribute(
  config: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
    default: string;
  }
): string {
  const sizes: string[] = [];

  if (config.desktop) {
    sizes.push(`(min-width: 1024px) ${config.desktop}`);
  }
  if (config.tablet) {
    sizes.push(`(min-width: 768px) ${config.tablet}`);
  }
  if (config.mobile) {
    sizes.push(`(min-width: 640px) ${config.mobile}`);
  }

  sizes.push(config.default);

  return sizes.join(', ');
}

/**
 * Check if image should be lazy loaded
 */
export function shouldLazyLoad(priority: boolean, position: number): boolean {
  // Don't lazy load priority images or first 3 images
  return !priority && position > 2;
}

/**
 * Get loading strategy
 */
export function getLoadingStrategy(
  priority: boolean
): 'eager' | 'lazy' {
  return priority ? 'eager' : 'lazy';
}

/**
 * Generate image metadata for SEO
 */
export interface ImageMetadata {
  url: string;
  alt: string;
  width: number;
  height: number;
  type: string;
  caption?: string;
  credit?: string;
}

export function generateImageMetadata(
  src: string,
  alt: string,
  width: number,
  height: number,
  caption?: string
): ImageMetadata {
  const ext = getFileExtension(src);
  const mimeType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' :
                   ext === 'png' ? 'image/png' :
                   ext === 'webp' ? 'image/webp' :
                   ext === 'avif' ? 'image/avif' :
                   'image/jpeg';

  return {
    url: src,
    alt,
    width,
    height,
    type: mimeType,
    caption,
  };
}

/**
 * Validate image dimensions
 */
export function validateDimensions(
  width: number,
  height: number
): { valid: boolean; error?: string } {
  if (width <= 0 || height <= 0) {
    return { valid: false, error: 'Width and height must be positive' };
  }

  if (width > 4096 || height > 4096) {
    return { valid: false, error: 'Dimensions exceed maximum allowed (4096px)' };
  }

  return { valid: true };
}

/**
 * Convert file size to human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Generate image cache key
 */
export function generateCacheKey(
  src: string,
  width: number,
  quality: number,
  format: string
): string {
  return `img_${Buffer.from(`${src}_${width}_${quality}_${format}`).toString('base64')}`;
}

/**
 * Parse image filename for SEO optimization
 */
export function optimizeFilename(filename: string): string {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Generate structured data for image
 */
export function generateImageStructuredData(metadata: ImageMetadata) {
  return {
    '@type': 'ImageObject',
    url: metadata.url,
    width: metadata.width,
    height: metadata.height,
    caption: metadata.caption,
    contentUrl: metadata.url,
    description: metadata.alt,
  };
}

/**
 * Check if browser supports WebP
 */
export function supportsWebP(): boolean {
  if (typeof window === 'undefined') return true; // SSR default

  const canvas = document.createElement('canvas');
  if (canvas.getContext && canvas.getContext('2d')) {
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  return false;
}

/**
 * Check if browser supports AVIF
 */
export function supportsAVIF(): boolean {
  if (typeof window === 'undefined') return true; // SSR default

  const canvas = document.createElement('canvas');
  if (canvas.getContext && canvas.getContext('2d')) {
    return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
  }
  return false;
}

/**
 * Get best supported format
 */
export function getBestFormat(): 'avif' | 'webp' | 'jpeg' {
  if (supportsAVIF()) return 'avif';
  if (supportsWebP()) return 'webp';
  return 'jpeg';
}

/**
 * Preload critical images
 */
export function preloadImage(src: string, as: 'image' = 'image'): void {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = as;
  link.href = src;
  document.head.appendChild(link);
}

/**
 * Prefetch image for next navigation
 */
export function prefetchImage(src: string): void {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = src;
  document.head.appendChild(link);
}
