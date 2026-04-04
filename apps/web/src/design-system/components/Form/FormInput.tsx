// @ts-nocheck
/**
 * DesignOS Form Input Component
 *
 * Smart Hybrid Validation (Strategic Decision):
 * - Format errors (phone, postcode, email): Instant on blur
 * - Required field errors: Only on form submit
 *
 * Rationale: Don't overwhelm stressed users with red errors while typing,
 * but do catch format mistakes immediately so they can fix them.
 */

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAnimation } from '@/lib/hooks/useAnimation';
import { errorMessageVariants } from '@/lib/animations';

export type ValidationType = 'instant' | 'on-blur' | 'on-submit';
export type InputType = 'text' | 'email' | 'tel' | 'number' | 'date' | 'password';

export interface FormInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  error?: string;
  helpText?: string;
  validationType?: ValidationType;
  context?: 'emergency' | 'education';
  showLabel?: boolean;
  required?: boolean;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      helpText,
      validationType = 'on-blur',
      context = 'education',
      showLabel = true,
      required = false,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
    const helpTextId = `${inputId}-help`;
    const errorId = `${inputId}-error`;
    const [isFocused, setIsFocused] = React.useState(false);
    const { isAnimationEnabled } = useAnimation();

    // Crisis context: Larger input, easier to tap
    const isEmergency = context === 'emergency';

    return (
      <div className="space-y-2">
        {/* Label */}
        {showLabel && (
          <motion.label
            htmlFor={inputId}
            className={cn(
              'block font-medium transition-colors',
              isEmergency ? 'text-base' : 'text-sm',
              isFocused
                ? 'text-blue-600 dark:text-blue-400'
                : error
                  ? 'text-destructive'
                  : 'text-foreground'
            )}
            animate={
              isAnimationEnabled && isFocused
                ? { y: 0, opacity: 1 }
                : { y: 0, opacity: 1 }
            }
            transition={{ duration: 0.2 }}
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </motion.label>
        )}

        {/* Input */}
        <motion.input
          type={type}
          id={inputId}
          ref={ref}
          className={cn(
            // Base styles
            'flex w-full rounded-md border bg-background px-3 py-2',
            'text-sm ring-offset-background transition-[border-color,box-shadow] duration-200 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]',
            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
            'placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',

            // iOS-safe input styling: Prevent auto-zoom and default styling
            '-webkit-appearance-none appearance-none',
            'text-base sm:text-sm', // 16px base (prevents iOS zoom), 14px on larger screens
            'sm:py-2 py-3', // More padding on mobile for fat-finger friendliness

            // Mobile touch target: Minimum 44px height (iOS guidelines)
            'sm:h-10 h-12', // 48px on mobile (includes padding), 40px on desktop

            // Emergency context: Even larger for easier tapping
            isEmergency && 'sm:h-14 h-14 text-base px-4',
            !isEmergency && 'sm:px-3 px-3',

            // Error state
            error && 'border-destructive focus-visible:ring-destructive',
            !error && isFocused && 'border-blue-500 shadow-sm shadow-blue-500/20',
            !error && !isFocused && 'border-input',

            className
          )}
          aria-required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={cn(helpText && helpTextId, error && errorId)}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          animate={isAnimationEnabled && isFocused ? { boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)' } : {}}
          transition={{ duration: 0.2 }}
          {...props}
        />

        {/* Help Text */}
        {helpText && !error && (
          <p
            id={helpTextId}
            className={cn(
              'text-muted-foreground',
              isEmergency ? 'text-sm' : 'text-xs'
            )}
          >
            {helpText}
          </p>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            id={errorId}
            role="alert"
            aria-live="assertive"
            initial={isAnimationEnabled ? { opacity: 0, height: 0 } : { opacity: 1 }}
            animate={isAnimationEnabled ? { opacity: 1, height: 'auto' } : { opacity: 1 }}
            exit={isAnimationEnabled ? { opacity: 0, height: 0 } : { opacity: 1 }}
            transition={isAnimationEnabled ? { duration: 0.2 } : { duration: 0 }}
          >
            <p
              className={cn(
                'text-destructive font-medium',
                isEmergency ? 'text-sm' : 'text-xs'
              )}
            >
              {error}
            </p>
          </motion.div>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export { FormInput };
