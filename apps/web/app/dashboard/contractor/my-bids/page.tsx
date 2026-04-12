'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  DollarSign,
  MapPin,
  ArrowLeftRight,
  Loader,
  ChevronLeft,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useContractorBidResponse, type BidResponseType } from '@/hooks/useContractorBidResponse';

interface ServiceRequest {
  id: string;
  disasterType: string;
  description: string;
  suburb?: string;
  postcode?: string;
  state?: string;
  estimatedBudget?: number;
  emergencyLevel?: string;
  user?: {
    id: string;
    name: string | null;
    email: string;
  };
}

interface Bid {
  id: string;
  contractorResponse: string | null;
  contractorRespondedAt: string | null;
  notificationStatus: string;
  status: string;
  budget: string | null;
  timeline: string | null;
  contractorMessage: string | null;
  responseDeadline: string | null;
  createdAt: string;
  serviceRequest: ServiceRequest | null;
}

interface CounterOfferData {
  counterAmount: string;
  counterTimeline: string;
  message: string;
}

export default function MyBidsPage() {
  const router = useRouter();
  const { isSubmitting, respondToBid, reset } = useContractorBidResponse();

  const [bids, setBids] = React.useState<Bid[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [fetchError, setFetchError] = React.useState<string | null>(null);

  // Dialog state
  const [respondDialog, setRespondDialog] = React.useState<{
    open: boolean;
    bid: Bid | null;
    type: BidResponseType | null;
  }>({ open: false, bid: null, type: null });

  const [counterData, setCounterData] = React.useState<CounterOfferData>({
    counterAmount: '',
    counterTimeline: '',
    message: '',
  });
  const [declineMessage, setDeclineMessage] = React.useState('');

  const fetchBids = React.useCallback(async () => {
    try {
      setFetchError(null);
      const res = await fetch('/api/contractor/my-bids');
      if (!res.ok) throw new Error('Failed to fetch bids');
      const data = await res.json();
      setBids(data.data || []);
    } catch (err) {
      setFetchError(err instanceof Error ? err.message : 'Failed to load bids');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchBids();
  }, [fetchBids]);

  const openRespondDialog = (bid: Bid, type: BidResponseType) => {
    reset();
    setCounterData({ counterAmount: '', counterTimeline: '', message: '' });
    setDeclineMessage('');
    setRespondDialog({ open: true, bid, type });
  };

  const closeDialog = () => {
    setRespondDialog({ open: false, bid: null, type: null });
  };

  const handleRespond = async () => {
    const { bid, type } = respondDialog;
    if (!bid || !type) return;

    const options =
      type === 'COUNTER_OFFER'
        ? {
            response: type,
            counterAmount: counterData.counterAmount
              ? parseFloat(counterData.counterAmount)
              : undefined,
            counterTimeline: counterData.counterTimeline || undefined,
            message: counterData.message || undefined,
          }
        : {
            response: type,
            message: type === 'DECLINED' ? declineMessage || undefined : undefined,
          };

    const result = await respondToBid(bid.id, options);

    if (result.success) {
      closeDialog();
      if (result.warning) {
        toast.warning(result.warning);
      } else if (type === 'ACCEPTED') {
        toast.success('Bid accepted — the client will be notified.');
      } else if (type === 'DECLINED') {
        toast.info('Bid declined. The system will escalate to the next contractor.');
      } else {
        toast.success('Counter offer submitted — the client will review it.');
      }
      await fetchBids();
    } else {
      toast.error(result.error || 'Failed to submit response. Please try again.');
    }
  };

  const getStatusBadge = (bid: Bid) => {
    if (bid.contractorResponse === 'ACCEPTED') {
      return <Badge className="bg-green-100 text-green-800 border-green-300">Accepted</Badge>;
    }
    if (bid.contractorResponse === 'DECLINED') {
      return <Badge className="bg-red-100 text-red-800 border-red-300">Declined</Badge>;
    }
    if (bid.contractorResponse === 'COUNTER_OFFER') {
      return <Badge className="bg-amber-100 text-amber-800 border-amber-300">Counter Offer Sent</Badge>;
    }
    if (bid.status === 'PENDING') {
      return <Badge className="bg-blue-100 text-blue-800 border-blue-300">Awaiting Response</Badge>;
    }
    return <Badge variant="outline">{bid.status}</Badge>;
  };

  const isPending = (bid: Bid) => !bid.contractorResponse;

  const isDeadlinePassed = (bid: Bid) =>
    bid.responseDeadline ? new Date(bid.responseDeadline) < new Date() : false;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(amount);

  const formatDate = (date: string) =>
    new Date(date).toLocaleString('en-AU', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const { bid: activeBid, type: activeType } = respondDialog;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-3 -ml-2">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">My Bids</h1>
          <p className="text-gray-500 mt-1">
            Review and respond to your matched job opportunities
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-gray-900">{bids.filter(isPending).length}</p>
          <p className="text-sm text-gray-500">awaiting response</p>
        </div>
      </div>

      {/* Fetch error */}
      {fetchError && (
        <Alert className="border-red-300 bg-red-50">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <AlertDescription className="text-red-800">{fetchError}</AlertDescription>
        </Alert>
      )}

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : bids.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
          <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">No bids yet</p>
          <p className="text-gray-400 mt-2 text-sm">
            Browse available requests and submit bids to see them here.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => router.push('/dashboard/contractor/available-requests')}
          >
            View Available Requests
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {bids.map((bid) => {
            const req = bid.serviceRequest;
            const pending = isPending(bid);
            const late = isDeadlinePassed(bid);

            return (
              <div
                key={bid.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap mb-1">
                        <h3 className="text-lg font-semibold text-gray-900 capitalize">
                          {req?.disasterType?.replace(/_/g, ' ') ?? 'Service Request'}
                        </h3>
                        {getStatusBadge(bid)}
                        {pending && late && (
                          <Badge className="bg-orange-100 text-orange-800 border-orange-300">
                            Deadline passed
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {req?.description ?? 'No description available'}
                      </p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                    {req?.suburb && (
                      <div>
                        <div className="flex items-center gap-1 text-gray-400 mb-1">
                          <MapPin className="h-3 w-3" />
                          <span className="text-xs font-medium uppercase">Location</span>
                        </div>
                        <p className="font-semibold text-gray-900">{req.suburb}</p>
                        {req.postcode && (
                          <p className="text-xs text-gray-400">{req.postcode}</p>
                        )}
                      </div>
                    )}

                    {req?.estimatedBudget ? (
                      <div>
                        <div className="flex items-center gap-1 text-gray-400 mb-1">
                          <DollarSign className="h-3 w-3" />
                          <span className="text-xs font-medium uppercase">Budget</span>
                        </div>
                        <p className="font-semibold text-gray-900">
                          {formatCurrency(req.estimatedBudget)}
                        </p>
                      </div>
                    ) : null}

                    {req?.user?.name && (
                      <div>
                        <p className="text-xs font-medium text-gray-400 uppercase mb-1">Client</p>
                        <p className="font-semibold text-gray-900">{req.user.name}</p>
                      </div>
                    )}

                    <div>
                      <p className="text-xs font-medium text-gray-400 uppercase mb-1">Matched</p>
                      <p className="font-semibold text-gray-900">{formatDate(bid.createdAt)}</p>
                    </div>
                  </div>

                  {/* Response deadline */}
                  {pending && bid.responseDeadline && (
                    <p className={`text-xs mb-4 ${late ? 'text-orange-600' : 'text-gray-400'}`}>
                      {late ? 'Deadline passed: ' : 'Respond by: '}
                      {formatDate(bid.responseDeadline)}
                    </p>
                  )}

                  {/* Contractor message if already responded */}
                  {bid.contractorMessage && (
                    <div className="bg-gray-50 rounded-md p-3 mb-4 text-sm text-gray-700">
                      <p className="font-medium text-xs text-gray-400 uppercase mb-1">Your message</p>
                      {bid.contractorMessage}
                    </div>
                  )}

                  {/* Counter offer details */}
                  {bid.contractorResponse === 'COUNTER_OFFER' && (
                    <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-4 text-sm text-amber-900">
                      <p className="font-medium text-xs uppercase mb-1">Counter Offer Details</p>
                      {bid.budget && <p>Amount: {formatCurrency(parseFloat(bid.budget))}</p>}
                      {bid.timeline && <p>Timeline: {bid.timeline}</p>}
                    </div>
                  )}

                  {/* Action buttons for pending bids */}
                  {pending && (
                    <div className="flex gap-3 flex-wrap border-t border-gray-100 pt-4 mt-2">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => openRespondDialog(bid, 'ACCEPTED')}
                        disabled={isSubmitting}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-amber-400 text-amber-700 hover:bg-amber-50"
                        onClick={() => openRespondDialog(bid, 'COUNTER_OFFER')}
                        disabled={isSubmitting}
                      >
                        <ArrowLeftRight className="h-4 w-4 mr-2" />
                        Counter Offer
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-300 text-red-600 hover:bg-red-50"
                        onClick={() => openRespondDialog(bid, 'DECLINED')}
                        disabled={isSubmitting}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Decline
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Respond Dialog */}
      <Dialog open={respondDialog.open} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {activeType === 'ACCEPTED' && 'Accept Bid'}
              {activeType === 'DECLINED' && 'Decline Bid'}
              {activeType === 'COUNTER_OFFER' && 'Submit Counter Offer'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {activeType === 'ACCEPTED' && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4 text-sm text-green-800">
                <CheckCircle className="h-4 w-4 inline mr-2" />
                Accepting this bid will notify the client and confirm your assignment to the job.
              </div>
            )}

            {activeType === 'DECLINED' && (
              <>
                <div className="bg-red-50 border border-red-200 rounded-md p-4 text-sm text-red-800">
                  <XCircle className="h-4 w-4 inline mr-2" />
                  Declining will escalate this request to the next available contractor.
                </div>
                <div className="space-y-1">
                  <Label htmlFor="decline-message">Message to client (optional)</Label>
                  <Textarea
                    id="decline-message"
                    placeholder="Provide a reason for declining, e.g. capacity constraints..."
                    rows={3}
                    maxLength={1000}
                    value={declineMessage}
                    onChange={(e) => setDeclineMessage(e.target.value)}
                  />
                </div>
              </>
            )}

            {activeType === 'COUNTER_OFFER' && (
              <>
                <div className="space-y-1">
                  <Label htmlFor="counter-amount">Counter amount (AUD)</Label>
                  <Input
                    id="counter-amount"
                    type="number"
                    min="0"
                    step="100"
                    placeholder="e.g. 5500"
                    value={counterData.counterAmount}
                    onChange={(e) =>
                      setCounterData((d) => ({ ...d, counterAmount: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="counter-timeline">Proposed timeline</Label>
                  <Input
                    id="counter-timeline"
                    type="text"
                    maxLength={200}
                    placeholder="e.g. 3–5 business days"
                    value={counterData.counterTimeline}
                    onChange={(e) =>
                      setCounterData((d) => ({ ...d, counterTimeline: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="counter-message">Message to client (optional)</Label>
                  <Textarea
                    id="counter-message"
                    placeholder="Explain your counter offer..."
                    rows={3}
                    maxLength={1000}
                    value={counterData.message}
                    onChange={(e) =>
                      setCounterData((d) => ({ ...d, message: e.target.value }))
                    }
                  />
                </div>
              </>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={closeDialog} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              onClick={handleRespond}
              disabled={isSubmitting}
              className={
                activeType === 'ACCEPTED'
                  ? 'bg-green-600 hover:bg-green-700'
                  : activeType === 'DECLINED'
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-[#1C2E47] hover:bg-[#1C2E47]/90'
              }
            >
              {isSubmitting ? (
                <Loader className="h-4 w-4 mr-2 animate-spin" />
              ) : null}
              {activeType === 'ACCEPTED' && 'Confirm Accept'}
              {activeType === 'DECLINED' && 'Confirm Decline'}
              {activeType === 'COUNTER_OFFER' && 'Submit Counter Offer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
