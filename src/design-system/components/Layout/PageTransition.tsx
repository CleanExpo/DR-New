/**
 * PageTransition Component
 *
 * Wraps pages with entry/exit animations
 * Context-aware: No animations in emergency context
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimation } from '@/lib/hooks/useAnimation';
import { pageTransitions } from '@/lib/animations';

interface PageTransitionProps {
  children: React.ReactNode;
  variant?: 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn';
  className?: string;
}

export const PageTransition = React.forwardRef<HTMLDivElement, PageTransitionProps>(
  ({ children, variant = 'fadeInUp', className = '' }, ref) => {
    const { isAnimationEnabled } = useAnimation();
    const animation = pageTransitions[variant];

    if (!isAnimationEnabled) {
      return (
        <div ref={ref} className={className}>
          {children}
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        className={className}
        initial={animation.initial}
        animate={animation.animate}
        exit={animation.exit}
        transition={animation.transition}
      >
        {children}
      </motion.div>
    );
  }
);

PageTransition.displayName = 'PageTransition';

/**
 * AnimatedContent Component
 *
 * Wrapper for pages with staggered children animations
 */

interface AnimatedContentProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const AnimatedContent = React.forwardRef<
  HTMLDivElement,
  AnimatedContentProps
>(({ children, className = '', staggerDelay = 0.1 }, ref) => {
  const { isAnimationEnabled } = useAnimation();

  if (!isAnimationEnabled) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        staggerChildren: staggerDelay,
        delayChildren: 0.2,
      }}
    >
      {children}
    </motion.div>
  );
});

AnimatedContent.displayName = 'AnimatedContent';

/**
 * AnimatedItem Component
 *
 * Individual item animation within stagger container
 */

interface AnimatedItemProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedItem = React.forwardRef<HTMLDivElement, AnimatedItemProps>(
  ({ children, className = '' }, ref) => {
    const { isAnimationEnabled } = useAnimation();

    if (!isAnimationEnabled) {
      return (
        <div ref={ref} className={className}>
          {children}
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        className={className}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {children}
      </motion.div>
    );
  }
);

AnimatedItem.displayName = 'AnimatedItem';
