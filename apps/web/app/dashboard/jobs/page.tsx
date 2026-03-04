'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import {
  Briefcase,
  Calendar,
  ChevronDown,
  Clock,
  DollarSign,
  Filter,
  Loader2,
  MapPin,
  Plus,
  Search,
  User,
} from 'lucide-react';

const JOB_STATUS_CONFIG: Record<string, { label: string; colour: string; bgColour: string }> = {
  PENDING: { label: 'Pending', colour: '#FFB800', bgColour: 'rgba(255, 184, 0, 0.15)' },
  ASSIGNED: { label: 'Assigned', colour: '#00F5FF', bgColour: 'rgba(0, 245, 255, 0.15)' },
  IN_PROGRESS: { label: 'In Progress', colour: '#0d9488', bgColour: 'rgba(13, 148, 136, 0.15)' },
  COMPLETED: { label: 'Completed', colour: '#00FF88', bgColour: 'rgba(0, 255, 136, 0.15)' },
  INVOICED: { label: 'Invoiced', colour: '#a78bfa', bgColour: 'rgba(167, 139, 250, 0.15)' },
  PAID: { label: 'Paid', colour: '#34d399', bgColour: 'rgba(52, 211, 153, 0.15)' },
};

const JOB_TYPE_LABELS: Record<string, string> = {
  water: 'Water Damage',
  fire: 'Fire Damage',
  mould: 'Mould Remediation',
  storm: 'Storm Damage',
  asbestos: 'Asbestos Removal',
};

interface Job {
  id: string;
  jobNumber: string;
  type: string;
  status: string;
  estimatedCost: string | null;
  actualCost: string | null;
  scheduledDate: string | null;
  createdAt: string;
  notes: string | null;
  property: {
    streetAddress: string;
    suburb: string;
    state: string;
    postcode: string;
  };
  contractor: {
    id: string;
    businessName: string;
    isVerified: boolean;
  } | null;
  _count: {
    documents: number;
    photos: number;
  };
}

export default function JobsListPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: page.toString(), limit: '20' });
      if (statusFilter) params.set('status', statusFilter);
      if (typeFilter) params.set('type', typeFilter);
      if (searchQuery) params.set('search', searchQuery);

      const res = await fetch(`/api/jobs?${params}`);
      const data = await res.json();
      if (data.success) {
        setJobs(data.data);
        setTotal(data.pagination.total);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, typeFilter, searchQuery]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchJobs();
    }
  }, [user, fetchJobs]);

  if (authLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#050505]">
        <Loader2 className="h-8 w-8 animate-spin text-[#0d9488]" />
      </div>
    );
  }

  const totalPages = Math.ceil(total / 20);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <div className="border-b border-white/10 px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Job Management</h1>
            <p className="text-sm text-gray-400 mt-1">
              {total} job{total !== 1 ? 's' : ''} total
            </p>
          </div>
          <button
            onClick={() => router.push('/dashboard/jobs/new')}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#0d9488] hover:bg-[#0d9488]/80 text-white rounded-lg font-medium transition-colours text-sm"
          >
            <Plus className="h-4 w-4" />
            New Job
          </button>
        </div>

        {/* Search & Filters */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search by job number or notes..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#0d9488] focus:border-[#0d9488]"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition-colours"
          >
            <Filter className="h-4 w-4" />
            Filters
            <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {showFilters && (
          <div className="mt-3 flex flex-col sm:flex-row gap-3">
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#0d9488]"
            >
              <option value="">All Statuses</option>
              {Object.entries(JOB_STATUS_CONFIG).map(([key, cfg]) => (
                <option key={key} value={key}>{cfg.label}</option>
              ))}
            </select>
            <select
              value={typeFilter}
              onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
              className="px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#0d9488]"
            >
              <option value="">All Types</option>
              {Object.entries(JOB_TYPE_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Job List */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-[#0d9488]" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20">
            <Briefcase className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-400">No jobs found</h3>
            <p className="text-sm text-gray-500 mt-1">Create a new job to get started.</p>
            <button
              onClick={() => router.push('/dashboard/jobs/new')}
              className="mt-4 px-4 py-2 bg-[#0d9488] hover:bg-[#0d9488]/80 text-white rounded-lg text-sm font-medium transition-colours"
            >
              Create Job
            </button>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Job #</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Property</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Contractor</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Cost</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => {
                    const statusCfg = JOB_STATUS_CONFIG[job.status] || JOB_STATUS_CONFIG.PENDING;
                    return (
                      <tr
                        key={job.id}
                        onClick={() => router.push(`/dashboard/jobs/${job.id}`)}
                        className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colours"
                      >
                        <td className="py-3 px-4">
                          <span className="font-mono text-sm text-[#00F5FF]">{job.jobNumber}</span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-300">
                          {JOB_TYPE_LABELS[job.type] || job.type}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                            style={{ colour: statusCfg.colour, backgroundColor: statusCfg.bgColour, color: statusCfg.colour }}
                          >
                            {statusCfg.label}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-400 max-w-[200px] truncate">
                          {job.property.suburb}, {job.property.state}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-400">
                          {job.contractor?.businessName || <span className="text-gray-600">Unassigned</span>}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-300">
                          ${Number(job.actualCost || job.estimatedCost || 0).toLocaleString('en-AU')}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-500">
                          {new Date(job.createdAt).toLocaleDateString('en-AU')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {jobs.map((job) => {
                const statusCfg = JOB_STATUS_CONFIG[job.status] || JOB_STATUS_CONFIG.PENDING;
                return (
                  <div
                    key={job.id}
                    onClick={() => router.push(`/dashboard/jobs/${job.id}`)}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 cursor-pointer hover:bg-white/8 transition-colours"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-sm text-[#00F5FF]">{job.jobNumber}</span>
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        style={{ color: statusCfg.colour, backgroundColor: statusCfg.bgColour }}
                      >
                        {statusCfg.label}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-white mb-2">
                      {JOB_TYPE_LABELS[job.type] || job.type}
                    </p>
                    <div className="space-y-1 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3 w-3" />
                        {job.property.suburb}, {job.property.state} {job.property.postcode}
                      </div>
                      {job.contractor && (
                        <div className="flex items-center gap-1.5">
                          <User className="h-3 w-3" />
                          {job.contractor.businessName}
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="h-3 w-3" />
                        ${Number(job.actualCost || job.estimatedCost || 0).toLocaleString('en-AU')}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" />
                        {new Date(job.createdAt).toLocaleDateString('en-AU')}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-gray-400">
                  Page {page} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colours"
                  >
                    Previous
                  </button>
                  <button
                    disabled={page >= totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colours"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
