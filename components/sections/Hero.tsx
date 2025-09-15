'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '../ui/Button';

// Hero images with their service focus
const heroImages = [
  {
    src: '/images/hero/disaster-recovery-services.jpg',
    alt: 'Professional disaster recovery services in Brisbane',
    title: 'Brisbane\'s Premier Disaster Recovery',
    subtitle: 'Complete restoration services for all disasters'
  },
  {
    src: '/images/hero/fire-smoke-damage-restoration.jpg',
    alt: 'Fire and smoke damage restoration Brisbane',
    title: 'Fire & Smoke Damage Restoration',
    subtitle: 'Expert fire damage cleanup and restoration'
  },
  {
    src: '/images/hero/fire-water-damage-restoration.jpg',
    alt: 'Water damage restoration Brisbane',
    title: 'Emergency Water Damage Response',
    subtitle: 'Rapid water extraction and structural drying'
  },
  {
    src: '/images/hero/mould-remediation-services.jpg',
    alt: 'Professional mould remediation Brisbane',
    title: 'Professional Mould Remediation',
    subtitle: 'Safe and effective mould removal services'
  },
  {
    src: '/images/hero/commercial-restoration-services.jpg',
    alt: 'Commercial restoration services Brisbane',
    title: 'Commercial Property Restoration',
    subtitle: 'Get your business back to normal quickly'
  },
  {
    src: '/images/hero/sewage-remediation-services.png',
    alt: 'Sewage cleanup and remediation Brisbane',
    title: 'Sewage Cleanup & Sanitisation',
    subtitle: 'Safe biohazard cleaning and restoration'
  },
  {
    src: '/images/hero/biohazard-remediation-services.png',
    alt: 'Biohazard remediation services Brisbane',
    title: 'Biohazard Remediation Specialists',
    subtitle: 'Professional trauma and crime scene cleanup'
  }
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentImage = heroImages[currentImageIndex];

  return (
    <section className="relative min-h-[100vh] bg-gray-900 text-white overflow-hidden isolate">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          fill
          priority
          className={`object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
          sizes="100vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Image Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`View image ${index + 1}`}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-padding z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-200px)]">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center bg-emergency-600 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                <svg className="w-5 h-5 text-white mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="text-sm font-bold text-white">24/7 Emergency Response Available</span>
              </div>

              <h1 className="text-4xl lg:text-7xl font-bold leading-tight">
                <span className="block text-white drop-shadow-2xl hero-text-shadow">{currentImage.title}</span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-100 leading-relaxed max-w-2xl drop-shadow-lg hero-text-shadow">
                {currentImage.subtitle}
              </p>

              <p className="text-lg text-gray-200 leading-relaxed max-w-2xl drop-shadow-md">
                Professional water damage, fire damage restoration, and mould remediation services
                across Brisbane, Ipswich, and Logan. When disaster strikes, we respond immediately
                to minimize damage and restore your property to its pre-loss condition.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="emergency"
                size="lg"
                className="flex items-center justify-center space-x-3 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-200"
                onClick={() => window.location.href = 'tel:1300309361'}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.25 1.12.37 2.32.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <div className="text-left">
                  <div className="text-sm opacity-90">Call Emergency Line</div>
                  <div className="text-xl font-bold">1300 309 361</div>
                </div>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="bg-white/20 border-white text-white hover:bg-white hover:text-gray-900 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Get Free Assessment
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-white/20">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="text-white font-semibold">IICRC Certified</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="text-white font-semibold">Fully Insured</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="text-white font-semibold">1 Hour Response</span>
              </div>
            </div>
          </div>

          {/* Hero Stats */}
          <div className="relative lg:flex lg:justify-end">
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 text-center shadow-xl border border-white/10">
                <div className="text-4xl font-bold text-white mb-2 drop-shadow-lg">24/7</div>
                <div className="text-gray-100 font-medium">Emergency Response</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 text-center shadow-xl border border-white/10">
                <div className="text-4xl font-bold text-white mb-2 drop-shadow-lg">1hr</div>
                <div className="text-gray-100 font-medium">Average Response</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 text-center shadow-xl border border-white/10">
                <div className="text-4xl font-bold text-white mb-2 drop-shadow-lg">15+</div>
                <div className="text-gray-100 font-medium">Years Experience</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 text-center shadow-xl border border-white/10">
                <div className="text-4xl font-bold text-white mb-2 drop-shadow-lg">100%</div>
                <div className="text-gray-100 font-medium">Satisfaction Rate</div>
              </div>
            </div>

            {/* Emergency Card - Moved to static position on mobile */}
            <div className="lg:absolute lg:-bottom-8 lg:left-1/2 lg:transform lg:-translate-x-1/2 mt-8 lg:mt-0 bg-emergency-600 text-white rounded-xl p-6 shadow-2xl border-2 border-emergency-500 animate-pulse">
              <div className="text-center">
                <div className="text-sm font-bold mb-1">Emergency Hotline</div>
                <div className="text-3xl font-bold">1300 309 361</div>
                <div className="text-xs opacity-90">Available 24/7/365</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}