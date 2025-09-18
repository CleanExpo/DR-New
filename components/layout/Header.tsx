'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isInsuranceOpen, setIsInsuranceOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const insuranceRef = useRef<HTMLDivElement>(null);

  const services = [
    { name: 'Water Damage Restoration', href: '/services/water-damage' },
    { name: 'Fire & Smoke Damage', href: '/services/fire-damage' },
    { name: 'Mould Remediation', href: '/services/mould-remediation' },
    { name: 'Storm Damage Recovery', href: '/services/storm-damage' },
    { name: 'Biohazard Cleanup', href: '/services/biohazard' },
    { name: 'Commercial Restoration', href: '/services/commercial' },
    { name: 'Sewage Cleanup', href: '/services/sewage' },
  ];

  const insuranceGuide = [
    { name: 'Insurance Guide Overview', href: '/insurance-guide', divider: false },
    { name: 'Home & Building Insurance', href: '/insurance-guide/home-building', divider: false },
    { name: 'Contents Insurance', href: '/insurance-guide/contents', divider: false },
    { name: 'Landlord Insurance', href: '/insurance-guide/landlord', divider: false },
    { name: 'Business Interruption', href: '/insurance-guide/business-interruption', divider: false },
    { name: 'Strata Insurance', href: '/insurance-guide/strata', divider: false },
    { name: 'Flood vs Storm Damage', href: '/insurance-guide/flood-vs-storm', divider: true },
    // Insurance Partners
    { name: 'Our Insurance Partners', href: '/insurance-partners', divider: false },
    { name: 'IAG Insurance', href: '/insurance-partners/iag', divider: false, logo: '/images/insurance-logos/IAG Insurance.png' },
    { name: 'CGU Insurance', href: '/insurance-partners/iag', divider: false, logo: '/images/insurance-logos/CGU Insurance.png' },
    { name: 'Suncorp Group', href: '/insurance-partners/suncorp', divider: false, logo: '/images/insurance-logos/Suncorp Insurance.png' },
    { name: 'Vero Insurance', href: '/insurance-partners/suncorp', divider: false, logo: '/images/insurance-logos/VERO Insurance.png' },
    { name: 'QBE Insurance', href: '/insurance-partners/qbe', divider: false, logo: '/images/insurance-logos/QBE Insurance.png' },
    { name: 'RACQ Insurance', href: '/insurance-partners/racq', divider: false, logo: '/images/insurance-logos/RACQ Insurance.png' },
    { name: 'Allianz', href: '/insurance-partners/allianz', divider: false, logo: '/images/insurance-logos/Allianz Insurance.png' },
    { name: 'Zurich', href: '/insurance-partners/zurich', divider: false, logo: '/images/insurance-logos/Zurich insurance.png' },
    { name: 'Hollards', href: '/insurance-partners/hollards', divider: false, logo: '/images/insurance-logos/Hollard Insurance.png' },
    { name: 'Wesfarmers Insurance', href: '/insurance-partners/wesfarmers', divider: false, logo: '/images/insurance-logos/Westfarmers insurance.png' },
    { name: 'AIG Insurance', href: '/insurance-partners/aig', divider: false, logo: '/images/insurance-logos/AIG Insurance.png' },
    { name: 'Chubb Insurance', href: '/insurance-partners/chubb', divider: false, logo: '/images/insurance-logos/Chubb Insurance.png' },
    { name: 'Guild Insurance', href: '/insurance-partners/guild', divider: false, logo: '/images/insurance-logos/Guild Insurance.png' },
    { name: 'Ansvar Insurance', href: '/insurance-partners/ansvar', divider: false, logo: '/images/insurance-logos/Ansvar Insurance.png' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
      if (insuranceRef.current && !insuranceRef.current.contains(event.target as Node)) {
        setIsInsuranceOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


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
            
            quality={80}
          
            loading="lazy"
          
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          </Link>

          {/* Desktop Navigation with Modern Rounded Boxes */}
          <nav className="hidden md:flex items-center gap-2 flex-1 justify-center max-w-3xl mx-auto" role="navigation" aria-label="Main navigation">
            <Link
              href="/"
              className="group relative px-4 py-2 rounded-full bg-gradient-to-br from-zinc-300 via-gray-200 to-zinc-400 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden border border-zinc-400/30"
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

            {/* Services Dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="group relative px-4 py-2 rounded-full bg-gradient-to-br from-zinc-300 via-gray-200 to-zinc-400 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden flex items-center gap-1"
              >
                <span className="relative z-10 font-semibold text-gray-800 group-hover:text-white transition-colors duration-300">
                  Services
                </span>
                <svg
                  className={`relative z-10 w-4 h-4 text-gray-800 group-hover:text-white transition-all duration-300 ${
                    isServicesOpen ? 'rotate-180' : ''
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>

              {/* Dropdown Menu */}
              {isServicesOpen && (
                <div className="absolute top-full mt-2 left-0 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="block px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 transition-colors duration-200 border-b border-gray-100 last:border-0"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      <span className="text-gray-700 hover:text-blue-600 font-medium">{service.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="group relative px-4 py-2 rounded-full bg-gradient-to-br from-zinc-300 via-gray-200 to-zinc-400 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden"
            >
              <span className="relative z-10 font-semibold text-gray-800 group-hover:text-white transition-colors duration-300">
                About
              </span>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>

            <Link
              href="/pricing"
              className="group relative px-4 py-2 rounded-full bg-gradient-to-br from-zinc-300 via-gray-200 to-zinc-400 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden"
            >
              <span className="relative z-10 font-semibold text-gray-800 group-hover:text-white transition-colors duration-300">
                Pricing
              </span>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>

            {/* Insurance Guide Dropdown */}
            <div className="relative" ref={insuranceRef}>
              <button
                onClick={() => setIsInsuranceOpen(!isInsuranceOpen)}
                className="group relative px-4 py-2 rounded-full bg-gradient-to-br from-zinc-300 via-gray-200 to-zinc-400 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden flex items-center gap-1"
              >
                <span className="relative z-10 font-semibold text-gray-800 group-hover:text-white transition-colors duration-300">
                  Insurance
                </span>
                <svg
                  className={`relative z-10 w-4 h-4 text-gray-800 group-hover:text-white transition-all duration-300 ${
                    isInsuranceOpen ? 'rotate-180' : ''
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>

              {/* Insurance Dropdown Menu */}
              {isInsuranceOpen && (
                <div className="absolute top-full mt-2 right-0 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[600px] overflow-y-auto">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-2 border-b border-blue-200">
                    <span className="text-sm font-semibold text-blue-900">Policy Guides</span>
                  </div>
                  {insuranceGuide.slice(0, 7).map((item) => (
                    <div key={item.href}>
                      <Link
                        href={item.href}
                        className="block px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 transition-colors duration-200"
                        onClick={() => setIsInsuranceOpen(false)}
                      >
                        <span className="text-gray-700 hover:text-blue-600 font-medium text-sm">{item.name}</span>
                      </Link>
                      {item.divider && <div className="border-t border-gray-200"></div>}
                    </div>
                  ))}
                  <div className="bg-gradient-to-r from-green-50 to-green-100 px-4 py-2 border-y border-green-200">
                    <span className="text-sm font-semibold text-green-900">Insurance Partners</span>
                  </div>
                  {insuranceGuide.slice(7).map((partner) => (
                    <Link
                      key={partner.href}
                      href={partner.href}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 transition-colors duration-200 border-b border-gray-100 last:border-0"
                      onClick={() => setIsInsuranceOpen(false)}
                    >
                      {partner.logo && (
                        <Image
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          width={24}
                          height={24}
                          className="object-contain"
                          loading="lazy"
                        />
                      )}
                      <span className="text-gray-700 hover:text-green-600 font-medium text-sm">{partner.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className="group relative px-4 py-2 rounded-full bg-gradient-to-br from-zinc-300 via-gray-200 to-zinc-400 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden"
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
              className="md:hidden p-3 rounded-full bg-gradient-to-br from-zinc-300 via-gray-200 to-zinc-400 text-gray-700 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 hover:text-white transition-all duration-300 shadow-lg hover:shadow-2xl"
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
                className="block mx-2 px-5 py-3 rounded-2xl bg-gradient-to-br from-zinc-300 via-gray-200 to-zinc-400 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 text-gray-800 hover:text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl group overflow-hidden relative"
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
                className="block mx-2 px-5 py-3 rounded-2xl bg-gradient-to-br from-zinc-300 via-gray-200 to-zinc-400 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 text-gray-800 hover:text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl group overflow-hidden relative"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative z-10">Services</span>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>

              <Link
                href="/about"
                className="block mx-2 px-5 py-3 rounded-2xl bg-gradient-to-br from-zinc-300 via-gray-200 to-zinc-400 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 text-gray-800 hover:text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl group overflow-hidden relative"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative z-10">About</span>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>

              <Link
                href="/pricing"
                className="block mx-2 px-5 py-3 rounded-2xl bg-gradient-to-br from-zinc-300 via-gray-200 to-zinc-400 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 text-gray-800 hover:text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl group overflow-hidden relative"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative z-10">Pricing</span>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>

              <Link
                href="/insurance-guide"
                className="block mx-2 px-5 py-3 rounded-2xl bg-gradient-to-br from-zinc-300 via-gray-200 to-zinc-400 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 text-gray-800 hover:text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl group overflow-hidden relative"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="relative z-10">Insurance Guide</span>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>

              <Link
                href="/contact"
                className="block mx-2 px-5 py-3 rounded-2xl bg-gradient-to-br from-zinc-300 via-gray-200 to-zinc-400 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 text-gray-800 hover:text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl group overflow-hidden relative"
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