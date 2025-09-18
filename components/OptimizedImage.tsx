'use client';

/**
 * Optimized Image Component
 *
 * A drop-in replacement for Next.js Image component that automatically:
 * - Uses WebP format with JPEG fallbacks
 * - Implements responsive images with srcSet
 * - Shows blur placeholders during loading
 * - Optimizes for Core Web Vitals (LCP, CLS)
 */

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useOptimizedImage, generateSizes } from '@/lib/useOptimizedImage';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  className?: string;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  style?: React.CSSProperties;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  // Responsive sizes configuration
  responsiveSizes?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
    default?: string;
  };
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  loading,
  className,
  fill = false,
  sizes,
  quality = 85,
  placeholder = 'blur',
  blurDataURL,
  onLoad,
  onError,
  style,
  objectFit = 'cover',
  objectPosition = 'center',
  responsiveSizes
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { optimized, error } = useOptimizedImage(src, {
    sizes: sizes || (responsiveSizes ? generateSizes(responsiveSizes) : undefined),
    priority,
    quality
  });

  // Determine placeholder strategy
  const usePlaceholder = placeholder === 'blur' && (blurDataURL || optimized?.placeholder);
  const placeholderUrl = blurDataURL || optimized?.placeholder;

  // Handle load completion
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Handle error
  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Fallback for non-optimized images
  if (error || hasError) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width || (fill ? undefined : 1920)}
        height={height || (fill ? undefined : 1080)}
        priority={priority}
        loading={loading || (priority ? 'eager' : 'lazy')}
        className={className}
        fill={fill}
        sizes={sizes || (fill ? '100vw' : undefined)}
        quality={quality}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          ...style,
          objectFit,
          objectPosition
        }}
      />
    );
  }

  // Use optimized images if available
  if (optimized && optimized.srcSet.webp) {
    // For browsers that support WebP with srcSet
    return (
      <picture className={cn('optimized-image-container', isLoaded && 'loaded')}>
        {/* WebP sources */}
        <source
          type="image/webp"
          srcSet={optimized.srcSet.webp}
          sizes={sizes || optimized.sizes}
        />

        {/* JPEG fallback sources */}
        {optimized.srcSet.jpeg && (
          <source
            type="image/jpeg"
            srcSet={optimized.srcSet.jpeg}
            sizes={sizes || optimized.sizes}
          />
        )}

        {/* Main image with Next.js Image component */}
        <Image
          src={optimized.src}
          alt={alt}
          width={width || optimized.width}
          height={height || optimized.height}
          priority={priority}
          loading={loading || (priority ? 'eager' : 'lazy')}
          className={cn(
            'transition-opacity duration-300',
            !isLoaded && 'opacity-0',
            isLoaded && 'opacity-100',
            className
          )}
          fill={fill}
          sizes={sizes || optimized.sizes}
          quality={quality}
          placeholder={usePlaceholder ? 'blur' : 'empty'}
          blurDataURL={placeholderUrl}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            ...style,
            objectFit,
            objectPosition
          }}
        />
      </picture>
    );
  }

  // Default Next.js Image component
  return (
    <Image
      src={src}
      alt={alt}
      width={width || (fill ? undefined : 1920)}
      height={height || (fill ? undefined : 1080)}
      priority={priority}
      loading={loading || (priority ? 'eager' : 'lazy')}
      className={cn(
        'transition-opacity duration-300',
        !isLoaded && 'opacity-0',
        isLoaded && 'opacity-100',
        className
      )}
      fill={fill}
      sizes={sizes || (fill ? '100vw' : undefined)}
      quality={quality}
      placeholder={usePlaceholder ? 'blur' : 'empty'}
      blurDataURL={placeholderUrl}
      onLoad={handleLoad}
      onError={handleError}
      style={{
        ...style,
        objectFit,
        objectPosition
      }}
    />
  );
}

/**
 * Hero Image Component
 * Optimized specifically for hero sections with priority loading
 */
export function HeroImage({
  src,
  alt,
  className,
  overlay = true,
  overlayOpacity = 0.3
}: {
  src: string;
  alt: string;
  className?: string;
  overlay?: boolean;
  overlayOpacity?: number;
}) {
  return (
    <div className={cn('relative w-full h-full', className)}>
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        priority
        objectFit="cover"
        sizes="100vw"
        quality={90}
        className="hero-image"
      />
      {overlay && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50 pointer-events-none"
          style={{ opacity: overlayOpacity }}
        />
      )}
    </div>
  );
}

/**
 * Thumbnail Image Component
 * Optimized for small images in grids or lists
 */
export function ThumbnailImage({
  src,
  alt,
  width = 320,
  height = 240,
  className
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn('rounded-lg', className)}
      responsiveSizes={{
        mobile: '100vw',
        tablet: '50vw',
        desktop: '33vw',
        default: '25vw'
      }}
      quality={75}
    />
  );
}

/**
 * Background Image Component
 * For full-screen or section backgrounds
 */
export function BackgroundImage({
  src,
  alt,
  children,
  className,
  overlayClassName
}: {
  src: string;
  alt: string;
  children?: React.ReactNode;
  className?: string;
  overlayClassName?: string;
}) {
  return (
    <div className={cn('relative', className)}>
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        priority
        objectFit="cover"
        sizes="100vw"
        className="z-0"
      />
      {children && (
        <div className={cn('relative z-10', overlayClassName)}>
          {children}
        </div>
      )}
    </div>
  );
}