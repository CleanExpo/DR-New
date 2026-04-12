// @ts-nocheck
'use client';

/**
 * CONN-001: Contractor Subscription Checkout Page
 *
 * Shows BASIC / PRO / ENTERPRISE plan cards.
 * On click, POSTs { workspaceId, tier } to /api/subscription/checkout
 * and redirects to the returned Stripe checkout URL.
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Check, Loader2, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PlanConfig {
  tier: 'BASIC' | 'PRO' | 'ENTERPRISE';
  name: string;
  monthlyPrice: number;
  seatLimit: number | 'Unlimited';
  monthlyJobLimit: number | 'Unlimited';
  serviceRadiusKm: number;
  features: string[];
  badge?: string;
}

const PLANS: PlanConfig[] = [
  {
    tier: 'BASIC',
    name: 'Basic',
    monthlyPrice: 99,
    seatLimit: 1,
    monthlyJobLimit: 10,
    serviceRadiusKm: 25,
    features: [
      'Job rotation access',
      'Basic NRPG CRM included',
      'Regional leaderboard',
      'Email notifications',
      'Mobile app access',
      'Standard training modules',
    ],
  },
  {
    tier: 'PRO',
    name: 'Pro',
    monthlyPrice: 299,
    seatLimit: 5,
    monthlyJobLimit: 50,
    serviceRadiusKm: 50,
    badge: 'Most Popular',
    features: [
      'Everything in Basic',
      '5 team seats',
      '50 jobs per month',
      'External CRM integration (ServiceM8, Fergus, Tradify)',
      'National + regional leaderboard',
      'API access',
      'Priority support (24hr response)',
      'Advanced training modules',
    ],
  },
  {
    tier: 'ENTERPRISE',
    name: 'Enterprise',
    monthlyPrice: 799,
    seatLimit: 'Unlimited',
    monthlyJobLimit: 'Unlimited',
    serviceRadiusKm: 100,
    features: [
      'Everything in Pro',
      'Unlimited team seats',
      'Unlimited jobs',
      'Multi-region coverage',
      'Dedicated account manager',
      'Custom API integration',
      'White-label reporting',
      'Priority dispatch',
      'Bulk property tools',
      'Advanced analytics',
    ],
  },
];

export default function SubscriptionPage() {
  const router = useRouter();
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  useEffect(() => {
    // Workspace ID stored during onboarding (CONN-003)
    const stored = localStorage.getItem('nrpg_workspace_id');
    if (stored) {
      setWorkspaceId(stored);
    }
  }, []);

  const handleSubscribe = async (tier: 'BASIC' | 'PRO' | 'ENTERPRISE') => {
    if (!workspaceId) {
      toast.error('Workspace not found. Please complete onboarding first.', {
        action: {
          label: 'Go to Onboarding',
          onClick: () => router.push('/dashboard/contractor/onboarding'),
        },
      });
      return;
    }

    setLoadingTier(tier);

    try {
      const res = await fetch('/api/subscription/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workspaceId, tier }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.error || 'Failed to create checkout session. Please try again.');
        return;
      }

      // Redirect to Stripe checkout
      window.location.href = data.checkoutUrl;
    } catch {
      toast.error('Unexpected error. Please try again.');
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-portal-text font-heading">Choose Your Plan</h1>
        <p className="text-portal-muted font-body mt-1">
          Select the subscription tier that best fits your business. Billed monthly in AUD.
        </p>
      </div>

      {!workspaceId && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
          <CreditCard className="size-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-yellow-800">Workspace Required</p>
            <p className="text-sm text-yellow-700 mt-0.5">
              You need to complete onboarding and create your workspace before subscribing.{' '}
              <button
                onClick={() => router.push('/dashboard/contractor/onboarding')}
                className="underline font-medium hover:text-yellow-900"
              >
                Go to Onboarding
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map((plan) => {
          const isPro = plan.tier === 'PRO';
          const isLoading = loadingTier === plan.tier;

          return (
            <Card
              key={plan.tier}
              className={`relative flex flex-col ${
                isPro
                  ? 'border-2 shadow-lg'
                  : 'border border-portal-border'
              }`}
              style={isPro ? { borderColor: '#8A6B4E' } : undefined}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge
                    className="text-white text-xs font-bold px-3 py-1"
                    style={{ backgroundColor: '#8A6B4E' }}
                  >
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-heading text-portal-text">
                  {plan.name}
                </CardTitle>
                <CardDescription className="font-body">
                  <span className="text-3xl font-bold text-portal-text font-heading">
                    ${plan.monthlyPrice}
                  </span>
                  <span className="text-portal-muted"> / month AUD</span>
                </CardDescription>
                <div className="text-xs text-portal-muted space-y-0.5 mt-2 font-body">
                  <p>
                    {plan.seatLimit === 'Unlimited' ? 'Unlimited' : plan.seatLimit}{' '}
                    {plan.seatLimit === 1 ? 'seat' : 'seats'}
                  </p>
                  <p>
                    {plan.monthlyJobLimit === 'Unlimited' ? 'Unlimited' : plan.monthlyJobLimit}{' '}
                    jobs/month
                  </p>
                  <p>{plan.serviceRadiusKm} km service radius</p>
                </div>
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm font-body text-portal-text">
                      <Check
                        className="size-4 flex-shrink-0 mt-0.5"
                        style={{ color: '#8A6B4E' }}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-4">
                <Button
                  onClick={() => handleSubscribe(plan.tier)}
                  disabled={isLoading || !workspaceId}
                  className="w-full font-heading font-bold"
                  style={
                    isPro
                      ? { backgroundColor: '#8A6B4E', color: '#fff' }
                      : { backgroundColor: '#1C2E47', color: '#fff' }
                  }
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="size-4 mr-2 animate-spin" />
                      Redirecting...
                    </>
                  ) : (
                    <>
                      <CreditCard className="size-4 mr-2" />
                      Subscribe to {plan.name}
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <p className="text-xs text-portal-muted text-center font-body">
        Secure payment via Stripe. Cancel anytime. GST (10%) will be applied at checkout.
      </p>
    </div>
  );
}
