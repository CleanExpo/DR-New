/**
 * EmergencyHero Component - Usage Example
 *
 * This file demonstrates how to integrate the EmergencyHero component
 * into a Next.js page or layout.
 */

import { EmergencyHero } from './EmergencyHero'

/**
 * Example 1: Basic usage in a page
 */
export default function HomePage() {
  return (
    <main>
      <EmergencyHero />

      {/* Other page sections would go here */}
      <section className="py-16">
        {/* Services section */}
      </section>

      <section className="py-16 bg-gray-50">
        {/* Testimonials section */}
      </section>
    </main>
  )
}

/**
 * Example 2: Usage in app directory layout
 */
export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {/* Header would go here */}

      <EmergencyHero />

      {/* Page content */}
      {children}

      {/* Footer would go here */}
    </div>
  )
}

/**
 * Example 3: Customizing the component
 *
 * Note: The current implementation doesn't expose props,
 * but you can modify the component to accept configuration props:
 *
 * interface EmergencyHeroProps {
 *   headline?: string
 *   subheading?: string
 *   showEmergencyBadge?: boolean
 *   ctaLinks?: {
 *     reportClaim?: string
 *     findContractor?: string
 *     getQuote?: string
 *   }
 * }
 */
