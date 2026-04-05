'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface RegionData {
  region: string;
  jobCount: number;
  contractorCount: number;
  avgServiceValue: number;
  coveragePercentage: number;
}

interface TopRegion {
  region: string;
  jobCount: number;
  contractorCount: number;
}

interface UnderservedRegion {
  region: string;
  coveragePercentage: number;
  recommendation: string;
  jobCount: number;
  contractorCount: number;
}

interface GrowthRegion {
  region: string;
  jobCount: number;
  contractorCount: number;
  growthPotential: string;
}

interface ExpansionRecommendation {
  region: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  jobCount: number;
  contractorCount: number;
  coveragePercentage: number;
}

interface HeatmapData {
  region: string;
  demandIntensity: number;
  supplyAdequacy: number;
  color: string;
}

interface GeographicData {
  success: boolean;
  dateRange: {
    start: string;
    end: string;
  };
  summary: {
    totalJobs: number;
    totalContractors: number;
    avgJobValue: number;
    regionsServed: number;
  };
  regionalBreakdown: RegionData[];
  topPerformers: TopRegion[];
  underservedRegions: UnderservedRegion[];
  growthRegions: GrowthRegion[];
  expansionRecommendations: ExpansionRecommendation[];
  heatmap: HeatmapData[];
}

export default function GeographicAnalyticsDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<GeographicData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated') {
      const user = session?.user as any;
      if (user.role !== 'ADMIN') {
        router.push('/dashboard');
      } else {
        fetchGeographicData();
      }
    }
  }, [status, session, router]);

  const fetchGeographicData = async () => {
    try {
      setLoading(true);
      setError(null);

      let url = '/api/admin/analytics/geographic';
      const params = new URLSearchParams();

      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch geographic data');
      }

      const geographicData = await response.json();
      setData(geographicData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching geographic data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilter = () => {
    fetchGeographicData();
  };

  const handleResetFilter = () => {
    setStartDate('');
    setEndDate('');
    setTimeout(() => {
      fetchGeographicData();
    }, 0);
  };

  const formatAustralianDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getPriorityBadgeColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return 'bg-red-600 text-white';
      case 'medium':
        return 'bg-yellow-600 text-white';
      case 'low':
        return 'bg-green-600 text-white';
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading geographic analytics...</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Geographic Analytics</h1>
          <p className="text-gray-400 mt-2">Regional demand, contractor distribution, and expansion opportunities</p>
        </div>

        {/* Date Range Filter */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Date Range Filter</h2>
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleApplyFilter}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Apply
              </button>
              <button
                onClick={handleResetFilter}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
              >
                Reset
              </button>
            </div>
          </div>
          {data?.dateRange && (
            <p className="text-sm text-gray-400 mt-4">
              Showing data from {formatAustralianDate(data.dateRange.start)} to {formatAustralianDate(data.dateRange.end)}
            </p>
          )}
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
            {/* Summary Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-400 text-sm font-medium">Total Jobs</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {data.summary.totalJobs.toLocaleString('en-AU')}
                </p>
                <p className="text-xs text-gray-400 mt-2">Across all regions</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-400 text-sm font-medium">Active Contractors</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {data.summary.totalContractors.toLocaleString('en-AU')}
                </p>
                <p className="text-xs text-gray-400 mt-2">Available nationwide</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-400 text-sm font-medium">Avg Job Value</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ${data.summary.avgJobValue.toLocaleString('en-AU', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p className="text-xs text-gray-400 mt-2">Per service</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-400 text-sm font-medium">Regions Served</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {data.summary.regionsServed}
                </p>
                <p className="text-xs text-gray-400 mt-2">Geographic coverage</p>
              </div>
            </div>

            {/* Regional Breakdown Table */}
            <div className="bg-white rounded-lg shadow mb-8">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Regional Breakdown</h2>
                <p className="text-sm text-gray-400 mt-1">Sorted by demand (job count)</p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Region
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Demand (Jobs)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Active Contractors
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Avg Service Value
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Coverage %
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.regionalBreakdown.length > 0 ? (
                      data.regionalBreakdown.map((region, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {region.region}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            {region.jobCount.toLocaleString('en-AU')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            {region.contractorCount.toLocaleString('en-AU')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            ${region.avgServiceValue.toLocaleString('en-AU', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex items-center">
                              <span
                                className={`font-medium ${
                                  region.coveragePercentage >= 80
                                    ? 'text-green-600'
                                    : region.coveragePercentage >= 50
                                      ? 'text-yellow-600'
                                      : 'text-red-600'
                                }`}
                              >
                                {region.coveragePercentage.toFixed(1)}%
                              </span>
                              <div className="ml-3 flex-1 bg-gray-200 rounded-full h-2 w-16">
                                <div
                                  className={`h-2 rounded-full ${
                                    region.coveragePercentage >= 80
                                      ? 'bg-green-600'
                                      : region.coveragePercentage >= 50
                                        ? 'bg-yellow-600'
                                        : 'bg-red-600'
                                  }`}
                                  style={{ width: `${Math.min(region.coveragePercentage, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-400">
                          No regional data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Performers Section */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Top Performing Regions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {data.topPerformers.length > 0 ? (
                  data.topPerformers.map((region, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl font-bold">#{idx + 1}</span>
                        <div className="bg-white/20 rounded-full px-3 py-1 text-xs font-medium">
                          Top Region
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-4">{region.region}</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm opacity-90">Jobs:</span>
                          <span className="font-bold">{region.jobCount.toLocaleString('en-AU')}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm opacity-90">Contractors:</span>
                          <span className="font-bold">{region.contractorCount.toLocaleString('en-AU')}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-5 text-center py-8 text-gray-400">
                    No top performers data available
                  </div>
                )}
              </div>
            </div>

            {/* Underserved Regions Section */}
            <div className="bg-white rounded-lg shadow mb-8">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Underserved Regions</h2>
                <p className="text-sm text-gray-400 mt-1">Areas with low contractor coverage - expansion opportunities</p>
              </div>
              <div className="p-6">
                {data.underservedRegions.length > 0 ? (
                  <div className="space-y-4">
                    {data.underservedRegions.map((region, idx) => (
                      <div key={idx} className="border border-red-200 bg-red-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{region.region}</h3>
                          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                            {region.coveragePercentage.toFixed(1)}% Coverage
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-gray-400">Jobs</p>
                            <p className="text-lg font-bold text-gray-900">{region.jobCount.toLocaleString('en-AU')}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Contractors</p>
                            <p className="text-lg font-bold text-gray-900">{region.contractorCount.toLocaleString('en-AU')}</p>
                          </div>
                        </div>
                        <div className="bg-white border border-red-200 rounded p-3">
                          <p className="text-sm font-medium text-gray-700 mb-1">Recommendation:</p>
                          <p className="text-sm text-gray-400">{region.recommendation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-8 text-gray-400">No underserved regions identified</p>
                )}
              </div>
            </div>

            {/* Growth Regions Section */}
            <div className="bg-white rounded-lg shadow mb-8">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Growth Regions</h2>
                <p className="text-sm text-gray-400 mt-1">High demand with moderate contractor supply - potential for expansion</p>
              </div>
              <div className="p-6">
                {data.growthRegions.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.growthRegions.map((region, idx) => (
                      <div key={idx} className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{region.region}</h3>
                        <div className="space-y-2 mb-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">Jobs:</span>
                            <span className="font-bold text-gray-900">{region.jobCount.toLocaleString('en-AU')}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">Contractors:</span>
                            <span className="font-bold text-gray-900">{region.contractorCount.toLocaleString('en-AU')}</span>
                          </div>
                        </div>
                        <div className="bg-yellow-100 border border-yellow-300 rounded px-3 py-2">
                          <p className="text-xs font-medium text-yellow-800">{region.growthPotential}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-8 text-gray-400">No growth regions identified</p>
                )}
              </div>
            </div>

            {/* Expansion Recommendations Section */}
            <div className="bg-white rounded-lg shadow mb-8">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Expansion Recommendations</h2>
                <p className="text-sm text-gray-400 mt-1">Strategic regions to prioritise for contractor recruitment</p>
              </div>
              <div className="p-6">
                {data.expansionRecommendations.length > 0 ? (
                  <div className="space-y-3">
                    {data.expansionRecommendations.map((rec, idx) => (
                      <div key={idx} className={`border rounded-lg p-4 ${getPriorityColor(rec.priority)}`}>
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-bold text-gray-900">{rec.region}</h3>
                              <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${getPriorityBadgeColor(rec.priority)}`}>
                                {rec.priority}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 font-medium mb-2">{rec.reason}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-xs text-gray-400">Jobs</p>
                            <p className="text-lg font-bold text-gray-900">{rec.jobCount.toLocaleString('en-AU')}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Contractors</p>
                            <p className="text-lg font-bold text-gray-900">{rec.contractorCount.toLocaleString('en-AU')}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Coverage</p>
                            <p className="text-lg font-bold text-gray-900">{rec.coveragePercentage.toFixed(1)}%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-8 text-gray-400">No expansion recommendations available</p>
                )}
              </div>
            </div>

            {/* Heatmap Visualization Section */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Regional Demand Heatmap</h2>
                <p className="text-sm text-gray-400 mt-1">Visual representation of demand intensity and supply adequacy</p>
              </div>
              <div className="p-6">
                {data.heatmap.length > 0 ? (
                  <>
                    <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Legend:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-600 rounded"></div>
                        <span className="text-xs text-gray-400">High Demand / Low Supply</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                        <span className="text-xs text-gray-400">Moderate Balance</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-600 rounded"></div>
                        <span className="text-xs text-gray-400">Adequate Supply</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {data.heatmap.map((region, idx) => (
                        <div
                          key={idx}
                          className="rounded-lg p-4 border-2 transition-transform hover:scale-105"
                          style={{
                            backgroundColor: region.color,
                            borderColor: region.color,
                          }}
                        >
                          <h3 className="text-sm font-bold text-white mb-2 drop-shadow-md">{region.region}</h3>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-white/90 drop-shadow">Demand:</span>
                              <span className="text-sm font-bold text-white drop-shadow">{region.demandIntensity}%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-white/90 drop-shadow">Supply:</span>
                              <span className="text-sm font-bold text-white drop-shadow">{region.supplyAdequacy}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-center py-8 text-gray-400">No heatmap data available</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
