'use client';

import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { MotionDiv } from '@/lib/motion/components';
import { staggerContainer, staggerItem, fadeInUp } from '@/lib/design-system';

export interface ServiceFeature {
  /** Feature icon */
  icon: LucideIcon;
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
  /** Accent color */
  color?: 'blue' | 'red' | 'green' | 'yellow';
}

export interface ServiceFeaturesProps {
  /** Section title */
  title: string;
  /** Section description */
  description?: string;
  /** Features to display */
  features: ServiceFeature[];
  /** Layout style */
  layout?: 'grid' | 'list';
  /** Number of columns for grid layout */
  columns?: 2 | 3 | 4;
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-600',
    border: 'border-blue-600',
  },
  red: {
    bg: 'bg-red-100',
    text: 'text-red-600',
    border: 'border-red-600',
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-600',
    border: 'border-green-600',
  },
  yellow: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-600',
    border: 'border-yellow-600',
  },
};

/**
 * ServiceFeatures - Reusable features grid/list component
 *
 * Features:
 * - Flexible grid or list layout
 * - Lazy-loaded motion animations
 * - Customizable colors
 * - Mobile responsive
 *
 * @example
 * ```tsx
 * <ServiceFeatures
 *   title="Why Choose Our Service"
 *   description="Professional disaster recovery with certified expertise"
 *   features={[
 *     {
 *       icon: Clock,
 *       title: '24/7 Response',
 *       description: 'Emergency service available around the clock',
 *       color: 'red'
 *     },
 *     // ... more features
 *   ]}
 *   columns={3}
 * />
 * ```
 */
export function ServiceFeatures({
  title,
  description,
  features,
  layout = 'grid',
  columns = 3,
}: ServiceFeaturesProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
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

        {/* Features Grid/List */}
        <MotionDiv
          className={`grid gap-6 ${layout === 'grid' ? gridCols[columns] : 'max-w-4xl mx-auto'}`}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colors = colorClasses[feature.color || 'blue'];

            return (
              <MotionDiv
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                variants={staggerItem}
              >
                <div
                  className={`w-14 h-14 rounded-full ${colors.bg} flex items-center justify-center mb-4`}
                >
                  <Icon className={`w-7 h-7 ${colors.text}`} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </MotionDiv>
            );
          })}
        </MotionDiv>
      </div>
    </section>
  );
}
