'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import { AlertTriangle, Award, Shield } from 'lucide-react';
import { MotionDiv, MotionH1, MotionP } from '@/lib/motion/components';
import { fadeIn, fadeInUp, emergencyPulse } from '@/lib/design-system';

export interface ServiceHeroProps {
  /** Hero title */
  title: string;
  /** Hero subtitle/description */
  subtitle: string;
  /** Background image path */
  backgroundImage: string;
  /** Alt text for background image */
  backgroundImageAlt: string;
  /** Emergency badge text (optional) */
  emergencyBadge?: string;
  /** Trust indicators to display */
  trustIndicators?: {
    icon: 'award' | 'shield' | 'alert';
    label: string;
  }[];
  /** CTA children */
  children?: ReactNode;
  /** Gradient overlay color */
  gradientColor?: 'blue' | 'red' | 'green' | 'gray';
}

const gradientClasses = {
  blue: 'from-black/70 via-black/60 to-blue-900/70',
  red: 'from-black/70 via-black/60 to-red-900/70',
  green: 'from-black/70 via-black/60 to-green-900/70',
  gray: 'from-black/70 via-black/60 to-gray-900/70',
};

const iconMap = {
  award: Award,
  shield: Shield,
  alert: AlertTriangle,
};

/**
 * ServiceHero - Reusable hero section for service pages
 *
 * Features:
 * - Optimized next/image background
 * - Lazy-loaded motion components
 * - Emergency badge animation
 * - Trust indicators
 * - Accessibility compliant (WCAG 2.1 AA)
 *
 * @example
 * ```tsx
 * <ServiceHero
 *   title="Water Damage Restoration Brisbane"
 *   subtitle="24/7 Emergency Response • IICRC Master Restorer"
 *   backgroundImage="/images/water-damage-hero.webp"
 *   backgroundImageAlt="Professional water damage restoration"
 *   emergencyBadge="Emergency? Call Now - 60 Min Response"
 *   trustIndicators={[
 *     { icon: 'award', label: 'IICRC Master Certified' },
 *     { icon: 'shield', label: 'Insurance Approved' }
 *   ]}
 * >
 *   <FluidCTA ... />
 * </ServiceHero>
 * ```
 */
export function ServiceHero({
  title,
  subtitle,
  backgroundImage,
  backgroundImageAlt,
  emergencyBadge,
  trustIndicators = [],
  children,
  gradientColor = 'blue',
}: ServiceHeroProps) {
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
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientClasses[gradientColor]}`} />
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
              <AlertTriangle className="w-5 h-5" aria-hidden="true" />
              <span className="font-bold text-lg">{emergencyBadge}</span>
            </MotionDiv>
          )}

          {/* Main Heading */}
          <MotionH1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            variants={fadeInUp}
          >
            {title}
          </MotionH1>

          {/* Subtitle */}
          <MotionP
            className="text-xl md:text-2xl mb-8 text-blue-100 font-semibold max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            {subtitle}
          </MotionP>

          {/* CTA Buttons */}
          {children && (
            <MotionDiv variants={fadeInUp} className="mb-8">
              {children}
            </MotionDiv>
          )}

          {/* Trust Indicators */}
          {trustIndicators.length > 0 && (
            <MotionDiv
              className="flex flex-wrap justify-center gap-6 text-sm"
              variants={fadeInUp}
            >
              {trustIndicators.map((indicator, index) => {
                const Icon = iconMap[indicator.icon];
                return (
                  <div key={index} className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-yellow-400" aria-hidden="true" />
                    <span>{indicator.label}</span>
                  </div>
                );
              })}
            </MotionDiv>
          )}
        </MotionDiv>
      </div>
    </MotionDiv>
  );
}
