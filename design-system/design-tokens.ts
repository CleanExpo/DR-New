/**
 * DR-New Design System - Design Tokens
 * =====================================
 * Core design values that ensure consistency across the entire application
 * These tokens form the foundation of our visual language
 */

// ============================================================================
// COLOR SYSTEM
// ============================================================================

/**
 * Core Brand Colors
 * Primary palette for the DR-New brand identity
 */
export const colors = {
  // Primary - Trust & Professionalism
  primary: {
    50: '#eff6ff',   // Lightest blue for subtle backgrounds
    100: '#dbeafe',  // Light backgrounds
    200: '#bfdbfe',  // Hover states for light elements
    300: '#93c5fd',  // Disabled states
    400: '#60a5fa',  // Secondary CTAs
    500: '#3b82f6',  // Links and interactive elements
    600: '#2563eb',  // Primary brand color - main CTAs
    700: '#1d4ed8',  // Hover state for primary
    800: '#1e40af',  // Active/pressed state
    900: '#1e3a8a',  // Darkest - headers on light
    950: '#172554',  // Ultra dark for high contrast
  },

  // Emergency - Urgent Actions & Alerts
  emergency: {
    50: '#fef2f2',   // Lightest - subtle warning backgrounds
    100: '#fee2e2',  // Light warning backgrounds
    200: '#fecaca',  // Hover for light emergency elements
    300: '#fca5a5',  // Disabled emergency buttons
    400: '#f87171',  // Secondary emergency indicators
    500: '#ef4444',  // Standard emergency (4.54:1 contrast)
    600: '#dc2626',  // Primary emergency CTAs (5.87:1 contrast)
    700: '#b91c1c',  // Hover emergency (7.93:1 contrast)
    800: '#991b1b',  // Active emergency (9.41:1 contrast)
    900: '#7f1d1d',  // Darkest emergency
    950: '#450a0a',  // Ultra dark emergency
  },

  // Success - Positive Actions & Confirmations
  success: {
    50: '#f0fdf4',   // Lightest success backgrounds
    100: '#dcfce7',  // Light success backgrounds
    200: '#bbf7d0',  // Success hover states
    300: '#86efac',  // Success disabled
    400: '#4ade80',  // Success secondary
    500: '#22c55e',  // Success primary
    600: '#16a34a',  // Success emphasis (5.95:1 contrast)
    700: '#15803d',  // Success hover (8.29:1 contrast)
    800: '#166534',  // Success active
    900: '#14532d',  // Success darkest
    950: '#052e16',  // Success ultra dark
  },

  // Warning - Caution & Important Information
  warning: {
    50: '#fffbeb',   // Lightest warning
    100: '#fef3c7',  // Light warning
    200: '#fde68a',  // Warning hover
    300: '#fcd34d',  // Warning disabled
    400: '#fbbf24',  // Warning secondary
    500: '#f59e0b',  // Warning primary
    600: '#d97706',  // Warning emphasis (4.48:1 contrast)
    700: '#b45309',  // Warning hover (6.68:1 contrast)
    800: '#92400e',  // Warning active
    900: '#78350f',  // Warning darkest
    950: '#451a03',  // Warning ultra dark
  },

  // Neutral - Text & UI Elements
  neutral: {
    0: '#ffffff',    // Pure white
    50: '#fafafa',   // Off-white backgrounds
    100: '#f5f5f5',  // Light backgrounds
    200: '#e5e5e5',  // Borders and dividers
    300: '#d4d4d4',  // Disabled borders
    400: '#a3a3a3',  // Placeholder text
    500: '#737373',  // Muted text
    600: '#525252',  // Secondary text (7.74:1 on white)
    700: '#404040',  // Body text (10.12:1 on white)
    800: '#262626',  // Headings (15.87:1 on white)
    900: '#171717',  // Maximum contrast text
    950: '#0a0a0a',  // Pure black alternative
  },

  // Semantic Colors
  info: '#0ea5e9',     // Information blue (3.42:1 - use with care)
  infoAccessible: '#0284c7', // Accessible info (4.65:1 contrast)

  // Background Colors
  background: {
    primary: '#ffffff',
    secondary: '#fafafa',
    tertiary: '#f5f5f5',
    emergency: '#fef2f2',
    success: '#f0fdf4',
    warning: '#fffbeb',
    info: '#eff6ff',
    dark: '#111827',
  },

  // Overlay Colors (for modals, dropdowns)
  overlay: {
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.4)',
    dark: 'rgba(0, 0, 0, 0.7)',
    emergency: 'rgba(220, 38, 38, 0.1)',
  },
} as const;

// ============================================================================
// TYPOGRAPHY SYSTEM
// ============================================================================

/**
 * Typography Scale
 * Based on Major Third scale (1.25 ratio) for harmonious hierarchy
 */
export const typography = {
  // Font Families
  fonts: {
    sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
    // Consider adding custom fonts for premium feel:
    // heading: '"Playfair Display", Georgia, serif', // For premium feel
    // body: '"Inter", system-ui, sans-serif', // For readability
  },

  // Font Sizes (Mobile -> Desktop)
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px - Legal, disclaimers
    sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px - Captions, labels
    base: ['1rem', { lineHeight: '1.5rem' }],     // 16px - Body text
    lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px - Lead text
    xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px - Small headings
    '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px - H4
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px - H3
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px - H2
    '5xl': ['3rem', { lineHeight: '1.16' }],        // 48px - H1
    '6xl': ['3.75rem', { lineHeight: '1' }],        // 60px - Hero desktop
    '7xl': ['4.5rem', { lineHeight: '1' }],         // 72px - Hero large
    '8xl': ['6rem', { lineHeight: '1' }],           // 96px - Display
  },

  // Responsive Font Sizes
  responsive: {
    hero: {
      mobile: '2.25rem',  // 36px
      tablet: '3rem',     // 48px
      desktop: '3.75rem', // 60px
      large: '4.5rem',    // 72px
    },
    h1: {
      mobile: '2rem',     // 32px
      tablet: '2.5rem',   // 40px
      desktop: '3rem',    // 48px
    },
    h2: {
      mobile: '1.75rem',  // 28px
      tablet: '2rem',     // 32px
      desktop: '2.25rem', // 36px
    },
    h3: {
      mobile: '1.5rem',   // 24px
      tablet: '1.75rem',  // 28px
      desktop: '1.875rem', // 30px
    },
    body: {
      mobile: '1rem',     // 16px
      tablet: '1rem',     // 16px
      desktop: '1.125rem', // 18px for better readability
    },
  },

  // Font Weights
  fontWeight: {
    thin: '100',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  // Line Heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  // Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

// ============================================================================
// SPACING SYSTEM
// ============================================================================

/**
 * Spacing Scale
 * Based on 4px base unit for consistent rhythm
 */
export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px - Base unit
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px - Minimum touch target
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
  36: '9rem',       // 144px
  40: '10rem',      // 160px
  44: '11rem',      // 176px
  48: '12rem',      // 192px
  52: '13rem',      // 208px
  56: '14rem',      // 224px
  60: '15rem',      // 240px
  64: '16rem',      // 256px
  72: '18rem',      // 288px
  80: '20rem',      // 320px
  96: '24rem',      // 384px
} as const;

// ============================================================================
// LAYOUT SYSTEM
// ============================================================================

export const layout = {
  // Container widths
  container: {
    xs: '20rem',     // 320px - Mobile min
    sm: '24rem',     // 384px - Mobile
    md: '28rem',     // 448px - Mobile large
    lg: '32rem',     // 512px - Tablet small
    xl: '36rem',     // 576px - Tablet
    '2xl': '42rem',  // 672px - Tablet large
    '3xl': '48rem',  // 768px - Desktop small
    '4xl': '56rem',  // 896px - Desktop
    '5xl': '64rem',  // 1024px - Desktop large
    '6xl': '72rem',  // 1152px - Wide
    '7xl': '80rem',  // 1280px - Max content
    full: '100%',
  },

  // Breakpoints
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Grid
  grid: {
    cols: {
      1: 'repeat(1, minmax(0, 1fr))',
      2: 'repeat(2, minmax(0, 1fr))',
      3: 'repeat(3, minmax(0, 1fr))',
      4: 'repeat(4, minmax(0, 1fr))',
      5: 'repeat(5, minmax(0, 1fr))',
      6: 'repeat(6, minmax(0, 1fr))',
      12: 'repeat(12, minmax(0, 1fr))',
    },
    gap: spacing,
  },

  // Z-index scale
  zIndex: {
    auto: 'auto',
    0: '0',
    10: '10',      // Base elements
    20: '20',      // Floating elements
    30: '30',      // Dropdowns
    40: '40',      // Fixed headers
    50: '50',      // Modals
    60: '60',      // Notifications
    70: '70',      // Emergency overlays
    max: '9999',   // Maximum priority
  },
} as const;

// ============================================================================
// BORDERS & EFFECTS
// ============================================================================

export const borders = {
  // Border Widths
  width: {
    0: '0px',
    1: '1px',
    2: '2px',
    4: '4px',
    8: '8px',
  },

  // Border Radius
  radius: {
    none: '0',
    sm: '0.125rem',   // 2px - Subtle rounding
    base: '0.25rem',  // 4px - Small elements
    md: '0.375rem',   // 6px - Default
    lg: '0.5rem',     // 8px - Cards
    xl: '0.75rem',    // 12px - Modals
    '2xl': '1rem',    // 16px - Large cards
    '3xl': '1.5rem',  // 24px - Extra large
    full: '9999px',   // Pills, circles
  },

  // Focus ring styles
  focus: {
    ring: '2px solid',
    ringOffset: '2px',
    colors: {
      primary: colors.primary[600],
      emergency: colors.emergency[600],
      success: colors.success[600],
    },
  },
} as const;

// ============================================================================
// SHADOWS & ELEVATION
// ============================================================================

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',

  // Colored shadows for emphasis
  emergency: '0 10px 25px -5px rgba(220, 38, 38, 0.25)',
  primary: '0 10px 25px -5px rgba(37, 99, 235, 0.25)',
  success: '0 10px 25px -5px rgba(22, 163, 74, 0.25)',

  // Elevation system (Material Design inspired)
  elevation: {
    0: 'none',
    1: '0 2px 1px -1px rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.12)',
    2: '0 3px 1px -2px rgba(0,0,0,0.2), 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12)',
    3: '0 3px 3px -2px rgba(0,0,0,0.2), 0 3px 4px 0 rgba(0,0,0,0.14), 0 1px 8px 0 rgba(0,0,0,0.12)',
    4: '0 2px 4px -1px rgba(0,0,0,0.2), 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12)',
    6: '0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12)',
    8: '0 5px 5px -3px rgba(0,0,0,0.2), 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12)',
    12: '0 7px 8px -4px rgba(0,0,0,0.2), 0 12px 17px 2px rgba(0,0,0,0.14), 0 5px 22px 4px rgba(0,0,0,0.12)',
    16: '0 8px 10px -5px rgba(0,0,0,0.2), 0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12)',
    24: '0 11px 15px -7px rgba(0,0,0,0.2), 0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12)',
  },
} as const;

// ============================================================================
// TRANSITIONS & ANIMATIONS
// ============================================================================

export const motion = {
  // Transition durations
  duration: {
    instant: '0ms',
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
    slower: '500ms',
    slowest: '1000ms',
  },

  // Easing functions
  easing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    emergency: 'cubic-bezier(0.4, 0, 0.6, 1)', // Smooth but urgent
  },

  // Standard transitions
  transitions: {
    colors: 'background-color 200ms ease, border-color 200ms ease, color 200ms ease',
    shadow: 'box-shadow 200ms ease',
    transform: 'transform 200ms ease',
    all: 'all 200ms ease',
    emergency: 'all 150ms cubic-bezier(0.4, 0, 0.6, 1)',
  },

  // Animations
  animations: {
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    emergencyPulse: 'emergency-pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    slideIn: 'slide-in 300ms ease-out',
    fadeIn: 'fade-in 300ms ease-out',
    scaleIn: 'scale-in 200ms ease-out',
  },
} as const;

// ============================================================================
// ACCESSIBILITY
// ============================================================================

export const accessibility = {
  // Minimum touch target sizes
  touchTarget: {
    min: '44px', // iOS minimum
    recommended: '48px', // Material Design recommendation
  },

  // Focus indicators
  focus: {
    outline: `2px solid ${colors.primary[600]}`,
    outlineOffset: '2px',
    emergency: `4px solid ${colors.emergency[600]}`,
  },

  // Color contrast requirements
  contrast: {
    // WCAG AA standards
    normalText: 4.5,      // Small text
    largeText: 3,         // Large text (18pt+)
    // WCAG AAA standards
    enhancedNormal: 7,
    enhancedLarge: 4.5,
  },

  // Screen reader only class
  srOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    borderWidth: '0',
  },
} as const;

// ============================================================================
// SEMANTIC TOKENS
// ============================================================================

/**
 * Semantic tokens map design decisions to specific use cases
 */
export const semanticTokens = {
  // Text colors
  text: {
    primary: colors.neutral[800],      // Main text
    secondary: colors.neutral[600],    // Supporting text
    tertiary: colors.neutral[500],     // Muted text
    emergency: colors.emergency[700],  // Emergency text
    success: colors.success[700],      // Success text
    warning: colors.warning[700],      // Warning text
    inverse: colors.neutral[0],        // Text on dark backgrounds
  },

  // Background colors
  background: {
    page: colors.neutral[0],
    surface: colors.neutral[0],
    surfaceAlt: colors.neutral[50],
    emergency: colors.emergency[50],
    success: colors.success[50],
    warning: colors.warning[50],
    info: colors.primary[50],
  },

  // Interactive elements
  interactive: {
    primary: colors.primary[600],
    primaryHover: colors.primary[700],
    primaryActive: colors.primary[800],
    emergency: colors.emergency[600],
    emergencyHover: colors.emergency[700],
    emergencyActive: colors.emergency[800],
  },

  // Border colors
  border: {
    default: colors.neutral[200],
    hover: colors.neutral[300],
    focus: colors.primary[600],
    emergency: colors.emergency[600],
    error: colors.emergency[500],
  },
} as const;

// ============================================================================
// EXPORT UTILITIES
// ============================================================================

/**
 * Utility function to get CSS variables from tokens
 */
export const getCSSVariables = () => {
  const cssVars: Record<string, string> = {};

  // Convert color tokens to CSS variables
  Object.entries(colors).forEach(([key, value]) => {
    if (typeof value === 'object') {
      Object.entries(value).forEach(([shade, color]) => {
        cssVars[`--color-${key}-${shade}`] = color;
      });
    } else {
      cssVars[`--color-${key}`] = value;
    }
  });

  // Convert spacing tokens to CSS variables
  Object.entries(spacing).forEach(([key, value]) => {
    cssVars[`--spacing-${key}`] = value;
  });

  return cssVars;
};

/**
 * Media query helpers
 */
export const mediaQueries = {
  mobile: `@media (max-width: ${layout.breakpoints.sm})`,
  tablet: `@media (min-width: ${layout.breakpoints.sm}) and (max-width: ${layout.breakpoints.lg})`,
  desktop: `@media (min-width: ${layout.breakpoints.lg})`,
  large: `@media (min-width: ${layout.breakpoints.xl})`,
  reduced: '@media (prefers-reduced-motion: reduce)',
  dark: '@media (prefers-color-scheme: dark)',
  hover: '@media (hover: hover) and (pointer: fine)',
} as const;

// Type exports for TypeScript usage
export type ColorToken = typeof colors;
export type TypographyToken = typeof typography;
export type SpacingToken = typeof spacing;
export type LayoutToken = typeof layout;
export type ShadowToken = typeof shadows;
export type MotionToken = typeof motion;