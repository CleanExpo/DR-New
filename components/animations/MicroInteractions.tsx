/**
 * MicroInteractions - Subtle animations for better UX
 */

'use client';

import { motion, MotionProps } from 'framer-motion';
import { ReactNode } from 'react';

/**
 * HoverScale - Scale up on hover
 */
interface HoverScaleProps extends MotionProps {
  children: ReactNode;
  scale?: number;
  className?: string;
}

export function HoverScale({
  children,
  scale = 1.05,
  className = '',
  ...props
}: HoverScaleProps) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * HoverLift - Lift element up on hover with shadow
 */
export function HoverLift({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }}
      whileTap={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * RotateOnHover - Rotate element on hover
 */
export function RotateOnHover({
  children,
  degrees = 5,
  className = '',
}: {
  children: ReactNode;
  degrees?: number;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ rotate: degrees }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * PulseButton - Pulsing button for emergency CTAs
 */
export function PulseButton({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.button
      animate={{
        scale: [1, 1.02, 1],
        boxShadow: [
          '0 0 0 0 rgba(239, 68, 68, 0.7)',
          '0 0 0 10px rgba(239, 68, 68, 0)',
          '0 0 0 0 rgba(239, 68, 68, 0)',
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

/**
 * ShakeOnError - Shake element (for form errors)
 */
export function ShakeOnError({
  children,
  isError,
  className = '',
}: {
  children: ReactNode;
  isError: boolean;
  className?: string;
}) {
  return (
    <motion.div
      animate={
        isError
          ? {
              x: [0, -10, 10, -10, 10, 0],
            }
          : {}
      }
      transition={{ duration: 0.4 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * ExpandableCard - Expand card on click
 */
export function ExpandableCard({
  children,
  isExpanded,
  className = '',
}: {
  children: ReactNode;
  isExpanded: boolean;
  className?: string;
}) {
  return (
    <motion.div
      layout
      animate={{
        height: isExpanded ? 'auto' : '200px',
        transition: {
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * FloatingElement - Gentle floating animation
 */
export function FloatingElement({
  children,
  duration = 3,
  className = '',
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * SpinOnHover - Spin icon on hover
 */
export function SpinOnHover({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * GlowOnHover - Glowing effect on hover
 */
export function GlowOnHover({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{
        boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
        transition: { duration: 0.3 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * BouncingArrow - Bouncing arrow for scroll indicators
 */
export function BouncingArrow({ className = '' }: { className?: string }) {
  return (
    <motion.div
      animate={{
        y: [0, 10, 0],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </motion.div>
  );
}

/**
 * RippleEffect - Material Design ripple effect
 */
export function RippleEffect({ className = '' }: { className?: string }) {
  return (
    <motion.span
      initial={{ scale: 0, opacity: 0.5 }}
      animate={{ scale: 2, opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`absolute inset-0 rounded-full bg-white ${className}`}
    />
  );
}

/**
 * Example Usage:
 *
 * <HoverScale>
 *   <Card>Hover me</Card>
 * </HoverScale>
 *
 * <PulseButton className="bg-red-500 text-white px-6 py-3 rounded-lg">
 *   Emergency Call
 * </PulseButton>
 *
 * <FloatingElement>
 *   <Icon />
 * </FloatingElement>
 */
