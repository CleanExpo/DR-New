/**
 * Real-time Dashboard Page
 * Live metrics and monitoring dashboard for admin users
 */

'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LiveMetrics } from '@/components/analytics/LiveMetrics';
import { LiveJobFeed } from '@/components/realtime/LiveJobFeed';
import { NotificationBell } from '@/components/realtime/NotificationBell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Activity, Users, Briefcase, DollarSign, Bell, AlertCircle } from 'lucide-react';
import { usePresence, useTenantUpdates } from '@/lib/hooks/usePusher';
import { useRealtimeUpdates } from '@/lib/hooks/useRealtimeUpdates';
import { formatDistanceToNow } from 'date-fns';

export default function RealtimeDashboardPage() {
  // Real-time connections
  const { members, isConnected: pusherConnected } = usePresence();
  const { messages: tenantMessages } = useTenantUpdates();
  const { updates, isConnected: sseConnected } = useRealtimeUpdates({
    events: ['JOB_CREATED', 'JOB_STATUS_CHANGED', 'PAYMENT_RECEIVED', 'EMERGENCY_JOB'],
  });

  // Active users list
  const activeUsers = members ? Array.from(members.values()) : [];

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Real-time Dashboard</h1>
          <p className="text-muted-foreground">
            Live monitoring and metrics for your CRM
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {sseConnected && (
              <Badge variant="outline" className="gap-1">
                <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                SSE Connected
              </Badge>
            )}
            {pusherConnected && (
              <Badge variant="outline" className="gap-1">
                <span className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
                WebSocket Connected
              </Badge>
            )}
          </div>
          <NotificationBell />
        </div>
      </div>

      {/* Live Metrics */}
      <LiveMetrics />

      {/* Main Content Tabs */}
      <Tabs defaultValue="jobs" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="jobs">Live Jobs</TabsTrigger>
          <TabsTrigger value="activity">Activity Feed</TabsTrigger>
          <TabsTrigger value="contractors">Active Users</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        {/* Jobs Tab */}
        <TabsContent value="jobs" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <LiveJobFeed />

            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Recent Job Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-3">
                    {updates
                      .filter(u => u.event === 'JOB_STATUS_CHANGED')
                      .slice(-10)
                      .reverse()
                      .map((update, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                        >
                          <Activity className="h-4 w-4 mt-1 text-muted-foreground" />
                          <div className="flex-1">
                            <p className="text-sm">
                              Job #{update.data.jobNumber} status changed to{' '}
                              <Badge variant="outline">{update.data.newStatus}</Badge>
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {formatDistanceToNow(update.timestamp, { addSuffix: true })}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Activity Feed Tab */}
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Live Activity Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-3">
                  {[...updates, ...tenantMessages]
                    .sort((a, b) =>
                      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
                    )
                    .slice(0, 50)
                    .map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        {getEventIcon(item.event)}
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {getEventTitle(item.event)}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {getEventDescription(item.event, item.data)}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {formatDistanceToNow(new Date(item.timestamp), {
                              addSuffix: true,
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Active Users Tab */}
        <TabsContent value="contractors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Active Users
                </span>
                <Badge>{activeUsers.length} online</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-3">
                  {activeUsers.map((user: any) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="gap-1">
                        <span className="h-2 w-2 bg-green-500 rounded-full" />
                        {user.role}
                      </Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-3">
                  {updates
                    .filter(u => u.event === 'EMERGENCY_JOB')
                    .map((alert, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-lg border-l-4 border-red-500 bg-red-50 dark:bg-red-900/10"
                      >
                        <div className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-semibold text-red-900 dark:text-red-100">
                              Emergency Job Alert
                            </p>
                            <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                              {alert.data.title} at {alert.data.propertyAddress}
                            </p>
                            <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                              {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper functions
function getEventIcon(event: string) {
  switch (event) {
    case 'JOB_CREATED':
      return <Briefcase className="h-4 w-4 text-blue-500" />;
    case 'JOB_STATUS_CHANGED':
      return <Activity className="h-4 w-4 text-green-500" />;
    case 'PAYMENT_RECEIVED':
      return <DollarSign className="h-4 w-4 text-green-500" />;
    case 'EMERGENCY_JOB':
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    default:
      return <Bell className="h-4 w-4 text-gray-500" />;
  }
}

function getEventTitle(event: string) {
  switch (event) {
    case 'JOB_CREATED':
      return 'New Job Created';
    case 'JOB_STATUS_CHANGED':
      return 'Job Status Updated';
    case 'PAYMENT_RECEIVED':
      return 'Payment Received';
    case 'EMERGENCY_JOB':
      return 'Emergency Job Alert';
    default:
      return 'System Event';
  }
}

function getEventDescription(event: string, data: any) {
  switch (event) {
    case 'JOB_CREATED':
      return `Job #${data.jobNumber} - ${data.title} has been created`;
    case 'JOB_STATUS_CHANGED':
      return `Job #${data.jobNumber} status changed from ${data.oldStatus} to ${data.newStatus}`;
    case 'PAYMENT_RECEIVED':
      return `Payment of $${data.amount} received for invoice #${data.invoiceNumber}`;
    case 'EMERGENCY_JOB':
      return `Emergency job at ${data.propertyAddress} requires immediate attention`;
    default:
      return 'System event occurred';
  }
}