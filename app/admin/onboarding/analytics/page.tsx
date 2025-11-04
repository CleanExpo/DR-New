'use client';

import { useState, useEffect } from 'react';
import { OnboardingAnalytics } from '@/lib/types/contractor-onboarding';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  BarChart3,
  Calendar,
  MapPin
} from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/lib/hooks/use-toast';

export default function AnalyticsPage() {
  const { toast } = useToast();
  const [analytics, setAnalytics] = useState<OnboardingAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/onboarding/analytics');
      if (!response.ok) throw new Error('Failed to fetch analytics');

      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load analytics',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!analytics) {
    return null;
  }

  const getTrendIcon = (change: number) => {
    if (change > 0) {
      return <TrendingUp className="w-4 h-4 text-green-600" />;
    } else if (change < 0) {
      return <TrendingDown className="w-4 h-4 text-red-600" />;
    }
    return null;
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            {getTrendIcon(analytics.monthlyGrowth)}
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {analytics.applicationsThisMonth}
          </h3>
          <p className="text-sm text-gray-600">Applications This Month</p>
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-xs font-medium ${getTrendColor(analytics.monthlyGrowth)}`}>
              {analytics.monthlyGrowth > 0 ? '+' : ''}
              {analytics.monthlyGrowth.toFixed(1)}%
            </span>
            <span className="text-xs text-gray-500">vs last month</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            {getTrendIcon(analytics.averageApprovalTimeChange)}
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {analytics.averageApprovalTime.toFixed(1)}
          </h3>
          <p className="text-sm text-gray-600">Avg. Approval Time (days)</p>
          <div className="flex items-center gap-2 mt-2">
            <span
              className={`text-xs font-medium ${getTrendColor(
                analytics.averageApprovalTimeChange
              )}`}
            >
              {analytics.averageApprovalTimeChange > 0 ? '+' : ''}
              {analytics.averageApprovalTimeChange.toFixed(1)}%
            </span>
            <span className="text-xs text-gray-500">vs last period</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            {getTrendIcon(analytics.approvalRateChange)}
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {analytics.approvalRate.toFixed(1)}%
          </h3>
          <p className="text-sm text-gray-600">Approval Rate</p>
          <div className="flex items-center gap-2 mt-2">
            <span
              className={`text-xs font-medium ${getTrendColor(analytics.approvalRateChange)}`}
            >
              {analytics.approvalRateChange > 0 ? '+' : ''}
              {analytics.approvalRateChange.toFixed(1)}%
            </span>
            <span className="text-xs text-gray-500">vs last period</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {(100 - analytics.approvalRate).toFixed(1)}%
          </h3>
          <p className="text-sm text-gray-600">Rejection Rate</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-gray-500">
              {analytics.topRejectionReasons[0]?.count || 0} rejections
            </span>
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Rejection Reasons */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Top Rejection Reasons</h3>
          <div className="space-y-4">
            {analytics.topRejectionReasons.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No rejections yet</p>
            ) : (
              analytics.topRejectionReasons.map((reason, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-900">{reason.reason}</span>
                    <span className="text-gray-600">
                      {reason.count} ({reason.percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full transition-all"
                      style={{ width: `${reason.percentage}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Applications by Service Type */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Applications by Service Type</h3>
          <div className="space-y-4">
            {analytics.applicationsByServiceType.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No data available</p>
            ) : (
              analytics.applicationsByServiceType.map((service, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {service.serviceType}
                    </span>
                  </div>
                  <Badge variant="secondary">{service.count}</Badge>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Applications by State */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Applications by State</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {analytics.applicationsByState.length === 0 ? (
            <p className="col-span-4 text-center text-gray-500 py-8">No data available</p>
          ) : (
            analytics.applicationsByState.map((state, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-gray-900">{state.state}</span>
                </div>
                <Badge variant="secondary">{state.count}</Badge>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Approvals */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Approvals</h3>
            <Badge variant="default" className="bg-green-600">
              {analytics.recentApprovals.length}
            </Badge>
          </div>
          <div className="space-y-3">
            {analytics.recentApprovals.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No recent approvals</p>
            ) : (
              analytics.recentApprovals.slice(0, 5).map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {app.companyProfile?.companyName || app.username}
                    </p>
                    <p className="text-xs text-gray-600">{app.email}</p>
                  </div>
                  <div className="text-right">
                    <CheckCircle className="w-5 h-5 text-green-600 mb-1" />
                    <p className="text-xs text-gray-500">
                      {app.approvedAt && format(new Date(app.approvedAt), 'dd MMM')}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Recent Rejections */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Rejections</h3>
            <Badge variant="destructive">{analytics.recentRejections.length}</Badge>
          </div>
          <div className="space-y-3">
            {analytics.recentRejections.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No recent rejections</p>
            ) : (
              analytics.recentRejections.slice(0, 5).map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {app.companyProfile?.companyName || app.username}
                    </p>
                    <p className="text-xs text-gray-600">{app.email}</p>
                  </div>
                  <div className="text-right">
                    <XCircle className="w-5 h-5 text-red-600 mb-1" />
                    <p className="text-xs text-gray-500">
                      {app.rejectedAt && format(new Date(app.rejectedAt), 'dd MMM')}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Applications Over Time */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Applications Over Time</h3>
        <div className="h-64 flex items-end justify-between gap-2">
          {analytics.applicationsOverTime.length === 0 ? (
            <p className="w-full text-center text-gray-500 py-8">No data available</p>
          ) : (
            analytics.applicationsOverTime.map((data, index) => {
              const maxCount = Math.max(
                ...analytics.applicationsOverTime.map((d) => d.count)
              );
              const height = (data.count / maxCount) * 100;

              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-blue-500 rounded-t-lg hover:bg-blue-600 transition-colors"
                    style={{ height: `${height}%`, minHeight: '20px' }}
                  />
                  <div className="text-center">
                    <p className="text-xs font-medium text-gray-900">{data.count}</p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(data.date), 'dd MMM')}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Card>
    </div>
  );
}
