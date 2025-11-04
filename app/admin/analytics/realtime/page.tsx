'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { MetricCard } from '@/components/analytics/MetricCard';
import {
  Users,
  Briefcase,
  DollarSign,
  UserPlus,
  Activity,
  MapPin,
  TrendingUp,
} from 'lucide-react';
import { formatCurrency, formatActivityTime } from '@/lib/analytics-utils';

interface LiveActivity {
  id: string;
  timestamp: Date;
  user: string;
  action: string;
  description: string;
  type: 'job' | 'payment' | 'contractor' | 'client';
}

interface LiveMetrics {
  activeUsers: number;
  jobsToday: number;
  revenueToday: number;
  newContractors: number;
}

export default function RealtimeAnalytics() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<LiveMetrics>({
    activeUsers: 12,
    jobsToday: 8,
    revenueToday: 24500,
    newContractors: 2,
  });
  const [activities, setActivities] = useState<LiveActivity[]>([]);
  const activityFeedRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    setLoading(false);

    // Initial activities
    const initialActivities: LiveActivity[] = [
      {
        id: '1',
        timestamp: new Date(Date.now() - 2 * 60000),
        user: 'Admin User',
        action: 'Job Created',
        description: 'Water damage emergency - Brisbane CBD',
        type: 'job',
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 5 * 60000),
        user: 'John Smith',
        action: 'Job Completed',
        description: 'Fire restoration - Gold Coast',
        type: 'job',
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 8 * 60000),
        user: 'System',
        action: 'Payment Received',
        description: '$4,500 - Job #JOB-2024-195',
        type: 'payment',
      },
    ];
    setActivities(initialActivities);

    // Simulate new activities every 10 seconds
    const activityInterval = setInterval(() => {
      const randomActivities: Omit<LiveActivity, 'id' | 'timestamp'>[] = [
        {
          user: 'Sarah Johnson',
          action: 'Job Started',
          description: 'Mould remediation - Ipswich',
          type: 'job',
        },
        {
          user: 'System',
          action: 'Payment Received',
          description: `${formatCurrency(Math.floor(Math.random() * 10000) + 2000)} - Job payment`,
          type: 'payment',
        },
        {
          user: 'Admin User',
          action: 'Contractor Approved',
          description: 'New contractor registration approved',
          type: 'contractor',
        },
        {
          user: 'Mike Williams',
          action: 'Job Updated',
          description: 'Status changed to In Progress',
          type: 'job',
        },
        {
          user: 'System',
          action: 'Client Registered',
          description: 'New client account created',
          type: 'client',
        },
      ];

      const randomActivity = randomActivities[Math.floor(Math.random() * randomActivities.length)];
      const newActivity: LiveActivity = {
        id: Date.now().toString(),
        timestamp: new Date(),
        ...randomActivity,
      };

      setActivities((prev) => [newActivity, ...prev].slice(0, 50));
    }, 10000);

    // Update metrics every 5 seconds
    const metricsInterval = setInterval(() => {
      setMetrics((prev) => ({
        activeUsers: prev.activeUsers + (Math.random() > 0.5 ? 1 : -1),
        jobsToday: prev.jobsToday + (Math.random() > 0.7 ? 1 : 0),
        revenueToday: prev.revenueToday + (Math.random() > 0.6 ? Math.floor(Math.random() * 5000) : 0),
        newContractors: prev.newContractors + (Math.random() > 0.9 ? 1 : 0),
      }));
    }, 5000);

    return () => {
      clearInterval(activityInterval);
      clearInterval(metricsInterval);
    };
  }, []);

  // Auto-scroll to top when new activity arrives
  useEffect(() => {
    if (autoScroll && activityFeedRef.current) {
      activityFeedRef.current.scrollTop = 0;
    }
  }, [activities, autoScroll]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'job':
        return <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      case 'payment':
        return <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case 'contractor':
        return <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
      case 'client':
        return <UserPlus className="h-5 w-5 text-orange-600 dark:text-orange-400" />;
      default:
        return <Activity className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'job':
        return 'bg-blue-100 dark:bg-blue-900/20';
      case 'payment':
        return 'bg-green-100 dark:bg-green-900/20';
      case 'contractor':
        return 'bg-purple-100 dark:bg-purple-900/20';
      case 'client':
        return 'bg-orange-100 dark:bg-orange-900/20';
      default:
        return 'bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Real-time Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Live dashboard with auto-updating metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-100 dark:bg-green-900/20">
            <div className="relative">
              <div className="h-2 w-2 rounded-full bg-green-600 dark:bg-green-400" />
              <div className="absolute inset-0 h-2 w-2 rounded-full bg-green-600 dark:bg-green-400 animate-ping" />
            </div>
            <span className="text-sm font-medium text-green-700 dark:text-green-400">
              Live
            </span>
          </div>
        </div>
      </div>

      {/* Live Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Users Online"
          value={metrics.activeUsers}
          icon={Users}
          color="text-blue-600"
          description="Currently browsing"
          loading={loading}
        />
        <MetricCard
          title="Jobs Created Today"
          value={metrics.jobsToday}
          icon={Briefcase}
          color="text-purple-600"
          description="New jobs today"
          loading={loading}
        />
        <MetricCard
          title="Revenue Today"
          value={formatCurrency(metrics.revenueToday)}
          icon={DollarSign}
          color="text-green-600"
          description="Total revenue today"
          loading={loading}
        />
        <MetricCard
          title="New Contractors"
          value={metrics.newContractors}
          icon={UserPlus}
          color="text-orange-600"
          description="Registrations today"
          loading={loading}
        />
      </div>

      {/* Live Activity Feed */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              Live Activity Feed
            </CardTitle>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <input
                  type="checkbox"
                  checked={autoScroll}
                  onChange={(e) => setAutoScroll(e.target.checked)}
                  className="rounded"
                />
                Auto-scroll
              </label>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div
            ref={activityFeedRef}
            className="space-y-3 max-h-[600px] overflow-y-auto"
          >
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse" />
                  </div>
                </div>
              ))
            ) : activities.length === 0 ? (
              <div className="text-center py-12">
                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  No activities yet. Waiting for live updates...
                </p>
              </div>
            ) : (
              activities.map((activity, index) => (
                <div
                  key={activity.id}
                  className={`flex gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 transition-all ${
                    index === 0 ? 'animate-fade-in border-blue-300 dark:border-blue-700' : ''
                  }`}
                  style={{
                    animation: index === 0 ? 'fadeIn 0.5s ease-in' : undefined,
                  }}
                >
                  <div className="flex-shrink-0">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${getActivityColor(
                        activity.type
                      )}`}
                    >
                      {getActivityIcon(activity.type)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {activity.action}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {activity.description}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {formatActivityTime(activity.timestamp)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      By {activity.user}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Live Map Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-red-600" />
            Active Jobs Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-[400px] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  Interactive map showing active job locations
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                  Integrate Google Maps API for live job tracking
                </p>
              </div>
            </div>
            {/* Pulsing markers simulation */}
            <div className="absolute top-1/4 left-1/3">
              <div className="relative">
                <div className="h-4 w-4 rounded-full bg-blue-600" />
                <div className="absolute inset-0 h-4 w-4 rounded-full bg-blue-600 animate-ping opacity-75" />
              </div>
            </div>
            <div className="absolute top-1/2 right-1/3">
              <div className="relative">
                <div className="h-4 w-4 rounded-full bg-green-600" />
                <div className="absolute inset-0 h-4 w-4 rounded-full bg-green-600 animate-ping opacity-75" />
              </div>
            </div>
            <div className="absolute bottom-1/3 left-1/2">
              <div className="relative">
                <div className="h-4 w-4 rounded-full bg-red-600" />
                <div className="absolute inset-0 h-4 w-4 rounded-full bg-red-600 animate-ping opacity-75" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in;
        }
      `}</style>
    </div>
  );
}
