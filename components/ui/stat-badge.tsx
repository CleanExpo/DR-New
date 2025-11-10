import React from 'react'
import { cn } from '@/lib/utils'
import { componentStyles } from '@/lib/design-system/components'

interface StatBadgeProps {
  value: string | number
  label: string
  variant?: 'emergency' | 'primary' | 'success'
  className?: string
}

/**
 * StatBadge Component
 *
 * Circular badge displaying a statistic or key metric.
 * Used for highlighting important numbers like "24/7", "IICRC", "30+", etc.
 *
 * @param value - The main statistic value (e.g., "24/7", "IICRC", "30+")
 * @param label - Description label below the badge
 * @param variant - Color variant (default: 'emergency')
 * @param className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <StatBadge
 *   value="24/7"
 *   label="Emergency Response"
 *   variant="emergency"
 * />
 * ```
 */
export function StatBadge({
  value,
  label,
  variant = 'emergency',
  className,
}: StatBadgeProps) {
  return (
    <div className={cn('text-center', className)}>
      <div
        className={cn(
          componentStyles.statBadge.base,
          componentStyles.statBadge[variant],
          'mx-auto mb-4'
        )}
      >
        {value}
      </div>
      <h3 className="font-bold mb-2">{label}</h3>
    </div>
  )
}

interface StatBadgeGridProps {
  stats: Array<{
    value: string | number
    label: string
    description?: string
    variant?: 'emergency' | 'primary' | 'success'
  }>
  className?: string
}

/**
 * StatBadgeGrid Component
 *
 * Grid layout for multiple StatBadge components.
 * Responsive grid that adapts to different screen sizes.
 *
 * @param stats - Array of stat objects
 * @param className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <StatBadgeGrid
 *   stats={[
 *     { value: "24/7", label: "Emergency Response", description: "Available 24/7" },
 *     { value: "IICRC", label: "Certified", description: "Master certified technicians" },
 *   ]}
 * />
 * ```
 */
export function StatBadgeGrid({ stats, className }: StatBadgeGridProps) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8', className)}>
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <StatBadge
            value={stat.value}
            label={stat.label}
            variant={stat.variant}
          />
          {stat.description && (
            <p className="text-gray-600 text-sm mt-2">{stat.description}</p>
          )}
        </div>
      ))}
    </div>
  )
}
