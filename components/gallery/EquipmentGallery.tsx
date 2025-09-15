'use client';

import { useState } from 'react';
import Image from 'next/image';
import Card from '../ui/Card';

const equipment = [
  {
    name: '3D Air Mover',
    description: 'High-velocity air movers for rapid structural drying and moisture removal',
    image: '/images/optimized/equipment/3D Air Mover.png',
    category: 'Drying Equipment',
    specifications: [
      'Variable speed control',
      'Low profile design',
      'Stackable for space efficiency',
      'Energy efficient operation'
    ]
  },
  {
    name: 'LGR Dehumidifier',
    description: 'Professional-grade low grain refrigerant dehumidifier for optimal moisture control',
    image: '/images/optimized/equipment/3D LGR Dehumidifier.png',
    category: 'Moisture Control',
    specifications: [
      'Low grain refrigerant technology',
      'Removes up to 180 pints per day',
      'Auto defrost capability',
      'Digital display and controls'
    ]
  },
  {
    name: 'Moisture Meter',
    description: 'Precision moisture detection and monitoring equipment for accurate readings',
    image: '/images/optimized/equipment/3D Moisture Meter Reading.png',
    category: 'Detection Equipment',
    specifications: [
      'Pin and pinless measurement',
      'Material-specific settings',
      'Digital display with backlight',
      'Data logging capability'
    ]
  },
  {
    name: 'Thermal Fogging Equipment',
    description: 'Advanced thermal fogging system for odor elimination and sanitization',
    image: '/images/optimized/equipment/3D Thermal Fogging.png',
    category: 'Odor Control',
    specifications: [
      'Dry fog penetration',
      'Adjustable particle size',
      'Portable operation',
      'Safe for occupied spaces'
    ]
  }
];

const categories = ['All Equipment', ...Array.from(new Set(equipment.map(item => item.category)))];

export default function EquipmentGallery() {
  const [selectedCategory, setSelectedCategory] = useState('All Equipment');

  const filteredEquipment = selectedCategory === 'All Equipment'
    ? equipment
    : equipment.filter(item => item.category === selectedCategory);

  return (
    <section className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-primary-50 rounded-full px-6 py-2 mb-4">
            <svg className="w-5 h-5 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.5-.5a48.998 48.998 0 00-6.812 0l-2.5.5a2 2 0 00-1.022.547l-1.429 1.429A2 2 0 005 18.828V21a1 1 0 001 1h12a1 1 0 001-1v-2.172a2 2 0 00-.571-1.401l-1.429-1.429zM12 9a3 3 0 100-6 3 3 0 000 6z"/>
            </svg>
            <span className="text-primary-700 font-semibold">Professional Equipment</span>
          </div>

          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            State-of-the-Art Restoration Equipment
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We invest in the latest professional-grade equipment to ensure the most effective
            restoration possible. Our advanced technology enables faster drying times, better
            results, and complete restoration of your property.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredEquipment.map((item, index) => (
            <Card key={index} hover className="group overflow-hidden">
              <div className="relative h-64 mb-6 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
