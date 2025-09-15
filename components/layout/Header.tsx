'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-[100] isolate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="bg-primary-600 text-white rounded-lg p-2 mr-3">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Disaster Recovery</h1>
                <p className="text-sm text-primary-600 font-semibold">Brisbane</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="/water-damage" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Water Damage
            </Link>
            <Link href="/fire-damage" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Fire Damage
            </Link>
            <Link href="/mould-remediation" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Mould Remediation
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Contact
            </Link>
          </nav>

          {/* Emergency Contact */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-emergency-600">24/7 Emergency</p>
              <a href="tel:1300309361" className="text-lg font-bold text-gray-900 hover:text-primary-600 transition-colors">
                1300 309 361
              </a>
            </div>
            <a
              href="tel:1300309361"
              className="btn-emergency flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.25 1.12.37 2.32.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <span>Call Now</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600 p-3 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-4 space-y-2">
              <div className="bg-emergency-50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold text-emergency-600 mb-1">24/7 Emergency</p>
                <a href="tel:1300309361" className="text-xl font-bold text-gray-900 hover:text-primary-600 transition-colors block">
                  1300 309 361
                </a>
                <a href="tel:1300309361" className="btn-emergency w-full justify-center mt-3 flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.25 1.12.37 2.32.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <span>Call Now</span>
                </a>
              </div>

              <Link href="/" className="block px-3 py-3 text-gray-700 hover:text-primary-600 font-medium min-h-[44px] flex items-center">Home</Link>
              <Link href="/water-damage" className="block px-3 py-3 text-gray-700 hover:text-primary-600 font-medium min-h-[44px] flex items-center">Water Damage</Link>
              <Link href="/fire-damage" className="block px-3 py-3 text-gray-700 hover:text-primary-600 font-medium min-h-[44px] flex items-center">Fire Damage</Link>
              <Link href="/mould-remediation" className="block px-3 py-3 text-gray-700 hover:text-primary-600 font-medium min-h-[44px] flex items-center">Mould Remediation</Link>
              <Link href="/about" className="block px-3 py-3 text-gray-700 hover:text-primary-600 font-medium min-h-[44px] flex items-center">About</Link>
              <Link href="/contact" className="block px-3 py-3 text-gray-700 hover:text-primary-600 font-medium min-h-[44px] flex items-center">Contact</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}