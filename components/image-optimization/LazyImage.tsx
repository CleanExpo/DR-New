'use client';

/**
 * Lazy Loading Image Component
 * Implements intersection observer for lazy loading
 * with progressive enhancement and fallbacks
 */

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { IMAGE_CONFIG } from '@/lib/image-optimization/config';

export interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  quality?: number;
  threshold?: number;
  rootMargin?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Lazy loading image with intersection observer
 */
export function LazyImage({
  src,
  alt,
  width,
  height,
  className = '',
  fill = false,
  objectFit = 'cover',
  quality = 75,
  threshold = 0.01,
  rootMargin = '50px',
  placeholder = '/images/placeholder.jpg',
  onLoad,
  onError,
}: LazyImageProps) {
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      setIsInView(true); // Fallback: load immediately
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const handleLoad = () => {
    onLoad?.();
  };

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {isInView ? (
        fill ? (
          <Image
            src={hasError ? placeholder : src}
            alt={alt}
            fill
            quality={quality}
            style={{ objectFit }}
            onError={handleError}
            onLoad={handleLoad}
            loading="lazy"
          />
        ) : (
          <Image
            src={hasError ? placeholder : src}
            alt={alt}
            width={width}
            height={height}
            quality={quality}
            style={{ objectFit }}
            onError={handleError}
            onLoad={handleLoad}
            loading="lazy"
          />
        )
      ) : (
        <div
          className="bg-gray-200 animate-pulse"
          style={{
            width: fill ? '100%' : width,
            height: fill ? '100%' : height,
          }}
        />
      )}
    </div>
  );
}

/**
 * Progressive Image Component
 * Loads low quality first, then high quality
 */
export interface ProgressiveImageProps extends LazyImageProps {
  lowQualitySrc?: string;
}

export function ProgressiveImage({
  src,
  lowQualitySrc,
  alt,
  width,
  height,
  className = '',
  quality = 75,
  ...props
}: ProgressiveImageProps) {
  const [currentSrc, setCurrentSrc] = useState(lowQualitySrc || src);
  const [isHighQualityLoaded, setIsHighQualityLoaded] = useState(false);

  useEffect(() => {
    if (!lowQualitySrc) {
      setIsHighQualityLoaded(true);
      return;
    }

    // Preload high quality image
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      setCurrentSrc(src);
      setIsHighQualityLoaded(true);
    };
  }, [src, lowQualitySrc]);

  return (
    <div className={`relative ${className}`}>
      <LazyImage
        {...props}
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        className={`
          transition-opacity duration-300
          ${isHighQualityLoaded ? 'opacity-100' : 'opacity-70'}
        `}
      />
    </div>
  );
}

/**
 * Gallery with lazy loading
 */
export interface LazyImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }>;
  columns?: number;
  gap?: number;
  className?: string;
}

export function LazyImageGallery({
  images,
  columns = 3,
  gap = 4,
  className = '',
}: LazyImageGalleryProps) {
  return (
    <div
      className={`grid gap-${gap} ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {images.map((image, index) => (
        <LazyImage
          key={index}
          src={image.src}
          alt={image.alt}
          width={image.width || 400}
          height={image.height || 300}
          className="rounded-lg overflow-hidden"
        />
      ))}
    </div>
  );
}

export default LazyImage;
