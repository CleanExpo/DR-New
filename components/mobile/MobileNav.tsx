'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, ChevronDown, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function MobileNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setServicesOpen(false);
  };

  const toggleServices = () => {
    setServicesOpen(!servicesOpen);
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Mobile Header - Optimized for touch */}
      <header className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo - Touch friendly */}
          <Link
            href="/"
            className="flex items-center gap-2 min-h-[44px]"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Image
              src="/logos/3D-Disaster-Recovery-Logo.png"
              alt="Disaster Recovery Brisbane"
              width={40}
              height={40}
              priority
              className="h-10 w-auto"
            />
            <span className="text-base font-bold text-blue-900 leading-tight">
              Disaster<br />Recovery
            </span>
          </Link>

          {/* Mobile CTA Phone - Touch friendly (44px) */}
          <Link
            href="tel:1300309361"
            className="flex items-center justify-center min-w-[44px] min-h-[44px] px-4 bg-red-700 text-white font-bold rounded-lg hover:bg-red-800 active:bg-red-900 transition-colors shadow-md"
            aria-label="Call 1300 309 361"
          >
            <Phone className="w-5 h-5" />
          </Link>

          {/* Hamburger Menu - Touch friendly (44px) */}
          <button
            onClick={toggleMobileMenu}
            className="flex items-center justify-center min-w-[44px] min-h-[44px] p-2 text-gray-700 hover:text-blue-600 active:bg-gray-100 rounded-lg transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer - Full screen with smooth animations */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />

        {/* Drawer - Slide from right */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-out overflow-y-auto ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Image
                src="/logos/3D-Disaster-Recovery-Logo.png"
                alt="Disaster Recovery Brisbane"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <span className="font-bold text-blue-900">Menu</span>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="flex items-center justify-center min-w-[44px] min-h-[44px] p-2 text-gray-500 hover:text-gray-700 active:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Emergency CTA - Prominent in drawer */}
          <div className="p-6 bg-red-50 border-b border-red-100">
            <Link
              href="tel:1300309361"
              onClick={toggleMobileMenu}
              className="flex items-center justify-center min-h-[52px] px-6 py-4 bg-red-700 text-white font-bold text-lg rounded-xl hover:bg-red-800 active:bg-red-900 transition-colors shadow-lg active:shadow-md"
              aria-label="Call 1300 309 361 for emergency assistance"
            >
              <Phone className="w-5 h-5 mr-2" />
              1300 309 361
            </Link>
            <p className="text-center text-xs text-red-700 mt-2 font-medium">
              24/7 Emergency Response
            </p>
          </div>

          {/* Navigation Links - Touch optimized (min 44px) */}
          <nav className="flex flex-col p-4 space-y-1">
            <Link
              href="/"
              onClick={toggleMobileMenu}
              className="flex items-center min-h-[48px] px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 active:bg-blue-100 rounded-xl font-medium transition-colors"
            >
              Home
            </Link>

            {/* Services Accordion */}
            <div className="border-t border-gray-100 pt-2">
              <button
                onClick={toggleServices}
                className="w-full flex items-center justify-between min-h-[48px] px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 active:bg-blue-100 rounded-xl font-medium transition-colors"
                aria-expanded={servicesOpen}
              >
                Services
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    servicesOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Services Submenu */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  servicesOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="ml-4 mt-1 space-y-1 border-l-2 border-blue-200 pl-4">
                  <Link
                    href="/services/water-damage"
                    onClick={toggleMobileMenu}
                    className="block min-h-[44px] px-3 py-2 text-sm text-gray-600 hover:text-blue-600 active:bg-blue-50 rounded-lg transition-colors"
                  >
                    <div className="font-semibold">Water Damage</div>
                    <div className="text-xs text-gray-500">24/7 Emergency</div>
                  </Link>
                  <Link
                    href="/services/fire-damage-restoration"
                    onClick={toggleMobileMenu}
                    className="block min-h-[44px] px-3 py-2 text-sm text-gray-600 hover:text-blue-600 active:bg-blue-50 rounded-lg transition-colors"
                  >
                    <div className="font-semibold">Fire Damage</div>
                    <div className="text-xs text-gray-500">Smoke & Soot</div>
                  </Link>
                  <Link
                    href="/services/mould-remediation"
                    onClick={toggleMobileMenu}
                    className="block min-h-[44px] px-3 py-2 text-sm text-gray-600 hover:text-blue-600 active:bg-blue-50 rounded-lg transition-colors"
                  >
                    <div className="font-semibold">Mould Remediation</div>
                    <div className="text-xs text-gray-500">Safe Removal</div>
                  </Link>
                  <Link
                    href="/services/storm-damage"
                    onClick={toggleMobileMenu}
                    className="block min-h-[44px] px-3 py-2 text-sm text-gray-600 hover:text-blue-600 active:bg-blue-50 rounded-lg transition-colors"
                  >
                    <div className="font-semibold">Storm Damage</div>
                    <div className="text-xs text-gray-500">Emergency Storm</div>
                  </Link>
                  <Link
                    href="/services/commercial"
                    onClick={toggleMobileMenu}
                    className="block min-h-[44px] px-3 py-2 text-sm text-gray-600 hover:text-blue-600 active:bg-blue-50 rounded-lg transition-colors"
                  >
                    <div className="font-semibold">Commercial</div>
                    <div className="text-xs text-gray-500">Large Projects</div>
                  </Link>
                  <Link
                    href="/services"
                    onClick={toggleMobileMenu}
                    className="block min-h-[44px] px-3 py-2 text-sm text-blue-600 hover:text-blue-700 active:bg-blue-50 rounded-lg font-semibold transition-colors mt-2 border-t border-gray-200 pt-3"
                  >
                    View All Services →
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/about-phil-mcgurk"
              onClick={toggleMobileMenu}
              className="flex items-center min-h-[48px] px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 active:bg-blue-100 rounded-xl font-medium transition-colors"
            >
              About Master Restorer
            </Link>

            <Link
              href="/pricing"
              onClick={toggleMobileMenu}
              className="flex items-center min-h-[48px] px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 active:bg-blue-100 rounded-xl font-medium transition-colors"
            >
              Pricing
            </Link>

            <Link
              href="/insurance"
              onClick={toggleMobileMenu}
              className="flex items-center min-h-[48px] px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 active:bg-blue-100 rounded-xl font-medium transition-colors"
            >
              Insurance Claims
            </Link>

            <Link
              href="/contact"
              onClick={toggleMobileMenu}
              className="flex items-center min-h-[48px] px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 active:bg-blue-100 rounded-xl font-medium transition-colors"
            >
              Contact Us
            </Link>

            {/* Service Areas */}
            <div className="border-t border-gray-100 pt-2 mt-2">
              <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Service Areas
              </p>
              <Link
                href="/service-areas/brisbane"
                onClick={toggleMobileMenu}
                className="flex items-center min-h-[44px] px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 active:bg-blue-100 rounded-xl transition-colors"
              >
                Brisbane
              </Link>
              <Link
                href="/service-areas/ipswich"
                onClick={toggleMobileMenu}
                className="flex items-center min-h-[44px] px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 active:bg-blue-100 rounded-xl transition-colors"
              >
                Ipswich
              </Link>
              <Link
                href="/service-areas/logan"
                onClick={toggleMobileMenu}
                className="flex items-center min-h-[44px] px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 active:bg-blue-100 rounded-xl transition-colors"
              >
                Logan
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
