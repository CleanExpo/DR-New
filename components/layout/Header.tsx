'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent hydration issues
  if (!mounted) {
    return (
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center" aria-label="Disaster Recovery - Home">
              <Image
                src="/images/logos/disaster-recovery-logo.png"
                alt="Disaster Recovery"
                width={180}
                height={50}
                className="h-14 w-auto"
                priority
              />
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`bg-white border-b border-gray-200 sticky top-0 z-50 transition-all duration-300 ${
        hasScrolled ? 'shadow-lg backdrop-blur-sm bg-white/95' : ''
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0" aria-label="Disaster Recovery - Home">
            <Image
              src="/images/logos/disaster-recovery-logo.png"
              alt="Disaster Recovery"
              width={180}
              height={50}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation with Modern Rounded Boxes */}
          <nav className="hidden md:flex items-center gap-2 flex-1 justify-center max-w-3xl mx-auto" role="navigation" aria-label="Main navigation">
            <Link
              href="/"
              className="group relative px-4 py-2 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-xl overflow-hidden"
              aria-label="Home"
            >
              <span className="relative z-10 flex items-center gap-2 font-semibold text-gray-800 group-hover:text-white transition-colors duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Home
              </span>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>

            <Link
              href="/services"
              className="group relative px-4 py-2 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-xl overflow-hidden"
            >
              <span className="relative z-10 font-semibold text-gray-800 group-hover:text-white transition-colors duration-300">
                Services
              </span>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>

            <Link
              href="/about"
              className="group relative px-4 py-2 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-xl overflow-hidden"
            >
              <span className="relative z-10 font-semibold text-gray-800 group-hover:text-white transition-colors duration-300">
                About
              </span>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>

            <Link
              href="/pricing"
              className="group relative px-4 py-2 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-xl overflow-hidden"
            >
              <span className="relative z-10 font-semibold text-gray-800 group-hover:text-white transition-colors duration-300">
                Pricing
              </span>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>

            <Link
              href="/contact"
              className="group relative px-4 py-2 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-xl overflow-hidden"
            >
              <span className="relative z-10 font-semibold text-gray-800 group-hover:text-white transition-colors duration-300">
                Contact
              </span>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
          </nav>

          {/* Call Button - Modern Style */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="tel:1300309361"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white font-bold shadow-lg hover:shadow-xl hover:from-red-600 hover:via-red-700 hover:to-red-800 transition-all duration-300 group overflow-hidden relative"
              aria-label="Call 1300 309 361"
            >
              <svg className="w-4 h-4 group-hover:animate-pulse relative z-10" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="relative z-10">1300 309 361</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 text-gray-700 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 hover:text-white transition-all duration-300 shadow-md hover:shadow-xl"
              aria-label="Menu"
              aria-expanded={isMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Modern Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="space-y-2" role="navigation" aria-label="Mobile navigation">
              <Link
                href="/"
                className="block mx-2 px-5 py-3 rounded-2xl bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 text-gray-800 hover:text-white font-semibold transition-all duration-300 shadow-md hover:shadow-xl group overflow-hidden relative"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center relative z-10">
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  Home
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>

              <Link
                href="/services"
                className="block mx-2 px-5 py-3 rounded-2xl bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 text-gray-800 hover:text-white font-semibold transition-all duration-300 shadow-md hover:shadow-xl group overflow-hidden relative"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative z-10">Services</span>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>

              <Link
                href="/about"
                className="block mx-2 px-5 py-3 rounded-2xl bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 text-gray-800 hover:text-white font-semibold transition-all duration-300 shadow-md hover:shadow-xl group overflow-hidden relative"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative z-10">About</span>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>

              <Link
                href="/pricing"
                className="block mx-2 px-5 py-3 rounded-2xl bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 text-gray-800 hover:text-white font-semibold transition-all duration-300 shadow-md hover:shadow-xl group overflow-hidden relative"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative z-10">Pricing</span>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>

              <Link
                href="/contact"
                className="block mx-2 px-5 py-3 rounded-2xl bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 text-gray-800 hover:text-white font-semibold transition-all duration-300 shadow-md hover:shadow-xl group overflow-hidden relative"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative z-10">Contact</span>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>

              {/* Mobile Call Button */}
              <div className="pt-4 mt-4 border-t border-gray-200">
                <a
                  href="tel:1300309361"
                  className="flex items-center justify-center gap-3 mx-2 px-5 py-4 rounded-2xl bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white font-bold shadow-lg hover:shadow-xl hover:from-red-600 hover:via-red-700 hover:to-red-800 transition-all duration-300 group overflow-hidden relative"
                >
                  <svg className="w-6 h-6 animate-pulse relative z-10" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="text-lg relative z-10">Call 1300 309 361</span>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}