import Image from 'next/image';
import { memo } from 'react';

const HeroOptimized = memo(function HeroOptimized() {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center">
      {/* Optimized Hero Image with lazy loading */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/disaster-recovery-services.jpg"
          alt="24/7 Emergency Disaster Recovery Services in Brisbane"
          fill
          priority
          quality={75}
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
      </div>

      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          24/7 Emergency Disaster Recovery
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Brisbane's Trusted IICRC Certified Restoration Experts
        </p>

        {/* Emergency CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:1300309361"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call 1300 309 361
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-blue-600 bg-white rounded-lg hover:bg-gray-100 transition-colors"
          >
            Get Free Quote
          </a>
        </div>
      </div>
    </section>
  );
});

export default HeroOptimized;
