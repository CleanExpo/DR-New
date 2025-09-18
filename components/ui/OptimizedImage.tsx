'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
  loading?: 'lazy' | 'eager';
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
}

/**
 * Optimized Image component for disaster recovery images
 * Features:
 * - Automatic WebP/AVIF conversion for modern browsers
 * - Responsive sizing for desktop, tablet, and mobile
 * - SEO-optimized with title and alt metadata
 * - Lazy loading with blur placeholder
 * - Error handling with graceful fallback
 * - Proper alt text for accessibility and SEO
 * - Mobile-first responsive sizing with srcSet
 * - Optimized quality settings per device
 */
export default function OptimizedImage({
  src,
  alt,
  title,
  width,
  height,
  fill = false,
  className = '',
  sizes = '(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, (max-width: 1280px) 70vw, 50vw',
  priority = false,
  placeholder = 'blur',
  blurDataURL,
  quality = 85,
  onLoad,
  onError,
  loading,
  objectFit = 'cover',
  objectPosition = 'center'
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Generate a simple blur placeholder if none provided
  const defaultBlurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAhEQACAQIHAQAAAAAAAAAAAAABAgADBAUREiExQVFhkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  // Error fallback component
  if (hasError) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
        role="img"
        aria-label={`Failed to load: ${alt}`}
      >
        <div className="text-gray-500 text-center p-4">
          <div className="text-sm font-medium">Image unavailable</div>
          <div className="text-xs text-gray-400 mt-1">Disaster recovery service image</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading overlay */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="absolute inset-0 bg-gray-200 animate-pulse z-10"
        />
      )}

      <Image
        src={src}
        alt={alt}
        title={title || alt}
        width={width}
        height={height}
        fill={fill}
        sizes={sizes}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL || defaultBlurDataURL}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={handleLoad}
        onError={handleError}
        loading={loading || (priority ? 'eager' : 'lazy')}
        // Performance optimizations
        style={{
          objectFit,
          objectPosition
        }}
      />

      {/* Accessibility enhancement - hidden descriptive text for screen readers */}
      <span className="sr-only">
        {alt.includes('disaster recovery') ? alt : `${alt} - Professional disaster recovery service`}
      </span>
    </div>
  );
}