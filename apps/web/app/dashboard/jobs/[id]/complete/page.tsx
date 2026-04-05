'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  DollarSign,
  Loader2,
  Package,
} from 'lucide-react';

export default function CompleteJobPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [hoursWorked, setHoursWorked] = useState('');
  const [materialsUsed, setMaterialsUsed] = useState('');
  const [actualCost, setActualCost] = useState('');

  useEffect(() => {
    if (!authLoading && !user) router.push('/login');
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!hoursWorked || !actualCost) {
      setError('Hours worked and actual cost are required');
      return;
    }

    setSubmitting(true);
    try {
      const body: Record<string, unknown> = {
        hoursWorked: parseFloat(hoursWorked),
        actualCost: parseFloat(actualCost),
      };
      if (materialsUsed) body.materialsUsed = materialsUsed;

      const res = await fetch(`/api/jobs/${jobId}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(data.message || 'Job completed successfully');
        setTimeout(() => router.push(`/dashboard/jobs/${jobId}`), 1500);
      } else {
        setError(data.error || 'Failed to complete job');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#050505]">
        <Loader2 className="h-8 w-8 animate-spin text-[#0d9488]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <div className="border-b border-white/10 px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => router.push(`/dashboard/jobs/${jobId}`)}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colours mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Job
        </button>
        <h1 className="text-2xl font-bold">Complete Job</h1>
        <p className="text-sm text-gray-400 mt-1">
          Record completion details for this job
        </p>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-2xl">
        {error && (
          <div className="mb-4 p-3 bg-[#FF4444]/10 border border-[#FF4444]/30 rounded-lg text-sm text-[#FF4444]">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-lg text-sm text-[#00FF88] flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hours Worked */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Clock className="inline h-4 w-4 mr-1" />
              Hours Worked <span className="text-[#FF4444]">*</span>
            </label>
            <input
              type="number"
              value={hoursWorked}
              onChange={(e) => setHoursWorked(e.target.value)}
              placeholder="e.g. 8.5"
              min="0.5"
              step="0.5"
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#0d9488] focus:border-[#0d9488]"
            />
          </div>

          {/* Actual Cost */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <DollarSign className="inline h-4 w-4 mr-1" />
              Actual Cost (AUD ex. GST) <span className="text-[#FF4444]">*</span>
            </label>
            <input
              type="number"
              value={actualCost}
              onChange={(e) => setActualCost(e.target.value)}
              placeholder="e.g. 4500"
              min="0"
              step="50"
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#0d9488] focus:border-[#0d9488]"
            />
          </div>

          {/* Materials Used */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Package className="inline h-4 w-4 mr-1" />
              Materials Used
            </label>
            <textarea
              value={materialsUsed}
              onChange={(e) => setMaterialsUsed(e.target.value)}
              placeholder="List materials used during the job..."
              rows={4}
              maxLength={2000}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#0d9488] focus:border-[#0d9488] resize-none"
            />
          </div>

          {/* Summary */}
          {hoursWorked && actualCost && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-sm font-medium text-gray-400 mb-3">Completion Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Hours Worked</span>
                  <span className="text-white">{hoursWorked}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Actual Cost (ex. GST)</span>
                  <span className="text-white">
                    ${parseFloat(actualCost).toLocaleString('en-AU')}
                  </span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2">
                  <span className="text-gray-400">GST (10%)</span>
                  <span className="text-gray-400">
                    ${(parseFloat(actualCost) * 0.1).toLocaleString('en-AU')}
                  </span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-gray-300">Total (inc. GST)</span>
                  <span className="text-[#00FF88]">
                    ${(parseFloat(actualCost) * 1.1).toLocaleString('en-AU')}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting || !hoursWorked || !actualCost}
            className="w-full py-3 bg-[#00FF88]/20 border border-[#00FF88]/30 hover:bg-[#00FF88]/30 disabled:opacity-50 disabled:cursor-not-allowed text-[#00FF88] rounded-lg font-medium transition-colours text-sm flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Completing...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4" />
                Mark Job as Completed
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
