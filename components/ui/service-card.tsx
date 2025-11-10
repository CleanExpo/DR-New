import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { componentStyles } from '@/lib/design-system/components'
import { typography } from '@/lib/design-system/typography'

interface ServiceCardProps {
  title: string
  description: string
  icon: LucideIcon
  iconColor: 'water' | 'fire' | 'storm' | 'mould' | 'biohazard' | 'sewage'
  imageSrc?: string
  imageAlt?: string
  href?: string
  className?: string
}

/**
 * ServiceCard Component
 *
 * Displays service information with icon, image, title, and description.
 * Includes hover effects and optional link functionality.
 *
 * @param title - Service title
 * @param description - Service description
 * @param icon - Lucide icon component
 * @param iconColor - Icon container color variant
 * @param imageSrc - Optional service image URL
 * @param imageAlt - Image alt text (required if imageSrc provided)
 * @param href - Optional link URL
 * @param className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <ServiceCard
 *   title="Water Damage Restoration"
 *   description="Emergency water extraction and drying services"
 *   icon={Droplets}
 *   iconColor="water"
 *   imageSrc="/images/water-damage.jpg"
 *   imageAlt="Water damage restoration"
 *   href="/services/water-damage-restoration"
 * />
 * ```
 */
export function ServiceCard({
  title,
  description,
  icon: Icon,
  iconColor,
  imageSrc,
  imageAlt = '',
  href,
  className,
}: ServiceCardProps) {
  const cardContent = (
    <>
      {imageSrc && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-6">
        <div
          className={cn(
            componentStyles.iconContainer.base,
            componentStyles.iconContainer.md,
            componentStyles.iconContainer[iconColor],
            'mb-4'
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        <h3 className={typography.card.title}>{title}</h3>
        <p className={typography.card.description}>{description}</p>
      </div>
    </>
  )

  const baseClasses = cn(
    componentStyles.card.service,
    'group',
    className
  )

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {cardContent}
      </Link>
    )
  }

  return <div className={baseClasses}>{cardContent}</div>
}
