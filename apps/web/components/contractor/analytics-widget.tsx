'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface ContractorAnalytics {
  overview: {
    profileViews: number;
    profileViewsThisMonth: number;
    totalBookings: number;
    completedBookings: number;
    activeBookings: number;
    averageRating: number;
    totalRatings: number;
    conversionRate: number;
    memberSince: string;
  };
  bookingStats: {
    total: number;
    completed: number;
    active: number;
    cancelled: number;
    thisMonth: number;
    lastMonth: number;
    last30Days: number;
    completionRate: number;
    cancellationRate: number;
    monthOverMonthGrowth: number;
  };
  ratingStats: {
    totalRatings: number;
    averageRating: number;
    ratingsLast30Days: number;
    distribution: {
      1: number;
      2: number;
      3: number;
      4: number;
      5: number;
    };
    positiveRatingPercentage: number;
  };
  performance: {
    averageResponseTimeMinutes: number;
    completedJobs: number;
    quoteRequestCount: number;
    quoteAcceptanceRate: number;
    directBookingRequests: number;
  };
}

interface AnalyticsWidgetProps {
  variant?: 'full' | 'compact';
}

export function ContractorAnalyticsWidget({ variant = 'compact' }: AnalyticsWidgetProps) {
  const [analytics, setAnalytics] = useState<ContractorAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/contractor/analytics');
      const data = await response.json();

      if (data.success) {
        setAnalytics(data.analytics);
      } else {
        setError(data.error || 'Failed to load analytics');
      }
    } catch (error) {
      console.error('Analytics fetch error:', error);
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <p className="text-gray-500 text-center">
          {error || 'No analytics data available'}
        </p>
      </div>
    );
  }

  const { overview, bookingStats, ratingStats, performance } = analytics;

  if (variant === 'compact') {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Quick Analytics</h3>
          <Link
            href="/dashboard/contractor/analytics"
            className="text-sm text-teal-600 hover:text-teal-700 font-medium"
          >
            View Details →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Profile Views */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Profile Views</p>
            <p className="text-2xl font-bold text-gray-900">{overview.profileViews}</p>
            <p className="text-xs text-teal-600 mt-1">
              {overview.profileViewsThisMonth} this month
            </p>
          </div>

          {/* Bookings */}
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
            <p className="text-2xl font-bold text-gray-900">{overview.totalBookings}</p>
            <p className="text-xs text-teal-600 mt-1">
              {overview.activeBookings} active
            </p>
          </div>

          {/* Average Rating */}
          <div className="p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Avg Rating</p>
            <p className="text-2xl font-bold text-gray-900">
              {overview.averageRating.toFixed(1)} ⭐
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {overview.totalRatings} reviews
            </p>
          </div>

          {/* Completion Rate */}
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Completion</p>
            <p className="text-2xl font-bold text-gray-900">
              {bookingStats.completionRate.toFixed(0)}%
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {bookingStats.completed} completed
            </p>
          </div>
        </div>

        {/* Performance Highlights */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Conversion Rate:</span>
              <span className="font-semibold text-gray-900">
                {overview.conversionRate.toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Monthly Growth:</span>
              <span
                className={`font-semibold ${
                  bookingStats.monthOverMonthGrowth >= 0
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {bookingStats.monthOverMonthGrowth > 0 ? '+' : ''}
                {bookingStats.monthOverMonthGrowth.toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Response Time:</span>
              <span className="font-semibold text-gray-900">
                {performance.averageResponseTimeMinutes} min
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Positive Reviews:</span>
              <span className="font-semibold text-gray-900">
                {ratingStats.positiveRatingPercentage}%
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Full variant with detailed charts and metrics
  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Profile Views</p>
            <span className="text-2xl">👁️</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {overview.profileViews.toLocaleString()}
          </p>
          <p className="text-sm text-teal-600 mt-1">
            {overview.profileViewsThisMonth} this month
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Total Bookings</p>
            <span className="text-2xl">📋</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{overview.totalBookings}</p>
          <p className="text-sm text-teal-600 mt-1">{overview.activeBookings} active</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Average Rating</p>
            <span className="text-2xl">⭐</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {overview.averageRating.toFixed(1)}
          </p>
          <p className="text-sm text-gray-500 mt-1">{overview.totalRatings} reviews</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
            <span className="text-2xl">📈</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {overview.conversionRate.toFixed(1)}%
          </p>
          <p className="text-sm text-gray-500 mt-1">Views to bookings</p>
        </div>
      </div>

      {/* Detailed Performance Metrics */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-600 mb-2">Completion Rate</p>
            <p className="text-3xl font-bold text-gray-900">
              {bookingStats.completionRate.toFixed(1)}%
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {bookingStats.completed} of {bookingStats.total}
            </p>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-600 mb-2">Response Time</p>
            <p className="text-3xl font-bold text-gray-900">
              {performance.averageResponseTimeMinutes}
            </p>
            <p className="text-sm text-gray-500 mt-1">minutes average</p>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-600 mb-2">Quote Acceptance</p>
            <p className="text-3xl font-bold text-gray-900">
              {performance.quoteAcceptanceRate.toFixed(0)}%
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {performance.quoteRequestCount} requests
            </p>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-600 mb-2">Positive Reviews</p>
            <p className="text-3xl font-bold text-gray-900">
              {ratingStats.positiveRatingPercentage}%
            </p>
            <p className="text-sm text-gray-500 mt-1">4-5 star ratings</p>
          </div>
        </div>
      </div>

      {/* View Full Analytics Link */}
      <div className="text-center">
        <Link
          href="/dashboard/contractor/analytics"
          className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colours"
        >
          View Detailed Analytics →
        </Link>
      </div>
    </div>
  );
}

export default ContractorAnalyticsWidget;
