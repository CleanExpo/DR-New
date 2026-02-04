/**
 * Hero Section Component
 *
 * Conversion-optimized hero section for landing pages
 * Features:
 * - Large headline and subheadline
 * - CTA button
 * - Background image with overlay
 * - Trust badges
 * - Mobile responsive
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaHref?: string;
  backgroundImage?: string;
  trustBadges?: {
    icon: React.ReactNode;
    text: string;
  }[];
  className?: string;
  children?: React.ReactNode;
}

export function HeroSection({
  headline,
  subheadline,
  ctaText,
  ctaHref = '#',
  backgroundImage,
  trustBadges,
  className,
  children,
}: HeroSectionProps) {

  return (
    <section
      className={cn(
        'relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-blue-900',
        className
      )}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/90 via-orange-600/90 to-blue-900/90" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="text-center">
          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {headline}
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-3xl text-lg text-white/90 sm:text-xl md:text-2xl">
            {subheadline}
          </p>

          {/* CTA Button */}
          <div className="mt-10 flex justify-center">
            <a
              href={ctaHref}
              className="inline-flex items-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-orange-600 shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-600"
            >
              {ctaText}
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>

          {/* Trust Badges */}
          {trustBadges && trustBadges.length > 0 && (
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center gap-2 text-white/90">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    {badge.icon}
                  </div>
                  <span className="text-sm font-medium sm:text-base">{badge.text}</span>
                </div>
              ))}
            </div>
          )}

          {/* Additional Children */}
          {children && <div className="mt-10">{children}</div>}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
