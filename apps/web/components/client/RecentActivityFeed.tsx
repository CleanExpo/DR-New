'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  Clock,
  MessageSquare,
  UserPlus,
  FileText,
  AlertCircle,
  DollarSign,
  Calendar,
  LucideIcon,
} from 'lucide-react';

export interface Activity {
  id: string;
  type: 'request_created' | 'status_update' | 'message_received' | 'contractor_matched' | 'payment' | 'booking' | 'alert';
  title: string;
  description?: string;
  timestamp: string;
  icon?: LucideIcon;
  metadata?: {
    requestTitle?: string;
    contractorName?: string;
    amount?: number;
    status?: string;
  };
}

interface RecentActivityFeedProps {
  activities: Activity[];
  limit?: number;
  title?: string;
  emptyMessage?: string;
  className?: string;
}

const activityIcons: Record<string, LucideIcon> = {
  request_created: FileText,
  status_update: CheckCircle,
  message_received: MessageSquare,
  contractor_matched: UserPlus,
  payment: DollarSign,
  booking: Calendar,
  alert: AlertCircle,
};

const activityColors: Record<string, string> = {
  request_created: 'bg-blue-100 text-blue-700',
  status_update: 'bg-green-100 text-green-700',
  message_received: 'bg-purple-100 text-purple-700',
  contractor_matched: 'bg-semantic-contractor/10 text-semantic-contractor',
  payment: 'bg-yellow-100 text-yellow-700',
  booking: 'bg-indigo-100 text-indigo-700',
  alert: 'bg-dr-emergency/10 text-dr-emergency',
};

export function RecentActivityFeed({
  activities,
  limit = 10,
  title = 'Recent Activity',
  emptyMessage = 'No recent activity',
  className = '',
}: RecentActivityFeedProps) {
  const displayedActivities = activities.slice(0, limit);

  const getRelativeTime = (timestamp: string) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - activityTime.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return activityTime.toLocaleDateString('en-AU', { month: 'short', day: 'numeric' });
  };

  return (
    <Card className={`bg-portal-card rounded-xl border border-portal-border shadow-lg ${className}`}>
      <CardHeader className="pb-3 border-b border-portal-border">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
          <Badge variant="outline" className="border-portal-border text-portal-muted">
            {activities.length} {activities.length === 1 ? 'item' : 'items'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {displayedActivities.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="h-12 w-12 text-portal-muted mx-auto mb-3 opacity-50" />
            <p className="text-portal-muted">{emptyMessage}</p>
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[30px] top-0 bottom-0 w-0.5 bg-portal-border" />

            {/* Activity items */}
            <div className="divide-y divide-portal-border">
              {displayedActivities.map((activity, index) => {
                const Icon = activity.icon || activityIcons[activity.type] || Clock;
                const colorClass = activityColors[activity.type] || 'bg-gray-100 text-gray-700';

                return (
                  <div
                    key={activity.id}
                    className="relative px-6 py-4 hover:bg-portal-hover transition-colors group"
                  >
                    {/* Icon */}
                    <div
                      className={`absolute left-[22px] top-5 w-4 h-4 rounded-full flex items-center justify-center
                                  ${colorClass} z-10 border-2 border-portal-card group-hover:border-portal-hover transition-colors`}
                    >
                      <Icon className="h-2.5 w-2.5" />
                    </div>

                    {/* Content */}
                    <div className="ml-8">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-sm mb-1 leading-snug">
                            {activity.title}
                          </p>
                          {activity.description && (
                            <p className="text-portal-muted text-sm leading-relaxed line-clamp-2">
                              {activity.description}
                            </p>
                          )}

                          {/* Metadata */}
                          {activity.metadata && (
                            <div className="flex flex-wrap gap-3 mt-2">
                              {activity.metadata.requestTitle && (
                                <span className="text-xs text-portal-muted">
                                  Request: <span className="text-gray-900 font-medium">{activity.metadata.requestTitle}</span>
                                </span>
                              )}
                              {activity.metadata.contractorName && (
                                <span className="text-xs text-portal-muted">
                                  Contractor: <span className="text-gray-900 font-medium">{activity.metadata.contractorName}</span>
                                </span>
                              )}
                              {activity.metadata.amount && (
                                <span className="text-xs text-portal-muted">
                                  Amount: <span className="text-gray-900 font-medium">${activity.metadata.amount}</span>
                                </span>
                              )}
                              {activity.metadata.status && (
                                <Badge variant="outline" className="text-xs border-portal-border">
                                  {activity.metadata.status}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Timestamp */}
                        <span className="text-xs text-portal-muted whitespace-nowrap">
                          {getRelativeTime(activity.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* View all link */}
        {activities.length > limit && (
          <div className="px-6 py-3 border-t border-portal-border bg-portal-hover">
            <button className="text-sm text-semantic-contractor hover:underline font-medium">
              View all {activities.length} activities →
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
