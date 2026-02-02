'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Shield,
  FileText,
  Calendar,
  DollarSign,
  Phone,
  Mail,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Edit,
} from 'lucide-react';

export interface InsurancePolicy {
  id: string;
  provider: string;
  policyNumber: string;
  policyType: string;
  coverageAmount: number;
  deductible?: number;
  currency?: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'pending' | 'cancelled';
  coverageItems?: string[];
  exclusions?: string[];
  contactPhone?: string;
  contactEmail?: string;
  claimNumber?: string;
  policyDocumentUrl?: string;
}

interface InsuranceInfoCardProps {
  policy: InsurancePolicy | null;
  onEditPolicy?: () => void;
  onFileClaimClick?: () => void;
  onViewDocument?: (url: string) => void;
  showClaimButton?: boolean;
  title?: string;
  className?: string;
}

const formatCurrency = (amount: number, currency = 'AUD'): string => {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency,
  }).format(amount);
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const getStatusConfig = (status: InsurancePolicy['status']) => {
  switch (status) {
    case 'active':
      return {
        label: 'Active',
        className: 'bg-green-100 text-green-700 border-green-200',
        icon: CheckCircle,
      };
    case 'expired':
      return {
        label: 'Expired',
        className: 'bg-red-100 text-red-700 border-red-200',
        icon: AlertTriangle,
      };
    case 'pending':
      return {
        label: 'Pending',
        className: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        icon: Calendar,
      };
    case 'cancelled':
      return {
        label: 'Cancelled',
        className: 'bg-gray-100 text-gray-700 border-gray-200',
        icon: AlertTriangle,
      };
  }
};

const isExpiringSoon = (endDate: string): boolean => {
  const daysUntilExpiry = Math.ceil(
    (new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
};

export function InsuranceInfoCard({
  policy,
  onEditPolicy,
  onFileClaimClick,
  onViewDocument,
  showClaimButton = true,
  title = 'Insurance Coverage',
  className = '',
}: InsuranceInfoCardProps) {
  if (!policy) {
    return (
      <Card className={`bg-portal-card rounded-xl border border-portal-border shadow-lg ${className}`}>
        <CardHeader className="pb-3 border-b border-portal-border">
          <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-12">
            <Shield className="h-16 w-16 text-portal-muted mx-auto mb-4 opacity-50" />
            <p className="text-portal-muted font-medium mb-2">No Insurance Policy on File</p>
            <p className="text-sm text-portal-muted mb-4">
              Add your insurance details to streamline claims
            </p>
            {onEditPolicy && (
              <Button
                onClick={onEditPolicy}
                className="bg-semantic-contractor hover:bg-semantic-contractor/90 text-white"
              >
                Add Insurance Policy
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  const statusConfig = getStatusConfig(policy.status);
  const StatusIcon = statusConfig.icon;
  const expiringSoon = isExpiringSoon(policy.endDate);

  return (
    <Card className={`bg-portal-card rounded-xl border border-portal-border shadow-lg ${className}`}>
      <CardHeader className="pb-3 border-b border-portal-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-semantic-contractor/20 to-blue-500/20 p-3 rounded-lg">
              <Shield className="h-6 w-6 text-semantic-contractor" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
              <p className="text-sm text-portal-muted mt-0.5">{policy.provider}</p>
            </div>
          </div>
          {onEditPolicy && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onEditPolicy}
              className="hover:bg-portal-hover"
            >
              <Edit className="h-4 w-4 text-portal-muted" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Status and Warning */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className={`${statusConfig.className}`}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {statusConfig.label}
            </Badge>
            {expiringSoon && policy.status === 'active' && (
              <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-200">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Expiring Soon
              </Badge>
            )}
          </div>
          {expiringSoon && policy.status === 'active' && (
            <p className="text-sm text-yellow-700">
              Your policy expires on {formatDate(policy.endDate)}. Consider renewing soon.
            </p>
          )}
        </div>

        {/* Policy Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Policy Number */}
          <div className="bg-portal-hover rounded-lg p-3">
            <p className="text-xs text-portal-muted mb-1">Policy Number</p>
            <p className="text-sm font-semibold text-gray-900 font-mono">{policy.policyNumber}</p>
          </div>

          {/* Policy Type */}
          <div className="bg-portal-hover rounded-lg p-3">
            <p className="text-xs text-portal-muted mb-1">Policy Type</p>
            <p className="text-sm font-semibold text-gray-900">{policy.policyType}</p>
          </div>

          {/* Coverage Amount */}
          <div className="bg-portal-hover rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="h-3 w-3 text-portal-muted" />
              <p className="text-xs text-portal-muted">Coverage Amount</p>
            </div>
            <p className="text-sm font-semibold text-gray-900">
              {formatCurrency(policy.coverageAmount, policy.currency)}
            </p>
          </div>

          {/* Deductible */}
          {policy.deductible && (
            <div className="bg-portal-hover rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="h-3 w-3 text-portal-muted" />
                <p className="text-xs text-portal-muted">Deductible</p>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {formatCurrency(policy.deductible, policy.currency)}
              </p>
            </div>
          )}

          {/* Policy Period */}
          <div className="bg-portal-hover rounded-lg p-3 md:col-span-2">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-3 w-3 text-portal-muted" />
              <p className="text-xs text-portal-muted">Policy Period</p>
            </div>
            <p className="text-sm font-semibold text-gray-900">
              {formatDate(policy.startDate)} - {formatDate(policy.endDate)}
            </p>
          </div>
        </div>

        {/* Coverage Items */}
        {policy.coverageItems && policy.coverageItems.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Coverage Includes</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {policy.coverageItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Exclusions */}
        {policy.exclusions && policy.exclusions.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Exclusions</h4>
            <div className="space-y-1">
              {policy.exclusions.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-portal-muted">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Information */}
        {(policy.contactPhone || policy.contactEmail) && (
          <div className="mb-6 p-4 bg-portal-hover rounded-lg">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Provider Contact</h4>
            <div className="space-y-2">
              {policy.contactPhone && (
                <a
                  href={`tel:${policy.contactPhone}`}
                  className="flex items-center gap-2 text-sm text-semantic-contractor hover:text-semantic-contractor/80 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {policy.contactPhone}
                </a>
              )}
              {policy.contactEmail && (
                <a
                  href={`mailto:${policy.contactEmail}`}
                  className="flex items-center gap-2 text-sm text-semantic-contractor hover:text-semantic-contractor/80 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {policy.contactEmail}
                </a>
              )}
            </div>
          </div>
        )}

        {/* Active Claim */}
        {policy.claimNumber && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-blue-900 mb-1">Active Claim</h4>
                <p className="text-sm text-blue-700">Claim #{policy.claimNumber}</p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          {showClaimButton && onFileClaimClick && policy.status === 'active' && !policy.claimNumber && (
            <Button
              onClick={onFileClaimClick}
              className="bg-semantic-contractor hover:bg-semantic-contractor/90 text-white"
            >
              <FileText className="h-4 w-4 mr-2" />
              File a Claim
            </Button>
          )}
          {policy.policyDocumentUrl && onViewDocument && (
            <Button
              variant="outline"
              onClick={() => onViewDocument(policy.policyDocumentUrl!)}
              className="border-portal-border hover:border-semantic-contractor"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Policy Document
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
