'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { cn } from '@/lib/utils';
import { Menu, X, Phone } from 'lucide-react';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Simple navigation items for local Brisbane disaster recovery service
  const navigationItems = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/insurance', label: 'Insurance' },
    { href: '/contact', label: 'Contact' }
  ];

  const MobileMenu: React.FC = () => (
    <div
      className={cn(
        "fixed inset-0 z-50 lg:hidden",
        "transform transition-all duration-300 ease-in-out",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black transition-opacity duration-300",
          mobileMenuOpen ? "opacity-50" : "opacity-0"
        )}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Menu Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <span className="text-lg font-semibold text-neutral-900">Disaster Recovery</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-lg hover:bg-neutral-100 transition-colors duration-150"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-150",
                  "hover:bg-neutral-50 hover:text-primary-600",
                  pathname === item.href ? "bg-primary-50 text-primary-600" : "text-neutral-700"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Emergency Contact in Mobile Menu */}
          <div className="mt-6 pt-6 border-t border-neutral-200">
            <a
              href="tel:1300309361"
              className="flex items-center gap-3 px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors duration-150"
            >
              <Phone className="h-5 w-5" />
              1300 309 361
            </a>
            <p className="text-xs text-neutral-500 mt-2 px-4">
              24/7 Emergency Response
            </p>
          </div>
        </nav>
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-neutral-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Logo className="h-8 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150",
                  "hover:bg-neutral-50 hover:text-primary-600",
                  pathname === item.href ? "bg-primary-50 text-primary-600" : "text-neutral-700"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Emergency Contact Button */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <a
              href="tel:1300309361"
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors duration-150"
            >
              <Phone className="h-4 w-4" />
              1300 309 361
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors duration-150"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu />
    </header>
  );
};

export default Header;