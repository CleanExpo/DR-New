import { CheckCircle, AlertCircle, Shield, XCircle, HelpCircle, Ban } from 'lucide-react';
import { cn } from '@/lib/utils';
import { differenceInDays, format } from 'date-fns';

type LicenceStatusValue = 'unverified' | 'verified' | 'expired' | 'suspended';

interface LicenseVerificationBadgeProps {
  licenseState: string;
  licenseExpiry: Date | null;
  isVerified: boolean;
  licenseNumber?: string;
  licenseStatus?: LicenceStatusValue;
  showExpiryWarning?: boolean;
  className?: string;
}

export function LicenseVerificationBadge({
  licenseState,
  licenseExpiry,
  isVerified,
  licenseNumber,
  licenseStatus = 'unverified',
  showExpiryWarning = true,
  className,
}: LicenseVerificationBadgeProps) {
  // Calculate days until expiry
  const daysUntilExpiry = licenseExpiry
    ? differenceInDays(licenseExpiry, new Date())
    : null;

  const isExpiringSoon =
    showExpiryWarning && daysUntilExpiry !== null && daysUntilExpiry < 30 && daysUntilExpiry >= 0;
  const isExpired = licenseStatus === 'expired' || (daysUntilExpiry !== null && daysUntilExpiry < 0);
  const isSuspended = licenseStatus === 'suspended';
  const isLicenceVerified = licenseStatus === 'verified' || (isVerified && !isExpired && !isSuspended);
  const isUnverified = !isLicenceVerified && !isExpired && !isSuspended;

  // Determine badge style based on status
  const badgeConfig = isExpired
    ? {
        bg: 'bg-red-50 border-red-200',
        icon: <XCircle className="h-6 w-6 text-red-600 flex-shrink-0" />,
        labelColour: 'text-red-900',
        detailColour: 'text-red-700',
        label: 'Licence Expired',
      }
    : isSuspended
      ? {
          bg: 'bg-orange-50 border-orange-200',
          icon: <Ban className="h-6 w-6 text-orange-600 flex-shrink-0" />,
          labelColour: 'text-orange-900',
          detailColour: 'text-orange-700',
          label: 'Licence Suspended',
        }
      : isExpiringSoon
        ? {
            bg: 'bg-amber-50 border-amber-200',
            icon: <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0" />,
            labelColour: 'text-amber-900',
            detailColour: 'text-amber-700',
            label: `${licenseState} Licensed`,
          }
        : isLicenceVerified
          ? {
              bg: 'bg-green-50 border-green-200',
              icon: <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />,
              labelColour: 'text-green-900',
              detailColour: 'text-green-700',
              label: `${licenseState} Licensed`,
            }
          : {
              bg: 'bg-gray-50 border-gray-200',
              icon: <HelpCircle className="h-6 w-6 text-gray-400 flex-shrink-0" />,
              labelColour: 'text-gray-700',
              detailColour: 'text-gray-400',
              label: 'Licence Unverified',
            };

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-lg p-4 border',
        badgeConfig.bg,
        className
      )}
    >
      {badgeConfig.icon}

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className={cn('font-semibold', badgeConfig.labelColour)}>
            {badgeConfig.label}
          </span>
          <Shield className="h-4 w-4 text-gray-400" />
        </div>

        {/* Expiry Information */}
        {licenseExpiry && (
          <div className={cn('text-sm', badgeConfig.detailColour)}>
            {isExpired ? (
              <span className="font-medium">
                Expired on {format(licenseExpiry, 'dd MMM yyyy')}
              </span>
            ) : isExpiringSoon ? (
              <span className="font-medium">
                Expires in {daysUntilExpiry} {daysUntilExpiry === 1 ? 'day' : 'days'}
              </span>
            ) : isLicenceVerified ? (
              <span>Valid until {format(licenseExpiry, 'dd MMM yyyy')}</span>
            ) : null}
          </div>
        )}

        {/* Licence Number */}
        {licenseNumber && (
          <div className="text-xs text-gray-400 mt-1">
            Licence: {licenseNumber}
          </div>
        )}

        {/* Unverified hint */}
        {isUnverified && !licenseNumber && (
          <div className={cn('text-xs', badgeConfig.detailColour)}>
            No licence information provided
          </div>
        )}
      </div>
    </div>
  );
}

interface InsuranceVerificationBadgeProps {
  coverageAmount: string;
  expiryDate: Date | null;
  policyNumber?: string;
  insuranceType: 'public_liability' | 'professional_indemnity' | 'work_cover';
  showExpiryWarning?: boolean;
  className?: string;
}

export function InsuranceVerificationBadge({
  coverageAmount,
  expiryDate,
  policyNumber,
  insuranceType,
  showExpiryWarning = true,
  className,
}: InsuranceVerificationBadgeProps) {
  // Calculate days until expiry
  const daysUntilExpiry = expiryDate
    ? differenceInDays(expiryDate, new Date())
    : null;

  const isExpiringSoon =
    showExpiryWarning && daysUntilExpiry !== null && daysUntilExpiry < 30 && daysUntilExpiry >= 0;
  const isExpired = daysUntilExpiry !== null && daysUntilExpiry < 0;

  // Don't render if expired
  if (isExpired) {
    return null;
  }

  // Format insurance type label
  const typeLabel =
    insuranceType === 'public_liability'
      ? 'Public Liability'
      : insuranceType === 'professional_indemnity'
        ? 'Professional Indemnity'
        : 'WorkCover';

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-lg p-4 border',
        isExpiringSoon
          ? 'bg-amber-50 border-amber-200'
          : 'bg-blue-50 border-blue-200',
        className
      )}
    >
      {/* Icon */}
      {isExpiringSoon ? (
        <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0" />
      ) : (
        <Shield className="h-6 w-6 text-blue-600 flex-shrink-0" />
      )}

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={cn(
              'font-semibold',
              isExpiringSoon ? 'text-amber-900' : 'text-blue-900'
            )}
          >
            {typeLabel}
          </span>
          {coverageAmount && (
            <span
              className={cn(
                'text-sm font-medium',
                isExpiringSoon ? 'text-amber-700' : 'text-blue-700'
              )}
            >
              {coverageAmount}
            </span>
          )}
        </div>

        {/* Expiry Information */}
        {expiryDate && (
          <div
            className={cn(
              'text-sm',
              isExpiringSoon ? 'text-amber-700' : 'text-blue-700'
            )}
          >
            {isExpiringSoon ? (
              <span className="font-medium">
                ⚠️ Expires in {daysUntilExpiry} {daysUntilExpiry === 1 ? 'day' : 'days'}
              </span>
            ) : (
              <span>Valid until {format(expiryDate, 'dd MMM yyyy')}</span>
            )}
          </div>
        )}

        {/* Policy Number (if provided) */}
        {policyNumber && (
          <div className="text-xs text-gray-400 mt-1">
            Policy: {policyNumber}
          </div>
        )}
      </div>
    </div>
  );
}

interface FullyInsuredBadgeProps {
  hasPublicLiability: boolean;
  hasWorkCover: boolean;
  hasProfessionalIndemnity?: boolean;
  className?: string;
}

export function FullyInsuredBadge({
  hasPublicLiability,
  hasWorkCover,
  hasProfessionalIndemnity = false,
  className,
}: FullyInsuredBadgeProps) {
  const isFullyInsured = hasPublicLiability && hasWorkCover;

  if (!isFullyInsured) {
    return null;
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full px-4 py-2 font-semibold text-sm shadow-lg',
        className
      )}
    >
      <Shield className="h-4 w-4" />
      <span>Fully Insured</span>
      {hasProfessionalIndemnity && <span className="text-blue-100">+ PI</span>}
    </div>
  );
}
