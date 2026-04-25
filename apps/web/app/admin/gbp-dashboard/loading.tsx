/**
 * DR-762: Loading skeleton for GBP Analytics Dashboard.
 *
 * The page uses `force-dynamic` (server-renders on every request).
 * Without this file, operators see a blank white screen until the
 * server response arrives. This skeleton preserves layout and signals
 * progress, eliminating the flash.
 */
export default function GBPDashboardLoading() {
  return (
    <main className="bg-slate-900 text-white min-h-screen p-6" aria-busy="true" aria-label="Loading GBP dashboard">
      <div className="max-w-7xl mx-auto animate-pulse">
        {/* Header skeleton */}
        <div className="mb-12">
          <div className="h-10 w-80 bg-slate-700 rounded mb-3" />
          <div className="h-4 w-56 bg-slate-800 rounded" />
        </div>

        {/* Aggregate metric cards skeleton */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="h-4 w-24 bg-slate-700 rounded mb-3" />
              <div className="h-8 w-16 bg-slate-700 rounded" />
            </div>
          ))}
        </div>

        {/* Location card skeletons */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-slate-800 rounded-xl p-6 border border-slate-700 space-y-4">
              <div className="h-5 w-40 bg-slate-700 rounded" />
              <div className="h-4 w-32 bg-slate-700 rounded" />
              <div className="h-4 w-full bg-slate-700 rounded" />
              <div className="h-4 w-3/4 bg-slate-700 rounded" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
