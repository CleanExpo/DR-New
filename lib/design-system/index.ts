/**
 * Disaster Recovery Brisbane - Premium Design System
 * Complete UI/UX component library for emergency services website
 * Optimized for conversions, trust, and Brisbane market
 *
 * @version 1.0.0
 * @author Disaster Recovery Development Team
 */

// Core Design Tokens
export { designTokens } from './core/tokens'
export type {
  ColorToken,
  SpacingToken,
  TypographyToken,
  ShadowToken,
  AnimationToken,
  BreakpointToken
} from './core/tokens'

// Emergency & Trust Components
export { EmergencyBar } from './components/emergency-bar'
export { TrustIndicators } from './components/trust-indicators'

// Mobile & CTA Components
export { MobileStickyCtaComponent as MobileStickyCTA } from './components/mobile-sticky-cta'

// Hero & Service Components
export { ServiceHero } from './components/service-hero'

// Location & Trust Components
export { SuburbTrust, brisbaneSuburbs } from './components/suburb-trust'
export type { SuburbData } from './components/suburb-trust'

// Gallery & Visual Components
export { BeforeAfterGallery } from './components/before-after-gallery'

// Information & FAQ Components
export { VoiceSearchFAQ } from './components/voice-search-faq'

// Process & Insurance Components
export { InsuranceProcess } from './components/insurance-process'

// Team & Credentials Components
export { TeamCredentials } from './components/team-credentials'

// Maps & Coverage Components
export { ResponseTimeMap } from './components/response-time-map'

// Testimonials & Reviews Components
export { TestimonialCarousel } from './components/testimonial-carousel'

// Utility Functions
export const utils = {
  /**
   * Generate responsive classes based on breakpoints
   */
  responsive: (classes: Record<string, string>) => {
    return Object.entries(classes)
      .map(([breakpoint, className]) => {
        if (breakpoint === 'default') return className
        return `${breakpoint}:${className}`
      })
      .join(' ')
  },

  /**
   * Get color value from design tokens
   */
  getColor: (color: string, shade: number = 500) => {
    const colors = designTokens.colors as any
    const parts = color.split('.')
    let value = colors

    for (const part of parts) {
      value = value[part]
      if (!value) return undefined
    }

    return value[shade] || value
  },

  /**
   * Get spacing value from design tokens
   */
  getSpacing: (size: string | number) => {
    const spacing = designTokens.spacing as any
    return spacing[size] || `${size}px`
  },

  /**
   * Format phone number for Australian format
   */
  formatPhone: (phone: string) => {
    const cleaned = phone.replace(/\D/g, '')
    const match = cleaned.match(/^(\d{4})(\d{3})(\d{3})$/)
    if (match) {
      return `${match[1]} ${match[2]} ${match[3]}`
    }
    return phone
  },

  /**
   * Calculate response time based on distance
   */
  calculateResponseTime: (distance: number) => {
    if (distance < 5) return '15-30 mins'
    if (distance < 10) return '30-45 mins'
    if (distance < 20) return '45-60 mins'
    return '60+ mins'
  },

  /**
   * Check if suburb is premium area
   */
  isPremiumSuburb: (suburb: string) => {
    const premiumSuburbs = [
      'Ascot', 'Hamilton', 'New Farm', 'Teneriffe', 'Bulimba',
      'Hawthorne', 'Clayfield', 'Paddington', 'Toowong', 'St Lucia'
    ]
    return premiumSuburbs.includes(suburb)
  }
}

// Component Patterns for common layouts
export const patterns = {
  /**
   * Emergency page layout pattern
   */
  emergencyLayout: {
    header: 'EmergencyBar',
    hero: 'ServiceHero with urgencyLevel="critical"',
    trust: 'TrustIndicators variant="hero"',
    process: 'InsuranceProcess variant="interactive"',
    gallery: 'BeforeAfterGallery variant="comparison"',
    testimonials: 'TestimonialCarousel variant="featured"',
    cta: 'MobileStickyCTA position="bottom"'
  },

  /**
   * Service page layout pattern
   */
  servicePage: {
    hero: 'ServiceHero',
    trust: 'TrustIndicators variant="detailed"',
    process: 'InsuranceProcess variant="timeline"',
    faq: 'VoiceSearchFAQ',
    gallery: 'BeforeAfterGallery',
    testimonials: 'TestimonialCarousel',
    team: 'TeamCredentials variant="grid"'
  },

  /**
   * Location page layout pattern
   */
  locationPage: {
    hero: 'ServiceHero with localArea prop',
    map: 'ResponseTimeMap',
    suburb: 'SuburbTrust variant="hero"',
    testimonials: 'TestimonialCarousel with filterBySuburb',
    trust: 'TrustIndicators',
    cta: 'MobileStickyCTA'
  }
}

// Theme Configuration
export const theme = {
  name: 'Disaster Recovery Brisbane Premium',
  version: '1.0.0',

  // Brand Colors
  colors: {
    primary: designTokens.colors.primary,
    emergency: designTokens.colors.emergency,
    success: designTokens.colors.success,
    warning: designTokens.colors.warning,
    accent: designTokens.colors.accent
  },

  // Typography
  fonts: {
    sans: 'Inter, system-ui, -apple-system, sans-serif',
    display: 'Montserrat, Inter, sans-serif',
    mono: 'JetBrains Mono, monospace'
  },

  // Breakpoints
  screens: designTokens.breakpoints,

  // Animations
  animations: {
    emergency: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    trust: 'fadeIn 0.5s ease-in-out',
    hover: 'scale 0.3s ease-in-out'
  }
}

// Performance Optimization Settings
export const performance = {
  // Image optimization settings
  images: {
    formats: ['webp', 'avif'],
    sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    quality: 85,
    lazyLoad: true
  },

  // Component lazy loading
  lazyComponents: [
    'BeforeAfterGallery',
    'ResponseTimeMap',
    'TestimonialCarousel',
    'TeamCredentials'
  ],

  // Critical CSS components
  criticalComponents: [
    'EmergencyBar',
    'ServiceHero',
    'MobileStickyCTA',
    'TrustIndicators'
  ]
}

// SEO Configuration
export const seo = {
  // Default meta tags
  defaultMeta: {
    title: 'Disaster Recovery Brisbane - 24/7 Emergency Restoration',
    description: 'IICRC certified water damage, fire restoration & flood recovery. 1-hour emergency response across Brisbane. Insurance approved. Call 1300 309 361',
    keywords: 'water damage Brisbane, flood restoration, fire damage, mould removal, emergency restoration, IICRC certified',
    author: 'Disaster Recovery',
    robots: 'index, follow',
    viewport: 'width=device-width, initial-scale=1'
  },

  // Open Graph defaults
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    site_name: 'Disaster Recovery Brisbane',
    image: '/images/og-image.jpg',
    imageAlt: 'Disaster Recovery Brisbane - Emergency Restoration Services'
  },

  // Twitter Card defaults
  twitter: {
    card: 'summary_large_image',
    site: '@disasterrecoveryqld',
    creator: '@disasterrecoveryqld'
  }
}

// Accessibility Settings
export const a11y = {
  // WCAG compliance level
  complianceLevel: 'AA',

  // Minimum sizes
  minTouchTarget: '44px',
  minTextSize: '14px',

  // Color contrast ratios
  contrastRatios: {
    normal: 4.5,
    large: 3,
    enhanced: 7
  },

  // Focus indicators
  focusRing: {
    width: '2px',
    offset: '2px',
    color: designTokens.colors.primary[500]
  },

  // Screen reader announcements
  announcements: {
    emergency: 'Emergency alert: ',
    loading: 'Loading content...',
    success: 'Action completed successfully',
    error: 'An error occurred. Please try again.'
  }
}

// Export complete design system configuration
export default {
  tokens: designTokens,
  theme,
  patterns,
  utils,
  performance,
  seo,
  a11y,
  version: '1.0.0',
  lastUpdated: '2025-01-17'
}