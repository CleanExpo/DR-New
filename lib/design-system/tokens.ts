/**
 * DISASTER RECOVERY BRISBANE - DESIGN SYSTEM TOKENS
 *
 * Comprehensive design token system for consistent UI/UX
 * WCAG AAA compliant color system (7:1 contrast ratio)
 */

export const designTokens = {
  // COLORS - WCAG AAA Compliant
  colors: {
    // Primary Brand - Deep Professional Blue
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#1d4ed8', // Main brand color
      600: '#1e40af',
      700: '#1e3a8a',
      800: '#1e293b',
      900: '#0f172a',
      DEFAULT: '#1d4ed8',
    },

    // Emergency - High-visibility Red
    emergency: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#dc2626', // Emergency actions
      600: '#b91c1c',
      700: '#991b1b',
      800: '#7f1d1d',
      900: '#450a0a',
      DEFAULT: '#dc2626',
    },

    // Success - Reassuring Green
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#16a34a',
      600: '#15803d',
      700: '#166534',
      800: '#14532d',
      900: '#052e16',
      DEFAULT: '#16a34a',
    },

    // Premium - Trust Gold
    premium: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#d97706',
      600: '#b45309',
      700: '#92400e',
      800: '#78350f',
      900: '#451a03',
      DEFAULT: '#d97706',
    },

    // Neutral - High Contrast Grays
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0a0a0a',
    },

    // Semantic Colors
    info: '#0ea5e9',
    warning: '#f59e0b',
    error: '#dc2626',

    // Surface Colors
    background: {
      primary: '#ffffff',
      secondary: '#f9fafb',
      tertiary: '#f3f4f6',
      dark: '#0f172a',
    },

    // Text Colors (WCAG AAA Compliant)
    text: {
      primary: '#0a0a0a',     // 18.5:1 contrast on white
      secondary: '#404040',   // 10.4:1 contrast on white
      tertiary: '#525252',    // 7.5:1 contrast on white
      inverse: '#ffffff',     // For dark backgrounds
      muted: '#737373',       // 4.6:1 contrast (for large text only)
    },
  },

  // TYPOGRAPHY
  typography: {
    // Font Families
    fontFamily: {
      display: "'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
    },

    // Font Sizes (Golden Ratio: 1.618)
    fontSize: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '3.75rem',   // 60px
      '7xl': '4.5rem',    // 72px
      '8xl': '6rem',      // 96px
    },

    // Font Weights
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },

    // Line Heights
    lineHeight: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },

    // Letter Spacing
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },

  // SPACING (8px grid system)
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    32: '8rem',     // 128px
    40: '10rem',    // 160px
    48: '12rem',    // 192px
    56: '14rem',    // 224px
    64: '16rem',    // 256px
  },

  // BORDER RADIUS
  borderRadius: {
    none: '0',
    sm: '0.25rem',   // 4px
    base: '0.5rem',  // 8px
    md: '0.75rem',   // 12px
    lg: '1rem',      // 16px
    xl: '1.5rem',    // 24px
    '2xl': '2rem',   // 32px
    full: '9999px',
  },

  // SHADOWS
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
    none: 'none',

    // Colored Shadows
    primaryGlow: '0 10px 40px -10px rgba(29, 78, 216, 0.5)',
    emergencyGlow: '0 10px 40px -10px rgba(220, 38, 38, 0.5)',
    successGlow: '0 10px 40px -10px rgba(22, 163, 74, 0.5)',
  },

  // ANIMATIONS
  animations: {
    // Durations
    duration: {
      fast: '150ms',
      base: '200ms',
      medium: '300ms',
      slow: '500ms',
      slower: '700ms',
      slowest: '1000ms',
    },

    // Timing Functions
    easing: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // Custom Easings
      spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      bounce: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      magnetic: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
  },

  // BREAKPOINTS
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-INDEX
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    notification: 1080,
  },

  // COMPONENT-SPECIFIC TOKENS
  components: {
    // Button
    button: {
      height: {
        sm: '2.5rem',
        base: '2.75rem',
        lg: '3.5rem',
        xl: '4rem',
      },
      padding: {
        sm: '0 1rem',
        base: '0 1.5rem',
        lg: '0 2rem',
        xl: '0 2.5rem',
      },
    },

    // Input
    input: {
      height: {
        sm: '2.5rem',
        base: '2.75rem',
        lg: '3.5rem',
      },
      padding: {
        sm: '0 0.75rem',
        base: '0 1rem',
        lg: '0 1.25rem',
      },
    },

    // Card
    card: {
      padding: {
        sm: '1rem',
        base: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
    },

    // Container
    container: {
      maxWidth: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      padding: {
        mobile: '1rem',
        tablet: '1.5rem',
        desktop: '2rem',
      },
    },
  },

  // EMERGENCY-SPECIFIC DESIGN TOKENS
  emergency: {
    pulseAnimation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    urgentGradient: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
    attentionGlow: '0 0 30px rgba(220, 38, 38, 0.6)',
  },
} as const;

export type DesignTokens = typeof designTokens;

// Helper function to get color with opacity
export function withOpacity(color: string, opacity: number): string {
  return `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
}

// Export commonly used token combinations
export const commonStyles = {
  // Card styles
  card: {
    base: `rounded-lg bg-white shadow-md border border-neutral-200`,
    hover: `hover:shadow-xl hover:-translate-y-1 transition-all duration-300`,
    interactive: `cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300`,
  },

  // Container styles
  container: {
    base: `mx-auto px-4 sm:px-6 lg:px-8`,
    narrow: `max-w-4xl mx-auto px-4 sm:px-6 lg:px-8`,
    wide: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`,
  },

  // Section spacing
  section: {
    sm: `py-12`,
    base: `py-16`,
    lg: `py-24`,
  },

  // Focus styles
  focus: `focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-500 focus-visible:ring-offset-2`,

  // Text styles
  text: {
    heading: `font-display font-bold text-neutral-900`,
    body: `font-body text-neutral-700`,
    muted: `text-neutral-600`,
  },
};

// ============================================
// INDIVIDUAL EXPORTS FOR CONVENIENCE
// ============================================

export const colors = {
  emergency: designTokens.colors.emergency,
  storm: designTokens.colors.primary, // Storm blue is primary brand color
  gold: designTokens.colors.premium, // Gold is premium color
  success: designTokens.colors.success,
  neutral: designTokens.colors.neutral,
};

export const typography = designTokens.typography;
export const spacing = designTokens.spacing;
export const borderRadius = designTokens.borderRadius;
export const shadows = designTokens.shadows;
export const animations = designTokens.animations;
export const breakpoints = designTokens.breakpoints;
export const zIndex = designTokens.zIndex;
export const componentTokens = designTokens.components;
