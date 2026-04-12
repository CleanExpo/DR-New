'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  DollarSign,
  Briefcase,
  Loader,
  ChevronLeft,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useJobCompletion } from '@/hooks/useJobCompletion';

interface ServiceRequest {
  id: string;
  disasterType: string;
  description: string;
  suburb?: string;
  postcode?: string;
  state?: string;
  estimatedBudget?: number;
  emergencyLevel?: string;
  user?: {
    id: string;
    name: string | null;
    email: string;
  };
}

interface ActiveJob {
  id: string;
  status: string;
  contractorId: string;
  serviceRequestId: string | null;
  createdAt: string;
  contractorRespondedAt: string | null;
  serviceRequest: ServiceRequest | null;
}

export default function ActiveJobsPage() {
  const router = useRouter();
  const { isSubmitting, completeJob, reset } = useJobCompletion();

  const [jobs, setJobs] = React.useState<ActiveJob[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [fetchError, setFetchError] = React.useState<string | null>(null);

  // Completion dialog state
  const [completeDialog, setCompleteDialog] = React.useState<{
    open: boolean;
    job: ActiveJob | null;
  }>({ open: false, job: null });
  const [completionNotes, setCompletionNotes] = React.useState('');

  const fetchJobs = React.useCallback(async () => {
    try {
      setFetchError(null);
      const res = await fetch('/api/contractor/active-projects');
      if (!res.ok) throw new Error('Failed to fetch active jobs');
      const data = await res.json();
      setJobs(data.data || []);
    } catch (err) {
      setFetchError(err instanceof Error ? err.message : 'Failed to load active jobs');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const openCompleteDialog = (job: ActiveJob) => {
    reset();
    setCompletionNotes('');
    setCompleteDialog({ open: true, job });
  };

  const closeCompleteDialog = () => {
    setCompleteDialog({ open: false, job: null });
  };

  const handleMarkComplete = async () => {
    const { job } = completeDialog;
    if (!job) return;

    // The booking ID is the match ID for this job
    const result = await completeJob(job.id, {
      completionNotes: completionNotes.trim() || undefined,
      requestReview: true,
    });

    if (result.success) {
      closeCompleteDialog();
      toast.success('Job marked as complete. Payout has been initiated.');
      if (result.payout?.warning) {
        toast.warning(result.payout.warning);
      }
      await fetchJobs();
    } else {
      toast.error(result.error || 'Failed to mark job as complete. Please try again.');
    }
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(amount);

  const formatDate = (date: string) =>
    new Date(date).toLocaleString('en-AU', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const getStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
      case 'ACCEPTED':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">Accepted</Badge>;
      case 'IN_PROGRESS':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-300">In Progress</Badge>;
      case 'CONFIRMED':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Confirmed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const { job: activeJob } = completeDialog;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-3 -ml-2">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Active Jobs</h1>
          <p className="text-gray-500 mt-1">
            Jobs you have accepted and are currently working on
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-gray-900">{jobs.length}</p>
          <p className="text-sm text-gray-500">active job{jobs.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Fetch error */}
      {fetchError && (
        <Alert className="border-red-300 bg-red-50">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <AlertDescription className="text-red-800">{fetchError}</AlertDescription>
        </Alert>
      )}

      {/* Jobs list */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
          <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">No active jobs</p>
          <p className="text-gray-400 mt-2 text-sm">
            Accept bids to see your active jobs here.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => router.push('/dashboard/contractor/my-bids')}
          >
            View My Bids
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => {
            const req = job.serviceRequest;
            return (
              <div
                key={job.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap mb-1">
                        <h3 className="text-lg font-semibold text-gray-900 capitalize">
                          {req?.disasterType?.replace(/_/g, ' ') ?? 'Service Request'}
                        </h3>
                        {getStatusBadge(job.status)}
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {req?.description ?? 'No description available'}
                      </p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                    {req?.suburb && (
                      <div>
                        <div className="flex items-center gap-1 text-gray-400 mb-1">
                          <MapPin className="h-3 w-3" />
                          <span className="text-xs font-medium uppercase">Location</span>
                        </div>
                        <p className="font-semibold text-gray-900">{req.suburb}</p>
                        {req.postcode && (
                          <p className="text-xs text-gray-400">{req.postcode}</p>
                        )}
                      </div>
                    )}

                    {req?.estimatedBudget ? (
                      <div>
                        <div className="flex items-center gap-1 text-gray-400 mb-1">
                          <DollarSign className="h-3 w-3" />
                          <span className="text-xs font-medium uppercase">Budget</span>
                        </div>
                        <p className="font-semibold text-gray-900">
                          {formatCurrency(req.estimatedBudget)}
                        </p>
                      </div>
                    ) : null}

                    {req?.user?.name && (
                      <div>
                        <p className="text-xs font-medium text-gray-400 uppercase mb-1">Client</p>
                        <p className="font-semibold text-gray-900">{req.user.name}</p>
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-1 text-gray-400 mb-1">
                        <Clock className="h-3 w-3" />
                        <span className="text-xs font-medium uppercase">Accepted</span>
                      </div>
                      <p className="font-semibold text-gray-900">
                        {job.contractorRespondedAt
                          ? formatDate(job.contractorRespondedAt)
                          : formatDate(job.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Mark Complete action */}
                  <div className="border-t border-gray-100 pt-4 mt-2">
                    <Button
                      size="sm"
                      className="bg-[#1C2E47] hover:bg-[#1C2E47]/90 text-white"
                      onClick={() => openCompleteDialog(job)}
                      disabled={isSubmitting}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Mark as Complete
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Mark Complete Dialog */}
      <Dialog open={completeDialog.open} onOpenChange={(open) => !open && closeCompleteDialog()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Mark Job as Complete</DialogTitle>
            <DialogDescription>
              {activeJob?.serviceRequest?.disasterType
                ? `${activeJob.serviceRequest.disasterType.replace(/_/g, ' ')} — `
                : ''}
              This will trigger your payout and notify the client.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-sm text-blue-800">
              <CheckCircle2 className="h-4 w-4 inline mr-2" />
              Marking a job complete is permanent. Ensure all work is finished before proceeding.
            </div>

            <div className="space-y-1">
              <Label htmlFor="completion-notes">Completion notes (optional)</Label>
              <Textarea
                id="completion-notes"
                placeholder="Describe the work completed, any issues encountered, or notes for the client..."
                rows={4}
                maxLength={2000}
                value={completionNotes}
                onChange={(e) => setCompletionNotes(e.target.value)}
              />
              <p className="text-xs text-gray-400 text-right">
                {completionNotes.length}/2000
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={closeCompleteDialog} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              onClick={handleMarkComplete}
              disabled={isSubmitting}
              className="bg-[#1C2E47] hover:bg-[#1C2E47]/90"
            >
              {isSubmitting ? (
                <Loader className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <CheckCircle2 className="h-4 w-4 mr-2" />
              )}
              {isSubmitting ? 'Completing...' : 'Confirm Complete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
