/**
 * useIntersectionObserver - Lazy load content on scroll
 *
 * @example
 * const { ref, isIntersecting } = useIntersectionObserver({
 *   threshold: 0.1,
 *   triggerOnce: true
 * });
 */

import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
  onIntersect?: (entry: IntersectionObserverEntry) => void;
}

export function useIntersectionObserver<T extends Element = HTMLDivElement>({
  threshold = 0,
  root = null,
  rootMargin = '0px',
  triggerOnce = false,
  onIntersect,
}: UseIntersectionObserverOptions = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const targetRef = useRef<T | null>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) {return;}

    // Skip if already intersected and triggerOnce is true
    if (triggerOnce && hasIntersected) {return;}

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isElementIntersecting = entry.isIntersecting;

          setIsIntersecting(isElementIntersecting);

          if (isElementIntersecting) {
            setHasIntersected(true);
            onIntersect?.(entry);

            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, triggerOnce, hasIntersected, onIntersect]);

  return {
    ref: targetRef,
    isIntersecting,
    hasIntersected,
  };
}

/**
 * useInView - Simpler hook for basic visibility detection
 */
export function useInView<T extends Element = HTMLDivElement>(
  options?: Omit<UseIntersectionObserverOptions, 'onIntersect'>
) {
  return useIntersectionObserver<T>(options);
}
