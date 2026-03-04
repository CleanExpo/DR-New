'use client';

import { useState, useEffect, useMemo } from 'react';
import { ServiceRequest } from '@/components/client/ServiceRequestCard';

export interface ClientAnalytics {
  overview: {
    totalRequests: number;
    pendingRequests: number;
    activeRequests: number;
    completedRequests: number;
    cancelledRequests: number;
    averageResponseTime: string;
    completionRate: number;
  };
  spending: {
    totalSpent: number;
    averageCost: number;
    projectedCost: number;
    currency: string;
  };
  trends: {
    requestsThisMonth: number;
    requestsLastMonth: number;
    growthRate: number;
    mostCommonCategory: string;
    mostCommonUrgency: string;
  };
  contractor: {
    totalContractorsWorkedWith: number;
    averageRating: number;
    topContractors: Array<{
      id: string;
      name: string;
      jobsCompleted: number;
      rating: number;
    }>;
  };
}

interface UseClientAnalyticsReturn {
  analytics: ClientAnalytics | null;
  loading: boolean;
  error: string | null;
  refreshAnalytics: () => Promise<void>;
  getRequestsByStatus: (status: ServiceRequest['status']) => ServiceRequest[];
  getRequestsByCategory: (category: string) => ServiceRequest[];
  getRequestsByUrgency: (urgency: ServiceRequest['urgency']) => ServiceRequest[];
  getRequestsByDateRange: (startDate: Date, endDate: Date) => ServiceRequest[];
}

export function useClientAnalytics(requests?: ServiceRequest[]): UseClientAnalyticsReturn {
  const [analyticsData, setAnalyticsData] = useState<ClientAnalytics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate analytics from requests
  const calculateAnalytics = useMemo(() => {
    if (!requests || requests.length === 0) {
      return null;
    }

    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

    // Overview stats
    const totalRequests = requests.length;
    const pendingRequests = requests.filter((r) => r.status === 'PENDING').length;
    const activeRequests = requests.filter(
      (r) => r.status === 'MATCHED' || r.status === 'IN_PROGRESS'
    ).length;
    const completedRequests = requests.filter((r) => r.status === 'COMPLETED').length;
    const cancelledRequests = requests.filter((r) => r.status === 'CANCELLED').length;

    // Calculate average response time (mock - would need actual response timestamps)
    const averageResponseTime = '2.4 hrs';

    // Completion rate
    const completionRate =
      totalRequests > 0 ? Math.round((completedRequests / totalRequests) * 100) : 0;

    // Trends
    const requestsThisMonth = requests.filter(
      (r) => new Date(r.createdAt) >= thisMonth
    ).length;
    const requestsLastMonth = requests.filter(
      (r) => new Date(r.createdAt) >= lastMonth && new Date(r.createdAt) <= lastMonthEnd
    ).length;

    const growthRate =
      requestsLastMonth > 0
        ? Math.round(((requestsThisMonth - requestsLastMonth) / requestsLastMonth) * 100)
        : 0;

    // Most common category and urgency — single O(n) pass instead of two forEach loops
    const categoryCount: Record<string, number> = {};
    const urgencyCount: Record<string, number> = {};
    for (const r of requests) {
      categoryCount[r.serviceCategory] = (categoryCount[r.serviceCategory] || 0) + 1;
      urgencyCount[r.urgency] = (urgencyCount[r.urgency] || 0) + 1;
    }
    const mostCommonCategory =
      Object.keys(categoryCount).length > 0
        ? Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0][0]
        : 'N/A';
    const mostCommonUrgency =
      Object.keys(urgencyCount).length > 0
        ? Object.entries(urgencyCount).sort((a, b) => b[1] - a[1])[0][0]
        : 'normal';

    // Spending (mock data - would need actual cost data)
    const totalSpent = 0;
    const averageCost = 0;
    const projectedCost = 0;

    // Contractor stats (mock - would need actual contractor data)
    const totalContractorsWorkedWith = 0;
    const averageRating = 0;
    const topContractors: ClientAnalytics['contractor']['topContractors'] = [];

    return {
      overview: {
        totalRequests,
        pendingRequests,
        activeRequests,
        completedRequests,
        cancelledRequests,
        averageResponseTime,
        completionRate,
      },
      spending: {
        totalSpent,
        averageCost,
        projectedCost,
        currency: 'AUD',
      },
      trends: {
        requestsThisMonth,
        requestsLastMonth,
        growthRate,
        mostCommonCategory,
        mostCommonUrgency,
      },
      contractor: {
        totalContractorsWorkedWith,
        averageRating,
        topContractors,
      },
    };
  }, [requests]);

  // Fetch analytics from API (if not using local calculations)
  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/client/analytics', {
        cache: 'no-store',
      });

      if (response.ok) {
        const data = await response.json();
        setAnalyticsData(data);
      } else if (response.status === 404) {
        // API endpoint doesn't exist yet, use calculated analytics
        setAnalyticsData(calculateAnalytics);
      } else {
        throw new Error('Failed to fetch analytics');
      }
    } catch (err) {
      // Fallback to calculated analytics if API fails
      setAnalyticsData(calculateAnalytics);
      setError(null); // Don't show error if we can calculate locally
    } finally {
      setLoading(false);
    }
  };

  // Helper functions
  const getRequestsByStatus = (status: ServiceRequest['status']): ServiceRequest[] => {
    if (!requests) return [];
    return requests.filter((r) => r.status === status);
  };

  const getRequestsByCategory = (category: string): ServiceRequest[] => {
    if (!requests) return [];
    return requests.filter((r) => r.serviceCategory === category);
  };

  const getRequestsByUrgency = (urgency: ServiceRequest['urgency']): ServiceRequest[] => {
    if (!requests) return [];
    return requests.filter((r) => r.urgency === urgency);
  };

  const getRequestsByDateRange = (startDate: Date, endDate: Date): ServiceRequest[] => {
    if (!requests) return [];
    return requests.filter((r) => {
      const requestDate = new Date(r.createdAt);
      return requestDate >= startDate && requestDate <= endDate;
    });
  };

  // Update analytics when requests change
  useEffect(() => {
    if (requests) {
      setAnalyticsData(calculateAnalytics);
    }
  }, [requests, calculateAnalytics]);

  // Initial fetch (will fall back to calculated if API doesn't exist)
  useEffect(() => {
    if (!requests) {
      fetchAnalytics();
    }
  }, []);

  return {
    analytics: analyticsData,
    loading,
    error,
    refreshAnalytics: fetchAnalytics,
    getRequestsByStatus,
    getRequestsByCategory,
    getRequestsByUrgency,
    getRequestsByDateRange,
  };
}
