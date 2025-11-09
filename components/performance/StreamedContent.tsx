/**
 * StreamedContent - React Server Component with Suspense streaming
 *
 * Demonstrates parallel data fetching and progressive rendering
 */

import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Simulate async data fetching (replace with real API calls)
async function fetchServiceData() {
  // In production, this would be an actual API call or database query
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    services: [
      { id: 1, name: 'Water Damage Restoration', count: 150 },
      { id: 2, name: 'Fire Damage Restoration', count: 75 },
      { id: 3, name: 'Mould Remediation', count: 60 },
      { id: 4, name: 'Storm Damage Restoration', count: 45 },
    ],
  };
}

async function fetchTestimonials() {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    testimonials: [
      {
        id: 1,
        author: 'John Smith',
        suburb: 'Hamilton',
        rating: 5,
        text: 'Outstanding service! Water damage resolved within hours.',
      },
      {
        id: 2,
        author: 'Sarah Jones',
        suburb: 'Ascot',
        rating: 5,
        text: 'Master Restorer expertise made all the difference.',
      },
    ],
  };
}

async function fetchRecentJobs() {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return {
    jobs: [
      { id: 1, type: 'Water Damage', suburb: 'New Farm', status: 'Completed' },
      { id: 2, type: 'Fire Damage', suburb: 'Toowong', status: 'In Progress' },
      { id: 3, type: 'Mould Remediation', suburb: 'Hamilton', status: 'Completed' },
    ],
  };
}

// Server Components (fetch data on server)
async function ServiceStats() {
  const data = await fetchServiceData();

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4">Service Statistics</h3>
      <div className="space-y-3">
        {data.services.map((service) => (
          <div key={service.id} className="flex justify-between items-center">
            <span className="text-gray-700">{service.name}</span>
            <span className="font-bold text-blue-600">{service.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

async function TestimonialsList() {
  const data = await fetchTestimonials();

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4">Recent Testimonials</h3>
      <div className="space-y-4">
        {data.testimonials.map((testimonial) => (
          <div key={testimonial.id} className="border-l-4 border-gold-500 pl-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold">{testimonial.author}</span>
              <span className="text-sm text-gray-500">• {testimonial.suburb}</span>
              <span className="text-yellow-500">{'★'.repeat(testimonial.rating)}</span>
            </div>
            <p className="text-gray-600 text-sm">{testimonial.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

async function RecentJobsTable() {
  const data = await fetchRecentJobs();

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4">Recent Jobs</h3>
      <div className="space-y-2">
        {data.jobs.map((job) => (
          <div key={job.id} className="flex justify-between items-center py-2 border-b">
            <div>
              <div className="font-medium">{job.type}</div>
              <div className="text-sm text-gray-500">{job.suburb}</div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                job.status === 'Completed'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {job.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Loading skeletons
function ServiceStatsSkeleton() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <Skeleton className="h-6 w-40 mb-4" />
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex justify-between">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-5 w-12" />
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimonialsListSkeleton() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <Skeleton className="h-6 w-48 mb-4" />
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="border-l-4 border-gray-200 pl-4">
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentJobsTableSkeleton() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <Skeleton className="h-6 w-32 mb-4" />
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex justify-between items-center py-2 border-b">
            <div>
              <Skeleton className="h-5 w-40 mb-1" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Main StreamedContent component
 * Uses Suspense boundaries for progressive rendering
 */
export default function StreamedContent() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          Live Dashboard (Streamed Content)
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Each section loads independently */}
          <Suspense fallback={<ServiceStatsSkeleton />}>
            <ServiceStats />
          </Suspense>

          <Suspense fallback={<TestimonialsListSkeleton />}>
            <TestimonialsList />
          </Suspense>

          <Suspense fallback={<RecentJobsTableSkeleton />}>
            <RecentJobsTable />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

/**
 * Usage in page:
 *
 * import StreamedContent from '@/components/performance/StreamedContent';
 *
 * export default function Page() {
 *   return (
 *     <div>
 *       <Hero /> {/* Renders immediately */}
 *       <StreamedContent /> {/* Streams progressively */}
 *     </div>
 *   );
 * }
 */
