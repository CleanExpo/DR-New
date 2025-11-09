'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Zap, Thermometer, Droplets, Wind, Search, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface EquipmentItem {
  id: string;
  title: string;
  image: string;
  category: 'extraction' | 'drying' | 'detection' | 'air-treatment' | 'specialized';
  description: string;
  capabilities: string[];
  certifications: string[];
  icon: React.ElementType;
}

const equipmentData: EquipmentItem[] = [
  {
    id: 'dehumidifier',
    title: '3D Industrial Dehumidifier',
    image: '/images/optimized/equipment/3D Model Dehumidifier.png',
    category: 'drying',
    description: 'Professional-grade dehumidifiers capable of removing massive amounts of moisture from air and materials.',
    capabilities: ['High-capacity moisture extraction', 'Continuous operation', 'Energy efficient'],
    certifications: ['IICRC Standard', 'Commercial Grade'],
    icon: Droplets
  },
  {
    id: 'extraction-unit',
    title: '3D Water Extraction Unit',
    image: '/images/optimized/equipment/3D Professional Water Extractor.png',
    category: 'extraction',
    description: 'Powerful water extraction systems for removing standing water and moisture from carpets and flooring.',
    capabilities: ['Rapid water removal', 'Deep carpet extraction', 'Submersible pump capability'],
    certifications: ['Professional Grade', 'IICRC Approved'],
    icon: Zap
  },
  {
    id: 'industrial-fan',
    title: '3D Industrial Drying Fan',
    image: '/images/optimized/equipment/3D Air Mover.png',
    category: 'air-treatment',
    description: 'High-velocity air movers designed to accelerate evaporation and drying processes.',
    capabilities: ['Variable speed control', 'Stackable design', 'Low amperage draw'],
    certifications: ['ETL Listed', 'Energy Star'],
    icon: Wind
  },
  {
    id: 'thermal-camera',
    title: '3D Thermal Imaging Camera',
    image: '/images/optimized/equipment/3D Thermal Fogging.png',
    category: 'detection',
    description: 'Advanced thermal imaging technology for detecting hidden moisture and temperature variations.',
    capabilities: ['Non-invasive detection', 'Real-time imaging', 'Documentation capability'],
    certifications: ['Professional Grade', 'Calibrated'],
    icon: Thermometer
  },
  {
    id: 'moisture-meter',
    title: '3D Moisture Detection Meter',
    image: '/images/optimized/equipment/3D Moisture Meter Reading.png',
    category: 'detection',
    description: 'Precision moisture meters for accurate assessment of material moisture content.',
    capabilities: ['Non-destructive testing', 'Multiple material types', 'Digital display'],
    certifications: ['IICRC Standard', 'Calibrated Daily'],
    icon: Search
  },
  {
    id: 'moisture-reading',
    title: '3D Moisture Meter Reading',
    image: '/images/optimized/equipment/3D Moisture Meter Reading.png',
    category: 'detection',
    description: 'Live demonstration of moisture detection capabilities in real-world applications.',
    capabilities: ['Real-time monitoring', 'Documentation', 'Progress tracking'],
    certifications: ['IICRC Certified', 'Daily Calibration'],
    icon: Search
  },
  {
    id: 'thermal-fogging',
    title: '3D Thermal Fogging Equipment',
    image: '/images/optimized/equipment/3D Thermal Fogging.png',
    category: 'specialized',
    description: 'Specialized thermal fogging equipment for odor neutralization and decontamination.',
    capabilities: ['Odor neutralization', 'Decontamination', 'Fine particle distribution'],
    certifications: ['Professional Grade', 'Safety Certified'],
    icon: ShieldCheck
  }
];

const categories = [
  { id: 'all', label: 'All Equipment', icon: Zap },
  { id: 'extraction', label: 'Water Extraction', icon: Droplets },
  { id: 'drying', label: 'Drying Systems', icon: Wind },
  { id: 'detection', label: 'Detection Tools', icon: Search },
  { id: 'air-treatment', label: 'Air Treatment', icon: Wind },
  { id: 'specialized', label: 'Specialized', icon: ShieldCheck }
];

export default function EquipmentGallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredEquipment = selectedCategory === 'all'
    ? equipmentData
    : equipmentData.filter(item => item.category === selectedCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (lightboxIndex === null) return;

    const maxIndex = filteredEquipment.length - 1;
    if (direction === 'prev') {
      setLightboxIndex(lightboxIndex > 0 ? lightboxIndex - 1 : maxIndex);
    } else {
      setLightboxIndex(lightboxIndex < maxIndex ? lightboxIndex + 1 : 0);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Professional Equipment Gallery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-700 max-w-3xl mx-auto"
          >
            State-of-the-art disaster recovery equipment ensuring fast, effective, and safe restoration services.
            All equipment is IICRC certified and maintained to the highest standards.
          </motion.p>
        </div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2 px-6 py-3"
            >
              <category.icon className="w-4 h-4" />
              {category.label}
            </Button>
          ))}
        </motion.div>

        {/* Equipment Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredEquipment.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                layout
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div
                    className="relative aspect-square overflow-hidden"
                    onClick={() => openLightbox(index)}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90 text-gray-900">
                        <item.icon className="w-3 h-3 mr-1" />
                        {categories.find(c => c.id === item.category)?.label || 'Equipment'}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{item.description}</p>

                    <div className="mb-4">
                      <h4 className="font-semibold text-sm text-gray-900 mb-2">Key Capabilities:</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {item.capabilities.map((capability, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-blue-700 rounded-full" />
                            {capability}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {item.certifications.map((cert, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-video">
                  <Image
                    src={filteredEquipment[lightboxIndex].image}
                    alt={filteredEquipment[lightboxIndex].title}
                    fill
                    className="object-contain"
                    sizes="80vw"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {filteredEquipment[lightboxIndex].title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {filteredEquipment[lightboxIndex].description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Capabilities:</h4>
                      <ul className="text-gray-600 space-y-1">
                        {filteredEquipment[lightboxIndex].capabilities.map((capability, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-700 rounded-full" />
                            {capability}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Certifications:</h4>
                      <div className="flex flex-wrap gap-2">
                        {filteredEquipment[lightboxIndex].certifications.map((cert, idx) => (
                          <Badge key={idx} variant="secondary">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <button
                  onClick={() => navigateLightbox('prev')}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={() => navigateLightbox('next')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
                  aria-label="Close gallery"
                >
                  <X className="w-6 h-6" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-blue-700 text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Need Professional Equipment?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Our certified technicians bring this professional-grade equipment directly to your property.
              Fast response, expert operation, guaranteed results.
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 font-bold"
              onClick={() => window.location.href = 'tel:1300309361'}
            >
              Call 1300 309 361 Now
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}