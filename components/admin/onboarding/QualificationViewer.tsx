'use client';

import { useState } from 'react';
import { IICRCQualification } from '@/lib/types/contractor-onboarding';
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
  Award
} from 'lucide-react';
import { format, differenceInDays, isPast } from 'date-fns';

interface QualificationViewerProps {
  qualification: IICRCQualification;
  onVerify: (notes: string) => void;
  onReject: (reason: string) => void;
}

export function QualificationViewer({
  qualification,
  onVerify,
  onReject
}: QualificationViewerProps) {
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [notes, setNotes] = useState('');
  const [reason, setReason] = useState('');

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; icon: any; label: string; color: string }> = {
      PENDING: {
        variant: 'secondary' as const,
        icon: Clock,
        label: 'Pending',
        color: 'text-yellow-600'
      },
      VERIFIED: {
        variant: 'default' as const,
        icon: CheckCircle2,
        label: 'Verified',
        color: 'text-green-600'
      },
      REJECTED: {
        variant: 'destructive' as const,
        icon: XCircle,
        label: 'Rejected',
        color: 'text-red-600'
      },
      EXPIRED: {
        variant: 'destructive' as const,
        icon: AlertTriangle,
        label: 'Expired',
        color: 'text-red-600'
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

  const isExpiringSoon = () => {
    if (!qualification.expiryDate) return false;
    const daysUntilExpiry = differenceInDays(new Date(qualification.expiryDate), new Date());
    return daysUntilExpiry > 0 && daysUntilExpiry <= 90;
  };

  const isExpired = () => {
    if (!qualification.expiryDate) return false;
    return isPast(new Date(qualification.expiryDate));
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
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-centre justify-centre">
              <Award className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                {qualification.certificationName}
              </h4>
              <p className="text-sm text-gray-600">
                {qualification.certificationType}
              </p>
            </div>
          </div>
          {getStatusBadge(qualification.status)}
        </div>

        {/* Certificate Details */}
        <div className="grid grid-cols-2 gap-4 mb-4 py-4 border-y border-gray-200">
          <div>
            <p className="text-xs text-gray-500 mb-1">Certificate Number</p>
            <p className="text-sm font-medium text-gray-900">
              {qualification.certificationNumber}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Issuing Organization</p>
            <p className="text-sm font-medium text-gray-900">
              {qualification.issuingOrganization}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Issue Date</p>
            <p className="text-sm font-medium text-gray-900">
              {format(new Date(qualification.issueDate), 'dd MMM yyyy')}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Expiry Date</p>
            <p className="text-sm font-medium text-gray-900">
              {qualification.expiryDate
                ? format(new Date(qualification.expiryDate), 'dd MMM yyyy')
                : 'No expiry'}
            </p>
          </div>
        </div>

        {/* Expiry Warning */}
        {isExpired() && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-900">Certificate Expired</p>
              <p className="text-xs text-red-700">
                This certificate expired on {format(new Date(qualification.expiryDate!), 'dd MMM yyyy')}
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
                This certificate expires in {differenceInDays(new Date(qualification.expiryDate!), new Date())} days
              </p>
            </div>
          </div>
        )}

        {/* Verification Notes */}
        {qualification.verificationNotes && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Verification Notes</p>
            <p className="text-sm text-gray-900">{qualification.verificationNotes}</p>
            {qualification.verifiedBy && qualification.verifiedAt && (
              <p className="text-xs text-gray-500 mt-2">
                Verified by {qualification.verifiedBy} on{' '}
                {format(new Date(qualification.verifiedAt), 'dd MMM yyyy HH:mm')}
              </p>
            )}
          </div>
        )}

        {/* Certificate Document */}
        <div className="mb-4">
          <a
            href={qualification.documentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-centre gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            <FileText className="w-4 h-4" />
            View Certificate Document
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Action Buttons */}
        {qualification.status === 'PENDING' && (
          <div className="flex items-centre gap-2 pt-4 border-t border-gray-200">
            <Button
              variant="default"
              size="sm"
              onClick={() => setShowVerifyModal(true)}
              className="flex-1 bg-green-600 hover:bg-green-700"
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
      <dialogue open={showVerifyModal} onOpenChange={setShowVerifyModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Qualification</DialogTitle>
            <DialogDescription>
              You are about to verify this IICRC qualification. Please add any verification notes below.
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
              Verify Qualification
            </Button>
          </DialogFooter>
        </DialogContent>
      </dialogue>

      {/* Reject Modal */}
      <dialogue open={showRejectModal} onOpenChange={setShowRejectModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Qualification</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this qualification. This will be sent to the contractor.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Label htmlFor="reject-reason">Rejection Reason (Required)</Label>
            <Textarea
              id="reject-reason"
              placeholder="Explain why this qualification is being rejected..."
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
              Reject Qualification
            </Button>
          </DialogFooter>
        </DialogContent>
      </dialogue>
    </>
  );
}
