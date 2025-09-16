'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const CommunityImpact = () => {
  const [activeCategory, setActiveCategory] = useState('disaster-relief');

  const impactStats = {
    familiesHelped: '10,000+',
    volunteersHours: '50,000+',
    donationsValue: '$5M+',
    communitiesServed: '200+'
  };

  const initiatives = {
    'disaster-relief': [
      {
        title: 'Queensland Flood Relief Fund',
        description: 'Free emergency restoration for 500+ vulnerable families during 2022-2024 floods.',
        impact: '500 families assisted',
        value: '$2.5M services donated',
        icon: '🏠'
      },
      {
        title: 'Bushfire Recovery Initiative',
        description: 'Rapid response teams deployed at no cost to rural communities affected by bushfires.',
        impact: '200 properties restored',
        value: '$1.8M in free services',
        icon: '🔥'
      },
      {
        title: 'Emergency Shelter Program',
        description: 'Partnering with Red Cross to provide immediate temporary accommodation.',
        impact: '1,000+ nights provided',
        value: 'Ongoing partnership',
        icon: '🏨'
      }
    ],
    'education': [
      {
        title: 'Disaster Preparedness Academy',
        description: 'Free community workshops teaching disaster preparation and response.',
        impact: '5,000+ residents trained',
        value: '100 workshops annually',
        icon: '📚'
      },
      {
        title: 'School Safety Initiative',
        description: 'Complimentary safety assessments and emergency planning for schools.',
        impact: '150 schools protected',
        value: 'All Brisbane schools eligible',
        icon: '🎓'
      },
      {
        title: 'Trade Skills Scholarship',
        description: 'Full apprenticeships for disadvantaged youth in restoration trades.',
        impact: '50 apprentices trained',
        value: '$500K in scholarships',
        icon: '🛠️'
      }
    ],
    'environment': [
      {
        title: 'Waterway Restoration Project',
        description: 'Cleaning and restoring Brisbane River and tributaries after flood events.',
        impact: '50km waterways cleaned',
        value: '10 tonnes debris removed',
        icon: '🌊'
      },
      {
        title: 'Urban Forest Recovery',
        description: 'Replanting program replacing trees lost to storms and disasters.',
        impact: '10,000 trees planted',
        value: 'Carbon neutral by 2025',
        icon: '🌳'
      },
      {
        title: 'Wildlife Habitat Restoration',
        description: 'Rebuilding native animal habitats damaged by natural disasters.',
        impact: '20 habitats restored',
        value: 'Partnership with WWF',
        icon: '🦘'
      }
    ]
  };

  const partnerships = [
    { name: 'Red Cross Australia', role: 'Emergency Response Partner', logo: '🏥' },
    { name: 'Salvation Army', role: 'Community Support', logo: '🛡️' },
    { name: 'RSPCA Queensland', role: 'Animal Rescue', logo: '🐾' },
    { name: 'Habitat for Humanity', role: 'Housing Partner', logo: '🏗️' },
    { name: 'Brisbane City Council', role: 'Municipal Partner', logo: '🏛️' },
    { name: 'Queensland SES', role: 'Emergency Services', logo: '🚨' }
  ];

  const testimonials = [
    {
      quote: 'When we lost everything in the floods, Disaster Recovery Brisbane not only restored our home but restored our hope. They refused payment and treated us like family.',
      author: 'Mary Thompson',
      role: 'Flood Survivor, West End',
      year: '2024'
    },
    {
      quote: 'Their disaster preparedness training saved our community center. When flooding hit, we knew exactly what to do thanks to their free workshops.',
      author: 'James Liu',
      role: 'Community Center Director',
      year: '2023'
    },
    {
      quote: 'The scholarship program gave my son a career and future he never dreamed possible. They\'re changing lives, not just fixing buildings.',
      author: 'Sandra Mitchell',
      role: 'Scholarship Parent',
      year: '2024'
    }
  ];

  const categories = [
    { id: 'disaster-relief', label: 'Disaster Relief', icon: '🆘' },
    { id: 'education', label: 'Education & Training', icon: '📖' },
    { id: 'environment', label: 'Environmental', icon: '🌍' }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-red-50 rounded-full px-6 py-2 mb-6">
            <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span className="text-red-700 font-semibold">Community First</span>
          </div>

          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Beyond Business:
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600">
              Rebuilding Communities Together
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Our commitment extends far beyond commercial success. We're dedicated to strengthening
            the communities we serve through meaningful action and lasting impact.
          </p>

          {/* Impact Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {Object.entries(impactStats).map(([key, value], index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="text-3xl font-bold text-red-600 mb-2">{value}</div>
                <div className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Initiative Categories */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-xl shadow-lg p-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active Initiatives */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {initiatives[activeCategory].map((initiative, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300"
            >
              <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 text-white">
                <span className="text-4xl mb-3 block">{initiative.icon}</span>
                <h3 className="text-xl font-bold">{initiative.title}</h3>
              </div>

              <div className="p-6">
                <p className="text-gray-600 mb-6">{initiative.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Impact</span>
                    <span className="text-sm font-semibold text-gray-900">{initiative.impact}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-500">Value</span>
                    <span className="text-sm font-semibold text-red-600">{initiative.value}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Community Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-3xl p-12 mb-20"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Community Partners</h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {partnerships.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 text-center"
              >
                <span className="text-3xl block mb-2">{partner.logo}</span>
                <div className="font-semibold text-gray-900 text-sm">{partner.name}</div>
                <div className="text-xs text-gray-500 mt-1">{partner.role}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Community Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">Voices from Our Community</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg relative"
              >
                <div className="absolute top-6 left-6 text-6xl text-red-100">"</div>
                <div className="relative z-10">
                  <p className="text-gray-700 mb-6 italic leading-relaxed">
                    {testimonial.quote}
                  </p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                    <div className="text-xs text-red-600 mt-1">{testimonial.year}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-red-600 to-pink-600 rounded-3xl p-12 text-center text-white"
        >
          <h3 className="text-3xl font-bold mb-4">Join Our Community Mission</h3>
          <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
            Together, we're not just recovering from disasters—we're building a more resilient,
            compassionate, and connected Queensland.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 font-bold py-4 px-8 rounded-xl hover:bg-red-50 transition-colors">
              Volunteer With Us
            </button>
            <button className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white/10 transition-colors">
              Partner With Us
            </button>
            <button className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white/10 transition-colors">
              Donate to Our Cause
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityImpact;