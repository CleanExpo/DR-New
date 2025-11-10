/**
 * Design System - Color Palette
 * Extracted from reference repository tailwind.config.ts
 *
 * Usage:
 * import { colors } from '@/lib/design-system/colors'
 * className={`bg-[${colors.primary.DEFAULT}]`}
 */

export const colors = {
  // Primary Brand Colors - Deep Professional Blue
  primary: {
    50: '#f0f4ff',
    100: '#dce6ff',
    200: '#b8ceff',
    300: '#8aafff',
    400: '#5a8aff',
    500: '#2563eb',
    600: '#1d4ed8',
    700: '#1e40af',
    800: '#1e3a8a',
    900: '#1e293b',
    DEFAULT: '#1d4ed8',
    foreground: '#ffffff',
  },

  // Emergency Red
  emergency: {
    50: '#fff1f0',
    100: '#ffe1de',
    200: '#ffc7c2',
    300: '#ffa09a',
    400: '#ff6b60',
    500: '#dc2626',
    600: '#b91c1c',
    700: '#991b1b',
    800: '#7f1d1d',
    900: '#450a0a',
    DEFAULT: '#dc2626',
    foreground: '#ffffff',
  },

  // Success Green
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#16a34a',
    600: '#15803d',
    700: '#166534',
    800: '#14532d',
    900: '#052e16',
    DEFAULT: '#16a34a',
    foreground: '#ffffff',
  },

  // Premium Gold
  premium: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#d97706',
    600: '#b45309',
    700: '#92400e',
    800: '#78350f',
    900: '#451a03',
    DEFAULT: '#d97706',
    foreground: '#ffffff',
  },

  // Neutral Grays
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },
} as const

/**
 * CSS Gradient Presets
 */
export const gradients = {
  primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  emergency: 'linear-gradient(135deg, #f93b1d 0%, #ea1e63 100%)',
  success: 'linear-gradient(135deg, #13ce66 0%, #00d4ff 100%)',
  dark: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
  primaryButton: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
} as const

/**
 * Accent Colors for Feature Cards
 */
export const accentColors = {
  blue: 'rgba(36, 101, 237, 0.5)',
  pink: 'rgba(236, 72, 153, 0.5)',
  cyan: 'rgba(34, 211, 238, 0.5)',
  lime: 'rgba(132, 204, 22, 0.5)',
  orange: 'rgba(249, 115, 22, 0.5)',
  purple: 'rgba(168, 85, 247, 0.5)',
  amber: 'rgba(251, 191, 36, 0.5)',
  emerald: 'rgba(16, 185, 129, 0.5)',
} as const

/**
 * Disaster Recovery Specific Colors
 */
export const serviceColors = {
  water: {
    light: '#dbeafe',
    DEFAULT: '#3b82f6',
    dark: '#1e40af',
  },
  fire: {
    light: '#fee2e2',
    DEFAULT: '#ef4444',
    dark: '#991b1b',
  },
  storm: {
    light: '#f3f4f6',
    DEFAULT: '#6b7280',
    dark: '#374151',
  },
  mould: {
    light: '#f3e8ff',
    DEFAULT: '#a855f7',
    dark: '#7e22ce',
  },
  biohazard: {
    light: '#fef3c7',
    DEFAULT: '#eab308',
    dark: '#a16207',
  },
  sewage: {
    light: '#fed7aa',
    DEFAULT: '#f97316',
    dark: '#c2410c',
  },
} as const

export type ColorScale = typeof colors.primary
export type GradientKey = keyof typeof gradients
export type AccentColorKey = keyof typeof accentColors
export type ServiceColorKey = keyof typeof serviceColors
