'use client';
/**
 * CSRF Protected Form Wrapper
 *
 * Wraps any form with automatic CSRF token generation and validation
 * Handles token refresh and error cases transparently
 *
 * Usage:
 * @example
 * <CsrfProtectedForm
 *   onSubmit={handleSubmit}
 *   className="space-y-4"
 * >
 *   {(csrfToken) => (
 *     // form content here
 *   )}
 * </CsrfProtectedForm>
 */


import React, { useState, useEffect } from 'react';
import { useCsrfToken } from '@/lib/hooks/useCsrfToken';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface CsrfProtectedFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>, csrfToken: string) => void | Promise<void>;
  children: (csrfToken: string) => React.ReactNode;
  className?: string;
  id?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  encType?: string;
  noValidate?: boolean;
}

export function CsrfProtectedForm({
  onSubmit,
  children,
  className = '',
  id,
  method = 'POST',
  encType,
  noValidate = false,
}: CsrfProtectedFormProps) {
  const { csrfToken, loading, error: tokenError } = useCsrfToken();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    if (!csrfToken) {
      setSubmitError('CSRF token not available. Please refresh the page.');
      return;
    }

    try {
      setIsSubmitting(true);
      await Promise.resolve(onSubmit(e, csrfToken));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Form submission failed';
      setSubmitError(message);
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      method={method}
      encType={encType}
      className={className}
      noValidate={noValidate}
    >
      {/* Display token loading error */}
      {tokenError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Security error: {tokenError}. Please refresh and try again.
          </AlertDescription>
        </Alert>
      )}

      {/* Display form submission error */}
      {submitError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      )}

      {/* CSRF Token (hidden from user) */}
      <input type="hidden" name="csrfToken" value={csrfToken} />

      {/* Loading state overlay */}
      {(loading || isSubmitting) && (
        <div className="opacity-50 pointer-events-none">
          {children(csrfToken)}
        </div>
      )}

      {/* Normal form content */}
      {!loading && !isSubmitting && children(csrfToken)}
    </form>
  );
}

/**
 * Hook for manually handling CSRF tokens in complex forms
 *
 * Usage:
 * ```tsx
 * const { csrfToken, loading, error, submitWithCsrf } = useCsrfProtectedSubmit();
 *
 * const handleSubmit = async (formData) => {
 *   const response = await submitWithCsrf('/api/endpoint', formData);
 *   // handle response
 * };
 * ```
 */
export function useCsrfProtectedSubmit() {
  const { csrfToken, loading, error, refreshToken } = useCsrfToken();

  const submitWithCsrf = async (
    url: string,
    data: Record<string, any>,
    options: RequestInit = {}
  ): Promise<Response> => {
    if (!csrfToken) {
      throw new Error('CSRF token not available');
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken,
      ...((options.headers as Record<string, string>) || {}),
    };

    try {
      const response = await fetch(url, {
        ...options,
        method: options.method || 'POST',
        headers,
        body: JSON.stringify(data),
        credentials: 'include',
      });

      // If token was invalid, refresh and retry once
      if (response.status === 403) {
        await refreshToken();
        throw new Error('CSRF token invalid. Please try again.');
      }

      return response;
    } catch (err) {
      throw err;
    }
  };

  return {
    csrfToken,
    loading,
    error,
    submitWithCsrf,
    refreshToken,
  };
}
