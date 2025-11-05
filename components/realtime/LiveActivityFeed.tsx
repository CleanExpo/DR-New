/**
 * Live Activity Feed Component
 * Displays real-time activity updates
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRealtime } from '@/lib/hooks/useRealtime';
import { RealtimeEventType, RealtimeEvent } from '@/lib/realtime/event-emitter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Briefcase,
  UserCheck,
  Calendar,
  DollarSign,
  Bell,
  Activity,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ActivityFeedProps {
  maxItems?: number;
  filterTypes?: RealtimeEventType[];
  className?: string;
}

export function LiveActivityFeed({
  maxItems = 20,
  filterTypes,
  className = '',
}: ActivityFeedProps) {
  const { events, status } = useRealtime({
    eventTypes: filterTypes,
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  // Auto-scroll to bottom when new events arrive
  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [events, autoScroll]);

  const getEventIcon = (type: RealtimeEventType) => {
    switch (type) {
      case RealtimeEventType.JOB_CREATED:
      case RealtimeEventType.JOB_UPDATED:
      case RealtimeEventType.JOB_STATUS_CHANGED:
        return <Briefcase className="h-4 w-4" />;
      case RealtimeEventType.CONTRACTOR_ASSIGNED:
        return <UserCheck className="h-4 w-4" />;
      case RealtimeEventType.SCHEDULE_UPDATED:
        return <Calendar className="h-4 w-4" />;
      case RealtimeEventType.PAYMENT_RECEIVED:
        return <DollarSign className="h-4 w-4" />;
      case RealtimeEventType.NOTIFICATION:
        return <Bell className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getEventColor = (type: RealtimeEventType) => {
    switch (type) {
      case RealtimeEventType.JOB_CREATED:
        return 'bg-blue-500';
      case RealtimeEventType.JOB_UPDATED:
        return 'bg-yellow-500';
      case RealtimeEventType.JOB_STATUS_CHANGED:
        return 'bg-purple-500';
      case RealtimeEventType.CONTRACTOR_ASSIGNED:
        return 'bg-green-500';
      case RealtimeEventType.SCHEDULE_UPDATED:
        return 'bg-orange-500';
      case RealtimeEventType.PAYMENT_RECEIVED:
        return 'bg-emerald-500';
      case RealtimeEventType.NOTIFICATION:
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatEventMessage = (event: RealtimeEvent) => {
    switch (event.type) {
      case RealtimeEventType.JOB_CREATED:
        return `New job created: ${event.payload.jobNumber}`;
      case RealtimeEventType.JOB_UPDATED:
        return `Job updated: ${event.payload.jobNumber}`;
      case RealtimeEventType.JOB_STATUS_CHANGED:
        return `Job ${event.payload.jobNumber} status changed to ${event.payload.newStatus}`;
      case RealtimeEventType.CONTRACTOR_ASSIGNED:
        return `${event.payload.contractorName} assigned to ${event.payload.jobNumber}`;
      case RealtimeEventType.SCHEDULE_UPDATED:
        return `Appointment scheduled for job`;
      case RealtimeEventType.PAYMENT_RECEIVED:
        return `Payment received: $${event.payload.amount.toFixed(2)} for ${event.payload.invoiceNumber}`;
      case RealtimeEventType.NOTIFICATION:
        return event.payload.message;
      default:
        return 'Activity update';
    }
  };

  const displayEvents = events.slice(0, maxItems);

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-centre justify-between">
          <CardTitle className="text-lg font-semibold flex items-centre gap-2">
            <Activity className="h-5 w-5" />
            Live Activity Feed
          </CardTitle>
          <div className="flex items-centre gap-2">
            {status.connected ? (
              <Badge variant="outline" className="text-green-600 border-green-600">
                <span className="h-2 w-2 rounded-full bg-green-600 mr-2 animate-pulse" />
                Live
              </Badge>
            ) : status.reconnecting ? (
              <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                <span className="h-2 w-2 rounded-full bg-yellow-600 mr-2 animate-pulse" />
                Reconnecting
              </Badge>
            ) : (
              <Badge variant="outline" className="text-red-600 border-red-600">
                <span className="h-2 w-2 rounded-full bg-red-600 mr-2" />
                Offline
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]" ref={scrollRef}>
          {displayEvents.length === 0 ? (
            <div className="flex flex-col items-centre justify-centre h-full text-centre p-8">
              <Activity className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground">
                No recent activity
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                New events will appear here in real-time
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {displayEvents.map((event, index) => (
                <div
                  key={`${event.timestamp}-${index}`}
                  className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div
                    className={`${getEventColor(
                      event.type
                    )} p-2 rounded-full text-white flex-shrink-0`}
                  >
                    {getEventIcon(event.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium leading-tight">
                        {formatEventMessage(event)}
                      </p>
                      <Badge variant="secondary" className="text-xs flex-shrink-0">
                        {event.type.replace(/_/g, ' ')}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(new Date(event.timestamp), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
