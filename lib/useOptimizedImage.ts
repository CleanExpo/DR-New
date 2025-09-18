/**
 * Optimized Image Hook and Utilities
 *
 * Provides utilities for loading optimized images with:
 * - WebP format with JPEG fallbacks
 * - Responsive srcSet for different screen sizes
 * - Blur placeholders for smooth loading
 * - Automatic format detection
 */

import { useState, useEffect, useMemo } from 'react';
import imageManifest from '@/public/images/image-manifest.json';

export interface OptimizedImage {
  src: string;
  srcSet: {
    webp: string;
    jpeg: string;
  };
  placeholder?: string;
  width: number;
  height: number;
  sizes: string;
}

/**
 * Get optimized image data from manifest
 */
function getOptimizedImageData(imagePath: string): any {
  // Normalize path
  const normalizedPath = imagePath
    .replace(/^\/+/, '')
    .replace(/^images\/+/, '')
    .replace(/^public\/+images\/+/, '');

  // Look for exact match or similar match
  const exactMatch = imageManifest[normalizedPath];
  if (exactMatch) return exactMatch;

  // Try to find a partial match
  const partialMatch = Object.keys(imageManifest).find(key =>
    key.includes(normalizedPath) || normalizedPath.includes(key)
  );

  return partialMatch ? imageManifest[partialMatch] : null;
}

/**
 * Generate srcSet string from optimized images
 */
function generateSrcSet(optimizedImages: any[], format: string): string {
  return optimizedImages
    .filter(img => img.format === format)
    .map(img => `/images/${img.path} ${img.width}w`)
    .join(', ');
}

/**
 * Hook to get optimized image data with loading states
 */
export function useOptimizedImage(
  imagePath: string,
  options: {
    sizes?: string;
    priority?: boolean;
    quality?: number;
  } = {}
): {
  optimized: OptimizedImage | null;
  isLoading: boolean;
  error: Error | null;
} {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const optimized = useMemo(() => {
    try {
      const imageData = getOptimizedImageData(imagePath);

      if (!imageData) {
        // Fallback to original image
        return {
          src: imagePath.startsWith('/') ? imagePath : `/images/${imagePath}`,
          srcSet: {
            webp: '',
            jpeg: ''
          },
          placeholder: undefined,
          width: 1920,
          height: 1080,
          sizes: options.sizes || '100vw'
        };
      }

      // Get the largest optimized image for dimensions
      const largestImage = imageData.optimized
        .filter((img: any) => img.format === 'webp')
        .sort((a: any, b: any) => b.width - a.width)[0];

      return {
        src: `/images/${imageData.optimized[0]?.path || imageData.original.path}`,
        srcSet: {
          webp: generateSrcSet(imageData.optimized, 'webp'),
          jpeg: generateSrcSet(imageData.optimized, 'jpeg')
        },
        placeholder: imageData.placeholder,
        width: largestImage?.width || 1920,
        height: largestImage?.height || 1080,
        sizes: options.sizes || '100vw'
      };
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [imagePath, options.sizes]);

  return { optimized, isLoading, error };
}

/**
 * Get static optimized image data for server-side rendering
 */
export function getOptimizedImage(
  imagePath: string,
  options: {
    sizes?: string;
  } = {}
): OptimizedImage {
  const imageData = getOptimizedImageData(imagePath);

  if (!imageData) {
    // Fallback to original image
    return {
      src: imagePath.startsWith('/') ? imagePath : `/images/${imagePath}`,
      srcSet: {
        webp: '',
        jpeg: ''
      },
      placeholder: undefined,
      width: 1920,
      height: 1080,
      sizes: options.sizes || '100vw'
    };
  }

  const largestImage = imageData.optimized
    .filter((img: any) => img.format === 'webp')
    .sort((a: any, b: any) => b.width - a.width)[0];

  return {
    src: `/images/${imageData.optimized[0]?.path || imageData.original.path}`,
    srcSet: {
      webp: generateSrcSet(imageData.optimized, 'webp'),
      jpeg: generateSrcSet(imageData.optimized, 'jpeg')
    },
    placeholder: imageData.placeholder,
    width: largestImage?.width || 1920,
    height: largestImage?.height || 1080,
    sizes: options.sizes || '100vw'
  };
}

/**
 * Generate responsive sizes string based on breakpoints
 */
export function generateSizes(config: {
  mobile?: string;
  tablet?: string;
  desktop?: string;
  default?: string;
}): string {
  const sizes = [];

  if (config.mobile) {
    sizes.push(`(max-width: 640px) ${config.mobile}`);
  }
  if (config.tablet) {
    sizes.push(`(max-width: 1024px) ${config.tablet}`);
  }
  if (config.desktop) {
    sizes.push(`(max-width: 1920px) ${config.desktop}`);
  }

  sizes.push(config.default || '100vw');

  return sizes.join(', ');
}

/**
 * Check if browser supports WebP
 */
export function supportsWebP(): boolean {
  if (typeof window === 'undefined') return false;

  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;

  return canvas.toDataURL('image/webp').indexOf('image/webp') === 5;
}

/**
 * Preload critical images for better LCP
 */
export function preloadCriticalImages(imagePaths: string[]): void {
  if (typeof window === 'undefined') return;

  imagePaths.forEach(imagePath => {
    const imageData = getOptimizedImageData(imagePath);
    if (!imageData) return;

    // Preload the largest WebP version
    const largestWebP = imageData.optimized
      .filter((img: any) => img.format === 'webp')
      .sort((a: any, b: any) => b.width - a.width)[0];

    if (largestWebP) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.type = 'image/webp';
      link.href = `/images/${largestWebP.path}`;
      document.head.appendChild(link);
    }
  });
}