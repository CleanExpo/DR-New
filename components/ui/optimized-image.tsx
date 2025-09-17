'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ImageSkeleton } from './loading-states';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  lazy?: boolean;
  blur?: boolean;
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  containerClassName = '',
  objectFit = 'cover',
  lazy = true,
  blur = true,
  quality = 75,
  onLoad,
  onError
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || isInView) return;

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
        rootMargin: '50px', // Start loading 50px before the image enters viewport
        threshold: 0.01
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, isInView]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  // Determine image dimensions
  const imageProps = width && height
    ? { width, height }
    : { fill: true };

  return (
    <div ref={containerRef} className={`relative ${containerClassName}`}>
      {/* Loading skeleton */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 z-10">
          <ImageSkeleton className="w-full h-full" />
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center rounded-lg">
          <div className="text-center p-4">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-sm text-gray-600">Failed to load image</p>
          </div>
        </div>
      )}

      {/* Image */}
      {isInView && !hasError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className={`relative ${className}`}
        >
          <Image
            {...imageProps}
            src={src}
            alt={alt}
            priority={priority}
            quality={quality}
            onLoad={handleLoad}
            onError={handleError}
            className={className}
            style={{ objectFit }}
            {...(blur && {
              placeholder: 'blur',
              blurDataURL: generateBlurDataURL()
            })}
          />
        </motion.div>
      )}
    </div>
  );
}

// Hero image component with parallax effect
export function HeroImage({
  src,
  alt,
  overlay = true,
  children
}: {
  src: string;
  alt: string;
  overlay?: boolean;
  children?: React.ReactNode;
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <motion.div
        className="absolute inset-0 scale-110"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }}
        transition={{ type: 'tween', duration: 0.1 }}
      >
        <OptimizedImage
          src={src}
          alt={alt}
          containerClassName="w-full h-full"
          className="w-full h-full"
          priority
          quality={90}
        />
      </motion.div>

      {/* Overlay gradient */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
      )}

      {/* Content */}
      {children && (
        <div className="relative z-10 h-full">
          {children}
        </div>
      )}
    </div>
  );
}

// Gallery image with lightbox capability
export function GalleryImage({
  src,
  alt,
  thumbnail,
  onOpen
}: {
  src: string;
  alt: string;
  thumbnail?: string;
  onOpen?: () => void;
}) {
  return (
    <motion.button
      onClick={onOpen}
      className="relative group cursor-pointer overflow-hidden rounded-lg"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <OptimizedImage
        src={thumbnail || src}
        alt={alt}
        width={400}
        height={300}
        className="w-full h-full"
        quality={thumbnail ? 60 : 75}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
        </svg>
      </div>
    </motion.button>
  );
}

// Generate a simple blur data URL
function generateBlurDataURL(): string {
  const shimmer = (w: number, h: number) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#e5e7eb" offset="20%" />
          <stop stop-color="#d1d5db" offset="50%" />
          <stop stop-color="#e5e7eb" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#e5e7eb" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    </svg>`;

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);

  return `data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`;
}