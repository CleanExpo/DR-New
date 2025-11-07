'use client';

import { Phone, Clock, Shield } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function EmergencyCTAEnhanced() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling down 200px
      setIsVisible(window.scrollY > 200);

      // Calculate scroll progress for subtle visual feedback
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop - Floating Right Side */}
      <div
        className={`hidden lg:block fixed right-0 top-1/2 -translate-y-1/2 z-[1050] transition-all duration-500 ease-out ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <Link
          href="tel:1300309361"
          className="group relative flex flex-col items-center gap-3 bg-gradient-to-br from-emergency-600 via-emergency-600 to-emergency-700 text-white p-5 rounded-l-2xl shadow-2xl hover:shadow-emergency-500/50 transition-all duration-300 hover:pr-7 overflow-hidden"
        >
          {/* Animated Background Pulse */}
          <div className="absolute inset-0 bg-white/10 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Pulse Animation Circle */}
          <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-16 h-16">
            <div className="absolute inset-0 bg-emergency-500 rounded-full opacity-75 animate-ping"></div>
          </div>

          {/* Phone Icon with Pulsing Effect */}
          <div className="relative z-10">
            <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-300">
              <Phone className="w-7 h-7 group-hover:animate-pulse" />
            </div>
          </div>

          {/* Text Content */}
          <div className="relative z-10 text-center space-y-1">
            <div className="flex items-center gap-1.5 justify-center">
              <Clock className="w-3.5 h-3.5 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider">
                24/7 Emergency
              </span>
            </div>
            <div className="text-xl font-black tracking-tight whitespace-nowrap">
              1300 309 361
            </div>
            <div className="text-xs opacity-90 font-semibold">
              Call Now
            </div>
          </div>

          {/* Bottom Badge */}
          <div className="relative z-10 flex items-center gap-1.5 px-3 py-1.5 bg-white/15 rounded-full backdrop-blur-sm border border-white/20">
            <Shield className="w-3 h-3" />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Master Restorer
            </span>
          </div>

          {/* Shimmer Effect */}
          <div className="absolute inset-0 overflow-hidden rounded-l-2xl">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>
        </Link>
      </div>

      {/* Tablet - Side Button */}
      <div
        className={`hidden md:block lg:hidden fixed right-0 top-1/2 -translate-y-1/2 z-[1050] transition-all duration-500 ease-out ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <Link
          href="tel:1300309361"
          className="group flex flex-col items-center gap-2 bg-gradient-to-br from-emergency-600 to-emergency-700 text-white p-4 rounded-l-xl shadow-2xl hover:shadow-emergency-500/50 transition-all duration-300 hover:pr-6"
        >
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
            <Phone className="w-6 h-6 group-hover:animate-pulse" />
          </div>
          <div className="text-center space-y-0.5">
            <div className="text-[10px] font-bold uppercase tracking-wider opacity-90">
              Emergency
            </div>
            <div className="text-sm font-black">
              1300<br />309 361
            </div>
          </div>
        </Link>
      </div>

      {/* Mobile - Sticky Bottom Bar */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-[1050] transition-all duration-500 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        <div className="relative">
          {/* Progress Indicator */}
          <div className="absolute top-0 left-0 h-1 bg-white/20">
            <div
              className="h-full bg-white/50 transition-all duration-150"
              style={{ width: `${scrollProgress}%` }}
            ></div>
          </div>

          <Link
            href="tel:1300309361"
            className="flex items-center justify-between gap-4 bg-gradient-to-r from-emergency-600 to-emergency-700 text-white py-4 px-6 shadow-2xl active:shadow-lg transition-all duration-200 active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              {/* Animated Phone Icon */}
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                <div className="relative w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <Phone className="w-6 h-6" />
                </div>
              </div>

              {/* Text Content */}
              <div className="text-left">
                <div className="flex items-center gap-2 mb-0.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    24/7 Emergency Service
                  </span>
                </div>
                <div className="text-lg font-black tracking-tight">
                  1300 309 361
                </div>
              </div>
            </div>

            {/* Action Indicator */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Phone className="w-5 h-5 text-emergency-600" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Tap Call
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Back to Top Button - Shows when CTA is visible */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`hidden lg:block fixed right-6 bottom-6 z-[1040] w-12 h-12 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
        aria-label="Scroll to top"
      >
        <svg
          className="w-6 h-6 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </>
  );
}
