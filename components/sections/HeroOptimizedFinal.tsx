'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroOptimizedFinal() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Use the tornado image with better contrast for text
  const heroImage = '/images/hero/hero-disaster-tornado.png';

  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Optimized Background Image with lazy loading */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="24/7 Emergency Disaster Recovery Services Brisbane"
          fill
          className="object-cover"
          priority={false} // Change to lazy loading for better initial load
          quality={85} // Optimize quality for web
          sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        {/* Enhanced gradient overlay for better text readability with tornado image */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-2xl">
          <span className="block md:inline">Water Damage Restoration</span>{' '}
          <span className="block md:inline text-red-500">Brisbane</span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-white mb-6 md:mb-8 drop-shadow-lg max-w-3xl mx-auto">
          24/7 Emergency Response • 1-Hour Arrival • Insurance Approved
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="tel:1300309361"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-lg sm:text-xl transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:scale-105 w-full sm:w-auto"
            aria-label="Call emergency number 1300 309 361"
          >
            <svg className="w-6 h-6 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span>1300 309 361</span>
          </a>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-lg sm:text-xl transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:scale-105 w-full sm:w-auto"
          >
            Get Free Quote
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-white max-w-4xl mx-auto">
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3 md:p-4">
            <div className="text-2xl md:text-3xl font-bold">24/7</div>
            <div className="text-xs md:text-sm opacity-90">Emergency</div>
          </div>
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3 md:p-4">
            <div className="text-2xl md:text-3xl font-bold">1 Hour</div>
            <div className="text-xs md:text-sm opacity-90">Response</div>
          </div>
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3 md:p-4">
            <div className="text-2xl md:text-3xl font-bold">IICRC</div>
            <div className="text-xs md:text-sm opacity-90">Certified</div>
          </div>
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3 md:p-4">
            <div className="text-2xl md:text-3xl font-bold">$20M</div>
            <div className="text-xs md:text-sm opacity-90">Insured</div>
          </div>
        </div>
      </div>

      {/* Mobile-optimized scroll indicator */}
      {isMounted && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce md:hidden">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      )}
    </section>
  );
}