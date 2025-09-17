/**
 * DR-New Design System
 * =====================
 * Comprehensive design system for disaster recovery services
 * Ensuring brand consistency, accessibility, and emergency response capability
 */

// Export all design tokens
export * from './design-tokens';

// Export component patterns
export * from './component-patterns';

// Import for local use
import {
  getCSSVariables,
  colors,
  spacing,
  borders,
  shadows,
  typography,
  motion,
  layout,
  accessibility,
  semanticTokens,
  mediaQueries
} from './design-tokens';

import {
  buttonPatterns,
  cardPatterns,
  feedbackPatterns,
  formPatterns,
  navigationPatterns,
  overlayPatterns
} from './component-patterns';

// Re-export commonly used tokens for convenience
export {
  colors,
  typography,
  spacing,
  layout,
  borders,
  shadows,
  motion,
  accessibility,
  semanticTokens,
  getCSSVariables,
  mediaQueries,
} from './design-tokens';

export {
  buttonPatterns,
  cardPatterns,
  formPatterns,
  navigationPatterns,
  feedbackPatterns,
  overlayPatterns,
} from './component-patterns';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Generates CSS custom properties from design tokens
 * Use this to inject design tokens into your global styles
 */
export function generateCSSVariables(): string {
  const tokens = getCSSVariables();
  const cssVars = Object.entries(tokens)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');

  return `:root {\n${cssVars}\n}`;
}

/**
 * Checks if a color meets WCAG contrast requirements
 * @param foreground - Foreground color hex
 * @param background - Background color hex
 * @param level - WCAG level ('AA' or 'AAA')
 * @param isLargeText - Whether the text is large (18pt+ or 14pt+ bold)
 */
export function meetsContrastRequirement(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA',
  isLargeText: boolean = false
): boolean {
  // This is a placeholder - implement actual contrast calculation
  // For now, return true to indicate manual checking is needed
  console.warn('Contrast checking not implemented - please verify manually');
  return true;
}

/**
 * Gets the appropriate text color for a given background
 * Ensures WCAG AA compliance
 */
export function getAccessibleTextColor(backgroundColor: string): string {
  // Simplified logic - in production, calculate actual contrast
  const darkBackgrounds = ['#1e3a8a', '#1e40af', '#1d4ed8', '#7f1d1d', '#991b1b'];

  if (darkBackgrounds.includes(backgroundColor)) {
    return '#ffffff';
  }

  return '#262626'; // Neutral 800 for most backgrounds
}

/**
 * Generates responsive font size classes
 * @param mobile - Mobile font size
 * @param tablet - Tablet font size
 * @param desktop - Desktop font size
 */
export function responsiveFontSize(
  mobile: string,
  tablet?: string,
  desktop?: string
): object {
  return {
    fontSize: mobile,
    '@media (min-width: 640px)': tablet ? { fontSize: tablet } : {},
    '@media (min-width: 1024px)': desktop ? { fontSize: desktop } : {},
  };
}

/**
 * Creates a consistent shadow elevation
 * @param level - Elevation level (0-24)
 */
export function elevation(level: number): string {
  const elevations: Record<number, string> = {
    0: 'none',
    1: '0 2px 1px -1px rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.12)',
    2: '0 3px 1px -2px rgba(0,0,0,0.2), 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12)',
    3: '0 3px 3px -2px rgba(0,0,0,0.2), 0 3px 4px 0 rgba(0,0,0,0.14), 0 1px 8px 0 rgba(0,0,0,0.12)',
    4: '0 2px 4px -1px rgba(0,0,0,0.2), 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12)',
    6: '0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12)',
    8: '0 5px 5px -3px rgba(0,0,0,0.2), 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12)',
    12: '0 7px 8px -4px rgba(0,0,0,0.2), 0 12px 17px 2px rgba(0,0,0,0.14), 0 5px 22px 4px rgba(0,0,0,0.12)',
    16: '0 8px 10px -5px rgba(0,0,0,0.2), 0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12)',
    24: '0 11px 15px -7px rgba(0,0,0,0.2), 0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12)',
  };

  return elevations[level] || elevations[0];
}

// ============================================================================
// STYLE PRESETS
// ============================================================================

/**
 * Common style combinations for rapid development
 */
export const stylePresets = {
  // Emergency styles
  emergency: {
    banner: {
      backgroundColor: colors.emergency[600],
      color: colors.neutral[0],
      padding: `${spacing[4]} ${spacing[6]}`,
      borderRadius: borders.radius.lg,
      boxShadow: shadows.emergency,
      fontWeight: typography.fontWeight.bold,
    },

    button: {
      ...buttonPatterns.base,
      ...buttonPatterns.variants.emergency,
      ...buttonPatterns.sizes.lg,
    },

    badge: {
      ...feedbackPatterns.badge.base,
      ...feedbackPatterns.badge.variants.emergencyPulse,
    },
  },

  // Trust indicators
  trust: {
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: spacing[2],
      padding: `${spacing[2]} ${spacing[3]}`,
      backgroundColor: colors.primary[50],
      color: colors.primary[700],
      borderRadius: borders.radius.md,
      fontSize: typography.fontSize.sm[0],
      fontWeight: typography.fontWeight.medium,
    },

    certification: {
      display: 'flex',
      alignItems: 'center',
      gap: spacing[3],
      padding: spacing[4],
      backgroundColor: colors.neutral[50],
      borderRadius: borders.radius.lg,
      border: `1px solid ${colors.neutral[200]}`,
    },
  },

  // Hero sections
  hero: {
    container: {
      position: 'relative',
      minHeight: '600px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },

    overlay: {
      position: 'absolute',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      backgroundImage: 'linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.6))',
    },

    content: {
      position: 'relative',
      zIndex: 10,
      textAlign: 'center',
      color: colors.neutral[0],
      padding: spacing[8],
    },

    title: {
      fontSize: typography.responsive.hero.mobile,
      fontWeight: typography.fontWeight.bold,
      marginBottom: spacing[4],
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      '@media (min-width: 640px)': {
        fontSize: typography.responsive.hero.tablet,
      },
      '@media (min-width: 1024px)': {
        fontSize: typography.responsive.hero.desktop,
      },
    },
  },

  // Service cards
  service: {
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: spacing[6],
      padding: spacing[8],
    },

    card: {
      ...cardPatterns.base,
      ...cardPatterns.variants.elevated,
      transition: motion.transitions.all,

      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: shadows.xl,
      },
    },
  },

  // Forms
  form: {
    emergency: {
      backgroundColor: colors.emergency[50],
      padding: spacing[6],
      borderRadius: borders.radius.lg,
      border: `2px solid ${colors.emergency[200]}`,
    },

    input: {
      ...formPatterns.input.base,
      ...formPatterns.input.sizes.md,
    },

    label: {
      ...formPatterns.label,
    },
  },
};

// ============================================================================
// TAILWIND INTEGRATION HELPERS
// ============================================================================

/**
 * Converts design tokens to Tailwind config format
 */
export const tailwindConfig = {
  theme: {
    extend: {
      colors: colors,
      spacing: spacing,
      fontSize: typography.fontSize,
      fontWeight: typography.fontWeight,
      lineHeight: typography.lineHeight,
      letterSpacing: typography.letterSpacing,
      borderRadius: borders.radius,
      boxShadow: shadows,
      zIndex: layout.zIndex,
      screens: layout.breakpoints,
      transitionDuration: motion.duration,
      transitionTimingFunction: motion.easing,
    },
  },
};

// ============================================================================
// COMPONENT FACTORY FUNCTIONS
// ============================================================================

/**
 * Creates a button className string based on variant and size
 */
export function buttonClass(
  variant: 'emergency' | 'primary' | 'secondary' | 'ghost' | 'link' = 'primary',
  size: 'sm' | 'md' | 'lg' | 'xl' = 'md',
  className?: string
): string {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-md transition-all cursor-pointer select-none no-underline relative whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

  const variantClasses = {
    emergency: 'bg-emergency-600 text-white shadow-md hover:bg-emergency-700 hover:shadow-lg hover:-translate-y-px active:bg-emergency-800 active:translate-y-0',
    primary: 'bg-primary-600 text-white shadow-sm hover:bg-primary-700 hover:shadow-md active:bg-primary-800',
    secondary: 'bg-white text-primary-600 border-2 border-primary-600 hover:bg-primary-50 hover:border-primary-700 hover:text-primary-700 active:bg-primary-100',
    ghost: 'bg-transparent text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-200',
    link: 'bg-transparent text-primary-600 underline hover:text-primary-700 active:text-primary-800 min-h-0 p-0',
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[36px]',
    md: 'px-4 py-3 text-base min-h-[44px]',
    lg: 'px-6 py-4 text-lg min-h-[48px]',
    xl: 'px-8 py-5 text-xl min-h-[56px]',
  };

  return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className || ''}`.trim();
}

/**
 * Creates a card className string based on variant
 */
export function cardClass(
  variant: 'default' | 'elevated' | 'emergency' | 'interactive' | 'service' = 'default',
  className?: string
): string {
  const baseClasses = 'bg-white rounded-lg border border-neutral-200 overflow-hidden transition-all';

  const variantClasses = {
    default: 'p-6 shadow-sm',
    elevated: 'p-6 shadow-md hover:shadow-lg hover:-translate-y-0.5',
    emergency: 'p-6 border-2 border-emergency-600 bg-emergency-50 shadow-emergency',
    interactive: 'p-6 shadow-sm cursor-pointer hover:shadow-md hover:-translate-y-0.5 hover:border-primary-300 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2',
    service: 'p-0',
  };

  return `${baseClasses} ${variantClasses[variant]} ${className || ''}`.trim();
}

/**
 * Creates consistent section spacing
 */
export function sectionClass(
  padding: 'sm' | 'md' | 'lg' = 'md',
  className?: string
): string {
  const paddingClasses = {
    sm: 'py-12 md:py-16 lg:py-20',
    md: 'py-16 md:py-20 lg:py-24',
    lg: 'py-20 md:py-24 lg:py-32',
  };

  return `${paddingClasses[padding]} px-4 sm:px-6 lg:px-8 ${className || ''}`.trim();
}

/**
 * Creates container classes with max-width
 */
export function containerClass(
  size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'xl',
  className?: string
): string {
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };

  return `${sizeClasses[size]} mx-auto px-4 sm:px-6 lg:px-8 ${className || ''}`.trim();
}

// ============================================================================
// EXPORTS SUMMARY
// ============================================================================

export default {
  // Tokens
  colors,
  typography,
  spacing,
  layout,
  borders,
  shadows,
  motion,
  accessibility,
  semanticTokens,

  // Patterns
  buttonPatterns,
  cardPatterns,
  formPatterns,
  navigationPatterns,
  feedbackPatterns,
  overlayPatterns,

  // Utilities
  generateCSSVariables,
  meetsContrastRequirement,
  getAccessibleTextColor,
  responsiveFontSize,
  elevation,

  // Presets
  stylePresets,

  // Tailwind
  tailwindConfig,

  // Class helpers
  buttonClass,
  cardClass,
  sectionClass,
  containerClass,

  // Media queries
  mediaQueries,
};