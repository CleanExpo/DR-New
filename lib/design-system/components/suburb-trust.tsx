'use client'

import React from 'react'
import { MapPin, Clock, Star, Home, Users, TrendingUp, Award, Shield } from 'lucide-react'
import { designTokens } from '../core/tokens'

interface SuburbData {
  name: string
  region: string
  responseTime: string
  jobsCompleted: number
  avgRating: number
  topServices: string[]
  recentTestimonial?: {
    text: string
    author: string
    rating: number
  }
  demographics?: {
    medianPrice?: string
    floodRisk?: 'low' | 'medium' | 'high'
    population?: string
  }
}

interface SuburbTrustProps {
  suburb: SuburbData
  variant?: 'compact' | 'detailed' | 'hero'
  showMap?: boolean
  className?: string
}

/**
 * Suburb-Specific Trust Component
 * Displays localized trust signals and service data for Brisbane suburbs
 * Targets high net worth areas like Ascot, New Farm, Hamilton
 */
export const SuburbTrust: React.FC<SuburbTrustProps> = ({
  suburb,
  variant = 'compact',
  showMap = false,
  className = ''
}) => {
  const getPremiumSuburbs = () => [
    'Ascot', 'Hamilton', 'New Farm', 'Teneriffe', 'Bulimba',
    'Hawthorne', 'Clayfield', 'Paddington', 'Toowong', 'St Lucia'
  ]

  const isPremiumSuburb = getPremiumSuburbs().includes(suburb.name)

  const getFloodRiskColor = (risk?: string) => {
    switch (risk) {
      case 'high':
        return 'text-red-600 bg-red-50'
      case 'medium':
        return 'text-orange-600 bg-orange-50'
      case 'low':
        return 'text-green-600 bg-green-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  if (variant === 'hero') {
    return (
      <div className={`bg-white rounded-2xl shadow-xl overflow-hidden ${className}`}>
        {/* Header with Map Background */}
        <div className="relative h-48 bg-gradient-to-br from-blue-600 to-blue-800">
          {showMap && (
            <div className="absolute inset-0 opacity-20">
              {/* Map placeholder - integrate with real map API */}
              <div className="w-full h-full bg-blue-900" />
            </div>
          )}

          <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-2">
                  <MapPin className="w-8 h-8" />
                  {suburb.name}
                </h2>
                <p className="text-blue-100 mt-1">{suburb.region}, Brisbane</p>
              </div>
              {isPremiumSuburb && (
                <div className="bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-xs font-bold uppercase">
                  Premium Service Area
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{suburb.responseTime}</p>
              <p className="text-xs text-gray-600">Avg Response</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Home className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{suburb.jobsCompleted}</p>
              <p className="text-xs text-gray-600">Jobs Completed</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{suburb.avgRating}</p>
              <p className="text-xs text-gray-600">Avg Rating</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">24/7</p>
              <p className="text-xs text-gray-600">Availability</p>
            </div>
          </div>

          {/* Top Services */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
              Most Requested Services in {suburb.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {suburb.topServices.map((service, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          {/* Demographics & Risk Info */}
          {suburb.demographics && (
            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              {suburb.demographics.medianPrice && (
                <div>
                  <p className="text-xs text-gray-600">Median Property</p>
                  <p className="font-semibold text-gray-900">{suburb.demographics.medianPrice}</p>
                </div>
              )}
              {suburb.demographics.floodRisk && (
                <div>
                  <p className="text-xs text-gray-600">Flood Risk</p>
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${getFloodRiskColor(suburb.demographics.floodRisk)}`}>
                    {suburb.demographics.floodRisk.toUpperCase()}
                  </span>
                </div>
              )}
              {suburb.demographics.population && (
                <div>
                  <p className="text-xs text-gray-600">Population</p>
                  <p className="font-semibold text-gray-900">{suburb.demographics.population}</p>
                </div>
              )}
            </div>
          )}

          {/* Recent Testimonial */}
          {suburb.recentTestimonial && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-gray-700 italic mb-2">"{suburb.recentTestimonial.text}"</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-900">
                      — {suburb.recentTestimonial.author}
                    </p>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < suburb.recentTestimonial!.rating
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Trust Badge */}
          <div className="mt-6 flex items-center justify-center gap-3 p-3 bg-green-50 rounded-lg">
            <Shield className="w-5 h-5 text-green-600" />
            <p className="text-sm font-semibold text-green-900">
              Trusted Emergency Service Provider for {suburb.name} Since 2011
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'detailed') {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              {suburb.name}
            </h3>
            <p className="text-sm text-gray-600">{suburb.region}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(suburb.avgRating)
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-1">{suburb.jobsCompleted} jobs</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-sm font-semibold text-gray-900">{suburb.responseTime}</p>
              <p className="text-xs text-gray-600">Response Time</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-sm font-semibold text-gray-900">{suburb.jobsCompleted}+</p>
              <p className="text-xs text-gray-600">Happy Customers</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Compact variant (default)
  return (
    <div className={`inline-flex items-center gap-3 bg-white rounded-lg shadow px-4 py-2 ${className}`}>
      <MapPin className="w-4 h-4 text-blue-600" />
      <div>
        <p className="text-sm font-semibold text-gray-900">
          {suburb.name} • {suburb.responseTime} Response
        </p>
        <p className="text-xs text-gray-600">
          {suburb.jobsCompleted}+ jobs • {suburb.avgRating}★ rating
        </p>
      </div>
    </div>
  )
}

// Export sample data for Brisbane suburbs
export const brisbaneSuburbs: SuburbData[] = [
  {
    name: 'Ascot',
    region: 'Inner North',
    responseTime: '25 mins',
    jobsCompleted: 342,
    avgRating: 4.9,
    topServices: ['Water Damage', 'Mould Removal', 'Fire Restoration'],
    demographics: {
      medianPrice: '$1.8M',
      floodRisk: 'medium',
      population: '5,800'
    },
    recentTestimonial: {
      text: 'Exceptional service after our basement flooded. Professional team arrived within 30 minutes.',
      author: 'James H., Ascot',
      rating: 5
    }
  },
  {
    name: 'New Farm',
    region: 'Inner East',
    responseTime: '20 mins',
    jobsCompleted: 518,
    avgRating: 4.8,
    topServices: ['Flood Recovery', 'Storm Damage', 'Contents Restoration'],
    demographics: {
      medianPrice: '$1.5M',
      floodRisk: 'high',
      population: '12,500'
    },
    recentTestimonial: {
      text: 'Saved our heritage home after the 2022 floods. Cannot recommend highly enough.',
      author: 'Sarah M., New Farm',
      rating: 5
    }
  },
  {
    name: 'Hamilton',
    region: 'Inner North',
    responseTime: '30 mins',
    jobsCompleted: 289,
    avgRating: 4.9,
    topServices: ['Water Extraction', 'Luxury Home Restoration', 'Biohazard Cleanup'],
    demographics: {
      medianPrice: '$2.1M',
      floodRisk: 'high',
      population: '7,200'
    },
    recentTestimonial: {
      text: 'Professional handling of our riverside property damage. Insurance process was seamless.',
      author: 'Michael T., Hamilton',
      rating: 5
    }
  }
]