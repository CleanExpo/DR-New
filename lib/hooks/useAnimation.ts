/**
 * useAnimation Hook
 *
 * Provides context-aware animation utilities
 * Automatically disables animations in emergency context
 * Respects user's prefers-reduced-motion preference
 */

import { useCallback, useMemo } from 'react';
import { useIsEmergency } from './useIsEmergency';
import {
  shouldAnimateInContext,
  getContextAwareVariants,
  getContextAwareTransition,
  Variants,
} from '@/lib/animations';

interface UseAnimationOptions {
  context?: string;
  disabled?: boolean;
}

export function useAnimation(options: UseAnimationOptions = {}) {
  const isEmergency = useIsEmergency();
  const context = options.context || (isEmergency ? 'emergency' : 'default');
  const disabled = options.disabled || !shouldAnimateInContext(context);

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
    wrapVariants,
    wrapTransition,
    // Convenience methods
    getVariants: (variants: Variants) => getContextAwareVariants(context, variants),
    getTransition: (transition: any) => getContextAwareTransition(context, transition),
  };
}

/**
 * useScrollAnimation Hook
 *
 * Provides scroll-triggered animation utilities
 */

export function useScrollAnimation() {
  const { isAnimationEnabled } = useAnimation();

  return {
    isAnimationEnabled,
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
