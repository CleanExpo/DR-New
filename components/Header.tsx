'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, ChevronDown, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [contractorsOpen, setContractorsOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileContractorsOpen, setMobileContractorsOpen] = useState(false);

  const handleMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setContractorsOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setContractorsOpen(false);
    }, 200);
    setDropdownTimeout(timeout);
  };

  const toggleDropdown = () => {
    setContractorsOpen(!contractorsOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setMobileContractorsOpen(false); // Close contractors dropdown when toggling menu
  };

  const toggleMobileContractors = () => {
    setMobileContractorsOpen(!mobileContractorsOpen);
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image
              src="/logos/3D-Disaster-Recovery-Logo.png"
              alt="Disaster Recovery Brisbane - IICRC Master Restorer Phill McGurk - 24/7 Emergency Water Damage, Fire Damage & Mould Restoration Services"
              width={60}
              height={60}
              priority
              className="h-12 w-auto"
              title="Disaster Recovery Brisbane | IICRC Master Restorer | 1300 309 361"
            />
            <span className="text-xl font-bold text-blue-900">Disaster Recovery</span>
          </Link>

          {/* Navigation - Pill Style */}
          <nav className="hidden lg:flex items-center gap-2">
            <Link
              href="/"
              className="px-6 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition-colors"
            >
              🏠 Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-1 px-6 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition-colors cursor-pointer"
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform ${contractorsOpen ? 'rotate-180' : ''}`} />
              </button>

              {contractorsOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-[100]"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href="/services/water-damage"
                    className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <div className="font-semibold">Water Damage Restoration</div>
                    <div className="text-xs text-gray-500 mt-0.5">24/7 Emergency Response</div>
                  </Link>
                  <Link
                    href="/services/fire-damage-restoration"
                    className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <div className="font-semibold">Fire Damage Restoration</div>
                    <div className="text-xs text-gray-500 mt-0.5">Smoke & Soot Removal</div>
                  </Link>
                  <Link
                    href="/services/mould-remediation"
                    className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <div className="font-semibold">Mould Remediation</div>
                    <div className="text-xs text-gray-500 mt-0.5">Safe Mould Removal</div>
                  </Link>
                  <Link
                    href="/services/storm-damage"
                    className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <div className="font-semibold">Storm Damage</div>
                    <div className="text-xs text-gray-500 mt-0.5">Emergency Storm Response</div>
                  </Link>
                  <Link
                    href="/services/commercial"
                    className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <div className="font-semibold">Commercial Services</div>
                    <div className="text-xs text-gray-500 mt-0.5">Large Scale Projects</div>
                  </Link>
                  <div className="border-t border-gray-200 my-2"></div>
                  <Link
                    href="/services"
                    className="block px-4 py-3 text-blue-600 hover:bg-blue-50 font-semibold transition-colors"
                  >
                    View All Services →
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/about-phil-mcgurk"
              className="px-6 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition-colors"
            >
              About
            </Link>

            <Link
              href="/pricing"
              className="px-6 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition-colors"
            >
              Pricing
            </Link>

            {/* Insurance Dropdown */}
            <div className="relative group">
              <Link
                href="/insurance"
                className="flex items-center gap-1 px-6 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition-colors"
              >
                Insurance
                <ChevronDown className="w-4 h-4" />
              </Link>
            </div>

            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Emergency CTA - Large Phone Button */}
          <Link
            href="tel:1300309361"
            className="hidden lg:inline-flex items-center px-8 py-4 bg-red-600 text-white font-bold text-lg rounded-full hover:bg-red-700 transition-all shadow-lg hover:shadow-xl"
            aria-label="Call 1300 309 361 for immediate emergency assistance"
          >
            <Phone className="w-5 h-5 mr-2" />
            📞 1300 309 361
          </Link>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-[60] md:hidden"
            onClick={toggleMobileMenu}
            aria-hidden="true"
          />

          {/* Drawer */}
          <div className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl z-[70] md:hidden overflow-y-auto">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Image
                  src="/logos/3D-Disaster-Recovery-Logo.png"
                  alt="Disaster Recovery Brisbane"
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                />
                <span className="font-bold text-blue-900">Menu</span>
              </div>
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-gray-500 hover:text-gray-700"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Emergency CTA in Mobile Menu */}
            <div className="p-6 bg-red-50 border-b border-red-100">
              <Link
                href="tel:1300309361"
                onClick={toggleMobileMenu}
                className="flex items-center justify-center px-6 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
                aria-label="Call 1300 309 361 for emergency assistance"
              >
                <Phone className="w-5 h-5 mr-2" />
                1300 309 361
              </Link>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col p-4">
              <Link
                href="/services"
                onClick={toggleMobileMenu}
                className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-colors"
              >
                Services
              </Link>

              <Link
                href="/service-areas"
                onClick={toggleMobileMenu}
                className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-colors"
              >
                Service Areas
              </Link>

              {/* For Contractors - Mobile Accordion */}
              <div className="border-t border-gray-100 mt-2 pt-2">
                <button
                  onClick={toggleMobileContractors}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-colors"
                  aria-expanded={mobileContractorsOpen}
                >
                  For Contractors
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileContractorsOpen ? 'rotate-180' : ''}`} />
                </button>

                {mobileContractorsOpen && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-blue-200 pl-4">
                    <a
                      href="https://www.nrpg.business"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={toggleMobileMenu}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <div className="font-semibold">NRPG Resources</div>
                      <div className="text-xs text-gray-500">National Restoration Professionals</div>
                    </a>
                    <a
                      href="https://www.carsi.com.au"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={toggleMobileMenu}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <div className="font-semibold">CARSI Training</div>
                      <div className="text-xs text-gray-500">IICRC CECs & Courses</div>
                    </a>
                    <Link
                      href="/contractor-portal"
                      onClick={toggleMobileMenu}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <div className="font-semibold">Contractor Portal</div>
                      <div className="text-xs text-gray-500">Login to account</div>
                    </Link>
                    <Link
                      href="/training"
                      onClick={toggleMobileMenu}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <div className="font-semibold">IICRC CECs</div>
                      <div className="text-xs text-gray-500">Continuing education</div>
                    </Link>
                    <div className="border-t border-gray-200 my-2"></div>
                    <a
                      href="https://www.nrpg.business"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={toggleMobileMenu}
                      className="block px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                    >
                      Join NRPG Network →
                    </a>
                  </div>
                )}
              </div>

              <Link
                href="/contact"
                onClick={toggleMobileMenu}
                className="px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
