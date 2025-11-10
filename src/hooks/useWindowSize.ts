/**
 * useWindowSize - Responsive calculations based on window dimensions
 *
 * @example
 * const { width, height, isMobile } = useWindowSize();
 * const columns = width < 768 ? 1 : width < 1024 ? 2 : 3;
 */

import { useEffect, useState } from 'react';

interface WindowSize {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false,
    isTablet: typeof window !== 'undefined' ?
      window.innerWidth >= 768 && window.innerWidth < 1024 : false,
    isDesktop: typeof window !== 'undefined' ? window.innerWidth >= 1024 : false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') {return;}

    let timeoutId: NodeJS.Timeout | null = null;

    const handleResize = () => {
      // Debounce resize events
      if (timeoutId) {clearTimeout(timeoutId);}

      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        setWindowSize({
          width,
          height,
          isMobile: width < 768,
          isTablet: width >= 768 && width < 1024,
          isDesktop: width >= 1024,
        });
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    // Call once immediately
    handleResize();

    return () => {
      if (timeoutId) {clearTimeout(timeoutId);}
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
}

/**
 * useBreakpoint - Get current Tailwind breakpoint
 */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export function useBreakpoint(): Breakpoint {
  const { width } = useWindowSize();

  if (width < 640) {return 'xs';}
  if (width < 768) {return 'sm';}
  if (width < 1024) {return 'md';}
  if (width < 1280) {return 'lg';}
  if (width < 1536) {return 'xl';}
  return '2xl';
}

/**
 * useOrientation - Detect device orientation
 */
export type Orientation = 'portrait' | 'landscape';

export function useOrientation(): Orientation {
  const { width, height } = useWindowSize();
  return width > height ? 'landscape' : 'portrait';
}

/**
 * useScrollPosition - Track scroll position
 */
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') {return;}

    let ticking = false;

    const updatePosition = () => {
      setScrollPosition({
        x: window.scrollX,
        y: window.scrollY,
      });
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updatePosition);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollPosition;
}
