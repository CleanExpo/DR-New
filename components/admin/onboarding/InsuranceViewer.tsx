'use client';

import { useState } from 'react';
import { ContractorInsurancePolicy } from '@/lib/types/contractor-onboarding';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  dialogue,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  FileText,
  AlertTriangle,
  Shield,
  DollarSign
} from 'lucide-react';
import { format, differenceInDays, isPast } from 'date-fns';

interface InsuranceViewerProps {
  insurance: ContractorInsurancePolicy;
  onVerify: (notes: string) => void;
  onReject: (reason: string) => void;
}

export function InsuranceViewer({
  insurance,
  onVerify,
  onReject
}: InsuranceViewerProps) {
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [notes, setNotes] = useState('');
  const [reason, setReason] = useState('');

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; icon: any; label: string }> = {
      PENDING: {
        variant: 'secondary' as const,
        icon: Clock,
        label: 'Pending'
      },
      VERIFIED: {
        variant: 'default' as const,
        icon: CheckCircle2,
        label: 'Verified'
      },
      REJECTED: {
        variant: 'destructive' as const,
        icon: XCircle,
        label: 'Rejected'
      },
      EXPIRED: {
        variant: 'destructive' as const,
        icon: AlertTriangle,
        label: 'Expired'
      },
    };

    const config = variants[status] || variants.PENDING;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-centre gap-1">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const getInsuranceTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      PUBLIC_LIABILITY: 'Public Liability Insurance',
      PROFESSIONAL_INDEMNITY: 'Professional Indemnity Insurance',
      WORKERS_COMP: 'Workers Compensation Insurance'
    };
    return labels[type] || type;
  };

  const isExpiringSoon = () => {
    const daysUntilExpiry = differenceInDays(new Date(insurance.expiryDate), new Date());
    return daysUntilExpiry > 0 && daysUntilExpiry <= 90;
  };

  const isExpired = () => {
    return isPast(new Date(insurance.expiryDate));
  };

  const isCoverageAdequate = () => {
    // Public Liability should be minimum $10M
    if (insurance.insuranceType === 'PUBLIC_LIABILITY') {
      return insurance.coverageAmount >= 10000000;
    }
    // Professional Indemnity should be minimum $5M
    if (insurance.insuranceType === 'PROFESSIONAL_INDEMNITY') {
      return insurance.coverageAmount >= 5000000;
    }
    return true;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleVerify = () => {
    onVerify(notes);
    setShowVerifyModal(false);
    setNotes('');
  };

  const handleReject = () => {
    onReject(reason);
    setShowRejectModal(false);
    setReason('');
  };

  return (
    <>
      <div className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-centre justify-centre">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                {getInsuranceTypeLabel(insurance.insuranceType)}
              </h4>
              <p className="text-sm text-gray-600">{insurance.insurer}</p>
            </div>
          </div>
          {getStatusBadge(insurance.status)}
        </div>

        {/* Insurance Details */}
        <div className="grid grid-cols-2 gap-4 mb-4 py-4 border-y border-gray-200">
          <div>
            <p className="text-xs text-gray-500 mb-1">Policy Number</p>
            <p className="text-sm font-medium text-gray-900">
              {insurance.policyNumber}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Coverage Amount</p>
            <p className="text-sm font-medium text-gray-900">
              {formatCurrency(insurance.coverageAmount)}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Effective Date</p>
            <p className="text-sm font-medium text-gray-900">
              {format(new Date(insurance.effectiveDate), 'dd MMM yyyy')}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Expiry Date</p>
            <p className="text-sm font-medium text-gray-900">
              {format(new Date(insurance.expiryDate), 'dd MMM yyyy')}
            </p>
          </div>

          {insurance.excess && (
            <div>
              <p className="text-xs text-gray-500 mb-1">Excess</p>
              <p className="text-sm font-medium text-gray-900">
                {formatCurrency(insurance.excess)}
              </p>
            </div>
          )}
        </div>

        {/* Coverage Warning */}
        {!isCoverageAdequate() && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-900">Insufficient Coverage</p>
              <p className="text-xs text-red-700">
                {insurance.insuranceType === 'PUBLIC_LIABILITY' &&
                  'Public Liability Insurance must be minimum $10,000,000'}
                {insurance.insuranceType === 'PROFESSIONAL_INDEMNITY' &&
                  'Professional Indemnity Insurance must be minimum $5,000,000'}
              </p>
            </div>
          </div>
        )}

        {/* Expiry Warning */}
        {isExpired() && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-900">Policy Expired</p>
              <p className="text-xs text-red-700">
                This policy expired on {format(new Date(insurance.expiryDate), 'dd MMM yyyy')}
              </p>
            </div>
          </div>
        )}

        {isExpiringSoon() && !isExpired() && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-900">Expiring Soon</p>
              <p className="text-xs text-yellow-700">
                This policy expires in {differenceInDays(new Date(insurance.expiryDate), new Date())} days
              </p>
            </div>
          </div>
        )}

        {/* Certificate Document */}
        <div className="mb-4">
          <a
            href={insurance.certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-centre gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            <FileText className="w-4 h-4" />
            View Certificate of Currency
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Action Buttons */}
        {insurance.status === 'PENDING' && (
          <div className="flex items-centre gap-2 pt-4 border-t border-gray-200">
            <Button
              variant="default"
              size="sm"
              onClick={() => setShowVerifyModal(true)}
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={!isCoverageAdequate() || isExpired()}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Verify
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowRejectModal(true)}
              className="flex-1"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reject
            </Button>
          </div>
        )}
      </div>

      {/* Verify Modal */}
      <Dialog open={showVerifyModal} onOpenChange={setShowVerifyModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Insurance Policy</DialogTitle>
            <DialogDescription>
              You are about to verify this insurance policy. Please add any verification notes below.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Label htmlFor="verify-notes">Verification Notes (Optional)</Label>
            <Textarea
              id="verify-notes"
              placeholder="Add any notes about the verification process..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="mt-2"
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowVerifyModal(false)}>
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleVerify}
              className="bg-green-600 hover:bg-green-700"
            >
              Verify Insurance
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Modal */}
      <Dialog open={showRejectModal} onOpenChange={setShowRejectModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Insurance Policy</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this insurance policy. This will be sent to the contractor.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Label htmlFor="reject-reason">Rejection Reason (Required)</Label>
            <Textarea
              id="reject-reason"
              placeholder="Explain why this insurance policy is being rejected..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              className="mt-2"
              required
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectModal(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={!reason.trim()}
            >
              Reject Insurance
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
