/**
 * Admin Security Dashboard
 *
 * Real-time security monitoring and alert management for administrators
 * Shows:
 * - Security events and alerts
 * - Failed login attempts
 * - Locked accounts
 * - Suspicious file uploads
 * - System health status
 */

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  Lock,
  ShieldAlert,
  Loader2,
  RefreshCw,
  X,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SecurityEvent {
  id: string;
  type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  ipAddress: string;
  email?: string;
  details: Record<string, any>;
  resolved: boolean;
  createdAt: string;
}

interface SecurityStats {
  totalEvents: number;
  unresolvedEvents: number;
  lockedAccounts: number;
  eventsByType: Record<string, number>;
  eventsBySeverity: Record<string, number>;
}

interface AlertsResponse {
  events: SecurityEvent[];
  monitoring: SecurityStats;
  alerts: any;
}

export default function SecurityDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AlertsResponse | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<SecurityEvent | null>(null);
  const [resolving, setResolving] = useState<string | null>(null);

  // Redirect if not admin
  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      // Check if user is admin (would need to add to session)
      // For now, just continue
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, session, router]);

  // Load security data
  const loadData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/security/alerts?stats=true');
      if (response.ok) {
        const alertData = await response.json();
        setData(alertData);
      } else {
        console.error('Failed to load security data');
      }
    } catch (error) {
      console.error('Error loading security data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load data on mount and set up refresh interval
  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Resolve an event
  const handleResolveEvent = async (eventId: string) => {
    setResolving(eventId);
    try {
      const response = await fetch('/api/security/alerts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId,
          action: 'resolve',
          note: 'Resolved by admin',
        }),
      });

      if (response.ok) {
        // Remove from list and reload
        await loadData();
        setSelectedEvent(null);
      }
    } catch (error) {
      console.error('Error resolving event:', error);
    } finally {
      setResolving(null);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'HIGH':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return <ShieldAlert className="h-4 w-4" />;
      case 'HIGH':
        return <AlertTriangle className="h-4 w-4" />;
      case 'MEDIUM':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load security data. Please try again.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Security Dashboard</h1>
            <p className="mt-2 text-gray-400">Monitor security events and system threats</p>
          </div>
          <Button
            onClick={loadData}
            variant="outline"
            disabled={loading}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{data.monitoring.totalEvents}</p>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-yellow-800">
                Unresolved Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-900">
                {data.monitoring.unresolvedEvents}
              </p>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-red-800">
                Locked Accounts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-900">
                {data.monitoring.lockedAccounts}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Last Updated
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-mono text-gray-400">
                {new Date().toLocaleTimeString()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="events" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="events">Recent Events</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-4">
            {data.events.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-gray-400">
                    No security events at this time
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-2">
                {data.events.map((event) => (
                  <Card
                    key={event.id}
                    className={`cursor-pointer hover:shadow-md transition ${
                      selectedEvent?.id === event.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedEvent(event)}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          {getSeverityIcon(event.severity)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-gray-900">
                              {event.type}
                            </p>
                            <Badge
                              className={`${getSeverityColor(event.severity)} border`}
                              variant="outline"
                            >
                              {event.severity}
                            </Badge>
                            {event.resolved && (
                              <Badge variant="secondary">Resolved</Badge>
                            )}
                          </div>

                          <p className="text-sm text-gray-400 mb-2">
                            {event.email || event.ipAddress}
                          </p>

                          <p className="text-xs text-gray-400">
                            {new Date(event.createdAt).toLocaleString()}
                          </p>
                        </div>

                        {!event.resolved && (
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleResolveEvent(event.id);
                            }}
                            disabled={resolving === event.id}
                          >
                            {resolving === event.id && (
                              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                            )}
                            Resolve
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Events by Type */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Events by Type</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(data.monitoring.eventsByType).map(
                    ([type, count]) => (
                      <div key={type} className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">{type}</span>
                        <Badge variant="secondary">{count}</Badge>
                      </div>
                    )
                  )}
                </CardContent>
              </Card>

              {/* Events by Severity */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Events by Severity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(data.monitoring.eventsBySeverity).map(
                    ([severity, count]) => (
                      <div key={severity} className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">{severity}</span>
                        <Badge
                          className={getSeverityColor(severity)}
                          variant="outline"
                        >
                          {count}
                        </Badge>
                      </div>
                    )
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Event Details */}
        {selectedEvent && (
          <Card className="mt-8 border-blue-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Event Details</CardTitle>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedEvent(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Type</p>
                  <p className="font-medium">{selectedEvent.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Severity</p>
                  <Badge className={getSeverityColor(selectedEvent.severity)}>
                    {selectedEvent.severity}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="font-mono text-sm">{selectedEvent.email || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">IP Address</p>
                  <p className="font-mono text-sm">{selectedEvent.ipAddress}</p>
                </div>
              </div>

              {selectedEvent.details && Object.keys(selectedEvent.details).length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Details</p>
                  <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-48">
                    {JSON.stringify(selectedEvent.details, null, 2)}
                  </pre>
                </div>
              )}

              {!selectedEvent.resolved && (
                <Button
                  className="w-full"
                  onClick={() => handleResolveEvent(selectedEvent.id)}
                  disabled={resolving === selectedEvent.id}
                >
                  {resolving === selectedEvent.id && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Mark as Resolved
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
