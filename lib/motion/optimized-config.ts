/**
 * Optimized Framer Motion Configuration
 * Performance-first animation settings for 90+ PageSpeed scores
 */

import { MotionConfig, Variant, Transition } from 'framer-motion';

/**
 * Reduced Motion Detection
 * Respects user's prefers-reduced-motion setting
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') {return false;}
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Performance-Optimized Transition Settings
 * Uses GPU-accelerated transforms only
 */
export const optimizedTransition: Transition = {
  type: 'tween',
  duration: 0.3,
  ease: 'easeOut',
};

export const springTransition: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
  mass: 0.5,
};

export const fastTransition: Transition = {
  type: 'tween',
  duration: 0.15,
  ease: 'easeOut',
};

/**
 * Optimized Animation Variants
 * Only animate transform and opacity (GPU-accelerated)
 */
export const fadeInVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: optimizedTransition,
  },
};

export const fadeInUpVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: optimizedTransition,
  },
};

export const fadeInDownVariants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: optimizedTransition,
  },
};

export const scaleInVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springTransition,
  },
};

export const slideInLeftVariants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: optimizedTransition,
  },
};

export const slideInRightVariants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: optimizedTransition,
  },
};

/**
 * Stagger Container Configuration
 * Optimized for minimal reflow
 */
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: fastTransition,
  },
};

/**
 * Hover and Tap Animations
 * Lightweight interactions
 */
export const hoverLiftVariants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: fastTransition,
  },
  tap: {
    scale: 0.95,
    transition: fastTransition,
  },
};

export const hoverGlowVariants = {
  rest: {
    boxShadow: '0 0 0 rgba(99, 102, 241, 0)',
  },
  hover: {
    boxShadow: '0 10px 40px rgba(99, 102, 241, 0.3)',
    transition: optimizedTransition,
  },
};

/**
 * Emergency Pulse Animation
 * Optimized for attention without performance hit
 */
export const emergencyPulseVariants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Viewport Scroll Animations
 * Using IntersectionObserver for performance
 */
export const scrollFadeInVariants = {
  offscreen: {
    opacity: 0,
    y: 50,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      bounce: 0.2,
      duration: 0.6,
    },
  },
};

/**
 * Motion Configuration Props
 * Global settings for all motion components
 */
export const motionConfigProps = {
  reducedMotion: 'user', // Respect user preferences
  transition: optimizedTransition,
};

/**
 * Will-Change Optimization Hook
 * Apply will-change only during animation
 */
export const useWillChange = (isAnimating: boolean) => {
  return isAnimating ? { willChange: 'transform, opacity' } : {};
};

/**
 * GPU Acceleration Helper
 * Force GPU rendering for smooth animations
 */
export const gpuAcceleration = {
  transform: 'translateZ(0)',
  backfaceVisibility: 'hidden' as const,
  perspective: 1000,
};

/**
 * Viewport Configuration for IntersectionObserver
 * Optimized margins for lazy loading animations
 */
export const viewportConfig = {
  once: true, // Animate only once
  amount: 0.2, // Trigger when 20% visible
  margin: '-50px', // Start animation 50px before element enters viewport
};

/**
 * Performance-Optimized Motion Component Wrapper
 * Automatically applies GPU acceleration and reduced motion
 */
export const getOptimizedMotionProps = (variants: any) => {
  const shouldReduceMotion = prefersReducedMotion();

  return {
    variants,
    initial: 'hidden',
    animate: 'visible',
    viewport: viewportConfig,
    style: shouldReduceMotion ? {} : gpuAcceleration,
    transition: shouldReduceMotion ? { duration: 0.01 } : optimizedTransition,
  };
};

/**
 * Layout Animation Settings
 * Optimized for minimal CLS
 */
export const layoutTransition: Transition = {
  type: 'spring',
  stiffness: 350,
  damping: 25,
};

/**
 * Exit Animations
 * Fast exits to prevent blocking
 */
export const exitVariants = {
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.15,
      ease: 'easeIn',
    },
  },
};

/**
 * Image Load Animation
 * Smooth reveal without layout shift
 */
export const imageLoadVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};
