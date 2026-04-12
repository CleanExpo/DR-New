// @ts-nocheck
/**
 * Contractor Claims Page — CONN-009
 *
 * Displays claims directly assigned to the contractor and allows them to
 * formally accept, decline, or counter-offer using
 * POST /api/contractor/claims/[claimId]/respond
 */

'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  CheckCircle2,
  XCircle,
  ArrowLeftRight,
  AlertCircle,
  Clock,
  MapPin,
  Briefcase,
  DollarSign,
  Loader,
  ChevronLeft,
  MessageSquare,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Label } from '@/components/ui/label';

// ─── Types ────────────────────────────────────────────────────────────────────

type ResponseType = 'ACCEPTED' | 'DECLINED' | 'COUNTER_OFFER';

interface AssignedClaim {
  id: string;
  claimNumber: string;
  disasterType: string;
  priority: string;
  isEmergency: boolean;
  suburb: string;
  state: string;
  postcode: string;
  estimatedValueAUD?: number;
  assignedAt: string;
  responseDeadline?: string;
  status: string;
  clientName: string;
  damageDescription?: string;
}

interface ResponseDialogState {
  open: boolean;
  claimId: string;
  claimNumber: string;
  responseType: ResponseType | null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatCurrency(value?: number) {
  if (value == null) return '—';
  return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(value);
}

function priorityColor(priority: string) {
  switch (priority?.toUpperCase()) {
    case 'CRITICAL':
      return 'destructive';
    case 'HIGH':
      return 'default';
    case 'MEDIUM':
      return 'secondary';
    default:
      return 'outline';
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContractorClaimsPage() {
  const router = useRouter();
  const [claims, setClaims] = React.useState<AssignedClaim[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  const [dialog, setDialog] = React.useState<ResponseDialogState>({
    open: false,
    claimId: '',
    claimNumber: '',
    responseType: null,
  });

  // Form state
  const [message, setMessage] = React.useState('');
  const [proposedAmount, setProposedAmount] = React.useState('');
  const [estimatedTimeframe, setEstimatedTimeframe] = React.useState('');

  // Load assigned claims
  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/contractor/claims?status=ASSIGNED&limit=50');
        if (!res.ok) throw new Error('Failed to load claims');
        const data = await res.json();
        setClaims(data.claims || data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load assigned claims');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const openDialog = (claim: AssignedClaim, responseType: ResponseType) => {
    setMessage('');
    setProposedAmount('');
    setEstimatedTimeframe('');
    setDialog({ open: true, claimId: claim.id, claimNumber: claim.claimNumber, responseType });
  };

  const closeDialog = () =>
    setDialog({ open: false, claimId: '', claimNumber: '', responseType: null });

  const handleSubmit = async () => {
    if (!dialog.responseType || !dialog.claimId) return;

    if (dialog.responseType === 'COUNTER_OFFER' && !proposedAmount) {
      toast.error('Enter a proposed amount for counter offers');
      return;
    }

    setSubmitting(true);
    try {
      const body: Record<string, unknown> = { response: dialog.responseType };
      if (message) body.message = message;
      if (dialog.responseType === 'COUNTER_OFFER') {
        body.proposedAmount = parseFloat(proposedAmount);
        if (estimatedTimeframe) body.estimatedTimeframe = estimatedTimeframe;
      }

      const res = await fetch(`/api/contractor/claims/${dialog.claimId}/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit response');
      }

      const labels: Record<ResponseType, string> = {
        ACCEPTED: 'accepted',
        DECLINED: 'declined',
        COUNTER_OFFER: 'counter-offer sent for',
      };

      toast.success(`Claim ${dialog.claimNumber} ${labels[dialog.responseType]}`);
      closeDialog();
      // Remove responded claim from list
      setClaims((prev) => prev.filter((c) => c.id !== dialog.claimId));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to submit response');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 space-y-4">
        <Skeleton className="h-8 w-48" />
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-40 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <Link
          href="/dashboard/contractor"
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition"
        >
          <ChevronLeft className="h-4 w-4" />
          Dashboard
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assigned Claims</h1>
          <p className="text-gray-500 text-sm mt-1">
            Claims assigned directly to you. Respond before the deadline.
          </p>
        </div>
        <Badge variant="outline" className="text-base px-4 py-1">
          {claims.length} pending
        </Badge>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 rounded-lg p-4">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {!loading && claims.length === 0 && !error && (
        <Card>
          <CardContent className="flex flex-col items-center py-16 text-center">
            <Briefcase className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700">No assigned claims</h3>
            <p className="text-gray-400 text-sm mt-1 max-w-xs">
              Claims assigned directly to you will appear here. Check your bids for match requests.
            </p>
            <Button asChild variant="outline" className="mt-6">
              <Link href="/dashboard/contractor/my-bids">View My Bids</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Claims list */}
      <div className="space-y-4">
        {claims.map((claim) => (
          <Card key={claim.id} className="border border-gray-200 shadow-sm hover:shadow-md transition">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-base font-semibold text-gray-900">
                    {claim.claimNumber}
                  </CardTitle>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Assigned {formatDate(claim.assignedAt)}
                    {claim.responseDeadline && (
                      <span className="ml-2 text-amber-600 font-medium">
                        · Respond by {formatDate(claim.responseDeadline)}
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex gap-2">
                  {claim.isEmergency && (
                    <Badge variant="destructive" className="text-xs">EMERGENCY</Badge>
                  )}
                  <Badge variant={priorityColor(claim.priority)} className="text-xs capitalize">
                    {claim.priority?.toLowerCase() || 'standard'}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* Details row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Briefcase className="h-4 w-4 text-gray-400" />
                  <span>{claim.disasterType?.replace(/_/g, ' ')}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>
                    {claim.suburb}, {claim.state} {claim.postcode}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <span>{formatCurrency(claim.estimatedValueAUD)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>{claim.status?.replace(/_/g, ' ')}</span>
                </div>
              </div>

              {claim.damageDescription && (
                <p className="text-sm text-gray-600 bg-gray-50 rounded p-3 line-clamp-2">
                  {claim.damageDescription}
                </p>
              )}

              {/* Action buttons */}
              <div className="flex items-center gap-3 pt-2">
                <Button
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                  onClick={() => openDialog(claim, 'ACCEPTED')}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2 text-amber-700 border-amber-300 hover:bg-amber-50"
                  onClick={() => openDialog(claim, 'COUNTER_OFFER')}
                >
                  <ArrowLeftRight className="h-4 w-4" />
                  Counter Offer
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2 text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => openDialog(claim, 'DECLINED')}
                >
                  <XCircle className="h-4 w-4" />
                  Decline
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Response dialog */}
      <Dialog open={dialog.open} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {dialog.responseType === 'ACCEPTED' && `Accept Claim ${dialog.claimNumber}`}
              {dialog.responseType === 'DECLINED' && `Decline Claim ${dialog.claimNumber}`}
              {dialog.responseType === 'COUNTER_OFFER' &&
                `Counter Offer for ${dialog.claimNumber}`}
            </DialogTitle>
            <DialogDescription>
              {dialog.responseType === 'ACCEPTED' &&
                'Confirm you can take on this job. You'll receive assignment confirmation by email.'}
              {dialog.responseType === 'DECLINED' &&
                'Let the client know you cannot take this job. Another contractor will be contacted.'}
              {dialog.responseType === 'COUNTER_OFFER' &&
                'Propose different terms. The admin will review and may accept, negotiate, or re-assign.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {dialog.responseType === 'COUNTER_OFFER' && (
              <>
                <div className="space-y-1.5">
                  <Label htmlFor="proposedAmount">Proposed Amount (AUD) *</Label>
                  <Input
                    id="proposedAmount"
                    type="number"
                    min="0"
                    step="100"
                    placeholder="e.g. 4500"
                    value={proposedAmount}
                    onChange={(e) => setProposedAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="timeframe">Estimated Timeframe</Label>
                  <Input
                    id="timeframe"
                    placeholder="e.g. 3–5 business days"
                    value={estimatedTimeframe}
                    onChange={(e) => setEstimatedTimeframe(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="message">
                Message{' '}
                <span className="text-gray-400 font-normal">
                  {dialog.responseType === 'ACCEPTED' ? '(optional)' : '(optional)'}
                </span>
              </Label>
              <Textarea
                id="message"
                rows={3}
                placeholder={
                  dialog.responseType === 'DECLINED'
                    ? 'Brief reason (e.g. capacity, location)…'
                    : 'Additional notes or conditions…'
                }
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={closeDialog} disabled={submitting}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className={
                dialog.responseType === 'ACCEPTED'
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : dialog.responseType === 'DECLINED'
                  ? 'bg-red-600 hover:bg-red-700'
                  : ''
              }
            >
              {submitting ? (
                <Loader className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <MessageSquare className="h-4 w-4 mr-2" />
              )}
              {dialog.responseType === 'ACCEPTED' && 'Confirm Accept'}
              {dialog.responseType === 'DECLINED' && 'Confirm Decline'}
              {dialog.responseType === 'COUNTER_OFFER' && 'Send Counter Offer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
