'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export function ProgressBar({ currentStep, totalSteps, steps }: ProgressBarProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full py-8">
      {/* Progress percentage */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {Math.round(progress)}% Complete
        </span>
      </div>

      {/* Animated Progress bar */}
      <div className="relative h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mb-8">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          style={{ width: '50%' }}
        />
      </div>

      {/* Step indicators */}
      <div className="relative">
        {/* Connecting line background */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700" />

        <div className="flex justify-between items-center relative z-10">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isPending = index > currentStep;

            return (
              <div key={index} className="flex flex-col items-center relative">
                {/* Step circle */}
                <motion.div
                  className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300 relative',
                    isCompleted &&
                      'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/50',
                    isCurrent &&
                      'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl ring-4 ring-blue-100 dark:ring-blue-900/50',
                    isPending && 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600'
                  )}
                  whileHover={{ scale: 1.1 }}
                  animate={
                    isCurrent
                      ? {
                          scale: [1, 1.05, 1],
                          boxShadow: [
                            '0 10px 20px rgba(59, 130, 246, 0.3)',
                            '0 15px 30px rgba(139, 92, 246, 0.4)',
                            '0 10px 20px rgba(59, 130, 246, 0.3)',
                          ],
                        }
                      : {}
                  }
                  transition={isCurrent ? { duration: 2, repeat: Infinity } : {}}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <span className="text-sm">{index + 1}</span>
                  )}
                </motion.div>

                {/* Step label */}
                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    'mt-2 text-xs font-medium text-center max-w-[80px] transition-colors',
                    (isCompleted || isCurrent)
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-400 dark:text-gray-600'
                  )}
                >
                  {step}
                </motion.span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
