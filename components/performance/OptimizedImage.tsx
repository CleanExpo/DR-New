'use client';

import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  fallbackSrc?: string;
  lowQualitySrc?: string;
  aspectRatio?: string;
  preload?: boolean;
}

/**
 * Optimized Image Component
 * - Lazy loading with IntersectionObserver
 * - LQIP (Low Quality Image Placeholder)
 * - Automatic WebP/AVIF support
 * - Error fallback handling
 * - Progressive loading
 */
export function OptimizedImage({
  src,
  alt,
  fallbackSrc = '/images/placeholder.jpg',
  lowQualitySrc,
  aspectRatio,
  preload = false,
  priority = false,
  className = '',
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(lowQualitySrc || src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Preload image if requested
    if (preload && typeof window !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [src, preload]);

  useEffect(() => {
    // Progressive image loading
    if (lowQualitySrc && imgSrc === lowQualitySrc) {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        setImgSrc(src);
        setIsLoading(false);
      };
      img.onerror = () => {
        setHasError(true);
        setImgSrc(fallbackSrc);
        setIsLoading(false);
      };
    } else {
      setIsLoading(false);
    }
  }, [src, lowQualitySrc, imgSrc, fallbackSrc]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <div
      className={`relative overflow-hidden ${aspectRatio ? 'aspect-ratio-box' : ''}`}
      style={{
        aspectRatio: aspectRatio || 'auto',
      }}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      <Image
        src={imgSrc}
        alt={alt}
        className={`${className} ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } transition-opacity duration-300`}
        onLoad={handleLoad}
        onError={handleError}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        quality={85}
        {...props}
      />

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-gray-400 text-sm">Image unavailable</span>
        </div>
      )}
    </div>
  );
}

export default OptimizedImage;