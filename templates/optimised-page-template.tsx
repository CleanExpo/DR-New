/**
 * Optimised Page Template
 * Template for optimized service pages
 */

import { ReactNode } from 'react'

interface OptimisedPageTemplateProps {
  children?: ReactNode
  title?: string
  description?: string
}

export default function OptimisedPageTemplate({
  children,
  title,
  description
}: OptimisedPageTemplateProps) {
  return (
    <div className="min-h-screen">
      {title && (
        <div className="bg-blue-900 text-white py-12">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            {description && <p className="text-xl">{description}</p>}
          </div>
        </div>
      )}
      <div className="container mx-auto px-6 py-12">
        {children}
      </div>
    </div>
  )
}
