/**
 * Motion Design System
 *
 * Centralized animation variants and transitions for Framer Motion.
 * Ensures consistent, fluid animations across the entire website.
 */

import { Variants, Transition } from 'framer-motion';
import { animations } from './tokens';

// ============================================
// FADE ANIMATIONS
// ============================================

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// ============================================
// SCALE ANIMATIONS
// ============================================

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

export const scaleInBounce: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  },
};

// ============================================
// STAGGER ANIMATIONS
// ============================================

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// ============================================
// HOVER ANIMATIONS
// ============================================

export const hoverScale: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.95,
  },
};

export const hoverLift: Variants = {
  rest: { y: 0, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' },
  hover: {
    y: -8,
    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

export const hoverGlow: Variants = {
  rest: { filter: 'brightness(1)' },
  hover: {
    filter: 'brightness(1.1)',
    transition: {
      duration: 0.3,
    },
  },
};

// ============================================
// PAGE TRANSITIONS
// ============================================

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

// ============================================
// CONTINUOUS ANIMATIONS
// ============================================

export const pulse: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const float: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const spin: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

export const ping: Variants = {
  animate: {
    scale: [1, 1.5],
    opacity: [1, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'easeOut',
    },
  },
};

// ============================================
// EMERGENCY-SPECIFIC ANIMATIONS
// ============================================

export const emergencyPulse: Variants = {
  animate: {
    scale: [1, 1.1, 1],
    boxShadow: [
      '0 0 0 0 rgba(220, 38, 38, 0.4)',
      '0 0 0 10px rgba(220, 38, 38, 0)',
      '0 0 0 0 rgba(220, 38, 38, 0)',
    ],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const emergencyGlow: Variants = {
  animate: {
    filter: [
      'drop-shadow(0 0 5px rgba(220, 38, 38, 0.5))',
      'drop-shadow(0 0 15px rgba(220, 38, 38, 0.8))',
      'drop-shadow(0 0 5px rgba(220, 38, 38, 0.5))',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// ============================================
// SCROLL-TRIGGERED ANIMATIONS
// ============================================

export const scrollFadeIn: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export const scrollStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// ============================================
// MODAL/OVERLAY ANIMATIONS
// ============================================

export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};

// ============================================
// CARD/GRID ANIMATIONS
// ============================================

export const cardHover: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  },
  hover: {
    scale: 1.03,
    y: -5,
    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.2)',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

export const gridItem: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: index * 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

// ============================================
// TRANSITION PRESETS
// ============================================

export const transitions = {
  default: {
    duration: 0.3,
    ease: 'easeOut',
  } as Transition,

  fast: {
    duration: 0.15,
    ease: 'easeOut',
  } as Transition,

  slow: {
    duration: 0.5,
    ease: 'easeOut',
  } as Transition,

  spring: {
    type: 'spring',
    stiffness: 200,
    damping: 20,
  } as Transition,

  springBouncy: {
    type: 'spring',
    stiffness: 300,
    damping: 15,
  } as Transition,

  springSmooth: {
    type: 'spring',
    stiffness: 100,
    damping: 25,
  } as Transition,
} as const;

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Create a stagger transition with custom delay
 */
export function createStagger(childDelay: number = 0.1, parentDelay: number = 0) {
  return {
    staggerChildren: childDelay,
    delayChildren: parentDelay,
  };
}

/**
 * Create a custom fade in animation with direction
 */
export function createFadeIn(
  direction: 'up' | 'down' | 'left' | 'right' | 'none' = 'none',
  distance: number = 20,
  duration: number = 0.5
): Variants {
  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  return {
    hidden: {
      opacity: 0,
      ...directionMap[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: 'easeOut',
      },
    },
  };
}

/**
 * Respect user's motion preferences
 */
export function respectMotionPreference(variants: Variants): Variants {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Strip all motion, keep only opacity changes
    return Object.entries(variants).reduce((acc, [key, value]) => {
      if (typeof value === 'object' && 'opacity' in value) {
        acc[key] = { opacity: value.opacity };
      } else {
        acc[key] = value;
      }
      return acc;
    }, {} as Variants);
  }
  return variants;
}
