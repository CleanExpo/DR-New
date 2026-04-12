'use client';

import { useState, useCallback, useEffect } from 'react';

export interface ContractorStats {
  activeProjects: number;
  totalEarnings: number;
  completedJobs: number;
  rating: number;
  todaysOpportunities: number;
}

export interface UseContractorStatsReturn {
  stats: ContractorStats | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useContractorStats(): UseContractorStatsReturn {
  const [stats, setStats] = useState<ContractorStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/contractor/stats', { cache: 'no-store' });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? 'Failed to load stats');
        return;
      }
      if (json.success && json.data) {
        setStats(json.data as ContractorStats);
      }
    } catch {
      setError('Failed to load stats');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
}
