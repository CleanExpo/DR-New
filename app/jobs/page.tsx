import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { JobCard } from '@/components/jobs/JobCard';
import { Skeleton } from '@/components/ui/skeleton';
import {
  PlusIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { Job, JobListParams } from '@/lib/types/job';

export const metadata: Metadata = {
  title: 'Jobs | NRPG Platform CRM',
  description: 'Manage restoration jobs and track progress',
};

interface JobsPageProps {
  searchParams: {
    page?: string;
    status?: string;
    priority?: string;
    search?: string;
    technicianId?: string;
    clientId?: string;
  };
}

async function getJobs(params: JobListParams) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.set('page', params.page.toString());
  if (params.limit) searchParams.set('limit', params.limit.toString());
  if (params.status) searchParams.set('status', params.status);
  if (params.priority) searchParams.set('priority', params.priority);
  if (params.search) searchParams.set('search', params.search);
  if (params.technicianId) searchParams.set('technicianId', params.technicianId);
  if (params.clientId) searchParams.set('clientId', params.clientId);

  const url = `${baseUrl}/api/jobs?${searchParams.toString()}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 30 }, // Revalidate every 30 seconds
    });

    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return {
      jobs: [],
      pagination: {
        page: 1,
        limit: 50,
        total: 0,
        totalPages: 0,
      },
    };
  }
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const params: JobListParams = {
    page: searchParams.page ? parseInt(searchParams.page) : 1,
    limit: 50,
    status: searchParams.status as any,
    priority: searchParams.priority as any,
    search: searchParams.search,
    technicianId: searchParams.technicianId,
    clientId: searchParams.clientId,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  };

  const { jobs, pagination, filters } = await getJobs(params);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Jobs</h1>
              <p className="text-muted-foreground mt-1">
                Manage and track restoration jobs
              </p>
            </div>
            <Link href="/jobs/new">
              <Button size="lg" className="gap-2">
                <PlusIcon className="w-5 h-5" />
                Create New Job
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters Section */}
        <div className="bg-card rounded-lg border p-4 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            {/* Search */}
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search jobs by title, client, or location..."
                  defaultValue={searchParams.search}
                  className="w-full pl-10 pr-4 py-2 border rounded-md"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const value = e.currentTarget.value;
                      const url = new URL(window.location.href);
                      if (value) {
                        url.searchParams.set('search', value);
                      } else {
                        url.searchParams.delete('search');
                      }
                      url.searchParams.delete('page');
                      window.location.href = url.toString();
                    }
                  }}
                />
              </div>
            </div>

            {/* Status Filter */}
            <select
              className="px-4 py-2 border rounded-md bg-background"
              defaultValue={searchParams.status || ''}
              onChange={(e) => {
                const url = new URL(window.location.href);
                if (e.target.value) {
                  url.searchParams.set('status', e.target.value);
                } else {
                  url.searchParams.delete('status');
                }
                url.searchParams.delete('page');
                window.location.href = url.toString();
              }}
            >
              <option value="">All Statuses</option>
              <option value="DRAFT">Draft</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>

            {/* Priority Filter */}
            <select
              className="px-4 py-2 border rounded-md bg-background"
              defaultValue={searchParams.priority || ''}
              onChange={(e) => {
                const url = new URL(window.location.href);
                if (e.target.value) {
                  url.searchParams.set('priority', e.target.value);
                } else {
                  url.searchParams.delete('priority');
                }
                url.searchParams.delete('page');
                window.location.href = url.toString();
              }}
            >
              <option value="">All Priorities</option>
              <option value="EMERGENCY">Emergency</option>
              <option value="URGENT">Urgent</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>

            {/* Clear Filters */}
            {(searchParams.search || searchParams.status || searchParams.priority) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  window.location.href = '/jobs';
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>

          {/* Active Filters Display */}
          {filters && Object.keys(filters).length > 0 && (
            <div className="mt-3 pt-3 border-t">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FunnelIcon className="w-4 h-4" />
                <span>Active filters:</span>
                <div className="flex gap-2">
                  {Object.entries(filters).map(([key, value]) => (
                    <span key={key} className="bg-primary/10 text-primary px-2 py-1 rounded">
                      {key}: {value as string}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-card border rounded-lg p-4">
            <div className="text-sm text-muted-foreground">Total Jobs</div>
            <div className="text-2xl font-bold">{pagination.total}</div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="text-sm text-muted-foreground">In Progress</div>
            <div className="text-2xl font-bold text-yellow-600">
              {jobs.filter((j: Job) => j.status === 'IN_PROGRESS').length}
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="text-sm text-muted-foreground">Scheduled</div>
            <div className="text-2xl font-bold text-blue-600">
              {jobs.filter((j: Job) => j.status === 'SCHEDULED').length}
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="text-sm text-muted-foreground">Emergency</div>
            <div className="text-2xl font-bold text-red-600">
              {jobs.filter((j: Job) => j.isEmergency).length}
            </div>
          </div>
        </div>

        {/* Jobs Grid */}
        {jobs.length === 0 ? (
          <div className="bg-card border rounded-lg p-12 text-center">
            <div className="text-muted-foreground mb-4">
              <svg
                className="w-16 h-16 mx-auto mb-4 opacity-20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
              <p>Get started by creating your first job</p>
            </div>
            <Link href="/jobs/new">
              <Button>Create New Job</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job: Job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  disabled={pagination.page === 1}
                  onClick={() => {
                    const url = new URL(window.location.href);
                    url.searchParams.set('page', (pagination.page - 1).toString());
                    window.location.href = url.toString();
                  }}
                >
                  Previous
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                    .filter(
                      (page) =>
                        page === 1 ||
                        page === pagination.totalPages ||
                        (page >= pagination.page - 2 && page <= pagination.page + 2)
                    )
                    .map((page, index, array) => (
                      <React.Fragment key={page}>
                        {index > 0 && array[index - 1] !== page - 1 && (
                          <span className="px-2">...</span>
                        )}
                        <Button
                          variant={page === pagination.page ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => {
                            const url = new URL(window.location.href);
                            url.searchParams.set('page', page.toString());
                            window.location.href = url.toString();
                          }}
                        >
                          {page}
                        </Button>
                      </React.Fragment>
                    ))}
                </div>

                <Button
                  variant="outline"
                  disabled={pagination.page === pagination.totalPages}
                  onClick={() => {
                    const url = new URL(window.location.href);
                    url.searchParams.set('page', (pagination.page + 1).toString());
                    window.location.href = url.toString();
                  }}
                >
                  Next
                </Button>
              </div>
            )}

            {/* Results Info */}
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
              {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
              {pagination.total} jobs
            </div>
          </>
        )}
      </div>
    </div>
  );
}
