'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface ContractorBenchmark {
  id: string;
  name: string;
  revenue: number;
  rating: number;
  jobsCompleted: number;
  tier: string;
  rank: number;
}

interface ServiceTypeBenchmark {
  serviceType: string;
  averagePrice: number;
  completionRate: number;
  totalJobs: number;
  totalRevenue: number;
}

interface RegionalBenchmark {
  region: string;
  averagePrice: number;
  totalJobs: number;
  totalRevenue: number;
  topService: string;
  completionRate: number;
}

interface PerformanceMetric {
  name: string;
  value: number;
  industryAverage: number | null;
  platformAverage: number;
  indicator: 'above' | 'at' | 'below';
  unit: string;
}

interface BenchmarkData {
  success: boolean;
  contractors: {
    topPerformers: ContractorBenchmark[];
    tiers: {
      platinum: number;
      gold: number;
      silver: number;
      bronze: number;
    };
  };
  serviceTypes: ServiceTypeBenchmark[];
  regions: RegionalBenchmark[];
  performanceMetrics: PerformanceMetric[];
}

export default function BenchmarksPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<BenchmarkData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [rankBy, setRankBy] = useState<'revenue' | 'rating' | 'jobs'>('revenue');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated') {
      const user = session?.user as any;
      if (user.role !== 'ADMIN') {
        router.push('/dashboard');
      } else {
        fetchBenchmarkData();
      }
    }
  }, [status, session, router]);

  const fetchBenchmarkData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/admin/analytics/benchmarks');

      if (!response.ok) {
        throw new Error('Failed to fetch benchmark data');
      }

      const benchmarkData = await response.json();
      setData(benchmarkData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching benchmark data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getSortedContractors = () => {
    if (!data) return [];

    return [...data.contractors.topPerformers].sort((a, b) => {
      switch (rankBy) {
        case 'revenue':
          return b.revenue - a.revenue;
        case 'rating':
          return b.rating - a.rating;
        case 'jobs':
          return b.jobsCompleted - a.jobsCompleted;
        default:
          return 0;
      }
    });
  };

  const getIndicatorSymbol = (indicator: 'above' | 'at' | 'below') => {
    switch (indicator) {
      case 'above':
        return '↑';
      case 'at':
        return '→';
      case 'below':
        return '↓';
    }
  };

  const getIndicatorColor = (indicator: 'above' | 'at' | 'below') => {
    switch (indicator) {
      case 'above':
        return 'text-green-600';
      case 'at':
        return 'text-gray-400';
      case 'below':
        return 'text-red-600';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'platinum':
        return 'bg-purple-100 text-purple-800';
      case 'gold':
        return 'bg-yellow-100 text-yellow-800';
      case 'silver':
        return 'bg-gray-100 text-gray-800';
      case 'bronze':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading benchmarks...</p>
        </div>
      </div>
    );
  }

  if (!session || (session.user as any).role !== 'ADMIN') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">Unauthorized access</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-4"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Performance Benchmarking</h1>
          <p className="text-gray-400 mt-2">
            Compare contractor, service, and regional performance metrics
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {data && !error && (
          <>
            {/* Contractor Benchmarking */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">
                  Top Performing Contractors
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setRankBy('revenue')}
                    className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                      rankBy === 'revenue'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Revenue
                  </button>
                  <button
                    onClick={() => setRankBy('rating')}
                    className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                      rankBy === 'rating'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Rating
                  </button>
                  <button
                    onClick={() => setRankBy('jobs')}
                    className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                      rankBy === 'jobs'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Jobs
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                        Rank
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                        Contractor
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                        Tier
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">
                        Revenue
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">
                        Rating
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">
                        Jobs Completed
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getSortedContractors().map((contractor, index) => (
                      <tr
                        key={contractor.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4 text-sm font-bold text-gray-900">
                          #{index + 1}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">
                          {contractor.name}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getTierColor(
                              contractor.tier
                            )}`}
                          >
                            {contractor.tier}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-gray-900">
                          ${contractor.revenue.toLocaleString('en-AU')}
                        </td>
                        <td className="py-3 px-4 text-sm text-right text-gray-900">
                          {contractor.rating.toFixed(1)} ★
                        </td>
                        <td className="py-3 px-4 text-sm text-right text-gray-900">
                          {contractor.jobsCompleted}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Contractor Tiers */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-purple-800">Platinum Tier</p>
                  <p className="text-2xl font-bold text-purple-900 mt-1">
                    {data.contractors.tiers.platinum}
                  </p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-yellow-800">Gold Tier</p>
                  <p className="text-2xl font-bold text-yellow-900 mt-1">
                    {data.contractors.tiers.gold}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-800">Silver Tier</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {data.contractors.tiers.silver}
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-orange-800">Bronze Tier</p>
                  <p className="text-2xl font-bold text-orange-900 mt-1">
                    {data.contractors.tiers.bronze}
                  </p>
                </div>
              </div>
            </div>

            {/* Service Type Benchmarking */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Service Type Performance
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                        Service Type
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">
                        Average Price
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">
                        Completion Rate
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">
                        Total Jobs
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">
                        Total Revenue
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.serviceTypes.map((service) => (
                      <tr
                        key={service.serviceType}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">
                          {service.serviceType}
                        </td>
                        <td className="py-3 px-4 text-sm text-right text-gray-900">
                          ${service.averagePrice.toLocaleString('en-AU')}
                        </td>
                        <td className="py-3 px-4 text-sm text-right text-gray-900">
                          {service.completionRate.toFixed(1)}%
                        </td>
                        <td className="py-3 px-4 text-sm text-right text-gray-900">
                          {service.totalJobs}
                        </td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-gray-900">
                          ${service.totalRevenue.toLocaleString('en-AU')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Regional Benchmarking */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Regional Performance
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.regions.map((region) => (
                  <div
                    key={region.region}
                    className="border border-gray-300 rounded-lg p-4"
                  >
                    <h3 className="font-bold text-gray-900 mb-3">{region.region}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Average Price:</span>
                        <span className="font-medium text-gray-900">
                          ${region.averagePrice.toLocaleString('en-AU')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Jobs:</span>
                        <span className="font-medium text-gray-900">
                          {region.totalJobs}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Revenue:</span>
                        <span className="font-medium text-gray-900">
                          ${region.totalRevenue.toLocaleString('en-AU')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Completion Rate:</span>
                        <span className="font-medium text-gray-900">
                          {region.completionRate.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-200">
                        <span className="text-gray-400">Top Service:</span>
                        <span className="font-medium text-blue-600">
                          {region.topService}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Platform Performance Metrics
              </h2>

              <div className="space-y-4">
                {data.performanceMetrics.map((metric) => (
                  <div
                    key={metric.name}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{metric.name}</h3>
                        <p className="text-2xl font-bold text-gray-900 mt-1">
                          {metric.value.toLocaleString('en-AU')}
                          {metric.unit}
                        </p>
                      </div>
                      <span
                        className={`text-2xl font-bold ${getIndicatorColor(
                          metric.indicator
                        )}`}
                      >
                        {getIndicatorSymbol(metric.indicator)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Platform Average</p>
                        <p className="font-medium text-gray-900">
                          {metric.platformAverage.toLocaleString('en-AU')}
                          {metric.unit}
                        </p>
                      </div>
                      {metric.industryAverage !== null && (
                        <div>
                          <p className="text-gray-400">Industry Average</p>
                          <p className="font-medium text-gray-900">
                            {metric.industryAverage.toLocaleString('en-AU')}
                            {metric.unit}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-400">
                        {metric.indicator === 'above' &&
                          'Above average performance - keep up the good work!'}
                        {metric.indicator === 'at' &&
                          'At average performance - room for improvement.'}
                        {metric.indicator === 'below' &&
                          'Below average performance - consider improvement strategies.'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
