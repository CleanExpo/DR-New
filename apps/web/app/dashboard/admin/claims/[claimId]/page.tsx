'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ChevronLeft,
  AlertCircle,
  CheckCircle,
  Users,
  MapPin,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  Loader,
  RefreshCw,
  Loader2,
  Zap,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/src/design-system/components/Button/Button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

interface PublicClaim {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  propertyAddress: string;
  suburb: string;
  postcode: string;
  disasterType: string;
  incidentDate: string;
  isOngoing: boolean;
  isEmergency: boolean;
  damageDescription: string;
  hasInsurance: boolean;
  insuranceProvider: string | null;
  policyNumber: string | null;
  priority: string;
  submittedAt: string;
}

interface ContractorMatch {
  contractorId: string;
  contractorName: string | null;
  businessName: string | null;
  matchScore: number;
  reason?: string[];
  rating: number;
  completedJobs: number;
  status?: string;
  matchId?: string;
}

interface MatchJob {
  jobId: string;
  status: string;
  criteria: {
    serviceType: string;
    location: string;
    urgency: string;
    priority: string;
  };
}

export default function ClaimDetailPage() {
  const params = useParams();
  const router = useRouter();
  const claimId = params.claimId as string;

  const [claim, setClaim] = React.useState<PublicClaim | null>(null);
  const [matches, setMatches] = React.useState<ContractorMatch[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [converting, setConverting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Contractor matching panel state (CONN-012 + CONN-016)
  const [adminMatches, setAdminMatches] = React.useState<ContractorMatch[]>([]);
  const [adminMatchesLoading, setAdminMatchesLoading] = React.useState(false);
  const [reMatchLoading, setReMatchLoading] = React.useState(false);
  const [forceReMatch, setForceReMatch] = React.useState(false);
  const [matchJob, setMatchJob] = React.useState<MatchJob | null>(null);
  const [triggerMatchLoading, setTriggerMatchLoading] = React.useState(false);

  // Load claim details
  React.useEffect(() => {
    const fetchClaim = async () => {
      try {
        const response = await fetch(`/api/admin/claims/convert?claimId=${claimId}`);
        if (!response.ok) throw new Error('Failed to fetch claim');

        const data = await response.json();
        const claimData = data.claims?.find((c: PublicClaim) => c.id === claimId);

        if (!claimData) throw new Error('Claim not found');

        setClaim(claimData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load claim');
      } finally {
        setLoading(false);
      }
    };

    if (claimId) {
      fetchClaim();
    }
  }, [claimId]);

  // Convert claim and show matches
  const handleConvertClaim = async () => {
    setConverting(true);
    try {
      const response = await fetch('/api/admin/claims/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicClaimId: claimId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Conversion failed');
      }

      const result = await response.json();
      setMatches(result.matches || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
    } finally {
      setConverting(false);
    }
  };

  // CONN-012: fetch match scores for this claim (uses bookingId = claimId as proxy)
  const fetchAdminMatches = React.useCallback(async () => {
    if (!claimId) return;
    setAdminMatchesLoading(true);
    try {
      const res = await fetch(`/api/admin/claims/match?bookingId=${claimId}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setAdminMatches(data.matches ?? []);
      } else if (res.status === 404) {
        setAdminMatches([]);
      } else {
        toast.error('Failed to load match scores', { description: data.error });
      }
    } catch {
      toast.error('Failed to load match scores');
    } finally {
      setAdminMatchesLoading(false);
    }
  }, [claimId]);

  // CONN-012: re-run matching via /api/admin/claims/match POST
  const handleReMatch = async () => {
    setReMatchLoading(true);
    try {
      const res = await fetch('/api/admin/claims/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId: claimId, removeExisting: forceReMatch }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(`Re-matched ${data.total} contractors`);
        setAdminMatches(data.matches ?? []);
      } else {
        toast.error('Re-match failed', { description: data.error });
      }
    } catch {
      toast.error('Re-match failed');
    } finally {
      setReMatchLoading(false);
    }
  };

  // CONN-016: trigger background contractor-matching job via /api/jobs/contractor-matching
  const handleTriggerMatchJob = async () => {
    setTriggerMatchLoading(true);
    try {
      const res = await fetch('/api/jobs/contractor-matching', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claimId, force: true }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMatchJob(data);
        toast.success('Matching job queued', {
          description: `Job ${data.jobId} — ${data.criteria?.location ?? ''}`,
        });
      } else {
        toast.error('Failed to trigger matching', { description: data.message ?? data.error });
      }
    } catch {
      toast.error('Failed to trigger matching job');
    } finally {
      setTriggerMatchLoading(false);
    }
  };

  // Load match scores when claim is loaded
  React.useEffect(() => {
    if (claimId) fetchAdminMatches();
  }, [claimId, fetchAdminMatches]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!claim) {
    return (
      <div className="space-y-6">
        <Button variant="outline" onClick={() => router.back()}>
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <Alert className="border-red-600 bg-red-50">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <AlertDescription className="text-red-900">Claim not found</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 mt-4">{claim.clientName}</h1>
        <p className="text-gray-400 mt-2">Claim ID: {claim.id}</p>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert className="border-red-600 bg-red-50">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <AlertDescription className="text-red-900">{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Client Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Client Information</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="font-medium text-gray-900">{claim.clientEmail}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="font-medium text-gray-900">{claim.clientPhone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">Property Address</p>
                  <p className="font-medium text-gray-900">
                    {claim.propertyAddress}, {claim.suburb} {claim.postcode}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Incident Details */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Incident Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400 uppercase font-medium">Disaster Type</p>
                  <p className="text-lg font-semibold text-gray-900 capitalize mt-1">
                    {claim.disasterType.replace('-', ' ')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase font-medium">Date</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">
                    {formatDate(claim.incidentDate)}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400 uppercase font-medium">Ongoing</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">
                    {claim.isOngoing ? '🔴 Yes' : '✅ No'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase font-medium">Emergency</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">
                    {claim.isEmergency ? '🚨 Yes' : '✅ No'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Damage Description */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Damage Description</h2>
            <p className="text-gray-700 leading-relaxed">{claim.damageDescription}</p>
          </div>

          {/* Insurance Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Insurance Information</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400 uppercase font-medium">Has Insurance</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">
                  {claim.hasInsurance ? '✅ Yes' : '❌ No'}
                </p>
              </div>
              {claim.hasInsurance && (
                <>
                  <div>
                    <p className="text-sm text-gray-400 uppercase font-medium">Provider</p>
                    <p className="text-lg font-semibold text-gray-900 mt-1">
                      {claim.insuranceProvider || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 uppercase font-medium">Policy Number</p>
                    <p className="text-lg font-semibold text-gray-900 mt-1">
                      {claim.policyNumber || 'Not provided'}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* CONN-012: Contractor Matching Panel */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Contractor Matching
                  {adminMatches.length > 0 && (
                    <span className="ml-2 text-sm font-normal text-gray-400">
                      ({adminMatches.length} matches)
                    </span>
                  )}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1 text-sm text-gray-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={forceReMatch}
                    onChange={(e) => setForceReMatch(e.target.checked)}
                  />
                  Remove existing
                </label>
                <button
                  type="button"
                  onClick={handleReMatch}
                  disabled={reMatchLoading}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                >
                  {reMatchLoading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <RefreshCw className="h-3.5 w-3.5" />
                  )}
                  Re-run Matching
                </button>
                <button
                  type="button"
                  onClick={fetchAdminMatches}
                  disabled={adminMatchesLoading}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                >
                  {adminMatchesLoading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <RefreshCw className="h-3.5 w-3.5" />
                  )}
                  Refresh Scores
                </button>
              </div>
            </div>

            {adminMatchesLoading && adminMatches.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
              </div>
            ) : adminMatches.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">No contractor matches found.</p>
                <p className="text-xs mt-1">Click &ldquo;Re-run Matching&rdquo; or use the job trigger below.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {adminMatches.map((match, idx) => (
                  <div
                    key={match.matchId ?? match.contractorId}
                    className="flex items-center justify-between border border-gray-100 rounded-lg px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-gray-400 w-5 text-right">
                        {idx + 1}
                      </span>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {match.businessName ?? 'Unknown Business'}
                        </p>
                        <p className="text-xs text-gray-400">
                          {match.contractorName ?? 'Unknown'} &bull; {match.completedJobs} jobs &bull; ⭐ {match.rating.toFixed(1)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {match.status && (
                        <Badge variant="outline" className="text-xs">
                          {match.status}
                        </Badge>
                      )}
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="font-bold text-green-700">{match.matchScore}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CONN-016: Job Re-matching Trigger */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-5 w-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900">Trigger Background Matching</h2>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Queue a background job to run the full contractor matching pipeline for this claim.
              Use this when automatic matching has failed or produces poor results.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleTriggerMatchJob}
                disabled={triggerMatchLoading}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-700 disabled:opacity-50"
              >
                {triggerMatchLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Zap className="h-4 w-4" />
                )}
                Trigger Matching Job (force)
              </button>
              {matchJob && (
                <p className="text-sm text-gray-500">
                  Job <strong>{matchJob.jobId}</strong> — status: <strong>{matchJob.status}</strong>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Submission Info */}
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Submission Info</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400 uppercase font-medium">Submitted</p>
                <p className="text-sm font-medium text-gray-900 mt-1">{formatDate(claim.submittedAt)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-medium">Priority</p>
                <div className="mt-1">
                  <span className={`inline-block px-3 py-1 rounded-full font-semibold text-sm ${
                    claim.priority === 'critical' ? 'bg-red-100 text-red-800' :
                    claim.priority === 'urgent' ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {claim.priority.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          {matches.length === 0 && (
            <Button
              variant="emergency-primary"
              size="lg"
              onClick={handleConvertClaim}
              loading={converting}
              className="w-full"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              Convert to Booking
            </Button>
          )}

          {/* Matched Contractors */}
          {matches.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Matched Contractors ({matches.length})
                </h3>
              </div>
              <div className="space-y-3">
                {matches.slice(0, 5).map((match) => (
                  <div key={match.contractorId} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{match.businessName}</p>
                        <p className="text-xs text-gray-400">{match.contractorName}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-bold text-green-600">{match.matchScore}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">
                      ⭐ {match.rating}/5 • {match.completedJobs} jobs
                    </div>
                  </div>
                ))}
                {matches.length > 5 && (
                  <p className="text-xs text-gray-400 text-center">
                    +{matches.length - 5} more contractors
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
