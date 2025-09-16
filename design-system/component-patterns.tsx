/**
 * DR-New Design System - Component Patterns
 * ==========================================
 * Standardized component patterns for consistent UI implementation
 */

import { colors, spacing, typography, borders, shadows, motion, accessibility } from './design-tokens';

// ============================================================================
// BUTTON PATTERNS
// ============================================================================

/**
 * Button Component Patterns
 * Hierarchy: Emergency > Primary > Secondary > Ghost > Link
 */
export const buttonPatterns = {
  // Base button styles (shared across all variants)
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: typography.fontWeight.semibold,
    borderRadius: borders.radius.md,
    transition: motion.transitions.all,
    cursor: 'pointer',
    userSelect: 'none',
    textDecoration: 'none',
    position: 'relative',
    whiteSpace: 'nowrap',

    // Accessibility
    minHeight: accessibility.touchTarget.recommended,
    minWidth: accessibility.touchTarget.recommended,

    // Focus styles
    '&:focus-visible': {
      outline: accessibility.focus.outline,
      outlineOffset: accessibility.focus.outlineOffset,
    },

    // Disabled state
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
  },

  // Size variants
  sizes: {
    sm: {
      padding: `${spacing[2]} ${spacing[3]}`,
      fontSize: typography.fontSize.sm[0],
      minHeight: '36px',
    },
    md: {
      padding: `${spacing[3]} ${spacing[4]}`,
      fontSize: typography.fontSize.base[0],
      minHeight: accessibility.touchTarget.min,
    },
    lg: {
      padding: `${spacing[4]} ${spacing[6]}`,
      fontSize: typography.fontSize.lg[0],
      minHeight: accessibility.touchTarget.recommended,
    },
    xl: {
      padding: `${spacing[5]} ${spacing[8]}`,
      fontSize: typography.fontSize.xl[0],
      minHeight: '56px',
    },
  },

  // Style variants
  variants: {
    // Emergency - Highest priority CTAs
    emergency: {
      backgroundColor: colors.emergency[600],
      color: colors.neutral[0],
      boxShadow: shadows.md,

      '&:hover': {
        backgroundColor: colors.emergency[700],
        boxShadow: shadows.lg,
        transform: 'translateY(-1px)',
      },

      '&:active': {
        backgroundColor: colors.emergency[800],
        transform: 'translateY(0)',
      },

      // Pulse animation for critical actions
      '&.pulse': {
        animation: motion.animations.emergencyPulse,
      },

      // Focus override for emergency
      '&:focus-visible': {
        outline: accessibility.focus.emergency,
        outlineOffset: '4px',
      },
    },

    // Primary - Main CTAs
    primary: {
      backgroundColor: colors.primary[600],
      color: colors.neutral[0],
      boxShadow: shadows.sm,

      '&:hover': {
        backgroundColor: colors.primary[700],
        boxShadow: shadows.md,
      },

      '&:active': {
        backgroundColor: colors.primary[800],
      },
    },

    // Secondary - Alternative actions
    secondary: {
      backgroundColor: colors.neutral[0],
      color: colors.primary[600],
      border: `2px solid ${colors.primary[600]}`,

      '&:hover': {
        backgroundColor: colors.primary[50],
        borderColor: colors.primary[700],
        color: colors.primary[700],
      },

      '&:active': {
        backgroundColor: colors.primary[100],
      },
    },

    // Ghost - Tertiary actions
    ghost: {
      backgroundColor: 'transparent',
      color: colors.neutral[700],

      '&:hover': {
        backgroundColor: colors.neutral[100],
        color: colors.neutral[900],
      },

      '&:active': {
        backgroundColor: colors.neutral[200],
      },
    },

    // Link - Text-only actions
    link: {
      backgroundColor: 'transparent',
      color: colors.primary[600],
      textDecoration: 'underline',
      minHeight: 'auto',
      padding: 0,

      '&:hover': {
        color: colors.primary[700],
      },

      '&:active': {
        color: colors.primary[800],
      },
    },

    // Success - Positive actions
    success: {
      backgroundColor: colors.success[600],
      color: colors.neutral[0],

      '&:hover': {
        backgroundColor: colors.success[700],
      },

      '&:active': {
        backgroundColor: colors.success[800],
      },
    },

    // Warning - Caution actions
    warning: {
      backgroundColor: colors.warning[600],
      color: colors.neutral[0],

      '&:hover': {
        backgroundColor: colors.warning[700],
      },

      '&:active': {
        backgroundColor: colors.warning[800],
      },
    },
  },

  // Icon button patterns
  iconButton: {
    aspectRatio: '1',
    padding: spacing[2],

    sizes: {
      sm: { width: '36px', height: '36px' },
      md: { width: '44px', height: '44px' },
      lg: { width: '48px', height: '48px' },
    },
  },

  // Button group patterns
  group: {
    display: 'inline-flex',
    gap: spacing[2],

    // Connected buttons
    connected: {
      gap: 0,
      '& > button:not(:first-child)': {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        marginLeft: '-1px',
      },
      '& > button:not(:last-child)': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },
    },
  },
} as const;

// ============================================================================
// CARD PATTERNS
// ============================================================================

export const cardPatterns = {
  // Base card styles
  base: {
    backgroundColor: colors.neutral[0],
    borderRadius: borders.radius.lg,
    border: `1px solid ${colors.neutral[200]}`,
    overflow: 'hidden',
    transition: motion.transitions.all,
  },

  // Card variants
  variants: {
    // Default card
    default: {
      padding: spacing[6],
      boxShadow: shadows.sm,
    },

    // Elevated card (for important content)
    elevated: {
      padding: spacing[6],
      boxShadow: shadows.md,

      '&:hover': {
        boxShadow: shadows.lg,
        transform: 'translateY(-2px)',
      },
    },

    // Emergency card (for urgent information)
    emergency: {
      padding: spacing[6],
      borderColor: colors.emergency[600],
      borderWidth: '2px',
      backgroundColor: colors.emergency[50],
      boxShadow: shadows.emergency,
    },

    // Interactive card (clickable)
    interactive: {
      padding: spacing[6],
      cursor: 'pointer',
      boxShadow: shadows.sm,

      '&:hover': {
        boxShadow: shadows.md,
        transform: 'translateY(-2px)',
        borderColor: colors.primary[300],
      },

      '&:active': {
        transform: 'translateY(0)',
      },

      '&:focus-visible': {
        outline: accessibility.focus.outline,
        outlineOffset: accessibility.focus.outlineOffset,
      },
    },

    // Service card (for service listings)
    service: {
      padding: 0,

      image: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
      },

      content: {
        padding: spacing[6],
      },

      title: {
        fontSize: typography.fontSize.xl[0],
        fontWeight: typography.fontWeight.semibold,
        marginBottom: spacing[2],
      },

      description: {
        color: colors.neutral[600],
        marginBottom: spacing[4],
      },
    },

    // Testimonial card
    testimonial: {
      padding: spacing[8],
      backgroundColor: colors.neutral[50],
      position: 'relative',

      quote: {
        fontSize: typography.fontSize.lg[0],
        lineHeight: typography.lineHeight.relaxed,
        color: colors.neutral[700],
        marginBottom: spacing[6],
      },

      author: {
        display: 'flex',
        alignItems: 'center',
        gap: spacing[3],
      },

      avatar: {
        width: '48px',
        height: '48px',
        borderRadius: borders.radius.full,
      },

      name: {
        fontWeight: typography.fontWeight.semibold,
        color: colors.neutral[900],
      },

      role: {
        fontSize: typography.fontSize.sm[0],
        color: colors.neutral[600],
      },
    },
  },
} as const;

// ============================================================================
// FORM PATTERNS
// ============================================================================

export const formPatterns = {
  // Input field patterns
  input: {
    base: {
      width: '100%',
      padding: `${spacing[3]} ${spacing[4]}`,
      fontSize: typography.fontSize.base[0],
      lineHeight: typography.lineHeight.normal,
      borderRadius: borders.radius.md,
      border: `1px solid ${colors.neutral[300]}`,
      backgroundColor: colors.neutral[0],
      transition: motion.transitions.colors,
      minHeight: accessibility.touchTarget.min,

      '&:hover': {
        borderColor: colors.neutral[400],
      },

      '&:focus': {
        outline: 'none',
        borderColor: colors.primary[600],
        boxShadow: `0 0 0 3px ${colors.primary[600]}20`,
      },

      '&:disabled': {
        backgroundColor: colors.neutral[100],
        color: colors.neutral[500],
        cursor: 'not-allowed',
      },

      '&::placeholder': {
        color: colors.neutral[400],
      },
    },

    // Input states
    states: {
      error: {
        borderColor: colors.emergency[600],

        '&:focus': {
          borderColor: colors.emergency[600],
          boxShadow: `0 0 0 3px ${colors.emergency[600]}20`,
        },
      },

      success: {
        borderColor: colors.success[600],

        '&:focus': {
          borderColor: colors.success[600],
          boxShadow: `0 0 0 3px ${colors.success[600]}20`,
        },
      },
    },

    // Input sizes
    sizes: {
      sm: {
        padding: `${spacing[2]} ${spacing[3]}`,
        fontSize: typography.fontSize.sm[0],
        minHeight: '36px',
      },
      md: {
        padding: `${spacing[3]} ${spacing[4]}`,
        fontSize: typography.fontSize.base[0],
        minHeight: accessibility.touchTarget.min,
      },
      lg: {
        padding: `${spacing[4]} ${spacing[5]}`,
        fontSize: typography.fontSize.lg[0],
        minHeight: accessibility.touchTarget.recommended,
      },
    },
  },

  // Label patterns
  label: {
    display: 'block',
    fontSize: typography.fontSize.sm[0],
    fontWeight: typography.fontWeight.medium,
    color: colors.neutral[700],
    marginBottom: spacing[2],

    required: {
      '&::after': {
        content: '" *"',
        color: colors.emergency[600],
      },
    },
  },

  // Help text patterns
  helpText: {
    fontSize: typography.fontSize.sm[0],
    color: colors.neutral[600],
    marginTop: spacing[1],
  },

  // Error message patterns
  errorMessage: {
    fontSize: typography.fontSize.sm[0],
    color: colors.emergency[600],
    marginTop: spacing[1],
    fontWeight: typography.fontWeight.medium,
  },

  // Form group patterns
  group: {
    marginBottom: spacing[6],

    inline: {
      display: 'flex',
      gap: spacing[4],
      alignItems: 'flex-start',
    },
  },

  // Checkbox and radio patterns
  checkbox: {
    container: {
      display: 'flex',
      alignItems: 'center',
      gap: spacing[2],
      cursor: 'pointer',
    },

    input: {
      width: '20px',
      height: '20px',
      borderRadius: borders.radius.sm,
      border: `2px solid ${colors.neutral[400]}`,
      cursor: 'pointer',

      '&:checked': {
        backgroundColor: colors.primary[600],
        borderColor: colors.primary[600],
      },

      '&:focus-visible': {
        outline: accessibility.focus.outline,
        outlineOffset: accessibility.focus.outlineOffset,
      },
    },

    label: {
      cursor: 'pointer',
      userSelect: 'none',
    },
  },
} as const;

// ============================================================================
// NAVIGATION PATTERNS
// ============================================================================

export const navigationPatterns = {
  // Header navigation
  header: {
    base: {
      backgroundColor: colors.neutral[0],
      borderBottom: `1px solid ${colors.neutral[200]}`,
      position: 'sticky',
      top: 0,
      zIndex: 40,
      backdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
    },

    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `${spacing[4]} ${spacing[6]}`,
      maxWidth: '1280px',
      margin: '0 auto',
    },

    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: spacing[3],
      fontWeight: typography.fontWeight.bold,
      fontSize: typography.fontSize.xl[0],
      color: colors.primary[600],
    },

    menu: {
      display: 'flex',
      gap: spacing[8],
      alignItems: 'center',

      item: {
        color: colors.neutral[700],
        fontWeight: typography.fontWeight.medium,
        transition: motion.transitions.colors,
        padding: `${spacing[2]} ${spacing[3]}`,
        borderRadius: borders.radius.md,

        '&:hover': {
          color: colors.primary[600],
          backgroundColor: colors.primary[50],
        },

        '&.active': {
          color: colors.primary[600],
          backgroundColor: colors.primary[100],
        },
      },
    },

    // Mobile menu
    mobile: {
      trigger: {
        display: 'none',
        '@media (max-width: 768px)': {
          display: 'block',
        },
      },

      drawer: {
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '80%',
        maxWidth: '320px',
        backgroundColor: colors.neutral[0],
        boxShadow: shadows['2xl'],
        zIndex: 50,
        transform: 'translateX(100%)',
        transition: 'transform 300ms ease',

        '&.open': {
          transform: 'translateX(0)',
        },
      },
    },
  },

  // Breadcrumb navigation
  breadcrumb: {
    container: {
      display: 'flex',
      alignItems: 'center',
      gap: spacing[2],
      fontSize: typography.fontSize.sm[0],
      color: colors.neutral[600],
    },

    separator: {
      color: colors.neutral[400],
    },

    link: {
      color: colors.neutral[600],
      transition: motion.transitions.colors,

      '&:hover': {
        color: colors.primary[600],
      },
    },

    current: {
      color: colors.neutral[900],
      fontWeight: typography.fontWeight.medium,
    },
  },

  // Tab navigation
  tabs: {
    list: {
      display: 'flex',
      borderBottom: `2px solid ${colors.neutral[200]}`,
      gap: spacing[1],
    },

    tab: {
      padding: `${spacing[3]} ${spacing[6]}`,
      fontWeight: typography.fontWeight.medium,
      color: colors.neutral[600],
      borderBottom: '2px solid transparent',
      marginBottom: '-2px',
      transition: motion.transitions.all,
      cursor: 'pointer',

      '&:hover': {
        color: colors.primary[600],
        backgroundColor: colors.primary[50],
      },

      '&.active': {
        color: colors.primary[600],
        borderColor: colors.primary[600],
      },

      '&:focus-visible': {
        outline: accessibility.focus.outline,
        outlineOffset: '-2px',
      },
    },

    panel: {
      padding: spacing[6],
    },
  },
} as const;

// ============================================================================
// FEEDBACK PATTERNS
// ============================================================================

export const feedbackPatterns = {
  // Alert patterns
  alert: {
    base: {
      padding: spacing[4],
      borderRadius: borders.radius.md,
      border: '1px solid',
      display: 'flex',
      gap: spacing[3],
      alignItems: 'flex-start',
    },

    variants: {
      info: {
        backgroundColor: colors.primary[50],
        borderColor: colors.primary[200],
        color: colors.primary[800],
      },

      success: {
        backgroundColor: colors.success[50],
        borderColor: colors.success[200],
        color: colors.success[800],
      },

      warning: {
        backgroundColor: colors.warning[50],
        borderColor: colors.warning[200],
        color: colors.warning[800],
      },

      error: {
        backgroundColor: colors.emergency[50],
        borderColor: colors.emergency[200],
        color: colors.emergency[800],
      },
    },

    icon: {
      flexShrink: 0,
      width: '20px',
      height: '20px',
    },

    content: {
      flex: 1,
    },

    title: {
      fontWeight: typography.fontWeight.semibold,
      marginBottom: spacing[1],
    },

    description: {
      fontSize: typography.fontSize.sm[0],
    },
  },

  // Toast notification patterns
  toast: {
    base: {
      position: 'fixed',
      bottom: spacing[4],
      right: spacing[4],
      padding: spacing[4],
      borderRadius: borders.radius.md,
      boxShadow: shadows.lg,
      minWidth: '320px',
      maxWidth: '420px',
      animation: 'slide-up 300ms ease',
      zIndex: 60,
    },

    variants: {
      // Inherits from alert variants
    },
  },

  // Loading patterns
  loading: {
    spinner: {
      width: '24px',
      height: '24px',
      border: `3px solid ${colors.neutral[200]}`,
      borderTopColor: colors.primary[600],
      borderRadius: borders.radius.full,
      animation: 'spin 1s linear infinite',
    },

    skeleton: {
      backgroundColor: colors.neutral[200],
      borderRadius: borders.radius.md,
      animation: 'pulse 2s ease infinite',
    },

    progress: {
      height: '8px',
      backgroundColor: colors.neutral[200],
      borderRadius: borders.radius.full,
      overflow: 'hidden',

      bar: {
        height: '100%',
        backgroundColor: colors.primary[600],
        transition: 'width 300ms ease',
      },
    },
  },

  // Badge patterns
  badge: {
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: `${spacing[1]} ${spacing[2]}`,
      fontSize: typography.fontSize.xs[0],
      fontWeight: typography.fontWeight.semibold,
      borderRadius: borders.radius.full,
      textTransform: 'uppercase',
      letterSpacing: typography.letterSpacing.wider,
    },

    variants: {
      default: {
        backgroundColor: colors.neutral[200],
        color: colors.neutral[700],
      },

      primary: {
        backgroundColor: colors.primary[100],
        color: colors.primary[700],
      },

      success: {
        backgroundColor: colors.success[100],
        color: colors.success[700],
      },

      warning: {
        backgroundColor: colors.warning[100],
        color: colors.warning[700],
      },

      emergency: {
        backgroundColor: colors.emergency[100],
        color: colors.emergency[700],
      },

      // Special emergency pulse badge
      emergencyPulse: {
        backgroundColor: colors.emergency[600],
        color: colors.neutral[0],
        animation: motion.animations.emergencyPulse,
      },
    },
  },
} as const;

// ============================================================================
// MODAL & OVERLAY PATTERNS
// ============================================================================

export const overlayPatterns = {
  // Modal patterns
  modal: {
    overlay: {
      position: 'fixed',
      inset: 0,
      backgroundColor: colors.overlay.medium,
      backdropFilter: 'blur(4px)',
      zIndex: 50,
      animation: 'fade-in 200ms ease',
    },

    container: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: colors.neutral[0],
      borderRadius: borders.radius.xl,
      boxShadow: shadows['2xl'],
      maxWidth: '90vw',
      maxHeight: '90vh',
      overflow: 'auto',
      animation: 'scale-in 200ms ease',
      zIndex: 51,
    },

    sizes: {
      sm: { width: '400px' },
      md: { width: '600px' },
      lg: { width: '800px' },
      xl: { width: '1000px' },
      full: { width: '95vw', height: '95vh' },
    },

    header: {
      padding: spacing[6],
      borderBottom: `1px solid ${colors.neutral[200]}`,

      title: {
        fontSize: typography.fontSize['2xl'][0],
        fontWeight: typography.fontWeight.semibold,
        color: colors.neutral[900],
      },

      close: {
        position: 'absolute',
        top: spacing[4],
        right: spacing[4],
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: borders.radius.md,
        transition: motion.transitions.colors,

        '&:hover': {
          backgroundColor: colors.neutral[100],
        },
      },
    },

    body: {
      padding: spacing[6],
    },

    footer: {
      padding: spacing[6],
      borderTop: `1px solid ${colors.neutral[200]}`,
      display: 'flex',
      gap: spacing[3],
      justifyContent: 'flex-end',
    },
  },

  // Dropdown patterns
  dropdown: {
    trigger: {
      position: 'relative',
    },

    menu: {
      position: 'absolute',
      top: '100%',
      marginTop: spacing[2],
      backgroundColor: colors.neutral[0],
      border: `1px solid ${colors.neutral[200]}`,
      borderRadius: borders.radius.md,
      boxShadow: shadows.lg,
      minWidth: '200px',
      zIndex: 30,
      animation: 'slide-down 200ms ease',
    },

    item: {
      padding: `${spacing[2]} ${spacing[4]}`,
      color: colors.neutral[700],
      transition: motion.transitions.colors,
      cursor: 'pointer',

      '&:hover': {
        backgroundColor: colors.neutral[50],
        color: colors.neutral[900],
      },

      '&:focus-visible': {
        backgroundColor: colors.primary[50],
        outline: 'none',
      },
    },

    divider: {
      height: '1px',
      backgroundColor: colors.neutral[200],
      margin: `${spacing[2]} 0`,
    },
  },

  // Tooltip patterns
  tooltip: {
    base: {
      position: 'absolute',
      padding: `${spacing[2]} ${spacing[3]}`,
      backgroundColor: colors.neutral[900],
      color: colors.neutral[0],
      fontSize: typography.fontSize.sm[0],
      borderRadius: borders.radius.md,
      whiteSpace: 'nowrap',
      zIndex: 70,
      pointerEvents: 'none',
      animation: 'fade-in 200ms ease',
    },

    arrow: {
      position: 'absolute',
      width: '8px',
      height: '8px',
      backgroundColor: colors.neutral[900],
      transform: 'rotate(45deg)',
    },
  },
} as const;

// ============================================================================
// EXPORT TYPE DEFINITIONS
// ============================================================================

export type ButtonVariant = keyof typeof buttonPatterns.variants;
export type ButtonSize = keyof typeof buttonPatterns.sizes;
export type CardVariant = keyof typeof cardPatterns.variants;
export type AlertVariant = keyof typeof feedbackPatterns.alert.variants;
export type BadgeVariant = keyof typeof feedbackPatterns.badge.variants;
export type ModalSize = keyof typeof overlayPatterns.modal.sizes;