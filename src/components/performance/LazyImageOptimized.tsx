'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface LazyImageOptimizedProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  aspectRatio?: number;
}

/**
 * Optimized lazy loading image component with:
 * - Intersection Observer for viewport detection
 * - Progressive enhancement
 * - Native lazy loading fallback
 * - Blur placeholder support
 * - Automatic WebP/AVIF format selection
 * - Responsive image loading
 */
export const LazyImageOptimized: React.FC<LazyImageOptimizedProps> = ({
  src,
  alt,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
  quality = 85,
  placeholder = 'blur',
  blurDataURL,
  onLoad,
  aspectRatio = 16 / 9
}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const imgRef = useRef<HTMLDivElement>(null);

  // Generate optimized image paths
  const generateSrcSet = () => {
    const basePath = src.replace(/\.[^/.]+$/, '');
    const extension = src.match(/\.[^/.]+$/)?.[0] || '';

    return {
      avif: [
        `/optimized/thumbnail${basePath}-400w.avif 400w`,
        `/optimized/mobile${basePath}-768w.avif 768w`,
        `/optimized/tablet${basePath}-1024w.avif 1024w`,
        `/optimized/desktop${basePath}-1920w.avif 1920w`,
        `/optimized/retina${basePath}-2560w.avif 2560w`
      ].join(', '),
      webp: [
        `/optimized/thumbnail${basePath}-400w.webp 400w`,
        `/optimized/mobile${basePath}-768w.webp 768w`,
        `/optimized/tablet${basePath}-1024w.webp 1024w`,
        `/optimized/desktop${basePath}-1920w.webp 1920w`,
        `/optimized/retina${basePath}-2560w.webp 2560w`
      ].join(', '),
      fallback: [
        `/optimized/thumbnail${basePath}-400w.jpg 400w`,
        `/optimized/mobile${basePath}-768w.jpg 768w`,
        `/optimized/tablet${basePath}-1024w.jpg 1024w`,
        `/optimized/desktop${basePath}-1920w.jpg 1920w`,
        `/optimized/retina${basePath}-2560w.jpg 2560w`
      ].join(', ')
    };
  };

  // Intersection Observer setup
  useEffect(() => {
    if (priority) {
      setIsInView(true);
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
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  // Preload critical images
  useEffect(() => {
    if (priority && typeof window !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.type = 'image/webp';
      document.head.appendChild(link);
    }
  }, [priority, src]);

  // Generate blur placeholder if not provided
  const generateBlurDataURL = () => {
    // This would typically be generated server-side
    // For now, using a generic blur placeholder
    return blurDataURL || 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=';
  };

  const handleImageLoad = () => {
    setHasLoaded(true);
    if (onLoad) {
      onLoad();
    }
  };

  // Native picture element for maximum browser compatibility
  if (!isInView && !priority) {
    return (
      <div
        ref={imgRef}
        className={`relative overflow-hidden bg-gray-100 ${className}`}
        style={{
          paddingBottom: `${(1 / aspectRatio) * 100}%`
        }}
      >
        {/* Skeleton loader */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse" />
      </div>
    );
  }

  const srcSet = generateSrcSet();

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        paddingBottom: priority ? 'auto' : `${(1 / aspectRatio) * 100}%`
      }}
    >
      <picture>
        {/* AVIF format - best compression */}
        <source
          type="image/avif"
          srcSet={srcSet.avif}
          sizes={sizes}
        />

        {/* WebP format - good compression */}
        <source
          type="image/webp"
          srcSet={srcSet.webp}
          sizes={sizes}
        />

        {/* Fallback JPEG */}
        <img
          src={src}
          srcSet={srcSet.fallback}
          sizes={sizes}
          alt={alt}
          className={`
            ${priority ? '' : 'absolute inset-0 w-full h-full object-cover'}
            ${hasLoaded ? 'opacity-100' : 'opacity-0'}
            transition-opacity duration-300 ease-in-out
          `}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleImageLoad}
          style={{
            filter: hasLoaded ? 'none' : 'blur(20px)',
            transform: hasLoaded ? 'scale(1)' : 'scale(1.1)'
          }}
        />
      </picture>

      {/* Blur placeholder */}
      {!hasLoaded && placeholder === 'blur' && (
        <img
          src={generateBlurDataURL()}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: 'blur(20px)',
            transform: 'scale(1.1)'
          }}
        />
      )}
    </div>
  );
};

export default LazyImageOptimized;