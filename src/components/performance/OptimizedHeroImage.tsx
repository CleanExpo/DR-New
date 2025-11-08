/**
 * Optimized Hero Image Component
 * Implements LCP optimization with preloading and priority loading
 */

'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface OptimizedHeroImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  fill?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  className?: string;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export function OptimizedHeroImage({
  src,
  alt,
  priority = true,
  fill = true,
  objectFit = 'cover',
  className = '',
  sizes = '100vw',
  quality = 85,
  placeholder,
  blurDataURL,
}: OptimizedHeroImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload hero image in head
  useEffect(() => {
    if (priority && typeof window !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.fetchPriority = 'high';
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [src, priority]);

  return (
    <div className={`relative ${className}`} style={{ contentVisibility: 'auto' }}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        quality={quality}
        sizes={sizes}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        style={{
          objectFit: objectFit,
          transition: 'opacity 0.3s ease-in-out',
          opacity: isLoaded ? 1 : 0.9,
        }}
        onLoad={() => setIsLoaded(true)}
        loading="eager"
        fetchPriority="high"
      />
    </div>
  );
}

export default OptimizedHeroImage;
