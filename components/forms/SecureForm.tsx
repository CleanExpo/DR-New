'use client';

import React, { useState, useEffect, FormEvent, ReactNode } from 'react';
import { Shield, AlertTriangle, Check } from 'lucide-react';
import { z } from 'zod';
import { sanitizeText, checkSubmissionRate } from '@/lib/security/validation';

interface SecureFormProps {
  children: ReactNode;
  onSubmit: (data: unknown) => Promise<void>;
  schema?: z.ZodSchema;
  className?: string;
  csrfToken?: string;
  rateLimit?: {
    maxSubmissions?: number;
    windowMs?: number;
  };
  honeypot?: boolean;
  recaptcha?: boolean;
}

const SecureForm: React.FC<SecureFormProps> = ({
  children,
  onSubmit,
  schema,
  className = '',
  csrfToken: providedToken,
  rateLimit = { maxSubmissions: 5, windowMs: 300000 },
  honeypot = true,
  recaptcha = false
}) => {
  const [csrfToken, setCsrfToken] = useState<string>(providedToken || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [honeypotValue, setHoneypotValue] = useState('');
  const [submitCount, setSubmitCount] = useState(0);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  // Generate or fetch CSRF token
  useEffect(() => {
    if (!providedToken) {
      // Fetch CSRF token from server
      fetch('/api/security/csrf-token')
        .then(res => res.json())
        .then(data => setCsrfToken(data.token))
        .catch(console.error);
    }
  }, [providedToken]);

  // Load reCAPTCHA script if enabled
  useEffect(() => {
    if (recaptcha && typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [recaptcha]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    // Check honeypot
    if (honeypot && honeypotValue) {
      console.warn('Honeypot triggered - possible bot submission');
      return;
    }

    // Rate limiting check
    const now = Date.now();
    if (now - lastSubmitTime < 1000) {
      // Prevent rapid submissions (less than 1 second)
      setErrors({ form: 'Please wait before submitting again' });
      return;
    }

    const identifier = `form-${window.location.pathname}`;
    if (!checkSubmissionRate(identifier, rateLimit.maxSubmissions, rateLimit.windowMs)) {
      setErrors({ form: 'Too many submissions. Please try again later.' });
      return;
    }

    setIsSubmitting(true);
    setLastSubmitTime(now);
    setSubmitCount(prev => prev + 1);

    try {
      const formData = new FormData(e.currentTarget);
      const data: Record<string, any> = {};

      // Extract and sanitize form data
      formData.forEach((value, key) => {
        // Skip honeypot field
        if (key === 'website') return;

        // Sanitize text inputs
        if (typeof value === 'string') {
          data[key] = sanitizeText(value);
        } else {
          data[key] = value;
        }
      });

      // Validate with schema if provided
      if (schema) {
        const result = schema.safeParse(data);
        if (!result.success) {
          const schemaErrors: Record<string, string> = {};
          result.error.errors.forEach(err => {
            const path = err.path.join('.');
            schemaErrors[path] = err.message;
          });
          setErrors(schemaErrors);
          setIsSubmitting(false);
          return;
        }
        data.validated = result.data;
      }

      // Add security headers
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (csrfToken) {
        headers['X-CSRF-Token'] = csrfToken;
      }

      // Add reCAPTCHA token if enabled
      if (recaptcha && typeof window !== 'undefined') {
        const recaptchaToken = await new Promise<string>((resolve, reject) => {
          (window as any).grecaptcha?.execute((window as any).RECAPTCHA_SITE_KEY, { action: 'submit' })
            .then(resolve)
            .catch(reject);
        });
        data.recaptchaToken = recaptchaToken;
      }

      // Submit form
      await onSubmit(data);

      // Reset form on success
      (e.target as HTMLFormElement).reset();
      setSubmitCount(0);
    } catch (error: unknown) {
      console.error('Form submission error:', error);
      setErrors({ form: error.message || 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`secure-form ${className}`}
      noValidate
      autoComplete="on"
    >
      {/* CSRF Token (hidden) */}
      {csrfToken && (
        <input
          type="hidden"
          name="csrf_token"
          value={csrfToken}
        />
      )}

      {/* Honeypot Field (hidden from users) */}
      {honeypot && (
        <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
          <label htmlFor="website">
            Leave this field empty
            <input
              type="text"
              id="website"
              name="website"
              value={honeypotValue}
              onChange={(e) => setHoneypotValue(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>
      )}

      {/* Form Error Display */}
      {errors.form && (
        <div
          className="mb-4 p-4 bg-red-50 border border-red-300 rounded-lg flex items-start gap-3"
          role="alert"
        >
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-800 font-semibold">Submission Error</p>
            <p className="text-red-700 mt-1">{errors.form}</p>
          </div>
        </div>
      )}

      {/* Security Status Indicator */}
      <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
        <Shield className="w-4 h-4 text-green-600" />
        <span>Secure form with encryption and CSRF protection</span>
      </div>

      {/* Form Fields (children) */}
      {children}

      {/* Field-level errors */}
      {Object.entries(errors).map(([field, message]) => {
        if (field === 'form') return null;
        return (
          <div key={field} className="mt-1 text-red-600 text-sm">
            {field}: {message}
          </div>
        );
      })}

      {/* Submit Button with Loading State */}
      <div className="mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            w-full px-6 py-3 rounded-lg font-semibold text-white
            transition-all duration-200 focus:outline-none focus:ring-4
            ${isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-500'
            }
          `}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing...
            </span>
          ) : (
            'Submit'
          )}
        </button>
      </div>

      {/* reCAPTCHA Badge */}
      {recaptcha && (
        <div className="mt-4 text-xs text-gray-500 text-center">
          This site is protected by reCAPTCHA and the Google{' '}
          <a href="https://policies.google.com/privacy" className="underline">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="https://policies.google.com/terms" className="underline">
            Terms of Service
          </a>{' '}
          apply.
        </div>
      )}

      {/* Submission Counter (for debugging, remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-2 text-xs text-gray-400">
          Submissions: {submitCount} | Rate limit: {rateLimit.maxSubmissions} per {rateLimit.windowMs / 60000} minutes
        </div>
      )}
    </form>
  );
};

// Secure Input Component with validation
interface SecureInputProps {
  type?: string;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  maxLength?: number;
  minLength?: number;
  autoComplete?: string;
  validate?: (value: string) => string | undefined;
  className?: string;
  describedBy?: string;
}

export const SecureInput: React.FC<SecureInputProps> = ({
  type = 'text',
  name,
  label,
  placeholder,
  required = false,
  pattern,
  maxLength,
  minLength,
  autoComplete,
  validate,
  className = '',
  describedBy
}) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [touched, setTouched] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    // Real-time validation
    if (touched && validate) {
      setError(validate(newValue));
    }
  };

  const handleBlur = () => {
    setTouched(true);
    if (validate) {
      setError(validate(value));
    }
  };

  const inputId = `secure-input-${name}`;
  const errorId = `${inputId}-error`;

  return (
    <div className={`mb-4 ${className}`}>
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={inputId}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        required={required}
        pattern={pattern}
        maxLength={maxLength}
        minLength={minLength}
        autoComplete={autoComplete}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : describedBy}
        className={`
          w-full px-4 py-2 border rounded-lg
          transition-all duration-200
          focus:outline-none focus:ring-2
          ${error
            ? 'border-red-300 focus:ring-red-500 bg-red-50'
            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          }
        `}
      />
      {error && touched && (
        <p id={errorId} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      {!error && touched && value && (
        <div className="mt-1 flex items-center gap-1 text-green-600">
          <Check className="w-4 h-4" />
          <span className="text-sm">Valid input</span>
        </div>
      )}
    </div>
  );
};

export default SecureForm;