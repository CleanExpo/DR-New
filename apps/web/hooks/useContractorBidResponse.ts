'use client';

import { useState, useCallback } from 'react';

export type BidResponseType = 'ACCEPTED' | 'DECLINED' | 'COUNTER_OFFER';

export interface BidResponseOptions {
  response: BidResponseType;
  counterAmount?: number;
  counterTimeline?: string;
  message?: string;
}

export interface BidResponseResult {
  success: boolean;
  response?: BidResponseType;
  matchId?: string;
  respondedAt?: string;
  escalated?: boolean;
  warning?: string;
  error?: string;
}

export interface UseContractorBidResponseReturn {
  isSubmitting: boolean;
  error: string | null;
  respondToBid: (matchId: string, options: BidResponseOptions) => Promise<BidResponseResult>;
  reset: () => void;
}

export function useContractorBidResponse(): UseContractorBidResponseReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setError(null);
  }, []);

  const respondToBid = useCallback(
    async (matchId: string, options: BidResponseOptions): Promise<BidResponseResult> => {
      setIsSubmitting(true);
      setError(null);

      try {
        const response = await fetch(`/api/contractor/bids/${matchId}/respond`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            response: options.response,
            counterAmount: options.counterAmount,
            counterTimeline: options.counterTimeline,
            message: options.message,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          const message = data.error || 'Failed to submit response';
          setError(message);
          return { success: false, error: message };
        }

        return {
          success: true,
          response: data.response,
          matchId: data.matchId,
          respondedAt: data.respondedAt,
          escalated: data.escalated,
          warning: data.warning,
        };
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to submit response';
        setError(message);
        return { success: false, error: message };
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  return { isSubmitting, error, respondToBid, reset };
}
