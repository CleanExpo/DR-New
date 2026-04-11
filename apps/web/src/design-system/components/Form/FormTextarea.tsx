'use client';
// @ts-nocheck
/**
 * DesignOS Form Textarea Component
 *
 * Multi-line text input with character count and validation
 * Context-aware sizing
 */

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAnimation } from '@/lib/hooks/useAnimation';

export interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helpText?: string;
  context?: 'emergency' | 'education';
  showLabel?: boolean;
  showCharCount?: boolean;
  maxLength?: number;
}

const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      className,
      label,
      error,
      helpText,
      context = 'education',
      showLabel = true,
      showCharCount = false,
      maxLength,
      required = false,
      id,
      value,
      ...props
    },
    ref
  ) => {
    const textareaId = id || label.toLowerCase().replace(/\s+/g, '-');
    const helpTextId = `${textareaId}-help`;
    const errorId = `${textareaId}-error`;
    const [isFocused, setIsFocused] = React.useState(false);
    const { isAnimationEnabled } = useAnimation();

    const isEmergency = context === 'emergency';
    const charCount = typeof value === 'string' ? value.length : 0;

    return (
      <div className="space-y-2">
        {/* Label */}
        {showLabel && (
          <div className="flex items-center justify-between">
            <motion.label
              htmlFor={textareaId}
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

            {/* Character count */}
            {showCharCount && maxLength && (
              <span
                className={cn(
                  'text-xs',
                  charCount > maxLength * 0.9 && 'text-amber-600',
                  charCount >= maxLength && 'text-destructive',
                  charCount < maxLength * 0.9 && 'text-muted-foreground'
                )}
              >
                {charCount}/{maxLength}
              </span>
            )}
          </div>
        )}

        {/* Textarea */}
        <motion.textarea
          id={textareaId}
          ref={ref}
          maxLength={maxLength}
          value={value}
          className={cn(
            // Base styles
            'flex w-full rounded-md border bg-background px-3 py-2',
            'text-sm ring-offset-background transition-[border-color,box-shadow] duration-200 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]',
            'placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'resize-y', // Allow vertical resize

            // Emergency context: Larger
            isEmergency && 'text-base px-4 py-3 min-h-[120px]',
            !isEmergency && 'min-h-[100px]',

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
            className={cn('text-muted-foreground', isEmergency ? 'text-sm' : 'text-xs')}
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
              className={cn('text-destructive font-medium', isEmergency ? 'text-sm' : 'text-xs')}
            >
              {error}
            </p>
          </motion.div>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';

export { FormTextarea };
