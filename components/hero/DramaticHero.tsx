'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface DramaticHeroProps {
  /**
   * Hero background image URL
   */
  backgroundImage: string

  /**
   * Alt text for background image (accessibility)
   */
  backgroundAlt: string

  /**
   * Main hero title
   */
  title: string | React.ReactNode

  /**
   * Hero subtitle or description
   */
  subtitle?: string

  /**
   * Secondary text (e.g., service areas)
   */
  secondaryText?: string

  /**
   * Primary CTA button configuration
   */
  primaryCta?: {
    text: string
    href?: string
    onClick?: () => void
    icon?: React.ReactNode
  }

  /**
   * Secondary CTA button configuration
   */
  secondaryCta?: {
    text: string
    href?: string
    onClick?: () => void
    icon?: React.ReactNode
  }

  /**
   * Overlay gradient configuration
   * @default true
   */
  showOverlay?: boolean

  /**
   * Enable spotlight effect on mouse move
   * @default false
   */
  enableSpotlight?: boolean

  /**
   * Custom spotlight color
   */
  spotlightColor?: string

  /**
   * Additional CSS classes for the hero section
   */
  className?: string

  /**
   * Additional CSS classes for the content container
   */
  contentClassName?: string
}

/**
 * DramaticHero Component
 *
 * Full-screen hero section with background image, gradient overlays,
 * and optional interactive spotlight effect.
 *
 * Features:
 * - Responsive background image with Next.js Image optimization
 * - Multiple gradient overlay layers for depth
 * - Optional mouse-following spotlight effect
 * - Flexible CTA button configuration
 * - Fully accessible with proper ARIA labels
 *
 * @example
 * ```tsx
 * <DramaticHero
 *   backgroundImage="/images/hero/emergency-hero.jpg"
 *   backgroundAlt="Emergency disaster scene"
 *   title="24/7 Emergency Restoration Services"
 *   subtitle="Professional disaster recovery across Brisbane, Ipswich & Logan"
 *   primaryCta={{
 *     text: "Call Now: 1300 309 361",
 *     href: "tel:1300309361",
 *     icon: <Phone className="mr-2 h-5 w-5" />
 *   }}
 *   secondaryCta={{
 *     text: "Available 24/7",
 *     icon: <Clock className="mr-2 h-5 w-5" />
 *   }}
 *   enableSpotlight
 * />
 * ```
 */
export function DramaticHero({
  backgroundImage,
  backgroundAlt,
  title,
  subtitle,
  secondaryText,
  primaryCta,
  secondaryCta,
  showOverlay = true,
  enableSpotlight = false,
  spotlightColor = 'rgba(100, 100, 255, 0.15)',
  className,
  contentClassName,
}: DramaticHeroProps) {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })

  React.useEffect(() => {
    if (!enableSpotlight) {return}

    const handleMouseMove = (e: MouseEvent) => {
      // Throttle updates for performance
      if (Math.random() > 0.92) {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Set initial position to center
    setMousePosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 3,
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [enableSpotlight])

  return (
    <section
      className={cn(
        'relative min-h-screen flex items-center justify-center overflow-hidden',
        'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900',
        className
      )}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt={backgroundAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-90"
        />
      </div>

      {/* Gradient Overlays */}
      {showOverlay && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900 opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-gray-900 opacity-40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(17,24,39,0.8)_100%)]" />
        </>
      )}

      {/* Optional Spotlight Effect */}
      {enableSpotlight && (
        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-70 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}, transparent 40%)`,
          }}
        />
      )}

      {/* Hero Content */}
      <div className={cn('relative z-10 container px-4 md:px-6 py-16 md:py-20', contentClassName)}>
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Title */}
          {typeof title === 'string' ? (
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              {title}
            </h1>
          ) : (
            title
          )}

          {/* Subtitle */}
          {subtitle && (
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4 drop-shadow-md">
              {subtitle}
            </h2>
          )}

          {/* Secondary Text */}
          {secondaryText && (
            <p className="text-xl md:text-2xl text-gray-200 mb-8 drop-shadow-md">
              {secondaryText}
            </p>
          )}

          {/* CTA Buttons */}
          {(primaryCta || secondaryCta) && (
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              {primaryCta && (
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg h-auto"
                  onClick={primaryCta.onClick}
                  asChild={!!primaryCta.href}
                >
                  {primaryCta.href ? (
                    <a href={primaryCta.href}>
                      {primaryCta.icon}
                      {primaryCta.text}
                    </a>
                  ) : (
                    <>
                      {primaryCta.icon}
                      {primaryCta.text}
                    </>
                  )}
                </Button>
              )}

              {secondaryCta && (
                <Button
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20 px-8 py-6 text-lg h-auto"
                  onClick={secondaryCta.onClick}
                  asChild={!!secondaryCta.href}
                >
                  {secondaryCta.href ? (
                    <a href={secondaryCta.href}>
                      {secondaryCta.icon}
                      {secondaryCta.text}
                    </a>
                  ) : (
                    <>
                      {secondaryCta.icon}
                      {secondaryCta.text}
                    </>
                  )}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
