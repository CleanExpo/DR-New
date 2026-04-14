'use client';

import { useState, useEffect } from 'react';
import { TrainingDashboard } from '@/components/onboarding/training-dashboard';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BookOpen, AlertCircle } from 'lucide-react';

/**
 * Contractor Training Page
 *
 * Reads the JWT token from localStorage (key: 'nrpg_token').
 * The login/auth flow is responsible for storing the token there.
 */
export default function TrainingPage() {
  const [token, setToken] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = typeof window !== 'undefined'
      ? window.localStorage.getItem('nrpg_token')
      : null;
    setToken(stored);
    setHydrated(true);
  }, []);

  return (
    <div className="container max-w-4xl mx-auto py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          Training Courses
        </h1>
        <p className="text-muted-foreground mt-1">
          Complete all 22 modules across Customer Service Excellence and Water Damage Restoration
          to receive your NRPG certification.
        </p>
      </div>

      {!hydrated ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-64 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : !token ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Session not found. Please sign in to access your training modules.
          </AlertDescription>
        </Alert>
      ) : (
        <TrainingDashboard token={token} />
      )}
    </div>
  );
}
