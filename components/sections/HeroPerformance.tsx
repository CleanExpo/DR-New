'use client';

import { useState, useEffect, useRef, useCallback, memo } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Lazy load the Button component
const Button = dynamic(() => import('../ui/Button'), {
  loading: () => <div className="h-14 bg-gray-200 rounded-lg animate-pulse" />,
  ssr: true
});

// Preload critical images
const preloadImage = (src: string) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  link.setAttribute('fetchpriority', 'high');
  document.head.appendChild(link);
};

// Hero images configuration
const heroImages = [
  {
    src: '/images/hero/disaster-recovery-services.jpg',
    alt: 'Professional disaster recovery services in Brisbane',
    title: 'Brisbane\'s Premier Disaster Recovery',
    subtitle: 'Complete restoration services for all disasters',
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...' // Add actual blur data
  },
  {
    src: '/images/hero/fire-smoke-damage-restoration.jpg',
    alt: 'Fire and smoke damage restoration Brisbane',
    title: 'Fire & Smoke Damage Restoration',
    subtitle: 'Expert fire damage cleanup and restoration',
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...'
  },
  {
    src: '/images/hero/fire-water-damage-restoration.jpg',
    alt: 'Water damage restoration Brisbane',
    title: 'Emergency Water Damage Response',
    subtitle: 'Rapid water extraction and structural drying',
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...'
  },
  {
    src: '/images/hero/mould-remediation-services.jpg',
    alt: 'Professional mould remediation Brisbane',
    title: 'Professional Mould Remediation',
    subtitle: 'Safe and effective mould removal services',
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...'
  },
  {
    src: '/images/hero/commercial-restoration-services.jpg',
    alt: 'Commercial restoration services Brisbane',
    title: 'Commercial Property Restoration',
    subtitle: 'Get your business back to normal quickly',
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...'
  }
];

// Memoized trust indicators component
const TrustIndicators = memo(() => (
  <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-white/20" role="list">
    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
      <span className="text-white font-semibold">IICRC Certified</span>
    </div>
    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
      <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <span className="text-white font-semibold">Fully Insured</span>
    </div>
    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
      <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <span className="text-white font-semibold">1 Hour Response</span>
    </div>
  </div>
));

TrustIndicators.displayName = 'TrustIndicators';

// Memoized stats component
const HeroStats = memo(() => (
  <div className="grid grid-cols-2 gap-4 max-w-md">
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 text-center shadow-xl border border-white/10">
      <div className="text-4xl font-bold text-white mb-2">24/7</div>
      <div className="text-gray-100 font-medium">Emergency Response</div>
    </div>
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 text-center shadow-xl border border-white/10">
      <div className="text-4xl font-bold text-white mb-2">1hr</div>
      <div className="text-gray-100 font-medium">Average Response</div>
    </div>
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 text-center shadow-xl border border-white/10">
      <div className="text-4xl font-bold text-white mb-2">15+</div>
      <div className="text-gray-100 font-medium">Years Experience</div>
    </div>
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 text-center shadow-xl border border-white/10">
      <div className="text-4xl font-bold text-white mb-2">100%</div>
      <div className="text-gray-100 font-medium">Satisfaction Rate</div>
    </div>
  </div>
));

HeroStats.displayName = 'HeroStats';

function HeroPerformance() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(new Set<number>());
  const intervalRef = useRef<NodeJS.Timeout>();
  const isReducedMotion = useRef(false);

  // Preload next image
  const preloadNextImage = useCallback((index: number) => {
    const nextIndex = (index + 1) % heroImages.length;
    const nextImage = heroImages[nextIndex];
    if (typeof window !== 'undefined') {
      preloadImage(nextImage.src);
    }
  }, []);

  // Handle image load
  const handleImageLoad = useCallback((index: number) => {
    setImagesLoaded(prev => new Set(prev).add(index));
    preloadNextImage(index);
  }, [preloadNextImage]);

  // Initialize carousel
  useEffect(() => {
    // Check for reduced motion preference
    if (typeof window !== 'undefined') {
      isReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Preload first two images immediately
      preloadImage(heroImages[0].src);
      if (heroImages.length > 1) {
        preloadImage(heroImages[1].src);
      }

      if (!isReducedMotion.current) {
        intervalRef.current = setInterval(() => {
          setCurrentImageIndex(prev => (prev + 1) % heroImages.length);
        }, 5000);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const currentImage = heroImages[currentImageIndex];
  const isCurrentImageLoaded = imagesLoaded.has(currentImageIndex);

  // Optimized phone call handler
  const handlePhoneCall = useCallback(() => {
    window.location.href = 'tel:1300309361';
  }, []);

  return (
    <section className="relative min-h-screen bg-gray-900 text-white overflow-hidden isolate">
      {/* Optimized Background with lazy loading */}
      <div className="absolute inset-0 z-0">
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          fill
          priority={currentImageIndex === 0}
          className={`object-cover transition-opacity duration-700 ${
            isCurrentImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => handleImageLoad(currentImageIndex)}
          sizes="100vw"
          quality={85}
          placeholder={currentImage.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={currentImage.blurDataURL}
        />
        {/* Gradient overlays combined into one */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      </div>

      {/* Navigation dots - simplified */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'
            }`}
            aria-label={`Image ${index + 1}`}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content */}
          <div className="space-y-8">
            {/* Emergency Badge */}
            <div className="inline-flex items-center bg-red-600 rounded-full px-6 py-3">
              <span className="text-sm font-bold text-white">24/7 Emergency Response</span>
            </div>

            {/* Title with optimized rendering */}
            <h1 className="text-4xl lg:text-6xl font-bold text-white">
              {currentImage.title}
            </h1>

            <p className="text-xl lg:text-2xl text-gray-100 max-w-2xl">
              {currentImage.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="emergency"
                size="lg"
                onClick={handlePhoneCall}
                className="flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.25 1.12.37 2.32.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <div>
                  <div className="text-sm">Emergency Line</div>
                  <div className="text-xl font-bold">1300 309 361</div>
                </div>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="bg-white/20 border-white text-white hover:bg-white hover:text-gray-900"
              >
                Get Free Assessment
              </Button>
            </div>

            <TrustIndicators />
          </div>

          {/* Stats */}
          <div className="relative lg:flex lg:justify-end">
            <HeroStats />
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(HeroPerformance);