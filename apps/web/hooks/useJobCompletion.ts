'use client';

import { useState, useCallback } from 'react';

export interface CompleteJobOptions {
  completionNotes?: string;
  completionPhotos?: string[];
  requestReview?: boolean;
}

export interface CompleteJobResult {
  success: boolean;
  booking?: {
    id: string;
    status: string;
    completedAt: string;
  };
  payout?: {
    triggered: boolean;
    warning?: string;
  };
  error?: string;
}

export interface UseJobCompletionReturn {
  isSubmitting: boolean;
  error: string | null;
  completeJob: (jobId: string, options?: CompleteJobOptions) => Promise<CompleteJobResult>;
  reset: () => void;
}

export function useJobCompletion(): UseJobCompletionReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setError(null);
  }, []);

  const completeJob = useCallback(
    async (jobId: string, options: CompleteJobOptions = {}): Promise<CompleteJobResult> => {
      setIsSubmitting(true);
      setError(null);

      try {
        const response = await fetch(`/api/contractor/jobs/${jobId}/complete`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            completionNotes: options.completionNotes,
            completionPhotos: options.completionPhotos,
            requestReview: options.requestReview ?? true,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          const message = data.error || 'Failed to complete job';
          setError(message);
          return { success: false, error: message };
        }

        return {
          success: true,
          booking: data.booking,
          payout: data.payout,
        };
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to complete job';
        setError(message);
        return { success: false, error: message };
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  return { isSubmitting, error, completeJob, reset };
}
