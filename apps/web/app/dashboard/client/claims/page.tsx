'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  DollarSign,
  Plus,
  Loader,
} from 'lucide-react';
import { Button } from '@/src/design-system/components/Button/Button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Claim {
  id: string;
  serviceType: string;
  description: string;
  location: string;
  suburb: string;
  postcode: string;
  status: string;
  emergencyLevel: string;
  estimatedCost: number;
  contractor: {
    id: string;
    name: string;
    email: string;
    businessName: string;
    rating: number;
  } | null;
  rating: {
    rating: number;
    review: string;
  } | null;
  submittedAt: string;
  updatedAt: string;
  completedAt: string | null;
}

export default function ClientClaimsPage() {
  const router = useRouter();
  const [claims, setClaims] = React.useState<Claim[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Load user's claims
  React.useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await fetch('/api/client/claims');
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

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'ASSIGNED':
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toUpperCase()) {
      case 'PENDING':
        return <Clock className="h-5 w-5" />;
      case 'COMPLETED':
        return <CheckCircle className="h-5 w-5" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('en-AU', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Claims</h1>
          <p className="text-gray-600 mt-2">Track the status of your disaster recovery claims</p>
        </div>
        <Button
          variant="primary"
          onClick={() => router.push('/claim/step-1')}
          icon={<Plus className="h-5 w-5" />}
        >
          New Claim
        </Button>
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
          <div className="flex items-center justify-center py-12">
            <Loader className="h-8 w-8 animate-spin text-gray-600" />
          </div>
        ) : claims.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">No claims yet</p>
            <p className="text-gray-500 mt-2">Start a new claim to get matched with contractors</p>
            <Button
              variant="primary"
              onClick={() => router.push('/claim/step-1')}
              className="mt-4"
            >
              <Plus className="h-4 w-4 mr-2" />
              Start a Claim
            </Button>
          </div>
        ) : (
          claims.map((claim) => (
            <div
              key={claim.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => router.push(`/dashboard/client/claims/${claim.id}`)}
            >
              <div className="p-6">
                {/* Header Row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 capitalize">
                        {claim.serviceType.replace('_', ' ')}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full font-semibold text-xs flex items-center gap-1 ${getStatusColor(
                          claim.status
                        )}`}
                      >
                        {getStatusIcon(claim.status)}
                        {claim.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{claim.description}</p>
                  </div>

                  {/* Quick Actions */}
                  <ChevronRight className="h-6 w-6 text-gray-400 ml-4 flex-shrink-0" />
                </div>

                {/* Details Row */}
                <div className="grid grid-cols-4 gap-4 pb-4 border-b border-gray-200">
                  <div>
                    <div className="flex items-center gap-1 text-gray-600 mb-1">
                      <MapPin className="h-4 w-4" />
                      <span className="text-xs font-medium uppercase">Location</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {claim.suburb} {claim.postcode}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 text-gray-600 mb-1">
                      <DollarSign className="h-4 w-4" />
                      <span className="text-xs font-medium uppercase">Estimate</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {formatCurrency(claim.estimatedCost)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase mb-1">Submitted</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {formatDate(claim.submittedAt)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                      {claim.contractor ? 'Assigned' : 'Status'}
                    </p>
                    {claim.contractor ? (
                      <div className="text-sm">
                        <p className="font-semibold text-gray-900">{claim.contractor.businessName}</p>
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          ⭐ {claim.contractor.rating.toFixed(1)}/5
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm font-semibold text-orange-600">Awaiting Bids</p>
                    )}
                  </div>
                </div>

                {/* Rating (if completed) */}
                {claim.rating && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">You rated:</span>
                      <span className="text-lg font-bold text-yellow-500">{claim.rating.rating}⭐</span>
                      {claim.rating.review && (
                        <span className="text-sm text-gray-600">"{claim.rating.review}"</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Info Section */}
      {claims.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>Tip:</strong> Click on any claim to view details, contractor bids, and
            communicate with your assigned contractor.
          </p>
        </div>
      )}
    </div>
  );
}
