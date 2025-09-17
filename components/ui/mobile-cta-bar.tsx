'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function MobileCTABar() {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl lg:hidden"
    >
      <div className="grid grid-cols-2 divide-x divide-gray-200">
        {/* Call Now Button */}
        <Link
          href="tel:1300309361"
          className="flex items-center justify-center px-4 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 transition-all duration-300"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <div className="text-left">
              <div className="text-xs font-medium opacity-90">Emergency</div>
              <div className="text-sm font-bold">1300 309 361</div>
            </div>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </div>
        </Link>

        {/* Get Quote Button */}
        <button
          onClick={() => {
            // Scroll to contact form or open modal
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="flex items-center justify-center px-4 py-4 bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <div className="text-left">
              <div className="text-xs font-medium opacity-90">Free</div>
              <div className="text-sm font-bold">Get Quote</div>
            </div>
          </div>
        </button>
      </div>

      {/* Optional: Expandable Quick Actions */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: 'auto' }}
        className="overflow-hidden"
      >
        <div className="bg-gray-50 px-4 py-2 flex gap-2 overflow-x-auto">
          <Link
            href="/services/water-damage-restoration"
            className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 whitespace-nowrap hover:bg-gray-100 transition-colors"
          >
            Water Damage
          </Link>
          <Link
            href="/services/fire-damage-restoration"
            className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 whitespace-nowrap hover:bg-gray-100 transition-colors"
          >
            Fire Damage
          </Link>
          <Link
            href="/services/mould-remediation"
            className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 whitespace-nowrap hover:bg-gray-100 transition-colors"
          >
            Mould Removal
          </Link>
          <Link
            href="/about"
            className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 whitespace-nowrap hover:bg-gray-100 transition-colors"
          >
            About Us
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}