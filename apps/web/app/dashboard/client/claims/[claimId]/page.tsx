'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ChevronLeft,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  DollarSign,
  User,
  Star,
  Loader,
  TrendingUp,
  FileText,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/src/design-system/components/Button/Button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RealtimeMessagePanel } from '@/components/messaging/RealtimeMessagePanel';
import { useAuth } from '@/contexts/AuthContext';

interface ContractorBid {
  matchId: string;
  contractorId: string;
  contractorName: string;
  businessName: string;
  email: string;
  matchScore: number;
  status: string;
  proposedBudget: number | null;
  estimatedHours: string | null;
  startDate: string | null;
  message: string | null;
  rating: number;
  completedJobs: number;
  certifications: string[];
}

interface ClaimDetail {
  id: string;
  serviceType: string;
  description: string;
  location: {
    address: string;
    suburb: string;
    postcode: string;
    state: string;
  };
  status: string;
  emergencyLevel: string;
  estimatedCost: number;
  finalCost: number | null;
  client: {
    id: string;
    name: string;
    email: string;
  };
  contractor: {
    id: string;
    name: string;
    email: string;
    businessName: string;
    rating: number;
    completedJobs: number;
    certifications: string[];
  } | null;
  contractorMatches: ContractorBid[];
  notes: string | null;
  clientNotes: string | null;
  damagePhotos: string[];
  payments: Array<{
    id: string;
    amount: number;
    status: string;
    date: string;
  }>;
  rating: {
    rating: number;
    review: string;
    date: string;
  } | null;
  timeline: {
    submitted: string;
    started: string | null;
    completed: string | null;
    updated: string;
  };
}

export default function ClaimDetailPage() {
  const params = useParams();
  const router = useRouter();
  const claimId = params.claimId as string;
  const { user } = useAuth();

  const [claim, setClaim] = React.useState<ClaimDetail | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [acceptingBid, setAcceptingBid] = React.useState<string | null>(null);
  const [showMessageForm, setShowMessageForm] = React.useState(false);
  const [messageText, setMessageText] = React.useState('');
  const [sendingMessage, setSendingMessage] = React.useState(false);
  const [downloadingInvoice, setDownloadingInvoice] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
  const [showRealtimeChat, setShowRealtimeChat] = React.useState(false);

  // Load claim details
  React.useEffect(() => {
    const fetchClaim = async () => {
      try {
        const response = await fetch(`/api/client/claims/${claimId}`);
        if (!response.ok) throw new Error('Failed to fetch claim');

        const data = await response.json();
        setClaim(data.claim);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load claim');
      } finally {
        setLoading(false);
      }
    };

    if (claimId) {
      fetchClaim();
    }
  }, [claimId]);

  const handleAcceptBid = async (matchId: string) => {
    setAcceptingBid(matchId);
    try {
      const response = await fetch(`/api/client/claims/${claimId}/accept-bid`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matchId }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to accept bid');
        return;
      }

      setSuccessMessage('Bid accepted! Your contractor has been assigned.');
      // Refresh claim data
      const refreshResponse = await fetch(`/api/client/claims/${claimId}`);
      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        setClaim(refreshData.claim);
      }
    } catch {
      setError('Failed to accept bid. Please try again.');
    } finally {
      setAcceptingBid(null);
    }
  };

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;
    setSendingMessage(true);
    try {
      const response = await fetch(`/api/client/claims/${claimId}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to send message');
        return;
      }

      setSuccessMessage('Message sent to contractor.');
      setMessageText('');
      setShowMessageForm(false);
    } catch {
      setError('Failed to send message. Please try again.');
    } finally {
      setSendingMessage(false);
    }
  };

  const handleDownloadInvoice = async () => {
    setDownloadingInvoice(true);
    try {
      const response = await fetch(`/api/client/claims/${claimId}/invoice`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to generate invoice');
        return;
      }

      // Open invoice data in a new tab for printing
      const invoiceWindow = window.open('', '_blank');
      if (invoiceWindow) {
        const inv = data.invoice;
        invoiceWindow.document.write(`
          <html><head><title>Invoice ${inv.invoiceNumber}</title>
          <style>
            body { font-family: system-ui, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
            h1 { font-size: 24px; margin-bottom: 4px; }
            .header { display: flex; justify-content: space-between; margin-bottom: 32px; }
            .section { margin-bottom: 24px; }
            .label { font-size: 12px; color: #666; text-transform: uppercase; font-weight: 600; }
            table { width: 100%; border-collapse: collapse; margin: 16px 0; }
            th, td { text-align: left; padding: 8px 12px; border-bottom: 1px solid #e5e7eb; }
            th { background: #f9fafb; font-size: 12px; text-transform: uppercase; color: #666; }
            .total { font-size: 20px; font-weight: bold; }
            .footer { margin-top: 40px; font-size: 12px; color: #999; border-top: 1px solid #e5e7eb; padding-top: 16px; }
            @media print { body { margin: 0; } }
          </style></head><body>
          <div class="header">
            <div><h1>Invoice</h1><p style="color:#666">${inv.invoiceNumber}</p></div>
            <div style="text-align:right"><strong>${inv.company.name}</strong><br/>${inv.company.email}</div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px" class="section">
            <div><p class="label">Bill To</p><p><strong>${inv.client.name}</strong><br/>${inv.client.email}</p></div>
            <div><p class="label">Service Address</p><p>${inv.booking.address}</p></div>
          </div>
          ${inv.contractor ? `<div class="section"><p class="label">Contractor</p><p><strong>${inv.contractor.businessName}</strong><br/>${inv.contractor.contactName}${inv.contractor.abn ? '<br/>ABN: ' + inv.contractor.abn : ''}</p></div>` : ''}
          <table>
            <thead><tr><th>Description</th><th>Date</th><th style="text-align:right">Amount</th></tr></thead>
            <tbody>
            ${inv.lineItems.map((item: { description: string; date: string; amount: number }) => `<tr><td>${item.description}</td><td>${item.date ? new Date(item.date).toLocaleDateString('en-AU') : '-'}</td><td style="text-align:right">$${item.amount.toFixed(2)}</td></tr>`).join('')}
            ${inv.lineItems.length === 0 ? '<tr><td colspan="3" style="text-align:center;color:#999">No payments recorded yet</td></tr>' : ''}
            </tbody>
          </table>
          <div style="text-align:right">
            <p>Subtotal: $${inv.summary.subtotal.toFixed(2)}</p>
            <p>GST (10%): $${inv.summary.gst.toFixed(2)}</p>
            <p class="total">Total: $${inv.summary.total.toFixed(2)} AUD</p>
          </div>
          <div class="footer"><p>${inv.company.name} | ${inv.company.email}</p></div>
          </body></html>
        `);
        invoiceWindow.document.close();
      }
    } catch {
      setError('Failed to download invoice. Please try again.');
    } finally {
      setDownloadingInvoice(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'ASSIGNED':
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('en-AU', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="h-8 w-8 animate-spin text-gray-600" />
      </div>
    );
  }

  if (!claim) {
    return (
      <div className="space-y-6">
        <Button variant="outline" onClick={() => router.back()}>
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <Alert className="border-red-600 bg-red-50">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <AlertDescription className="text-red-900">Claim not found</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 mt-4 capitalize">
          {claim.serviceType.replace('_', ' ')} Claim
        </h1>
        <p className="text-gray-600 mt-2">
          {claim.location.address}, {claim.location.suburb} {claim.location.postcode}
        </p>
      </div>

      {/* Success Alert */}
      {successMessage && (
        <Alert className="border-green-600 bg-green-50">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <AlertDescription className="text-green-900">{successMessage}</AlertDescription>
        </Alert>
      )}

      {/* Error Alert */}
      {error && (
        <Alert className="border-red-600 bg-red-50">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <AlertDescription className="text-red-900">{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Claim Overview */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Claim Overview</h2>
                <p className="text-sm text-gray-600 mt-1">ID: {claim.id}</p>
              </div>
              <span
                className={`px-4 py-2 rounded-full font-semibold text-sm ${getStatusColor(
                  claim.status
                )}`}
              >
                {claim.status.replace('_', ' ')}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
              <div>
                <p className="text-sm text-gray-600 uppercase font-medium mb-2">Emergency Level</p>
                <p className="text-lg font-semibold text-gray-900">{claim.emergencyLevel}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 uppercase font-medium mb-2">Estimated Cost</p>
                <p className="text-lg font-semibold text-gray-900">
                  {formatCurrency(claim.estimatedCost)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 uppercase font-medium mb-2">
                  {claim.finalCost ? 'Final Cost' : 'Status'}
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {claim.finalCost ? formatCurrency(claim.finalCost) : 'Awaiting Bids'}
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Damage Description</h3>
              <p className="text-gray-700 leading-relaxed">{claim.description}</p>
            </div>

            {/* Client Notes */}
            {claim.clientNotes && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Your Notes</h3>
                <p className="text-gray-700">{claim.clientNotes}</p>
              </div>
            )}
          </div>

          {/* Assigned Contractor */}
          {claim.contractor && (
            <div className="bg-white rounded-lg border border-green-200 border-l-4 border-l-green-600 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Your Assigned Contractor
              </h2>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{claim.contractor.businessName}</p>
                      <p className="text-sm text-gray-600">{claim.contractor.name}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm">
                      <strong>Email:</strong> {claim.contractor.email}
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <strong>{claim.contractor.rating}/5</strong> ({claim.contractor.completedJobs}{' '}
                      completed)
                    </p>
                  </div>

                  <Button variant="outline" size="sm" className="mt-4 w-full" onClick={() => setShowMessageForm(!showMessageForm)}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message Contractor
                  </Button>

                  {showMessageForm && (
                    <div className="mt-3 space-y-2">
                      <textarea
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Write a message to your contractor..."
                        className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        maxLength={2000}
                      />
                      <div className="flex gap-2">
                        <Button variant="primary" size="sm" onClick={handleSendMessage} loading={sendingMessage} className="flex-1">
                          Send
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setShowMessageForm(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {claim.contractor.certifications.map((cert) => (
                      <span key={cert} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-semibold">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contractor Bids (if not assigned) */}
          {!claim.contractor && claim.contractorMatches.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Contractor Bids</h2>
              {claim.contractorMatches.map((bid) => (
                <div key={bid.matchId} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{bid.businessName}</p>
                          <p className="text-sm text-gray-600">{bid.contractorName}</p>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        {bid.proposedBudget ? formatCurrency(bid.proposedBudget) : 'Quote'}
                      </p>
                      <div className="flex items-center gap-1 justify-end mt-1">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-bold text-green-600">{bid.matchScore} match</span>
                      </div>
                    </div>
                  </div>

                  {/* Bid Details */}
                  <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-200">
                    <div>
                      <p className="text-xs text-gray-600 uppercase font-medium">Rating</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold text-gray-900">{bid.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase font-medium">Completed Jobs</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">{bid.completedJobs}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase font-medium">Est. Hours</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        {bid.estimatedHours || '-'}
                      </p>
                    </div>
                  </div>

                  {/* Message */}
                  {bid.message && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-700">"{bid.message}"</p>
                    </div>
                  )}

                  {/* Action */}
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleAcceptBid(bid.matchId)}
                    loading={acceptingBid === bid.matchId}
                    className="w-full"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Accept This Bid
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Timeline */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Clock className="h-5 w-5 text-green-600 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Claim Submitted</p>
                  <p className="text-sm text-gray-600">{formatDate(claim.timeline.submitted)}</p>
                </div>
              </div>

              {claim.timeline.started && (
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Work Started</p>
                    <p className="text-sm text-gray-600">{formatDate(claim.timeline.started)}</p>
                  </div>
                </div>
              )}

              {claim.timeline.completed && (
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Work Completed</p>
                    <p className="text-sm text-gray-600">{formatDate(claim.timeline.completed)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Real-time Messaging - Show when contractor is assigned and user is authenticated */}
          {claim.contractor && user && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  Real-time Chat
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowRealtimeChat(!showRealtimeChat)}
                >
                  {showRealtimeChat ? 'Hide Chat' : 'Show Chat'}
                </Button>
              </div>

              {showRealtimeChat && (
                <div className="border-t border-gray-200 pt-4">
                  <RealtimeMessagePanel
                    jobId={claimId}
                    userId={user.id}
                    userName={user.name || 'Client'}
                    onMessageSent={(message) => {
                      console.log('Message sent:', message);
                      setSuccessMessage('Message sent successfully');
                      setTimeout(() => setSuccessMessage(null), 3000);
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Payments */}
          {claim.payments.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Payments
              </h3>
              <div className="space-y-3">
                {claim.payments.map((payment) => (
                  <div key={payment.id} className="border-t border-gray-200 pt-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-gray-900">{formatCurrency(payment.amount)}</p>
                      <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-800 rounded">
                        {payment.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">{formatDate(payment.date)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rating (if completed) */}
          {claim.rating && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Your Rating</h3>
              <div className="flex items-center gap-2 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < claim.rating!.rating
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              {claim.rating.review && (
                <p className="text-sm text-gray-700">"{claim.rating.review}"</p>
              )}
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-3">Need Help?</h3>
            <Button variant="outline" size="sm" className="w-full mb-2" onClick={handleDownloadInvoice} loading={downloadingInvoice}>
              <FileText className="h-4 w-4 mr-2" />
              Download Invoice
            </Button>
            <Button variant="outline" size="sm" className="w-full" onClick={() => router.push('/support')}>
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
