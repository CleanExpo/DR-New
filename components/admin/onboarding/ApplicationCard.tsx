'use client';

import { ContractorApplication } from '@/lib/types/contractor-onboarding';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/Card';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Building2,
  Calendar,
  Award,
  Shield,
  MapPin
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ApplicationCardProps {
  application: ContractorApplication;
  onView: () => void;
  onApprove: () => void;
  onReject: () => void;
}

export function ApplicationCard({
  application,
  onView,
  onApprove,
  onReject
}: ApplicationCardProps) {
  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; icon: any; label: string }> = {
      PENDING: {
        variant: 'secondary' as const,
        icon: Clock,
        label: 'Pending Review'
      },
      UNDER_REVIEW: {
        variant: 'default' as const,
        icon: Eye,
        label: 'Under Review'
      },
      APPROVED: {
        variant: 'default' as const,
        icon: CheckCircle2,
        label: 'Approved'
      },
      REJECTED: {
        variant: 'destructive' as const,
        icon: XCircle,
        label: 'Rejected'
      },
    };

    const config = variants[status] || variants.PENDING;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const calculateCompletionPercentage = () => {
    let completed = 0;
    let total = 5;

    if (application.companyProfile) completed++;
    if (application.certifications.length > 0) completed++;
    if (application.insurance.length > 0) completed++;
    if (application.references.length > 0) completed++;
    if (application.subscription) completed++;

    return Math.round((completed / total) * 100);
  };

  const completionPercentage = calculateCompletionPercentage();

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
            {application.companyProfile?.companyName?.[0] || application.username[0].toUpperCase()}
          </div>

          {/* Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {application.companyProfile?.companyName || application.username}
            </h3>
            <p className="text-sm text-gray-600">{application.email}</p>
            <p className="text-sm text-gray-500">{application.mobileNumber}</p>
          </div>
        </div>

        {/* Status Badge */}
        {getStatusBadge(application.status)}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 py-4 border-y border-gray-200">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">ABN</p>
            <p className="text-sm font-medium">
              {application.companyProfile?.abn || 'Not provided'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Qualifications</p>
            <p className="text-sm font-medium">{application.certifications.length}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Insurance</p>
            <p className="text-sm font-medium">{application.insurance.length}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Territory</p>
            <p className="text-sm font-medium">
              {application.subscription?.tier?.replace('TIER_', '').replace('KM', 'km') || 'None'}
            </p>
          </div>
        </div>
      </div>

      {/* Submission Date */}
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-600">
          Submitted {formatDistanceToNow(new Date(application.createdAt), { addSuffix: true })}
        </span>
      </div>

      {/* Completion Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Application Completion</span>
          <span className="text-sm font-medium text-gray-900">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              completionPercentage === 100
                ? 'bg-green-500'
                : completionPercentage >= 60
                ? 'bg-blue-500'
                : 'bg-yellow-500'
            }`}
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onView}
          className="flex-1"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Button>

        {application.status === 'PENDING' || application.status === 'UNDER_REVIEW' ? (
          <>
            <Button
              variant="default"
              size="sm"
              onClick={onApprove}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Approve
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={onReject}
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reject
            </Button>
          </>
        ) : null}
      </div>
    </Card>
  );
}
