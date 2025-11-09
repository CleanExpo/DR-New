import Image from 'next/image';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';

interface DramaticHeroSectionProps {
  /** Image path from /public/ directory */
  imageSrc: string;
  /** Descriptive alt text for SEO */
  imageAlt: string;
  /** Main heading text */
  title: string;
  /** Optional subtitle or description */
  subtitle?: string;
  /** Call-to-action button text */
  ctaText?: string;
  /** CTA button link */
  ctaLink?: string;
  /** Emergency phone CTA (displays phone button) */
  showPhoneCTA?: boolean;
  /** Secondary CTA text */
  secondaryCtaText?: string;
  /** Secondary CTA link */
  secondaryCtaLink?: string;
  /** Minimum height (default: min-h-[400px]) */
  minHeight?: string;
  /** Gradient overlay intensity: 'light' | 'medium' | 'dark' */
  overlayIntensity?: 'light' | 'medium' | 'dark';
  /** Badge text (small pill at top) */
  badgeText?: string;
  /** Badge color variant */
  badgeColor?: 'red' | 'blue' | 'green' | 'yellow';
}

const overlayClasses = {
  light: 'bg-black/10',
  medium: 'bg-black/20',
  dark: 'bg-black/40',
};

const badgeClasses = {
  red: 'bg-red-600 text-white',
  blue: 'bg-blue-600 text-white',
  green: 'bg-green-600 text-white',
  yellow: 'bg-yellow-500 text-black',
};

/**
 * DramaticHeroSection - Reusable hero component matching landing page aesthetic
 *
 * Features:
 * - Full-width background image with overlay
 * - Dramatic gradient effects
 * - Emergency-ready CTA buttons
 * - Mobile responsive
 * - Optimized Next.js Image component
 *
 * @example
 * ```tsx
 * <DramaticHeroSection
 *   imageSrc="/images/hero/water-damage.jpg"
 *   imageAlt="Emergency water damage restoration Brisbane"
 *   title="Water Damage Emergency?"
 *   subtitle="60-minute response across Brisbane"
 *   showPhoneCTA={true}
 *   secondaryCtaText="Learn More"
 *   secondaryCtaLink="/services/water-damage"
 *   badgeText="IICRC Master Restorer"
 *   badgeColor="red"
 * />
 * ```
 */
export function DramaticHeroSection({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  ctaText = 'Get Emergency Help',
  ctaLink = '/get-help',
  showPhoneCTA = true,
  secondaryCtaText,
  secondaryCtaLink,
  minHeight = 'min-h-[400px]',
  overlayIntensity = 'medium',
  badgeText,
  badgeColor = 'red',
}: DramaticHeroSectionProps) {
  return (
    <section className={`relative ${minHeight} flex items-center justify-center text-white overflow-hidden`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          style={{ objectFit: 'cover' }}
          priority
          sizes="100vw"
          quality={90}
        />
        {/* Dramatic Overlay */}
        <div className={`absolute inset-0 ${overlayClasses[overlayIntensity]}`} />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/50 via-red-800/40 to-slate-900/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Optional Badge */}
          {badgeText && (
            <div className={`inline-block px-6 py-2 rounded-full text-sm font-bold mb-6 ${badgeClasses[badgeColor]} shadow-lg`}>
              {badgeText}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-xl md:text-2xl mb-8 text-gray-100 leading-relaxed drop-shadow-lg">
              {subtitle}
            </p>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Emergency Phone CTA */}
            {showPhoneCTA && (
              <a
                href="tel:1300309361"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-red-600 font-bold text-xl rounded-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-white/50 transform hover:scale-105"
                aria-label="Call 1300 309 361 for emergency service"
              >
                <Phone className="w-6 h-6 animate-pulse" />
                1300 309 361
              </a>
            )}

            {/* Primary CTA */}
            {!showPhoneCTA && ctaLink && (
              <Link
                href={ctaLink}
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-red-600 text-white font-bold text-xl rounded-lg hover:bg-red-700 transition-all shadow-2xl transform hover:scale-105"
              >
                {ctaText}
                <ArrowRight className="w-5 h-5" />
              </Link>
            )}

            {/* Secondary CTA */}
            {secondaryCtaText && secondaryCtaLink && (
              <Link
                href={secondaryCtaLink}
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-red-800 text-white font-bold text-xl rounded-lg hover:bg-red-900 transition-all border-2 border-white shadow-2xl"
              >
                {secondaryCtaText}
                <ArrowRight className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
