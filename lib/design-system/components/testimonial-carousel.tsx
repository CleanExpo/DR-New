'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Star, ChevronLeft, ChevronRight, Quote, MapPin, Calendar, Shield, Home } from 'lucide-react'
import { designTokens } from '../core/tokens'

interface Testimonial {
  id: string
  author: string
  suburb: string
  propertyType: string
  date: string
  rating: number
  service: string
  text: string
  highlight?: string
  image?: string
  insuranceCompany?: string
  responseTime?: string
  featured?: boolean
}

interface TestimonialCarouselProps {
  testimonials?: Testimonial[]
  variant?: 'carousel' | 'grid' | 'featured'
  autoPlay?: boolean
  showSuburb?: boolean
  filterBySuburb?: string
  className?: string
}

/**
 * Premium Testimonial Carousel Component
 * Showcases reviews from high net worth Brisbane suburbs
 * Builds trust through authentic local success stories
 */
export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials = defaultTestimonials,
  variant = 'carousel',
  autoPlay = true,
  showSuburb = true,
  filterBySuburb,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Filter testimonials by suburb if specified
  const filteredTestimonials = filterBySuburb
    ? testimonials.filter(t => t.suburb.toLowerCase() === filterBySuburb.toLowerCase())
    : testimonials

  // Separate featured testimonials
  const featuredTestimonials = filteredTestimonials.filter(t => t.featured)
  const regularTestimonials = filteredTestimonials.filter(t => !t.featured)

  useEffect(() => {
    if (!autoPlay || filteredTestimonials.length <= 1 || variant !== 'carousel') return

    const interval = setInterval(() => {
      handleNext()
    }, 6000)

    return () => clearInterval(interval)
  }, [autoPlay, filteredTestimonials.length, currentIndex, variant])

  const handlePrevious = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const handleDotClick = (index: number) => {
    if (isAnimating || index === currentIndex) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  if (variant === 'featured' && featuredTestimonials.length > 0) {
    const featured = featuredTestimonials[0]

    return (
      <div className={`bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl overflow-hidden ${className}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Image Side */}
          <div className="relative h-64 lg:h-auto bg-gradient-to-br from-blue-600 to-blue-700">
            {featured.image ? (
              <Image
                src={featured.image}
                alt={`${featured.suburb} property restoration`}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Home className="w-32 h-32 text-blue-500 opacity-20" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Property Badge */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg">
              <p className="text-sm font-semibold text-gray-900">{featured.propertyType}</p>
              <p className="text-xs text-gray-600">{featured.suburb}</p>
            </div>
          </div>

          {/* Content Side */}
          <div className="p-8 lg:p-12">
            {/* Rating Stars */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < featured.rating
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-600">
                {featured.rating}.0 / 5.0
              </span>
            </div>

            {/* Quote */}
            <div className="relative mb-6">
              <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-200" />
              <p className="relative z-10 text-lg text-gray-700 italic leading-relaxed pl-6">
                {featured.text}
              </p>
              {featured.highlight && (
                <p className="mt-3 text-blue-600 font-semibold pl-6">
                  "{featured.highlight}"
                </p>
              )}
            </div>

            {/* Author Info */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{featured.author}</p>
                  <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {featured.suburb}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {featured.date}
                    </span>
                  </div>
                </div>
                {featured.insuranceCompany && (
                  <div className="text-right">
                    <p className="text-xs text-gray-600">Insurance</p>
                    <p className="text-sm font-semibold text-gray-900">{featured.insuranceCompany}</p>
                  </div>
                )}
              </div>

              {/* Service Details */}
              <div className="mt-4 flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-xs text-gray-600">Service Provided</p>
                  <p className="text-sm font-semibold text-gray-900">{featured.service}</p>
                </div>
                {featured.responseTime && (
                  <div className="text-right">
                    <p className="text-xs text-gray-600">Response Time</p>
                    <p className="text-sm font-semibold text-green-600">{featured.responseTime}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Trust Badge */}
            <div className="mt-6 flex items-center gap-2 text-sm text-gray-600">
              <Shield className="w-4 h-4 text-green-600" />
              <span>Verified Customer Review</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'grid') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {filteredTestimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            showSuburb={showSuburb}
          />
        ))}
      </div>
    )
  }

  // Carousel variant (default)
  return (
    <div className={`relative ${className}`}>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {filteredTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0">
                <div className="p-8 lg:p-12">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < testimonial.rating
                                  ? 'text-yellow-500 fill-yellow-500'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        {testimonial.featured && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-0.5 rounded">
                            FEATURED
                          </span>
                        )}
                      </div>

                      {/* Service & Location */}
                      <p className="text-lg font-semibold text-gray-900">{testimonial.service}</p>
                      {showSuburb && (
                        <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {testimonial.suburb} • {testimonial.propertyType}
                        </p>
                      )}
                    </div>

                    {/* Quote Icon */}
                    <Quote className="w-12 h-12 text-blue-100" />
                  </div>

                  {/* Testimonial Text */}
                  <div className="mb-6">
                    <p className="text-lg text-gray-700 leading-relaxed mb-3">
                      {testimonial.text}
                    </p>
                    {testimonial.highlight && (
                      <p className="text-blue-600 font-semibold italic">
                        "{testimonial.highlight}"
                      </p>
                    )}
                  </div>

                  {/* Author & Details */}
                  <div className="flex items-end justify-between pt-6 border-t border-gray-200">
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-600">{testimonial.date}</p>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      {testimonial.responseTime && (
                        <div className="text-right">
                          <p className="text-xs text-gray-600">Response</p>
                          <p className="font-semibold text-green-600">{testimonial.responseTime}</p>
                        </div>
                      )}
                      {testimonial.insuranceCompany && (
                        <div className="text-right">
                          <p className="text-xs text-gray-600">Insurance</p>
                          <p className="font-semibold text-gray-900">{testimonial.insuranceCompany}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        {filteredTestimonials.length > 1 && (
          <>
            {/* Arrow Navigation */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dot Navigation */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {filteredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-blue-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// Testimonial Card Component
const TestimonialCard: React.FC<{
  testimonial: Testimonial
  showSuburb?: boolean
}> = ({ testimonial, showSuburb }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all">
      {/* Rating */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < testimonial.rating
                  ? 'text-yellow-500 fill-yellow-500'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        {testimonial.featured && (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-0.5 rounded">
            FEATURED
          </span>
        )}
      </div>

      {/* Text */}
      <p className="text-gray-700 mb-4 line-clamp-4">{testimonial.text}</p>

      {/* Author */}
      <div className="pt-4 border-t border-gray-100">
        <p className="font-semibold text-gray-900 text-sm">{testimonial.author}</p>
        {showSuburb && (
          <p className="text-xs text-gray-600 mt-1">
            {testimonial.suburb} • {testimonial.service}
          </p>
        )}
      </div>
    </div>
  )
}

// Default Testimonials Data
const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    author: 'James & Sarah Mitchell',
    suburb: 'Ascot',
    propertyType: 'Heritage Queenslander',
    date: 'November 2024',
    rating: 5,
    service: 'Flood Damage Restoration',
    text: 'After the devastating floods hit our Ascot home, Disaster Recovery was on-site within 30 minutes. Their team saved irreplaceable family heirlooms and restored our heritage Queenslander to better than original condition.',
    highlight: 'They saved our family home and memories',
    insuranceCompany: 'RACQ',
    responseTime: '30 minutes',
    featured: true
  },
  {
    id: '2',
    author: 'Dr. Michael Chen',
    suburb: 'New Farm',
    propertyType: 'Riverside Apartment',
    date: 'October 2024',
    rating: 5,
    service: 'Water Damage Emergency',
    text: 'Burst pipe in our New Farm apartment at 2am. The team arrived within 45 minutes, stopped further damage, and handled everything with our insurance. Professional, efficient, and genuinely caring service.',
    responseTime: '45 minutes',
    insuranceCompany: 'Allianz',
    featured: false
  },
  {
    id: '3',
    author: 'The Hamilton Golf Club',
    suburb: 'Hamilton',
    propertyType: 'Commercial Facility',
    date: 'September 2024',
    rating: 5,
    service: 'Storm Damage Recovery',
    text: 'When severe storms damaged our club facilities, Disaster Recovery's commercial team minimized our downtime. Back operational in just 5 days. Their insurance liaison saved us thousands.',
    highlight: 'Minimal business interruption',
    insuranceCompany: 'QBE',
    responseTime: '1 hour',
    featured: true
  },
  {
    id: '4',
    author: 'Emma Thompson',
    suburb: 'Toowong',
    propertyType: 'Family Home',
    date: 'August 2024',
    rating: 5,
    service: 'Mould Remediation',
    text: 'Professional mould removal after water damage. The team was thorough, explaining each step. Air quality testing confirmed complete remediation. My children can breathe easy again.',
    insuranceCompany: 'IAG',
    featured: false
  },
  {
    id: '5',
    author: 'Robert & Lisa Anderson',
    suburb: 'Bulimba',
    propertyType: 'Investment Property',
    date: 'July 2024',
    rating: 5,
    service: 'Fire & Smoke Damage',
    text: 'Kitchen fire in our investment property. Disaster Recovery coordinated with tenants, insurance, and contractors. Property fully restored and re-tenanted within 3 weeks. Excellent communication throughout.',
    responseTime: '25 minutes',
    featured: false
  }
]