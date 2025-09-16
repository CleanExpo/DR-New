'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  {
    id: 'water-damage',
    title: 'Water Damage Restoration',
    description: 'Complete water extraction, drying, and restoration services',
    beforeImage: '/images/optimized/damage/3D Water Damage to a Home.png',
    afterImage: '/images/optimized/damage/Cat 1 - Water Damage Restoration.png',
    features: [
      '24/7 Emergency Response',
      'Advanced Water Extraction',
      'Structural Drying',
      'Mould Prevention'
    ],
    stats: {
      responseTime: '60 min',
      successRate: '99.8%',
      projectsCompleted: '2,500+'
    },
    color: 'from-blue-600 to-cyan-600'
  },
  {
    id: 'fire-damage',
    title: 'Fire & Smoke Restoration',
    description: 'Comprehensive fire damage cleanup and smoke odor removal',
    beforeImage: '/images/optimized/damage/3D Kitchen Fire.png',
    afterImage: '/images/optimized/damage/3D image of a house fire.png',
    features: [
      'Soot & Smoke Removal',
      'Odor Elimination',
      'Content Restoration',
      'Structural Repairs'
    ],
    stats: {
      responseTime: '45 min',
      successRate: '98.5%',
      projectsCompleted: '1,200+'
    },
    color: 'from-orange-600 to-red-600'
  },
  {
    id: 'mould-remediation',
    title: 'Mould Remediation',
    description: 'Safe and thorough mould removal with prevention strategies',
    beforeImage: '/images/optimized/damage/3D Mould on Ceiling.png',
    afterImage: '/images/optimized/damage/3D Water Damage Mould on ceiling.png',
    features: [
      'HEPA Air Filtration',
      'Complete Containment',
      'Safe Removal',
      'Prevention Treatment'
    ],
    stats: {
      responseTime: '90 min',
      successRate: '100%',
      projectsCompleted: '1,800+'
    },
    color: 'from-green-600 to-teal-600'
  }
];

export default function ServiceShowcase() {
  const [activeService, setActiveService] = useState(services[0]);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, percentage)));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, percentage)));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 font-semibold rounded-full text-sm mb-4">
            OUR SERVICES
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Restoration Excellence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See the dramatic difference our professional restoration services make.
            Drag the slider to reveal our transformative results.
          </p>
        </motion.div>

        {/* Service Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {services.map((service, index) => (
            <motion.button
              key={service.id}
              onClick={() => setActiveService(service)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeService.id === service.id
                  ? 'bg-gradient-to-r text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
              style={{
                backgroundImage: activeService.id === service.id ? `linear-gradient(to right, ${service.color.split(' ')[1]}, ${service.color.split(' ')[3]})` : ''
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {service.title}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Before/After Slider */}
            <div className="relative">
              <div
                className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl cursor-ew-resize select-none"
                onMouseMove={handleMouseMove}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onTouchMove={handleTouchMove}
              >
                {/* After Image (Background) */}
                <div className="absolute inset-0">
                  <Image
                    src={activeService.afterImage}
                    alt="After restoration"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    AFTER
                  </div>
                </div>

                {/* Before Image (Overlay) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <div className="relative h-full" style={{ width: '50vw' }}>
                    <Image
                      src={activeService.beforeImage}
                      alt="Before restoration"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      BEFORE
                    </div>
                  </div>
                </div>

                {/* Slider Handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-xl"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Slider Instructions */}
              <motion.div
                className="mt-4 text-center text-gray-500 text-sm"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Drag slider to compare before & after
              </motion.div>
            </div>

            {/* Service Details */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {activeService.title}
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  {activeService.description}
                </p>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-3"
              >
                {activeService.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${activeService.color} flex items-center justify-center flex-shrink-0`}>
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    {activeService.stats.responseTime}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                    {activeService.stats.successRate}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {activeService.stats.projectsCompleted}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Projects</div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex gap-4 pt-6"
              >
                <motion.a
                  href="tel:1300309361"
                  className={`flex-1 px-6 py-4 bg-gradient-to-r ${activeService.color} text-white font-semibold rounded-xl text-center shadow-lg hover:shadow-xl transition-all duration-300`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Emergency Help
                </motion.a>
                <motion.button
                  className="flex-1 px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}