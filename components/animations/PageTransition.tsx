/**
 * PageTransition - Smooth route change animations with Framer Motion
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1], // Custom easing
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const slideVariants = {
  initial: {
    x: '100%',
    opacity: 0,
  },
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    x: '-100%',
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const scaleVariants = {
  initial: {
    scale: 0.95,
    opacity: 0,
  },
  enter: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    scale: 1.05,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

type TransitionType = 'fade' | 'slide' | 'scale';

interface PageTransitionProps {
  children: ReactNode;
  type?: TransitionType;
  className?: string;
}

export function PageTransition({
  children,
  type = 'fade',
  className = '',
}: PageTransitionProps) {
  const pathname = usePathname();

  const variants = {
    fade: pageVariants,
    slide: slideVariants,
    scale: scaleVariants,
  }[type];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={variants}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Usage in layout.tsx:
 *
 * import { PageTransition } from '@/components/animations/PageTransition';
 *
 * export default function Layout({ children }) {
 *   return (
 *     <PageTransition type="fade">
 *       {children}
 *     </PageTransition>
 *   );
 * }
 */
