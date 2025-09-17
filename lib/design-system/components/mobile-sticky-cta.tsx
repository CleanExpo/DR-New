'use client'

import React, { useState, useEffect } from 'react'
import { Phone, MessageCircle, Calendar, MapPin, X, ChevronUp } from 'lucide-react'
import { designTokens } from '../core/tokens'

interface CTAOption {
  id: string
  icon: React.ReactNode
  label: string
  action: string
  color: string
  ariaLabel: string
}

interface MobileStickyCtaProps {
  phoneNumber?: string
  showOnScroll?: boolean
  scrollThreshold?: number
  position?: 'bottom' | 'right'
  expandable?: boolean
}

/**
 * Mobile Sticky CTA Component
 * Floating action buttons optimized for emergency conversions
 * WCAG 2.1 AA compliant with 44px minimum touch targets
 */
export const MobileStickyCtaComponent: React.FC<MobileStickyCtaProps> = ({
  phoneNumber = '1300 309 361',
  showOnScroll = true,
  scrollThreshold = 100,
  position = 'bottom',
  expandable = true
}) => {
  const [isVisible, setIsVisible] = useState(!showOnScroll)
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const ctaOptions: CTAOption[] = [
    {
      id: 'call',
      icon: <Phone className="w-5 h-5" />,
      label: 'Call Now',
      action: `tel:${phoneNumber.replace(/\s/g, '')}`,
      color: 'bg-red-600 hover:bg-red-700',
      ariaLabel: 'Call emergency hotline'
    },
    {
      id: 'chat',
      icon: <MessageCircle className="w-5 h-5" />,
      label: 'Live Chat',
      action: '#chat',
      color: 'bg-blue-600 hover:bg-blue-700',
      ariaLabel: 'Start live chat'
    },
    {
      id: 'quote',
      icon: <Calendar className="w-5 h-5" />,
      label: 'Get Quote',
      action: '#quote',
      color: 'bg-green-600 hover:bg-green-700',
      ariaLabel: 'Get instant quote'
    },
    {
      id: 'location',
      icon: <MapPin className="w-5 h-5" />,
      label: 'Find Us',
      action: '#location',
      color: 'bg-purple-600 hover:bg-purple-700',
      ariaLabel: 'Find nearest location'
    }
  ]

  useEffect(() => {
    if (!showOnScroll) return

    const handleScroll = () => {
      const scrolled = window.scrollY > scrollThreshold
      setIsVisible(scrolled)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [showOnScroll, scrollThreshold])

  const handleOptionClick = (option: CTAOption) => {
    if (option.action.startsWith('tel:')) {
      window.location.href = option.action
    } else if (option.action.startsWith('#')) {
      // Handle internal navigation
      setSelectedOption(option.id)
      // Implement your navigation logic here
    }
  }

  if (position === 'right') {
    // Desktop/Tablet side panel variant
    return (
      <div
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 transition-all duration-300 ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        } hidden md:block`}
      >
        <div className="bg-white shadow-2xl rounded-l-2xl overflow-hidden border-l-4 border-red-600">
          <div className="p-2 space-y-2">
            {ctaOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option)}
                className={`w-14 h-14 rounded-xl ${option.color} text-white flex items-center justify-center transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500`}
                aria-label={option.ariaLabel}
                title={option.label}
              >
                {option.icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Mobile bottom bar variant (default)
  return (
    <>
      {/* Main CTA Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-all duration-300 ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Expanded Options */}
        {expandable && isExpanded && (
          <div className="bg-white border-t border-gray-200 shadow-2xl">
            <div className="grid grid-cols-2 gap-2 p-3">
              {ctaOptions.slice(1).map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option)}
                  className={`${option.color} text-white rounded-lg py-3 px-4 flex items-center justify-center gap-2 font-semibold transition-all duration-200 min-h-[48px] focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500`}
                  aria-label={option.ariaLabel}
                >
                  {option.icon}
                  <span className="text-sm">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Primary CTA Bar */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-2xl">
          <div className="flex items-stretch">
            {/* Main Call Button */}
            <a
              href={`tel:${phoneNumber.replace(/\s/g, '')}`}
              className="flex-1 flex items-center justify-center gap-3 py-4 px-4 hover:bg-red-800/30 transition-colors focus:outline-none focus:ring-4 focus:ring-inset focus:ring-white"
              aria-label="Call emergency hotline now"
            >
              <div className="relative">
                <Phone className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping" />
              </div>
              <div className="text-left">
                <div className="text-xs opacity-90">24/7 Emergency</div>
                <div className="text-lg font-bold">{phoneNumber}</div>
              </div>
            </a>

            {/* Expand Button */}
            {expandable && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-4 border-l border-red-500 hover:bg-red-800/30 transition-colors focus:outline-none focus:ring-4 focus:ring-inset focus:ring-white"
                aria-label={isExpanded ? 'Close more options' : 'Show more contact options'}
                aria-expanded={isExpanded}
              >
                <ChevronUp
                  className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                />
              </button>
            )}
          </div>

          {/* Trust Indicator */}
          <div className="bg-red-800/30 px-4 py-1.5 text-center text-xs font-medium">
            IICRC Certified • 1 Hour Response • $20M Insurance
          </div>
        </div>
      </div>

      {/* Floating Action Button for Tablets */}
      <button
        className={`fixed bottom-6 right-6 z-50 bg-red-600 hover:bg-red-700 text-white rounded-full w-16 h-16 shadow-2xl hidden md:flex lg:hidden items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-red-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
        onClick={() => window.location.href = `tel:${phoneNumber.replace(/\s/g, '')}`}
        aria-label="Call emergency hotline"
      >
        <Phone className="w-7 h-7" />
        <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
      </button>
    </>
  )
}

export default MobileStickyCtaComponent