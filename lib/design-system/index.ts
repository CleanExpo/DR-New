/**
 * Design System - Main Export
 *
 * Complete design system for Disaster Recovery Brisbane
 * Exports all tokens, motion patterns, and brand guidelines
 *
 * Usage:
 * ```tsx
 * import { colors, typography, fadeInUp, brandGuidelines } from '@/lib/design-system';
 * ```
 */

// ============================================
// DESIGN TOKENS
// ============================================

export {
  // Colors
  colors,

  // Typography
  typography,

  // Spacing
  spacing,

  // Border Radius
  borderRadius,

  // Shadows
  shadows,

  // Animations
  animations,

  // Breakpoints
  breakpoints,

  // Z-Index
  zIndex,

  // Component Tokens
  componentTokens,
} from './tokens';

// ============================================
// MOTION DESIGN
// ============================================

export {
  // Fade Animations
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,

  // Scale Animations
  scaleIn,
  scaleInBounce,

  // Stagger Animations
  staggerContainer,
  staggerItem,

  // Hover Animations
  hoverScale,
  hoverLift,
  hoverGlow,

  // Page Transitions
  pageTransition,

  // Continuous Animations
  pulse,
  float,
  spin,
  ping,

  // Emergency Animations
  emergencyPulse,
  emergencyGlow,

  // Scroll Animations
  scrollFadeIn,
  scrollStagger,

  // Modal Animations
  modalBackdrop,
  modalContent,

  // Card Animations
  cardHover,
  gridItem,

  // Transition Presets
  transitions,

  // Utility Functions
  createStagger,
  createFadeIn,
  respectMotionPreference,
} from './motion';

// ============================================
// BRAND GUIDELINES
// ============================================

export {
  // Complete brand guidelines
  brandGuidelines,

  // Individual sections
  brandIdentity,
  colorUsage,
  typographyUsage,
  imageryGuidelines,
  messaging,
  animationGuidelines,
  layoutPatterns,
  componentPatterns,
  accessibilityStandards,
  responsiveDesign,
  seoGuidelines,
} from './brand';

// ============================================
// TYPE EXPORTS
// ============================================

export type { Variants, Transition } from 'framer-motion';
