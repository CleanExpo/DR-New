'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseCsrfTokenResult {
  csrfToken: string;
  loading: boolean;
  error: string | null;
  refreshToken: () => Promise<void>;
}

export function useCsrfToken(): UseCsrfTokenResult {
  const [csrfToken, setCsrfToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const generateToken = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/csrf/token', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to generate CSRF token');
      }

      const data = (await response.json()) as { token: string };
      setCsrfToken(data.token);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      console.error('CSRF token generation error:', message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    generateToken();
  }, [generateToken]);

  return {
    csrfToken,
    loading,
    error,
    refreshToken: generateToken,
  };
}

export function useCsrfProtectedForm() {
  const { csrfToken, loading, error } = useCsrfToken();

  const submitWithCsrf = useCallback(
    async (url: string, formData: Record<string, any>): Promise<Response> => {
      if (!csrfToken) {
        throw new Error('CSRF token not available');
      }

      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
    },
    [csrfToken]
  );

  return {
    csrfToken,
    loading,
    error,
    submitWithCsrf,
  };
}
