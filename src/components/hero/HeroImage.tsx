'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { HeroImageMetadata, generateImageStructuredData } from './HeroImageData';

interface HeroImageProps {
  image: HeroImageMetadata;
  className?: string;
  overlay?: boolean;
  parallax?: boolean;
  children?: React.ReactNode;
}

export function HeroImage(...args: any[]): void {
  // Generate structured data for SEO
  const structuredData = generateImageStructuredData(image);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Background Image with Parallax Effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: parallax ? 1 : 1.1 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          title={image.title}
          fill
          priority={image.priority}
          quality={90}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          className="object-cover object-center"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
        />
      </motion.div>

      {/* Gradient Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 z-10" />
      )}

      {/* Content */}
      {children && (
        <div className="relative z-20 h-full flex items-center justify-center">
          {children}
        </div>
      )}

      {/* Image Attribution (Hidden but available for screen readers) */}
      <div className="sr-only">
        <p>{image.description}</p>
        <p>Keywords: {image.keywords?.join(', ')}</p>
      </div>
    </div>
  );
}

/**
 * Hero Section with Image Background
 */
interface HeroSectionProps {
  image: HeroImageMetadata;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  height?: string;
}

export function HeroSection(...args: any[]): void {
  return (
    <section className={`relative ${height} w-full`}>
      <HeroImage image={image} parallax>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              {title}
            </h1>

            {subtitle && (
              <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
                {subtitle}
              </p>
            )}

            {ctaText && ctaLink && (
              <motion.a
                href={ctaLink}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {ctaText}
              </motion.a>
            )}
          </motion.div>
        </div>
      </HeroImage>
    </section>
  );
}