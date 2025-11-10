'use client';

/**
 * Image Preloader Component
 * Preloads critical images for better performance
 * Implements intelligent preloading strategies
 */

import { useEffect } from 'react';
import { preloadImage, prefetchImage } from '@/lib/image-optimization/utils';

export interface PreloadImage {
  src: string;
  priority?: 'high' | 'low';
  as?: 'image' | 'fetch';
}

export interface ImagePreloaderProps {
  images: PreloadImage[];
  strategy?: 'immediate' | 'idle' | 'viewport';
}

/**
 * Preloads images based on strategy
 */
export function ImagePreloader({
  images,
  strategy = 'immediate',
}: ImagePreloaderProps) {
  useEffect(() => {
    if (typeof window === 'undefined') {return;}

    const preloadImages = () => {
      images.forEach((image) => {
        if (image.priority === 'high') {
          preloadImage(image.src, image.as);
        } else {
          prefetchImage(image.src);
        }
      });
    };

    switch (strategy) {
      case 'immediate':
        preloadImages();
        break;

      case 'idle':
        if ('requestIdleCallback' in window) {
          requestIdleCallback(preloadImages);
        } else {
          setTimeout(preloadImages, 1);
        }
        break;

      case 'viewport':
        // Wait for user interaction or after a delay
        const timer = setTimeout(preloadImages, 3000);
        const handleInteraction = () => {
          clearTimeout(timer);
          preloadImages();
          window.removeEventListener('scroll', handleInteraction);
          window.removeEventListener('mousemove', handleInteraction);
          window.removeEventListener('touchstart', handleInteraction);
        };

        window.addEventListener('scroll', handleInteraction, { once: true });
        window.addEventListener('mousemove', handleInteraction, { once: true });
        window.addEventListener('touchstart', handleInteraction, { once: true });

        return () => {
          clearTimeout(timer);
          window.removeEventListener('scroll', handleInteraction);
          window.removeEventListener('mousemove', handleInteraction);
          window.removeEventListener('touchstart', handleInteraction);
        };
    }
  }, [images, strategy]);

  return null; // This component doesn't render anything
}

/**
 * Hook for preloading images programmatically
 */
export function useImagePreloader() {
  return {
    preload: (src: string, priority: 'high' | 'low' = 'low') => {
      if (priority === 'high') {
        preloadImage(src);
      } else {
        prefetchImage(src);
      }
    },
    preloadMultiple: (images: PreloadImage[]) => {
      images.forEach((image) => {
        if (image.priority === 'high') {
          preloadImage(image.src, image.as);
        } else {
          prefetchImage(image.src);
        }
      });
    },
  };
}

/**
 * Preload hero images for the site
 */
export function PreloadHeroImages() {
  const heroImages: PreloadImage[] = [
    {
      src: '/images/heroes/disaster-recovery-hero.webp',
      priority: 'high',
      as: 'image',
    },
    {
      src: '/images/logos/dr-logo.svg',
      priority: 'high',
      as: 'image',
    },
  ];

  return <ImagePreloader images={heroImages} strategy="immediate" />;
}

/**
 * Preload service images
 */
export function PreloadServiceImages() {
  const serviceImages: PreloadImage[] = [
    {
      src: '/images/services/water-damage-restoration.webp',
      priority: 'low',
    },
    {
      src: '/images/services/fire-damage-restoration.webp',
      priority: 'low',
    },
    {
      src: '/images/services/mould-remediation.webp',
      priority: 'low',
    },
  ];

  return <ImagePreloader images={serviceImages} strategy="idle" />;
}

export default ImagePreloader;
