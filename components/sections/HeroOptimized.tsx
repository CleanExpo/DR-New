'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Button from '../ui/Button';
import { IMAGE_PRESETS, BREAKPOINTS, generateSizes } from '@/lib/imageOptimization';

// Hero images with optimization metadata
const heroImages = [
  {
    src: '/images/hero/disaster-recovery-services.jpg',
    alt: 'Professional disaster recovery services in Brisbane',
    title: 'Brisbane\'s Premier Disaster Recovery',
    subtitle: 'Complete restoration services for all disasters',
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...', // Generated blur placeholder
    width: 1920,
    height: 1080
  },
  {
    src: '/images/hero/fire-smoke-damage-restoration.jpg',
    alt: 'Fire and smoke damage restoration Brisbane',
    title: 'Fire & Smoke Damage Restoration',
    subtitle: 'Expert fire damage cleanup and restoration',
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...',
    width: 1920,
    height: 1080
  },
  {
    src: '/images/hero/fire-water-damage-restoration.jpg',
    alt: 'Water damage restoration Brisbane',
    title: 'Emergency Water Damage Response',
    subtitle: 'Rapid water extraction and structural drying',
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...',
    width: 1920,
    height: 1080
  },
  {
    src: '/images/hero/mould-remediation-services.jpg',
    alt: 'Professional mould remediation Brisbane',
    title: 'Professional Mould Remediation',
    subtitle: 'Safe and effective mould removal services',
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...',
    width: 1920,
    height: 1080
  },
  {
    src: '/images/hero/commercial-restoration-services.jpg',
    alt: 'Commercial restoration services Brisbane',
    title: 'Commercial Property Restoration',
    subtitle: 'Get your business back to normal quickly',
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...',
    width: 1920,
    height: 1080
  },
  {
    src: '/images/hero/sewage-remediation-services.png',
    alt: 'Sewage cleanup and remediation Brisbane',
    title: 'Sewage Cleanup & Sanitisation',
    subtitle: 'Safe biohazard cleaning and restoration',
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...',
    width: 1920,
    height: 1080
  },
  {
    src: '/images/hero/biohazard-remediation-services.png',
    alt: 'Biohazard remediation services Brisbane',
    title: 'Biohazard Remediation Specialists',
    subtitle: 'Professional trauma and crime scene cleanup',
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...',
    width: 1920,
    height: 1080
  }
];

export default function HeroOptimized() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure client-side rendering for consistency
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Preload next image for smooth transitions
  const preloadNextImage = useCallback(() => {
    const nextIndex = (currentImageIndex + 1) % heroImages.length;
    const nextImage = heroImages[nextIndex];

    if (typeof window !== 'undefined') {
      const img = new window.Image();
      img.src = nextImage.src;
    }
  }, [currentImageIndex]);

  // Auto-rotate images with pause on hover
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        preloadNextImage();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isPaused, preloadNextImage]);

  const currentImage = heroImages[currentImageIndex];

  // Generate responsive sizes for hero images
  const heroSizes = generateSizes({
    mobile: BREAKPOINTS.mobile,
    tablet: BREAKPOINTS.tablet,
    desktop: BREAKPOINTS.desktop,
    wide: BREAKPOINTS.wide,
    default: BREAKPOINTS.ultrawide
  });

  // Handle manual navigation
  const navigateToImage = useCallback((index: number) => {
    setCurrentImageIndex(index);
    setIsPaused(true);

    // Resume auto-rotation after 10 seconds
    setTimeout(() => setIsPaused(false), 10000);
  }, []);

  if (!isClient) {
    // Server-side render with first image only
    return (
      <section className="relative min-h-[100vh] bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImages[0].src}
            alt={heroImages[0].alt}
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center min-h-[100vh] px-6">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {heroImages[0].title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              {heroImages[0].subtitle}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative min-h-[100vh] bg-gray-900 text-white overflow-hidden isolate"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Preload critical resources */}
      <link rel="preload" as="image" href={heroImages[0].src} />
      <link rel="prefetch" as="image" href={heroImages[1].src} />

      {/* Hero Background with optimized loading */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={image.src}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0} // Only prioritize first image
              quality={90}
              sizes={heroSizes}
              className="object-cover"
              placeholder="blur"
              blurDataURL={image.blurDataURL}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        {/* Gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-center min-h-[100vh] px-6">
        <div className="max-w-7xl mx-auto w-full">
          {/* Emergency Badge */}
          <div className="inline-flex items-center bg-red-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6">
            <span className="animate-pulse w-2 h-2 bg-white rounded-full mr-2"></span>
            <span className="text-sm font-semibold">24/7 Emergency Response</span>
          </div>

          {/* Dynamic Content with smooth transitions */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fadeInUp">
              {currentImage.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fadeInUp animation-delay-100">
              {currentImage.subtitle}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              variant="emergency"
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 text-lg"
              onClick={() => window.location.href = 'tel:1300309361'}
            >
              <svg className="w-5 h-5 mr-2 inline" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              Call 1300 309 361 Now
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-8 py-4 text-lg"
            >
              Get Immediate Help
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-300">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>IICRC Certified</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>1 Hour Response</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>Insurance Approved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Image Navigation Dots with improved accessibility */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {heroImages.map((image, index) => (
          <button
            key={index}
            onClick={() => navigateToImage(index)}
            className={`transition-all duration-300 ${
              index === currentImageIndex
                ? 'w-8 h-3 bg-white rounded-full'
                : 'w-3 h-3 bg-white/50 hover:bg-white/80 rounded-full'
            }`}
            aria-label={`View ${image.title}`}
            aria-current={index === currentImageIndex ? 'true' : 'false'}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </div>
    </section>
  );
}