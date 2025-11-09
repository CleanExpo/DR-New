'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone } from 'lucide-react';

export default function MobileEmergencyButton() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    // Throttle scroll event for better performance
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    return () => window.removeEventListener('scroll', scrollListener);
  }, [lastScrollY]);

  return (
    <div
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      {/* Bottom sticky CTA - Safe area aware */}
      <div className="bg-gradient-to-r from-red-700 to-red-800 shadow-2xl pb-safe">
        <div className="container mx-auto px-4 py-3">
          <Link
            href="tel:1300309361"
            className="flex items-center justify-center min-h-[52px] w-full bg-white text-red-700 font-bold text-lg rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors shadow-lg active:scale-95 transform duration-150"
            aria-label="Call 1300 309 361 for emergency assistance"
          >
            <Phone className="w-6 h-6 mr-2 animate-pulse" />
            <span>Emergency: 1300 309 361</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
