'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, AlertCircle, CheckCircle, Clock, Zap } from 'lucide-react';
import { Button } from '@/src/design-system/components/Button/Button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PublicClaim {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  suburb: string;
  postcode: string;
  disasterType: string;
  priority: string;
  isEmergency: boolean;
  hasInsurance: boolean;
  submittedAt: string;
}

export default function AdminClaimsPage() {
  const router = useRouter();
  const [claims, setClaims] = React.useState<PublicClaim[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedClaimId, setSelectedClaimId] = React.useState<string | null>(null);
  const [converting, setConverting] = React.useState(false);

  // Load pending claims
  React.useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await fetch('/api/admin/claims/convert');
        if (!response.ok) throw new Error('Failed to fetch claims');

        const data = await response.json();
        setClaims(data.claims || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load claims');
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  // Convert claim to booking
  const handleConvertClaim = async (claimId: string) => {
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

      // Remove converted claim from list
      setClaims(claims.filter((c) => c.id !== claimId));
      setSelectedClaimId(null);

      // Navigate to booking details
      router.push(`/dashboard/admin/bookings/${result.booking.bookingId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
    } finally {
      setConverting(false);
    }
  };

  const getPriorityColor = (priority: string): 'emergency' | 'default' => {
    return priority === 'critical' || priority === 'urgent' ? 'emergency' : 'default';
  };

  const getPriorityIcon = (priority: string) => {
    if (priority === 'critical') return <Zap className="h-5 w-5 text-red-600" />;
    if (priority === 'urgent') return <AlertCircle className="h-5 w-5 text-orange-600" />;
    return <Clock className="h-5 w-5 text-gray-400" />;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('en-AU', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Claim Intake Management</h1>
        <p className="text-gray-400 mt-2">
          Review and convert public claims into bookings for contractor matching
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert className="border-red-600 bg-red-50">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <AlertDescription className="text-red-900">{error}</AlertDescription>
        </Alert>
      )}

      {/* Claims List */}
      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading pending claims...</p>
          </div>
        ) : claims.length === 0 ? (
          <div className="text-center py-12">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <p className="text-gray-400 font-medium">All claims processed!</p>
            <p className="text-gray-400">No pending claims at this time.</p>
          </div>
        ) : (
          claims.map((claim) => (
            <div
              key={claim.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                {/* Header Row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{claim.clientName}</h3>
                      {claim.isEmergency && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded">
                          EMERGENCY
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        📍 {claim.suburb}, {claim.postcode}
                      </span>
                      <span>📧 {claim.clientEmail}</span>
                      <span>📱 {claim.clientPhone}</span>
                    </div>
                  </div>

                  {/* Priority Badge */}
                  <div className="flex items-center gap-2 ml-4">
                    {getPriorityIcon(claim.priority)}
                    <span className="font-semibold text-gray-900 capitalize">{claim.priority}</span>
                  </div>
                </div>

                {/* Details Row */}
                <div className="grid grid-cols-4 gap-4 mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase">Disaster Type</p>
                    <p className="text-sm font-semibold text-gray-900 capitalize">
                      {claim.disasterType.replace('-', ' ')}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase">Insurance</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {claim.hasInsurance ? '✓ Yes' : '✗ No'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase">Submitted</p>
                    <p className="text-sm font-semibold text-gray-900">{formatDate(claim.submittedAt)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase">Status</p>
                    <p className="text-sm font-semibold text-orange-600">Pending Review</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setSelectedClaimId(selectedClaimId === claim.id ? null : claim.id)
                    }
                  >
                    {selectedClaimId === claim.id ? 'Hide' : 'View'} Details
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleConvertClaim(claim.id)}
                    loading={converting && selectedClaimId === claim.id}
                  >
                    Convert to Booking
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>

                {/* Expanded Details */}
                {selectedClaimId === claim.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 bg-gray-50 -mx-6 -mb-6 px-6 py-4">
                    <p className="text-sm text-gray-400">
                      <strong>Claim ID:</strong> {claim.id}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      When you convert this claim, we will:
                    </p>
                    <ul className="text-xs text-gray-400 mt-2 space-y-1 ml-4">
                      <li>✓ Create a Booking record</li>
                      <li>✓ Create or link a Client user account</li>
                      <li>✓ Find matching contractors based on location and specialty</li>
                      <li>✓ Notify all matched contractors of the new job</li>
                      <li>✓ Enable contractors to submit bids</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Stats Footer */}
      {claims.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>{claims.length}</strong> claims pending conversion. Average conversion time: 2-3
            minutes per claim.
          </p>
        </div>
      )}
    </div>
  );
}
