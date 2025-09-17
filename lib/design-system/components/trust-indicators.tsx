'use client'

import React from 'react'
import { Shield, Award, Clock, Users, Star, CheckCircle2, Building2, FileCheck } from 'lucide-react'
import Image from 'next/image'
import { designTokens } from '../core/tokens'

interface TrustBadge {
  icon: React.ReactNode
  title: string
  subtitle: string
  highlight?: boolean
}

interface TrustIndicatorsProps {
  variant?: 'compact' | 'detailed' | 'hero'
  showRatings?: boolean
  showInsurance?: boolean
  showResponse?: boolean
  className?: string
}

/**
 * Trust Indicators Component
 * Displays certifications, insurance, ratings, and response guarantees
 * Designed for Brisbane high net worth residents and insurance companies
 */
export const TrustIndicators: React.FC<TrustIndicatorsProps> = ({
  variant = 'compact',
  showRatings = true,
  showInsurance = true,
  showResponse = true,
  className = ''
}) => {
  const badges: TrustBadge[] = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'IICRC Certified',
      subtitle: 'Water, Fire, Mould',
      highlight: true
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'CARSI Member',
      subtitle: 'Industry Leader',
      highlight: true
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: '$20M Insurance',
      subtitle: 'Public Liability',
      highlight: showInsurance
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: '1 Hour Response',
      subtitle: 'Guaranteed',
      highlight: showResponse
    }
  ]

  const insurancePartners = [
    { name: 'QBE', logo: '/images/partners/qbe.png' },
    { name: 'IAG', logo: '/images/partners/iag.png' },
    { name: 'RACQ', logo: '/images/partners/racq.png' },
    { name: 'Allianz', logo: '/images/partners/allianz.png' }
  ]

  const stats = {
    rating: 4.9,
    reviews: 487,
    yearsExperience: 25,
    jobsCompleted: 15000,
    responseTime: '< 60 mins',
    availability: '24/7/365'
  }

  if (variant === 'hero') {
    return (
      <div className={`bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 ${className}`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Certifications */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              Industry Certifications
            </h3>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-blue-900">IICRC Certified</span>
              </div>
              <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-green-900">CARSI Member</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-lg">
                <Award className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-semibold text-purple-900">NRPG Founder</span>
              </div>
            </div>
          </div>

          {/* Insurance & Guarantees */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-green-600" />
              Insurance & Guarantees
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-3 rounded-lg">
                <div>
                  <p className="text-2xl font-bold text-green-900">$20M</p>
                  <p className="text-xs text-green-700">Public Liability</p>
                </div>
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-3 rounded-lg">
                <div>
                  <p className="text-2xl font-bold text-blue-900">1 Hour</p>
                  <p className="text-xs text-blue-700">Response Guarantee</p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Ratings & Reviews */}
          {showRatings && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Customer Reviews
              </h3>
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-bold text-gray-900">{stats.rating}</div>
                  <div className="flex-1">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(stats.rating)
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {stats.reviews} verified reviews
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex gap-4 text-xs text-gray-600">
                  <span>Google: 4.9★</span>
                  <span>Facebook: 4.8★</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Insurance Partners */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center mb-4">Trusted by major insurance companies</p>
          <div className="flex items-center justify-center gap-8 opacity-60 grayscale">
            {insurancePartners.map((partner) => (
              <div key={partner.name} className="h-8 relative">
                <span className="text-sm font-semibold text-gray-600">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'detailed') {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
        {badges.map((badge, index) => (
          <div
            key={index}
            className={`relative group ${
              badge.highlight
                ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200'
                : 'bg-white'
            } border rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <div
                className={`${
                  badge.highlight ? 'text-blue-600' : 'text-gray-600'
                } group-hover:scale-110 transition-transform`}
              >
                {badge.icon}
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">{badge.title}</p>
                <p className="text-xs text-gray-600">{badge.subtitle}</p>
              </div>
            </div>
            {badge.highlight && (
              <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                Verified
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  // Compact variant (default)
  return (
    <div className={`flex flex-wrap items-center justify-center gap-6 ${className}`}>
      {badges.map((badge, index) => (
        <div
          key={index}
          className="flex items-center gap-2 group"
        >
          <div className={`${badge.highlight ? 'text-blue-600' : 'text-gray-500'}`}>
            {badge.icon}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{badge.title}</p>
            <p className="text-xs text-gray-600">{badge.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  )
}