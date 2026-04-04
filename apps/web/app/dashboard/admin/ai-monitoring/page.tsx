'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface ProviderStatus {
  name: string;
  type: string;
  available: boolean;
  latencyMs?: number;
  lastChecked: string;
  error?: string;
}

interface AIMetrics {
  providers: ProviderStatus[];
  usage: {
    period: string;
    totalRequests: number;
    totalTokens: number;
    estimatedCost: number;
    byProvider: Record<string, { requests: number; tokens: number; cost: number }>;
    byWorkflow: Record<string, { requests: number; tokens: number; avgDuration: number }>;
  };
  recentJobs: {
    id: string;
    type: string;
    status: string;
    provider: string;
    tokens: number;
    durationMs: number;
    createdAt: string;
  }[];
  performance: {
    avgLatencyMs: number;
    successRate: number;
    errorRate: number;
    p95LatencyMs: number;
  };
  t5gemma: {
    available: boolean;
    transformersInstalled: boolean;
    modelLoaded: boolean;
    config: Record<string, unknown>;
  };
}

export default function AIMonitoringDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<AIMetrics | null>(null);
  const [period, setPeriod] = useState('day');
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchMetrics = useCallback(async () => {
    try {
      setError(null);
      const response = await fetch(`/api/admin/ai/metrics?period=${period}`);

      if (!response.ok) {
        throw new Error('Failed to fetch AI metrics');
      }

      const data = await response.json();
      if (data.success) {
        setMetrics(data.data);
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching AI metrics:', err);
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated') {
      const user = session?.user as { role?: string };
      if (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') {
        router.push('/dashboard');
      } else {
        fetchMetrics();
      }
    }
  }, [status, session, router, fetchMetrics]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (autoRefresh && status === 'authenticated') {
      const interval = setInterval(fetchMetrics, 30000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, status, fetchMetrics]);

  useEffect(() => {
    if (status === 'authenticated') {
      setLoading(true);
      fetchMetrics();
    }
  }, [period, status, fetchMetrics]);

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading AI metrics...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">Unauthorised access</p>
      </div>
    );
  }

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const formatTokens = (tokens: number) => {
    if (tokens >= 1_000_000) return `${(tokens / 1_000_000).toFixed(2)}M`;
    if (tokens >= 1_000) return `${(tokens / 1_000).toFixed(1)}K`;
    return tokens.toString();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Monitoring Dashboard</h1>
            <p className="text-gray-400 mt-2">
              Real-time AI provider status, usage metrics, and performance insights
            </p>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-gray-400">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="rounded border-gray-300"
              />
              Auto-refresh (30s)
            </label>
            <button
              onClick={fetchMetrics}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh Now
            </button>
          </div>
        </div>

        {/* Period Selector */}
        <div className="mb-6 flex gap-2">
          {['hour', 'day', 'week', 'month'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                period === p
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {metrics && !error && (
          <>
            {/* Provider Status Cards */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Provider Status</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.providers.map((provider) => (
                  <div
                    key={provider.type}
                    className={`rounded-lg shadow p-6 ${
                      provider.available
                        ? 'bg-white border-l-4 border-green-500'
                        : 'bg-gray-50 border-l-4 border-red-500'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-400 text-sm font-medium">{provider.name}</p>
                        <p
                          className={`text-lg font-bold mt-1 ${
                            provider.available ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {provider.available ? 'Online' : 'Offline'}
                        </p>
                      </div>
                      <div
                        className={`w-3 h-3 rounded-full ${
                          provider.available ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      />
                    </div>
                    {provider.latencyMs && (
                      <p className="text-sm text-gray-400 mt-2">
                        Latency: {formatDuration(provider.latencyMs)}
                      </p>
                    )}
                    {provider.error && (
                      <p className="text-sm text-red-600 mt-2 truncate" title={provider.error}>
                        {provider.error}
                      </p>
                    )}
                  </div>
                ))}

                {/* T5Gemma Local Status */}
                <div
                  className={`rounded-lg shadow p-6 ${
                    metrics.t5gemma.available
                      ? 'bg-white border-l-4 border-green-500'
                      : 'bg-gray-50 border-l-4 border-yellow-500'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">T5Gemma (Local)</p>
                      <p
                        className={`text-lg font-bold mt-1 ${
                          metrics.t5gemma.available
                            ? 'text-green-600'
                            : metrics.t5gemma.transformersInstalled
                            ? 'text-yellow-600'
                            : 'text-gray-400'
                        }`}
                      >
                        {metrics.t5gemma.available
                          ? 'Ready'
                          : metrics.t5gemma.transformersInstalled
                          ? 'Loading'
                          : 'Not Installed'}
                      </p>
                    </div>
                    <div
                      className={`w-3 h-3 rounded-full ${
                        metrics.t5gemma.available
                          ? 'bg-green-500'
                          : metrics.t5gemma.transformersInstalled
                          ? 'bg-yellow-500'
                          : 'bg-gray-400'
                      }`}
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Model: {String(metrics.t5gemma.config.modelSize || 'N/A')}
                  </p>
                </div>
              </div>
            </div>

            {/* Usage Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-400 text-sm font-medium">Total Requests</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {metrics.usage.totalRequests.toLocaleString()}
                </p>
                <p className="text-sm text-gray-400 mt-1">This {period}</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-400 text-sm font-medium">Total Tokens</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {formatTokens(metrics.usage.totalTokens)}
                </p>
                <p className="text-sm text-gray-400 mt-1">This {period}</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-400 text-sm font-medium">Estimated Cost</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ${metrics.usage.estimatedCost.toFixed(2)}
                </p>
                <p className="text-sm text-gray-400 mt-1">USD this {period}</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-400 text-sm font-medium">Success Rate</p>
                <p
                  className={`text-3xl font-bold mt-2 ${
                    metrics.performance.successRate >= 95
                      ? 'text-green-600'
                      : metrics.performance.successRate >= 80
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}
                >
                  {metrics.performance.successRate.toFixed(1)}%
                </p>
                <p className="text-sm text-gray-400 mt-1">This {period}</p>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Performance</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Avg Latency</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatDuration(metrics.performance.avgLatencyMs)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">P95 Latency</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatDuration(metrics.performance.p95LatencyMs)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Success Rate</p>
                    <p className="text-2xl font-bold text-green-600">
                      {metrics.performance.successRate.toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Error Rate</p>
                    <p className="text-2xl font-bold text-red-600">
                      {metrics.performance.errorRate.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Usage by Workflow */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Usage by Workflow</h2>
                <div className="space-y-3">
                  {Object.entries(metrics.usage.byWorkflow).length > 0 ? (
                    Object.entries(metrics.usage.byWorkflow).map(([workflow, stats]) => (
                      <div
                        key={workflow}
                        className="flex justify-between items-center pb-2 border-b last:border-b-0"
                      >
                        <div>
                          <span className="text-sm font-medium text-gray-900">
                            {workflow.replace(/_/g, ' ')}
                          </span>
                          <span className="text-xs text-gray-400 ml-2">
                            ({stats.requests} requests)
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-gray-900">
                            {formatTokens(stats.tokens)} tokens
                          </span>
                          <span className="text-xs text-gray-400 block">
                            avg {formatDuration(stats.avgDuration)}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">No workflow data for this period</p>
                  )}
                </div>
              </div>
            </div>

            {/* Recent Jobs */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Recent AI Jobs</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Job ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Workflow
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Tokens
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Created
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {metrics.recentJobs.length > 0 ? (
                      metrics.recentJobs.map((job) => (
                        <tr key={job.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-mono text-gray-400">
                            {job.id.substring(0, 8)}...
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                            {job.type.replace(/_/g, ' ')}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                job.status === 'COMPLETED'
                                  ? 'bg-green-100 text-green-800'
                                  : job.status === 'FAILED'
                                  ? 'bg-red-100 text-red-800'
                                  : job.status === 'PROCESSING'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {job.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                            {formatTokens(job.tokens)}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                            {formatDuration(job.durationMs)}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                            {new Date(job.createdAt).toLocaleString('en-AU')}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-4 py-8 text-center text-sm text-gray-400"
                        >
                          No AI jobs found for this period
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
