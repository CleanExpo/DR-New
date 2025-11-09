/**
 * ScrollAnimations - Scroll-triggered animations with Framer Motion
 */

'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

/**
 * FadeInWhenVisible - Fade in element when it enters viewport
 */
interface FadeInWhenVisibleProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function FadeInWhenVisible({
  children,
  delay = 0,
  duration = 0.6,
  className = '',
}: FadeInWhenVisibleProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.2, // 20% of element visible
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * SlideInFromLeft - Slide in from left when visible
 */
export function SlideInFromLeft({
  children,
  delay = 0,
  className = '',
}: FadeInWhenVisibleProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -100 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerChildren - Stagger animation of child elements
 */
interface StaggerChildrenProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function StaggerChildren({
  children,
  staggerDelay = 0.1,
  className = '',
}: StaggerChildrenProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * ParallaxSection - Parallax scroll effect
 */
interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number; // Negative for slower, positive for faster
  className?: string;
}

export function ParallaxSection({
  children,
  speed = -0.5,
  className = '',
}: ParallaxSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * ScaleOnScroll - Scale element based on scroll position
 */
export function ScaleOnScroll({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div ref={ref} style={{ scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * ProgressBar - Scroll progress indicator
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

/**
 * CountUp - Animated number counter when in view
 */
interface CountUpProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export function CountUp({
  from = 0,
  to,
  duration = 2,
  suffix = '',
  className = '',
}: CountUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const count = useTransform(
    useScroll({
      target: ref,
      offset: ['start end', 'end start'],
    }).scrollYProgress,
    [0, 0.5],
    [from, to]
  );

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
    >
      {isInView && (
        <motion.span>
          {Math.round(to)}
          {suffix}
        </motion.span>
      )}
    </motion.span>
  );
}

/**
 * Example Usage:
 *
 * <FadeInWhenVisible>
 *   <h2>This fades in when visible</h2>
 * </FadeInWhenVisible>
 *
 * <StaggerChildren>
 *   <StaggerItem><Card>1</Card></StaggerItem>
 *   <StaggerItem><Card>2</Card></StaggerItem>
 *   <StaggerItem><Card>3</Card></StaggerItem>
 * </StaggerChildren>
 *
 * <ParallaxSection speed={-0.5}>
 *   <Image src="/hero.jpg" />
 * </ParallaxSection>
 */
