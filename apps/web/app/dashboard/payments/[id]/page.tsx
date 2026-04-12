'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  ArrowLeft,
  CreditCard,
  RotateCcw,
  Calendar,
  User,
  Briefcase,
} from 'lucide-react';

interface Refund {
  id: string;
  amount: number;
  reason: string | null;
  status: string;
  createdAt: string;
}

interface PaymentDetail {
  id: string;
  status: string;
  amount: number;
  refundedAmount: number;
  currency: string;
  createdAt: string;
  processedAt: string | null;
  notes: string | null;
  stripePaymentIntentId: string | null;
  clientId: string | null;
  contractorId: string | null;
  booking: {
    id: string;
    serviceType: string;
    location: string;
    completedAt: string | null;
    client: {
      id: string;
      name: string;
      email: string;
    } | null;
    contractor: {
      id: string;
      name: string;
      email: string;
      businessName: string | null;
    } | null;
  } | null;
  refunds: Refund[];
}

const STATUS_COLOURS: Record<string, string> = {
  COMPLETED: 'bg-green-100 text-green-800',
  PROCESSING: 'bg-blue-100 text-blue-800',
  PENDING: 'bg-yellow-100 text-yellow-800',
  FAILED: 'bg-red-100 text-red-800',
  REFUNDED: 'bg-purple-100 text-purple-800',
  CANCELLED: 'bg-gray-100 text-gray-800',
};

const formatCurrency = (amount: number, currency = 'AUD') =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency }).format(amount);

const formatDate = (date: string | null) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-AU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function PaymentDetailPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const paymentId = params.id;

  const [payment, setPayment] = useState<PaymentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [refundOpen, setRefundOpen] = useState(false);
  const [refundAmount, setRefundAmount] = useState('');
  const [refundReason, setRefundReason] = useState('');
  const [submittingRefund, setSubmittingRefund] = useState(false);

  const isAdmin =
    (session?.user as { role?: string } | undefined)?.role === 'ADMIN' ||
    (session?.user as { role?: string } | undefined)?.role === 'SUPER_ADMIN' ||
    (session?.user as { userType?: string } | undefined)?.userType === 'ADMIN';

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated' && paymentId) {
      fetchPayment();
    }
  }, [status, paymentId]);

  const fetchPayment = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/payments/${paymentId}`);
      const json = await res.json();
      if (json.success) {
        setPayment(json.data);
      } else if (res.status === 403) {
        toast.error('You do not have access to this payment');
        router.push('/dashboard/client/payments');
      } else if (res.status === 404) {
        toast.error('Payment not found');
        router.push('/dashboard/client/payments');
      } else {
        toast.error('Failed to load payment details');
      }
    } catch {
      toast.error('Failed to load payment details');
    } finally {
      setLoading(false);
    }
  };

  const handleRefundSubmit = async () => {
    const amount = parseFloat(refundAmount);
    if (!refundAmount || isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid refund amount');
      return;
    }

    setSubmittingRefund(true);
    try {
      const res = await fetch(`/api/payments/${paymentId}/refund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          reason: refundReason || undefined,
        }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success('Refund processed successfully');
        setRefundOpen(false);
        setRefundAmount('');
        setRefundReason('');
        fetchPayment();
      } else {
        toast.error(json.error || 'Failed to process refund');
      }
    } catch {
      toast.error('Failed to process refund');
    } finally {
      setSubmittingRefund(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-56 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  if (!payment) return null;

  const availableForRefund = payment.amount - payment.refundedAmount;
  const canRefund =
    isAdmin &&
    payment.status === 'COMPLETED' &&
    availableForRefund > 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard/client/payments"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Payments
          </Link>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Payment Details
              </h1>
              <p className="mt-1 text-sm text-gray-500 font-mono">
                {payment.id}
              </p>
            </div>
            <Badge
              className={`text-sm px-3 py-1 ${
                STATUS_COLOURS[payment.status] ?? 'bg-gray-100 text-gray-800'
              }`}
            >
              {payment.status}
            </Badge>
          </div>
        </div>

        {/* Payment Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Amount</span>
              <span className="font-semibold text-gray-900 text-base">
                {formatCurrency(payment.amount, payment.currency)}
              </span>
            </div>
            {payment.refundedAmount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Refunded</span>
                <span className="font-medium text-red-600">
                  −{formatCurrency(payment.refundedAmount, payment.currency)}
                </span>
              </div>
            )}
            {payment.refundedAmount > 0 && (
              <div className="flex justify-between text-sm border-t pt-2">
                <span className="text-gray-500">Net Total</span>
                <span className="font-semibold">
                  {formatCurrency(
                    payment.amount - payment.refundedAmount,
                    payment.currency
                  )}
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                Created
              </span>
              <span>{formatDate(payment.createdAt)}</span>
            </div>
            {payment.processedAt && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  Processed
                </span>
                <span>{formatDate(payment.processedAt)}</span>
              </div>
            )}
            {payment.stripePaymentIntentId && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Stripe Reference</span>
                <span className="font-mono text-xs text-gray-700">
                  {payment.stripePaymentIntentId}
                </span>
              </div>
            )}
            {payment.notes && (
              <div className="pt-2 border-t">
                <p className="text-sm text-gray-500 mb-1">Notes</p>
                <p className="text-sm text-gray-800">{payment.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Booking Reference */}
        {payment.booking && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Booking Reference
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Booking ID</span>
                <Link
                  href={`/dashboard/client/callout/${payment.booking.id}`}
                  className="font-mono text-blue-600 hover:text-blue-700 text-xs"
                >
                  {payment.booking.id}
                </Link>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Service Type</span>
                <span className="font-medium">
                  {payment.booking.serviceType.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Location</span>
                <span>{payment.booking.location}</span>
              </div>
              {payment.booking.completedAt && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Completed</span>
                  <span>{formatDate(payment.booking.completedAt)}</span>
                </div>
              )}

              {/* Parties */}
              <div className="pt-3 border-t grid grid-cols-1 sm:grid-cols-2 gap-4">
                {payment.booking.client && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-medium mb-1 flex items-center gap-1">
                      <User className="h-3 w-3" />
                      Client
                    </p>
                    <p className="text-sm font-medium">
                      {payment.booking.client.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {payment.booking.client.email}
                    </p>
                  </div>
                )}
                {payment.booking.contractor && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-medium mb-1 flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      Contractor
                    </p>
                    <p className="text-sm font-medium">
                      {payment.booking.contractor.businessName ||
                        payment.booking.contractor.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {payment.booking.contractor.email}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Refund History */}
        {payment.refunds.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5" />
                Refund History
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {payment.refunds.map((refund) => (
                <div
                  key={refund.id}
                  className="flex items-start justify-between border-b last:border-0 pb-3 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-medium text-red-600">
                      −{formatCurrency(refund.amount, payment.currency)}
                    </p>
                    {refund.reason && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        {refund.reason}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-0.5">
                      {formatDate(refund.createdAt)}
                    </p>
                  </div>
                  <Badge
                    className={
                      refund.status === 'COMPLETED'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-700'
                    }
                  >
                    {refund.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Admin: Issue Refund */}
        {canRefund && (
          <div className="flex justify-end">
            <Button
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
              onClick={() => setRefundOpen(true)}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Issue Refund
            </Button>
          </div>
        )}
      </div>

      {/* Refund Dialog */}
      <Dialog open={refundOpen} onOpenChange={setRefundOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Issue Refund</DialogTitle>
            <DialogDescription>
              Available to refund:{' '}
              <strong>
                {formatCurrency(availableForRefund, payment.currency)}
              </strong>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="refund-amount">Refund Amount (AUD)</Label>
              <Input
                id="refund-amount"
                type="number"
                min="0.01"
                step="0.01"
                max={availableForRefund}
                placeholder="0.00"
                value={refundAmount}
                onChange={(e) => setRefundAmount(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="refund-reason">Reason (optional)</Label>
              <Input
                id="refund-reason"
                placeholder="e.g. Service not delivered"
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                className="flex-1"
                variant="emergency"
                onClick={handleRefundSubmit}
                disabled={submittingRefund}
              >
                {submittingRefund ? 'Processing...' : 'Confirm Refund'}
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setRefundOpen(false)}
                disabled={submittingRefund}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
