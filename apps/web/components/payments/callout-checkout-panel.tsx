'use client';

import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { getNrpgCalloutSplit } from '@/lib/pricing/nrpg-callout';

interface CalloutCheckoutPanelProps {
  requestId: string;
  status?: string;
  sessionId?: string;
  /** If true, show the cancel/refund section (payment has been made and is within cancellation window) */
  showCancelOption?: boolean;
}

export function CalloutCheckoutPanel({ requestId, status, sessionId, showCancelOption }: CalloutCheckoutPanelProps) {
  const split = useMemo(() => getNrpgCalloutSplit(), []);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [paid, setPaid] = useState<boolean | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [releasing, setReleasing] = useState(false);
  const [refundConfirmed, setRefundConfirmed] = useState(false);

  const startCheckout = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/service-requests/${requestId}/callout/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      if (!response.ok || !data?.url) {
        throw new Error(data?.message || data?.error || 'Failed to start checkout');
      }

      window.location.href = data.url;
    } catch (error) {
      console.error('Failed to start checkout:', error);
      alert(error instanceof Error ? error.message : 'Failed to start checkout');
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async () => {
    try {
      setVerifying(true);
      const response = await fetch(`/api/service-requests/${requestId}/callout/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });

      const data = await response.json();
      if (response.ok && data?.success) {
        setPaid(Boolean(data.paid));
        setPaymentStatus(data.paymentStatus ?? null);
      } else {
        throw new Error(data?.message || data?.error || 'Failed to verify payment');
      }
    } catch (error) {
      console.error('Failed to verify payment:', error);
      setPaid(null);
      setPaymentStatus(null);
    } finally {
      setVerifying(false);
    }
  };

  useEffect(() => {
    if (status === 'success' && sessionId) {
      void verifyPayment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, sessionId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Initial Callout Payment</CardTitle>
        <CardDescription>
          Client pays NRPG AU${split.total.totalAUD.toLocaleString()} upfront. NRPG holds funds until the job is completed.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span>Total (AUD)</span>
            <span className="font-medium">AU${split.total.totalAUD.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-muted-foreground">
            <span>GST ({split.total.gstInclusive ? 'included' : 'added'})</span>
            <span>AU${split.total.gstAUD.toLocaleString()}</span>
          </div>
        </div>

        <Separator />

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span>NRPG marketing &amp; advertising hold</span>
            <span className="font-medium">AU${split.platformFee.totalAUD.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Contractor entitlement (subject to KPI)</span>
            <span className="font-medium">AU${split.contractorEntitlement.totalAUD.toLocaleString()}</span>
          </div>
        </div>

        {status === 'success' && (
          <div className="rounded-md border p-3 text-sm">
            <div className="font-medium">Payment verification</div>
            <div className="text-muted-foreground">
              {verifying
                ? 'Verifying payment status...'
                : paid === true
                  ? `Paid (Stripe status: ${paymentStatus ?? 'paid'})`
                  : paid === false
                    ? `Not paid yet (Stripe status: ${paymentStatus ?? 'unknown'})`
                    : 'Unable to verify payment at this time.'}
            </div>
            {!verifying && (
              <Button variant="outline" className="mt-3" onClick={verifyPayment} disabled={!sessionId}>
                Re-check payment
              </Button>
            )}
          </div>
        )}

        {status === 'cancel' && (
          <div className="rounded-md border p-3 text-sm">
            <div className="font-medium">Checkout cancelled</div>
            <div className="text-muted-foreground">No payment was taken. You can try again when ready.</div>
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={startCheckout} disabled={loading}>
            {loading ? 'Starting checkout...' : `Pay AU$${split.total.totalAUD.toLocaleString()}`}
          </Button>
          <Button variant="outline" onClick={() => (window.location.href = '/dashboard/client')}>
            Back to dashboard
          </Button>
        </div>

        {/* CONN-017: Admin cancel/release section */}
        {showCancelOption && !refundConfirmed && (
          <div className="rounded-md border border-destructive/40 bg-destructive/5 p-4 space-y-3">
            <div className="font-medium text-sm text-destructive">Cancel Callout &amp; Release Funds</div>
            <p className="text-xs text-muted-foreground">
              Releasing funds will transfer the contractor entitlement via Stripe and mark this
              callout as cancelled. This action cannot be undone.
            </p>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" disabled={releasing}>
                  {releasing ? 'Processing…' : 'Cancel Callout &amp; Release'}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Callout Release</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will initiate a Stripe transfer to the assigned contractor for their
                    entitlement (AU${split.contractorEntitlement.totalAUD.toLocaleString()}) and
                    mark the callout as cancelled. The platform fee is retained.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep Callout</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive hover:bg-destructive/90"
                    onClick={async () => {
                      setReleasing(true);
                      try {
                        const res = await fetch(
                          `/api/admin/service-requests/${requestId}/callout/release`,
                          { method: 'POST' }
                        );
                        const data = await res.json();
                        if (!res.ok) throw new Error(data?.error || 'Release failed');
                        setRefundConfirmed(true);
                      } catch (err) {
                        alert(err instanceof Error ? err.message : 'Release failed');
                      } finally {
                        setReleasing(false);
                      }
                    }}
                  >
                    Yes, Release Funds
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}

        {showCancelOption && refundConfirmed && (
          <div className="rounded-md border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            ✅ Callout cancelled — contractor funds have been released via Stripe.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
