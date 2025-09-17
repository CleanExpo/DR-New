// Responsive utilities for mobile optimization

export const breakpoints = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const;

export const useBreakpoint = () => {
  if (typeof window === 'undefined') return 'lg';

  const width = window.innerWidth;

  if (width < breakpoints.sm) return 'xs';
  if (width < breakpoints.md) return 'sm';
  if (width < breakpoints.lg) return 'md';
  if (width < breakpoints.xl) return 'lg';
  if (width < breakpoints['2xl']) return 'xl';
  return '2xl';
};

export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < breakpoints.md;
};

export const isTablet = () => {
  if (typeof window === 'undefined') return false;
  const width = window.innerWidth;
  return width >= breakpoints.md && width < breakpoints.lg;
};

export const isDesktop = () => {
  if (typeof window === 'undefined') return true;
  return window.innerWidth >= breakpoints.lg;
};

// Responsive text classes
export const responsiveText = {
  // Headings
  h1: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl',
  h2: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
  h3: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
  h4: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
  h5: 'text-base sm:text-lg md:text-xl lg:text-2xl',
  h6: 'text-sm sm:text-base md:text-lg lg:text-xl',

  // Body text
  body: 'text-sm sm:text-base',
  bodyLarge: 'text-base sm:text-lg',
  bodySmall: 'text-xs sm:text-sm',

  // Special
  hero: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl',
  subtitle: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
  caption: 'text-xs sm:text-sm md:text-base'
};

// Responsive spacing classes
export const responsiveSpacing = {
  // Padding
  p: {
    xs: 'p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6',
    sm: 'p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8',
    md: 'p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10',
    lg: 'p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12',
    xl: 'p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16'
  },

  // Padding X
  px: {
    xs: 'px-2 sm:px-3 md:px-4 lg:px-5 xl:px-6',
    sm: 'px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8',
    md: 'px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10',
    lg: 'px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12',
    xl: 'px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16'
  },

  // Padding Y
  py: {
    xs: 'py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6',
    sm: 'py-3 sm:py-4 md:py-5 lg:py-6 xl:py-8',
    md: 'py-4 sm:py-5 md:py-6 lg:py-8 xl:py-10',
    lg: 'py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20',
    xl: 'py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32'
  },

  // Margin
  m: {
    xs: 'm-2 sm:m-3 md:m-4 lg:m-5 xl:m-6',
    sm: 'm-3 sm:m-4 md:m-5 lg:m-6 xl:m-8',
    md: 'm-4 sm:m-5 md:m-6 lg:m-8 xl:m-10',
    lg: 'm-5 sm:m-6 md:m-8 lg:m-10 xl:m-12',
    xl: 'm-6 sm:m-8 md:m-10 lg:m-12 xl:m-16'
  },

  // Gap
  gap: {
    xs: 'gap-2 sm:gap-3 md:gap-4',
    sm: 'gap-3 sm:gap-4 md:gap-5',
    md: 'gap-4 sm:gap-5 md:gap-6',
    lg: 'gap-5 sm:gap-6 md:gap-8',
    xl: 'gap-6 sm:gap-8 md:gap-10'
  }
};

// Responsive grid classes
export const responsiveGrid = {
  cols: {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
    6: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'
  }
};

// Responsive flex classes
export const responsiveFlex = {
  direction: {
    row: 'flex-col sm:flex-row',
    rowReverse: 'flex-col sm:flex-row-reverse',
    col: 'flex-row sm:flex-col',
    colReverse: 'flex-row sm:flex-col-reverse'
  },
  wrap: {
    wrap: 'flex-wrap',
    nowrap: 'flex-nowrap',
    wrapReverse: 'flex-wrap-reverse'
  }
};

// Mobile-first container classes
export const container = {
  default: 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  narrow: 'w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
  wide: 'w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8',
  full: 'w-full px-4 sm:px-6 lg:px-8'
};

// Button size classes
export const buttonSizes = {
  xs: 'px-2.5 py-1.5 text-xs',
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-5 py-3 text-lg',
  xl: 'px-6 py-3.5 text-xl',
  responsive: 'px-3 py-2 text-sm sm:px-4 sm:py-2.5 sm:text-base lg:px-5 lg:py-3 lg:text-lg'
};

// Mobile-optimized touch targets (minimum 44x44px)
export const touchTarget = {
  default: 'min-h-[44px] min-w-[44px]',
  sm: 'min-h-[36px] min-w-[36px] sm:min-h-[44px] sm:min-w-[44px]',
  lg: 'min-h-[48px] min-w-[48px] sm:min-h-[56px] sm:min-w-[56px]'
};

// Z-index layers
export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
  notification: 80,
  loading: 90,
  emergency: 100
};

// Visibility utilities
export const visibility = {
  mobileOnly: 'block sm:hidden',
  tabletOnly: 'hidden sm:block lg:hidden',
  desktopOnly: 'hidden lg:block',
  notMobile: 'hidden sm:block',
  notTablet: 'block sm:hidden lg:block',
  notDesktop: 'block lg:hidden'
};