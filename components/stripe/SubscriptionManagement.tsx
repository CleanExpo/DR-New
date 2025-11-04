/**
 * Subscription Management Component
 * Displays current subscription details and management options
 */

'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { AlertCircle, Check, CreditCard, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/Card';
import { PaymentStatusBadge } from './PaymentStatusBadge';

interface Subscription {
  id: string;
  tier: string;
  status: string;
  amount: number;
  baseRadius: number;
  nextBillingDate: Date | null;
  cancelledAt: Date | null;
}

interface Payment {
  id: string;
  amount: number;
  status: string;
  paidAt: Date | null;
  transactionId: string | null;
}

interface SubscriptionManagementProps {
  subscription: Subscription;
  payments: Payment[];
}

const TIER_NAMES: Record<string, string> = {
  TIER_25KM: '25km Radius',
  TIER_50KM: '50km Radius',
  TIER_100KM: '100km Radius',
  RURAL: 'Rural Coverage',
};

export function SubscriptionManagement({
  subscription,
  payments,
}: SubscriptionManagementProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const handleCancelSubscription = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/stripe/subscription/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionId: subscription.id,
          reason: 'User requested cancellation',
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to cancel subscription');
      }

      // Reload page to show updated status
      window.location.reload();
    } catch (err) {
      console.error('Cancellation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to cancel subscription');
    } finally {
      setLoading(false);
      setShowCancelConfirm(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Subscription */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Current Subscription</h3>
          <PaymentStatusBadge status={subscription.status} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600">Plan</p>
            <p className="text-lg font-medium text-gray-900">
              {TIER_NAMES[subscription.tier] || subscription.tier}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Coverage Area</p>
            <p className="text-lg font-medium text-gray-900">
              {subscription.baseRadius}km radius
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Monthly Fee</p>
            <p className="text-lg font-medium text-gray-900">
              ${subscription.amount.toFixed(2)} AUD
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Next Billing Date</p>
            <p className="text-lg font-medium text-gray-900">
              {subscription.nextBillingDate
                ? format(new Date(subscription.nextBillingDate), 'dd MMM yyyy')
                : 'N/A'}
            </p>
          </div>
        </div>

        {subscription.cancelledAt && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800">
                  Cancellation Scheduled
                </p>
                <p className="text-sm text-yellow-700 mt-1">
                  Your subscription will end on{' '}
                  {subscription.nextBillingDate
                    ? format(new Date(subscription.nextBillingDate), 'dd MMM yyyy')
                    : 'the next billing date'}
                  . You&apos;ll continue to have access until then.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex gap-4">
          {!subscription.cancelledAt && subscription.status === 'ACTIVE' && (
            <>
              <Button variant="outline">Change Plan</Button>
              <Button
                variant="outline"
                className="text-red-600 hover:bg-red-50"
                onClick={() => setShowCancelConfirm(true)}
              >
                Cancel Subscription
              </Button>
            </>
          )}
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}
      </Card>

      {/* Cancellation Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Cancel Subscription?
            </h3>
            <p className="text-gray-600 mb-6">
              Your subscription will remain active until the end of your current billing
              period. You can reactivate anytime before then.
            </p>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1"
              >
                Keep Subscription
              </Button>
              <Button
                onClick={handleCancelSubscription}
                disabled={loading}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                {loading ? 'Cancelling...' : 'Confirm Cancellation'}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Billing History */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing History</h3>

        {payments.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No payment history yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Transaction ID
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {payment.paidAt
                        ? format(new Date(payment.paidAt), 'dd MMM yyyy')
                        : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      ${payment.amount.toFixed(2)} AUD
                    </td>
                    <td className="px-4 py-3">
                      <PaymentStatusBadge status={payment.status} />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 font-mono">
                      {payment.transactionId || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
