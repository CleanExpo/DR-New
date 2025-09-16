'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';

const certifications = [
  {
    id: 'iicrc',
    name: 'IICRC Certified',
    logo: '/images/optimized/branding/IICRC logo.png',
    description: 'Institute of Inspection, Cleaning and Restoration Certification',
    verificationUrl: 'https://iicrc.org',
    badge: 'Gold Standard'
  },
  {
    id: 'carsi',
    name: 'CARSI Member',
    logo: '/images/optimized/branding/3D CARSI Logo.png',
    description: 'Cleaning & Restoration Services Industry',
    verificationUrl: '#',
    badge: 'Verified Member'
  },
  {
    id: 'nrp',
    name: 'NRP Certified',
    logo: '/images/logos/nrp/nrp-badge-3d.png',
    description: 'National Restoration Provider',
    verificationUrl: '#',
    badge: 'Elite Provider'
  }
];

const achievements = [
  { number: 5000, label: 'Properties Restored', suffix: '+', icon: '🏠' },
  { number: 99.8, label: 'Customer Satisfaction', suffix: '%', icon: '⭐' },
  { number: 15, label: 'Years Excellence', suffix: '+', icon: '🏆' },
  { number: 60, label: 'Minute Response', suffix: 'min', icon: '⚡' }
];

const awards = [
  {
    year: '2024',
    title: 'Excellence in Emergency Response',
    issuer: 'Brisbane Business Awards',
    icon: '🥇'
  },
  {
    year: '2023',
    title: 'Best Restoration Service Provider',
    issuer: 'Queensland Service Excellence',
    icon: '🏅'
  },
  {
    year: '2023',
    title: 'Innovation in Disaster Recovery',
    issuer: 'Australian Restoration Industry',
    icon: '💡'
  }
];

const insurancePartners = [
  'Allianz', 'AAMI', 'Suncorp', 'NRMA', 'QBE', 'CGU', 'Budget Direct', 'Youi'
];

function CountUp({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(easeOutQuart * (end - startValue) + startValue);

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, isInView]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function TrustIndicators() {
  const [activeTab, setActiveTab] = useState('certifications');
  const [hoveredCert, setHoveredCert] = useState<string | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, gray 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center bg-green-100 text-green-700 font-semibold px-4 py-2 rounded-full text-sm mb-4">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            VERIFIED & TRUSTED
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Why Brisbane Trusts Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Industry certifications, proven track record, and verified excellence in disaster recovery services
          </p>
        </motion.div>

        {/* Achievement Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center group hover:shadow-2xl transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-3">{achievement.icon}</div>
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                <CountUp end={achievement.number} suffix={achievement.suffix} />
              </div>
              <div className="text-sm text-gray-600">{achievement.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-12">
          {['certifications', 'awards', 'insurance'].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'certifications' && (
            <motion.div
              key="certifications"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative overflow-hidden group"
                  onMouseEnter={() => setHoveredCert(cert.id)}
                  onMouseLeave={() => setHoveredCert(null)}
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    {cert.badge}
                  </div>

                  {/* Logo */}
                  <div className="h-24 flex items-center justify-center mb-6">
                    <Image
                      src={cert.logo}
                      alt={cert.name}
                      width={120}
                      height={80}
                      className="object-contain filter group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{cert.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{cert.description}</p>

                  {/* Verify Button */}
                  <motion.a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm group"
                    whileHover={{ x: 5 }}
                  >
                    Verify Certification
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </motion.a>

                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    initial={false}
                    animate={{ opacity: hoveredCert === cert.id ? 1 : 0 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'awards' && (
            <motion.div
              key="awards"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {awards.map((award, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, rotateY: -180 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200 relative overflow-hidden"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                >
                  {/* Icon */}
                  <div className="text-6xl mb-4 text-center">{award.icon}</div>

                  {/* Year Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold px-3 py-1 rounded-full text-sm">
                    {award.year}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{award.title}</h3>
                  <p className="text-gray-600 text-sm">{award.issuer}</p>

                  {/* Decorative Element */}
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-2xl" />
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'insurance' && (
            <motion.div
              key="insurance"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Insurance Partners</h3>
                <p className="text-gray-600">We work directly with all major insurance companies</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {insurancePartners.map((partner, index) => (
                  <motion.div
                    key={partner}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-gray-50 rounded-xl p-6 flex items-center justify-center hover:bg-blue-50 transition-colors duration-300 group"
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="text-gray-700 font-semibold group-hover:text-blue-600 transition-colors">
                      {partner}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">Direct billing available • Claims assistance • Documentation support</p>
                <motion.button
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn About Insurance Claims
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-8 text-white text-center shadow-2xl"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-3xl font-bold">Trust Score: 9.8/10</span>
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <p className="text-white/90 max-w-2xl mx-auto">
            Based on 5,000+ verified customer reviews, industry certifications, and 15+ years of excellence in disaster recovery services
          </p>
        </motion.div>
      </div>
    </section>
  );
}