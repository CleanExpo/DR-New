'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { ServiceRequest } from '@/components/client/ServiceRequestCard';

export interface ServiceRequestFilters {
  search: string;
  status: 'all' | ServiceRequest['status'];
  category: string;
  urgency: 'all' | ServiceRequest['urgency'];
  dateRange: 'all' | 'today' | 'week' | 'month';
  insurance: 'all' | 'yes' | 'no';
  sortBy: 'newest' | 'oldest' | 'title' | 'urgency';
  sortOrder: 'asc' | 'desc';
}

interface UseServiceRequestsReturn {
  requests: ServiceRequest[];
  filteredRequests: ServiceRequest[];
  loading: boolean;
  error: string | null;
  filters: ServiceRequestFilters;
  setFilters: (filters: ServiceRequestFilters | ((prev: ServiceRequestFilters) => ServiceRequestFilters)) => void;
  refreshRequests: () => Promise<void>;
  cancelRequest: (requestId: string) => Promise<boolean>;
}

const defaultFilters: ServiceRequestFilters = {
  search: '',
  status: 'all',
  category: 'all',
  urgency: 'all',
  dateRange: 'all',
  insurance: 'all',
  sortBy: 'newest',
  sortOrder: 'desc',
};

export function useServiceRequests(): UseServiceRequestsReturn {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ServiceRequestFilters>(defaultFilters);

  // Fetch service requests
  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/service-requests', {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch service requests');
      }

      const data = await response.json();
      setRequests(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching service requests:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Cancel a request
  const cancelRequest = useCallback(async (requestId: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/service-requests/${requestId}/cancel`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Refresh requests list
        await fetchRequests();
        return true;
      }

      return false;
    } catch (err) {
      console.error('Error cancelling request:', err);
      return false;
    }
  }, [fetchRequests]);

  // Filter and sort requests
  const filteredRequests = useMemo(() => {
    let filtered = [...requests];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (req) =>
          req.serviceTitle.toLowerCase().includes(searchLower) ||
          req.description?.toLowerCase().includes(searchLower) ||
          req.location.toLowerCase().includes(searchLower) ||
          req.serviceCategory.toLowerCase().includes(searchLower)
      );
    }

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter((req) => req.status === filters.status);
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter((req) => req.serviceCategory === filters.category);
    }

    // Urgency filter
    if (filters.urgency !== 'all') {
      filtered = filtered.filter((req) => req.urgency === filters.urgency);
    }

    // Insurance filter
    if (filters.insurance !== 'all') {
      const hasInsurance = filters.insurance === 'yes';
      filtered = filtered.filter((req) => req.insurance === hasInsurance);
    }

    // Date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();

      switch (filters.dateRange) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
      }

      filtered = filtered.filter(
        (req) => new Date(req.createdAt) >= filterDate
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (filters.sortBy) {
        case 'newest':
          comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          break;
        case 'oldest':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'title':
          comparison = a.serviceTitle.localeCompare(b.serviceTitle);
          break;
        case 'urgency': {
          const urgencyOrder = { emergency: 3, urgent: 2, normal: 1 };
          comparison = urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
          break;
        }
      }

      return filters.sortOrder === 'asc' ? -comparison : comparison;
    });

    return filtered;
  }, [requests, filters]);

  // Initial fetch
  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return {
    requests,
    filteredRequests,
    loading,
    error,
    filters,
    setFilters,
    refreshRequests: fetchRequests,
    cancelRequest,
  };
}
