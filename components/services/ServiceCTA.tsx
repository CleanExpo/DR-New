'use client';

import { ReactNode } from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { MotionDiv } from '@/lib/motion/components';
import { emergencyPulse } from '@/lib/design-system';

export interface ServiceCTAProps {
  /** CTA title */
  title: string;
  /** CTA description */
  description: string;
  /** Phone number */
  phone?: string;
  /** Primary CTA label */
  primaryLabel?: string;
  /** Primary CTA link */
  primaryHref?: string;
  /** Secondary CTA label */
  secondaryLabel?: string;
  /** Secondary CTA link */
  secondaryHref?: string;
  /** Background color variant */
  variant?: 'red' | 'blue' | 'green' | 'gray';
  /** Additional stats to display */
  stats?: {
    label: string;
    value: string;
  }[];
  /** Custom children instead of default CTAs */
  children?: ReactNode;
}

const variantClasses = {
  red: 'from-red-700 via-red-700 to-red-900',
  blue: 'from-blue-700 via-blue-700 to-blue-900',
  green: 'from-green-700 via-green-700 to-green-900',
  gray: 'from-gray-700 via-gray-700 to-gray-900',
};

/**
 * ServiceCTA - Call-to-action section for service pages
 *
 * Features:
 * - Emergency pulse animation
 * - Phone and form CTAs
 * - Trust stats
 * - Multiple color variants
 *
 * @example
 * ```tsx
 * <ServiceCTA
 *   title="Emergency Water Damage? Call Now"
 *   description="Available 24/7 for immediate assistance across Brisbane"
 *   phone="1300 309 361"
 *   variant="red"
 *   stats={[
 *     { label: 'Response Time', value: '<60 Min' },
 *     { label: 'Availability', value: '24/7/365' },
 *     { label: 'Coverage', value: 'All Brisbane' }
 *   ]}
 * />
 * ```
 */
export function ServiceCTA({
  title,
  description,
  phone = '1300 309 361',
  primaryLabel = `Call ${phone}`,
  primaryHref = `tel:${phone.replace(/\s/g, '')}`,
  secondaryLabel = 'Get Emergency Help',
  secondaryHref = '/claim',
  variant = 'red',
  stats = [],
  children,
}: ServiceCTAProps) {
  return (
    <section
      className={`py-20 bg-gradient-to-br ${variantClasses[variant]} text-white relative overflow-hidden`}
    >
      <div className="absolute inset-0 bg-black/20" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Emergency Badge */}
          <MotionDiv
            className="inline-block mb-6 px-6 py-2 bg-yellow-500 text-black font-bold rounded-full"
            variants={emergencyPulse}
            animate="animate"
          >
            EMERGENCY SERVICE AVAILABLE NOW
          </MotionDiv>

          {/* Title & Description */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {title}
          </h2>

          <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-3xl mx-auto">
            {description}
          </p>

          {/* CTAs */}
          {children || (
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <a
                href={primaryHref}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-bold text-xl rounded-lg hover:bg-gray-100 transition-all shadow-2xl transform hover:scale-105"
                aria-label={primaryLabel}
              >
                <Phone className="w-6 h-6 mr-2" aria-hidden="true" />
                {primaryLabel}
              </a>

              <a
                href={secondaryHref}
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-bold text-xl rounded-lg border-2 border-white hover:bg-white hover:text-gray-900 transition-all"
                aria-label={secondaryLabel}
              >
                {secondaryLabel}
                <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
              </a>
            </div>
          )}

          {/* Stats */}
          {stats.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
