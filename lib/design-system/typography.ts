/**
 * Design System - Typography
 * Font scales, weights, and text styling utilities
 *
 * Usage:
 * import { typography } from '@/lib/design-system/typography'
 * className={typography.heading.h1}
 */

export const typography = {
  // Font Families
  fontFamily: {
    sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
    display: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
  },

  // Heading Styles
  heading: {
    h1: 'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',
    h2: 'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight',
    h3: 'text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight',
    h4: 'text-xl md:text-2xl lg:text-3xl font-bold',
    h5: 'text-lg md:text-xl lg:text-2xl font-bold',
    h6: 'text-base md:text-lg lg:text-xl font-bold',
  },

  // Hero Title Styles
  heroTitle: {
    main: 'text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight',
    subtitle: 'text-2xl md:text-3xl lg:text-4xl font-semibold',
    small: 'text-xl md:text-2xl lg:text-3xl font-medium',
  },

  // Body Text Styles
  body: {
    large: 'text-lg md:text-xl leading-relaxed',
    base: 'text-base md:text-lg leading-relaxed',
    small: 'text-sm md:text-base leading-relaxed',
    xs: 'text-xs md:text-sm',
  },

  // Display Text (for special emphasis)
  display: {
    1: 'text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter',
    2: 'text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter',
    3: 'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',
  },

  // Special Text Styles
  special: {
    gradient: 'bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent',
    emergency: 'text-emergency-600 font-bold',
    success: 'text-success-600 font-semibold',
    muted: 'text-neutral-600 dark:text-neutral-400',
  },

  // CTA Text
  cta: {
    primary: 'text-lg md:text-xl font-semibold',
    secondary: 'text-base md:text-lg font-medium',
    small: 'text-sm md:text-base font-medium',
  },

  // Service Card Text
  card: {
    title: 'text-xl font-bold mb-2',
    description: 'text-base text-neutral-600 dark:text-neutral-400',
    meta: 'text-sm text-neutral-500',
  },

  // Stat Badge Text
  stat: {
    number: 'text-2xl md:text-3xl font-bold',
    label: 'text-sm md:text-base font-medium',
  },
} as const

/**
 * Font Weight Utilities
 */
export const fontWeights = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const

/**
 * Line Height Utilities
 */
export const lineHeights = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
} as const

/**
 * Letter Spacing Utilities
 */
export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const

/**
 * Responsive Font Size Scale (clamp values)
 */
export const fluidFontSizes = {
  xs: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
  sm: 'clamp(0.875rem, 0.825rem + 0.25vw, 1rem)',
  base: 'clamp(1rem, 0.95rem + 0.25vw, 1.125rem)',
  lg: 'clamp(1.125rem, 1.05rem + 0.375vw, 1.25rem)',
  xl: 'clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem)',
  '2xl': 'clamp(1.5rem, 1.35rem + 0.75vw, 1.875rem)',
  '3xl': 'clamp(1.875rem, 1.65rem + 1.125vw, 2.25rem)',
  '4xl': 'clamp(2.25rem, 1.95rem + 1.5vw, 3rem)',
  '5xl': 'clamp(3rem, 2.55rem + 2.25vw, 4rem)',
  '6xl': 'clamp(3.75rem, 3.15rem + 3vw, 5rem)',
} as const

/**
 * Text Decoration Utilities
 */
export const textDecorations = {
  linkHover: 'relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-current after:transition-all hover:after:w-full',
  underline: 'underline decoration-2 underline-offset-4',
  strikethrough: 'line-through decoration-2',
} as const

export type HeadingLevel = keyof typeof typography.heading
export type BodySize = keyof typeof typography.body
export type DisplayLevel = keyof typeof typography.display
