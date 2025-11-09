/**
 * Lazy-Loaded Motion Components
 * Code-split Framer Motion to reduce initial bundle size
 *
 * Import from this file instead of 'framer-motion' directly:
 * import { MotionDiv, MotionSection } from '@/lib/motion/components'
 */

'use client';

import dynamic from 'next/dynamic';
import { ComponentType, useState, useEffect } from 'react';
import type {
  MotionProps,
  HTMLMotionProps,
  SVGMotionProps,
  ForwardRefComponent,
} from 'framer-motion';

/**
 * Lazy-loaded motion.div with loading fallback
 * Reduces initial JS bundle by ~80KB gzipped
 */
export const MotionDiv = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.div),
  {
    ssr: true,
    loading: () => <div />,
  }
) as ForwardRefComponent<HTMLDivElement, HTMLMotionProps<'div'>>;

export const MotionSection = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.section),
  {
    ssr: true,
    loading: () => <section />,
  }
) as ForwardRefComponent<HTMLElement, HTMLMotionProps<'section'>>;

export const MotionArticle = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.article),
  {
    ssr: true,
    loading: () => <article />,
  }
) as ForwardRefComponent<HTMLElement, HTMLMotionProps<'article'>>;

export const MotionSpan = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.span),
  {
    ssr: true,
    loading: () => <span />,
  }
) as ForwardRefComponent<HTMLSpanElement, HTMLMotionProps<'span'>>;

export const MotionP = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.p),
  {
    ssr: true,
    loading: () => <p />,
  }
) as ForwardRefComponent<HTMLParagraphElement, HTMLMotionProps<'p'>>;

export const MotionH1 = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.h1),
  {
    ssr: true,
    loading: () => <h1 />,
  }
) as ForwardRefComponent<HTMLHeadingElement, HTMLMotionProps<'h1'>>;

export const MotionH2 = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.h2),
  {
    ssr: true,
    loading: () => <h2 />,
  }
) as ForwardRefComponent<HTMLHeadingElement, HTMLMotionProps<'h2'>>;

export const MotionH3 = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.h3),
  {
    ssr: true,
    loading: () => <h3 />,
  }
) as ForwardRefComponent<HTMLHeadingElement, HTMLMotionProps<'h3'>>;

export const MotionButton = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.button),
  {
    ssr: true,
    loading: () => <button />,
  }
) as ForwardRefComponent<HTMLButtonElement, HTMLMotionProps<'button'>>;

export const MotionA = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.a),
  {
    ssr: true,
    loading: () => <a />,
  }
) as ForwardRefComponent<HTMLAnchorElement, HTMLMotionProps<'a'>>;

export const MotionLi = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.li),
  {
    ssr: true,
    loading: () => <li />,
  }
) as ForwardRefComponent<HTMLLIElement, HTMLMotionProps<'li'>>;

export const MotionUl = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.ul),
  {
    ssr: true,
    loading: () => <ul />,
  }
) as ForwardRefComponent<HTMLUListElement, HTMLMotionProps<'ul'>>;

export const MotionImg = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.img),
  {
    ssr: true,
    loading: () => <img alt="" />,
  }
) as ForwardRefComponent<HTMLImageElement, HTMLMotionProps<'img'>>;

export const MotionSvg = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.svg),
  {
    ssr: true,
    loading: () => <svg />,
  }
) as ForwardRefComponent<SVGSVGElement, SVGMotionProps<SVGSVGElement>>;

export const MotionPath = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.path),
  {
    ssr: true,
    loading: () => <path />,
  }
) as ForwardRefComponent<SVGPathElement, SVGMotionProps<SVGPathElement>>;

/**
 * Lazy-loaded AnimatePresence for exit animations
 * Only loads when needed for modal/drawer animations
 */
export const AnimatePresence = dynamic(
  () => import('framer-motion').then((mod) => mod.AnimatePresence),
  {
    ssr: false, // AnimatePresence is client-side only
  }
) as ComponentType<any>;

/**
 * Lazy-loaded useScroll hook for scroll-triggered animations
 */
export const useScrollLazy = () => {
  const [hook, setHook] = useState<any>(null);

  useEffect(() => {
    import('framer-motion').then((mod) => {
      setHook(() => mod.useScroll);
    });
  }, []);

  return hook;
};

/**
 * Lazy-loaded useInView hook for viewport detection
 */
export const useInViewLazy = () => {
  const [hook, setHook] = useState<any>(null);

  useEffect(() => {
    import('framer-motion').then((mod) => {
      setHook(() => mod.useInView);
    });
  }, []);

  return hook;
};

/**
 * Lazy-loaded useAnimation hook for imperative animations
 */
export const useAnimationLazy = () => {
  const [hook, setHook] = useState<any>(null);

  useEffect(() => {
    import('framer-motion').then((mod) => {
      setHook(() => mod.useAnimation);
    });
  }, []);

  return hook;
};

// Export commonly used types
export type {
  MotionProps,
  HTMLMotionProps,
  SVGMotionProps,
  Variants,
  Transition,
  AnimationControls,
} from 'framer-motion';

// Re-export motion configuration from optimized-config
export * from './optimized-config';
