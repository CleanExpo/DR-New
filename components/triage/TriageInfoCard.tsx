/**
 * Triage Info Card Component
 * Displays emergency triage information
 */

import { ReactNode } from 'react'

interface TriageInfoCardProps {
  title: string
  description?: string
  icon?: ReactNode
  children?: ReactNode
  className?: string
}

export function TriageInfoCard({
  title,
  description,
  icon,
  children,
  className = ''
}: TriageInfoCardProps) {
  return (
    <div className={`bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg ${className}`}>
      <div className="flex items-start gap-4">
        {icon && <div className="flex-shrink-0 text-blue-600">{icon}</div>}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
          {description && <p className="text-gray-700 mb-4">{description}</p>}
          {children}
        </div>
      </div>
    </div>
  )
}
