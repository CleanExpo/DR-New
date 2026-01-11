/**
 * Framer Motion Animation Library
 *
 * Premium animations and motion variants for NRPG platform
 * Context-aware: Disables animations in emergency context
 */

import { Variants } from 'framer-motion';

/**
 * Check if animations should be enabled
 * Respects user preferences and context
 */
export const shouldAnimateInContext = (context?: string): boolean => {
  // Never animate in emergency context
  if (context === 'emergency') return false;

  // Respect user's prefers-reduced-motion
  if (typeof window !== 'undefined') {
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  return true;
};

// ============================================================================
// PAGE TRANSITIONS
// ============================================================================

export const pageTransitions = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  fadeInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
} as const;

// ============================================================================
// BUTTON ANIMATIONS
// ============================================================================

export const buttonVariants: Variants = {
  default: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

export const buttonPressAnimation = {
  whileTap: { scale: 0.95 },
  whileHover: { scale: 1.05 },
  transition: { type: 'spring', stiffness: 400, damping: 17 },
};

// Ripple effect for button press
export const rippleVariants: Variants = {
  initial: { scale: 0, opacity: 1 },
  animate: { scale: 4, opacity: 0 },
};

export const rippleTransition = {
  duration: 0.6,
  ease: 'easeOut',
};

// ============================================================================
// CARD ANIMATIONS
// ============================================================================

export const cardVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  hover: { y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' },
};

export const cardTransition = {
  duration: 0.3,
  ease: 'easeOut',
};

export const priorityCardVariants: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  hover: { scale: 1.02 },
};

// ============================================================================
// FORM ANIMATIONS
// ============================================================================

export const inputFocusVariants: Variants = {
  initial: { borderColor: '#e2e8f0' },
  focus: { borderColor: '#0047ff' },
};

export const inputErrorVariants: Variants = {
  animate: {
    x: [0, -5, 5, -5, 5, 0],
    transition: { duration: 0.4 },
  },
};

export const labelVariants: Variants = {
  initial: { y: 0, fontSize: '1rem' },
  focus: { y: -24, fontSize: '0.875rem' },
};

export const errorMessageVariants: Variants = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: 'auto' },
  exit: { opacity: 0, height: 0 },
  transition: { duration: 0.2 },
};

// ============================================================================
// MODAL & DIALOG ANIMATIONS
// ============================================================================

export const modalOverlayVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const modalContentVariants: Variants = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 20 },
};

export const modalTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  duration: 0.3,
};

// ============================================================================
// DROPDOWN & MENU ANIMATIONS
// ============================================================================

export const dropdownVariants: Variants = {
  initial: { opacity: 0, y: -10, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.95 },
};

export const dropdownTransition = {
  duration: 0.2,
  ease: 'easeOut',
};

export const menuItemVariants: Variants = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  hover: { x: 5, backgroundColor: 'rgba(0,0,0,0.05)' },
};

// ============================================================================
// LIST & STAGGER ANIMATIONS
// ============================================================================

export const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

// ============================================================================
// SCROLL-TRIGGERED ANIMATIONS
// ============================================================================

export const scrollRevealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const scrollRevealTransition = {
  duration: 0.5,
  ease: 'easeOut',
};

// Viewport trigger configuration
export const viewportConfig = {
  once: true,
  amount: 0.2 as const, // Trigger when 20% of element is in view
};

// ============================================================================
// NAVIGATION ANIMATIONS
// ============================================================================

export const navbarVariants: Variants = {
  hidden: { y: -100, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const hamburgerVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  tap: { scale: 0.9 },
};

export const sidebarVariants: Variants = {
  initial: { x: '-100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '-100%', opacity: 0 },
};

export const sidebarTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

export const navItemVariants: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  hover: { x: 5, color: '#0047ff' },
};

// ============================================================================
// LOADING & PROGRESS ANIMATIONS
// ============================================================================

export const spinnerVariants: Variants = {
  spin: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1,
      ease: 'linear',
    },
  },
};

export const pulseVariants: Variants = {
  pulse: {
    opacity: [0.6, 1, 0.6],
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: 'easeInOut',
    },
  },
};

export const progressBarVariants: Variants = {
  initial: { scaleX: 0, originX: 0 },
  animate: { scaleX: 1 },
};

export const skeletonVariants: Variants = {
  initial: { opacity: 0.5 },
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: 'easeInOut',
    },
  },
};

// ============================================================================
// TOAST & NOTIFICATION ANIMATIONS
// ============================================================================

export const toastVariants: Variants = {
  initial: { opacity: 0, y: 20, x: 0 },
  animate: { opacity: 1, y: 0, x: 0 },
  exit: { opacity: 0, y: -20, x: 0 },
};

export const toastTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  duration: 0.3,
};

// ============================================================================
// ACCORDION ANIMATIONS
// ============================================================================

export const accordionItemVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const accordionContentVariants: Variants = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
};

export const accordionContentTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  duration: 0.3,
};

// ============================================================================
// BADGE & PILL ANIMATIONS
// ============================================================================

export const badgePopVariants: Variants = {
  initial: { scale: 0 },
  animate: { scale: 1 },
};

export const badgePopTransition = {
  type: 'spring',
  stiffness: 500,
  damping: 15,
};

// ============================================================================
// HERO & BANNER ANIMATIONS
// ============================================================================

export const heroTitleVariants: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export const heroSubtitleVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export const heroCtaVariants: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  hover: { scale: 1.05 },
};

export const heroImageVariants: Variants = {
  initial: { opacity: 0, scale: 1.1 },
  animate: { opacity: 1, scale: 1 },
};

export const heroTransition = {
  staggerChildren: 0.2,
  delayChildren: 0.3,
};

// ============================================================================
// TIMELINE ANIMATIONS
// ============================================================================

export const timelineItemVariants: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
};

export const timelineDotVariants: Variants = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  active: { scale: 1.2, boxShadow: '0 0 0 8px rgba(0,71,255,0.2)' },
};

// ============================================================================
// IMAGE & MEDIA ANIMATIONS
// ============================================================================

export const imageLoadVariants: Variants = {
  initial: { opacity: 0, filter: 'blur(10px)' },
  animate: { opacity: 1, filter: 'blur(0px)' },
};

export const imageLoadTransition = {
  duration: 0.4,
  ease: 'easeOut',
};

// ============================================================================
// GESTURE ANIMATIONS (Touch/Mobile)
// ============================================================================

export const swipeableVariants: Variants = {
  initial: { x: 0 },
  animate: { x: 0 },
  exit: { x: 500, opacity: 0 },
};

export const dragVariants: Variants = {
  initial: { scale: 1 },
  animate: { scale: 1 },
  whileDrag: { scale: 1.05, cursor: 'grabbing' },
};

// ============================================================================
// CONTEXT-AWARE ANIMATIONS
// ============================================================================

/**
 * Get animation variant based on context
 * Emergency context returns no-op animations
 */
export const getContextAwareVariants = (
  context: string | undefined,
  variants: Variants
): Variants => {
  if (context === 'emergency') {
    // Return no-op variants for emergency
    return {
      initial: {},
      animate: {},
      exit: {},
    };
  }
  return variants;
};

/**
 * Get transition based on context and user preferences
 */
export const getContextAwareTransition = (
  context: string | undefined,
  transition: any
) => {
  if (!shouldAnimateInContext(context)) {
    return { duration: 0 };
  }
  return transition;
};

// ============================================================================
// PRESET ANIMATION SEQUENCES
// ============================================================================

/**
 * Page load animation sequence
 */
export const pageLoadSequence = {
  container: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  },
  item: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
};

/**
 * Hover lift animation (for cards, buttons)
 */
export const hoverLift = {
  whileHover: { y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' },
  whileTap: { y: -4 },
  transition: { type: 'spring', stiffness: 300, damping: 10 },
};

/**
 * Success check animation
 */
export const successCheckAnimation = {
  initial: { scale: 0, rotate: -45 },
  animate: { scale: 1, rotate: 0 },
  transition: {
    type: 'spring',
    stiffness: 300,
    damping: 15,
  },
};

/**
 * Error shake animation
 */
export const errorShakeAnimation = {
  animate: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 },
  },
};

// ============================================================================
// SPRING PRESETS
// ============================================================================

export const spring = {
  responsive: { type: 'spring' as const, stiffness: 300, damping: 30 },
  stiff: { type: 'spring' as const, stiffness: 400, damping: 20 },
  bouncy: { type: 'spring' as const, stiffness: 200, damping: 10 },
  snappy: { type: 'spring' as const, stiffness: 500, damping: 30 },
};

// ============================================================================
// EASING CURVES
// ============================================================================

export const easings = {
  smooth: [0.4, 0, 0.2, 1], // Material Design standard
  entrance: [0.16, 1, 0.3, 1], // Entrance easing
  exit: [0.7, 0, 0.84, 0], // Exit easing
  emphasized: [0.2, 0, 0, 1], // Emphasized easing
};
