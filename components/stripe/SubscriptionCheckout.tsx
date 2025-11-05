/**
 * Subscription Checkout Component with Stripe Payment Integration
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Loader2 } from 'lucide-react';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { getStripe } from '@/lib/stripe-client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/Card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SubscriptionCheckoutProps {
  contractorId: string;
  onSuccess?: () => void;
}

const TIERS = [
  {
    id: 'RADIUS_25KM',
    name: '25km Radius',
    price: 99,
    radius: 25,
    features: [
      '25km coverage radius',
      'Up to 20 leads per month',
      'Email support',
      'Basic analytics',
      'Mobile app access',
    ],
  },
  {
    id: 'RADIUS_50KM',
    name: '50km Radius',
    price: 199,
    radius: 50,
    popular: true,
    features: [
      '50km coverage radius',
      'Up to 50 leads per month',
      'Priority email support',
      'Advanced analytics',
      'Mobile app access',
      'Lead notifications',
    ],
  },
  {
    id: 'RADIUS_100KM',
    name: '100km Radius',
    price: 349,
    radius: 100,
    features: [
      '100km coverage radius',
      'Up to 100 leads per month',
      'Priority phone support',
      'Premium analytics',
      'Mobile app access',
      'Real-time lead alerts',
      'Custom territory settings',
    ],
  },
  {
    id: 'RURAL',
    name: 'Rural Coverage',
    price: 499,
    radius: 200,
    features: [
      '200km+ coverage radius',
      'Unlimited leads',
      'Dedicated account manager',
      'Enterprise analytics',
      'Mobile app access',
      'Real-time lead alerts',
      'Custom territory settings',
      'API access',
    ],
  },
];

function PaymentForm({
  contractorId,
  tier,
  onBack,
  onSuccess,
}: {
  contractorId: string;
  tier: string;
  onBack: () => void;
  onSuccess?: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error: submitError } = await elements.submit();

      if (submitError) {
        setError(submitError.message || 'Payment failed');
        setIsLoading(false);
        return;
      }

      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/contractor/subscription/success`,
        },
      });

      if (confirmError) {
        setError(confirmError.message || 'Payment confirmation failed');
        setIsLoading(false);
      } else {
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const selectedTierData = TIERS.find((t) => t.id === tier);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Subscription Summary
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Plan:</span>
            <span className="font-semibold">{selectedTierData?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Coverage:</span>
            <span className="font-semibold">{selectedTierData?.radius}km radius</span>
          </div>
          <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t">
            <span>Total (per month):</span>
            <span>${selectedTierData?.price} AUD</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Payment Details
          </h3>
          <PaymentElement />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={isLoading}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            type="submit"
            disabled={!stripe || isLoading}
            className="flex-1"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Subscribe Now'
            )}
          </Button>
        </div>

        <p className="text-xs text-gray-500 text-centre">
          Your subscription will start immediately. Billed monthly. Cancel anytime.
        </p>
      </form>
    </div>
  );
}

export function SubscriptionCheckout({ contractorId, onSuccess }: SubscriptionCheckoutProps) {
  const [selectedTier, setSelectedTier] = useState<string>('RADIUS_50KM');
  const [showPayment, setShowPayment] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleContinueToPayment = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/stripe/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractorId,
          tier: selectedTier,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create subscription');
      }

      setClientSecret(data.clientSecret);
      setShowPayment(true);
    } catch (err) {
      console.error('Error creating subscription:', err);
      setError(err instanceof Error ? err.message : 'Failed to initialize payment');
    } finally {
      setIsLoading(false);
    }
  };

  if (showPayment && clientSecret) {
    const stripePromise = getStripe();

    return (
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          appearance: {
            theme: 'stripe',
            variables: {
              colorPrimary: '#2563eb',
            },
          },
        }}
      >
        <PaymentForm
          contractorId={contractorId}
          tier={selectedTier}
          onBack={() => setShowPayment(false)}
          onSuccess={onSuccess}
        />
      </Elements>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-centre">
        <h2 className="text-3xl font-bold text-gray-900">Choose Your Subscription</h2>
        <p className="mt-2 text-gray-600">
          Select the coverage area that best suits your business needs
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {TIERS.map((tier) => (
          <Card
            key={tier.id}
            className={`relative p-6 cursor-pointer transition-all ${
              selectedTier === tier.id
                ? 'border-2 border-blue-600 shadow-lg'
                : 'border border-gray-200 hover:border-gray-300'
            } ${tier.popular ? 'ring-2 ring-blue-600' : ''}`}
            onClick={() => setSelectedTier(tier.id)}
          >
            {tier.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  MOST POPULAR
                </span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{tier.name}</h3>
                <div className="mt-2 flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">${tier.price}</span>
                  <span className="ml-2 text-gray-600">/month</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {tier.radius}km coverage radius
                </p>
              </div>

              <ul className="space-y-2">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <div
                  className={`w-full py-2 px-4 rounded-md text-centre font-medium ${
                    selectedTier === tier.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {selectedTier === tier.id ? 'Selected' : 'Select'}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-centre">
        <Button
          onClick={handleContinueToPayment}
          disabled={isLoading}
          size="lg"
          className="px-12"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            'Continue to Payment'
          )}
        </Button>
      </div>

      <div className="text-centre text-sm text-gray-500">
        <p>All prices in AUD and include GST</p>
        <p className="mt-1">Cancel anytime. No lock-in contracts.</p>
      </div>
    </div>
  );
}
