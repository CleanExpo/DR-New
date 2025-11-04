'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export function ProgressBar({ currentStep, totalSteps, steps }: ProgressBarProps) {
  return (
    <div className="w-full py-8">
      {/* Progress percentage */}
      <div className="mb-2 text-sm font-medium text-gray-600 text-center">
        Step {currentStep + 1} of {totalSteps}
      </div>

      {/* Progress bar */}
      <div className="relative mb-8">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step indicators */}
      <div className="relative">
        <div className="flex justify-between items-start">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isPending = index > currentStep;

            return (
              <div key={index} className="flex flex-col items-center flex-1">
                {/* Circle */}
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300',
                    {
                      'bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-500 text-white':
                        isCompleted,
                      'bg-white border-blue-500 text-blue-500 ring-4 ring-blue-100':
                        isCurrent,
                      'bg-white border-gray-300 text-gray-400': isPending,
                    }
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </div>

                {/* Label */}
                <div
                  className={cn(
                    'mt-2 text-xs text-center font-medium transition-colors duration-300 max-w-[100px]',
                    {
                      'text-blue-600': isCompleted || isCurrent,
                      'text-gray-400': isPending,
                    }
                  )}
                >
                  {step}
                </div>

                {/* Connecting line (except for last step) */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'absolute top-5 h-0.5 transition-all duration-300',
                      {
                        'bg-blue-500': index < currentStep,
                        'bg-gray-300': index >= currentStep,
                      }
                    )}
                    style={{
                      left: `${((index + 0.5) / steps.length) * 100}%`,
                      width: `${(1 / steps.length) * 100}%`,
                      transform: 'translateY(-50%)',
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
