/**
 * Design System - Central Export
 *
 * Single import point for all design system tokens and utilities.
 * Extracted from reference repository design system.
 *
 * Usage:
 * ```tsx
 * import { colors, typography, componentStyles, fadeIn, fadeInUp } from '@/lib/design-system'
 * ```
 */

export * from './colors'
export * from './typography'
export * from './components'
export * from './motion'
export * from './tokens'

// Re-export commonly used items for convenience
export { colors, gradients, accentColors, serviceColors } from './colors'
export { typography, fontWeights, lineHeights, letterSpacing } from './typography'
export { componentStyles, animations, shadows, borderRadius, transitions } from './components'
export { spacing, designTokens } from './tokens'
