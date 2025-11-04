/**
 * Real-time System Testing Page
 * Testing interface for SSE and real-time events
 */

'use client';

import React, { useState } from 'react';
import { useRealtime } from '@/lib/hooks/useRealtime';
import { RealtimeEventType } from '@/lib/realtime/event-emitter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ConnectionStatus } from '@/components/realtime/ConnectionStatus';
import { LiveActivityFeed } from '@/components/realtime/LiveActivityFeed';
import { NotificationBell } from '@/components/realtime/NotificationBell';
import {
  Briefcase,
  UserCheck,
  Calendar,
  DollarSign,
  Bell,
  RefreshCw,
  Trash2,
} from 'lucide-react';
import { NotificationType } from '@/lib/realtime/notification-service';

export default function RealtimeTestPage() {
  const { status, events, clearEvents, connect, disconnect } = useRealtime();
  const [loading, setLoading] = useState<string | null>(null);

  // Test functions to trigger events
  const triggerJobCreated = async () => {
    setLoading('job_created');
    try {
      const response = await fetch('/api/realtime/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Test: New Job Created',
          message: `Test job #${Math.floor(Math.random() * 10000)} has been created`,
          type: NotificationType.JOB_ASSIGNED,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create test notification');
      }
    } catch (error) {
      console.error('Error triggering job created event:', error);
    } finally {
      setLoading(null);
    }
  };

  const triggerContractorAssigned = async () => {
    setLoading('contractor_assigned');
    try {
      const response = await fetch('/api/realtime/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Test: Contractor Assigned',
          message: 'Test contractor has been assigned to a job',
          type: NotificationType.JOB_ASSIGNED,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create test notification');
      }
    } catch (error) {
      console.error('Error triggering contractor assigned event:', error);
    } finally {
      setLoading(null);
    }
  };

  const triggerScheduleUpdated = async () => {
    setLoading('schedule_updated');
    try {
      const response = await fetch('/api/realtime/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Test: Schedule Updated',
          message: 'Test appointment has been scheduled',
          type: NotificationType.APPOINTMENT_SCHEDULED,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create test notification');
      }
    } catch (error) {
      console.error('Error triggering schedule updated event:', error);
    } finally {
      setLoading(null);
    }
  };

  const triggerPaymentReceived = async () => {
    setLoading('payment_received');
    try {
      const response = await fetch('/api/realtime/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Test: Payment Received',
          message: `Test payment of $${(Math.random() * 1000).toFixed(2)} received`,
          type: NotificationType.PAYMENT_RECEIVED,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create test notification');
      }
    } catch (error) {
      console.error('Error triggering payment received event:', error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Real-time System Test</h1>
          <p className="text-muted-foreground mt-1">
            Test SSE connections and real-time event emissions
          </p>
        </div>
        <div className="flex items-center gap-4">
          <NotificationBell />
          <ConnectionStatus showText />
        </div>
      </div>

      {/* Connection Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Connection Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button
              onClick={connect}
              disabled={status.connected}
              variant={status.connected ? 'outline' : 'default'}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Connect
            </Button>
            <Button
              onClick={disconnect}
              disabled={!status.connected}
              variant="outline"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Disconnect
            </Button>
            <div className="flex-1" />
            <div className="text-sm text-muted-foreground">
              Status:{' '}
              {status.connected ? (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Connected
                </Badge>
              ) : status.reconnecting ? (
                <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                  Reconnecting
                </Badge>
              ) : (
                <Badge variant="outline" className="text-red-600 border-red-600">
                  Disconnected
                </Badge>
              )}
            </div>
          </div>
          {status.error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">Error: {status.error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Test Event Triggers */}
      <Card>
        <CardHeader>
          <CardTitle>Test Event Triggers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              onClick={triggerJobCreated}
              disabled={!status.connected || loading !== null}
              className="h-20"
            >
              <div className="flex flex-col items-center gap-2">
                <Briefcase className="h-5 w-5" />
                <span className="text-sm">Job Created</span>
              </div>
            </Button>

            <Button
              onClick={triggerContractorAssigned}
              disabled={!status.connected || loading !== null}
              className="h-20"
            >
              <div className="flex flex-col items-center gap-2">
                <UserCheck className="h-5 w-5" />
                <span className="text-sm">Contractor Assigned</span>
              </div>
            </Button>

            <Button
              onClick={triggerScheduleUpdated}
              disabled={!status.connected || loading !== null}
              className="h-20"
            >
              <div className="flex flex-col items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span className="text-sm">Schedule Updated</span>
              </div>
            </Button>

            <Button
              onClick={triggerPaymentReceived}
              disabled={!status.connected || loading !== null}
              className="h-20"
            >
              <div className="flex flex-col items-center gap-2">
                <DollarSign className="h-5 w-5" />
                <span className="text-sm">Payment Received</span>
              </div>
            </Button>
          </div>

          {loading && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-600">
                Triggering event: {loading.replace(/_/g, ' ')}...
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Event Log */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Event Log</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={clearEvents}
              disabled={events.length === 0}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              {events.length === 0 ? (
                <div className="flex items-center justify-center h-full text-center p-8">
                  <div>
                    <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">
                      No events received yet
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Trigger test events using the buttons above
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {events.map((event, index) => (
                    <div
                      key={`${event.timestamp}-${index}`}
                      className="p-3 border rounded-lg bg-card"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <Badge variant="secondary">{event.type}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(event.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                        {JSON.stringify(event.payload, null, 2)}
                      </pre>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Live Activity Feed */}
        <LiveActivityFeed maxItems={15} />
      </div>
    </div>
  );
}
