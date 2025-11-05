'use client';

import { useState } from 'react';
import { ContractorApplication } from '@/lib/types/contractor-onboarding';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  CheckCircle2,
  XCircle,
  Info,
  Award,
  Shield,
  Building2,
  Mail,
  CreditCard,
  Users
} from 'lucide-react';

interface ApprovalModalProps {
  open: boolean;
  onClose: () => void;
  contractor: ContractorApplication;
  onConfirm: (notes: string) => void;
}

export function ApprovalModal({
  open,
  onClose,
  contractor,
  onConfirm
}: ApprovalModalProps) {
  const [notes, setNotes] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    onConfirm(notes);
    setNotes('');
    setConfirmed(false);
  };

  const allQualificationsVerified = contractor.certifications.every(
    cert => cert.verified
  );

  const allInsuranceVerified = contractor.insurance.every(
    ins => ins.verified
  );

  const hasValidABN = contractor.companyProfile?.abnVerified || false;

  return (
    <dialogue open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-centre gap-2 text-xl">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            Approve Contractor Application
          </DialogTitle>
          <DialogDescription>
            You are about to approve{' '}
            <span className="font-semibold">
              {contractor.companyProfile?.companyName || contractor.username}
            </span>{' '}
            as an NRPG contractor.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* Verification Checklist */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-gray-900">
              Verification Checklist
            </h4>

            <div className="space-y-2">
              <div className="flex items-centre gap-2 text-sm">
                {hasValidABN ? (
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-600" />
                )}
                <Building2 className="w-4 h-4 text-gray-400" />
                <span className={hasValidABN ? 'text-gray-900' : 'text-red-600'}>
                  Business details verified (ABN: {contractor.companyProfile?.abn})
                </span>
              </div>

              <div className="flex items-centre gap-2 text-sm">
                {allQualificationsVerified ? (
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-600" />
                )}
                <Award className="w-4 h-4 text-gray-400" />
                <span
                  className={
                    allQualificationsVerified ? 'text-gray-900' : 'text-red-600'
                  }
                >
                  All IICRC qualifications verified ({contractor.certifications.length} total)
                </span>
              </div>

              <div className="flex items-centre gap-2 text-sm">
                {allInsuranceVerified ? (
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-600" />
                )}
                <Shield className="w-4 h-4 text-gray-400" />
                <span
                  className={allInsuranceVerified ? 'text-gray-900' : 'text-red-600'}
                >
                  Insurance policies current ({contractor.insurance.length} total)
                </span>
              </div>
            </div>
          </div>

          {/* Warning if not all items verified */}
          {(!allQualificationsVerified || !allInsuranceVerified || !hasValidABN) && (
            <Alert variant="destructive">
              <AlertDescription>
                Warning: Not all verification items are complete. Please ensure all
                requirements are met before approving.
              </AlertDescription>
            </Alert>
          )}

          {/* Approval Notes */}
          <div>
            <Label htmlFor="approval-notes">Approval Notes (Optional)</Label>
            <Textarea
              id="approval-notes"
              placeholder="Add any notes about this approval..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="mt-2"
            />
          </div>

          {/* What Happens Next */}
          <Alert>
            <Info className="w-4 h-4" />
            <AlertDescription>
              <strong className="block mb-2">What happens next:</strong>
              <ul className="space-y-1.5 text-sm">
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                  <span>Contractor receives approval email with login credentials</span>
                </li>
                <li className="flex items-start gap-2">
                  <CreditCard className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                  <span>
                    Subscription activation email sent (
                    {contractor.subscription?.tier?.replace('TIER_', '').replace('KM', 'km')} -
                    ${contractor.subscription?.amount}/month)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                  <span>Access to contractor portal granted immediately</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                  <span>Added to job rotation system for their service area</span>
                </li>
              </ul>
            </AlertDescription>
          </Alert>

          {/* Confirmation Checkbox */}
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <Checkbox
              id="confirm-approval"
              checked={confirmed}
              onCheckedChange={(checked) => setConfirmed(checked as boolean)}
            />
            <div className="flex-1">
              <label
                htmlFor="confirm-approval"
                className="text-sm font-medium leading-none cursor-pointer"
              >
                I confirm that I have reviewed all documentation and verified that this
                contractor meets all NRPG requirements.
              </label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleConfirm}
            disabled={!confirmed}
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Approve Contractor
          </Button>
        </DialogFooter>
      </DialogContent>
    </dialogue>
  );
}
