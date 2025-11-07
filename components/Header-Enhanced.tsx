'use client';

import Link from 'next/link';
import { Phone, Menu, X, Shield, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function HeaderEnhanced() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-neutral-200'
          : 'bg-white border-b border-neutral-100'
      }`}
    >
      {/* Top Emergency Bar */}
      <div className="bg-gradient-to-r from-emergency-600 to-emergency-700 text-white py-2">
        <div className="container-custom">
          <div className="flex items-center justify-center gap-4 text-sm font-semibold">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 animate-pulse" />
              <span className="hidden sm:inline">24/7 Emergency Service</span>
              <span className="sm:hidden">24/7 Emergency</span>
            </div>
            <span className="hidden md:inline">|</span>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">IICRC Master Restorer</span>
              <span className="sm:hidden">IICRC Master</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container-custom">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 focus-visible-enhanced"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Shield className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <div>
                <div className="font-display font-extrabold text-lg md:text-xl text-neutral-900 leading-none tracking-tight">
                  Disaster Recovery
                </div>
                <div className="text-xs text-neutral-600 font-semibold hidden sm:block">
                  Brisbane • Ipswich • Logan
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/services"
              className="text-neutral-700 hover:text-primary-600 font-semibold transition-colors duration-200 focus-visible-enhanced"
            >
              Services
            </Link>
            <Link
              href="/service-areas"
              className="text-neutral-700 hover:text-primary-600 font-semibold transition-colors duration-200 focus-visible-enhanced"
            >
              Service Areas
            </Link>
            <Link
              href="/about-phil-mcgurk"
              className="text-neutral-700 hover:text-primary-600 font-semibold transition-colors duration-200 focus-visible-enhanced"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-neutral-700 hover:text-primary-600 font-semibold transition-colors duration-200 focus-visible-enhanced"
            >
              Contact
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            {/* Emergency Call Button - Desktop */}
            <Link
              href="tel:1300309361"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emergency-600 to-emergency-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 focus-visible-enhanced group"
            >
              <Phone className="w-5 h-5 group-hover:animate-pulse" />
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] opacity-90">Emergency</span>
                <span className="text-sm">1300 309 361</span>
              </div>
            </Link>

            {/* Emergency Call Button - Mobile */}
            <Link
              href="tel:1300309361"
              className="sm:hidden inline-flex items-center justify-center w-11 h-11 bg-gradient-to-r from-emergency-600 to-emergency-700 text-white rounded-lg shadow-lg active:shadow-md transition-all duration-200"
            >
              <Phone className="w-5 h-5" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors duration-200 focus-visible-enhanced"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-neutral-900" />
              ) : (
                <Menu className="w-6 h-6 text-neutral-900" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden border-t border-neutral-200 bg-white transition-all duration-300 ${
          mobileMenuOpen
            ? 'max-h-96 opacity-100'
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <nav className="container-custom py-4 space-y-1">
          <Link
            href="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 text-neutral-700 hover:bg-primary-50 hover:text-primary-700 rounded-lg font-semibold transition-colors duration-200"
          >
            Services
          </Link>
          <Link
            href="/service-areas"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 text-neutral-700 hover:bg-primary-50 hover:text-primary-700 rounded-lg font-semibold transition-colors duration-200"
          >
            Service Areas
          </Link>
          <Link
            href="/about-phil-mcgurk"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 text-neutral-700 hover:bg-primary-50 hover:text-primary-700 rounded-lg font-semibold transition-colors duration-200"
          >
            About Phill McGurk
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 text-neutral-700 hover:bg-primary-50 hover:text-primary-700 rounded-lg font-semibold transition-colors duration-200"
          >
            Contact Us
          </Link>
          <Link
            href="/book-service"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 bg-primary-600 text-white hover:bg-primary-700 rounded-lg font-bold text-center transition-colors duration-200 mt-2"
          >
            Book Free Assessment
          </Link>
        </nav>
      </div>
    </header>
  );
}
