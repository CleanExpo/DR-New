/**
 * Lazy Loading Image Component with CLS Prevention
 * Implements proper aspect ratios and reserved space
 */

'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  quality?: number;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  className = '',
  sizes,
  quality = 85,
  priority = false,
  placeholder,
  blurDataURL,
  onLoad,
}: LazyImageProps) {
  const [isInView, setIsInView] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

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
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority, isInView]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Calculate aspect ratio to prevent CLS
  const aspectRatio = (height / width) * 100;

  return (
    <div
      ref={imgRef}
      className={`relative ${className}`}
      style={{
        paddingBottom: `${aspectRatio}%`,
        width: '100%',
        height: 0,
        overflow: 'hidden',
      }}
    >
      {isInView && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          quality={quality}
          priority={priority}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          onLoad={handleLoad}
          loading={priority ? 'eager' : 'lazy'}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 0.3s ease-in-out',
            opacity: isLoaded ? 1 : 0.9,
          }}
        />
      )}
    </div>
  );
}

export default LazyImage;
