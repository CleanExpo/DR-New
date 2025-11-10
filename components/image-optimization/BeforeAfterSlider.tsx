'use client';

/**
 * Before/After Image Slider Component
 * Interactive slider for showcasing restoration work
 * Optimized for Core Web Vitals and accessibility
 */

import React, { useState, useRef, useEffect } from 'react';
import { OptimizedImage } from './OptimizedImage';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface BeforeAfterSliderProps {
  beforeImage: {
    src: string;
    alt: string;
  };
  afterImage: {
    src: string;
    alt: string;
  };
  title?: string;
  description?: string;
  width?: number;
  height?: number;
  initialPosition?: number; // 0-100
  className?: string;
  showLabels?: boolean;
  showHandle?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  title,
  description,
  width = 800,
  height = 600,
  initialPosition = 50,
  className = '',
  showLabels = true,
  showHandle = true,
  orientation = 'horizontal',
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle mouse/touch move
  const handleMove = (clientX: number, clientY: number) => {
    if (!containerRef.current) {return;}

    const rect = containerRef.current.getBoundingClientRect();
    let newPosition: number;

    if (orientation === 'horizontal') {
      const x = clientX - rect.left;
      newPosition = (x / rect.width) * 100;
    } else {
      const y = clientY - rect.top;
      newPosition = (y / rect.height) * 100;
    }

    // Clamp between 0 and 100
    newPosition = Math.max(0, Math.min(100, newPosition));
    setSliderPosition(newPosition);
  };

  // Mouse events
  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) {return;}
    handleMove(e.clientX, e.clientY);
  };

  // Touch events
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) {return;}
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const step = 5;
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault();
        setSliderPosition((prev) => Math.max(0, prev - step));
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault();
        setSliderPosition((prev) => Math.min(100, prev + step));
        break;
      case 'Home':
        e.preventDefault();
        setSliderPosition(0);
        break;
      case 'End':
        e.preventDefault();
        setSliderPosition(100);
        break;
    }
  };

  // Add/remove global mouse up listener
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener('mouseup', handleGlobalMouseUp);
      window.addEventListener('touchend', handleGlobalMouseUp);
    }
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [isDragging]);

  return (
    <div className={`before-after-slider ${className}`}>
      {/* Title and description */}
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          )}
          {description && (
            <p className="text-gray-600">{description}</p>
          )}
        </div>
      )}

      {/* Slider container */}
      <div
        ref={containerRef}
        className={`
          relative overflow-hidden rounded-lg
          select-none touch-none cursor-ew-resize
          ${orientation === 'vertical' ? 'cursor-ns-resize' : 'cursor-ew-resize'}
        `}
        style={{ aspectRatio: `${width}/${height}` }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        onKeyDown={handleKeyDown}
        role="slider"
        aria-label="Before and after comparison slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuetext={`${Math.round(sliderPosition)}% after image visible`}
        tabIndex={0}
      >
        {/* After image (background) */}
        <div className="absolute inset-0">
          <OptimizedImage
            src={afterImage.src}
            alt={afterImage.alt}
            fill
            objectFit="cover"
            priority
            quality={85}
          />
          {showLabels && (
            <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-md font-semibold text-sm shadow-lg">
              After
            </div>
          )}
        </div>

        {/* Before image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={
            orientation === 'horizontal'
              ? { width: `${sliderPosition}%` }
              : { height: `${sliderPosition}%` }
          }
        >
          <OptimizedImage
            src={beforeImage.src}
            alt={beforeImage.alt}
            fill
            objectFit="cover"
            priority
            quality={85}
          />
          {showLabels && (
            <div className="absolute top-4 left-4 bg-red-700 text-white px-3 py-1 rounded-md font-semibold text-sm shadow-lg">
              Before
            </div>
          )}
        </div>

        {/* Slider handle */}
        {showHandle && (
          <div
            className={`
              absolute z-10
              ${orientation === 'horizontal'
                ? 'top-0 bottom-0 w-1 -ml-0.5'
                : 'left-0 right-0 h-1 -mt-0.5'
              }
              bg-white shadow-lg
            `}
            style={
              orientation === 'horizontal'
                ? { left: `${sliderPosition}%` }
                : { top: `${sliderPosition}%` }
            }
          >
            {/* Handle button */}
            <div
              className={`
                absolute bg-white rounded-full shadow-xl
                flex items-center justify-center
                border-2 border-gray-300
                w-10 h-10
                ${orientation === 'horizontal'
                  ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                  : 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                }
                transition-transform hover:scale-110
              `}
            >
              {orientation === 'horizontal' ? (
                <>
                  <ChevronLeft className="w-4 h-4 text-gray-600 -mr-1" />
                  <ChevronRight className="w-4 h-4 text-gray-600 -ml-1" />
                </>
              ) : (
                <>
                  <ChevronLeft className="w-4 h-4 text-gray-600 -mr-1 rotate-90" />
                  <ChevronRight className="w-4 h-4 text-gray-600 -ml-1 rotate-90" />
                </>
              )}
            </div>
          </div>
        )}

        {/* Instructions overlay (appears on first hover/focus) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-black/50 text-white px-6 py-3 rounded-lg text-sm">
            {orientation === 'horizontal'
              ? 'Drag or use arrow keys to compare'
              : 'Drag vertically or use arrow keys to compare'
            }
          </div>
        </div>
      </div>

      {/* Keyboard instructions for accessibility */}
      <div className="sr-only">
        Use left and right arrow keys to move the slider.
        Press Home to show only the before image.
        Press End to show only the after image.
      </div>

      {/* Structured data for image comparison */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ImageGallery',
            name: title || 'Before and After Restoration',
            description: description || 'Professional disaster restoration work comparison',
            image: [
              {
                '@type': 'ImageObject',
                name: beforeImage.alt,
                contentUrl: beforeImage.src,
                caption: 'Before restoration',
              },
              {
                '@type': 'ImageObject',
                name: afterImage.alt,
                contentUrl: afterImage.src,
                caption: 'After restoration',
              },
            ],
          }),
        }}
      />
    </div>
  );
}

/**
 * Gallery of Before/After Sliders
 */
export interface BeforeAfterGalleryProps {
  comparisons: Array<{
    id: string;
    title: string;
    description?: string;
    before: { src: string; alt: string };
    after: { src: string; alt: string };
  }>;
  columns?: 1 | 2 | 3;
  className?: string;
}

export function BeforeAfterGallery({
  comparisons,
  columns = 2,
  className = '',
}: BeforeAfterGalleryProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  }[columns];

  return (
    <div className={`before-after-gallery ${className}`}>
      <div className={`grid ${gridCols} gap-8`}>
        {comparisons.map((comparison, index) => (
          <BeforeAfterSlider
            key={comparison.id}
            title={comparison.title}
            description={comparison.description}
            beforeImage={comparison.before}
            afterImage={comparison.after}
            initialPosition={50}
            showLabels={true}
            showHandle={true}
          />
        ))}
      </div>

      {/* Gallery structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ImageGallery',
            name: 'Disaster Recovery Before and After Gallery',
            description: 'Professional restoration work examples from Brisbane, Ipswich, and Logan',
            numberOfItems: comparisons.length,
            about: {
              '@type': 'Service',
              name: 'Disaster Recovery and Restoration Services',
              provider: {
                '@type': 'LocalBusiness',
                name: 'Disaster Recovery Brisbane',
              },
            },
          }),
        }}
      />
    </div>
  );
}

export default BeforeAfterSlider;
