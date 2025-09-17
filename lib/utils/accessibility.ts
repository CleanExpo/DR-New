// Accessibility utilities for WCAG compliance

// Screen reader only class
export const srOnly = 'absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0';

// Focus visible styles
export const focusRing = {
  default: 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
  primary: 'focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2',
  emergency: 'focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2',
  success: 'focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2',
  warning: 'focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2',
  dark: 'focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900'
};

// Skip to main content component
export const skipToMainContent = `
  <a href="#main-content" className="${srOnly} focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md">
    Skip to main content
  </a>
`;

// ARIA live region utilities
export const ariaLive = {
  polite: 'aria-live="polite" aria-atomic="true"',
  assertive: 'aria-live="assertive" aria-atomic="true"',
  off: 'aria-live="off"'
};

// Common ARIA labels for disaster recovery context
export const ariaLabels = {
  // Navigation
  mainNav: 'Main navigation',
  mobileMenu: 'Mobile menu',
  breadcrumb: 'Breadcrumb navigation',
  pagination: 'Pagination navigation',

  // CTAs
  emergencyCall: 'Call emergency hotline 1300 309 361',
  getQuote: 'Get free quote',
  bookService: 'Book emergency service',
  viewDetails: 'View service details',

  // Forms
  requiredField: 'Required field',
  phoneNumber: 'Phone number (10 digits)',
  emailAddress: 'Email address',
  serviceType: 'Select service type',
  urgencyLevel: 'Select urgency level',

  // Status
  loading: 'Loading content',
  loadingMore: 'Loading more items',
  success: 'Operation successful',
  error: 'Error occurred',
  warning: 'Warning message',

  // Emergency
  emergencyBanner: 'Emergency response available 24/7',
  activeAlert: 'Active weather alert',
  responseTime: 'Estimated response time',

  // Interactive elements
  close: 'Close',
  expand: 'Expand section',
  collapse: 'Collapse section',
  menu: 'Open menu',
  search: 'Search',
  filter: 'Filter results',
  sort: 'Sort results',

  // Media
  heroImage: 'Hero banner image',
  galleryImage: 'Gallery image',
  beforeImage: 'Before restoration image',
  afterImage: 'After restoration image',

  // Social
  facebook: 'Visit our Facebook page',
  twitter: 'Visit our Twitter profile',
  linkedin: 'Visit our LinkedIn page',
  instagram: 'Visit our Instagram profile'
};

// Semantic HTML role mappings
export const roles = {
  banner: 'banner',
  navigation: 'navigation',
  main: 'main',
  complementary: 'complementary',
  contentinfo: 'contentinfo',
  search: 'search',
  alert: 'alert',
  status: 'status',
  timer: 'timer',
  button: 'button',
  link: 'link',
  list: 'list',
  listitem: 'listitem',
  img: 'img',
  presentation: 'presentation'
};

// Keyboard navigation helpers
export const handleKeyboardNav = (
  event: React.KeyboardEvent,
  callbacks: {
    onEnter?: () => void;
    onSpace?: () => void;
    onEscape?: () => void;
    onArrowUp?: () => void;
    onArrowDown?: () => void;
    onArrowLeft?: () => void;
    onArrowRight?: () => void;
    onTab?: () => void;
  }
) => {
  const { key } = event;

  switch (key) {
    case 'Enter':
      callbacks.onEnter?.();
      break;
    case ' ':
      event.preventDefault();
      callbacks.onSpace?.();
      break;
    case 'Escape':
      callbacks.onEscape?.();
      break;
    case 'ArrowUp':
      event.preventDefault();
      callbacks.onArrowUp?.();
      break;
    case 'ArrowDown':
      event.preventDefault();
      callbacks.onArrowDown?.();
      break;
    case 'ArrowLeft':
      callbacks.onArrowLeft?.();
      break;
    case 'ArrowRight':
      callbacks.onArrowRight?.();
      break;
    case 'Tab':
      callbacks.onTab?.();
      break;
  }
};

// Focus trap for modals and overlays
export const trapFocus = (element: HTMLElement) => {
  const focusableElements = element.querySelectorAll<HTMLElement>(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
  );

  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable?.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable?.focus();
        e.preventDefault();
      }
    }
  };

  element.addEventListener('keydown', handleTabKey);

  // Focus first element
  firstFocusable?.focus();

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleTabKey);
  };
};

// Announce to screen readers
export const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = srOnly;
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Generate unique IDs for ARIA relationships
export const generateId = (prefix: string = 'aria') => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

// Heading hierarchy helper
export const HeadingLevel = {
  h1: 'h1' as const,
  h2: 'h2' as const,
  h3: 'h3' as const,
  h4: 'h4' as const,
  h5: 'h5' as const,
  h6: 'h6' as const
};

// Form validation ARIA attributes
export const validationAttrs = (isValid: boolean | undefined, errorId?: string) => {
  if (isValid === undefined) return {};

  return {
    'aria-invalid': !isValid,
    'aria-describedby': !isValid && errorId ? errorId : undefined
  };
};

// Loading state attributes
export const loadingAttrs = (isLoading: boolean) => ({
  'aria-busy': isLoading,
  'aria-live': isLoading ? 'polite' : undefined
});

// Button state attributes
export const buttonAttrs = (
  isPressed?: boolean,
  isExpanded?: boolean,
  controls?: string,
  label?: string
) => ({
  'aria-pressed': isPressed,
  'aria-expanded': isExpanded,
  'aria-controls': controls,
  'aria-label': label
});