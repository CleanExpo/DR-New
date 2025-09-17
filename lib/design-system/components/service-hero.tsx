'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Phone, Clock, Shield, ChevronRight, PlayCircle, CheckCircle2 } from 'lucide-react'
import { designTokens } from '../core/tokens'

interface ServiceHeroProps {
  title: string
  subtitle?: string
  description: string
  imagePath: string
  imageAlt: string
  urgencyLevel?: 'low' | 'medium' | 'high' | 'critical'
  benefits?: string[]
  videoUrl?: string
  localArea?: string
  responseTime?: string
  certifications?: string[]
  ctaText?: string
  ctaAction?: () => void
  phoneNumber?: string
}

/**
 * Service Page Hero Component
 * Premium hero section for service pages with local Brisbane imagery
 * Optimized for conversion with trust signals and emergency CTAs
 */
export const ServiceHero: React.FC<ServiceHeroProps> = ({
  title,
  subtitle,
  description,
  imagePath,
  imageAlt,
  urgencyLevel = 'medium',
  benefits = defaultBenefits,
  videoUrl,
  localArea = 'Brisbane',
  responseTime = '1 Hour',
  certifications = ['IICRC', 'CARSI'],
  ctaText = 'Get Emergency Help',
  ctaAction,
  phoneNumber = '1300 309 361'
}) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const getUrgencyStyles = () => {
    switch (urgencyLevel) {
      case 'critical':
        return {
          badge: 'bg-red-600 text-white animate-pulse',
          border: 'border-red-500',
          text: 'EMERGENCY RESPONSE REQUIRED',
          glow: 'shadow-red-500/50'
        }
      case 'high':
        return {
          badge: 'bg-orange-600 text-white',
          border: 'border-orange-500',
          text: 'URGENT ATTENTION NEEDED',
          glow: 'shadow-orange-500/30'
        }
      case 'medium':
        return {
          badge: 'bg-blue-600 text-white',
          border: 'border-blue-500',
          text: 'PROFESSIONAL SERVICE',
          glow: 'shadow-blue-500/20'
        }
      default:
        return {
          badge: 'bg-gray-600 text-white',
          border: 'border-gray-400',
          text: 'ROUTINE SERVICE',
          glow: ''
        }
    }
  }

  const urgencyStyles = getUrgencyStyles()

  const handleCtaClick = () => {
    if (ctaAction) {
      ctaAction()
    } else {
      window.location.href = `tel:${phoneNumber.replace(/\s/g, '')}`
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content Section */}
          <div className="order-2 lg:order-1 space-y-6">
            {/* Urgency Badge */}
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${urgencyStyles.badge}`}>
                {urgencyStyles.text}
              </span>
              {localArea && (
                <span className="text-sm text-gray-600">
                  Serving {localArea}
                </span>
              )}
            </div>

            {/* Title & Subtitle */}
            <div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-2 text-xl text-blue-600 font-semibold">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-lg text-gray-700 leading-relaxed">
              {description}
            </p>

            {/* Benefits List */}
            {benefits.length > 0 && (
              <ul className="space-y-2">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 py-4 border-y border-gray-200">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{responseTime}</p>
                  <p className="text-xs text-gray-600">Response Time</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{certifications.join(' & ')}</p>
                  <p className="text-xs text-gray-600">Certified</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">24/7</p>
                  <p className="text-xs text-gray-600">Available</p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleCtaClick}
                className={`group relative overflow-hidden bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 min-h-[56px] ${
                  urgencyLevel === 'critical' ? 'animate-pulse' : ''
                }`}
                aria-label={ctaText}
              >
                <Phone className="w-5 h-5" />
                <span className="text-lg">{ctaText}</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />

                {/* Button Shine Effect */}
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>

              <a
                href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                className="bg-white border-2 border-gray-300 hover:border-blue-600 text-gray-900 font-semibold py-4 px-8 rounded-lg shadow hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 min-h-[56px]"
              >
                <Phone className="w-5 h-5" />
                <span>{phoneNumber}</span>
              </a>
            </div>
          </div>

          {/* Image/Video Section */}
          <div className="order-1 lg:order-2">
            <div className={`relative rounded-2xl overflow-hidden shadow-2xl ${urgencyStyles.border} border-2 ${urgencyStyles.glow}`}>
              {/* Main Image */}
              <div className="relative aspect-[4/3] bg-gray-100">
                <Image
                  src={imagePath}
                  alt={imageAlt}
                  fill
                  className={`object-cover transition-opacity duration-500 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  priority
                  onLoad={() => setImageLoaded(true)}
                />

                {/* Loading Skeleton */}
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
                )}

                {/* Play Button Overlay for Video */}
                {videoUrl && !isVideoPlaying && (
                  <button
                    onClick={() => setIsVideoPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group"
                    aria-label="Play video"
                  >
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-6 shadow-xl group-hover:scale-110 transition-transform">
                      <PlayCircle className="w-12 h-12 text-red-600" />
                    </div>
                  </button>
                )}

                {/* Video Player */}
                {videoUrl && isVideoPlaying && (
                  <div className="absolute inset-0">
                    <iframe
                      src={videoUrl}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}

                {/* Location Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg">
                  <p className="text-sm font-semibold text-gray-900">{localArea}</p>
                  <p className="text-xs text-gray-600">Service Area</p>
                </div>

                {/* Emergency Badge for Critical Services */}
                {urgencyLevel === 'critical' && (
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1.5 rounded-lg shadow-lg animate-pulse">
                    <p className="text-xs font-bold uppercase tracking-wider">Emergency</p>
                  </div>
                )}
              </div>
            </div>

            {/* Image Caption */}
            <p className="mt-3 text-sm text-center text-gray-600 italic">
              {imageAlt}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

const defaultBenefits = [
  'IICRC certified technicians with specialized training',
  '24/7 emergency response within 1 hour',
  'Insurance approved restoration processes',
  'Advanced equipment and proven techniques',
  'Comprehensive warranty on all work'
]