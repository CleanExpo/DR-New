'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle, CreditCard, ArrowLeft } from 'lucide-react';

interface Plan {
  name: string;
  price: number;
  description: string;
  features: string[];
}

interface SubscriptionData {
  subscription: null | {
    id: string;
    plan: string;
    status: string;
    renewalDate: string | null;
  };
  message: string;
  paymentHistory: unknown[];
  availablePlans: Plan[];
}

export default function ClientSubscriptionPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchSubscription();
    }
  }, [status]);

  const fetchSubscription = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/client/subscription');
      const json = await res.json();
      if (json.success) {
        setData(json);
      } else {
        toast.error('Failed to load subscription details');
      }
    } catch {
      toast.error('Failed to load subscription details');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!data?.subscription) return;
    setCancelling(true);
    try {
      const res = await fetch('/api/client/subscription', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'cancel' }),
      });
      const json = await res.json();
      if (res.ok) {
        toast.success('Subscription cancelled successfully');
        fetchSubscription();
      } else {
        toast.error(json.message || json.error || 'Failed to cancel subscription');
      }
    } catch {
      toast.error('Failed to cancel subscription');
    } finally {
      setCancelling(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard/client/payments"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Payments
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Subscription</h1>
          <p className="mt-2 text-gray-500">
            View your current plan and available options
          </p>
        </div>

        {/* Current Plan */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Current Plan
                </CardTitle>
                <CardDescription className="mt-1">
                  {data?.message}
                </CardDescription>
              </div>
              {data?.subscription ? (
                <Badge
                  variant={
                    data.subscription.status === 'ACTIVE'
                      ? 'default'
                      : 'secondary'
                  }
                >
                  {data.subscription.status}
                </Badge>
              ) : (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  FREE
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {data?.subscription ? (
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Plan</span>
                  <span className="font-medium">{data.subscription.plan}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Status</span>
                  <span className="font-medium">{data.subscription.status}</span>
                </div>
                {data.subscription.renewalDate && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Renewal Date</span>
                    <span className="font-medium">
                      {new Date(data.subscription.renewalDate).toLocaleDateString(
                        'en-AU',
                        { day: '2-digit', month: 'short', year: 'numeric' }
                      )}
                    </span>
                  </div>
                )}
                <div className="pt-4 border-t">
                  <Button
                    variant="emergency"
                    size="sm"
                    onClick={handleCancelSubscription}
                    disabled={cancelling}
                  >
                    {cancelling ? 'Cancelling...' : 'Cancel Subscription'}
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-600">
                You are on the free plan. No payment is required to submit
                service requests, receive quotes, or track job progress.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Available Plans */}
        {data?.availablePlans && data.availablePlans.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Available Plans
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.availablePlans.map((plan) => (
                <Card
                  key={plan.name}
                  className={
                    data.subscription?.plan === plan.name
                      ? 'border-blue-500 border-2'
                      : ''
                  }
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <span className="text-2xl font-bold text-gray-900">
                        {plan.price === 0
                          ? 'Free'
                          : new Intl.NumberFormat('en-AU', {
                              style: 'currency',
                              currency: 'AUD',
                            }).format(plan.price) + '/mo'}
                      </span>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {data.subscription?.plan !== plan.name && plan.price > 0 && (
                      <Button
                        className="w-full mt-4"
                        onClick={() =>
                          toast.info(
                            'Plan changes are not available at this time'
                          )
                        }
                      >
                        Select Plan
                      </Button>
                    )}
                    {data.subscription?.plan === plan.name && (
                      <div className="mt-4 text-center text-sm text-blue-600 font-medium">
                        Current Plan
                      </div>
                    )}
                    {!data.subscription && plan.price === 0 && (
                      <div className="mt-4 text-center text-sm text-green-600 font-medium">
                        Your Current Plan
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
