/**
 * WCAG AAA Compliance Utilities
 * Ensures highest level of web accessibility
 */

// Color contrast ratios for WCAG AAA
export const WCAG_AAA_CONTRAST = {
  normal: 7.0,      // 7:1 for normal text
  large: 4.5,       // 4.5:1 for large text (18pt+ or 14pt+ bold)
  enhanced: 10.0    // Enhanced contrast for critical elements
} as const;

// Calculate relative luminance
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calculate contrast ratio between two colors
export function getContrastRatio(color1: string, color2: string): number {
  // Convert hex to RGB
  const hex2rgb = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
      : [0, 0, 0];
  };

  const [r1, g1, b1] = hex2rgb(color1);
  const [r2, g2, b2] = hex2rgb(color2);

  const l1 = getLuminance(r1, g1, b1);
  const l2 = getLuminance(r2, g2, b2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

// Check if color combination meets WCAG AAA standards
export function meetsWCAGAAA(
  foreground: string,
  background: string,
  isLargeText: boolean = false
): boolean {
  const ratio = getContrastRatio(foreground, background);
  const requiredRatio = isLargeText ? WCAG_AAA_CONTRAST.large : WCAG_AAA_CONTRAST.normal;
  return ratio >= requiredRatio;
}

// ARIA roles and properties for enhanced accessibility
export const ARIA_ROLES = {
  navigation: 'navigation',
  main: 'main',
  complementary: 'complementary',
  contentinfo: 'contentinfo',
  banner: 'banner',
  search: 'search',
  form: 'form',
  region: 'region',
  alert: 'alert',
  alertdialog: 'alertdialog',
  article: 'article',
  button: 'button',
  dialog: 'dialog',
  heading: 'heading',
  img: 'img',
  link: 'link',
  list: 'list',
  listitem: 'listitem',
  menu: 'menu',
  menuitem: 'menuitem',
  progressbar: 'progressbar',
  status: 'status',
  tab: 'tab',
  tablist: 'tablist',
  tabpanel: 'tabpanel',
  textbox: 'textbox',
  timer: 'timer',
  toolbar: 'toolbar'
} as const;

// ARIA properties for enhanced semantics
export const ARIA_PROPS = {
  label: 'aria-label',
  labelledby: 'aria-labelledby',
  describedby: 'aria-describedby',
  required: 'aria-required',
  invalid: 'aria-invalid',
  hidden: 'aria-hidden',
  expanded: 'aria-expanded',
  selected: 'aria-selected',
  checked: 'aria-checked',
  pressed: 'aria-pressed',
  current: 'aria-current',
  live: 'aria-live',
  atomic: 'aria-atomic',
  busy: 'aria-busy',
  disabled: 'aria-disabled',
  readonly: 'aria-readonly',
  activedescendant: 'aria-activedescendant',
  controls: 'aria-controls',
  flowto: 'aria-flowto',
  haspopup: 'aria-haspopup',
  level: 'aria-level',
  multiline: 'aria-multiline',
  multiselectable: 'aria-multiselectable',
  orientation: 'aria-orientation',
  owns: 'aria-owns',
  posinset: 'aria-posinset',
  setsize: 'aria-setsize',
  sort: 'aria-sort',
  valuemax: 'aria-valuemax',
  valuemin: 'aria-valuemin',
  valuenow: 'aria-valuenow',
  valuetext: 'aria-valuetext'
} as const;

// Focus management utilities
export const FocusManager = {
  // Trap focus within a container
  trapFocus(container: HTMLElement): () => void {
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
    );

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
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

    container.addEventListener('keydown', handleKeyDown);
    firstFocusable?.focus();

    return () => container.removeEventListener('keydown', handleKeyDown);
  },

  // Restore focus to previous element
  restoreFocus(element: HTMLElement | null): void {
    element?.focus();
  },

  // Get currently focused element
  getCurrentFocus(): HTMLElement | null {
    return document.activeElement as HTMLElement;
  }
};

// Keyboard navigation utilities
export const KeyboardNav = {
  // Handle arrow key navigation
  handleArrowKeys(
    e: KeyboardEvent,
    items: HTMLElement[],
    currentIndex: number,
    options: {
      wrap?: boolean;
      orientation?: 'horizontal' | 'vertical' | 'both';
      onSelect?: (index: number) => void;
    } = {}
  ): number {
    const { wrap = true, orientation = 'vertical', onSelect } = options;
    let newIndex = currentIndex;

    switch (e.key) {
      case 'ArrowUp':
        if (orientation !== 'horizontal') {
          newIndex = currentIndex - 1;
          if (newIndex < 0) newIndex = wrap ? items.length - 1 : 0;
          e.preventDefault();
        }
        break;

      case 'ArrowDown':
        if (orientation !== 'horizontal') {
          newIndex = currentIndex + 1;
          if (newIndex >= items.length) newIndex = wrap ? 0 : items.length - 1;
          e.preventDefault();
        }
        break;

      case 'ArrowLeft':
        if (orientation !== 'vertical') {
          newIndex = currentIndex - 1;
          if (newIndex < 0) newIndex = wrap ? items.length - 1 : 0;
          e.preventDefault();
        }
        break;

      case 'ArrowRight':
        if (orientation !== 'vertical') {
          newIndex = currentIndex + 1;
          if (newIndex >= items.length) newIndex = wrap ? 0 : items.length - 1;
          e.preventDefault();
        }
        break;

      case 'Home':
        newIndex = 0;
        e.preventDefault();
        break;

      case 'End':
        newIndex = items.length - 1;
        e.preventDefault();
        break;

      case 'Enter':
      case ' ':
        if (onSelect) {
          onSelect(currentIndex);
          e.preventDefault();
        }
        break;
    }

    if (newIndex !== currentIndex && items[newIndex]) {
      items[newIndex].focus();
    }

    return newIndex;
  },

  // Check if key is navigation key
  isNavigationKey(key: string): boolean {
    return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Tab', 'Enter', ' '].includes(key);
  }
};

// Screen reader utilities
export const ScreenReaderUtils = {
  // Announce message to screen readers
  announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },

  // Create visually hidden but screen reader accessible element
  visuallyHidden(): React.CSSProperties {
    return {
      position: 'absolute',
      left: '-10000px',
      top: 'auto',
      width: '1px',
      height: '1px',
      overflow: 'hidden'
    };
  }
};

// High contrast mode detection
export function isHighContrastMode(): boolean {
  if (typeof window === 'undefined') return false;

  const testElement = document.createElement('div');
  testElement.style.backgroundColor = 'rgb(255, 255, 255)';
  testElement.style.display = 'none';
  document.body.appendChild(testElement);

  const computedStyle = window.getComputedStyle(testElement);
  const isHighContrast = computedStyle.backgroundColor !== 'rgb(255, 255, 255)';

  document.body.removeChild(testElement);
  return isHighContrast;
}

// Reduced motion preference
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Text spacing utilities for WCAG AAA
export const TextSpacing = {
  // Line height requirements
  lineHeight: {
    body: 1.5,      // Minimum for body text
    heading: 1.2,   // Minimum for headings
    enhanced: 2.0   // Enhanced readability
  },

  // Letter spacing requirements
  letterSpacing: {
    normal: '0.12em',
    wide: '0.16em',
    wider: '0.2em'
  },

  // Word spacing requirements
  wordSpacing: {
    normal: '0.16em',
    wide: '0.2em'
  },

  // Paragraph spacing requirements
  paragraphSpacing: {
    normal: '2em',
    wide: '2.5em'
  }
};

// Reading level analyzer (simplified)
export function analyzeReadingLevel(text: string): {
  level: string;
  score: number;
  recommendation: string;
} {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const syllables = words.reduce((count, word) => {
    return count + countSyllables(word);
  }, 0);

  // Flesch-Kincaid Grade Level
  const score = 0.39 * (words.length / sentences.length) +
                11.8 * (syllables / words.length) - 15.59;

  let level = 'College';
  let recommendation = 'Consider simplifying for better accessibility';

  if (score <= 6) {
    level = 'Elementary';
    recommendation = 'Excellent readability for all users';
  } else if (score <= 9) {
    level = 'Middle School';
    recommendation = 'Good readability for most users';
  } else if (score <= 12) {
    level = 'High School';
    recommendation = 'Acceptable, but consider simplifying complex sections';
  }

  return { level, score: Math.max(0, score), recommendation };
}

// Count syllables in a word (simplified)
function countSyllables(word: string): number {
  word = word.toLowerCase();
  let count = 0;
  const vowels = 'aeiouy';
  let previousWasVowel = false;

  for (let i = 0; i < word.length; i++) {
    const isVowel = vowels.includes(word[i]);
    if (isVowel && !previousWasVowel) {
      count++;
    }
    previousWasVowel = isVowel;
  }

  // Adjust for silent e
  if (word.endsWith('e')) {
    count--;
  }

  // Ensure at least one syllable
  return Math.max(1, count);
}

// Focus visible enhancement
export const FocusStyles = {
  // High visibility focus ring
  ring: {
    outline: '3px solid #0066CC',
    outlineOffset: '2px',
    borderRadius: '2px'
  },

  // Alternative focus indication for non-interactive elements
  background: {
    backgroundColor: 'rgba(0, 102, 204, 0.1)',
    outline: '2px dashed #0066CC',
    outlineOffset: '2px'
  },

  // Focus styles for dark mode
  darkMode: {
    outline: '3px solid #66B3FF',
    outlineOffset: '2px',
    borderRadius: '2px'
  }
};

// Time limit utilities for WCAG AAA
export const TimeLimits = {
  // Session timeout warning (20 hours for AAA)
  sessionTimeout: 20 * 60 * 60 * 1000, // 20 hours in ms

  // Auto-refresh warning time
  autoRefreshWarning: 20 * 1000, // 20 seconds before refresh

  // Provide warning before timeout
  showTimeoutWarning(
    remainingTime: number,
    onExtend: () => void,
    onLogout: () => void
  ): void {
    ScreenReaderUtils.announce(
      `Your session will expire in ${Math.floor(remainingTime / 60)} minutes. Press Enter to extend.`,
      'assertive'
    );
  }
};

// Export all utilities
export default {
  WCAG_AAA_CONTRAST,
  getContrastRatio,
  meetsWCAGAAA,
  ARIA_ROLES,
  ARIA_PROPS,
  FocusManager,
  KeyboardNav,
  ScreenReaderUtils,
  isHighContrastMode,
  prefersReducedMotion,
  TextSpacing,
  analyzeReadingLevel,
  FocusStyles,
  TimeLimits
};