'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ChevronLeft,
  AlertCircle,
  CheckCircle,
  MapPin,
  DollarSign,
  Clock,
  MessageCircle,
  Send,
  Loader,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/src/design-system/components/Button/Button';
import { FormInput } from '@/src/design-system/components/Form/FormInput';
import { FormTextarea } from '@/src/design-system/components/Form/FormTextarea';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Validation schema for bid submission
const bidSchema = z.object({
  proposedBudget: z
    .number()
    .positive('Budget must be greater than 0')
    .or(z.string().transform((val) => parseFloat(val))),
  estimatedHours: z
    .number()
    .positive('Hours must be greater than 0')
    .optional()
    .or(z.string().transform((val) => (val ? parseFloat(val) : undefined))),
  startDate: z.string().optional(),
  message: z.string().max(1000, 'Message cannot exceed 1000 characters').optional(),
});

type BidData = z.infer<typeof bidSchema>;

interface JobDetail {
  matchId: string;
  requestId: string;
  disasterType: string;
  description: string;
  location: {
    suburb: string;
    postcode: string;
    state: string;
  };
  estimatedBudget: number;
  emergencyLevel: string;
  clientName: string;
  postedAt: string;
  matchScore: number;
}

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const requestId = params.requestId as string;

  const [job, setJob] = React.useState<JobDetail | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<BidData>({
    resolver: zodResolver(bidSchema),
    mode: 'onChange',
    defaultValues: {
      proposedBudget: 0,
      estimatedHours: 0,
      startDate: '',
      message: '',
    },
  });

  // Load job details from available requests
  React.useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch('/api/contractor/available-requests');
        if (!response.ok) throw new Error('Failed to fetch jobs');

        const data = await response.json();
        const foundJob = data.data?.find((r: JobDetail) => r.requestId === requestId);

        if (!foundJob) throw new Error('Job not found');

        setJob(foundJob);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load job');
      } finally {
        setLoading(false);
      }
    };

    if (requestId) {
      fetchJob();
    }
  }, [requestId]);

  const onSubmit = async (data: BidData) => {
    if (!job) return;

    setSubmitting(true);
    try {
      const response = await fetch('/api/contractor/bids', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          matchId: job.matchId,
          proposedBudget: typeof data.proposedBudget === 'string' ? parseFloat(data.proposedBudget) : data.proposedBudget,
          estimatedHours: typeof data.estimatedHours === 'string' ? parseFloat(data.estimatedHours) : data.estimatedHours,
          startDate: data.startDate,
          message: data.message,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Bid submission failed');
      }

      setSuccess(true);

      // Redirect to my bids page after 2 seconds
      setTimeout(() => {
        router.push('/dashboard/contractor/my-bids');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bid submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  const proposedBudget = watch('proposedBudget');
  const estimatedHours = watch('estimatedHours');

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('en-AU', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="space-y-6">
        <Button variant="outline" onClick={() => router.back()}>
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <Alert className="border-red-600 bg-red-50">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <AlertDescription className="text-red-900">Job not found</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 mt-4 capitalize">
          {job.disasterType.replace('_', ' ')} Job
        </h1>
        <p className="text-gray-400 mt-2">{job.location.suburb}, {job.location.postcode}</p>
      </div>

      {/* Success Alert */}
      {success && (
        <Alert className="border-green-600 bg-green-50">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <AlertDescription className="text-green-900">
            Bid submitted successfully! Redirecting to your bids...
          </AlertDescription>
        </Alert>
      )}

      {/* Error Alert */}
      {error && (
        <Alert className="border-red-600 bg-red-50">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <AlertDescription className="text-red-900">{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Job Overview */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Job Details</h2>
              <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full flex items-center gap-1">
                {job.matchScore} match score
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400 uppercase font-medium mb-2">Description</p>
                <p className="text-gray-700 leading-relaxed">{job.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-400 uppercase font-medium mb-2">Estimated Budget</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(job.estimatedBudget)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase font-medium mb-2">Emergency Level</p>
                  <p className="text-lg font-semibold text-gray-900">{job.emergencyLevel}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <div className="flex items-center gap-1 text-gray-400 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm font-medium uppercase">Location</span>
                  </div>
                  <p className="text-gray-900 font-semibold">{job.location.suburb}</p>
                  <p className="text-xs text-gray-400">{job.location.postcode}, {job.location.state}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase font-medium mb-2">Posted</p>
                  <p className="text-gray-900 font-semibold">{formatDate(job.postedAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase font-medium mb-2">Client</p>
                  <p className="text-gray-900 font-semibold">{job.clientName}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bid Form */}
          {!success && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Send className="h-5 w-5" />
                Submit Your Bid
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Proposed Budget */}
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    type="number"
                    label="Proposed Budget (AUD)"
                    placeholder="Enter your proposed price"
                    step="100"
                    error={errors.proposedBudget?.message}
                    context="emergency"
                    required
                    id="proposed-budget"
                    {...register('proposedBudget', {
                      setValueAs: (val) => (val ? parseFloat(val) : 0),
                    })}
                  />

                  <FormInput
                    type="number"
                    label="Estimated Hours"
                    placeholder="How many hours to complete?"
                    step="0.5"
                    error={errors.estimatedHours?.message}
                    context="emergency"
                    id="estimated-hours"
                    {...register('estimatedHours', {
                      setValueAs: (val) => (val ? parseFloat(val) : undefined),
                    })}
                  />
                </div>

                {/* Start Date */}
                <FormInput
                  type="datetime-local"
                  label="Proposed Start Date"
                  error={errors.startDate?.message}
                  context="emergency"
                  id="start-date"
                  {...register('startDate')}
                />

                {/* Message to Client */}
                <FormTextarea
                  label="Message to Client (Optional)"
                  placeholder="Tell the client why you're the best fit for this job. Highlight your experience, certifications, and why you can deliver quality work..."
                  error={errors.message?.message}
                  context="emergency"
                  maxLength={1000}
                  rows={4}
                  id="message"
                  {...register('message')}
                />

                {/* Hourly Rate Calculation */}
                {proposedBudget && estimatedHours && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900">
                      <strong>Effective Hourly Rate:</strong>{' '}
                      {formatCurrency(proposedBudget / estimatedHours)} / hour
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="emergency-primary"
                  size="lg"
                  className="w-full"
                  loading={submitting}
                  disabled={!isValid || submitting}
                  title={!isValid ? 'Please fill in all required fields' : ''}
                >
                  <Send className="h-5 w-5 mr-2" />
                  {submitting ? 'Submitting Bid...' : 'Submit Bid'}
                </Button>
              </form>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-400">
                  ℹ️ By submitting a bid, you agree to the terms of service and confirm your
                  availability for this job.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info */}
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Info</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400 uppercase font-medium">Match Score</p>
                <p className="text-2xl font-bold text-amber-600 mt-1">{job.matchScore}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {job.matchScore >= 80
                    ? 'Excellent fit for your expertise'
                    : job.matchScore >= 60
                    ? 'Good match for your services'
                    : 'You can still submit a bid'}
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-3">Bid Tips</h3>
            <ul className="text-xs text-blue-900 space-y-2">
              <li>✓ Be competitive but fair with your pricing</li>
              <li>✓ Highlight your relevant experience</li>
              <li>✓ Mention any special certifications</li>
              <li>✓ Show your understanding of the job</li>
              <li>✓ Be professional and clear</li>
            </ul>
          </div>

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-semibold text-green-900">Bid Submitted!</h3>
              <p className="text-sm text-green-800 mt-2">
                The client will review your bid and get back to you soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
