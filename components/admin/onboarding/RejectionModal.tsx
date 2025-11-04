'use client';

import { useState } from 'react';
import { ContractorApplication, REJECTION_REASONS, RejectionReason } from '@/lib/types/contractor-onboarding';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, XCircle } from 'lucide-react';

interface RejectionModalProps {
  open: boolean;
  onClose: () => void;
  contractor: ContractorApplication;
  onConfirm: (reason: RejectionReason, feedback: string, internalNotes: string) => void;
}

export function RejectionModal({
  open,
  onClose,
  contractor,
  onConfirm
}: RejectionModalProps) {
  const [reason, setReason] = useState<RejectionReason | ''>('');
  const [feedback, setFeedback] = useState('');
  const [internalNotes, setInternalNotes] = useState('');

  const handleConfirm = () => {
    if (!reason || !feedback.trim()) return;
    onConfirm(reason as RejectionReason, feedback, internalNotes);
    // Reset form
    setReason('');
    setFeedback('');
    setInternalNotes('');
  };

  const handleClose = () => {
    setReason('');
    setFeedback('');
    setInternalNotes('');
    onClose();
  };

  const getFeedbackPlaceholder = () => {
    const placeholders: Record<string, string> = {
      INSUFFICIENT_QUALIFICATIONS:
        'Please specify which qualifications are insufficient or expired and what is needed to meet requirements...',
      INSURANCE_INADEQUATE:
        'Please detail the insurance coverage issues (e.g., coverage amount below minimum, policy expired, wrong type of coverage)...',
      BUSINESS_VERIFICATION_FAILED:
        'Please explain what business verification issues were found (e.g., ABN not valid, business not registered, mismatch in details)...',
      SERVICE_AREA_CONFLICT:
        'Please describe the service area conflict (e.g., overlapping territory with existing contractor, area already at capacity)...',
      INCOMPLETE_APPLICATION:
        'Please list the missing documents or information needed to complete the application...',
      OTHER: 'Please provide detailed feedback about why this application is being rejected...',
    };
    return placeholders[reason as string] || 'Please provide detailed feedback...';
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl text-red-600">
            <XCircle className="w-6 h-6" />
            Reject Contractor Application
          </DialogTitle>
          <DialogDescription>
            You are about to reject the application from{' '}
            <span className="font-semibold">
              {contractor.companyProfile?.companyName || contractor.username}
            </span>
            . This action will send a rejection email to the contractor.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* Rejection Reason */}
          <div>
            <Label htmlFor="rejection-reason">Rejection Reason (Required)</Label>
            <Select value={reason} onValueChange={(value) => setReason(value as RejectionReason)}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select a rejection reason" />
              </SelectTrigger>
              <SelectContent>
                {REJECTION_REASONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Contractor Feedback */}
          <div>
            <Label htmlFor="contractor-feedback">
              Feedback for Contractor (Required)
            </Label>
            <p className="text-xs text-gray-500 mt-1 mb-2">
              This message will be sent to the contractor. Be professional and constructive.
            </p>
            <Textarea
              id="contractor-feedback"
              placeholder={getFeedbackPlaceholder()}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={6}
              className="mt-2"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              {feedback.length} characters (minimum 50 recommended)
            </p>
          </div>

          {/* Internal Notes */}
          <div>
            <Label htmlFor="internal-notes">Internal Notes (Optional)</Label>
            <p className="text-xs text-gray-500 mt-1 mb-2">
              These notes are for internal use only and will not be sent to the contractor.
            </p>
            <Textarea
              id="internal-notes"
              placeholder="Add any internal notes about this rejection..."
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              rows={3}
              className="mt-2"
            />
          </div>

          {/* Warning Alert */}
          <Alert variant="destructive">
            <AlertTriangle className="w-4 h-4" />
            <AlertDescription>
              <strong className="block mb-2">Important:</strong>
              <ul className="space-y-1 text-sm list-disc list-inside">
                <li>The contractor will receive a rejection email with your feedback</li>
                <li>They will be able to reapply after addressing the issues</li>
                <li>Their application data will be preserved for reference</li>
                <li>
                  Any payments made will be handled according to the refund policy
                </li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={!reason || feedback.trim().length < 20}
          >
            <XCircle className="w-4 h-4 mr-2" />
            Reject Application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
