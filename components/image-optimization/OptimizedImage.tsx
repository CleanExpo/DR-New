'use client';

/**
 * Optimized Image Component
 * Advanced image component with all optimization features:
 * - Next.js Image optimization
 * - Responsive images with srcset
 * - Lazy loading with intersection observer
 * - Blur placeholders
 * - Error handling with fallbacks
 * - SEO-optimized alt tags
 * - Core Web Vitals optimization
 * - Automatic WebP/AVIF format selection
 */

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { IMAGE_CONFIG } from '@/lib/image-optimization/config';
import {
  generateBlurDataURL,
  getOptimalQuality,
  shouldLazyLoad,
  getLoadingStrategy,
  generateImageMetadata,
  type ImageMetadata,
} from '@/lib/image-optimization/utils';

export interface OptimizedImageProps {
  // Required props
  src: string;
  alt: string;

  // Dimensions
  width?: number;
  height?: number;
  aspectRatio?: string; // e.g., "16/9", "4/3"

  // Optimization
  quality?: number;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  sizes?: string;

  // Type-based optimization
  imageType?: 'hero' | 'card' | 'thumbnail' | 'icon' | 'gallery' | 'logo';

  // Layout
  fill?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;

  // Styling
  className?: string;
  containerClassName?: string;

  // Blur placeholder
  blurDataURL?: string;
  placeholder?: 'blur' | 'empty';

  // Error handling
  fallbackSrc?: string;
  onError?: () => void;
  onLoad?: () => void;

  // SEO
  caption?: string;
  credit?: string;

  // Accessibility
  role?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;

  // Performance
  position?: number; // Position in the page (for lazy loading decisions)
  unoptimized?: boolean;
}

/**
 * Main OptimizedImage Component
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  aspectRatio,
  quality,
  priority = false,
  loading,
  sizes,
  imageType = 'card',
  fill = false,
  objectFit = 'cover',
  objectPosition = 'center',
  className = '',
  containerClassName = '',
  blurDataURL,
  placeholder = 'blur',
  fallbackSrc = '/images/placeholder.jpg',
  onError,
  onLoad,
  caption,
  credit,
  role,
  position = 0,
  unoptimized = false,
  ...ariaProps
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Get dimensions from imageType if not provided
  const dimensions = React.useMemo(() => {
    if (fill) return null;

    if (width && height) {
      return { width, height };
    }

    const preset = IMAGE_CONFIG.sizes[imageType];
    if (preset) {
      return { width: preset.width, height: preset.height };
    }

    return { width: 800, height: 600 }; // Default fallback
  }, [fill, width, height, imageType]);

  // Calculate quality
  const imageQuality = quality || getOptimalQuality(imageType);

  // Determine loading strategy
  const loadingStrategy = loading || getLoadingStrategy(priority);

  // Generate blur placeholder if enabled
  const blurPlaceholder = React.useMemo(() => {
    if (placeholder === 'empty') return undefined;
    if (blurDataURL) return blurDataURL;
    if (IMAGE_CONFIG.blur.enabled && dimensions) {
      return generateBlurDataURL(dimensions.width, dimensions.height);
    }
    return undefined;
  }, [placeholder, blurDataURL, dimensions]);

  // Handle image error
  const handleError = () => {
    console.error(`Failed to load image: ${imgSrc}`);
    setHasError(true);
    setImgSrc(fallbackSrc);
    setIsLoading(false);
    onError?.();
  };

  // Handle image load
  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  // Reset error state when src changes
  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  // Generate sizes attribute if not provided
  const sizesAttr = React.useMemo(() => {
    if (sizes) return sizes;

    switch (imageType) {
      case 'hero':
        return '100vw';
      case 'card':
        return '(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw';
      case 'thumbnail':
        return '(min-width: 1024px) 150px, (min-width: 768px) 120px, 100px';
      case 'icon':
        return '64px';
      case 'logo':
        return '200px';
      case 'gallery':
        return '(min-width: 1024px) 800px, (min-width: 768px) 90vw, 100vw';
      default:
        return '100vw';
    }
  }, [sizes, imageType]);

  // Generate image metadata for SEO
  const metadata: ImageMetadata | null = React.useMemo(() => {
    if (!dimensions) return null;
    return generateImageMetadata(
      imgSrc,
      alt,
      dimensions.width,
      dimensions.height,
      caption
    );
  }, [imgSrc, alt, dimensions, caption]);

  // Container styles
  const containerStyles = React.useMemo(() => {
    if (fill) return 'relative w-full h-full';
    if (aspectRatio) {
      return `relative w-full overflow-hidden ${containerClassName}`;
    }
    return containerClassName;
  }, [fill, aspectRatio, containerClassName]);

  // Aspect ratio styles
  const aspectRatioStyle = React.useMemo(() => {
    if (aspectRatio) {
      return { aspectRatio };
    }
    return undefined;
  }, [aspectRatio]);

  return (
    <figure className={containerStyles}>
      <div
        className="relative"
        style={aspectRatioStyle}
        role="img"
        aria-label={ariaProps['aria-label'] || alt}
      >
        {fill ? (
          <Image
            src={imgSrc}
            alt={alt}
            fill
            quality={imageQuality}
            priority={priority}
            loading={loadingStrategy}
            sizes={sizesAttr}
            className={className}
            style={{
              objectFit,
              objectPosition,
            }}
            placeholder={placeholder}
            blurDataURL={blurPlaceholder}
            onError={handleError}
            onLoad={handleLoad}
            unoptimized={unoptimized}
            {...ariaProps}
          />
        ) : dimensions ? (
          <Image
            src={imgSrc}
            alt={alt}
            width={dimensions.width}
            height={dimensions.height}
            quality={imageQuality}
            priority={priority}
            loading={loadingStrategy}
            sizes={sizesAttr}
            className={className}
            style={{
              objectFit,
              objectPosition,
            }}
            placeholder={placeholder}
            blurDataURL={blurPlaceholder}
            onError={handleError}
            onLoad={handleLoad}
            unoptimized={unoptimized}
            {...ariaProps}
          />
        ) : null}

        {/* Loading skeleton */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}

        {/* Error indicator */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <span className="text-sm text-gray-500">Image unavailable</span>
          </div>
        )}
      </div>

      {/* Caption */}
      {caption && (
        <figcaption className="mt-2 text-sm text-gray-600 text-center">
          {caption}
          {credit && (
            <span className="block text-xs text-gray-500 mt-1">
              Photo: {credit}
            </span>
          )}
        </figcaption>
      )}

      {/* Structured data for SEO */}
      {metadata && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ImageObject',
              contentUrl: metadata.url,
              url: metadata.url,
              width: metadata.width,
              height: metadata.height,
              caption: metadata.caption || alt,
              description: alt,
            }),
          }}
        />
      )}
    </figure>
  );
}

/**
 * Hero Image Component
 * Optimized for above-the-fold hero images
 */
export function HeroImage(
  props: Omit<OptimizedImageProps, 'imageType' | 'priority'>
) {
  return (
    <OptimizedImage
      {...props}
      imageType="hero"
      priority={true}
      loading="eager"
      placeholder="blur"
    />
  );
}

/**
 * Card Image Component
 * Optimized for card thumbnails
 */
export function CardImage(
  props: Omit<OptimizedImageProps, 'imageType'>
) {
  return <OptimizedImage {...props} imageType="card" />;
}

/**
 * Gallery Image Component
 * Optimized for gallery/lightbox images
 */
export function GalleryImage(
  props: Omit<OptimizedImageProps, 'imageType'>
) {
  return <OptimizedImage {...props} imageType="gallery" />;
}

/**
 * Icon Image Component
 * Optimized for icons and small images
 */
export function IconImage(
  props: Omit<OptimizedImageProps, 'imageType'>
) {
  return <OptimizedImage {...props} imageType="icon" priority={true} />;
}

/**
 * Logo Image Component
 * Optimized for logos with high quality
 */
export function LogoImage(
  props: Omit<OptimizedImageProps, 'imageType' | 'priority'>
) {
  return (
    <OptimizedImage
      {...props}
      imageType="logo"
      priority={true}
      quality={90}
    />
  );
}

/**
 * Background Image Component
 * Optimized for background images
 */
export function BackgroundImage(
  props: Omit<OptimizedImageProps, 'fill' | 'objectFit'>
) {
  return (
    <OptimizedImage
      {...props}
      fill={true}
      objectFit="cover"
      className={`${props.className || ''} -z-10`}
    />
  );
}

// Export all components
export default OptimizedImage;
