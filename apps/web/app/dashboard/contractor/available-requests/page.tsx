'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronRight,
  AlertCircle,
  Clock,
  MapPin,
  DollarSign,
  Zap,
  TrendingUp,
  Filter,
  Loader,
} from 'lucide-react';
import { Button } from '@/src/design-system/components/Button/Button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AvailableRequest {
  matchId: string;
  requestId: string;
  matchScore: number;
  disasterType: string;
  description: string;
  location: {
    suburb: string;
    postcode: string;
    state: string;
  };
  estimatedBudget: number;
  emergencyLevel: string;
  status: string;
  clientName: string;
  postedAt: string;
  hoursPosted: number;
}

export default function ContractorAvailableRequestsPage() {
  const router = useRouter();
  const [requests, setRequests] = React.useState<AvailableRequest[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [filter, setFilter] = React.useState<'all' | 'urgent' | 'high' | 'standard'>('all');

  // Load available requests
  React.useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('/api/contractor/available-requests');
        if (!response.ok) throw new Error('Failed to fetch requests');

        const data = await response.json();
        setRequests(data.data || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load requests');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const getUrgencyColor = (level: string) => {
    switch (level.toUpperCase()) {
      case 'CRITICAL':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'URGENT':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'STANDARD':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getUrgencyIcon = (level: string) => {
    if (level.toUpperCase() === 'CRITICAL') {
      return <Zap className="h-4 w-4" />;
    }
    if (level.toUpperCase() === 'URGENT') {
      return <AlertCircle className="h-4 w-4" />;
    }
    return <Clock className="h-4 w-4" />;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('en-AU', {
      month: 'short',
      day: 'numeric',
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

  const filteredRequests = requests.filter((req) => {
    if (filter === 'all') return true;
    return req.emergencyLevel.toLowerCase().includes(filter);
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Available Requests</h1>
          <p className="text-gray-400 mt-2">Jobs matched specifically for your expertise and location</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-gray-900">{filteredRequests.length}</p>
          <p className="text-sm text-gray-400">jobs available</p>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert className="border-red-600 bg-red-50">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <AlertDescription className="text-red-900">{error}</AlertDescription>
        </Alert>
      )}

      {/* Filter Buttons */}
      <div className="flex gap-2">
        <Button
          variant={filter === 'all' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All ({requests.length})
        </Button>
        <Button
          variant={filter === 'urgent' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setFilter('urgent')}
        >
          <Zap className="h-4 w-4 mr-1" />
          Urgent
        </Button>
        <Button
          variant={filter === 'high' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setFilter('high')}
        >
          High Priority
        </Button>
        <Button
          variant={filter === 'standard' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setFilter('standard')}
        >
          Standard
        </Button>
      </div>

      {/* Requests List */}
      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400 font-medium">No requests available</p>
            <p className="text-gray-400 mt-2">
              {filter !== 'all'
                ? 'No requests match your filter. Try adjusting your search.'
                : 'Check back soon for new job opportunities.'}
            </p>
          </div>
        ) : (
          filteredRequests.map((request) => (
            <div
              key={request.matchId}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                {/* Header Row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 capitalize">
                        {request.disasterType.replace('_', ' ')}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full font-semibold text-xs flex items-center gap-1 border ${getUrgencyColor(
                          request.emergencyLevel
                        )}`}
                      >
                        {getUrgencyIcon(request.emergencyLevel)}
                        {request.emergencyLevel}
                      </span>
                      <span className="flex items-center gap-1 text-amber-600 bg-amber-50 px-3 py-1 rounded-full text-xs font-semibold">
                        <TrendingUp className="h-4 w-4" />
                        {request.matchScore} match
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-2">{request.description}</p>
                  </div>

                  {/* Quick Actions */}
                  <ChevronRight className="h-6 w-6 text-gray-400 ml-4 flex-shrink-0" />
                </div>

                {/* Details Row */}
                <div className="grid grid-cols-5 gap-4 pb-4 border-b border-gray-200">
                  <div>
                    <div className="flex items-center gap-1 text-gray-400 mb-1">
                      <MapPin className="h-4 w-4" />
                      <span className="text-xs font-medium uppercase">Location</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {request.location.suburb}
                    </p>
                    <p className="text-xs text-gray-400">{request.location.postcode}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 text-gray-400 mb-1">
                      <DollarSign className="h-4 w-4" />
                      <span className="text-xs font-medium uppercase">Budget</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {formatCurrency(request.estimatedBudget)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase mb-1">Client</p>
                    <p className="text-sm font-semibold text-gray-900">{request.clientName}</p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase mb-1">Posted</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {request.hoursPosted < 1 ? 'Just now' : `${request.hoursPosted}h ago`}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-medium text-gray-400 uppercase mb-1">Status</p>
                    <p className="text-sm font-semibold text-blue-600">Available</p>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex gap-3 mt-4">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => router.push(`/dashboard/contractor/available-requests/${request.requestId}`)}
                    className="flex-1"
                  >
                    View & Bid
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Info Section */}
      {requests.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>Pro Tip:</strong> Your match score shows how well this job aligns with your
            location, expertise, and availability. Higher scores mean better opportunities for you.
          </p>
        </div>
      )}
    </div>
  );
}
