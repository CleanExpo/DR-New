'use client';

import { memo } from 'react';

const EmergencyContact = memo(() => {
  return (
    <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-6 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.3%22%3E%3Cpath%20d%3D%22M0%2040L40%200H20L0%2020M40%2040V20L20%2040%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Emergency Message */}
          <div className="flex items-center space-x-3">
            <div className="animate-pulse">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <h2 className="text-xl md:text-2xl font-bold">
              Emergency? We're Here 24/7
            </h2>
          </div>

          {/* Call Button */}
          <a
            href="tel:1300309361"
            className="inline-flex items-center bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-200 group"
            aria-label="Call emergency hotline 1300 309 361"
          >
            <svg className="w-6 h-6 mr-3 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.25 1.12.37 2.32.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            <div>
              <div className="text-sm">Call Now</div>
              <div className="text-xl">1300 309 361</div>
            </div>
            <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>

          {/* Response Time Badge */}
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">1 Hour Response</span>
          </div>
        </div>
      </div>
    </section>
  );
});

EmergencyContact.displayName = 'EmergencyContact';

export default EmergencyContact;