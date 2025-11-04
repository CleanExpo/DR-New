/**
 * Optimised Page Template
 * Template for optimized service pages
 */

import { ReactNode } from 'react'
import Link from 'next/link'

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

export const AUSTRALIAN_CONFIG = {
  country: 'Australia',
  currency: 'AUD',
  timezone: 'Australia/Brisbane',
  emergencyNumber: '000'
}

export function AustralianLocationGrid({ locations }: { locations?: string[] }) {
  const defaultLocations = locations || ['Brisbane', 'Ipswich', 'Logan', 'Gold Coast']

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
      {defaultLocations.map((location) => (
        <Link
          key={location}
          href={`/locations/${location.toLowerCase().replace(' ', '-')}`}
          className="p-4 border rounded hover:bg-gray-50 text-center"
        >
          {location}
        </Link>
      ))}
    </div>
  )
}

export function EmergencyCTA() {
  return (
    <div className="bg-red-600 text-white py-8 text-center rounded-lg my-8">
      <h3 className="text-2xl font-bold mb-4">24/7 Emergency Response</h3>
      <p className="text-lg mb-4">Available now for immediate assistance</p>
      <Link
        href="/contact"
        className="inline-block bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100"
      >
        Contact Us Now
      </Link>
    </div>
  )
}

export function TrustIndicators() {
  return (
    <div className="grid grid-cols-3 gap-4 py-6">
      <div className="text-center">
        <div className="text-2xl font-bold">24/7</div>
        <div className="text-sm">Emergency Response</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold">Licensed</div>
        <div className="text-sm">& Insured</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold">Local</div>
        <div className="text-sm">Brisbane Team</div>
      </div>
    </div>
  )
}

export function generateAustralianMetadata(config: {
  title: string
  description: string
  url?: string
}) {
  return {
    title: config.title,
    description: config.description,
    openGraph: {
      title: config.title,
      description: config.description,
      url: config.url || 'https://dr-new-ten.vercel.app',
      type: 'website'
    }
  }
}

export function generateAustralianSchema(service: {
  name: string
  description: string
  areaServed?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Disaster Recovery Brisbane',
      telephone: '1300 309 361'
    },
    areaServed: (service.areaServed || ['Brisbane', 'Ipswich', 'Logan']).map(area => ({
      '@type': 'City',
      name: area
    }))
  }
}
