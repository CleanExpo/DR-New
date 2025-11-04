'use client';

import { ContractorApplication } from '@/lib/types/contractor-onboarding';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';
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
import { cn } from '@/lib/utils';

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
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            {/* Avatar with status indicator */}
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {application.companyProfile?.companyName?.[0] || application.username[0].toUpperCase()}
              </div>
              <div className={cn(
                'absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white dark:border-gray-800',
                application.status === 'APPROVED' && 'bg-green-500',
                application.status === 'PENDING' && 'bg-yellow-500',
                application.status === 'UNDER_REVIEW' && 'bg-blue-500',
                application.status === 'REJECTED' && 'bg-red-500'
              )} />
            </div>

            {/* Info */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {application.companyProfile?.companyName || application.username}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{application.email}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">{application.mobileNumber}</p>
            </div>
          </div>

          {/* Status Badge */}
          {getStatusBadge(application.status)}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 py-5 border-y border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">ABN</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {application.companyProfile?.abn || 'N/A'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
              <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Qualifications</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{application.certifications.length}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Insurance</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{application.insurance.length}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Territory</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {application.subscription?.tier?.replace('TIER_', '').replace('KM', 'km') || 'None'}
              </p>
            </div>
          </div>
        </div>

        {/* Submission Date */}
        <div className="flex items-center gap-2 mb-5 px-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
          <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Submitted {formatDistanceToNow(new Date(application.createdAt), { addSuffix: true })}
          </span>
        </div>

        {/* Completion Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Application Completion</span>
            <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {completionPercentage}%
            </span>
          </div>
          <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={cn(
                'h-full rounded-full',
                completionPercentage === 100
                  ? 'bg-gradient-to-r from-green-500 to-green-600'
                  : completionPercentage >= 60
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                  : 'bg-gradient-to-r from-yellow-500 to-orange-500'
              )}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onView}
            className="flex-1 h-11 rounded-xl border-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
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
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white h-11 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Approve
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={onReject}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 h-11 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </Button>
            </>
          ) : null}
        </div>
      </Card>
    </motion.div>
  );
}
