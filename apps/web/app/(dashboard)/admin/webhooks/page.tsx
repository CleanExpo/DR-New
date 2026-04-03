/**
 * Webhook Monitoring Dashboard
 *
 * Admin dashboard for monitoring Stripe webhook events:
 * - Real-time event statistics
 * - Success/failure rates
 * - Recent events list
 * - Failed payment tracking
 * - Event type breakdown
 */

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  TrendingUp,
  TrendingDown,
  Activity,
  Filter,
  RefreshCw,
  Download,
} from 'lucide-react';

interface WebhookEvent {
  id: string;
  stripeEventId: string;
  eventType: string;
  processed: boolean;
  statusCode: number;
  errorMessage: string | null;
  processedAt: string;
}

interface Statistics {
  overview: {
    total: number;
    successful: number;
    failed: number;
    successRate: number;
  };
  eventsByType: Array<{
    type: string;
    count: number;
  }>;
  recentFailures: WebhookEvent[];
  paymentFailures: any[];
}

interface WebhookData {
  events: WebhookEvent[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
  statistics: Statistics;
}

export default function WebhookMonitoringPage() {
  const [data, setData] = useState<WebhookData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [eventTypeFilter, setEventTypeFilter] = useState('');
  const [daysFilter, setDaysFilter] = useState('7');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchWebhookData = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        status: statusFilter,
        days: daysFilter,
        limit: '50',
      });

      if (eventTypeFilter) {
        params.append('eventType', eventTypeFilter);
      }

      const response = await fetch(`/api/admin/webhooks/events?${params}`);

      if (!response.ok) {
        throw new Error('Failed to fetch webhook data');
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebhookData();
  }, [statusFilter, eventTypeFilter, daysFilter]);

  // Filter events by search term
  const filteredEvents = data?.events.filter((event) =>
    event.stripeEventId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.eventType.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleRefresh = () => {
    fetchWebhookData();
  };

  const handleExport = () => {
    if (!data) return;

    const csv = [
      ['Event ID', 'Type', 'Status', 'Status Code', 'Error', 'Processed At'].join(','),
      ...data.events.map((event) => [
        event.stripeEventId,
        event.eventType,
        event.processed ? 'Success' : 'Failed',
        event.statusCode,
        event.errorMessage || '',
        new Date(event.processedAt).toISOString(),
      ].join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `webhook-events-${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (error) {
    return (
      <div className="p-8">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              <p>Error loading webhook data: {error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Webhook Monitoring</h1>
          <p className="text-muted-foreground mt-1">
            Monitor Stripe webhook events and payment processing
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport} disabled={!data}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      {loading && !data ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : data ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Total Events */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.statistics.overview.total}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Last {daysFilter} days
              </p>
            </CardContent>
          </Card>

          {/* Success Rate */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              {data.statistics.overview.successRate >= 95 ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data.statistics.overview.successRate.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {data.statistics.overview.successful} successful
              </p>
            </CardContent>
          </Card>

          {/* Successful Events */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Successful</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {data.statistics.overview.successful}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Processed correctly
              </p>
            </CardContent>
          </Card>

          {/* Failed Events */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Failed</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {data.statistics.overview.failed}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Require attention
              </p>
            </CardContent>
          </Card>
        </div>
      ) : null}

      {/* Event Type Breakdown */}
      {data && data.statistics.eventsByType.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Event Type Breakdown</CardTitle>
            <CardDescription>Distribution of webhook events by type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.statistics.eventsByType.slice(0, 8).map((item) => (
                <div key={item.type} className="flex flex-col p-3 border rounded-lg">
                  <span className="text-sm font-medium truncate" title={item.type}>
                    {item.type.replace('customer.subscription.', '').replace('invoice.', '')}
                  </span>
                  <span className="text-2xl font-bold mt-1">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="success">Successful Only</SelectItem>
                  <SelectItem value="failed">Failed Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Time Period</label>
              <Select value={daysFilter} onValueChange={setDaysFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Last 24 hours</SelectItem>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Event Type</label>
              <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  {data?.statistics.eventsByType.map((item) => (
                    <SelectItem key={item.type} value={item.type}>
                      {item.type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Search</label>
              <Input
                placeholder="Event ID or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Failures */}
      {data && data.statistics.recentFailures.length > 0 && (
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              Recent Failures
            </CardTitle>
            <CardDescription>Webhook events that failed to process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.statistics.recentFailures.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 border border-red-200 rounded-lg bg-red-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono">{event.stripeEventId}</code>
                      <Badge variant="outline">{event.eventType}</Badge>
                      <Badge variant="destructive">HTTP {event.statusCode}</Badge>
                    </div>
                    {event.errorMessage && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {event.errorMessage}
                      </p>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(event.processedAt).toLocaleString('en-AU')}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Events List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Events</CardTitle>
          <CardDescription>
            Showing {filteredEvents.length} of {data?.pagination.total || 0} events
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No webhook events found</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className={`flex items-center justify-between p-4 border rounded-lg ${
                    event.processed && event.statusCode === 200
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {event.processed && event.statusCode === 200 ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      )}
                      <code className="text-sm font-mono">{event.stripeEventId}</code>
                      <Badge variant="outline">{event.eventType}</Badge>
                      <Badge
                        variant={
                          event.statusCode === 200 ? 'default' : 'destructive'
                        }
                      >
                        HTTP {event.statusCode}
                      </Badge>
                    </div>
                    {event.errorMessage && (
                      <p className="text-sm text-muted-foreground mt-1 ml-6">
                        {event.errorMessage}
                      </p>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(event.processedAt).toLocaleString('en-AU')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Failures */}
      {data && data.statistics.paymentFailures.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Failed Payments</CardTitle>
            <CardDescription>Recent payment failures requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.statistics.paymentFailures.map((failure) => (
                <div
                  key={failure.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {failure.workspaceId ? 'Workspace' : 'Tenant'}:{' '}
                        {failure.workspaceId || failure.tenantId}
                      </span>
                      {failure.metadata?.attemptCount && (
                        <Badge variant="outline">
                          Attempt {failure.metadata.attemptCount}/3
                        </Badge>
                      )}
                    </div>
                    {failure.metadata?.amountDue && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Amount due: ${(failure.metadata.amountDue / 100).toFixed(2)} AUD
                      </p>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(failure.createdAt).toLocaleString('en-AU')}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
