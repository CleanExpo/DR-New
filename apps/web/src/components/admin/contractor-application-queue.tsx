'use client';

/**
 * ContractorApplicationQueue — DR-198
 *
 * Admin-facing queue for reviewing, approving, and rejecting
 * contractor applications. Used in the admin portal.
 *
 * Design: Scientific Luxury — OLED black #050505, accent #00BFA6
 */

import React, { useCallback, useEffect, useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  FileText,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ApplicationStatus = 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'CONTACTED';

interface ContractorApplicationRecord {
  id: string;
  businessName: string;
  contactName: string;
  abn: string;
  certifications: string[];
  serviceAreas: string[];
  yearsInBusiness: number;
  status: ApplicationStatus;
  notes: string | null;
  rejectionReason: string | null;
  reviewedAt: string | null;
  reviewedBy: string | null;
  emailSent: boolean;
  createdAt: string;
}

interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

// ---------------------------------------------------------------------------
// Status badge
// ---------------------------------------------------------------------------

const STATUS_CONFIG: Record<
  ApplicationStatus,
  { label: string; className: string; icon: React.ComponentType<{ className?: string }> }
> = {
  PENDING: { label: 'Pending', className: 'bg-yellow-900/30 text-yellow-400 border-yellow-800', icon: Clock },
  UNDER_REVIEW: { label: 'Under Review', className: 'bg-blue-900/30 text-blue-400 border-blue-800', icon: Eye },
  APPROVED: { label: 'Approved', className: 'bg-emerald-900/30 text-[#00BFA6] border-emerald-800', icon: CheckCircle2 },
  REJECTED: { label: 'Rejected', className: 'bg-red-900/30 text-red-400 border-red-800', icon: XCircle },
  CONTACTED: { label: 'Contacted', className: 'bg-purple-900/30 text-purple-400 border-purple-800', icon: FileText },
};

function StatusBadge({ status }: { status: ApplicationStatus }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.PENDING;
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${config.className}`}
    >
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Review modal
// ---------------------------------------------------------------------------

interface ReviewModalProps {
  application: ContractorApplicationRecord;
  onClose: () => void;
  onReview: (id: string, action: 'APPROVE' | 'REJECT' | 'UNDER_REVIEW', notes?: string, rejectionReason?: string) => Promise<void>;
}

function ReviewModal({ application, onClose, onReview }: ReviewModalProps) {
  const [action, setAction] = useState<'APPROVE' | 'REJECT' | 'UNDER_REVIEW' | null>(null);
  const [notes, setNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!action) return;
    if (action === 'REJECT' && rejectionReason.trim().length < 10) {
      setError('Rejection reason must be at least 10 characters.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await onReview(
        application.id,
        action,
        notes.trim() || undefined,
        action === 'REJECT' ? rejectionReason.trim() : undefined
      );
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl w-full max-w-lg shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-zinc-800">
          <div>
            <h3 className="text-white font-semibold text-lg">{application.businessName}</h3>
            <p className="text-zinc-400 text-sm">{application.contactName} · ABN {application.abn}</p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors p-1"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Details */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Specialisations</p>
              <p className="text-zinc-200">
                {application.certifications.length > 0
                  ? application.certifications.join(', ')
                  : '—'}
              </p>
            </div>
            <div>
              <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Service Areas</p>
              <p className="text-zinc-200">
                {application.serviceAreas.length > 0 ? application.serviceAreas.join(', ') : '—'}
              </p>
            </div>
            <div>
              <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Years in Business</p>
              <p className="text-zinc-200">{application.yearsInBusiness}</p>
            </div>
            <div>
              <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Applied</p>
              <p className="text-zinc-200">
                {new Date(application.createdAt).toLocaleDateString('en-AU', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>

          {application.notes && (
            <div>
              <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Pre-Check Notes</p>
              <pre className="text-zinc-300 text-xs bg-zinc-900 border border-zinc-800 rounded-lg p-3 whitespace-pre-wrap font-sans">
                {application.notes}
              </pre>
            </div>
          )}

          {/* Action selector */}
          <div>
            <p className="text-zinc-400 text-sm mb-2">Review Decision</p>
            <div className="flex gap-2">
              {(['APPROVE', 'UNDER_REVIEW', 'REJECT'] as const).map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAction(a)}
                  className={`flex-1 px-3 py-2 rounded-lg border text-xs font-medium transition-colors ${
                    action === a
                      ? a === 'APPROVE'
                        ? 'border-[#00BFA6] bg-[#00BFA6]/10 text-[#00BFA6]'
                        : a === 'REJECT'
                          ? 'border-red-500 bg-red-900/20 text-red-400'
                          : 'border-blue-500 bg-blue-900/20 text-blue-400'
                      : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
                  }`}
                >
                  {a === 'APPROVE' ? 'Approve' : a === 'REJECT' ? 'Reject' : 'Under Review'}
                </button>
              ))}
            </div>
          </div>

          {/* Rejection reason */}
          {action === 'REJECT' && (
            <div>
              <label className="block text-xs text-zinc-400 mb-1.5">
                Rejection Reason <span className="text-red-400">*</span>
              </label>
              <textarea
                rows={3}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-red-500 resize-none"
                placeholder="Explain why the application does not meet NRPG requirements..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            </div>
          )}

          {/* Internal notes */}
          {action && (
            <div>
              <label className="block text-xs text-zinc-400 mb-1.5">Internal Notes (optional)</label>
              <textarea
                rows={2}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-zinc-500 resize-none"
                placeholder="Private notes visible to admin only..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-sm text-red-400 bg-red-900/20 border border-red-800 rounded-lg p-3">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-zinc-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!action || submitting}
            className="flex items-center gap-2 px-5 py-2 bg-[#00BFA6] hover:bg-[#00a693] text-[#050505] font-semibold text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Confirm Decision'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const STATUS_FILTERS: { value: string; label: string }[] = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'UNDER_REVIEW', label: 'Under Review' },
  { value: 'APPROVED', label: 'Approved' },
  { value: 'REJECTED', label: 'Rejected' },
  { value: 'ALL', label: 'All' },
];

export function ContractorApplicationQueue() {
  const [statusFilter, setStatusFilter] = useState('PENDING');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState<ContractorApplicationRecord[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] = useState<ContractorApplicationRecord | null>(null);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await fetch(
        `/api/admin/contractor-applications?status=${statusFilter}&page=${page}`,
        { cache: 'no-store' }
      );
      if (!res.ok) {
        setFetchError('Failed to load applications.');
        return;
      }
      const data = await res.json();
      setApplications(data.applications);
      setPagination(data.pagination);
    } catch {
      setFetchError('Network error. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, page]);

  useEffect(() => {
    void fetchApplications();
  }, [fetchApplications]);

  async function handleReview(
    id: string,
    action: 'APPROVE' | 'REJECT' | 'UNDER_REVIEW',
    notes?: string,
    rejectionReason?: string
  ) {
    const res = await fetch('/api/admin/contractor-applications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, applicationId: id, notes, rejectionReason }),
    });

    if (!res.ok) {
      const json = await res.json();
      throw new Error(json.error ?? 'Failed to submit review.');
    }

    await fetchApplications();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Contractor Applications</h2>
          <p className="text-zinc-400 text-sm mt-0.5">
            Review and approve contractor applications before onboarding begins.
          </p>
        </div>
        <button
          onClick={() => void fetchApplications()}
          className="px-4 py-2 text-sm border border-zinc-700 text-zinc-300 rounded-lg hover:border-zinc-500 transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Status filter tabs */}
      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => {
              setStatusFilter(f.value);
              setPage(1);
            }}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
              statusFilter === f.value
                ? 'bg-[#00BFA6]/10 text-[#00BFA6] border border-[#00BFA6]/40'
                : 'border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 text-[#00BFA6] animate-spin" />
        </div>
      ) : fetchError ? (
        <div className="flex items-center gap-2 p-4 bg-red-900/20 border border-red-800 rounded-lg text-sm text-red-400">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {fetchError}
        </div>
      ) : applications.length === 0 ? (
        <div className="text-center py-16 text-zinc-500">
          <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>No {statusFilter.toLowerCase()} applications.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 hover:border-zinc-600 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-white font-medium truncate">{app.businessName}</h3>
                    <StatusBadge status={app.status as ApplicationStatus} />
                  </div>
                  <p className="text-zinc-400 text-sm mt-0.5">
                    {app.contactName} · ABN {app.abn} · {app.yearsInBusiness} yr
                    {app.yearsInBusiness !== 1 ? 's' : ''} in business
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {app.certifications.slice(0, 4).map((c) => (
                      <span
                        key={c}
                        className="px-2 py-0.5 bg-zinc-900 border border-zinc-700 rounded text-xs text-zinc-300"
                      >
                        {c.replace(/_/g, ' ')}
                      </span>
                    ))}
                    {app.certifications.length > 4 && (
                      <span className="text-xs text-zinc-500 self-center">
                        +{app.certifications.length - 4} more
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-600 mt-2">
                    Applied{' '}
                    {new Date(app.createdAt).toLocaleDateString('en-AU', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                    {app.serviceAreas.length > 0 && ` · Services: ${app.serviceAreas.join(', ')}`}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedApp(app)}
                  className="flex-shrink-0 px-4 py-2 border border-zinc-700 text-zinc-300 text-sm rounded-lg hover:border-[#00BFA6] hover:text-[#00BFA6] transition-colors"
                >
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
          <p className="text-xs text-zinc-500">
            {pagination.total} application{pagination.total !== 1 ? 's' : ''} ·{' '}
            Page {pagination.page} of {pagination.totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
              className="p-2 border border-zinc-700 rounded-lg text-zinc-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= pagination.totalPages}
              className="p-2 border border-zinc-700 rounded-lg text-zinc-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Review modal */}
      {selectedApp && (
        <ReviewModal
          application={selectedApp}
          onClose={() => setSelectedApp(null)}
          onReview={handleReview}
        />
      )}
    </div>
  );
}
