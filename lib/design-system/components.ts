/**
 * Design System - Component Style Tokens
 * Reusable component styling constants and utilities
 *
 * Usage:
 * import { componentStyles } from '@/lib/design-system/components'
 * className={componentStyles.button.primary}
 */

export const componentStyles = {
  // Button Styles
  button: {
    base: 'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',

    primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 focus-visible:ring-primary-500',

    emergency: 'bg-emergency-600 text-white hover:bg-emergency-700 active:bg-emergency-800 focus-visible:ring-emergency-500 pulse-emergency',

    secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 active:bg-neutral-300 focus-visible:ring-neutral-500',

    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 active:bg-primary-100 focus-visible:ring-primary-500',

    ghost: 'text-primary-600 hover:bg-primary-50 active:bg-primary-100 focus-visible:ring-primary-500',

    // Sizes
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  },

  // Card Styles
  card: {
    base: 'rounded-lg border transition-all duration-300',

    default: 'bg-white border-neutral-200 hover:shadow-lg',

    elevated: 'bg-white border-neutral-200 shadow-md hover:shadow-xl',

    glass: 'bg-white/10 backdrop-blur-sm border-white/20',

    service: 'bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow',

    feature: 'h-full overflow-hidden bg-background/60 backdrop-blur-sm border transition-all duration-300 hover:shadow-lg dark:bg-background/80',
  },

  // Section Wrapper Styles
  section: {
    base: 'py-20',

    white: 'bg-white',

    gray: 'bg-gray-50',

    muted: 'bg-muted/50 dark:bg-muted/10',

    primary: 'bg-primary-600 text-white',

    emergency: 'bg-emergency-600 text-white',

    gradient: 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900',
  },

  // Container Styles
  container: {
    base: 'container mx-auto px-4 md:px-6',

    narrow: 'container mx-auto px-4 md:px-6 max-w-4xl',

    wide: 'container mx-auto px-4 md:px-6 max-w-7xl',

    full: 'w-full px-4 md:px-6',
  },

  // Input Styles
  input: {
    base: 'w-full rounded-lg border border-neutral-300 px-4 py-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',

    error: 'border-emergency-500 focus:ring-emergency-500',

    success: 'border-success-500 focus:ring-success-500',
  },

  // Badge Styles
  badge: {
    base: 'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',

    primary: 'bg-primary-100 text-primary-800',

    emergency: 'bg-emergency-100 text-emergency-800',

    success: 'bg-success-100 text-success-800',

    premium: 'bg-premium-100 text-premium-800',

    neutral: 'bg-neutral-100 text-neutral-800',
  },

  // Stat Badge Styles (Circular)
  statBadge: {
    base: 'w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold',

    emergency: 'bg-emergency-600 text-white',

    primary: 'bg-primary-600 text-white',

    success: 'bg-success-600 text-white',
  },

  // Icon Container Styles
  iconContainer: {
    base: 'rounded-lg flex items-center justify-center',

    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',

    water: 'bg-blue-100 text-blue-600',
    fire: 'bg-red-100 text-red-600',
    storm: 'bg-gray-100 text-gray-600',
    mould: 'bg-purple-100 text-purple-600',
    biohazard: 'bg-yellow-100 text-yellow-600',
    sewage: 'bg-orange-100 text-orange-600',
  },
} as const

/**
 * Animation Classes
 */
export const animations = {
  // Hover Effects
  cardHover: 'card-hover',
  serviceCard: 'service-card',

  // Pulse Effects
  pulseEmergency: 'pulse-emergency',
  emergencyPulse: 'emergency-pulse',

  // Floating Effects
  floating: 'floating',

  // Shimmer Effects
  shimmer: 'shimmer',

  // Reveal Effects
  reveal: 'reveal',
  damageReveal: 'damage-reveal',

  // Gradient Effects
  gradientText: 'gradient-text',

  // Water/Fire Effects
  waterWave: 'water-wave',
  fireGlow: 'fire-glow',

  // Emergency Response
  emergencyResponse: 'emergency-response',
  available247: 'available-247',

  // Certification
  certificationGlow: 'certification-glow',
  insuranceApproved: 'insurance-approved',
} as const

/**
 * Shadow Utilities
 */
export const shadows = {
  sm: '0 2px 4px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  glow: '0 0 40px rgba(37, 99, 235, 0.3)',
  emergencyGlow: '0 0 40px rgba(220, 38, 38, 0.3)',
} as const

/**
 * Border Radius Utilities
 */
export const borderRadius = {
  sm: 'calc(var(--radius) - 4px)',
  md: 'calc(var(--radius) - 2px)',
  lg: 'var(--radius)',
  xl: 'calc(var(--radius) + 4px)',
  full: '9999px',
} as const

/**
 * Transition Utilities
 */
export const transitions = {
  fast: 'transition-all duration-200 ease-in-out',
  normal: 'transition-all duration-300 ease-in-out',
  slow: 'transition-all duration-500 ease-in-out',
  smooth: 'transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)',
} as const

export type ButtonVariant = 'primary' | 'emergency' | 'secondary' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'
export type CardVariant = 'default' | 'elevated' | 'glass' | 'service' | 'feature'
export type SectionVariant = 'white' | 'gray' | 'muted' | 'primary' | 'emergency' | 'gradient'
