/**
 * Hero Image Components
 * Working implementation using OptimizedImage
 */

import Image from 'next/image';
import React from 'react';

// Re-export the working HeroImage from image-optimization
export { HeroImage } from '@/components/image-optimization';

/**
 * HeroSection Component
 * Displays a full-width hero section with image background and content overlay
 */
interface HeroSectionProps {
  image?: {
    id?: string;
    src: string;
    alt: string;
  };
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
  overlayClassName?: string;
}

export function HeroSection({
  image,
  title,
  subtitle,
  children,
  className = '',
  overlayClassName = 'bg-black/50'
}: HeroSectionProps) {
  // If no image provided, use a default gradient background
  if (!image) {
    return (
      <section className={`relative min-h-[500px] flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 ${className}`}>
        <div className="container mx-auto px-6 text-center text-white z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </section>
    );
  }

  return (
    <section className={`relative min-h-[500px] flex items-center justify-center ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Overlay */}
        <div className={`absolute inset-0 ${overlayClassName}`} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
