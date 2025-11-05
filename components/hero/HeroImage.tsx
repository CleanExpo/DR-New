/**
 * Hero Section Component
 * Reusable hero section with background image
 */

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HeroImage } from './HeroImageData';

interface HeroSectionProps {
  image: HeroImage;
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  height?: string;
}

export function HeroSection({
  image,
  title,
  subtitle,
  ctaText,
  ctaLink,
  height = 'h-[600px]',
}: HeroSectionProps) {
  return (
    <section className={`relative ${height} flex items-centre justify-centre overflow-hidden`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-centre text-white">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>

        {ctaText && ctaLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href={ctaLink}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              {ctaText}
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
