'use client';

import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  quality?: number;
  sizes?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  style?: CSSProperties;
  fill?: boolean;
  aspectRatio?: number;
  fadeIn?: boolean;
  observerOptions?: IntersectionObserverInit;
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f7f8" offset="20%" />
      <stop stop-color="#edeef1" offset="50%" />
      <stop stop-color="#f6f7f8" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width = 800,
  height = 600,
  priority = false,
  className = '',
  objectFit = 'cover',
  quality = 85,
  sizes,
  placeholder = 'blur',
  blurDataURL,
  loading = 'lazy',
  onLoad,
  style,
  fill = false,
  aspectRatio,
  fadeIn = true,
  observerOptions = {
    rootMargin: '100px',
    threshold: 0.01
  }
}) => {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Generate placeholder blur data URL if not provided
  const defaultBlurDataURL = `data:image/svg+xml;base64,${toBase64(
    shimmer(width || 800, height || 600)
  )}`;

  // Setup Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imageRef.current) {
      setIsInView(true);
      return;
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (observerRef.current && imageRef.current) {
            observerRef.current.unobserve(imageRef.current);
          }
        }
      },
      observerOptions
    );

    if (imageRef.current) {
      observerRef.current.observe(imageRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [priority, observerOptions]);

  // Handle image loading
  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    if (onLoad) {
      onLoad();
    }
  };

  // Handle image error with fallback
  const handleError = () => {
    setHasError(true);
    // Fallback to a default image
    if (src !== '/images/placeholder.jpg') {
      setImageSrc('/images/placeholder.jpg');
    }
  };

  // Calculate responsive sizes if not provided
  const defaultSizes = sizes || `
    (max-width: 640px) 100vw,
    (max-width: 768px) 80vw,
    (max-width: 1024px) 50vw,
    (max-width: 1280px) 33vw,
    25vw
  `;

  // Container style with aspect ratio
  const containerStyle: CSSProperties = {
    position: 'relative',
    width: fill ? '100%' : width,
    height: fill ? '100%' : height,
    ...(aspectRatio && !fill && {
      paddingBottom: `${(1 / aspectRatio) * 100}%`,
      height: 0,
    }),
    ...style,
  };

  // Image wrapper styles for fade-in effect
  const imageWrapperStyle: CSSProperties = {
    position: fill ? 'absolute' : 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    opacity: fadeIn ? (isLoaded ? 1 : 0) : 1,
    transition: fadeIn ? 'opacity 0.3s ease-in-out' : 'none',
  };

  // Render placeholder for images not in view
  if (!isInView) {
    return (
      <div
        ref={imageRef}
        className={className}
        style={containerStyle}
        aria-label={`Loading placeholder for ${alt}`}
      >
        <div style={{
          width: '100%',
          height: '100%',
          background: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: '#ccc' }}
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={imageRef}
      className={className}
      style={containerStyle}
    >
      <div style={imageWrapperStyle}>
        {fill ? (
          <Image
            src={imageSrc}
            alt={alt}
            fill
            priority={priority}
            quality={quality}
            sizes={defaultSizes}
            placeholder={placeholder}
            blurDataURL={blurDataURL || defaultBlurDataURL}
            onLoad={handleLoad}
            onError={handleError}
            style={{
              objectFit: objectFit as any,
            }}
          />
        ) : (
          <Image
            src={imageSrc}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            quality={quality}
            sizes={defaultSizes}
            placeholder={placeholder}
            blurDataURL={blurDataURL || defaultBlurDataURL}
            loading={loading}
            onLoad={handleLoad}
            onError={handleError}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: objectFit as any,
            }}
          />
        )}
      </div>

      {/* Preload hint for next images */}
      {priority && (
        <link
          rel="preload"
          as="image"
          href={src}
          imageSrcSet={`${src}?w=640 640w, ${src}?w=750 750w, ${src}?w=1080 1080w, ${src}?w=1200 1200w, ${src}?w=1920 1920w`}
          imageSizes={defaultSizes}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f5f5f5',
            color: '#666',
            fontSize: '14px',
          }}
          role="img"
          aria-label={alt}
        >
          <span>Image could not be loaded</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;