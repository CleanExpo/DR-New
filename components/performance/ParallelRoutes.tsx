/**
 * ParallelRoutes - Demonstrate Next.js parallel route patterns
 *
 * This shows how to use @analytics, @modal slots for advanced routing
 * https://nextjs.org/docs/app/building-your-application/routing/parallel-routes
 */

/**
 * Example directory structure:
 *
 * app/
 * ├── dashboard/
 * │   ├── layout.tsx (implements parallel slots)
 * │   ├── page.tsx
 * │   ├── @analytics/
 * │   │   └── page.tsx
 * │   ├── @activity/
 * │   │   └── page.tsx
 * │   └── @team/
 * │       └── page.tsx
 */

// Example: app/dashboard/layout.tsx
export function DashboardLayout({
  children,
  analytics,
  activity,
  team,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  activity: React.ReactNode;
  team: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Main content */}
        <div className="mb-8">{children}</div>

        {/* Parallel slots - load independently */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Analytics</h2>
            {analytics}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            {activity}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Team Status</h2>
            {team}
          </div>
        </div>
      </div>
    </div>
  );
}

// Example: app/dashboard/@analytics/page.tsx
export async function AnalyticsSlot() {
  // Fetch analytics data (runs in parallel with other slots)
  const analytics = await fetchAnalytics();

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <span className="text-gray-600">Total Jobs</span>
        <span className="font-bold text-2xl text-blue-600">{analytics.totalJobs}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Active Jobs</span>
        <span className="font-bold text-2xl text-green-600">{analytics.activeJobs}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Revenue</span>
        <span className="font-bold text-2xl text-gold-600">${analytics.revenue}</span>
      </div>
    </div>
  );
}

async function fetchAnalytics() {
  // Simulated API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    totalJobs: 330,
    activeJobs: 12,
    revenue: 45000,
  };
}

/**
 * Loading states for parallel routes
 * Create app/dashboard/@analytics/loading.tsx
 */
export function AnalyticsLoading() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex justify-between">
        <div className="h-5 w-24 bg-gray-200 rounded" />
        <div className="h-8 w-16 bg-gray-200 rounded" />
      </div>
      <div className="flex justify-between">
        <div className="h-5 w-24 bg-gray-200 rounded" />
        <div className="h-8 w-16 bg-gray-200 rounded" />
      </div>
      <div className="flex justify-between">
        <div className="h-5 w-24 bg-gray-200 rounded" />
        <div className="h-8 w-16 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

/**
 * Intercepting Routes Example
 * Show modal overlay without navigating away
 */

// app/photos/[id]/page.tsx (full page)
export function PhotoPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg p-8">
        <img
          src={`/images/photo-${params.id}.jpg`}
          alt="Full size photo"
          className="w-full rounded-lg"
        />
        <div className="mt-6">
          <h1 className="text-3xl font-bold">Photo {params.id}</h1>
          <p className="text-gray-600 mt-2">Full page view of the photo</p>
        </div>
      </div>
    </div>
  );
}

// app/@modal/(.)photos/[id]/page.tsx (intercepted modal)
export function PhotoModal({ params }: { params: { id: string } }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-4">
        <img
          src={`/images/photo-${params.id}.jpg`}
          alt="Photo in modal"
          className="w-full rounded-lg"
        />
        <div className="mt-4">
          <h2 className="text-xl font-bold">Photo {params.id}</h2>
          <p className="text-gray-600">Modal overlay view</p>
        </div>
      </div>
    </div>
  );
}
