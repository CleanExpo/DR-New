// @ts-nocheck
'use client';
/**
 * ScrollReveal Component
 *
 * Triggers animations when elements come into view
 * Perfect for hero sections, feature lists, testimonials
 */

import React, { useRef } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import { useAnimation as useAnimationHook } from '@/lib/hooks/useAnimation';
import { scrollRevealVariants, scrollRevealTransition } from '@/lib/animations';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variants?: Variants;
  amount?: number | 'some' | 'all';
}

export const ScrollReveal = React.forwardRef<HTMLDivElement, ScrollRevealProps>(
  (
    {
      children,
      className = '',
      delay = 0,
      duration = 0.5,
      variants: customVariants,
      amount = 0.2,
    },
    forwardedRef
  ) => {
    const { isAnimationEnabled } = useAnimationHook();
    const controls = useAnimation();
    const internalRef = useRef<HTMLDivElement>(null);
    const inView = useInView(internalRef, {
      amount: typeof amount === 'number' ? amount : 0.2,
      once: true,
    });

    React.useEffect(() => {
      if (isAnimationEnabled && inView) {
        controls.start('visible');
      }
    }, [inView, controls, isAnimationEnabled]);

    const variants = customVariants || scrollRevealVariants;

    if (!isAnimationEnabled) {
      return (
        <div ref={forwardedRef} className={className}>
          {children}
        </div>
      );
    }

    return (
      <motion.div
        ref={internalRef}
        className={className}
        initial="hidden"
        animate={controls}
        variants={variants}
        transition={{
          ...scrollRevealTransition,
          duration,
          delay,
        }}
      >
        {children}
      </motion.div>
    );
  }
);

ScrollReveal.displayName = 'ScrollReveal';

/**
 * ScrollRevealGroup Component
 *
 * Multiple elements revealing with stagger
 */

interface ScrollRevealGroupProps {
  children: React.ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
}

export const ScrollRevealGroup = React.forwardRef<
  HTMLDivElement,
  ScrollRevealGroupProps
>(
  (
    {
      children,
      className = '',
      staggerChildren = 0.1,
      delayChildren = 0.2,
    },
    forwardedRef
  ) => {
    const { isAnimationEnabled } = useAnimationHook();
    const controls = useAnimation();
    const internalRef = useRef<HTMLDivElement>(null);
    const inView = useInView(internalRef, {
      amount: 0.2,
      once: true,
    });

    React.useEffect(() => {
      if (isAnimationEnabled && inView) {
        controls.start('visible');
      }
    }, [inView, controls, isAnimationEnabled]);

    if (!isAnimationEnabled) {
      return (
        <div ref={forwardedRef} className={className}>
          {children}
        </div>
      );
    }

    return (
      <motion.div
        ref={internalRef}
        className={className}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren,
              delayChildren,
            },
          },
        }}
      >
        {children}
      </motion.div>
    );
  }
);

ScrollRevealGroup.displayName = 'ScrollRevealGroup';

/**
 * ScrollRevealItem Component
 *
 * Individual item in a scroll reveal group
 */

interface ScrollRevealItemProps {
  children: React.ReactNode;
  className?: string;
}

export const ScrollRevealItem = React.forwardRef<
  HTMLDivElement,
  ScrollRevealItemProps
>(({ children, className = '' }, ref) => {
  const { isAnimationEnabled } = useAnimationHook();

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
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
});

ScrollRevealItem.displayName = 'ScrollRevealItem';
