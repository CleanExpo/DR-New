'use client';

import { useEffect, useRef, useState } from 'react';

interface ImageProps {
  src: string;
  webpSrc?: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

export function LazyLoadImage(...args: any[]): void {
  const [isIntersecting, setIsIntersecting] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <div
      ref={imgRef}
      style={{ minHeight: height, minWidth: width }}
      aria-label={alt}
    >
      {isIntersecting ? (
        <picture>
          {webpSrc && (
            <source
              srcSet={webpSrc}
              type="image/webp"
            />
          )}
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            style={{
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
            }}
          />
        </picture>
      ) : (
        <div
          style={{
            width,
            height,
            backgroundColor: '#f0f0f0',
            display: 'block',
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default function LazyLoadImages() {
  return null; // This component is imported for its exports
}