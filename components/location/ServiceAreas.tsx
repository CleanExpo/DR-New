'use client';

import { MapPin } from 'lucide-react';
import { MotionDiv } from '@/lib/motion/components';
import { staggerContainer, staggerItem } from '@/lib/design-system';

export interface ServiceArea {
  /** Area name (e.g., "Brisbane", "Ipswich") */
  name: string;
  /** Accent color */
  color: string;
  /** Priority suburbs (featured) */
  prioritySuburbs: string;
  /** All covered areas */
  allAreas: string;
}

export interface ServiceAreasProps {
  /** Section title */
  title: string;
  /** Section description */
  description?: string;
  /** Service areas to display */
  areas: ServiceArea[];
}

/**
 * ServiceAreas - Service area map/list component
 *
 * Features:
 * - Multiple service regions
 * - Priority suburbs highlighting
 * - Color-coded areas
 * - Mobile responsive
 *
 * @example
 * ```tsx
 * <ServiceAreas
 *   title="Service Areas - Brisbane, Ipswich, Logan"
 *   description="Professional restoration across all metro areas"
 *   areas={[
 *     {
 *       name: 'Brisbane',
 *       color: '#0ea5e9',
 *       prioritySuburbs: 'Hamilton • Ascot • New Farm • Toowong',
 *       allAreas: 'Brisbane CBD, West End, Fortitude Valley, Milton...'
 *     },
 *     {
 *       name: 'Ipswich',
 *       color: '#9333ea',
 *       prioritySuburbs: 'Karalee • Brookwater • Springfield Lakes',
 *       allAreas: 'Ipswich CBD, Springfield Central, Redbank Plains...'
 *     }
 *   ]}
 * />
 * ```
 */
export function ServiceAreas({
  title,
  description,
  areas,
}: ServiceAreasProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
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

        {/* Service Areas Grid */}
        <MotionDiv
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {areas.map((area, index) => (
            <MotionDiv
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              variants={staggerItem}
            >
              {/* Area Header */}
              <div className="flex items-center gap-3 mb-4">
                <MapPin
                  className="w-8 h-8"
                  style={{ color: area.color }}
                  aria-hidden="true"
                />
                <h3 className="text-2xl font-bold text-gray-900">{area.name}</h3>
              </div>

              {/* Priority Suburbs */}
              <div className="mb-4">
                <p
                  className="font-semibold mb-2"
                  style={{ color: area.color }}
                >
                  High Priority Suburbs:
                </p>
                <p className="text-gray-700 text-sm mb-4">
                  {area.prioritySuburbs}
                </p>

                {/* All Areas */}
                <p className="font-semibold text-gray-900 mb-2">
                  All {area.name} Areas:
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {area.allAreas}
                </p>
              </div>
            </MotionDiv>
          ))}
        </MotionDiv>
      </div>
    </section>
  );
}
