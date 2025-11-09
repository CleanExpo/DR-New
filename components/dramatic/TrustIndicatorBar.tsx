import { Award, Clock, Shield, Star, Building2, LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface TrustIndicator {
  /** Icon component */
  icon: ReactNode;
  /** Main stat or text */
  value: string;
  /** Description label */
  label: string;
  /** Optional subtext */
  subtext?: string;
}

interface TrustIndicatorBarProps {
  /** Background variant */
  variant?: 'blue' | 'dark' | 'light';
  /** Custom indicators (uses defaults if not provided) */
  indicators?: TrustIndicator[];
  /** Show all 5 default indicators */
  showAll?: boolean;
}

const defaultIndicators: TrustIndicator[] = [
  {
    icon: <Award className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 text-yellow-400" />,
    value: 'Master Restorer',
    label: 'IICRC Certified',
    subtext: 'Limited in QLD',
  },
  {
    icon: <Clock className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 text-yellow-400" />,
    value: '60 Minutes',
    label: 'Response Time',
    subtext: 'Brisbane Metro',
  },
  {
    icon: <Shield className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 text-yellow-400" />,
    value: 'All Insurers',
    label: 'Direct Billing',
    subtext: 'No Upfront Costs',
  },
  {
    icon: <Star className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 text-yellow-400" />,
    value: '500+ Jobs',
    label: 'Completed',
    subtext: 'Brisbane & Ipswich',
  },
  {
    icon: <Building2 className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 text-yellow-400" />,
    value: '24/7/365',
    label: 'Emergency Service',
    subtext: 'Always Available',
  },
];

const variantClasses = {
  blue: 'bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900',
  dark: 'bg-slate-900 border-y border-red-600',
  light: 'bg-gradient-to-br from-gray-50 to-gray-100',
};

const textColorClasses = {
  blue: 'text-white',
  dark: 'text-white',
  light: 'text-gray-900',
};

const subtextColorClasses = {
  blue: 'text-blue-200',
  dark: 'text-gray-300',
  light: 'text-gray-600',
};

/**
 * TrustIndicatorBar - Displays credentials and trust signals
 *
 * Features:
 * - Master Restorer certification
 * - Response time guarantees
 * - Insurance approval
 * - Statistics (jobs completed, availability)
 * - Multiple background variants
 * - Responsive grid layout
 *
 * @example
 * ```tsx
 * // Default trust indicators
 * <TrustIndicatorBar variant="blue" showAll={true} />
 *
 * // Custom indicators
 * <TrustIndicatorBar
 *   variant="dark"
 *   indicators={[
 *     {
 *       icon: <Award className="w-12 h-12" />,
 *       value: "IICRC",
 *       label: "Master Certified",
 *       subtext: "Highest Level"
 *     }
 *   ]}
 * />
 * ```
 */
export function TrustIndicatorBar({ variant = 'blue', indicators, showAll = false }: TrustIndicatorBarProps) {
  // Use custom indicators or default to first 5
  const displayIndicators = indicators || (showAll ? defaultIndicators : defaultIndicators.slice(0, 5));

  return (
    <section className={`py-12 md:py-16 ${variantClasses[variant]} ${textColorClasses[variant]}`}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Optional Title Section */}
        {variant === 'light' && (
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Why Brisbane Trusts Phill McGurk</h2>
            <p className={subtextColorClasses[variant]}>
              Master Restorer Credentials • Proven Track Record • 24/7 Availability
            </p>
          </div>
        )}

        {/* Trust Indicators Grid */}
        <div
          className={`grid grid-cols-2 ${displayIndicators.length === 5 ? 'md:grid-cols-5' : displayIndicators.length === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-4 md:gap-8 text-center`}
        >
          {displayIndicators.map((indicator, index) => (
            <div
              key={index}
              className={`${variant === 'light' ? 'bg-white shadow-md' : 'bg-white/10 backdrop-blur-sm'} rounded-lg p-4 md:p-6 hover:bg-white/20 transition-all`}
            >
              {/* Icon */}
              {indicator.icon}

              {/* Value */}
              <div className="text-lg md:text-2xl font-bold mb-1">{indicator.value}</div>

              {/* Label */}
              <div className={`text-xs md:text-sm ${variant === 'light' ? 'text-gray-700' : 'opacity-90'}`}>
                {indicator.label}
              </div>

              {/* Subtext */}
              {indicator.subtext && (
                <div
                  className={`text-xs mt-2 ${variant === 'light' ? 'text-gray-600' : variant === 'blue' ? 'text-yellow-300' : 'text-yellow-400'}`}
                >
                  {indicator.subtext}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * CompactTrustBadges - Horizontal trust indicators for headers
 *
 * @example
 * ```tsx
 * <CompactTrustBadges />
 * ```
 */
export function CompactTrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-center text-sm md:text-base">
      <div className="flex items-center gap-2">
        <Star className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
        <span className="font-semibold">Master Restorer Phill McGurk</span>
      </div>
      <div className="hidden md:block w-px h-8 bg-gray-600" />
      <div className="font-semibold">One of Limited Master Restorers in QLD</div>
      <div className="hidden md:block w-px h-8 bg-gray-600" />
      <div className="font-semibold">24/7 Emergency Dispatch</div>
    </div>
  );
}
