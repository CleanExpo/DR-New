'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface LCPOptimizerProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

/**
 * LCP Optimizer Component
 * Optimizes Largest Contentful Paint by:
 * - Prioritizing image loading
 * - Preloading hero images
 * - Using optimized image formats
 * - Implementing responsive images
 */
export function LCPOptimizer({
  src,
  alt,
  width = 1920,
  height = 1080,
  priority = true,
  className = '',
  sizes = '100vw',
}: LCPOptimizerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Mark as visible immediately for LCP measurement
    setIsVisible(true);

    // Preload the image
    if (priority && typeof window !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.imageSrcset = `
        ${src}?w=640 640w,
        ${src}?w=750 750w,
        ${src}?w=828 828w,
        ${src}?w=1080 1080w,
        ${src}?w=1200 1200w,
        ${src}?w=1920 1920w
      `;
      link.imageSizes = sizes;
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [src, priority, sizes]);

  // Report LCP to analytics
  const handleLoad = () => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            // Check if this is the LCP element
            if (entry.entryType === 'largest-contentful-paint') {
              console.log('[LCP] Largest Contentful Paint:', {
                time: entry.startTime,
                size: entry.size,
                url: entry.url,
              });

              // Send to analytics
              if (window.gtag) {
                window.gtag('event', 'lcp_optimized', {
                  event_category: 'Performance',
                  event_label: 'LCP Image Loaded',
                  value: Math.round(entry.startTime),
                  non_interaction: true,
                });
              }
            }
          }
        });

        observer.observe({ entryTypes: ['largest-contentful-paint'] });

        // Disconnect after 10 seconds
        setTimeout(() => observer.disconnect(), 10000);
      } catch (e) {
        // Performance observer not supported
      }
    }
  };

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      loading="eager"
      quality={85}
      sizes={sizes}
      className={className}
      onLoad={handleLoad}
      fetchPriority="high"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
      }}
    />
  );
}

export default LCPOptimizer;