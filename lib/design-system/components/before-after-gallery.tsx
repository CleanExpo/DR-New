'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Maximize2, X, Info, PlayCircle } from 'lucide-react'
import { designTokens } from '../core/tokens'

interface BeforeAfterImage {
  id: string
  before: string
  after: string
  title: string
  location: string
  serviceType: string
  duration: string
  description?: string
  testimonial?: {
    text: string
    author: string
    rating: number
  }
}

interface BeforeAfterGalleryProps {
  images: BeforeAfterImage[]
  variant?: 'slider' | 'grid' | 'comparison'
  showTestimonials?: boolean
  autoPlay?: boolean
  className?: string
}

/**
 * Before/After Gallery Component
 * Showcases transformation results from Brisbane property restorations
 * Optimized for high-impact visual storytelling and trust building
 */
export const BeforeAfterGallery: React.FC<BeforeAfterGalleryProps> = ({
  images,
  variant = 'slider',
  showTestimonials = true,
  autoPlay = false,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedImage, setSelectedImage] = useState<BeforeAfterImage | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const currentImage = selectedImage || images[currentIndex]

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoPlay, images.length])

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !sliderRef.current) return

    const rect = sliderRef.current.getBoundingClientRect()
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX
    const position = ((x - rect.left) / rect.width) * 100
    setSliderPosition(Math.min(100, Math.max(0, position)))
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  // Comparison Slider Variant
  if (variant === 'comparison') {
    return (
      <div className={`relative ${className}`}>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">{currentImage.title}</h3>
                <p className="text-blue-100 mt-1">
                  {currentImage.location} • {currentImage.serviceType}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">Restoration Time</p>
                <p className="text-2xl font-bold">{currentImage.duration}</p>
              </div>
            </div>
          </div>

          {/* Comparison Slider */}
          <div
            ref={sliderRef}
            className="relative aspect-[16/9] cursor-ew-resize select-none"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchMove={handleMouseMove}
          >
            {/* After Image (Background) */}
            <div className="absolute inset-0">
              <Image
                src={currentImage.after}
                alt={`After: ${currentImage.title}`}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-lg font-semibold text-sm">
                AFTER
              </div>
            </div>

            {/* Before Image (Foreground with clip) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <Image
                src={currentImage.before}
                alt={`Before: ${currentImage.title}`}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-lg font-semibold text-sm">
                BEFORE
              </div>
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-xl"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-12 h-12 shadow-lg flex items-center justify-center">
                <ChevronLeft className="w-4 h-4 text-gray-600 absolute -left-0.5" />
                <ChevronRight className="w-4 h-4 text-gray-600 absolute -right-0.5" />
              </div>
            </div>

            {/* Instructions */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm">
              Drag to compare Before & After
            </div>
          </div>

          {/* Details & Testimonial */}
          {(currentImage.description || currentImage.testimonial) && (
            <div className="p-6 bg-gray-50">
              {currentImage.description && (
                <p className="text-gray-700 mb-4">{currentImage.description}</p>
              )}

              {showTestimonials && currentImage.testimonial && (
                <div className="bg-white rounded-lg p-4 border-l-4 border-blue-600">
                  <p className="text-gray-700 italic mb-2">
                    "{currentImage.testimonial.text}"
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    — {currentImage.testimonial.author}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          {images.length > 1 && (
            <div className="flex items-center justify-between p-4 bg-white border-t">
              <button
                onClick={handlePrevious}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? 'bg-blue-600 w-8'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Grid Variant
  if (variant === 'grid') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {images.map((image) => (
          <div
            key={image.id}
            className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden">
              {/* Before Image */}
              <div className="absolute inset-0 transition-opacity duration-500 opacity-100 group-hover:opacity-0">
                <Image
                  src={image.before}
                  alt={`Before: ${image.title}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-0.5 rounded text-xs font-semibold">
                  BEFORE
                </div>
              </div>

              {/* After Image */}
              <div className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                <Image
                  src={image.after}
                  alt={`After: ${image.title}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-0.5 rounded text-xs font-semibold">
                  AFTER
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="text-white">
                  <p className="font-semibold">{image.serviceType}</p>
                  <p className="text-sm opacity-90">{image.duration}</p>
                </div>
              </div>

              {/* View Icon */}
              <button className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 className="w-4 h-4 text-gray-700" />
              </button>
            </div>

            {/* Details */}
            <div className="p-4">
              <h4 className="font-semibold text-gray-900">{image.title}</h4>
              <p className="text-sm text-gray-600">{image.location}</p>
            </div>
          </div>
        ))}

        {/* Fullscreen Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-w-6xl w-full">
              <BeforeAfterGallery
                images={[selectedImage]}
                variant="comparison"
                showTestimonials={showTestimonials}
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  // Slider Variant (default)
  return (
    <div className={`relative ${className}`}>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="relative">
          {/* Images Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Before */}
            <div className="relative aspect-[4/3]">
              <Image
                src={currentImage.before}
                alt={`Before: ${currentImage.title}`}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1.5 rounded-lg font-bold text-sm">
                BEFORE
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-xs opacity-90">Property Condition</p>
                <p className="font-semibold">Damage Assessment</p>
              </div>
            </div>

            {/* After */}
            <div className="relative aspect-[4/3]">
              <Image
                src={currentImage.after}
                alt={`After: ${currentImage.title}`}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1.5 rounded-lg font-bold text-sm">
                AFTER
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-xs opacity-90">Restoration Complete</p>
                <p className="font-semibold">{currentImage.duration}</p>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Info Section */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{currentImage.title}</h3>
              <p className="text-gray-600">
                {currentImage.location} • {currentImage.serviceType}
              </p>
            </div>
            <button
              onClick={() => setIsFullscreen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="View fullscreen"
            >
              <Maximize2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {currentImage.description && (
            <p className="text-gray-700 mb-4">{currentImage.description}</p>
          )}

          {/* Dots Navigation */}
          {images.length > 1 && (
            <div className="flex justify-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-blue-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}