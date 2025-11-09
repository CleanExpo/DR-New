/**
 * Brand Guidelines
 *
 * Official brand standards for Disaster Recovery Brisbane
 * Defines usage rules for visual identity, messaging, and tone
 */

import { designTokens } from './tokens';

// ============================================
// BRAND IDENTITY
// ============================================

export const brandIdentity = {
  name: 'Disaster Recovery Brisbane',
  tagline: '60-minute Emergency Response • IICRC Master Restorer',
  legalName: 'Disaster Recovery Brisbane Pty Ltd',

  serviceArea: {
    primary: ['Brisbane', 'Ipswich', 'Logan'],
    highValueResidential: ['Hamilton', 'Ascot', 'New Farm', 'Toowong', 'Karalee', 'Brookwater', 'Springfield Lakes'],
    commercial: ['Brisbane CBD', 'Fortitude Valley', 'Milton', 'Ipswich CBD', 'Logan Central'],
  },

  keyDifferentiators: [
    'Phill McGurk - IICRC Master Restorer (one of few in Brisbane & QLD)',
    '60-minute emergency response time',
    'Insurance company approved',
    'Local Brisbane, Ipswich, Logan specialist',
    '24/7 emergency availability',
  ],

  contact: {
    phone: '1300 309 361',
    email: 'admin@disasterrecovery.com.au',
    website: 'https://dr-new-ten.vercel.app',
  },
} as const;

// ============================================
// COLOR USAGE RULES
// ============================================

export const colorUsage = {
  emergency: {
    color: designTokens.colors.emergency[600],
    usage: [
      '24/7 emergency call buttons',
      'Urgent alert banners',
      'Emergency response CTAs',
      'Fire damage service branding',
    ],
    avoid: [
      'Never use for non-urgent actions',
      'Never use for decorative elements',
      'Limit to 1-2 emergency CTAs per page',
    ],
  },

  storm: {
    color: designTokens.colors.primary[800],
    usage: [
      'Primary brand color',
      'Water damage service branding',
      'Storm damage service branding',
      'Professional trust signals',
      'Header and navigation',
    ],
    avoid: [
      'Never use for emergency CTAs',
      'Avoid large areas of dark blue on mobile',
    ],
  },

  gold: {
    color: designTokens.colors.premium[600],
    usage: [
      'IICRC Master Restorer badge',
      'Premium service indicators',
      'Certification highlights',
      'Trust signals and awards',
    ],
    avoid: [
      'Never use as primary CTA color',
      'Avoid on white backgrounds (poor contrast)',
      'Use sparingly - overuse diminishes premium feel',
    ],
  },

  success: {
    color: designTokens.colors.success[600],
    usage: [
      'Successful completion messages',
      'Mould remediation service branding',
      'Positive testimonials',
      'Insurance approval indicators',
    ],
    avoid: [
      'Never use for emergency services',
    ],
  },

  neutral: {
    colors: designTokens.colors.neutral,
    usage: [
      'Body text: neutral-900',
      'Backgrounds: neutral-50, neutral-100',
      'Borders: neutral-200, neutral-300',
      'Disabled states: neutral-400',
    ],
  },
} as const;

// ============================================
// TYPOGRAPHY USAGE RULES
// ============================================

export const typographyUsage = {
  headings: {
    font: designTokens.typography.fontFamily.display, // Poppins
    usage: [
      'Use for all headings (h1-h6)',
      'Use for hero titles',
      'Use for section headings',
      'Use bold (700) for emphasis',
    ],
    avoid: [
      'Never use for body text',
      'Never use light weights (<500) for headings',
    ],
  },

  body: {
    font: designTokens.typography.fontFamily.body, // Inter
    usage: [
      'Use for all body text',
      'Use for descriptions',
      'Use for buttons',
      'Use for navigation',
    ],
    avoid: [
      'Never use for main headings',
    ],
  },

  hierarchy: {
    h1: {
      size: designTokens.typography.fontSize['5xl'],
      weight: designTokens.typography.fontWeight.bold,
      usage: 'Page title - one per page only',
      example: 'Water Damage Restoration Brisbane',
    },
    h2: {
      size: designTokens.typography.fontSize['3xl'],
      weight: designTokens.typography.fontWeight.bold,
      usage: 'Major section headings',
      example: 'Our Emergency Response Process',
    },
    h3: {
      size: designTokens.typography.fontSize['2xl'],
      weight: designTokens.typography.fontWeight.semibold,
      usage: 'Subsection headings',
      example: 'Why Choose a Master Restorer?',
    },
    h4: {
      size: designTokens.typography.fontSize.xl,
      weight: designTokens.typography.fontWeight.semibold,
      usage: 'Card titles, feature headings',
      example: 'IICRC Certified',
    },
    body: {
      size: designTokens.typography.fontSize.base,
      weight: designTokens.typography.fontWeight.normal,
      usage: 'All body text, paragraphs',
    },
    small: {
      size: designTokens.typography.fontSize.sm,
      weight: designTokens.typography.fontWeight.normal,
      usage: 'Captions, disclaimers, metadata',
    },
  },
} as const;

// ============================================
// IMAGERY STYLE GUIDE
// ============================================

export const imageryGuidelines = {
  photography: {
    style: [
      'Professional, high-resolution images',
      'Real disaster recovery work (no stock photos)',
      'Before/after transformations',
      'Phill McGurk and team in action',
      'Dramatic emergency scenes (fire, water damage)',
    ],
    avoid: [
      'Never use generic stock photos',
      'No fake testimonials or staged photos',
      'Avoid overly dramatic/scary imagery that causes panic',
    ],
  },

  heroImages: {
    requirements: [
      'Minimum 1920x1080px resolution',
      'Dark overlay for text readability (50-70% opacity)',
      'Emergency-focused imagery (fire trucks, water damage, etc.)',
      'Professional quality - no blurry or low-res images',
    ],
    overlay: {
      light: 'bg-black/40', // 40% overlay for lighter images
      medium: 'bg-black/60', // 60% overlay (default)
      dark: 'bg-black/70', // 70% overlay for very bright images
    },
  },

  icons: {
    library: 'Lucide React',
    style: 'Line icons, consistent stroke width',
    usage: [
      'Phone icon for call CTAs',
      'AlertTriangle for emergency warnings',
      'Check icons for certifications',
      'Shield for insurance coverage',
    ],
  },
} as const;

// ============================================
// MESSAGING & TONE
// ============================================

export const messaging = {
  toneOfVoice: {
    primary: 'Professional, trustworthy, reassuring',
    emergency: 'Urgent but calm, action-oriented',
    expertise: 'Authoritative, certified, experienced',
  },

  keyMessages: [
    'IICRC Master Restorer - one of few in Brisbane & QLD',
    '60-minute emergency response time',
    '24/7 availability for disasters',
    'Insurance company approved and trusted',
    'Local Brisbane, Ipswich, Logan specialist',
    'Serving high-value residential and commercial properties',
  ],

  prohibitedClaims: [
    '❌ NO national or interstate coverage',
    '❌ NO contractor recruitment or management',
    '❌ NO unverified statistics or testimonials',
    '❌ NO embellished or fake reviews',
    '❌ NO automated systems (except contact forms)',
  ],

  emergencyMessaging: {
    primary: '24/7 Emergency Water Damage & Fire Restoration',
    cta: 'Call 1300 309 361 Now',
    urgency: '60-minute response time',
    trustSignal: 'IICRC Master Restorer',
  },

  serviceMessaging: {
    waterDamage: {
      headline: 'Emergency Water Damage Restoration Brisbane',
      subheadline: 'Rapid response before catastrophic damage occurs',
      keywords: ['flood damage', 'burst pipes', 'water extraction', 'structural drying'],
    },
    fireDamage: {
      headline: 'Fire Damage Restoration & Smoke Remediation',
      subheadline: 'Complete restoration from fire and smoke damage',
      keywords: ['fire restoration', 'smoke damage', 'soot removal', 'odor elimination'],
    },
    mouldRemediation: {
      headline: 'Professional Mould Remediation Brisbane',
      subheadline: 'Safe, certified mould removal and prevention',
      keywords: ['mould removal', 'black mould', 'mould testing', 'air quality'],
    },
    stormDamage: {
      headline: 'Storm & Weather Damage Repair',
      subheadline: '24/7 emergency response to severe weather damage',
      keywords: ['storm damage', 'hail damage', 'wind damage', 'roof repair'],
    },
  },
} as const;

// ============================================
// ANIMATION GUIDELINES
// ============================================

export const animationGuidelines = {
  purpose: [
    'Guide user attention to emergency CTAs',
    'Create premium, professional feel',
    'Provide feedback on interactions',
    'Never distract from critical information',
  ],

  emergency: {
    pulse: {
      usage: 'Emergency call buttons only',
      intensity: 'Subtle - scale 1.0 to 1.1',
      frequency: 'Slow - 1.5s duration',
    },
    glow: {
      usage: 'Emergency alerts and banners',
      color: designTokens.colors.emergency[500],
      intensity: 'Noticeable but not distracting',
    },
  },

  interactions: {
    magnetic: {
      usage: 'Primary and emergency CTAs on desktop',
      strength: '10px maximum movement',
      disable: 'On mobile/touch devices',
    },
    ripple: {
      usage: 'All clickable CTAs',
      color: 'Match CTA variant color',
      duration: '800ms',
    },
    hover: {
      scale: '1.05 maximum',
      transition: '300ms ease-out',
      usage: 'Cards, buttons, interactive elements',
    },
  },

  accessibility: {
    reducedMotion: 'Respect prefers-reduced-motion',
    focus: 'Always show visible focus indicators',
    keyboard: 'All animations accessible via keyboard',
  },
} as const;

// ============================================
// LAYOUT PATTERNS
// ============================================

export const layoutPatterns = {
  container: {
    maxWidth: '1280px', // xl breakpoint
    padding: {
      mobile: '1rem', // 16px
      tablet: '1.5rem', // 24px
      desktop: '2rem', // 32px
    },
  },

  grid: {
    columns: {
      mobile: 1,
      tablet: 2,
      desktop: 3,
      wide: 4,
    },
    gap: {
      tight: '1rem', // 16px
      normal: '1.5rem', // 24px
      loose: '2rem', // 32px
    },
  },

  sections: {
    padding: {
      mobile: '3rem 0', // 48px vertical
      desktop: '5rem 0', // 80px vertical
    },
    maxWidth: '1280px',
  },

  hero: {
    minHeight: {
      mobile: '400px',
      tablet: '500px',
      desktop: '600px',
    },
    overlay: 'bg-black/60',
    textAlign: 'center',
  },
} as const;

// ============================================
// COMPONENT PATTERNS
// ============================================

export const componentPatterns = {
  buttons: {
    emergency: {
      variant: 'emergency',
      color: designTokens.colors.emergency[600],
      icon: 'phone',
      pulse: true,
      usage: 'Emergency call CTAs only',
    },
    primary: {
      variant: 'primary',
      color: designTokens.colors.primary[700],
      icon: 'arrow',
      usage: 'Main CTAs (quotes, bookings)',
    },
    secondary: {
      variant: 'secondary',
      color: designTokens.colors.neutral[600],
      icon: 'arrow',
      usage: 'Secondary actions (learn more)',
    },
  },

  cards: {
    service: {
      background: 'white',
      border: '1px solid neutral-200',
      shadow: 'shadow-lg',
      hover: 'lift and scale',
      padding: '2rem',
    },
    testimonial: {
      background: 'neutral-50',
      border: 'none',
      shadow: 'shadow-md',
      padding: '1.5rem',
    },
  },

  badges: {
    masterRestorer: {
      color: designTokens.colors.premium[600],
      icon: 'Award',
      text: 'IICRC Master Restorer',
    },
    emergency: {
      color: designTokens.colors.emergency[600],
      icon: 'AlertTriangle',
      text: '24/7 Emergency',
    },
    insurance: {
      color: designTokens.colors.primary[700],
      icon: 'Shield',
      text: 'Insurance Approved',
    },
  },
} as const;

// ============================================
// ACCESSIBILITY STANDARDS
// ============================================

export const accessibilityStandards = {
  wcag: 'WCAG 2.1 AA',

  colorContrast: {
    normalText: '4.5:1 minimum',
    largeText: '3:1 minimum',
    uiComponents: '3:1 minimum',
  },

  touchTargets: {
    minimum: '44x44px',
    recommended: '48x48px',
  },

  keyboardNavigation: {
    focusVisible: 'Always show focus indicators',
    tabOrder: 'Logical, left-to-right, top-to-bottom',
    skipLinks: 'Provide skip navigation links',
  },

  semanticHTML: {
    headings: 'Proper hierarchy (h1 → h2 → h3)',
    landmarks: 'Use semantic HTML5 elements',
    altText: 'Descriptive alt text for all images',
  },

  aria: {
    labels: 'aria-label for icon-only buttons',
    hidden: 'aria-hidden="true" for decorative icons',
    live: 'aria-live for dynamic content',
  },
} as const;

// ============================================
// RESPONSIVE DESIGN RULES
// ============================================

export const responsiveDesign = {
  approach: 'Mobile-first',

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  typography: {
    scaling: 'Use clamp() for fluid typography',
    minSize: '16px body text (never smaller)',
    maxSize: '64px for h1',
  },

  images: {
    formats: ['AVIF', 'WebP', 'JPEG fallback'],
    loading: 'Lazy load below-the-fold images',
    priority: 'Priority load hero images only',
    sizes: 'Responsive sizes attribute required',
  },

  navigation: {
    mobile: 'Hamburger menu below 1024px',
    desktop: 'Full horizontal navigation above 1024px',
  },

  ctaPlacement: {
    mobile: 'Sticky bottom bar for emergency CTA',
    desktop: 'Floating bottom-right CTA',
  },
} as const;

// ============================================
// SEO GUIDELINES
// ============================================

export const seoGuidelines = {
  localFocus: {
    primary: ['Brisbane', 'Ipswich', 'Logan'],
    suburbs: [
      'Hamilton', 'Ascot', 'New Farm', 'Toowong',
      'Karalee', 'Brookwater', 'Springfield Lakes',
    ],
  },

  keywords: {
    primary: [
      'water damage restoration Brisbane',
      'fire damage restoration Ipswich',
      'emergency restoration Logan',
      'IICRC Master Restorer Brisbane',
    ],
    modifiers: [
      'emergency',
      '24/7',
      'certified',
      'insurance approved',
      'rapid response',
    ],
  },

  metaData: {
    titleFormat: '{Service} | Disaster Recovery Brisbane',
    descriptionLength: '150-160 characters',
    includeLocation: 'Always include Brisbane/Ipswich/Logan',
    includeCertification: 'Mention IICRC Master Restorer when relevant',
  },

  schemaMarkup: {
    required: [
      'LocalBusiness',
      'Service',
      'BreadcrumbList',
    ],
    recommended: [
      'Organization',
      'PostalAddress',
      'Review (when available)',
    ],
  },
} as const;

/**
 * Export all brand guidelines
 */
export const brandGuidelines = {
  identity: brandIdentity,
  colors: colorUsage,
  typography: typographyUsage,
  imagery: imageryGuidelines,
  messaging,
  animation: animationGuidelines,
  layout: layoutPatterns,
  components: componentPatterns,
  accessibility: accessibilityStandards,
  responsive: responsiveDesign,
  seo: seoGuidelines,
} as const;
