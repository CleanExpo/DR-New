'use client';

import { useState, useEffect, useCallback } from 'react';

export interface TrainingModule {
  moduleId: string;
  title: string;
  duration: string;
  course: string;
  courseId: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  progress: number;
  startedAt: string | null;
  completedAt: string | null;
}

export interface TrainingCourse {
  courseId: string;
  title: string;
  description: string;
  totalModules: number;
  completedCount: number;
  modules: TrainingModule[];
}

export interface TrainingSummary {
  total: number;
  completed: number;
  inProgress: number;
  notStarted: number;
  percentComplete: number;
  totalDuration: string;
}

export interface TrainingData {
  courses: TrainingCourse[];
  modules: TrainingModule[];
  summary: TrainingSummary;
  onboardingId: string;
  onboardingStatus: string;
}

export function useTrainingModules(token: string | null) {
  const [data, setData] = useState<TrainingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchModules = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/training/modules', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error ?? `HTTP ${response.status}`);
      }

      const result = await response.json() as TrainingData;
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load training modules');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  const startModule = async (moduleId: string): Promise<boolean> => {
    if (!token) return false;

    try {
      const response = await fetch(`/api/training/modules/${moduleId}/start`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      await fetchModules();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start module');
      return false;
    }
  };

  const completeModule = async (moduleId: string): Promise<boolean> => {
    if (!token) return false;

    try {
      const response = await fetch(`/api/training/modules/${moduleId}/complete`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      await fetchModules();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete module');
      return false;
    }
  };

  return { data, loading, error, fetchModules, startModule, completeModule };
}
