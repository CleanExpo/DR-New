// @ts-nocheck
'use client';

/**
 * CONN-002: Contractor Subscription Management (Upgrade / Downgrade)
 *
 * Shows the current plan and options to change tier.
 * POSTs { workspaceId, newTier } to /api/subscription/upgrade on confirm.
 */

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Check, Loader2, RefreshCw, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

type SubscriptionTier = 'BASIC' | 'PRO' | 'ENTERPRISE';

interface WorkspaceInfo {
  id: string;
  businessName: string;
  subscriptionTier: SubscriptionTier;
  subscriptionStatus: string;
  seatLimit: number;
  monthlyJobLimit: number;
  members: { id: string }[];
  currentMonthJobs: number;
}

interface PlanMeta {
  tier: SubscriptionTier;
  name: string;
  monthlyPrice: number;
  seatLimit: number;
  monthlyJobLimit: number;
  features: string[];
}

const PLANS: PlanMeta[] = [
  {
    tier: 'BASIC',
    name: 'Basic',
    monthlyPrice: 99,
    seatLimit: 1,
    monthlyJobLimit: 10,
    features: [
      'Job rotation access',
      'Basic NRPG CRM',
      'Regional leaderboard',
      'Standard training',
    ],
  },
  {
    tier: 'PRO',
    name: 'Pro',
    monthlyPrice: 299,
    seatLimit: 5,
    monthlyJobLimit: 50,
    features: [
      'Everything in Basic',
      '5 team seats',
      'CRM integrations',
      'Priority support',
    ],
  },
  {
    tier: 'ENTERPRISE',
    name: 'Enterprise',
    monthlyPrice: 799,
    seatLimit: 999,
    monthlyJobLimit: 999,
    features: [
      'Everything in Pro',
      'Unlimited seats & jobs',
      'Dedicated account manager',
      'White-label reporting',
    ],
  },
];

const TIER_ORDER: Record<SubscriptionTier, number> = { BASIC: 1, PRO: 2, ENTERPRISE: 3 };

function TierChangeIcon({ current, target }: { current: SubscriptionTier; target: SubscriptionTier }) {
  if (TIER_ORDER[target] > TIER_ORDER[current]) {
    return <ArrowUp className="size-4" />;
  }
  if (TIER_ORDER[target] < TIER_ORDER[current]) {
    return <ArrowDown className="size-4" />;
  }
  return <Minus className="size-4" />;
}

export default function SubscriptionManagePage() {
  const [workspace, setWorkspace] = useState<WorkspaceInfo | null>(null);
  const [loadingWorkspace, setLoadingWorkspace] = useState(true);
  const [changingTier, setChangingTier] = useState<SubscriptionTier | null>(null);
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('nrpg_workspace_id');
    if (stored) {
      setWorkspaceId(stored);
      fetchWorkspace(stored);
    } else {
      setLoadingWorkspace(false);
    }
  }, []);

  const fetchWorkspace = async (id: string) => {
    try {
      const res = await fetch(`/api/workspace/usage?workspaceId=${id}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.workspace) {
          setWorkspace(data.workspace);
        }
      }
    } catch {
      // Workspace info unavailable — proceed without it
    } finally {
      setLoadingWorkspace(false);
    }
  };

  const handleChangePlan = async (newTier: SubscriptionTier) => {
    if (!workspaceId) {
      toast.error('Workspace not found. Please complete onboarding first.');
      return;
    }

    if (workspace?.subscriptionTier === newTier) {
      toast.info('You are already on this plan.');
      return;
    }

    setChangingTier(newTier);

    try {
      const res = await fetch('/api/subscription/upgrade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workspaceId, newTier }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.error || 'Plan change failed. Please try again.');
        return;
      }

      toast.success(`Plan updated to ${newTier}. Changes take effect immediately.`);

      // Update local workspace state
      setWorkspace((prev) =>
        prev
          ? {
              ...prev,
              subscriptionTier: newTier,
              seatLimit: data.seatLimit,
              monthlyJobLimit: data.monthlyJobLimit,
            }
          : prev
      );
    } catch {
      toast.error('Unexpected error. Please try again.');
    } finally {
      setChangingTier(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-portal-text font-heading">Manage Subscription</h1>
        <p className="text-portal-muted font-body mt-1">
          Upgrade or downgrade your plan at any time. Changes apply immediately with proration.
        </p>
      </div>

      {/* Current Plan Summary */}
      <Card className="border border-portal-border">
        <CardHeader>
          <CardTitle className="text-lg font-heading text-portal-text">Current Plan</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingWorkspace ? (
            <div className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-64" />
            </div>
          ) : workspace ? (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold font-heading text-portal-text">
                    {workspace.subscriptionTier}
                  </span>
                  <Badge
                    variant="outline"
                    className={
                      workspace.subscriptionStatus === 'ACTIVE' || workspace.subscriptionStatus === 'TRIAL'
                        ? 'text-green-700 border-green-300'
                        : 'text-yellow-700 border-yellow-300'
                    }
                  >
                    {workspace.subscriptionStatus}
                  </Badge>
                </div>
                <p className="text-sm text-portal-muted font-body mt-1">
                  {workspace.members.length} / {workspace.seatLimit === 999 ? 'Unlimited' : workspace.seatLimit} seats &bull;{' '}
                  {workspace.currentMonthJobs} / {workspace.monthlyJobLimit === 999 ? 'Unlimited' : workspace.monthlyJobLimit} jobs this month
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => workspaceId && fetchWorkspace(workspaceId)}
                className="self-start sm:self-auto"
              >
                <RefreshCw className="size-4 mr-2" />
                Refresh
              </Button>
            </div>
          ) : (
            <p className="text-sm text-portal-muted font-body">
              Workspace information unavailable. Ensure you have completed onboarding.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Plan Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map((plan) => {
          const isCurrent = workspace?.subscriptionTier === plan.tier;
          const isChanging = changingTier === plan.tier;
          const isUpgrade =
            workspace
              ? TIER_ORDER[plan.tier] > TIER_ORDER[workspace.subscriptionTier]
              : false;
          const isDowngrade =
            workspace
              ? TIER_ORDER[plan.tier] < TIER_ORDER[workspace.subscriptionTier]
              : false;

          return (
            <Card
              key={plan.tier}
              className={`flex flex-col ${
                isCurrent
                  ? 'ring-2'
                  : 'border border-portal-border'
              }`}
              style={isCurrent ? { ringColor: '#1C2E47' } : undefined}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-heading text-portal-text">{plan.name}</CardTitle>
                  {isCurrent && (
                    <Badge
                      className="text-white text-xs"
                      style={{ backgroundColor: '#1C2E47' }}
                    >
                      Current
                    </Badge>
                  )}
                </div>
                <CardDescription className="font-body">
                  <span className="text-2xl font-bold text-portal-text font-heading">
                    ${plan.monthlyPrice}
                  </span>
                  <span className="text-portal-muted"> / month AUD</span>
                </CardDescription>
                <div className="text-xs text-portal-muted font-body space-y-0.5 mt-1">
                  <p>
                    {plan.seatLimit === 999 ? 'Unlimited' : plan.seatLimit}{' '}
                    {plan.seatLimit === 1 ? 'seat' : 'seats'}
                  </p>
                  <p>
                    {plan.monthlyJobLimit === 999 ? 'Unlimited' : plan.monthlyJobLimit} jobs/month
                  </p>
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
                  onClick={() => handleChangePlan(plan.tier)}
                  disabled={isCurrent || isChanging || !workspaceId}
                  className="w-full font-heading font-medium"
                  variant={isCurrent ? 'outline' : 'default'}
                  style={
                    !isCurrent
                      ? { backgroundColor: isUpgrade ? '#1C2E47' : '#8A6B4E', color: '#fff' }
                      : undefined
                  }
                >
                  {isChanging ? (
                    <>
                      <Loader2 className="size-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : isCurrent ? (
                    'Current Plan'
                  ) : (
                    <>
                      <TierChangeIcon current={workspace?.subscriptionTier ?? 'BASIC'} target={plan.tier} />
                      <span className="ml-2">
                        {isUpgrade ? 'Upgrade' : isDowngrade ? 'Downgrade' : 'Select'} to {plan.name}
                      </span>
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <p className="text-xs text-portal-muted text-center font-body">
        Upgrades are prorated — you only pay the difference for the remaining billing period.
        Downgrades apply a credit to your next invoice.
      </p>
    </div>
  );
}
