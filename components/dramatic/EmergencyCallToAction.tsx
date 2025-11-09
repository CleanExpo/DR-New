import Link from 'next/link';
import { Phone, AlertTriangle, Clock, Shield, ArrowRight } from 'lucide-react';

interface EmergencyCallToActionProps {
  /** Main heading text */
  title?: string;
  /** Subtitle text */
  subtitle?: string;
  /** Show trust indicators (response time, certification, etc.) */
  showTrustIndicators?: boolean;
  /** Service areas to display */
  serviceAreas?: string;
  /** Variant: 'default' | 'compact' | 'full' */
  variant?: 'default' | 'compact' | 'full';
  /** Background gradient colors */
  gradientFrom?: string;
  gradientTo?: string;
}

/**
 * EmergencyCallToAction - Red emergency CTA section matching landing page pattern
 *
 * Features:
 * - Eye-catching red gradient background
 * - Animated pulse effects on phone icon
 * - Trust indicators (response time, certification)
 * - Multiple size variants
 * - Mobile responsive
 *
 * @example
 * ```tsx
 * <EmergencyCallToAction
 *   title="Water Damage Emergency?"
 *   subtitle="Every minute counts - Don't wait"
 *   showTrustIndicators={true}
 *   serviceAreas="Hamilton • Ascot • New Farm • All Brisbane"
 * />
 * ```
 */
export function EmergencyCallToAction({
  title = 'Brisbane Water or Fire Damage Emergency?',
  subtitle = "Every Minute Counts - Don't Wait",
  showTrustIndicators = true,
  serviceAreas = 'Serving Hamilton • Ascot • New Farm • Toowong • Brisbane CBD • Ipswich • Logan • All Brisbane Suburbs',
  variant = 'default',
  gradientFrom = 'from-red-600',
  gradientTo = 'to-red-800',
}: EmergencyCallToActionProps) {
  const compactMode = variant === 'compact';
  const fullMode = variant === 'full';

  return (
    <section
      className={`${fullMode ? 'py-20' : compactMode ? 'py-12' : 'py-16'} bg-gradient-to-br ${gradientFrom} via-red-700 ${gradientTo} text-white relative overflow-hidden`}
    >
      {/* Background overlay for depth */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className={`${fullMode ? 'max-w-5xl' : 'max-w-4xl'} mx-auto text-center`}>
          {/* Emergency Alert Badge */}
          {!compactMode && (
            <div className="inline-block mb-4 px-6 py-2 bg-yellow-500 text-black font-bold rounded-full animate-pulse">
              <AlertTriangle className="inline-block w-5 h-5 mr-2" />
              EMERGENCY? Call Master Restorer NOW
            </div>
          )}

          {/* Title */}
          <h2
            className={`${fullMode ? 'text-4xl md:text-5xl lg:text-6xl' : compactMode ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl'} font-bold mb-6 leading-tight`}
          >
            {title}
          </h2>

          {/* Subtitle */}
          <p
            className={`${fullMode ? 'text-2xl md:text-3xl' : compactMode ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'} mb-4 text-red-100 font-semibold`}
          >
            {subtitle}
          </p>

          {/* Additional Context */}
          {fullMode && (
            <p className="text-xl mb-10 text-red-100 max-w-3xl mx-auto">
              <strong>IICRC Master Restorer Phill McGurk</strong> and team respond within 60 minutes across Brisbane.
              Industrial equipment. Direct insurance billing. No upfront costs.
            </p>
          )}

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 md:gap-6 justify-center ${compactMode ? 'mb-6' : 'mb-10'}`}>
            {/* Emergency Phone Button */}
            <a
              href="tel:1300309361"
              className={`inline-flex items-center justify-center ${fullMode ? 'px-12 py-6 text-2xl' : compactMode ? 'px-8 py-4 text-lg' : 'px-10 py-5 text-xl'} bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-white/50 transform hover:scale-105`}
              aria-label="Call 1300 309 361 for emergency service"
            >
              <Phone className={`${fullMode ? 'w-8 h-8' : 'w-6 h-6'} mr-3 animate-pulse`} />
              1300 309 361
            </a>

            {/* Email/Assessment CTA */}
            {!compactMode && (
              <a
                href="mailto:info@disasterrecoverybrisbane.com.au"
                className={`inline-flex items-center justify-center ${fullMode ? 'px-12 py-6 text-2xl' : 'px-10 py-5 text-xl'} bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-all shadow-2xl transform hover:scale-105`}
                aria-label="Email us for service booking"
              >
                Email for Assessment
              </a>
            )}
          </div>

          {/* Trust Indicators */}
          {showTrustIndicators && (
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${compactMode ? 'mb-4' : 'mb-8'} text-center`}>
              <div>
                <div className={`${fullMode ? 'text-3xl' : 'text-2xl md:text-3xl'} font-bold mb-2 flex items-center justify-center gap-2`}>
                  <Clock className="w-6 h-6 md:w-8 md:h-8" />
                  60 Minutes
                </div>
                <div className="text-red-100 text-sm md:text-base">Emergency Response</div>
              </div>
              <div>
                <div className={`${fullMode ? 'text-3xl' : 'text-2xl md:text-3xl'} font-bold mb-2 flex items-center justify-center gap-2`}>
                  <AlertTriangle className="w-6 h-6 md:w-8 md:h-8" />
                  Master Restorer
                </div>
                <div className="text-red-100 text-sm md:text-base">IICRC Certified</div>
              </div>
              <div>
                <div className={`${fullMode ? 'text-3xl' : 'text-2xl md:text-3xl'} font-bold mb-2 flex items-center justify-center gap-2`}>
                  <Shield className="w-6 h-6 md:w-8 md:h-8" />
                  All Insurers
                </div>
                <div className="text-red-100 text-sm md:text-base">Direct Billing</div>
              </div>
            </div>
          )}

          {/* Service Areas */}
          {serviceAreas && (
            <p className={`${compactMode ? 'text-sm' : 'text-base md:text-lg'} text-red-100`}>{serviceAreas}</p>
          )}
        </div>
      </div>
    </section>
  );
}
