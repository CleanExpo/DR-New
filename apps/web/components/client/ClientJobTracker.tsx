'use client';

import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Clock, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  calculateJobTimeline,
  formatDuration,
  formatEstimatedCompletion,
  getDelayWarningMessage,
  type JobStatus,
  type TimelineStep,
} from '@/lib/jobs/duration-calculator';
import {
  SupabaseRealtimeManager,
  type StatusUpdate,
} from '@/lib/realtime/supabase-realtime';

interface StatusHistoryEntry {
  status: JobStatus;
  timestamp: string;
  message?: string;
}

interface JobDetails {
  id: string;
  serviceType: string;
  address: string;
  status: JobStatus;
  priority: 'normal' | 'urgent' | 'emergency';
  createdAt: string;
  contractorId?: string;
  contractorName?: string;
  statusHistory: StatusHistoryEntry[];
}

interface ClientJobTrackerProps {
  jobId: string;
  userId: string;
  initialJob: JobDetails;
  className?: string;
}

export function ClientJobTracker({
  jobId,
  userId,
  initialJob,
  className,
}: ClientJobTrackerProps) {
  const [job, setJob] = useState<JobDetails>(initialJob);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isConnected, setIsConnected] = useState(false);

  // Calculate timeline with duration tracking
  const timeline = calculateJobTimeline(
    job.statusHistory,
    job.status,
    job.serviceType
  );

  // Subscribe to real-time status updates
  useEffect(() => {
    const manager = new SupabaseRealtimeManager(userId);

    // Subscribe to job channel for status updates
    const channel = manager.subscribeToJob(jobId, {
      onStatusUpdate: (update: StatusUpdate) => {
        // Update job with new status
        setJob((prev) => ({
          ...prev,
          status: update.status as JobStatus,
          statusHistory: [
            ...prev.statusHistory,
            {
              status: update.status as JobStatus,
              timestamp: update.timestamp,
              message: update.message,
            },
          ],
        }));
      },
    });

    if (channel) {
      setIsConnected(true);
    }

    // Cleanup on unmount
    return () => {
      manager.unsubscribeAll();
    };
  }, [jobId, userId]);

  // Update current time every minute to refresh elapsed time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const isCompleted = job.status === 'completed';
  const isCancelled = job.status === 'cancelled';

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header with Estimated Completion */}
      <Card className="bg-gradient-to-r from-blue-50 to-teal-50 border-blue-200">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Job Progress</h3>
                <p className="text-sm text-gray-600">
                  {job.contractorName || 'Your contractor'} • {job.serviceType}
                </p>
              </div>
            </div>
            <div className="text-right">
              {!isCompleted && !isCancelled && timeline.estimatedCompletionTime && (
                <>
                  <p className="text-sm text-gray-600">Estimated completion</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatEstimatedCompletion(timeline.estimatedCompletionTime)}
                  </p>
                  {timeline.isDelayed && (
                    <Badge className="mt-1 bg-amber-100 text-amber-800 border-amber-200">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Delayed
                    </Badge>
                  )}
                </>
              )}
              {isCompleted && (
                <>
                  <p className="text-sm text-gray-600">Total duration</p>
                  <p className="text-lg font-semibold text-green-700">
                    {formatDuration(timeline.totalElapsedMinutes)}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Overall Progress Bar */}
          {!isCompleted && !isCancelled && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Overall Progress</span>
                <span className="font-semibold text-gray-900">
                  {timeline.overallProgress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-500',
                    timeline.isDelayed ? 'bg-amber-500' : 'bg-blue-600'
                  )}
                  style={{ width: `${timeline.overallProgress}%` }}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Timeline Steps with Duration Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200" />
            {timeline.steps.map((step, index) => {
              const nextStep = timeline.steps[index + 1];
              const showProgressLine = step.isCompleted || step.isCurrent;

              return (
                <div key={step.status}>
                  {showProgressLine && nextStep && (
                    <div
                      className={cn(
                        'absolute left-5 w-0.5 transition-all duration-500',
                        step.isCompleted ? 'bg-blue-600' : 'bg-blue-400'
                      )}
                      style={{
                        top: `${index * 120 + 40}px`,
                        height: step.isCurrent
                          ? `${Math.min(step.progress, 100)}px`
                          : '120px',
                      }}
                    />
                  )}
                </div>
              );
            })}

            {/* Steps */}
            <div className="space-y-6">
              {timeline.steps.map((step: TimelineStep) => {
                const delayWarning = getDelayWarningMessage(step);

                return (
                  <div key={step.status} className="relative flex items-start gap-4">
                    {/* Step Icon with Progress */}
                    <div className="relative z-10">
                      {step.isCurrent ? (
                        /* Current step with circular progress */
                        <div className="relative h-10 w-10">
                          <svg className="h-10 w-10 -rotate-90" viewBox="0 0 40 40">
                            {/* Background circle */}
                            <circle
                              cx="20"
                              cy="20"
                              r="16"
                              fill="none"
                              stroke="#e5e7eb"
                              strokeWidth="3"
                            />
                            {/* Progress circle */}
                            <circle
                              cx="20"
                              cy="20"
                              r="16"
                              fill="none"
                              stroke={step.isDelayed ? '#f59e0b' : '#2563eb'}
                              strokeWidth="3"
                              strokeDasharray={`${step.progress} ${100 - step.progress}`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div
                              className={cn(
                                'h-6 w-6 rounded-full flex items-center justify-center text-white text-xs font-bold',
                                step.isDelayed ? 'bg-amber-500' : 'bg-blue-600'
                              )}
                            >
                              {step.progress}
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Completed or future step */
                        <div
                          className={cn(
                            'h-10 w-10 rounded-full flex items-center justify-center text-lg font-semibold transition-all',
                            step.isCompleted
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-400 border-2 border-gray-300'
                          )}
                        >
                          {step.isCompleted ? '✓' : '○'}
                        </div>
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 pt-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={cn(
                            'font-medium',
                            step.isCurrent && 'text-blue-600',
                            step.isCompleted && 'text-gray-900',
                            !step.isCurrent && !step.isCompleted && 'text-gray-400'
                          )}
                        >
                          {step.label}
                        </span>

                        {/* Current badge */}
                        {step.isCurrent && (
                          <Badge className="bg-blue-100 text-blue-800 animate-pulse">
                            <Clock className="h-3 w-3 mr-1" />
                            In Progress
                          </Badge>
                        )}

                        {/* Duration badge */}
                        {step.duration !== undefined && (
                          <Badge
                            variant="outline"
                            className={cn(
                              'border-gray-300',
                              step.isDelayed && 'border-amber-400 text-amber-700'
                            )}
                          >
                            {step.isCompleted ? '✓ ' : '⏱️ '}
                            {formatDuration(step.duration)}
                          </Badge>
                        )}

                        {/* Expected duration for future steps */}
                        {!step.isCurrent && !step.isCompleted && step.estimatedDuration > 0 && (
                          <Badge variant="outline" className="border-gray-300 text-gray-600">
                            ~{formatDuration(step.estimatedDuration)}
                          </Badge>
                        )}

                        {/* Delay warning */}
                        {step.isDelayed && (
                          <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Expected: {formatDuration(step.estimatedDuration)}
                          </Badge>
                        )}
                      </div>

                      {/* Timestamp */}
                      {step.timestamp && (
                        <p className="text-xs text-gray-500 mt-1">
                          {step.timestamp.toLocaleString('en-AU', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      )}

                      {/* Delay warning message */}
                      {delayWarning && (
                        <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-md">
                          <p className="text-xs text-amber-800 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {delayWarning}
                          </p>
                        </div>
                      )}

                      {/* Progress bar for current step */}
                      {step.isCurrent && step.progress < 100 && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                            <div
                              className={cn(
                                'h-full rounded-full transition-all duration-500',
                                step.isDelayed ? 'bg-amber-500' : 'bg-blue-600'
                              )}
                              style={{ width: `${step.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cancelled State */}
          {isCancelled && (
            <div className="mt-6 p-4 rounded-lg bg-red-50 border border-red-200">
              <div className="flex items-center gap-2 text-red-800">
                <AlertCircle className="h-5 w-5" />
                <span className="font-medium">This job has been cancelled</span>
              </div>
            </div>
          )}

          {/* Completed State */}
          {isCompleted && (
            <div className="mt-6 p-4 rounded-lg bg-green-50 border border-green-200">
              <div className="flex items-center gap-2 text-green-800">
                <TrendingUp className="h-5 w-5" />
                <span className="font-medium">Job completed successfully!</span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                Total time: {formatDuration(timeline.totalElapsedMinutes)}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Connection Status */}
      <div className="text-xs text-center text-gray-500">
        {isConnected ? (
          <span className="flex items-center justify-center gap-1">
            <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
            Live updates active
          </span>
        ) : (
          <span className="flex items-center justify-center gap-1">
            <span className="h-2 w-2 bg-gray-400 rounded-full"></span>
            Connecting...
          </span>
        )}
      </div>
    </div>
  );
}
