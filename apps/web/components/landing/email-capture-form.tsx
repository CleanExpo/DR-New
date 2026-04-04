/**
 * Email Capture Form Component
 *
 * Waitlist email capture form for pre-launch landing page
 * Features:
 * - React Hook Form with Zod validation
 * - User type selection (Property Owner / Contractor)
 * - Email consent checkbox
 * - Loading states
 * - Error handling
 * - Success state with redirect
 */

'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

// Validation schema
const emailCaptureSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  userType: z.enum(['PROPERTY_OWNER', 'CONTRACTOR'], {
    errorMap: () => ({ message: 'Please select a user type' }),
  }),
  consentEmail: z.boolean().refine((val) => val === true, {
    message: 'You must consent to receive emails to join the waitlist',
  }),
});

type EmailCaptureFormData = z.infer<typeof emailCaptureSchema>;

interface EmailCaptureFormProps {
  source?: string;
  onSuccess?: () => void;
  className?: string;
}

export function EmailCaptureForm({ source = 'waitlist', onSuccess, className }: EmailCaptureFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailCaptureFormData>({
    resolver: zodResolver(emailCaptureSchema),
    defaultValues: {
      userType: 'PROPERTY_OWNER',
      consentEmail: false,
    },
  });

  const onSubmit = async (data: EmailCaptureFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Capture UTM parameters from URL
      const utmParams = {
        source,
        utmSource: searchParams.get('utm_source') || undefined,
        utmMedium: searchParams.get('utm_medium') || undefined,
        utmCampaign: searchParams.get('utm_campaign') || undefined,
        utmContent: searchParams.get('utm_content') || undefined,
        utmTerm: searchParams.get('utm_term') || undefined,
      };

      const response = await fetch('/api/landing/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          ...utmParams,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle error responses
        if (response.status === 409) {
          // Duplicate email - show friendly message
          setSubmitError(result.message || "You're already on the waitlist!");
        } else if (response.status === 429) {
          // Rate limit exceeded
          setSubmitError('Too many submissions. Please try again later.');
        } else {
          // Other errors
          setSubmitError(result.error || 'Something went wrong. Please try again.');
        }
        return;
      }

      // Success! Redirect to thank you page
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/launch/thank-you?email=' + encodeURIComponent(data.email));
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn('mx-auto w-full max-w-2xl', className)}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register('fullName')}
            type="text"
            id="fullName"
            placeholder="John Smith"
            className={cn(
              'mt-2 block w-full rounded-lg border px-4 py-3 text-base shadow-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500',
              errors.fullName ? 'border-red-300 bg-red-50' : 'border-gray-300'
            )}
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            placeholder="john@example.com"
            className={cn(
              'mt-2 block w-full rounded-lg border px-4 py-3 text-base shadow-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500',
              errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
            )}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        {/* User Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            I am a... <span className="text-red-500">*</span>
          </label>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label
              className={cn(
                'relative flex cursor-pointer rounded-lg border p-4 shadow-sm transition hover:border-orange-500 focus:outline-none',
                'border-gray-300'
              )}
            >
              <input
                {...register('userType')}
                type="radio"
                value="PROPERTY_OWNER"
                className="sr-only"
              />
              <span className="flex flex-1">
                <span className="flex flex-col">
                  <span className="block text-base font-medium text-gray-900">Property Owner</span>
                  <span className="mt-1 flex items-center text-sm text-gray-400">
                    I need disaster recovery services
                  </span>
                </span>
              </span>
              <svg
                className="h-5 w-5 text-orange-600"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </label>

            <label
              className={cn(
                'relative flex cursor-pointer rounded-lg border p-4 shadow-sm transition hover:border-orange-500 focus:outline-none',
                'border-gray-300'
              )}
            >
              <input {...register('userType')} type="radio" value="CONTRACTOR" className="sr-only" />
              <span className="flex flex-1">
                <span className="flex flex-col">
                  <span className="block text-base font-medium text-gray-900">Contractor</span>
                  <span className="mt-1 flex items-center text-sm text-gray-400">
                    I provide disaster recovery services
                  </span>
                </span>
              </span>
              <svg
                className="h-5 w-5 text-orange-600"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
          {errors.userType && (
            <p className="mt-1 text-sm text-red-600">{errors.userType.message}</p>
          )}
        </div>

        {/* Email Consent */}
        <div className="flex items-start">
          <div className="flex h-6 items-center">
            <input
              {...register('consentEmail')}
              id="consentEmail"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label htmlFor="consentEmail" className="font-medium text-gray-700">
              I agree to receive launch updates and disaster recovery tips{' '}
              <span className="text-red-500">*</span>
            </label>
            <p className="text-gray-400">
              We respect your privacy. Unsubscribe anytime. See our{' '}
              <a href="/privacy" className="text-orange-600 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
        {errors.consentEmail && (
          <p className="text-sm text-red-600">{errors.consentEmail.message}</p>
        )}

        {/* Submit Error */}
        {submitError && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{submitError}</p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'w-full rounded-lg px-8 py-4 text-lg font-semibold text-white shadow-lg transition focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2',
            isSubmitting
              ? 'cursor-not-allowed bg-gray-400'
              : 'bg-orange-600 hover:bg-orange-700 hover:shadow-xl'
          )}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="mr-2 h-5 w-5 animate-spin text-white"
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Joining Waitlist...
            </span>
          ) : (
            'Reserve Your Spot - Join Waitlist'
          )}
        </button>

        {/* Privacy Note */}
        <p className="text-center text-sm text-gray-400">
          No credit card required. Free to join. Launch expected Q2 2026.
        </p>
      </form>
    </div>
  );
}
