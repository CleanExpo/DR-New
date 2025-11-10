"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet"
import { Menu, Phone, ChevronDown } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (dropdown: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setActiveDropdown(dropdown)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white backdrop-blur supports-[backdrop-filter]:bg-white/95">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center space-x-2" aria-label="Disaster Recovery Homepage">
            <Image
              src="/logos/3D-Disaster-Recovery-Logo.png"
              alt="Disaster Recovery Brisbane - IICRC Master Restorer"
              width={60}
              height={60}
              priority
              className="h-14 w-auto"
            />
          </Link>
          <span className="text-xl font-bold text-gray-900 hidden sm:block">Disaster Recovery</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8" aria-label="Main Navigation">
          {/* Services Dropdown */}
          <div className="relative" onMouseEnter={() => handleMouseEnter("services")} onMouseLeave={handleMouseLeave}>
            <button className="text-sm font-medium transition-colors hover:text-red-600 flex items-center gap-1">
              Services <ChevronDown className="h-4 w-4" />
            </button>
            {activeDropdown === "services" && (
              <div
                className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg py-2 max-h-96 overflow-y-auto"
                onMouseEnter={() => handleMouseEnter("services")}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href="/services/water-damage-restoration"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
                >
                  Water Damage Restoration
                </Link>
                <Link
                  href="/services/mould-remediation"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
                >
                  Mould Remediation
                </Link>
                <Link
                  href="/services/fire-damage-restoration"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
                >
                  Fire Damage Restoration
                </Link>
                <Link
                  href="/services/storm-damage-restoration"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
                >
                  Storm Damage Restoration
                </Link>
                <Link
                  href="/services/sewage-remediation"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
                >
                  Sewage Remediation
                </Link>
                <Link
                  href="/services/flood-water-restoration"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
                >
                  Flood Water Restoration
                </Link>
                <Link
                  href="/services/burst-pipe-restoration"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
                >
                  Burst Pipe Restoration
                </Link>
                <Link
                  href="/services/commercial-water-damage"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
                >
                  Commercial Water Damage
                </Link>
                <Link
                  href="/services/24-7-emergency-water-damage"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
                >
                  24/7 Emergency Response
                </Link>
              </div>
            )}
          </div>

          {/* Locations Dropdown */}
          <div className="relative" onMouseEnter={() => handleMouseEnter("locations")} onMouseLeave={handleMouseLeave}>
            <button className="text-sm font-medium transition-colors hover:text-red-600 flex items-center gap-1">
              Locations <ChevronDown className="h-4 w-4" />
            </button>
            {activeDropdown === "locations" && (
              <div
                className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2"
                onMouseEnter={() => handleMouseEnter("locations")}
                onMouseLeave={handleMouseLeave}
              >
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Brisbane</div>
                <Link
                  href="/locations/hamilton"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
                >
                  Hamilton
                </Link>
                <Link
                  href="/locations/ascot"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
                >
                  Ascot
                </Link>
                <Link
                  href="/locations/new-farm"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
                >
                  New Farm
                </Link>
                <Link
                  href="/locations/brisbane"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
                >
                  All Brisbane Suburbs
                </Link>
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase mt-2">Ipswich</div>
                <Link
                  href="/locations/ipswich"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
                >
                  All Ipswich Suburbs
                </Link>
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase mt-2">Logan</div>
                <Link
                  href="/locations/logan"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
                >
                  All Logan Suburbs
                </Link>
              </div>
            )}
          </div>

          {/* Insurance Dropdown */}
          <div className="relative" onMouseEnter={() => handleMouseEnter("insurance")} onMouseLeave={handleMouseLeave}>
            <button className="text-sm font-medium transition-colors hover:text-red-600 flex items-center gap-1">
              Insurance <ChevronDown className="h-4 w-4" />
            </button>
            {activeDropdown === "insurance" && (
              <div
                className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-2 max-h-96 overflow-y-auto"
                onMouseEnter={() => handleMouseEnter("insurance")}
                onMouseLeave={handleMouseLeave}
              >
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Residential Insurance</div>
                <Link
                  href="/insurance/allianz"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
                >
                  Allianz
                </Link>
                <Link
                  href="/insurance/suncorp"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
                >
                  Suncorp
                </Link>
                <Link
                  href="/insurance/racq"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
                >
                  RACQ
                </Link>
                <Link
                  href="/insurance/aami"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
                >
                  AAMI
                </Link>
                <Link
                  href="/insurance/nrma"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
                >
                  NRMA Insurance
                </Link>
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase mt-2">
                  Commercial Insurance
                </div>
                <Link
                  href="/insurance/qbe"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
                >
                  QBE Insurance
                </Link>
                <Link
                  href="/insurance/vero"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
                >
                  Vero Insurance
                </Link>
                <Link
                  href="/insurance/zurich"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
                >
                  Zurich Insurance
                </Link>
              </div>
            )}
          </div>

          <Link href="/about-phil-mcgurk" className="text-sm font-medium transition-colors hover:text-red-600">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium transition-colors hover:text-red-600">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button className="hidden md:flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white" asChild>
            <Link href="tel:1300309361">
              <Phone className="h-4 w-4" />
              1300 309 361
            </Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" aria-label="Open Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8" aria-label="Mobile Navigation">
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-gray-500">Services</span>
                  <Link href="/services/water-damage-restoration" className="text-base pl-4" onClick={() => setIsOpen(false)}>
                    Water Damage
                  </Link>
                  <Link href="/services/fire-damage-restoration" className="text-base pl-4" onClick={() => setIsOpen(false)}>
                    Fire Damage
                  </Link>
                  <Link href="/services/mould-remediation" className="text-base pl-4" onClick={() => setIsOpen(false)}>
                    Mould Remediation
                  </Link>
                  <Link href="/services/storm-damage-restoration" className="text-base pl-4" onClick={() => setIsOpen(false)}>
                    Storm Damage
                  </Link>
                </div>

                <div className="flex flex-col gap-2 mt-4">
                  <span className="text-sm font-semibold text-gray-500">Locations</span>
                  <Link href="/locations/brisbane" className="text-base pl-4" onClick={() => setIsOpen(false)}>
                    Brisbane
                  </Link>
                  <Link href="/locations/ipswich" className="text-base pl-4" onClick={() => setIsOpen(false)}>
                    Ipswich
                  </Link>
                  <Link href="/locations/logan" className="text-base pl-4" onClick={() => setIsOpen(false)}>
                    Logan
                  </Link>
                </div>

                <Link href="/insurance" className="text-lg font-medium mt-4" onClick={() => setIsOpen(false)}>
                  Insurance
                </Link>
                <Link href="/about-phil-mcgurk" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  About
                </Link>
                <Link href="/contact" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  Contact
                </Link>
                <Button className="mt-4 bg-red-600 hover:bg-red-700 text-white" asChild>
                  <Link href="tel:1300309361">
                    <Phone className="mr-2 h-4 w-4" />
                    1300 309 361
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
