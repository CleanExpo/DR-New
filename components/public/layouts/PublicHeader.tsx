'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Phone, AlertCircle } from 'lucide-react'
import type { ReactNode } from 'react'

interface NavItem {
  label: string
  href: string
  description?: string
}

interface NavSection {
  title: string
  items: NavItem[]
}

const servicesMenu: NavSection = {
  title: 'Services',
  items: [
    { label: 'Water Damage Restoration', href: '/services/water-damage', description: 'Emergency water extraction and drying' },
    { label: 'Fire Damage Restoration', href: '/services/fire-damage', description: 'Smoke and soot removal' },
    { label: 'Storm Damage Repair', href: '/services/storm-damage', description: 'Roof and structural repairs' },
    { label: 'Mould Remediation', href: '/services/mould', description: 'Safe mould removal and prevention' },
    { label: 'Emergency Services', href: '/services/emergency', description: '24/7 rapid response' }
  ]
}

const sectorsMenu: NavSection = {
  title: 'Sectors',
  items: [
    { label: 'Residential', href: '/sectors/residential', description: 'Home restoration services' },
    { label: 'Commercial', href: '/sectors/commercial', description: 'Business property recovery' },
    { label: 'Industrial', href: '/sectors/industrial', description: 'Large-scale restoration' },
    { label: 'Strata & Body Corporate', href: '/sectors/strata', description: 'Multi-unit property management' }
  ]
}

const locationsMenu: NavSection = {
  title: 'Locations',
  items: [
    { label: 'Sydney', href: '/locations/sydney', description: 'Greater Sydney metro area' },
    { label: 'Melbourne', href: '/locations/melbourne', description: 'Victoria and surrounds' },
    { label: 'Brisbane', href: '/locations/brisbane', description: 'South-East Queensland' },
    { label: 'Perth', href: '/locations/perth', description: 'Western Australia' },
    { label: 'Adelaide', href: '/locations/adelaide', description: 'South Australia' },
    { label: 'Other Regions', href: '/locations', description: 'View all service areas' }
  ]
}

interface DropdownMenuProps {
  section: NavSection
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
}

function DropdownMenu({ section, isOpen, onToggle, onClose }: DropdownMenuProps) {
  return (
    <div className="relative" onMouseLeave={onClose}>
      <button
        onClick={onToggle}
        onMouseEnter={onToggle}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {section.title}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
          {section.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="block px-4 py-3 hover:bg-emerald-50 transition-colors"
            >
              <div className="font-medium text-gray-900 text-sm">{item.label}</div>
              {item.description && (
                <div className="text-xs text-gray-600 mt-0.5">{item.description}</div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function PublicHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu)
  }

  const closeAllDropdowns = () => {
    setActiveDropdown(null)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    closeAllDropdowns()
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group" onClick={closeMobileMenu}>
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-lg">DR</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-gray-900 text-base leading-tight">
                Disaster Recovery
              </div>
              <div className="text-xs text-emerald-600 font-medium">
                Australia
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            <DropdownMenu
              section={servicesMenu}
              isOpen={activeDropdown === 'services'}
              onToggle={() => toggleDropdown('services')}
              onClose={closeAllDropdowns}
            />
            <DropdownMenu
              section={sectorsMenu}
              isOpen={activeDropdown === 'sectors'}
              onToggle={() => toggleDropdown('sectors')}
              onClose={closeAllDropdowns}
            />
            <DropdownMenu
              section={locationsMenu}
              isOpen={activeDropdown === 'locations'}
              onToggle={() => toggleDropdown('locations')}
              onClose={closeAllDropdowns}
            />
            <Link
              href="/about"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
            >
              About
            </Link>
            <Link
              href="/resources"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
            >
              Resources
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/sign-in"
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/claim"
              className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all"
            >
              <AlertCircle className="w-4 h-4" />
              Report Claim
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {/* Mobile Services */}
            <div className="space-y-1">
              <div className="font-semibold text-gray-900 px-3 py-2 text-sm">{servicesMenu.title}</div>
              {servicesMenu.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="block px-6 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Sectors */}
            <div className="space-y-1 pt-2 border-t border-gray-200">
              <div className="font-semibold text-gray-900 px-3 py-2 text-sm">{sectorsMenu.title}</div>
              {sectorsMenu.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="block px-6 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Locations */}
            <div className="space-y-1 pt-2 border-t border-gray-200">
              <div className="font-semibold text-gray-900 px-3 py-2 text-sm">{locationsMenu.title}</div>
              {locationsMenu.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="block px-6 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Links */}
            <div className="pt-2 border-t border-gray-200">
              <Link
                href="/about"
                onClick={closeMobileMenu}
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors"
              >
                About
              </Link>
              <Link
                href="/resources"
                onClick={closeMobileMenu}
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors"
              >
                Resources
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <Link
                href="/claim"
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm shadow-md transition-colors"
              >
                <AlertCircle className="w-5 h-5" />
                Report Claim
              </Link>
              <Link
                href="/sign-in"
                onClick={closeMobileMenu}
                className="block w-full px-5 py-3 text-center text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
