'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  AlertCircle,
  ChevronRight,
  Loader2,
  RefreshCw,
  Zap,
  ShieldAlert,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface TriageResult {
  claimId: string;
  triageScore: number;
  classifiedDamageType: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  urgencyLevel: 'STANDARD' | 'HIGH' | 'URGENT' | 'EMERGENCY';
  recommendedPriority: 'LOW' | 'MEDIUM' | 'HIGH';
  adminSummary: string;
  nextSteps: string[];
  fraudRiskScore: number;
  estimatedCostRange: { min: number; max: number; currency: string };
}

interface TriageClaim {
  id: string;
  clientName: string;
  suburb: string;
  postcode: string;
  disasterType: string;
  isEmergency: boolean;
  createdAt: string;
  hasTriage: boolean;
  triageResult: TriageResult | null;
}

const PRIORITY_OPTIONS = ['LOW', 'MEDIUM', 'HIGH'] as const;
type Priority = (typeof PRIORITY_OPTIONS)[number];

function urgencyBadgeVariant(urgency: string) {
  switch (urgency) {
    case 'EMERGENCY':
      return 'destructive';
    case 'URGENT':
      return 'destructive';
    case 'HIGH':
      return 'secondary';
    default:
      return 'outline';
  }
}

function severityColor(severity: string) {
  switch (severity) {
    case 'CRITICAL':
      return 'text-red-700 bg-red-50 border-red-200';
    case 'HIGH':
      return 'text-orange-700 bg-orange-50 border-orange-200';
    case 'MEDIUM':
      return 'text-yellow-700 bg-yellow-50 border-yellow-200';
    default:
      return 'text-green-700 bg-green-50 border-green-200';
  }
}

function priorityIcon(priority: string) {
  if (priority === 'HIGH') return <Zap className="h-4 w-4 text-red-600" />;
  if (priority === 'MEDIUM') return <AlertCircle className="h-4 w-4 text-orange-500" />;
  return <Clock className="h-4 w-4 text-gray-400" />;
}

function formatCurrency(min: number, max: number, currency: string) {
  const fmt = new Intl.NumberFormat('en-AU', { style: 'currency', currency });
  return `${fmt.format(min)} – ${fmt.format(max)}`;
}

function formatDate(date: string) {
  return new Date(date).toLocaleString('en-AU', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function AdminClaimsTriagePage() {
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();

  const [claims, setClaims] = React.useState<TriageClaim[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  // Per-claim triage state
  const [triagingId, setTriagingId] = React.useState<string | null>(null);
  const [priorityOverride, setPriorityOverride] = React.useState<Record<string, Priority>>({});
  const [updatingId, setUpdatingId] = React.useState<string | null>(null);

  // Auth guard
  React.useEffect(() => {
    if (authStatus === 'unauthenticated') router.push('/auth/login');
    else if (authStatus === 'authenticated' && session?.user.role !== 'ADMIN')
      router.push('/dashboard');
  }, [authStatus, session, router]);

  const fetchQueue = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/claims/triage?status=pending&limit=50');
      if (!res.ok) throw new Error('Failed to load triage queue');
      const data = await res.json();
      setClaims(data.claims ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load triage queue');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (authStatus === 'authenticated' && session?.user.role === 'ADMIN') {
      fetchQueue();
    }
  }, [authStatus, session, fetchQueue]);

  const handleTriage = async (claimId: string) => {
    setTriagingId(claimId);
    try {
      const res = await fetch('/api/admin/claims/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claimId, options: { updatePriority: false } }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Triage failed');
      }
      const data = await res.json();
      setClaims((prev) =>
        prev.map((c) =>
          c.id === claimId ? { ...c, hasTriage: true, triageResult: data.result } : c
        )
      );
      toast.success('Triage complete', { description: data.result.adminSummary?.slice(0, 80) });
    } catch (err) {
      toast.error('Triage failed', {
        description: err instanceof Error ? err.message : 'Unknown error',
      });
    } finally {
      setTriagingId(null);
    }
  };

  const handleSetPriority = async (claimId: string) => {
    const priority = priorityOverride[claimId];
    if (!priority) return;
    setUpdatingId(claimId);
    try {
      const res = await fetch('/api/admin/claims/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claimId, options: { updatePriority: true } }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Priority update failed');
      }
      toast.success('Priority updated');
      setClaims((prev) =>
        prev.map((c) => (c.id === claimId ? { ...c, hasTriage: true } : c))
      );
    } catch (err) {
      toast.error('Priority update failed', {
        description: err instanceof Error ? err.message : 'Unknown error',
      });
    } finally {
      setUpdatingId(null);
    }
  };

  const pendingCount = claims.filter((c) => !c.hasTriage).length;
  const triagedCount = claims.filter((c) => c.hasTriage).length;

  if (authStatus === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Claims Triage Queue</h1>
          <p className="text-gray-500 mt-1">
            AI-powered prioritisation of inbound claims before dispatch
          </p>
        </div>
        <Button variant="outline" onClick={fetchQueue} disabled={loading}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-5 pb-4">
            <p className="text-sm text-gray-500">Total Pending</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{claims.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-4">
            <p className="text-sm text-gray-500">Awaiting Triage</p>
            <p className="text-3xl font-bold text-orange-600 mt-1">{pendingCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-4">
            <p className="text-sm text-gray-500">Triaged</p>
            <p className="text-3xl font-bold text-green-600 mt-1">{triagedCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Error */}
      {error && (
        <Alert className="border-red-300 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      {/* Claims list */}
      {claims.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <p className="text-lg font-medium text-gray-700">No pending claims</p>
            <p className="text-gray-500 text-sm mt-1">All inbound claims have been processed.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {claims.map((claim) => {
            const isExpanded = expandedId === claim.id;
            const result = claim.triageResult;
            return (
              <Card
                key={claim.id}
                className={`border ${claim.isEmergency ? 'border-red-300' : 'border-gray-200'}`}
              >
                <CardContent className="p-0">
                  {/* Summary row */}
                  <div className="p-5 flex items-center gap-4">
                    {/* Priority icon */}
                    <div className="shrink-0">
                      {claim.isEmergency ? (
                        <ShieldAlert className="h-6 w-6 text-red-600" />
                      ) : (
                        priorityIcon(result?.recommendedPriority ?? 'LOW')
                      )}
                    </div>

                    {/* Main info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{claim.clientName}</span>
                        {claim.isEmergency && (
                          <Badge variant="destructive" className="text-xs">
                            EMERGENCY
                          </Badge>
                        )}
                        {result && (
                          <Badge variant={urgencyBadgeVariant(result.urgencyLevel)} className="text-xs">
                            {result.urgencyLevel}
                          </Badge>
                        )}
                        {claim.hasTriage && (
                          <Badge variant="outline" className="text-xs text-green-700 border-green-300">
                            Triaged
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {claim.disasterType.replace(/-/g, ' ')} &bull; {claim.suburb} {claim.postcode} &bull;{' '}
                        {formatDate(claim.createdAt)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      {!claim.hasTriage ? (
                        <Button
                          size="sm"
                          onClick={() => handleTriage(claim.id)}
                          disabled={triagingId === claim.id}
                        >
                          {triagingId === claim.id ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-1" />
                          ) : null}
                          Run Triage
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleTriage(claim.id)}
                          disabled={triagingId === claim.id}
                        >
                          {triagingId === claim.id ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-1" />
                          ) : (
                            <RefreshCw className="h-3 w-3 mr-1" />
                          )}
                          Re-triage
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setExpandedId(isExpanded ? null : claim.id)}
                      >
                        {isExpanded ? 'Collapse' : 'Details'}
                        <ChevronRight
                          className={`h-4 w-4 ml-1 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                        />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => router.push(`/dashboard/admin/claims/${claim.id}`)}
                      >
                        Open
                      </Button>
                    </div>
                  </div>

                  {/* Expanded triage result */}
                  {isExpanded && result && (
                    <div className="border-t border-gray-100 bg-gray-50 p-5 space-y-4">
                      {/* Severity + scores */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold border ${severityColor(result.severity)}`}
                        >
                          Severity: {result.severity}
                        </span>
                        <span className="text-sm text-gray-600">
                          Triage confidence: <strong>{result.triageScore}%</strong>
                        </span>
                        <span className="text-sm text-gray-600">
                          Fraud risk: <strong className={result.fraudRiskScore > 60 ? 'text-red-600' : 'text-gray-900'}>{result.fraudRiskScore}%</strong>
                        </span>
                        <span className="text-sm text-gray-600">
                          Est. cost:{' '}
                          <strong>
                            {formatCurrency(
                              result.estimatedCostRange.min,
                              result.estimatedCostRange.max,
                              result.estimatedCostRange.currency
                            )}
                          </strong>
                        </span>
                      </div>

                      {/* Admin summary */}
                      {result.adminSummary && (
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                            AI Summary
                          </p>
                          <p className="text-sm text-gray-700">{result.adminSummary}</p>
                        </div>
                      )}

                      {/* Next steps */}
                      {result.nextSteps?.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                            Recommended Next Steps
                          </p>
                          <ul className="list-disc list-inside space-y-1">
                            {result.nextSteps.map((step, i) => (
                              <li key={i} className="text-sm text-gray-700">
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Priority override */}
                      <div className="flex items-center gap-3">
                        <p className="text-sm font-medium text-gray-700">Set priority:</p>
                        <Select
                          value={priorityOverride[claim.id] ?? result.recommendedPriority}
                          onValueChange={(val) =>
                            setPriorityOverride((prev) => ({
                              ...prev,
                              [claim.id]: val as Priority,
                            }))
                          }
                        >
                          <SelectTrigger className="w-36">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {PRIORITY_OPTIONS.map((p) => (
                              <SelectItem key={p} value={p}>
                                {p}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          size="sm"
                          onClick={() => handleSetPriority(claim.id)}
                          disabled={updatingId === claim.id}
                        >
                          {updatingId === claim.id && (
                            <Loader2 className="h-3 w-3 animate-spin mr-1" />
                          )}
                          Apply Priority
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Expanded but no result yet */}
                  {isExpanded && !result && (
                    <div className="border-t border-gray-100 bg-gray-50 p-5 text-center text-sm text-gray-500">
                      Run triage to see AI analysis for this claim.
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
