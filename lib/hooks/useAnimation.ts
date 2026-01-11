/**
 * useAnimation Hook
 *
 * Provides context-aware animation utilities
 * Automatically disables animations in emergency context
 * Respects user's prefers-reduced-motion preference
 * Mobile-aware: Reduces animation complexity on mobile devices
 */

import { useCallback, useMemo, useEffect, useState } from 'react';
import { useIsEmergency } from './useIsEmergency';
import {
  shouldAnimateInContext,
  getContextAwareVariants,
  getContextAwareTransition,
  isMobileDevice,
  prefersReducedMotion,
  getAnimationQuality,
  Variants,
} from '@/lib/animations';

interface UseAnimationOptions {
  context?: string;
  disabled?: boolean;
  reduceMotion?: boolean;
}

export function useAnimation(options: UseAnimationOptions = {}) {
  const isEmergency = useIsEmergency();
  const context = options.context || (isEmergency ? 'emergency' : 'default');
  const [isMobile, setIsMobile] = useState(false);
  const [animationQuality, setAnimationQuality] = useState<'reduced' | 'mobile' | 'desktop'>('desktop');

  // Detect mobile device on mount and on resize
  useEffect(() => {
    const detectMobile = () => {
      setIsMobile(isMobileDevice());
      setAnimationQuality(getAnimationQuality());
    };

    detectMobile();

    // Re-check on resize (window orientation change)
    window.addEventListener('resize', detectMobile);
    return () => window.removeEventListener('resize', detectMobile);
  }, []);

  const disabled = options.disabled || !shouldAnimateInContext(context) || options.reduceMotion;

  // Check if animations should be enabled
  const isAnimationEnabled = useMemo(() => {
    return !disabled && shouldAnimateInContext(context);
  }, [context, disabled]);

  // Wrap variants with context awareness
  const wrapVariants = useCallback(
    (variants: Variants): Variants => {
      if (!isAnimationEnabled) {
        return {
          initial: {},
          animate: {},
          exit: {},
        };
      }
      return variants;
    },
    [isAnimationEnabled]
  );

  // Wrap transitions with context awareness
  const wrapTransition = useCallback(
    (transition: any) => {
      if (!isAnimationEnabled) {
        return { duration: 0 };
      }
      return transition;
    },
    [isAnimationEnabled]
  );

  return {
    isAnimationEnabled,
    context,
    isMobile,
    animationQuality,
    wrapVariants,
    wrapTransition,
    // Convenience methods
    getVariants: (variants: Variants) => getContextAwareVariants(context, variants),
    getTransition: (transition: any) => getContextAwareTransition(context, transition),
  };
}

/**
 * useMobileAnimation Hook
 *
 * Specialized hook for mobile-aware animations
 * Returns appropriate variants based on device type
 */
export function useMobileAnimation() {
  const { isAnimationEnabled, isMobile } = useAnimation();

  return {
    isAnimationEnabled,
    isMobile,
    // Mobile-aware variants
    cardVariants: isMobile
      ? { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, tap: { scale: 0.98 } }
      : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, hover: { y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' } },
    buttonAnimation: isMobile
      ? { whileTap: { scale: 0.95 }, transition: { duration: 0.1 } }
      : { whileTap: { scale: 0.95 }, whileHover: { scale: 1.05 }, transition: { type: 'spring', stiffness: 400, damping: 17 } },
    // Disable scroll animations on mobile
    scrollRevealVariants: isMobile
      ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
      : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
  };
}

/**
 * useScrollAnimation Hook
 *
 * Provides scroll-triggered animation utilities
 * DISABLED on mobile (battery/performance concerns)
 */

export function useScrollAnimation() {
  const { isAnimationEnabled, isMobile } = useAnimation();

  // Disable scroll animations on mobile - use simple fade instead
  const shouldScroll = isAnimationEnabled && !isMobile;

  return {
    isAnimationEnabled: shouldScroll,
    isMobile,
    viewportConfig: {
      once: true,
      amount: 0.2 as const,
    },
  };
}

/**
 * usePageTransition Hook
 *
 * Provides page transition utilities
 */

import { useRouter } from 'next/navigation';

export function usePageTransition() {
  const router = useRouter();
  const { isAnimationEnabled } = useAnimation();

  const navigate = useCallback(
    async (href: string) => {
      if (!isAnimationEnabled) {
        router.push(href);
        return;
      }
      // Add transition animation before navigation
      router.push(href);
    },
    [router, isAnimationEnabled]
  );

  return { navigate, isAnimationEnabled };
}

/**
 * useHoverAnimation Hook
 *
 * Provides hover animation utilities
 */

export function useHoverAnimation() {
  const { isAnimationEnabled } = useAnimation();

  return {
    isAnimationEnabled,
    whileHover: isAnimationEnabled ? { y: -5 } : {},
    whileTap: isAnimationEnabled ? { scale: 0.95 } : {},
    transition: isAnimationEnabled
      ? { type: 'spring', stiffness: 300, damping: 10 }
      : { duration: 0 },
  };
}
