'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Phone, Clock, Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
  service: string;
  urgency: string;
  ctaText: string;
  ctaUrl: string;
}

const heroBanners: HeroBanner[] = [
  {
    id: 'water-damage',
    title: 'Water Damage Emergency',
    subtitle: 'Brisbane & Surrounds',
    description: 'Professional water extraction and structural drying services. Prevent mould growth within 24-48 hours.',
    image: '/images/hero/fire-water-damage-restoration.jpg',
    alt: 'Professional water damage restoration equipment and team in action',
    service: 'Water Damage Restoration',
    urgency: 'Critical 24-48hr window',
    ctaText: 'Get Emergency Help',
    ctaUrl: '/services/water-damage'
  },
  {
    id: 'fire-damage',
    title: 'Fire & Smoke Damage',
    subtitle: 'Complete Restoration',
    description: 'Comprehensive fire damage restoration including smoke odor removal and structural repairs.',
    image: '/images/hero/fire-smoke-damage-restoration.jpg',
    alt: 'Fire damage restoration specialists working on smoke damaged property',
    service: 'Fire Damage Restoration',
    urgency: 'Immediate response available',
    ctaText: 'Start Restoration',
    ctaUrl: '/services/fire-damage'
  },
  {
    id: 'mould-remediation',
    title: 'Mould Remediation',
    subtitle: 'Health & Safety Priority',
    description: 'Safe mould removal and remediation using IICRC certified processes. Protect your family\'s health.',
    image: '/images/hero/mould-remediation-services.jpg',
    alt: 'Professional mould remediation specialist in protective gear treating affected area',
    service: 'Mould Remediation',
    urgency: 'Health hazard - act now',
    ctaText: 'Remove Mould Safely',
    ctaUrl: '/services/mould-remediation'
  },
  {
    id: 'commercial-restoration',
    title: 'Commercial Property',
    subtitle: 'Business Continuity',
    description: 'minimise downtime with rapid commercial restoration. Get your business back to normal operations.',
    image: '/images/hero/commercial-restoration-services.jpg',
    alt: 'Commercial disaster recovery team working on office building restoration',
    service: 'Commercial Restoration',
    urgency: 'Business continuity critical',
    ctaText: 'Restore Business',
    ctaUrl: '/services/commercial'
  },
  {
    id: 'biohazard-cleanup',
    title: 'Biohazard Cleanup',
    subtitle: 'Safe & Discreet',
    description: 'Professional biohazard and sewage cleanup with complete safety protocols and discretion.',
    image: '/images/hero/biohazard-remediation-services.png',
    alt: 'Biohazard cleanup specialist in full protective equipment',
    service: 'Biohazard Cleanup',
    urgency: 'Safety protocols essential',
    ctaText: 'Safe Cleanup',
    ctaUrl: '/services/biohazard'
  },
  {
    id: 'sewage-remediation',
    title: 'Sewage Emergency',
    subtitle: 'Category 3 Water',
    description: 'Immediate sewage cleanup and sanitization. Prevent contamination and health risks.',
    image: '/images/hero/sewage-remediation-services.png',
    alt: 'Professional sewage remediation team with specialised equipment',
    service: 'Sewage Remediation',
    urgency: 'Contamination risk - urgent',
    ctaText: 'Emergency Cleanup',
    ctaUrl: '/services/sewage'
  },
  {
    id: 'disaster-recovery',
    title: 'Complete Disaster Recovery',
    subtitle: 'All Services Available',
    description: 'Comprehensive disaster recovery services covering all emergency situations across Brisbane region.',
    image: '/images/hero/disaster-recovery-services.jpg',
    alt: 'Complete disaster recovery team and equipment ready for emergency response',
    service: 'All Disaster Recovery',
    urgency: '24/7 emergency response',
    ctaText: 'Call 1300 309 361',
    ctaUrl: 'tel:1300309361'
  }
];

export default function RotatingHeroBanner() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % heroBanners.length);
    }, 6000); // Change every 6 seconds

    return () => clearInterval(interval);
  }, [isPlaying]);

  const banner = heroBanners[currentBanner];

  return (
    <section className="relative min-h-screen flex items-centre justify-centre overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={banner.id}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1 }}
            className="relative w-full h-full"
          >
            <Image
              src={banner.image}
              alt={banner.alt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-white">
        <div className="max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Service Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <Badge variant="secondary" className="bg-red-600/90 text-white text-sm font-semibold px-4 py-2">
                  <Clock className="w-4 h-4 mr-2" />
                  {banner.urgency}
                </Badge>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl font-black mb-4 leading-tight"
              >
                {banner.title}
              </motion.h1>

              {/* Subtitle */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl md:text-3xl font-bold mb-6 text-blue-300"
              >
                {banner.subtitle}
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl leading-relaxed"
              >
                {banner.description}
              </motion.p>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 mb-8"
              >
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-xl font-bold shadow-2xl hover:scale-105 transition-all duration-300"
                  onClick={() => window.location.href = banner.ctaUrl}
                >
                  <Phone className="w-6 h-6 mr-3" />
                  {banner.ctaText}
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-8 py-6 text-xl font-semibold"
                  onClick={() => window.location.href = '/quote'}
                >
                  Get professional quote
                  <CheckCircle className="w-6 h-6 ml-3" />
                </Button>
              </motion.div>

              {/* Trust Signals */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-6 text-sm font-medium"
              >
                <div className="flex items-centre gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span>IICRC Certified</span>
                </div>
                <div className="flex items-centre gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span>24/7 Emergency</span>
                </div>
                <div className="flex items-centre gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Insurance Approved</span>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Banner Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex gap-3">
            {heroBanners.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentBanner(index);
                  setIsPlaying(false);
                  setTimeout(() => setIsPlaying(true), 3000);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentBanner
                    ? 'bg-white shadow-lg scale-125'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`View ${heroBanners[index].service} banner`}
              />
            ))}
          </div>
        </div>

        {/* Emergency Contact - Always Visible */}
        <div className="absolute top-6 right-6 z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <a
              href="tel:1300309361"
              className="bg-red-600/90 backdrop-blur-sm text-white px-6 py-3 rounded-full font-bold text-lg hover:bg-red-700 transition-all duration-300 shadow-2xl flex items-centre gap-2"
            >
              <Phone className="w-5 h-5" />
              1300 309 361
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}