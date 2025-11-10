import React from 'react'
import { cn } from '@/lib/utils'
import { componentStyles } from '@/lib/design-system/components'

interface SectionWrapperProps {
  children: React.ReactNode
  variant?: 'white' | 'gray' | 'muted' | 'primary' | 'emergency' | 'gradient'
  className?: string
  containerWidth?: 'narrow' | 'wide' | 'full' | 'base'
  id?: string
}

/**
 * SectionWrapper Component
 *
 * Reusable section wrapper with consistent padding and background variants.
 * Extracted from reference design system.
 *
 * @param variant - Background style variant (default: 'white')
 * @param containerWidth - Container width constraint (default: 'base')
 * @param className - Additional CSS classes
 * @param id - Section ID for anchor links
 *
 * @example
 * ```tsx
 * <SectionWrapper variant="gray" containerWidth="wide" id="services">
 *   <h2>Our Services</h2>
 *   <ServiceGrid />
 * </SectionWrapper>
 * ```
 */
export function SectionWrapper({
  children,
  variant = 'white',
  className,
  containerWidth = 'base',
  id,
}: SectionWrapperProps) {
  const sectionClass = cn(
    componentStyles.section.base,
    componentStyles.section[variant],
    className
  )

  const containerClass = cn(
    containerWidth === 'narrow' && componentStyles.container.narrow,
    containerWidth === 'wide' && componentStyles.container.wide,
    containerWidth === 'full' && componentStyles.container.full,
    containerWidth === 'base' && componentStyles.container.base
  )

  return (
    <section className={sectionClass} id={id}>
      <div className={containerClass}>
        {children}
      </div>
    </section>
  )
}
