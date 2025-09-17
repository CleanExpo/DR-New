'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on Escape key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-[100] isolate" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Acts as Home Button */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group" aria-label="Disaster Recovery Brisbane - Home">
              <img
                src="/images/logo-full.svg"
                alt="Disaster Recovery Brisbane"
                className="h-16 w-auto"
                onError={(e) => {
                  e.currentTarget.src = '/images/logo.svg';
                }}
              />
            </Link>
          </div>

          {/* Desktop Navigation - Pillar Pages */}
          <nav className="hidden lg:flex items-center space-x-6" role="navigation" aria-label="Main navigation">
            <Link href="/services/water-damage-restoration" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Water Damage
            </Link>
            <Link href="/services/fire-damage-restoration" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Fire & Smoke
            </Link>
            <Link href="/services/mould-remediation" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Mould Removal
            </Link>
            <Link href="/services/storm-damage" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Storm Damage
            </Link>
            <Link href="/services/biohazard-cleaning" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Biohazard
            </Link>
            <Link href="/emergency-services" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Emergency
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Pricing
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Contact
            </Link>
          </nav>

          {/* Emergency Contact */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="text-right mr-4 border-r pr-4 border-gray-200">
              <p className="text-xs text-gray-500">4/17 Tile St, Wacol QLD 4076</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-emergency-600">24/7 Emergency</p>
              <a href="tel:1300309361" className="text-lg font-bold text-gray-900 hover:text-primary-600 transition-colors" aria-label="Call emergency number 1300 309 361">
                1300 309 361
              </a>
            </div>
            <a
              href="tel:1300309361"
              className="btn-emergency flex items-center space-x-2 emergency-focus"
              aria-label="Call now for emergency assistance"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.25 1.12.37 2.32.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <span>Call Now</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              onKeyDown={handleKeyDown}
              className="text-gray-700 hover:text-primary-600 p-3 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div id="mobile-menu" className="lg:hidden border-t border-gray-200">
            <nav className="px-2 pt-2 pb-4 space-y-2" role="navigation" aria-label="Mobile navigation">
              <div className="bg-emergency-50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold text-emergency-600 mb-1">24/7 Emergency</p>
                <a href="tel:1300309361" className="text-xl font-bold text-gray-900 hover:text-primary-600 transition-colors block" aria-label="Call emergency number 1300 309 361">
                  1300 309 361
                </a>
                <a href="tel:1300309361" className="btn-emergency w-full justify-center mt-3 flex items-center space-x-2 emergency-focus" aria-label="Call now for emergency assistance">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.25 1.12.37 2.32.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <span>Call Now</span>
                </a>
              </div>

              <Link href="/services/water-damage-restoration" className="block px-3 py-3 text-gray-700 hover:text-primary-600 font-medium min-h-[44px] flex items-center">Water Damage</Link>
              <Link href="/services/fire-damage-restoration" className="block px-3 py-3 text-gray-700 hover:text-primary-600 font-medium min-h-[44px] flex items-center">Fire & Smoke</Link>
              <Link href="/services/mould-remediation" className="block px-3 py-3 text-gray-700 hover:text-primary-600 font-medium min-h-[44px] flex items-center">Mould Removal</Link>
              <Link href="/services/storm-damage" className="block px-3 py-3 text-gray-700 hover:text-primary-600 font-medium min-h-[44px] flex items-center">Storm Damage</Link>
              <Link href="/services/biohazard-cleaning" className="block px-3 py-3 text-gray-700 hover:text-primary-600 font-medium min-h-[44px] flex items-center">Biohazard</Link>
              <Link href="/emergency-services" className="block px-3 py-3 text-gray-700 hover:text-primary-600 font-medium min-h-[44px] flex items-center">Emergency</Link>
              <Link href="/pricing" className="block px-3 py-3 text-gray-700 hover:text-primary-600 font-medium min-h-[44px] flex items-center">Pricing</Link>
              <Link href="/contact" className="block px-3 py-3 text-gray-700 hover:text-primary-600 font-medium min-h-[44px] flex items-center">Contact</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}