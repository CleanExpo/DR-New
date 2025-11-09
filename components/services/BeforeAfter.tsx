'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MotionDiv } from '@/lib/motion/components';
import { staggerContainer, staggerItem } from '@/lib/design-system';

export interface BeforeAfterImage {
  /** Before image path */
  before: string;
  /** After image path */
  after: string;
  /** Alt text for before image */
  beforeAlt: string;
  /** After text for after image */
  afterAlt: string;
  /** Caption/description */
  caption: string;
  /** Project details (optional) */
  details?: string[];
}

export interface BeforeAfterProps {
  /** Section title */
  title: string;
  /** Section description */
  description?: string;
  /** Image pairs to display */
  images: BeforeAfterImage[];
  /** Layout columns */
  columns?: 2 | 3;
}

/**
 * BeforeAfter - Before/after image gallery component
 *
 * Features:
 * - Optimized next/image
 * - Hover state to toggle before/after
 * - Lazy-loaded animations
 * - Mobile responsive grid
 *
 * @example
 * ```tsx
 * <BeforeAfter
 *   title="Recent Restoration Projects"
 *   description="See the quality of our work"
 *   images={[
 *     {
 *       before: '/images/before-water-damage.webp',
 *       after: '/images/after-water-damage.webp',
 *       beforeAlt: 'Flooded basement before restoration',
 *       afterAlt: 'Restored basement after professional drying',
 *       caption: 'Hamilton Basement Flood Recovery',
 *       details: ['3 days structural drying', 'Full antimicrobial treatment']
 *     }
 *   ]}
 * />
 * ```
 */
export function BeforeAfter({
  title,
  description,
  images,
  columns = 2,
}: BeforeAfterProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <MotionDiv
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </MotionDiv>

        {/* Gallery Grid */}
        <MotionDiv
          className={`grid gap-8 ${gridCols[columns]}`}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {images.map((image, index) => (
            <BeforeAfterCard key={index} {...image} />
          ))}
        </MotionDiv>
      </div>
    </section>
  );
}

function BeforeAfterCard({
  before,
  after,
  beforeAlt,
  afterAlt,
  caption,
  details,
}: BeforeAfterImage) {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <MotionDiv
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      variants={staggerItem}
    >
      {/* Image Container */}
      <div
        className="relative h-64 cursor-pointer overflow-hidden"
        onMouseEnter={() => setShowAfter(true)}
        onMouseLeave={() => setShowAfter(false)}
        onClick={() => setShowAfter(!showAfter)}
      >
        {/* Before Image */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            showAfter ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <Image
            src={before}
            alt={beforeAlt}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-4 left-4 px-3 py-1 bg-red-600 text-white text-sm font-bold rounded-full">
            BEFORE
          </div>
        </div>

        {/* After Image */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            showAfter ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={after}
            alt={afterAlt}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-4 left-4 px-3 py-1 bg-green-600 text-white text-sm font-bold rounded-full">
            AFTER
          </div>
        </div>

        {/* Hover Instruction */}
        <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 text-white text-xs rounded-full">
          Hover to compare
        </div>
      </div>

      {/* Caption & Details */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{caption}</h3>
        {details && details.length > 0 && (
          <ul className="space-y-2">
            {details.map((detail, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-gray-600"
              >
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </MotionDiv>
  );
}
