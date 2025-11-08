'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';

/**
 * Enhanced Form Input with Real-time Validation and Visual Feedback
 * Meets WCAG AAA standards with clear error states and screen reader support
 */

export interface ValidationRule {
  test: (value: string) => boolean;
  message: string;
}

export interface EnhancedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  validationRules?: ValidationRule[];
  showValidation?: boolean;
  onValidationChange?: (isValid: boolean) => void;
}

export function EnhancedInput({
  label,
  helperText,
  validationRules = [],
  showValidation = true,
  onValidationChange,
  className = '',
  ...props
}: EnhancedInputProps) {
  const [value, setValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);

  // Validate on value change
  useEffect(() => {
    if (!isTouched || validationRules.length === 0) return;

    setIsValidating(true);
    const validationErrors: string[] = [];

    validationRules.forEach((rule) => {
      if (!rule.test(value)) {
        validationErrors.push(rule.message);
      }
    });

    // Simulate async validation delay for smooth UX
    const timer = setTimeout(() => {
      setErrors(validationErrors);
      const valid = validationErrors.length === 0 && value.length > 0;
      setIsValid(valid);
      onValidationChange?.(valid);
      setIsValidating(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [value, isTouched, validationRules, onValidationChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsTouched(true);
    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  const getValidationState = () => {
    if (!isTouched || !showValidation) return null;
    if (isValidating) return 'validating';
    if (errors.length > 0) return 'error';
    if (isValid) return 'success';
    return null;
  };

  const validationState = getValidationState();
  const inputId = props.id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  return (
    <div className="w-full">
      {/* Label */}
      <label
        htmlFor={inputId}
        className="block text-sm font-semibold text-gray-900 mb-2"
      >
        {label}
        {props.required && (
          <span className="text-red-600 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>

      {/* Input Container */}
      <div className="relative">
        <input
          {...props}
          id={inputId}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={validationState === 'error'}
          aria-describedby={`${errors.length > 0 ? errorId : ''} ${helperText ? helperId : ''}`.trim()}
          className={`
            w-full px-4 py-3 rounded-lg border-2
            transition-all duration-300 ease-in-out
            min-h-[48px]
            ${validationState === 'error' ? 'border-red-500 bg-red-50' : ''}
            ${validationState === 'success' ? 'border-green-500 bg-green-50' : ''}
            ${validationState === null ? 'border-gray-300 bg-white' : ''}
            ${validationState === 'validating' ? 'border-blue-500' : ''}
            focus:outline-none focus:ring-4
            ${validationState === 'error' ? 'focus:ring-red-200' : ''}
            ${validationState === 'success' ? 'focus:ring-green-200' : ''}
            ${validationState === null || validationState === 'validating' ? 'focus:ring-blue-200' : ''}
            ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${className}
          `.trim()}
        />

        {/* Validation Icon */}
        {showValidation && isTouched && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {isValidating && (
              <Loader2
                className="w-5 h-5 text-blue-500 animate-spin"
                aria-label="Validating"
              />
            )}
            {validationState === 'success' && (
              <CheckCircle
                className="w-5 h-5 text-green-600 animate-scale-in"
                aria-label="Valid input"
              />
            )}
            {validationState === 'error' && (
              <XCircle
                className="w-5 h-5 text-red-600 animate-shake"
                aria-label="Invalid input"
              />
            )}
          </div>
        )}
      </div>

      {/* Helper Text */}
      {helperText && !errors.length && (
        <p
          id={helperId}
          className="mt-2 text-sm text-gray-600 flex items-start gap-1"
        >
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          {helperText}
        </p>
      )}

      {/* Error Messages */}
      {errors.length > 0 && isTouched && (
        <div
          id={errorId}
          role="alert"
          aria-live="polite"
          className="mt-2 space-y-1 animate-slide-down"
        >
          {errors.map((error, index) => (
            <p
              key={index}
              className="text-sm text-red-700 font-medium flex items-start gap-1 bg-red-50 p-2 rounded"
            >
              <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              {error}
            </p>
          ))}
        </div>
      )}

      {/* Success Message */}
      {isValid && isTouched && errors.length === 0 && (
        <p className="mt-2 text-sm text-green-700 font-medium flex items-center gap-1 animate-slide-down">
          <CheckCircle className="w-4 h-4" />
          Looks good!
        </p>
      )}
    </div>
  );
}

/**
 * Enhanced Textarea with validation
 */
export interface EnhancedTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  helperText?: string;
  validationRules?: ValidationRule[];
  showValidation?: boolean;
  onValidationChange?: (isValid: boolean) => void;
  showCharacterCount?: boolean;
  maxCharacters?: number;
}

export function EnhancedTextarea({
  label,
  helperText,
  validationRules = [],
  showValidation = true,
  onValidationChange,
  showCharacterCount = false,
  maxCharacters,
  className = '',
  ...props
}: EnhancedTextareaProps) {
  const [value, setValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!isTouched || validationRules.length === 0) return;

    const validationErrors: string[] = [];
    validationRules.forEach((rule) => {
      if (!rule.test(value)) {
        validationErrors.push(rule.message);
      }
    });

    setErrors(validationErrors);
    const valid = validationErrors.length === 0 && value.length > 0;
    setIsValid(valid);
    onValidationChange?.(valid);
  }, [value, isTouched, validationRules, onValidationChange]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (maxCharacters && newValue.length > maxCharacters) return;

    setValue(newValue);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsTouched(true);
    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  const validationState = !isTouched || !showValidation ? null : errors.length > 0 ? 'error' : isValid ? 'success' : null;
  const inputId = props.id || `textarea-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;
  const countId = `${inputId}-count`;

  return (
    <div className="w-full">
      <label
        htmlFor={inputId}
        className="block text-sm font-semibold text-gray-900 mb-2"
      >
        {label}
        {props.required && (
          <span className="text-red-600 ml-1" aria-label="required">
            *
          </span>
        )}
      </label>

      <textarea
        {...props}
        id={inputId}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-invalid={validationState === 'error'}
        aria-describedby={`${errors.length > 0 ? errorId : ''} ${helperText ? helperId : ''} ${showCharacterCount ? countId : ''}`.trim()}
        className={`
          w-full px-4 py-3 rounded-lg border-2
          transition-all duration-300 ease-in-out
          min-h-[120px]
          resize-y
          ${validationState === 'error' ? 'border-red-500 bg-red-50' : ''}
          ${validationState === 'success' ? 'border-green-500 bg-green-50' : ''}
          ${validationState === null ? 'border-gray-300 bg-white' : ''}
          focus:outline-none focus:ring-4
          ${validationState === 'error' ? 'focus:ring-red-200' : ''}
          ${validationState === 'success' ? 'focus:ring-green-200' : ''}
          ${validationState === null ? 'focus:ring-blue-200' : ''}
          ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${className}
        `.trim()}
      />

      {/* Character Count */}
      {showCharacterCount && (
        <p
          id={countId}
          className={`mt-1 text-sm text-right ${
            maxCharacters && value.length > maxCharacters * 0.9 ? 'text-orange-600 font-semibold' : 'text-gray-500'
          }`}
          aria-live="polite"
        >
          {value.length}
          {maxCharacters && ` / ${maxCharacters}`} characters
        </p>
      )}

      {/* Helper Text */}
      {helperText && !errors.length && (
        <p id={helperId} className="mt-2 text-sm text-gray-600">
          {helperText}
        </p>
      )}

      {/* Error Messages */}
      {errors.length > 0 && isTouched && (
        <div
          id={errorId}
          role="alert"
          aria-live="polite"
          className="mt-2 space-y-1"
        >
          {errors.map((error, index) => (
            <p key={index} className="text-sm text-red-700 font-medium flex items-start gap-1">
              <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              {error}
            </p>
          ))}
        </div>
      )}

      {/* Success Message */}
      {isValid && isTouched && errors.length === 0 && (
        <p className="mt-2 text-sm text-green-700 font-medium flex items-center gap-1">
          <CheckCircle className="w-4 h-4" />
          Looks good!
        </p>
      )}
    </div>
  );
}

/**
 * Common validation rules
 */
export const commonValidations = {
  required: (message = 'This field is required'): ValidationRule => ({
    test: (value) => value.trim().length > 0,
    message,
  }),

  email: (message = 'Please enter a valid email address'): ValidationRule => ({
    test: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message,
  }),

  phone: (message = 'Please enter a valid phone number'): ValidationRule => ({
    test: (value) => /^(\+61|0)[2-478]( ?\d){8}$/.test(value.replace(/\s/g, '')),
    message,
  }),

  minLength: (min: number, message?: string): ValidationRule => ({
    test: (value) => value.length >= min,
    message: message || `Must be at least ${min} characters`,
  }),

  maxLength: (max: number, message?: string): ValidationRule => ({
    test: (value) => value.length <= max,
    message: message || `Must be no more than ${max} characters`,
  }),

  pattern: (regex: RegExp, message: string): ValidationRule => ({
    test: (value) => regex.test(value),
    message,
  }),
};

// Add custom animations to globals.css
const animationStyles = `
@keyframes scale-in {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-scale-in {
  animation: scale-in 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.animate-shake {
  animation: shake 0.3s ease-in-out;
}

.animate-slide-down {
  animation: slide-down 0.3s ease-out;
}
`;
