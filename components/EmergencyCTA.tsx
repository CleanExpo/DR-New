'use client';

import { Phone } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function EmergencyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling down 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop - Floating right side */}
      <div
        className={`hidden lg:block fixed right-0 top-1/2 -translate-y-1/2 z-50 transition-all duration-300 ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <Link
          href="tel:1300309361"
          className="flex flex-col items-center gap-2 bg-red-700 text-white p-4 rounded-l-lg shadow-2xl hover:bg-red-800 transition-all hover:scale-105 group"
        >
          <Phone className="w-8 h-8 animate-pulse group-hover:animate-bounce" />
          <div className="text-center">
            <div className="text-xs font-semibold uppercase tracking-wider">24/7 Emergency</div>
            <div className="text-lg font-bold whitespace-nowrap">1300 309 361</div>
            <div className="text-xs opacity-90">Call Now</div>
          </div>
        </Link>
      </div>

      {/* Mobile - Sticky bottom */}
      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        <Link
          href="tel:1300309361"
          className="flex items-center justify-center gap-3 bg-red-700 text-white py-4 px-6 shadow-2xl active:bg-red-700 transition-colors w-full"
        >
          <Phone className="w-6 h-6 animate-pulse" />
          <div className="text-center">
            <div className="text-sm font-bold">24/7 EMERGENCY: 1300 309 361</div>
            <div className="text-xs opacity-90">Tap to Call Now</div>
          </div>
        </Link>
      </div>
    </>
  );
}
