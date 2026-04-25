'use client';

import dynamic from 'next/dynamic';
import { Component, useEffect, useState, type ReactNode } from 'react';
import type { Map3DProps } from './types';

// ─── Error Boundary ──────────────────────────────────────────────────────────

interface ErrorBoundaryState {
  hasError: boolean;
}

class Map3DErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

// ─── Fallback UI ─────────────────────────────────────────────────────────────

function Map3DFallback({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="relative h-screen w-full bg-[#080a0f] flex items-center justify-center">
      <div className="text-center space-y-4 px-6">
        <p className="text-white font-mono text-base">Map unavailable</p>
        <p className="text-slate-400 text-sm">
          The 3D map could not load. This may be due to WebGL not being supported in your browser.
        </p>
        <button
          onClick={onRetry}
          className="mt-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Reload
        </button>
      </div>
    </div>
  );
}

// ─── Dynamic import ──────────────────────────────────────────────────────────

const Map3DCanvas = dynamic(() => import('./Map3DCanvas'), {
  ssr: false,
  loading: () => (
    <div className="relative h-screen w-full bg-[#080a0f] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4" />
        <p className="text-white font-mono text-sm uppercase tracking-widest">Loading 3D Map...</p>
      </div>
    </div>
  ),
});

/** Thin wrapper that signals to the parent when Map3DCanvas has actually mounted. */
function Map3DLoaded({ onMounted, props }: { onMounted: () => void; props: Map3DProps }) {
  useEffect(() => {
    onMounted();
  }, [onMounted]);
  return <Map3DCanvas {...props} />;
}

// Re-export types
export type { Contractor, Incident, Stats, GeoData, IncidentLocation, Map3DProps } from './types';

// ─── Main export ─────────────────────────────────────────────────────────────

/**
 * DR-755: Wraps Map3DCanvas in an ErrorBoundary with a 10-second load
 * timeout. If WebGL initialisation or the dynamic import fails the user
 * sees a friendly "Map unavailable — [Reload]" fallback instead of an
 * indefinitely spinning loader.
 */
export default function Map3D(props: Map3DProps) {
  const [failed, setFailed] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [key, setKey] = useState(0); // increment to force remount on retry

  // 10-second timeout — if the canvas hasn't mounted yet, show fallback
  useEffect(() => {
    if (loaded || failed) return;
    const timer = setTimeout(() => setTimedOut(true), 10_000);
    return () => clearTimeout(timer);
  }, [loaded, failed, key]);

  const handleRetry = () => {
    setFailed(false);
    setTimedOut(false);
    setLoaded(false);
    setKey((k) => k + 1);
  };

  if (failed || timedOut) {
    return <Map3DFallback onRetry={handleRetry} />;
  }

  return (
    <Map3DErrorBoundary key={key} onError={() => setFailed(true)}>
      <Map3DLoaded props={props} onMounted={() => setLoaded(true)} />
    </Map3DErrorBoundary>
  );
}

// Named export for explicit imports
export { Map3DCanvas };
