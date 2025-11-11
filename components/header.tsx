"use client"

import { useState, useEffect, useRef } from "react"
import { Phone, Menu, X, ChevronDown, Shield, Droplets, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [insuranceOpen, setInsuranceOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setServicesOpen(false)
        setInsuranceOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-3 group">
              {/* Logo Icon with Pattern */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-red-600 rounded-lg blur-sm opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-red-600 p-2.5 rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="relative w-8 h-8">
                    {/* Shield Icon */}
                    <Shield className="w-full h-full text-white" strokeWidth={2.5} fill="currentColor" />
                    {/* Water Droplet Overlay */}
                    <Droplets className="absolute -top-1 -right-1 w-3 h-3 text-blue-200" fill="currentColor" />
                    {/* Fire Icon Overlay */}
                    <Flame className="absolute -bottom-1 -left-1 w-3 h-3 text-red-200" fill="currentColor" />
                  </div>
                </div>
              </div>
              {/* Logo Text */}
              <div className="flex flex-col">
                <span className="text-lg font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-red-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-red-700 transition-all duration-300">
                  Disaster Recovery
                </span>
                <span className="text-[10px] text-gray-500 font-medium -mt-0.5">
                  Master Restorer
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav ref={navRef} className="hidden md:flex items-center gap-1">
            {/* Services */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setServicesOpen(!servicesOpen)
                  setInsuranceOpen(false)
                }}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-700 hover:text-foreground transition-colors"
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && (
                <div 
                  className="absolute top-full left-0 mt-1 w-[280px] bg-white border border-gray-200 rounded-md shadow-lg z-50 p-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <a
                    href="/services/water-damage-restoration"
                    className="block px-3 py-2 text-sm text-gray-900 hover:bg-blue-100 transition-colors rounded-md"
                  >
                    Water Damage Restoration
                  </a>
                  <a
                    href="/services/mould-remediation"
                    className="block px-3 py-2 text-sm text-gray-900 hover:bg-slate-100 transition-colors rounded-md"
                  >
                    Mould Remediation
                  </a>
                  <a
                    href="/services/fire-damage-restoration"
                    className="block px-3 py-2 text-sm text-gray-900 hover:bg-slate-100 transition-colors rounded-md"
                  >
                    Fire Damage Restoration
                  </a>
                  <a
                    href="/services/storm-damage-restoration"
                    className="block px-3 py-2 text-sm text-gray-900 hover:bg-slate-100 transition-colors rounded-md"
                  >
                    Storm Damage Restoration
                  </a>
                  <a
                    href="/services/sewage-remediation"
                    className="block px-3 py-2 text-sm text-gray-900 hover:bg-slate-100 transition-colors rounded-md"
                  >
                    Sewage Remediation
                  </a>
                  <a
                    href="/services/flood-water-restoration"
                    className="block px-3 py-2 text-sm text-gray-900 hover:bg-slate-100 transition-colors rounded-md"
                  >
                    Flood Water Restoration
                  </a>
                  <a
                    href="/services/burst-pipe-restoration"
                    className="block px-3 py-2 text-sm text-gray-900 hover:bg-slate-100 transition-colors rounded-md"
                  >
                    Burst Pipe Restoration
                  </a>
                  <a
                    href="/services/commercial-water-damage"
                    className="block px-3 py-2 text-sm text-gray-900 hover:bg-slate-100 transition-colors rounded-md"
                  >
                    Commercial Water Damage
                  </a>
                  <a
                    href="/services/emergency-response"
                    className="block px-3 py-2 text-sm text-gray-900 hover:bg-slate-100 transition-colors rounded-md"
                  >
                    24/7 Emergency Response
                  </a>
                </div>
              )}
            </div>

            {/* Insurance */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setInsuranceOpen(!insuranceOpen)
                  setServicesOpen(false)
                }}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-700 hover:text-foreground transition-colors"
              >
                Insurance
                <ChevronDown className={`h-4 w-4 transition-transform ${insuranceOpen ? 'rotate-180' : ''}`} />
              </button>
              {insuranceOpen && (
                <div 
                  className="absolute top-full left-0 mt-1 w-[280px] bg-white border border-gray-200 rounded-md shadow-lg z-50 p-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Residential Insurance Section */}
                  <div className="mb-4">
                    <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                      RESIDENTIAL INSURANCE
                    </h3>
                    <div className="space-y-1">
                      <a
                        href="/insurance/allianz"
                        className="block px-3 py-2 text-sm text-gray-900 hover:bg-slate-100 transition-colors rounded-md"
                      >
                        Allianz
                      </a>
                      <a
                        href="/insurance/suncorp"
                        className="block px-3 py-2 text-sm text-gray-900 hover:bg-slate-100 transition-colors rounded-md"
                      >
                        Suncorp
                      </a>
                      <a
                        href="/insurance/racq"
                        className="block px-3 py-2 text-sm text-gray-900 hover:bg-slate-100 transition-colors rounded-md"
                      >
                        RACQ
                      </a>
                      <a
                        href="/insurance/aami"
                        className="block px-3 py-2 text-sm text-gray-900 hover:bg-slate-100 transition-colors rounded-md"
                      >
                        AAMI
                      </a>
                      <a
                        href="/insurance/nrma"
                        className="block px-3 py-2 text-sm text-gray-900 hover:bg-slate-100 transition-colors rounded-md"
                      >
                        NRMA Insurance
                      </a>
                    </div>
                  </div>

                  {/* Commercial Insurance Section */}
                  <div>
                    <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                      COMMERCIAL INSURANCE
                    </h3>
                    <div className="space-y-1">
                      <a
                        href="/insurance/qbe"
                        className="block px-3 py-2 text-sm text-gray-900 hover:bg-slate-100 transition-colors rounded-md"
                      >
                        QBE Insurance
                      </a>
                      <a
                        href="/insurance/vero"
                        className="block px-3 py-2 text-sm text-gray-900 hover:bg-slate-100 transition-colors rounded-md"
                      >
                        Vero Insurance
                      </a>
                      <a
                        href="/insurance/zurich"
                        className="block px-3 py-2 text-sm text-gray-900 hover:bg-slate-100 transition-colors rounded-md"
                      >
                        Zurich Insurance
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Locations */}
            <a
              href="/locations"
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-foreground transition-colors"
            >
              Locations
            </a>

            {/* About */}
            <a
              href="/about"
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-foreground transition-colors"
            >
              About
            </a>

            {/* Contact */}
            <a
              href="/contact"
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Phone Button */}
          <div className="flex items-center gap-4">
            <Button
              asChild
              className="bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg transition-all duration-200 rounded-md px-4 py-2"
            >
              <a href="tel:+611300309361" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="font-semibold">+61 1300 309 361</span>
              </a>
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-slate-700 hover:text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white py-4">
            <nav className="flex flex-col gap-2">
              <a
                href="#services"
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="/locations"
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Locations
              </a>
              <a
                href="#insurance"
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Insurance
              </a>
              <a
                href="/water-damage-restoration"
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Water Damage Restoration
              </a>
              <a
                href="/about"
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="/contact"
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

