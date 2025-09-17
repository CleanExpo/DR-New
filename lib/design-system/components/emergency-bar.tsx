'use client'

import React, { useState, useEffect } from 'react'
import { X, AlertTriangle, Phone, Clock, MapPin, ChevronRight } from 'lucide-react'
import { designTokens } from '../core/tokens'

interface EmergencyAlert {
  id: string
  type: 'flood' | 'storm' | 'fire' | 'general'
  title: string
  message: string
  suburb?: string
  timeAgo?: string
  urgent?: boolean
}

interface EmergencyBarProps {
  alerts?: EmergencyAlert[]
  phoneNumber?: string
  autoRotate?: boolean
  rotateInterval?: number
}

/**
 * Emergency Notification Bar
 * Displays rotating emergency alerts with local Brisbane context
 * Optimized for immediate action and trust building
 */
export const EmergencyBar: React.FC<EmergencyBarProps> = ({
  alerts = defaultAlerts,
  phoneNumber = '1300 309 361',
  autoRotate = true,
  rotateInterval = 8000
}) => {
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!autoRotate || isPaused || alerts.length <= 1) return

    const interval = setInterval(() => {
      setCurrentAlertIndex((prev) => (prev + 1) % alerts.length)
    }, rotateInterval)

    return () => clearInterval(interval)
  }, [autoRotate, rotateInterval, alerts.length, isPaused])

  if (!isVisible || alerts.length === 0) return null

  const currentAlert = alerts[currentAlertIndex]

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'flood':
        return 'bg-blue-600'
      case 'storm':
        return 'bg-purple-600'
      case 'fire':
        return 'bg-red-600'
      default:
        return 'bg-orange-600'
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'flood':
        return '🌊'
      case 'storm':
        return '⛈️'
      case 'fire':
        return '🔥'
      default:
        return '⚠️'
    }
  }

  return (
    <div
      className={`relative ${getAlertColor(currentAlert.type)} text-white transition-all duration-500`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="alert"
      aria-live="polite"
    >
      {/* Background Pattern for Premium Feel */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)`
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 sm:py-3">
          {/* Alert Content */}
          <div className="flex items-center flex-1 min-w-0">
            {/* Alert Icon */}
            <span className="text-2xl mr-3 animate-pulse" aria-hidden="true">
              {getAlertIcon(currentAlert.type)}
            </span>

            {/* Alert Message */}
            <div className="flex-1 flex items-center flex-wrap gap-2 sm:gap-4">
              {currentAlert.urgent && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-white text-red-600 uppercase tracking-wider">
                  Urgent
                </span>
              )}

              <p className="text-sm sm:text-base font-medium truncate">
                <span className="font-bold">{currentAlert.title}</span>
                <span className="hidden sm:inline"> - {currentAlert.message}</span>
              </p>

              {currentAlert.suburb && (
                <span className="inline-flex items-center text-xs sm:text-sm opacity-90">
                  <MapPin className="w-3 h-3 mr-1" />
                  {currentAlert.suburb}
                </span>
              )}

              {currentAlert.timeAgo && (
                <span className="inline-flex items-center text-xs sm:text-sm opacity-75">
                  <Clock className="w-3 h-3 mr-1" />
                  {currentAlert.timeAgo}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 ml-4">
            {/* Call Button */}
            <a
              href={`tel:${phoneNumber.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-white text-gray-900 rounded-md font-semibold text-sm hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-600"
              aria-label="Call emergency number"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Call Now</span>
              <span className="sm:hidden">Call</span>
            </a>

            {/* Alert Navigation */}
            {alerts.length > 1 && (
              <div className="flex items-center gap-1">
                {alerts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentAlertIndex(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      index === currentAlertIndex
                        ? 'bg-white w-4'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to alert ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Close emergency notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Default alerts for Brisbane area
const defaultAlerts: EmergencyAlert[] = [
  {
    id: '1',
    type: 'flood',
    title: 'Flash Flood Warning',
    message: '24/7 emergency water extraction available',
    suburb: 'Brisbane CBD',
    timeAgo: '10 mins ago',
    urgent: true
  },
  {
    id: '2',
    type: 'storm',
    title: 'Severe Storm Damage',
    message: 'Immediate response teams standing by',
    suburb: 'Inner Brisbane',
    timeAgo: '30 mins ago'
  },
  {
    id: '3',
    type: 'general',
    title: '1-Hour Response Guarantee',
    message: 'IICRC certified technicians ready now',
    urgent: false
  }
]