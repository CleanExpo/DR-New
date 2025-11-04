/**
 * Invoice Payment Button Component
 * Button to initiate payment for an invoice
 */

'use client';

import { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InvoicePaymentButtonProps {
  invoiceId: string;
  amount: number;
  disabled?: boolean;
}

export function InvoicePaymentButton({
  invoiceId,
  amount,
  disabled = false,
}: InvoicePaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          invoiceId,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError(err instanceof Error ? err.message : 'Payment failed');
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={handlePayment}
        disabled={disabled || loading}
        className="w-full sm:w-auto"
      >
        <CreditCard className="mr-2 h-4 w-4" />
        {loading ? 'Processing...' : `Pay $${amount.toFixed(2)} AUD`}
      </Button>

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
