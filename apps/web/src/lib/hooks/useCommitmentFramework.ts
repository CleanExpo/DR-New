'use client';

/**
 * useCommitmentFramework — DR-192
 *
 * Hook that fetches the contractor's commitment framework signing status.
 * Use to gate training portal access:
 *
 * ```tsx
 * const { signed, loading } = useCommitmentFramework();
 * if (!signed) return <CommitmentFrameworkSigning />;
 * ```
 */

import { useEffect, useState } from 'react';

interface CommitmentStatus {
  loading: boolean;
  signed: boolean;
  error: boolean;
}

export function useCommitmentFramework(): CommitmentStatus {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/nrpg/commitment-framework')
      .then(async (res) => {
        if (!res.ok) {
          setError(true);
          return;
        }
        const data = (await res.json()) as { signed: boolean };
        if (!cancelled) setSigned(data.signed);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { loading, signed, error };
}
