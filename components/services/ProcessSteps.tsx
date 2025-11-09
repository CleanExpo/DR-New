'use client';

import { LucideIcon } from 'lucide-react';
import { MotionDiv } from '@/lib/motion/components';
import { staggerContainer, staggerItem } from '@/lib/design-system';

export interface ProcessStep {
  /** Step number */
  step: number;
  /** Step title */
  title: string;
  /** Step description */
  description: string;
  /** Step icon */
  icon: LucideIcon;
  /** Additional details (optional) */
  details?: string[];
}

export interface ProcessStepsProps {
  /** Section title */
  title: string;
  /** Section description */
  description?: string;
  /** Process steps */
  steps: ProcessStep[];
  /** Layout orientation */
  orientation?: 'vertical' | 'horizontal';
}

/**
 * ProcessSteps - Step-by-step process visualization
 *
 * Features:
 * - Numbered steps with icons
 * - Vertical or horizontal layout
 * - Lazy-loaded animations
 * - Mobile responsive
 *
 * @example
 * ```tsx
 * <ProcessSteps
 *   title="Our Restoration Process"
 *   description="IICRC certified 6-step water damage restoration"
 *   steps={[
 *     {
 *       step: 1,
 *       title: 'Emergency Contact',
 *       description: '24/7 hotline connects you with specialists',
 *       icon: Phone,
 *       details: ['Average response: 47 minutes', 'Dispatch within minutes']
 *     },
 *     // ... more steps
 *   ]}
 * />
 * ```
 */
export function ProcessSteps({
  title,
  description,
  steps,
  orientation = 'vertical',
}: ProcessStepsProps) {
  return (
    <section className="py-20 bg-white">
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

        {/* Process Steps */}
        <div className="max-w-5xl mx-auto">
          <MotionDiv
            className="space-y-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {steps.map((processStep, index) => {
              const Icon = processStep.icon;
              const isLast = index === steps.length - 1;

              return (
                <MotionDiv
                  key={index}
                  className="flex gap-6"
                  variants={staggerItem}
                >
                  {/* Step Number Circle */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                      <span className="text-2xl font-bold text-white">
                        {processStep.step}
                      </span>
                    </div>
                    {!isLast && orientation === 'vertical' && (
                      <div className="w-1 h-full bg-gradient-to-b from-blue-500 to-blue-300 mx-auto mt-4" />
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 pb-8">
                    <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-blue-600" aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {processStep.title}
                          </h3>
                          <p className="text-gray-700 leading-relaxed">
                            {processStep.description}
                          </p>
                        </div>
                      </div>

                      {/* Additional Details */}
                      {processStep.details && processStep.details.length > 0 && (
                        <ul className="mt-4 space-y-2">
                          {processStep.details.map((detail, detailIndex) => (
                            <li
                              key={detailIndex}
                              className="flex items-start gap-2 text-sm text-gray-600"
                            >
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </MotionDiv>
              );
            })}
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
