'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Check, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  isValid: boolean;
  isSubmitting?: boolean;
  nextLabel?: string;
}

export function StepNavigation({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  isValid,
  isSubmitting = false,
  nextLabel,
}: StepNavigationProps) {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-gray-200 dark:border-gray-700 mt-8">
      <Button
        type="button"
        variant="outline"
        onClick={onBack}
        disabled={isFirstStep || isSubmitting}
        className="w-full sm:w-auto flex items-center justify-center gap-2 h-12 rounded-xl border-2 px-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all disabled:opacity-50"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="font-semibold">Back</span>
      </Button>

      <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Step {currentStep + 1} of {totalSteps}
        </span>
      </div>

      <motion.div
        whileHover={{ scale: !isValid || isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: !isValid || isSubmitting ? 1 : 0.98 }}
        className="w-full sm:w-auto"
      >
        <Button
          type="button"
          onClick={onNext}
          disabled={!isValid || isSubmitting}
          className="w-full sm:w-auto h-12 rounded-xl px-8 font-semibold shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              <span>{isLastStep ? 'Submitting...' : 'Saving...'}</span>
            </>
          ) : (
            <>
              <span>{nextLabel || (isLastStep ? 'Submit Application' : 'Continue')}</span>
              {isLastStep ? (
                <Sparkles className="w-5 h-5 ml-2" />
              ) : (
                <ChevronRight className="w-5 h-5 ml-2" />
              )}
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
}
