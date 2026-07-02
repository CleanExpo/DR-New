'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ArrowLeft, ExternalLink, CheckCircle2, AlertTriangle, Clock, XCircle, Info, RefreshCw } from 'lucide-react';

/**
 * DR-920: distinct, self-serve-aware copy per Connect account status.
 * `selfServe: true` means the contractor can resolve it inside the Stripe flow.
 */
const STATUS_COPY: Record<string, { title: string; detail: string; selfServe: boolean }> = {
  incomplete: {
    title: 'Setup incomplete',
    detail:
      'Stripe still needs information from you before payouts can start. You can finish this yourself — use "Resolve in Stripe" or the connect button below to pick up where you left off.',
    selfServe: true,
  },
  requirements_due: {
    title: 'Information required',
    detail:
      'Stripe is waiting on the details listed below. You can provide them yourself — re-enter the Stripe setup to submit them.',
    selfServe: true,
  },
  pending: {
    title: 'Setup in progress',
    detail:
      'Your Stripe account is created but not finished. You can complete the remaining steps yourself in Stripe.',
    selfServe: true,
  },
  pending_verification: {
    title: 'Verification in progress',
    detail:
      'Nothing is needed from you right now — Stripe is reviewing the details you submitted. This usually completes within minutes, but can take 1–2 business days.',
    selfServe: false,
  },
  restricted: {
    title: 'Account restricted',
    detail:
      'Stripe has paused payouts on this account until the outstanding requirements below are resolved. Most restrictions clear once you supply the missing information in Stripe.',
    selfServe: true,
  },
  error: {
    title: 'Verification problem',
    detail:
      'Stripe could not verify some of your details. Review the errors below and re-submit the corrected information in Stripe. If it fails again, contact our team and we will chase it with Stripe for you.',
    selfServe: false,
  },
  active: {
    title: 'Payouts active',
    detail: 'Your Stripe account is fully verified. NRPG can pay you for completed jobs.',
    selfServe: false,
  },
};

export default function ContractorPayoutSetupPage() {
  return (
    <Suspense fallback={<PayoutPageLoading />}>
      <PayoutPageContent />
    </Suspense>
  );
}

function PayoutPageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  );
}

interface StripeConnectStatusResponse {
  success?: boolean;
  payoutsConfigured?: boolean;
  stripeConnectAccountId?: string | null;
  status?: string;
  message?: string;
  actionRequired?: string | null;
  capabilities?: {
    chargesEnabled: boolean;
    payoutsEnabled: boolean;
    detailsSubmitted: boolean;
  };
  requirements?: {
    currentlyDue: string[];
    eventuallyDue: string[];
    pendingVerification: string[];
    errors: Array<{
      code: string;
      reason: string;
      requirement: string;
    }>;
  };
}

function PayoutPageContent() {
  const { status } = useSession();
  const searchParams = useSearchParams();
  const stripeResult = useMemo(() => searchParams.get('stripe'), [searchParams]);

  const [loadingStatus, setLoadingStatus] = useState(true);
  const [starting, setStarting] = useState(false);
  const [statusData, setStatusData] = useState<StripeConnectStatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  // DR-920: number of completed status refreshes this visit — drives the escalation CTA
  // once a second refresh still comes back restricted/errored.
  const [refreshCount, setRefreshCount] = useState(0);

  const loadStatus = async () => {
    setError(null);
    setLoadingStatus(true);
    try {
      const response = await fetch('/api/contractor/stripe/connect/status', { cache: 'no-store' });
      const data = (await response.json().catch(() => null)) as StripeConnectStatusResponse | null;
      setStatusData(data || null);
      setRefreshCount((count) => count + 1);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load payout status');
    } finally {
      setLoadingStatus(false);
    }
  };

  const payoutsConfigured = statusData?.payoutsConfigured || false;
  const connectAccountId = statusData?.stripeConnectAccountId;

  useEffect(() => {
    if (status === 'authenticated') {
      void loadStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const startStripeOnboarding = async () => {
    setError(null);
    setStarting(true);
    try {
      const response = await fetch('/api/contractor/stripe/connect/onboard', { method: 'POST' });
      const data = await response.json().catch(() => null);
      if (response.ok && data?.url) {
        window.location.href = data.url as string;
        return;
      }
      throw new Error(data?.error || 'Failed to start Stripe payout setup');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to start payout setup');
      setStarting(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="container mx-auto py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Payout Setup</CardTitle>
            <CardDescription>Sign in to connect Stripe payouts.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => void signIn()} className="w-full" size="lg">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stripeReturn = stripeResult === 'return';
  // Stripe redirects to the refresh URL when the account-link session expired mid-onboarding.
  const stripeRefresh = stripeResult === 'refresh';
  const showReturnBanner = stripeReturn || stripeRefresh;

  const statusCopy = statusData?.status ? STATUS_COPY[statusData.status] : undefined;
  const statusBlocked =
    statusData?.status === 'restricted' ||
    statusData?.status === 'error' ||
    (statusData?.requirements?.errors.length ?? 0) > 0;
  // DR-920: second completed refresh still restricted/errored → offer a human escalation path.
  const showEscalation = !loadingStatus && statusBlocked && refreshCount >= 2;

  return (
    <div className="container mx-auto py-8 max-w-2xl space-y-4">
      <Button asChild variant="outline">
        <Link href="/dashboard/contractor/onboarding/checklist">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to checklist
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle>Payout Setup</CardTitle>
              <CardDescription>Connect Stripe so NRPG can pay you for completed jobs.</CardDescription>
            </div>
            <Badge variant={payoutsConfigured ? 'default' : 'secondary'} className={payoutsConfigured ? 'bg-green-600' : ''}>
              {payoutsConfigured ? 'Connected' : 'Not connected'}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {showReturnBanner && (
            <div
              role="status"
              aria-live="polite"
              className={`rounded-lg border p-3 flex items-start gap-2 ${
                stripeRefresh ? 'border-amber-500/20 bg-amber-500/10' : 'border-blue-500/20 bg-blue-500/10'
              }`}
            >
              {loadingStatus ? (
                <RefreshCw className="h-5 w-5 text-blue-400 mt-0.5 animate-spin" />
              ) : stripeRefresh ? (
                <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5" />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
              )}
              <div>
                {stripeRefresh ? (
                  <>
                    <p className="font-medium">Your Stripe session expired</p>
                    <p className="text-sm text-muted-foreground">
                      The setup link timed out before you finished. Your progress is saved — resume below to continue
                      where you left off.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-medium">Back from Stripe</p>
                    <p className="text-sm text-muted-foreground">
                      {loadingStatus
                        ? 'Checking your latest payout status with Stripe…'
                        : 'Status updated. If something below still shows as pending, Stripe may need a moment — refresh to check again.'}
                    </p>
                  </>
                )}
              </div>
              {stripeRefresh ? (
                <Button variant="outline" className="ml-auto shrink-0" onClick={startStripeOnboarding} disabled={starting}>
                  {starting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Opening Stripe…
                    </>
                  ) : (
                    'Resume Stripe setup'
                  )}
                </Button>
              ) : (
                <Button variant="outline" className="ml-auto shrink-0" onClick={loadStatus} disabled={loadingStatus}>
                  {loadingStatus ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Refreshing…
                    </>
                  ) : (
                    'Refresh status'
                  )}
                </Button>
              )}
            </div>
          )}

          {loadingStatus ? (
            <div className="flex items-center justify-center gap-2 text-muted-foreground py-6">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading Stripe status…
            </div>
          ) : (
            <>
              {/* Account ID */}
              {connectAccountId && (
                <div className="text-xs text-muted-foreground bg-muted/50 px-3 py-2 rounded">
                  Account ID: {connectAccountId}
                </div>
              )}

              {/* Status Alert */}
              {statusData?.status && statusData.status !== 'not_started' && (
                <Alert
                  className={
                    statusData.status === 'active'
                      ? 'border-green-500/20 bg-green-500/10'
                      : statusData.status === 'restricted' || statusData.status === 'error'
                      ? 'border-red-500/20 bg-red-500/10'
                      : statusData.status === 'pending_verification'
                      ? 'border-blue-500/20 bg-blue-500/10'
                      : 'border-amber-500/20 bg-amber-500/10'
                  }
                >
                  {statusData.status === 'active' && <CheckCircle2 className="h-4 w-4 text-green-400" />}
                  {statusData.status === 'restricted' && <XCircle className="h-4 w-4 text-red-400" />}
                  {statusData.status === 'error' && <XCircle className="h-4 w-4 text-red-400" />}
                  {statusData.status === 'pending_verification' && <Clock className="h-4 w-4 text-blue-400" />}
                  {(statusData.status === 'incomplete' || statusData.status === 'requirements_due' || statusData.status === 'pending') && (
                    <AlertTriangle className="h-4 w-4 text-amber-400" />
                  )}
                  <AlertDescription>
                    <p className="font-semibold mb-1">{statusCopy?.title ?? statusData.message}</p>
                    <p className="text-sm text-muted-foreground">{statusCopy?.detail ?? statusData.message}</p>
                    {statusCopy?.selfServe && (
                      <p className="text-sm mt-2 text-muted-foreground">
                        <strong className="text-foreground">You can fix this yourself</strong> — no need to wait on
                        NRPG or Stripe support.
                      </p>
                    )}
                    {statusData.actionRequired && (
                      <p className="text-sm mt-2">
                        <strong>Action needed:</strong> {statusData.actionRequired}
                      </p>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              {/* Capabilities */}
              {statusData?.capabilities && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Account Capabilities</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      {statusData.capabilities.chargesEnabled ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      <span>Charges</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {statusData.capabilities.payoutsEnabled ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      <span>Payouts</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {statusData.capabilities.detailsSubmitted ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      <span>Details</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Requirements */}
              {statusData?.requirements && statusData.requirements.currentlyDue.length > 0 && (
                <Alert className="border-amber-500/20 bg-amber-500/10">
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                  <AlertDescription>
                    <p className="font-semibold mb-2">Information Required</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      Stripe needs the following before payouts can start. Each item is collected inside the Stripe
                      setup flow:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {statusData.requirements.currentlyDue.map((req) => (
                        <li key={req}>{req.replace(/_/g, ' ')}</li>
                      ))}
                    </ul>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3"
                      onClick={startStripeOnboarding}
                      disabled={starting}
                    >
                      {starting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Opening Stripe…
                        </>
                      ) : (
                        <>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Resolve in Stripe
                        </>
                      )}
                    </Button>
                  </AlertDescription>
                </Alert>
              )}

              {/* Pending Verification */}
              {statusData?.requirements && statusData.requirements.pendingVerification.length > 0 && (
                <Alert className="border-blue-500/20 bg-blue-500/10">
                  <Clock className="h-4 w-4 text-blue-400" />
                  <AlertDescription>
                    <p className="font-semibold mb-2">Verification in Progress</p>
                    <p className="text-sm">Stripe is currently verifying — no action needed from you:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm mt-1">
                      {statusData.requirements.pendingVerification.map((req) => (
                        <li key={req}>{req.replace(/_/g, ' ')}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {/* Errors */}
              {statusData?.requirements && statusData.requirements.errors.length > 0 && (
                <Alert className="border-red-500/20 bg-red-500/10">
                  <XCircle className="h-4 w-4 text-red-400" />
                  <AlertDescription>
                    <p className="font-semibold mb-2">Verification Errors</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      Stripe rejected the following. Re-enter the Stripe setup to correct and re-submit them:
                    </p>
                    <ul className="space-y-2 text-sm">
                      {statusData.requirements.errors.map((err, idx) => (
                        <li key={idx}>
                          <strong>{err.requirement.replace(/_/g, ' ')}:</strong> {err.reason}
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3"
                      onClick={startStripeOnboarding}
                      disabled={starting}
                    >
                      {starting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Opening Stripe…
                        </>
                      ) : (
                        <>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Fix in Stripe
                        </>
                      )}
                    </Button>
                  </AlertDescription>
                </Alert>
              )}

              {/* DR-920: escalation path once a repeat refresh is still restricted/errored */}
              {showEscalation && (
                <Alert className="border-blue-500/20 bg-blue-500/10">
                  <Info className="h-4 w-4 text-blue-400" />
                  <AlertDescription>
                    <p className="font-semibold mb-1">Still stuck after refreshing?</p>
                    <p className="text-sm text-muted-foreground">
                      Your account is still showing as{' '}
                      {statusData?.status === 'error' ? 'errored' : 'restricted'} after another check. Some Stripe
                      verification issues can&apos;t be fixed from your side — our team can chase it with Stripe for
                      you.
                    </p>
                    <Button asChild variant="outline" size="sm" className="mt-3">
                      <Link href="/contact">Contact NRPG support</Link>
                    </Button>
                  </AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert className="border-red-500/20 bg-red-500/10">
                  <XCircle className="h-4 w-4 text-red-400" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                onClick={startStripeOnboarding}
                disabled={starting}
                className="w-full"
                size="lg"
              >
                {starting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Opening Stripe…
                  </>
                ) : (
                  <>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {payoutsConfigured ? 'Update Stripe details' : 'Connect Stripe payouts'}
                  </>
                )}
              </Button>

              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard/contractor/onboarding">Back to training</Link>
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
