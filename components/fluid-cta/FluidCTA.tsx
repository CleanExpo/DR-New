'use client';

import { motion, useAnimationControls, useMotionValue, useTransform } from 'framer-motion';
import { Phone, ArrowRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface FluidCTAProps {
  /** CTA text */
  text: string;
  /** Link destination */
  href: string;
  /** Variant style */
  variant?: 'emergency' | 'primary' | 'secondary';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Show icon */
  icon?: 'phone' | 'arrow' | 'alert' | 'none';
  /** Enable magnetic effect on hover */
  magnetic?: boolean;
  /** Enable liquid ripple effect */
  ripple?: boolean;
  /** Enable pulse animation */
  pulse?: boolean;
  /** Custom class */
  className?: string;
}

const variantStyles = {
  emergency: {
    bg: 'bg-gradient-to-r from-red-700 via-red-500 to-red-600',
    hoverBg: 'hover:from-red-700 hover:via-red-600 hover:to-red-800',
    text: 'text-white',
    shadow: 'shadow-lg shadow-red-500/50',
    glow: 'after:bg-red-500/30',
  },
  primary: {
    bg: 'bg-gradient-to-r from-blue-700 via-blue-500 to-blue-600',
    hoverBg: 'hover:from-blue-700 hover:via-blue-600 hover:to-blue-800',
    text: 'text-white',
    shadow: 'shadow-lg shadow-blue-500/50',
    glow: 'after:bg-blue-500/30',
  },
  secondary: {
    bg: 'bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700',
    hoverBg: 'hover:from-gray-800 hover:via-gray-700 hover:to-gray-800',
    text: 'text-white',
    shadow: 'shadow-lg shadow-gray-500/30',
    glow: 'after:bg-gray-500/20',
  },
};

const sizeStyles = {
  sm: 'px-6 py-3 text-sm',
  md: 'px-8 py-4 text-base',
  lg: 'px-10 py-5 text-lg',
  xl: 'px-12 py-6 text-xl',
};

const iconComponents = {
  phone: Phone,
  arrow: ArrowRight,
  alert: AlertCircle,
  none: null,
};

/**
 * FluidCTA - Smooth, professional CTA with fluid animations
 *
 * Features:
 * - Magnetic hover effect
 * - Liquid ripple animation
 * - Smooth gradient transitions
 * - Pulse effect for emergency CTAs
 * - Fully accessible with keyboard navigation
 *
 * @example
 * ```tsx
 * <FluidCTA
 *   text="Call 1300 309 361"
 *   href="tel:1300309361"
 *   variant="emergency"
 *   size="lg"
 *   icon="phone"
 *   magnetic
 *   ripple
 *   pulse
 * />
 * ```
 */
export function FluidCTA({
  text,
  href,
  variant = 'primary',
  size = 'md',
  icon = 'arrow',
  magnetic = true,
  ripple = true,
  pulse = false,
  className = '',
}: FluidCTAProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const controls = useAnimationControls();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const IconComponent = iconComponents[icon];
  const styles = variantStyles[variant];

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!magnetic) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const offsetX = (e.clientX - centerX) / 10;
    const offsetY = (e.clientY - centerY) / 10;

    x.set(offsetX);
    y.set(offsetY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ripple) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const rippleX = e.clientX - rect.left;
    const rippleY = e.clientY - rect.top;

    const newRipple = {
      x: rippleX,
      y: rippleY,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 800);
  };

  useEffect(() => {
    if (pulse) {
      controls.start({
        scale: [1, 1.05, 1],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      });
    }
  }, [pulse, controls]);

  return (
    <motion.div
      className="inline-block"
      style={{ x, y, rotateX, rotateY }}
      animate={controls}
    >
      <Link
        href={href}
        className={`
          relative
          inline-flex items-center justify-center gap-3
          ${styles.bg}
          ${styles.hoverBg}
          ${styles.text}
          ${styles.shadow}
          ${sizeStyles[size]}
          rounded-full
          font-bold
          overflow-hidden
          transition-all duration-300
          hover:scale-105
          hover:shadow-2xl
          focus:outline-none
          focus:ring-4
          focus:ring-offset-2
          ${variant === 'emergency' ? 'focus:ring-red-500' : 'focus:ring-blue-500'}
          transform-gpu
          ${className}
        `}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        aria-label={text}
      >
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={isHovered ? { x: ['-100%', '100%'] } : { x: '-100%' }}
          transition={{
            duration: 0.8,
            ease: 'easeInOut',
          }}
        />

        {/* Glow effect */}
        <motion.div
          className={`absolute inset-0 rounded-full blur-xl ${styles.glow}`}
          animate={isHovered ? { scale: 1.2, opacity: 0.6 } : { scale: 1, opacity: 0.3 }}
          transition={{ duration: 0.3 }}
        />

        {/* Ripple effects */}
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-white/30"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 0,
              height: 0,
            }}
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ width: 300, height: 300, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        ))}

        {/* Icon */}
        {IconComponent && (
          <motion.div
            animate={isHovered ? { rotate: [0, -10, 10, 0], scale: 1.1 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <IconComponent className="w-5 h-5 relative z-10" aria-hidden="true" />
          </motion.div>
        )}

        {/* Text */}
        <span className="relative z-10 font-bold tracking-wide">{text}</span>

        {/* Arrow animation on hover */}
        {icon === 'arrow' && (
          <motion.div
            animate={isHovered ? { x: 5 } : { x: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </motion.div>
        )}
      </Link>
    </motion.div>
  );
}

/**
 * FluidCTAGroup - Multiple CTAs with coordinated animations
 */
interface FluidCTAGroupProps {
  children: React.ReactNode;
  layout?: 'horizontal' | 'vertical';
  spacing?: 'sm' | 'md' | 'lg';
  align?: 'left' | 'center' | 'right';
}

export function FluidCTAGroup({
  children,
  layout = 'horizontal',
  spacing = 'md',
  align = 'center',
}: FluidCTAGroupProps) {
  const spacingClasses = {
    sm: layout === 'horizontal' ? 'gap-2' : 'gap-2',
    md: layout === 'horizontal' ? 'gap-4' : 'gap-4',
    lg: layout === 'horizontal' ? 'gap-6' : 'gap-6',
  };

  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  return (
    <motion.div
      className={`
        flex
        ${layout === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col'}
        ${spacingClasses[spacing]}
        ${alignClasses[align]}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        staggerChildren: 0.1,
      }}
    >
      {children}
    </motion.div>
  );
}
