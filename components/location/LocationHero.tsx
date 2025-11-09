'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import { MapPin, Clock, Award, Shield, Star } from 'lucide-react';
import { MotionDiv, MotionH1, MotionP } from '@/lib/motion/components';
import { fadeIn, fadeInUp, emergencyPulse, staggerContainer, staggerItem } from '@/lib/design-system';

export interface LocationHeroProps {
  /** Location name */
  location: string;
  /** Hero title (optional, defaults to "{location} Emergency Disaster Restoration") */
  title?: string;
  /** Hero subtitle */
  subtitle: string;
  /** Background image path */
  backgroundImage: string;
  /** Alt text for background image */
  backgroundImageAlt: string;
  /** Emergency badge text */
  emergencyBadge?: string;
  /** Quick stats to display */
  stats?: {
    icon: 'clock' | 'award' | 'shield' | 'star';
    label: string;
    value: string;
  }[];
  /** CTA children */
  children?: ReactNode;
}

const iconMap = {
  clock: Clock,
  award: Award,
  shield: Shield,
  star: Star,
};

/**
 * LocationHero - Reusable hero section for location pages
 *
 * Features:
 * - Optimized location-specific imagery
 * - Emergency badge with pulse animation
 * - Quick stats grid
 * - Mobile responsive
 *
 * @example
 * ```tsx
 * <LocationHero
 *   location="Hamilton"
 *   subtitle="60-Minute Response • IICRC Master Restorer • Luxury Property Specialists"
 *   backgroundImage="/images/suburbs/hamilton-hero.webp"
 *   backgroundImageAlt="Hamilton Brisbane luxury riverside properties"
 *   emergencyBadge="Serving Hamilton's Prestige Riverside Properties"
 *   stats={[
 *     { icon: 'clock', label: 'Response Time', value: '<60 Min' },
 *     { icon: 'award', label: 'Master Restorer', value: 'IICRC Certified' }
 *   ]}
 * >
 *   <FluidCTAGroup ... />
 * </LocationHero>
 * ```
 */
export function LocationHero({
  location,
  title,
  subtitle,
  backgroundImage,
  backgroundImageAlt,
  emergencyBadge,
  stats = [],
  children,
}: LocationHeroProps) {
  const defaultTitle = `${location} Emergency Disaster Restoration`;

  return (
    <MotionDiv
      className="relative min-h-[600px] flex items-center justify-center text-white"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={backgroundImageAlt}
          fill
          style={{ objectFit: 'cover' }}
          priority
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-red-900/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <MotionDiv variants={fadeInUp} className="max-w-4xl mx-auto">
          {/* Emergency Badge */}
          {emergencyBadge && (
            <MotionDiv
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-700/90 backdrop-blur-sm rounded-full mb-6"
              variants={emergencyPulse}
              animate="animate"
            >
              <MapPin className="w-5 h-5" aria-hidden="true" />
              <span className="font-bold text-lg">{emergencyBadge}</span>
            </MotionDiv>
          )}

          {/* Main Heading */}
          <MotionH1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            variants={fadeInUp}
          >
            {title || defaultTitle}
          </MotionH1>

          {/* Subtitle */}
          <MotionP
            className="text-xl md:text-2xl mb-8 text-blue-200 font-semibold max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            {subtitle}
          </MotionP>

          {/* CTA Buttons */}
          {children && (
            <MotionDiv variants={fadeInUp} className="mb-10">
              {children}
            </MotionDiv>
          )}

          {/* Quick Stats */}
          {stats.length > 0 && (
            <MotionDiv
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
              variants={staggerContainer}
            >
              {stats.map((stat, index) => {
                const Icon = iconMap[stat.icon];
                return (
                  <MotionDiv
                    key={index}
                    className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
                    variants={staggerItem}
                  >
                    <Icon className="w-8 h-8 mx-auto mb-2 text-blue-300" aria-hidden="true" />
                    <p className="text-sm text-blue-200 font-semibold">{stat.label}</p>
                    <p className="text-xs text-white/80 mt-1">{stat.value}</p>
                  </MotionDiv>
                );
              })}
            </MotionDiv>
          )}
        </MotionDiv>
      </div>
    </MotionDiv>
  );
}
