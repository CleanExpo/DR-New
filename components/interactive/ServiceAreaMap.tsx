'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';

interface ServiceArea {
  id: string;
  name: string;
  region: 'brisbane' | 'ipswich' | 'logan';
  responseTime: string;
  premium?: boolean;
  coordinates: { x: number; y: number }; // Percentage-based
}

const SERVICE_AREAS: ServiceArea[] = [
  // Brisbane Premium Areas
  { id: 'hamilton', name: 'Hamilton', region: 'brisbane', responseTime: '30 min', premium: true, coordinates: { x: 52, y: 35 } },
  { id: 'ascot', name: 'Ascot', region: 'brisbane', responseTime: '30 min', premium: true, coordinates: { x: 54, y: 37 } },
  { id: 'new-farm', name: 'New Farm', region: 'brisbane', responseTime: '30 min', premium: true, coordinates: { x: 51, y: 45 } },
  { id: 'toowong', name: 'Toowong', region: 'brisbane', responseTime: '30 min', premium: true, coordinates: { x: 45, y: 48 } },

  // Brisbane Standard
  { id: 'brisbane-cbd', name: 'Brisbane CBD', region: 'brisbane', responseTime: '40 min', coordinates: { x: 50, y: 50 } },
  { id: 'fortitude-valley', name: 'Fortitude Valley', region: 'brisbane', responseTime: '35 min', coordinates: { x: 52, y: 48 } },
  { id: 'south-bank', name: 'South Bank', region: 'brisbane', responseTime: '40 min', coordinates: { x: 50, y: 52 } },
  { id: 'chermside', name: 'Chermside', region: 'brisbane', responseTime: '45 min', coordinates: { x: 54, y: 30 } },

  // Ipswich Premium Areas
  { id: 'karalee', name: 'Karalee', region: 'ipswich', responseTime: '35 min', premium: true, coordinates: { x: 25, y: 50 } },
  { id: 'brookwater', name: 'Brookwater', region: 'ipswich', responseTime: '35 min', premium: true, coordinates: { x: 22, y: 55 } },
  { id: 'springfield-lakes', name: 'Springfield Lakes', region: 'ipswich', responseTime: '40 min', premium: true, coordinates: { x: 28, y: 58 } },

  // Ipswich Standard
  { id: 'ipswich-cbd', name: 'Ipswich CBD', region: 'ipswich', responseTime: '45 min', coordinates: { x: 20, y: 52 } },

  // Logan
  { id: 'logan-central', name: 'Logan Central', region: 'logan', responseTime: '45 min', coordinates: { x: 55, y: 65 } },
  { id: 'springwood', name: 'Springwood', region: 'logan', responseTime: '50 min', coordinates: { x: 58, y: 68 } },
];

const REGION_COLORS = {
  brisbane: { bg: 'bg-primary-100', border: 'border-primary-600', text: 'text-primary-700' },
  ipswich: { bg: 'bg-success-100', border: 'border-success-600', text: 'text-success-700' },
  logan: { bg: 'bg-premium-100', border: 'border-premium-600', text: 'text-premium-700' },
};

export function ServiceAreaMap({ className = '' }: { className?: string }) {
  const [selectedArea, setSelectedArea] = useState<ServiceArea | null>(null);
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Map Container */}
      <div className="relative w-full aspect-[4/3] bg-neutral-50 rounded-xl overflow-hidden border-2 border-neutral-200">
        {/* Stylized Map Background */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Brisbane Region */}
          <path
            d="M 40 25 Q 60 25 65 40 L 65 60 Q 60 70 45 70 Q 35 65 35 50 Z"
            className="fill-primary-50/50 stroke-primary-300"
            strokeWidth="0.5"
          />

          {/* Ipswich Region */}
          <path
            d="M 15 40 Q 25 35 35 45 L 35 65 Q 30 70 20 65 Q 15 60 15 50 Z"
            className="fill-success-50/50 stroke-success-300"
            strokeWidth="0.5"
          />

          {/* Logan Region */}
          <path
            d="M 50 60 Q 65 60 70 75 L 60 80 Q 50 75 50 65 Z"
            className="fill-premium-50/50 stroke-premium-300"
            strokeWidth="0.5"
          />

          {/* Road Lines */}
          <line x1="35" y1="50" x2="65" y2="50" className="stroke-neutral-300" strokeWidth="0.3" />
          <line x1="50" y1="30" x2="50" y2="70" className="stroke-neutral-300" strokeWidth="0.3" />
        </svg>

        {/* Service Area Markers */}
        {SERVICE_AREAS.map((area) => {
          const isSelected = selectedArea?.id === area.id;
          const isHovered = hoveredArea === area.id;
          const colors = REGION_COLORS[area.region];

          return (
            <motion.button
              key={area.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-full"
              style={{ left: `${area.coordinates.x}%`, top: `${area.coordinates.y}%` }}
              onClick={() => setSelectedArea(area)}
              onMouseEnter={() => setHoveredArea(area.id)}
              onMouseLeave={() => setHoveredArea(null)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Select ${area.name}`}
            >
              {/* Pulse Animation */}
              {area.premium && (
                <motion.div
                  className="absolute inset-0 bg-premium-400 rounded-full"
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              {/* Marker */}
              <div
                className={`relative z-10 ${
                  area.premium ? 'w-4 h-4' : 'w-3 h-3'
                } ${colors.bg} ${colors.border} border-2 rounded-full shadow-lg transition-all ${
                  isSelected || isHovered ? 'scale-125' : ''
                }`}
              />

              {/* Label (on hover) */}
              <AnimatePresence>
                {(isHovered || isSelected) && (
                  <motion.div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 ${colors.bg} ${colors.border} border rounded-lg shadow-xl whitespace-nowrap`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <p className={`text-xs font-semibold ${colors.text}`}>
                      {area.name}
                      {area.premium && ' ⭐'}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <p className="text-xs font-semibold text-neutral-900 mb-2">Service Regions</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary-500 rounded-full" />
              <span className="text-xs text-neutral-700">Brisbane</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success-500 rounded-full" />
              <span className="text-xs text-neutral-700">Ipswich</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-premium-500 rounded-full" />
              <span className="text-xs text-neutral-700">Logan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Area Details */}
      <AnimatePresence mode="wait">
        {selectedArea && (
          <motion.div
            className="mt-6 bg-white border-2 border-primary-200 rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  {selectedArea.name}
                  {selectedArea.premium && (
                    <span className="text-sm bg-premium-100 text-premium-700 px-2 py-0.5 rounded-full">
                      Premium Area
                    </span>
                  )}
                </h3>
                <p className="text-sm text-neutral-600 mt-1">
                  {selectedArea.region.charAt(0).toUpperCase() + selectedArea.region.slice(1)} Region
                </p>
              </div>
              <button
                onClick={() => setSelectedArea(null)}
                className="text-neutral-400 hover:text-neutral-600 transition-colors"
                aria-label="Close details"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-lg">
                <Clock className="w-5 h-5 text-primary-600 flex-shrink-0" />
                <div>
                  <p className="text-xs text-neutral-600">Response Time</p>
                  <p className="text-sm font-semibold text-neutral-900">{selectedArea.responseTime}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-success-50 rounded-lg">
                <svg className="w-5 h-5 text-success-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="text-xs text-neutral-600">Availability</p>
                  <p className="text-sm font-semibold text-neutral-900">24/7 Emergency</p>
                </div>
              </div>

              <a
                href="tel:1300309361"
                className="flex items-center gap-3 p-3 bg-emergency-50 rounded-lg hover:bg-emergency-100 transition-colors group"
              >
                <Phone className="w-5 h-5 text-emergency-600 flex-shrink-0 group-hover:animate-pulse" />
                <div>
                  <p className="text-xs text-neutral-600">Call Now</p>
                  <p className="text-sm font-semibold text-emergency-600">1300 309 361</p>
                </div>
              </a>
            </div>

            {selectedArea.premium && (
              <div className="mt-4 p-4 bg-premium-50 border border-premium-200 rounded-lg">
                <p className="text-sm text-premium-900 font-medium">
                  ⭐ Premium Service Area - Priority response with IICRC Master Restorer on-site
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
