'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ServiceArea {
  id: string;
  name: string;
  coordinates: { x: string; y: string };
  suburbs: string[];
  responseTime: string;
  teamsCoverage: number;
  population: string;
  status: 'primary' | 'secondary' | 'emergency';
  color: string;
}

const serviceAreas: ServiceArea[] = [
  {
    id: 'brisbane',
    name: 'Brisbane CBD & Surrounds',
    coordinates: { x: '50%', y: '40%' },
    suburbs: ['CBD', 'South Brisbane', 'Fortitude Valley', 'New Farm', 'West End', 'Kangaroo Point', 'Spring Hill', 'Milton'],
    responseTime: '30-45 min',
    teamsCoverage: 4,
    population: '500,000+',
    status: 'primary',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'ipswich',
    name: 'Ipswich Region',
    coordinates: { x: '25%', y: '50%' },
    suburbs: ['Ipswich Central', 'Springfield', 'Redbank', 'Goodna', 'Booval', 'Bundamba', 'Ripley', 'Rosewood'],
    responseTime: '45-60 min',
    teamsCoverage: 2,
    population: '230,000+',
    status: 'primary',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'logan',
    name: 'Logan City',
    coordinates: { x: '60%', y: '65%' },
    suburbs: ['Springwood', 'Shailer Park', 'Underwood', 'Meadowbrook', 'Beenleigh', 'Eagleby', 'Waterford', 'Loganholme'],
    responseTime: '40-55 min',
    teamsCoverage: 2,
    population: '350,000+',
    status: 'primary',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'northside',
    name: 'Brisbane Northside',
    coordinates: { x: '45%', y: '20%' },
    suburbs: ['Chermside', 'Aspley', 'Kedron', 'Stafford', 'Mitchelton', 'Everton Park', 'Albany Creek'],
    responseTime: '50-70 min',
    teamsCoverage: 1,
    population: '280,000+',
    status: 'secondary',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'southside',
    name: 'Brisbane Southside',
    coordinates: { x: '55%', y: '55%' },
    suburbs: ['Sunnybank', 'Mount Gravatt', 'Holland Park', 'Carindale', 'Mansfield', 'Wishart', 'Eight Mile Plains'],
    responseTime: '45-60 min',
    teamsCoverage: 2,
    population: '320,000+',
    status: 'secondary',
    color: 'from-indigo-500 to-blue-500'
  }
];

export default function ServiceAreaMap() {
  const [activeArea, setActiveArea] = useState<ServiceArea | null>(serviceAreas[0]);
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center bg-blue-500/20 border border-blue-500/50 text-blue-400 font-semibold px-4 py-2 rounded-full text-sm mb-4">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            SERVICE COVERAGE
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            24/7 Coverage Across SEQ
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Strategic team placement ensures rapid response times throughout Brisbane, Ipswich, and Logan
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Interactive Map */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-blue-800/20 to-purple-800/20 rounded-3xl p-8 border border-white/10 backdrop-blur-sm h-[600px] overflow-hidden"
            >
              {/* Map Container */}
              <div className="relative w-full h-full">
                {/* Grid Lines */}
                <svg className="absolute inset-0 w-full h-full opacity-10">
                  <defs>
                    <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                      <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>

                {/* Service Area Points */}
                {serviceAreas.map((area) => (
                  <motion.div
                    key={area.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{ left: area.coordinates.x, top: area.coordinates.y }}
                    onMouseEnter={() => setHoveredArea(area.id)}
                    onMouseLeave={() => setHoveredArea(null)}
                    onClick={() => setActiveArea(area)}
                    whileHover={{ scale: 1.2 }}
                  >
                    {/* Ripple Effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${area.color} opacity-30`}
                      animate={{
                        scale: [1, 2, 1],
                        opacity: [0.3, 0, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                      style={{ width: '60px', height: '60px', marginLeft: '-30px', marginTop: '-30px' }}
                    />

                    {/* Main Point */}
                    <div
                      className={`relative w-8 h-8 rounded-full bg-gradient-to-r ${area.color} shadow-2xl flex items-center justify-center`}
                    >
                      <div className="w-3 h-3 bg-white rounded-full" />
                    </div>

                    {/* Label */}
                    <motion.div
                      className={`absolute top-10 left-1/2 transform -translate-x-1/2 bg-gray-900/90 text-white px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap backdrop-blur-sm border border-white/20 ${
                        hoveredArea === area.id || activeArea?.id === area.id ? 'opacity-100' : 'opacity-0'
                      } transition-opacity`}
                    >
                      {area.name}
                    </motion.div>
                  </motion.div>
                ))}

                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {serviceAreas.map((area, index) => {
                    if (index === 0) return null;
                    const prevArea = serviceAreas[0];
                    return (
                      <motion.line
                        key={`line-${area.id}`}
                        x1={prevArea.coordinates.x}
                        y1={prevArea.coordinates.y}
                        x2={area.coordinates.x}
                        y2={area.coordinates.y}
                        stroke="white"
                        strokeWidth="1"
                        strokeDasharray="5,5"
                        opacity="0.1"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: index * 0.2 }}
                      />
                    );
                  })}
                </svg>

                {/* HQ Marker */}
                <motion.div
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: '40%', top: '45%' }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="bg-red-600 text-white px-3 py-2 rounded-lg font-bold text-sm shadow-2xl">
                    <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4z" clipRule="evenodd" />
                    </svg>
                    HQ Wacol
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Area Details */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sticky top-20"
            >
              {activeArea ? (
                <>
                  <div className={`inline-flex items-center bg-gradient-to-r ${activeArea.color} text-white px-3 py-1 rounded-full text-sm font-semibold mb-4`}>
                    {activeArea.status === 'primary' ? 'PRIMARY SERVICE AREA' :
                     activeArea.status === 'secondary' ? 'SECONDARY COVERAGE' : 'EMERGENCY ONLY'}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4">{activeArea.name}</h3>

                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Response Time</div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span className="text-white font-semibold">{activeArea.responseTime}</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-400 mb-1">Teams Available</div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                        <span className="text-white font-semibold">{activeArea.teamsCoverage} Teams</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-400 mb-1">Population Served</div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        <span className="text-white font-semibold">{activeArea.population}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-400 mb-2">Suburbs Covered</div>
                    <div className="flex flex-wrap gap-2">
                      {activeArea.suburbs.map((suburb) => (
                        <span
                          key={suburb}
                          className="bg-white/10 text-white/90 px-2 py-1 rounded-lg text-xs"
                        >
                          {suburb}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.a
                    href="tel:1300309361"
                    className="mt-6 w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Request Service
                  </motion.a>
                </>
              ) : (
                <div className="text-center text-gray-400 py-12">
                  <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <p>Select an area on the map to view details</p>
                </div>
              )}
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6 grid grid-cols-2 gap-4"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-white">1.4M+</div>
                <div className="text-xs text-gray-400">Population Covered</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-xs text-gray-400">Availability</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}