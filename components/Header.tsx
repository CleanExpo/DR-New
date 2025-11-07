'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [contractorsOpen, setContractorsOpen] = useState(false);

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

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/services" className="text-gray-700 hover:text-blue-600 font-medium">
              Services
            </Link>
            <Link href="/service-areas" className="text-gray-700 hover:text-blue-600 font-medium">
              Service Areas
            </Link>

            {/* For Contractors Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setContractorsOpen(true)}
              onMouseLeave={() => setContractorsOpen(false)}
            >
              <button className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium">
                For Contractors
                <ChevronDown className={`w-4 h-4 transition-transform ${contractorsOpen ? 'rotate-180' : ''}`} />
              </button>

              {contractorsOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-[100]">
                  <a
                    href="https://www.nrpg.business"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <div className="font-semibold">NRPG Resources</div>
                    <div className="text-xs text-gray-500 mt-0.5">National Restoration Professionals</div>
                  </a>
                  <a
                    href="https://www.carsi.com.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <div className="font-semibold">CARSI Training</div>
                    <div className="text-xs text-gray-500 mt-0.5">IICRC CECs & Restoration Courses</div>
                  </a>
                  <Link
                    href="/contractor-portal"
                    className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <div className="font-semibold">Contractor Portal</div>
                    <div className="text-xs text-gray-500 mt-0.5">Login to your account</div>
                  </Link>
                  <Link
                    href="/training"
                    className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <div className="font-semibold">IICRC CECs</div>
                    <div className="text-xs text-gray-500 mt-0.5">Continuing education credits</div>
                  </Link>
                  <div className="border-t border-gray-200 my-2"></div>
                  <a
                    href="https://www.nrpg.business"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 text-blue-600 hover:bg-blue-50 font-semibold transition-colors"
                  >
                    Join NRPG Network →
                  </a>
                </div>
              )}
            </div>

            <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
              Contact
            </Link>
          </nav>

          {/* Emergency CTA */}
          <Link
            href="tel:1300309361"
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
          >
            <Phone className="w-4 h-4 mr-2" />
            1300 309 361
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden flex items-center justify-around py-3 border-t border-gray-200 bg-gray-50">
        <Link href="/services" className="text-sm text-gray-700 hover:text-blue-600 font-medium">
          Services
        </Link>
        <Link href="/service-areas" className="text-sm text-gray-700 hover:text-blue-600 font-medium">
          Areas
        </Link>
        <a href="https://www.nrpg.business" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 hover:text-blue-600 font-medium">
          NRPG
        </a>
        <Link href="/contact" className="text-sm text-gray-700 hover:text-blue-600 font-medium">
          Contact
        </Link>
      </nav>
    </header>
  );
}
